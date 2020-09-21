function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

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

var defaults = {
  autoInit: false,
  // Data attributes
  dataModal: 'modal',
  dataDialog: 'modal-dialog',
  dataOpen: 'modal-open',
  dataClose: 'modal-close',
  dataFocus: 'modal-focus',
  dataRequired: 'modal-required',
  // State classes
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',
  // Selector
  selectorInert: null,
  selectorOverflow: 'body',
  // Feature toggles
  customEventPrefix: 'modal:',
  moveModals: {
    ref: null,
    type: null
  },
  setTabindex: true,
  transition: true
};

var handlerClick = function handlerClick(event) {
  try {
    var _temp3 = function _temp3(_result) {
      if (_exit2) return _result;

      // Close click
      if (event.target.closest("[data-" + _this2.settings.dataClose + "]")) {
        event.preventDefault();

        _this2.close();

        return;
      } // Root click


      if (event.target.hasAttribute("data-" + _this2.settings.dataModal) && !event.target.hasAttribute("data-" + _this2.settings.dataRequired)) {
        _this2.close();
      }
    };

    var _exit2;

    var _this2 = this;

    // Working catch
    if (_this2.working) return Promise.resolve(); // Trigger click

    var trigger = event.target.closest("[data-" + _this2.settings.dataOpen + "]");

    var _temp4 = function () {
      if (trigger) {
        event.preventDefault();
        var modalKey = trigger.getAttribute("data-" + _this2.settings.dataOpen);
        var fromModal = event.target.closest("[data-" + _this2.settings.dataModal + "]");
        if (!fromModal) _this2.memory.trigger = trigger;
        return Promise.resolve(_this2.close(!fromModal)).then(function () {
          _this2.open(modalKey);

          _exit2 = 1;
        });
      }
    }();

    return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
  } catch (e) {
    return Promise.reject(e);
  }
};
function handlerKeyup(event) {
  // Working catch
  if (this.working) return;

  if (event.key === 'Escape' || event.keyCode === 27) {
    var target = document.querySelector("[data-" + this.settings.dataModal + "]." + this.settings.stateOpened);

    if (target && !target.hasAttribute("data-" + this.settings.dataRequired)) {
      this.close();
    }
  }
}

function setInitialState(obj) {
  var modals = document.querySelectorAll("[data-" + obj.settings.dataModal + "]");
  modals.forEach(function (el) {
    if (el.classList.contains(obj.settings.stateOpened)) {
      setInert(false, obj.settings.selectorInert);
      setOverflowHidden(false, obj.settings.selectorOverflow);
      focusTrigger(obj);
      obj.focusTrap.destroy();
    }

    removeClass(el, obj.settings.stateOpened, obj.settings.stateOpening, obj.settings.stateClosing);
    addClass(el, obj.settings.stateClosed);
  });
}

var Modal = /*#__PURE__*/function () {
  function Modal(options) {
    this.defaults = defaults;
    this.settings = _extends({}, this.defaults, options);
    this.working = false;
    this.memory = {};
    this.focusTrap = new FocusTrap();
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  var _proto = Modal.prototype;

  _proto.init = function init(options) {
    if (options === void 0) {
      options = null;
    }

    if (options) this.settings = _extends({}, this.settings, options);
    this.moveModals();
    this.setTabindex(this.settings.setTabindex);
    this.setInitialState();
    document.addEventListener('click', this.__handlerClick, false);
    document.addEventListener('touchend', this.__handlerClick, false);
    document.addEventListener('keyup', this.__handlerKeyup, false);
  };

  _proto.destroy = function destroy() {
    this.memory = {};
    document.removeEventListener('click', this.__handlerClick, false);
    document.removeEventListener('touchend', this.__handlerClick, false);
    document.removeEventListener('keyup', this.__handlerKeyup, false);
  }
  /**
   * Helpers
   */
  ;

  _proto.getModal = function getModal(modalKey) {
    if (typeof modalKey !== 'string') return modalKey;
    return document.querySelector("[data-" + this.settings.dataModal + "=\"" + modalKey + "\"]");
  };

  _proto.modalNotFound = function modalNotFound(key) {
    return Promise.reject(new Error("Did not find modal with key: \"" + key + "\""));
  };

  _proto.setTabindex = function setTabindex$1(state) {
    if (state === void 0) {
      state = true;
    }

    var selectorTabindex = "\n      [data-" + this.settings.dataModal + "]\n      [data-" + this.settings.dataDialog + "]\n    ";

    setTabindex(state, selectorTabindex);
  };

  _proto.setInitialState = function setInitialState$1() {
    setInitialState(this);
  };

  _proto.moveModals = function moveModals(type, ref) {
    if (type === void 0) {
      type = this.settings.moveModals.type;
    }

    if (ref === void 0) {
      ref = this.settings.moveModals.ref;
    }

    var modals = document.querySelectorAll("[data-" + this.settings.dataModal + "]");
    if (modals.length) moveElement(modals, type, ref);
  }
  /**
   * Change state functionality
   */
  ;

  _proto.open = function open(modalKey) {
    try {
      var _this2 = this;

      var modal = _this2.getModal(modalKey);

      if (!modal) return Promise.resolve(_this2.modalNotFound(modalKey));

      if (hasClass(modal, _this2.settings.stateClosed)) {
        _this2.working = true;
        setOverflowHidden(true, _this2.settings.selectorOverflow);
        return Promise.resolve(openTransition(modal, _this2.settings)).then(function () {
          _this2.focusTrap.init(modal);

          focusTarget(modal, _this2.settings);
          setInert(true, _this2.settings.selectorInert);
          modal.dispatchEvent(new CustomEvent(_this2.settings.customEventPrefix + 'opened', {
            bubbles: true
          }));
          _this2.working = false;
          return modal;
        });
      } else {
        return Promise.resolve(modal);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.close = function close(returnFocus) {
    if (returnFocus === void 0) {
      returnFocus = true;
    }

    try {
      var _this4 = this;

      var modal = document.querySelector("[data-" + _this4.settings.dataModal + "]." + _this4.settings.stateOpened);

      if (modal) {
        _this4.working = true;
        setInert(false, _this4.settings.selectorInert);
        setOverflowHidden(false, _this4.settings.selectorOverflow);
        return Promise.resolve(closeTransition(modal, _this4.settings)).then(function () {
          if (returnFocus) focusTrigger(_this4);

          _this4.focusTrap.destroy();

          modal.dispatchEvent(new CustomEvent(_this4.settings.customEventPrefix + 'closed', {
            bubbles: true
          }));
          _this4.working = false;
          return modal;
        });
      } else {
        return Promise.resolve(modal);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Modal;
}();

module.exports = Modal;
//# sourceMappingURL=modal.js.map
