import { setInert } from './setInert';
import { setOverflowHidden } from './setOverflowHidden';

export function updateGlobalState(param, config) {
  // Set inert state based on if a modal is active.
  setInert(!!param, config.selectorInert);

  // Set overflow state based on if a modal is active.
  setOverflowHidden(!!param, config.selectorOverflow);
}
