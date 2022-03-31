import { setInert, setOverflowHidden } from '@vrembem/core/index';
import { updateStackIndex } from './updateStackIndex';

export function updateGlobalState() {
  // Set inert state based on if a modal is active.
  setInert(!!this.active, this.settings.selectorInert);

  // Set overflow state based on if a modal is active.
  setOverflowHidden(!!this.active, this.settings.selectorOverflow);

  // Update the z-index of the stack.
  updateStackIndex(this.stack);
}
