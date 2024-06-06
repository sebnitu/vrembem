import { getPrefix } from "./getPrefix";

/**
 * Get the value of a CSS custom property (variable).
 * @param {String} property - The CSS custom property to query for.
 * @param {Node} [el=document.body] - The element to get computed styles from.
 * @param {Boolean} [prefix=true] - Whether or not to apply a CSS var prefix.
 * @return {String || Error} Return the CSS value or an error if none is found.
 */
export function cssVar(property, el = document.body) {
  // If property doesn't have CSS variable double dash...
  if (property.slice(0, 2) !== "--") {
    // Get the prefix value.
    const prefixValue = getPrefix();

    // If a prefix was found, add it to the property name.
    if (prefixValue) {
      property = `${prefixValue}${property}`;
    }

    // Add the double dash for CSS variables to the property name.
    property = `--${property}`;
  }

  // Get the CSS value.
  const cssValue = getComputedStyle(el).getPropertyValue(property).trim();

  // If a CSS value was found, return the CSS value.
  if (cssValue) {
    return cssValue;
  }
  
  // Else, return a blocking error.
  else {
    throw new Error(`CSS variable "${property}" was not found!`);
  }
}
