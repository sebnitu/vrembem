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

export default class Drawer {
  constructor(options) {
    this.defaults = {
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
    this.settings = { ...this.defaults, ...options };
    this.working = false;
    this.memory = {};
    this.state = {};
    this.breakpoint = {};
    this.focusTrap = new FocusTrap();
    this.selectorTabindex = `[data-${this.settings.dataDrawer}] [data-${this.settings.dataDialog}]`;

    this.handlerClick = this.handlerClick.bind(this);
    this.handlerKeyup = this.handlerKeyup.bind(this);
    this.breakpointCheck = this.breakpointCheck.bind(this);

    if (this.settings.autoInit) this.init();
  }

  init() {
    this.stateSet();
    this.setTabindex(this.settings.setTabindex, this.selectorTabindex);
    this.breakpointInit();
    document.addEventListener('click', this.handlerClick, false);
    document.addEventListener('touchend', this.handlerClick, false);
    document.addEventListener('keyup', this.handlerKeyup, false);
  }

  destroy() {
    this.breakpointDestroy();
    this.memory = {};
    this.state = {};
    localStorage.removeItem(this.settings.stateKey);
    document.removeEventListener('click', this.handlerClick, false);
    document.removeEventListener('touchend', this.handlerClick, false);
    document.removeEventListener('keyup', this.handlerKeyup, false);
  }

  handlerClick(event) {
    // Working catch
    if (this.working) return;

    // Toggle data trigger
    let trigger = event.target.closest(`[data-${this.settings.dataToggle}]`);
    if (trigger) {
      const selector = trigger.getAttribute(`data-${this.settings.dataToggle}`);
      this.memory.trigger = trigger;
      this.toggle(selector);
      event.preventDefault();
      return;
    }

    // Open data trigger
    trigger = event.target.closest(`[data-${this.settings.dataOpen}]`);
    if (trigger) {
      const selector = trigger.getAttribute(`data-${this.settings.dataOpen}`);
      this.memory.trigger = trigger;
      this.open(selector);
      event.preventDefault();
      return;
    }

    // Close data trigger
    trigger = event.target.closest(`[data-${this.settings.dataClose}]`);
    if (trigger) {
      const selector = trigger.getAttribute(`data-${this.settings.dataClose}`);
      if (selector) {
        this.memory.trigger = trigger;
        this.close(selector);
      } else {
        const target = event.target.closest(`[data-${this.settings.dataDrawer}]`);
        if (target) this.close(target);
      }
      event.preventDefault();
      return;
    }

    // Screen modal trigger
    if (event.target.hasAttribute(`data-${this.settings.dataDrawer}`)) {
      this.close(event.target);
      return;
    }
  }

  handlerKeyup(event) {
    // Working catch
    if (this.working) return;

    if (event.keyCode == 27) {
      const target = document.querySelector(
        `.${this.settings.classModal}.${this.settings.stateOpened}`
      );
      if (target) {
        this.close(target);
      }
    }
  }

  /**
   * Helpers
   */

  drawerKeyCheck(drawerKey) {
    if (typeof drawerKey === 'string') {
      return document.querySelector(
        `[data-${this.settings.dataDrawer}="${drawerKey}"]`
      );
    } else {
      return drawerKey;
    }
  }

  drawerNotFound(key) {
    return Promise.reject(
      new Error(`Did not find drawer with key: "${key}"`)
    );
  }

  setTabindex(state = true) {
    setTabindex(state, this.selectorTabindex);
  }

  /**
   * Transition functionality
   */

  async open(drawerKey) {
    const drawer = this.drawerKeyCheck(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    if (!hasClass(drawer, this.settings.stateOpened)) {
      this.working = true;
      const isModal = hasClass(drawer, this.settings.classModal);
      if (isModal) {
        setOverflowHidden(true, this.settings.selectorOverflow);
      }
      await transition.open(drawer, this.settings);
      this.stateSave(drawer);
      if (isModal) {
        this.focusTrap.init(drawer);
        setInert(true, this.settings.selectorInert);
      }
      focusTarget(drawer, this.settings);
      drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
        bubbles: true
      }));
      this.working = false;
      return drawer;
    } else {
      focusTarget(drawer, this.settings);
      return drawer;
    }
  }

  async close(drawerKey) {
    const drawer = this.drawerKeyCheck(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    if (hasClass(drawer, this.settings.stateOpened)) {
      this.working = true;
      if (hasClass(drawer, this.settings.classModal)) {
        setInert(false, this.settings.selectorInert);
        setOverflowHidden(false, this.settings.selectorOverflow);
      }
      await transition.close(drawer, this.settings);
      this.stateSave(drawer);
      focusTrigger(this);
      this.focusTrap.destroy();
      drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
        bubbles: true
      }));
      this.working = false;
      return drawer;
    } else {
      return drawer;
    }
  }

  toggle(drawerKey) {
    const drawer = this.drawerKeyCheck(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    const isOpen = hasClass(drawer, this.settings.stateOpened);
    if (!isOpen) {
      return this.open(drawer);
    } else {
      return this.close(drawer);
    }
  }

  /**
   * Save state functionality
   */

  stateSave(target = null) {
    if (this.settings.stateSave) {
      const drawers = (target) ? [target] :
        document.querySelectorAll(`[data-${this.settings.dataDrawer}]`);
      drawers.forEach((el) => {
        if (!hasClass(el, this.settings.classModal)) {
          this.state[el.getAttribute(`data-${this.settings.dataDrawer}`)] =
            (hasClass(el, this.settings.stateOpened)) ?
              this.settings.stateOpened :
              this.settings.stateClosed;
        }
      });
      localStorage.setItem(this.settings.stateKey, JSON.stringify(this.state));
    }
  }

  stateSet() {
    if (this.settings.stateSave) {
      if (localStorage.getItem(this.settings.stateKey)) {
        this.state = JSON.parse(localStorage.getItem(this.settings.stateKey));
        Object.keys(this.state).forEach((key) => {
          const item = document.querySelector(
            `[data-${this.settings.dataDrawer}="${key}"]`
          );
          if (item) {
            if (this.state[key] == this.settings.stateOpened) {
              addClass(item, this.settings.stateOpened);
            } else {
              removeClass(item, this.settings.stateOpened);
            }
          }
        });
      } else {
        this.stateSave();
      }
    } else {
      if (localStorage.getItem(this.settings.stateKey)) {
        localStorage.removeItem(this.settings.stateKey);
      }
    }
  }

  /**
   * Breakpoint functionality
   */

  breakpointInit() {
    this.mediaQueryLists = [];
    const drawers = document.querySelectorAll(`[data-${this.settings.dataBreakpoint}]`);
    drawers.forEach((drawer) => {
      const id = drawer.getAttribute(`data-${this.settings.dataDrawer}`);
      const key = drawer.getAttribute(`data-${this.settings.dataBreakpoint}`);
      const bp = this.settings.breakpoints[key] ? this.settings.breakpoints[key] : key;
      const mql = window.matchMedia('(min-width:' + bp + ')');
      this.breakpointMatch(mql, drawer);
      mql.addListener(this.breakpointCheck);
      this.mediaQueryLists.push({
        'mql': mql,
        'drawer': id
      });
    });
  }

  breakpointDestroy() {
    if (this.mediaQueryLists && this.mediaQueryLists.length) {
      this.mediaQueryLists.forEach((item) => {
        item.mql.removeListener(this.breakpointCheck);
      });
    }
    this.mediaQueryLists = null;
  }

  breakpointCheck(event = null) {
    if (this.mediaQueryLists && this.mediaQueryLists.length) {
      this.mediaQueryLists.forEach((item) => {
        // If an event is passed, filter out drawers that don't match the query
        // If event is null, run all drawers through breakpointMatch
        let filter = (event) ? event.media == item.mql.media : true;
        if (filter) {
          const drawer = document.querySelector(`[data-${this.settings.dataDrawer}="${item.drawer}"]`);
          if (drawer) {
            this.breakpointMatch(item.mql, drawer);
          }
        }
      });
      document.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'breakpoint', {
        bubbles: true
      }));
    }
  }

  breakpointMatch(mql, drawer) {
    if (mql.matches) {
      this.switchToDefault(drawer);
    } else {
      this.switchToModal(drawer);
    }
  }

  switchToModal(drawerKey) {
    const drawer = this.drawerKeyCheck(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    if (hasClass(drawer, this.settings.classModal)) return;
    addClass(drawer, this.settings.classModal);
    addClass(drawer, this.settings.stateClosed);
    removeClass(drawer, this.settings.stateOpened);
    drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'toModal', {
      bubbles: true
    }));
  }

  switchToDefault(drawerKey) {
    const drawer = this.drawerKeyCheck(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    if (!hasClass(drawer, this.settings.classModal)) return;
    setInert(false, this.settings.selectorInert);
    setOverflowHidden(false, this.settings.selectorOverflow);
    removeClass(drawer, this.settings.classModal);
    this.focusTrap.destroy();
    drawerKey = drawer.getAttribute(`data-${this.settings.dataDrawer}`);
    const drawerState = this.state[drawerKey];
    if (drawerState == this.settings.stateOpened) {
      addClass(drawer, this.settings.stateOpened);
      removeClass(drawer, this.settings.stateClosed);
    }
    drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'toDefault', {
      bubbles: true
    }));
  }
}
