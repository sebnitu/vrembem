import { openTransition, updateGlobalState } from '@vrembem/core';
import { updateFocusState, getDrawer } from './helpers';

export async function open(query, transition, focus = true) {
  // Get the drawer from collection.
  const entry = getDrawer.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...entry.settings };

  // Add transition parameter to configuration.
  if (transition !== undefined) config.transition = transition;

  // If drawer is not opened.
  if (entry.state != 'opened') {
    // Update drawer state.
    entry.state = 'opening';

    // Run the open transition.
    await openTransition(entry.el, config);

    // Update the global state if mode is modal.
    if (entry.mode === 'modal') updateGlobalState(true, config);

    // Set focus to the drawer element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, entry);
    }

    // Update drawer state.
    entry.state = 'opened';

    // Dispatch custom opened event.
    entry.el.dispatchEvent(new CustomEvent(config.customEventPrefix + 'opened', {
      detail: this,
      bubbles: true
    }));
  }

  // Return the drawer.
  return entry;
}
