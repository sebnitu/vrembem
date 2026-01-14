import { transition } from "@vrembem/core";
import type { ModalEntry } from "./ModalEntry";

export async function open(
  entry: ModalEntry,
  transitionOverride?: boolean
): Promise<ModalEntry> {
  // Maybe add modal to top of stack
  entry.parent.stack.moveToTop(entry);

  // If modal is closed
  if (entry.state === "closed") {
    // Update modal state
    entry.state = "opening";

    // Add modal to stack
    entry.parent.stack.add(entry);

    // Run the open transition
    if (
      transitionOverride != undefined
        ? transitionOverride
        : entry.config.get("transition")
    ) {
      await transition(
        entry.el,
        entry.config.get("stateClosed"),
        entry.config.get("stateOpening"),
        entry.config.get("stateOpened"),
        entry.config.get("transitionDuration")
      );
    } else {
      entry.el.classList.add(entry.config.get("stateOpened"));
      entry.el.classList.remove(entry.config.get("stateClosed"));
    }

    // Update modal state
    entry.state = "opened";
  }

  // Dispatch custom opened event
  entry.el.dispatchEvent(
    new CustomEvent(entry.config.get("customEventPrefix") + "opened", {
      detail: entry.parent,
      bubbles: true
    })
  );

  // Emit the opened event
  await entry.parent.emit("opened", entry);

  // Return the modal
  return entry;
}
