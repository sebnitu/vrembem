import {
  addClass,
  breakpoints,
  hasClass,
  removeClass
} from '@vrembem/core';

export const Drawer = (options) => {

  const api = {};
  const defaults = {
    autoInit: false,

    // Data attributes
    dataDrawer: 'drawer',
    dataDialog: 'drawer-dialog',
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

    // Selectors
    selectorInert: null,
    selectorOverflow: null,

    // Feature toggles
    breakpoints: breakpoints,
    customEventPrefix: 'drawer:',
    stateSave: true,
    stateKey: 'DrawerState',
    setTabindex: true,
    transition: true
  };

  let working = false;

  api.settings = { ...defaults, ...options };
  api.memory = {};
  api.state = {};
  api.breakpoint = {};

  api.init = () => {
    stateSet();
    setTabindex();
    breakpointInit();
    document.addEventListener('click', handler, false);
    document.addEventListener('keyup', handlerEscape, false);
  };

  api.destroy = () => {
    breakpointDestroy();
    api.memory = {};
    api.state = {};
    localStorage.removeItem(api.settings.stateKey);
    document.removeEventListener('click', handler, false);
    document.removeEventListener('keyup', handlerEscape, false);
  };

  const handler = (event) => {
    // Working catch
    if (working) return;

    // Toggle data trigger
    let trigger = event.target.closest(`[data-${api.settings.dataToggle}]`);
    if (trigger) {
      const selector = trigger.getAttribute(`data-${api.settings.dataToggle}`);
      api.memory.trigger = trigger;
      api.toggle(selector);
      event.preventDefault();
      return;
    }

    // Open data trigger
    trigger = event.target.closest(`[data-${api.settings.dataOpen}]`);
    if (trigger) {
      const selector = trigger.getAttribute(`data-${api.settings.dataOpen}`);
      api.memory.trigger = trigger;
      api.open(selector);
      event.preventDefault();
      return;
    }

    // Close data trigger
    trigger = event.target.closest(`[data-${api.settings.dataClose}]`);
    if (trigger) {
      const selector = trigger.getAttribute(`data-${api.settings.dataClose}`);
      if (selector) {
        api.memory.trigger = trigger;
        api.close(selector);
      } else {
        const target = event.target.closest(`[data-${api.settings.dataDrawer}]`);
        if (target) api.close(target);
      }
      event.preventDefault();
      return;
    }

    // Screen modal trigger
    if (event.target.hasAttribute(`data-${api.settings.dataDrawer}`)) {
      api.close(event.target);
      return;
    }
  };

  const handlerEscape = (event) => {
    // Working catch
    if (working) return;

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

  const drawerNotFound = (key) => {
    return Promise.reject(
      new Error(`Did not find drawer with key: "${key}"`)
    );
  };

  const setTabindex = (enable = api.settings.setTabindex) => {
    if (enable) {
      const drawers = document.querySelectorAll(
        `[data-${api.settings.dataDrawer}] [data-${api.settings.dataDialog}]`
      );
      drawers.forEach((el) => {
        el.setAttribute('tabindex', '-1');
      });
    }
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

  api.open = async (drawerKey) => {
    const drawer = drawerKeyCheck(drawerKey);
    if (!drawer) return drawerNotFound(drawerKey);
    if (!hasClass(drawer, api.settings.stateOpened)) {
      working = true;
      const isModal = hasClass(drawer, api.settings.classModal);
      if (isModal) {
        setOverflowHidden(true);
      }
      await openTransition(drawer);
      stateSave(drawer);
      if (isModal) {
        focusTrapInit(drawer);
        setInert(true);
      }
      focusDrawer(drawer);
      drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
      working = false;
      return drawer;
    } else if (drawer && hasClass(drawer, api.settings.stateOpened)) {
      focusDrawer(drawer);
      return drawer;
    }
  };

  api.close = async (drawerKey) => {
    const drawer = drawerKeyCheck(drawerKey);
    if (!drawer) return drawerNotFound(drawerKey);
    if (hasClass(drawer, api.settings.stateOpened)) {
      working = true;
      if (hasClass(drawer, api.settings.classModal)) {
        setInert(false);
        setOverflowHidden(false);
      }
      await closeTransition(drawer);
      stateSave(drawer);
      focusTrigger();
      focusTrapDestroy(drawer);
      drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'closed', {
        bubbles: true
      }));
      working = false;
      return drawer;
    } else {
      return drawer;
    }
  };

  api.toggle = (drawerKey) => {
    const drawer = drawerKeyCheck(drawerKey);
    if (!drawer) return drawerNotFound(drawerKey);
    const isOpen = hasClass(drawer, api.settings.stateOpened);
    if (!isOpen) {
      return api.open(drawer);
    } else {
      return api.close(drawer);
    }
  };

  /**
   * Focus functionality
   */

  const focusDrawer = (drawer) => {
    const innerFocus = drawer.querySelector(
      `[data-${api.settings.dataFocus}]`
    );
    if (innerFocus) {
      innerFocus.focus();
    } else {
      const item = drawer.querySelector(
        `[data-${api.settings.dataDialog}][tabindex="-1"]`
      );
      if (item) {
        item.focus();
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

  const getFocusable = (drawer) => {
    const focusable = [];
    const items = drawer.querySelectorAll(`
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

  const focusTrapInit = (drawer) => {
    api.memory.focusable = getFocusable(drawer);
    if (api.memory.focusable.length) {
      api.memory.focusableFirst = api.memory.focusable[0];
      api.memory.focusableLast = api.memory.focusable[api.memory.focusable.length - 1];
      drawer.addEventListener('keydown', handlerFocusTrap);
    } else {
      drawer.addEventListener('keydown', handlerFocusLock);
    }
  };

  const focusTrapDestroy = (drawer) => {
    api.memory.focusable = null;
    api.memory.focusableFirst = null;
    api.memory.focusableLast = null;
    drawer.removeEventListener('keydown', handlerFocusTrap);
    drawer.removeEventListener('keydown', handlerFocusLock);
  };

  const handlerFocusTrap = (event) => {
    const isTab = (event.key === 'Tab' || event.keyCode === 9);
    if (!isTab) return;

    if (event.shiftKey) {
      const dialog = document.querySelector(`
        [data-${api.settings.dataDrawer}].${api.settings.stateOpened}
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
   * Save state functionality
   */

  const stateSave = (target = null) => {
    if (api.settings.stateSave) {
      const drawers = (target) ? [target] :
        document.querySelectorAll(`[data-${api.settings.dataDrawer}]`);
      drawers.forEach((el) => {
        if (!hasClass(el, api.settings.classModal)) {
          api.state[el.getAttribute(`data-${api.settings.dataDrawer}`)] =
            (hasClass(el, api.settings.stateOpened)) ?
              api.settings.stateOpened :
              api.settings.stateClosed;
        }
      });
      localStorage.setItem(api.settings.stateKey, JSON.stringify(api.state));
    }
  };

  const stateSet = () => {
    if (api.settings.stateSave) {
      if (localStorage.getItem(api.settings.stateKey)) {
        api.state = JSON.parse(localStorage.getItem(api.settings.stateKey));
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
        stateSave();
      }
    } else {
      if (localStorage.getItem(api.settings.stateKey)) {
        localStorage.removeItem(api.settings.stateKey);
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
      const id = drawer.getAttribute(`data-${api.settings.dataDrawer}`);
      const key = drawer.getAttribute(`data-${api.settings.dataBreakpoint}`);
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
      document.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'breakpoint', {
        bubbles: true
      }));
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
    if (hasClass(drawer, api.settings.classModal)) return;
    addClass(drawer, api.settings.classModal);
    addClass(drawer, api.settings.stateClosed);
    removeClass(drawer, api.settings.stateOpened);
    drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'toModal', {
      bubbles: true
    }));
  };

  const switchToDefault = (drawer) => {
    if (!hasClass(drawer, api.settings.classModal)) return;
    setInert(false);
    setOverflowHidden(false);
    removeClass(drawer, api.settings.classModal);
    focusTrapDestroy(drawer);
    const drawerKey = drawer.getAttribute(`data-${api.settings.dataDrawer}`);
    const drawerState = api.state[drawerKey];
    if (drawerState == api.settings.stateOpened) {
      addClass(drawer, api.settings.stateOpened);
      removeClass(drawer, api.settings.stateClosed);
    }
    drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'toDefault', {
      bubbles: true
    }));
  };

  /**
   * Init and return
   */

  if (api.settings.autoInit) api.init();
  return api;
};
