import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden, setTabindex } from '@vrembem/core/index';
import { FocusTrap, focusTarget, focusTrigger } from '@vrembem/core/index';
import { openTransition, closeTransition } from '@vrembem/core/index';

import defaults from './src/js/defaults';
import { Breakpoint } from './src/js/breakpoint';
import { handlerClick, handlerKeydown } from './src/js/handlers';
import { stateClear, stateSave, stateSet } from './src/js/state';
import { switchToDefault, switchToModal } from './src/js/switchTo';

export default class Drawer {
  constructor(options) {
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.working = false;
    this.memory = {};
    this.state = {};
    this.focusTrap = new FocusTrap();
    this.breakpoint = new Breakpoint(this);
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  init(options = null) {
    if (options) this.settings = { ...this.settings, ...options };
    this.stateSet();
    if (this.settings.setTabindex) {
      this.setTabindex();
    }
    this.breakpoint.init();
    if (this.settings.eventListeners) {
      this.initEventListeners();
    }
  }

  destroy() {
    this.breakpoint.destroy();
    this.memory = {};
    this.state = {};
    localStorage.removeItem(this.settings.stateKey);
    if (this.settings.eventListeners) {
      this.destroyEventListeners();
    }
  }

  /**
   * Event listeners
   */

  initEventListeners() {
    document.addEventListener('click', this.__handlerClick, false);
    document.addEventListener('touchend', this.__handlerClick, false);
    document.addEventListener('keydown', this.__handlerKeydown, false);
  }

  destroyEventListeners() {
    document.removeEventListener('click', this.__handlerClick, false);
    document.removeEventListener('touchend', this.__handlerClick, false);
    document.removeEventListener('keydown', this.__handlerKeydown, false);
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

  setTabindex() {
    const selectorTabindex = `
      [data-${this.settings.dataDrawer}]
      [data-${this.settings.dataDialog}]
    `;
    setTabindex(selectorTabindex);
  }

  /**
   * Save state functionality
   */

  stateSet() {
    this.state = stateSet(this.settings);
  }

  stateSave(target = null) {
    this.state = stateSave(target, this.settings);
  }

  stateClear() {
    this.state = stateClear(this.settings);
  }

  /**
   * SwitchTo functionality
   */

  switchToDefault(drawerKey) {
    return switchToDefault(drawerKey, this);
  }

  switchToModal(drawerKey) {
    return switchToModal(drawerKey, this);
  }

  /**
   * Change state functionality
   */

  async toggle(drawerKey) {
    const drawer = this.getDrawer(drawerKey);
    if (!drawer) return this.drawerNotFound(drawerKey);
    const isClosed = !hasClass(drawer, this.settings.stateOpened);
    if (isClosed) {
      return this.open(drawer);
    } else {
      return this.close(drawer);
    }
  }

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
        detail: this,
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
        detail: this,
        bubbles: true
      }));
      this.working = false;
      return drawer;
    } else {
      return drawer;
    }
  }
}
