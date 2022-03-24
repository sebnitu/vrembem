import { openTransition } from '@vrembem/core/index';

import { updateGlobalState, updateFocusState, getDrawer } from './helpers';

export async function open(query, transition, focus = true) {
  // Get the drawer from collection.
  const drawer = getDrawer.call(this, query);

  // Get the modal configuration.
  const config = { ...this.settings };

  // Add transition parameter to configuration.
  if (transition !== undefined) config.transition = transition;

  // If drawer is closed.
  if (drawer.state === 'closed') {
    // Update drawer state.
    drawer.state = 'opening';

    // Run the open transition.
    await openTransition(drawer.target, config);

    // Update the global state if mode is modal, otherwise save inline state.
    if (drawer.mode === 'modal') {
      updateGlobalState.call(this, true);
    } else {
      this.stateSave(drawer.target);
    }

    // Update drawer state.
    drawer.state = 'opened';
  }

  // Set focus to the target element if the focus param is true.
  if (focus) {
    updateFocusState.call(this, drawer);
  }

  // Dispatch custom opened event.
  drawer.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
    detail: this,
    bubbles: true
  }));

  // Return the drawer.
  return drawer;
}
