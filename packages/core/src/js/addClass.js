import { toArray } from "./toArray"

/**
 * Adds a class or classes to an element
 * ---
 * @param {Node} el - Element(s) to add class(es) on
 * @param {String || Array} c - Class(es) to add
 */

export const addClass = (el, c) => {

  el = (el.forEach) ? el : toArray(el)
  c = toArray(c)

  el.forEach((el) => {
    c.forEach((c) => {
      el.classList.add(c)
    })
  })
}
