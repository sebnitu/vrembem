this.vrembem = this.vrembem || {};
this.vrembem.choice = (function (exports) {
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

  var Choice = function Choice(options) {
    var api = {};
    var defaults = {
      autoInit: false,
      classStateActive: "is-active",
      trigger: ".choice"
    };
    api.settings = _objectSpread2({}, defaults, {}, options);

    api.init = function () {
      initChoice();
      document.addEventListener("change", run, false);
    };

    api.destroy = function () {
      document.removeEventListener("change", run, false);
    };

    var initChoice = function initChoice() {
      var choice = document.querySelectorAll(api.settings.trigger);
      choice.forEach(function (item) {
        updateChoice(item);
      });
    };

    var updateChoice = function updateChoice(item) {
      var input = item.querySelector("input");

      if (input.checked) {
        addClass(item, api.settings.classStateActive);
      } else {
        removeClass(item, api.settings.classStateActive);
      }
    };

    var run = function run(e) {
      var trigger = e.target.closest(api.settings.trigger);

      if (trigger) {
        updateChoice(trigger);
      }
    };

    if (api.settings.autoInit) api.init();
    return api;
  };

  exports.Choice = Choice;

  return exports;

}({}));
