import { Collection, FocusTrap } from '@vrembem/core/index';

import defaults from './defaults';
import { handlerClick, handlerKeydown } from './handlers';
import { register } from './register';
import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { closeAll } from './closeAll';
import { replace } from './replace';
import { updateFocus, updateStackIndex, getModalElements, getModalID } from './helpers';

export default class Modal extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.busy = false;
    this.memory = {};
    this.stack = [];
    this.focusTrap = new FocusTrap();
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  async init(options = null) {
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
  }

  async destroy() {
    // Clear any stored memory.
    this.memory = {};

    // Remove all entries from the collection.
    await this.deregisterCollection();

    // If eventListeners are enabled, destroy event listeners.
    if (this.settings.eventListeners) {
      this.destroyEventListeners();
    }
  }

  initEventListeners() {
    document.addEventListener('click', this.__handlerClick, false);
    document.addEventListener('touchend', this.__handlerClick, false);
    document.addEventListener('keydown', this.__handlerKeydown, false);
  }

  destroyEventListeners() {
    document.removeEventListener('click', this.__handlerClick, false);
    document.removeEventListener('touchend', this.__handlerClick, false);
    document.removeEventListener('keydown', this.__handlerKeydown, false);
  }

  register(query) {
    const els = getModalElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.target, els.dialog);
  }

  deregister(query) {
    const modal = this.get(getModalID.call(this, query));
    return deregister.call(this, modal);
  }

  open(id, transition = this.settings.transition) {
    return open.call(this, id, transition);
  }

  close(id, transition = this.settings.transition) {
    const modal = this.get(id);
    return close.call(this, modal, transition);
  }

  replace(id, transition = this.settings.transition) {
    return replace.call(this, id, transition);
  }

  async closeAll(exclude = false, transition = this.settings.transition) {
    const result = await closeAll.call(this, exclude, transition);
    updateStackIndex(this.stack);
    updateFocus.call(this);
    return result;
  }
}
