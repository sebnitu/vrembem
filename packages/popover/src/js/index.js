import { Collection } from "@vrembem/core";

import defaults from "./defaults";
import { handleKeydown } from "./handlers";
import { register, registerEventListeners } from "./register";
import { deregister, deregisterEventListeners } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { getPopoverElements } from "./helpers";

export default class Popover extends Collection {
  #handleKeydown;

  constructor(options) {
    super();
    this.defaults = defaults;
    this.settings = { ...this.defaults, ...options };
    this.trigger = null;
    this.#handleKeydown = handleKeydown.bind(this);
    if (this.settings.autoMount) this.mount();
  }

  get active() {
    return this.collection.find((popover) => popover.state == "opened");
  }

  get activeTooltip() {
    return this.collection.find((popover) => popover.state == "opened" && popover.isTooltip);
  }

  async mount(options) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the popovers.
    const popovers = document.querySelectorAll(this.settings.selectorPopover);

    // Register the collections array with popover instances.
    await this.registerCollection(popovers);

    // If eventListeners are enabled, mount event listeners.
    if (this.settings.eventListeners) {
      // Pass false to mountEventListeners() since registerCollection()
      // already adds event listeners to popovers.
      this.mountEventListeners(false);
    }

    return this;
  }

  async unmount() {
    // Clear stored trigger.
    this.trigger = null;

    // Remove all entries from the collection.
    await this.deregisterCollection();

    // If eventListeners are enabled, unmount event listeners.
    if (this.settings.eventListeners) {
      // Pass false to unmountEventListeners() since deregisterCollection()
      // already removes event listeners from popovers.
      this.unmountEventListeners(false);
    }

    return this;
  }

  mountEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and setup event listeners.
      this.collection.forEach((popover) => {
        registerEventListeners.call(this, popover);
      });
    }

    // Add keydown global event listener.
    document.addEventListener("keydown", this.#handleKeydown, false);
  }

  unmountEventListeners(processCollection = true) {
    if (processCollection) {
      // Loop through collection and remove event listeners.
      this.collection.forEach((popover) => {
        deregisterEventListeners(popover);
      });
    }

    // Remove keydown global event listener.
    document.removeEventListener("keydown", this.#handleKeydown, false);
  }

  register(query) {
    const els = getPopoverElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.popover, els.trigger);
  }

  deregister(query) {
    let obj = this.get((query.id || query));
    return (obj) ?
      deregister.call(this, obj) :
      Promise.reject(new Error(`Failed to deregister; popover does not exist in collection with ID of: "${query.id || query}".`));
  }

  open(id) {
    return open.call(this, id);
  }

  close(id) {
    return close.call(this, id);
  }
}
