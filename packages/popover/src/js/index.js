import { Collection } from '@vrembem/core/index';

import defaults from './defaults';
import { closeAll } from './close';
import { handlerKeydown } from './handlers';
import { getPopoverID, getPopoverElements } from './helpers';
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
    this.memory = {};
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    // Update settings with passed options
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the popovers
    const popovers = document.querySelectorAll(this.settings.selectorPopover);

    // Build the collections array with popover instances
    this.registerCollection(popovers);

    // If eventListeners is enabled
    if (this.settings.eventListeners) {
      // Pass false to initEventListeners() since registerCollection()
      // already adds event listeners to popovers
      this.initEventListeners(false);
    }
  }

  destroy() {
    // Reset memory obj
    this.memory = {};

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
   * Register functionality
   */

  register(query) {
    const els = getPopoverElements.call(this, query);
    if (!els) return false;
    return register.call(this, els.trigger, els.target);
  }

  deregister(query) {
    const popover = this.get(getPopoverID(query));
    if (!popover) return false;
    return deregister.call(this, popover);
  }

  /**
   * Change state functionality
   */

  open(id) {
    const popover = this.get(id);
    if (!popover) return false;
    return popover.open();
  }

  close(id) {
    if (id) {
      const popover = this.get(id);
      if (!popover) return false;
      return popover.close();
    } else {
      return closeAll.call(this);
    }
  }
}
