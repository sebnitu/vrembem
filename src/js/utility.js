/**
 * Utility
 * ---
 * A set of helper methods for general javascript plugin use.
 */
export default class {

  /**
   * Checks if an element has a class or not
   * ---
   * @param {Element} Element to check class(es) on
   * @param {String} || {Array} Class(es) to check
   * @returns {Boolean} Returns true if class exists on element, otherwise false
   */
  static hasClass(el, c) {

    c = this.toArray(c)

    return c.every((c) => {
      return el.classList.contains(c)
    })
  }

  /**
   * Adds a class or classes to an element
   * ---
   * @param {Element} Element to add class(es) on
   * @param {String} || {Array} Class(es) to add
   */
  static addClass(el, c) {

    c = this.toArray(c)

    c.forEach((c) => {
      el.classList.add(c)
    })
  }
  /**
   * Remove a class or classes from an element
   * ---
   * @param {Element} Element to remove class(es) from
   * @param {String} || {Array} Class(es) to remove
   */
  static removeClass(el, c) {

    c = this.toArray(c)

    c.forEach((c) => {
      el.classList.remove(c)
    })
  }

  /**
   * Toggle a class or classes on an element
   * ---
   * @param {Element} Element to toggle class(es) on
   * @param {String} || {Array} Class(es) to toggle
   */
  static toggleClass(el, c) {

    c = this.toArray(c)

    c.forEach((c) => {
      el.classList.toggle(c)
    })
  }

  /**
   * Find the closest parent element based on class. This is different from the
   * native .closest() method in that it doesn't check the current element.
   * ---
   * @param {Element} Element to start search on
   * @param {String} || {Array} Class(es) to check for
   * @return {Element} Closest parent element
   */
  static closest(el, c) {
    while ((el = el.parentElement) && !this.hasClass(el, c))
    return el
  }

  /**
   * Converts a string to an array. If an array is passed, it's returned as is.
   * Anything else is returned as false.
   * ---
   * @param {String} || {Array} String to convert to an array
   * @return {Array} Return the converted array
   */
  static toArray(string) {

    var array = []

    if (typeof string === 'string') {
      array.push(string)
    } else if (Array.isArray(string)) {
      array = string
    } else {
      return false
    }

    return array
  }

  /**
   * Merge two or more objects. Returns a new object. Set the first argument
   * to `true` for a deep or recursive merge.
   * ---
   * @param {Boolean} [Optional] If true, do a deep (or recursive) merge
   * @param {Object} The objects to merge together; each overriding the next
   * @returns {Object} Merged values of defaults and options
   */
  static extend() {

    var extended = {}
    var deep = false
    var i = 0
    var length = arguments.length

    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
      deep = arguments[0]
      i++
    }

    let merge = ( obj ) => {
      for ( var prop in obj ) {
        if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
          if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
            extended[prop] = extend( true, extended[prop], obj[prop] )
          } else {
            extended[prop] = obj[prop]
          }
        }
      }
    }

    for ( ; i < length; i++ ) {
      var obj = arguments[i]
      merge(obj)
    }

    return extended
  }

}
