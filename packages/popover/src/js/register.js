import { createPopper } from '@popperjs/core/dist/esm';

import { handlerClick, documentClick } from './handlers';
import { getPopover, getEventType, getPlacement, getModifiers } from './helpers';
import { hide, hideCheck } from './hide';
import { show } from './show';

export function register(trigger, target, obj) {
  // Initiate popover variable
  let popover;

  // Check if this item has already been registered in the collection
  const index = obj.collection.findIndex((item) => {
    return (item.trigger === trigger && item.target === target);
  });

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

  // Return the popover object
  return popover;
}

export function unregister(popover, obj) {
  // Hide the popover
  if (popover.state === 'show') {
    hide(popover, obj);
  }

  // Remove event listeners
  unregisterEventListeners(popover);
}

export function registerEventListeners(popover, obj) {
  // If event listeners aren't already setup
  if (!popover.__eventListeners) {
    // Add event listeners based on event type
    const eventType = getEventType(popover.trigger, obj.settings);
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
}

export function registerCollection(obj) {
  // Get all the triggers
  const popoverTriggers = document.querySelectorAll(`[data-${obj.settings.dataTrigger}]`);
  popoverTriggers.forEach((trigger) => {
    // Get the triggers target
    const target = getPopover(trigger, obj.settings);
    if (target) {
      // Register the popover and save to collection array
      const popover = register(trigger, target, obj);
      // Set initial state of popover
      if (popover.target.classList.contains(obj.settings.stateActive)) {
        show(popover, obj);
        documentClick(popover, obj);
      } else {
        hide(popover, obj);
      }
    }
  });
}
