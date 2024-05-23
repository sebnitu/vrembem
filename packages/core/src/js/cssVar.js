import { getPrefix } from "./getPrefix";

/**
 * Get the value of a CSS custom property (variable).
 * @param {String} property - The CSS custom property to query for.
 * @param {Node} [el=document.body] - The element to get computed styles from.
 * @param {Boolean} [prefix=true] - Whether or not to apply a CSS var prefix.
 * @return {String || Error} Return the CSS value or an error if none is found.
 */
export function cssVar(property, el = document.body, prefix = true) {
  // Apply CSS prefix if enabled.
  if (prefix) {
    // Get the prefix value.
    const prefixValue = getPrefix();

    // If there is a prefix value and it doesn't already exist on the var...
    if (prefixValue && !property.includes(`--${prefixValue}`)) {
      // Apply the prefix.
      property = property.replace("--", `--${prefixValue}`);
    }
  }

  // Get the CSS value.
  const cssValue = getComputedStyle(el).getPropertyValue(property).trim();

  // If a CSS value was found...
  if (cssValue) {
    // Return the CSS value.
    return cssValue;
  } else {
    // Else, return a blocking error.
    throw new Error(`CSS variable "${property}" was not found!`);
  }
}
