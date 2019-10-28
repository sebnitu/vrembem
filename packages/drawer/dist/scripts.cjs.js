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
    breakpoint: breakpoint,
    focus: true,
    saveState: true
  };
  api.settings = _objectSpread({}, defaults, {}, options);
  api.memoryTrigger = null;
  api.memoryTarget = null;
  api.state = {};
  api.mediaQueryLists = [];

  api.init = function () {
    applyState();
    switchInit();
    document.addEventListener("click", run, false);
    document.addEventListener("touchend", run, false);
    document.addEventListener("keyup", escape, false);
  };

  api.destroy = function () {
    api.memoryTrigger = null;
    api.memoryTarget = null;
    api.state = {};
    document.removeEventListener("click", run, false);
    document.removeEventListener("touchend", run, false);
    document.removeEventListener("keyup", escape, false);
  };

  api.toggle = function (selector) {
    toggle(selector);
  };

  api.open = function (drawer, callback) {
    open(drawer, callback);
  };

  api.close = function (drawer, callback) {
    close(drawer, callback);
  };

  var run = function run(event) {
    var trigger = event.target.closest("[data-".concat(api.settings.dataTrigger, "]"));

    if (trigger) {
      var selector = event.target.dataset[camelCase(api.settings.dataTrigger)];
      saveTrigger(trigger);
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
    var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(selector, "\"]"));

    if (drawer) {
      var isOpen = hasClass(drawer, api.settings.stateOpen);

      if (!isOpen) {
        open(drawer);
      } else {
        close(drawer);
      }
    }
  };

  var open = function open(drawer, callback) {
    if (!hasClass(drawer, api.settings.stateOpen)) {
      saveTarget(drawer);
      addClass(drawer, api.settings.stateOpening);
      drawer.addEventListener("transitionend", function _listener() {
        addClass(drawer, api.settings.stateOpen);
        removeClass(drawer, api.settings.stateOpening);
        saveState(drawer);
        setFocus();
        typeof callback === "function" && callback();
        this.removeEventListener("transitionend", _listener, true);
      }, true);
    }
  };

  var close = function close(drawer, callback) {
    if (hasClass(drawer, api.settings.stateOpen)) {
      addClass(drawer, api.settings.stateClosing);
      removeClass(drawer, api.settings.stateOpen);
      drawer.addEventListener("transitionend", function _listener() {
        removeClass(drawer, api.settings.stateClosing);
        saveState(drawer);
        returnFocus();
        typeof callback === "function" && callback();
        this.removeEventListener("transitionend", _listener, true);
      }, true);
    }
  };

  var saveTarget = function saveTarget(target) {
    if (api.settings.focus) {
      api.memoryTarget = target;
    }
  };

  var saveTrigger = function saveTrigger(trigger) {
    if (api.settings.focus) {
      api.memoryTrigger = trigger;
    }
  };

  var setFocus = function setFocus() {
    if (api.settings.focus && api.memoryTarget) {
      var innerFocus = api.memoryTarget.querySelector("[data-".concat(api.settings.dataFocus, "]"));

      if (innerFocus) {
        innerFocus.focus();
      } else {
        api.memoryTarget.focus();
      }

      api.memoryTarget = null;
    }
  };

  var returnFocus = function returnFocus() {
    if (api.settings.focus && api.memoryTrigger) {
      api.memoryTrigger.focus();
      api.memoryTrigger = null;
    }
  };

  var saveState = function saveState() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (api.settings.saveState) {
      var drawers = !target ? document.querySelectorAll("[data-".concat(api.settings.dataDrawer, "]")) : target.forEach ? target : [target];
      drawers.forEach(function (el) {
        if (!hasClass(el, api.settings.classModal)) {
          api.state[el.dataset[camelCase(api.settings.dataDrawer)]] = hasClass(el, api.settings.stateOpen) ? api.settings.stateOpen : api.settings.stateClosed;
        }
      });
      localStorage.setItem("DrawerState", JSON.stringify(api.state));
    }
  };

  var applyState = function applyState() {
    if (api.settings.saveState) {
      if (localStorage.getItem("DrawerState")) {
        api.state = JSON.parse(localStorage.getItem("DrawerState"));
        Object.keys(api.state).forEach(function (key) {
          var item = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(key, "\"]"));

          if (item) {
            if (api.state[key] == api.settings.stateOpen) {
              addClass(item, api.settings.stateOpen);
            } else {
              removeClass(item, api.settings.stateOpen);
            }
          }
        });
      } else {
        saveState();
      }
    } else {
      if (localStorage.getItem("DrawerState")) {
        localStorage.removeItem("DrawerState");
      }
    }
  };

  var switchInit = function switchInit() {
    var drawers = document.querySelectorAll("[data-".concat(api.settings.dataModal, "]"));

    if (drawers) {
      drawers.forEach(function (drawer) {
        var key = drawer.dataset[camelCase(api.settings.dataModal)];
        var bp = api.settings.breakpoint[key] ? api.settings.breakpoint[key] : key;
        var mqList = window.matchMedia("(min-width:" + bp + ")");

        if (!mqList.matches) {
          switchToModal(drawer);
        }

        mqList.addListener(switchCheck);
        api.mediaQueryLists.push({
          "drawer": drawer,
          "mqList": mqList
        });
      });
    }
  };

  var switchCheck = function switchCheck(event) {
    api.mediaQueryLists.forEach(function (item) {
      if (event.target == item.mqList) {
        if (item.mqList.matches) {
          switchToDrawer(item.drawer);
        } else {
          switchToModal(item.drawer);
        }
      }
    });
  };

  var switchToModal = function switchToModal(drawer) {
    addClass(drawer, api.settings.classModal);
    removeClass(drawer, api.settings.stateOpen);
  };

  var switchToDrawer = function switchToDrawer(drawer) {
    removeClass(drawer, api.settings.classModal);
    var drawerState = api.state[drawer.dataset[camelCase(api.settings.dataDrawer)]];

    if (drawerState == api.settings.stateOpen) {
      addClass(drawer, api.settings.stateOpen);
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

exports.Drawer = Drawer;
