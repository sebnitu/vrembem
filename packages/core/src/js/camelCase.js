/**
 * Takes a hyphen cased string and converts it to camel case
 * ---
 * @param {String } str - the string to convert to camel case
 * @returns {Boolean} - returns a camel cased string
 */

export const camelCase = (str) => {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase()
  })
}
