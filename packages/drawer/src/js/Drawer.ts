import { Collection } from "@vrembem/core";

import { config, DrawerConfig } from "./config";
import { DrawerEntry } from "./DrawerEntry";
import { handleClick, handleKeydown } from "./handlers";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";

export class Drawer extends Collection<DrawerEntry> {
  #handleClick: (event: MouseEvent) => Promise<void | DrawerEntry>;
  #handleKeydown: (event: KeyboardEvent) => void;
  declare config: DrawerConfig;

  constructor(options: DrawerConfig) {
    super({ ...config, ...options });
    this.module = "Drawer";
    this.entryClass = DrawerEntry as new (
      parent: Collection<DrawerEntry>,
      query: string | HTMLElement,
      options?: Record<string, any>
    ) => DrawerEntry;
    this.#handleClick = handleClick.bind(this);
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get activeModal(): DrawerEntry | undefined {
    return this.collection.find((entry: DrawerEntry) => {
      return entry.state === "opened" && entry.mode === "modal";
    });
  }

  async open(
    id: string,
    transition?: boolean,
    focus?: boolean
  ): Promise<DrawerEntry> {
    const entry = this.getOrThrow(id);
    return open(entry, transition, focus);
  }

  async close(
    id: string,
    transition?: boolean,
    focus?: boolean
  ): Promise<DrawerEntry> {
    const entry = this.getOrThrow(id);
    return close(entry, transition, focus);
  }

  async toggle(
    id: string,
    transition?: boolean,
    focus?: boolean
  ): Promise<DrawerEntry> {
    const entry = this.getOrThrow(id);
    return toggle(entry, transition, focus);
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
