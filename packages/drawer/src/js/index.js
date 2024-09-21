import { Collection, FocusTrap, localStore } from "@vrembem/core";

import defaults from "./defaults";
import { handleClick, handleKeydown } from "./handlers";
import { register } from "./register";
import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";

export default class Drawer extends Collection {
  #handleClick;
  #handleKeydown;

  constructor(options) {
    super();
    this.settings = { ...defaults, ...options };
    this.focusTrap = new FocusTrap();

    // Setup local store for inline drawer state management.
    this.store = localStore(this.settings.storeKey, this.settings.store);

    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get activeModal() {
    return this.collection.find((entry) => {
      return entry.state === "opened" && entry.mode === "modal";
    });
  }

  async mount(options = null) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the modals.
    const drawers = document.querySelectorAll(this.settings.selectorDrawer);

    // Register the collections array with modal instances.
    await this.registerCollection(drawers);

    // If eventListeners are enabled, mount event listeners.
    if (this.settings.eventListeners) {
      this.mountEventListeners();
    }

    return this;
  }

  async unmount() {
    // Remove all entries from the collection.
    await this.deregisterCollection();

    // If eventListeners are enabled, unmount event listeners.
    if (this.settings.eventListeners) {
      this.unmountEventListeners();
    }

    return this;
  }

  mountEventListeners() {
    document.addEventListener("click", this.#handleClick, false);
    document.addEventListener("keydown", this.#handleKeydown, false);
  }

  unmountEventListeners() {
    document.removeEventListener("click", this.#handleClick, false);
    document.removeEventListener("keydown", this.#handleKeydown, false);
  }

  register(query, config = {}) {
    let el = (typeof query == "string") ?
      document.getElementById(query) : query;
    return (el) ?
      register.call(this, el, config) :
      Promise.reject(new Error(`Failed to register; drawer not found with ID of: "${query.id || query}".`));
  }

  deregister(query) {
    let obj = this.get((query.id || query));
    return (obj) ?
      deregister.call(this, obj) :
      Promise.reject(new Error(`Failed to deregister; drawer does not exist in collection with ID of: "${query.id || query}".`));
  }

  open(id, transition, focus) {
    return open.call(this, id, transition, focus);
  }

  close(id, transition, focus) {
    return close.call(this, id, transition, focus);
  }

  toggle(id, transition, focus) {
    return toggle.call(this, id, transition, focus);
  }
}
