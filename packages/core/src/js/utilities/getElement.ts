/**
 * Retrieves an HTML element by its ID or returns the element directly if it's
 * already provided. Ensures that the element has an ID.
 *
 * @param {string | HTMLElement} query
 *   A string representing an element's ID or an `HTMLElement`.
 *   - If a string is provided, it will be used with `getElementById`.
 *   - If an `HTMLElement` is provided, it will be returned directly.
 *
 * @returns {HTMLElement}
 *   An `HTMLElement` or throws an error if no element was found.
 */
export function getElement(query: string | HTMLElement): HTMLElement {
  if (typeof query === "string") {
    const el = document.getElementById(query);
    if (el) return el;
    throw new Error(`Element not found with ID: "${query}"`);
  } else if (query instanceof HTMLElement) {
    if (!query.id) {
      throw new Error("HTMLElement must have an ID");
    }
    return query;
  } else {
    throw new Error("Invalid argument: query must be a string or HTMLElement");
  }
}
