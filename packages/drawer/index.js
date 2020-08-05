import {
  addClass,
  breakpoints,
  camelCase,
  hasClass,
  removeClass
} from '@vrembem/core';

export const Drawer = (options) => {

  const api = {};
  const defaults = {
    autoInit: false,

    // Data attributes
    dataDrawer: 'drawer',
    dataToggle: 'drawer-toggle',
    dataOpen: 'drawer-open',
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
    breakpoints: breakpoints,
    customEventPrefix: 'drawer:',
    focus: true,
    saveState: true,
    saveKey: 'DrawerState',
    transition: true
  };

  api.settings = { ...defaults, ...options };
  api.breakpoint = {};

  api.memoryTrigger;
  api.state = {};

  api.init = () => {
    setState();
    breakpointInit();
    document.addEventListener('click', handler, false);
    document.addEventListener('keyup', handlerEscape, false);
  };

  api.destroy = () => {
    breakpointDestroy();
    api.memoryTrigger = null;
    api.state = {};
    localStorage.removeItem(api.settings.saveKey);
    document.removeEventListener('click', handler, false);
    document.removeEventListener('keyup', handlerEscape, false);
  };

  const handler = (event) => {
    // Toggle data trigger
    let trigger = event.target.closest(`[data-${api.settings.dataToggle}]`);
    if (trigger) {
      const selector = trigger.dataset[camelCase(api.settings.dataToggle)];
      saveTrigger(trigger);
      api.toggle(selector);
      event.preventDefault();
      return;
    }

    // Open data trigger
    trigger = event.target.closest(`[data-${api.settings.dataOpen}]`);
    if (trigger) {
      const selector = trigger.dataset[camelCase(api.settings.dataOpen)];
      saveTrigger(trigger);
      api.open(selector);
      event.preventDefault();
      return;
    }

    // Close data trigger
    trigger = event.target.closest(`[data-${api.settings.dataClose}]`);
    if (trigger) {
      const selector = trigger.dataset[camelCase(api.settings.dataClose)];
      if (selector) {
        saveTrigger(trigger);
        api.close(selector);
      } else {
        const target = event.target.closest(`[data-${api.settings.dataDrawer}]`);
        if (target) api.close(target);
      }
      event.preventDefault();
      return;
    }

    // Screen modal trigger
    if (event.target.dataset[camelCase(api.settings.dataDrawer)]) {
      api.close(event.target);
      return;
    }
  };

  const handlerEscape = (event) => {
    if (event.keyCode == 27) {
      const target = document.querySelector(
        `.${api.settings.classModal}.${api.settings.stateOpened}`
      );
      if (target) {
        api.close(target);
      }
    }
  };

  const drawerKeyCheck = (drawerKey) => {
    if (typeof drawerKey === 'string') {
      return document.querySelector(
        `[data-${api.settings.dataDrawer}="${drawerKey}"]`
      );
    } else {
      return drawerKey;
    }
  };

  api.toggle = (drawerKey, callback) => {
    const drawer = drawerKeyCheck(drawerKey);
    if (drawer) {
      const isOpen = hasClass(drawer, api.settings.stateOpened);
      if (!isOpen) {
        api.open(drawer, callback);
      } else {
        api.close(drawer, callback);
      }
    }
  };

  /**
   * Transition functionality
   */

  const openTransition = (drawer) => {
    return new Promise((resolve) => {
      if (api.settings.transition) {
        removeClass(drawer, api.settings.stateClosed);
        addClass(drawer, api.settings.stateOpening);
        drawer.addEventListener('transitionend', function _f() {
          addClass(drawer, api.settings.stateOpened);
          removeClass(drawer, api.settings.stateOpening);
          resolve(drawer);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        addClass(drawer, api.settings.stateOpened);
        removeClass(drawer, api.settings.stateClosed);
        resolve(drawer);
      }
    });
  };

  const closeTransition = (drawer) => {
    return new Promise((resolve) => {
      if (api.settings.transition) {
        addClass(drawer, api.settings.stateClosing);
        removeClass(drawer, api.settings.stateOpened);
        drawer.addEventListener('transitionend', function _f() {
          removeClass(drawer, api.settings.stateClosing);
          addClass(drawer, api.settings.stateClosed);
          resolve(drawer);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        addClass(drawer, api.settings.stateClosed);
        removeClass(drawer, api.settings.stateOpened);
        resolve(drawer);
      }
    });
  };

  api.open = async (drawerKey, callback) => {
    const drawer = drawerKeyCheck(drawerKey);
    if (drawer && !hasClass(drawer, api.settings.stateOpened)) {
      await openTransition(drawer);
      saveState(drawer);
      focusDrawer(drawer);
      typeof callback === 'function' && callback();
      drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
    } else if (drawer && hasClass(drawer, api.settings.stateOpened)) {
      focusDrawer(drawer);
    }
  };

  api.close = async (drawerKey, callback) => {
    const drawer = drawerKeyCheck(drawerKey);
    if (drawer && hasClass(drawer, api.settings.stateOpened)) {
      await closeTransition(drawer);
      saveState(drawer);
      returnFocus();
      typeof callback === 'function' && callback();
      drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'closed', {
        bubbles: true
      }));
    }
  };

  /**
   * Focus functionality
   */

  const saveTrigger = (trigger) => {
    if (api.settings.focus) {
      api.memoryTrigger = trigger;
    }
  };

  const focusDrawer = (drawer) => {
    if (api.settings.focus) {
      const innerFocus = drawer.querySelector(
        `[data-${api.settings.dataFocus}]`
      );
      if (innerFocus) {
        innerFocus.focus();
      } else {
        drawer.focus();
      }
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

  const saveState = (target = null) => {
    if (api.settings.saveState) {
      const drawers = (target) ? [target] :
        document.querySelectorAll(`[data-${api.settings.dataDrawer}]`);
      drawers.forEach((el) => {
        if (!hasClass(el, api.settings.classModal)) {
          api.state[el.dataset[camelCase(api.settings.dataDrawer)]] =
            (hasClass(el, api.settings.stateOpened)) ?
              api.settings.stateOpened :
              api.settings.stateClosed;
        }
      });
      localStorage.setItem(api.settings.saveKey, JSON.stringify(api.state));
    }
  };

  const setState = () => {
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

  api.breakpoint.init = () => {
    breakpointInit();
  };

  api.breakpoint.destroy = () => {
    breakpointDestroy();
  };

  api.breakpoint.check = (event = null) => {
    breakpointCheck(event);
  };

  api.switchToModal = (drawerKey) => {
    const drawer = document.querySelector(
      `[data-${api.settings.dataDrawer}="${drawerKey}"]`
    );
    if (drawer) {
      switchToModal(drawer);
    }
  };

  api.switchToDefault = (drawerKey) => {
    const drawer = document.querySelector(
      `[data-${api.settings.dataDrawer}="${drawerKey}"]`
    );
    if (drawer) {
      switchToDefault(drawer);
    }
  };

  const breakpointInit = () => {
    api.mediaQueryLists = [];
    const drawers = document.querySelectorAll(`[data-${api.settings.dataBreakpoint}]`);
    drawers.forEach((drawer) => {
      const id = drawer.dataset[camelCase(api.settings.dataDrawer)];
      const key = drawer.dataset[camelCase(api.settings.dataBreakpoint)];
      const bp = api.settings.breakpoints[key] ? api.settings.breakpoints[key] : key;
      const mql = window.matchMedia('(min-width:' + bp + ')');
      breakpointMatch(mql, drawer);
      mql.addListener(breakpointCheck);
      api.mediaQueryLists.push({
        'mql': mql,
        'drawer': id
      });
    });
  };

  const breakpointDestroy = () => {
    if (api.mediaQueryLists && api.mediaQueryLists.length) {
      api.mediaQueryLists.forEach((item) => {
        item.mql.removeListener(breakpointCheck);
      });
    }
    api.mediaQueryLists = null;
  };

  const breakpointCheck = (event) => {
    if (api.mediaQueryLists && api.mediaQueryLists.length) {
      api.mediaQueryLists.forEach((item) => {
        // If an event is passed, filter out drawers that don't match the query
        // If event is null, run all drawers through breakpointMatch
        let filter = (event) ? event.media == item.mql.media : true;
        if (filter) {
          const drawer = document.querySelector(`[data-${api.settings.dataDrawer}="${item.drawer}"]`);
          if (drawer) {
            breakpointMatch(item.mql, drawer);
          }
        }
      });
      const customEvent = new CustomEvent(api.settings.customEventPrefix + 'breakpoint', {
        bubbles: true
      });
      document.dispatchEvent(customEvent);
    }
  };

  const breakpointMatch = (mql, drawer) => {
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
