import { openTransition } from "@vrembem/core/index";
import { updateFocusState, getModal } from "./helpers";

export async function open(query, transition, focus = true) {
  // Get the modal from collection.
  const modal = getModal.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...modal.settings };

  // Add transition parameter to configuration.
  if (transition !== undefined) config.transition = transition;

  // Maybe add modal to top of stack.
  this.stack.moveToTop(modal);

  // If modal is closed.
  if (modal.state === "closed") {
    // Update modal state.
    modal.state = "opening";

    // Add modal to stack.
    this.stack.add(modal);

    // Run the open transition.
    await openTransition(modal.el, config);

    // Update modal state.
    modal.state = "opened";
  }

  // Update focus if the focus param is true.
  if (focus) {
    updateFocusState.call(this);
  }

  // Dispatch custom opened event.
  modal.el.dispatchEvent(new CustomEvent(config.customEventPrefix + "opened", {
    detail: this,
    bubbles: true
  }));

  // Return the modal.
  return modal;
}
