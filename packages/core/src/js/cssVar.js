import { getPrefix } from './getPrefix';

export function cssVar(property, el = document.body, prefix = true) {
  if (prefix) {
    const prefixValue = getPrefix();
    if (prefixValue && !property.includes(`--${prefixValue}`)) {
      property = property.replace('--', `--${prefixValue}`);
    }
  }
  const cssValue = getComputedStyle(el).getPropertyValue(property).trim();
  if (cssValue) {
    return cssValue;
  } else {
    throw new Error(`CSS variable "${property}" was not found!`);
  }
}
