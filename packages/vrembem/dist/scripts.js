(function (exports) {
  'use strict';

  var breakpoint = {
    xs: "480px",
    sm: "620px",
    md: "760px",
    lg: "990px",
    xl: "1380px"
  };
  var transition = {
    duration: 300,
    tick: 30
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
    transition: transition,
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
      classTarget: "drawer__item",
      classTrigger: "drawer__trigger",
      classInner: "drawer__dialog",
      classTargetSwitch: "modal",
      classTriggerSwitch: "modal__trigger",
      classInnerSwitch: "modal__dialog",
      classActive: "is-active",
      classTransitionNone: "transition_none",
      saveState: true,
      "switch": "[data-drawer-switch]",
      switchBreakpoint: "lg",
      transitionDuration: 500
    };
    api.settings = _objectSpread$2({}, defaults, {}, options);
    var drawers = [];
    var drawerState = {};
    var switchDrawers;
    var mqlArray = [];

    api.init = function () {
      document.querySelectorAll("." + api.settings.classTarget).forEach(function (drawer) {
        drawers.push({
          "drawer": drawer,
          "defaultState": hasClass(drawer, api.settings.classActive)
        });
      });
      var promiseSaveState = new Promise(function (resolve) {
        if (api.settings.saveState) {
          initSaveState(resolve);
        } else {
          resolve();
        }
      });
      promiseSaveState.then(function () {
        if (api.settings["switch"]) {
          initSwitch();
        }
      });
      document.addEventListener("click", trigger, false);
    };

    api.destroy = function () {
      var defaultState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      destroySwitch();
      stateClear();

      if (defaultState) {
        drawers.forEach(function (item) {
          if (item.defaultState) {
            addClass(item.drawer, api.settings.classActive);
          } else {
            removeClass(item.drawer, api.settings.classActive);
          }
        });
      }

      drawers = [];
      document.removeEventListener("click", trigger, false);
    };

    api.open = function (selector) {
      selector = selector ? selector : "." + api.settings.classTarget;
      toggle(document.querySelectorAll(selector), "open");
    };

    api.close = function (selector) {
      selector = selector ? selector : "." + api.settings.classTarget;
      toggle(document.querySelectorAll(selector), "close");
    };

    api.toggle = function (selector) {
      selector = selector ? selector : "." + api.settings.classTarget;
      toggle(document.querySelectorAll(selector));
    };

    api.switchToDrawer = function (selector) {
      selector = selector ? selector : api.settings["switch"];
      var items = document.querySelectorAll(selector);
      items = items.forEach ? items : [items];
      items.forEach(function (item) {
        switchToDrawer(item);
      });
    };

    api.switchToModal = function (selector) {
      selector = selector ? selector : api.settings["switch"];
      var items = document.querySelectorAll(selector);
      items = items.forEach ? items : [items];
      items.forEach(function (item) {
        switchToModal(item);
      });
    };

    api.stateSave = function () {
      stateSave();
    };

    api.stateClear = function () {
      stateClear();
    };

    var toggle = function toggle(drawer, state, callback) {
      if (state === "open") {
        addClass(drawer, api.settings.classActive);
      } else if (state === "close") {
        removeClass(drawer, api.settings.classActive);
      } else {
        toggleClass(drawer, api.settings.classActive);
      }

      if (api.settings.saveState) {
        stateSave(drawer);
      }

      typeof callback === "function" && callback();
    };

    var trigger = function trigger() {
      var trigger = event.target.closest("." + api.settings.classTrigger);

      if (trigger) {
        var dataDrawer = trigger.dataset.target;

        if (dataDrawer) {
          var drawer = document.querySelectorAll(dataDrawer);

          if (drawer.length) {
            toggle(drawer);
          }
        }
      }
    };

    var initSaveState = function initSaveState(callback) {
      if (localStorage.getItem("drawerState")) {
        drawerState = JSON.parse(localStorage.getItem("drawerState"));
      }

      drawers.forEach(function (item) {
        var drawer = item.drawer;

        if (drawer.id in drawerState === false) {
          stateSave(drawer);
        }

        var dialog = drawer.querySelector("." + api.settings.classInner);

        var transitionDelay = function transitionDelay() {
          if (dialog) {
            addClass(dialog, api.settings.classTransitionNone);
            setTimeout(function () {
              removeClass(dialog, api.settings.classTransitionNone);
            }, api.settings.transitionDuration);
          }
        };

        if (drawerState[drawer.id] === false) {
          toggle(drawer, "close", transitionDelay);
        } else if (drawerState[drawer.id]) {
          toggle(drawer, "open", transitionDelay);
        }
      });
      typeof callback === "function" && callback(drawerState);
    };

    var stateSave = function stateSave(items) {
      items = items ? items : drawers;
      items = items.forEach ? items : [items];
      items.forEach(function (item) {
        if (item.drawer) {
          item = item.drawer;
        }

        if (item.id) {
          drawerState[item.id] = hasClass(item, api.settings.classActive);
          localStorage.setItem("drawerState", JSON.stringify(drawerState));
        }
      });
    };

    var stateClear = function stateClear() {
      drawerState = {};
      localStorage.removeItem("drawerState");
    };

    var initSwitch = function initSwitch() {
      switchDrawers = document.querySelectorAll(api.settings["switch"]);
      switchDrawers.forEach(function (drawer) {
        var cleanSelector = api.settings["switch"].replace("[", "").replace("]", "").replace("data-", "");
        cleanSelector = cleanSelector.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        });
        var bp = drawer.dataset[cleanSelector];

        if (bp) {
          bp = breakpoint[bp];

          if (!bp) {
            bp = drawer.dataset[cleanSelector];
          }
        } else {
          bp = breakpoint[api.settings.switchBreakpoint];

          if (!bp) {
            bp = api.settings.switchBreakpoint;
          }
        }

        var mql = window.matchMedia("(min-width:" + bp + ")");

        if (!mql.matches) {
          switchToModal(drawer);
        }

        mql.addListener(switchCheck);
        mqlArray.push({
          "drawer": drawer,
          "mql": mql
        });
      });
    };

    var destroySwitch = function destroySwitch() {
      switchDrawers.forEach(function (drawer) {
        switchToDrawer(drawer);
      });
      mqlArray.forEach(function (item) {
        item.mql.removeListener(switchCheck);
      });
      switchDrawers = null;
      mqlArray = [];
    };

    var switchCheck = function switchCheck() {
      mqlArray.forEach(function (item) {
        if (item.mql.matches) {
          switchToDrawer(item.drawer);
        } else {
          switchToModal(item.drawer);
        }
      });
    };

    var switchToDrawer = function switchToDrawer(drawer) {
      var dialog = drawer.querySelector(".dialog");
      var triggers = document.querySelectorAll("[data-target=\"#" + drawer.id + "\"]");
      drawer.className = drawer.className.replace(new RegExp(api.settings.classTargetSwitch, "gi"), api.settings.classTarget);
      dialog.className = dialog.className.replace(new RegExp(api.settings.classInnerSwitch, "gi"), api.settings.classInner);
      triggers.forEach(function (trigger) {
        trigger.className = trigger.className.replace(new RegExp(api.settings.classTriggerSwitch, "gi"), api.settings.classTrigger);
      });

      if (api.settings.saveState) {
        if (drawerState[drawer.id] === false) {
          toggle(drawer, "close");
        } else {
          toggle(drawer, "open");
        }
      }
    };

    var switchToModal = function switchToModal(drawer) {
      var dialog = drawer.querySelector(".dialog");
      var triggers = document.querySelectorAll("[data-target=\"#" + drawer.id + "\"]");
      drawer.className = drawer.className.replace(new RegExp(api.settings.classTarget, "gi"), api.settings.classTargetSwitch);
      dialog.className = dialog.className.replace(new RegExp(api.settings.classInner, "gi"), api.settings.classInnerSwitch);
      triggers.forEach(function (trigger) {
        trigger.className = trigger.className.replace(new RegExp(api.settings.classTrigger, "gi"), api.settings.classTriggerSwitch);
      });
      removeClass(drawer, api.settings.classActive);
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

  exports.Checkbox = Checkbox;
  exports.Dismissible = Dismissible;
  exports.Drawer = Drawer;
  exports.Modal = Modal;
  exports.utility = index;

}(this.vrembem = this.vrembem || {}));
