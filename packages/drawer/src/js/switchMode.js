import { open } from './open';
import { close } from './close';

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
  entry.target.classList.remove(this.settings.classModal);

  // Remove the aria-modal attribute and role attribute.
  entry.dialog.removeAttribute('aria-modal');
  entry.dialog.removeAttribute('role');

  // Update the global state.
  updateGlobalState.call(this, false);

  // Remove any focus traps.
  this.focusTrap.destroy();

  // Restore drawers to saved inline state.
  if (this.store[entry.id] === 'opened') {
    await open.call(this, entry, false, false);
  } else {
    await close.call(this, entry, false, false);
  }

  // Dispatch custom switch event.
  entry.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'switchMode', {
    detail: this,
    bubbles: true
  }));

  // Return the entry.
  return entry;
}

async function toModal(entry) {
  // Add the modal class.
  entry.target.classList.add(this.settings.classModal);

  // Set aria-modal attribute to true and role attribute to "dialog".
  entry.dialog.setAttribute('aria-modal', 'true');
  entry.dialog.setAttribute('role', 'dialog');

  // Modal drawer defaults to closed state.
  await close.call(this, entry, false, false);

  // Dispatch custom switch event.
  entry.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'switchMode', {
    detail: this,
    bubbles: true
  }));

  // Return the entry.
  return entry;
}
