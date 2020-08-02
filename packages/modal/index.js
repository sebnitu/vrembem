import { addClass, camelCase, removeClass } from '@vrembem/core';

export const Modal = (options) => {

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

    // Selector
    selectorMain: null,

    // State classes
    stateOpened: 'is-opened',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',

    // Feature toggles
    customEventPrefix: 'modal:',
    moveModals: {
      selector: null,
      location: null
    },
    setTabindex: true,
    toggleOverflow: 'body',
    transition: true,
  };

  api.settings = { ...defaults, ...options };
  api.memory = {};

  api.init = async () => {
    setInitialState();
    setTabindex();
    moveModals();
    document.addEventListener('click', handler, false);
    document.addEventListener('keyup', handlerEscape, false);
  };

  api.destroy = () => {
    api.memory = {};
    document.removeEventListener('click', handler, false);
    document.removeEventListener('keyup', handlerEscape, false);
  };

  api.open = (modalKey, callback) => {
    open(modalKey, callback);
  };

  api.close = (returnFocus, callback) => {
    close(returnFocus, callback);
  };

  api.setInitialState = () => {
    setInitialState();
  };

  api.setTabindex = () => {
    setTabindex(true);
  };

  api.moveModals = (selector, location) => {
    moveModals(selector, location);
  };

  const handler = (event) => {
    // Trigger click
    const trigger = event.target.closest(`[data-${api.settings.dataOpen}]`);
    if (trigger) {
      const modalKey = trigger.dataset[camelCase(api.settings.dataOpen)];
      const fromModal = event.target.closest(
        `[data-${api.settings.dataModal}]`
      );
      if (!fromModal) {
        api.memory.trigger = trigger;
      }
      close(!fromModal, () => {
        open(modalKey);
      });
      event.preventDefault();
    } else {
      // Close click
      if (event.target.closest(`[data-${api.settings.dataClose}]`)) {
        close();
        event.preventDefault();
      }
      // Root click
      if (
        event.target.dataset[camelCase(api.settings.dataModal)] &&
        !event.target.hasAttribute(`data-${api.settings.dataRequired}`)
      ) {
        close();
      }
    }
  };

  const handlerEscape = (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      const target = document.querySelector(
        `[data-${api.settings.dataModal}].${api.settings.stateOpened}`
      );
      if (target && !target.hasAttribute(`data-${api.settings.dataRequired}`)) {
        close();
      }
    }
  };

  const setInitialState = () => {
    const modals = document.querySelectorAll(`[data-${api.settings.dataModal}]`);
    modals.forEach((el) => {
      removeClass(el,
        api.settings.stateOpened,
        api.settings.stateOpening,
        api.settings.stateClosing
      );
      addClass(el, api.settings.stateClosed);
    });
    if (api.memory.target) {
      enableMain();
      setOverflow();
      destroyTrapFocus();
      returnFocus();
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

  const setOverflow = (state) => {
    if (api.settings.toggleOverflow) {
      const els = document.querySelectorAll(api.settings.toggleOverflow);
      els.forEach((el) => {
        if (state == 'hidden') {
          el.style.overflow = 'hidden';
        } else {
          el.style.removeProperty('overflow');
        }
      });
    }
  };

  /**
   * Transition functionality
   */

  const openTransition = (modal) => {
    return new Promise((resolve) => {
      removeClass(modal, api.settings.stateClosed);
      addClass(modal, api.settings.stateOpening);
      modal.addEventListener('transitionend', function _listener() {
        addClass(modal, api.settings.stateOpened);
        removeClass(modal, api.settings.stateOpening);
        this.removeEventListener('transitionend', _listener, true);
        resolve();
      }, true);
    });
  };

  const closeTransition = (modal) => {
    return new Promise((resolve) => {
      addClass(modal, api.settings.stateClosing);
      removeClass(modal, api.settings.stateOpened);
      modal.addEventListener('transitionend', function _listener() {
        removeClass(modal, api.settings.stateClosing);
        addClass(modal, api.settings.stateClosed);
        this.removeEventListener('transitionend', _listener, true);
        resolve();
      }, true);
    });
  };

  const open = async (modalKey, callback) => {
    const target = document.querySelector(
      `[data-${api.settings.dataModal}="${modalKey}"].${api.settings.stateClosed}`
    );
    if (target) {
      setOverflow('hidden');
      if (api.settings.transition) {
        await openTransition(target);
      } else {
        addClass(target, api.settings.stateOpened);
        removeClass(target, api.settings.stateClosed);
      }
      setFocus(target);
      initTrapFocus(target);
      disableMain();
      typeof callback === 'function' && callback();
      target.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
    } else {
      typeof callback === 'function' && callback();
    }
  };

  const close = async (focus = true, callback) => {
    const target = document.querySelector(
      `[data-${api.settings.dataModal}].${api.settings.stateOpened}`
    );
    if (target) {
      enableMain();
      setOverflow();
      if (api.settings.transition) {
        await closeTransition(target);
      } else {
        addClass(target, api.settings.stateClosed);
        removeClass(target, api.settings.stateOpened);
      }
      if (focus) returnFocus();
      destroyTrapFocus(target);
      typeof callback === 'function' && callback();
      target.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'closed', {
        bubbles: true
      }));
    } else {
      typeof callback === 'function' && callback();
    }
  };

  /**
   * Focus functionality
   */

  const setFocus = (modal) => {
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

  const returnFocus = () => {
    if (api.memory.trigger) {
      api.memory.trigger.focus();
      api.memory.trigger = null;
    }
  };

  /**
   * Focus trap functionality
   */

  const initTrapFocus = (modal) => {
    api.memory.focusable = modal.querySelectorAll(`
      a[href]:not([disabled]),
      button:not([disabled]),
      textarea:not([disabled]),
      input[type="text"]:not([disabled]),
      input[type="radio"]:not([disabled]),
      input[type="checkbox"]:not([disabled]),
      select:not([disabled]),
      [tabindex]:not([tabindex="-1"])
    `);
    if (api.memory.focusable.length) {
      api.memory.focusableFirst = api.memory.focusable[0];
      api.memory.focusableLast = api.memory.focusable[api.memory.focusable.length - 1];
      modal.addEventListener('keydown', handlerTrapFocus);
    } else {
      modal.addEventListener('keydown', handlerStickyFocus);
    }
  };

  const destroyTrapFocus = (modal) => {
    api.memory.focusable = null;
    api.memory.focusableFirst = null;
    api.memory.focusableLast = null;
    modal.removeEventListener('keydown', handlerTrapFocus);
    modal.removeEventListener('keydown', handlerStickyFocus);
  };

  const handlerTrapFocus = (event) => {
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

  const handlerStickyFocus = (event) => {
    const isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (isTab) event.preventDefault();
  };

  /**
   * Accessibility
   */

  const disableMain = () => {
    if (api.settings.selectorMain) {
      const content = document.querySelectorAll(api.settings.selectorMain);
      content.forEach((el) => {
        el.inert = true;
        el.setAttribute('aria-hidden', true);
      });
    }
  };

  const enableMain = () => {
    if (api.settings.selectorMain) {
      const content = document.querySelectorAll(api.settings.selectorMain);
      content.forEach((el) => {
        el.inert = null;
        el.removeAttribute('aria-hidden');
      });
    }
  };

  /**
   * Init and return
   */

  if (api.settings.autoInit) api.init();
  return api;
};
