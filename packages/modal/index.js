import { addClass, camelCase, hasClass, removeClass } from '@vrembem/core';

export const Modal = (options) => {

  let api = {};
  const defaults = {
    autoInit: false,

    // Data attributes
    dataModal: 'modal',
    dataOpen: 'modal-open',
    dataClose: 'modal-close',
    dataFocus: 'modal-focus',
    dataRequired: 'modal-required',

    // State classes
    stateOpened: 'is-opened',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',

    // Feature toggles
    customEventPrefix: 'modal:',
    focus: true,
    toggleOverflow: 'body',
    transition: true
  };

  api.settings = { ...defaults, ...options };

  api.memoryTrigger = null;
  api.memoryTarget = null;

  api.init = () => {
    document.addEventListener('click', run, false);
    document.addEventListener('touchend', run, false);
    document.addEventListener('keyup', escape, false);
  };

  api.destroy = () => {
    api.memoryTrigger = null;
    api.memoryTarget = null;
    document.removeEventListener('click', run, false);
    document.removeEventListener('touchend', run, false);
    document.removeEventListener('keyup', escape, false);
  };

  api.open = (modalKey, callback) => {
    open(modalKey, callback);
  };

  api.close = (returnFocus, callback) => {
    close(returnFocus, callback);
  };

  const run = (event) => {
    // Trigger click
    const trigger = event.target.closest(`[data-${api.settings.dataOpen}]`);
    if (trigger) {
      const targetData = trigger.dataset[camelCase(api.settings.dataOpen)];
      const fromModal = event.target.closest(
        `[data-${api.settings.dataModal}]`
      );
      if (!fromModal) saveTrigger(trigger);
      close(!fromModal);
      open(targetData);
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

  const escape = (event) => {
    if (event.keyCode == 27) {
      const target = document.querySelector(
        `[data-${api.settings.dataModal}].${api.settings.stateOpened}`
      );
      if (target && !target.hasAttribute(`data-${api.settings.dataRequired}`)) {
        close();
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

  const openTransition = (modal) => {
    return new Promise((resolve) => {
      addClass(modal, api.settings.stateOpening);
      removeClass(modal, api.settings.stateClosed);
      modal.addEventListener('transitionend', function _listener() {
        addClass(modal, api.settings.stateOpened);
        removeClass(modal, api.settings.stateOpening);
        this.removeEventListener('transitionend', _listener, true);
        resolve();
      }, true);
    });
  };

  const open = async (modalKey, callback) => {
    const target = document.querySelector(
      `[data-${api.settings.dataModal}="${modalKey}"]`
    );
    if (target && !hasClass(target, api.settings.stateOpened)) {
      setOverflow('hidden');
      saveTarget(target);
      if (api.settings.transition) {
        await openTransition(target);
      } else {
        addClass(target, api.settings.stateOpened);
        removeClass(target, api.settings.stateClosed);
      }
      setFocus(target);
      typeof callback === 'function' && callback();
      target.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
    }
  };

  const closeTransition = (modal) => {
    return new Promise((resolve) => {
      addClass(modal, api.settings.stateClosing);
      removeClass(modal, api.settings.stateOpened);
      modal.addEventListener('transitionend', function _listener() {
        addClass(modal, api.settings.stateClosed);
        removeClass(modal, api.settings.stateClosing);
        this.removeEventListener('transitionend', _listener, true);
        resolve();
      }, true);
    });
  };

  const close = async (focus = true, callback) => {
    const target = document.querySelector(
      `[data-${api.settings.dataModal}].${api.settings.stateOpened}`
    );
    if (target) {
      setOverflow();
      if (api.settings.transition) {
        await closeTransition(target);
      } else {
        addClass(target, api.settings.stateClosed);
        removeClass(target, api.settings.stateOpened);
      }
      if (focus) returnFocus();
      typeof callback === 'function' && callback();
      target.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'closed', {
        bubbles: true
      }));
    }
  };

  /**
   * Focus functionality
   */

  const saveTarget = (target) => {
    if (api.settings.focus) {
      api.memoryTarget = target;
    }
  };

  const saveTrigger = (trigger) => {
    if (api.settings.focus) {
      api.memoryTrigger = trigger;
    }
  };

  const setFocus = () => {
    if (api.settings.focus && api.memoryTarget) {
      const innerFocus = api.memoryTarget.querySelector(
        `[data-${api.settings.dataFocus}]`
      );
      if (innerFocus) {
        innerFocus.focus();
      } else {
        api.memoryTarget.focus();
      }
      api.memoryTarget = null;
    }
  };

  const returnFocus = () => {
    if (api.settings.focus && api.memoryTrigger) {
      api.memoryTrigger.focus();
      api.memoryTrigger = null;
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};
