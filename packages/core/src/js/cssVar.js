import { getPrefix } from "./getPrefix";

/**
 * Get the value of a CSS custom property (variable).
 * @param {String} property - The CSS custom property to query for.
 * @param {Node} [el=document.body] - The element to get computed styles from.
 * @param {Boolean} [prefix=true] - Whether or not to apply a CSS var prefix.
 * @return {String || Error} Return the CSS value or an error if none is found.
 */
export function cssVar(property, el = document.body) {
  // Get the prefix value.
  const prefixValue = getPrefix();
  if (prefixValue) {
    // Remove leading "--" if it exists in the property string.
    if (property.slice(0, 2) === "--") {
      property = property.substring(2);
    }

    // If there is a prefix value and it doesn't already exist on the prop...
    if (property.slice(0, prefixValue.length) !== prefixValue) {
      // Add the prefix.
      property = `${prefixValue}${property}`;
    }
  }

  // Add the double dash for CSS variables if it's missing.
  if (property.slice(0, 2) !== "--") {
    property = `--${property}`;
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
