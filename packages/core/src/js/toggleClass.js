import { toArray } from "./toArray"

/**
 * Toggle a class or classes on an element
 * ---
 * @param {Node} el - Element(s) to toggle class(es) on
 * @param {String || Array} c - Class(es) to toggle
 */

export const toggleClass = (el, c) => {

  el = (el.forEach) ? el : toArray(el)
  c = toArray(c)

  el.forEach((el) => {
    c.forEach((c) => {
      el.classList.toggle(c)
    })
  })
}
