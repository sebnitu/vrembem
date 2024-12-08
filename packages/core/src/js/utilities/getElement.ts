/**
 * Retrieves an HTML element by its ID or returns the element directly if it's
 * already provided.
 *
 * @param {string|HTMLElement} query
 *   A string representing an element's ID or an `HTMLElement`.
 *   - If a string is provided, it will be used with `getElementById`.
 *   - If an `HTMLElement` is provided, it will be returned directly.
 *
 * @returns {HTMLElement|null}
 *   An `HTMLElement` or `null` if no element was found.
 */
export function getElement(query: string | HTMLElement): HTMLElement | null {
  if (typeof query === "string") {
    return document.getElementById(query);
  } else if (query instanceof HTMLElement) {
    return query;
  } else {
    return null;
  }
}
