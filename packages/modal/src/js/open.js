import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';

export async function open(modal, transition = this.settings.transition) {
  // Only open modal if it's closed
  if (hasClass(modal.target, this.settings.stateClosed)) {
    // Set busy flag to true
    this.busy = true;

    // Set modal state
    modal.state = 'opening';

    // Set overflow state
    setOverflowHidden(true, this.settings.selectorOverflow);

    // Open the modal
    await openTransition(modal.target, { ...this.settings, ...{ transition: transition } });

    // Initialize the focus trap
    this.focusTrap.init(modal.target);

    // Set focus to the target
    focusTarget(modal.target, this.settings);

    // Set inert state
    setInert(true, this.settings.selectorInert);

    // Dispatch custom opened event
    modal.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));

    // Update modal state
    modal.state = 'opened';

    // Set busy flag to false
    this.busy = false;

    // Return the modal that was opened
    return modal;
  } else {
    // Return modal that was tried to open
    return modal;
  }
}
