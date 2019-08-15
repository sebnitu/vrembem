/**
 * Merge two or more objects. Returns a new object. Set the first argument
 * to `true` for a deep or recursive merge.
 * ---
 * @param {Boolean} [Optional] - If true, do a deep (or recursive) merge
 * @param {Object} - The objects to merge together; each overriding the next
 * @returns {Object} - Merged values of defaults and options
 */

export const extend = (...arg) => {

  let extended = {}
  let deep = false
  let i = 0
  let length = arg.length

  if ( Object.prototype.toString.call( arg[0] ) === "[object Boolean]" ) {
    deep = arg[0]
    i++
  }

  let merge = ( obj ) => {
    for ( let prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
        if ( deep && Object.prototype.toString.call(obj[prop]) === "[object Object]" ) {
          extended[prop] = extend( true, extended[prop], obj[prop] )
        } else {
          extended[prop] = obj[prop]
        }
      }
    }
  }

  for ( ; i < length; i++ ) {
    let obj = arg[i]
    merge(obj)
  }

  return extended
}
