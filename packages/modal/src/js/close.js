import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget, focusTrigger } from '@vrembem/core/index';
import { closeTransition } from '@vrembem/core/index';

export async function close(modal = null, transition = this.settings.transition) {
  // If modal wasn't passed, get the top modal in stack.
  modal = modal || this.stack[this.stack.length - 1];

  // If a modal exists and its state is opened.
  if (modal && modal.state === 'opened') {
    // Set busy flag to true.
    this.busy = true;

    // Remove focus from active element.
    document.activeElement.blur();

    // Update modal state.
    modal.state = 'closing';

    // Set inert state.
    setInert(false, this.settings.selectorInert);

    // Run the close transition.
    await closeTransition(modal.target, { ...this.settings, ...{ transition: transition } });

    // Destroy the focus trap.
    this.focusTrap.destroy();

    // Return focus if this was last modal in stack.
    if (this.stack.length <= 1) {
      focusTrigger(this);
    }

    // Set overflow state.
    setOverflowHidden(false, this.settings.selectorOverflow);

    // Dispatch custom closed event.
    modal.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));

    // Update modal state.
    modal.state = 'closed';

    // Remove z-index styles.
    modal.target.style.zIndex = null;

    // Get index of modal in stack array.
    const index = this.stack.findIndex((entry) => {
      return (entry.id === modal.id);
    });

    // Remove modal from stack array.
    this.stack.splice(index, 1);

    // Re-activate focusTrap on next modal in stack
    const next = this.stack[this.stack.length - 1];
    if (next) {
      // Initialize the focus trap.
      this.focusTrap.init(next.target);

      // Set focus to the target.
      focusTarget(next.target, this.settings);
    }

    // Set busy flag to false.
    this.busy = false;

    // Return the modal that was closed.
    return modal;
  } else {
    // Return modal that was tried to close.
    return modal;
  }
}
