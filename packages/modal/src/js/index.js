import { Collection, FocusTrap } from '@vrembem/core/index';

import defaults from './defaults';
import { handleClick, handleKeydown } from './handlers';
import { register } from './register';
import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { closeAll } from './closeAll';
import { replace } from './replace';
import { updateGlobalState, updateFocusState, getModalElements, getModalID } from './helpers';

export default class Modal extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.trigger = null;
    this.focusTrap = new FocusTrap();

    // Setup a proxy for stack array.
    this.stack = new Proxy([], {
      set: (target, property, value) => {
        target[property] = value;
        // Update global state if stack length changed.
        if (property === 'length') {
          updateGlobalState.call(this);
        }
        return true;
      }
    });

    this.__handleClick = handleClick.bind(this);
    this.__handleKeydown = handleKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  get active() {
    return this.stack[this.stack.length - 1];
  }

  async init(options) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the modals.
    const modals = document.querySelectorAll(this.settings.selectorModal);

    // Register the collections array with modal instances.
    await this.registerCollection(modals);

    // If eventListeners are enabled, init event listeners.
    if (this.settings.eventListeners) {
      this.initEventListeners();
    }

    return this;
  }

  async destroy() {
    // Clear stored trigger.
    this.trigger = null;

    // Remove all entries from the collection.
    await this.deregisterCollection();

    // If eventListeners are enabled, destroy event listeners.
    if (this.settings.eventListeners) {
      this.destroyEventListeners();
    }

    return this;
  }

  initEventListeners() {
    document.addEventListener('click', this.__handleClick, false);
    document.addEventListener('touchend', this.__handleClick, false);
    document.addEventListener('keydown', this.__handleKeydown, false);
  }

  destroyEventListeners() {
    document.removeEventListener('click', this.__handleClick, false);
    document.removeEventListener('touchend', this.__handleClick, false);
    document.removeEventListener('keydown', this.__handleKeydown, false);
  }

  register(query) {
    const els = getModalElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.modal, els.dialog);
  }

  deregister(query) {
    const modal = this.get(getModalID.call(this, query));
    return deregister.call(this, modal);
  }

  open(id, transition) {
    return open.call(this, id, transition);
  }

  close(id, transition) {
    return close.call(this, id, transition);
  }

  replace(id, transition) {
    return replace.call(this, id, transition);
  }

  async closeAll(exclude = false, transition) {
    const result = await closeAll.call(this, exclude, transition);
    updateFocusState.call(this);
    return result;
  }
}
