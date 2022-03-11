import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { closeTransition } from '@vrembem/core/index';
import { updateFocus, updateStackIndex, getModal, getModalConfig } from './helpers';

export async function close(query, transition, bulk = false) {
  // Get the modal from collection, or top modal in stack if no query is provided.
  const modal = (query) ? getModal.call(this, query) : this.stack[this.stack.length - 1];

  // If a modal exists and its state is opened.
  if (modal && modal.state === 'opened') {
    // Set busy flag to true.
    this.busy = true;

    // Update modal state.
    modal.state = 'closing';

    // Get the modal config.
    // const config = getModalConfig.call(this, modal);
    
    // Remove focus from active element.
    document.activeElement.blur();

    // Set inert state.
    setInert(false, this.settings.selectorInert);

    // Set overflow state.
    setOverflowHidden(false, this.settings.selectorOverflow);

    // Run the close transition.
    await closeTransition(modal.target, { ...this.settings, ...{ transition: transition } });

    // Destroy the focus trap.
    this.focusTrap.destroy();

    // Remove z-index styles.
    modal.target.style.zIndex = null;

    // Get index of modal in stack array.
    const index = this.stack.findIndex((entry) => {
      return (entry.id === modal.id);
    });

    // Remove modal from stack array.
    this.stack.splice(index, 1);

    // Update the focus if it isn't a bulk action.
    if (!bulk) {
      // Update the z-index since they may be out of sync.
      updateStackIndex(this.stack);

      // Update focus.
      updateFocus.call(this, modal.trigger);

      // Clear the stored trigger.
      modal.trigger = null;
    }

    // Update modal state.
    modal.state = 'closed';

    // Dispatch custom closed event.
    modal.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));

    // Set busy flag to false.
    this.busy = false;
  }

  // Return the modal.
  return modal;
}
