import { hasClass } from "./hasClass"

/**
 * Find the closest parent element based on class. This is different from the
 * native .closest() method in that it doesn't check the current element.
 * ---
 * @param {Node} el - Element to start search on
 * @param {String || Array} c - Class(es) to check for
 * @return {Node} - Closest parent element
 */

export const closest = (el, c) => {
  while ((el = el.parentElement) && !hasClass(el, c)) {
    return el
  }
}
