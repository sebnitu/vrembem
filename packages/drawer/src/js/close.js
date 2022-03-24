import { closeTransition } from '@vrembem/core/index';

import { updateGlobalState, updateFocusState, getDrawer } from './helpers';

export async function close(query, transition, focus = true) {
  // Get the drawer from collection.
  const drawer = getDrawer.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings };

  // Add transition parameter to configuration.
  if (transition !== undefined) config.transition = transition;

  // If drawer is opened.
  if (drawer.state === 'opened') {
    // Update drawer state.
    drawer.state = 'closing';

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    await closeTransition(drawer.target, config);

    // Update the global state if mode is modal, otherwise save inline state.
    if (drawer.mode === 'modal') {
      updateGlobalState.call(this, false);
    } else {
      this.stateSave(drawer.target);
    }

    // Set focus to the trigger element if the focus param is true.
    if (focus) {
      updateFocusState.call(this, drawer);
    }

    // Update drawer state.
    drawer.state = 'closed';

    // Dispatch custom closed event.
    drawer.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
      detail: this,
      bubbles: true
    }));
  }

  // Return the drawer.
  return drawer;
}
