(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.vrembem = global.vrembem || {}, global.vrembem.core = {})));
}(this, (function (exports) {
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
    var _arguments = arguments;
    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).add.apply(_el$classList, [].slice.call(_arguments, 1));
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

  var focusTarget = function focusTarget(target, settings) {
    var innerFocus = target.querySelector("[data-" + settings.dataFocus + "]");

    if (innerFocus) {
      innerFocus.focus();
    } else {
      var innerElement = target.querySelector('[tabindex="-1"]');
      if (innerElement) innerElement.focus();
    }
  };
  var focusTrigger = function focusTrigger(obj) {
    if (obj === void 0) {
      obj = null;
    }

    if (!obj || !obj.memory || !obj.memory.trigger) return;
    obj.memory.trigger.focus();
    obj.memory.trigger = null;
  };
  var FocusTrap = /*#__PURE__*/function () {
    function FocusTrap() {
      this.target = null;
      this.__handlerFocusTrap = this.handlerFocusTrap.bind(this);
    }

    var _proto = FocusTrap.prototype;

    _proto.init = function init(target) {
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
    };

    _proto.destroy = function destroy() {
      if (!this.target) return;
      this.inner = null;
      this.focusable = null;
      this.focusableFirst = null;
      this.focusableLast = null;
      this.target.removeEventListener('keydown', this.__handlerFocusTrap);
      this.target.removeEventListener('keydown', this.handlerFocusLock);
      this.target = null;
    };

    _proto.handlerFocusTrap = function handlerFocusTrap(event) {
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
    };

    _proto.handlerFocusLock = function handlerFocusLock(event) {
      var isTab = event.key === 'Tab' || event.keyCode === 9;
      if (isTab) event.preventDefault();
    };

    _proto.getFocusable = function getFocusable() {
      var focusable = [];
      var initFocus = document.activeElement;
      var initScrollTop = this.inner ? this.inner.scrollTop : 0;
      this.target.querySelectorAll('a[href]:not([disabled]),button:not([disabled]),textarea:not([disabled]),input[type="text"]:not([disabled]),input[type="radio"]:not([disabled]),input[type="checkbox"]:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])').forEach(function (el) {
        el.focus();

        if (el === document.activeElement) {
          focusable.push(el);
        }
      });
      if (this.inner) this.inner.scrollTop = initScrollTop;
      initFocus.focus();
      return focusable;
    };

    return FocusTrap;
  }();

  /**
   * Get an element(s) from a selector or return value if not a string
   * ---
   * @param {String} selector - Selector to query
   * @param {Boolean} single - Whether to return a single or all matches
   */
  var getElement = function getElement(selector, single) {
    if (single === void 0) {
      single = 0;
    }

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
    return [].slice.call(arguments, 1).some(function (cl) {
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

  function moveElement(target, type, reference) {
    if (reference === void 0) {
      reference = false;
    }

    if (reference) {
      var els = getElement(target);
      if (!els.length) throw new Error("Move target element \"" + target + "\" not found!");
      var ref = getElement(reference, 1);
      if (!ref) throw new Error("Move reference element \"" + reference + "\" not found!");
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
            throw new Error("Move type \"" + type + "\" does not exist!");
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
    var _arguments = arguments;
    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).remove.apply(_el$classList, [].slice.call(_arguments, 1));
    });
  };

  /**
   * Toggle a class or classes on an element or NodeList
   * ---
   * @param {Node || NodeList} el - Element(s) to toggle class(es) on
   * @param {String || Array} cl - Class(es) to toggle
   */
  var toggleClass = function toggleClass(el) {
    var _arguments = arguments;
    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      [].slice.call(_arguments, 1).forEach(function (cl) {
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

  exports.FocusTrap = FocusTrap;
  exports.addClass = addClass;
  exports.breakpoints = breakpoints;
  exports.camelCase = camelCase;
  exports.closeTransition = closeTransition;
  exports.focusTarget = focusTarget;
  exports.focusTrigger = focusTrigger;
  exports.getElement = getElement;
  exports.hasClass = hasClass;
  exports.hyphenCase = hyphenCase;
  exports.moveElement = moveElement;
  exports.openTransition = openTransition;
  exports.removeClass = removeClass;
  exports.setInert = setInert;
  exports.setOverflowHidden = setOverflowHidden;
  exports.setTabindex = setTabindex;
  exports.toggleClass = toggleClass;

})));
//# sourceMappingURL=scripts.umd.js.map
