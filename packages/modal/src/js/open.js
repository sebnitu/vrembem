import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';

export async function open(modal) {
  console.log('open():', modal);
  if (hasClass(modal.target, this.settings.stateClosed)) {
    this.working = true;
    setOverflowHidden(true, this.settings.selectorOverflow);
    modal.state = 'opening';
    await openTransition(modal.target, this.settings);
    modal.state = 'opened';
    this.focusTrap.init(modal.target);
    focusTarget(modal.target, this.settings);
    setInert(true, this.settings.selectorInert);
    modal.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));
    this.working = false;
    return modal;
  } else {
    return modal;
  }
}
