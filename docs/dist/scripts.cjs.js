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
    classHide: 'display-none',
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
  api.settings = _objectSpread$2(_objectSpread$2({}, defaults), options);
  api.breakpoint = {};
  api.state = {};

  api.init = function () {
    setState();
    breakpointInit();
    document.addEventListener('click', handler, false);
    document.addEventListener('keyup', handlerEscape, false);
  };

  api.destroy = function () {
    breakpointDestroy();
    api.memoryTrigger = null;
    api.memoryTarget = null;
    api.state = {};
    localStorage.removeItem(api.settings.saveKey);
    document.removeEventListener('click', handler, false);
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
    } else if (drawer && hasClass(drawer, api.settings.stateOpened)) {
      saveTarget(drawer);
      setFocus();
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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
});

var runtime_1 = createCommonjsModule(function (module) {
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap;

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof_1(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator;

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }

      context.delegate = null;
      return ContinueSentinel;
    }

    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator";

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse();
      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };
    return exports;
  }( module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var asyncToGenerator = _asyncToGenerator;

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Modal = function Modal(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    dataModal: 'modal',
    dataDialog: 'modal-dialog',
    dataOpen: 'modal-open',
    dataClose: 'modal-close',
    dataFocus: 'modal-focus',
    dataRequired: 'modal-required',
    selectorMain: null,
    stateOpened: 'is-opened',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',
    customEventPrefix: 'modal:',
    moveModals: {
      selector: null,
      location: null
    },
    setTabindex: true,
    toggleOverflow: 'body',
    transition: true
  };
  api.settings = _objectSpread$3(_objectSpread$3({}, defaults), options);
  api.memory = {};
  api.init = asyncToGenerator(regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            setInitialState();
            setTabindex();
            moveModals();
            document.addEventListener('click', handler, false);
            document.addEventListener('keyup', handlerEscape, false);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  api.destroy = function () {
    api.memory = {};
    document.removeEventListener('click', handler, false);
    document.removeEventListener('keyup', handlerEscape, false);
  };

  api.open = function (modalKey, callback) {
    open(modalKey, callback);
  };

  api.close = function (returnFocus, callback) {
    close(returnFocus, callback);
  };

  api.setInitialState = function () {
    setInitialState();
  };

  api.setTabindex = function () {
    setTabindex(true);
  };

  api.moveModals = function (selector, location) {
    moveModals(selector, location);
  };

  var handler = function handler(event) {
    var trigger = event.target.closest("[data-".concat(api.settings.dataOpen, "]"));

    if (trigger) {
      var modalKey = trigger.dataset[camelCase(api.settings.dataOpen)];
      var fromModal = event.target.closest("[data-".concat(api.settings.dataModal, "]"));

      if (!fromModal) {
        api.memory.trigger = trigger;
      } else {
        var target = document.querySelector("[data-".concat(api.settings.dataModal, "=\"").concat(modalKey, "\"]"));

        if (target) {
          api.memory.targetNext = target;
        }
      }

      close(!fromModal);
      open(modalKey);
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

  var handlerEscape = function handlerEscape(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
      var target = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpened));

      if (target && !target.hasAttribute("data-".concat(api.settings.dataRequired))) {
        close();
      }
    }
  };

  var setInitialState = function setInitialState() {
    var modals = document.querySelectorAll("[data-".concat(api.settings.dataModal, "]"));
    modals.forEach(function (el) {
      removeClass(el, api.settings.stateOpened, api.settings.stateOpening, api.settings.stateClosing);
      addClass(el, api.settings.stateClosed);
    });

    if (api.memory.target) {
      showContent();
      setOverflow();
      destroyTrapFocus();
      returnFocus();
    }
  };

  var setTabindex = function setTabindex() {
    var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : api.settings.setTabindex;

    if (enable) {
      var modals = document.querySelectorAll("[data-".concat(api.settings.dataModal, "] [data-").concat(api.settings.dataDialog, "]"));
      modals.forEach(function (el) {
        el.setAttribute('tabindex', '-1');
      });
    }
  };

  var moveModals = function moveModals() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : api.settings.moveModals.selector;
    var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : api.settings.moveModals.location;

    if (selector) {
      var el = document.querySelector(selector);

      if (el) {
        var modals = document.querySelectorAll("[data-".concat(api.settings.dataModal, "]"));
        modals.forEach(function (modal) {
          if (location === 'after') {
            el.after(modal);
          } else if (location === 'before') {
            el.before(modal);
          } else if (location === 'append') {
            el.append(modal);
          } else if (location === 'prepend') {
            el.prepend(modal);
          }
        });
      }
    }
  };

  var setOverflow = function setOverflow(state) {
    if (api.settings.toggleOverflow) {
      var els = document.querySelectorAll(api.settings.toggleOverflow);
      els.forEach(function (el) {
        if (state == 'hidden') {
          el.style.overflow = 'hidden';
        } else {
          el.style.removeProperty('overflow');
        }
      });
    }
  };

  var openTransition = function openTransition(modal) {
    return new Promise(function (resolve) {
      removeClass(modal, api.settings.stateClosed);
      addClass(modal, api.settings.stateOpening);
      modal.addEventListener('transitionend', function _listener() {
        addClass(modal, api.settings.stateOpened);
        removeClass(modal, api.settings.stateOpening);
        this.removeEventListener('transitionend', _listener, true);
        resolve();
      }, true);
    });
  };

  var open = function () {
    var _ref2 = asyncToGenerator(regenerator.mark(function _callee2(modalKey, callback) {
      var target;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              target = document.querySelector("[data-".concat(api.settings.dataModal, "=\"").concat(modalKey, "\"].").concat(api.settings.stateClosed));

              if (!target) {
                _context2.next = 16;
                break;
              }

              setOverflow('hidden');
              api.memory.target = target;

              if (!api.settings.transition) {
                _context2.next = 9;
                break;
              }

              _context2.next = 7;
              return openTransition(target);

            case 7:
              _context2.next = 11;
              break;

            case 9:
              addClass(target, api.settings.stateOpened);
              removeClass(target, api.settings.stateClosed);

            case 11:
              setFocus();
              initTrapFocus();
              hideContent();
              typeof callback === 'function' && callback();
              target.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
                bubbles: true
              }));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function open(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var closeTransition = function closeTransition(modal) {
    return new Promise(function (resolve) {
      addClass(modal, api.settings.stateClosing);
      removeClass(modal, api.settings.stateOpened);
      modal.addEventListener('transitionend', function _listener() {
        removeClass(modal, api.settings.stateClosing);
        addClass(modal, api.settings.stateClosed);
        this.removeEventListener('transitionend', _listener, true);
        resolve();
      }, true);
    });
  };

  var close = function () {
    var _ref3 = asyncToGenerator(regenerator.mark(function _callee3() {
      var focus,
          callback,
          target,
          _args3 = arguments;
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              focus = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : true;
              callback = _args3.length > 1 ? _args3[1] : undefined;
              target = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpened));

              if (!target) {
                _context3.next = 17;
                break;
              }

              showContent();
              setOverflow();

              if (!api.settings.transition) {
                _context3.next = 11;
                break;
              }

              _context3.next = 9;
              return closeTransition(target);

            case 9:
              _context3.next = 13;
              break;

            case 11:
              addClass(target, api.settings.stateClosed);
              removeClass(target, api.settings.stateOpened);

            case 13:
              if (focus) returnFocus();
              destroyTrapFocus();
              typeof callback === 'function' && callback();
              target.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'closed', {
                bubbles: true
              }));

            case 17:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function close() {
      return _ref3.apply(this, arguments);
    };
  }();

  var setFocus = function setFocus() {
    var innerFocus = api.memory.target.querySelector("[data-".concat(api.settings.dataFocus, "]"));

    if (innerFocus) {
      innerFocus.focus();
    } else {
      var dialog = api.memory.target.querySelector("[data-".concat(api.settings.dataDialog, "][tabindex=\"-1\"]"));

      if (dialog) {
        dialog.focus();
      }
    }
  };

  var returnFocus = function returnFocus() {
    if (api.memory.trigger) {
      api.memory.trigger.focus();
      api.memory.trigger = null;
    }
  };

  var initTrapFocus = function initTrapFocus() {
    api.memory.focusable = api.memory.target.querySelectorAll("\n      a[href]:not([disabled]),\n      button:not([disabled]),\n      textarea:not([disabled]),\n      input[type=\"text\"]:not([disabled]),\n      input[type=\"radio\"]:not([disabled]),\n      input[type=\"checkbox\"]:not([disabled]),\n      select:not([disabled]),\n      [tabindex]:not([tabindex=\"-1\"])\n    ");

    if (api.memory.focusable.length) {
      api.memory.focusableFirst = api.memory.focusable[0];
      api.memory.focusableLast = api.memory.focusable[api.memory.focusable.length - 1];
      api.memory.target.addEventListener('keydown', handlerTrapFocus);
    } else {
      api.memory.target.addEventListener('keydown', handlerSickyFocus);
    }
  };

  var destroyTrapFocus = function destroyTrapFocus() {
    api.memory.focusable = null;
    api.memory.focusableFirst = null;
    api.memory.focusableLast = null;

    if (api.memory.target) {
      api.memory.target.removeEventListener('keydown', handlerTrapFocus);
      api.memory.target.removeEventListener('keydown', handlerSickyFocus);

      if (api.memory.targetNext) {
        api.memory.target = api.memory.targetNext;
        api.memory.targetNext = null;
      } else {
        api.memory.target = null;
      }
    }
  };

  var handlerTrapFocus = function handlerTrapFocus(event) {
    var isTab = event.key === 'Tab' || event.keyCode === 9;
    if (!isTab) return;

    if (event.shiftKey) {
      var dialog = api.memory.target.querySelector("[data-".concat(api.settings.dataDialog, "][tabindex=\"-1\"]"));

      if (document.activeElement === api.memory.focusableFirst || document.activeElement === dialog) {
        api.memory.focusableLast.focus();
        event.preventDefault();
      }
    } else {
      if (document.activeElement === api.memory.focusableLast) {
        api.memory.focusableFirst.focus();
        event.preventDefault();
      }
    }
  };

  var handlerSickyFocus = function handlerSickyFocus(event) {
    var isTab = event.key === 'Tab' || event.keyCode === 9;
    if (isTab) event.preventDefault();
  };

  var hideContent = function hideContent() {
    if (api.settings.selectorMain) {
      var content = document.querySelectorAll(api.settings.selectorMain);
      content.forEach(function (el) {
        el.inert = true;
        el.setAttribute('aria-hidden', true);
      });
    }
  };

  var showContent = function showContent() {
    if (api.settings.selectorMain) {
      var content = document.querySelectorAll(api.settings.selectorMain);
      content.forEach(function (el) {
        el.inert = null;
        el.removeAttribute('aria-hidden');
      });
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

var FUNC_ERROR_TEXT = 'Expected a function';
var NAN = 0 / 0;
var symbolTag = '[object Symbol]';
var reTrim = /^\s+|\s+$/g;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
var freeGlobal = _typeof_1(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof_1(self)) == 'object' && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function('return this')();
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var nativeMax = Math.max,
    nativeMin = Math.min;

var now = function now() {
  return root.Date.now();
};

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  wait = toNumber(wait) || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;
    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }

    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

function isObject(value) {
  var type = _typeof_1(value);

  return !!value && (type == 'object' || type == 'function');
}

function isObjectLike(value) {
  return !!value && _typeof_1(value) == 'object';
}

function isSymbol(value) {
  return _typeof_1(value) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
}

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol(value)) {
    return NAN;
  }

  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var lodash_throttle = throttle;

var lodash_isempty = createCommonjsModule(function (module, exports) {
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = '[object Arguments]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      setTag = '[object Set]',
      weakMapTag = '[object WeakMap]';
  var dataViewTag = '[object DataView]';
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var freeGlobal = _typeof_1(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof_1(self)) == 'object' && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function('return this')();
  var freeExports =  exports && !exports.nodeType && exports;
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;

  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  function isHostObject(value) {
    var result = false;

    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }

    return result;
  }

  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  var funcProto = Function.prototype,
      objectProto = Object.prototype;
  var coreJsData = root['__core-js_shared__'];

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();

  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  var Buffer = moduleExports ? root.Buffer : undefined,
      propertyIsEnumerable = objectProto.propertyIsEnumerable;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
      nativeKeys = overArg(Object.keys, Object);
  var DataView = getNative(root, 'DataView'),
      Map = getNative(root, 'Map'),
      Promise = getNative(root, 'Promise'),
      Set = getNative(root, 'Set'),
      WeakMap = getNative(root, 'WeakMap');
  var nonEnumShadows = !propertyIsEnumerable.call({
    'valueOf': 1
  }, 'valueOf');
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);

  function baseGetTag(value) {
    return objectToString.call(value);
  }

  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }

    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  var getTag = baseGetTag;

  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map()) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function getTag(value) {
      var result = objectToString.call(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : undefined;

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;

          case mapCtorString:
            return mapTag;

          case promiseCtorString:
            return promiseTag;

          case setCtorString:
            return setTag;

          case weakMapCtorString:
            return weakMapTag;
        }
      }

      return result;
    };
  }

  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
    return value === proto;
  }

  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  }

  var isArray = Array.isArray;

  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }

  var isBuffer = nativeIsBuffer || stubFalse;

  function isEmpty(value) {
    if (isArrayLike(value) && (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' || isBuffer(value) || isArguments(value))) {
      return !value.length;
    }

    var tag = getTag(value);

    if (tag == mapTag || tag == setTag) {
      return !value.size;
    }

    if (nonEnumShadows || isPrototype(value)) {
      return !nativeKeys(value).length;
    }

    for (var key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }

    return true;
  }

  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  function isObject(value) {
    var type = _typeof_1(value);

    return !!value && (type == 'object' || type == 'function');
  }

  function isObjectLike(value) {
    return !!value && _typeof_1(value) == 'object';
  }

  function stubFalse() {
    return false;
  }

  module.exports = isEmpty;
});

var defaults = {
  autoInit: false,
  dataScroll: 'scroll-stash',
  dataAnchor: 'scroll-stash-anchor',
  selectorAnchor: '',
  selectorAnchorParent: '',
  selectorTopElem: '',
  selectorBotElem: '',
  alignment: 'nearest',
  behavior: 'auto',
  anchorPadding: 16,
  saveKey: 'ScrollStash',
  throttleDelay: 100,
  customEventPrefix: 'scroll-stash:'
};

var anchorPositionStart = function anchorPositionStart(el, anchor, settings) {
  var pos = settings.anchorPadding;

  if (settings.selectorTopElem) {
    var topElem = el.querySelector(settings.selectorTopElem);
    if (topElem) pos += topElem.offsetHeight;
  }

  return anchor.offsetTop - pos;
};
var anchorPositionEnd = function anchorPositionEnd(el, anchor, settings) {
  var pos = settings.anchorPadding;

  if (settings.selectorBotElem) {
    var botElem = el.querySelector(settings.selectorBotElem);
    if (botElem) pos += botElem.offsetHeight;
  }

  return anchor.offsetTop - (el.offsetHeight - (anchor.offsetHeight + pos));
};
var anchorPositionCenter = function anchorPositionCenter(el, anchor, settings) {
  var posTop = anchorPositionStart(el, anchor, settings);
  var posBot = anchorPositionEnd(el, anchor, settings);
  return posBot + (posTop - posBot) / 2;
};
var anchorPositionNearest = function anchorPositionNearest(el, anchor, settings) {
  var posTop = anchorPositionStart(el, anchor, settings);
  var posBot = anchorPositionEnd(el, anchor, settings);
  if (el.scrollTop > posTop) return posTop;
  if (el.scrollTop < posBot) return posBot;
  return false;
};
var anchorInView = function anchorInView(el, anchor, settings) {
  var posTop = anchorPositionStart(el, anchor, settings);
  var posBot = anchorPositionEnd(el, anchor, settings);
  if (el.scrollTop > posTop || el.scrollTop < posBot) return false;
  return true;
};
var anchorPositionGet = function anchorPositionGet(el, anchor, settings) {
  var inView = anchorInView(el, anchor, settings);

  switch (settings.alignment) {
    case 'start':
      return inView ? false : anchorPositionStart(el, anchor, settings);

    case 'center':
      return inView ? false : anchorPositionCenter(el, anchor, settings);

    case 'end':
      return inView ? false : anchorPositionEnd(el, anchor, settings);

    case 'nearest':
      return anchorPositionNearest(el, anchor, settings);

    default:
      return false;
  }
};

var anchorGet = function anchorGet(el, settings) {
  var dataAnchor = el.dataset[camelCase(settings.dataAnchor)];

  if (dataAnchor == 'false' || dataAnchor == 'ignore') {
    return null;
  }

  if (dataAnchor && el.querySelector(dataAnchor)) {
    return el.querySelector(dataAnchor);
  }

  var selectorAnchor = settings.selectorAnchor ? el.querySelector(settings.selectorAnchor) : null;

  if (selectorAnchor && settings.selectorAnchorParent) {
    var parentAnchor = selectorAnchor.closest(settings.selectorAnchorParent);
    if (parentAnchor) return parentAnchor;
  }

  return selectorAnchor ? selectorAnchor : null;
};
var anchorShow = function anchorShow(el, behavior, settings) {
  var anchor = anchorGet(el, settings);

  if (anchor) {
    var position = anchorPositionGet(el, anchor, settings);

    if (position) {
      behavior = behavior ? behavior : settings.behavior;
      el.scroll({
        top: position,
        behavior: behavior
      });
      el.dispatchEvent(new CustomEvent(settings.customEventPrefix + 'anchor', {
        bubbles: true,
        detail: {
          scrolled: {
            value: position,
            behavior: behavior
          },
          key: el.dataset[camelCase(settings.dataScroll)]
        }
      }));
      return {
        scrolled: {
          value: position,
          behavior: behavior
        },
        msg: 'Anchor was scrolled into view'
      };
    } else {
      return {
        scrolled: false,
        msg: 'Anchor is already in view'
      };
    }
  } else {
    return {
      scrolled: false,
      msg: 'Anchor was not found'
    };
  }
};
var anchor = {
  get: anchorGet,
  show: anchorShow
};

var stateSave = function stateSave(settings) {
  var state = {};
  var scrolls = document.querySelectorAll("[data-".concat(settings.dataScroll, "]"));
  scrolls.forEach(function (el) {
    var id = el.dataset[camelCase(settings.dataScroll)];
    if (id) state[id] = el.scrollTop;
  });
  localStorage.setItem(settings.saveKey, JSON.stringify(state));
  document.dispatchEvent(new CustomEvent(settings.customEventPrefix + 'saved', {
    bubbles: true,
    detail: {
      state: state
    }
  }));
  return state;
};
var stateSet = function stateSet(settings) {
  if (localStorage.getItem(settings.saveKey)) {
    var state = JSON.parse(localStorage.getItem(settings.saveKey));
    Object.keys(state).forEach(function (key) {
      var item = document.querySelector("[data-".concat(settings.dataScroll, "=\"").concat(key, "\"]"));
      if (item) item.scrollTop = state[key];
    });
    document.dispatchEvent(new CustomEvent(settings.customEventPrefix + 'applied', {
      bubbles: true,
      detail: {
        state: state
      }
    }));
    return state;
  } else {
    return {};
  }
};
var state = {
  save: stateSave,
  set: stateSet
};

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var ScrollStash = (function (options) {
  var api = {};
  api.settings = _objectSpread$4(_objectSpread$4({}, defaults), options);
  api.state = {};
  api.scrolls = [];

  var handler = function handler() {
    return api.state = state.save(api.settings);
  };

  var throttleRef = lodash_throttle(handler, api.settings.throttleDelay, {
    leading: false
  });

  api.init = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    if (options) api.settings = _objectSpread$4(_objectSpread$4({}, api.settings), options);
    api.state = state.set(api.settings);
    api.state = lodash_isempty(api.state) ? state.save(api.settings) : api.state;
    api.scrolls = document.querySelectorAll("[data-".concat(api.settings.dataScroll, "]"));
    api.scrolls.forEach(function (item) {
      item.addEventListener('scroll', throttleRef, false);
      anchor.show(item, false, api.settings);
    });
  };

  api.destroy = function () {
    api.scrolls.forEach(function (item) {
      item.removeEventListener('scroll', throttleRef, false);
    });
    api.state = {};
    api.scrolls = [];
    localStorage.removeItem(api.settings.saveKey);
  };

  api.anchor = {
    get: function get(el) {
      return anchor.get(el, api.settings);
    },
    show: function show(el, behavior) {
      return anchor.show(el, behavior, api.settings);
    }
  };
  if (api.settings.autoInit) api.init();
  return api;
});

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
          this._managedNodes["delete"](inertNode);
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

        this._inertRoots["delete"](inertRoot);

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

          this._inertRoots["delete"](root);

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
          this._managedNodes["delete"](node);
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
        removeClass(search_clear, 'display-none');
      } else {
        removeClass(filter, 'is-active');
        removeClass(search, 'is-active');
        addClass(search_clear, 'display-none');
      }

      if (list.visibleItems.length > 0) {
        addClass(notice_empty, 'display-none');
      } else {
        removeClass(notice_empty, 'display-none');
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

(function () {
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
})();

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
  autoInit: true,
  selectorMain: '.page',
  moveModals: {
    selector: '[role="modals-container"]',
    location: 'append'
  },
  toggleOverflow: 'body, .page__article'
});
var scrollStash = new ScrollStash({
  autoInit: true,
  selectorAnchor: '.is-active',
  selectorTopElem: '.dialog__header'
});
var el = document.querySelector('[data-scroll-stash]');
document.addEventListener('drawer:opened', function () {
  scrollStash.showAnchor(el, 'smooth');
});
