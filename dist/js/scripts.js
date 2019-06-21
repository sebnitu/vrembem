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
 * A container component that slides in from the left or right. It typically
 * contains menus, search or other content for your app.
 */
function _default(options) {
  'use strict'; // The api where we assign our methods to and return after running init

  var api = {}; // The settings object which will contain our merged options and defaults obj

  var settings; // The default settings of the component

  var defaults = {
    // Class options
    // {string} The class name to be searched for or used
    classTrigger: 'drawer__trigger',
    classDrawer: 'drawer',
    classDialog: 'drawer__dialog',
    classModal: 'modal',
    classActive: 'is-active',
    // Whether or not to enable the switch functionality
    // {false} || {string} e.g. '[data-drawer-switch]'
    "switch": '[data-drawer-switch]',
    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',
    // Whether or not to store the save state in local storage
    // {false} || {string} The string to save our state object as
    saveState: 'drawerState',
    // Whether or not to output component behavior in console
    debug: true // Drawer specific variables
    // Where we store all our drawers available in the DOM

  };
  var drawers; // Where we store all our switch drawers available in the DOM

  var switchDrawers; // Where we store a save state object before we pass it to local storage

  var drawerState = {};
  /**
   * The constructor method, run as soon as an instance is created
   * ---
   * @param {Object} - A json object with your custom settings
   */

  api.init = function (options) {
    // Merge the defaults and passed options into our settings obj
    settings = _utility["default"].extend(defaults, options || {}); // Get all the drawers on the page

    drawers = document.querySelectorAll('.' + settings.classDrawer); // Init save state functionality if it's enabled

    if (settings.saveState) {
      initSaveState();
    } // Init switch functionality if it's enabled


    if (settings["switch"]) {
      initSwitch();
    } // Add our drawer trigger event listener


    document.addEventListener('click', trigger, false);
  };
  /**
   * The deconstructor method, used to reset or destory the drawer instance
   */


  api.destroy = function () {
    // Clear our variables
    settings = null;
    drawers = null;
    switchDrawers = null;
    drawerState = {}; // Delete the local storage data

    localStorage.removeItem(settings.saveState); // Remove the drawer trigger event listener

    document.removeEventListener('click', trigger, false);
  };
  /**
   * Public method to open a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */


  api.open = function (selector) {
    selector = selector ? selector : '.' + settings.classDrawer;
    toggle(document.querySelectorAll(selector), 'open');
  };
  /**
   * Public method to close a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */


  api.close = function (selector) {
    selector = selector ? selector : '.' + settings.classDrawer;
    toggle(document.querySelectorAll(selector), 'close');
  };
  /**
   * Public method to toggle a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */


  api.toggle = function (selector) {
    selector = selector ? selector : '.' + settings.classDrawer;
    toggle(document.querySelectorAll(selector));
  };
  /**
   * Save the drawer current drawer state
   */


  api.stateSave = function () {
    stateSave();
  };
  /**
   * Return to drawer default state
   */


  api.stateReset = function () {
    stateReset();
  };
  /**
   * Private function to close a drawer or group of drawers
   * ---
   * @param {Object} || {Nodelist} - The drawer element(s) to close
   * @param {String} ['open' || 'close' || 'toggle'] - Whether to open, close
   *  or toggle the drawer(s)
   * @param {Function} - The callback function
   */


  var toggle = function toggle(drawer, state, callback) {
    // Check if drawer(s) should be opened, closed or toggled and either add or
    // remove the active class to the passed drawer(s)
    if (state === 'open') {
      _utility["default"].addClass(drawer, settings.classActive);
    } else if (state === 'close') {
      _utility["default"].removeClass(drawer, settings.classActive);
    } else {
      _utility["default"].toggleClass(drawer, settings.classActive);
    } // Check if save state is enabled


    if (settings.saveState) {
      stateSave(drawer);
    } // Fire the callback function if one was passed


    typeof callback === 'function' && callback();
  };
  /**
   * Private function to toggle drawer via a trigger
   */


  var trigger = function trigger() {
    // Get the closest trigger element from the click event
    var trigger = event.target.closest('.' + settings.classTrigger); // Check that the class trigger was clicked

    if (trigger) {
      // Get the drawer selector from the trigger via [data-target]
      var dataDrawer = trigger.dataset.target; // Check that a drawer target was given

      if (dataDrawer) {
        // Query the drawer element and toggle it if it exists
        var drawer = document.querySelectorAll(dataDrawer);

        if (drawer.length) {
          toggle(drawer);
        }
      }
    }
  };

  var initSaveState = function initSaveState() {
    // Init: Setup our variables
    // Get the drawer state from local storage
    // Check if drawer state was saved otherwise init a new object
    if (localStorage.getItem(settings.saveState)) {
      drawerState = JSON.parse(localStorage.getItem(settings.saveState));
    } // Loop through all drawers and save/init their state


    drawers.forEach(function (drawer) {
      // Set the default state if one is not set
      if (drawer.id in drawerState === false) {
        if (drawer.id) {
          drawerState[drawer.id] = _utility["default"].hasClass(drawer, settings.classActive);
          localStorage.setItem(settings.saveState, JSON.stringify(drawerState));
        }
      } // Get our drawer dialog element


      var dialog = drawer.querySelector('.' + settings.classDialog); // Add a no-transition class and remove it within a transition duration

      _utility["default"].addClass(dialog, 'transition_none');

      var revert = function revert() {
        setTimeout(function () {
          _utility["default"].removeClass(dialog, 'transition_none');
        }, 500);
      }; // Toggle our drawer state based on the saved state


      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close', revert);
      } else {
        toggle(drawer, 'open', revert);
      }
    });
  };

  var stateSave = function stateSave(items) {
    // Save all drawers if an items arg wasn't passed
    items = items ? items : drawers; // Convert to array if only one drawer is passed

    if (!items.forEach) {
      items = _utility["default"].toArray(items);
    } // Loop through our drawers and save their new state to local storage


    items.forEach(function (item) {
      // Only save drawer state if an id exists
      if (item.id) {
        drawerState[item.id] = _utility["default"].hasClass(item, settings.classActive);
        localStorage.setItem(settings.saveState, JSON.stringify(drawerState));
      }
    });
  };

  var stateReset = function stateReset() {
    // Reset our local drawer state variable and delete the local storage data
    drawerState = {};
    localStorage.removeItem(settings.saveState);
  };

  var initSwitch = function initSwitch() {
    // Query all the drawers with the switch feature enabled
    switchDrawers = document.querySelectorAll(settings["switch"]); // Loop through the switch drawers

    switchDrawers.forEach(function (drawer) {
      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      var clean = settings["switch"].replace('[', '').replace(']', '').replace('data-', ''); // Convert sring to camelCase

      clean = clean.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }); // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings

      var bp = drawer.dataset[clean];

      if (bp) {
        bp = _utility["default"].getBreakpoint(bp);

        if (!bp) {
          bp = drawer.dataset[clean];
        }
      } else {
        bp = _utility["default"].getBreakpoint(settings.switchBreakpoint);

        if (!bp) {
          bp = settings.switchBreakpoint;
        }
      } // Media query listener


      var mq = window.matchMedia("(min-width:" + bp + ")");
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
    drawer.className = drawer.className.replace(regex, settings.classDrawer);
    dialog.className = dialog.className.replace(regex, settings.classDrawer);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(regex, settings.classDrawer);
    }); // Open or close drawer based on save state

    if (settings.saveState) {
      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close');
      } else {
        toggle(drawer, 'open');
      }
    }
  };

  var switchModal = function switchModal(drawer) {
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]');
    var regex = /drawer/gi;
    drawer.className = drawer.className.replace(regex, settings.classModal);
    dialog.className = dialog.className.replace(regex, settings.classModal);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(regex, settings.classModal);
    }); // Remove active class for modal styles by default

    _utility["default"].removeClass(drawer, settings.classActive);
  }; // Run the constructor method


  api.init(options); // Return the API for running public methods

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

/**
 * Modal plugin
 * ---
 * A component for changing the mode of a page to complete a critical task.
 * This is usually used in conjunction with the Dialog component to make
 * modal dialogs.
 */
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
     * @param {String} - The key to search for in the breakpoints object
     * @returns {String} - The pixel value of the breakpoint as a string
     */
    value: function getBreakpoint(key) {
      return _config["default"].breakpoints[key];
    }
    /**
     * Checks if an element has a class or not
     * ---
     * @param {Object} || {Nodelist} - Element(s) to check class(es) on
     * @param {String} || {Array} - Class(es) to check
     * @returns {Boolean} - Returns true if class exists, otherwise false
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
     * @param {Object} || {Nodelist} - Element(s) to add class(es) on
     * @param {String} || {Array} - Class(es) to add
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
     * @param {Object} || {Nodelist} - Element(s) to remove class(es) from
     * @param {String} || {Array} - Class(es) to remove
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
     * @param {Object} || {Nodelist} - Element(s) to toggle class(es) on
     * @param {String} || {Array} - Class(es) to toggle
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
     * @param {Object} - Element to start search on
     * @param {String} || {Array} - Class(es) to check for
     * @return {Element} - Closest parent element
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
     * @param {String} || {Object} - String or object to convert to an array
     * @return {Array} - Return the converted array
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
     * @param {Boolean} [Optional] - If true, do a deep (or recursive) merge
     * @param {Object} - The objects to merge together; each overriding the next
     * @returns {Object} - Merged values of defaults and options
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbmZpZy5qc29uIiwic3JjL2pzL2Rpc21pc3NpYmxlLmpzIiwic3JjL2pzL2RyYXdlci5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy90b2dnbGUuanMiLCJzcmMvanMvdXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNLFdBQVcsR0FBRyxJQUFJLHVCQUFKLEVBQXBCO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmO0FBQ0EsSUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBSixFQUFkO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmOzs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDVEE7Ozs7QUFFZSxrQkFBUyxPQUFULEVBQWtCO0FBRS9COztBQUVBLE1BQUksR0FBRyxHQUFHLEVBQVY7QUFDQSxNQUFJLFFBQUo7QUFDQSxNQUFNLFFBQVEsR0FBRztBQUNmLElBQUEsT0FBTyxFQUFFLGdCQURNO0FBRWYsSUFBQSxNQUFNLEVBQUUsb0JBRk87QUFHZixJQUFBLFdBQVcsRUFBRTtBQUhFLEdBQWpCOztBQU1BLEVBQUEsR0FBRyxDQUFDLElBQUosR0FBVyxVQUFDLE9BQUQsRUFBYTtBQUN0QixJQUFBLFFBQVEsR0FBRyxvQkFBRSxNQUFGLENBQVUsUUFBVixFQUFvQixPQUFPLElBQUksRUFBL0IsQ0FBWDtBQUNBLElBQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLEtBQXhDO0FBQ0QsR0FIRDs7QUFLQSxFQUFBLEdBQUcsQ0FBQyxPQUFKLEdBQWMsWUFBTTtBQUNsQixJQUFBLFFBQVEsR0FBRyxJQUFYO0FBQ0EsSUFB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Q0FBaUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBK0IsR0FBRyxDQUFDLElBQUQsQ0FBbEMsTUFBOEMsaUJBQTNELEVBQStFO0FBQzdFLGNBQUEsUUFBUSxDQUFDLElBQUQsQ0FBUixHQUFpQixNQUFNLENBQUUsSUFBRixFQUFRLFFBQVEsQ0FBQyxJQUFELENBQWhCLEVBQXdCLEdBQUcsQ0FBQyxJQUFELENBQTNCLENBQXZCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsY0FBQSxRQUFRLENBQUMsSUFBRCxDQUFSLEdBQWlCLEdBQUcsQ0FBQyxJQUFELENBQXBCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsT0FWRDs7QUFZQSxhQUFRLENBQUMsR0FBRyxNQUFaLEVBQW9CLENBQUMsRUFBckIsRUFBMEI7QUFDeEIsWUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUQsQ0FBbkI7QUFDQSxRQUFBLEtBQUssQ0FBQyxHQUFELENBQUw7QUFDRDs7QUFFRCxhQUFPLFFBQVA7QUFDRCxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IERpc21pc3NpYmxlIGZyb20gJy4vZGlzbWlzc2libGUnXG5pbXBvcnQgRHJhd2VyIGZyb20gJy4vZHJhd2VyJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwnXG5pbXBvcnQgVG9nZ2xlIGZyb20gJy4vdG9nZ2xlJ1xuXG5jb25zdCBkaXNtaXNzaWJsZSA9IG5ldyBEaXNtaXNzaWJsZSgpXG5jb25zdCBkcmF3ZXIgPSBuZXcgRHJhd2VyKClcbmNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKClcbmNvbnN0IHRvZ2dsZSA9IG5ldyBUb2dnbGUoKVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImJyZWFrcG9pbnRzXCIgOiB7XG4gICAgXCJ4c1wiOiBcIjQ4MHB4XCIsXG4gICAgXCJzbVwiOiBcIjYyMHB4XCIsXG4gICAgXCJtZFwiOiBcIjc2MHB4XCIsXG4gICAgXCJsZ1wiOiBcIjk5MHB4XCIsXG4gICAgXCJ4bFwiOiBcIjEzODBweFwiXG4gIH1cbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgdHJpZ2dlcjogJ1tkYXRhLWRpc21pc3NdJyxcbiAgICB0YXJnZXQ6ICdbZGF0YS1kaXNtaXNzaWJsZV0nLFxuICAgIGNsYXNzVG9nZ2xlOiAnZGlzbWlzcydcbiAgfVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgbGV0IHRhcmdldCA9IHRyaWdnZXIuY2xvc2VzdChzZXR0aW5ncy50YXJnZXQpXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc1RvZ2dsZSlcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbi8qKlxuICogRHJhd2VyIHBsdWdpblxuICogLS0tXG4gKiBBIGNvbnRhaW5lciBjb21wb25lbnQgdGhhdCBzbGlkZXMgaW4gZnJvbSB0aGUgbGVmdCBvciByaWdodC4gSXQgdHlwaWNhbGx5XG4gKiBjb250YWlucyBtZW51cywgc2VhcmNoIG9yIG90aGVyIGNvbnRlbnQgZm9yIHlvdXIgYXBwLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgLy8gVGhlIGFwaSB3aGVyZSB3ZSBhc3NpZ24gb3VyIG1ldGhvZHMgdG8gYW5kIHJldHVybiBhZnRlciBydW5uaW5nIGluaXRcbiAgbGV0IGFwaSA9IHt9XG5cbiAgLy8gVGhlIHNldHRpbmdzIG9iamVjdCB3aGljaCB3aWxsIGNvbnRhaW4gb3VyIG1lcmdlZCBvcHRpb25zIGFuZCBkZWZhdWx0cyBvYmpcbiAgbGV0IHNldHRpbmdzXG5cbiAgLy8gVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNvbXBvbmVudFxuICBjb25zdCBkZWZhdWx0cyA9IHtcblxuICAgIC8vIENsYXNzIG9wdGlvbnNcbiAgICAvLyB7c3RyaW5nfSBUaGUgY2xhc3MgbmFtZSB0byBiZSBzZWFyY2hlZCBmb3Igb3IgdXNlZFxuICAgIGNsYXNzVHJpZ2dlcjogJ2RyYXdlcl9fdHJpZ2dlcicsXG4gICAgY2xhc3NEcmF3ZXI6ICdkcmF3ZXInLFxuICAgIGNsYXNzRGlhbG9nOiAnZHJhd2VyX19kaWFsb2cnLFxuICAgIGNsYXNzTW9kYWw6ICdtb2RhbCcsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gZW5hYmxlIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eVxuICAgIC8vIHtmYWxzZX0gfHwge3N0cmluZ30gZS5nLiAnW2RhdGEtZHJhd2VyLXN3aXRjaF0nXG4gICAgc3dpdGNoOiAnW2RhdGEtZHJhd2VyLXN3aXRjaF0nLFxuXG4gICAgLy8gVGhlIGRlZmF1bHQgYnJlYWsgcG9pbnQgZm9yIHdoZW4gdG8gc3dpdGNoIHRvIGRyYXdlciBvciBtb2RhbCBjbGFzc2VzXG4gICAgLy8ge3N0cmluZ30gRWl0aGVyIGEgYnJlYWtwb2ludCBrZXkgb3IgcGl4ZWwgdmFsdWVcbiAgICBzd2l0Y2hCcmVha3BvaW50OiAnbGcnLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gc3RvcmUgdGhlIHNhdmUgc3RhdGUgaW4gbG9jYWwgc3RvcmFnZVxuICAgIC8vIHtmYWxzZX0gfHwge3N0cmluZ30gVGhlIHN0cmluZyB0byBzYXZlIG91ciBzdGF0ZSBvYmplY3QgYXNcbiAgICBzYXZlU3RhdGU6ICdkcmF3ZXJTdGF0ZScsXG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0byBvdXRwdXQgY29tcG9uZW50IGJlaGF2aW9yIGluIGNvbnNvbGVcbiAgICBkZWJ1ZzogdHJ1ZVxuICB9XG5cbiAgLy8gRHJhd2VyIHNwZWNpZmljIHZhcmlhYmxlc1xuICAvLyBXaGVyZSB3ZSBzdG9yZSBhbGwgb3VyIGRyYXdlcnMgYXZhaWxhYmxlIGluIHRoZSBET01cbiAgbGV0IGRyYXdlcnNcbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBzd2l0Y2ggZHJhd2VycyBhdmFpbGFibGUgaW4gdGhlIERPTVxuICBsZXQgc3dpdGNoRHJhd2Vyc1xuICAvLyBXaGVyZSB3ZSBzdG9yZSBhIHNhdmUgc3RhdGUgb2JqZWN0IGJlZm9yZSB3ZSBwYXNzIGl0IHRvIGxvY2FsIHN0b3JhZ2VcbiAgbGV0IGRyYXdlclN0YXRlID0ge31cblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIG1ldGhvZCwgcnVuIGFzIHNvb24gYXMgYW4gaW5zdGFuY2UgaXMgY3JlYXRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IC0gQSBqc29uIG9iamVjdCB3aXRoIHlvdXIgY3VzdG9tIHNldHRpbmdzXG4gICAqL1xuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG5cbiAgICAvLyBNZXJnZSB0aGUgZGVmYXVsdHMgYW5kIHBhc3NlZCBvcHRpb25zIGludG8gb3VyIHNldHRpbmdzIG9ialxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcblxuICAgIC8vIEdldCBhbGwgdGhlIGRyYXdlcnMgb24gdGhlIHBhZ2VcbiAgICBkcmF3ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc0RyYXdlcilcblxuICAgIC8vIEluaXQgc2F2ZSBzdGF0ZSBmdW5jdGlvbmFsaXR5IGlmIGl0J3MgZW5hYmxlZFxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGluaXRTYXZlU3RhdGUoKVxuICAgIH1cblxuICAgIC8vIEluaXQgc3dpdGNoIGZ1bmN0aW9uYWxpdHkgaWYgaXQncyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnN3aXRjaCkge1xuICAgICAgaW5pdFN3aXRjaCgpXG4gICAgfVxuXG4gICAgLy8gQWRkIG91ciBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICogVGhlIGRlY29uc3RydWN0b3IgbWV0aG9kLCB1c2VkIHRvIHJlc2V0IG9yIGRlc3RvcnkgdGhlIGRyYXdlciBpbnN0YW5jZVxuICAgKi9cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG5cbiAgICAvLyBDbGVhciBvdXIgdmFyaWFibGVzXG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZHJhd2VycyA9IG51bGxcbiAgICBzd2l0Y2hEcmF3ZXJzID0gbnVsbFxuICAgIGRyYXdlclN0YXRlID0ge31cblxuICAgIC8vIERlbGV0ZSB0aGUgbG9jYWwgc3RvcmFnZSBkYXRhXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc2V0dGluZ3Muc2F2ZVN0YXRlKVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBvcGVuIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NEcmF3ZXJcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksICdvcGVuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkuY2xvc2UgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzRHJhd2VyXG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnY2xvc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gdG9nZ2xlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkudG9nZ2xlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc0RyYXdlclxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBkcmF3ZXIgY3VycmVudCBkcmF3ZXIgc3RhdGVcbiAgICovXG4gIGFwaS5zdGF0ZVNhdmUgPSAoKSA9PiB7XG4gICAgc3RhdGVTYXZlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdG8gZHJhd2VyIGRlZmF1bHQgc3RhdGVcbiAgICovXG4gIGFwaS5zdGF0ZVJlc2V0ID0gKCkgPT4ge1xuICAgIHN0YXRlUmVzZXQoKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdG8gY2xvc2UgYSBkcmF3ZXIgb3IgZ3JvdXAgb2YgZHJhd2Vyc1xuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gLSBUaGUgZHJhd2VyIGVsZW1lbnQocykgdG8gY2xvc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IFsnb3BlbicgfHwgJ2Nsb3NlJyB8fCAndG9nZ2xlJ10gLSBXaGV0aGVyIHRvIG9wZW4sIGNsb3NlXG4gICAqICBvciB0b2dnbGUgdGhlIGRyYXdlcihzKVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgY29uc3QgdG9nZ2xlID0gKGRyYXdlciwgc3RhdGUsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyBDaGVjayBpZiBkcmF3ZXIocykgc2hvdWxkIGJlIG9wZW5lZCwgY2xvc2VkIG9yIHRvZ2dsZWQgYW5kIGVpdGhlciBhZGQgb3JcbiAgICAvLyByZW1vdmUgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgcGFzc2VkIGRyYXdlcihzKVxuICAgIGlmIChzdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICB1LmFkZENsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnRvZ2dsZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgc2F2ZSBzdGF0ZSBpcyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgc3RhdGVTYXZlKGRyYXdlcilcbiAgICB9XG5cbiAgICAvLyBGaXJlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpZiBvbmUgd2FzIHBhc3NlZFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjaygpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0byB0b2dnbGUgZHJhd2VyIHZpYSBhIHRyaWdnZXJcbiAgICovXG4gIGNvbnN0IHRyaWdnZXIgPSAoKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGNsb3Nlc3QgdHJpZ2dlciBlbGVtZW50IGZyb20gdGhlIGNsaWNrIGV2ZW50XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG5cbiAgICAvLyBDaGVjayB0aGF0IHRoZSBjbGFzcyB0cmlnZ2VyIHdhcyBjbGlja2VkXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgLy8gR2V0IHRoZSBkcmF3ZXIgc2VsZWN0b3IgZnJvbSB0aGUgdHJpZ2dlciB2aWEgW2RhdGEtdGFyZ2V0XVxuICAgICAgbGV0IGRhdGFEcmF3ZXIgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG5cbiAgICAgIC8vIENoZWNrIHRoYXQgYSBkcmF3ZXIgdGFyZ2V0IHdhcyBnaXZlblxuICAgICAgaWYgKGRhdGFEcmF3ZXIpIHtcblxuICAgICAgICAvLyBRdWVyeSB0aGUgZHJhd2VyIGVsZW1lbnQgYW5kIHRvZ2dsZSBpdCBpZiBpdCBleGlzdHNcbiAgICAgICAgbGV0IGRyYXdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZGF0YURyYXdlcilcbiAgICAgICAgaWYgKGRyYXdlci5sZW5ndGgpIHtcbiAgICAgICAgICB0b2dnbGUoZHJhd2VyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaW5pdFNhdmVTdGF0ZSA9ICgpID0+IHtcblxuICAgIC8vIEluaXQ6IFNldHVwIG91ciB2YXJpYWJsZXNcbiAgICAvLyBHZXQgdGhlIGRyYXdlciBzdGF0ZSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICAvLyBDaGVjayBpZiBkcmF3ZXIgc3RhdGUgd2FzIHNhdmVkIG90aGVyd2lzZSBpbml0IGEgbmV3IG9iamVjdFxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShzZXR0aW5ncy5zYXZlU3RhdGUpKSB7XG4gICAgICBkcmF3ZXJTdGF0ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oc2V0dGluZ3Muc2F2ZVN0YXRlKSlcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggYWxsIGRyYXdlcnMgYW5kIHNhdmUvaW5pdCB0aGVpciBzdGF0ZVxuICAgIGRyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG5cbiAgICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzdGF0ZSBpZiBvbmUgaXMgbm90IHNldFxuICAgICAgaWYgKGRyYXdlci5pZCBpbiBkcmF3ZXJTdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGRyYXdlci5pZCkge1xuICAgICAgICAgIGRyYXdlclN0YXRlW2RyYXdlci5pZF0gPSB1Lmhhc0NsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc2V0dGluZ3Muc2F2ZVN0YXRlLCBKU09OLnN0cmluZ2lmeShkcmF3ZXJTdGF0ZSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gR2V0IG91ciBkcmF3ZXIgZGlhbG9nIGVsZW1lbnRcbiAgICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLicgKyBzZXR0aW5ncy5jbGFzc0RpYWxvZylcblxuICAgICAgLy8gQWRkIGEgbm8tdHJhbnNpdGlvbiBjbGFzcyBhbmQgcmVtb3ZlIGl0IHdpdGhpbiBhIHRyYW5zaXRpb24gZHVyYXRpb25cbiAgICAgIHUuYWRkQ2xhc3MoZGlhbG9nLCAndHJhbnNpdGlvbl9ub25lJylcbiAgICAgIGxldCByZXZlcnQgPSAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB1LnJlbW92ZUNsYXNzKGRpYWxvZywgJ3RyYW5zaXRpb25fbm9uZScpXG4gICAgICAgICAgfSwgNTAwXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgLy8gVG9nZ2xlIG91ciBkcmF3ZXIgc3RhdGUgYmFzZWQgb24gdGhlIHNhdmVkIHN0YXRlXG4gICAgICBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ2Nsb3NlJywgcmV2ZXJ0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nLCByZXZlcnQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0IHN0YXRlU2F2ZSA9IChpdGVtcykgPT4ge1xuXG4gICAgLy8gU2F2ZSBhbGwgZHJhd2VycyBpZiBhbiBpdGVtcyBhcmcgd2Fzbid0IHBhc3NlZFxuICAgIGl0ZW1zID0gKGl0ZW1zKSA/IGl0ZW1zIDogZHJhd2Vyc1xuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaWYgKCFpdGVtcy5mb3JFYWNoKSB7XG4gICAgICBpdGVtcyA9IHUudG9BcnJheShpdGVtcylcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggb3VyIGRyYXdlcnMgYW5kIHNhdmUgdGhlaXIgbmV3IHN0YXRlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBPbmx5IHNhdmUgZHJhd2VyIHN0YXRlIGlmIGFuIGlkIGV4aXN0c1xuICAgICAgaWYgKGl0ZW0uaWQpIHtcbiAgICAgICAgZHJhd2VyU3RhdGVbaXRlbS5pZF0gPSB1Lmhhc0NsYXNzKGl0ZW0sIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzZXR0aW5ncy5zYXZlU3RhdGUsIEpTT04uc3RyaW5naWZ5KGRyYXdlclN0YXRlKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc3RhdGVSZXNldCA9ICgpID0+IHtcblxuICAgIC8vIFJlc2V0IG91ciBsb2NhbCBkcmF3ZXIgc3RhdGUgdmFyaWFibGUgYW5kIGRlbGV0ZSB0aGUgbG9jYWwgc3RvcmFnZSBkYXRhXG4gICAgZHJhd2VyU3RhdGUgPSB7fVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHNldHRpbmdzLnNhdmVTdGF0ZSlcbiAgfVxuXG4gIGNvbnN0IGluaXRTd2l0Y2ggPSAoKSA9PiB7XG5cbiAgICAvLyBRdWVyeSBhbGwgdGhlIGRyYXdlcnMgd2l0aCB0aGUgc3dpdGNoIGZlYXR1cmUgZW5hYmxlZFxuICAgIHN3aXRjaERyYXdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnN3aXRjaClcblxuICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgc3dpdGNoIGRyYXdlcnNcbiAgICBzd2l0Y2hEcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuXG4gICAgICAvLyBHZXQgdGhlIGxvY2FsIGJyZWFrcG9pbnQgaWYgb25lIGlzIHNldFxuICAgICAgLy8gUmVtb3ZlIGJyYWNrZXRzIGFuZCB0aGUgaW50aWFsIGRhdGEgZmxhZ1xuICAgICAgbGV0IGNsZWFuID0gc2V0dGluZ3Muc3dpdGNoXG4gICAgICAgIC5yZXBsYWNlKCdbJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCddJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCdkYXRhLScsICcnKVxuXG4gICAgICAvLyBDb252ZXJ0IHNyaW5nIHRvIGNhbWVsQ2FzZVxuICAgICAgY2xlYW4gPSBjbGVhbi5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAoZykge1xuICAgICAgICByZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpXG4gICAgICB9KVxuXG4gICAgICAvLyBDaGVjayB3aGljaCBicmVha3BvaW50IHRvIHVzZTpcbiAgICAgIC8vIGEpIFRoZSBsb2NhbCBicCBzZXQgb24gdGhlIGRyYXdlclxuICAgICAgLy8gYikgVGhlIGJwIGF2YWlsYWJsZSBpbiBjb25maWcgdXNpbmcgYSBrZXlcbiAgICAgIC8vIGMpIFRoZSByYXcgcGl4ZWwgdmFsdWUgcHJvdmlkZWQgaW4gc2V0dGluZ3NcbiAgICAgIGxldCBicCA9IGRyYXdlci5kYXRhc2V0W2NsZWFuXVxuICAgICAgaWYgKGJwKSB7XG4gICAgICAgIGJwID0gdS5nZXRCcmVha3BvaW50KGJwKVxuICAgICAgICBpZiAoIWJwKSB7XG4gICAgICAgICAgYnAgPSBkcmF3ZXIuZGF0YXNldFtjbGVhbl1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnAgPSB1LmdldEJyZWFrcG9pbnQoc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1lZGlhIHF1ZXJ5IGxpc3RlbmVyXG4gICAgICBsZXQgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYSggXCIobWluLXdpZHRoOlwiICsgYnAgKyBcIilcIiApXG4gICAgICBtcS5hZGRMaXN0ZW5lcigobXEpID0+IHtcbiAgICAgICAgc3dpdGNoQ2hlY2sobXEsIGRyYXdlcilcbiAgICAgIH0pXG4gICAgICBzd2l0Y2hDaGVjayhtcSwgZHJhd2VyKVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzd2l0Y2hDaGVjayA9IChtcSwgZHJhd2VyKSA9PiB7XG4gICAgaWYgKG1xLm1hdGNoZXMpIHtcbiAgICAgIHN3aXRjaERyYXdlcihkcmF3ZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaE1vZGFsKGRyYXdlcilcbiAgICB9XG4gIH1cblxuICBjb25zdCBzd2l0Y2hEcmF3ZXIgPSAoZHJhd2VyKSA9PiB7XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuICAgIGxldCByZWdleCA9IC9tb2RhbC9naVxuXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgc2V0dGluZ3MuY2xhc3NEcmF3ZXIpXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgc2V0dGluZ3MuY2xhc3NEcmF3ZXIpXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKHJlZ2V4LCBzZXR0aW5ncy5jbGFzc0RyYXdlcilcbiAgICB9KVxuXG4gICAgLy8gT3BlbiBvciBjbG9zZSBkcmF3ZXIgYmFzZWQgb24gc2F2ZSBzdGF0ZVxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnY2xvc2UnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHN3aXRjaE1vZGFsID0gKGRyYXdlcikgPT4ge1xuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcbiAgICBsZXQgcmVnZXggPSAvZHJhd2VyL2dpXG5cbiAgICBkcmF3ZXIuY2xhc3NOYW1lID0gZHJhd2VyLmNsYXNzTmFtZS5yZXBsYWNlKHJlZ2V4LCBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UocmVnZXgsIHNldHRpbmdzLmNsYXNzTW9kYWwpXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKHJlZ2V4LCBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZvciBtb2RhbCBzdHlsZXMgYnkgZGVmYXVsdFxuICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgfVxuXG4gIC8vIFJ1biB0aGUgY29uc3RydWN0b3IgbWV0aG9kXG4gIGFwaS5pbml0KG9wdGlvbnMpXG5cbiAgLy8gUmV0dXJuIHRoZSBBUEkgZm9yIHJ1bm5pbmcgcHVibGljIG1ldGhvZHNcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIE1vZGFsIHBsdWdpblxuICogLS0tXG4gKiBBIGNvbXBvbmVudCBmb3IgY2hhbmdpbmcgdGhlIG1vZGUgb2YgYSBwYWdlIHRvIGNvbXBsZXRlIGEgY3JpdGljYWwgdGFzay5cbiAqIFRoaXMgaXMgdXN1YWxseSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIERpYWxvZyBjb21wb25lbnQgdG8gbWFrZVxuICogbW9kYWwgZGlhbG9ncy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgY2xhc3NUcmlnZ2VyOiAnbW9kYWxfX3RyaWdnZXInLFxuICAgIGNsYXNzTW9kYWw6ICdtb2RhbCcsXG4gICAgY2xhc3NEaWFsb2c6ICdtb2RhbF9fZGlhbG9nJyxcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgZm9jdXM6ICdbZGF0YS1mb2N1c10nXG4gIH1cblxuICBsZXQgbWVtb3J5VHJpZ2dlclxuICBsZXQgbWVtb3J5VGFyZ2V0XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBvcGVuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICB9XG5cbiAgYXBpLmNsb3NlID0gKGNsZWFyKSA9PiB7XG4gICAgY2xvc2UoY2xlYXIpXG4gIH1cblxuICBjb25zdCBvcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIHUuYWRkQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lml0ZW0oMClcbiAgICAgIGxldCBmb2N1cyA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLmZvY3VzKVxuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChmb2N1cykge1xuICAgICAgICAgIGZvY3VzLmZvY3VzKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsb3NlID0gKGNsZWFyID0gZmFsc2UpID0+IHtcbiAgICBsZXQgbW9kYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIHUucmVtb3ZlQ2xhc3MobW9kYWxzLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAoY2xlYXIgPT0gZmFsc2UgJiYgbWVtb3J5VHJpZ2dlciAmJiBtZW1vcnlUYXJnZXQpIHtcbiAgICAgIGlmIChtZW1vcnlUYXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IG1lbW9yeVRhcmdldC5pdGVtKDApXG4gICAgICAgIG1lbW9yeVRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICAgIGlmIChtZW1vcnlUcmlnZ2VyKSB7XG4gICAgICAgICAgICBtZW1vcnlUcmlnZ2VyLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNsZWFyID09IHRydWUpIHtcbiAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZXNjYXBlID0gKCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyKVxuICAgIGxldCBtb2RhbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzTW9kYWwpXG4gICAgbGV0IGRpYWxvZyA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzRGlhbG9nKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBjbG9zZSgpXG4gICAgICBsZXQgZGF0YU1vZGFsID0gdHJpZ2dlci5kYXRhc2V0LnRhcmdldFxuICAgICAgaWYgKGRhdGFNb2RhbCkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRhdGFNb2RhbClcbiAgICAgICAgbWVtb3J5VHJpZ2dlciA9IHRyaWdnZXJcbiAgICAgICAgb3BlbihtZW1vcnlUYXJnZXQpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSBlbHNlIGlmIChtb2RhbCAmJiAhZGlhbG9nKSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtdG9nZ2xlLWNsYXNzXScsXG4gICAgdGFyZ2V0czogJycsXG4gICAgY2xhc3M6ICcnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcblxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcblxuICAgIGlmICh0cmlnZ2VyKSB7XG5cbiAgICAgIGxldCB0YXJnZXRzXG5cbiAgICAgIGlmIChzZXR0aW5ncy50YXJnZXRzKSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnRhcmdldHMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlVGFyZ2V0KVxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0dGluZ3MuY2xhc3MpIHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRyaWdnZXIsIHNldHRpbmdzLmNsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJ1xuXG4vKipcbiAqIFV0aWxpdHlcbiAqIC0tLVxuICogQSBzZXQgb2YgaGVscGVyIG1ldGhvZHMgZm9yIGdlbmVyYWwgamF2YXNjcmlwdCBwbHVnaW4gdXNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgb3V0cHV0IGEgYnJlYWtwb2ludCB1c2luZyBpdCdzIGtleSBmb3VuZCBpbiBjb25maWcuanNvblxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IC0gVGhlIGtleSB0byBzZWFyY2ggZm9yIGluIHRoZSBicmVha3BvaW50cyBvYmplY3RcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBUaGUgcGl4ZWwgdmFsdWUgb2YgdGhlIGJyZWFrcG9pbnQgYXMgYSBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBnZXRCcmVha3BvaW50KGtleSkge1xuICAgIHJldHVybiBjb25maWcuYnJlYWtwb2ludHNba2V5XVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzIG9yIG5vdFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gLSBFbGVtZW50KHMpIHRvIGNoZWNrIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSAtIENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgY2xhc3MgZXhpc3RzLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICByZXR1cm4gYy5zb21lKCBmdW5jdGlvbiAoYykge1xuICAgICAgbGV0IGhhcyA9IGZhbHNlXG4gICAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGMpKSB7XG4gICAgICAgICAgaGFzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGhhc1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIG9yIGNsYXNzZXMgdG8gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gLSBFbGVtZW50KHMpIHRvIGFkZCBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gLSBDbGFzcyhlcykgdG8gYWRkXG4gICAqL1xuICBzdGF0aWMgYWRkQ2xhc3MoZWwsIGMpIHtcbiAgICBpZiAoIWVsLmZvckVhY2gpIHtcbiAgICAgIGVsID0gdGhpcy50b0FycmF5KGVsKVxuICAgIH1cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgY2xhc3Mgb3IgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IC0gRWxlbWVudChzKSB0byByZW1vdmUgY2xhc3MoZXMpIGZyb21cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gLSBDbGFzcyhlcykgdG8gcmVtb3ZlXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlQ2xhc3MoZWwsIGMpIHtcbiAgICBpZiAoIWVsLmZvckVhY2gpIHtcbiAgICAgIGVsID0gdGhpcy50b0FycmF5KGVsKVxuICAgIH1cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGEgY2xhc3Mgb3IgY2xhc3NlcyBvbiBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gfHwge05vZGVsaXN0fSAtIEVsZW1lbnQocykgdG8gdG9nZ2xlIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSAtIENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IGJhc2VkIG9uIGNsYXNzLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgKiBuYXRpdmUgLmNsb3Nlc3QoKSBtZXRob2QgaW4gdGhhdCBpdCBkb2Vzbid0IGNoZWNrIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gLSBFbGVtZW50IHRvIHN0YXJ0IHNlYXJjaCBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSAtIENsYXNzKGVzKSB0byBjaGVjayBmb3JcbiAgICogQHJldHVybiB7RWxlbWVudH0gLSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdChlbCwgYykge1xuICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSAmJiAhdGhpcy5oYXNDbGFzcyhlbCwgYykpXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBzdHJpbmcgb3Igb2JqZWN0IHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3NcbiAgICogcmV0dXJuZWQgYXMgaXMuIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge09iamVjdH0gLSBTdHJpbmcgb3Igb2JqZWN0IHRvIGNvbnZlcnQgdG8gYW4gYXJyYXlcbiAgICogQHJldHVybiB7QXJyYXl9IC0gUmV0dXJuIHRoZSBjb252ZXJ0ZWQgYXJyYXlcbiAgICovXG4gIHN0YXRpYyB0b0FycmF5KGl0ZW0pIHtcblxuICAgIGxldCBhcnJheSA9IFtdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgYXJyYXkgPSBpdGVtXG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5LnB1c2goaXRlbSlcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzLiBSZXR1cm5zIGEgbmV3IG9iamVjdC4gU2V0IHRoZSBmaXJzdCBhcmd1bWVudFxuICAgKiB0byBgdHJ1ZWAgZm9yIGEgZGVlcCBvciByZWN1cnNpdmUgbWVyZ2UuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtPcHRpb25hbF0gLSBJZiB0cnVlLCBkbyBhIGRlZXAgKG9yIHJlY3Vyc2l2ZSkgbWVyZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IC0gVGhlIG9iamVjdHMgdG8gbWVyZ2UgdG9nZXRoZXI7IGVhY2ggb3ZlcnJpZGluZyB0aGUgbmV4dFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIE1lcmdlZCB2YWx1ZXMgb2YgZGVmYXVsdHMgYW5kIG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICBsZXQgZXh0ZW5kZWQgPSB7fVxuICAgIGxldCBkZWVwID0gZmFsc2VcbiAgICBsZXQgaSA9IDBcbiAgICBsZXQgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIGFyZ3VtZW50c1swXSApID09PSAnW29iamVjdCBCb29sZWFuXScgKSB7XG4gICAgICBkZWVwID0gYXJndW1lbnRzWzBdXG4gICAgICBpKytcbiAgICB9XG5cbiAgICBsZXQgbWVyZ2UgPSAoIG9iaiApID0+IHtcbiAgICAgIGZvciAoIGxldCBwcm9wIGluIG9iaiApIHtcbiAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoIG9iaiwgcHJvcCApICkge1xuICAgICAgICAgIGlmICggZGVlcCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW3Byb3BdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGV4dGVuZCggdHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gb2JqW3Byb3BdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICBsZXQgb2JqID0gYXJndW1lbnRzW2ldXG4gICAgICBtZXJnZShvYmopXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZGVkXG4gIH1cblxufVxuIl19

//# sourceMappingURL=scripts.js.map
