import { Collection, FocusTrap } from '@vrembem/core/index';

import defaults from './defaults';
import { handlerClick, handlerKeydown } from './handlers';
import { register } from './register';
import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { toggle } from './toggle';
import { stateClear, stateSave, stateSet } from './state';
import { getDrawerID, getDrawerElements } from './helpers';

export default class Drawer extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.memory = {};
    this.focusTrap = new FocusTrap();

    // TODO: refactor the state module.
    this.state = {};

    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeydown = handlerKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  get activeModal() {
    return this.collection.find((entry) => {
      return entry.state === 'opened' && entry.mode === 'modal';
    });
  }

  get currentState() {
    const result = {};
    this.collection.forEach((entry) => {
      result[entry.id] = entry.state;
    });
    return result;
  }

  async init(options = null) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the modals.
    const drawers = document.querySelectorAll(this.settings.selectorDrawer);

    // Register the collections array with modal instances.
    await this.registerCollection(drawers);

    // TODO: refactor the state module.
    this.stateSet();

    // If eventListeners are enabled, init event listeners.
    if (this.settings.eventListeners) {
      this.initEventListeners();
    }

    return this;
  }

  async destroy() {
    // Clear any stored memory.
    this.memory = {};

    // TODO: refactor the state module.
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

  stateSet() {
    this.state = stateSet.call(this, this.settings);
  }

  stateSave(target = null) {
    this.state = stateSave.call(this, target, this.settings);
  }

  stateClear() {
    this.state = stateClear(this.settings);
  }

  open(id, transition) {
    return open.call(this, id, transition);
  }

  close(id, transition) {
    return close.call(this, id, transition);
  }

  toggle(id, transition) {
    return toggle.call(this, id, transition);
  }
}
