import { setInert, setOverflowHidden, focusTrigger, removeClass, addClass, FocusTrap, setTabindex, moveElement, hasClass, openTransition, focusTarget, closeTransition } from '@vrembem/core';

var defaults = {
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
    ref: null,
    type: null
  },
  setTabindex: true,
  transition: true
};

async function handlerClick(event) {
  // Working catch
  if (this.working) return; // Trigger click

  const trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);

  if (trigger) {
    event.preventDefault();
    const modalKey = trigger.getAttribute(`data-${this.settings.dataOpen}`);
    const fromModal = event.target.closest(`[data-${this.settings.dataModal}]`);
    if (!fromModal) this.memory.trigger = trigger;
    await this.close(!fromModal);
    this.open(modalKey);
    return;
  } // Close click


  if (event.target.closest(`[data-${this.settings.dataClose}]`)) {
    event.preventDefault();
    this.close();
    return;
  } // Root click


  if (event.target.hasAttribute(`data-${this.settings.dataModal}`) && !event.target.hasAttribute(`data-${this.settings.dataRequired}`)) {
    this.close();
    return;
  }
}
function handlerKeyup(event) {
  // Working catch
  if (this.working) return;

  if (event.key === 'Escape' || event.keyCode === 27) {
    const target = document.querySelector(`[data-${this.settings.dataModal}].${this.settings.stateOpened}`);

    if (target && !target.hasAttribute(`data-${this.settings.dataRequired}`)) {
      this.close();
    }
  }
}

function setInitialState(obj) {
  const modals = document.querySelectorAll(`[data-${obj.settings.dataModal}]`);
  modals.forEach(el => {
    if (el.classList.contains(obj.settings.stateOpened)) {
      setInert(false, obj.settings.selectorInert);
      setOverflowHidden(false, obj.settings.selectorOverflow);
      focusTrigger(obj);
      obj.focusTrap.destroy();
    }

    removeClass(el, obj.settings.stateOpened, obj.settings.stateOpening, obj.settings.stateClosing);
    addClass(el, obj.settings.stateClosed);
  });
}

class Modal {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults,
      ...options
    };
    this.working = false;
    this.memory = {};
    this.focusTrap = new FocusTrap();
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings,
      ...options
    };
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
    return document.querySelector(`[data-${this.settings.dataModal}="${modalKey}"]`);
  }

  modalNotFound(key) {
    return Promise.reject(new Error(`Did not find modal with key: "${key}"`));
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
    const modal = document.querySelector(`[data-${this.settings.dataModal}].${this.settings.stateOpened}`);

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

export default Modal;
//# sourceMappingURL=scripts.modern.js.map
