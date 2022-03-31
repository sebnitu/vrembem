import { close } from './close';

import { initialState } from './helpers/initialState';
import { updateGlobalState } from './helpers';

export function switchMode(entry) {
  switch (entry.mode) {
    case 'inline':
      return toInline.call(this, entry);
    case 'modal':
      return toModal.call(this, entry);
    default:
      throw new Error(`"${entry.mode}" is not a valid drawer mode.`);
  }
}

async function toInline(entry) {
  // Remove the modal class.
  entry.el.classList.remove(this.settings.classModal);

  // Remove the aria-modal attribute.
  entry.dialog.removeAttribute('aria-modal');

  // Update the global state.
  updateGlobalState.call(this, false);

  // Remove any focus traps.
  this.focusTrap.unmount();

  // Setup initial state.
  await initialState.call(this, entry);

  // Dispatch custom switch event.
  entry.el.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'switchMode', {
    detail: this,
    bubbles: true
  }));

  // Return the entry.
  return entry;
}

async function toModal(entry) {
  // Add the modal class.
  entry.el.classList.add(this.settings.classModal);

  // Set aria-modal attribute to true.
  entry.dialog.setAttribute('aria-modal', 'true');

  // If there isn't a stored state but also has the opened state class...
  if (!this.store[entry.id] && entry.el.classList.contains(this.settings.stateOpened)) {
    // Save the opened state in local store.
    this.store[entry.id] = 'opened';
  }

  // Modal drawer defaults to closed state.
  await close.call(this, entry, false, false);

  // Dispatch custom switch event.
  entry.el.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'switchMode', {
    detail: this,
    bubbles: true
  }));

  // Return the entry.
  return entry;
}
