import defaults from './src/js/defaults';
import { handlerKeydown } from './src/js/handlers';
import { hide, hideAll } from './src/js/hide';
import { show } from './src/js/show';
import {
  register,
  unregister,
  registerEventListeners,
  unregisterEventListeners,
  registerCollection
} from './src/js/register';

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
      // Setup init event listeners
      this.initEventListeners(false);
    }
  }

  destroy() {
    // Unregister all popovers from collection
    this.collection.forEach((popover) => {
      unregister(popover, this);
    });

    // Rest the collection array
    this.collection = [];

    // If eventListeners is enabled
    if (this.settings.eventListeners) {
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
        registerEventListeners(popover, this);
      });
    }

    // Add keydown global event listener
    document.addEventListener('keydown', this.__handlerKeydown, false);
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
  }

  /**
   *  Register popover
   */

  register(trigger, target) {
    register(trigger, target, this);
  }

  unregister(popover) {
    unregister(popover, this);
  }

  registerEventListeners(popover) {
    registerEventListeners(popover, this);
  }

  unregisterEventListeners(popover) {
    unregisterEventListeners(popover);
  }

  registerCollection() {
    registerCollection(this);
  }

  /**
   * Show and Hide functionality
   */

  show(popover) {
    show(popover, this);
  }

  hide(popover) {
    hide(popover, this);
  }

  hideAll(popover) {
    hideAll(popover, this);
  }
}
