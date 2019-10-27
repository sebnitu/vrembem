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
var Drawer = function Drawer(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    dataDrawer: "drawer",
    dataModal: "drawer-modal",
    dataTrigger: "drawer-trigger",
    dataClose: "drawer-close",
    dataFocus: "drawer-focus",
    stateOpen: "is-open",
    stateOpening: "is-opening",
    stateClosing: "is-closing",
    stateClosed: "is-closed",
    classModal: "drawer_modal",
    focus: true
  };
  api.settings = _objectSpread({}, defaults, {}, options);

  api.init = function () {
    document.addEventListener("click", run, false);
    document.addEventListener("touchend", run, false);
    document.addEventListener("keyup", escape, false);
  };

  api.destroy = function () {
    document.removeEventListener("click", run, false);
    document.removeEventListener("touchend", run, false);
    document.removeEventListener("keyup", escape, false);
  };

  var run = function run(event) {
    var trigger = event.target.closest("[data-".concat(api.settings.dataTrigger, "]"));

    if (trigger) {
      var selector = event.target.dataset[camelCase(api.settings.dataTrigger)];
      toggle(selector);
      event.preventDefault();
    } else {
      trigger = event.target.closest("[data-".concat(api.settings.dataClose, "]"));

      if (trigger) {
        var target = event.target.closest("[data-".concat(api.settings.dataDrawer, "]"));
        close(target);
        event.preventDefault();
      }

      if (event.target.dataset[camelCase(api.settings.dataDrawer)]) {
        close(event.target);
      }
    }
  };

  var escape = function escape(event) {
    if (event.keyCode == 27) {
      var target = document.querySelector(".".concat(api.settings.classModal, ".").concat(api.settings.stateOpen));

      if (target) {
        close(target);
      }
    }
  };

  var toggle = function toggle(selector) {
    var target = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(selector, "\"]"));

    if (target) {
      var isOpen = hasClass(target, api.settings.stateOpen);

      if (!isOpen) {
        open(target);
      } else {
        close(target);
      }
    }
  };

  var open = function open(drawer) {
    addClass(drawer, api.settings.stateOpening);
    drawer.addEventListener("transitionend", function _listener() {
      addClass(drawer, api.settings.stateOpen);
      removeClass(drawer, api.settings.stateOpening);
      this.removeEventListener("transitionend", _listener, true);
    }, true);
  };

  var close = function close(drawer) {
    addClass(drawer, api.settings.stateClosing);
    removeClass(drawer, api.settings.stateOpen);
    drawer.addEventListener("transitionend", function _listener() {
      removeClass(drawer, api.settings.stateClosing);
      this.removeEventListener("transitionend", _listener, true);
    }, true);
  };

  if (api.settings.autoInit) api.init();
  return api;
};

exports.Drawer = Drawer;
