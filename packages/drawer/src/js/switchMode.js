import { setInert, setOverflowHidden } from '@vrembem/core/index';

import { open } from './open';
import { close } from './close';

export function switchMode(entry) {
  switch (entry.mode) {
    case 'inline':
      return switchModeToInline.call(this, entry);
    case 'modal':
      return switchModeToModal.call(this, entry);
    default:
      throw new Error(`"${entry.mode}" is not a valid drawer mode.`);
  }
}

async function switchModeToModal(entry) {
  // Add the modal class.
  entry.target.classList.add(this.settings.classModal);

  // Modal drawer defaults to closed state.
  await close.call(this, entry, false, true);

  // Dispatch custom switch event.
  entry.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'switchMode', {
    detail: this,
    bubbles: true
  }));

  // Return the entry.
  return entry;
}

async function switchModeToInline(entry) {
  // Remove the modal class.
  entry.target.classList.remove(this.settings.classModal);

  // TODO: move this to updateGlobalState helper.
  setInert(false, this.settings.selectorInert);
  setOverflowHidden(false, this.settings.selectorOverflow);
  this.focusTrap.destroy();

  // Restore drawers to saved inline state.
  if (this.state[entry.id] === 'opened') {
    await open.call(this, entry, false, true);
  } else {
    await close.call(this, entry, false, true);
  }

  // Dispatch custom switch event.
  entry.target.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'switchMode', {
    detail: this,
    bubbles: true
  }));

  // Return the entry.
  return entry;
}
