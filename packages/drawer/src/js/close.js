import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTrigger } from '@vrembem/core/index';
import { closeTransition } from '@vrembem/core/index';

import { drawerNotFound } from './helpers';

export async function close(drawerKey) {
  const drawer = this.getDrawer(drawerKey);
  if (!drawer) return drawerNotFound(drawerKey);
  if (hasClass(drawer, this.settings.stateOpened)) {
    this.working = true;
    if (hasClass(drawer, this.settings.classModal)) {
      setInert(false, this.settings.selectorInert);
      setOverflowHidden(false, this.settings.selectorOverflow);
    }
    await closeTransition(drawer, this.settings);
    this.stateSave(drawer);
    focusTrigger(this);
    this.focusTrap.destroy();
    drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));
    this.working = false;
    return drawer;
  } else {
    return drawer;
  }
}
