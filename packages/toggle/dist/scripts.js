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
    var settings;
    var defaults = {
      trigger: "[data-toggle-class]",
      targets: "",
      "class": ""
    };

    api.init = function (options) {
      settings = _objectSpread2({}, defaults, {}, options);
      document.addEventListener("click", run, false);
    };

    api.destroy = function () {
      settings = null;
      document.removeEventListener("click", run, false);
    };

    var run = function run() {
      var trigger = event.target.closest(settings.trigger);

      if (trigger) {
        var targets;

        if (settings.targets) {
          targets = document.querySelectorAll(settings.targets);
        } else {
          targets = document.querySelectorAll(trigger.dataset.toggleTarget);
        }

        if (targets.length) {
          targets.forEach(function (target) {
            toggleClass(target, trigger.dataset.toggleClass.split(" "));
          });
        } else {
          if (settings["class"]) {
            toggleClass(trigger, settings["class"]);
          } else {
            toggleClass(trigger, trigger.dataset.toggleClass.split(" "));
          }
        }

        event.preventDefault();
      }
    };

    api.init(options);
    return api;
  };

  exports.Toggle = Toggle;

  return exports;

}({}));
