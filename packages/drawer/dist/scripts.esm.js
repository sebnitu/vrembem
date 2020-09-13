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
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

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
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
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
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


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
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
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

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
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
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


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
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
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
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
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
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

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
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
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

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


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
      } // Return an iterator with no values.


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
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
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
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
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
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
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
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
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

/**
 * Adds a class or classes to an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to add class(es) to
 * @param {String || Array} cl - Class(es) to add
 */
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
    var innerElement = target.querySelector('[tabindex="-1"]');
    if (innerElement) innerElement.focus();
  }
};
var focusTrigger = function focusTrigger() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!obj || !obj.memory || !obj.memory.trigger) return;
  obj.memory.trigger.focus();
  obj.memory.trigger = null;
};
var FocusTrap = /*#__PURE__*/function () {
  function FocusTrap() {
    classCallCheck(this, FocusTrap);

    this.target = null;
    this.__handlerFocusTrap = this.handlerFocusTrap.bind(this);
  }

  createClass(FocusTrap, [{
    key: "init",
    value: function init(target) {
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
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.target) return;
      this.inner = null;
      this.focusable = null;
      this.focusableFirst = null;
      this.focusableLast = null;
      this.target.removeEventListener('keydown', this.__handlerFocusTrap);
      this.target.removeEventListener('keydown', this.handlerFocusLock);
      this.target = null;
    }
  }, {
    key: "handlerFocusTrap",
    value: function handlerFocusTrap(event) {
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
    }
  }]);

  return FocusTrap;
}();

/**
 * Checks an element or NodeList whether they contain a class or classes
 * Ref: https://davidwalsh.name/nodelist-array
 * ---
 * @param {Node} el - Element(s) to check class(es) on
 * @param {String || Array} c - Class(es) to check
 * @returns {Boolean} - Returns true if class exists, otherwise false
 */
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

/**
 * Remove a class or classes from an element or NodeList
 * ---
 * @param {Node || NodeList} el - Element(s) to remove class(es) from
 * @param {String || Array} cl - Class(es) to remove
 */
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
  breakpoints: breakpoints,
  customEventPrefix: 'drawer:',
  stateSave: true,
  stateKey: 'DrawerState',
  setTabindex: true,
  transition: true
};

function switchToModal(_x, _x2) {
  return _switchToModal.apply(this, arguments);
}

function _switchToModal() {
  _switchToModal = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(drawerKey, obj) {
    var drawer;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Initial guards
            drawer = obj.getDrawer(drawerKey);

            if (drawer) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", obj.drawerNotFound(drawerKey));

          case 3:
            if (!hasClass(drawer, obj.settings.classModal)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            // Enable modal state
            addClass(drawer, obj.settings.classModal);
            addClass(drawer, obj.settings.stateClosed);
            removeClass(drawer, obj.settings.stateOpened); // Dispatch custom event

            drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toModal', {
              bubbles: true
            }));
            return _context.abrupt("return", drawer);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _switchToModal.apply(this, arguments);
}

function switchToDefault(_x3, _x4) {
  return _switchToDefault.apply(this, arguments);
}

function _switchToDefault() {
  _switchToDefault = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(drawerKey, obj) {
    var drawer, drawerState;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Initial guards
            drawer = obj.getDrawer(drawerKey);

            if (drawer) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", obj.drawerNotFound(drawerKey));

          case 3:
            if (hasClass(drawer, obj.settings.classModal)) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return");

          case 5:
            // Tear down modal state
            setInert(false, obj.settings.selectorInert);
            setOverflowHidden(false, obj.settings.selectorOverflow);
            removeClass(drawer, obj.settings.classModal);
            obj.focusTrap.destroy(); // Restore drawers saved state

            drawerKey = drawer.getAttribute("data-".concat(obj.settings.dataDrawer));
            drawerState = obj.state[drawerKey];

            if (drawerState == obj.settings.stateOpened) {
              addClass(drawer, obj.settings.stateOpened);
              removeClass(drawer, obj.settings.stateClosed);
            } // Dispatch custom event


            drawer.dispatchEvent(new CustomEvent(obj.settings.customEventPrefix + 'toDefault', {
              bubbles: true
            }));
            return _context2.abrupt("return", drawer);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _switchToDefault.apply(this, arguments);
}

var Breakpoint = /*#__PURE__*/function () {
  function Breakpoint(parent) {
    classCallCheck(this, Breakpoint);

    this.mediaQueryLists = [];
    this.parent = parent;
    this.__check = this.check.bind(this);
  }

  createClass(Breakpoint, [{
    key: "init",
    value: function init() {
      var _this = this;

      var drawers = document.querySelectorAll("[data-".concat(this.parent.settings.dataBreakpoint, "]"));
      drawers.forEach(function (drawer) {
        var id = drawer.getAttribute("data-".concat(_this.parent.settings.dataDrawer));
        var key = drawer.getAttribute("data-".concat(_this.parent.settings.dataBreakpoint));
        var bp = _this.parent.settings.breakpoints[key] ? _this.parent.settings.breakpoints[key] : key;
        var mql = window.matchMedia('(min-width:' + bp + ')');

        _this.match(mql, drawer);

        mql.addListener(_this.__check);

        _this.mediaQueryLists.push({
          'mql': mql,
          'drawer': id
        });
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this2 = this;

      if (this.mediaQueryLists && this.mediaQueryLists.length) {
        this.mediaQueryLists.forEach(function (item) {
          item.mql.removeListener(_this2.__check);
        });
      }

      this.mediaQueryLists = null;
    }
  }, {
    key: "check",
    value: function check() {
      var _this3 = this;

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.mediaQueryLists && this.mediaQueryLists.length) {
        this.mediaQueryLists.forEach(function (item) {
          // If an event is passed, filter out drawers that don't match the query
          // If event is null, run all drawers through match
          var filter = event ? event.media == item.mql.media : true;
          if (!filter) return;
          var drawer = document.querySelector("[data-".concat(_this3.parent.settings.dataDrawer, "=\"").concat(item.drawer, "\"]"));
          if (drawer) _this3.match(item.mql, drawer);
        });
        document.dispatchEvent(new CustomEvent(this.parent.settings.customEventPrefix + 'breakpoint', {
          bubbles: true
        }));
      }
    }
  }, {
    key: "match",
    value: function match(mql, drawer) {
      if (mql.matches) {
        switchToDefault(drawer, this.parent);
      } else {
        switchToModal(drawer, this.parent);
      }
    }
  }]);

  return Breakpoint;
}();

function handlerClick(event) {
  // Working catch
  if (this.working) return; // Toggle data trigger

  var trigger = event.target.closest("[data-".concat(this.settings.dataToggle, "]"));

  if (trigger) {
    var selector = trigger.getAttribute("data-".concat(this.settings.dataToggle));
    this.memory.trigger = trigger;
    this.toggle(selector);
    event.preventDefault();
    return;
  } // Open data trigger


  trigger = event.target.closest("[data-".concat(this.settings.dataOpen, "]"));

  if (trigger) {
    var _selector = trigger.getAttribute("data-".concat(this.settings.dataOpen));

    this.memory.trigger = trigger;
    this.open(_selector);
    event.preventDefault();
    return;
  } // Close data trigger


  trigger = event.target.closest("[data-".concat(this.settings.dataClose, "]"));

  if (trigger) {
    var _selector2 = trigger.getAttribute("data-".concat(this.settings.dataClose));

    if (_selector2) {
      this.memory.trigger = trigger;
      this.close(_selector2);
    } else {
      var target = event.target.closest("[data-".concat(this.settings.dataDrawer, "]"));
      if (target) this.close(target);
    }

    event.preventDefault();
    return;
  } // Screen modal trigger


  if (event.target.hasAttribute("data-".concat(this.settings.dataDrawer))) {
    this.close(event.target);
    return;
  }
}
function handlerKeyup(event) {
  // Working catch
  if (this.working) return;

  if (event.keyCode == 27) {
    var target = document.querySelector(".".concat(this.settings.classModal, ".").concat(this.settings.stateOpened));

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
    var item = document.querySelector("[data-".concat(settings.dataDrawer, "=\"").concat(key, "\"]"));
    if (!item) return;
    state[key] == settings.stateOpened ? addClass(item, settings.stateOpened) : removeClass(item, settings.stateOpened);
  });
  return state;
}
function stateSave(target, settings) {
  // If save state is disabled
  if (!settings.stateSave) return stateClear(settings); // Get the currently saved object if it exists

  var state = localStorage.getItem(settings.stateKey) ? JSON.parse(localStorage.getItem(settings.stateKey)) : {}; // Are we saving a single target or the entire suite?

  var drawers = target ? [target] : document.querySelectorAll("[data-".concat(settings.dataDrawer, "]")); // Loop through drawers and save their states

  drawers.forEach(function (el) {
    if (hasClass(el, settings.classModal)) return;
    var drawerKey = el.getAttribute("data-".concat(settings.dataDrawer));
    state[drawerKey] = hasClass(el, settings.stateOpened) ? settings.stateOpened : settings.stateClosed;
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Drawer = /*#__PURE__*/function () {
  function Drawer(options) {
    classCallCheck(this, Drawer);

    this.defaults = defaults;
    this.settings = _objectSpread(_objectSpread({}, this.defaults), options);
    this.working = false;
    this.memory = {};
    this.state = {};
    this.focusTrap = new FocusTrap();
    this.breakpoint = new Breakpoint(this);
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  createClass(Drawer, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (options) this.settings = _objectSpread(_objectSpread({}, this.settings), options);
      this.stateSet();
      this.setTabindex(this.settings.setTabindex);
      this.breakpoint.init();
      document.addEventListener('click', this.__handlerClick, false);
      document.addEventListener('touchend', this.__handlerClick, false);
      document.addEventListener('keyup', this.__handlerKeyup, false);
    }
  }, {
    key: "destroy",
    value: function destroy() {
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

  }, {
    key: "getDrawer",
    value: function getDrawer(drawerKey) {
      if (typeof drawerKey !== 'string') return drawerKey;
      return document.querySelector("[data-".concat(this.settings.dataDrawer, "=\"").concat(drawerKey, "\"]"));
    }
  }, {
    key: "drawerNotFound",
    value: function drawerNotFound(key) {
      return Promise.reject(new Error("Did not find drawer with key: \"".concat(key, "\"")));
    }
  }, {
    key: "setTabindex",
    value: function setTabindex$1() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var selectorTabindex = "\n      [data-".concat(this.settings.dataDrawer, "]\n      [data-").concat(this.settings.dataDialog, "]\n    ");

      setTabindex(state, selectorTabindex);
    }
    /**
     * Save state functionality
     */

  }, {
    key: "stateSet",
    value: function stateSet$1() {
      this.state = stateSet(this.settings);
    }
  }, {
    key: "stateSave",
    value: function stateSave$1() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.state = stateSave(target, this.settings);
    }
  }, {
    key: "stateClear",
    value: function stateClear$1() {
      this.state = stateClear(this.settings);
    }
    /**
     * SwitchTo functionality
     */

  }, {
    key: "switchToDefault",
    value: function switchToDefault$1(drawerKey) {
      return switchToDefault(drawerKey, this);
    }
  }, {
    key: "switchToModal",
    value: function switchToModal$1(drawerKey) {
      return switchToModal(drawerKey, this);
    }
    /**
     * Change state functionality
     */

  }, {
    key: "toggle",
    value: function () {
      var _toggle = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(drawerKey) {
        var drawer, isOpen;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                drawer = this.getDrawer(drawerKey);

                if (drawer) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", this.drawerNotFound(drawerKey));

              case 3:
                isOpen = hasClass(drawer, this.settings.stateOpened);

                if (isOpen) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", this.open(drawer));

              case 8:
                return _context.abrupt("return", this.close(drawer));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toggle(_x) {
        return _toggle.apply(this, arguments);
      }

      return toggle;
    }()
  }, {
    key: "open",
    value: function () {
      var _open = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(drawerKey) {
        var drawer, isModal;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                drawer = this.getDrawer(drawerKey);

                if (drawer) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", this.drawerNotFound(drawerKey));

              case 3:
                if (hasClass(drawer, this.settings.stateOpened)) {
                  _context2.next = 17;
                  break;
                }

                this.working = true;
                isModal = hasClass(drawer, this.settings.classModal);

                if (isModal) {
                  setOverflowHidden(true, this.settings.selectorOverflow);
                }

                _context2.next = 9;
                return openTransition(drawer, this.settings);

              case 9:
                this.stateSave(drawer);

                if (isModal) {
                  this.focusTrap.init(drawer);
                  setInert(true, this.settings.selectorInert);
                }

                focusTarget(drawer, this.settings);
                drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
                  bubbles: true
                }));
                this.working = false;
                return _context2.abrupt("return", drawer);

              case 17:
                focusTarget(drawer, this.settings);
                return _context2.abrupt("return", drawer);

              case 19:
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
      var _close = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(drawerKey) {
        var drawer;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                drawer = this.getDrawer(drawerKey);

                if (drawer) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", this.drawerNotFound(drawerKey));

              case 3:
                if (!hasClass(drawer, this.settings.stateOpened)) {
                  _context3.next = 16;
                  break;
                }

                this.working = true;

                if (hasClass(drawer, this.settings.classModal)) {
                  setInert(false, this.settings.selectorInert);
                  setOverflowHidden(false, this.settings.selectorOverflow);
                }

                _context3.next = 8;
                return closeTransition(drawer, this.settings);

              case 8:
                this.stateSave(drawer);
                focusTrigger(this);
                this.focusTrap.destroy();
                drawer.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
                  bubbles: true
                }));
                this.working = false;
                return _context3.abrupt("return", drawer);

              case 16:
                return _context3.abrupt("return", drawer);

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function close(_x3) {
        return _close.apply(this, arguments);
      }

      return close;
    }()
  }]);

  return Drawer;
}();

export default Drawer;
