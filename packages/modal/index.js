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
    focus: true
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

  const open = (modalKey, callback) => {
    const target = document.querySelector(
      `[data-${api.settings.dataModal}="${modalKey}"]`
    );
    if (target && !hasClass(target, api.settings.stateOpened)) {
      saveTarget(target);
      addClass(target, api.settings.stateOpening);
      removeClass(target, api.settings.stateClosed);
      target.addEventListener('transitionend', function _listener() {
        addClass(target, api.settings.stateOpened);
        removeClass(target, api.settings.stateOpening);
        setFocus(target);
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
        const customEvent = new CustomEvent(api.settings.customEventPrefix + 'opened', {
          bubbles: true
        });
        target.dispatchEvent(customEvent);
      }, true);
    }
  };

  const close = (focus = true, callback) => {
    const target = document.querySelector(
      `[data-${api.settings.dataModal}].${api.settings.stateOpened}`
    );
    if (target) {
      addClass(target, api.settings.stateClosing);
      removeClass(target, api.settings.stateOpened);
      target.addEventListener('transitionend', function _listener() {
        addClass(target, api.settings.stateClosed);
        removeClass(target, api.settings.stateClosing);
        if (focus) returnFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
        const customEvent = new CustomEvent(api.settings.customEventPrefix + 'closed', {
          bubbles: true
        });
        target.dispatchEvent(customEvent);
      }, true);
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
