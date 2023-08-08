import { closeTransition, updateGlobalState } from '@vrembem/core';
import { updateFocusState, getDrawer } from './helpers';

export async function close(query, transition, focus = true) {
  // Get the drawer from collection.
  const entry = getDrawer.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings, ...entry.settings };

  // Add transition parameter to configuration.
  if (transition !== undefined) config.transition = transition;

  // If drawer is not closed.
  if (entry.state === 'closed' || entry.state === 'indeterminate') {
    // Update drawer state.
    entry.state = 'closing';

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    await closeTransition(entry.el, config);

    // Update the global state if mode is modal.
    if (entry.mode === 'modal') updateGlobalState(false, config);

    // Set focus to the trigger element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, entry);
    }

    // Update drawer state.
    entry.state = 'closed';

    // Dispatch custom closed event.
    entry.el.dispatchEvent(new CustomEvent(config.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));
  }

  // Return the drawer.
  return entry;
}
