import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTarget } from '@vrembem/core/index';
import { openTransition } from '@vrembem/core/index';

import { getDrawer } from './helpers';

export async function open(query, transition, bulk = false) {
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

    // TODO: store the drawer mode in entry instead of checking the classModal.
    const isModal = hasClass(drawer.target, this.settings.classModal);
    if (isModal) {
      setOverflowHidden(true, this.settings.selectorOverflow);
    }

    // Run the open transition.
    await openTransition(drawer.target, config);

    // TODO: refactor the state module.
    if (!isModal) {
      this.stateSave(drawer.target);
    }

    // TODO: store the drawer mode in entry instead of checking the classModal.
    if (isModal) {
      this.focusTrap.init(drawer.target);
      setInert(true, this.settings.selectorInert);
    }

    // Update drawer state.
    drawer.state = 'opened';
  }

  // Set focus to the target element if this is not a bulk action.
  if (!bulk) {
    focusTarget(drawer.target, this.settings);
  }

  // Dispatch custom opened event.
  drawer.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
    detail: this,
    bubbles: true
  }));

  // Return the drawer.
  return drawer;
}
