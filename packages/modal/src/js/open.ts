import { transition } from "@vrembem/core";
import { updateFocusState } from "./helpers/updateFocusState";
import type { ModalEntry } from "./ModalEntry";

export async function open(
  entry: ModalEntry,
  transitionOverride?: boolean,
  focus: boolean = true
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
        : entry.getSetting("transition")
    ) {
      await transition(
        entry.el,
        entry.getSetting("stateClosed"),
        entry.getSetting("stateOpening"),
        entry.getSetting("stateOpened"),
        entry.getSetting("transitionDuration")
      );
    } else {
      entry.el.classList.add(entry.getSetting("stateOpened"));
      entry.el.classList.remove(entry.getSetting("stateClosed"));
    }

    // Update modal state
    entry.state = "opened";
  }

  // Update focus if the focus param is true
  if (focus) {
    updateFocusState(entry.parent);
  }

  // Dispatch custom opened event
  entry.el.dispatchEvent(
    new CustomEvent(entry.getSetting("customEventPrefix") + "opened", {
      detail: entry.parent,
      bubbles: true
    })
  );

  // Emit the opened event
  await entry.parent.emit("opened", entry);

  // Return the modal
  return entry;
}
