var vrembem = (function (exports) {
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

  var breakpoints = {
    xs: "480px",
    sm: "620px",
    md: "760px",
    lg: "990px",
    xl: "1380px"
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

  var Dismissible = function Dismissible(options) {
    var api = {};
    var settings;
    var defaults = {
      trigger: "[data-dismiss]",
      target: "[data-dismissible]",
      classToggle: "dismiss"
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
        var target = trigger.closest(settings.target);

        if (target) {
          toggleClass(target, settings.classToggle);
        }

        event.preventDefault();
      }
    };

    api.init(options);
    return api;
  };

  var Drawer = function Drawer(options) {
    var api = {};
    var settings;
    var defaults = {
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
    var drawers = [];
    var drawerState = {};
    var switchDrawers;
    var mqlArray = [];

    api.init = function (options) {
      settings = _objectSpread2({}, defaults, {}, options);
      document.querySelectorAll("." + settings.classTarget).forEach(function (drawer) {
        drawers.push({
          "drawer": drawer,
          "defaultState": hasClass(drawer, settings.classActive)
        });
      });
      var promiseSaveState = new Promise(function (resolve) {
        if (settings.saveState) {
          initSaveState(resolve);
        } else {
          resolve();
        }
      });
      promiseSaveState.then(function () {
        if (settings["switch"]) {
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
            addClass(item.drawer, settings.classActive);
          } else {
            removeClass(item.drawer, settings.classActive);
          }
        });
      }

      settings = null;
      drawers = [];
      document.removeEventListener("click", trigger, false);
    };

    api.open = function (selector) {
      selector = selector ? selector : "." + settings.classTarget;
      toggle(document.querySelectorAll(selector), "open");
    };

    api.close = function (selector) {
      selector = selector ? selector : "." + settings.classTarget;
      toggle(document.querySelectorAll(selector), "close");
    };

    api.toggle = function (selector) {
      selector = selector ? selector : "." + settings.classTarget;
      toggle(document.querySelectorAll(selector));
    };

    api.switchToDrawer = function (selector) {
      selector = selector ? selector : settings["switch"];
      var items = document.querySelectorAll(selector);
      items = items.forEach ? items : [items];
      items.forEach(function (item) {
        switchToDrawer(item);
      });
    };

    api.switchToModal = function (selector) {
      selector = selector ? selector : settings["switch"];
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
        addClass(drawer, settings.classActive);
      } else if (state === "close") {
        removeClass(drawer, settings.classActive);
      } else {
        toggleClass(drawer, settings.classActive);
      }

      if (settings.saveState) {
        stateSave(drawer);
      }

      typeof callback === "function" && callback();
    };

    var trigger = function trigger() {
      var trigger = event.target.closest("." + settings.classTrigger);

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

        var dialog = drawer.querySelector("." + settings.classInner);

        var transitionDelay = function transitionDelay() {
          if (dialog) {
            addClass(dialog, settings.classTransitionNone);
            setTimeout(function () {
              removeClass(dialog, settings.classTransitionNone);
            }, settings.transitionDuration);
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
          drawerState[item.id] = hasClass(item, settings.classActive);
          localStorage.setItem("drawerState", JSON.stringify(drawerState));
        }
      });
    };

    var stateClear = function stateClear() {
      drawerState = {};
      localStorage.removeItem("drawerState");
    };

    var initSwitch = function initSwitch() {
      switchDrawers = document.querySelectorAll(settings["switch"]);
      switchDrawers.forEach(function (drawer) {
        var cleanSelector = settings["switch"].replace("[", "").replace("]", "").replace("data-", "");
        cleanSelector = cleanSelector.replace(/-([a-z])/g, function (g) {
          return g[1].toUpperCase();
        });
        var bp = drawer.dataset[cleanSelector];

        if (bp) {
          bp = breakpoints[bp];

          if (!bp) {
            bp = drawer.dataset[cleanSelector];
          }
        } else {
          bp = breakpoints[settings.switchBreakpoint];

          if (!bp) {
            bp = settings.switchBreakpoint;
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
      drawer.className = drawer.className.replace(new RegExp(settings.classTargetSwitch, "gi"), settings.classTarget);
      dialog.className = dialog.className.replace(new RegExp(settings.classInnerSwitch, "gi"), settings.classInner);
      triggers.forEach(function (trigger) {
        trigger.className = trigger.className.replace(new RegExp(settings.classTriggerSwitch, "gi"), settings.classTrigger);
      });

      if (settings.saveState) {
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
      drawer.className = drawer.className.replace(new RegExp(settings.classTarget, "gi"), settings.classTargetSwitch);
      dialog.className = dialog.className.replace(new RegExp(settings.classInner, "gi"), settings.classInnerSwitch);
      triggers.forEach(function (trigger) {
        trigger.className = trigger.className.replace(new RegExp(settings.classTrigger, "gi"), settings.classTriggerSwitch);
      });
      removeClass(drawer, settings.classActive);
    };

    api.init(options);
    return api;
  };

  var Modal = function Modal(options) {
    var api = {};
    var settings;
    var defaults = {
      classTarget: "modal",
      classTrigger: "modal__trigger",
      classInner: "modal__dialog",
      classActive: "is-active",
      focus: "[data-focus]"
    };
    var memoryTrigger;
    var memoryTarget;

    api.init = function (options) {
      settings = _objectSpread2({}, defaults, {}, options);
      document.addEventListener("click", run, false);
      document.addEventListener("touchend", run, false);
      document.addEventListener("keyup", escape, false);
    };

    api.destroy = function () {
      settings = null;
      memoryTarget = null;
      memoryTrigger = null;
      document.removeEventListener("click", run, false);
      document.removeEventListener("touchend", run, false);
      document.removeEventListener("keyup", escape, false);
    };

    api.open = function (selector) {
      open(document.querySelectorAll(selector));
    };

    api.close = function (clear) {
      close(clear);
    };

    var open = function open(target) {
      addClass(target, settings.classActive);

      if (target.length === 1) {
        target = target.item(0);
        var focus = target.querySelector(settings.focus);
        target.addEventListener("transitionend", function _listener() {
          if (focus) {
            focus.focus();
          } else {
            target.focus();
          }

          this.removeEventListener("transitionend", _listener, true);
        }, true);
      }
    };

    var close = function close() {
      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var target = document.querySelectorAll("." + settings.classTarget);
      removeClass(target, settings.classActive);

      if (clear == false && memoryTrigger && memoryTarget) {
        if (memoryTarget.length === 1) {
          memoryTarget = memoryTarget.item(0);
          memoryTarget.addEventListener("transitionend", function _listener() {
            if (memoryTrigger) {
              memoryTrigger.focus();
            }

            memoryTarget = null;
            memoryTrigger = null;
            this.removeEventListener("transitionend", _listener, true);
          }, true);
        }
      } else if (clear == true) {
        memoryTarget = null;
        memoryTrigger = null;
      }
    };

    var escape = function escape() {
      if (event.keyCode == 27) {
        close();
      }
    };

    var run = function run() {
      var target = event.target.closest("." + settings.classTarget);
      var trigger = event.target.closest("." + settings.classTrigger);
      var inner = event.target.closest("." + settings.classInner);

      if (trigger) {
        close();
        var targetData = trigger.dataset.target;

        if (targetData) {
          memoryTarget = document.querySelectorAll(targetData);
          memoryTrigger = trigger;
          open(memoryTarget);
        }

        event.preventDefault();
      } else if (target && !inner) {
        close();
      }
    };

    api.init(options);
    return api;
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

  exports.Dismissible = Dismissible;
  exports.Drawer = Drawer;
  exports.Modal = Modal;
  exports.Toggle = Toggle;

  return exports;

}({}));
