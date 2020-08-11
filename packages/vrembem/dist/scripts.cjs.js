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

var index$1 = (function (options) {
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
});

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

var scripts_cjs = createCommonjsModule(function (module, exports) {

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

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
  exports.addClass = addClass;
  exports.breakpoints = breakpoints;
  exports.camelCase = camelCase;
  exports.hasClass = hasClass;
  exports.hyphenCase = hyphenCase;
  exports.removeClass = removeClass;
  exports.toggleClass = toggleClass;
});

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var index$2 = (function (options) {
  var api = {};
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
    breakpoints: scripts_cjs.breakpoints,
    customEventPrefix: 'drawer:',
    stateSave: true,
    stateKey: 'DrawerState',
    setTabindex: true,
    transition: true
  };
  var working = false;
  api.settings = _objectSpread$1(_objectSpread$1({}, defaults), options);
  api.memory = {};
  api.state = {};
  api.breakpoint = {};

  api.init = function () {
    stateSet();
    setTabindex();
    api.breakpoint.init();
    document.addEventListener('click', handler, false);
    document.addEventListener('touchend', handler, false);
    document.addEventListener('keyup', handlerEscape, false);
  };

  api.destroy = function () {
    api.breakpoint.destroy();
    api.memory = {};
    api.state = {};
    localStorage.removeItem(api.settings.stateKey);
    document.removeEventListener('click', handler, false);
    document.removeEventListener('touchend', handler, false);
    document.removeEventListener('keyup', handlerEscape, false);
  };

  var handler = function handler(event) {
    if (working) return;
    var trigger = event.target.closest("[data-".concat(api.settings.dataToggle, "]"));

    if (trigger) {
      var selector = trigger.getAttribute("data-".concat(api.settings.dataToggle));
      api.memory.trigger = trigger;
      api.toggle(selector);
      event.preventDefault();
      return;
    }

    trigger = event.target.closest("[data-".concat(api.settings.dataOpen, "]"));

    if (trigger) {
      var _selector = trigger.getAttribute("data-".concat(api.settings.dataOpen));

      api.memory.trigger = trigger;
      api.open(_selector);
      event.preventDefault();
      return;
    }

    trigger = event.target.closest("[data-".concat(api.settings.dataClose, "]"));

    if (trigger) {
      var _selector2 = trigger.getAttribute("data-".concat(api.settings.dataClose));

      if (_selector2) {
        api.memory.trigger = trigger;
        api.close(_selector2);
      } else {
        var target = event.target.closest("[data-".concat(api.settings.dataDrawer, "]"));
        if (target) api.close(target);
      }

      event.preventDefault();
      return;
    }

    if (event.target.hasAttribute("data-".concat(api.settings.dataDrawer))) {
      api.close(event.target);
      return;
    }
  };

  var handlerEscape = function handlerEscape(event) {
    if (working) return;

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

  var drawerNotFound = function drawerNotFound(key) {
    return Promise.reject(new Error("Did not find drawer with key: \"".concat(key, "\"")));
  };

  var setInert = function setInert(state) {
    if (api.settings.selectorInert) {
      var content = document.querySelectorAll(api.settings.selectorInert);
      content.forEach(function (el) {
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

  var setOverflowHidden = function setOverflowHidden(state) {
    if (api.settings.selectorOverflow) {
      var els = document.querySelectorAll(api.settings.selectorOverflow);
      els.forEach(function (el) {
        if (state) {
          el.style.overflow = 'hidden';
        } else {
          el.style.removeProperty('overflow');
        }
      });
    }
  };

  var setTabindex = function setTabindex() {
    var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : api.settings.setTabindex;

    if (enable) {
      var drawers = document.querySelectorAll("[data-".concat(api.settings.dataDrawer, "] [data-").concat(api.settings.dataDialog, "]"));
      drawers.forEach(function (el) {
        el.setAttribute('tabindex', '-1');
      });
    }
  };

  api.setTabindex = function () {
    setTabindex(true);
  };

  var openTransition = function openTransition(drawer) {
    return new Promise(function (resolve) {
      if (api.settings.transition) {
        scripts_cjs.removeClass(drawer, api.settings.stateClosed);
        scripts_cjs.addClass(drawer, api.settings.stateOpening);
        drawer.addEventListener('transitionend', function _f() {
          scripts_cjs.addClass(drawer, api.settings.stateOpened);
          scripts_cjs.removeClass(drawer, api.settings.stateOpening);
          resolve(drawer);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        scripts_cjs.addClass(drawer, api.settings.stateOpened);
        scripts_cjs.removeClass(drawer, api.settings.stateClosed);
        resolve(drawer);
      }
    });
  };

  var closeTransition = function closeTransition(drawer) {
    return new Promise(function (resolve) {
      if (api.settings.transition) {
        scripts_cjs.addClass(drawer, api.settings.stateClosing);
        scripts_cjs.removeClass(drawer, api.settings.stateOpened);
        drawer.addEventListener('transitionend', function _f() {
          scripts_cjs.removeClass(drawer, api.settings.stateClosing);
          scripts_cjs.addClass(drawer, api.settings.stateClosed);
          resolve(drawer);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        scripts_cjs.addClass(drawer, api.settings.stateClosed);
        scripts_cjs.removeClass(drawer, api.settings.stateOpened);
        resolve(drawer);
      }
    });
  };

  api.open = function () {
    var _ref = asyncToGenerator(regenerator.mark(function _callee(drawerKey) {
      var drawer, isModal;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              drawer = drawerKeyCheck(drawerKey);

              if (drawer) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", drawerNotFound(drawerKey));

            case 3:
              if (scripts_cjs.hasClass(drawer, api.settings.stateOpened)) {
                _context.next = 17;
                break;
              }

              working = true;
              isModal = scripts_cjs.hasClass(drawer, api.settings.classModal);

              if (isModal) {
                setOverflowHidden(true);
              }

              _context.next = 9;
              return openTransition(drawer);

            case 9:
              stateSave(drawer);

              if (isModal) {
                focusTrapInit(drawer.querySelector("[data-".concat(api.settings.dataDialog, "]")));
                setInert(true);
              }

              focusDrawer(drawer);
              drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
                bubbles: true
              }));
              working = false;
              return _context.abrupt("return", drawer);

            case 17:
              focusDrawer(drawer);
              return _context.abrupt("return", drawer);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  api.close = function () {
    var _ref2 = asyncToGenerator(regenerator.mark(function _callee2(drawerKey) {
      var drawer;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              drawer = drawerKeyCheck(drawerKey);

              if (drawer) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", drawerNotFound(drawerKey));

            case 3:
              if (!scripts_cjs.hasClass(drawer, api.settings.stateOpened)) {
                _context2.next = 16;
                break;
              }

              working = true;

              if (scripts_cjs.hasClass(drawer, api.settings.classModal)) {
                setInert(false);
                setOverflowHidden(false);
              }

              _context2.next = 8;
              return closeTransition(drawer);

            case 8:
              stateSave(drawer);
              focusTrigger();
              focusTrapDestroy(drawer);
              drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'closed', {
                bubbles: true
              }));
              working = false;
              return _context2.abrupt("return", drawer);

            case 16:
              return _context2.abrupt("return", drawer);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  api.toggle = function (drawerKey) {
    var drawer = drawerKeyCheck(drawerKey);
    if (!drawer) return drawerNotFound(drawerKey);
    var isOpen = scripts_cjs.hasClass(drawer, api.settings.stateOpened);

    if (!isOpen) {
      return api.open(drawer);
    } else {
      return api.close(drawer);
    }
  };

  var focusDrawer = function focusDrawer(drawer) {
    var innerFocus = drawer.querySelector("[data-".concat(api.settings.dataFocus, "]"));

    if (innerFocus) {
      innerFocus.focus();
    } else {
      var dialog = drawer.querySelector("[data-".concat(api.settings.dataDialog, "][tabindex=\"-1\"]"));

      if (dialog) {
        dialog.focus();
      }
    }
  };

  var focusTrigger = function focusTrigger() {
    if (api.memory.trigger) {
      api.memory.trigger.focus();
      api.memory.trigger = null;
    }
  };

  var getFocusable = function getFocusable(drawer) {
    var focusable = [];
    var scrollPos = drawer.scrollTop;
    var items = drawer.querySelectorAll("\n      a[href]:not([disabled]),\n      button:not([disabled]),\n      textarea:not([disabled]),\n      input[type=\"text\"]:not([disabled]),\n      input[type=\"radio\"]:not([disabled]),\n      input[type=\"checkbox\"]:not([disabled]),\n      select:not([disabled]),\n      [tabindex]:not([tabindex=\"-1\"])\n    ");
    items.forEach(function (el) {
      el.focus();

      if (el === document.activeElement) {
        focusable.push(el);
      }
    });
    drawer.scrollTop = scrollPos;
    return focusable;
  };

  var focusTrapInit = function focusTrapInit(drawer) {
    api.memory.focusable = getFocusable(drawer);

    if (api.memory.focusable.length) {
      api.memory.focusableFirst = api.memory.focusable[0];
      api.memory.focusableLast = api.memory.focusable[api.memory.focusable.length - 1];
      drawer.addEventListener('keydown', handlerFocusTrap);
    } else {
      drawer.addEventListener('keydown', handlerFocusLock);
    }
  };

  var focusTrapDestroy = function focusTrapDestroy(drawer) {
    api.memory.focusable = null;
    api.memory.focusableFirst = null;
    api.memory.focusableLast = null;
    drawer.removeEventListener('keydown', handlerFocusTrap);
    drawer.removeEventListener('keydown', handlerFocusLock);
  };

  var handlerFocusTrap = function handlerFocusTrap(event) {
    var isTab = event.key === 'Tab' || event.keyCode === 9;
    if (!isTab) return;

    if (event.shiftKey) {
      var dialog = document.querySelector("\n        [data-".concat(api.settings.dataDrawer, "].").concat(api.settings.stateOpened, "\n        [data-").concat(api.settings.dataDialog, "][tabindex=\"-1\"]\n      "));

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

  var handlerFocusLock = function handlerFocusLock(event) {
    var isTab = event.key === 'Tab' || event.keyCode === 9;
    if (isTab) event.preventDefault();
  };

  var stateSave = function stateSave() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (api.settings.stateSave) {
      var drawers = target ? [target] : document.querySelectorAll("[data-".concat(api.settings.dataDrawer, "]"));
      drawers.forEach(function (el) {
        if (!scripts_cjs.hasClass(el, api.settings.classModal)) {
          api.state[el.getAttribute("data-".concat(api.settings.dataDrawer))] = scripts_cjs.hasClass(el, api.settings.stateOpened) ? api.settings.stateOpened : api.settings.stateClosed;
        }
      });
      localStorage.setItem(api.settings.stateKey, JSON.stringify(api.state));
    }
  };

  var stateSet = function stateSet() {
    if (api.settings.stateSave) {
      if (localStorage.getItem(api.settings.stateKey)) {
        api.state = JSON.parse(localStorage.getItem(api.settings.stateKey));
        Object.keys(api.state).forEach(function (key) {
          var item = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(key, "\"]"));

          if (item) {
            if (api.state[key] == api.settings.stateOpened) {
              scripts_cjs.addClass(item, api.settings.stateOpened);
            } else {
              scripts_cjs.removeClass(item, api.settings.stateOpened);
            }
          }
        });
      } else {
        stateSave();
      }
    } else {
      if (localStorage.getItem(api.settings.stateKey)) {
        localStorage.removeItem(api.settings.stateKey);
      }
    }
  };

  api.breakpoint.init = function () {
    api.mediaQueryLists = [];
    var drawers = document.querySelectorAll("[data-".concat(api.settings.dataBreakpoint, "]"));
    drawers.forEach(function (drawer) {
      var id = drawer.getAttribute("data-".concat(api.settings.dataDrawer));
      var key = drawer.getAttribute("data-".concat(api.settings.dataBreakpoint));
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

  api.breakpoint.destroy = function () {
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
      document.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'breakpoint', {
        bubbles: true
      }));
    }
  };

  api.breakpoint.check = function () {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    breakpointCheck(event);
  };

  var breakpointMatch = function breakpointMatch(mql, drawer) {
    if (mql.matches) {
      switchToDefault(drawer);
    } else {
      switchToModal(drawer);
    }
  };

  var switchToModal = function switchToModal(drawer) {
    if (scripts_cjs.hasClass(drawer, api.settings.classModal)) return;
    scripts_cjs.addClass(drawer, api.settings.classModal);
    scripts_cjs.addClass(drawer, api.settings.stateClosed);
    scripts_cjs.removeClass(drawer, api.settings.stateOpened);
    drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'toModal', {
      bubbles: true
    }));
  };

  api.switchToModal = function (drawerKey) {
    var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));

    if (drawer) {
      switchToModal(drawer);
    }
  };

  var switchToDefault = function switchToDefault(drawer) {
    if (!scripts_cjs.hasClass(drawer, api.settings.classModal)) return;
    setInert(false);
    setOverflowHidden(false);
    scripts_cjs.removeClass(drawer, api.settings.classModal);
    focusTrapDestroy(drawer);
    var drawerKey = drawer.getAttribute("data-".concat(api.settings.dataDrawer));
    var drawerState = api.state[drawerKey];

    if (drawerState == api.settings.stateOpened) {
      scripts_cjs.addClass(drawer, api.settings.stateOpened);
      scripts_cjs.removeClass(drawer, api.settings.stateClosed);
    }

    drawer.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'toDefault', {
      bubbles: true
    }));
  };

  api.switchToDefault = function (drawerKey) {
    var drawer = document.querySelector("[data-".concat(api.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));

    if (drawer) {
      switchToDefault(drawer);
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
});

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var index$3 = (function (options) {
  var api = {};
  var defaults = {
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
      selector: null,
      location: null
    },
    setTabindex: true,
    transition: true
  };
  var working = false;
  api.settings = _objectSpread$2(_objectSpread$2({}, defaults), options);
  api.memory = {};

  api.init = function () {
    setInitialState();
    setTabindex();
    moveModals();
    document.addEventListener('click', handler, false);
    document.addEventListener('touchend', handler, false);
    document.addEventListener('keyup', handlerEscape, false);
  };

  api.destroy = function () {
    api.memory = {};
    document.removeEventListener('click', handler, false);
    document.removeEventListener('touchend', handler, false);
    document.removeEventListener('keyup', handlerEscape, false);
  };

  var handler = function () {
    var _ref = asyncToGenerator(regenerator.mark(function _callee(event) {
      var trigger, modalKey, fromModal;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!working) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              trigger = event.target.closest("[data-".concat(api.settings.dataOpen, "]"));

              if (!trigger) {
                _context.next = 12;
                break;
              }

              event.preventDefault();
              modalKey = trigger.getAttribute("data-".concat(api.settings.dataOpen));
              fromModal = event.target.closest("[data-".concat(api.settings.dataModal, "]"));
              if (!fromModal) api.memory.trigger = trigger;
              _context.next = 10;
              return api.close(!fromModal);

            case 10:
              api.open(modalKey);
              return _context.abrupt("return");

            case 12:
              if (!event.target.closest("[data-".concat(api.settings.dataClose, "]"))) {
                _context.next = 16;
                break;
              }

              event.preventDefault();
              api.close();
              return _context.abrupt("return");

            case 16:
              if (!(event.target.hasAttribute("data-".concat(api.settings.dataModal)) && !event.target.hasAttribute("data-".concat(api.settings.dataRequired)))) {
                _context.next = 19;
                break;
              }

              api.close();
              return _context.abrupt("return");

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handler(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var handlerEscape = function handlerEscape(event) {
    if (working) return;

    if (event.key === 'Escape' || event.keyCode === 27) {
      var target = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpened));

      if (target && !target.hasAttribute("data-".concat(api.settings.dataRequired))) {
        api.close();
      }
    }
  };

  var modalNotFound = function modalNotFound(key) {
    return Promise.reject(new Error("Did not find modal with key: \"".concat(key, "\"")));
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

  api.moveModals = function (selector, location) {
    moveModals(selector, location);
  };

  var setInert = function setInert(state) {
    if (api.settings.selectorInert) {
      var content = document.querySelectorAll(api.settings.selectorInert);
      content.forEach(function (el) {
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

  var setInitialState = function setInitialState() {
    var modals = document.querySelectorAll("[data-".concat(api.settings.dataModal, "]"));
    modals.forEach(function (el) {
      if (el.classList.contains(api.settings.stateOpened)) {
        setInert(false);
        setOverflowHidden();
        focusTrigger();
        focusTrapDestroy(el);
      }

      scripts_cjs.removeClass(el, api.settings.stateOpened, api.settings.stateOpening, api.settings.stateClosing);
      scripts_cjs.addClass(el, api.settings.stateClosed);
    });
  };

  api.setInitialState = function () {
    setInitialState();
  };

  var setOverflowHidden = function setOverflowHidden(state) {
    if (api.settings.selectorOverflow) {
      var els = document.querySelectorAll(api.settings.selectorOverflow);
      els.forEach(function (el) {
        if (state) {
          el.style.overflow = 'hidden';
        } else {
          el.style.removeProperty('overflow');
        }
      });
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

  api.setTabindex = function () {
    setTabindex(true);
  };

  var openTransition = function openTransition(modal) {
    return new Promise(function (resolve) {
      if (api.settings.transition) {
        scripts_cjs.removeClass(modal, api.settings.stateClosed);
        scripts_cjs.addClass(modal, api.settings.stateOpening);
        modal.addEventListener('transitionend', function _f() {
          scripts_cjs.addClass(modal, api.settings.stateOpened);
          scripts_cjs.removeClass(modal, api.settings.stateOpening);
          resolve(modal);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        scripts_cjs.addClass(modal, api.settings.stateOpened);
        scripts_cjs.removeClass(modal, api.settings.stateClosed);
        resolve(modal);
      }
    });
  };

  var closeTransition = function closeTransition(modal) {
    return new Promise(function (resolve) {
      if (api.settings.transition) {
        scripts_cjs.addClass(modal, api.settings.stateClosing);
        scripts_cjs.removeClass(modal, api.settings.stateOpened);
        modal.addEventListener('transitionend', function _f() {
          scripts_cjs.removeClass(modal, api.settings.stateClosing);
          scripts_cjs.addClass(modal, api.settings.stateClosed);
          resolve(modal);
          this.removeEventListener('transitionend', _f);
        });
      } else {
        scripts_cjs.addClass(modal, api.settings.stateClosed);
        scripts_cjs.removeClass(modal, api.settings.stateOpened);
        resolve(modal);
      }
    });
  };

  api.open = function () {
    var _ref2 = asyncToGenerator(regenerator.mark(function _callee2(modalKey) {
      var modal;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              modal = document.querySelector("[data-".concat(api.settings.dataModal, "=\"").concat(modalKey, "\"]"));

              if (modal) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", modalNotFound(modalKey));

            case 3:
              if (!scripts_cjs.hasClass(modal, api.settings.stateClosed)) {
                _context2.next = 16;
                break;
              }

              working = true;
              setOverflowHidden('hidden');
              _context2.next = 8;
              return openTransition(modal);

            case 8:
              focusTrapInit(modal);
              focusModal(modal);
              setInert(true);
              modal.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'opened', {
                bubbles: true
              }));
              working = false;
              return _context2.abrupt("return", modal);

            case 16:
              return _context2.abrupt("return", modal);

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  api.close = asyncToGenerator(regenerator.mark(function _callee3() {
    var returnFocus,
        modal,
        _args3 = arguments;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            returnFocus = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : true;
            modal = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpened));

            if (!modal) {
              _context3.next = 15;
              break;
            }

            working = true;
            setInert(false);
            setOverflowHidden();
            _context3.next = 8;
            return closeTransition(modal);

          case 8:
            if (returnFocus) focusTrigger();
            focusTrapDestroy(modal);
            modal.dispatchEvent(new CustomEvent(api.settings.customEventPrefix + 'closed', {
              bubbles: true
            }));
            working = false;
            return _context3.abrupt("return", modal);

          case 15:
            return _context3.abrupt("return", modal);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  var focusModal = function focusModal(modal) {
    var innerFocus = modal.querySelector("[data-".concat(api.settings.dataFocus, "]"));

    if (innerFocus) {
      innerFocus.focus();
    } else {
      var dialog = modal.querySelector("[data-".concat(api.settings.dataDialog, "][tabindex=\"-1\"]"));

      if (dialog) {
        dialog.focus();
      }
    }
  };

  var focusTrigger = function focusTrigger() {
    if (api.memory.trigger) {
      api.memory.trigger.focus();
      api.memory.trigger = null;
    }
  };

  var getFocusable = function getFocusable(modal) {
    var focusable = [];
    var items = modal.querySelectorAll("\n      a[href]:not([disabled]),\n      button:not([disabled]),\n      textarea:not([disabled]),\n      input[type=\"text\"]:not([disabled]),\n      input[type=\"radio\"]:not([disabled]),\n      input[type=\"checkbox\"]:not([disabled]),\n      select:not([disabled]),\n      [tabindex]:not([tabindex=\"-1\"])\n    ");
    items.forEach(function (el) {
      el.focus();

      if (el === document.activeElement) {
        focusable.push(el);
      }
    });
    return focusable;
  };

  var focusTrapInit = function focusTrapInit(modal) {
    api.memory.focusable = getFocusable(modal);

    if (api.memory.focusable.length) {
      api.memory.focusableFirst = api.memory.focusable[0];
      api.memory.focusableLast = api.memory.focusable[api.memory.focusable.length - 1];
      modal.addEventListener('keydown', handlerFocusTrap);
    } else {
      modal.addEventListener('keydown', handlerFocusLock);
    }
  };

  var focusTrapDestroy = function focusTrapDestroy(modal) {
    api.memory.focusable = null;
    api.memory.focusableFirst = null;
    api.memory.focusableLast = null;
    modal.removeEventListener('keydown', handlerFocusTrap);
    modal.removeEventListener('keydown', handlerFocusLock);
  };

  var handlerFocusTrap = function handlerFocusTrap(event) {
    var isTab = event.key === 'Tab' || event.keyCode === 9;
    if (!isTab) return;

    if (event.shiftKey) {
      var dialog = document.querySelector("\n        [data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpened, "\n        [data-").concat(api.settings.dataDialog, "][tabindex=\"-1\"]\n      "));

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

  var handlerFocusLock = function handlerFocusLock(event) {
    var isTab = event.key === 'Tab' || event.keyCode === 9;
    if (isTab) event.preventDefault();
  };

  if (api.settings.autoInit) api.init();
  return api;
});

exports.Checkbox = index$1;
exports.Drawer = index$2;
exports.Modal = index$3;
exports.core = index;
