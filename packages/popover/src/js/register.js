import { createPopper } from '@popperjs/core/dist/esm';

import { handlerClick, documentClick } from './handlers';
import { deregister } from './deregister';
import { open } from './open';
import { close, closeCheck } from './close';
import { getConfig } from './helpers';

export async function register(trigger, target) {
  // Deregister entry incase it has already been registered.
  deregister.call(this, target);

  // Save root this for use inside methods API.
  const root = this;

  // Setup methods API.
  const methods = {
    open() {
      return open.call(root, this);
    },
    close() {
      return close.call(root, this);
    },
    deregister() {
      return deregister.call(root, this);
    }
  };

  // Setup the popover object.
  const item = {
    id: target.id,
    state: 'closed',
    trigger: trigger,
    target: target,
    popper: createPopper(trigger, target),
    config: getConfig(target, this.settings),
    ...methods
  };

  // Setup event listeners.
  registerEventListeners.call(this, item);

  // Add entry to collection.
  this.collection.push(item);

  // Set initial state.
  if (item.target.classList.contains(this.settings.stateActive)) {
    await item.open();
    documentClick.call(this, item);
  } else {
    await item.close();
  }

  // Return the registered entry.
  return item;
}

export function registerEventListeners(entry) {
  // If event listeners aren't already setup.
  if (!entry.__eventListeners) {
    // Add event listeners based on event type.
    const eventType = entry.config['event'];

    // If the event type is hover.
    if (eventType === 'hover') {
      // Setup event listeners object for hover.
      entry.__eventListeners = [{
        el: ['trigger'],
        type: ['mouseenter', 'focus'],
        listener: open.bind(this, entry)
      }, {
        el: ['trigger', 'target'],
        type: ['mouseleave', 'focusout'],
        listener: closeCheck.bind(this, entry)
      }];

      // Loop through listeners and apply to the appropriate elements.
      entry.__eventListeners.forEach((evObj) => {
        evObj.el.forEach((el) => {
          evObj.type.forEach((type) => {
            entry[el].addEventListener(type, evObj.listener, false);
          });
        });
      });
    }

    // Else the event type is click.
    else {
      // Setup event listeners object for click.
      entry.__eventListeners = [{
        el: ['trigger'],
        type: ['click'],
        listener: handlerClick.bind(this, entry)
      }];

      // Loop through listeners and apply to the appropriate elements.
      entry.__eventListeners.forEach((evObj) => {
        evObj.el.forEach((el) => {
          evObj.type.forEach((type) => {
            entry[el].addEventListener(type, evObj.listener, false);
          });
        });
      });
    }
  }

  // Return the entry object.
  return entry;
}
