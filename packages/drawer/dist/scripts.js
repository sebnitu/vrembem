(function (exports) {
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

  var defineProperty = _defineProperty;

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

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var Drawer = function Drawer(options) {
    var api = {};
    var defaults = {
      autoInit: false,
      dataDrawer: 'drawer',
      dataToggle: 'drawer-toggle',
      dataOpen: 'drawer-open',
      dataClose: 'drawer-close',
      dataBreakpoint: 'drawer-breakpoint',
      dataFocus: 'drawer-focus',
      stateOpened: 'is-opened',
      stateOpening: 'is-opening',
      stateClosing: 'is-closing',
      stateClosed: 'is-closed',
      classModal: 'drawer_modal',
      breakpoints: breakpoints,
      customEventPrefix: 'drawer:',
      focus: true,
      saveState: true,
      saveKey: 'DrawerState'
    };
    api.settings = _objectSpread(_objectSpread({}, defaults), options);
    api.breakpoint = {};
    api.state = {};

    api.init = function () {
      setState();
      breakpointInit();
      document.addEventListener('click', handler, false);
      document.addEventListener('touchend', handler, false);
      document.addEventListener('keyup', handlerEscape, false);
    };

    api.destroy = function () {
      breakpointDestroy();
      api.memoryTrigger = null;
      api.memoryTarget = null;
      api.state = {};
      localStorage.removeItem(api.settings.saveKey);
      document.removeEventListener('click', handler, false);
      document.removeEventListener('touchend', handler, false);
      document.removeEventListener('keyup', handlerEscape, false);
    };

    var handler = function handler(event) {
      var trigger = event.target.closest("[data-".concat(api.settings.dataToggle, "]"));

      if (trigger) {
        var selector = trigger.dataset[camelCase(api.settings.dataToggle)];
        saveTrigger(trigger);
        api.toggle(selector);
        event.preventDefault();
        return;
      }

      trigger = event.target.closest("[data-".concat(api.settings.dataOpen, "]"));

      if (trigger) {
        var _selector = trigger.dataset[camelCase(api.settings.dataOpen)];
        saveTrigger(trigger);
        api.open(_selector);
        event.preventDefault();
        return;
      }

      trigger = event.target.closest("[data-".concat(api.settings.dataClose, "]"));

      if (trigger) {
        var _selector2 = trigger.dataset[camelCase(api.settings.dataClose)];

        if (_selector2) {
          saveTrigger(trigger);
          api.close(_selector2);
        } else {
          var target = event.target.closest("[data-".concat(api.settings.dataDrawer, "]"));
          if (target) api.close(target);
        }

        event.preventDefault();
        return;
      }

      if (event.target.dataset[camelCase(api.settings.dataDrawer)]) {
        api.close(event.target);
        return;
      }
    };

    var handlerEscape = function handlerEscape(event) {
      if (event.keyCode == 27) {
        var target = document.querySelector(".".concat(api.settings.classModal, ".").concat(api.settings.stateOpened));

        if (target) {
          api.close(target);
        }
      }
    };

    var drawerKeyCheck = function drawerKeyCheck(drawerKey) {
      if (typeof drawerKey === 'string') {
        return document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));
      } else {
        return drawerKey;
      }
    };

    api.toggle = function (drawerKey, callback) {
      var drawer = drawerKeyCheck(drawerKey);

      if (drawer) {
        var isOpen = hasClass(drawer, api.settings.stateOpened);

        if (!isOpen) {
          api.open(drawer, callback);
        } else {
          api.close(drawer, callback);
        }
      }
    };

    api.open = function (drawerKey, callback) {
      var drawer = drawerKeyCheck(drawerKey);

      if (drawer && !hasClass(drawer, api.settings.stateOpened)) {
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

    api.close = function (drawerKey, callback) {
      var drawer = drawerKeyCheck(drawerKey);

      if (drawer && hasClass(drawer, api.settings.stateOpened)) {
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
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (api.settings.saveState) {
        var drawers = target ? [target] : document.querySelectorAll("[data-".concat(api.settings.dataDrawer, "]"));
        drawers.forEach(function (el) {
          if (!hasClass(el, api.settings.classModal)) {
            api.state[el.dataset[camelCase(api.settings.dataDrawer)]] = hasClass(el, api.settings.stateOpened) ? api.settings.stateOpened : api.settings.stateClosed;
          }
        });
        localStorage.setItem(api.settings.saveKey, JSON.stringify(api.state));
      }
    };

    var setState = function setState() {
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

    api.breakpoint.init = function () {
      breakpointInit();
    };

    api.breakpoint.destroy = function () {
      breakpointDestroy();
    };

    api.breakpoint.check = function () {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      breakpointCheck(event);
    };

    api.switchToModal = function (drawerKey) {
      var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));

      if (drawer) {
        switchToModal(drawer);
      }
    };

    api.switchToDefault = function (drawerKey) {
      var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));

      if (drawer) {
        switchToDefault(drawer);
      }
    };

    var breakpointInit = function breakpointInit() {
      api.mediaQueryLists = [];
      var drawers = document.querySelectorAll("[data-".concat(api.settings.dataBreakpoint, "]"));
      drawers.forEach(function (drawer) {
        var id = drawer.dataset[camelCase(api.settings.dataDrawer)];
        var key = drawer.dataset[camelCase(api.settings.dataBreakpoint)];
        var bp = api.settings.breakpoints[key] ? api.settings.breakpoints[key] : key;
        var mql = window.matchMedia('(min-width:' + bp + ')');
        breakpointMatch(mql, drawer);
        mql.addListener(breakpointCheck);
        api.mediaQueryLists.push({
          'mql': mql,
          'drawer': id
        });
      });
    };

    var breakpointDestroy = function breakpointDestroy() {
      if (api.mediaQueryLists && api.mediaQueryLists.length) {
        api.mediaQueryLists.forEach(function (item) {
          item.mql.removeListener(breakpointCheck);
        });
      }

      api.mediaQueryLists = null;
    };

    var breakpointCheck = function breakpointCheck(event) {
      if (api.mediaQueryLists && api.mediaQueryLists.length) {
        api.mediaQueryLists.forEach(function (item) {
          var filter = event ? event.media == item.mql.media : true;

          if (filter) {
            var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(item.drawer, "\"]"));

            if (drawer) {
              breakpointMatch(item.mql, drawer);
            }
          }
        });
        var customEvent = new CustomEvent(api.settings.customEventPrefix + 'breakpoint', {
          bubbles: true
        });
        document.dispatchEvent(customEvent);
      }
    };

    var breakpointMatch = function breakpointMatch(mql, drawer) {
      if (mql.matches) {
        switchToDefault(drawer);
      } else {
        switchToModal(drawer);
      }
    };

    var switchToModal = function switchToModal(drawer) {
      addClass(drawer, api.settings.classModal);
      addClass(drawer, api.settings.stateClosed);
      removeClass(drawer, api.settings.stateOpened);
      var customEvent = new CustomEvent(api.settings.customEventPrefix + 'toModal', {
        bubbles: true
      });
      drawer.dispatchEvent(customEvent);
    };

    var switchToDefault = function switchToDefault(drawer) {
      removeClass(drawer, api.settings.classModal);
      var drawerKey = drawer.dataset[camelCase(api.settings.dataDrawer)];
      var drawerState = api.state[drawerKey];

      if (drawerState == api.settings.stateOpened) {
        addClass(drawer, api.settings.stateOpened);
        removeClass(drawer, api.settings.stateClosed);
      }

      var customEvent = new CustomEvent(api.settings.customEventPrefix + 'toDefault', {
        bubbles: true
      });
      drawer.dispatchEvent(customEvent);
    };

    if (api.settings.autoInit) api.init();
    return api;
  };

  exports.Drawer = Drawer;

}(this.vrembem = this.vrembem || {}));
