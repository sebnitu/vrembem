import { Collection, FocusTrap } from '@vrembem/core/index';

import defaults from './defaults';
import { close } from './close';
import { handlerClick, handlerKeydown } from './handlers';
import { moveModals, getModalID, getModalElements } from './helpers';
import { setInitialState } from './initialState';
import { register, deregister } from './register';

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
    if (options) this.settings = { ...this.settings, ...options };

    this.moveModals();

    // Get all the modals
    const modals = document.querySelectorAll(this.settings.selectorModal);

    // Build the collections array with popover instances
    this.registerCollection(modals);

    // Set the initial state
    this.setInitialState();

    // If eventListeners is enabled
    if (this.settings.eventListeners) {
      this.initEventListeners();
    }
  }

  destroy() {
    // Clear any stored memory
    this.memory = {};

    // Remove all entries from the collection
    this.deregisterCollection();

    // If eventListeners is enabled
    if (this.settings.eventListeners) {
      this.destroyEventListeners();
    }
  }

  /**
   * Event listeners
   */

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

  /**
   * Helpers
   */

  setInitialState() {
    return setInitialState.call(this);
  }

  moveModals(type, ref) {
    return moveModals.call(this, type, ref);
  }

  /**
   * Register functionality
   */

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

  /**
   * Change state functionality
   */

  open(id) {
    const modal = this.get(id);
    if (!modal) return false;
    return modal.open();
  }

  close(returnFocus) {
    return close.call(this, returnFocus);
  }
}
