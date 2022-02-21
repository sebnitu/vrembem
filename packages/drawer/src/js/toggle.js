import { hasClass } from '@vrembem/core/index';

import { drawerNotFound } from './helpers';

export async function toggle(drawerKey) {
  const drawer = this.getDrawer(drawerKey);
  if (!drawer) return drawerNotFound(drawerKey);
  const isClosed = !hasClass(drawer, this.settings.stateOpened);
  if (isClosed) {
    return this.open(drawer);
  } else {
    return this.close(drawer);
  }
}
