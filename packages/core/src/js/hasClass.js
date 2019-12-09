/**
 * Checks an element or NodeList whether they contain a class or classes
 * Ref: https://davidwalsh.name/nodelist-array
 * ---
 * @param {Node} el - Element(s) to check class(es) on
 * @param {String || Array} c - Class(es) to check
 * @returns {Boolean} - Returns true if class exists, otherwise false
 */

export const hasClass = (el, ...cl) => {
  el = (el.forEach) ? el : [el]
  el = [].slice.call(el)

  return cl.some((cl) => {
    return el.some((el) => {
      if (el.classList.contains(cl)) return true
    })
  })
}
