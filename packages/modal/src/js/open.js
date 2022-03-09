import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';

import { getModalConfig, getModal, modalNotFound } from './helpers';

export async function open(modalKey) {
  const modal = getModal.call(this, modalKey);
  if (!modal) return modalNotFound(modalKey);
  const config = getModalConfig.call(this, modal);
  if (hasClass(modal, config.stateClosed)) {
    this.working = true;
    setOverflowHidden(true, config.selectorOverflow);
    await openTransition(modal, config);
    this.focusTrap.init(modal);
    focusTarget(modal, config);
    setInert(true, config.selectorInert);
    modal.dispatchEvent(new CustomEvent(config.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));
    this.working = false;
    return modal;
  } else {
    return modal;
  }
}
