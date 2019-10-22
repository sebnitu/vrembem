(function (exports) {
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

  var defineProperty = _defineProperty;

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var Modal = function Modal(options) {
    var api = {};
    var defaults = {
      autoInit: false,
      selectorModal: "[data-modal]",
      selectorOpen: "[data-modal-open]",
      selectorClose: "[data-modal-close]",
      selectorFocus: "[data-modal-focus]",
      stateOpen: "is-open",
      stateOpening: "is-opening",
      stateClosing: "is-closing"
    };
    api.settings = _objectSpread({}, defaults, {}, options);
    var memoryTrigger;
    var memoryTarget;

    api.init = function () {
      document.addEventListener("click", run, false);
      document.addEventListener("touchend", run, false);
      document.addEventListener("keyup", escape, false);
    };

    api.destroy = function () {
      memoryTarget = null;
      memoryTrigger = null;
      document.removeEventListener("click", run, false);
      document.removeEventListener("touchend", run, false);
      document.removeEventListener("keyup", escape, false);
    };

    api.open = function (selector) {
      open(document.querySelectorAll(selector));
    };

    var open = function open(target) {
      addClass(target, api.settings.stateOpening);
      var focus = target.querySelector(api.settings.selectorFocus);
      target.addEventListener("transitionend", function _listener() {
        addClass(target, api.settings.stateOpen);
        removeClass(target, api.settings.stateOpening);

        if (focus) {
          focus.focus();
        } else {
          target.focus();
        }

        this.removeEventListener("transitionend", _listener, true);
      }, true);
    };

    var close = function close() {
      var target = document.querySelector("".concat(api.settings.selectorModal, ".").concat(api.settings.stateOpen));

      if (target) {
        addClass(target, api.settings.stateClosing);
        removeClass(target, api.settings.stateOpen);
        target.addEventListener("transitionend", function _listener() {
          removeClass(target, api.settings.stateClosing);

          if (memoryTrigger) {
            memoryTrigger.focus();
          }

          memoryTarget = null;
          memoryTrigger = null;
          this.removeEventListener("transitionend", _listener, true);
        }, true);
      }
    };

    var escape = function escape() {
      if (event.keyCode == 27) {
        close();
      }
    };

    var run = function run(event) {
      var trigger = event.target.closest(api.settings.selectorOpen);

      if (trigger) {
        close();
        var targetData = trigger.dataset.modalOpen;

        if (targetData) {
          memoryTarget = document.querySelector("[data-modal=\"".concat(targetData, "\"]"));
          memoryTrigger = trigger;
          open(memoryTarget);
        } else {
            close();
          }

        event.preventDefault();
      } else {
        if (event.target.closest(api.settings.selectorClose)) {
          close();
        }

        if (event.target.dataset.modal) {
          close();
        }
      }
    };

    if (api.settings.autoInit) api.init();
    return api;
  };

  exports.Modal = Modal;

}(this.vrembem = this.vrembem || {}));
