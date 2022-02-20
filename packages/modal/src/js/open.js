import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';

import { getModal, modalNotFound } from './helpers';

export async function open(modalKey) {
  const modal = getModal.call(this, modalKey);
  if (!modal) return modalNotFound(modalKey);
  if (hasClass(modal, this.settings.stateClosed)) {
    this.working = true;
    setOverflowHidden(true, this.settings.selectorOverflow);
    await openTransition(modal, this.settings);
    this.focusTrap.init(modal);
    focusTarget(modal, this.settings);
    setInert(true, this.settings.selectorInert);
    modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));
    this.working = false;
    return modal;
  } else {
    return modal;
  }
}
