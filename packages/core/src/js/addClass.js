/**
 * Adds a class or classes to a Node or NodeList.
 * @param {Node || NodeList} el - Element(s) to add class(es) to.
 * @param  {String || Array} cl - Class(es) to add.
 */
export const addClass = (el, ...cl) => {
  el = (el.forEach) ? el : [el];
  el.forEach((el) => {
    el.classList.add(...cl);
  });
};
