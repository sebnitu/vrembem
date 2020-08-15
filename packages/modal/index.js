import { addClass, hasClass, removeClass } from '@vrembem/core';
import { setInert, setOverflowHidden, setTabindex } from '@vrembem/core';
import { FocusTrap, focusTarget, focusTrigger } from '@vrembem/core';
import { openTransition, closeTransition } from '@vrembem/core';
import { moveElement } from '@vrembem/core';

import { defaults } from './src/js/defaults';
import { handlerClick, handlerKeyup } from './src/js/handlers';

export default class Modal {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.working = false;
    this.memory = {};
    this.focusTrap = new FocusTrap();
    this.selectorTabindex = `[data-${this.settings.dataModal}] [data-${this.settings.dataDialog}]`;
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };
    this.moveModals();
    this.setTabindex(this.settings.setTabindex, this.selectorTabindex);
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
    setTabindex(state, this.selectorTabindex);
  }

  setInitialState() {
    const modals = document.querySelectorAll(`[data-${this.settings.dataModal}]`);
    modals.forEach((el) => {
      if (el.classList.contains(this.settings.stateOpened)) {
        setInert(false, this.settings.selectorInert);
        setOverflowHidden(false, this.settings.selectorOverflow);
        focusTrigger(this);
        this.focusTrap.destroy();
      }
      removeClass(el,
        this.settings.stateOpened,
        this.settings.stateOpening,
        this.settings.stateClosing
      );
      addClass(el, this.settings.stateClosed);
    });
  }

  moveModals(ref = this.settings.moveModals.ref, type = this.settings.moveModals.type) {
    const modals = document.querySelectorAll(`[data-${this.settings.dataModal}]`);
    if (modals.length) moveElement(ref, type, modals);
  }

  /**
   * Change state functionality
   */

  async open(modalKey) {
    const modal = document.querySelector(
      `[data-${this.settings.dataModal}="${modalKey}"]`
    );
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
