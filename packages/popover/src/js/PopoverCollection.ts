import { Collection, _ } from "@vrembem/core";
import { config, PopoverConfig } from "./config";
import { PopoverEntry } from "./PopoverEntry";
import { handleKeydown, handleMousemove } from "./handlers";
import { open } from "./open";
import { close, closeAll } from "./close";

export class PopoverCollection extends Collection<PopoverEntry, PopoverConfig> {
  readonly entryClass = PopoverEntry;
  trigger: HTMLElement | null = null;

  constructor(options: Partial<PopoverConfig>) {
    super({ ...config, ...options });
    this.name = "Popover";

    // Set the initial state of private store
    _(this, {
      trackCursor: false,
      cursorElement: null,
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

    // If the track cursor var has been toggled, apply the event listener to
    // keep updated the cursor element.
    if (_(this).trackCursor) {
      document.addEventListener("mousemove", _(this).handlers.mousemove);
    }
  }

  async beforeUnmount() {
    this.trigger = null;
  }

  async afterUnmount() {
    document.removeEventListener("keydown", _(this).handlers.keydown);
    document.removeEventListener("mousemove", _(this).handlers.mousemove);
  }
}
