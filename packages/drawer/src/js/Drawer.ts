import { Collection } from "@vrembem/core";

import defaults from "./defaults";
import { DrawerEntry } from "./DrawerEntry";
import { handleClick, handleKeydown } from "./handlers";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";

export class Drawer extends Collection {
  #handleClick: (event: Event) => void;
  #handleKeydown: (event: KeyboardEvent) => void;

  constructor(options: Record<string, any>) {
    super({ ...defaults, ...options });
    this.module = "Drawer";
    this.entryClass = DrawerEntry;
    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get activeModal() {
    return this.collection.find((entry: DrawerEntry) => {
      return entry.state === "opened" && entry.mode === "modal";
    });
  }

  async open(id: string, transition?: boolean, focus?: boolean) {
    return open.call(this, id, transition, focus);
  }

  async close(id: string, transition?: boolean, focus?: boolean) {
    return close.call(this, id, transition, focus);
  }

  async toggle(id: string, transition?: boolean, focus?: boolean) {
    return toggle.call(this, id, transition, focus);
  }

  async afterMount() {
    document.addEventListener("click", this.#handleClick, false);
    document.addEventListener("keydown", this.#handleKeydown, false);
  }

  async afterUnmount() {
    document.removeEventListener("click", this.#handleClick, false);
    document.removeEventListener("keydown", this.#handleKeydown, false);
  }
}
