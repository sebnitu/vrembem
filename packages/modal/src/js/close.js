import { closeTransition } from "@vrembem/core/index";
import { updateFocusState, getModal } from "./helpers";

export async function close(query, transition, focus = true) {
  // Get the modal from collection, or top modal in stack if no query is provided.
  const modal = (query) ? getModal.call(this, query) : this.active;

  // If a modal exists and its state is opened.
  if (modal && modal.state === "opened") {
    // Update modal state.
    modal.state = "closing";

    // Get the modal configuration.
    const config = { ...this.settings, ...modal.settings };

    // Add transition parameter to configuration.
    if (transition !== undefined) config.transition = transition;

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    await closeTransition(modal.el, config);

    // Remove modal from stack.
    this.stack.remove(modal);

    // Update focus if the focus param is true.
    if (focus) {
      updateFocusState.call(this);
    }

    // Update modal state.
    modal.state = "closed";

    // Dispatch custom closed event.
    modal.el.dispatchEvent(new CustomEvent(config.customEventPrefix + "closed", {
      detail: this,
      bubbles: true
    }));
  }

  // Return the modal.
  return modal;
}
