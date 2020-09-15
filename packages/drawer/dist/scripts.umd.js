(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@vrembem/core/index')) :
  typeof define === 'function' && define.amd ? define(['@vrembem/core/index'], factory) :
  (global = global || self, (global.vrembem = global.vrembem || {}, global.vrembem.Drawer = factory(global.index)));
}(this, (function (index) {
  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var defaults = {
    autoInit: false,
    // Data attributes
    dataDrawer: 'drawer',
    dataDialog: 'drawer-dialog',
    dataToggle: 'drawer-toggle',
    dataOpen: 'drawer-open',
    dataClose: 'drawer-close',
    dataBreakpoint: 'drawer-breakpoint',
    dataFocus: 'drawer-focus',
    // State classes
    stateOpened: 'is-opened',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',
    // Classes
    classModal: 'drawer_modal',
    // Selectors
    selectorInert: null,
    selectorOverflow: null,
    // Feature toggles
    breakpoints: index.breakpoints,
    customEventPrefix: 'drawer:',
    stateSave: true,
    stateKey: 'DrawerState',
    setTabindex: true,
    transition: true
  };

  var switchToDefault = function switchToDefault(drawerKey, obj) {
    try {
      // Initial guards
      var drawer = obj.getDrawer(drawerKey);
      if (!drawer) return Promise.resolve(obj.drawerNotFound(drawerKey));
      if (!index.hasClass(drawer, obj.settings.classModal)) return Promise.resolve(); // Tear down modal state

      index.setInert(false, obj.settings.selectorInert);
      index.setOverflowHidden(false, obj.settings.selectorOverflow);
      index.removeClass(drawer, obj.settings.classModal);
      obj.focusTrap.destroy(); // Restore drawers saved state

      drawerKey = drawer.getAttribute("data-" + obj.settings.dataDrawer);
      var drawerState = obj.state[drawerKey];

      if (drawerState == obj.settings.stateOpened) {
        index.addClass(drawer, obj.settings.stateOpened);
        index.removeClass(drawer, obj.settings.stateClosed);
      } // Dispatch custom event


      drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toDefault', {
        bubbles: true
      }));
      return Promise.resolve(drawer);
    } catch (e) {
      return Promise.reject(e);
    }
  };
  var switchToModal = function switchToModal(drawerKey, obj) {
    try {
      // Initial guards
      var drawer = obj.getDrawer(drawerKey);
      if (!drawer) return Promise.resolve(obj.drawerNotFound(drawerKey));
      if (index.hasClass(drawer, obj.settings.classModal)) return Promise.resolve(); // Enable modal state

      index.addClass(drawer, obj.settings.classModal);
      index.addClass(drawer, obj.settings.stateClosed);
      index.removeClass(drawer, obj.settings.stateOpened); // Dispatch custom event

      drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toModal', {
        bubbles: true
      }));
      return Promise.resolve(drawer);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var Breakpoint = /*#__PURE__*/function () {
    function Breakpoint(parent) {
      this.mediaQueryLists = [];
      this.parent = parent;
      this.__check = this.check.bind(this);
    }

    var _proto = Breakpoint.prototype;

    _proto.init = function init() {
      var _this = this;

      var drawers = document.querySelectorAll("[data-" + this.parent.settings.dataBreakpoint + "]");
      drawers.forEach(function (drawer) {
        var id = drawer.getAttribute("data-" + _this.parent.settings.dataDrawer);
        var key = drawer.getAttribute("data-" + _this.parent.settings.dataBreakpoint);
        var bp = _this.parent.settings.breakpoints[key] ? _this.parent.settings.breakpoints[key] : key;
        var mql = window.matchMedia('(min-width:' + bp + ')');

        _this.match(mql, drawer);

        mql.addListener(_this.__check);

        _this.mediaQueryLists.push({
          'mql': mql,
          'drawer': id
        });
      });
    };

    _proto.destroy = function destroy() {
      var _this2 = this;

      if (this.mediaQueryLists && this.mediaQueryLists.length) {
        this.mediaQueryLists.forEach(function (item) {
          item.mql.removeListener(_this2.__check);
        });
      }

      this.mediaQueryLists = null;
    };

    _proto.check = function check(event) {
      var _this3 = this;

      if (event === void 0) {
        event = null;
      }

      if (this.mediaQueryLists && this.mediaQueryLists.length) {
        this.mediaQueryLists.forEach(function (item) {
          // If an event is passed, filter out drawers that don't match the query
          // If event is null, run all drawers through match
          var filter = event ? event.media == item.mql.media : true;
          if (!filter) return;
          var drawer = document.querySelector("[data-" + _this3.parent.settings.dataDrawer + "=\"" + item.drawer + "\"]");
          if (drawer) _this3.match(item.mql, drawer);
        });
        document.dispatchEvent(new CustomEvent(this.parent.settings.customEventPrefix + 'breakpoint', {
          bubbles: true
        }));
      }
    };

    _proto.match = function match(mql, drawer) {
      if (mql.matches) {
        switchToDefault(drawer, this.parent);
      } else {
        switchToModal(drawer, this.parent);
      }
    };

    return Breakpoint;
  }();

  function handlerClick(event) {
    // Working catch
    if (this.working) return; // Toggle data trigger

    var trigger = event.target.closest("[data-" + this.settings.dataToggle + "]");

    if (trigger) {
      var selector = trigger.getAttribute("data-" + this.settings.dataToggle);
      this.memory.trigger = trigger;
      this.toggle(selector);
      event.preventDefault();
      return;
    } // Open data trigger


    trigger = event.target.closest("[data-" + this.settings.dataOpen + "]");

    if (trigger) {
      var _selector = trigger.getAttribute("data-" + this.settings.dataOpen);

      this.memory.trigger = trigger;
      this.open(_selector);
      event.preventDefault();
      return;
    } // Close data trigger


    trigger = event.target.closest("[data-" + this.settings.dataClose + "]");

    if (trigger) {
      var _selector2 = trigger.getAttribute("data-" + this.settings.dataClose);

      if (_selector2) {
        this.memory.trigger = trigger;
        this.close(_selector2);
      } else {
        var target = event.target.closest("[data-" + this.settings.dataDrawer + "]");
        if (target) this.close(target);
      }

      event.preventDefault();
      return;
    } // Screen modal trigger


    if (event.target.hasAttribute("data-" + this.settings.dataDrawer)) {
      this.close(event.target);
      return;
    }
  }
  function handlerKeyup(event) {
    // Working catch
    if (this.working) return;

    if (event.keyCode == 27) {
      var target = document.querySelector("." + this.settings.classModal + "." + this.settings.stateOpened);

      if (target) {
        this.close(target);
      }
    }
  }

  function stateSet(settings) {
    // If save state is disabled
    if (!settings.stateSave) return stateClear(settings); // If there isn't an existing state to set

    if (!localStorage.getItem(settings.stateKey)) return stateSave(null, settings); // Set the existing state

    var state = JSON.parse(localStorage.getItem(settings.stateKey));
    Object.keys(state).forEach(function (key) {
      var item = document.querySelector("[data-" + settings.dataDrawer + "=\"" + key + "\"]");
      if (!item) return;
      state[key] == settings.stateOpened ? index.addClass(item, settings.stateOpened) : index.removeClass(item, settings.stateOpened);
    });
    return state;
  }
  function stateSave(target, settings) {
    // If save state is disabled
    if (!settings.stateSave) return stateClear(settings); // Get the currently saved object if it exists

    var state = localStorage.getItem(settings.stateKey) ? JSON.parse(localStorage.getItem(settings.stateKey)) : {}; // Are we saving a single target or the entire suite?

    var drawers = target ? [target] : document.querySelectorAll("[data-" + settings.dataDrawer + "]"); // Loop through drawers and save their states

    drawers.forEach(function (el) {
      if (index.hasClass(el, settings.classModal)) return;
      var drawerKey = el.getAttribute("data-" + settings.dataDrawer);
      state[drawerKey] = index.hasClass(el, settings.stateOpened) ? settings.stateOpened : settings.stateClosed;
    }); // Save to localStorage and return the state

    localStorage.setItem(settings.stateKey, JSON.stringify(state));
    return state;
  }
  function stateClear(settings) {
    if (localStorage.getItem(settings.stateKey)) {
      localStorage.removeItem(settings.stateKey);
    }

    return {};
  }

  var Drawer = /*#__PURE__*/function () {
    function Drawer(options) {
      this.defaults = defaults;
      this.settings = _extends({}, this.defaults, options);
      this.working = false;
      this.memory = {};
      this.state = {};
      this.focusTrap = new index.FocusTrap();
      this.breakpoint = new Breakpoint(this);
      this.__handlerClick = handlerClick.bind(this);
      this.__handlerKeyup = handlerKeyup.bind(this);
      if (this.settings.autoInit) this.init();
    }

    var _proto = Drawer.prototype;

    _proto.init = function init(options) {
      if (options === void 0) {
        options = null;
      }

      if (options) this.settings = _extends({}, this.settings, options);
      this.stateSet();
      this.setTabindex(this.settings.setTabindex);
      this.breakpoint.init();
      document.addEventListener('click', this.__handlerClick, false);
      document.addEventListener('touchend', this.__handlerClick, false);
      document.addEventListener('keyup', this.__handlerKeyup, false);
    };

    _proto.destroy = function destroy() {
      this.breakpoint.destroy();
      this.memory = {};
      this.state = {};
      localStorage.removeItem(this.settings.stateKey);
      document.removeEventListener('click', this.__handlerClick, false);
      document.removeEventListener('touchend', this.__handlerClick, false);
      document.removeEventListener('keyup', this.__handlerKeyup, false);
    }
    /**
     * Helpers
     */
    ;

    _proto.getDrawer = function getDrawer(drawerKey) {
      if (typeof drawerKey !== 'string') return drawerKey;
      return document.querySelector("[data-" + this.settings.dataDrawer + "=\"" + drawerKey + "\"]");
    };

    _proto.drawerNotFound = function drawerNotFound(key) {
      return Promise.reject(new Error("Did not find drawer with key: \"" + key + "\""));
    };

    _proto.setTabindex = function setTabindex(state) {
      if (state === void 0) {
        state = true;
      }

      var selectorTabindex = "\n      [data-" + this.settings.dataDrawer + "]\n      [data-" + this.settings.dataDialog + "]\n    ";

      index.setTabindex(state, selectorTabindex);
    }
    /**
     * Save state functionality
     */
    ;

    _proto.stateSet = function stateSet$1() {
      this.state = stateSet(this.settings);
    };

    _proto.stateSave = function stateSave$1(target) {
      if (target === void 0) {
        target = null;
      }

      this.state = stateSave(target, this.settings);
    };

    _proto.stateClear = function stateClear$1() {
      this.state = stateClear(this.settings);
    }
    /**
     * SwitchTo functionality
     */
    ;

    _proto.switchToDefault = function switchToDefault$1(drawerKey) {
      return switchToDefault(drawerKey, this);
    };

    _proto.switchToModal = function switchToModal$1(drawerKey) {
      return switchToModal(drawerKey, this);
    }
    /**
     * Change state functionality
     */
    ;

    _proto.toggle = function toggle(drawerKey) {
      try {
        var _this2 = this;

        var drawer = _this2.getDrawer(drawerKey);

        if (!drawer) return Promise.resolve(_this2.drawerNotFound(drawerKey));
        var isOpen = index.hasClass(drawer, _this2.settings.stateOpened);

        if (!isOpen) {
          return Promise.resolve(_this2.open(drawer));
        } else {
          return Promise.resolve(_this2.close(drawer));
        }
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _proto.open = function open(drawerKey) {
      try {
        var _this4 = this;

        var drawer = _this4.getDrawer(drawerKey);

        if (!drawer) return Promise.resolve(_this4.drawerNotFound(drawerKey));

        if (!index.hasClass(drawer, _this4.settings.stateOpened)) {
          _this4.working = true;
          var isModal = index.hasClass(drawer, _this4.settings.classModal);

          if (isModal) {
            index.setOverflowHidden(true, _this4.settings.selectorOverflow);
          }

          return Promise.resolve(index.openTransition(drawer, _this4.settings)).then(function () {
            _this4.stateSave(drawer);

            if (isModal) {
              _this4.focusTrap.init(drawer);

              index.setInert(true, _this4.settings.selectorInert);
            }

            index.focusTarget(drawer, _this4.settings);
            drawer.dispatchEvent(new CustomEvent(_this4.settings.customEventPrefix + 'opened', {
              bubbles: true
            }));
            _this4.working = false;
            return drawer;
          });
        } else {
          index.focusTarget(drawer, _this4.settings);
          return Promise.resolve(drawer);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _proto.close = function close(drawerKey) {
      try {
        var _this6 = this;

        var drawer = _this6.getDrawer(drawerKey);

        if (!drawer) return Promise.resolve(_this6.drawerNotFound(drawerKey));

        if (index.hasClass(drawer, _this6.settings.stateOpened)) {
          _this6.working = true;

          if (index.hasClass(drawer, _this6.settings.classModal)) {
            index.setInert(false, _this6.settings.selectorInert);
            index.setOverflowHidden(false, _this6.settings.selectorOverflow);
          }

          return Promise.resolve(index.closeTransition(drawer, _this6.settings)).then(function () {
            _this6.stateSave(drawer);

            index.focusTrigger(_this6);

            _this6.focusTrap.destroy();

            drawer.dispatchEvent(new CustomEvent(_this6.settings.customEventPrefix + 'closed', {
              bubbles: true
            }));
            _this6.working = false;
            return drawer;
          });
        } else {
          return Promise.resolve(drawer);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return Drawer;
  }();

  return Drawer;

})));
//# sourceMappingURL=scripts.umd.js.map
