import type { Popover } from "./Popover";
import type { PopoverEntry } from "./PopoverEntry";

export async function close(entry: PopoverEntry): Promise<PopoverEntry> {
  // If a modal exists and its state is opened
  if (entry && entry.state === "opened") {
    // Update inert state and state class
    entry.el.inert = true;
    entry.el.classList.remove(entry.getConfig("stateActive"));

    // Update accessibility attribute(s)
    if (!entry.isTooltip) {
      entry.trigger?.setAttribute("aria-expanded", "false");
    }

    // Clean up the floating UI instance
    entry.floatingCleanup();

    // Update popover state
    entry.state = "closed";

    // Clear root trigger if popover trigger matches
    if (entry.trigger === entry.parent.trigger) {
      entry.parent.trigger = null;
    }

    // Dispatch custom closed event
    entry.el.dispatchEvent(
      new CustomEvent(entry.getConfig("customEventPrefix") + "closed", {
        detail: entry.parent,
        bubbles: true
      })
    );

    // Emit the closed event
    await entry.parent.emit("closed", entry);
  }

  // Return the popover
  return entry;
}

export async function closeAll(parent: Popover): Promise<PopoverEntry[]> {
  const result: PopoverEntry[] = [];
  for (const entry of parent.collection) {
    if (entry.state === "opened") {
      result.push(await entry.close());
    }
  }
  return result;
}

export function closeCheck(entry: PopoverEntry): void {
  // Only run closeCheck if provided popover is currently open
  if (entry.state != "opened") return;

  // Needed to correctly check which element is currently being focused
  setTimeout(() => {
    // Check if trigger or element are being focused
    let isFocused = document.activeElement?.closest(
      `#${entry.id}, [aria-controls="${entry.id}"], [aria-describedby="${entry.id}"]`
    );

    // Close if the trigger and element are not currently focused
    if (!isFocused) {
      entry.close();
    }

    // Return the popover
    return entry;
  }, 1);
}
