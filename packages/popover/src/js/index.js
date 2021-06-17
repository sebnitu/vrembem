import defaults from './defaults';
import { handlerKeydown } from './handlers';
import { hide, hideAll } from './hide';
import { show } from './show';
import {
  register,
  unregister,
  registerEventListeners,
  unregisterEventListeners,
  registerCollection,
  unregisterCollection
} from './register';

export default class Popover {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.collection = [];
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    // Update settings with passed options
    if (options) this.settings = { ...this.settings, ...options };

    // Build the collections array with popover instances
    registerCollection(this);

    // If eventListeners is enabled and popover triggers exist on page
    if (this.settings.eventListeners) {
      // Pass false to initEventListeners() since registerCollection()
      // already adds event listeners to popovers
      this.initEventListeners(false);
    }

    return this;
  }

  destroy() {
    // Unregister all popovers from collection
    unregisterCollection(this);

    // If eventListeners is enabled
    if (this.settings.eventListeners) {
      // Pass false to destroyEventListeners() since unregisterCollection()
      // already removes event listeners from popovers
      this.destroyEventListeners(false);
    }

    return this;
  }

  /**
   * Event listeners
   */

  initEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and setup event listeners
      this.collection.forEach((popover) => {
        registerEventListeners(popover, this);
      });
    }

    // Add keydown global event listener
    document.addEventListener('keydown', this.__handlerKeydown, false);

    return this;
  }

  destroyEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and remove event listeners
      this.collection.forEach((popover) => {
        unregisterEventListeners(popover);
      });
    }

    // Remove keydown global event listener
    document.removeEventListener('keydown', this.__handlerKeydown, false);

    return this;
  }

  /**
   * Register popover functionality
   */

  register(trigger, target = false) {
    return register(trigger, target, this);
  }

  unregister(popover) {
    return unregister(popover, this);
  }

  registerEventListeners(popover) {
    return registerEventListeners(popover, this);
  }

  unregisterEventListeners(popover) {
    return unregisterEventListeners(popover);
  }

  registerCollection() {
    return registerCollection(this);
  }

  unregisterCollection() {
    return unregisterCollection(this);
  }

  /**
   * Change state functionality
   */

  show(popover) {
    return show(popover, this);
  }

  hide(popover) {
    return hide(popover, this);
  }

  hideAll(popover) {
    return hideAll(popover, this);
  }
}
