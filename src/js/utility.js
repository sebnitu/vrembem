import config from 'config'

/**
 * Utility
 * ---
 * A set of helper methods for general javascript plugin use.
 */
export default class {

  /**
   * Get and output a breakpoint using it's key found in config.json
   * ---
   * @param {String} The key to search for in the breakpoints object
   * @returns {String} The pixel value of the breakpoint as a string
   */
  static getBreakpoint(key) {
    return config.breakpoints[key]
  }

  /**
   * Checks if an element has a class or not
   * ---
   * @param {Object} || {Nodelist} Element(s) to check class(es) on
   * @param {String} || {Array} Class(es) to check
   * @returns {Boolean} Returns true if class exists on element, otherwise false
   */
  static hasClass(el, c) {
    if (!el.forEach) {
      el = this.toArray(el)
    }
    c = this.toArray(c)
    return c.some( function (c) {
      let has = false
      el.forEach((el) => {
        if (el.classList.contains(c)) {
          has = true
        }
      })
      return has
    })
  }

  /**
   * Adds a class or classes to an element
   * ---
   * @param {Object} || {Nodelist} Element(s) to add class(es) on
   * @param {String} || {Array} Class(es) to add
   */
  static addClass(el, c) {
    if (!el.forEach) {
      el = this.toArray(el)
    }
    c = this.toArray(c)
    el.forEach((el) => {
      c.forEach((c) => {
        el.classList.add(c)
      })
    })
  }

  /**
   * Remove a class or classes from an element
   * ---
   * @param {Object} || {Nodelist} Element(s) to remove class(es) from
   * @param {String} || {Array} Class(es) to remove
   */
  static removeClass(el, c) {
    if (!el.forEach) {
      el = this.toArray(el)
    }
    c = this.toArray(c)
    el.forEach((el) => {
      c.forEach((c) => {
        el.classList.remove(c)
      })
    })
  }

  /**
   * Toggle a class or classes on an element
   * ---
   * @param {Object} || {Nodelist} Element(s) to toggle class(es) on
   * @param {String} || {Array} Class(es) to toggle
   */
  static toggleClass(el, c) {
    if (!el.forEach) {
      el = this.toArray(el)
    }
    c = this.toArray(c)
    el.forEach((el) => {
      c.forEach((c) => {
        el.classList.toggle(c)
      })
    })
  }

  /**
   * Find the closest parent element based on class. This is different from the
   * native .closest() method in that it doesn't check the current element.
   * ---
   * @param {Object} Element to start search on
   * @param {String} || {Array} Class(es) to check for
   * @return {Element} Closest parent element
   */
  static closest(el, c) {
    while ((el = el.parentElement) && !this.hasClass(el, c))
    return el
  }

  /**
   * Converts a string or object to an array. If an array is passed, it's
   * returned as is. Anything else is returned as an array.
   * ---
   * @param {String} || {Object} String or object to convert to an array
   * @return {Array} Return the converted array
   */
  static toArray(item) {

    let array = []

    if (Array.isArray(item)) {
      array = item
    } else {
      array.push(item)
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

    let extended = {}
    let deep = false
    let i = 0
    let length = arguments.length

    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
      deep = arguments[0]
      i++
    }

    let merge = ( obj ) => {
      for ( let prop in obj ) {
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
      let obj = arguments[i]
      merge(obj)
    }

    return extended
  }

}
