import { Collection } from "@vrembem/core";

import defaults from "./defaults";
import { PopoverEntry } from "./PopoverEntry";
import { handleKeydown } from "./handlers";
import { open } from "./open";
import { close } from "./close";

export class Popover extends Collection {
  #handleKeydown;

  constructor(options = {}) {
    super({ ...defaults, ...options});
    this.module = "Popover";
    this.entryClass = PopoverEntry;
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
