import { Collection } from "@vrembem/core";

import { config, PopoverConfig } from "./config";
import { PopoverEntry } from "./PopoverEntry";
import { handleKeydown } from "./handlers";
import { open } from "./open";
import { close, closeAll } from "./close";

export class Popover extends Collection<PopoverEntry, PopoverConfig> {
  #handleKeydown: (event: KeyboardEvent) => void;
  entryClass = PopoverEntry;
  trigger: HTMLElement | null;

  constructor(options: Partial<PopoverConfig>) {
    super({ ...config, ...options });
    this.name = "Popover";
    this.trigger = null;
    this.#handleKeydown = handleKeydown.bind(this);
  }

  get active(): PopoverEntry | undefined {
    return this.get("opened", "state");
  }

  get activeHover(): PopoverEntry | undefined {
    return this.collection.find((popover) => {
      return (
        popover.state == "opened" && popover.config.get("event") == "hover"
      );
    });
  }

  async open(id: string): Promise<PopoverEntry> {
    const entry = this.getOrThrow(id);
    return open(entry);
  }

  async close(id: string): Promise<PopoverEntry | PopoverEntry[]> {
    const entry = id ? this.getOrThrow(id) : undefined;
    if (entry) {
      return close(entry);
    } else {
      return closeAll(this);
    }
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
