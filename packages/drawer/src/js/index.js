import { setTabindex } from '@vrembem/core/index';
import { FocusTrap } from '@vrembem/core/index';

import defaults from './defaults';
import { Breakpoint } from './breakpoint';
import { close } from './close';
import { handlerClick, handlerKeydown } from './handlers';
import { getDrawer } from './helpers';
import { open } from './open';
import { stateClear, stateSave, stateSet } from './state';
import { switchToDefault, switchToModal } from './switchTo';
import { toggle } from './toggle';

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
    return getDrawer.call(this, drawerKey);
  }

  setTabindex() {
    return setTabindex(`
      [data-${this.settings.dataDrawer}]
      [data-${this.settings.dataDialog}]
    `);
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
    return switchToDefault.call(this, drawerKey);
  }

  switchToModal(drawerKey) {
    return switchToModal.call(this, drawerKey);
  }

  /**
   * Change state functionality
   */

  toggle(drawerKey) {
    return toggle.call(this, drawerKey);
  }

  open(drawerKey) {
    return open.call(this, drawerKey);
  }

  close(drawerKey) {
    return close.call(this, drawerKey);
  }
}
