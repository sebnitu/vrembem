import { toArray } from "./toArray"

/**
 * Remove a class or classes from an element
 * ---
 * @param {Node} el - Element(s) to remove class(es) from
 * @param {String || Array} c - Class(es) to remove
 */

export const removeClass = (el, c) => {

  el = (el.forEach) ? el : toArray(el)
  c = toArray(c)

  el.forEach((el) => {
    c.forEach((c) => {
      el.classList.remove(c)
    })
  })
}
