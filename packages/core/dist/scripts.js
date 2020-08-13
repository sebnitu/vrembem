(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.vrembem = global.vrembem || {}, global.vrembem.core = global.vrembem.core || {})));
}(this, (function (exports) { 'use strict';

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

  var camelCase = function camelCase(str) {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  };

  var focusTarget = function focusTarget(target, settings) {
    var innerFocus = target.querySelector("[data-".concat(settings.dataFocus, "]"));

    if (innerFocus) {
      innerFocus.focus();
    } else {
      var dialog = target.querySelector("[data-".concat(settings.dataDialog, "][tabindex=\"-1\"]"));

      if (dialog) {
        dialog.focus();
      }
    }
  };
  var focusTrigger = function focusTrigger() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (obj.memory.trigger) {
      obj.memory.trigger.focus();
      obj.memory.trigger = null;
    }
  };
  var getFocusable = function getFocusable(target) {
    var focusable = [];
    var scrollPos = target.scrollTop;
    var items = target.querySelectorAll("\n    a[href]:not([disabled]),\n    button:not([disabled]),\n    textarea:not([disabled]),\n    input[type=\"text\"]:not([disabled]),\n    input[type=\"radio\"]:not([disabled]),\n    input[type=\"checkbox\"]:not([disabled]),\n    select:not([disabled]),\n    [tabindex]:not([tabindex=\"-1\"])\n  ");
    items.forEach(function (el) {
      el.focus();

      if (el === document.activeElement) {
        focusable.push(el);
      }
    });
    target.scrollTop = scrollPos;
    return focusable;
  };

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

  var hyphenCase = function hyphenCase(str) {
    return str.replace(/([a-z][A-Z])/g, function (g) {
      return g[0] + '-' + g[1].toLowerCase();
    });
  };

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
        removeClass(el, settings.stateClosed);
        addClass(el, settings.stateOpening);
        el.addEventListener('transitionend', function _f() {
          addClass(el, settings.stateOpened);
          removeClass(el, settings.stateOpening);
          resolve(el);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        addClass(el, settings.stateOpened);
        removeClass(el, settings.stateClosed);
        resolve(el);
      }
    });
  };
  var closeTransition = function closeTransition(el, settings) {
    return new Promise(function (resolve) {
      if (settings.transition) {
        addClass(el, settings.stateClosing);
        removeClass(el, settings.stateOpened);
        el.addEventListener('transitionend', function _f() {
          removeClass(el, settings.stateClosing);
          addClass(el, settings.stateClosed);
          resolve(el);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        addClass(el, settings.stateClosed);
        removeClass(el, settings.stateOpened);
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

  exports.addClass = addClass;
  exports.breakpoints = breakpoints;
  exports.camelCase = camelCase;
  exports.closeTransition = closeTransition;
  exports.focusTarget = focusTarget;
  exports.focusTrigger = focusTrigger;
  exports.getFocusable = getFocusable;
  exports.hasClass = hasClass;
  exports.hyphenCase = hyphenCase;
  exports.openTransition = openTransition;
  exports.removeClass = removeClass;
  exports.toggleClass = toggleClass;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
