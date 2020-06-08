'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var camelCase = function camelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
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
    return g[0] + '-' + g[1].toLowerCase();
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

var breakpoints = {
  xs: '480px',
  sm: '620px',
  md: '760px',
  lg: '990px',
  xl: '1380px'
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addClass: addClass,
  camelCase: camelCase,
  hasClass: hasClass,
  hyphenCase: hyphenCase,
  removeClass: removeClass,
  toggleClass: toggleClass,
  breakpoints: breakpoints
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

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Checkbox = function Checkbox(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    stateAttr: 'aria-checked',
    stateValue: 'mixed'
  };
  api.settings = _objectSpread(_objectSpread({}, defaults), options);
  api.settings.selector = "[".concat(api.settings.stateAttr, "=\"").concat(api.settings.stateValue, "\"]");

  api.init = function () {
    var mixed = document.querySelectorAll(api.settings.selector);
    api.setIndeterminate(mixed);
    document.addEventListener('click', removeAriaState, false);
  };

  api.destroy = function () {
    document.removeEventListener('click', removeAriaState, false);
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

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Dismissible = function Dismissible(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    dataTrigger: 'dismiss',
    dataTarget: 'dismissible',
    classHide: 'display_none',
    method: 'hide'
  };
  api.settings = _objectSpread$1(_objectSpread$1({}, defaults), options);

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

        event.preventDefault();
      }
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Drawer = function Drawer(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    dataDrawer: 'drawer',
    dataToggle: 'drawer-toggle',
    dataClose: 'drawer-close',
    dataBreakpoint: 'drawer-breakpoint',
    dataFocus: 'drawer-focus',
    stateOpen: 'is-open',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',
    classModal: 'drawer_modal',
    breakpoints: breakpoints,
    focus: true,
    saveState: true,
    saveKey: 'DrawerState'
  };
  api.settings = _objectSpread$2(_objectSpread$2({}, defaults), options);
  api.memoryTrigger = null;
  api.memoryTarget = null;
  api.state = {};
  api.mediaQueryLists = [];

  api.init = function () {
    applyState();
    breakpointInit();
    document.addEventListener('click', run, false);
    document.addEventListener('touchend', run, false);
    document.addEventListener('keyup', escape, false);
  };

  api.destroy = function () {
    api.memoryTrigger = null;
    api.memoryTarget = null;
    api.state = {};
    localStorage.removeItem(api.settings.saveKey);
    document.removeEventListener('click', run, false);
    document.removeEventListener('touchend', run, false);
    document.removeEventListener('keyup', escape, false);
  };

  api.toggle = function (drawerKey, callback) {
    toggle(drawerKey, callback);
  };

  api.open = function (drawerKey, callback) {
    var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));

    if (drawer) {
      open(drawer, callback);
    }
  };

  api.close = function (drawerKey, callback) {
    var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));

    if (drawer) {
      close(drawer, callback);
    }
  };

  var run = function run(event) {
    var trigger = event.target.closest("[data-".concat(api.settings.dataToggle, "]"));

    if (trigger) {
      var selector = trigger.dataset[camelCase(api.settings.dataToggle)];
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

  var toggle = function toggle(drawerKey, callback) {
    var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));

    if (drawer) {
      var isOpen = hasClass(drawer, api.settings.stateOpen);

      if (!isOpen) {
        open(drawer, callback);
      } else {
        close(drawer, callback);
      }
    }
  };

  var open = function open(drawer, callback) {
    if (!hasClass(drawer, api.settings.stateOpen)) {
      saveTarget(drawer);
      addClass(drawer, api.settings.stateOpening);
      drawer.addEventListener('transitionend', function _listener() {
        addClass(drawer, api.settings.stateOpen);
        removeClass(drawer, api.settings.stateOpening);
        saveState(drawer);
        setFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
      }, true);
    }
  };

  var close = function close(drawer, callback) {
    if (hasClass(drawer, api.settings.stateOpen)) {
      addClass(drawer, api.settings.stateClosing);
      removeClass(drawer, api.settings.stateOpen);
      drawer.addEventListener('transitionend', function _listener() {
        removeClass(drawer, api.settings.stateClosing);
        saveState(drawer);
        returnFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
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
      localStorage.setItem(api.settings.saveKey, JSON.stringify(api.state));
    }
  };

  var applyState = function applyState() {
    if (api.settings.saveState) {
      if (localStorage.getItem(api.settings.saveKey)) {
        api.state = JSON.parse(localStorage.getItem(api.settings.saveKey));
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
      if (localStorage.getItem(api.settings.saveKey)) {
        localStorage.removeItem(api.settings.saveKey);
      }
    }
  };

  var breakpointInit = function breakpointInit() {
    var drawers = document.querySelectorAll("[data-".concat(api.settings.dataBreakpoint, "]"));

    if (drawers) {
      drawers.forEach(function (drawer) {
        var key = drawer.dataset[camelCase(api.settings.dataBreakpoint)];
        var bp = api.settings.breakpoints[key] ? api.settings.breakpoints[key] : key;
        var mqList = window.matchMedia('(min-width:' + bp + ')');

        if (mqList.matches) {
          switchToDrawer(drawer);
        } else {
          switchToModal(drawer);
        }

        mqList.addListener(breakpointCheck);
        api.mediaQueryLists.push({
          'drawer': drawer,
          'mqList': mqList
        });
      });
    }
  };

  var breakpointCheck = function breakpointCheck(event) {
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
    var drawerKey = drawer.dataset[camelCase(api.settings.dataDrawer)];
    var drawerState = api.state[drawerKey];

    if (drawerState == api.settings.stateOpen) {
      addClass(drawer, api.settings.stateOpen);
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Modal = function Modal(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    dataModal: 'modal',
    dataOpen: 'modal-open',
    dataClose: 'modal-close',
    dataFocus: 'modal-focus',
    dataRequired: 'modal-required',
    stateOpen: 'is-open',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',
    focus: true
  };
  api.settings = _objectSpread$3(_objectSpread$3({}, defaults), options);
  api.memoryTrigger = null;
  api.memoryTarget = null;

  api.init = function () {
    document.addEventListener('click', run, false);
    document.addEventListener('touchend', run, false);
    document.addEventListener('keyup', escape, false);
  };

  api.destroy = function () {
    api.memoryTrigger = null;
    api.memoryTarget = null;
    document.removeEventListener('click', run, false);
    document.removeEventListener('touchend', run, false);
    document.removeEventListener('keyup', escape, false);
  };

  api.open = function (modalKey, callback) {
    open(modalKey, callback);
  };

  api.close = function (returnFocus, callback) {
    close(returnFocus, callback);
  };

  var run = function run(event) {
    var trigger = event.target.closest("[data-".concat(api.settings.dataOpen, "]"));

    if (trigger) {
      var targetData = trigger.dataset[camelCase(api.settings.dataOpen)];
      var fromModal = event.target.closest("[data-".concat(api.settings.dataModal, "]"));
      if (!fromModal) saveTrigger(trigger);
      close(!fromModal);
      open(targetData);
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
    if (event.keyCode == 27) {
      var target = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpen));

      if (target && !target.hasAttribute("data-".concat(api.settings.dataRequired))) {
        close();
      }
    }
  };

  var open = function open(modalKey, callback) {
    var target = document.querySelector("[data-".concat(api.settings.dataModal, "=\"").concat(modalKey, "\"]"));

    if (target && !hasClass(target, api.settings.stateOpen)) {
      saveTarget(target);
      addClass(target, api.settings.stateOpening);
      target.addEventListener('transitionend', function _listener() {
        addClass(target, api.settings.stateOpen);
        removeClass(target, api.settings.stateOpening);
        setFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
      }, true);
    }
  };

  var close = function close() {
    var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    var target = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpen));

    if (target) {
      addClass(target, api.settings.stateClosing);
      removeClass(target, api.settings.stateOpen);
      target.addEventListener('transitionend', function _listener() {
        removeClass(target, api.settings.stateClosing);
        if (focus) returnFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
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

  if (api.settings.autoInit) api.init();
  return api;
};

exports.Checkbox = Checkbox;
exports.Dismissible = Dismissible;
exports.Drawer = Drawer;
exports.Modal = Modal;
exports.utility = index;
