this.vrembem = this.vrembem || {};
this.vrembem.drawer = (function (exports) {
  'use strict';

  var config = {
    breakpoints: {
      xs: "480px",
      sm: "620px",
      md: "760px",
      lg: "990px",
      xl: "1380px"
    }
  };

  var toArray = function toArray(item) {
    var array = [];

    if (Array.isArray(item)) {
      array = item;
    } else {
      array.push(item);
    }

    return array;
  };

  var addClass = function addClass(el, c) {
    el = el.forEach ? el : toArray(el);
    c = toArray(c);
    el.forEach(function (el) {
      c.forEach(function (c) {
        el.classList.add(c);
      });
    });
  };

  var hasClass = function hasClass(el, c) {
    el = el.forEach ? el : toArray(el);
    c = toArray(c);
    return c.some(function (c) {
      var has = false;
      el.forEach(function (el) {
        if (el.classList.contains(c)) {
          has = true;
        }
      });
      return has;
    });
  };

  var extend = function extend() {
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    if (Object.prototype.toString.call(arguments.length <= 0 ? undefined : arguments[0]) === "[object Boolean]") {
      deep = arguments.length <= 0 ? undefined : arguments[0];
      i++;
    }

    var merge = function merge(obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    for (; i < length; i++) {
      var obj = i < 0 || arguments.length <= i ? undefined : arguments[i];
      merge(obj);
    }

    return extended;
  };

  var getBreakpoint = function getBreakpoint(key) {
    return config.breakpoints[key];
  };

  var removeClass = function removeClass(el, c) {
    el = el.forEach ? el : toArray(el);
    c = toArray(c);
    el.forEach(function (el) {
      c.forEach(function (c) {
        el.classList.remove(c);
      });
    });
  };

  var toggleClass = function toggleClass(el, c) {
    el = el.forEach ? el : toArray(el);
    c = toArray(c);
    el.forEach(function (el) {
      c.forEach(function (c) {
        el.classList.toggle(c);
      });
    });
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
      settings = extend(defaults, options || {});
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
      items = items.forEach ? items : toArray(items);
      items.forEach(function (item) {
        switchToDrawer(item);
      });
    };

    api.switchToModal = function (selector) {
      selector = selector ? selector : settings["switch"];
      var items = document.querySelectorAll(selector);
      items = items.forEach ? items : toArray(items);
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
      items = items.forEach ? items : toArray(items);
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
          bp = getBreakpoint(bp);

          if (!bp) {
            bp = drawer.dataset[cleanSelector];
          }
        } else {
          bp = getBreakpoint(settings.switchBreakpoint);

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

  exports.Drawer = Drawer;

  return exports;

}({}));
