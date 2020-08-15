import { addClass, hasClass, removeClass } from '@vrembem/core';

export function stateSave(target = null, settings) {
  if (settings.stateSave) {
    const state = (localStorage.getItem(settings.stateKey)) ?
      JSON.parse(localStorage.getItem(settings.stateKey)) : {};
    const drawers = (target) ? [target] :
      document.querySelectorAll(`[data-${settings.dataDrawer}]`);
    drawers.forEach((el) => {
      if (!hasClass(el, settings.classModal)) {
        state[el.getAttribute(`data-${settings.dataDrawer}`)] =
          (hasClass(el, settings.stateOpened)) ?
            settings.stateOpened :
            settings.stateClosed;
      }
    });
    localStorage.setItem(settings.stateKey, JSON.stringify(state));
    return state;
  }
  return {};
}

export function stateSet(settings) {
  if (settings.stateSave) {
    if (localStorage.getItem(settings.stateKey)) {
      const state = JSON.parse(localStorage.getItem(settings.stateKey));
      Object.keys(state).forEach((key) => {
        const item = document.querySelector(
          `[data-${settings.dataDrawer}="${key}"]`
        );
        if (item) {
          if (state[key] == settings.stateOpened) {
            addClass(item, settings.stateOpened);
          } else {
            removeClass(item, settings.stateOpened);
          }
        }
      });
      return state;
    } else {
      return stateSave(null, settings);
    }
  } else {
    if (localStorage.getItem(settings.stateKey)) {
      localStorage.removeItem(settings.stateKey);
    }
    return {};
  }
}
