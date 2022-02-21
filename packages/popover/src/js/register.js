import { createPopper } from '@popperjs/core/dist/esm';

import { handlerClick, documentClick } from './handlers';
import { getConfig, getData, getPopover } from './helpers';
import { closeCheck } from './close';
import { open } from './open';

function getPropertyKey(query) {
  let type = null;
  // Check if it's a string
  if (typeof query === 'string') {
    type = 'id';
  }
  // Check if it's the trigger element
  else if (query.hasAttribute(`data-${this.settings.dataPopover}`)) {
    type = 'target';
  }
  // Check if it's the target element
  else if (query.hasAttribute(`data-${this.settings.dataTrigger}`)) {
    type = 'trigger';
  }
  // Return the query type
  return type;
}

export function get(search) {
  // Get the collection property type
  let key = getPropertyKey.call(this, search);
  // Return found popover or null if not found in the collection
  const result = this.collection.find((popover) => {
    return popover[key] === search;
  });
  return result || null;
}

export function register(trigger, target) {
  // If no target is passed
  if (!target) {
    // Try and get the target
    target = getPopover(trigger, this.settings);
    // If still no target is returned, log an error and return false
    if (!target) {
      console.error(
        'No popover associated with the provided trigger:', trigger
      );
      return false;
    }
  }

  // Check if this item has already been registered in the collection
  const index = this.collection.findIndex((item) => {
    return (item.trigger === trigger && item.target === target);
  });

  // Initiate popover variable
  let popover;

  // Check if it already exists in collection
  if (index >= 0) {
    // Set popover as item from collection
    popover = this.collection[index];
  } else {
    // Create popper instance
    const popperInstance = createPopper(trigger, target);

    // Build popover object and push to collection array
    popover = {
      id: target.id,
      state: 'closed',
      trigger: trigger,
      target: target,
      popper: popperInstance,
      config: getConfig(target, this.settings)
    };

    // Add item to collection
    this.collection.push(popover);
  }

  // Setup event listeners
  registerEventListeners.call(this, popover);

  // Set initial state of popover
  if (popover.target.classList.contains(this.settings.stateActive)) {
    this.open(popover);
    documentClick.call(this, popover);
  } else {
    this.close(popover);
  }

  // Return the popover object
  return popover;
}

export function deregister(popover) {
  // Check if this item has been registered in the collection
  const index = this.collection.findIndex((item) => {
    return (item.trigger === popover.trigger && item.target === popover.target);
  });

  // If the item exists in the collection
  if (index >= 0) {
    // Close the popover
    if (popover.state === 'opened') {
      this.close(popover);
    }

    // Clean up the popper instance
    popover.popper.destroy();

    // Remove event listeners
    deregisterEventListeners(popover);

    // Remove item from collection
    this.collection.splice(index, 1);
  }

  // Return the new collection
  return this.collection;
}

export function registerEventListeners(popover) {
  // If event listeners aren't already setup
  if (!popover.__eventListeners) {
    // Add event listeners based on event type
    const eventType = getData(
      popover.target, this.settings.dataEventType, popover.config['event']
    );
    if (eventType === 'hover') {
      // Setup event listeners object for hover
      popover.__eventListeners = [{
        el: ['trigger'],
        type: ['mouseenter', 'focus'],
        listener: open.bind(this, popover)
      }, {
        el: ['trigger', 'target'],
        type: ['mouseleave', 'focusout'],
        listener: closeCheck.bind(this, popover)
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
        listener: handlerClick.bind(this, popover)
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

export function registerCollection() {
  // Get all the triggers
  const triggers = document.querySelectorAll(`[data-${this.settings.dataTrigger}]`);
  triggers.forEach((trigger) => {
    // Register the popover and save to collection array
    this.register(trigger, false);
  });

  // Return the popover collection
  return this.collection;
}

export function deregisterCollection() {
  // Loop through all items within the collection and pass them to deregister()
  while (this.collection.length > 0) {
    this.deregister(this.collection[0]);
  }

  // Return the popover collection
  return this.collection;
}
