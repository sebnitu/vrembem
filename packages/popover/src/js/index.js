import { Collection } from '@vrembem/core/index';

import defaults from './defaults';
import { handleKeydown } from './handlers';
import { register, registerEventListeners } from './register';
import { deregister, deregisterEventListeners } from './deregister';
import { open } from './open';
import { close } from './close';
import { getPopoverID, getPopoverElements } from './helpers';

export default class Popover extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.trigger = null;
    this.__handleKeydown = handleKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  async init(options) {
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

    return this;
  }

  async destroy() {
    // Clear any stored triggers.
    this.trigger = null;

    // Remove all entries from the collection.
    await this.deregisterCollection();

    // If eventListeners are enabled, destroy event listeners.
    if (this.settings.eventListeners) {
      // Pass false to destroyEventListeners() since deregisterCollection()
      // already removes event listeners from popovers.
      this.destroyEventListeners(false);
    }

    return this;
  }

  initEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and setup event listeners.
      this.collection.forEach((popover) => {
        registerEventListeners.call(this, popover);
      });
    }

    // Add keydown global event listener.
    document.addEventListener('keydown', this.__handleKeydown, false);
  }

  destroyEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and remove event listeners.
      this.collection.forEach((popover) => {
        deregisterEventListeners(popover);
      });
    }

    // Remove keydown global event listener.
    document.removeEventListener('keydown', this.__handleKeydown, false);
  }

  register(query) {
    const els = getPopoverElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.popover, els.trigger);
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
