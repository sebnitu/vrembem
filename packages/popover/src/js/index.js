import Collection from './collection';

import defaults from './defaults';
import { close, closeAll } from './close';
import { handlerKeydown } from './handlers';
import { open } from './open';
import {
  register,
  deregister,
  registerEventListeners,
  deregisterEventListeners,
} from './register';

export default class Popover extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    // this.collection = [];
    this.memory = { trigger: null };
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    // Update settings with passed options
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the popover elements
    const triggers = document.querySelectorAll(`[data-${this.settings.dataTrigger}]`);

    // Build the collections array with popover instances
    this.registerCollection(triggers);

    // If eventListeners is enabled
    if (this.settings.eventListeners) {
      // Pass false to initEventListeners() since registerCollection()
      // already adds event listeners to popovers
      this.initEventListeners(false);
    }
  }

  destroy() {
    // Deregister all popovers from collection
    this.deregisterCollection();

    // If eventListeners is enabled
    if (this.settings.eventListeners) {
      // Pass false to destroyEventListeners() since deregisterCollection()
      // already removes event listeners from popovers
      this.destroyEventListeners(false);
    }
  }

  /**
   * Event listeners
   */

  initEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and setup event listeners
      this.collection.forEach((popover) => {
        registerEventListeners.call(this, popover);
      });
    }

    // Add keydown global event listener
    document.addEventListener('keydown', this.__handlerKeydown, false);
  }

  destroyEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and remove event listeners
      this.collection.forEach((popover) => {
        deregisterEventListeners(popover);
      });
    }

    // Remove keydown global event listener
    document.removeEventListener('keydown', this.__handlerKeydown, false);
  }

  /**
   * Register popover functionality
   */

  register(trigger, target = false) {
    return register.call(this, trigger, target);
  }

  deregister(popover) {
    return deregister.call(this, popover);
  }

  /**
   * Change state functionality
   */

  open(popover) {
    return open.call(this, popover);
  }

  close(popover) {
    return close.call(this, popover);
  }

  closeAll() {
    return closeAll.call(this);
  }
}
