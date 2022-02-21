import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTrigger } from '@vrembem/core/index';
import { closeTransition } from '@vrembem/core/index';

export async function close(returnFocus = true) {
  const modal = document.querySelector(
    `[data-${this.settings.dataModal}].${this.settings.stateOpened}`
  );
  if (modal) {
    this.working = true;
    setInert(false, this.settings.selectorInert);
    setOverflowHidden(false, this.settings.selectorOverflow);
    await closeTransition(modal, this.settings);
    if (returnFocus) focusTrigger(this);
    this.focusTrap.destroy();
    modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));
    this.working = false;
    return modal;
  } else {
    return modal;
  }
}
