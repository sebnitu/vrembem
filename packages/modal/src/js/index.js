import { Collection, FocusTrap } from '@vrembem/core/index';

import defaults from './defaults';
import { handlerClick, handlerKeydown } from './handlers';
import { register } from './register';
import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { getModalID, getModalElements } from './helpers';

export default class Modal extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.busy = false;
    this.memory = {};
    this.focusTrap = new FocusTrap();
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the modals.
    const modals = document.querySelectorAll(this.settings.selectorModal);

    // Register the collections array with modal instances.
    this.registerCollection(modals);

    // If eventListeners are enabled, init event listeners.
    if (this.settings.eventListeners) {
      this.initEventListeners();
    }
  }

  destroy() {
    // Clear any stored memory.
    this.memory = {};

    // Remove all entries from the collection.
    this.deregisterCollection();

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
    if (!els) return false;
    return register.call(this, els.target, els.dialog);
  }

  deregister(query) {
    const popover = this.get(getModalID(query));
    if (!popover) return false;
    return deregister.call(this, popover);
  }

  open(id, transition = this.settings.transition) {
    const modal = this.get(id);
    if (!modal) return false;
    return open.call(this, modal, transition);
  }

  close(id, transition = this.settings.transition, returnFocus) {
    const modal = this.get(id);
    return close.call(this, modal, transition, returnFocus);
  }
}
