this.vrembem = this.vrembem || {};
this.vrembem.dismissible = (function (exports) {
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

  var Dismissible = function Dismissible(options) {
    var api = {};
    var defaults = {
      autoInit: false,
      target: "[data-dismissible]",
      trigger: "[data-dismiss]"
    };
    api.settings = _objectSpread2({}, defaults, {}, options);

    api.init = function () {
      document.addEventListener("click", run, false);
    };

    api.destroy = function () {
      document.removeEventListener("click", run, false);
    };

    var run = function run(e) {
      var trigger = e.target.closest(api.settings.trigger);

      if (trigger) {
        var target = trigger.closest(api.settings.target);

        if (target) {
          target.remove();
        }

        e.preventDefault();
      }
    };

    if (api.settings.autoInit) api.init();
    return api;
  };

  exports.Dismissible = Dismissible;

  return exports;

}({}));
