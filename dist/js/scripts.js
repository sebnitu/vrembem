(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _dismissible = _interopRequireDefault(require("./dismissible"));

var _drawer = _interopRequireDefault(require("./drawer"));

var _modal = _interopRequireDefault(require("./modal"));

var _toggle = _interopRequireDefault(require("./toggle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dismissible = new _dismissible["default"]();
var drawer = new _drawer["default"]();
var modal = new _modal["default"]();
var toggle = new _toggle["default"]();

},{"./dismissible":3,"./drawer":4,"./modal":5,"./toggle":6}],2:[function(require,module,exports){
module.exports={
  "breakpoints" : {
    "xs": "480px",
    "sm": "620px",
    "md": "760px",
    "lg": "990px",
    "xl": "1380px"
  }
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    trigger: '[data-dismiss]',
    target: '[data-dismissible]',
    classToggle: 'dismiss'
  };

  api.init = function (options) {
    settings = _utility["default"].extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
  };

  var run = function run() {
    var trigger = event.target.closest(settings.trigger);

    if (trigger) {
      var target = trigger.closest(settings.target);

      if (target) {
        _utility["default"].toggleClass(target, settings.classToggle);
      }

      event.preventDefault();
    }
  };

  api.init(options);
  return api;
}

},{"./utility.js":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Drawer plugin
 * ---
 * The drawer component is used to create hidden but toggle-able content for an
 * application. This is typically used for a long form naivation list.
 */
function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    classTrigger: 'drawer__trigger',
    classDrawer: 'drawer',
    classDialog: 'drawer__dialog',
    classActive: 'is-active',
    "switch": '[data-drawer-switch]',
    switchBreakpoint: '1200px',
    saveState: true
  };
  var drawers;
  var drawer_state = {};
  var modalDrawers;
  var bp;
  var mq;

  api.init = function (options) {
    settings = _utility["default"].extend(defaults, options || {}); // Get all the drawers on the page

    drawers = document.querySelectorAll('.drawer'); // Init save state if it's enabled

    if (settings.saveState) {
      initSaveState();
    } // Init modal switch if it's enabled


    if (settings["switch"]) {
      initSwitch();
    } // Add our drawer trigger event listener


    document.addEventListener('click', trigger, false);
  };

  api.destroy = function () {
    settings = null;
    drawers = null; // Check if save state is enabled

    if (settings.saveState) {
      drawer_state = {};
      localStorage.removeItem('drawer_state');
    } // Check if modal switch is enabled


    if (settings["switch"]) {
      modalDrawers = null;
      bp = null;
      mq = null;
    } // Remove the drawer trigger event listener


    document.removeEventListener('click', trigger, false);
  };

  api.open = function (selector) {
    open(document.querySelectorAll(selector));
  };

  api.close = function (selector) {
    close(document.querySelectorAll(selector));
  };

  var open = function open(target, callback) {
    _utility["default"].addClass(target, 'is-active');

    if (!target.forEach) {
      target = _utility["default"].toArray(target);
    }

    target.forEach(function (target) {
      if (settings.saveState) {
        drawer_state[target.id] = _utility["default"].hasClass(target, 'is-active');
        localStorage.setItem('drawer_state', JSON.stringify(drawer_state));
      }
    }); // Fire the callback if one was passed

    typeof callback === 'function' && callback();
  };

  var close = function close(target, callback) {
    _utility["default"].removeClass(target, 'is-active');

    if (!target.forEach) {
      target = _utility["default"].toArray(target);
    }

    target.forEach(function (target) {
      if (settings.saveState) {
        drawer_state[target.id] = _utility["default"].hasClass(target, 'is-active');
        localStorage.setItem('drawer_state', JSON.stringify(drawer_state));
      }
    }); // Fire the callback if one was passed

    typeof callback === 'function' && callback();
  };

  var debug = function debug(event, element) {
    console.log("".concat(event, ": "), element);

    if (settings.saveState) {
      console.log('drawer_state: ', drawer_state);
    }
  };

  var trigger = function trigger() {
    var trigger = event.target.closest('.drawer__trigger');

    if (trigger) {
      var dataDrawer = trigger.dataset.target;

      if (dataDrawer) {
        var drawer = document.querySelectorAll(dataDrawer);

        if (drawer) {
          if (_utility["default"].hasClass(drawer, 'is-active')) {
            close(drawer);
          } else {
            open(drawer);
          }
        }
      }
    }
  };

  var initSaveState = function initSaveState() {
    // Init: Setup our variables
    // Get the drawer state from local storage
    // Check if drawer state was saved otherwise init a new object
    if (localStorage.getItem('drawer_state')) {
      drawer_state = JSON.parse(localStorage.getItem('drawer_state'));
    } // Loop through all drawers and save/init their state


    drawers.forEach(function (drawer) {
      // Set the default state if one is not set
      if (drawer.id in drawer_state === false) {
        drawer_state[drawer.id] = _utility["default"].hasClass(drawer, 'is-active');
      } // Get our drawer dialog element


      var dialog = drawer.querySelector('.drawer__dialog'); // Add a no-transition class and remove it within a transition duration

      _utility["default"].addClass(dialog, 'transition_none');

      var revert = function revert() {
        setTimeout(function () {
          _utility["default"].removeClass(dialog, 'transition_none');
        }, 500);
      }; // Toggle our drawer state based on the saved state


      if (drawer_state[drawer.id] === false) {
        close(drawer, revert);
      } else {
        open(drawer, revert);
      }
    });
  };

  var initSwitch = function initSwitch() {
    modalDrawers = document.querySelectorAll(settings["switch"]);
    modalDrawers.forEach(function (drawer) {
      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      var clean = settings["switch"].replace('[', '').replace(']', '').replace('data-', ''); // Convert sring to camelCase

      clean = clean.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }); // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings

      bp = drawer.dataset[clean];

      if (bp) {
        bp = _utility["default"].getBreakpoint(bp);

        if (!bp) {
          bp = drawer.dataset[clean];
        }
      } else {
        bp = settings.switchBreakpoint;
      } // Media query listener


      mq = window.matchMedia("(min-width:" + bp + ")");
      mq.addListener(function (mq) {
        switchCheck(mq, drawer);
      });
      switchCheck(mq, drawer);
    });
  };

  var switchCheck = function switchCheck(mq, drawer) {
    if (mq.matches) {
      switchDrawer(drawer);
    } else {
      switchModal(drawer);
    }
  };

  var switchDrawer = function switchDrawer(drawer) {
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]');
    var regex = /modal/gi;
    drawer.className = drawer.className.replace(regex, 'drawer');
    dialog.className = dialog.className.replace(regex, 'drawer');
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(regex, 'drawer');
    }); // Open or close drawer based on save state

    if (settings.saveState) {
      if (drawer_state[drawer.id] === false) {
        close(drawer);
      } else {
        open(drawer);
      }
    }
  };

  var switchModal = function switchModal(drawer) {
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]');
    var regex = /drawer/gi;
    drawer.className = drawer.className.replace(regex, 'modal');
    dialog.className = dialog.className.replace(regex, 'modal');
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(regex, 'modal');
    }); // Remove active class for modal styles by default

    _utility["default"].removeClass(drawer, 'is-active');
  };

  api.init(options);
  return api;
}

},{"./utility.js":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
    classActive: 'is-active',
    focus: '[data-focus]'
  };
  var memoryTrigger;
  var memoryTarget;

  api.init = function (options) {
    settings = _utility["default"].extend(defaults, options || {});
    document.addEventListener('click', run, false);
    document.addEventListener('touchend', run, false);
    document.addEventListener('keyup', escape, false);
  };

  api.destroy = function () {
    settings = null;
    memoryTarget = null;
    memoryTrigger = null;
    document.removeEventListener('click', run, false);
    document.removeEventListener('touchend', run, false);
    document.removeEventListener('keyup', escape, false);
  };

  api.open = function (selector) {
    open(document.querySelectorAll(selector));
  };

  api.close = function (clear) {
    close(clear);
  };

  var open = function open(target) {
    _utility["default"].addClass(target, settings.classActive);

    if (target.length === 1) {
      target = target.item(0);
      var focus = target.querySelector(settings.focus);
      target.addEventListener('transitionend', function _listener() {
        if (focus) {
          focus.focus();
        } else {
          target.focus();
        }

        this.removeEventListener('transitionend', _listener, true);
      }, true);
    }
  };

  var close = function close() {
    var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var modals = document.querySelectorAll('.' + settings.classModal);

    _utility["default"].removeClass(modals, settings.classActive);

    if (clear == false && memoryTrigger && memoryTarget) {
      if (memoryTarget.length === 1) {
        memoryTarget = memoryTarget.item(0);
        memoryTarget.addEventListener('transitionend', function _listener() {
          if (memoryTrigger) {
            memoryTrigger.focus();
          }

          memoryTarget = null;
          memoryTrigger = null;
          this.removeEventListener('transitionend', _listener, true);
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
    var trigger = event.target.closest('.' + settings.classTrigger);
    var modal = event.target.closest('.' + settings.classModal);
    var dialog = event.target.closest('.' + settings.classDialog);

    if (trigger) {
      close();
      var dataModal = trigger.dataset.target;

      if (dataModal) {
        memoryTarget = document.querySelectorAll(dataModal);
        memoryTrigger = trigger;
        open(memoryTarget);
      }

      event.preventDefault();
    } else if (modal && !dialog) {
      close();
    }
  };

  api.init(options);
  return api;
}

},{"./utility.js":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    trigger: '[data-toggle-class]',
    targets: '',
    "class": ''
  };

  api.init = function (options) {
    settings = _utility["default"].extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
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
          _utility["default"].toggleClass(target, trigger.dataset.toggleClass.split(' '));
        });
      } else {
        if (settings["class"]) {
          _utility["default"].toggleClass(trigger, settings["class"]);
        } else {
          _utility["default"].toggleClass(trigger, trigger.dataset.toggleClass.split(' '));
        }
      }

      event.preventDefault();
    }
  };

  api.init(options);
  return api;
}

},{"./utility.js":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Utility
 * ---
 * A set of helper methods for general javascript plugin use.
 */
var _default =
/*#__PURE__*/
function () {
  function _default() {
    _classCallCheck(this, _default);
  }

  _createClass(_default, null, [{
    key: "getBreakpoint",

    /**
     * Get and output a breakpoint using it's key found in config.json
     * ---
     * @param {String} The key to search for in the breakpoints object
     * @returns {String} The pixel value of the breakpoint as a string
     */
    value: function getBreakpoint(key) {
      return _config["default"].breakpoints[key];
    }
    /**
     * Checks if an element has a class or not
     * ---
     * @param {Object} || {Nodelist} Element(s) to check class(es) on
     * @param {String} || {Array} Class(es) to check
     * @returns {Boolean} Returns true if class exists on element, otherwise false
     */

  }, {
    key: "hasClass",
    value: function hasClass(el, c) {
      if (!el.forEach) {
        el = this.toArray(el);
      }

      c = this.toArray(c);
      return c.some(function (c) {
        var has = false;
        el.forEach(function (el) {
          if (el.classList.contains(c)) {
            has = true;
          }
        });
        return has;
      });
    }
    /**
     * Adds a class or classes to an element
     * ---
     * @param {Object} || {Nodelist} Element(s) to add class(es) on
     * @param {String} || {Array} Class(es) to add
     */

  }, {
    key: "addClass",
    value: function addClass(el, c) {
      if (!el.forEach) {
        el = this.toArray(el);
      }

      c = this.toArray(c);
      el.forEach(function (el) {
        c.forEach(function (c) {
          el.classList.add(c);
        });
      });
    }
    /**
     * Remove a class or classes from an element
     * ---
     * @param {Object} || {Nodelist} Element(s) to remove class(es) from
     * @param {String} || {Array} Class(es) to remove
     */

  }, {
    key: "removeClass",
    value: function removeClass(el, c) {
      if (!el.forEach) {
        el = this.toArray(el);
      }

      c = this.toArray(c);
      el.forEach(function (el) {
        c.forEach(function (c) {
          el.classList.remove(c);
        });
      });
    }
    /**
     * Toggle a class or classes on an element
     * ---
     * @param {Object} || {Nodelist} Element(s) to toggle class(es) on
     * @param {String} || {Array} Class(es) to toggle
     */

  }, {
    key: "toggleClass",
    value: function toggleClass(el, c) {
      if (!el.forEach) {
        el = this.toArray(el);
      }

      c = this.toArray(c);
      el.forEach(function (el) {
        c.forEach(function (c) {
          el.classList.toggle(c);
        });
      });
    }
    /**
     * Find the closest parent element based on class. This is different from the
     * native .closest() method in that it doesn't check the current element.
     * ---
     * @param {Object} Element to start search on
     * @param {String} || {Array} Class(es) to check for
     * @return {Element} Closest parent element
     */

  }, {
    key: "closest",
    value: function closest(el, c) {
      while ((el = el.parentElement) && !this.hasClass(el, c)) {
        return el;
      }
    }
    /**
     * Converts a string or object to an array. If an array is passed, it's
     * returned as is. Anything else is returned as an array.
     * ---
     * @param {String} || {Object} String or object to convert to an array
     * @return {Array} Return the converted array
     */

  }, {
    key: "toArray",
    value: function toArray(item) {
      var array = [];

      if (Array.isArray(item)) {
        array = item;
      } else {
        array.push(item);
      }

      return array;
    }
    /**
     * Merge two or more objects. Returns a new object. Set the first argument
     * to `true` for a deep or recursive merge.
     * ---
     * @param {Boolean} [Optional] If true, do a deep (or recursive) merge
     * @param {Object} The objects to merge together; each overriding the next
     * @returns {Object} Merged values of defaults and options
     */

  }, {
    key: "extend",
    value: function (_extend) {
      function extend() {
        return _extend.apply(this, arguments);
      }

      extend.toString = function () {
        return _extend.toString();
      };

      return extend;
    }(function () {
      var extended = {};
      var deep = false;
      var i = 0;
      var length = arguments.length;

      if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
      }

      var merge = function merge(obj) {
        for (var prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
              extended[prop] = extend(true, extended[prop], obj[prop]);
            } else {
              extended[prop] = obj[prop];
            }
          }
        }
      };

      for (; i < length; i++) {
        var obj = arguments[i];
        merge(obj);
      }

      return extended;
    })
  }]);

  return _default;
}();

exports["default"] = _default;

},{"config":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbmZpZy5qc29uIiwic3JjL2pzL2Rpc21pc3NpYmxlLmpzIiwic3JjL2pzL2RyYXdlci5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy90b2dnbGUuanMiLCJzcmMvanMvdXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNLFdBQVcsR0FBRyxJQUFJLHVCQUFKLEVBQXBCO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmO0FBQ0EsSUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBSixFQUFkO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmOzs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDVEE7Ozs7QUFFZSxrQkFBUyxPQUFULEVBQWtCO0FBRS9COztBQUVBLE1BQUksR0FBRyxHQUFHLEVBQVY7QUFDQSxNQUFJLFFBQUo7QUFDQSxNQUFNLFFBQVEsR0FBRztBQUNmLElBQUEsT0FBTyxFQUFFLGdCQURNO0FBRWYsSUFBQSxNQUFNLEVBQUUsb0JBRk87QUFHZixJQUFBLFdBQVcsRUFBRTtBQUhFLEdBQWpCOztBQU1BLEVBQUEsR0FBRyxDQUFDLElBQUosR0FBVyxVQUFDLE9BQUQsRUFBYTtBQUN0QixJQUFBLFFBQVEsR0FBRyxvQkFBRSxNQUFGLENBQVUsUUFBVixFQUFvQixPQUFPLElBQUksRUFBL0IsQ0FBWDtBQUNBLElBQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLEtBQXhDO0FBQ0QsR0FIRDs7QUFLQSxFQUFBLEdBQUcsQ0FBQyxPQUFKLEdBQWMsWUFBTTtBQUNsQixJQUFBLFFBQVEsR0FBRyxJQUFYO0FBQ0EsSUFB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QUFDdkQsZ0JBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLEdBQUcsQ0FBQyxJQUFELENBQWxDLE1BQThDLGlCQUEzRCxFQUErRTtBQUM3RSxjQUFBLFFBQVEsQ0FBQyxJQUFELENBQVIsR0FBaUIsTUFBTSxDQUFFLElBQUYsRUFBUSxRQUFRLENBQUMsSUFBRCxDQUFoQixFQUF3QixHQUFHLENBQUMsSUFBRCxDQUEzQixDQUF2QjtBQUNELGFBRkQsTUFFTztBQUNMLGNBQUEsUUFBUSxDQUFDLElBQUQsQ0FBUixHQUFpQixHQUFHLENBQUMsSUFBRCxDQUFwQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BVkQ7O0FBWUEsYUFBUSxDQUFDLEdBQUcsTUFBWixFQUFvQixDQUFDLEVBQXJCLEVBQTBCO0FBQ3hCLFlBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFELENBQW5CO0FBQ0EsUUFBQSxLQUFLLENBQUMsR0FBRCxDQUFMO0FBQ0Q7O0FBRUQsYUFBTyxRQUFQO0FBQ0QsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBEaXNtaXNzaWJsZSBmcm9tICcuL2Rpc21pc3NpYmxlJ1xuaW1wb3J0IERyYXdlciBmcm9tICcuL2RyYXdlcidcbmltcG9ydCBNb2RhbCBmcm9tICcuL21vZGFsJ1xuaW1wb3J0IFRvZ2dsZSBmcm9tICcuL3RvZ2dsZSdcblxuY29uc3QgZGlzbWlzc2libGUgPSBuZXcgRGlzbWlzc2libGUoKVxuY29uc3QgZHJhd2VyID0gbmV3IERyYXdlcigpXG5jb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpXG5jb25zdCB0b2dnbGUgPSBuZXcgVG9nZ2xlKClcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJicmVha3BvaW50c1wiIDoge1xuICAgIFwieHNcIjogXCI0ODBweFwiLFxuICAgIFwic21cIjogXCI2MjBweFwiLFxuICAgIFwibWRcIjogXCI3NjBweFwiLFxuICAgIFwibGdcIjogXCI5OTBweFwiLFxuICAgIFwieGxcIjogXCIxMzgwcHhcIlxuICB9XG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS1kaXNtaXNzXScsXG4gICAgdGFyZ2V0OiAnW2RhdGEtZGlzbWlzc2libGVdJyxcbiAgICBjbGFzc1RvZ2dsZTogJ2Rpc21pc3MnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0cmlnZ2VyLmNsb3Nlc3Qoc2V0dGluZ3MudGFyZ2V0KVxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NUb2dnbGUpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIERyYXdlciBwbHVnaW5cbiAqIC0tLVxuICogVGhlIGRyYXdlciBjb21wb25lbnQgaXMgdXNlZCB0byBjcmVhdGUgaGlkZGVuIGJ1dCB0b2dnbGUtYWJsZSBjb250ZW50IGZvciBhblxuICogYXBwbGljYXRpb24uIFRoaXMgaXMgdHlwaWNhbGx5IHVzZWQgZm9yIGEgbG9uZyBmb3JtIG5haXZhdGlvbiBsaXN0LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBjbGFzc1RyaWdnZXI6ICdkcmF3ZXJfX3RyaWdnZXInLFxuICAgIGNsYXNzRHJhd2VyOiAnZHJhd2VyJyxcbiAgICBjbGFzc0RpYWxvZzogJ2RyYXdlcl9fZGlhbG9nJyxcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgc3dpdGNoOiAnW2RhdGEtZHJhd2VyLXN3aXRjaF0nLFxuICAgIHN3aXRjaEJyZWFrcG9pbnQ6ICcxMjAwcHgnLFxuICAgIHNhdmVTdGF0ZTogdHJ1ZVxuICB9XG5cbiAgbGV0IGRyYXdlcnNcbiAgbGV0IGRyYXdlcl9zdGF0ZSA9IHt9XG4gIGxldCBtb2RhbERyYXdlcnNcbiAgbGV0IGJwXG4gIGxldCBtcVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcblxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcblxuICAgIC8vIEdldCBhbGwgdGhlIGRyYXdlcnMgb24gdGhlIHBhZ2VcbiAgICBkcmF3ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyYXdlcicpXG5cbiAgICAvLyBJbml0IHNhdmUgc3RhdGUgaWYgaXQncyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgaW5pdFNhdmVTdGF0ZSgpXG4gICAgfVxuXG4gICAgLy8gSW5pdCBtb2RhbCBzd2l0Y2ggaWYgaXQncyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnN3aXRjaCkge1xuICAgICAgaW5pdFN3aXRjaCgpXG4gICAgfVxuXG4gICAgLy8gQWRkIG91ciBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcblxuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRyYXdlcnMgPSBudWxsXG5cbiAgICAvLyBDaGVjayBpZiBzYXZlIHN0YXRlIGlzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBkcmF3ZXJfc3RhdGUgPSB7fVxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RyYXdlcl9zdGF0ZScpXG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgbW9kYWwgc3dpdGNoIGlzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc3dpdGNoKSB7XG4gICAgICBtb2RhbERyYXdlcnMgPSBudWxsXG4gICAgICBicCA9IG51bGxcbiAgICAgIG1xID0gbnVsbFxuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBvcGVuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICB9XG5cbiAgYXBpLmNsb3NlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgY2xvc2UoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICBjb25zdCBvcGVuID0gKHRhcmdldCwgY2FsbGJhY2spID0+IHtcbiAgICB1LmFkZENsYXNzKHRhcmdldCwgJ2lzLWFjdGl2ZScpXG4gICAgaWYgKCF0YXJnZXQuZm9yRWFjaCkge1xuICAgICAgdGFyZ2V0ID0gdS50b0FycmF5KHRhcmdldClcbiAgICB9XG4gICAgdGFyZ2V0LmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgICBkcmF3ZXJfc3RhdGVbdGFyZ2V0LmlkXSA9IHUuaGFzQ2xhc3ModGFyZ2V0LCAnaXMtYWN0aXZlJylcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RyYXdlcl9zdGF0ZScsIEpTT04uc3RyaW5naWZ5KGRyYXdlcl9zdGF0ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICAvLyBGaXJlIHRoZSBjYWxsYmFjayBpZiBvbmUgd2FzIHBhc3NlZFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjaygpXG4gIH1cblxuICBjb25zdCBjbG9zZSA9ICh0YXJnZXQsIGNhbGxiYWNrKSA9PiB7XG4gICAgdS5yZW1vdmVDbGFzcyh0YXJnZXQsICdpcy1hY3RpdmUnKVxuICAgIGlmICghdGFyZ2V0LmZvckVhY2gpIHtcbiAgICAgIHRhcmdldCA9IHUudG9BcnJheSh0YXJnZXQpXG4gICAgfVxuICAgIHRhcmdldC5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgICAgZHJhd2VyX3N0YXRlW3RhcmdldC5pZF0gPSB1Lmhhc0NsYXNzKHRhcmdldCwgJ2lzLWFjdGl2ZScpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcmF3ZXJfc3RhdGUnLCBKU09OLnN0cmluZ2lmeShkcmF3ZXJfc3RhdGUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgLy8gRmlyZSB0aGUgY2FsbGJhY2sgaWYgb25lIHdhcyBwYXNzZWRcbiAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2soKVxuICB9XG5cbiAgY29uc3QgZGVidWcgPSAoZXZlbnQsIGVsZW1lbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgJHtldmVudH06IGAgLCBlbGVtZW50KVxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkcmF3ZXJfc3RhdGU6ICcsIGRyYXdlcl9zdGF0ZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCB0cmlnZ2VyID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5kcmF3ZXJfX3RyaWdnZXInKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBsZXQgZGF0YURyYXdlciA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcbiAgICAgIGlmIChkYXRhRHJhd2VyKSB7XG4gICAgICAgIGxldCBkcmF3ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRhdGFEcmF3ZXIpXG4gICAgICAgIGlmIChkcmF3ZXIpIHtcbiAgICAgICAgICBpZiAodS5oYXNDbGFzcyhkcmF3ZXIsICdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgY2xvc2UoZHJhd2VyKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcGVuKGRyYXdlcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBpbml0U2F2ZVN0YXRlID0gKCkgPT4ge1xuXG4gICAgLy8gSW5pdDogU2V0dXAgb3VyIHZhcmlhYmxlc1xuICAgIC8vIEdldCB0aGUgZHJhd2VyIHN0YXRlIGZyb20gbG9jYWwgc3RvcmFnZVxuICAgIC8vIENoZWNrIGlmIGRyYXdlciBzdGF0ZSB3YXMgc2F2ZWQgb3RoZXJ3aXNlIGluaXQgYSBuZXcgb2JqZWN0XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcmF3ZXJfc3RhdGUnKSkge1xuICAgICAgZHJhd2VyX3N0YXRlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyX3N0YXRlJykpXG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBkcmF3ZXJzIGFuZCBzYXZlL2luaXQgdGhlaXIgc3RhdGVcbiAgICBkcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuXG4gICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc3RhdGUgaWYgb25lIGlzIG5vdCBzZXRcbiAgICAgIGlmIChkcmF3ZXIuaWQgaW4gZHJhd2VyX3N0YXRlID09PSBmYWxzZSkge1xuICAgICAgICBkcmF3ZXJfc3RhdGVbZHJhd2VyLmlkXSA9IHUuaGFzQ2xhc3MoZHJhd2VyLCAnaXMtYWN0aXZlJylcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IG91ciBkcmF3ZXIgZGlhbG9nIGVsZW1lbnRcbiAgICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRyYXdlcl9fZGlhbG9nJylcblxuICAgICAgLy8gQWRkIGEgbm8tdHJhbnNpdGlvbiBjbGFzcyBhbmQgcmVtb3ZlIGl0IHdpdGhpbiBhIHRyYW5zaXRpb24gZHVyYXRpb25cbiAgICAgIHUuYWRkQ2xhc3MoZGlhbG9nLCAndHJhbnNpdGlvbl9ub25lJylcbiAgICAgIGxldCByZXZlcnQgPSAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1LnJlbW92ZUNsYXNzKGRpYWxvZywgJ3RyYW5zaXRpb25fbm9uZScpXG4gICAgICAgICAgfSwgNTAwXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgLy8gVG9nZ2xlIG91ciBkcmF3ZXIgc3RhdGUgYmFzZWQgb24gdGhlIHNhdmVkIHN0YXRlXG4gICAgICBpZiAoZHJhd2VyX3N0YXRlW2RyYXdlci5pZF0gPT09IGZhbHNlKSB7XG4gICAgICAgIGNsb3NlKGRyYXdlciwgcmV2ZXJ0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BlbihkcmF3ZXIsIHJldmVydClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3QgaW5pdFN3aXRjaCA9ICgpID0+IHtcbiAgICBtb2RhbERyYXdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnN3aXRjaClcbiAgICBtb2RhbERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG4gICAgICAvLyBHZXQgdGhlIGxvY2FsIGJyZWFrcG9pbnQgaWYgb25lIGlzIHNldFxuICAgICAgLy8gUmVtb3ZlIGJyYWNrZXRzIGFuZCB0aGUgaW50aWFsIGRhdGEgZmxhZ1xuICAgICAgbGV0IGNsZWFuID0gc2V0dGluZ3Muc3dpdGNoXG4gICAgICAgIC5yZXBsYWNlKCdbJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCddJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCdkYXRhLScsICcnKVxuXG4gICAgICAvLyBDb252ZXJ0IHNyaW5nIHRvIGNhbWVsQ2FzZVxuICAgICAgY2xlYW4gPSBjbGVhbi5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAoZykge1xuICAgICAgICByZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpXG4gICAgICB9KVxuXG4gICAgICAvLyBDaGVjayB3aGljaCBicmVha3BvaW50IHRvIHVzZTpcbiAgICAgIC8vIGEpIFRoZSBsb2NhbCBicCBzZXQgb24gdGhlIGRyYXdlclxuICAgICAgLy8gYikgVGhlIGJwIGF2YWlsYWJsZSBpbiBjb25maWcgdXNpbmcgYSBrZXlcbiAgICAgIC8vIGMpIFRoZSByYXcgcGl4ZWwgdmFsdWUgcHJvdmlkZWQgaW4gc2V0dGluZ3NcbiAgICAgIGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5dXG4gICAgICBpZiAoYnApIHtcbiAgICAgICAgYnAgPSB1LmdldEJyZWFrcG9pbnQoYnApXG4gICAgICAgIGlmICghYnApIHtcbiAgICAgICAgICBicCA9IGRyYXdlci5kYXRhc2V0W2NsZWFuXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicCA9IHNldHRpbmdzLnN3aXRjaEJyZWFrcG9pbnRcbiAgICAgIH1cblxuICAgICAgLy8gTWVkaWEgcXVlcnkgbGlzdGVuZXJcbiAgICAgIG1xID0gd2luZG93Lm1hdGNoTWVkaWEoIFwiKG1pbi13aWR0aDpcIiArIGJwICsgXCIpXCIgKVxuICAgICAgbXEuYWRkTGlzdGVuZXIoKG1xKSA9PiB7XG4gICAgICAgIHN3aXRjaENoZWNrKG1xLCBkcmF3ZXIpXG4gICAgICB9KVxuICAgICAgc3dpdGNoQ2hlY2sobXEsIGRyYXdlcilcbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc3dpdGNoQ2hlY2sgPSAobXEsIGRyYXdlcikgPT4ge1xuICAgIGlmIChtcS5tYXRjaGVzKSB7XG4gICAgICBzd2l0Y2hEcmF3ZXIoZHJhd2VyKVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2hNb2RhbChkcmF3ZXIpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3dpdGNoRHJhd2VyID0gKGRyYXdlcikgPT4ge1xuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcbiAgICBsZXQgcmVnZXggPSAvbW9kYWwvZ2lcblxuICAgIGRyYXdlci5jbGFzc05hbWUgPSBkcmF3ZXIuY2xhc3NOYW1lLnJlcGxhY2UocmVnZXgsICdkcmF3ZXInKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UocmVnZXgsICdkcmF3ZXInKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgJ2RyYXdlcicpXG4gICAgfSlcblxuICAgIC8vIE9wZW4gb3IgY2xvc2UgZHJhd2VyIGJhc2VkIG9uIHNhdmUgc3RhdGVcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBpZiAoZHJhd2VyX3N0YXRlW2RyYXdlci5pZF0gPT09IGZhbHNlKSB7XG4gICAgICAgIGNsb3NlKGRyYXdlcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wZW4oZHJhd2VyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN3aXRjaE1vZGFsID0gKGRyYXdlcikgPT4ge1xuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcbiAgICBsZXQgcmVnZXggPSAvZHJhd2VyL2dpXG5cbiAgICBkcmF3ZXIuY2xhc3NOYW1lID0gZHJhd2VyLmNsYXNzTmFtZS5yZXBsYWNlKHJlZ2V4LCAnbW9kYWwnKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UocmVnZXgsICdtb2RhbCcpXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKHJlZ2V4LCAnbW9kYWwnKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZvciBtb2RhbCBzdHlsZXMgYnkgZGVmYXVsdFxuICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCAnaXMtYWN0aXZlJylcbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgY2xhc3NUcmlnZ2VyOiAnbW9kYWxfX3RyaWdnZXInLFxuICAgIGNsYXNzTW9kYWw6ICdtb2RhbCcsXG4gICAgY2xhc3NEaWFsb2c6ICdtb2RhbF9fZGlhbG9nJyxcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgZm9jdXM6ICdbZGF0YS1mb2N1c10nXG4gIH1cblxuICBsZXQgbWVtb3J5VHJpZ2dlclxuICBsZXQgbWVtb3J5VGFyZ2V0XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBvcGVuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICB9XG5cbiAgYXBpLmNsb3NlID0gKGNsZWFyKSA9PiB7XG4gICAgY2xvc2UoY2xlYXIpXG4gIH1cblxuICBjb25zdCBvcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIHUuYWRkQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lml0ZW0oMClcbiAgICAgIGxldCBmb2N1cyA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLmZvY3VzKVxuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChmb2N1cykge1xuICAgICAgICAgIGZvY3VzLmZvY3VzKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsb3NlID0gKGNsZWFyID0gZmFsc2UpID0+IHtcbiAgICBsZXQgbW9kYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIHUucmVtb3ZlQ2xhc3MobW9kYWxzLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAoY2xlYXIgPT0gZmFsc2UgJiYgbWVtb3J5VHJpZ2dlciAmJiBtZW1vcnlUYXJnZXQpIHtcbiAgICAgIGlmIChtZW1vcnlUYXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IG1lbW9yeVRhcmdldC5pdGVtKDApXG4gICAgICAgIG1lbW9yeVRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICAgIGlmIChtZW1vcnlUcmlnZ2VyKSB7XG4gICAgICAgICAgICBtZW1vcnlUcmlnZ2VyLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNsZWFyID09IHRydWUpIHtcbiAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZXNjYXBlID0gKCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyKVxuICAgIGxldCBtb2RhbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzTW9kYWwpXG4gICAgbGV0IGRpYWxvZyA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzRGlhbG9nKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBjbG9zZSgpXG4gICAgICBsZXQgZGF0YU1vZGFsID0gdHJpZ2dlci5kYXRhc2V0LnRhcmdldFxuICAgICAgaWYgKGRhdGFNb2RhbCkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRhdGFNb2RhbClcbiAgICAgICAgbWVtb3J5VHJpZ2dlciA9IHRyaWdnZXJcbiAgICAgICAgb3BlbihtZW1vcnlUYXJnZXQpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSBlbHNlIGlmIChtb2RhbCAmJiAhZGlhbG9nKSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtdG9nZ2xlLWNsYXNzXScsXG4gICAgdGFyZ2V0czogJycsXG4gICAgY2xhc3M6ICcnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcblxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcblxuICAgIGlmICh0cmlnZ2VyKSB7XG5cbiAgICAgIGxldCB0YXJnZXRzXG5cbiAgICAgIGlmIChzZXR0aW5ncy50YXJnZXRzKSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnRhcmdldHMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlVGFyZ2V0KVxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0dGluZ3MuY2xhc3MpIHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRyaWdnZXIsIHNldHRpbmdzLmNsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJ1xuXG4vKipcbiAqIFV0aWxpdHlcbiAqIC0tLVxuICogQSBzZXQgb2YgaGVscGVyIG1ldGhvZHMgZm9yIGdlbmVyYWwgamF2YXNjcmlwdCBwbHVnaW4gdXNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgb3V0cHV0IGEgYnJlYWtwb2ludCB1c2luZyBpdCdzIGtleSBmb3VuZCBpbiBjb25maWcuanNvblxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IFRoZSBrZXkgdG8gc2VhcmNoIGZvciBpbiB0aGUgYnJlYWtwb2ludHMgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBwaXhlbCB2YWx1ZSBvZiB0aGUgYnJlYWtwb2ludCBhcyBhIHN0cmluZ1xuICAgKi9cbiAgc3RhdGljIGdldEJyZWFrcG9pbnQoa2V5KSB7XG4gICAgcmV0dXJuIGNvbmZpZy5icmVha3BvaW50c1trZXldXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGEgY2xhc3Mgb3Igbm90XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gfHwge05vZGVsaXN0fSBFbGVtZW50KHMpIHRvIGNoZWNrIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gY2hlY2tcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBjbGFzcyBleGlzdHMgb24gZWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaGFzQ2xhc3MoZWwsIGMpIHtcbiAgICBpZiAoIWVsLmZvckVhY2gpIHtcbiAgICAgIGVsID0gdGhpcy50b0FycmF5KGVsKVxuICAgIH1cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgcmV0dXJuIGMuc29tZSggZnVuY3Rpb24gKGMpIHtcbiAgICAgIGxldCBoYXMgPSBmYWxzZVxuICAgICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjKSkge1xuICAgICAgICAgIGhhcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBoYXNcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBvciBjbGFzc2VzIHRvIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IEVsZW1lbnQocykgdG8gYWRkIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gYWRkXG4gICAqL1xuICBzdGF0aWMgYWRkQ2xhc3MoZWwsIGMpIHtcbiAgICBpZiAoIWVsLmZvckVhY2gpIHtcbiAgICAgIGVsID0gdGhpcy50b0FycmF5KGVsKVxuICAgIH1cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgY2xhc3Mgb3IgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IEVsZW1lbnQocykgdG8gcmVtb3ZlIGNsYXNzKGVzKSBmcm9tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byByZW1vdmVcbiAgICovXG4gIHN0YXRpYyByZW1vdmVDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgYSBjbGFzcyBvciBjbGFzc2VzIG9uIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IEVsZW1lbnQocykgdG8gdG9nZ2xlIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gdG9nZ2xlXG4gICAqL1xuICBzdGF0aWMgdG9nZ2xlQ2xhc3MoZWwsIGMpIHtcbiAgICBpZiAoIWVsLmZvckVhY2gpIHtcbiAgICAgIGVsID0gdGhpcy50b0FycmF5KGVsKVxuICAgIH1cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY2xvc2VzdCBwYXJlbnQgZWxlbWVudCBiYXNlZCBvbiBjbGFzcy4gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGVcbiAgICogbmF0aXZlIC5jbG9zZXN0KCkgbWV0aG9kIGluIHRoYXQgaXQgZG9lc24ndCBjaGVjayB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IEVsZW1lbnQgdG8gc3RhcnQgc2VhcmNoIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBjaGVjayBmb3JcbiAgICogQHJldHVybiB7RWxlbWVudH0gQ2xvc2VzdCBwYXJlbnQgZWxlbWVudFxuICAgKi9cbiAgc3RhdGljIGNsb3Nlc3QoZWwsIGMpIHtcbiAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50RWxlbWVudCkgJiYgIXRoaXMuaGFzQ2xhc3MoZWwsIGMpKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIG9yIG9iamVjdCB0byBhbiBhcnJheS4gSWYgYW4gYXJyYXkgaXMgcGFzc2VkLCBpdCdzXG4gICAqIHJldHVybmVkIGFzIGlzLiBBbnl0aGluZyBlbHNlIGlzIHJldHVybmVkIGFzIGFuIGFycmF5LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtPYmplY3R9IFN0cmluZyBvciBvYmplY3QgdG8gY29udmVydCB0byBhbiBhcnJheVxuICAgKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJuIHRoZSBjb252ZXJ0ZWQgYXJyYXlcbiAgICovXG4gIHN0YXRpYyB0b0FycmF5KGl0ZW0pIHtcblxuICAgIGxldCBhcnJheSA9IFtdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgYXJyYXkgPSBpdGVtXG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5LnB1c2goaXRlbSlcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzLiBSZXR1cm5zIGEgbmV3IG9iamVjdC4gU2V0IHRoZSBmaXJzdCBhcmd1bWVudFxuICAgKiB0byBgdHJ1ZWAgZm9yIGEgZGVlcCBvciByZWN1cnNpdmUgbWVyZ2UuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtPcHRpb25hbF0gSWYgdHJ1ZSwgZG8gYSBkZWVwIChvciByZWN1cnNpdmUpIG1lcmdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlcjsgZWFjaCBvdmVycmlkaW5nIHRoZSBuZXh0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IE1lcmdlZCB2YWx1ZXMgb2YgZGVmYXVsdHMgYW5kIG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICBsZXQgZXh0ZW5kZWQgPSB7fVxuICAgIGxldCBkZWVwID0gZmFsc2VcbiAgICBsZXQgaSA9IDBcbiAgICBsZXQgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIGFyZ3VtZW50c1swXSApID09PSAnW29iamVjdCBCb29sZWFuXScgKSB7XG4gICAgICBkZWVwID0gYXJndW1lbnRzWzBdXG4gICAgICBpKytcbiAgICB9XG5cbiAgICBsZXQgbWVyZ2UgPSAoIG9iaiApID0+IHtcbiAgICAgIGZvciAoIGxldCBwcm9wIGluIG9iaiApIHtcbiAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoIG9iaiwgcHJvcCApICkge1xuICAgICAgICAgIGlmICggZGVlcCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW3Byb3BdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGV4dGVuZCggdHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gb2JqW3Byb3BdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICBsZXQgb2JqID0gYXJndW1lbnRzW2ldXG4gICAgICBtZXJnZShvYmopXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZGVkXG4gIH1cblxufVxuIl19

//# sourceMappingURL=scripts.js.map
