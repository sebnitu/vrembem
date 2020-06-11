'use strict';

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

var breakpoints = {
  xs: '480px',
  sm: '620px',
  md: '760px',
  lg: '990px',
  xl: '1380px'
};

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
    stateOpened: 'is-opened',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',
    classModal: 'drawer_modal',
    customEventPrefix: 'drawer:',
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
      var target = document.querySelector(".".concat(api.settings.classModal, ".").concat(api.settings.stateOpened));

      if (target) {
        close(target);
      }
    }
  };

  var toggle = function toggle(drawerKey, callback) {
    var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));

    if (drawer) {
      var isOpen = hasClass(drawer, api.settings.stateOpened);

      if (!isOpen) {
        open(drawer, callback);
      } else {
        close(drawer, callback);
      }
    }
  };

  var open = function open(drawer, callback) {
    if (!hasClass(drawer, api.settings.stateOpened)) {
      saveTarget(drawer);
      addClass(drawer, api.settings.stateOpening);
      removeClass(drawer, api.settings.stateClosed);
      drawer.addEventListener('transitionend', function _listener() {
        addClass(drawer, api.settings.stateOpened);
        removeClass(drawer, api.settings.stateOpening);
        saveState(drawer);
        setFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
        var customEvent = new CustomEvent(api.settings.customEventPrefix + 'opened', {
          bubbles: true
        });
        drawer.dispatchEvent(customEvent);
      }, true);
    }
  };

  var close = function close(drawer, callback) {
    if (hasClass(drawer, api.settings.stateOpened)) {
      addClass(drawer, api.settings.stateClosing);
      removeClass(drawer, api.settings.stateOpened);
      drawer.addEventListener('transitionend', function _listener() {
        addClass(drawer, api.settings.stateClosed);
        removeClass(drawer, api.settings.stateClosing);
        saveState(drawer);
        returnFocus();
        typeof callback === 'function' && callback();
        this.removeEventListener('transitionend', _listener, true);
        var customEvent = new CustomEvent(api.settings.customEventPrefix + 'closed', {
          bubbles: true
        });
        drawer.dispatchEvent(customEvent);
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
          api.state[el.dataset[camelCase(api.settings.dataDrawer)]] = hasClass(el, api.settings.stateOpened) ? api.settings.stateOpened : api.settings.stateClosed;
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
            if (api.state[key] == api.settings.stateOpened) {
              addClass(item, api.settings.stateOpened);
            } else {
              removeClass(item, api.settings.stateOpened);
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
    addClass(drawer, api.settings.stateClosed);
    removeClass(drawer, api.settings.stateOpened);
    var customEvent = new CustomEvent(api.settings.customEventPrefix + 'breakpoint', {
      bubbles: true,
      detail: {
        state: 'modal'
      }
    });
    drawer.dispatchEvent(customEvent);
  };

  var switchToDrawer = function switchToDrawer(drawer) {
    removeClass(drawer, api.settings.classModal);
    var drawerKey = drawer.dataset[camelCase(api.settings.dataDrawer)];
    var drawerState = api.state[drawerKey];

    if (drawerState == api.settings.stateOpened) {
      addClass(drawer, api.settings.stateOpened);
      removeClass(drawer, api.settings.stateClosed);
    }

    var customEvent = new CustomEvent(api.settings.customEventPrefix + 'breakpoint', {
      bubbles: true,
      detail: {
        state: 'drawer'
      }
    });
    drawer.dispatchEvent(customEvent);
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

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
(function () {

  if (typeof window !== "undefined" && window.addEventListener) {
    var cache = Object.create(null);
    var checkUseElems;
    var tid;

    var debouncedCheck = function debouncedCheck() {
      clearTimeout(tid);
      tid = setTimeout(checkUseElems, 100);
    };

    var unobserveChanges = function unobserveChanges() {
      return;
    };

    var observeChanges = function observeChanges() {
      var observer;
      window.addEventListener("resize", debouncedCheck, false);
      window.addEventListener("orientationchange", debouncedCheck, false);

      if (window.MutationObserver) {
        observer = new MutationObserver(debouncedCheck);
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true
        });

        unobserveChanges = function unobserveChanges() {
          try {
            observer.disconnect();
            window.removeEventListener("resize", debouncedCheck, false);
            window.removeEventListener("orientationchange", debouncedCheck, false);
          } catch (ignore) {}
        };
      } else {
        document.documentElement.addEventListener("DOMSubtreeModified", debouncedCheck, false);

        unobserveChanges = function unobserveChanges() {
          document.documentElement.removeEventListener("DOMSubtreeModified", debouncedCheck, false);
          window.removeEventListener("resize", debouncedCheck, false);
          window.removeEventListener("orientationchange", debouncedCheck, false);
        };
      }
    };

    var createRequest = function createRequest(url) {
      function getOrigin(loc) {
        var a;

        if (loc.protocol !== undefined) {
          a = loc;
        } else {
          a = document.createElement("a");
          a.href = loc;
        }

        return a.protocol.replace(/:/g, "") + a.host;
      }

      var Request;
      var origin;
      var origin2;

      if (window.XMLHttpRequest) {
        Request = new XMLHttpRequest();
        origin = getOrigin(location);
        origin2 = getOrigin(url);

        if (Request.withCredentials === undefined && origin2 !== "" && origin2 !== origin) {
          Request = XDomainRequest || undefined;
        } else {
          Request = XMLHttpRequest;
        }
      }

      return Request;
    };

    var xlinkNS = "http://www.w3.org/1999/xlink";

    checkUseElems = function checkUseElems() {
      var base;
      var bcr;
      var hash;
      var href;
      var i;
      var inProgressCount = 0;
      var isHidden;
      var Request;
      var url;
      var uses;
      var xhr;

      function observeIfDone() {
        inProgressCount -= 1;

        if (inProgressCount === 0) {
          unobserveChanges();
          observeChanges();
        }
      }

      function attrUpdateFunc(spec) {
        return function () {
          if (cache[spec.base] !== true) {
            spec.useEl.setAttributeNS(xlinkNS, "xlink:href", "#" + spec.hash);

            if (spec.useEl.hasAttribute("href")) {
              spec.useEl.setAttribute("href", "#" + spec.hash);
            }
          }
        };
      }

      function onloadFunc(xhr) {
        return function () {
          var body = document.body;
          var x = document.createElement("x");
          var svg;
          xhr.onload = null;
          x.innerHTML = xhr.responseText;
          svg = x.getElementsByTagName("svg")[0];

          if (svg) {
            svg.setAttribute("aria-hidden", "true");
            svg.style.position = "absolute";
            svg.style.width = 0;
            svg.style.height = 0;
            svg.style.overflow = "hidden";
            body.insertBefore(svg, body.firstChild);
          }

          observeIfDone();
        };
      }

      function onErrorTimeout(xhr) {
        return function () {
          xhr.onerror = null;
          xhr.ontimeout = null;
          observeIfDone();
        };
      }

      unobserveChanges();
      uses = document.getElementsByTagName("use");

      for (i = 0; i < uses.length; i += 1) {
        try {
          bcr = uses[i].getBoundingClientRect();
        } catch (ignore) {
          bcr = false;
        }

        href = uses[i].getAttribute("href") || uses[i].getAttributeNS(xlinkNS, "href") || uses[i].getAttribute("xlink:href");

        if (href && href.split) {
          url = href.split("#");
        } else {
          url = ["", ""];
        }

        base = url[0];
        hash = url[1];
        isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;

        if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {

          if (uses[i].hasAttribute("href")) {
            uses[i].setAttributeNS(xlinkNS, "xlink:href", href);
          }

          if (base.length) {
            xhr = cache[base];

            if (xhr !== true) {
              setTimeout(attrUpdateFunc({
                useEl: uses[i],
                base: base,
                hash: hash
              }), 0);
            }

            if (xhr === undefined) {
              Request = createRequest(base);

              if (Request !== undefined) {
                xhr = new Request();
                cache[base] = xhr;
                xhr.onload = onloadFunc(xhr);
                xhr.onerror = onErrorTimeout(xhr);
                xhr.ontimeout = onErrorTimeout(xhr);
                xhr.open("GET", base);
                xhr.send();
                inProgressCount += 1;
              }
            }
          }
        } else {
          if (!isHidden) {
            if (cache[base] === undefined) {
              cache[base] = true;
            } else if (cache[base].onload) {
              cache[base].abort();
              delete cache[base].onload;
              cache[base] = true;
            }
          } else if (base.length && cache[base]) {
            setTimeout(attrUpdateFunc({
              useEl: uses[i],
              base: base,
              hash: hash
            }), 0);
          }
        }
      }

      uses = "";
      inProgressCount += 1;
      observeIfDone();
    };

    var _winLoad;

    _winLoad = function winLoad() {
      window.removeEventListener("load", _winLoad, false);
      tid = setTimeout(checkUseElems, 0);
    };

    if (document.readyState !== "complete") {
      window.addEventListener("load", _winLoad, false);
    } else {
      _winLoad();
    }
  }
})();

var alphabet;
var alphabetIndexMap;
var alphabetIndexMapLength = 0;

function isNumberCode(code) {
  return code >= 48 && code <= 57;
}

function naturalCompare(a, b) {
  var lengthA = (a += '').length;
  var lengthB = (b += '').length;
  var aIndex = 0;
  var bIndex = 0;

  while (aIndex < lengthA && bIndex < lengthB) {
    var charCodeA = a.charCodeAt(aIndex);
    var charCodeB = b.charCodeAt(bIndex);

    if (isNumberCode(charCodeA)) {
      if (!isNumberCode(charCodeB)) {
        return charCodeA - charCodeB;
      }

      var numStartA = aIndex;
      var numStartB = bIndex;

      while (charCodeA === 48 && ++numStartA < lengthA) {
        charCodeA = a.charCodeAt(numStartA);
      }

      while (charCodeB === 48 && ++numStartB < lengthB) {
        charCodeB = b.charCodeAt(numStartB);
      }

      var numEndA = numStartA;
      var numEndB = numStartB;

      while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
        ++numEndA;
      }

      while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
        ++numEndB;
      }

      var difference = numEndA - numStartA - numEndB + numStartB;

      if (difference) {
        return difference;
      }

      while (numStartA < numEndA) {
        difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);

        if (difference) {
          return difference;
        }
      }

      aIndex = numEndA;
      bIndex = numEndB;
      continue;
    }

    if (charCodeA !== charCodeB) {
      if (charCodeA < alphabetIndexMapLength && charCodeB < alphabetIndexMapLength && alphabetIndexMap[charCodeA] !== -1 && alphabetIndexMap[charCodeB] !== -1) {
        return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
      }

      return charCodeA - charCodeB;
    }

    ++aIndex;
    ++bIndex;
  }

  if (aIndex >= lengthA && bIndex < lengthB && lengthA >= lengthB) {
    return -1;
  }

  if (bIndex >= lengthB && aIndex < lengthA && lengthB >= lengthA) {
    return 1;
  }

  return lengthA - lengthB;
}

naturalCompare.caseInsensitive = naturalCompare.i = function (a, b) {
  return naturalCompare(('' + a).toLowerCase(), ('' + b).toLowerCase());
};

Object.defineProperties(naturalCompare, {
  alphabet: {
    get: function get() {
      return alphabet;
    },
    set: function set(value) {
      alphabet = value;
      alphabetIndexMap = [];
      var i = 0;

      if (alphabet) {
        for (; i < alphabet.length; i++) {
          alphabetIndexMap[alphabet.charCodeAt(i)] = i;
        }
      }

      alphabetIndexMapLength = alphabetIndexMap.length;

      for (i = 0; i < alphabetIndexMapLength; i++) {
        if (alphabetIndexMap[i] === undefined) {
          alphabetIndexMap[i] = -1;
        }
      }
    }
  }
});
var naturalCompare_1 = naturalCompare;

var getElementsByClassName = function getElementsByClassName(container, className, single) {
  if (single) {
    return container.getElementsByClassName(className)[0];
  } else {
    return container.getElementsByClassName(className);
  }
};

var querySelector = function querySelector(container, className, single) {
  className = '.' + className;

  if (single) {
    return container.querySelector(className);
  } else {
    return container.querySelectorAll(className);
  }
};

var polyfill = function polyfill(container, className, single) {
  var classElements = [],
      tag = '*';
  var els = container.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");

  for (var i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className)) {
      if (single) {
        return els[i];
      } else {
        classElements[j] = els[i];
        j++;
      }
    }
  }

  return classElements;
};

var getByClass = function () {
  return function (container, className, single, options) {
    options = options || {};

    if (options.test && options.getElementsByClassName || !options.test && document.getElementsByClassName) {
      return getElementsByClassName(container, className, single);
    } else if (options.test && options.querySelector || !options.test && document.querySelector) {
      return querySelector(container, className, single);
    } else {
      return polyfill(container, className, single);
    }
  };
}();

var extend = function extend(object) {
  var args = Array.prototype.slice.call(arguments, 1);

  for (var i = 0, source; source = args[i]; i++) {
    if (!source) continue;

    for (var property in source) {
      object[property] = source[property];
    }
  }

  return object;
};

var indexOf = [].indexOf;

var indexOf_1 = function indexOf_1(arr, obj) {
  if (indexOf) return arr.indexOf(obj);

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }

  return -1;
};

var toArray = function toArray(collection) {
  if (typeof collection === 'undefined') return [];
  if (collection === null) return [null];
  if (collection === window) return [window];
  if (typeof collection === 'string') return [collection];
  if (isArray(collection)) return collection;
  if (typeof collection.length != 'number') return [collection];
  if (typeof collection === 'function' && collection instanceof Function) return [collection];
  var arr = [];

  for (var i = 0; i < collection.length; i++) {
    if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
      arr.push(collection[i]);
    }
  }

  if (!arr.length) return [];
  return arr;
};

function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

var bind_1 = function bind_1(el, type, fn, capture) {
  el = toArray(el);

  for (var i = 0; i < el.length; i++) {
    el[i][bind](prefix + type, fn, capture || false);
  }
};

var unbind_1 = function unbind_1(el, type, fn, capture) {
  el = toArray(el);

  for (var i = 0; i < el.length; i++) {
    el[i][unbind](prefix + type, fn, capture || false);
  }
};

var events = {
  bind: bind_1,
  unbind: unbind_1
};

var toString_1 = function toString_1(s) {
  s = s === undefined ? "" : s;
  s = s === null ? "" : s;
  s = s.toString();
  return s;
};

var re = /\s+/;

var classes = function classes(el) {
  return new ClassList(el);
};

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }

  this.el = el;
  this.list = el.classList;
}

ClassList.prototype.add = function (name) {
  if (this.list) {
    this.list.add(name);
    return this;
  }

  var arr = this.array();
  var i = indexOf_1(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

ClassList.prototype.remove = function (name) {
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  var arr = this.array();
  var i = indexOf_1(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

ClassList.prototype.toggle = function (name, force) {
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name);
      }
    } else {
      this.list.toggle(name);
    }

    return this;
  }

  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

ClassList.prototype.array = function () {
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

ClassList.prototype.has = ClassList.prototype.contains = function (name) {
  return this.list ? this.list.contains(name) : !!~indexOf_1(this.array(), name);
};

var getAttribute = function getAttribute(el, attr) {
  var result = el.getAttribute && el.getAttribute(attr) || null;

  if (!result) {
    var attrs = el.attributes;
    var length = attrs.length;

    for (var i = 0; i < length; i++) {
      if (attr[i] !== undefined) {
        if (attr[i].nodeName === attr) {
          result = attr[i].nodeValue;
        }
      }
    }
  }

  return result;
};

var item = function item(list) {
  return function (initValues, element, notCreate) {
    var item = this;
    this._values = {};
    this.found = false;
    this.filtered = false;

    var init = function init(initValues, element, notCreate) {
      if (element === undefined) {
        if (notCreate) {
          item.values(initValues, notCreate);
        } else {
          item.values(initValues);
        }
      } else {
        item.elm = element;
        var values = list.templater.get(item, initValues);
        item.values(values);
      }
    };

    this.values = function (newValues, notCreate) {
      if (newValues !== undefined) {
        for (var name in newValues) {
          item._values[name] = newValues[name];
        }

        if (notCreate !== true) {
          list.templater.set(item, item.values());
        }
      } else {
        return item._values;
      }
    };

    this.show = function () {
      list.templater.show(item);
    };

    this.hide = function () {
      list.templater.hide(item);
    };

    this.matching = function () {
      return list.filtered && list.searched && item.found && item.filtered || list.filtered && !list.searched && item.filtered || !list.filtered && list.searched && item.found || !list.filtered && !list.searched;
    };

    this.visible = function () {
      return item.elm && item.elm.parentNode == list.list ? true : false;
    };

    init(initValues, element, notCreate);
  };
};

var addAsync = function addAsync(list) {
  var addAsync = function addAsync(values, callback, items) {
    var valuesToAdd = values.splice(0, 50);
    items = items || [];
    items = items.concat(list.add(valuesToAdd));

    if (values.length > 0) {
      setTimeout(function () {
        addAsync(values, callback, items);
      }, 1);
    } else {
      list.update();
      callback(items);
    }
  };

  return addAsync;
};

var pagination = function pagination(list) {
  var refresh = function refresh(pagingList, options) {
    var item,
        l = list.matchingItems.length,
        index = list.i,
        page = list.page,
        pages = Math.ceil(l / page),
        currentPage = Math.ceil(index / page),
        innerWindow = options.innerWindow || 2,
        left = options.left || options.outerWindow || 0,
        right = options.right || options.outerWindow || 0;
    right = pages - right;
    pagingList.clear();

    for (var i = 1; i <= pages; i++) {
      var className = currentPage === i ? "active" : "";

      if (is.number(i, left, right, currentPage, innerWindow)) {
        item = pagingList.add({
          page: i,
          dotted: false
        })[0];

        if (className) {
          classes(item.elm).add(className);
        }

        addEvent(item.elm, i, page);
      } else if (is.dotted(pagingList, i, left, right, currentPage, innerWindow, pagingList.size())) {
        item = pagingList.add({
          page: "...",
          dotted: true
        })[0];
        classes(item.elm).add("disabled");
      }
    }
  };

  var is = {
    number: function number(i, left, right, currentPage, innerWindow) {
      return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
    },
    left: function left(i, _left) {
      return i <= _left;
    },
    right: function right(i, _right) {
      return i > _right;
    },
    innerWindow: function innerWindow(i, currentPage, _innerWindow) {
      return i >= currentPage - _innerWindow && i <= currentPage + _innerWindow;
    },
    dotted: function dotted(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
      return this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) || this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem);
    },
    dottedLeft: function dottedLeft(pagingList, i, left, right, currentPage, innerWindow) {
      return i == left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
    },
    dottedRight: function dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
      if (pagingList.items[currentPageItem - 1].values().dotted) {
        return false;
      } else {
        return i == right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
      }
    }
  };

  var addEvent = function addEvent(elm, i, page) {
    events.bind(elm, 'click', function () {
      list.show((i - 1) * page + 1, page);
    });
  };

  return function (options) {
    var pagingList = new src(list.listContainer.id, {
      listClass: options.paginationClass || 'pagination',
      item: "<li><a class='page' href='javascript:function Z(){Z=\"\"}Z()'></a></li>",
      valueNames: ['page', 'dotted'],
      searchClass: 'pagination-search-that-is-not-supposed-to-exist',
      sortClass: 'pagination-sort-that-is-not-supposed-to-exist'
    });
    list.on('updated', function () {
      refresh(pagingList, options);
    });
    refresh(pagingList, options);
  };
};

var parse = function parse(list) {
  var Item = item(list);

  var getChildren = function getChildren(parent) {
    var nodes = parent.childNodes,
        items = [];

    for (var i = 0, il = nodes.length; i < il; i++) {
      if (nodes[i].data === undefined) {
        items.push(nodes[i]);
      }
    }

    return items;
  };

  var parse = function parse(itemElements, valueNames) {
    for (var i = 0, il = itemElements.length; i < il; i++) {
      list.items.push(new Item(valueNames, itemElements[i]));
    }
  };

  var parseAsync = function parseAsync(itemElements, valueNames) {
    var itemsToIndex = itemElements.splice(0, 50);
    parse(itemsToIndex, valueNames);

    if (itemElements.length > 0) {
      setTimeout(function () {
        parseAsync(itemElements, valueNames);
      }, 1);
    } else {
      list.update();
      list.trigger('parseComplete');
    }
  };

  list.handlers.parseComplete = list.handlers.parseComplete || [];
  return function () {
    var itemsToIndex = getChildren(list.list),
        valueNames = list.valueNames;

    if (list.indexAsync) {
      parseAsync(itemsToIndex, valueNames);
    } else {
      parse(itemsToIndex, valueNames);
    }
  };
};

var Templater = function Templater(list) {
  var itemSource,
      templater = this;

  var init = function init() {
    itemSource = templater.getItemSource(list.item);

    if (itemSource) {
      itemSource = templater.clearSourceItem(itemSource, list.valueNames);
    }
  };

  this.clearSourceItem = function (el, valueNames) {
    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm;

      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          el.setAttribute('data-' + valueNames[i].data[j], '');
        }
      } else if (valueNames[i].attr && valueNames[i].name) {
        elm = list.utils.getByClass(el, valueNames[i].name, true);

        if (elm) {
          elm.setAttribute(valueNames[i].attr, "");
        }
      } else {
        elm = list.utils.getByClass(el, valueNames[i], true);

        if (elm) {
          elm.innerHTML = "";
        }
      }

      elm = undefined;
    }

    return el;
  };

  this.getItemSource = function (item) {
    if (item === undefined) {
      var nodes = list.list.childNodes;

      for (var i = 0, il = nodes.length; i < il; i++) {
        if (nodes[i].data === undefined) {
          return nodes[i].cloneNode(true);
        }
      }
    } else if (/<tr[\s>]/g.exec(item)) {
      var tbody = document.createElement('tbody');
      tbody.innerHTML = item;
      return tbody.firstChild;
    } else if (item.indexOf("<") !== -1) {
      var div = document.createElement('div');
      div.innerHTML = item;
      return div.firstChild;
    } else {
      var source = document.getElementById(list.item);

      if (source) {
        return source;
      }
    }

    return undefined;
  };

  this.get = function (item, valueNames) {
    templater.create(item);
    var values = {};

    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm;

      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          values[valueNames[i].data[j]] = list.utils.getAttribute(item.elm, 'data-' + valueNames[i].data[j]);
        }
      } else if (valueNames[i].attr && valueNames[i].name) {
        elm = list.utils.getByClass(item.elm, valueNames[i].name, true);
        values[valueNames[i].name] = elm ? list.utils.getAttribute(elm, valueNames[i].attr) : "";
      } else {
        elm = list.utils.getByClass(item.elm, valueNames[i], true);
        values[valueNames[i]] = elm ? elm.innerHTML : "";
      }

      elm = undefined;
    }

    return values;
  };

  this.set = function (item, values) {
    var getValueName = function getValueName(name) {
      for (var i = 0, il = list.valueNames.length; i < il; i++) {
        if (list.valueNames[i].data) {
          var data = list.valueNames[i].data;

          for (var j = 0, jl = data.length; j < jl; j++) {
            if (data[j] === name) {
              return {
                data: name
              };
            }
          }
        } else if (list.valueNames[i].attr && list.valueNames[i].name && list.valueNames[i].name == name) {
          return list.valueNames[i];
        } else if (list.valueNames[i] === name) {
          return name;
        }
      }
    };

    var setValue = function setValue(name, value) {
      var elm;
      var valueName = getValueName(name);
      if (!valueName) return;

      if (valueName.data) {
        item.elm.setAttribute('data-' + valueName.data, value);
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(item.elm, valueName.name, true);

        if (elm) {
          elm.setAttribute(valueName.attr, value);
        }
      } else {
        elm = list.utils.getByClass(item.elm, valueName, true);

        if (elm) {
          elm.innerHTML = value;
        }
      }

      elm = undefined;
    };

    if (!templater.create(item)) {
      for (var v in values) {
        if (values.hasOwnProperty(v)) {
          setValue(v, values[v]);
        }
      }
    }
  };

  this.create = function (item) {
    if (item.elm !== undefined) {
      return false;
    }

    if (itemSource === undefined) {
      throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.");
    }

    var newItem = itemSource.cloneNode(true);
    newItem.removeAttribute('id');
    item.elm = newItem;
    templater.set(item, item.values());
    return true;
  };

  this.remove = function (item) {
    if (item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };

  this.show = function (item) {
    templater.create(item);
    list.list.appendChild(item.elm);
  };

  this.hide = function (item) {
    if (item.elm !== undefined && item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };

  this.clear = function () {
    if (list.list.hasChildNodes()) {
      while (list.list.childNodes.length >= 1) {
        list.list.removeChild(list.list.firstChild);
      }
    }
  };

  init();
};

var templater = function templater(list) {
  return new Templater(list);
};

var search = function search(_list) {
  var text, columns, searchString, customSearch;
  var prepare = {
    resetList: function resetList() {
      _list.i = 1;

      _list.templater.clear();

      customSearch = undefined;
    },
    setOptions: function setOptions(args) {
      if (args.length == 2 && args[1] instanceof Array) {
        columns = args[1];
      } else if (args.length == 2 && typeof args[1] == "function") {
        columns = undefined;
        customSearch = args[1];
      } else if (args.length == 3) {
        columns = args[1];
        customSearch = args[2];
      } else {
        columns = undefined;
      }
    },
    setColumns: function setColumns() {
      if (_list.items.length === 0) return;

      if (columns === undefined) {
        columns = _list.searchColumns === undefined ? prepare.toArray(_list.items[0].values()) : _list.searchColumns;
      }
    },
    setSearchString: function setSearchString(s) {
      s = _list.utils.toString(s).toLowerCase();
      s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
      searchString = s;
    },
    toArray: function toArray(values) {
      var tmpColumn = [];

      for (var name in values) {
        tmpColumn.push(name);
      }

      return tmpColumn;
    }
  };
  var search = {
    list: function list() {
      for (var k = 0, kl = _list.items.length; k < kl; k++) {
        search.item(_list.items[k]);
      }
    },
    item: function item(_item) {
      _item.found = false;

      for (var j = 0, jl = columns.length; j < jl; j++) {
        if (search.values(_item.values(), columns[j])) {
          _item.found = true;
          return;
        }
      }
    },
    values: function values(_values, column) {
      if (_values.hasOwnProperty(column)) {
        text = _list.utils.toString(_values[column]).toLowerCase();

        if (searchString !== "" && text.search(searchString) > -1) {
          return true;
        }
      }

      return false;
    },
    reset: function reset() {
      _list.reset.search();

      _list.searched = false;
    }
  };

  var searchMethod = function searchMethod(str) {
    _list.trigger('searchStart');

    prepare.resetList();
    prepare.setSearchString(str);
    prepare.setOptions(arguments);
    prepare.setColumns();

    if (searchString === "") {
      search.reset();
    } else {
      _list.searched = true;

      if (customSearch) {
        customSearch(searchString, columns);
      } else {
        search.list();
      }
    }

    _list.update();

    _list.trigger('searchComplete');

    return _list.visibleItems;
  };

  _list.handlers.searchStart = _list.handlers.searchStart || [];
  _list.handlers.searchComplete = _list.handlers.searchComplete || [];

  _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'keyup', function (e) {
    var target = e.target || e.srcElement,
        alreadyCleared = target.value === "" && !_list.searched;

    if (!alreadyCleared) {
      searchMethod(target.value);
    }
  });

  _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'input', function (e) {
    var target = e.target || e.srcElement;

    if (target.value === "") {
      searchMethod('');
    }
  });

  return searchMethod;
};

var filter = function filter(list) {
  list.handlers.filterStart = list.handlers.filterStart || [];
  list.handlers.filterComplete = list.handlers.filterComplete || [];
  return function (filterFunction) {
    list.trigger('filterStart');
    list.i = 1;
    list.reset.filter();

    if (filterFunction === undefined) {
      list.filtered = false;
    } else {
      list.filtered = true;
      var is = list.items;

      for (var i = 0, il = is.length; i < il; i++) {
        var item = is[i];

        if (filterFunction(item)) {
          item.filtered = true;
        } else {
          item.filtered = false;
        }
      }
    }

    list.update();
    list.trigger('filterComplete');
    return list.visibleItems;
  };
};

var sort = function sort(list) {
  var buttons = {
    els: undefined,
    clear: function clear() {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        list.utils.classes(buttons.els[i]).remove('asc');
        list.utils.classes(buttons.els[i]).remove('desc');
      }
    },
    getOrder: function getOrder(btn) {
      var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

      if (predefinedOrder == "asc" || predefinedOrder == "desc") {
        return predefinedOrder;
      } else if (list.utils.classes(btn).has('desc')) {
        return "asc";
      } else if (list.utils.classes(btn).has('asc')) {
        return "desc";
      } else {
        return "asc";
      }
    },
    getInSensitive: function getInSensitive(btn, options) {
      var insensitive = list.utils.getAttribute(btn, 'data-insensitive');

      if (insensitive === "false") {
        options.insensitive = false;
      } else {
        options.insensitive = true;
      }
    },
    setOrder: function setOrder(options) {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        var btn = buttons.els[i];

        if (list.utils.getAttribute(btn, 'data-sort') !== options.valueName) {
          continue;
        }

        var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
          if (predefinedOrder == options.order) {
            list.utils.classes(btn).add(options.order);
          }
        } else {
          list.utils.classes(btn).add(options.order);
        }
      }
    }
  };

  var sort = function sort() {
    list.trigger('sortStart');
    var options = {};
    var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

    if (target) {
      options.valueName = list.utils.getAttribute(target, 'data-sort');
      buttons.getInSensitive(target, options);
      options.order = buttons.getOrder(target);
    } else {
      options = arguments[1] || options;
      options.valueName = arguments[0];
      options.order = options.order || "asc";
      options.insensitive = typeof options.insensitive == "undefined" ? true : options.insensitive;
    }

    buttons.clear();
    buttons.setOrder(options);
    var customSortFunction = options.sortFunction || list.sortFunction || null,
        multi = options.order === 'desc' ? -1 : 1,
        sortFunction;

    if (customSortFunction) {
      sortFunction = function sortFunction(itemA, itemB) {
        return customSortFunction(itemA, itemB, options) * multi;
      };
    } else {
      sortFunction = function sortFunction(itemA, itemB) {
        var sort = list.utils.naturalSort;
        sort.alphabet = list.alphabet || options.alphabet || undefined;

        if (!sort.alphabet && options.insensitive) {
          sort = list.utils.naturalSort.caseInsensitive;
        }

        return sort(itemA.values()[options.valueName], itemB.values()[options.valueName]) * multi;
      };
    }

    list.items.sort(sortFunction);
    list.update();
    list.trigger('sortComplete');
  };

  list.handlers.sortStart = list.handlers.sortStart || [];
  list.handlers.sortComplete = list.handlers.sortComplete || [];
  buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
  list.utils.events.bind(buttons.els, 'click', sort);
  list.on('searchStart', buttons.clear);
  list.on('filterStart', buttons.clear);
  return sort;
};

var fuzzy = function fuzzy(text, pattern, options) {
  var Match_Location = options.location || 0;
  var Match_Distance = options.distance || 100;
  var Match_Threshold = options.threshold || 0.4;
  if (pattern === text) return true;
  if (pattern.length > 32) return false;

  var loc = Match_Location,
      s = function () {
    var q = {},
        i;

    for (i = 0; i < pattern.length; i++) {
      q[pattern.charAt(i)] = 0;
    }

    for (i = 0; i < pattern.length; i++) {
      q[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
    }

    return q;
  }();

  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length,
        proximity = Math.abs(loc - x);

    if (!Match_Distance) {
      return proximity ? 1.0 : accuracy;
    }

    return accuracy + proximity / Match_Distance;
  }

  var score_threshold = Match_Threshold,
      best_loc = text.indexOf(pattern, loc);

  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);

    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }

  var matchmask = 1 << pattern.length - 1;
  best_loc = -1;
  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;

  for (var d = 0; d < pattern.length; d++) {
    bin_min = 0;
    bin_mid = bin_max;

    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }

      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    }

    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;

    for (var j = finish; j >= start; j--) {
      var charMatch = s[text.charAt(j - 1)];

      if (d === 0) {
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
      } else {
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
      }

      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1);

        if (score <= score_threshold) {
          score_threshold = score;
          best_loc = j - 1;

          if (best_loc > loc) {
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            break;
          }
        }
      }
    }

    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }

    last_rd = rd;
  }

  return best_loc < 0 ? false : true;
};

var fuzzySearch = function fuzzySearch(list, options) {
  options = options || {};
  options = extend({
    location: 0,
    distance: 100,
    threshold: 0.4,
    multiSearch: true,
    searchClass: 'fuzzy-search'
  }, options);
  var fuzzySearch = {
    search: function search(searchString, columns) {
      var searchArguments = options.multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString];

      for (var k = 0, kl = list.items.length; k < kl; k++) {
        fuzzySearch.item(list.items[k], columns, searchArguments);
      }
    },
    item: function item(_item, columns, searchArguments) {
      var found = true;

      for (var i = 0; i < searchArguments.length; i++) {
        var foundArgument = false;

        for (var j = 0, jl = columns.length; j < jl; j++) {
          if (fuzzySearch.values(_item.values(), columns[j], searchArguments[i])) {
            foundArgument = true;
          }
        }

        if (!foundArgument) {
          found = false;
        }
      }

      _item.found = found;
    },
    values: function values(_values, value, searchArgument) {
      if (_values.hasOwnProperty(value)) {
        var text = toString_1(_values[value]).toLowerCase();

        if (fuzzy(text, searchArgument, options)) {
          return true;
        }
      }

      return false;
    }
  };
  events.bind(getByClass(list.listContainer, options.searchClass), 'keyup', function (e) {
    var target = e.target || e.srcElement;
    list.search(target.value, fuzzySearch.search);
  });
  return function (str, columns) {
    list.search(str, columns, fuzzySearch.search);
  };
};

var src = function src(id, options, values) {
  var self = this,
      init,
      Item = item(self),
      addAsync$1 = addAsync(self),
      initPagination = pagination(self);
  init = {
    start: function start() {
      self.listClass = "list";
      self.searchClass = "search";
      self.sortClass = "sort";
      self.page = 10000;
      self.i = 1;
      self.items = [];
      self.visibleItems = [];
      self.matchingItems = [];
      self.searched = false;
      self.filtered = false;
      self.searchColumns = undefined;
      self.handlers = {
        'updated': []
      };
      self.valueNames = [];
      self.utils = {
        getByClass: getByClass,
        extend: extend,
        indexOf: indexOf_1,
        events: events,
        toString: toString_1,
        naturalSort: naturalCompare_1,
        classes: classes,
        getAttribute: getAttribute,
        toArray: toArray
      };
      self.utils.extend(self, options);
      self.listContainer = typeof id === 'string' ? document.getElementById(id) : id;

      if (!self.listContainer) {
        return;
      }

      self.list = getByClass(self.listContainer, self.listClass, true);
      self.parse = parse(self);
      self.templater = templater(self);
      self.search = search(self);
      self.filter = filter(self);
      self.sort = sort(self);
      self.fuzzySearch = fuzzySearch(self, options.fuzzySearch);
      this.handlers();
      this.items();
      this.pagination();
      self.update();
    },
    handlers: function handlers() {
      for (var handler in self.handlers) {
        if (self[handler]) {
          self.on(handler, self[handler]);
        }
      }
    },
    items: function items() {
      self.parse(self.list);

      if (values !== undefined) {
        self.add(values);
      }
    },
    pagination: function pagination() {
      if (options.pagination !== undefined) {
        if (options.pagination === true) {
          options.pagination = [{}];
        }

        if (options.pagination[0] === undefined) {
          options.pagination = [options.pagination];
        }

        for (var i = 0, il = options.pagination.length; i < il; i++) {
          initPagination(options.pagination[i]);
        }
      }
    }
  };

  this.reIndex = function () {
    self.items = [];
    self.visibleItems = [];
    self.matchingItems = [];
    self.searched = false;
    self.filtered = false;
    self.parse(self.list);
  };

  this.toJSON = function () {
    var json = [];

    for (var i = 0, il = self.items.length; i < il; i++) {
      json.push(self.items[i].values());
    }

    return json;
  };

  this.add = function (values, callback) {
    if (values.length === 0) {
      return;
    }

    if (callback) {
      addAsync$1(values, callback);
      return;
    }

    var added = [],
        notCreate = false;

    if (values[0] === undefined) {
      values = [values];
    }

    for (var i = 0, il = values.length; i < il; i++) {
      var item = null;
      notCreate = self.items.length > self.page ? true : false;
      item = new Item(values[i], undefined, notCreate);
      self.items.push(item);
      added.push(item);
    }

    self.update();
    return added;
  };

  this.show = function (i, page) {
    this.i = i;
    this.page = page;
    self.update();
    return self;
  };

  this.remove = function (valueName, value, options) {
    var found = 0;

    for (var i = 0, il = self.items.length; i < il; i++) {
      if (self.items[i].values()[valueName] == value) {
        self.templater.remove(self.items[i], options);
        self.items.splice(i, 1);
        il--;
        i--;
        found++;
      }
    }

    self.update();
    return found;
  };

  this.get = function (valueName, value) {
    var matchedItems = [];

    for (var i = 0, il = self.items.length; i < il; i++) {
      var item = self.items[i];

      if (item.values()[valueName] == value) {
        matchedItems.push(item);
      }
    }

    return matchedItems;
  };

  this.size = function () {
    return self.items.length;
  };

  this.clear = function () {
    self.templater.clear();
    self.items = [];
    return self;
  };

  this.on = function (event, callback) {
    self.handlers[event].push(callback);
    return self;
  };

  this.off = function (event, callback) {
    var e = self.handlers[event];
    var index = indexOf_1(e, callback);

    if (index > -1) {
      e.splice(index, 1);
    }

    return self;
  };

  this.trigger = function (event) {
    var i = self.handlers[event].length;

    while (i--) {
      self.handlers[event][i](self);
    }

    return self;
  };

  this.reset = {
    filter: function filter() {
      var is = self.items,
          il = is.length;

      while (il--) {
        is[il].filtered = false;
      }

      return self;
    },
    search: function search() {
      var is = self.items,
          il = is.length;

      while (il--) {
        is[il].found = false;
      }

      return self;
    }
  };

  this.update = function () {
    var is = self.items,
        il = is.length;
    self.visibleItems = [];
    self.matchingItems = [];
    self.templater.clear();

    for (var i = 0; i < il; i++) {
      if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
        is[i].show();
        self.visibleItems.push(is[i]);
        self.matchingItems.push(is[i]);
      } else if (is[i].matching()) {
        self.matchingItems.push(is[i]);
        is[i].hide();
      } else {
        is[i].hide();
      }
    }

    self.trigger('updated');
    return self;
  };

  init.start();
};

(function () {
  if (document.getElementById('listjs')) {
    var list = new src('listjs', {
      fuzzySearch: {
        searchClass: 'search',
        location: 0,
        distance: 100,
        threshold: 0.4,
        multiSearch: true
      },
      valueNames: ['name', {
        data: ['category']
      }],
      listClass: 'menu'
    });
    var notice_empty = document.querySelector('.notice_empty');
    var notice_empty_text = notice_empty.querySelector('.search_text');
    var filter = document.querySelector('.filter');
    var search = document.querySelector('.filter .search');
    var search_clear = document.querySelector('.filter .search_clear');

    var isMenuLinkActive = function isMenuLinkActive() {
      var menuLinks = document.querySelectorAll('#listjs .menu__link');
      var isActive = hasClass(menuLinks, 'is-active');
      return isActive;
    };

    list.on('searchComplete', function () {
      var value = search.value;
      notice_empty_text.innerHTML = value;
      localStorage.setItem('SearchValue', value);

      if (value) {
        addClass(filter, 'is-active');
        addClass(search, 'is-active');
        removeClass(search_clear, 'display_none');
      } else {
        removeClass(filter, 'is-active');
        removeClass(search, 'is-active');
        addClass(search_clear, 'display_none');
      }

      if (list.visibleItems.length > 0) {
        addClass(notice_empty, 'display_none');
      } else {
        removeClass(notice_empty, 'display_none');
      }
    });
    document.addEventListener('click', function () {
      var trigger_search_clear = event.target.closest('.search_clear');
      var trigger_search_cat = event.target.closest('.category');

      if (trigger_search_clear) {
        search.value = '';
        list.search();
        event.preventDefault();
      }

      if (trigger_search_cat) {
        search.value = trigger_search_cat.dataset.category;
        list.search(search.value);
        event.preventDefault();
      }
    }, false);

    if (localStorage.getItem('SearchValue')) {
      search.value = localStorage.getItem('SearchValue');
      list.search(search.value);

      if (!isMenuLinkActive()) {
        search.value = '';
        list.search();
      }
    }
  }
})();

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Version = function Version(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    url: 'https://api.github.com/repos/sebnitu/vrembem/contents/packages/vrembem/package.json?ref=master'
  };
  api.settings = _objectSpread$4(_objectSpread$4({}, defaults), options);

  api.init = function () {
    var ajax = new XMLHttpRequest();
    var el = document.querySelector('[data-role="version"]');

    if (el) {
      ajax.onload = function () {
        if (ajax.status >= 200 && ajax.status < 300) {
          var response = JSON.parse(ajax.response);
          var decode = window.atob(response.content);
          var pkg = JSON.parse(decode);
          el.classList.remove('loading');
          el.classList.add('success');
          el.innerHTML = pkg.version;
        } else {
          el.classList.remove('loading');
          el.classList.add('error');
          el.innerHTML = 'Error!';
        }
      };

      ajax.open('GET', api.settings.url);
      ajax.send();
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var StickyScroll = function StickyScroll(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    selector: '[data-sticky-scroll]',
    selectorActive: '',
    selectorActiveParent: '',
    selectorElementPadding: '',
    saveKey: 'StickyScroll',
    throttleDelay: 500,
    positionBottom: true,
    padding: 30
  };
  api.settings = _objectSpread$5(_objectSpread$5({}, defaults), options);
  api.lastPosition = 0;
  api.ticking = false;
  api.element = false;

  api.init = function () {
    api.element = document.querySelector(api.settings.selector);

    if (api.element) {
      setScrollPosition();

      if (api.settings.selectorActive) {
        showActive();
      }

      api.element.addEventListener('scroll', throttle, false);
    }
  };

  api.destroy = function () {
    if (api.element) {
      api.element.removeEventListener('scroll', throttle, false);
    }
  };

  api.showActive = function () {
    if (api.settings.selectorActive) {
      showActive();
    }
  };

  var throttle = function throttle(event) {
    api.lastPosition = event.target.scrollTop;

    if (!api.ticking) {
      setTimeout(run, api.settings.throttleDelay);
      api.ticking = true;
    }
  };

  var run = function run() {
    saveScrollPosition();
    api.ticking = false;
  };

  var saveScrollPosition = function saveScrollPosition() {
    localStorage.setItem(api.settings.saveKey, api.lastPosition);
  };

  var setScrollPosition = function setScrollPosition() {
    var pos = localStorage.getItem(api.settings.saveKey);

    if (pos) {
      api.element.scrollTop = pos;
    }
  };

  var showActive = function showActive() {
    var el = api.element.querySelector(api.settings.selectorActive);

    if (api.settings.selectorActiveParent) {
      el = el.closest(api.settings.selectorActiveParent);
    }

    if (el) {
      var adjust = 0;

      if (api.settings.selectorElementPadding) {
        adjust = api.element.querySelector(api.settings.selectorElementPadding).getBoundingClientRect().height;
      }

      var bounding = el.getBoundingClientRect();
      var scrollBounding = api.element.getBoundingClientRect();
      var maxTop = scrollBounding.top + adjust;
      var maxBot = window.innerHeight || document.documentElement.clientHeight;
      var posTop = el.offsetTop - (adjust + api.settings.padding);
      var posBot = el.offsetTop + el.getBoundingClientRect().height + api.settings.padding - scrollBounding.height;

      if (bounding.top < maxTop) {
        api.element.scrollTop = posTop;
      } else if (bounding.bottom > maxBot) {
        api.element.scrollTop = api.settings.positionBottom ? posBot : posTop;
      }
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

new Checkbox({
  autoInit: true
});
new Dismissible({
  autoInit: true
});
new Drawer({
  autoInit: true
});
new Modal({
  autoInit: true
});
new Version({
  autoInit: true
});
var stickyScroll = new StickyScroll({
  autoInit: true,
  selectorActive: '.is-active',
  selectorActiveParent: '.menu__item',
  selectorElementPadding: '.dialog__header'
});
document.addEventListener('drawer:opened', function (event) {
  console.log(event);
  stickyScroll.showActive();
});
document.addEventListener('drawer:closed', function (event) {
  console.log(event);
});
document.addEventListener('drawer:breakpoint', function (event) {
  console.log(event);
});
