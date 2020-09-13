import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden, setTabindex } from '@vrembem/core/index';
import { FocusTrap, focusTarget, focusTrigger } from '@vrembem/core/index';
import { openTransition, closeTransition } from '@vrembem/core/index';
import { moveElement } from '@vrembem/core/index';

import { defaults } from './src/js/defaults';
import { handlerClick, handlerKeyup } from './src/js/handlers';
import { setInitialState } from './src/js/initialState';

export default class Modal {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.working = false;
    this.memory = {};
    this.focusTrap = new FocusTrap();
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };
    this.moveModals();
    this.setTabindex(this.settings.setTabindex);
    this.setInitialState();
    document.addEventListener('click', this.__handlerClick, false);
    document.addEventListener('touchend', this.__handlerClick, false);
    document.addEventListener('keyup', this.__handlerKeyup, false);
  }

  destroy() {
    this.memory = {};
    document.removeEventListener('click', this.__handlerClick, false);
    document.removeEventListener('touchend', this.__handlerClick, false);
    document.removeEventListener('keyup', this.__handlerKeyup, false);
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

  setTabindex(state = true) {
    const selectorTabindex = `
      [data-${this.settings.dataModal}]
      [data-${this.settings.dataDialog}]
    `;
    setTabindex(state, selectorTabindex);
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
        bubbles: true
      }));
      this.working = false;
      return modal;
    } else {
      return modal;
    }
  }
}
