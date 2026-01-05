import { getPrefix } from "./";

type cssVarOptions = {
  fallback?: string;
  element?: HTMLElement;
};

/**
 * Gets the value of a CSS custom property (variable).
 *
 * @param {string} property
 *   The CSS custom property to query for. If not prefixed with `--`, a prefix
 *   will be added automatically.
 * @param {cssVarOptions} [options]
 * @param {string} [options.fallback]
 *   A fallback value to return if the custom property is not found.
 *   Defaults to "".
 * @param {HTMLElement} [options.element]
 *   The HTML element to query the CSS variable from.
 *   Defaults to `document.body`.
 *
 * @returns {string} The CSS value of the custom property or the fallback value.
 */
export function cssVar(property: string, options: cssVarOptions = {}): string {
  const config = {
    fallback: "",
    element: document.body,
    ...options
  };

  // If property doesn't have CSS variable double dash, build the property
  if (!property.startsWith("--")) {
    property = `--${getPrefix("-")}${property}`;
  }

  // Get the CSS value
  const cssValue = getComputedStyle(config.element)
    .getPropertyValue(property)
    .trim();

  // If a CSS value was found, return the CSS value
  return cssValue || config.fallback;
}
