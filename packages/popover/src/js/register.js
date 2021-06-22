import { createPopper } from '@popperjs/core/dist/esm';

import { handlerClick, documentClick } from './handlers';
import { getEventType, getPlacement, getModifiers, getPopover } from './helpers';
import { hide, hideCheck } from './hide';
import { show } from './show';

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
    const popperInstance = createPopper(trigger, target, {
      placement: getPlacement(target, obj.settings),
      modifiers: getModifiers(target)
    });

    // Build popover object and push to collection array
    popover = {
      state: 'hide',
      trigger: trigger,
      target: target,
      popper: popperInstance
    };

    // Add item to collection
    obj.collection.push(popover);
  }

  // Setup event listeners
  registerEventListeners(popover, obj);

  // Set initial state of popover
  if (popover.target.classList.contains(obj.settings.stateActive)) {
    show(popover, obj);
    documentClick(popover, obj);
  } else {
    hide(popover, obj);
  }

  // Return the popover object
  return popover;
}

export function unregister(popover, obj) {
  // Check if this item has been registered in the collection
  const index = obj.collection.findIndex((item) => {
    return (item.trigger === popover.trigger && item.target === popover.target);
  });

  // If the item exists in the collection
  if (index >= 0) {
    // Hide the popover
    if (popover.state === 'show') {
      hide(popover, obj);
    }

    // Clean up the popper instance
    popover.popper.destroy();

    // Remove event listeners
    unregisterEventListeners(popover);

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
    const eventType = getEventType(popover.target, obj.settings);
    if (eventType === 'hover') {
      // Setup event listeners object for hover
      popover.__eventListeners = [{
        el: ['trigger'],
        type: ['mouseenter', 'focus'],
        listener: show.bind(null, popover, obj)
      }, {
        el: ['trigger', 'target'],
        type: ['mouseleave', 'focusout'],
        listener: hideCheck.bind(null, popover, obj)
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

export function unregisterEventListeners(popover) {
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

export function unregisterCollection(obj) {
  // Loop through all items within the collection and pass them to unregister()
  while (obj.collection.length > 0) {
    unregister(obj.collection[0], obj);
  }

  // Return the popover collection
  return obj.collection;
}
