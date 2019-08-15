'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = {
  breakpoints: {
    xs: "480px",
    sm: "620px",
    md: "760px",
    lg: "990px",
    xl: "1380px"
  }
};

/**
 * Converts a string or object to an array. If an array is passed, it's
 * returned as is. Anything else is returned as an array.
 * ---
 * @param {Object} item - String or object to convert to an array
 * @return {Array} - Return the converted array
 */
var toArray = function toArray(item) {
  var array = [];

  if (Array.isArray(item)) {
    array = item;
  } else {
    array.push(item);
  }

  return array;
};

/**
 * Adds a class or classes to an element
 * ---
 * @param {Node} el - Element(s) to add class(es) on
 * @param {String || Array} c - Class(es) to add
 */

var addClass = function addClass(el, c) {
  el = el.forEach ? el : toArray(el);
  c = toArray(c);
  el.forEach(function (el) {
    c.forEach(function (c) {
      el.classList.add(c);
    });
  });
};

/**
 * Checks if an element has a class or not
 * ---
 * @param {Node} el - Element(s) to check class(es) on
 * @param {String || Array} c - Class(es) to check
 * @returns {Boolean} - Returns true if class exists, otherwise false
 */

var hasClass = function hasClass(el, c) {
  el = el.forEach ? el : toArray(el);
  c = toArray(c);
  return c.some(function (c) {
    var has = false;
    el.forEach(function (el) {
      if (el.classList.contains(c)) {
        has = true;
      }
    });
    return has;
  });
};

/**
 * Find the closest parent element based on class. This is different from the
 * native .closest() method in that it doesn't check the current element.
 * ---
 * @param {Node} el - Element to start search on
 * @param {String || Array} c - Class(es) to check for
 * @return {Node} - Closest parent element
 */

var closest = function closest(el, c) {
  while ((el = el.parentElement) && !hasClass(el, c)) {
    return el;
  }
};

/**
 * Merge two or more objects. Returns a new object. Set the first argument
 * to `true` for a deep or recursive merge.
 * ---
 * @param {Boolean} [Optional] - If true, do a deep (or recursive) merge
 * @param {Object} - The objects to merge together; each overriding the next
 * @returns {Object} - Merged values of defaults and options
 */
var extend = function extend() {
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  if (Object.prototype.toString.call(arguments.length <= 0 ? undefined : arguments[0]) === "[object Boolean]") {
    deep = arguments.length <= 0 ? undefined : arguments[0];
    i++;
  }

  var merge = function merge(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  for (; i < length; i++) {
    var obj = i < 0 || arguments.length <= i ? undefined : arguments[i];
    merge(obj);
  }

  return extended;
};

/**
 * Get and output a breakpoint using it"s key found in core.json
 * ---
 * @param {String} key - The key to search for in the breakpoints object
 * @returns {String} - The pixel value of the breakpoint as a string
 */

var getBreakpoint = function getBreakpoint(key) {
  return config.breakpoints[key];
};

/**
 * Remove a class or classes from an element
 * ---
 * @param {Node} el - Element(s) to remove class(es) from
 * @param {String || Array} c - Class(es) to remove
 */

var removeClass = function removeClass(el, c) {
  el = el.forEach ? el : toArray(el);
  c = toArray(c);
  el.forEach(function (el) {
    c.forEach(function (c) {
      el.classList.remove(c);
    });
  });
};

/**
 * Toggle a class or classes on an element
 * ---
 * @param {Node} el - Element(s) to toggle class(es) on
 * @param {String || Array} c - Class(es) to toggle
 */

var toggleClass = function toggleClass(el, c) {
  el = el.forEach ? el : toArray(el);
  c = toArray(c);
  el.forEach(function (el) {
    c.forEach(function (c) {
      el.classList.toggle(c);
    });
  });
};

exports.addClass = addClass;
exports.closest = closest;
exports.config = config;
exports.extend = extend;
exports.getBreakpoint = getBreakpoint;
exports.hasClass = hasClass;
exports.removeClass = removeClass;
exports.toArray = toArray;
exports.toggleClass = toggleClass;
