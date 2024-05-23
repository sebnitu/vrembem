import { transition } from "@vrembem/core";
import { updateFocusState, getModal } from "./helpers";

export async function close(query, enableTransition, focus = true) {
  // Get the modal from collection, or top modal in stack if no query is provided.
  const entry = (query) ? getModal.call(this, query) : this.active;

  // If a modal exists and its state is opened.
  if (entry && entry.state === "opened") {
    // Update modal state.
    entry.state = "closing";

    // Get the modal configuration.
    const config = { ...this.settings, ...entry.settings };

    // Add transition parameter to configuration.
    if (enableTransition !== undefined) config.transition = enableTransition;

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    if (config.transition) {
      await transition(entry.el, {
        start: config.stateOpening,
        finish: config.stateOpened
      }, {
        start: config.stateClosing,
        finish: config.stateClosed
      }, config.transitionDuration);
    } else {
      entry.el.classList.add(config.stateClosed);
      entry.el.classList.remove(config.stateOpened);
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
    entry.el.dispatchEvent(new CustomEvent(config.customEventPrefix + "closed", {
      detail: this,
      bubbles: true
    }));
  }

  // Return the modal.
  return entry;
}
