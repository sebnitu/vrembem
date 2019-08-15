import { toArray } from "./toArray"

/**
 * Checks if an element has a class or not
 * ---
 * @param {Node} el - Element(s) to check class(es) on
 * @param {String || Array} c - Class(es) to check
 * @returns {Boolean} - Returns true if class exists, otherwise false
 */

export const hasClass = (el, c) => {

  el = (el.forEach) ? el : toArray(el)
  c = toArray(c)

  return c.some((c) => {
    let has = false
    el.forEach((el) => {
      if (el.classList.contains(c)) {
        has = true
      }
    })
    return has
  })
}
