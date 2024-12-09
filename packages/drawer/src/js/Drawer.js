import { Collection } from "@vrembem/core";

import defaults from "./defaults";
import { DrawerEntry } from "./DrawerEntry";
import { handleClick, handleKeydown } from "./handlers";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";

export class Drawer extends Collection {
  #handleClick;
  #handleKeydown;

  constructor(options) {
    super({ ...defaults, ...options });
    this.module = "Drawer";
    this.entryClass = DrawerEntry;
    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get activeModal() {
    return this.collection.find((entry) => {
      return entry.state === "opened" && entry.mode === "modal";
    });
  }

  async open(id, transition, focus) {
    return open.call(this, id, transition, focus);
  }

  async close(id, transition, focus) {
    return close.call(this, id, transition, focus);
  }

  async toggle(id, transition, focus) {
    return toggle.call(this, id, transition, focus);
  }

  async afterMount() {
    document.addEventListener("click", this.#handleClick, false);
    document.addEventListener("keydown", this.#handleKeydown, false);
  }

  async beforeUnmount() {
    this.trigger = null;
  }

  async afterUnmount() {
    document.removeEventListener("click", this.#handleClick, false);
    document.removeEventListener("keydown", this.#handleKeydown, false);
  }
}