import { addClass, removeClass } from '@vrembem/core/index';
import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { focusTrigger } from '@vrembem/core/index';

export function setInitialState(obj) {
  const modals = document.querySelectorAll(`[data-${obj.settings.dataModal}]`);
  modals.forEach((el) => {
    if (el.classList.contains(obj.settings.stateOpened)) {
      setInert(false, obj.settings.selectorInert);
      setOverflowHidden(false, obj.settings.selectorOverflow);
      focusTrigger(obj);
      obj.focusTrap.destroy();
    }
    removeClass(el,
      obj.settings.stateOpened,
      obj.settings.stateOpening,
      obj.settings.stateClosing
    );
    addClass(el, obj.settings.stateClosed);
  });
}
