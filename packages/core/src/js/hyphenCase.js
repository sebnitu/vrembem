/**
 * Takes a camel cased string and converts it to hyphen case.
 * @param {String } str - the string to convert to hyphen case.
 * @returns {Boolean} - returns a hyphen cased string.
 */
export const hyphenCase = (str) => {
  return str.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + '-' + g[1].toLowerCase();
  });
};
