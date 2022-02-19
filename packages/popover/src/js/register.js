import { createPopper } from '@popperjs/core/dist/esm';

import { handlerClick, documentClick } from './handlers';
import { getConfig, getData, getPopover } from './helpers';
import { close, closeCheck } from './close';
import { open } from './open';

export function register(trigger, target, obj) {
  // If no target is passed
  if (!target) {
    // Try and get the target
    target = getPopover(trigger, obj.settings);
    // If still no target is returned, log an error and return false
    if (!target) {
      console.error(
        'No popover associated with the provided trigger:', trigger
      );
      return false;
    }
  }

  // Check if this item has already been registered in the collection
  const index = obj.collection.findIndex((item) => {
    return (item.trigger === trigger && item.target === target);
  });

  // Initiate popover variable
  let popover;

  // Check if it already exists in collection
  if (index >= 0) {
    // Set popover as item from collection
    popover = obj.collection[index];
  } else {
    // Create popper instance
    const popperInstance = createPopper(trigger, target);

    // Build popover object and push to collection array
    popover = {
      state: 'closed',
      trigger: trigger,
      target: target,
      popper: popperInstance,
      config: getConfig(target, obj.settings)
    };

    // Add item to collection
    obj.collection.push(popover);
  }

  // Setup event listeners
  registerEventListeners(popover, obj);

  // Set initial state of popover
  if (popover.target.classList.contains(obj.settings.stateActive)) {
    open(popover, obj);
    documentClick(popover, obj);
  } else {
    close(popover, obj);
  }

  // Return the popover object
  return popover;
}

export function deregister(popover, obj) {
  // Check if this item has been registered in the collection
  const index = obj.collection.findIndex((item) => {
    return (item.trigger === popover.trigger && item.target === popover.target);
  });

  // If the item exists in the collection
  if (index >= 0) {
    // Close the popover
    if (popover.state === 'opened') {
      close(popover, obj);
    }

    // Clean up the popper instance
    popover.popper.destroy();

    // Remove event listeners
    deregisterEventListeners(popover);

    // Remove item from collection
    obj.collection.splice(index, 1);
  }

  // Return the new collection
  return obj.collection;
}

export function registerEventListeners(popover, obj) {
  // If event listeners aren't already setup
  if (!popover.__eventListeners) {
    // Add event listeners based on event type
    const eventType = getData(
      popover.target, obj.settings.dataEventType, popover.config['event']
    );
    if (eventType === 'hover') {
      // Setup event listeners object for hover
      popover.__eventListeners = [{
        el: ['trigger'],
        type: ['mouseenter', 'focus'],
        listener: open.bind(null, popover, obj)
      }, {
        el: ['trigger', 'target'],
        type: ['mouseleave', 'focusout'],
        listener: closeCheck.bind(null, popover, obj)
      }];
      // Loop through listeners and apply to appropriate elements
      popover.__eventListeners.forEach((evObj) => {
        evObj.el.forEach((el) => {
          evObj.type.forEach((type) => {
            popover[el].addEventListener(type, evObj.listener, false);
          });
        });
      });
    } else {
      // Setup event listeners object for click
      popover.__eventListeners = [{
        el: ['trigger'],
        type: ['click'],
        listener: handlerClick.bind(obj, popover)
      }];
      // Loop through listeners and apply to appropriate elements
      popover.__eventListeners.forEach((evObj) => {
        evObj.el.forEach((el) => {
          evObj.type.forEach((type) => {
            popover[el].addEventListener(type, evObj.listener, false);
          });
        });
      });
    }
  }

  // Return the popover object
  return popover;
}

export function deregisterEventListeners(popover) {
  // If event listeners have been setup
  if (popover.__eventListeners) {
    // Loop through listeners and remove from appropriate elements
    popover.__eventListeners.forEach((evObj) => {
      evObj.el.forEach((el) => {
        evObj.type.forEach((type) => {
          popover[el].removeEventListener(type, evObj.listener, false);
        });
      });
    });
    // Remove eventListeners object from collection
    delete popover.__eventListeners;
  }

  // Return the popover object
  return popover;
}

export function registerCollection(obj) {
  // Get all the triggers
  const triggers = document.querySelectorAll(`[data-${obj.settings.dataTrigger}]`);
  triggers.forEach((trigger) => {
    // Register the popover and save to collection array
    register(trigger, false, obj);
  });

  // Return the popover collection
  return obj.collection;
}

export function deregisterCollection(obj) {
  // Loop through all items within the collection and pass them to deregister()
  while (obj.collection.length > 0) {
    deregister(obj.collection[0], obj);
  }

  // Return the popover collection
  return obj.collection;
}
