import { open } from './open';
import { close } from './close';
import { getDrawer } from './helpers';

export async function toggle(query, transition) {
  // Get the drawer from collection.
  const drawer = getDrawer.call(this, query);

  // Open or close the drawer based on its current state.
  if (drawer.state === 'closed') {
    return open.call(this, drawer, transition);
  } else {
    return close.call(this, drawer, transition);
  }
}
