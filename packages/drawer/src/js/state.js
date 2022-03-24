import { hasClass } from '@vrembem/core/index';

import { open } from './open';
import { close } from './close';

export async function stateSet(settings) {
  // If save state is disabled
  if (!settings.stateSave) return stateClear(settings);

  // If there isn't an existing state to set
  const storageCheck = localStorage.getItem(settings.stateKey);
  if (!storageCheck || (storageCheck && Object.keys(JSON.parse(storageCheck)).length === 0)) {
    return stateSave.call(this, null, settings);
  }

  // Set the existing state
  const state = JSON.parse(localStorage.getItem(settings.stateKey));

  Object.keys(state).forEach(async (key) => {
    const entry = this.get(key);

    if (!entry || entry.mode === 'modal') return;

    if (entry.state === state[key]) return;

    if (state[key] === 'opened') {
      await open.call(this, key, false, false);
    } else {
      await close.call(this, key, false, false);
    }
  });

  // Return the state.
  return state;
}

export function stateSave(target, settings) {
  // If save state is disabled
  if (!settings.stateSave) return stateClear(settings);

  // Get the currently saved object if it exists
  const state = (localStorage.getItem(settings.stateKey)) ?
    JSON.parse(localStorage.getItem(settings.stateKey)) : {};

  // Are we saving a single target or the entire suite?
  const drawers = (target) ? [target] : this.currentState;

  // Loop through drawers and save their states
  drawers.forEach((el) => {
    const entry = this.get(el.id);

    if (!entry || entry.mode === 'modal') return;

    const drawerKey = el.getAttribute(`data-${settings.dataDrawer}`);
    state[drawerKey] = (hasClass(el, settings.stateOpened)) ? 'opened' : 'closed';
  });

  // Save to localStorage and return the state
  localStorage.setItem(settings.stateKey, JSON.stringify(state));

  // Return the state.
  return state;
}

export function stateClear(settings) {
  if (localStorage.getItem(settings.stateKey)) {
    localStorage.removeItem(settings.stateKey);
  }
  return {};
}
