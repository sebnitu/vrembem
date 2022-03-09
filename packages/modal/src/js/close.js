import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTrigger } from '@vrembem/core/index';
import { closeTransition } from '@vrembem/core/index';
import { getModalConfig } from './helpers';

export async function close(returnFocus = true) {
  const modal = document.querySelector(
    `[data-${this.settings.dataModal}].${this.settings.stateOpened}`
  );
  if (modal) {
    this.working = true;
    const config = getModalConfig.call(this, modal);
    setInert(false, config.selectorInert);
    setOverflowHidden(false, config.selectorOverflow);
    await closeTransition(modal, config);
    if (returnFocus) focusTrigger(this);
    this.focusTrap.destroy();
    modal.dispatchEvent(new CustomEvent(config.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));
    this.working = false;
    return modal;
  } else {
    return modal;
  }
}
