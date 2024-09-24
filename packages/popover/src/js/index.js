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

  constructor(options = {}) {
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
  
  async afterMount() {
    document.addEventListener("keydown", this.#handleKeydown, false);
  }

  async beforeUnmount() {
    this.trigger = null;
  }

  async afterUnmount() {
    document.removeEventListener("keydown", this.#handleKeydown, false);
  }

  register(query, config = {}) {
    const els = getPopoverElements.call(this, query);
    if (els.error) return Promise.reject(els.error);
    return register.call(this, els.popover, els.trigger, config);
  }

  deregister(query) {
    return deregister.call(this, query);
  }

  open(id) {
    return open.call(this, id);
  }

  close(id) {
    return close.call(this, id);
  }
}
