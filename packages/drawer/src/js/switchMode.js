import { setInert, setOverflowHidden } from '@vrembem/core/index';

import { open } from './open';
import { close } from './close';

export function switchMode(entry) {
  switch (entry.mode) {
    case 'inline':
      return switchToInline.call(this, entry);
    case 'modal':
      return switchToModal.call(this, entry);
    default:
      throw new Error(`"${entry.mode}" is not a valid drawer mode.`);
  }
}

async function switchToModal(entry) {
  // Add the modal class.
  entry.target.classList.add(this.settings.classModal);

  // Modals default state is closed.
  await close.call(this, entry, false, true);

  // Dispatch custom switch event.
  entry.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'switched-mode', {
    detail: this,
    bubbles: true
  }));

  // Return the entry.
  return entry;
}

async function switchToInline(entry) {
  // Remove the modal class.
  entry.target.classList.remove(this.settings.classModal);

  // Tear down modal state.
  setInert(false, this.settings.selectorInert);
  setOverflowHidden(false, this.settings.selectorOverflow);
  this.focusTrap.destroy();

  // Restore drawers saved state.
  if (this.state[entry.id] === 'opened') {
    await open.call(this, entry, false, true);
  } else {
    await close.call(this, entry, false, true);
  }

  // Dispatch custom switch event.
  entry.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'switched-mode', {
    detail: this,
    bubbles: true
  }));

  // Return the entry.
  return entry;
}
