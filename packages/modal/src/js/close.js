import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTrigger } from '@vrembem/core/index';
import { closeTransition } from '@vrembem/core/index';

export async function close(modal = null, transition = this.settings.transition, returnFocus = true) {
  // If modal wasn't passed, query for an open modal
  modal = modal || this.get('opened', 'state');
  if (modal && modal.state === 'opened') {
    // Set busy flag to true
    this.busy = true;

    // Remove focus from active element
    document.activeElement.blur();

    // Set modal state
    modal.state = 'closing';

    // Set inert state
    setInert(false, this.settings.selectorInert);

    // Close the modal
    await closeTransition(modal.target, { ...this.settings, ...{ transition: transition } });

    // Destroy the focus trap
    this.focusTrap.destroy();

    // Maybe return focus to trigger element
    if (returnFocus) focusTrigger(this);

    // Set overflow state
    setOverflowHidden(false, this.settings.selectorOverflow);

    // Dispatch custom closed event
    modal.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));

    // Set modal state
    modal.state = 'closed';

    // Set busy flag to false
    this.busy = false;

    // Return the modal that was closed
    return modal;
  } else {
    // Return modal that was tried to close
    return modal;
  }
}
