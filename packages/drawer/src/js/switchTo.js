import { addClass, hasClass, removeClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';

import { open } from './open';
import { close } from './close';
import { getDrawer } from './helpers';

export async function switchToModal(query) {
  // Get the drawer from collection.
  const drawer = getDrawer.call(this, query);

  // TODO: store the drawer mode in entry instead of checking the classModal.
  if (hasClass(drawer.target, this.settings.classModal)) return;

  // Enable modal state.
  addClass(drawer.target, this.settings.classModal);
  await close.call(this, drawer, false, true);

  // Dispatch custom event
  drawer.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'toModal', {
    bubbles: true
  }));

  // Return the drawer.
  return drawer;
}

export async function switchToDefault(query) {
  // Get the drawer from collection.
  const drawer = getDrawer.call(this, query);

  // TODO: store the drawer mode in entry instead of checking the classModal.
  if (!hasClass(drawer.target, this.settings.classModal)) return;

  // Tear down modal state.
  setInert(false, this.settings.selectorInert);
  setOverflowHidden(false, this.settings.selectorOverflow);
  removeClass(drawer.target, this.settings.classModal);
  this.focusTrap.destroy();

  // Restore drawers saved state.
  if (this.state[drawer.id] === 'opened') {
    await open.call(this, drawer, false, true);
  } else {
    await close.call(this, drawer, false, true);
  }

  // Dispatch custom event
  drawer.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'toDefault', {
    bubbles: true
  }));

  // Return the drawer.
  return drawer;
}
