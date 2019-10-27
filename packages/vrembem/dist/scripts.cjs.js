'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var breakpoint = {
  xs: "480px",
  sm: "620px",
  md: "760px",
  lg: "990px",
  xl: "1380px"
};

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

var hyphenCase = function hyphenCase(str) {
  return str.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + "-" + g[1].toLowerCase();
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



var index = /*#__PURE__*/Object.freeze({
  breakpoint: breakpoint,
  camelCase: camelCase,
  addClass: addClass,
  hasClass: hasClass,
  hyphenCase: hyphenCase,
  removeClass: removeClass,
  toggleClass: toggleClass
});

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Checkbox = function Checkbox(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    stateAttr: "aria-checked",
    stateValue: "mixed"
  };
  api.settings = _objectSpread({}, defaults, {}, options);
  api.settings.selector = "[".concat(api.settings.stateAttr, "=\"").concat(api.settings.stateValue, "\"]");

  api.init = function () {
    var mixed = document.querySelectorAll(api.settings.selector);
    api.setIndeterminate(mixed);
    document.addEventListener("click", removeAriaState, false);
  };

  api.destroy = function () {
    document.removeEventListener("click", removeAriaState, false);
  };

  api.setAriaState = function (el) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : api.settings.stateValue;
    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      el.setAttribute(api.settings.stateAttr, value);
    });
  };

  api.removeAriaState = function (el) {
    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      el.removeAttribute(api.settings.stateAttr);
    });
  };

  api.setIndeterminate = function (el) {
    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      if (el.hasAttribute(api.settings.stateAttr)) {
        el.indeterminate = true;
      } else {
        el.indeterminate = false;
      }
    });
  };

  var removeAriaState = function removeAriaState(event) {
    var el = event.target.closest(api.settings.selector);

    if (el) {
      api.removeAriaState(el);
      api.setIndeterminate(el);
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Dismissible = function Dismissible(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    target: "[data-dismissible]",
    trigger: "[data-dismiss]"
  };
  api.settings = _objectSpread$1({}, defaults, {}, options);

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

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
  api.settings = _objectSpread$2({}, defaults, {}, options);

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

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
  api.settings = _objectSpread$3({}, defaults, {}, options);
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
        open("[data-".concat(api.settings.dataModal, "=\"").concat(targetData, "\"]"));
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

  var escape = function escape(event) {
    if (event.keyCode == 27 && api.memoryTarget && !api.memoryTarget.hasAttribute("data-".concat(api.settings.dataRequired))) {
      close();
    }
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

  if (api.settings.autoInit) api.init();
  return api;
};

exports.Checkbox = Checkbox;
exports.Dismissible = Dismissible;
exports.Drawer = Drawer;
exports.Modal = Modal;
exports.utility = index;
