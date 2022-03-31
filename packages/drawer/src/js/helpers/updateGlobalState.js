import { setInert, setOverflowHidden } from '@vrembem/core/index';

export function updateGlobalState(param) {
  // Set inert state based on if a modal is active.
  setInert(!!param, this.settings.selectorInert);

  // Set overflow state based on if a modal is active.
  setOverflowHidden(!!param, this.settings.selectorOverflow);
}
