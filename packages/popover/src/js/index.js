import { Collection } from "@vrembem/core";

import defaults from "./defaults";
import { handleKeydown } from "./handlers";
import { register } from "./register";
import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";
import { getPopoverElements } from "./helpers";

export default class Popover extends Collection {
  #handleKeydown;

  constructor(options) {
    super({ ...defaults, ...options});
    this.trigger = null;
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get active() {
    return this.collection.find((popover) => popover.state == "opened");
  }

  get activeHover() {
    return this.collection.find((popover) => {
      return popover.state == "opened" && popover.getSetting("event") == "hover";
    });
  }

  async mount(options) {
    // Update settings with passed options.
    if (options) this.settings = { ...this.settings, ...options };

    // Get all the popovers.
    const popovers = document.querySelectorAll(this.settings.selectorPopover);

    // Register the collections array with popover instances.
    await this.registerCollection(popovers);

    // Add global event listener.
    document.addEventListener("keydown", this.#handleKeydown, false);

    return this;
  }

  async unmount() {
    // Clear stored trigger.
    this.trigger = null;

    // Remove all entries from the collection.
    await this.deregisterCollection();

    // Remove global event listener.
    document.removeEventListener("keydown", this.#handleKeydown, false);

    return this;
  }

  register(query, config = {}) {
    const els = getPopoverElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.popover, els.trigger, config);
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
