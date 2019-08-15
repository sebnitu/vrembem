/**
 * Converts a string or object to an array. If an array is passed, it's
 * returned as is. Anything else is returned as an array.
 * ---
 * @param {Object} item - String or object to convert to an array
 * @return {Array} - Return the converted array
 */

export const toArray = (item) => {

  let array = []

  if (Array.isArray(item)) {
    array = item
  } else {
    array.push(item)
  }

  return array
}
