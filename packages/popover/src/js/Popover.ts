import { Collection, _ } from "@vrembem/core";
import { config, PopoverConfig } from "./config";
import { PopoverEntry } from "./PopoverEntry";
import { handleKeydown, handleMousemove } from "./handlers";
import { open } from "./open";
import { close, closeAll } from "./close";
import { VirtualElement } from "@floating-ui/dom";

export class Popover extends Collection<PopoverEntry, PopoverConfig> {
  entryClass = PopoverEntry;
  trigger: HTMLElement | null = null;
  virtualElement: VirtualElement | null = null;

  constructor(options: Partial<PopoverConfig>) {
    super({ ...config, ...options });
    this.name = "Popover";

    // Set the initial state of private store
    _(this, {
      virtual: false,
      handlers: {
        keydown: handleKeydown.bind(this),
        mousemove: handleMousemove.bind(this)
      }
    });
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

  get virtual(): boolean {
    return _(this).virtual;
  }

  set virtual(value) {
    if (value === _(this).virtual) return;

    _(this).virtual = value;

    if (value) {
      document.addEventListener("mousemove", _(this).handlers.mousemove);
    } else {
      document.removeEventListener("mousemove", _(this).handlers.mousemove);
    }
  }

  async open(id: string): Promise<PopoverEntry> {
    const entry = this.getOrThrow(id);
    return open(entry);
  }

  async close(id?: string): Promise<PopoverEntry | PopoverEntry[]> {
    const entry = id ? this.getOrThrow(id) : undefined;
    if (entry) {
      return close(entry);
    } else {
      return closeAll(this);
    }
  }

  async afterMount() {
    document.addEventListener("keydown", _(this).handlers.keydown);
  }

  async beforeUnmount() {
    this.trigger = null;
    this.virtual = false;
  }

  async afterUnmount() {
    document.removeEventListener("keydown", _(this).handlers.keydown);
  }
}
