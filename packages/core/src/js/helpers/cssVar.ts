import { getPrefix } from "./";

type cssVarOptions = {
  fallback?: string;
  element?: HTMLElement;
};

/**
 * Get the value of a CSS custom property (variable).
 *
 * @param {string} property
 *   The CSS custom property to query for. If not prefixed with `--`, a prefix
 *   will be added automatically.
 * @param {cssVarOptions} options
 *   An optional configuration object:
 *   - `fallback` (string): A fallback value to return if the custom property is
 *     not found. Defaults to `null` for no fallback.
 *   - `element` (HTMLElement): The HTML element to query the CSS variable from.
 *     Defaults to `document.body`.
 *
 * @return {string}
 *   The CSS value of the custom property, the fallback value, or an error if
 *   the property is not found and no fallback is provided.
 */
export function cssVar(property: string, options: cssVarOptions = {}): string {
  const settings = {
    fallback: null,
    element: document.body,
    ...options
  };

  // If property doesn't have CSS variable double dash...
  if (!property.startsWith("--")) {
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
