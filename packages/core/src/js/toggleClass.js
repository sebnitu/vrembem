/**
 * Toggle a class or classes on an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to toggle class(es) on
 * @param {String || Array} cl - Class(es) to toggle
 */

export const toggleClass = (el, ...cl) => {
  el = (el.forEach) ? el : [el]
  el.forEach((el) => {
    cl.forEach((cl) => {
      el.classList.toggle(cl)
    })
  })
}
