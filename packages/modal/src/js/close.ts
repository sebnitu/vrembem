import { transition } from "@vrembem/core";
import { updateFocusState } from "./helpers/updateFocusState";
import type { ModalEntry } from "./ModalEntry";

export async function close(
  entry: ModalEntry,
  transitionOverride?: boolean,
  focus: boolean = true
): Promise<ModalEntry> {
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
        : entry.getSetting("transition")
    ) {
      await transition(
        entry.el,
        entry.getSetting("stateOpened"),
        entry.getSetting("stateClosing"),
        entry.getSetting("stateClosed"),
        entry.getSetting("transitionDuration")
      );
    } else {
      entry.el.classList.add(entry.getSetting("stateClosed"));
      entry.el.classList.remove(entry.getSetting("stateOpened"));
    }

    // Remove modal from stack
    entry.parent.stack.remove(entry);

    // Update modal state
    entry.state = "closed";

    // Update focus if the focus param is true
    if (focus) {
      updateFocusState(entry.parent);
    }

    // Dispatch custom closed event
    entry.el.dispatchEvent(
      new CustomEvent(entry.getSetting("customEventPrefix") + "closed", {
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
