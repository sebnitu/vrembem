import { addClass, hasClass, removeClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';

import { drawerNotFound } from './helpers';

export async function switchToModal(drawerKey) {
  // Initial guards
  const drawer = this.getDrawer(drawerKey);
  if (!drawer) return drawerNotFound(drawerKey);
  if (hasClass(drawer, this.settings.classModal)) return;

  // Enable modal state
  addClass(drawer, this.settings.classModal);
  addClass(drawer, this.settings.stateClosed);
  removeClass(drawer, this.settings.stateOpened);

  // Dispatch custom event
  drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'toModal', {
    bubbles: true
  }));
  return drawer;
}

export async function switchToDefault(drawerKey) {
  // Initial guards
  const drawer = this.getDrawer(drawerKey);
  if (!drawer) return drawerNotFound(drawerKey);
  if (!hasClass(drawer, this.settings.classModal)) return;

  // Tear down modal state
  setInert(false, this.settings.selectorInert);
  setOverflowHidden(false, this.settings.selectorOverflow);
  removeClass(drawer, this.settings.classModal);
  this.focusTrap.destroy();

  // Restore drawers saved state
  drawerKey = drawer.getAttribute(`data-${this.settings.dataDrawer}`);
  const drawerState = this.state[drawerKey];
  if (drawerState == this.settings.stateOpened) {
    addClass(drawer, this.settings.stateOpened);
    removeClass(drawer, this.settings.stateClosed);
  }

  // Dispatch custom event
  drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'toDefault', {
    bubbles: true
  }));
  return drawer;
}
