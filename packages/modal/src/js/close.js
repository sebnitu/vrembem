import { transition } from "@vrembem/core";
import { getModal } from "./helpers/getModal";
import { updateFocusState } from "./helpers/updateFocusState";

export async function close(query, transitionOverride, focus = true) {
  // Get the modal from collection, or top modal in stack if no query is provided.
  const entry = query ? getModal.call(this, query) : this.active;

  // If a modal exists and its state is opened.
  if (entry && entry.state === "opened") {
    // Update modal state.
    entry.state = "closing";

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
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

    // Remove modal from stack.
    this.stack.remove(entry);

    // Update modal state.
    entry.state = "closed";

    // Update focus if the focus param is true.
    if (focus) {
      updateFocusState.call(this);
    }

    // Dispatch custom closed event.
    entry.el.dispatchEvent(
      new CustomEvent(entry.getSetting("customEventPrefix") + "closed", {
        detail: entry,
        bubbles: true
      })
    );

    // Emit the closed event.
    await entry.parent.emit("closed", entry);
  }

  // Return the modal.
  return entry;
}
