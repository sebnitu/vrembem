import { hasClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTrigger } from '@vrembem/core/index';
import { closeTransition } from '@vrembem/core/index';

import { getDrawer } from './helpers';

export async function close(query, transition, bulk = false) {
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

    // TODO: store the drawer mode in entry instead of checking the classModal.
    const isModal = hasClass(drawer.target, this.settings.classModal);
    if (isModal) {
      setInert(false, this.settings.selectorInert);
      setOverflowHidden(false, this.settings.selectorOverflow);
    }

    // Remove focus from active element.
    document.activeElement.blur();

    // Run the close transition.
    await closeTransition(drawer.target, config);

    // TODO: refactor the state module.
    if (!isModal) {
      this.stateSave(drawer.target);
    }

    // Return focus to trigger element if this is not a bulk action.
    if (!bulk) {
      focusTrigger(this);
    }

    // Destroy focus trap.
    this.focusTrap.destroy();

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
