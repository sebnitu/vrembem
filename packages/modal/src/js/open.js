import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';
import { updateStackIndex } from './helpers';

export async function open(modal, transition) {
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
    focusTarget(modal.target, this.settings);
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
    setInert(true, this.settings.selectorInert);

    // Set overflow state.
    setOverflowHidden(true, this.settings.selectorOverflow);

    // Run the open transition.
    await openTransition(modal.target, { ...this.settings, ...{ transition: transition } });

    // Initialize the focus trap.
    this.focusTrap.init(modal.target);

    // Set focus to the target.
    focusTarget(modal.target, this.settings);

    // Update modal state.
    modal.state = 'opened';

    // Dispatch custom opened event.
    modal.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));

    // Set busy flag to false.
    this.busy = false;

    // Return the modal that was opened.
    return modal;
  } else {
    // Return modal that was tried to open.
    return modal;
  }
}
