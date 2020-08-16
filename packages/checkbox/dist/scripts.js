(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.vrembem = global.vrembem || {}, global.vrembem.Checkbox = factory()));
}(this, (function () { 'use strict';

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var Checkbox = function () {
    function Checkbox(options) {
      classCallCheck(this, Checkbox);

      this.defaults = {
        autoInit: false,
        stateAttr: 'aria-checked',
        stateValue: 'mixed'
      };
      this.settings = _objectSpread(_objectSpread({}, this.defaults), options);
      this.__handlerClick = this.handlerClick.bind(this);
      if (this.settings.autoInit) this.init();
    }

    createClass(Checkbox, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (options) this.settings = _objectSpread(_objectSpread({}, this.settings), options);
        var selector = "[".concat(this.settings.stateAttr, "=\"").concat(this.settings.stateValue, "\"]");
        var mixed = document.querySelectorAll(selector);
        this.setIndeterminate(mixed);
        document.addEventListener('click', this.__handlerClick, false);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        document.removeEventListener('click', this.__handlerClick, false);
      }
    }, {
      key: "handlerClick",
      value: function handlerClick(event) {
        var selector = "[".concat(this.settings.stateAttr, "=\"").concat(this.settings.stateValue, "\"]");
        var el = event.target.closest(selector);
        if (!el) return;
        this.removeAriaState(el);
        this.setIndeterminate(el);
      }
    }, {
      key: "setAriaState",
      value: function setAriaState(el) {
        var _this = this;

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.settings.stateValue;
        el = el.forEach ? el : [el];
        el.forEach(function (el) {
          el.setAttribute(_this.settings.stateAttr, value);
        });
      }
    }, {
      key: "removeAriaState",
      value: function removeAriaState(el) {
        var _this2 = this;

        el = el.forEach ? el : [el];
        el.forEach(function (el) {
          el.removeAttribute(_this2.settings.stateAttr);
        });
      }
    }, {
      key: "setIndeterminate",
      value: function setIndeterminate(el) {
        var _this3 = this;

        el = el.forEach ? el : [el];
        el.forEach(function (el) {
          if (el.hasAttribute(_this3.settings.stateAttr)) {
            el.indeterminate = true;
          } else {
            el.indeterminate = false;
          }
        });
      }
    }]);

    return Checkbox;
  }();

  return Checkbox;

})));
