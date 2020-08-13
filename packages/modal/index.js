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

export default function (options) {

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
  api.focusTrap = new FocusTrap();

  const selectorTabindex = `[data-${api.settings.dataModal}] [data-${api.settings.dataDialog}]`;

  api.init = () => {
    moveModals();
    setTabindex(api.settings.setTabindex, selectorTabindex);
    setInitialState();
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

  const setInitialState = () => {
    const modals = document.querySelectorAll(`[data-${api.settings.dataModal}]`);
    modals.forEach((el) => {
      if (el.classList.contains(api.settings.stateOpened)) {
        setInert(false, api.settings.selectorInert);
        setOverflowHidden(false, api.settings.selectorOverflow);
        focusTrigger(api);
        api.focusTrap.destroy();
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

  api.setTabindex = (state = true) => {
    setTabindex(state, selectorTabindex);
  };

  /**
   * Transition functionality
   */

  api.open = async (modalKey) => {
    const modal = document.querySelector(
      `[data-${api.settings.dataModal}="${modalKey}"]`
    );
    if (!modal) return modalNotFound(modalKey);
    if (hasClass(modal, api.settings.stateClosed)) {
      working = true;
      setOverflowHidden(true, api.settings.selectorOverflow);
      await transition.open(modal, api.settings);
      api.focusTrap.init(modal);
      focusTarget(modal, api.settings);
      setInert(true, api.settings.selectorInert);
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
      setInert(false, api.settings.selectorInert);
      setOverflowHidden(false, api.settings.selectorOverflow);
      await transition.close(modal, api.settings);
      if (returnFocus) focusTrigger(api);
      api.focusTrap.destroy();
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
   * Init and return
   */

  if (api.settings.autoInit) api.init();
  return api;
}
