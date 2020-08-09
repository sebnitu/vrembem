import { addClass, hasClass, removeClass } from '@vrembem/core';

export default (options) => {

  const api = {};
  const defaults = {
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

  let working = false;

  api.settings = { ...defaults, ...options };
  api.memory = {};

  api.init = () => {
    setInitialState();
    setTabindex();
    moveModals();
    document.addEventListener('click', handler, false);
    document.addEventListener('touchend', handler, false);
    document.addEventListener('keyup', handlerEscape, false);
  };

  api.destroy = () => {
    api.memory = {};
    document.removeEventListener('click', handler, false);
    document.removeEventListener('touchend', handler, false);
    document.removeEventListener('keyup', handlerEscape, false);
  };

  const handler = async (event) => {
    // Working catch
    if (working) return;

    // Trigger click
    const trigger = event.target.closest(`[data-${api.settings.dataOpen}]`);
    if (trigger) {
      event.preventDefault();
      const modalKey = trigger.getAttribute(`data-${api.settings.dataOpen}`);
      const fromModal = event.target.closest(`[data-${api.settings.dataModal}]`);
      if (!fromModal) api.memory.trigger = trigger;
      await api.close(!fromModal);
      api.open(modalKey);
      return;
    }

    // Close click
    if (event.target.closest(`[data-${api.settings.dataClose}]`)) {
      event.preventDefault();
      api.close();
      return;
    }

    // Root click
    if (
      event.target.hasAttribute(`data-${api.settings.dataModal}`) &&
      !event.target.hasAttribute(`data-${api.settings.dataRequired}`)
    ) {
      api.close();
      return;
    }
  };

  const handlerEscape = (event) => {
    // Working catch
    if (working) return;

    if (event.key === 'Escape' || event.keyCode === 27) {
      const target = document.querySelector(
        `[data-${api.settings.dataModal}].${api.settings.stateOpened}`
      );
      if (target && !target.hasAttribute(`data-${api.settings.dataRequired}`)) {
        api.close();
      }
    }
  };

  /**
   * Helpers
   */

  const modalNotFound = (key) => {
    return Promise.reject(
      new Error(`Did not find modal with key: "${key}"`)
    );
  };

  const moveModals = (
    selector = api.settings.moveModals.selector,
    location = api.settings.moveModals.location
  ) => {
    if (selector) {
      const el = document.querySelector(selector);
      if (el) {
        const modals = document.querySelectorAll(`[data-${api.settings.dataModal}]`);
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
  };

  api.moveModals = (selector, location) => {
    moveModals(selector, location);
  };

  const setInert = (state) => {
    if (api.settings.selectorInert) {
      const content = document.querySelectorAll(api.settings.selectorInert);
      content.forEach((el) => {
        if (state) {
          el.inert = true;
          el.setAttribute('aria-hidden', true);
        } else {
          el.inert = null;
          el.removeAttribute('aria-hidden');
        }
      });
    }
  };

  const setInitialState = () => {
    const modals = document.querySelectorAll(`[data-${api.settings.dataModal}]`);
    modals.forEach((el) => {
      if (el.classList.contains(api.settings.stateOpened)) {
        setInert(false);
        setOverflowHidden();
        focusTrigger();
        focusTrapDestroy(el);
      }
      removeClass(el,
        api.settings.stateOpened,
        api.settings.stateOpening,
        api.settings.stateClosing
      );
      addClass(el, api.settings.stateClosed);
    });
  };

  api.setInitialState = () => {
    setInitialState();
  };

  const setOverflowHidden = (state) => {
    if (api.settings.selectorOverflow) {
      const els = document.querySelectorAll(api.settings.selectorOverflow);
      els.forEach((el) => {
        if (state) {
          el.style.overflow = 'hidden';
        } else {
          el.style.removeProperty('overflow');
        }
      });
    }
  };

  const setTabindex = (enable = api.settings.setTabindex) => {
    if (enable) {
      const modals = document.querySelectorAll(
        `[data-${api.settings.dataModal}] [data-${api.settings.dataDialog}]`
      );
      modals.forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
    }
  };

  api.setTabindex = () => {
    setTabindex(true);
  };

  /**
   * Transition functionality
   */

  const openTransition = (modal) => {
    return new Promise((resolve) => {
      if (api.settings.transition) {
        removeClass(modal, api.settings.stateClosed);
        addClass(modal, api.settings.stateOpening);
        modal.addEventListener('transitionend', function _f() {
          addClass(modal, api.settings.stateOpened);
          removeClass(modal, api.settings.stateOpening);
          resolve(modal);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        addClass(modal, api.settings.stateOpened);
        removeClass(modal, api.settings.stateClosed);
        resolve(modal);
      }
    });
  };

  const closeTransition = (modal) => {
    return new Promise((resolve) => {
      if (api.settings.transition) {
        addClass(modal, api.settings.stateClosing);
        removeClass(modal, api.settings.stateOpened);
        modal.addEventListener('transitionend', function _f() {
          removeClass(modal, api.settings.stateClosing);
          addClass(modal, api.settings.stateClosed);
          resolve(modal);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        addClass(modal, api.settings.stateClosed);
        removeClass(modal, api.settings.stateOpened);
        resolve(modal);
      }
    });
  };

  api.open = async (modalKey) => {
    const modal = document.querySelector(
      `[data-${api.settings.dataModal}="${modalKey}"]`
    );
    if (!modal) return modalNotFound(modalKey);
    if (hasClass(modal, api.settings.stateClosed)) {
      working = true;
      setOverflowHidden('hidden');
      await openTransition(modal);
      focusTrapInit(modal);
      focusModal(modal);
      setInert(true);
      modal.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
      working = false;
      return modal;
    } else {
      return modal;
    }
  };

  api.close = async (returnFocus = true) => {
    const modal = document.querySelector(
      `[data-${api.settings.dataModal}].${api.settings.stateOpened}`
    );
    if (modal) {
      working = true;
      setInert(false);
      setOverflowHidden();
      await closeTransition(modal);
      if (returnFocus) focusTrigger();
      focusTrapDestroy(modal);
      modal.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'closed', {
        bubbles: true
      }));
      working = false;
      return modal;
    } else {
      return modal;
    }
  };

  /**
   * Focus functionality
   */

  const focusModal = (modal) => {
    const innerFocus = modal.querySelector(
      `[data-${api.settings.dataFocus}]`
    );
    if (innerFocus) {
      innerFocus.focus();
    } else {
      const dialog = modal.querySelector(
        `[data-${api.settings.dataDialog}][tabindex="-1"]`
      );
      if (dialog) {
        dialog.focus();
      }
    }
  };

  const focusTrigger = () => {
    if (api.memory.trigger) {
      api.memory.trigger.focus();
      api.memory.trigger = null;
    }
  };

  /**
   * Focus trap functionality
   */

  const getFocusable = (modal) => {
    const focusable = [];
    const items = modal.querySelectorAll(`
      a[href]:not([disabled]),
      button:not([disabled]),
      textarea:not([disabled]),
      input[type="text"]:not([disabled]),
      input[type="radio"]:not([disabled]),
      input[type="checkbox"]:not([disabled]),
      select:not([disabled]),
      [tabindex]:not([tabindex="-1"])
    `);
    items.forEach((el) => {
      el.focus();
      if (el === document.activeElement) {
        focusable.push(el);
      }
    });
    return focusable;
  };

  const focusTrapInit = (modal) => {
    api.memory.focusable = getFocusable(modal);
    if (api.memory.focusable.length) {
      api.memory.focusableFirst = api.memory.focusable[0];
      api.memory.focusableLast = api.memory.focusable[api.memory.focusable.length - 1];
      modal.addEventListener('keydown', handlerFocusTrap);
    } else {
      modal.addEventListener('keydown', handlerFocusLock);
    }
  };

  const focusTrapDestroy = (modal) => {
    api.memory.focusable = null;
    api.memory.focusableFirst = null;
    api.memory.focusableLast = null;
    modal.removeEventListener('keydown', handlerFocusTrap);
    modal.removeEventListener('keydown', handlerFocusLock);
  };

  const handlerFocusTrap = (event) => {
    const isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (!isTab) return;

    if (event.shiftKey) {
      const dialog = document.querySelector(`
        [data-${api.settings.dataModal}].${api.settings.stateOpened}
        [data-${api.settings.dataDialog}][tabindex="-1"]
      `);
      if (
        document.activeElement === api.memory.focusableFirst ||
        document.activeElement === dialog
      ) {
        api.memory.focusableLast.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === api.memory.focusableLast) {
        api.memory.focusableFirst.focus();
        event.preventDefault();
      }
    }
  };

  const handlerFocusLock = (event) => {
    const isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (isTab) event.preventDefault();
  };

  /**
   * Init and return
   */

  if (api.settings.autoInit) api.init();
  return api;
};
