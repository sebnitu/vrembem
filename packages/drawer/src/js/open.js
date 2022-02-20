import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';

export async function open(drawerKey) {
  const drawer = this.getDrawer(drawerKey);
  if (!drawer) return this.drawerNotFound(drawerKey);
  if (!hasClass(drawer, this.settings.stateOpened)) {
    this.working = true;
    const isModal = hasClass(drawer, this.settings.classModal);
    if (isModal) {
      setOverflowHidden(true, this.settings.selectorOverflow);
    }
    await openTransition(drawer, this.settings);
    this.stateSave(drawer);
    if (isModal) {
      this.focusTrap.init(drawer);
      setInert(true, this.settings.selectorInert);
    }
    focusTarget(drawer, this.settings);
    drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));
    this.working = false;
    return drawer;
  } else {
    focusTarget(drawer, this.settings);
    return drawer;
  }
}
