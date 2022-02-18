import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden, setTabindex } from '@vrembem/core/index';
import { FocusTrap, focusTarget, focusTrigger } from '@vrembem/core/index';
import { openTransition, closeTransition } from '@vrembem/core/index';
import { moveElement } from '@vrembem/core/index';

import defaults from './defaults';
import { handlerClick, handlerKeydown } from './handlers';
import { setInitialState } from './initialState';

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
    if (this.settings.setTabindex) {
      this.setTabindex();
    }
    this.setInitialState();
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
    if (typeof modalKey !== 'string') return modalKey;
    return document.querySelector(
      `[data-${this.settings.dataModal}="${modalKey}"]`
    );
  }

  modalNotFound(key) {
    return Promise.reject(
      new Error(`Did not find modal with key: "${key}"`)
    );
  }

  setTabindex() {
    const selectorTabindex = `
      [data-${this.settings.dataModal}]
      [data-${this.settings.dataDialog}]
    `;
    setTabindex(selectorTabindex);
  }

  setInitialState() {
    setInitialState(this);
  }

  moveModals(type = this.settings.moveModals.type, ref = this.settings.moveModals.ref) {
    const modals = document.querySelectorAll(`[data-${this.settings.dataModal}]`);
    if (modals.length) moveElement(modals, type, ref);
  }

  /**
   * Change state functionality
   */

  async open(modalKey) {
    const modal = this.getModal(modalKey);
    if (!modal) return this.modalNotFound(modalKey);
    if (hasClass(modal, this.settings.stateClosed)) {
      this.working = true;
      setOverflowHidden(true, this.settings.selectorOverflow);
      await openTransition(modal, this.settings);
      this.focusTrap.init(modal);
      focusTarget(modal, this.settings);
      setInert(true, this.settings.selectorInert);
      modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
        detail: this,
        bubbles: true
      }));
      this.working = false;
      return modal;
    } else {
      return modal;
    }
  }

  async close(returnFocus = true) {
    const modal = document.querySelector(
      `[data-${this.settings.dataModal}].${this.settings.stateOpened}`
    );
    if (modal) {
      this.working = true;
      setInert(false, this.settings.selectorInert);
      setOverflowHidden(false, this.settings.selectorOverflow);
      await closeTransition(modal, this.settings);
      if (returnFocus) focusTrigger(this);
      this.focusTrap.destroy();
      modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
        detail: this,
        bubbles: true
      }));
      this.working = false;
      return modal;
    } else {
      return modal;
    }
  }
}
