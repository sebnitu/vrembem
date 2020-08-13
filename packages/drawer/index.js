import {
  addClass,
  breakpoints,
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
  api.focusTrap = new FocusTrap();

  const selectorTabindex = `[data-${api.settings.dataDrawer}] [data-${api.settings.dataDialog}]`;

  api.init = () => {
    stateSet();
    setTabindex(api.settings.setTabindex, selectorTabindex);
    api.breakpoint.init();
    document.addEventListener('click', handler, false);
    document.addEventListener('touchend', handler, false);
    document.addEventListener('keyup', handlerEscape, false);
  };

  api.destroy = () => {
    api.breakpoint.destroy();
    api.memory = {};
    api.state = {};
    localStorage.removeItem(api.settings.stateKey);
    document.removeEventListener('click', handler, false);
    document.removeEventListener('touchend', handler, false);
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

  /**
   * Helpers
   */

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

  api.setTabindex = (state = true) => {
    setTabindex(state, selectorTabindex);
  };

  /**
   * Transition functionality
   */

  api.open = async (drawerKey) => {
    const drawer = drawerKeyCheck(drawerKey);
    if (!drawer) return drawerNotFound(drawerKey);
    if (!hasClass(drawer, api.settings.stateOpened)) {
      working = true;
      const isModal = hasClass(drawer, api.settings.classModal);
      if (isModal) {
        setOverflowHidden(true, api.settings.selectorOverflow);
      }
      await transition.open(drawer, api.settings);
      stateSave(drawer);
      if (isModal) {
        api.focusTrap.init(drawer);
        setInert(true, api.settings.selectorInert);
      }
      focusTarget(drawer, api.settings);
      drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
      working = false;
      return drawer;
    } else {
      focusTarget(drawer, api.settings);
      return drawer;
    }
  };

  api.close = async (drawerKey) => {
    const drawer = drawerKeyCheck(drawerKey);
    if (!drawer) return drawerNotFound(drawerKey);
    if (hasClass(drawer, api.settings.stateOpened)) {
      working = true;
      if (hasClass(drawer, api.settings.classModal)) {
        setInert(false, api.settings.selectorInert);
        setOverflowHidden(false, api.settings.selectorOverflow);
      }
      await transition.close(drawer, api.settings);
      stateSave(drawer);
      focusTrigger(api);
      api.focusTrap.destroy();
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

  api.breakpoint.destroy = () => {
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

  api.breakpoint.check = (event = null) => {
    breakpointCheck(event);
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

  api.switchToModal = (drawerKey) => {
    const drawer = document.querySelector(
      `[data-${api.settings.dataDrawer}="${drawerKey}"]`
    );
    if (drawer) {
      switchToModal(drawer);
    }
  };

  const switchToDefault = (drawer) => {
    if (!hasClass(drawer, api.settings.classModal)) return;
    setInert(false, api.settings.selectorInert);
    setOverflowHidden(false, api.settings.selectorOverflow);
    removeClass(drawer, api.settings.classModal);
    api.focusTrap.destroy();
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

  api.switchToDefault = (drawerKey) => {
    const drawer = document.querySelector(
      `[data-${api.settings.dataDrawer}="${drawerKey}"]`
    );
    if (drawer) {
      switchToDefault(drawer);
    }
  };

  /**
   * Init and return
   */

  if (api.settings.autoInit) api.init();
  return api;
}
