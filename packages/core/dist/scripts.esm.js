var setInert = function setInert(state, selector) {
  if (selector) {
    var els = document.querySelectorAll(selector);
    els.forEach(function (el) {
      if (state) {
        el.inert = true;
        el.setAttribute('aria-hidden', true);
      } else {
        el.inert = null;
        el.removeAttribute('aria-hidden');
      }
    });
  }
};
var setOverflowHidden = function setOverflowHidden(state, selector) {
  if (selector) {
    var els = document.querySelectorAll(selector);
    els.forEach(function (el) {
      if (state) {
        el.style.overflow = 'hidden';
      } else {
        el.style.removeProperty('overflow');
      }
    });
  }
};
var setTabindex = function setTabindex(state, selector) {
  if (selector) {
    var els = document.querySelectorAll(selector);
    els.forEach(function (el) {
      if (state) {
        el.setAttribute('tabindex', '-1');
      } else {
        el.removeAttribute('tabindex');
      }
    });
  }
};

/**
 * Adds a class or classes to an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to add class(es) to
 * @param {String || Array} cl - Class(es) to add
 */
var addClass = function addClass(el) {
  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cl[_key - 1] = arguments[_key];
  }

  el = el.forEach ? el : [el];
  el.forEach(function (el) {
    var _el$classList;

    (_el$classList = el.classList).add.apply(_el$classList, cl);
  });
};

/**
 * Takes a hyphen cased string and converts it to camel case
 * ---
 * @param {String } str - the string to convert to camel case
 * @returns {Boolean} - returns a camel cased string
 */
var camelCase = function camelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var createClass = _createClass;

var focusTarget = function focusTarget(target, settings) {
  var innerFocus = target.querySelector("[data-".concat(settings.dataFocus, "]"));

  if (innerFocus) {
    innerFocus.focus();
  } else {
    var innerElement = target.querySelector('[tabindex="-1"]');
    if (innerElement) innerElement.focus();
  }
};
var focusTrigger = function focusTrigger() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!obj || !obj.memory || !obj.memory.trigger) return;
  obj.memory.trigger.focus();
  obj.memory.trigger = null;
};
var FocusTrap = /*#__PURE__*/function () {
  function FocusTrap() {
    classCallCheck(this, FocusTrap);

    this.target = null;
    this.__handlerFocusTrap = this.handlerFocusTrap.bind(this);
  }

  createClass(FocusTrap, [{
    key: "init",
    value: function init(target) {
      this.target = target;
      this.inner = this.target.querySelector('[tabindex="-1"]');
      this.focusable = this.getFocusable();

      if (this.focusable.length) {
        this.focusableFirst = this.focusable[0];
        this.focusableLast = this.focusable[this.focusable.length - 1];
        this.target.addEventListener('keydown', this.__handlerFocusTrap);
      } else {
        this.target.addEventListener('keydown', this.handlerFocusLock);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.target) return;
      this.inner = null;
      this.focusable = null;
      this.focusableFirst = null;
      this.focusableLast = null;
      this.target.removeEventListener('keydown', this.__handlerFocusTrap);
      this.target.removeEventListener('keydown', this.handlerFocusLock);
      this.target = null;
    }
  }, {
    key: "handlerFocusTrap",
    value: function handlerFocusTrap(event) {
      var isTab = event.key === 'Tab' || event.keyCode === 9;
      if (!isTab) return;

      if (event.shiftKey) {
        if (document.activeElement === this.focusableFirst || document.activeElement === this.inner) {
          this.focusableLast.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === this.focusableLast || document.activeElement === this.inner) {
          this.focusableFirst.focus();
          event.preventDefault();
        }
      }
    }
  }, {
    key: "handlerFocusLock",
    value: function handlerFocusLock(event) {
      var isTab = event.key === 'Tab' || event.keyCode === 9;
      if (isTab) event.preventDefault();
    }
  }, {
    key: "getFocusable",
    value: function getFocusable() {
      var focusable = [];
      var initFocus = document.activeElement;
      var initScrollTop = this.inner ? this.inner.scrollTop : 0;
      this.target.querySelectorAll("\n      a[href]:not([disabled]),\n      button:not([disabled]),\n      textarea:not([disabled]),\n      input[type=\"text\"]:not([disabled]),\n      input[type=\"radio\"]:not([disabled]),\n      input[type=\"checkbox\"]:not([disabled]),\n      select:not([disabled]),\n      [tabindex]:not([tabindex=\"-1\"])\n    ").forEach(function (el) {
        el.focus();

        if (el === document.activeElement) {
          focusable.push(el);
        }
      });
      if (this.inner) this.inner.scrollTop = initScrollTop;
      initFocus.focus();
      return focusable;
    }
  }]);

  return FocusTrap;
}();

/**
 * Get an element(s) from a selector or return value if not a string
 * ---
 * @param {String} selector - Selector to query
 * @param {Boolean} single - Whether to return a single or all matches
 */
var getElement = function getElement(selector) {
  var single = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (typeof selector != 'string') return selector;
  return single ? document.querySelector(selector) : document.querySelectorAll(selector);
};

/**
 * Checks an element or NodeList whether they contain a class or classes
 * Ref: https://davidwalsh.name/nodelist-array
 * ---
 * @param {Node} el - Element(s) to check class(es) on
 * @param {String || Array} c - Class(es) to check
 * @returns {Boolean} - Returns true if class exists, otherwise false
 */
var hasClass = function hasClass(el) {
  el = el.forEach ? el : [el];
  el = [].slice.call(el);

  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cl[_key - 1] = arguments[_key];
  }

  return cl.some(function (cl) {
    return el.some(function (el) {
      if (el.classList.contains(cl)) return true;
    });
  });
};

/**
 * Takes a camel cased string and converts it to hyphen case
 * ---
 * @param {String } str - the string to convert to hyphen case
 * @returns {Boolean} - returns a hyphen cased string
 */
var hyphenCase = function hyphenCase(str) {
  return str.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + '-' + g[1].toLowerCase();
  });
};

/**
 * Moves element(s) in the DOM based on a reference and move type
 * ---
 * @param {String} target - The element(s) to move
 * @param {String} type - Move type can be 'after', 'before', 'append' or 'prepend'
 * @param {String} reference - The reference element the move is relative to
 */

function moveElement(target, type) {
  var reference = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (reference) {
    var els = getElement(target);
    if (!els.length) throw new Error("Move target element \"".concat(target, "\" not found!"));
    var ref = getElement(reference, 1);
    if (!ref) throw new Error("Move reference element \"".concat(reference, "\" not found!"));
    els.forEach(function (el) {
      switch (type) {
        case 'after':
          ref.after(el);
          return {
            ref: ref,
            el: el,
            type: type
          };

        case 'before':
          ref.before(el);
          return {
            ref: ref,
            el: el,
            type: type
          };

        case 'append':
          ref.append(el);
          return {
            ref: ref,
            el: el,
            type: type
          };

        case 'prepend':
          ref.prepend(el);
          return {
            ref: ref,
            el: el,
            type: type
          };

        default:
          throw new Error("Move type \"".concat(type, "\" does not exist!"));
      }
    });
  }
}

/**
 * Remove a class or classes from an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to remove class(es) from
 * @param {String || Array} cl - Class(es) to remove
 */
var removeClass = function removeClass(el) {
  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cl[_key - 1] = arguments[_key];
  }

  el = el.forEach ? el : [el];
  el.forEach(function (el) {
    var _el$classList;

    (_el$classList = el.classList).remove.apply(_el$classList, cl);
  });
};

/**
 * Toggle a class or classes on an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to toggle class(es) on
 * @param {String || Array} cl - Class(es) to toggle
 */
var toggleClass = function toggleClass(el) {
  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cl[_key - 1] = arguments[_key];
  }

  el = el.forEach ? el : [el];
  el.forEach(function (el) {
    cl.forEach(function (cl) {
      el.classList.toggle(cl);
    });
  });
};

var openTransition = function openTransition(el, settings) {
  return new Promise(function (resolve) {
    if (settings.transition) {
      el.classList.remove(settings.stateClosed);
      el.classList.add(settings.stateOpening);
      el.addEventListener('transitionend', function _f() {
        el.classList.add(settings.stateOpened);
        el.classList.remove(settings.stateOpening);
        resolve(el);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      el.classList.add(settings.stateOpened);
      el.classList.remove(settings.stateClosed);
      resolve(el);
    }
  });
};
var closeTransition = function closeTransition(el, settings) {
  return new Promise(function (resolve) {
    if (settings.transition) {
      el.classList.add(settings.stateClosing);
      el.classList.remove(settings.stateOpened);
      el.addEventListener('transitionend', function _f() {
        el.classList.remove(settings.stateClosing);
        el.classList.add(settings.stateClosed);
        resolve(el);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      el.classList.add(settings.stateClosed);
      el.classList.remove(settings.stateOpened);
      resolve(el);
    }
  });
};

var breakpoints = {
  xs: '480px',
  sm: '620px',
  md: '760px',
  lg: '990px',
  xl: '1380px'
};

export { FocusTrap, addClass, breakpoints, camelCase, closeTransition, focusTarget, focusTrigger, getElement, hasClass, hyphenCase, moveElement, openTransition, removeClass, setInert, setOverflowHidden, setTabindex, toggleClass };
