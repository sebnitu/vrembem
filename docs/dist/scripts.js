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
   * Get an element(s) from a selector or return value if not a string
   * ---
   * @param {String} selector - Selector to query
   * @param {Boolean} single - Whether to return a single or all matches
   */


  var getElement = function getElement(selector) {
    var single = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (typeof selector != 'string') return selector;
    return single ? document.querySelector(selector) : document.querySelectorAll(selector);
  };
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
   * Moves element(s) in the DOM based on a reference and move type
   * ---
   * @param {String} target - The element(s) to move
   * @param {String} type - Move type can be 'after', 'before', 'append' or 'prepend'
   * @param {String} reference - The reference element the move is relative to
   */


  function moveElement(target, type) {
    var reference = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (reference) {
      var els = getElement(target);
      if (!els.length) throw new Error("Move target element \"".concat(target, "\" not found!"));
      var ref = getElement(reference, 1);
      if (!ref) throw new Error("Move reference element \"".concat(reference, "\" not found!"));
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
            throw new Error("Move type \"".concat(type, "\" does not exist!"));
        }
      });
    }
  }
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

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var Checkbox = /*#__PURE__*/function () {
    function Checkbox(options) {
      classCallCheck(this, Checkbox);
      this.defaults = {
        autoInit: false,
        stateAttr: 'aria-checked',
        stateValue: 'mixed'
      };
      this.settings = _objectSpread(_objectSpread({}, this.defaults), options);
      this.__handlerClick = this.handlerClick.bind(this);
      if (this.settings.autoInit) this.init();
    }

    createClass(Checkbox, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (options) this.settings = _objectSpread(_objectSpread({}, this.settings), options);
        var selector = "[".concat(this.settings.stateAttr, "=\"").concat(this.settings.stateValue, "\"]");
        var mixed = document.querySelectorAll(selector);
        this.setIndeterminate(mixed);
        document.addEventListener('click', this.__handlerClick, false);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        document.removeEventListener('click', this.__handlerClick, false);
      }
    }, {
      key: "handlerClick",
      value: function handlerClick(event) {
        var selector = "[".concat(this.settings.stateAttr, "=\"").concat(this.settings.stateValue, "\"]");
        var el = event.target.closest(selector);
        if (!el) return;
        this.removeAriaState(el);
        this.setIndeterminate(el);
      }
    }, {
      key: "setAriaState",
      value: function setAriaState(el) {
        var _this = this;

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.settings.stateValue;
        el = el.forEach ? el : [el];
        el.forEach(function (el) {
          el.setAttribute(_this.settings.stateAttr, value);
        });
      }
    }, {
      key: "removeAriaState",
      value: function removeAriaState(el) {
        var _this2 = this;

        el = el.forEach ? el : [el];
        el.forEach(function (el) {
          el.removeAttribute(_this2.settings.stateAttr);
        });
      }
    }, {
      key: "setIndeterminate",
      value: function setIndeterminate(el) {
        var _this3 = this;

        el = el.forEach ? el : [el];
        el.forEach(function (el) {
          if (el.hasAttribute(_this3.settings.stateAttr)) {
            el.indeterminate = true;
          } else {
            el.indeterminate = false;
          }
        });
      }
    }]);
    return Checkbox;
  }();

  function createCommonjsModule(fn, basedir, module) {
    return module = {
      path: basedir,
      exports: {},
      require: function require(path, base) {
        return commonjsRequire(path, base === undefined || base === null ? module.path : base);
      }
    }, fn(module, module.exports), module.exports;
  }

  function commonjsRequire() {
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
    module.exports);

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

  function ownKeys$1(object, enumerableOnly) {
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

  function _objectSpread$1(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$1(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$1(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var Drawer = /*#__PURE__*/function () {
    function Drawer(options) {
      classCallCheck(this, Drawer);
      this.defaults = defaults;
      this.settings = _objectSpread$1(_objectSpread$1({}, this.defaults), options);
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
        if (options) this.settings = _objectSpread$1(_objectSpread$1({}, this.settings), options);
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

  var defaults$1 = {
    autoInit: false,
    // Data attributes
    dataModal: 'modal',
    dataDialog: 'modal-dialog',
    dataOpen: 'modal-open',
    dataClose: 'modal-close',
    dataFocus: 'modal-focus',
    dataRequired: 'modal-required',
    // State classes
    stateOpened: 'is-opened',
    stateOpening: 'is-opening',
    stateClosing: 'is-closing',
    stateClosed: 'is-closed',
    // Selector
    selectorInert: null,
    selectorOverflow: 'body',
    // Feature toggles
    customEventPrefix: 'modal:',
    moveModals: {
      ref: null,
      type: null
    },
    setTabindex: true,
    transition: true
  };

  function handlerClick$1(_x) {
    return _handlerClick.apply(this, arguments);
  }

  function _handlerClick() {
    _handlerClick = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(event) {
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
              // Trigger click
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
    return _handlerClick.apply(this, arguments);
  }

  function handlerKeyup$1(event) {
    // Working catch
    if (this.working) return;

    if (event.key === 'Escape' || event.keyCode === 27) {
      var target = document.querySelector("[data-".concat(this.settings.dataModal, "].").concat(this.settings.stateOpened));

      if (target && !target.hasAttribute("data-".concat(this.settings.dataRequired))) {
        this.close();
      }
    }
  }

  function setInitialState(obj) {
    var modals = document.querySelectorAll("[data-".concat(obj.settings.dataModal, "]"));
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

  function ownKeys$2(object, enumerableOnly) {
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

  function _objectSpread$2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys$2(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$2(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var Modal = /*#__PURE__*/function () {
    function Modal(options) {
      classCallCheck(this, Modal);
      this.defaults = defaults$1;
      this.settings = _objectSpread$2(_objectSpread$2({}, this.defaults), options);
      this.working = false;
      this.memory = {};
      this.focusTrap = new FocusTrap();
      this.__handlerClick = handlerClick$1.bind(this);
      this.__handlerKeyup = handlerKeyup$1.bind(this);
      if (this.settings.autoInit) this.init();
    }

    createClass(Modal, [{
      key: "init",
      value: function init() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (options) this.settings = _objectSpread$2(_objectSpread$2({}, this.settings), options);
        this.moveModals();
        this.setTabindex(this.settings.setTabindex);
        this.setInitialState();
        document.addEventListener('click', this.__handlerClick, false);
        document.addEventListener('touchend', this.__handlerClick, false);
        document.addEventListener('keyup', this.__handlerKeyup, false);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.memory = {};
        document.removeEventListener('click', this.__handlerClick, false);
        document.removeEventListener('touchend', this.__handlerClick, false);
        document.removeEventListener('keyup', this.__handlerKeyup, false);
      }
      /**
       * Helpers
       */

    }, {
      key: "getModal",
      value: function getModal(modalKey) {
        if (typeof modalKey !== 'string') return modalKey;
        return document.querySelector("[data-".concat(this.settings.dataModal, "=\"").concat(modalKey, "\"]"));
      }
    }, {
      key: "modalNotFound",
      value: function modalNotFound(key) {
        return Promise.reject(new Error("Did not find modal with key: \"".concat(key, "\"")));
      }
    }, {
      key: "setTabindex",
      value: function setTabindex$1() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var selectorTabindex = "\n      [data-".concat(this.settings.dataModal, "]\n      [data-").concat(this.settings.dataDialog, "]\n    ");
        setTabindex(state, selectorTabindex);
      }
    }, {
      key: "setInitialState",
      value: function setInitialState$1() {
        setInitialState(this);
      }
    }, {
      key: "moveModals",
      value: function moveModals() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.settings.moveModals.type;
        var ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.settings.moveModals.ref;
        var modals = document.querySelectorAll("[data-".concat(this.settings.dataModal, "]"));
        if (modals.length) moveElement(modals, type, ref);
      }
      /**
       * Change state functionality
       */

    }, {
      key: "open",
      value: function () {
        var _open = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(modalKey) {
          var modal;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  modal = this.getModal(modalKey);

                  if (modal) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return", this.modalNotFound(modalKey));

                case 3:
                  if (!hasClass(modal, this.settings.stateClosed)) {
                    _context.next = 16;
                    break;
                  }

                  this.working = true;
                  setOverflowHidden(true, this.settings.selectorOverflow);
                  _context.next = 8;
                  return openTransition(modal, this.settings);

                case 8:
                  this.focusTrap.init(modal);
                  focusTarget(modal, this.settings);
                  setInert(true, this.settings.selectorInert);
                  modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'opened', {
                    bubbles: true
                  }));
                  this.working = false;
                  return _context.abrupt("return", modal);

                case 16:
                  return _context.abrupt("return", modal);

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function open(_x) {
          return _open.apply(this, arguments);
        }

        return open;
      }()
    }, {
      key: "close",
      value: function () {
        var _close = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
          var returnFocus,
              modal,
              _args2 = arguments;
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  returnFocus = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : true;
                  modal = document.querySelector("[data-".concat(this.settings.dataModal, "].").concat(this.settings.stateOpened));

                  if (!modal) {
                    _context2.next = 15;
                    break;
                  }

                  this.working = true;
                  setInert(false, this.settings.selectorInert);
                  setOverflowHidden(false, this.settings.selectorOverflow);
                  _context2.next = 8;
                  return closeTransition(modal, this.settings);

                case 8:
                  if (returnFocus) focusTrigger(this);
                  this.focusTrap.destroy();
                  modal.dispatchEvent(new CustomEvent(this.settings.customEventPrefix + 'closed', {
                    bubbles: true
                  }));
                  this.working = false;
                  return _context2.abrupt("return", modal);

                case 15:
                  return _context2.abrupt("return", modal);

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function close() {
          return _close.apply(this, arguments);
        }

        return close;
      }()
    }]);
    return Modal;
  }();

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty$1(obj, key, value) {
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

  function ownKeys$3(object, enumerableOnly) {
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
        ownKeys$3(Object(source), true).forEach(function (key) {
          _defineProperty$1(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys$3(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var defaults$2 = {
    autoInit: false,
    dataScroll: 'scroll-stash',
    dataAnchor: 'scroll-stash-anchor',
    selectorAnchor: '',
    selectorAnchorParent: '',
    selectorTopElem: '',
    selectorBotElem: '',
    alignment: 'nearest',
    // start | end | nearest
    behavior: 'auto',
    // auto | smooth
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
    var dataAnchor = el.getAttribute("data-".concat(settings.dataAnchor));

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
            key: el.getAttribute("data-".concat(settings.dataScroll))
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

  var stateSave$1 = function stateSave(settings) {
    var state = {};
    var scrolls = document.querySelectorAll("[data-".concat(settings.dataScroll, "]"));
    scrolls.forEach(function (el) {
      var id = el.getAttribute("data-".concat(settings.dataScroll));
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

  var stateSet$1 = function stateSet(settings) {
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

  var ScrollStash = /*#__PURE__*/function () {
    function ScrollStash(options) {
      _classCallCheck$1(this, ScrollStash);

      this.settings = _objectSpread2(_objectSpread2({}, defaults$2), options);
      this.state = {};
      this.scrolls = [];
      this.ticking = false;
      this.handlerRef = this.handler.bind(this);
      if (this.settings.autoInit) this.init();
    }

    _createClass$1(ScrollStash, [{
      key: "init",
      value: function init() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (options) this.settings = _objectSpread2(_objectSpread2({}, this.settings), options);
        this.state = stateSet$1(this.settings);
        this.state = !Object.keys(this.state).length ? stateSave$1(this.settings) : this.state;
        this.scrolls = document.querySelectorAll("[data-".concat(this.settings.dataScroll, "]"));
        this.scrolls.forEach(function (item) {
          item.addEventListener('scroll', _this.handlerRef);
          anchorShow(item, false, _this.settings);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this2 = this;

        this.scrolls.forEach(function (item) {
          item.removeEventListener('scroll', _this2.handlerRef);
        });
        this.state = {};
        this.scrolls = [];
        localStorage.removeItem(this.settings.saveKey);
      }
    }, {
      key: "handler",
      value: function handler() {
        var _this3 = this;

        if (this.ticking) return;
        this.ticking = true;
        setTimeout(function () {
          _this3.state = stateSave$1(_this3.settings);
          _this3.ticking = false;
        }, this.settings.throttleDelay);
      }
    }, {
      key: "anchorGet",
      value: function anchorGet$1(el) {
        return anchorGet(el, this.settings);
      }
    }, {
      key: "anchorShow",
      value: function anchorShow$1(el, behavior) {
        return anchorShow(el, behavior, this.settings);
      }
    }]);

    return ScrollStash;
  }();

  /*!
   * @copyright Copyright (c) 2017 IcoMoon.io
   * @license   Licensed under MIT license
   *            See https://github.com/Keyamoon/svgxuse
   * @version   1.2.6
   */

  /*jslint browser: true */

  /*global XDomainRequest, MutationObserver, window */
  (function () {

    if (typeof window !== "undefined" && window.addEventListener) {
      var cache = Object.create(null); // holds xhr objects to prevent multiple requests

      var checkUseElems;
      var tid; // timeout id

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
        // In IE 9, cross origin requests can only be sent using XDomainRequest.
        // XDomainRequest would fail if CORS headers are not set.
        // Therefore, XDomainRequest should only be used with cross origin requests.
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
          // If done with making changes, start watching for chagnes in DOM again
          inProgressCount -= 1;

          if (inProgressCount === 0) {
            // if all xhrs were resolved
            unobserveChanges(); // make sure to remove old handlers

            observeChanges(); // watch for changes to DOM
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

        unobserveChanges(); // stop watching for changes to DOM
        // find all use elements

        uses = document.getElementsByTagName("use");

        for (i = 0; i < uses.length; i += 1) {
          try {
            bcr = uses[i].getBoundingClientRect();
          } catch (ignore) {
            // failed to get bounding rectangle of the use element
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
              // schedule updating xlink:href
              xhr = cache[base];

              if (xhr !== true) {
                // true signifies that prepending the SVG was not required
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
                // remember this URL if the use element was not empty and no request was sent
                cache[base] = true;
              } else if (cache[base].onload) {
                // if it turns out that prepending the SVG is not necessary,
                // abort the in-progress xhr.
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
        window.removeEventListener("load", _winLoad, false); // to prevent memory leaks

        tid = setTimeout(checkUseElems, 0);
      };

      if (document.readyState !== "complete") {
        // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
        window.addEventListener("load", _winLoad, false);
      } else {
        // No need to add a listener if the document is already loaded, initialize immediately.
        _winLoad();
      }
    }
  })();

  /**
   * This work is licensed under the W3C Software and Document License
   * (http://www.w3.org/Consortium/Legal/2015/copyright-software-and-document).
   */
  (function () {
    // Return early if we're not running inside of the browser.
    if (typeof window === 'undefined') {
      return;
    } // Convenience function for converting NodeLists.

    /** @type {typeof Array.prototype.slice} */


    var slice = Array.prototype.slice;
    /**
     * IE has a non-standard name for "matches".
     * @type {typeof Element.prototype.matches}
     */

    var matches = Element.prototype.matches || Element.prototype.msMatchesSelector;
    /** @type {string} */

    var _focusableElementsString = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'details', 'summary', 'iframe', 'object', 'embed', '[contenteditable]'].join(',');
    /**
     * `InertRoot` manages a single inert subtree, i.e. a DOM subtree whose root element has an `inert`
     * attribute.
     *
     * Its main functions are:
     *
     * - to create and maintain a set of managed `InertNode`s, including when mutations occur in the
     *   subtree. The `makeSubtreeUnfocusable()` method handles collecting `InertNode`s via registering
     *   each focusable node in the subtree with the singleton `InertManager` which manages all known
     *   focusable nodes within inert subtrees. `InertManager` ensures that a single `InertNode`
     *   instance exists for each focusable node which has at least one inert root as an ancestor.
     *
     * - to notify all managed `InertNode`s when this subtree stops being inert (i.e. when the `inert`
     *   attribute is removed from the root node). This is handled in the destructor, which calls the
     *   `deregister` method on `InertManager` for each managed inert node.
     */


    class InertRoot {
      /**
       * @param {!Element} rootElement The Element at the root of the inert subtree.
       * @param {!InertManager} inertManager The global singleton InertManager object.
       */
      constructor(rootElement, inertManager) {
        /** @type {!InertManager} */
        this._inertManager = inertManager;
        /** @type {!Element} */

        this._rootElement = rootElement;
        /**
         * @type {!Set<!InertNode>}
         * All managed focusable nodes in this InertRoot's subtree.
         */

        this._managedNodes = new Set(); // Make the subtree hidden from assistive technology

        if (this._rootElement.hasAttribute('aria-hidden')) {
          /** @type {?string} */
          this._savedAriaHidden = this._rootElement.getAttribute('aria-hidden');
        } else {
          this._savedAriaHidden = null;
        }

        this._rootElement.setAttribute('aria-hidden', 'true'); // Make all focusable elements in the subtree unfocusable and add them to _managedNodes


        this._makeSubtreeUnfocusable(this._rootElement); // Watch for:
        // - any additions in the subtree: make them unfocusable too
        // - any removals from the subtree: remove them from this inert root's managed nodes
        // - attribute changes: if `tabindex` is added, or removed from an intrinsically focusable
        //   element, make that node a managed node.


        this._observer = new MutationObserver(this._onMutation.bind(this));

        this._observer.observe(this._rootElement, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }
      /**
       * Call this whenever this object is about to become obsolete.  This unwinds all of the state
       * stored in this object and updates the state of all of the managed nodes.
       */


      destructor() {
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
        }, this); // Note we cast the nulls to the ANY type here because:
        // 1) We want the class properties to be declared as non-null, or else we
        //    need even more casts throughout this code. All bets are off if an
        //    instance has been destroyed and a method is called.
        // 2) We don't want to cast "this", because we want type-aware optimizations
        //    to know which properties we're setting.


        this._observer =
        /** @type {?} */
        null;
        this._rootElement =
        /** @type {?} */
        null;
        this._managedNodes =
        /** @type {?} */
        null;
        this._inertManager =
        /** @type {?} */
        null;
      }
      /**
       * @return {!Set<!InertNode>} A copy of this InertRoot's managed nodes set.
       */


      get managedNodes() {
        return new Set(this._managedNodes);
      }
      /** @return {boolean} */


      get hasSavedAriaHidden() {
        return this._savedAriaHidden !== null;
      }
      /** @param {?string} ariaHidden */


      set savedAriaHidden(ariaHidden) {
        this._savedAriaHidden = ariaHidden;
      }
      /** @return {?string} */


      get savedAriaHidden() {
        return this._savedAriaHidden;
      }
      /**
       * @param {!Node} startNode
       */


      _makeSubtreeUnfocusable(startNode) {
        composedTreeWalk(startNode, node => this._visitNode(node));
        var activeElement = document.activeElement;

        if (!document.body.contains(startNode)) {
          // startNode may be in shadow DOM, so find its nearest shadowRoot to get the activeElement.
          var node = startNode;
          /** @type {!ShadowRoot|undefined} */

          var root = undefined;

          while (node) {
            if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
              root =
              /** @type {!ShadowRoot} */
              node;
              break;
            }

            node = node.parentNode;
          }

          if (root) {
            activeElement = root.activeElement;
          }
        }

        if (startNode.contains(activeElement)) {
          activeElement.blur(); // In IE11, if an element is already focused, and then set to tabindex=-1
          // calling blur() will not actually move the focus.
          // To work around this we call focus() on the body instead.

          if (activeElement === document.activeElement) {
            document.body.focus();
          }
        }
      }
      /**
       * @param {!Node} node
       */


      _visitNode(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }

        var element =
        /** @type {!Element} */
        node; // If a descendant inert root becomes un-inert, its descendants will still be inert because of
        // this inert root, so all of its managed nodes need to be adopted by this InertRoot.

        if (element !== this._rootElement && element.hasAttribute('inert')) {
          this._adoptInertRoot(element);
        }

        if (matches.call(element, _focusableElementsString) || element.hasAttribute('tabindex')) {
          this._manageNode(element);
        }
      }
      /**
       * Register the given node with this InertRoot and with InertManager.
       * @param {!Node} node
       */


      _manageNode(node) {
        var inertNode = this._inertManager.register(node, this);

        this._managedNodes.add(inertNode);
      }
      /**
       * Unregister the given node with this InertRoot and with InertManager.
       * @param {!Node} node
       */


      _unmanageNode(node) {
        var inertNode = this._inertManager.deregister(node, this);

        if (inertNode) {
          this._managedNodes.delete(inertNode);
        }
      }
      /**
       * Unregister the entire subtree starting at `startNode`.
       * @param {!Node} startNode
       */


      _unmanageSubtree(startNode) {
        composedTreeWalk(startNode, node => this._unmanageNode(node));
      }
      /**
       * If a descendant node is found with an `inert` attribute, adopt its managed nodes.
       * @param {!Element} node
       */


      _adoptInertRoot(node) {
        var inertSubroot = this._inertManager.getInertRoot(node); // During initialisation this inert root may not have been registered yet,
        // so register it now if need be.


        if (!inertSubroot) {
          this._inertManager.setInert(node, true);

          inertSubroot = this._inertManager.getInertRoot(node);
        }

        inertSubroot.managedNodes.forEach(function (savedInertNode) {
          this._manageNode(savedInertNode.node);
        }, this);
      }
      /**
       * Callback used when mutation observer detects subtree additions, removals, or attribute changes.
       * @param {!Array<!MutationRecord>} records
       * @param {!MutationObserver} self
       */


      _onMutation(records, self) {
        records.forEach(function (record) {
          var target =
          /** @type {!Element} */
          record.target;

          if (record.type === 'childList') {
            // Manage added nodes
            slice.call(record.addedNodes).forEach(function (node) {
              this._makeSubtreeUnfocusable(node);
            }, this); // Un-manage removed nodes

            slice.call(record.removedNodes).forEach(function (node) {
              this._unmanageSubtree(node);
            }, this);
          } else if (record.type === 'attributes') {
            if (record.attributeName === 'tabindex') {
              // Re-initialise inert node if tabindex changes
              this._manageNode(target);
            } else if (target !== this._rootElement && record.attributeName === 'inert' && target.hasAttribute('inert')) {
              // If a new inert root is added, adopt its managed nodes and make sure it knows about the
              // already managed nodes from this inert subroot.
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

    }
    /**
     * `InertNode` initialises and manages a single inert node.
     * A node is inert if it is a descendant of one or more inert root elements.
     *
     * On construction, `InertNode` saves the existing `tabindex` value for the node, if any, and
     * either removes the `tabindex` attribute or sets it to `-1`, depending on whether the element
     * is intrinsically focusable or not.
     *
     * `InertNode` maintains a set of `InertRoot`s which are descendants of this `InertNode`. When an
     * `InertRoot` is destroyed, and calls `InertManager.deregister()`, the `InertManager` notifies the
     * `InertNode` via `removeInertRoot()`, which in turn destroys the `InertNode` if no `InertRoot`s
     * remain in the set. On destruction, `InertNode` reinstates the stored `tabindex` if one exists,
     * or removes the `tabindex` attribute if the element is intrinsically focusable.
     */


    class InertNode {
      /**
       * @param {!Node} node A focusable element to be made inert.
       * @param {!InertRoot} inertRoot The inert root element associated with this inert node.
       */
      constructor(node, inertRoot) {
        /** @type {!Node} */
        this._node = node;
        /** @type {boolean} */

        this._overrodeFocusMethod = false;
        /**
         * @type {!Set<!InertRoot>} The set of descendant inert roots.
         *    If and only if this set becomes empty, this node is no longer inert.
         */

        this._inertRoots = new Set([inertRoot]);
        /** @type {?number} */

        this._savedTabIndex = null;
        /** @type {boolean} */

        this._destroyed = false; // Save any prior tabindex info and make this node untabbable

        this.ensureUntabbable();
      }
      /**
       * Call this whenever this object is about to become obsolete.
       * This makes the managed node focusable again and deletes all of the previously stored state.
       */


      destructor() {
        this._throwIfDestroyed();

        if (this._node && this._node.nodeType === Node.ELEMENT_NODE) {
          var element =
          /** @type {!Element} */
          this._node;

          if (this._savedTabIndex !== null) {
            element.setAttribute('tabindex', this._savedTabIndex);
          } else {
            element.removeAttribute('tabindex');
          } // Use `delete` to restore native focus method.


          if (this._overrodeFocusMethod) {
            delete element.focus;
          }
        } // See note in InertRoot.destructor for why we cast these nulls to ANY.


        this._node =
        /** @type {?} */
        null;
        this._inertRoots =
        /** @type {?} */
        null;
        this._destroyed = true;
      }
      /**
       * @type {boolean} Whether this object is obsolete because the managed node is no longer inert.
       * If the object has been destroyed, any attempt to access it will cause an exception.
       */


      get destroyed() {
        return (
          /** @type {!InertNode} */
          this._destroyed
        );
      }
      /**
       * Throw if user tries to access destroyed InertNode.
       */


      _throwIfDestroyed() {
        if (this.destroyed) {
          throw new Error('Trying to access destroyed InertNode');
        }
      }
      /** @return {boolean} */


      get hasSavedTabIndex() {
        return this._savedTabIndex !== null;
      }
      /** @return {!Node} */


      get node() {
        this._throwIfDestroyed();

        return this._node;
      }
      /** @param {?number} tabIndex */


      set savedTabIndex(tabIndex) {
        this._throwIfDestroyed();

        this._savedTabIndex = tabIndex;
      }
      /** @return {?number} */


      get savedTabIndex() {
        this._throwIfDestroyed();

        return this._savedTabIndex;
      }
      /** Save the existing tabindex value and make the node untabbable and unfocusable */


      ensureUntabbable() {
        if (this.node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }

        var element =
        /** @type {!Element} */
        this.node;

        if (matches.call(element, _focusableElementsString)) {
          if (
          /** @type {!HTMLElement} */
          element.tabIndex === -1 && this.hasSavedTabIndex) {
            return;
          }

          if (element.hasAttribute('tabindex')) {
            this._savedTabIndex =
            /** @type {!HTMLElement} */
            element.tabIndex;
          }

          element.setAttribute('tabindex', '-1');

          if (element.nodeType === Node.ELEMENT_NODE) {
            element.focus = function () {};

            this._overrodeFocusMethod = true;
          }
        } else if (element.hasAttribute('tabindex')) {
          this._savedTabIndex =
          /** @type {!HTMLElement} */
          element.tabIndex;
          element.removeAttribute('tabindex');
        }
      }
      /**
       * Add another inert root to this inert node's set of managing inert roots.
       * @param {!InertRoot} inertRoot
       */


      addInertRoot(inertRoot) {
        this._throwIfDestroyed();

        this._inertRoots.add(inertRoot);
      }
      /**
       * Remove the given inert root from this inert node's set of managing inert roots.
       * If the set of managing inert roots becomes empty, this node is no longer inert,
       * so the object should be destroyed.
       * @param {!InertRoot} inertRoot
       */


      removeInertRoot(inertRoot) {
        this._throwIfDestroyed();

        this._inertRoots.delete(inertRoot);

        if (this._inertRoots.size === 0) {
          this.destructor();
        }
      }

    }
    /**
     * InertManager is a per-document singleton object which manages all inert roots and nodes.
     *
     * When an element becomes an inert root by having an `inert` attribute set and/or its `inert`
     * property set to `true`, the `setInert` method creates an `InertRoot` object for the element.
     * The `InertRoot` in turn registers itself as managing all of the element's focusable descendant
     * nodes via the `register()` method. The `InertManager` ensures that a single `InertNode` instance
     * is created for each such node, via the `_managedNodes` map.
     */


    class InertManager {
      /**
       * @param {!Document} document
       */
      constructor(document) {
        if (!document) {
          throw new Error('Missing required argument; InertManager needs to wrap a document.');
        }
        /** @type {!Document} */


        this._document = document;
        /**
         * All managed nodes known to this InertManager. In a map to allow looking up by Node.
         * @type {!Map<!Node, !InertNode>}
         */

        this._managedNodes = new Map();
        /**
         * All inert roots known to this InertManager. In a map to allow looking up by Node.
         * @type {!Map<!Node, !InertRoot>}
         */

        this._inertRoots = new Map();
        /**
         * Observer for mutations on `document.body`.
         * @type {!MutationObserver}
         */

        this._observer = new MutationObserver(this._watchForInert.bind(this)); // Add inert style.

        addInertStyle(document.head || document.body || document.documentElement); // Wait for document to be loaded.

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', this._onDocumentLoaded.bind(this));
        } else {
          this._onDocumentLoaded();
        }
      }
      /**
       * Set whether the given element should be an inert root or not.
       * @param {!Element} root
       * @param {boolean} inert
       */


      setInert(root, inert) {
        if (inert) {
          if (this._inertRoots.has(root)) {
            // element is already inert
            return;
          }

          var inertRoot = new InertRoot(root, this);
          root.setAttribute('inert', '');

          this._inertRoots.set(root, inertRoot); // If not contained in the document, it must be in a shadowRoot.
          // Ensure inert styles are added there.


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
            // element is already non-inert
            return;
          }

          var _inertRoot = this._inertRoots.get(root);

          _inertRoot.destructor();

          this._inertRoots.delete(root);

          root.removeAttribute('inert');
        }
      }
      /**
       * Get the InertRoot object corresponding to the given inert root element, if any.
       * @param {!Node} element
       * @return {!InertRoot|undefined}
       */


      getInertRoot(element) {
        return this._inertRoots.get(element);
      }
      /**
       * Register the given InertRoot as managing the given node.
       * In the case where the node has a previously existing inert root, this inert root will
       * be added to its set of inert roots.
       * @param {!Node} node
       * @param {!InertRoot} inertRoot
       * @return {!InertNode} inertNode
       */


      register(node, inertRoot) {
        var inertNode = this._managedNodes.get(node);

        if (inertNode !== undefined) {
          // node was already in an inert subtree
          inertNode.addInertRoot(inertRoot);
        } else {
          inertNode = new InertNode(node, inertRoot);
        }

        this._managedNodes.set(node, inertNode);

        return inertNode;
      }
      /**
       * De-register the given InertRoot as managing the given inert node.
       * Removes the inert root from the InertNode's set of managing inert roots, and remove the inert
       * node from the InertManager's set of managed nodes if it is destroyed.
       * If the node is not currently managed, this is essentially a no-op.
       * @param {!Node} node
       * @param {!InertRoot} inertRoot
       * @return {?InertNode} The potentially destroyed InertNode associated with this node, if any.
       */


      deregister(node, inertRoot) {
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
      /**
       * Callback used when document has finished loading.
       */


      _onDocumentLoaded() {
        // Find all inert roots in document and make them actually inert.
        var inertElements = slice.call(this._document.querySelectorAll('[inert]'));
        inertElements.forEach(function (inertElement) {
          this.setInert(inertElement, true);
        }, this); // Comment this out to use programmatic API only.

        this._observer.observe(this._document.body || this._document.documentElement, {
          attributes: true,
          subtree: true,
          childList: true
        });
      }
      /**
       * Callback used when mutation observer detects attribute changes.
       * @param {!Array<!MutationRecord>} records
       * @param {!MutationObserver} self
       */


      _watchForInert(records, self) {
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

              var target =
              /** @type {!Element} */
              record.target;
              var inert = target.hasAttribute('inert');

              _this.setInert(target, inert);

              break;
          }
        }, this);
      }

    }
    /**
     * Recursively walk the composed tree from |node|.
     * @param {!Node} node
     * @param {(function (!Element))=} callback Callback to be called for each element traversed,
     *     before descending into child nodes.
     * @param {?ShadowRoot=} shadowRootAncestor The nearest ShadowRoot ancestor, if any.
     */


    function composedTreeWalk(node, callback, shadowRootAncestor) {
      if (node.nodeType == Node.ELEMENT_NODE) {
        var element =
        /** @type {!Element} */
        node;

        if (callback) {
          callback(element);
        } // Descend into node:
        // If it has a ShadowRoot, ignore all child elements - these will be picked
        // up by the <content> or <shadow> elements. Descend straight into the
        // ShadowRoot.


        var shadowRoot =
        /** @type {!HTMLElement} */
        element.shadowRoot;

        if (shadowRoot) {
          composedTreeWalk(shadowRoot, callback);
          return;
        } // If it is a <content> element, descend into distributed elements - these
        // are elements from outside the shadow root which are rendered inside the
        // shadow DOM.


        if (element.localName == 'content') {
          var content =
          /** @type {!HTMLContentElement} */
          element; // Verifies if ShadowDom v0 is supported.

          var distributedNodes = content.getDistributedNodes ? content.getDistributedNodes() : [];

          for (var i = 0; i < distributedNodes.length; i++) {
            composedTreeWalk(distributedNodes[i], callback);
          }

          return;
        } // If it is a <slot> element, descend into assigned nodes - these
        // are elements from outside the shadow root which are rendered inside the
        // shadow DOM.


        if (element.localName == 'slot') {
          var slot =
          /** @type {!HTMLSlotElement} */
          element; // Verify if ShadowDom v1 is supported.

          var _distributedNodes = slot.assignedNodes ? slot.assignedNodes({
            flatten: true
          }) : [];

          for (var _i = 0; _i < _distributedNodes.length; _i++) {
            composedTreeWalk(_distributedNodes[_i], callback);
          }

          return;
        }
      } // If it is neither the parent of a ShadowRoot, a <content> element, a <slot>
      // element, nor a <shadow> element recurse normally.


      var child = node.firstChild;

      while (child != null) {
        composedTreeWalk(child, callback);
        child = child.nextSibling;
      }
    }
    /**
     * Adds a style element to the node containing the inert specific styles
     * @param {!Node} node
     */


    function addInertStyle(node) {
      if (node.querySelector('style#inert-style, link#inert-style')) {
        return;
      }

      var style = document.createElement('style');
      style.setAttribute('id', 'inert-style');
      style.textContent = '\n' + '[inert] {\n' + '  pointer-events: none;\n' + '  cursor: default;\n' + '}\n' + '\n' + '[inert], [inert] * {\n' + '  -webkit-user-select: none;\n' + '  -moz-user-select: none;\n' + '  -ms-user-select: none;\n' + '  user-select: none;\n' + '}\n';
      node.appendChild(style);
    }
    /** @type {!InertManager} */


    var inertManager = new InertManager(document);

    if (!Element.prototype.hasOwnProperty('inert')) {
      Object.defineProperty(Element.prototype, 'inert', {
        enumerable: true,

        /** @this {!Element} */
        get: function get() {
          return this.hasAttribute('inert');
        },

        /** @this {!Element} */
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

        var difference = numEndA - numStartA - numEndB + numStartB; // numA length - numB length

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

  /**
   * A cross-browser implementation of getElementsByClass.
   * Heavily based on Dustin Diaz's function: http://dustindiaz.com/getelementsbyclass.
   *
   * Find all elements with class `className` inside `container`.
   * Use `single = true` to increase performance in older browsers
   * when only one element is needed.
   *
   * @param {String} className
   * @param {Element} container
   * @param {Boolean} single
   * @api public
   */
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

  /*
   * Source: https://github.com/segmentio/extend
   */
  var extend = function extend(object) {
    // Takes an unlimited number of extenders.
    var args = Array.prototype.slice.call(arguments, 1); // For each extender, copy their properties on our object.

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

  /**
   * Source: https://github.com/timoxley/to-array
   *
   * Convert an array-like object into an `Array`.
   * If `collection` is already an `Array`, then will return a clone of `collection`.
   *
   * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`
   * @return {Array} Naive conversion of `collection` to a new `Array`.
   * @api public
   */
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
  /**
   * Bind `el` event `type` to `fn`.
   *
   * @param {Element} el, NodeList, HTMLCollection or Array
   * @param {String} type
   * @param {Function} fn
   * @param {Boolean} capture
   * @api public
   */

  var bind_1 = function bind_1(el, type, fn, capture) {
    el = toArray(el);

    for (var i = 0; i < el.length; i++) {
      el[i][bind](prefix + type, fn, capture || false);
    }
  };
  /**
   * Unbind `el` event `type`'s callback `fn`.
   *
   * @param {Element} el, NodeList, HTMLCollection or Array
   * @param {String} type
   * @param {Function} fn
   * @param {Boolean} capture
   * @api public
   */


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

  /**
   * Module dependencies.
   */

  /**
   * Whitespace regexp.
   */

  var re = /\s+/;
  /**
   * Wrap `el` in a `ClassList`.
   *
   * @param {Element} el
   * @return {ClassList}
   * @api public
   */

  var classes = function classes(el) {
    return new ClassList(el);
  };
  /**
   * Initialize a new ClassList for `el`.
   *
   * @param {Element} el
   * @api private
   */


  function ClassList(el) {
    if (!el || !el.nodeType) {
      throw new Error('A DOM element reference is required');
    }

    this.el = el;
    this.list = el.classList;
  }
  /**
   * Add class `name` if not already present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */


  ClassList.prototype.add = function (name) {
    // classList
    if (this.list) {
      this.list.add(name);
      return this;
    } // fallback


    var arr = this.array();
    var i = indexOf_1(arr, name);
    if (!~i) arr.push(name);
    this.el.className = arr.join(' ');
    return this;
  };
  /**
   * Remove class `name` when present, or
   * pass a regular expression to remove
   * any which match.
   *
   * @param {String|RegExp} name
   * @return {ClassList}
   * @api public
   */


  ClassList.prototype.remove = function (name) {
    // classList
    if (this.list) {
      this.list.remove(name);
      return this;
    } // fallback


    var arr = this.array();
    var i = indexOf_1(arr, name);
    if (~i) arr.splice(i, 1);
    this.el.className = arr.join(' ');
    return this;
  };
  /**
   * Toggle class `name`, can force state via `force`.
   *
   * For browsers that support classList, but do not support `force` yet,
   * the mistake will be detected and corrected.
   *
   * @param {String} name
   * @param {Boolean} force
   * @return {ClassList}
   * @api public
   */


  ClassList.prototype.toggle = function (name, force) {
    // classList
    if (this.list) {
      if ("undefined" !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name); // toggle again to correct
        }
      } else {
        this.list.toggle(name);
      }

      return this;
    } // fallback


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
  /**
   * Return an array of classes.
   *
   * @return {Array}
   * @api public
   */


  ClassList.prototype.array = function () {
    var className = this.el.getAttribute('class') || '';
    var str = className.replace(/^\s+|\s+$/g, '');
    var arr = str.split(re);
    if ('' === arr[0]) arr.shift();
    return arr;
  };
  /**
   * Check if class `name` is present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */


  ClassList.prototype.has = ClassList.prototype.contains = function (name) {
    return this.list ? this.list.contains(name) : !!~indexOf_1(this.array(), name);
  };

  /**
   * A cross-browser implementation of getAttribute.
   * Source found here: http://stackoverflow.com/a/3755343/361337 written by Vivin Paliath
   *
   * Return the value for `attr` at `element`.
   *
   * @param {Element} el
   * @param {String} attr
   * @api public
   */
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
      this.found = false; // Show if list.searched == true and this.found == true

      this.filtered = false; // Show if list.filtered == true and this.filtered == true

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
        var className = currentPage === i ? "active" : ""; //console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow), className);

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
        // Only textnodes have a data attribute
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
      var itemsToIndex = itemElements.splice(0, 50); // TODO: If < 100 items, what happens in IE etc?

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
          // Only textnodes have a data attribute
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
      /* If item source does not exists, use the first item in list as
      source for new items */


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
      /* .innerHTML = ''; fucks up IE */
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
        s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // Escape regular expression characters

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
      prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction

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
          // IE have srcElement
      alreadyCleared = target.value === "" && !_list.searched;

      if (!alreadyCleared) {
        // If oninput already have resetted the list, do nothing
        searchMethod(target.value);
      }
    }); // Used to detect click on HTML5 clear button


    _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'input', function (e) {
      var target = e.target || e.srcElement;

      if (target.value === "") {
        searchMethod('');
      }
    });

    return searchMethod;
  };

  var filter = function filter(list) {
    // Add handlers
    list.handlers.filterStart = list.handlers.filterStart || [];
    list.handlers.filterComplete = list.handlers.filterComplete || [];
    return function (filterFunction) {
      list.trigger('filterStart');
      list.i = 1; // Reset paging

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
      buttons.setOrder(options); // caseInsensitive
      // alphabet

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
    }; // Add handlers


    list.handlers.sortStart = list.handlers.sortStart || [];
    list.handlers.sortComplete = list.handlers.sortComplete || [];
    buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
    list.utils.events.bind(buttons.els, 'click', sort);
    list.on('searchStart', buttons.clear);
    list.on('filterStart', buttons.clear);
    return sort;
  };

  var fuzzy = function fuzzy(text, pattern, options) {
    // Aproximately where in the text is the pattern expected to be found?
    var Match_Location = options.location || 0; //Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of '0' requires the match be at the exact location specified, a threshold of '1000' would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.

    var Match_Distance = options.distance || 100; // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match (of both letters and location), a threshold of '1.0' would match anything.

    var Match_Threshold = options.threshold || 0.4;
    if (pattern === text) return true; // Exact match

    if (pattern.length > 32) return false; // This algorithm cannot be used
    // Set starting location at beginning text and initialise the alphabet.

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
    }(); // Compute and return the score for a match with e errors and x location.
    // Accesses loc and pattern through being a closure.


    function match_bitapScore_(e, x) {
      var accuracy = e / pattern.length,
          proximity = Math.abs(loc - x);

      if (!Match_Distance) {
        // Dodge divide by zero error.
        return proximity ? 1.0 : accuracy;
      }

      return accuracy + proximity / Match_Distance;
    }

    var score_threshold = Match_Threshold,
        // Highest score beyond which we give up.
    best_loc = text.indexOf(pattern, loc); // Is there a nearby exact match? (speedup)

    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold); // What about in the other direction? (speedup)

      best_loc = text.lastIndexOf(pattern, loc + pattern.length);

      if (best_loc != -1) {
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      }
    } // Initialise the bit arrays.


    var matchmask = 1 << pattern.length - 1;
    best_loc = -1;
    var bin_min, bin_mid;
    var bin_max = pattern.length + text.length;
    var last_rd;

    for (var d = 0; d < pattern.length; d++) {
      // Scan for the best match; each iteration allows for one more error.
      // Run a binary search to determine how far from 'loc' we can stray at this
      // error level.
      bin_min = 0;
      bin_mid = bin_max;

      while (bin_min < bin_mid) {
        if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
          bin_min = bin_mid;
        } else {
          bin_max = bin_mid;
        }

        bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
      } // Use the result from this iteration as the maximum for the next.


      bin_max = bin_mid;
      var start = Math.max(1, loc - bin_mid + 1);
      var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
      var rd = Array(finish + 2);
      rd[finish + 1] = (1 << d) - 1;

      for (var j = finish; j >= start; j--) {
        // The alphabet (s) is a sparse hash, so the following line generates
        // warnings.
        var charMatch = s[text.charAt(j - 1)];

        if (d === 0) {
          // First pass: exact match.
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
        } else {
          // Subsequent passes: fuzzy match.
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
        }

        if (rd[j] & matchmask) {
          var score = match_bitapScore_(d, j - 1); // This match will almost certainly be better than any existing match.
          // But check anyway.

          if (score <= score_threshold) {
            // Told you so.
            score_threshold = score;
            best_loc = j - 1;

            if (best_loc > loc) {
              // When passing loc, don't exceed our current distance from loc.
              start = Math.max(1, 2 * loc - best_loc);
            } else {
              // Already passed loc, downhill from here on in.
              break;
            }
          }
        }
      } // No hope for a (better) match at greater error levels.


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
        // Substract arguments from the searchString or put searchString as only argument
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
      var target = e.target || e.srcElement; // IE have srcElement

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
    /*
    * Re-parse the List, use if html have changed
    */

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
    /*
    * Add object to list
    */


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
    /* Removes object from list.
    * Loops through the list and removes objects where
    * property "valuename" === value
    */


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
    /* Gets the objects in the list which
    * property "valueName" === value
    */


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
    /*
    * Get size of the list
    */


    this.size = function () {
      return self.items.length;
    };
    /*
    * Removes all items from the list
    */


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
    // Init our list.js component
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
    }); // Empty Notice
    // Displayed when the search returns no results

    var noticeEmpty = document.querySelector('.notice_empty');
    var noticeEmptyText = noticeEmpty.querySelector('.search_text'); // Clear search button

    var filter$1 = document.querySelector('.filter');
    var search$1 = document.querySelector('.filter .search');
    var searchClear = document.querySelector('.filter .search_clear');

    var isMenuLinkActive = () => {
      var menuLinks = document.querySelectorAll('#listjs .menu__link');
      var isActive = menuLinks.classList.contains('is-active');
      return isActive;
    }; // On search complete callback


    list.on('searchComplete', () => {
      // Update the search text in empty notice
      var value = search$1.value;
      noticeEmptyText.innerHTML = value;
      localStorage.setItem('SearchValue', value); // Show clear search button if a value there is something in search

      if (value) {
        filter$1.classList.add('is-active');
        search$1.classList.add('is-active');
        searchClear.classList.remove('display-none');
      } else {
        filter$1.classList.remove('is-active');
        search$1.classList.remove('is-active');
        searchClear.classList.add('display-none');
      } // Toggle notice depending on the number of visible items


      if (list.visibleItems.length > 0) {
        noticeEmpty.classList.add('display-none');
      } else {
        noticeEmpty.classList.remove('display-none');
      }
    }); // Click events for category and clears

    document.addEventListener('click', () => {
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
    }, false); // Restore our local storage value

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
  var scrollStash = new ScrollStash({
    autoInit: true,
    selectorAnchor: '.is-active',
    selectorTopElem: '.dialog__header'
  });
  var el$1 = document.querySelector('[data-scroll-stash]');
  document.addEventListener('drawer:opened', () => {
    var anchor = scrollStash.anchorGet(el$1);
    anchor.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });

}());
