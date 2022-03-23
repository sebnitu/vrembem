import { hasClass } from '@vrembem/core/index';

import { open } from './open';
import { close } from './close';

export async function stateSet(settings) {
  // If save state is disabled
  if (!settings.stateSave)
    return stateClear(settings);

  // If there isn't an existing state to set
  const storageCheck = localStorage.getItem(settings.stateKey);
  if (!storageCheck || (storageCheck && Object.keys(JSON.parse(storageCheck)).length === 0)) {
    return stateSave(null, settings);
  }

  // Set the existing state
  const state = JSON.parse(localStorage.getItem(settings.stateKey));
  Object.keys(state).forEach(async (key) => {
    const item = document.querySelector(
      `[data-${settings.dataDrawer}="${key}"]`
    );
    if (!item) return;
    if (state[key] == settings.stateOpened) {
      await open.call(this, key, false, true);
    } else {
      await close.call(this, key, false, true);
    }
  });
  return state;
}

export function stateSave(target, settings) {
  // If save state is disabled
  if (!settings.stateSave)
    return stateClear(settings);

  // Get the currently saved object if it exists
  const state = (localStorage.getItem(settings.stateKey)) ?
    JSON.parse(localStorage.getItem(settings.stateKey)) : {};

  // Are we saving a single target or the entire suite?
  const drawers = (target) ? [target] :
    document.querySelectorAll(`[data-${settings.dataDrawer}]`);

  // Loop through drawers and save their states
  drawers.forEach((el) => {
    if (hasClass(el, settings.classModal)) return;
    const drawerKey = el.getAttribute(`data-${settings.dataDrawer}`);
    state[drawerKey] = (hasClass(el, settings.stateOpened)) ?
      settings.stateOpened : settings.stateClosed;
  });

  // Save to localStorage and return the state
  localStorage.setItem(settings.stateKey, JSON.stringify(state));
  return state;
}

export function stateClear(settings) {
  if (localStorage.getItem(settings.stateKey)) {
    localStorage.removeItem(settings.stateKey);
  }
  return {};
}
