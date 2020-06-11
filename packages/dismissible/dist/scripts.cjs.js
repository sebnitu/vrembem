'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var camelCase = function camelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Dismissible = function Dismissible(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    dataTrigger: 'dismiss',
    dataTarget: 'dismissible',
    classHide: 'display_none',
    customEventPrefix: 'dismissible:',
    method: 'hide'
  };
  api.settings = _objectSpread(_objectSpread({}, defaults), options);

  api.init = function () {
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    document.removeEventListener('click', run, false);
  };

  var run = function run(event) {
    var trigger = event.target.closest("[data-".concat(api.settings.dataTrigger, "]"));

    if (trigger) {
      var target = trigger.closest("[data-".concat(api.settings.dataTarget, "]"));

      if (target) {
        var method = target.dataset[camelCase(api.settings.dataTarget)];
        var defaultMethod = api.settings.method;

        if (method == 'remove' || !method && defaultMethod == 'remove') {
          target.remove();
        } else if (method == 'hide' || !method && defaultMethod == 'hide') {
          target.classList.add(api.settings.classHide);
        }
      }
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

exports.Dismissible = Dismissible;
