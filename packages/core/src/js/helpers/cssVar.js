import { getPrefix } from "./";

/**
 * Get the value of a CSS custom property (variable).
 *
 * @param {string} property - The CSS custom property to query for.
 * @param {object} options - An options object with optional configuration.
 *
 * @return {string}
 *   The CSS value of the custom property, the fallback value,
 *   or an error if the property is not found.
 */
export function cssVar(property, options) {
  const settings = {
    fallback: null,
    element: document.body,
    ...options
  };

  // If property doesn't have CSS variable double dash...
  if (property.slice(0, 2) !== "--") {
    // Get the prefix value
    const prefixValue = getPrefix();

    // If a prefix was found, add it to the property name
    if (prefixValue) {
      property = `${prefixValue}${property}`;
    }

    // Add the double dash for CSS variables to the property name
    property = `--${property}`;
  }

  // Get the CSS value
  const cssValue = getComputedStyle(settings.element)
    .getPropertyValue(property)
    .trim();

  // If a CSS value was found, return the CSS value
  if (cssValue) {
    return cssValue;
  }

  // Else, return the fallback or a blocking error
  else {
    if (settings.fallback) {
      return settings.fallback;
    } else {
      throw new Error(`CSS variable "${property}" was not found!`);
    }
  }
}
