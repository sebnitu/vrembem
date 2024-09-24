import { Collection } from "@vrembem/core";

import defaults from "./defaults";
import { handleKeydown } from "./handlers";
import { register } from "./register";
import { deregister } from "./deregister";
import { open } from "./open";
import { close } from "./close";

export default class Popover extends Collection {
  #handleKeydown;

  constructor(options = {}) {
    super({ ...defaults, ...options});
    this.trigger = null;
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get active() {
    return this.get("opened", "state");
  }

  get activeHover() {
    return this.collection.find((popover) => {
      return popover.state == "opened" && popover.getSetting("event") == "hover";
    });
  }

  async open(id) {
    return open.call(this, id);
  }

  async close(id) {
    return close.call(this, id);
  }

  async beforeRegister(entry, config) {
    return register.call(this, entry, config);
  }

  async beforeDeregister(entry) {
    return deregister.call(this, entry);
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
}
