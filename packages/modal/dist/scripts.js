(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, (global.vrembem = global.vrembem || {}, global.vrembem.Modal = factory()));
}(this, (function () { 'use strict';

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
	  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    cl[_key - 1] = arguments[_key];
	  }

	  el = el.forEach ? el : [el];
	  el.forEach(function (el) {
	    var _el$classList;

	    (_el$classList = el.classList).add.apply(_el$classList, cl);
	  });
	};

	var focusTarget = function focusTarget(target, settings) {
	  var innerFocus = target.querySelector("[data-".concat(settings.dataFocus, "]"));

	  if (innerFocus) {
	    innerFocus.focus();
	  } else {
	    var dialog = target.querySelector("[data-".concat(settings.dataDialog, "][tabindex=\"-1\"]"));

	    if (dialog) {
	      dialog.focus();
	    }
	  }
	};
	var focusTrigger = function focusTrigger() {
	  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

	  if (obj.memory.trigger) {
	    obj.memory.trigger.focus();
	    obj.memory.trigger = null;
	  }
	};

	var FocusTrap = function () {
	  function FocusTrap() {
	    classCallCheck(this, FocusTrap);

	    this.target = null;
	    this.handlerFocusTrapRef = this.handlerFocusTrap.bind(this);
	  }

	  createClass(FocusTrap, [{
	    key: "init",
	    value: function init(target) {
	      this.target = target;
	      this.focusable = this.getFocusable();

	      if (this.focusable.length) {
	        this.focusableFirst = this.focusable[0];
	        this.focusableLast = this.focusable[this.focusable.length - 1];
	        this.target.addEventListener('keydown', this.handlerFocusTrapRef);
	      } else {
	        this.target.addEventListener('keydown', this.handlerFocusLock);
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      if (this.target) {
	        this.focusable = null;
	        this.focusableFirst = null;
	        this.focusableLast = null;
	        this.target.removeEventListener('keydown', this.handlerFocusTrapRef);
	        this.target.removeEventListener('keydown', this.handlerFocusLock);
	      }
	    }
	  }, {
	    key: "handlerFocusTrap",
	    value: function handlerFocusTrap(event) {
	      var isTab = event.key === 'Tab' || event.keyCode === 9;
	      if (!isTab) return;

	      if (event.shiftKey) {
	        var innerElement = this.target.querySelector('[tabindex="-1"]');

	        if (document.activeElement === this.focusableFirst || document.activeElement === innerElement) {
	          this.focusableLast.focus();
	          event.preventDefault();
	        }
	      } else {
	        if (document.activeElement === this.focusableLast) {
	          this.focusableFirst.focus();
	          event.preventDefault();
	        }
	      }
	    }
	  }, {
	    key: "handlerFocusLock",
	    value: function handlerFocusLock(event) {
	      var isTab = event.key === 'Tab' || event.keyCode === 9;
	      if (isTab) event.preventDefault();
	    }
	  }, {
	    key: "getFocusable",
	    value: function getFocusable() {
	      var focusable = [];
	      var scrollPos = this.target.scrollTop;
	      var items = this.target.querySelectorAll("\n      a[href]:not([disabled]),\n      button:not([disabled]),\n      textarea:not([disabled]),\n      input[type=\"text\"]:not([disabled]),\n      input[type=\"radio\"]:not([disabled]),\n      input[type=\"checkbox\"]:not([disabled]),\n      select:not([disabled]),\n      [tabindex]:not([tabindex=\"-1\"])\n    ");
	      items.forEach(function (el) {
	        el.focus();

	        if (el === document.activeElement) {
	          focusable.push(el);
	        }
	      });
	      this.target.scrollTop = scrollPos;
	      return focusable;
	    }
	  }]);

	  return FocusTrap;
	}();

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

	var openTransition = function openTransition(el, settings) {
	  return new Promise(function (resolve) {
	    if (settings.transition) {
	      removeClass(el, settings.stateClosed);
	      addClass(el, settings.stateOpening);
	      el.addEventListener('transitionend', function _f() {
	        addClass(el, settings.stateOpened);
	        removeClass(el, settings.stateOpening);
	        resolve(el);
	        this.removeEventListener('transitionend', _f);
	      });
	    } else {
	      addClass(el, settings.stateOpened);
	      removeClass(el, settings.stateClosed);
	      resolve(el);
	    }
	  });
	};
	var closeTransition = function closeTransition(el, settings) {
	  return new Promise(function (resolve) {
	    if (settings.transition) {
	      addClass(el, settings.stateClosing);
	      removeClass(el, settings.stateOpened);
	      el.addEventListener('transitionend', function _f() {
	        removeClass(el, settings.stateClosing);
	        addClass(el, settings.stateClosed);
	        resolve(el);
	        this.removeEventListener('transitionend', _f);
	      });
	    } else {
	      addClass(el, settings.stateClosed);
	      removeClass(el, settings.stateOpened);
	      resolve(el);
	    }
	  });
	};

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

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var Modal = function () {
	  function Modal(options) {
	    classCallCheck(this, Modal);

	    this.defaults = defaults;
	    this.settings = _objectSpread(_objectSpread({}, this.defaults), options);
	    this.working = false;
	    this.memory = {};
	    this.focusTrap = new FocusTrap();
	    this.selectorTabindex = "[data-".concat(this.settings.dataModal, "] [data-").concat(this.settings.dataDialog, "]");
	    this.handlerClick = this.handlerClick.bind(this);
	    this.handlerKeyup = this.handlerKeyup.bind(this);
	    if (this.settings.autoInit) this.init();
	  }

	  createClass(Modal, [{
	    key: "init",
	    value: function init() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      if (options) this.settings = _objectSpread(_objectSpread({}, this.settings), options);
	      this.setInitialState();
	      this.setTabindex(this.settings.setTabindex, this.selectorTabindex);
	      this.moveModals();
	      document.addEventListener('click', this.handlerClick, false);
	      document.addEventListener('touchend', this.handlerClick, false);
	      document.addEventListener('keyup', this.handlerKeyup, false);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.memory = {};
	      document.removeEventListener('click', this.handlerClick, false);
	      document.removeEventListener('touchend', this.handlerClick, false);
	      document.removeEventListener('keyup', this.handlerKeyup, false);
	    }
	  }, {
	    key: "handlerClick",
	    value: function () {
	      var _handlerClick = asyncToGenerator(regenerator.mark(function _callee(event) {
	        var trigger, modalKey, fromModal;
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (!this.working) {
	                  _context.next = 2;
	                  break;
	                }

	                return _context.abrupt("return");

	              case 2:
	                trigger = event.target.closest("[data-".concat(this.settings.dataOpen, "]"));

	                if (!trigger) {
	                  _context.next = 12;
	                  break;
	                }

	                event.preventDefault();
	                modalKey = trigger.getAttribute("data-".concat(this.settings.dataOpen));
	                fromModal = event.target.closest("[data-".concat(this.settings.dataModal, "]"));
	                if (!fromModal) this.memory.trigger = trigger;
	                _context.next = 10;
	                return this.close(!fromModal);

	              case 10:
	                this.open(modalKey);
	                return _context.abrupt("return");

	              case 12:
	                if (!event.target.closest("[data-".concat(this.settings.dataClose, "]"))) {
	                  _context.next = 16;
	                  break;
	                }

	                event.preventDefault();
	                this.close();
	                return _context.abrupt("return");

	              case 16:
	                if (!(event.target.hasAttribute("data-".concat(this.settings.dataModal)) && !event.target.hasAttribute("data-".concat(this.settings.dataRequired)))) {
	                  _context.next = 19;
	                  break;
	                }

	                this.close();
	                return _context.abrupt("return");

	              case 19:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function handlerClick(_x) {
	        return _handlerClick.apply(this, arguments);
	      }

	      return handlerClick;
	    }()
	  }, {
	    key: "handlerKeyup",
	    value: function handlerKeyup(event) {
	      if (this.working) return;

	      if (event.key === 'Escape' || event.keyCode === 27) {
	        var target = document.querySelector("[data-".concat(this.settings.dataModal, "].").concat(this.settings.stateOpened));

	        if (target && !target.hasAttribute("data-".concat(this.settings.dataRequired))) {
	          this.close();
	        }
	      }
	    }
	  }, {
	    key: "modalNotFound",
	    value: function modalNotFound(key) {
	      return Promise.reject(new Error("Did not find modal with key: \"".concat(key, "\"")));
	    }
	  }, {
	    key: "moveModals",
	    value: function moveModals() {
	      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.settings.moveModals.selector;
	      var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.settings.moveModals.location;

	      if (selector) {
	        var el = document.querySelector(selector);

	        if (el) {
	          var modals = document.querySelectorAll("[data-".concat(this.settings.dataModal, "]"));
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
	    }
	  }, {
	    key: "setInitialState",
	    value: function setInitialState() {
	      var _this = this;

	      var modals = document.querySelectorAll("[data-".concat(this.settings.dataModal, "]"));
	      modals.forEach(function (el) {
	        if (el.classList.contains(_this.settings.stateOpened)) {
	          setInert(false, _this.settings.selectorInert);
	          setOverflowHidden(false, _this.settings.selectorOverflow);
	          focusTrigger(_this);

	          _this.focusTrap.destroy();
	        }

	        removeClass(el, _this.settings.stateOpened, _this.settings.stateOpening, _this.settings.stateClosing);
	        addClass(el, _this.settings.stateClosed);
	      });
	    }
	  }, {
	    key: "setTabindex",
	    value: function setTabindex$1() {
	      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	      setTabindex(state, this.selectorTabindex);
	    }
	  }, {
	    key: "open",
	    value: function () {
	      var _open = asyncToGenerator(regenerator.mark(function _callee2(modalKey) {
	        var modal;
	        return regenerator.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                modal = document.querySelector("[data-".concat(this.settings.dataModal, "=\"").concat(modalKey, "\"]"));

	                if (modal) {
	                  _context2.next = 3;
	                  break;
	                }

	                return _context2.abrupt("return", this.modalNotFound(modalKey));

	              case 3:
	                if (!hasClass(modal, this.settings.stateClosed)) {
	                  _context2.next = 16;
	                  break;
	                }

	                this.working = true;
	                setOverflowHidden(true, this.settings.selectorOverflow);
	                _context2.next = 8;
	                return openTransition(modal, this.settings);

	              case 8:
	                this.focusTrap.init(modal);
	                focusTarget(modal, this.settings);
	                setInert(true, this.settings.selectorInert);
	                modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
	                  bubbles: true
	                }));
	                this.working = false;
	                return _context2.abrupt("return", modal);

	              case 16:
	                return _context2.abrupt("return", modal);

	              case 17:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function open(_x2) {
	        return _open.apply(this, arguments);
	      }

	      return open;
	    }()
	  }, {
	    key: "close",
	    value: function () {
	      var _close = asyncToGenerator(regenerator.mark(function _callee3() {
	        var returnFocus,
	            modal,
	            _args3 = arguments;
	        return regenerator.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                returnFocus = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : true;
	                modal = document.querySelector("[data-".concat(this.settings.dataModal, "].").concat(this.settings.stateOpened));

	                if (!modal) {
	                  _context3.next = 15;
	                  break;
	                }

	                this.working = true;
	                setInert(false, this.settings.selectorInert);
	                setOverflowHidden(false, this.settings.selectorOverflow);
	                _context3.next = 8;
	                return closeTransition(modal, this.settings);

	              case 8:
	                if (returnFocus) focusTrigger(this);
	                this.focusTrap.destroy();
	                modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
	                  bubbles: true
	                }));
	                this.working = false;
	                return _context3.abrupt("return", modal);

	              case 15:
	                return _context3.abrupt("return", modal);

	              case 16:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function close() {
	        return _close.apply(this, arguments);
	      }

	      return close;
	    }()
	  }]);

	  return Modal;
	}();

	return Modal;

})));
