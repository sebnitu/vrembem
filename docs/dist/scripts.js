(function () {
  'use strict';

  var setInert = function setInert(state, selector) {
    if (selector) {
      var els = document.querySelectorAll(selector);
      els.forEach(function (el) {
        if (state) {
          el.inert = true;
          el.setAttribute('aria-hidden', true);
        } else {
          el.inert = null;
          el.removeAttribute('aria-hidden');
        }
      });
    }
  };

  var setOverflowHidden = function setOverflowHidden(state, selector) {
    if (selector) {
      var els = document.querySelectorAll(selector);
      els.forEach(function (el) {
        if (state) {
          el.style.overflow = 'hidden';
        } else {
          el.style.removeProperty('overflow');
        }
      });
    }
  };

  var setTabindex = function setTabindex(state, selector) {
    if (selector) {
      var els = document.querySelectorAll(selector);
      els.forEach(function (el) {
        if (state) {
          el.setAttribute('tabindex', '-1');
        } else {
          el.removeAttribute('tabindex');
        }
      });
    }
  };

  var addClass = function addClass(el) {
    var _arguments = arguments;
    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).add.apply(_el$classList, [].slice.call(_arguments, 1));
    });
  };

  var focusTarget = function focusTarget(target, settings) {
    var innerFocus = target.querySelector("[data-" + settings.dataFocus + "]");

    if (innerFocus) {
      innerFocus.focus();
    } else {
      var innerElement = target.querySelector('[tabindex="-1"]');
      if (innerElement) innerElement.focus();
    }
  };

  var focusTrigger = function focusTrigger(obj) {
    if (obj === void 0) {
      obj = null;
    }

    if (!obj || !obj.memory || !obj.memory.trigger) return;
    obj.memory.trigger.focus();
    obj.memory.trigger = null;
  };

  var FocusTrap = function () {
    function FocusTrap() {
      this.target = null;
      this.__handlerFocusTrap = this.handlerFocusTrap.bind(this);
    }

    var _proto = FocusTrap.prototype;

    _proto.init = function init(target) {
      this.target = target;
      this.inner = this.target.querySelector('[tabindex="-1"]');
      this.focusable = this.getFocusable();

      if (this.focusable.length) {
        this.focusableFirst = this.focusable[0];
        this.focusableLast = this.focusable[this.focusable.length - 1];
        this.target.addEventListener('keydown', this.__handlerFocusTrap);
      } else {
        this.target.addEventListener('keydown', this.handlerFocusLock);
      }
    };

    _proto.destroy = function destroy() {
      if (!this.target) return;
      this.inner = null;
      this.focusable = null;
      this.focusableFirst = null;
      this.focusableLast = null;
      this.target.removeEventListener('keydown', this.__handlerFocusTrap);
      this.target.removeEventListener('keydown', this.handlerFocusLock);
      this.target = null;
    };

    _proto.handlerFocusTrap = function handlerFocusTrap(event) {
      var isTab = event.key === 'Tab' || event.keyCode === 9;
      if (!isTab) return;

      if (event.shiftKey) {
        if (document.activeElement === this.focusableFirst || document.activeElement === this.inner) {
          this.focusableLast.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === this.focusableLast || document.activeElement === this.inner) {
          this.focusableFirst.focus();
          event.preventDefault();
        }
      }
    };

    _proto.handlerFocusLock = function handlerFocusLock(event) {
      var isTab = event.key === 'Tab' || event.keyCode === 9;
      if (isTab) event.preventDefault();
    };

    _proto.getFocusable = function getFocusable() {
      var focusable = [];
      var initFocus = document.activeElement;
      var initScrollTop = this.inner ? this.inner.scrollTop : 0;
      this.target.querySelectorAll("\n      a[href]:not([disabled]),\n      button:not([disabled]),\n      textarea:not([disabled]),\n      input[type=\"text\"]:not([disabled]),\n      input[type=\"radio\"]:not([disabled]),\n      input[type=\"checkbox\"]:not([disabled]),\n      select:not([disabled]),\n      [tabindex]:not([tabindex=\"-1\"])\n    ").forEach(function (el) {
        el.focus();

        if (el === document.activeElement) {
          focusable.push(el);
        }
      });
      if (this.inner) this.inner.scrollTop = initScrollTop;
      initFocus.focus();
      return focusable;
    };

    return FocusTrap;
  }();

  var getElement = function getElement(selector, single) {
    if (single === void 0) {
      single = 0;
    }

    if (typeof selector != 'string') return selector;
    return single ? document.querySelector(selector) : document.querySelectorAll(selector);
  };

  var hasClass = function hasClass(el) {
    el = el.forEach ? el : [el];
    el = [].slice.call(el);
    return [].slice.call(arguments, 1).some(function (cl) {
      return el.some(function (el) {
        if (el.classList.contains(cl)) return true;
      });
    });
  };

  function moveElement(target, type, reference) {
    if (reference === void 0) {
      reference = false;
    }

    if (reference) {
      var els = getElement(target);
      if (!els.length) throw new Error("Move target element \"" + target + "\" not found!");
      var ref = getElement(reference, 1);
      if (!ref) throw new Error("Move reference element \"" + reference + "\" not found!");
      els.forEach(function (el) {
        switch (type) {
          case 'after':
            ref.after(el);
            return {
              ref: ref,
              el: el,
              type: type
            };

          case 'before':
            ref.before(el);
            return {
              ref: ref,
              el: el,
              type: type
            };

          case 'append':
            ref.append(el);
            return {
              ref: ref,
              el: el,
              type: type
            };

          case 'prepend':
            ref.prepend(el);
            return {
              ref: ref,
              el: el,
              type: type
            };

          default:
            throw new Error("Move type \"" + type + "\" does not exist!");
        }
      });
    }
  }

  var removeClass = function removeClass(el) {
    var _arguments = arguments;
    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).remove.apply(_el$classList, [].slice.call(_arguments, 1));
    });
  };

  var openTransition = function openTransition(el, settings) {
    return new Promise(function (resolve) {
      if (settings.transition) {
        el.classList.remove(settings.stateClosed);
        el.classList.add(settings.stateOpening);
        el.addEventListener('transitionend', function _f() {
          el.classList.add(settings.stateOpened);
          el.classList.remove(settings.stateOpening);
          resolve(el);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        el.classList.add(settings.stateOpened);
        el.classList.remove(settings.stateClosed);
        resolve(el);
      }
    });
  };

  var closeTransition = function closeTransition(el, settings) {
    return new Promise(function (resolve) {
      if (settings.transition) {
        el.classList.add(settings.stateClosing);
        el.classList.remove(settings.stateOpened);
        el.addEventListener('transitionend', function _f() {
          el.classList.remove(settings.stateClosing);
          el.classList.add(settings.stateClosed);
          resolve(el);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        el.classList.add(settings.stateClosed);
        el.classList.remove(settings.stateOpened);
        resolve(el);
      }
    });
  };

  var breakpoints = {
    xs: '480px',
    sm: '620px',
    md: '760px',
    lg: '990px',
    xl: '1380px'
  };

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

  var Checkbox = function () {
    function Checkbox(options) {
      this.defaults = {
        autoInit: false,
        stateAttr: 'aria-checked',
        stateValue: 'mixed'
      };
      this.settings = _extends({}, this.defaults, options);
      this.__handlerClick = this.handlerClick.bind(this);
      if (this.settings.autoInit) this.init();
    }

    var _proto = Checkbox.prototype;

    _proto.init = function init(options) {
      if (options === void 0) {
        options = null;
      }

      if (options) this.settings = _extends({}, this.settings, options);
      var selector = "[" + this.settings.stateAttr + "=\"" + this.settings.stateValue + "\"]";
      var mixed = document.querySelectorAll(selector);
      this.setIndeterminate(mixed);
      document.addEventListener('click', this.__handlerClick, false);
    };

    _proto.destroy = function destroy() {
      document.removeEventListener('click', this.__handlerClick, false);
    };

    _proto.handlerClick = function handlerClick(event) {
      var selector = "[" + this.settings.stateAttr + "=\"" + this.settings.stateValue + "\"]";
      var el = event.target.closest(selector);
      if (!el) return;
      this.removeAriaState(el);
      this.setIndeterminate(el);
    };

    _proto.setAriaState = function setAriaState(el, value) {
      var _this = this;

      if (value === void 0) {
        value = this.settings.stateValue;
      }

      el = el.forEach ? el : [el];
      el.forEach(function (el) {
        el.setAttribute(_this.settings.stateAttr, value);
      });
    };

    _proto.removeAriaState = function removeAriaState(el) {
      var _this2 = this;

      el = el.forEach ? el : [el];
      el.forEach(function (el) {
        el.removeAttribute(_this2.settings.stateAttr);
      });
    };

    _proto.setIndeterminate = function setIndeterminate(el) {
      var _this3 = this;

      el = el.forEach ? el : [el];
      el.forEach(function (el) {
        if (el.hasAttribute(_this3.settings.stateAttr)) {
          el.indeterminate = true;
        } else {
          el.indeterminate = false;
        }
      });
    };

    return Checkbox;
  }();

  var defaults = {
    autoInit: false,
    dataDrawer: 'drawer',
    dataDialog: 'drawer-dialog',
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
    selectorInert: null,
    selectorOverflow: null,
    breakpoints: breakpoints,
    customEventPrefix: 'drawer:',
    stateSave: true,
    stateKey: 'DrawerState',
    setTabindex: true,
    transition: true
  };

  var switchToDefault = function switchToDefault(drawerKey, obj) {
    try {
      var drawer = obj.getDrawer(drawerKey);
      if (!drawer) return Promise.resolve(obj.drawerNotFound(drawerKey));
      if (!hasClass(drawer, obj.settings.classModal)) return Promise.resolve();
      setInert(false, obj.settings.selectorInert);
      setOverflowHidden(false, obj.settings.selectorOverflow);
      removeClass(drawer, obj.settings.classModal);
      obj.focusTrap.destroy();
      drawerKey = drawer.getAttribute("data-" + obj.settings.dataDrawer);
      var drawerState = obj.state[drawerKey];

      if (drawerState == obj.settings.stateOpened) {
        addClass(drawer, obj.settings.stateOpened);
        removeClass(drawer, obj.settings.stateClosed);
      }

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
      var drawer = obj.getDrawer(drawerKey);
      if (!drawer) return Promise.resolve(obj.drawerNotFound(drawerKey));
      if (hasClass(drawer, obj.settings.classModal)) return Promise.resolve();
      addClass(drawer, obj.settings.classModal);
      addClass(drawer, obj.settings.stateClosed);
      removeClass(drawer, obj.settings.stateOpened);
      drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toModal', {
        bubbles: true
      }));
      return Promise.resolve(drawer);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var Breakpoint = function () {
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
    if (this.working) return;
    var trigger = event.target.closest("[data-" + this.settings.dataToggle + "]");

    if (trigger) {
      var selector = trigger.getAttribute("data-" + this.settings.dataToggle);
      this.memory.trigger = trigger;
      this.toggle(selector);
      event.preventDefault();
      return;
    }

    trigger = event.target.closest("[data-" + this.settings.dataOpen + "]");

    if (trigger) {
      var _selector = trigger.getAttribute("data-" + this.settings.dataOpen);

      this.memory.trigger = trigger;
      this.open(_selector);
      event.preventDefault();
      return;
    }

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
    }

    if (event.target.hasAttribute("data-" + this.settings.dataDrawer)) {
      this.close(event.target);
      return;
    }
  }

  function handlerKeyup(event) {
    if (this.working) return;

    if (event.keyCode == 27) {
      var target = document.querySelector("." + this.settings.classModal + "." + this.settings.stateOpened);

      if (target) {
        this.close(target);
      }
    }
  }

  function stateSet(settings) {
    if (!settings.stateSave) return stateClear(settings);
    if (!localStorage.getItem(settings.stateKey)) return stateSave(null, settings);
    var state = JSON.parse(localStorage.getItem(settings.stateKey));
    Object.keys(state).forEach(function (key) {
      var item = document.querySelector("[data-" + settings.dataDrawer + "=\"" + key + "\"]");
      if (!item) return;
      state[key] == settings.stateOpened ? addClass(item, settings.stateOpened) : removeClass(item, settings.stateOpened);
    });
    return state;
  }

  function stateSave(target, settings) {
    if (!settings.stateSave) return stateClear(settings);
    var state = localStorage.getItem(settings.stateKey) ? JSON.parse(localStorage.getItem(settings.stateKey)) : {};
    var drawers = target ? [target] : document.querySelectorAll("[data-" + settings.dataDrawer + "]");
    drawers.forEach(function (el) {
      if (hasClass(el, settings.classModal)) return;
      var drawerKey = el.getAttribute("data-" + settings.dataDrawer);
      state[drawerKey] = hasClass(el, settings.stateOpened) ? settings.stateOpened : settings.stateClosed;
    });
    localStorage.setItem(settings.stateKey, JSON.stringify(state));
    return state;
  }

  function stateClear(settings) {
    if (localStorage.getItem(settings.stateKey)) {
      localStorage.removeItem(settings.stateKey);
    }

    return {};
  }

  var Drawer = function () {
    function Drawer(options) {
      this.defaults = defaults;
      this.settings = _extends({}, this.defaults, options);
      this.working = false;
      this.memory = {};
      this.state = {};
      this.focusTrap = new FocusTrap();
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
    };

    _proto.getDrawer = function getDrawer(drawerKey) {
      if (typeof drawerKey !== 'string') return drawerKey;
      return document.querySelector("[data-" + this.settings.dataDrawer + "=\"" + drawerKey + "\"]");
    };

    _proto.drawerNotFound = function drawerNotFound(key) {
      return Promise.reject(new Error("Did not find drawer with key: \"" + key + "\""));
    };

    _proto.setTabindex = function setTabindex$1(state) {
      if (state === void 0) {
        state = true;
      }

      var selectorTabindex = "\n      [data-" + this.settings.dataDrawer + "]\n      [data-" + this.settings.dataDialog + "]\n    ";
      setTabindex(state, selectorTabindex);
    };

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
    };

    _proto.switchToDefault = function switchToDefault$1(drawerKey) {
      return switchToDefault(drawerKey, this);
    };

    _proto.switchToModal = function switchToModal$1(drawerKey) {
      return switchToModal(drawerKey, this);
    };

    _proto.toggle = function toggle(drawerKey) {
      try {
        var _this2 = this;

        var drawer = _this2.getDrawer(drawerKey);

        if (!drawer) return Promise.resolve(_this2.drawerNotFound(drawerKey));
        var isOpen = hasClass(drawer, _this2.settings.stateOpened);

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

        if (!hasClass(drawer, _this4.settings.stateOpened)) {
          _this4.working = true;
          var isModal = hasClass(drawer, _this4.settings.classModal);

          if (isModal) {
            setOverflowHidden(true, _this4.settings.selectorOverflow);
          }

          return Promise.resolve(openTransition(drawer, _this4.settings)).then(function () {
            _this4.stateSave(drawer);

            if (isModal) {
              _this4.focusTrap.init(drawer);

              setInert(true, _this4.settings.selectorInert);
            }

            focusTarget(drawer, _this4.settings);
            drawer.dispatchEvent(new CustomEvent(_this4.settings.customEventPrefix + 'opened', {
              bubbles: true
            }));
            _this4.working = false;
            return drawer;
          });
        } else {
          focusTarget(drawer, _this4.settings);
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

        if (hasClass(drawer, _this6.settings.stateOpened)) {
          _this6.working = true;

          if (hasClass(drawer, _this6.settings.classModal)) {
            setInert(false, _this6.settings.selectorInert);
            setOverflowHidden(false, _this6.settings.selectorOverflow);
          }

          return Promise.resolve(closeTransition(drawer, _this6.settings)).then(function () {
            _this6.stateSave(drawer);

            focusTrigger(_this6);

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

  var defaults$1 = {
    autoInit: false,
    dataModal: 'modal',
    dataDialog: 'modal-dialog',
    dataOpen: 'modal-open',
    dataClose: 'modal-close',
    dataFocus: 'modal-focus',
    dataRequired: 'modal-required',
    stateOpened: 'is-opened',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',
    selectorInert: null,
    selectorOverflow: 'body',
    customEventPrefix: 'modal:',
    moveModals: {
      ref: null,
      type: null
    },
    setTabindex: true,
    transition: true
  };

  var handlerClick$1 = function handlerClick(event) {
    try {
      var _exit2;

      var _this2 = this;

      function _temp3(_result) {
        if (_exit2) return _result;

        if (event.target.closest("[data-" + _this2.settings.dataClose + "]")) {
          event.preventDefault();

          _this2.close();

          return;
        }

        if (event.target.hasAttribute("data-" + _this2.settings.dataModal) && !event.target.hasAttribute("data-" + _this2.settings.dataRequired)) {
          _this2.close();
        }
      }

      if (_this2.working) return Promise.resolve();
      var trigger = event.target.closest("[data-" + _this2.settings.dataOpen + "]");

      var _temp4 = function () {
        if (trigger) {
          event.preventDefault();
          var modalKey = trigger.getAttribute("data-" + _this2.settings.dataOpen);
          var fromModal = event.target.closest("[data-" + _this2.settings.dataModal + "]");
          if (!fromModal) _this2.memory.trigger = trigger;
          return Promise.resolve(_this2.close(!fromModal)).then(function () {
            _this2.open(modalKey);

            _exit2 = 1;
          });
        }
      }();

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  function handlerKeyup$1(event) {
    if (this.working) return;

    if (event.key === 'Escape' || event.keyCode === 27) {
      var target = document.querySelector("[data-" + this.settings.dataModal + "]." + this.settings.stateOpened);

      if (target && !target.hasAttribute("data-" + this.settings.dataRequired)) {
        this.close();
      }
    }
  }

  function setInitialState(obj) {
    var modals = document.querySelectorAll("[data-" + obj.settings.dataModal + "]");
    modals.forEach(function (el) {
      if (el.classList.contains(obj.settings.stateOpened)) {
        setInert(false, obj.settings.selectorInert);
        setOverflowHidden(false, obj.settings.selectorOverflow);
        focusTrigger(obj);
        obj.focusTrap.destroy();
      }

      removeClass(el, obj.settings.stateOpened, obj.settings.stateOpening, obj.settings.stateClosing);
      addClass(el, obj.settings.stateClosed);
    });
  }

  var Modal = function () {
    function Modal(options) {
      this.defaults = defaults$1;
      this.settings = _extends({}, this.defaults, options);
      this.working = false;
      this.memory = {};
      this.focusTrap = new FocusTrap();
      this.__handlerClick = handlerClick$1.bind(this);
      this.__handlerKeyup = handlerKeyup$1.bind(this);
      if (this.settings.autoInit) this.init();
    }

    var _proto = Modal.prototype;

    _proto.init = function init(options) {
      if (options === void 0) {
        options = null;
      }

      if (options) this.settings = _extends({}, this.settings, options);
      this.moveModals();
      this.setTabindex(this.settings.setTabindex);
      this.setInitialState();
      document.addEventListener('click', this.__handlerClick, false);
      document.addEventListener('touchend', this.__handlerClick, false);
      document.addEventListener('keyup', this.__handlerKeyup, false);
    };

    _proto.destroy = function destroy() {
      this.memory = {};
      document.removeEventListener('click', this.__handlerClick, false);
      document.removeEventListener('touchend', this.__handlerClick, false);
      document.removeEventListener('keyup', this.__handlerKeyup, false);
    };

    _proto.getModal = function getModal(modalKey) {
      if (typeof modalKey !== 'string') return modalKey;
      return document.querySelector("[data-" + this.settings.dataModal + "=\"" + modalKey + "\"]");
    };

    _proto.modalNotFound = function modalNotFound(key) {
      return Promise.reject(new Error("Did not find modal with key: \"" + key + "\""));
    };

    _proto.setTabindex = function setTabindex$1(state) {
      if (state === void 0) {
        state = true;
      }

      var selectorTabindex = "\n      [data-" + this.settings.dataModal + "]\n      [data-" + this.settings.dataDialog + "]\n    ";
      setTabindex(state, selectorTabindex);
    };

    _proto.setInitialState = function setInitialState$1() {
      setInitialState(this);
    };

    _proto.moveModals = function moveModals(type, ref) {
      if (type === void 0) {
        type = this.settings.moveModals.type;
      }

      if (ref === void 0) {
        ref = this.settings.moveModals.ref;
      }

      var modals = document.querySelectorAll("[data-" + this.settings.dataModal + "]");
      if (modals.length) moveElement(modals, type, ref);
    };

    _proto.open = function open(modalKey) {
      try {
        var _this2 = this;

        var modal = _this2.getModal(modalKey);

        if (!modal) return Promise.resolve(_this2.modalNotFound(modalKey));

        if (hasClass(modal, _this2.settings.stateClosed)) {
          _this2.working = true;
          setOverflowHidden(true, _this2.settings.selectorOverflow);
          return Promise.resolve(openTransition(modal, _this2.settings)).then(function () {
            _this2.focusTrap.init(modal);

            focusTarget(modal, _this2.settings);
            setInert(true, _this2.settings.selectorInert);
            modal.dispatchEvent(new CustomEvent(_this2.settings.customEventPrefix + 'opened', {
              bubbles: true
            }));
            _this2.working = false;
            return modal;
          });
        } else {
          return Promise.resolve(modal);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _proto.close = function close(returnFocus) {
      if (returnFocus === void 0) {
        returnFocus = true;
      }

      try {
        var _this4 = this;

        var modal = document.querySelector("[data-" + _this4.settings.dataModal + "]." + _this4.settings.stateOpened);

        if (modal) {
          _this4.working = true;
          setInert(false, _this4.settings.selectorInert);
          setOverflowHidden(false, _this4.settings.selectorOverflow);
          return Promise.resolve(closeTransition(modal, _this4.settings)).then(function () {
            if (returnFocus) focusTrigger(_this4);

            _this4.focusTrap.destroy();

            modal.dispatchEvent(new CustomEvent(_this4.settings.customEventPrefix + 'closed', {
              bubbles: true
            }));
            _this4.working = false;
            return modal;
          });
        } else {
          return Promise.resolve(modal);
        }
      } catch (e) {
        return Promise.reject(e);
      }
    };

    return Modal;
  }();

  function t() {
    return (t = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];

        for (var n in r) {
          Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }
      }

      return t;
    }).apply(this, arguments);
  }

  var e = {
    autoInit: !1,
    dataScroll: "scroll-stash",
    dataAnchor: "scroll-stash-anchor",
    selectorAnchor: "",
    selectorAnchorParent: "",
    selectorTopElem: "",
    selectorBotElem: "",
    alignment: "nearest",
    behavior: "auto",
    anchorPadding: 16,
    saveKey: "ScrollStash",
    throttleDelay: 100,
    customEventPrefix: "scroll-stash:"
  },
      r = function r(t, e, _r) {
    var n = _r.anchorPadding;

    if (_r.selectorTopElem) {
      var s = t.querySelector(_r.selectorTopElem);
      s && (n += s.offsetHeight);
    }

    return e.offsetTop - n;
  },
      n = function n(t, e, r) {
    var n = r.anchorPadding;

    if (r.selectorBotElem) {
      var s = t.querySelector(r.selectorBotElem);
      s && (n += s.offsetHeight);
    }

    return e.offsetTop - (t.offsetHeight - (e.offsetHeight + n));
  },
      s = function s(t, e) {
    var r = t.getAttribute("data-" + e.dataAnchor);
    if ("false" == r || "ignore" == r) return null;
    if (r && t.querySelector(r)) return t.querySelector(r);
    var n = e.selectorAnchor ? t.querySelector(e.selectorAnchor) : null;

    if (n && e.selectorAnchorParent) {
      var s = n.closest(e.selectorAnchorParent);
      if (s) return s;
    }

    return n || null;
  },
      o = function o(t, e, _o) {
    var a = s(t, _o);

    if (a) {
      var i = function (t, e, s) {
        var o = function (t, e, s) {
          var o = r(t, e, s),
              a = n(t, e, s);
          return !(t.scrollTop > o || t.scrollTop < a);
        }(t, e, s);

        switch (s.alignment) {
          case "start":
            return !o && r(t, e, s);

          case "center":
            return !o && function (t, e, s) {
              var o = r(t, e, s),
                  a = n(t, e, s);
              return a + (o - a) / 2;
            }(t, e, s);

          case "end":
            return !o && n(t, e, s);

          case "nearest":
            return function (t, e, s) {
              var o = r(t, e, s),
                  a = n(t, e, s);
              return t.scrollTop > o ? o : t.scrollTop < a && a;
            }(t, e, s);

          default:
            return !1;
        }
      }(t, a, _o);

      return i ? (t.scroll({
        top: i,
        behavior: e = e || _o.behavior
      }), t.dispatchEvent(new CustomEvent(_o.customEventPrefix + "anchor", {
        bubbles: !0,
        detail: {
          scrolled: {
            value: i,
            behavior: e
          },
          key: t.getAttribute("data-" + _o.dataScroll)
        }
      })), {
        scrolled: {
          value: i,
          behavior: e
        },
        msg: "Anchor was scrolled into view"
      }) : {
        scrolled: !1,
        msg: "Anchor is already in view"
      };
    }

    return {
      scrolled: !1,
      msg: "Anchor was not found"
    };
  },
      a = function a(t) {
    var e = {};
    return document.querySelectorAll("[data-" + t.dataScroll + "]").forEach(function (r) {
      var n = r.getAttribute("data-" + t.dataScroll);
      n && (e[n] = r.scrollTop);
    }), localStorage.setItem(t.saveKey, JSON.stringify(e)), document.dispatchEvent(new CustomEvent(t.customEventPrefix + "saved", {
      bubbles: !0,
      detail: {
        state: e
      }
    })), e;
  },
      i = function () {
    function r(r) {
      this.settings = t({}, e, r), this.state = {}, this.scrolls = [], this.ticking = !1, this.__handler = this.handler.bind(this), this.settings.autoInit && this.init();
    }

    var n = r.prototype;
    return n.init = function (e) {
      var r = this;
      void 0 === e && (e = null), e && (this.settings = t({}, this.settings, e)), this.state = function (t) {
        if (localStorage.getItem(t.saveKey)) {
          var e = JSON.parse(localStorage.getItem(t.saveKey));
          return Object.keys(e).forEach(function (r) {
            var n = document.querySelector("[data-" + t.dataScroll + '="' + r + '"]');
            n && (n.scrollTop = e[r]);
          }), document.dispatchEvent(new CustomEvent(t.customEventPrefix + "applied", {
            bubbles: !0,
            detail: {
              state: e
            }
          })), e;
        }

        return {};
      }(this.settings), this.state = Object.keys(this.state).length ? this.state : a(this.settings), this.scrolls = document.querySelectorAll("[data-" + this.settings.dataScroll + "]"), this.scrolls.forEach(function (t) {
        t.addEventListener("scroll", r.__handler, !1), o(t, !1, r.settings);
      });
    }, n.destroy = function () {
      var t = this;
      this.scrolls.forEach(function (e) {
        e.removeEventListener("scroll", t.__handler, !1);
      }), this.state = {}, this.scrolls = [], localStorage.removeItem(this.settings.saveKey);
    }, n.handler = function () {
      var t = this;
      this.ticking || (this.ticking = !0, setTimeout(function () {
        t.state = a(t.settings), t.ticking = !1;
      }, this.settings.throttleDelay));
    }, n.anchorGet = function (t) {
      return s(t, this.settings);
    }, n.anchorShow = function (t, e) {
      return o(t, e, this.settings);
    }, r;
  }();

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  (function () {
    if (typeof window === 'undefined') {
      return;
    }

    var slice = Array.prototype.slice;
    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;

    var _focusableElementsString = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'details', 'summary', 'iframe', 'object', 'embed', '[contenteditable]'].join(',');

    var InertRoot = function () {
      function InertRoot(rootElement, inertManager) {
        classCallCheck(this, InertRoot);

        this._inertManager = inertManager;
        this._rootElement = rootElement;
        this._managedNodes = new Set();

        if (this._rootElement.hasAttribute('aria-hidden')) {
          this._savedAriaHidden = this._rootElement.getAttribute('aria-hidden');
        } else {
          this._savedAriaHidden = null;
        }

        this._rootElement.setAttribute('aria-hidden', 'true');

        this._makeSubtreeUnfocusable(this._rootElement);

        this._observer = new MutationObserver(this._onMutation.bind(this));

        this._observer.observe(this._rootElement, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }

      createClass(InertRoot, [{
        key: "destructor",
        value: function destructor() {
          this._observer.disconnect();

          if (this._rootElement) {
            if (this._savedAriaHidden !== null) {
              this._rootElement.setAttribute('aria-hidden', this._savedAriaHidden);
            } else {
              this._rootElement.removeAttribute('aria-hidden');
            }
          }

          this._managedNodes.forEach(function (inertNode) {
            this._unmanageNode(inertNode.node);
          }, this);

          this._observer = null;
          this._rootElement = null;
          this._managedNodes = null;
          this._inertManager = null;
        }
      }, {
        key: "_makeSubtreeUnfocusable",
        value: function _makeSubtreeUnfocusable(startNode) {
          var _this2 = this;

          composedTreeWalk(startNode, function (node) {
            return _this2._visitNode(node);
          });
          var activeElement = document.activeElement;

          if (!document.body.contains(startNode)) {
            var node = startNode;
            var root = undefined;

            while (node) {
              if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                root = node;
                break;
              }

              node = node.parentNode;
            }

            if (root) {
              activeElement = root.activeElement;
            }
          }

          if (startNode.contains(activeElement)) {
            activeElement.blur();

            if (activeElement === document.activeElement) {
              document.body.focus();
            }
          }
        }
      }, {
        key: "_visitNode",
        value: function _visitNode(node) {
          if (node.nodeType !== Node.ELEMENT_NODE) {
            return;
          }

          var element = node;

          if (element !== this._rootElement && element.hasAttribute('inert')) {
            this._adoptInertRoot(element);
          }

          if (matches.call(element, _focusableElementsString) || element.hasAttribute('tabindex')) {
            this._manageNode(element);
          }
        }
      }, {
        key: "_manageNode",
        value: function _manageNode(node) {
          var inertNode = this._inertManager.register(node, this);

          this._managedNodes.add(inertNode);
        }
      }, {
        key: "_unmanageNode",
        value: function _unmanageNode(node) {
          var inertNode = this._inertManager.deregister(node, this);

          if (inertNode) {
            this._managedNodes.delete(inertNode);
          }
        }
      }, {
        key: "_unmanageSubtree",
        value: function _unmanageSubtree(startNode) {
          var _this3 = this;

          composedTreeWalk(startNode, function (node) {
            return _this3._unmanageNode(node);
          });
        }
      }, {
        key: "_adoptInertRoot",
        value: function _adoptInertRoot(node) {
          var inertSubroot = this._inertManager.getInertRoot(node);

          if (!inertSubroot) {
            this._inertManager.setInert(node, true);

            inertSubroot = this._inertManager.getInertRoot(node);
          }

          inertSubroot.managedNodes.forEach(function (savedInertNode) {
            this._manageNode(savedInertNode.node);
          }, this);
        }
      }, {
        key: "_onMutation",
        value: function _onMutation(records, self) {
          records.forEach(function (record) {
            var target = record.target;

            if (record.type === 'childList') {
              slice.call(record.addedNodes).forEach(function (node) {
                this._makeSubtreeUnfocusable(node);
              }, this);
              slice.call(record.removedNodes).forEach(function (node) {
                this._unmanageSubtree(node);
              }, this);
            } else if (record.type === 'attributes') {
              if (record.attributeName === 'tabindex') {
                this._manageNode(target);
              } else if (target !== this._rootElement && record.attributeName === 'inert' && target.hasAttribute('inert')) {
                this._adoptInertRoot(target);

                var inertSubroot = this._inertManager.getInertRoot(target);

                this._managedNodes.forEach(function (managedNode) {
                  if (target.contains(managedNode.node)) {
                    inertSubroot._manageNode(managedNode.node);
                  }
                });
              }
            }
          }, this);
        }
      }, {
        key: "managedNodes",
        get: function get() {
          return new Set(this._managedNodes);
        }
      }, {
        key: "hasSavedAriaHidden",
        get: function get() {
          return this._savedAriaHidden !== null;
        }
      }, {
        key: "savedAriaHidden",
        set: function set(ariaHidden) {
          this._savedAriaHidden = ariaHidden;
        },
        get: function get() {
          return this._savedAriaHidden;
        }
      }]);

      return InertRoot;
    }();

    var InertNode = function () {
      function InertNode(node, inertRoot) {
        classCallCheck(this, InertNode);

        this._node = node;
        this._overrodeFocusMethod = false;
        this._inertRoots = new Set([inertRoot]);
        this._savedTabIndex = null;
        this._destroyed = false;
        this.ensureUntabbable();
      }

      createClass(InertNode, [{
        key: "destructor",
        value: function destructor() {
          this._throwIfDestroyed();

          if (this._node && this._node.nodeType === Node.ELEMENT_NODE) {
            var element = this._node;

            if (this._savedTabIndex !== null) {
              element.setAttribute('tabindex', this._savedTabIndex);
            } else {
              element.removeAttribute('tabindex');
            }

            if (this._overrodeFocusMethod) {
              delete element.focus;
            }
          }

          this._node = null;
          this._inertRoots = null;
          this._destroyed = true;
        }
      }, {
        key: "_throwIfDestroyed",
        value: function _throwIfDestroyed() {
          if (this.destroyed) {
            throw new Error('Trying to access destroyed InertNode');
          }
        }
      }, {
        key: "ensureUntabbable",
        value: function ensureUntabbable() {
          if (this.node.nodeType !== Node.ELEMENT_NODE) {
            return;
          }

          var element = this.node;

          if (matches.call(element, _focusableElementsString)) {
            if (element.tabIndex === -1 && this.hasSavedTabIndex) {
              return;
            }

            if (element.hasAttribute('tabindex')) {
              this._savedTabIndex = element.tabIndex;
            }

            element.setAttribute('tabindex', '-1');

            if (element.nodeType === Node.ELEMENT_NODE) {
              element.focus = function () {};

              this._overrodeFocusMethod = true;
            }
          } else if (element.hasAttribute('tabindex')) {
            this._savedTabIndex = element.tabIndex;
            element.removeAttribute('tabindex');
          }
        }
      }, {
        key: "addInertRoot",
        value: function addInertRoot(inertRoot) {
          this._throwIfDestroyed();

          this._inertRoots.add(inertRoot);
        }
      }, {
        key: "removeInertRoot",
        value: function removeInertRoot(inertRoot) {
          this._throwIfDestroyed();

          this._inertRoots.delete(inertRoot);

          if (this._inertRoots.size === 0) {
            this.destructor();
          }
        }
      }, {
        key: "destroyed",
        get: function get() {
          return this._destroyed;
        }
      }, {
        key: "hasSavedTabIndex",
        get: function get() {
          return this._savedTabIndex !== null;
        }
      }, {
        key: "node",
        get: function get() {
          this._throwIfDestroyed();

          return this._node;
        }
      }, {
        key: "savedTabIndex",
        set: function set(tabIndex) {
          this._throwIfDestroyed();

          this._savedTabIndex = tabIndex;
        },
        get: function get() {
          this._throwIfDestroyed();

          return this._savedTabIndex;
        }
      }]);

      return InertNode;
    }();

    var InertManager = function () {
      function InertManager(document) {
        classCallCheck(this, InertManager);

        if (!document) {
          throw new Error('Missing required argument; InertManager needs to wrap a document.');
        }

        this._document = document;
        this._managedNodes = new Map();
        this._inertRoots = new Map();
        this._observer = new MutationObserver(this._watchForInert.bind(this));
        addInertStyle(document.head || document.body || document.documentElement);

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', this._onDocumentLoaded.bind(this));
        } else {
          this._onDocumentLoaded();
        }
      }

      createClass(InertManager, [{
        key: "setInert",
        value: function setInert(root, inert) {
          if (inert) {
            if (this._inertRoots.has(root)) {
              return;
            }

            var inertRoot = new InertRoot(root, this);
            root.setAttribute('inert', '');

            this._inertRoots.set(root, inertRoot);

            if (!this._document.body.contains(root)) {
              var parent = root.parentNode;

              while (parent) {
                if (parent.nodeType === 11) {
                  addInertStyle(parent);
                }

                parent = parent.parentNode;
              }
            }
          } else {
            if (!this._inertRoots.has(root)) {
              return;
            }

            var _inertRoot = this._inertRoots.get(root);

            _inertRoot.destructor();

            this._inertRoots.delete(root);

            root.removeAttribute('inert');
          }
        }
      }, {
        key: "getInertRoot",
        value: function getInertRoot(element) {
          return this._inertRoots.get(element);
        }
      }, {
        key: "register",
        value: function register(node, inertRoot) {
          var inertNode = this._managedNodes.get(node);

          if (inertNode !== undefined) {
            inertNode.addInertRoot(inertRoot);
          } else {
            inertNode = new InertNode(node, inertRoot);
          }

          this._managedNodes.set(node, inertNode);

          return inertNode;
        }
      }, {
        key: "deregister",
        value: function deregister(node, inertRoot) {
          var inertNode = this._managedNodes.get(node);

          if (!inertNode) {
            return null;
          }

          inertNode.removeInertRoot(inertRoot);

          if (inertNode.destroyed) {
            this._managedNodes.delete(node);
          }

          return inertNode;
        }
      }, {
        key: "_onDocumentLoaded",
        value: function _onDocumentLoaded() {
          var inertElements = slice.call(this._document.querySelectorAll('[inert]'));
          inertElements.forEach(function (inertElement) {
            this.setInert(inertElement, true);
          }, this);

          this._observer.observe(this._document.body || this._document.documentElement, {
            attributes: true,
            subtree: true,
            childList: true
          });
        }
      }, {
        key: "_watchForInert",
        value: function _watchForInert(records, self) {
          var _this = this;

          records.forEach(function (record) {
            switch (record.type) {
              case 'childList':
                slice.call(record.addedNodes).forEach(function (node) {
                  if (node.nodeType !== Node.ELEMENT_NODE) {
                    return;
                  }

                  var inertElements = slice.call(node.querySelectorAll('[inert]'));

                  if (matches.call(node, '[inert]')) {
                    inertElements.unshift(node);
                  }

                  inertElements.forEach(function (inertElement) {
                    this.setInert(inertElement, true);
                  }, _this);
                }, _this);
                break;

              case 'attributes':
                if (record.attributeName !== 'inert') {
                  return;
                }

                var target = record.target;
                var inert = target.hasAttribute('inert');

                _this.setInert(target, inert);

                break;
            }
          }, this);
        }
      }]);

      return InertManager;
    }();

    function composedTreeWalk(node, callback, shadowRootAncestor) {
      if (node.nodeType == Node.ELEMENT_NODE) {
        var element = node;

        if (callback) {
          callback(element);
        }

        var shadowRoot = element.shadowRoot;

        if (shadowRoot) {
          composedTreeWalk(shadowRoot, callback);
          return;
        }

        if (element.localName == 'content') {
          var content = element;
          var distributedNodes = content.getDistributedNodes ? content.getDistributedNodes() : [];

          for (var i = 0; i < distributedNodes.length; i++) {
            composedTreeWalk(distributedNodes[i], callback);
          }

          return;
        }

        if (element.localName == 'slot') {
          var slot = element;

          var _distributedNodes = slot.assignedNodes ? slot.assignedNodes({
            flatten: true
          }) : [];

          for (var _i = 0; _i < _distributedNodes.length; _i++) {
            composedTreeWalk(_distributedNodes[_i], callback);
          }

          return;
        }
      }

      var child = node.firstChild;

      while (child != null) {
        composedTreeWalk(child, callback);
        child = child.nextSibling;
      }
    }

    function addInertStyle(node) {
      if (node.querySelector('style#inert-style, link#inert-style')) {
        return;
      }

      var style = document.createElement('style');
      style.setAttribute('id', 'inert-style');
      style.textContent = '\n' + '[inert] {\n' + '  pointer-events: none;\n' + '  cursor: default;\n' + '}\n' + '\n' + '[inert], [inert] * {\n' + '  -webkit-user-select: none;\n' + '  -moz-user-select: none;\n' + '  -ms-user-select: none;\n' + '  user-select: none;\n' + '}\n';
      node.appendChild(style);
    }

    var inertManager = new InertManager(document);

    if (!Element.prototype.hasOwnProperty('inert')) {
      Object.defineProperty(Element.prototype, 'inert', {
        enumerable: true,
        get: function get() {
          return this.hasAttribute('inert');
        },
        set: function set(inert) {
          inertManager.setInert(this, inert);
        }
      });
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
    var noticeEmpty = document.querySelector('.notice_empty');
    var noticeEmptyText = noticeEmpty.querySelector('.search_text');
    var filter$1 = document.querySelector('.filter');
    var search$1 = document.querySelector('.filter .search');
    var searchClear = document.querySelector('.filter .search_clear');

    var isMenuLinkActive = function isMenuLinkActive() {
      var menuLinks = document.querySelectorAll('#listjs .menu__link');
      var isActive = menuLinks.classList.contains('is-active');
      return isActive;
    };

    list.on('searchComplete', function () {
      var value = search$1.value;
      noticeEmptyText.innerHTML = value;
      localStorage.setItem('SearchValue', value);

      if (value) {
        filter$1.classList.add('is-active');
        search$1.classList.add('is-active');
        searchClear.classList.remove('display-none');
      } else {
        filter$1.classList.remove('is-active');
        search$1.classList.remove('is-active');
        searchClear.classList.add('display-none');
      }

      if (list.visibleItems.length > 0) {
        noticeEmpty.classList.add('display-none');
      } else {
        noticeEmpty.classList.remove('display-none');
      }
    });
    document.addEventListener('click', function () {
      var trigger_search_clear = event.target.closest('.search_clear');
      var trigger_search_cat = event.target.closest('.category');

      if (trigger_search_clear) {
        search$1.value = '';
        list.search();
        event.preventDefault();
      }

      if (trigger_search_cat) {
        search$1.value = trigger_search_cat.dataset.category;
        list.search(search$1.value);
        event.preventDefault();
      }
    }, false);

    if (localStorage.getItem('SearchValue')) {
      search$1.value = localStorage.getItem('SearchValue');
      list.search(search$1.value);

      if (!isMenuLinkActive()) {
        search$1.value = '';
        list.search();
      }
    }
  }

  var url = 'https://api.github.com/repos/sebnitu/vrembem/contents/packages/vrembem/package.json?ref=master';
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

    ajax.open('GET', url);
    ajax.send();
  }

  new Checkbox({
    autoInit: true
  });
  new Drawer({
    autoInit: true,
    selectorInert: '[role="main"]',
    selectorOverflow: 'body, [role="main"]'
  });
  new Modal({
    autoInit: true,
    selectorInert: '.page',
    moveModals: {
      type: 'append',
      ref: '[role="modals-container"]'
    },
    toggleOverflow: 'body, .page__article'
  });
  var scrollStash = new i({
    autoInit: true,
    selectorAnchor: '.is-active',
    selectorTopElem: '.dialog__header'
  });
  var el$1 = document.querySelector('[data-scroll-stash]');
  document.addEventListener('drawer:opened', function () {
    var anchor = scrollStash.anchorGet(el$1);
    anchor.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });

}());
