import { open } from '../open';
import { close } from '../close';

export async function initialState(entry) {
  // Setup initial state using the following priority:
  //  1. If a store state is available, restore from local store.
  //  2. If opened state class is set, set state to opened.
  //  3. Else, initialize default state.
  if (this.store[entry.id]) {
    // Restore drawers to saved inline state.
    if (this.store[entry.id] === 'opened') {
      await open.call(this, entry, false, false);
    } else {
      await close.call(this, entry, false, false);
    }
  } else if (entry.el.classList.contains(this.settings.stateOpened)) {
    // Update drawer state.
    entry.state = 'opened';
  } else {
    // Remove transition state classes.
    entry.el.classList.remove(this.settings.stateOpening);
    entry.el.classList.remove(this.settings.stateClosing);
    // Add closed state class.
    entry.el.classList.add(this.settings.stateClosed);
  }
}
