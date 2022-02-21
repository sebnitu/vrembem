/**
 * Get an element(s) from a selector or return value if not a string.
 * @param {String} selector - Selector to query.
 * @param {Boolean} single - Whether to return a single or all matches.
 */
export const getElement = function (selector, single = 0) {
  if (typeof selector !== 'string') return selector;
  return (single) ?
    document.querySelector(selector) :
    document.querySelectorAll(selector);
};
