import { Collection } from "@vrembem/core";

import { config, PopoverConfig } from "./config";
import { PopoverEntry } from "./PopoverEntry";
import { handleKeydown, handleMousemove } from "./handlers";
import { open } from "./open";
import { close, closeAll } from "./close";
import { VirtualElement } from "@floating-ui/dom";

export class Popover extends Collection<PopoverEntry, PopoverConfig> {
  #handleKeydown: (event: KeyboardEvent) => void;
  #handleMousemove: (event: MouseEvent) => void;
  #virtual: boolean = false;
  entryClass = PopoverEntry;
  trigger: HTMLElement | null = null;
  virtualElement: VirtualElement | null = null;

  constructor(options: Partial<PopoverConfig>) {
    super({ ...config, ...options });
    this.name = "Popover";
    this.#handleKeydown = handleKeydown.bind(this);
    this.#handleMousemove = handleMousemove.bind(this);
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

  get virtual() {
    return this.#virtual;
  }

  set virtual(value) {
    if (value === this.#virtual) return;

    this.#virtual = value;

    if (value) {
      document.addEventListener("mousemove", this.#handleMousemove, false);
    } else {
      document.removeEventListener("mousemove", this.#handleMousemove, false);
    }
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
    this.virtual = false;
  }

  async afterUnmount() {
    document.removeEventListener("keydown", this.#handleKeydown, false);
  }
}
