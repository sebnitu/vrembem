/**
 * Remove a class or classes from an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to remove class(es) from
 * @param {String || Array} cl - Class(es) to remove
 */

export const removeClass = (el, ...cl) => {
  el = (el.forEach) ? el : [el];
  el.forEach((el) => {
    el.classList.remove(...cl);
  });
};
