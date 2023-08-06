import { Collection, FocusTrap } from '@vrembem/core';

import defaults from './defaults';
import { handleClick, handleKeydown } from './handlers';
import { register } from './register';
import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { closeAll } from './closeAll';
import { replace } from './replace';
import { stack } from './stack';
import { updateFocusState, getModalElements } from './helpers';

export default class Modal extends Collection {
  #handleClick;
  #handleKeydown;

  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.trigger = null;
    this.focusTrap = new FocusTrap();

    // Setup stack module.
    this.stack = stack(this.settings);

    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  get active() {
    return this.stack.top;
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
    document.addEventListener('click', this.#handleClick, false);
    document.addEventListener('keydown', this.#handleKeydown, false);
  }

  destroyEventListeners() {
    document.removeEventListener('click', this.#handleClick, false);
    document.removeEventListener('keydown', this.#handleKeydown, false);
  }

  register(query) {
    const els = getModalElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.modal, els.dialog);
  }

  deregister(query) {
    let obj = this.get((query.id || query));
    return (obj) ?
      deregister.call(this, obj) :
      Promise.reject(new Error('Failed to deregister; modal does not exist in collection.'));
  }

  open(id, transition, focus) {
    return open.call(this, id, transition, focus);
  }

  close(id, transition, focus) {
    return close.call(this, id, transition, focus);
  }

  replace(id, transition, focus) {
    return replace.call(this, id, transition, focus);
  }

  async closeAll(exclude = false, transition, focus = true) {
    const result = await closeAll.call(this, exclude, transition);
    // Update focus if the focus param is true.
    if (focus) {
      updateFocusState.call(this);
    }
    return result;
  }
}
