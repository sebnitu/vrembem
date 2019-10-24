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
    dataModal: "modal",
    dataOpen: "modal-open",
    dataClose: "modal-close",
    dataFocus: "modal-focus",
    dataRequired: "modal-required",
    stateOpen: "is-open",
    stateOpening: "is-opening",
    stateClosing: "is-closing",
    stateClosed: "is-closed",
    focus: true
  };
  api.settings = _objectSpread({}, defaults, {}, options);
  api.memoryTrigger = null;
  api.memoryTarget = null;

  api.init = function () {
    document.addEventListener("click", run, false);
    document.addEventListener("touchend", run, false);
    document.addEventListener("keyup", escape, false);
  };

  api.destroy = function () {
    api.memoryTrigger = null;
    api.memoryTarget = null;
    document.removeEventListener("click", run, false);
    document.removeEventListener("touchend", run, false);
    document.removeEventListener("keyup", escape, false);
  };

  api.open = function (selector) {
    open(selector);
  };

  api.close = function (focus) {
    close(focus);
  };

  var open = function open(selector) {
    var target = document.querySelector(selector);

    if (target) {
      addClass(target, api.settings.stateOpening);
      target.addEventListener("transitionend", function _listener() {
        addClass(target, api.settings.stateOpen);
        removeClass(target, api.settings.stateOpening);
        getFocus(target);
        api.memoryTarget = target;
        this.removeEventListener("transitionend", _listener, true);
      }, true);
    }
  };

  var close = function close() {
    var fromModal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var target = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpen));

    if (target) {
      addClass(target, api.settings.stateClosing);
      removeClass(target, api.settings.stateOpen);
      target.addEventListener("transitionend", function _listener() {
        removeClass(target, api.settings.stateClosing);
        returnFocus(fromModal);
        api.memoryTarget = null;
        this.removeEventListener("transitionend", _listener, true);
      }, true);
    }
  };

  var getFocus = function getFocus(target) {
    if (api.settings.focus) {
      var focus = target.querySelector("[data-".concat(api.settings.dataFocus, "]"));

      if (focus) {
        focus.focus();
      } else {
        target.focus();
      }
    }
  };

  var returnFocus = function returnFocus(fromModal) {
    if (api.settings.focus) {
      if (!fromModal && api.memoryTrigger) {
        api.memoryTrigger.focus();
        api.memoryTrigger = null;
      }
    }
  };

  var escape = function escape() {
    if (event.keyCode == 27 && api.memoryTarget && !api.memoryTarget.hasAttribute("data-".concat(api.settings.dataRequired))) {
      close();
    }
  };

  var run = function run(event) {
    var trigger = event.target.closest("[data-".concat(api.settings.dataOpen, "]"));

    if (trigger) {
      var targetData = trigger.dataset[camelCase(api.settings.dataOpen)];

      if (targetData) {
        var fromModal = event.target.closest("[data-".concat(api.settings.dataModal, "]"));

        if (api.settings.focus && !fromModal) {
          api.memoryTrigger = trigger;
        }

        close(fromModal);
        open("[data-modal=\"".concat(targetData, "\"]"));
      }

      event.preventDefault();
    } else {
      if (event.target.closest("[data-".concat(api.settings.dataClose, "]"))) {
        close();
        event.preventDefault();
      }

      if (event.target.dataset[camelCase(api.settings.dataModal)] && !event.target.hasAttribute("data-".concat(api.settings.dataRequired))) {
        close();
      }
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

exports.Modal = Modal;
