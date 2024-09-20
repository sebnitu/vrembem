import { transition } from "@vrembem/core";
import { updateFocusState, getModal } from "./helpers";

export async function open(query, transitionOverride = undefined, focus = true) {
  // Get the modal from collection.
  const entry = getModal.call(this, query);
  
  // Maybe add modal to top of stack.
  this.stack.moveToTop(entry);

  // If modal is closed.
  if (entry.state === "closed") {
    // Update modal state.
    entry.state = "opening";

    // Add modal to stack.
    this.stack.add(entry);

    // Run the open transition.
    if ((transitionOverride != undefined) ? transitionOverride : entry.getSetting("transition")) {
      await transition(entry.el, {
        start: entry.getSetting("stateClosing"),
        finish: entry.getSetting("stateClosed")
      }, {
        start: entry.getSetting("stateOpening"),
        finish: entry.getSetting("stateOpened")
      }, entry.getSetting("transitionDuration"));
    } else {
      entry.el.classList.add(entry.getSetting("stateOpened"));
      entry.el.classList.remove(entry.getSetting("stateClosed"));
    }

    // Update modal state.
    entry.state = "opened";
  }

  // Update focus if the focus param is true.
  if (focus) {
    updateFocusState.call(this);
  }

  // Dispatch custom opened event.
  entry.el.dispatchEvent(new CustomEvent(entry.getSetting("customEventPrefix") + "opened", {
    detail: this,
    bubbles: true
  }));
  
  // Return the modal.
  return entry;
}
