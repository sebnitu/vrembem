import { addClass, removeClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTrigger } from '@vrembem/core/index';

export function setInitialState() {
  const modals = document.querySelectorAll(this.settings.selectorModal);
  modals.forEach((el) => {
    // Remove opened state setup
    if (el.classList.contains(this.settings.stateOpened)) {
      setInert(false, this.settings.selectorInert);
      setOverflowHidden(false, this.settings.selectorOverflow);
      focusTrigger(this);
      this.focusTrap.destroy();
    }

    // Remove all state classes and add the default state (closed)
    removeClass(el,
      this.settings.stateOpened,
      this.settings.stateOpening,
      this.settings.stateClosing
    );
    addClass(el, this.settings.stateClosed);
  });
}
