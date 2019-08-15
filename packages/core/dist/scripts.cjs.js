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

var toArray = function toArray(item) {
  var array = [];

  if (Array.isArray(item)) {
    array = item;
  } else {
    array.push(item);
  }

  return array;
};

var addClass = function addClass(el, c) {
  el = el.forEach ? el : toArray(el);
  c = toArray(c);
  el.forEach(function (el) {
    c.forEach(function (c) {
      el.classList.add(c);
    });
  });
};

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

var closest = function closest(el, c) {
  while ((el = el.parentElement) && !hasClass(el, c)) {
    return el;
  }
};

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

var getBreakpoint = function getBreakpoint(key) {
  return config.breakpoints[key];
};

var removeClass = function removeClass(el, c) {
  el = el.forEach ? el : toArray(el);
  c = toArray(c);
  el.forEach(function (el) {
    c.forEach(function (c) {
      el.classList.remove(c);
    });
  });
};

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
