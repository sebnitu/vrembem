import {
  addClass,
  focusTarget,
  focusTrigger,
  hasClass,
  removeClass,
  setInert,
  setOverflowHidden,
  setTabindex
} from '@vrembem/core';
import transition from '@vrembem/core/src/js/transition';
import { FocusTrap } from '@vrembem/core/src/js/focusTrap';

export default class Modal {
  constructor(options) {
    this.defaults = {
      autoInit: false,

      // Data attributes
      dataModal: 'modal',
      dataDialog: 'modal-dialog',
      dataOpen: 'modal-open',
      dataClose: 'modal-close',
      dataFocus: 'modal-focus',
      dataRequired: 'modal-required',

      // State classes
      stateOpened: 'is-opened',
      stateOpening: 'is-opening',
      stateClosing: 'is-closing',
      stateClosed: 'is-closed',

      // Selector
      selectorInert: null,
      selectorOverflow: 'body',

      // Feature toggles
      customEventPrefix: 'modal:',
      moveModals: {
        selector: null,
        location: null
      },
      setTabindex: true,
      transition: true
    };
    this.settings = { ...this.defaults, ...options };
    this.working = false;
    this.memory = {};
    this.focusTrap = new FocusTrap();
    this.selectorTabindex = `[data-${this.settings.dataModal}] [data-${this.settings.dataDialog}]`;

    this.handlerClick = this.handlerClick.bind(this);
    this.handlerKeyup = this.handlerKeyup.bind(this);

    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };
    this.setInitialState();
    this.setTabindex(this.settings.setTabindex, this.selectorTabindex);
    this.moveModals();
    document.addEventListener('click', this.handlerClick, false);
    document.addEventListener('touchend', this.handlerClick, false);
    document.addEventListener('keyup', this.handlerKeyup, false);
  }

  destroy() {
    this.memory = {};
    document.removeEventListener('click', this.handlerClick, false);
    document.removeEventListener('touchend', this.handlerClick, false);
    document.removeEventListener('keyup', this.handlerKeyup, false);
  }

  async handlerClick(event) {
    // Working catch
    if (this.working) return;

    // Trigger click
    const trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);
    if (trigger) {
      event.preventDefault();
      const modalKey = trigger.getAttribute(`data-${this.settings.dataOpen}`);
      const fromModal = event.target.closest(`[data-${this.settings.dataModal}]`);
      if (!fromModal) this.memory.trigger = trigger;
      await this.close(!fromModal);
      this.open(modalKey);
      return;
    }

    // Close click
    if (event.target.closest(`[data-${this.settings.dataClose}]`)) {
      event.preventDefault();
      this.close();
      return;
    }

    // Root click
    if (
      event.target.hasAttribute(`data-${this.settings.dataModal}`) &&
      !event.target.hasAttribute(`data-${this.settings.dataRequired}`)
    ) {
      this.close();
      return;
    }
  }

  handlerKeyup(event) {
    // Working catch
    if (this.working) return;

    if (event.key === 'Escape' || event.keyCode === 27) {
      const target = document.querySelector(
        `[data-${this.settings.dataModal}].${this.settings.stateOpened}`
      );
      if (target && !target.hasAttribute(`data-${this.settings.dataRequired}`)) {
        this.close();
      }
    }
  }

  modalNotFound(key) {
    return Promise.reject(
      new Error(`Did not find modal with key: "${key}"`)
    );
  }

  moveModals(
    selector = this.settings.moveModals.selector,
    location = this.settings.moveModals.location
  ) {
    if (selector) {
      const el = document.querySelector(selector);
      if (el) {
        const modals = document.querySelectorAll(`[data-${this.settings.dataModal}]`);
        modals.forEach((modal) => {
          if (location === 'after') {
            el.after(modal);
          } else if (location === 'before') {
            el.before(modal);
          } else if (location === 'append') {
            el.append(modal);
          } else if (location === 'prepend') {
            el.prepend(modal);
          }
        });
      }
    }
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

  setTabindex(state = true) {
    setTabindex(state, this.selectorTabindex);
  }

  async open(modalKey) {
    const modal = document.querySelector(
      `[data-${this.settings.dataModal}="${modalKey}"]`
    );
    if (!modal) return this.modalNotFound(modalKey);
    if (hasClass(modal, this.settings.stateClosed)) {
      this.working = true;
      setOverflowHidden(true, this.settings.selectorOverflow);
      await transition.open(modal, this.settings);
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
      await transition.close(modal, this.settings);
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
