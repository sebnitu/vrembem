import { addClass } from './addClass';
import { removeClass } from './removeClass';

export const openTransition = (el, settings) => {
  return new Promise((resolve) => {
    if (settings.transition) {
      removeClass(el, settings.stateClosed);
      addClass(el, settings.stateOpening);
      el.addEventListener('transitionend', function _f() {
        addClass(el, settings.stateOpened);
        removeClass(el, settings.stateOpening);
        resolve(el);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      addClass(el, settings.stateOpened);
      removeClass(el, settings.stateClosed);
      resolve(el);
    }
  });
};

export const closeTransition = (el, settings) => {
  return new Promise((resolve) => {
    if (settings.transition) {
      addClass(el, settings.stateClosing);
      removeClass(el, settings.stateOpened);
      el.addEventListener('transitionend', function _f() {
        removeClass(el, settings.stateClosing);
        addClass(el, settings.stateClosed);
        resolve(el);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      addClass(el, settings.stateClosed);
      removeClass(el, settings.stateOpened);
      resolve(el);
    }
  });
};
