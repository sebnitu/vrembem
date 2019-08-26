this.vrembem = this.vrembem || {};
this.vrembem.modal = (function (exports) {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

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

  var Modal = function Modal(options) {
    var api = {};
    var settings;
    var defaults = {
      classTarget: "modal",
      classTrigger: "modal__trigger",
      classInner: "modal__dialog",
      classActive: "is-active",
      focus: "[data-focus]"
    };
    var memoryTrigger;
    var memoryTarget;

    api.init = function (options) {
      settings = _objectSpread2({}, defaults, {}, options);
      document.addEventListener("click", run, false);
      document.addEventListener("touchend", run, false);
      document.addEventListener("keyup", escape, false);
    };

    api.destroy = function () {
      settings = null;
      memoryTarget = null;
      memoryTrigger = null;
      document.removeEventListener("click", run, false);
      document.removeEventListener("touchend", run, false);
      document.removeEventListener("keyup", escape, false);
    };

    api.open = function (selector) {
      open(document.querySelectorAll(selector));
    };

    api.close = function (clear) {
      close(clear);
    };

    var open = function open(target) {
      addClass(target, settings.classActive);

      if (target.length === 1) {
        target = target.item(0);
        var focus = target.querySelector(settings.focus);
        target.addEventListener("transitionend", function _listener() {
          if (focus) {
            focus.focus();
          } else {
            target.focus();
          }

          this.removeEventListener("transitionend", _listener, true);
        }, true);
      }
    };

    var close = function close() {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var target = document.querySelectorAll("." + settings.classTarget);
      removeClass(target, settings.classActive);

      if (clear == false && memoryTrigger && memoryTarget) {
        if (memoryTarget.length === 1) {
          memoryTarget = memoryTarget.item(0);
          memoryTarget.addEventListener("transitionend", function _listener() {
            if (memoryTrigger) {
              memoryTrigger.focus();
            }

            memoryTarget = null;
            memoryTrigger = null;
            this.removeEventListener("transitionend", _listener, true);
          }, true);
        }
      } else if (clear == true) {
        memoryTarget = null;
        memoryTrigger = null;
      }
    };

    var escape = function escape() {
      if (event.keyCode == 27) {
        close();
      }
    };

    var run = function run() {
      var target = event.target.closest("." + settings.classTarget);
      var trigger = event.target.closest("." + settings.classTrigger);
      var inner = event.target.closest("." + settings.classInner);

      if (trigger) {
        close();
        var targetData = trigger.dataset.target;

        if (targetData) {
          memoryTarget = document.querySelectorAll(targetData);
          memoryTrigger = trigger;
          open(memoryTarget);
        }

        event.preventDefault();
      } else if (target && !inner) {
        close();
      }
    };

    api.init(options);
    return api;
  };

  exports.Modal = Modal;

  return exports;

}({}));
