import { createPopper } from '@popperjs/core/dist/esm';

import { handlerClick, documentClick } from './handlers';
import { getConfig } from './helpers';
import { close, closeCheck } from './close';
import { open } from './open';

export function register(trigger, target) {
  // Deregister popover if it already exists in the collection
  this.deregister(target.id);

  // Create popper instance
  const popperInstance = createPopper(trigger, target);

  // Save root this for use inside object & create methods API
  const root = this;
  const methods = {
    open() {
      open.call(root, this);
    },
    close() {
      close.call(root, this);
    },
    deregister() {
      deregister.call(root, this);
    }
  };

  // Build popover object and push to collection array
  const popover = {
    id: target.id,
    state: 'closed',
    trigger: trigger,
    target: target,
    popper: popperInstance,
    config: getConfig(target, this.settings),
    ...methods
  };

  // Add item to collection
  this.collection.push(popover);

  // Setup event listeners
  registerEventListeners.call(this, popover);

  // Set initial state of popover
  if (popover.target.classList.contains(this.settings.stateActive)) {
    open.call(this, popover);
    documentClick.call(this, popover);
  } else {
    close.call(this, popover);
  }

  // Return the popover object
  return popover;
}

export function deregister(popover) {
  // Check if this item has been registered in the collection
  const index = this.collection.findIndex((entry) => {
    return (entry.id === popover.id);
  });

  // If the entry exists in the collection
  if (index >= 0) {
    // Get the collection entry
    const entry = this.collection[index];

    // Close the collection entry if it's open
    if (entry.state === 'opened') {
      entry.close();
    }

    // Clean up the popper instance
    entry.popper.destroy();

    // Remove event listeners
    deregisterEventListeners(entry);

    // Delete properties from collection entry
    Object.getOwnPropertyNames(entry).forEach((prop) => {
      delete entry[prop];
    });

    // Remove entry from collection
    this.collection.splice(index, 1);
  }

  // Return the new collection
  return this.collection;
}

export function registerEventListeners(popover) {
  // If event listeners aren't already setup
  if (!popover.__eventListeners) {
    // Add event listeners based on event type
    const eventType = popover.config['event'];
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
