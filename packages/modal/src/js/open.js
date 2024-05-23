import { transition } from "@vrembem/core";
import { updateFocusState, getModal } from "./helpers";

export async function open(query, enableTransition, focus = true) {
  // Get the modal from collection.
  const entry = getModal.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...entry.settings };

  // Add transition parameter to configuration.
  if (enableTransition !== undefined) config.transition = enableTransition;

  // Maybe add modal to top of stack.
  this.stack.moveToTop(entry);

  // If modal is closed.
  if (entry.state === "closed") {
    // Update modal state.
    entry.state = "opening";

    // Add modal to stack.
    this.stack.add(entry);

    // Run the open transition.
    if (config.transition) {
      await transition(entry.el, {
        start: config.stateClosing,
        finish: config.stateClosed
      }, {
        start: config.stateOpening,
        finish: config.stateOpened
      }, config.transitionDuration);
    } else {
      entry.el.classList.add(config.stateOpened);
      entry.el.classList.remove(config.stateClosed);
    }

    // Update modal state.
    entry.state = "opened";
  }

  // Update focus if the focus param is true.
  if (focus) {
    updateFocusState.call(this);
  }

  // Dispatch custom opened event.
  entry.el.dispatchEvent(new CustomEvent(config.customEventPrefix + "opened", {
    detail: this,
    bubbles: true
  }));

  // Return the modal.
  return entry;
}
