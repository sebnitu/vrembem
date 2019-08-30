this.vrembem = this.vrembem || {};
this.vrembem.toggle = (function (exports) {
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

  var camelCase = function camelCase(str) {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
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

  var Toggle = function Toggle(options) {
    var api = {};
    var defaults = {
      autoInit: false,
      "class": "is-active",
      dataClass: "toggle",
      dataTarget: "toggle-target",
      selectorTarget: "[data-toggle-target]",
      selectorTrigger: "[data-toggle]"
    };
    api.settings = _objectSpread2({}, defaults, {}, options);

    api.init = function () {
      document.addEventListener("click", run, false);
    };

    api.destroy = function () {
      document.removeEventListener("click", run, false);
    };

    var run = function run(e) {
      var trigger = e.target.closest(api.settings.selectorTrigger);

      if (trigger) {
        var cl = trigger.dataset[camelCase(api.settings.dataClass)];
        cl = cl ? cl : api.settings["class"];
        var target = trigger.dataset[camelCase(api.settings.dataTarget)];
        target = document.querySelectorAll(target);
        target = target.length ? target : trigger;
        toggleClass(target, cl);
        e.preventDefault();
      }
    };

    if (api.settings.autoInit) api.init();
    return api;
  };

  exports.Toggle = Toggle;

  return exports;

}({}));
