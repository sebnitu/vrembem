import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';
import { updateStackIndex, getModal } from './helpers';

export async function open(query, transition) {
  // Get the modal from collection.
  const modal = getModal.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...modal.config }

  // Add transition parameter to configuration.
  if (transition != undefined) config.transition = transition;

  // Check if modal is already in the stack.
  const index = this.stack.findIndex((entry) => {
    return (entry.id === modal.id);
  });

  // If modal is already open.
  if (index >= 0) {
    // Remove modal from stack array.
    this.stack.splice(index, 1);

    // Move back to end of stack.
    this.stack.push(modal);

    // Update z-index styles of stack.
    updateStackIndex(this.stack);

    // Initialize the focus trap.
    this.focusTrap.init(modal.target);

    // Set focus to the target.
    focusTarget(modal.target, config);
  }

  // If modal is closed.
  if (modal.state === 'closed') {
    // Set busy flag to true.
    this.busy = true;

    // Update modal state.
    modal.state = 'opening';

    // Apply z-index styles based on stack length.
    modal.target.style.zIndex = null;
    const value = getComputedStyle(modal.target)['z-index'];
    modal.target.style.zIndex = parseInt(value) + this.stack.length + 1;

    // Store modal in stack array.
    this.stack.push(modal);

    // Set inert state.
    setInert(true, config.selectorInert);

    // Set overflow state.
    setOverflowHidden(true, config.selectorOverflow);

    // Run the open transition.
    await openTransition(modal.target, config);

    // Initialize the focus trap.
    this.focusTrap.init(modal.target);

    // Set focus to the target.
    focusTarget(modal.target, config);

    // Update modal state.
    modal.state = 'opened';

    // Dispatch custom opened event.
    modal.target.dispatchEvent(new CustomEvent(config.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));

    // Set busy flag to false.
    this.busy = false;
  }

  // Return the modal.
  return modal;
}
