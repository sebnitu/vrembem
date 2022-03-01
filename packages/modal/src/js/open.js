import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';
import { updateStackIndex } from './helpers';

export async function open(modal, transition = this.settings.transition) {
  // Check if modal exists in the stack
  const index = this.stack.findIndex((entry) => {
    return (entry.id === modal.id);
  });

  if (index >= 0) {
    // Remove modal from stack array.
    this.stack.splice(index, 1);

    // Update stack z-index
    this.stack.push(modal);
  }

  // Update stack z-index
  updateStackIndex(this.stack);

  // If the modal is currently closed.
  if (modal.state === 'closed') {
    // Set busy flag to true.
    this.busy = true;

    // Apply z-index styles
    modal.target.style.zIndex = null;
    const value = getComputedStyle(modal.target)['z-index'];
    modal.target.style.zIndex = parseInt(value) + this.stack.length + 1;
    
    // Store modal in stack array.
    this.stack.push(modal);

    // Update modal state.
    modal.state = 'opening';

    // Set overflow state.
    setOverflowHidden(true, this.settings.selectorOverflow);

    // Run the open transition.
    await openTransition(modal.target, { ...this.settings, ...{ transition: transition } });

    // Initialize the focus trap.
    this.focusTrap.init(modal.target);

    // Set focus to the target.
    focusTarget(modal.target, this.settings);

    // Set inert state.
    setInert(true, this.settings.selectorInert);

    // Dispatch custom opened event.
    modal.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));

    // Update modal state.
    modal.state = 'opened';

    // Set busy flag to false.
    this.busy = false;

    // Return the modal that was opened.
    return modal;
  } else {
    // Return modal that was tried to open.
    return modal;
  }
}
