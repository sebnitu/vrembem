import { addClass, removeClass } from '@vrembem/core';

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
    transition: true
  };

  let working = false;

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

  api.open = (modalKey) => {
    return open(modalKey);
  };

  api.close = (returnFocus) => {
    return close(returnFocus);
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

  const handler = async (event) => {
    // Working catch
    if (working) return;

    // Trigger click
    const trigger = event.target.closest(`[data-${api.settings.dataOpen}]`);
    if (trigger) {
      const modalKey = trigger.getAttribute(`data-${api.settings.dataOpen}`);
      const fromModal = event.target.closest(`[data-${api.settings.dataModal}]`);
      if (!fromModal) api.memory.trigger = trigger;
      await close(!fromModal);
      open(modalKey);
      event.preventDefault();
      return;
    }

    // Close click
    if (event.target.closest(`[data-${api.settings.dataClose}]`)) {
      close();
      event.preventDefault();
      return;
    }

    // Root click
    if (
      event.target.hasAttribute(`data-${api.settings.dataModal}`) &&
      !event.target.hasAttribute(`data-${api.settings.dataRequired}`)
    ) {
      close();
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
        close();
      }
    }
  };

  const setInitialState = () => {
    const modals = document.querySelectorAll(`[data-${api.settings.dataModal}]`);
    modals.forEach((el) => {
      if (el.classList.contains(api.settings.stateOpened)) {
        enableMain();
        setOverflow();
        focusTrigger();
        destroyTrapFocus(el);
      }
      removeClass(el,
        api.settings.stateOpened,
        api.settings.stateOpening,
        api.settings.stateClosing
      );
      addClass(el, api.settings.stateClosed);
    });
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

  const open = async (modalKey) => {
    const modal = document.querySelector(
      `[data-${api.settings.dataModal}="${modalKey}"].${api.settings.stateClosed}`
    );
    if (modal) {
      working = true;
      setOverflow('hidden');
      await openTransition(modal);
      initTrapFocus(modal);
      focusModal(modal);
      disableMain();
      modal.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
      working = false;
      return modal;
    } else {
      return modal;
    }
  };

  const close = async (returnFocus = true) => {
    const modal = document.querySelector(
      `[data-${api.settings.dataModal}].${api.settings.stateOpened}`
    );
    if (modal) {
      working = true;
      enableMain();
      setOverflow();
      await closeTransition(modal);
      if (returnFocus) focusTrigger();
      destroyTrapFocus(modal);
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

  const initTrapFocus = (modal) => {
    api.memory.focusable = getFocusable(modal);
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
