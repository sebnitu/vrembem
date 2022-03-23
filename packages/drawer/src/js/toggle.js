import { getDrawer } from './helpers';

export async function toggle(query) {
  // Get the drawer from collection.
  const drawer = getDrawer.call(this, query);

  // Open or close the drawer based on its current state.
  if (drawer.state === 'closed') {
    return this.open(drawer);
  } else {
    return this.close(drawer);
  }
}
