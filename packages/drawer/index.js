import {
  addClass,
  breakpoints,
  camelCase,
  hasClass,
  removeClass
} from '@vrembem/core';

export const Drawer = (options) => {

  let api = {};
  const defaults = {
    autoInit: false,

    // Data attributes
    dataDrawer: 'drawer',
    dataToggle: 'drawer-toggle',
    dataClose: 'drawer-close',
    dataBreakpoint: 'drawer-breakpoint',
    dataFocus: 'drawer-focus',

    // State classes
    stateOpened: 'is-opened',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',

    // Classes
    classModal: 'drawer_modal',

    // Feature toggles
    customEventPrefix: 'drawer:',
    breakpoints: breakpoints,
    focus: true,
    saveState: true,
    saveKey: 'DrawerState'
  };

  api.settings = { ...defaults, ...options };
  api.breakpoint = {};

  api.memoryTrigger;
  api.memoryTarget;
  api.state = {};

  api.init = () => {
    applyState();
    breakpointInit();
    document.addEventListener('click', run, false);
    document.addEventListener('touchend', run, false);
    document.addEventListener('keyup', escape, false);
  };

  api.destroy = () => {
    breakpointDestroy();
    api.memoryTrigger = null;
    api.memoryTarget = null;
    api.state = {};
    localStorage.removeItem(api.settings.saveKey);
    document.removeEventListener('click', run, false);
    document.removeEventListener('touchend', run, false);
    document.removeEventListener('keyup', escape, false);
  };

  api.toggle = (drawerKey, callback) => {
    toggle(drawerKey, callback);
  };

  api.open = (drawerKey, callback) => {
    const drawer = document.querySelector(
      `[data-${api.settings.dataDrawer}="${drawerKey}"]`
    );
    if (drawer) {
      open(drawer, callback);
    }
  };

  api.close = (drawerKey, callback) => {
    const drawer = document.querySelector(
      `[data-${api.settings.dataDrawer}="${drawerKey}"]`
    );
    if (drawer) {
      close(drawer, callback);
    }
  };

  api.breakpoint.init = () => {
    breakpointInit();
  };

  api.breakpoint.destroy = () => {
    breakpointDestroy();
  };

  api.breakpoint.check = () => {
    breakpointCheck();
  };

  api.switchToModal = (drawer) => {
    switchToModal(drawer);
  };

  api.switchToDefault = (drawer) => {
    switchToDefault(drawer);
  };

  const run = (event) => {
    // Trigger click
    let trigger = event.target.closest(`[data-${api.settings.dataToggle}]`);
    if (trigger) {
      const selector = trigger.dataset[camelCase(api.settings.dataToggle)];
      saveTrigger(trigger);
      toggle(selector);
      event.preventDefault();
    } else {
      // Close click
      trigger = event.target.closest(`[data-${api.settings.dataClose}]`);
      if (trigger) {
        const target = event.target.closest(`[data-${api.settings.dataDrawer}]`);
        close(target);
        event.preventDefault();
      }
      // Root click
      if (event.target.dataset[camelCase(api.settings.dataDrawer)]) {
        close(event.target);
      }
    }
  };

  const escape = (event) => {
    if (event.keyCode == 27) {
      const target = document.querySelector(
        `.${api.settings.classModal}.${api.settings.stateOpened}`
      );
      if (target) {
        close(target);
      }
    }
  };

  const toggle = (drawerKey, callback) => {
    const drawer = document.querySelector(
      `[data-${api.settings.dataDrawer}="${drawerKey}"]`
    );
    if (drawer) {
      const isOpen = hasClass(drawer, api.settings.stateOpened);
      if (!isOpen) {
        open(drawer, callback);
      } else {
        close(drawer, callback);
      }
    }
  };

  const open = (drawer, callback) => {
    if (!hasClass(drawer, api.settings.stateOpened)) {
      saveTarget(drawer);
      addClass(drawer, api.settings.stateOpening);
      removeClass(drawer, api.settings.stateClosed);
      drawer.addEventListener('transitionend', function _listener() {
        addClass(drawer, api.settings.stateOpened);
        removeClass(drawer, api.settings.stateOpening);
        saveState(drawer);
        setFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
        const customEvent = new CustomEvent(api.settings.customEventPrefix + 'opened', {
          bubbles: true
        });
        drawer.dispatchEvent(customEvent);
      }, true);
    }
  };

  const close = (drawer, callback) => {
    if (hasClass(drawer, api.settings.stateOpened)) {
      addClass(drawer, api.settings.stateClosing);
      removeClass(drawer, api.settings.stateOpened);
      drawer.addEventListener('transitionend', function _listener() {
        addClass(drawer, api.settings.stateClosed);
        removeClass(drawer, api.settings.stateClosing);
        saveState(drawer);
        returnFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
        const customEvent = new CustomEvent(api.settings.customEventPrefix + 'closed', {
          bubbles: true
        });
        drawer.dispatchEvent(customEvent);
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

  /**
   * Save state functionality
   */

  const saveState = (target = false) => {
    if (api.settings.saveState) {
      const drawers = (!target) ?
        document.querySelectorAll(`[data-${api.settings.dataDrawer}]`):
        (target.forEach) ? target : [target];
      drawers.forEach((el) => {
        if (!hasClass(el, api.settings.classModal)) {
          api.state[el.dataset[camelCase(api.settings.dataDrawer)]] =
            (hasClass(el, api.settings.stateOpened)) ?
              api.settings.stateOpened:
              api.settings.stateClosed;
        }
      });
      localStorage.setItem(api.settings.saveKey, JSON.stringify(api.state));
    }
  };

  const applyState = () => {
    if (api.settings.saveState) {
      if (localStorage.getItem(api.settings.saveKey)) {
        api.state = JSON.parse(localStorage.getItem(api.settings.saveKey));
        Object.keys(api.state).forEach((key) => {
          const item = document.querySelector(
            `[data-${api.settings.dataDrawer}="${key}"]`
          );
          if (item) {
            if (api.state[key] == api.settings.stateOpened) {
              addClass(item, api.settings.stateOpened);
            } else {
              removeClass(item, api.settings.stateOpened);
            }
          }
        });
      } else {
        saveState();
      }
    } else {
      if (localStorage.getItem(api.settings.saveKey)) {
        localStorage.removeItem(api.settings.saveKey);
      }
    }
  };

  /**
   * Breakpoint functionality
   */

  const breakpointInit = () => {
    api.mediaQueryLists = [];
    const drawers = document.querySelectorAll(`[data-${api.settings.dataBreakpoint}]`);
    if (drawers) {
      drawers.forEach((drawer) => {
        const key = drawer.dataset[camelCase(api.settings.dataBreakpoint)];
        const bp = api.settings.breakpoints[key] ? api.settings.breakpoints[key] : key;
        const mql = window.matchMedia( '(min-width:' + bp + ')' );
        breakpointToggle(mql, drawer);
        mql.addListener(breakpointMatch);
        api.mediaQueryLists.push({
          'mql': mql,
          'drawer': drawer
        });
      });
    }
  };

  const breakpointDestroy = () => {
    if (api.mediaQueryLists && api.mediaQueryLists.length) {
      api.mediaQueryLists.forEach((item) => {
        item.mql.removeListener(breakpointMatch);
      });
    }
    api.mediaQueryLists = null;
  };

  const breakpointMatch = (event) => {
    api.mediaQueryLists.forEach((item) => {
      if (event.media == item.mql.media) {
        breakpointToggle(item.mql, item.drawer);
      }
    });
    const customEvent = new CustomEvent(api.settings.customEventPrefix + 'breakpoint', {
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  };

  const breakpointCheck = () => {
    api.mediaQueryLists.forEach((item) => {
      breakpointToggle(item.mql, item.drawer);
    });
    const customEvent = new CustomEvent(api.settings.customEventPrefix + 'breakpoint', {
      bubbles: true
    });
    document.dispatchEvent(customEvent);
  };

  const breakpointToggle = (mql, drawer) => {
    if (mql.matches) {
      switchToDefault(drawer);
    } else {
      switchToModal(drawer);
    }
  };

  const switchToModal = (drawer) => {
    addClass(drawer, api.settings.classModal);
    addClass(drawer, api.settings.stateClosed);
    removeClass(drawer, api.settings.stateOpened);
    const customEvent = new CustomEvent(api.settings.customEventPrefix + 'toModal', {
      bubbles: true
    });
    drawer.dispatchEvent(customEvent);
  };

  const switchToDefault = (drawer) => {
    removeClass(drawer, api.settings.classModal);
    const drawerKey = drawer.dataset[camelCase(api.settings.dataDrawer)];
    const drawerState = api.state[drawerKey];
    if (drawerState == api.settings.stateOpened) {
      addClass(drawer, api.settings.stateOpened);
      removeClass(drawer, api.settings.stateClosed);
    }
    const customEvent = new CustomEvent(api.settings.customEventPrefix + 'toDefault', {
      bubbles: true
    });
    drawer.dispatchEvent(customEvent);
  };

  if (api.settings.autoInit) api.init();
  return api;
};
