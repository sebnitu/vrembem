import { closeTransition } from '@vrembem/core/index';
import { updateGlobalState, updateFocus, updateStackIndex, getModal } from './helpers';

export async function close(query, transition, bulk = false) {
  // Get the modal from collection, or top modal in stack if no query is provided.
  const modal = (query) ? getModal.call(this, query) : this.stack[this.stack.length - 1];

  // If a modal exists and its state is opened.
  if (modal && modal.state === 'opened') {
    // Update modal state.
    modal.state = 'closing';

    // Get the modal configuration.
    const config = { ...this.settings, ...modal.settings };

    // Add transition parameter to configuration.
    if (transition !== undefined) config.transition = transition;

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    await closeTransition(modal.target, config);

    // Remove z-index styles.
    modal.target.style.zIndex = null;

    // Get index of modal in stack array.
    const index = this.stack.findIndex((entry) => {
      return (entry.id === modal.id);
    });

    // Remove modal from stack array.
    this.stack.splice(index, 1);

    // Update focus and global state if it isn't a bulk action.
    if (!bulk) {
      // Update the z-index since they may be out of sync.
      updateStackIndex(this.stack);

      // Update focus.
      updateFocus.call(this, modal.trigger);

      // Update the global state
      updateGlobalState.call(this);

      // Clear the stored trigger.
      modal.trigger = null;
    }

    // Update modal state.
    modal.state = 'closed';

    // Dispatch custom closed event.
    modal.target.dispatchEvent(new CustomEvent(config.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));
  }

  // Return the modal.
  return modal;
}
