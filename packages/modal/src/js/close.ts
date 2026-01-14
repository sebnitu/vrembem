import { transition } from "@vrembem/core";
import type { ModalEntry } from "./ModalEntry";

export async function close(
  entry: ModalEntry | null,
  transitionOverride?: boolean
): Promise<ModalEntry | null> {
  // If a modal exists and its state is opened
  if (entry && entry.state === "opened") {
    // Update modal state
    entry.state = "closing";

    // Remove focus from active element
    if (
      document.activeElement &&
      document.activeElement instanceof HTMLElement
    ) {
      document.activeElement.blur();
    }

    // Run the close transition
    if (
      transitionOverride != undefined
        ? transitionOverride
        : entry.config.get("transition")
    ) {
      await transition(
        entry.el,
        entry.config.get("stateOpened"),
        entry.config.get("stateClosing"),
        entry.config.get("stateClosed"),
        entry.config.get("transitionDuration")
      );
    } else {
      entry.el.classList.add(entry.config.get("stateClosed"));
      entry.el.classList.remove(entry.config.get("stateOpened"));
    }

    // Remove modal from stack
    entry.parent.stack.remove(entry);

    // Update modal state
    entry.state = "closed";

    // Dispatch custom closed event
    entry.el.dispatchEvent(
      new CustomEvent(entry.config.get("customEventPrefix") + "closed", {
        detail: entry.parent,
        bubbles: true
      })
    );

    // Emit the closed event
    await entry.parent.emit("closed", entry);
  }

  // Return the modal
  return entry;
}
