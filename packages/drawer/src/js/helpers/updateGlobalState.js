import { setInert, setOverflowHidden } from '@vrembem/core/index';

export function updateGlobalState(param, config) {
  // Set inert state based on if a modal is active.
  setInert(!!param, config.selectorInert);

  // Set overflow state based on if a modal is active.
  setOverflowHidden(!!param, config.selectorOverflow);
}
