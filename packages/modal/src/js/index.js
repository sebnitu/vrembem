import { setTabindex } from '@vrembem/core/index';
import { FocusTrap } from '@vrembem/core/index';

import defaults from './defaults';
import { close } from './close';
import { handlerClick, handlerKeydown } from './handlers';
import { getModal, moveModals } from './helpers';
import { setInitialState } from './initialState';
import { open } from './open';

export default class Modal {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.working = false;
    this.memory = {};
    this.focusTrap = new FocusTrap();
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };
    this.moveModals();
    this.setInitialState();
    if (this.settings.setTabindex) {
      this.setTabindex();
    }
    if (this.settings.eventListeners) {
      this.initEventListeners();
    }
  }

  destroy() {
    this.memory = {};
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

  getModal(modalKey) {
    return getModal.call(this, modalKey);
  }

  setTabindex() {
    return setTabindex(`
      [data-${this.settings.dataModal}]
      [data-${this.settings.dataDialog}]
    `);
  }

  setInitialState() {
    return setInitialState.call(this);
  }

  moveModals(type, ref) {
    return moveModals.call(this, type, ref);
  }

  /**
   * Change state functionality
   */

  open(modalKey) {
    return open.call(this, modalKey);
  }

  close(returnFocus) {
    return close.call(this, returnFocus);
  }
}
