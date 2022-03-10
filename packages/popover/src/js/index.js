import { Collection } from '@vrembem/core/index';

import defaults from './defaults';
import { handlerKeydown } from './handlers';
import { register, registerEventListeners } from './register';
import { deregister, deregisterEventListeners } from './deregister';
import { open } from './open';
import { close, closeAll } from './close';
import { getPopoverID, getPopoverElements } from './helpers';

export default class Popover extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.memory = {};
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  async init(options = null) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the popovers.
    const popovers = document.querySelectorAll(this.settings.selectorPopover);

    // Register the collections array with popover instances.
    await this.registerCollection(popovers);

    // If eventListeners are enabled, init event listeners.
    if (this.settings.eventListeners) {
      // Pass false to initEventListeners() since registerCollection()
      // already adds event listeners to popovers.
      this.initEventListeners(false);
    }
  }

  async destroy() {
    // Clear any stored memory.
    this.memory = {};

    // Remove all entries from the collection.
    await this.deregisterCollection();

    // If eventListeners are enabled, destroy event listeners.
    if (this.settings.eventListeners) {
      // Pass false to destroyEventListeners() since deregisterCollection()
      // already removes event listeners from popovers.
      this.destroyEventListeners(false);
    }
  }

  initEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and setup event listeners.
      this.collection.forEach((popover) => {
        registerEventListeners.call(this, popover);
      });
    }

    // Add keydown global event listener.
    document.addEventListener('keydown', this.__handlerKeydown, false);
  }

  destroyEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and remove event listeners.
      this.collection.forEach((popover) => {
        deregisterEventListeners(popover);
      });
    }

    // Remove keydown global event listener.
    document.removeEventListener('keydown', this.__handlerKeydown, false);
  }

  register(query) {
    const els = getPopoverElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.trigger, els.target);
  }

  deregister(query) {
    const popover = this.get(getPopoverID.call(this, query));
    return deregister.call(this, popover);
  }

  open(id) {
    return open.call(this, id);
  }

  close(id) {
    return close.call(this, id);
  }
}
