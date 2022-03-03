import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget, focusTrigger } from '@vrembem/core/index';
import { closeTransition } from '@vrembem/core/index';

export async function close(modal, transition) {
  // If modal wasn't passed, get the top modal in stack.
  modal = modal || this.stack[this.stack.length - 1];

  // If a modal exists and its state is opened.
  if (modal && modal.state === 'opened') {
    // Set busy flag to true.
    this.busy = true;

    // Update modal state.
    modal.state = 'closing';

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

    // Re-activate focusTrap on next modal in stack.
    const next = this.stack[this.stack.length - 1];
    if (next) {
      // Initialize the focus trap.
      this.focusTrap.init(next.target);

      // Set focus to the trigger or target.
      if (modal.trigger) {
        modal.trigger.focus();
        modal.trigger = null;
      } else {
        focusTarget(next.target, this.settings);
      }
    } else {
      // If all modals are closed, return focus to root trigger.
      focusTrigger(this);
      // Clear entry trigger.
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

    // Return the modal that was closed.
    return modal;
  } else {
    // Return modal that was tried to close.
    return modal;
  }
}
