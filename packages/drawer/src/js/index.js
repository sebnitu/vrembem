import { Collection, FocusTrap, localStore } from '@vrembem/core/index';

import defaults from './defaults';
import { handleClick, handleKeydown } from './handlers';
import { register } from './register';
import { deregister } from './deregister';
import { open } from './open';
import { close } from './close';
import { toggle } from './toggle';
import { getDrawerID, getDrawerElements } from './helpers';

export default class Drawer extends Collection {
  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.memory = {};
    this.focusTrap = new FocusTrap();

    // Setup local store for store state management.
    this.store = localStore(this.settings.storeKey, this.settings.store);

    this.__handleClick = handleClick.bind(this);
    this.__handleKeydown = handleKeydown.bind(this);
    if (this.settings.autoInit) this.init();
  }

  get activeModal() {
    return this.collection.find((entry) => {
      return entry.state === 'opened' && entry.mode === 'modal';
    });
  }

  async init(options = null) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

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

    // Remove all entries from the collection.
    await this.deregisterCollection();

    // If eventListeners are enabled, init event listeners.
    if (this.settings.eventListeners) {
      this.destroyEventListeners();
    }

    return this;
  }

  initEventListeners() {
    document.addEventListener('click', this.__handleClick, false);
    document.addEventListener('touchend', this.__handleClick, false);
    document.addEventListener('keydown', this.__handleKeydown, false);
  }

  destroyEventListeners() {
    document.removeEventListener('click', this.__handleClick, false);
    document.removeEventListener('touchend', this.__handleClick, false);
    document.removeEventListener('keydown', this.__handleKeydown, false);
  }

  register(query) {
    const els = getDrawerElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.target, els.dialog);
  }

  deregister(query) {
    const entry = this.get(getDrawerID.call(this, query));
    return deregister.call(this, entry);
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
