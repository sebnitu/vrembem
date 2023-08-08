import { open } from './open';
import { close } from './close';
import { getDrawer } from './helpers';

export async function toggle(query, transition, focus) {
  // Get the drawer from collection.
  const entry = getDrawer.call(this, query);

  // Open or close the drawer based on its current state.
  if (entry.state === 'closed') {
    return open.call(this, entry, transition, focus);
  } else if (entry.state === 'opened') {
    return close.call(this, entry, transition, focus);
  }
}
