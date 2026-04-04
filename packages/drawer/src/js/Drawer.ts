import { Collection, _ } from "@vrembem/core";
import { config, DrawerConfig } from "./config";
import { DrawerEntry } from "./DrawerEntry";
import { handleClick, handleKeydown } from "./handlers";
import { open } from "./open";
import { close } from "./close";
import { toggle } from "./toggle";

export class Drawer extends Collection<DrawerEntry, DrawerConfig> {
  readonly entryClass = DrawerEntry;

  constructor(options: Partial<DrawerConfig>) {
    super({ ...config, ...options });
    this.name = "Drawer";

    // Set the initial state of private store
    _(this, {
      handlers: {
        click: handleClick.bind(this),
        keydown: handleKeydown.bind(this)
      }
    });
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
    document.addEventListener("click", _(this).handlers.click);
    document.addEventListener("keydown", _(this).handlers.keydown);
  }

  async afterUnmount() {
    document.removeEventListener("click", _(this).handlers.click);
    document.removeEventListener("keydown", _(this).handlers.keydown);
  }
}
