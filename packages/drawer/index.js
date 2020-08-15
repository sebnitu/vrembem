import { addClass, hasClass, removeClass } from '@vrembem/core';
import { setInert, setOverflowHidden, setTabindex } from '@vrembem/core';
import { FocusTrap, focusTarget, focusTrigger } from '@vrembem/core';
import { openTransition, closeTransition } from '@vrembem/core';

import { defaults } from './src/js/defaults';
import { handlerClick, handlerKeyup } from './src/js/handlers';

export default class Drawer {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.working = false;
    this.memory = {};
    this.state = {};
    this.breakpoint = {};
    this.focusTrap = new FocusTrap();
    this.selectorTabindex = `[data-${this.settings.dataDrawer}] [data-${this.settings.dataDialog}]`;
    this.breakpointCheck = this.breakpointCheck.bind(this);
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };
    this.stateSet();
    this.setTabindex(this.settings.setTabindex, this.selectorTabindex);
    this.breakpointInit();
    document.addEventListener('click', this.__handlerClick, false);
    document.addEventListener('touchend', this.__handlerClick, false);
    document.addEventListener('keyup', this.__handlerKeyup, false);
  }

  destroy() {
    this.breakpointDestroy();
    this.memory = {};
    this.state = {};
    localStorage.removeItem(this.settings.stateKey);
    document.removeEventListener('click', this.__handlerClick, false);
    document.removeEventListener('touchend', this.__handlerClick, false);
    document.removeEventListener('keyup', this.__handlerKeyup, false);
  }

  /**
   * Helpers
   */

  getDrawer(drawerKey) {
    if (typeof drawerKey !== 'string') return drawerKey;
    return document.querySelector(
      `[data-${this.settings.dataDrawer}="${drawerKey}"]`
    );
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
   * Change state functionality
   */

  async open(drawerKey) {
    const drawer = this.getDrawer(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    if (!hasClass(drawer, this.settings.stateOpened)) {
      this.working = true;
      const isModal = hasClass(drawer, this.settings.classModal);
      if (isModal) {
        setOverflowHidden(true, this.settings.selectorOverflow);
      }
      await openTransition(drawer, this.settings);
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
    const drawer = this.getDrawer(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    if (hasClass(drawer, this.settings.stateOpened)) {
      this.working = true;
      if (hasClass(drawer, this.settings.classModal)) {
        setInert(false, this.settings.selectorInert);
        setOverflowHidden(false, this.settings.selectorOverflow);
      }
      await closeTransition(drawer, this.settings);
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
    const drawer = this.getDrawer(drawerKey);
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
    const drawer = this.getDrawer(drawerKey);
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
    const drawer = this.getDrawer(drawerKey);
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
