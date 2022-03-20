import { Collection, FocusTrap } from '@vrembem/core/index';

import defaults from './defaults';
import { Breakpoint } from './breakpoint';
import { handlerClick, handlerKeydown } from './handlers';
import { register } from './register';
import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { toggle } from './toggle';
import { getDrawer, getDrawerID, getDrawerElements } from './helpers';
import { stateClear, stateSave, stateSet } from './state';
import { switchToDefault, switchToModal } from './switchTo';

export default class Drawer extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.memory = {};
    this.focusTrap = new FocusTrap();

    // TODO: refactor breakpoint functionality
    this.breakpoint = new Breakpoint(this);

    // TODO: refactor to local storage feature functionality
    this.state = {};

    // TODO: remove global working state
    this.working = false;

    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  async init(options = null) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

    // TODO: refactor to local storage feature functionality
    this.stateSet();

    // TODO: refactor breakpoint functionality
    this.breakpoint.init();

    // Get all the modals.
    const drawers = document.querySelectorAll(this.settings.selectorDrawer);

    // Register the collections array with modal instances.
    await this.registerCollection(drawers);

    // If eventListeners are enabled, init event listeners.
    if (this.settings.eventListeners) {
      this.initEventListeners();
    }

    return this;
  }

  async destroy() {
    // Clear any stored memory.
    this.memory = {};

    // TODO: refactor breakpoint functionality
    this.breakpoint.destroy();

    // TODO: refactor to local storage feature functionality
    this.state = {};
    localStorage.removeItem(this.settings.stateKey);

    // Remove all entries from the collection.
    await this.deregisterCollection();

    // If eventListeners are enabled, init event listeners.
    if (this.settings.eventListeners) {
      this.destroyEventListeners();
    }

    return this;
  }

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

  register(query) {
    const els = getDrawerElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.target, els.dialog);
  }

  deregister(query) {
    const modal = this.get(getDrawerID.call(this, query));
    return deregister.call(this, modal);
  }

  getDrawer(drawerKey) {
    return getDrawer.call(this, drawerKey);
  }

  stateSet() {
    this.state = stateSet(this.settings);
  }

  stateSave(target = null) {
    this.state = stateSave(target, this.settings);
  }

  stateClear() {
    this.state = stateClear(this.settings);
  }

  switchToDefault(drawerKey) {
    return switchToDefault.call(this, drawerKey);
  }

  switchToModal(drawerKey) {
    return switchToModal.call(this, drawerKey);
  }

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
