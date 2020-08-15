import { addClass, hasClass, removeClass } from '@vrembem/core';
import { setInert, setOverflowHidden } from '@vrembem/core';

export function switchToModal(drawerKey, obj) {
  // Initial guards
  const drawer = obj.getDrawer(drawerKey);
  if (!drawer) return obj.drawerNotFound(drawerKey);
  if (hasClass(drawer, obj.settings.classModal)) return;

  // Enable modal state
  addClass(drawer, obj.settings.classModal);
  addClass(drawer, obj.settings.stateClosed);
  removeClass(drawer, obj.settings.stateOpened);

  // Dispatch custom event
  drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toModal', {
    bubbles: true
  }));
}

export function switchToDefault(drawerKey, obj) {
  // Initial guards
  const drawer = obj.getDrawer(drawerKey);
  if (!drawer) return obj.drawerNotFound(drawerKey);
  if (!hasClass(drawer, obj.settings.classModal)) return;

  // Tear down modal state
  setInert(false, obj.settings.selectorInert);
  setOverflowHidden(false, obj.settings.selectorOverflow);
  removeClass(drawer, obj.settings.classModal);
  obj.focusTrap.destroy();

  // Restore drawers saved state
  drawerKey = drawer.getAttribute(`data-${obj.settings.dataDrawer}`);
  const drawerState = obj.state[drawerKey];
  if (drawerState == obj.settings.stateOpened) {
    addClass(drawer, obj.settings.stateOpened);
    removeClass(drawer, obj.settings.stateClosed);
  }

  // Dispatch custom event
  drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toDefault', {
    bubbles: true
  }));
}
