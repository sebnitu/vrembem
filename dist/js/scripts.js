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
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    // Element classes
    classTarget: 'drawer__item',
    classTrigger: 'drawer__trigger',
    classInner: 'drawer__dialog',
    // Used with RegExp to search and replace element classes
    classTargetSwitch: 'modal',
    classTriggerSwitch: 'modal__trigger',
    classInnerSwitch: 'modal__dialog',
    // The class that is used to make an item active
    classActive: 'is-active',
    classTransitionNone: 'transition_none',
    // Whether or not to store the save state in local storage
    // {boolean} The string to save our state object as
    saveState: true,
    // Whether or not to enable the switch functionality
    // If enabled, a string selector to check for should be passed.
    // {false} || {string} e.g. '[data-drawer-switch]'
    "switch": '[data-drawer-switch]',
    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',
    // Duration before removing the transition_none class on initial load
    transitionDuration: 500 // Drawer specific variables
    // Where we store all our drawers available in the DOM

  };
  var drawers = []; // Where we build the save state object before we pass it to local storage

  var drawerState = {}; // Where we store all our switch drawers available in the DOM

  var switchDrawers; // Where we store all our media query lists along with their drawers

  var mqlArray = [];
  /**
   * The constructor method, run as soon as an instance is created
   * ---
   * @param {Object} options - A json object with your custom settings
   */

  api.init = function (options) {
    // Merge the defaults and passed options into our settings obj
    settings = _utility["default"].extend(defaults, options || {}); // Get all the drawers on the page and save them with their default state

    document.querySelectorAll('.' + settings.classTarget).forEach(function (drawer) {
      drawers.push({
        'drawer': drawer,
        'defaultState': _utility["default"].hasClass(drawer, settings.classActive)
      });
    }); // Initialize a promise and init save state if it's enabled

    var promiseSaveState = new Promise(function (resolve) {
      if (settings.saveState) {
        initSaveState(resolve);
      } else {
        resolve();
      }
    }); // After promise is resolved and switch is enabled, initialize switch

    promiseSaveState.then(function () {
      if (settings["switch"]) {
        initSwitch();
      }
    }); // Add our drawer trigger event listener

    document.addEventListener('click', trigger, false);
  };
  /**
   * The deconstructor method, used to reset and destroy the drawer instance
   * ---
   * @param {Boolean} defaultState - Return drawers to their default state?
   */


  api.destroy = function () {
    var defaultState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    // Destroy our switch
    destroySwitch(); // Destroy our state

    stateClear(); // Return drawrs to their default state

    if (defaultState) {
      drawers.forEach(function (item) {
        if (item.defaultState) {
          _utility["default"].addClass(item.drawer, settings.classActive);
        }
      });
    } // Clear our variables


    settings = null;
    drawers = []; // Remove the drawer trigger event listener

    document.removeEventListener('click', trigger, false);
  };
  /**
   * Public method to open a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.open = function (selector) {
    selector = selector ? selector : '.' + settings.classTarget;
    toggle(document.querySelectorAll(selector), 'open');
  };
  /**
   * Public method to close a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.close = function (selector) {
    selector = selector ? selector : '.' + settings.classTarget;
    toggle(document.querySelectorAll(selector), 'close');
  };
  /**
   * Public method to toggle a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.toggle = function (selector) {
    selector = selector ? selector : '.' + settings.classTarget;
    toggle(document.querySelectorAll(selector));
  };
  /**
   * Public method to switch a drawer into modal
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.switchToDrawer = function (selector) {
    // Use default selector if one isn't passed
    selector = selector ? selector : settings["switch"]; // Query our elements using the provided selector

    var items = document.querySelectorAll(selector); // Convert to array if only one drawer is passed

    items = items.forEach ? items : _utility["default"].toArray(items);
    items.forEach(function (item) {
      switchToDrawer(item);
    });
  };
  /**
   * Public method to switch a drawer into modal
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.switchToModal = function (selector) {
    // Use default selector if one isn't passed
    selector = selector ? selector : settings["switch"]; // Query our elements using the provided selector

    var items = document.querySelectorAll(selector); // Convert to array if only one drawer is passed

    items = items.forEach ? items : _utility["default"].toArray(items);
    items.forEach(function (item) {
      switchToModal(item);
    });
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


  api.stateClear = function () {
    stateClear();
  };
  /**
   * Private function to close a drawer or group of drawers
   * ---
   * @param {Node} drawer - The drawer element(s) to close
   * @param {String} state - Whether to open, close or toggle the drawer(s)
   * @param {Function} callback - The callback function
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
  /**
   * Private function that initializes the save state functionality
   * ---
   * @param {Function} callback - The callback function
   */


  var initSaveState = function initSaveState(callback) {
    // Check if a drawer state is already saved in local storage and save the
    // json parsed data to our local variable if it does
    if (localStorage.getItem('drawerState')) {
      drawerState = JSON.parse(localStorage.getItem('drawerState'));
    } // Loop through all drawers


    drawers.forEach(function (item) {
      var drawer = item.drawer; // Set the default state if one is not set

      if (drawer.id in drawerState === false) {
        stateSave(drawer);
      } // Get our drawer dialog element


      var dialog = drawer.querySelector('.' + settings.classInner); // Disables transitions as default states are being set

      var transitionDelay = function transitionDelay() {
        if (dialog) {
          _utility["default"].addClass(dialog, settings.classTransitionNone);

          setTimeout(function () {
            _utility["default"].removeClass(dialog, settings.classTransitionNone);
          }, settings.transitionDuration);
        }
      }; // Toggle our drawer state based on the saved state


      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close', transitionDelay);
      } else if (drawerState[drawer.id]) {
        toggle(drawer, 'open', transitionDelay);
      }
    }); // Fire the callback function if one was passed and return our state object

    typeof callback === 'function' && callback(drawerState);
  };
  /**
   * Private function that saves the state of a specific or all drawers
   * ---
   * @param {Node} items - The drawer element(s) to save state
   */


  var stateSave = function stateSave(items) {
    // Save all drawers if an items arg wasn't passed
    items = items ? items : drawers; // Convert to array if only one drawer is passed

    items = items.forEach ? items : _utility["default"].toArray(items); // Loop through our drawers and save their new state to local storage

    items.forEach(function (item) {
      // Only save drawer state if an id exists
      if (item.id) {
        drawerState[item.id] = _utility["default"].hasClass(item, settings.classActive);
        localStorage.setItem('drawerState', JSON.stringify(drawerState));
      }
    });
  };
  /**
   * Private function that clears the drawer state
   */


  var stateClear = function stateClear() {
    drawerState = {};
    localStorage.removeItem('drawerState');
  };
  /**
   * Private function that initializes the switch functionality
   */


  var initSwitch = function initSwitch() {
    // Query all the drawers with the switch feature enabled
    switchDrawers = document.querySelectorAll(settings["switch"]); // Loop through the switch drawers

    switchDrawers.forEach(function (drawer) {
      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      var cleanSelector = settings["switch"].replace('[', '').replace(']', '').replace('data-', ''); // Convert sring to camelCase

      cleanSelector = cleanSelector.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }); // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings

      var bp = drawer.dataset[cleanSelector];

      if (bp) {
        bp = _utility["default"].getBreakpoint(bp);

        if (!bp) {
          bp = drawer.dataset[cleanSelector];
        }
      } else {
        bp = _utility["default"].getBreakpoint(settings.switchBreakpoint);

        if (!bp) {
          bp = settings.switchBreakpoint;
        }
      } // Media query listener


      var mql = window.matchMedia("(min-width:" + bp + ")"); // Switch to modal if media doesn't match (< bp)

      if (!mql.matches) {
        switchToModal(drawer);
      } // Add our media query listener


      mql.addListener(switchCheck); // Push the mql to our array along with it's drawer

      mqlArray.push({
        'drawer': drawer,
        'mql': mql
      });
    });
  };
  /**
   * Private function that destroys the switch functionality
   */


  var destroySwitch = function destroySwitch() {
    // Switch all modals back to their original drawer state
    switchDrawers.forEach(function (drawer) {
      switchToDrawer(drawer);
    }); // Remove the media query listeners

    mqlArray.forEach(function (item) {
      item.mql.removeListener(switchCheck);
    }); // Return switch variables to their original state

    switchDrawers = null;
    mqlArray = [];
  };
  /**
   * Private function that checks when a media query hits a match and switches
   * the component from drawer to modal as needed
   * ---
   * @param {MediaQueryList} mql - The MediaQueryList object for the media query
   * @param {Node} drawer - The drawer element to switch
   */


  var switchCheck = function switchCheck() {
    mqlArray.forEach(function (item) {
      if (item.mql.matches) {
        switchToDrawer(item.drawer);
      } else {
        switchToModal(item.drawer);
      }
    });
  };
  /**
   * Private function that switches a modal into a drawer component
   * ---
   * @param {Node} drawer - The element to switch
   */


  var switchToDrawer = function switchToDrawer(drawer) {
    // Get the dialog and trigger elements related to this component
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]'); // Switch the modal component to drawer

    drawer.className = drawer.className.replace(new RegExp(settings.classTargetSwitch, 'gi'), settings.classTarget);
    dialog.className = dialog.className.replace(new RegExp(settings.classInnerSwitch, 'gi'), settings.classInner);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(new RegExp(settings.classTriggerSwitch, 'gi'), settings.classTrigger);
    }); // Open or close drawer based on save state

    if (settings.saveState) {
      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close');
      } else {
        toggle(drawer, 'open');
      }
    }
  };
  /**
   * Private function that switches a drawer into a modal component
   * ---
   * @param {Node} drawer - The element to switch
   */


  var switchToModal = function switchToModal(drawer) {
    // Get the dialog and trigger elements related to this component
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]'); // Switch the drawer component to modal

    drawer.className = drawer.className.replace(new RegExp(settings.classTarget, 'gi'), settings.classTargetSwitch);
    dialog.className = dialog.className.replace(new RegExp(settings.classInner, 'gi'), settings.classInnerSwitch);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(new RegExp(settings.classTrigger, 'gi'), settings.classTriggerSwitch);
    }); // Remove active class for modal styles by default

    _utility["default"].removeClass(drawer, settings.classActive);
  };
  /**
   * Initialize our component and return the api
   */


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
    classTarget: 'modal',
    classTrigger: 'modal__trigger',
    classInner: 'modal__dialog',
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
    var target = document.querySelectorAll('.' + settings.classTarget);

    _utility["default"].removeClass(target, settings.classActive);

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
    var target = event.target.closest('.' + settings.classTarget);
    var trigger = event.target.closest('.' + settings.classTrigger);
    var inner = event.target.closest('.' + settings.classInner);

    if (trigger) {
      close();
      var targetData = trigger.dataset.target;

      if (targetData) {
        memoryTarget = document.querySelectorAll(targetData);
        memoryTrigger = trigger;
        open(memoryTarget);
      }

      event.preventDefault();
    } else if (target && !inner) {
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
     * @param {String} key - The key to search for in the breakpoints object
     * @returns {String} - The pixel value of the breakpoint as a string
     */
    value: function getBreakpoint(key) {
      return _config["default"].breakpoints[key];
    }
    /**
     * Checks if an element has a class or not
     * ---
     * @param {Node} el - Element(s) to check class(es) on
     * @param {String || Array} c - Class(es) to check
     * @returns {Boolean} - Returns true if class exists, otherwise false
     */

  }, {
    key: "hasClass",
    value: function hasClass(el, c) {
      el = el.forEach ? el : this.toArray(el);
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
     * @param {Node} el - Element(s) to add class(es) on
     * @param {String || Array} c - Class(es) to add
     */

  }, {
    key: "addClass",
    value: function addClass(el, c) {
      el = el.forEach ? el : this.toArray(el);
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
     * @param {Node} el - Element(s) to remove class(es) from
     * @param {String || Array} c - Class(es) to remove
     */

  }, {
    key: "removeClass",
    value: function removeClass(el, c) {
      el = el.forEach ? el : this.toArray(el);
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
     * @param {Node} el - Element(s) to toggle class(es) on
     * @param {String || Array} c - Class(es) to toggle
     */

  }, {
    key: "toggleClass",
    value: function toggleClass(el, c) {
      el = el.forEach ? el : this.toArray(el);
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
     * @param {Node} el - Element to start search on
     * @param {String || Array} c - Class(es) to check for
     * @return {Node} - Closest parent element
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
     * @param {Object} item - String or object to convert to an array
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbmZpZy5qc29uIiwic3JjL2pzL2Rpc21pc3NpYmxlLmpzIiwic3JjL2pzL2RyYXdlci5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy90b2dnbGUuanMiLCJzcmMvanMvdXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNLFdBQVcsR0FBRyxJQUFJLHVCQUFKLEVBQXBCO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmO0FBQ0EsSUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBSixFQUFkO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmOzs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDVEE7Ozs7QUFFZSxrQkFBUyxPQUFULEVBQWtCO0FBRS9COztBQUVBLE1BQUksR0FBRyxHQUFHLEVBQVY7QUFDQSxNQUFJLFFBQUo7QUFDQSxNQUFNLFFBQVEsR0FBRztBQUNmLElBQUEsT0FBTyxFQUFFLGdCQURNO0FBRWYsSUFBQSxNQUFNLEVBQUUsb0JBRk87QUFHZixJQUFBLFdBQVcsRUFBRTtBQUhFLEdBQWpCOztBQU1BLEVBQUEsR0FBRyxDQUFDLElBQUosR0FBVyxVQUFDLE9BQUQsRUFBYTtBQUN0QixJQUFBLFFBQVEsR0FBRyxvQkFBRSxNQUFGLENBQVUsUUFBVixFQUFvQixPQUFPLElBQUksRUFBL0IsQ0FBWDtBQUNBLElBQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLEtBQXhDO0FBQ0QsR0FIRDs7QUFLQSxFQUFBLEdBQUcsQ0FBQyxPQUFKLEdBQWMsWUFBTTtBQUNsQixJQUFBLFFBQVEsR0FBRyxJQUFYO0FBQ0EsSUFB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LElBQUksR0FBRyxTQUFTLENBQUMsQ0FBRCxDQUFoQjtBQUNBLFFBQUEsQ0FBQztBQUNGOztBQUVELFVBQUksS0FBSyxHQUFHLFNBQVIsS0FBUSxDQUFFLEdBQUYsRUFBVztBQUNyQixhQUFNLElBQUksSUFBVixJQUFrQixHQUFsQixFQUF3QjtBQUN0QixjQUFLLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGNBQWpCLENBQWdDLElBQWhDLENBQXNDLEdBQXRDLEVBQTJDLElBQTNDLENBQUwsRUFBeUQ7QUFDdkQsZ0JBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLEdBQUcsQ0FBQyxJQUFELENBQWxDLE1BQThDLGlCQUEzRCxFQUErRTtBQUM3RSxjQUFBLFFBQVEsQ0FBQyxJQUFELENBQVIsR0FBaUIsTUFBTSxDQUFFLElBQUYsRUFBUSxRQUFRLENBQUMsSUFBRCxDQUFoQixFQUF3QixHQUFHLENBQUMsSUFBRCxDQUEzQixDQUF2QjtBQUNELGFBRkQsTUFFTztBQUNMLGNBQUEsUUFBUSxDQUFDLElBQUQsQ0FBUixHQUFpQixHQUFHLENBQUMsSUFBRCxDQUFwQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BVkQ7O0FBWUEsYUFBUSxDQUFDLEdBQUcsTUFBWixFQUFvQixDQUFDLEVBQXJCLEVBQTBCO0FBQ3hCLFlBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFELENBQW5CO0FBQ0EsUUFBQSxLQUFLLENBQUMsR0FBRCxDQUFMO0FBQ0Q7O0FBRUQsYUFBTyxRQUFQO0FBQ0QsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBEaXNtaXNzaWJsZSBmcm9tICcuL2Rpc21pc3NpYmxlJ1xuaW1wb3J0IERyYXdlciBmcm9tICcuL2RyYXdlcidcbmltcG9ydCBNb2RhbCBmcm9tICcuL21vZGFsJ1xuaW1wb3J0IFRvZ2dsZSBmcm9tICcuL3RvZ2dsZSdcblxuY29uc3QgZGlzbWlzc2libGUgPSBuZXcgRGlzbWlzc2libGUoKVxuY29uc3QgZHJhd2VyID0gbmV3IERyYXdlcigpXG5jb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpXG5jb25zdCB0b2dnbGUgPSBuZXcgVG9nZ2xlKClcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJicmVha3BvaW50c1wiIDoge1xuICAgIFwieHNcIjogXCI0ODBweFwiLFxuICAgIFwic21cIjogXCI2MjBweFwiLFxuICAgIFwibWRcIjogXCI3NjBweFwiLFxuICAgIFwibGdcIjogXCI5OTBweFwiLFxuICAgIFwieGxcIjogXCIxMzgwcHhcIlxuICB9XG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS1kaXNtaXNzXScsXG4gICAgdGFyZ2V0OiAnW2RhdGEtZGlzbWlzc2libGVdJyxcbiAgICBjbGFzc1RvZ2dsZTogJ2Rpc21pc3MnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0cmlnZ2VyLmNsb3Nlc3Qoc2V0dGluZ3MudGFyZ2V0KVxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NUb2dnbGUpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIERyYXdlciBwbHVnaW5cbiAqIC0tLVxuICogQSBjb250YWluZXIgY29tcG9uZW50IHRoYXQgc2xpZGVzIGluIGZyb20gdGhlIGxlZnQgb3IgcmlnaHQuIEl0IHR5cGljYWxseVxuICogY29udGFpbnMgbWVudXMsIHNlYXJjaCBvciBvdGhlciBjb250ZW50IGZvciB5b3VyIGFwcC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcblxuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAvLyBFbGVtZW50IGNsYXNzZXNcbiAgICBjbGFzc1RhcmdldDogJ2RyYXdlcl9faXRlbScsXG4gICAgY2xhc3NUcmlnZ2VyOiAnZHJhd2VyX190cmlnZ2VyJyxcbiAgICBjbGFzc0lubmVyOiAnZHJhd2VyX19kaWFsb2cnLFxuXG4gICAgLy8gVXNlZCB3aXRoIFJlZ0V4cCB0byBzZWFyY2ggYW5kIHJlcGxhY2UgZWxlbWVudCBjbGFzc2VzXG4gICAgY2xhc3NUYXJnZXRTd2l0Y2g6ICdtb2RhbCcsXG4gICAgY2xhc3NUcmlnZ2VyU3dpdGNoOiAnbW9kYWxfX3RyaWdnZXInLFxuICAgIGNsYXNzSW5uZXJTd2l0Y2g6ICdtb2RhbF9fZGlhbG9nJyxcblxuICAgIC8vIFRoZSBjbGFzcyB0aGF0IGlzIHVzZWQgdG8gbWFrZSBhbiBpdGVtIGFjdGl2ZVxuICAgIGNsYXNzQWN0aXZlOiAnaXMtYWN0aXZlJyxcbiAgICBjbGFzc1RyYW5zaXRpb25Ob25lOiAndHJhbnNpdGlvbl9ub25lJyxcblxuICAgIC8vIFdoZXRoZXIgb3Igbm90IHRvIHN0b3JlIHRoZSBzYXZlIHN0YXRlIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAvLyB7Ym9vbGVhbn0gVGhlIHN0cmluZyB0byBzYXZlIG91ciBzdGF0ZSBvYmplY3QgYXNcbiAgICBzYXZlU3RhdGU6IHRydWUsXG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0byBlbmFibGUgdGhlIHN3aXRjaCBmdW5jdGlvbmFsaXR5XG4gICAgLy8gSWYgZW5hYmxlZCwgYSBzdHJpbmcgc2VsZWN0b3IgdG8gY2hlY2sgZm9yIHNob3VsZCBiZSBwYXNzZWQuXG4gICAgLy8ge2ZhbHNlfSB8fCB7c3RyaW5nfSBlLmcuICdbZGF0YS1kcmF3ZXItc3dpdGNoXSdcbiAgICBzd2l0Y2g6ICdbZGF0YS1kcmF3ZXItc3dpdGNoXScsXG5cbiAgICAvLyBUaGUgZGVmYXVsdCBicmVhayBwb2ludCBmb3Igd2hlbiB0byBzd2l0Y2ggdG8gZHJhd2VyIG9yIG1vZGFsIGNsYXNzZXNcbiAgICAvLyB7c3RyaW5nfSBFaXRoZXIgYSBicmVha3BvaW50IGtleSBvciBwaXhlbCB2YWx1ZVxuICAgIHN3aXRjaEJyZWFrcG9pbnQ6ICdsZycsXG5cbiAgICAvLyBEdXJhdGlvbiBiZWZvcmUgcmVtb3ZpbmcgdGhlIHRyYW5zaXRpb25fbm9uZSBjbGFzcyBvbiBpbml0aWFsIGxvYWRcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IDUwMFxuICB9XG5cbiAgLy8gRHJhd2VyIHNwZWNpZmljIHZhcmlhYmxlc1xuICAvLyBXaGVyZSB3ZSBzdG9yZSBhbGwgb3VyIGRyYXdlcnMgYXZhaWxhYmxlIGluIHRoZSBET01cbiAgbGV0IGRyYXdlcnMgPSBbXVxuXG4gIC8vIFdoZXJlIHdlIGJ1aWxkIHRoZSBzYXZlIHN0YXRlIG9iamVjdCBiZWZvcmUgd2UgcGFzcyBpdCB0byBsb2NhbCBzdG9yYWdlXG4gIGxldCBkcmF3ZXJTdGF0ZSA9IHt9XG5cbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBzd2l0Y2ggZHJhd2VycyBhdmFpbGFibGUgaW4gdGhlIERPTVxuICBsZXQgc3dpdGNoRHJhd2Vyc1xuXG4gIC8vIFdoZXJlIHdlIHN0b3JlIGFsbCBvdXIgbWVkaWEgcXVlcnkgbGlzdHMgYWxvbmcgd2l0aCB0aGVpciBkcmF3ZXJzXG4gIGxldCBtcWxBcnJheSA9IFtdXG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBtZXRob2QsIHJ1biBhcyBzb29uIGFzIGFuIGluc3RhbmNlIGlzIGNyZWF0ZWRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gQSBqc29uIG9iamVjdCB3aXRoIHlvdXIgY3VzdG9tIHNldHRpbmdzXG4gICAqL1xuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG5cbiAgICAvLyBNZXJnZSB0aGUgZGVmYXVsdHMgYW5kIHBhc3NlZCBvcHRpb25zIGludG8gb3VyIHNldHRpbmdzIG9ialxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcblxuICAgIC8vIEdldCBhbGwgdGhlIGRyYXdlcnMgb24gdGhlIHBhZ2UgYW5kIHNhdmUgdGhlbSB3aXRoIHRoZWlyIGRlZmF1bHQgc3RhdGVcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgICAgLmZvckVhY2goKGRyYXdlcikgPT4ge1xuICAgICAgZHJhd2Vycy5wdXNoKHtcbiAgICAgICAgJ2RyYXdlcic6IGRyYXdlcixcbiAgICAgICAgJ2RlZmF1bHRTdGF0ZSc6IHUuaGFzQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIEluaXRpYWxpemUgYSBwcm9taXNlIGFuZCBpbml0IHNhdmUgc3RhdGUgaWYgaXQncyBlbmFibGVkXG4gICAgbGV0IHByb21pc2VTYXZlU3RhdGUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgICBpbml0U2F2ZVN0YXRlKHJlc29sdmUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gQWZ0ZXIgcHJvbWlzZSBpcyByZXNvbHZlZCBhbmQgc3dpdGNoIGlzIGVuYWJsZWQsIGluaXRpYWxpemUgc3dpdGNoXG4gICAgcHJvbWlzZVNhdmVTdGF0ZS50aGVuKCgpID0+IHtcbiAgICAgIGlmIChzZXR0aW5ncy5zd2l0Y2gpIHtcbiAgICAgICAgaW5pdFN3aXRjaCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFkZCBvdXIgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWNvbnN0cnVjdG9yIG1ldGhvZCwgdXNlZCB0byByZXNldCBhbmQgZGVzdHJveSB0aGUgZHJhd2VyIGluc3RhbmNlXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRlZmF1bHRTdGF0ZSAtIFJldHVybiBkcmF3ZXJzIHRvIHRoZWlyIGRlZmF1bHQgc3RhdGU/XG4gICAqL1xuICBhcGkuZGVzdHJveSA9IChkZWZhdWx0U3RhdGUgPSB0cnVlKSA9PiB7XG5cbiAgICAvLyBEZXN0cm95IG91ciBzd2l0Y2hcbiAgICBkZXN0cm95U3dpdGNoKClcblxuICAgIC8vIERlc3Ryb3kgb3VyIHN0YXRlXG4gICAgc3RhdGVDbGVhcigpXG5cbiAgICAvLyBSZXR1cm4gZHJhd3JzIHRvIHRoZWlyIGRlZmF1bHQgc3RhdGVcbiAgICBpZiAoZGVmYXVsdFN0YXRlKSB7XG4gICAgICBkcmF3ZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uZGVmYXVsdFN0YXRlKSB7XG4gICAgICAgICAgdS5hZGRDbGFzcyhpdGVtLmRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gQ2xlYXIgb3VyIHZhcmlhYmxlc1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRyYXdlcnMgPSBbXVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBvcGVuIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksICdvcGVuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkuY2xvc2UgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnY2xvc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gdG9nZ2xlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkudG9nZ2xlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaFRvRHJhd2VyID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAvLyBVc2UgZGVmYXVsdCBzZWxlY3RvciBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBzZXR0aW5ncy5zd2l0Y2hcblxuICAgIC8vIFF1ZXJ5IG91ciBlbGVtZW50cyB1c2luZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3JcbiAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHN3aXRjaFRvRHJhd2VyKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaFRvTW9kYWwgPSAoc2VsZWN0b3IpID0+IHtcblxuICAgIC8vIFVzZSBkZWZhdWx0IHNlbGVjdG9yIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6IHNldHRpbmdzLnN3aXRjaFxuXG4gICAgLy8gUXVlcnkgb3VyIGVsZW1lbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBzZWxlY3RvclxuICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgc3dpdGNoVG9Nb2RhbChpdGVtKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgZHJhd2VyIGN1cnJlbnQgZHJhd2VyIHN0YXRlXG4gICAqL1xuICBhcGkuc3RhdGVTYXZlID0gKCkgPT4ge1xuICAgIHN0YXRlU2F2ZSgpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRvIGRyYXdlciBkZWZhdWx0IHN0YXRlXG4gICAqL1xuICBhcGkuc3RhdGVDbGVhciA9ICgpID0+IHtcbiAgICBzdGF0ZUNsZWFyKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGRyYXdlciBlbGVtZW50KHMpIHRvIGNsb3NlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdGF0ZSAtIFdoZXRoZXIgdG8gb3BlbiwgY2xvc2Ugb3IgdG9nZ2xlIHRoZSBkcmF3ZXIocylcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnN0IHRvZ2dsZSA9IChkcmF3ZXIsIHN0YXRlLCBjYWxsYmFjaykgPT4ge1xuXG4gICAgLy8gQ2hlY2sgaWYgZHJhd2VyKHMpIHNob3VsZCBiZSBvcGVuZWQsIGNsb3NlZCBvciB0b2dnbGVkIGFuZCBlaXRoZXIgYWRkIG9yXG4gICAgLy8gcmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3MgdG8gdGhlIHBhc3NlZCBkcmF3ZXIocylcbiAgICBpZiAoc3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgdS5hZGRDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdjbG9zZScpIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdS50b2dnbGVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHNhdmUgc3RhdGUgaXMgZW5hYmxlZFxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIHN0YXRlU2F2ZShkcmF3ZXIpXG4gICAgfVxuXG4gICAgLy8gRmlyZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaWYgb25lIHdhcyBwYXNzZWRcbiAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2soKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdG8gdG9nZ2xlIGRyYXdlciB2aWEgYSB0cmlnZ2VyXG4gICAqL1xuICBjb25zdCB0cmlnZ2VyID0gKCkgPT4ge1xuXG4gICAgLy8gR2V0IHRoZSBjbG9zZXN0IHRyaWdnZXIgZWxlbWVudCBmcm9tIHRoZSBjbGljayBldmVudFxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyKVxuXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgY2xhc3MgdHJpZ2dlciB3YXMgY2xpY2tlZFxuICAgIGlmICh0cmlnZ2VyKSB7XG5cbiAgICAgIC8vIEdldCB0aGUgZHJhd2VyIHNlbGVjdG9yIGZyb20gdGhlIHRyaWdnZXIgdmlhIFtkYXRhLXRhcmdldF1cbiAgICAgIGxldCBkYXRhRHJhd2VyID0gdHJpZ2dlci5kYXRhc2V0LnRhcmdldFxuXG4gICAgICAvLyBDaGVjayB0aGF0IGEgZHJhd2VyIHRhcmdldCB3YXMgZ2l2ZW5cbiAgICAgIGlmIChkYXRhRHJhd2VyKSB7XG5cbiAgICAgICAgLy8gUXVlcnkgdGhlIGRyYXdlciBlbGVtZW50IGFuZCB0b2dnbGUgaXQgaWYgaXQgZXhpc3RzXG4gICAgICAgIGxldCBkcmF3ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRhdGFEcmF3ZXIpXG4gICAgICAgIGlmIChkcmF3ZXIubGVuZ3RoKSB7XG4gICAgICAgICAgdG9nZ2xlKGRyYXdlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgaW5pdGlhbGl6ZXMgdGhlIHNhdmUgc3RhdGUgZnVuY3Rpb25hbGl0eVxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnN0IGluaXRTYXZlU3RhdGUgPSAoY2FsbGJhY2spID0+IHtcblxuICAgIC8vIENoZWNrIGlmIGEgZHJhd2VyIHN0YXRlIGlzIGFscmVhZHkgc2F2ZWQgaW4gbG9jYWwgc3RvcmFnZSBhbmQgc2F2ZSB0aGVcbiAgICAvLyBqc29uIHBhcnNlZCBkYXRhIHRvIG91ciBsb2NhbCB2YXJpYWJsZSBpZiBpdCBkb2VzXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcmF3ZXJTdGF0ZScpKSB7XG4gICAgICBkcmF3ZXJTdGF0ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RyYXdlclN0YXRlJykpXG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBkcmF3ZXJzXG4gICAgZHJhd2Vycy5mb3JFYWNoKChpdGVtKSA9PiB7XG5cbiAgICAgIGxldCBkcmF3ZXIgPSBpdGVtLmRyYXdlclxuXG4gICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc3RhdGUgaWYgb25lIGlzIG5vdCBzZXRcbiAgICAgIGlmIChkcmF3ZXIuaWQgaW4gZHJhd2VyU3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHN0YXRlU2F2ZShkcmF3ZXIpXG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBvdXIgZHJhd2VyIGRpYWxvZyBlbGVtZW50XG4gICAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy4nICsgc2V0dGluZ3MuY2xhc3NJbm5lcilcblxuICAgICAgLy8gRGlzYWJsZXMgdHJhbnNpdGlvbnMgYXMgZGVmYXVsdCBzdGF0ZXMgYXJlIGJlaW5nIHNldFxuICAgICAgbGV0IHRyYW5zaXRpb25EZWxheSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGRpYWxvZykge1xuICAgICAgICAgIHUuYWRkQ2xhc3MoZGlhbG9nLCBzZXR0aW5ncy5jbGFzc1RyYW5zaXRpb25Ob25lKVxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdS5yZW1vdmVDbGFzcyhkaWFsb2csIHNldHRpbmdzLmNsYXNzVHJhbnNpdGlvbk5vbmUpXG4gICAgICAgICAgfSwgc2V0dGluZ3MudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvZ2dsZSBvdXIgZHJhd2VyIHN0YXRlIGJhc2VkIG9uIHRoZSBzYXZlZCBzdGF0ZVxuICAgICAgaWYgKGRyYXdlclN0YXRlW2RyYXdlci5pZF0gPT09IGZhbHNlKSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdjbG9zZScsIHRyYW5zaXRpb25EZWxheSlcbiAgICAgIH0gZWxzZSBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnb3BlbicsIHRyYW5zaXRpb25EZWxheSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gRmlyZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaWYgb25lIHdhcyBwYXNzZWQgYW5kIHJldHVybiBvdXIgc3RhdGUgb2JqZWN0XG4gICAgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmIGNhbGxiYWNrKGRyYXdlclN0YXRlKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBzYXZlcyB0aGUgc3RhdGUgb2YgYSBzcGVjaWZpYyBvciBhbGwgZHJhd2Vyc1xuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBpdGVtcyAtIFRoZSBkcmF3ZXIgZWxlbWVudChzKSB0byBzYXZlIHN0YXRlXG4gICAqL1xuICBjb25zdCBzdGF0ZVNhdmUgPSAoaXRlbXMpID0+IHtcblxuICAgIC8vIFNhdmUgYWxsIGRyYXdlcnMgaWYgYW4gaXRlbXMgYXJnIHdhc24ndCBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcykgPyBpdGVtcyA6IGRyYXdlcnNcblxuICAgIC8vIENvbnZlcnQgdG8gYXJyYXkgaWYgb25seSBvbmUgZHJhd2VyIGlzIHBhc3NlZFxuICAgIGl0ZW1zID0gKGl0ZW1zLmZvckVhY2gpID8gaXRlbXMgOiB1LnRvQXJyYXkoaXRlbXMpXG5cbiAgICAvLyBMb29wIHRocm91Z2ggb3VyIGRyYXdlcnMgYW5kIHNhdmUgdGhlaXIgbmV3IHN0YXRlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBPbmx5IHNhdmUgZHJhd2VyIHN0YXRlIGlmIGFuIGlkIGV4aXN0c1xuICAgICAgaWYgKGl0ZW0uaWQpIHtcbiAgICAgICAgZHJhd2VyU3RhdGVbaXRlbS5pZF0gPSB1Lmhhc0NsYXNzKGl0ZW0sIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZHJhd2VyU3RhdGUnLCBKU09OLnN0cmluZ2lmeShkcmF3ZXJTdGF0ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgY2xlYXJzIHRoZSBkcmF3ZXIgc3RhdGVcbiAgICovXG4gIGNvbnN0IHN0YXRlQ2xlYXIgPSAoKSA9PiB7XG4gICAgZHJhd2VyU3RhdGUgPSB7fVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkcmF3ZXJTdGF0ZScpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGluaXRpYWxpemVzIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgY29uc3QgaW5pdFN3aXRjaCA9ICgpID0+IHtcblxuICAgIC8vIFF1ZXJ5IGFsbCB0aGUgZHJhd2VycyB3aXRoIHRoZSBzd2l0Y2ggZmVhdHVyZSBlbmFibGVkXG4gICAgc3dpdGNoRHJhd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3Muc3dpdGNoKVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBzd2l0Y2ggZHJhd2Vyc1xuICAgIHN3aXRjaERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG5cbiAgICAgIC8vIEdldCB0aGUgbG9jYWwgYnJlYWtwb2ludCBpZiBvbmUgaXMgc2V0XG4gICAgICAvLyBSZW1vdmUgYnJhY2tldHMgYW5kIHRoZSBpbnRpYWwgZGF0YSBmbGFnXG4gICAgICBsZXQgY2xlYW5TZWxlY3RvciA9IHNldHRpbmdzLnN3aXRjaFxuICAgICAgICAucmVwbGFjZSgnWycsICcnKVxuICAgICAgICAucmVwbGFjZSgnXScsICcnKVxuICAgICAgICAucmVwbGFjZSgnZGF0YS0nLCAnJylcblxuICAgICAgLy8gQ29udmVydCBzcmluZyB0byBjYW1lbENhc2VcbiAgICAgIGNsZWFuU2VsZWN0b3IgPSBjbGVhblNlbGVjdG9yLnJlcGxhY2UoLy0oW2Etel0pL2csIChnKSA9PiB7XG4gICAgICAgIHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIENoZWNrIHdoaWNoIGJyZWFrcG9pbnQgdG8gdXNlOlxuICAgICAgLy8gYSkgVGhlIGxvY2FsIGJwIHNldCBvbiB0aGUgZHJhd2VyXG4gICAgICAvLyBiKSBUaGUgYnAgYXZhaWxhYmxlIGluIGNvbmZpZyB1c2luZyBhIGtleVxuICAgICAgLy8gYykgVGhlIHJhdyBwaXhlbCB2YWx1ZSBwcm92aWRlZCBpbiBzZXR0aW5nc1xuICAgICAgbGV0IGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgIGlmIChicCkge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChicClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnAgPSB1LmdldEJyZWFrcG9pbnQoc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1lZGlhIHF1ZXJ5IGxpc3RlbmVyXG4gICAgICBsZXQgbXFsID0gd2luZG93Lm1hdGNoTWVkaWEoIFwiKG1pbi13aWR0aDpcIiArIGJwICsgXCIpXCIgKVxuXG4gICAgICAvLyBTd2l0Y2ggdG8gbW9kYWwgaWYgbWVkaWEgZG9lc24ndCBtYXRjaCAoPCBicClcbiAgICAgIGlmICghbXFsLm1hdGNoZXMpIHtcbiAgICAgICAgc3dpdGNoVG9Nb2RhbChkcmF3ZXIpXG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBvdXIgbWVkaWEgcXVlcnkgbGlzdGVuZXJcbiAgICAgIG1xbC5hZGRMaXN0ZW5lcihzd2l0Y2hDaGVjaylcblxuICAgICAgLy8gUHVzaCB0aGUgbXFsIHRvIG91ciBhcnJheSBhbG9uZyB3aXRoIGl0J3MgZHJhd2VyXG4gICAgICBtcWxBcnJheS5wdXNoKHtcbiAgICAgICAgJ2RyYXdlcicgOiBkcmF3ZXIsXG4gICAgICAgICdtcWwnOiBtcWxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgZGVzdHJveXMgdGhlIHN3aXRjaCBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBjb25zdCBkZXN0cm95U3dpdGNoID0gKCkgPT4ge1xuXG4gICAgLy8gU3dpdGNoIGFsbCBtb2RhbHMgYmFjayB0byB0aGVpciBvcmlnaW5hbCBkcmF3ZXIgc3RhdGVcbiAgICBzd2l0Y2hEcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuICAgICAgc3dpdGNoVG9EcmF3ZXIoZHJhd2VyKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgdGhlIG1lZGlhIHF1ZXJ5IGxpc3RlbmVyc1xuICAgIG1xbEFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ubXFsLnJlbW92ZUxpc3RlbmVyKHN3aXRjaENoZWNrKVxuICAgIH0pXG5cbiAgICAvLyBSZXR1cm4gc3dpdGNoIHZhcmlhYmxlcyB0byB0aGVpciBvcmlnaW5hbCBzdGF0ZVxuICAgIHN3aXRjaERyYXdlcnMgPSBudWxsXG4gICAgbXFsQXJyYXkgPSBbXVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hlbiBhIG1lZGlhIHF1ZXJ5IGhpdHMgYSBtYXRjaCBhbmQgc3dpdGNoZXNcbiAgICogdGhlIGNvbXBvbmVudCBmcm9tIGRyYXdlciB0byBtb2RhbCBhcyBuZWVkZWRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7TWVkaWFRdWVyeUxpc3R9IG1xbCAtIFRoZSBNZWRpYVF1ZXJ5TGlzdCBvYmplY3QgZm9yIHRoZSBtZWRpYSBxdWVyeVxuICAgKiBAcGFyYW0ge05vZGV9IGRyYXdlciAtIFRoZSBkcmF3ZXIgZWxlbWVudCB0byBzd2l0Y2hcbiAgICovXG4gIGNvbnN0IHN3aXRjaENoZWNrID0gKCkgPT4ge1xuICAgIG1xbEFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm1xbC5tYXRjaGVzKSB7XG4gICAgICAgIHN3aXRjaFRvRHJhd2VyKGl0ZW0uZHJhd2VyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoVG9Nb2RhbChpdGVtLmRyYXdlcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBzd2l0Y2hlcyBhIG1vZGFsIGludG8gYSBkcmF3ZXIgY29tcG9uZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGRyYXdlciAtIFRoZSBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoVG9EcmF3ZXIgPSAoZHJhd2VyKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGRpYWxvZyBhbmQgdHJpZ2dlciBlbGVtZW50cyByZWxhdGVkIHRvIHRoaXMgY29tcG9uZW50XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuXG4gICAgLy8gU3dpdGNoIHRoZSBtb2RhbCBjb21wb25lbnQgdG8gZHJhd2VyXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUYXJnZXRTd2l0Y2gsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICApXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NJbm5lclN3aXRjaCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc0lubmVyXG4gICAgKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RyaWdnZXJTd2l0Y2gsICdnaScpLFxuICAgICAgICBzZXR0aW5ncy5jbGFzc1RyaWdnZXJcbiAgICAgIClcbiAgICB9KVxuXG4gICAgLy8gT3BlbiBvciBjbG9zZSBkcmF3ZXIgYmFzZWQgb24gc2F2ZSBzdGF0ZVxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnY2xvc2UnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgc3dpdGNoZXMgYSBkcmF3ZXIgaW50byBhIG1vZGFsIGNvbXBvbmVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZWxlbWVudCB0byBzd2l0Y2hcbiAgICovXG4gIGNvbnN0IHN3aXRjaFRvTW9kYWwgPSAoZHJhd2VyKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGRpYWxvZyBhbmQgdHJpZ2dlciBlbGVtZW50cyByZWxhdGVkIHRvIHRoaXMgY29tcG9uZW50XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuXG4gICAgLy8gU3dpdGNoIHRoZSBkcmF3ZXIgY29tcG9uZW50IHRvIG1vZGFsXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUYXJnZXQsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NUYXJnZXRTd2l0Y2hcbiAgICApXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NJbm5lciwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc0lubmVyU3dpdGNoXG4gICAgKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RyaWdnZXIsICdnaScpLFxuICAgICAgICBzZXR0aW5ncy5jbGFzc1RyaWdnZXJTd2l0Y2hcbiAgICAgIClcbiAgICB9KVxuXG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmb3IgbW9kYWwgc3R5bGVzIGJ5IGRlZmF1bHRcbiAgICB1LnJlbW92ZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBvdXIgY29tcG9uZW50IGFuZCByZXR1cm4gdGhlIGFwaVxuICAgKi9cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIE1vZGFsIHBsdWdpblxuICogLS0tXG4gKiBBIGNvbXBvbmVudCBmb3IgY2hhbmdpbmcgdGhlIG1vZGUgb2YgYSBwYWdlIHRvIGNvbXBsZXRlIGEgY3JpdGljYWwgdGFzay5cbiAqIFRoaXMgaXMgdXN1YWxseSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIERpYWxvZyBjb21wb25lbnQgdG8gbWFrZVxuICogbW9kYWwgZGlhbG9ncy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgY2xhc3NUYXJnZXQ6ICdtb2RhbCcsXG4gICAgY2xhc3NUcmlnZ2VyOiAnbW9kYWxfX3RyaWdnZXInLFxuICAgIGNsYXNzSW5uZXI6ICdtb2RhbF9fZGlhbG9nJyxcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgZm9jdXM6ICdbZGF0YS1mb2N1c10nXG4gIH1cblxuICBsZXQgbWVtb3J5VHJpZ2dlclxuICBsZXQgbWVtb3J5VGFyZ2V0XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBvcGVuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICB9XG5cbiAgYXBpLmNsb3NlID0gKGNsZWFyKSA9PiB7XG4gICAgY2xvc2UoY2xlYXIpXG4gIH1cblxuICBjb25zdCBvcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIHUuYWRkQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lml0ZW0oMClcbiAgICAgIGxldCBmb2N1cyA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLmZvY3VzKVxuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChmb2N1cykge1xuICAgICAgICAgIGZvY3VzLmZvY3VzKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsb3NlID0gKGNsZWFyID0gZmFsc2UpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldClcbiAgICB1LnJlbW92ZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgaWYgKGNsZWFyID09IGZhbHNlICYmIG1lbW9yeVRyaWdnZXIgJiYgbWVtb3J5VGFyZ2V0KSB7XG4gICAgICBpZiAobWVtb3J5VGFyZ2V0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBtZW1vcnlUYXJnZXQuaXRlbSgwKVxuICAgICAgICBtZW1vcnlUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgICBpZiAobWVtb3J5VHJpZ2dlcikge1xuICAgICAgICAgICAgbWVtb3J5VHJpZ2dlci5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgICAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjbGVhciA9PSB0cnVlKSB7XG4gICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGVzY2FwZSA9ICgpID0+IHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAyNykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXQpXG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG4gICAgbGV0IGlubmVyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NJbm5lcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgbGV0IHRhcmdldERhdGEgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG4gICAgICBpZiAodGFyZ2V0RGF0YSkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldERhdGEpXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSB0cmlnZ2VyXG4gICAgICAgIG9wZW4obWVtb3J5VGFyZ2V0KVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmICFpbm5lcikge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgdHJpZ2dlcjogJ1tkYXRhLXRvZ2dsZS1jbGFzc10nLFxuICAgIHRhcmdldHM6ICcnLFxuICAgIGNsYXNzOiAnJ1xuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG5cbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG5cbiAgICBpZiAodHJpZ2dlcikge1xuXG4gICAgICBsZXQgdGFyZ2V0c1xuXG4gICAgICBpZiAoc2V0dGluZ3MudGFyZ2V0cykge1xuICAgICAgICB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZXR0aW5ncy50YXJnZXRzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodHJpZ2dlci5kYXRhc2V0LnRvZ2dsZVRhcmdldClcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0YXJnZXQsIHRyaWdnZXIuZGF0YXNldC50b2dnbGVDbGFzcy5zcGxpdCgnICcpKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmNsYXNzKSB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0cmlnZ2VyLCBzZXR0aW5ncy5jbGFzcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRyaWdnZXIsIHRyaWdnZXIuZGF0YXNldC50b2dnbGVDbGFzcy5zcGxpdCgnICcpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZydcblxuLyoqXG4gKiBVdGlsaXR5XG4gKiAtLS1cbiAqIEEgc2V0IG9mIGhlbHBlciBtZXRob2RzIGZvciBnZW5lcmFsIGphdmFzY3JpcHQgcGx1Z2luIHVzZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gIC8qKlxuICAgKiBHZXQgYW5kIG91dHB1dCBhIGJyZWFrcG9pbnQgdXNpbmcgaXQncyBrZXkgZm91bmQgaW4gY29uZmlnLmpzb25cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBUaGUga2V5IHRvIHNlYXJjaCBmb3IgaW4gdGhlIGJyZWFrcG9pbnRzIG9iamVjdFxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSAtIFRoZSBwaXhlbCB2YWx1ZSBvZiB0aGUgYnJlYWtwb2ludCBhcyBhIHN0cmluZ1xuICAgKi9cbiAgc3RhdGljIGdldEJyZWFrcG9pbnQoa2V5KSB7XG4gICAgcmV0dXJuIGNvbmZpZy5icmVha3BvaW50c1trZXldXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGEgY2xhc3Mgb3Igbm90XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byBjaGVjayBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gY2hlY2tcbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gUmV0dXJucyB0cnVlIGlmIGNsYXNzIGV4aXN0cywgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaGFzQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICByZXR1cm4gYy5zb21lKCBmdW5jdGlvbiAoYykge1xuICAgICAgbGV0IGhhcyA9IGZhbHNlXG4gICAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGMpKSB7XG4gICAgICAgICAgaGFzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGhhc1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIG9yIGNsYXNzZXMgdG8gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gYWRkIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byBhZGRcbiAgICovXG4gIHN0YXRpYyBhZGRDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNsYXNzIG9yIGNsYXNzZXMgZnJvbSBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byByZW1vdmUgY2xhc3MoZXMpIGZyb21cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gcmVtb3ZlXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgYSBjbGFzcyBvciBjbGFzc2VzIG9uIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIHRvZ2dsZSBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gdG9nZ2xlXG4gICAqL1xuICBzdGF0aWMgdG9nZ2xlQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IGJhc2VkIG9uIGNsYXNzLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgKiBuYXRpdmUgLmNsb3Nlc3QoKSBtZXRob2QgaW4gdGhhdCBpdCBkb2Vzbid0IGNoZWNrIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudCB0byBzdGFydCBzZWFyY2ggb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gY2hlY2sgZm9yXG4gICAqIEByZXR1cm4ge05vZGV9IC0gQ2xvc2VzdCBwYXJlbnQgZWxlbWVudFxuICAgKi9cbiAgc3RhdGljIGNsb3Nlc3QoZWwsIGMpIHtcbiAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50RWxlbWVudCkgJiYgIXRoaXMuaGFzQ2xhc3MoZWwsIGMpKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIG9yIG9iamVjdCB0byBhbiBhcnJheS4gSWYgYW4gYXJyYXkgaXMgcGFzc2VkLCBpdCdzXG4gICAqIHJldHVybmVkIGFzIGlzLiBBbnl0aGluZyBlbHNlIGlzIHJldHVybmVkIGFzIGFuIGFycmF5LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBTdHJpbmcgb3Igb2JqZWN0IHRvIGNvbnZlcnQgdG8gYW4gYXJyYXlcbiAgICogQHJldHVybiB7QXJyYXl9IC0gUmV0dXJuIHRoZSBjb252ZXJ0ZWQgYXJyYXlcbiAgICovXG4gIHN0YXRpYyB0b0FycmF5KGl0ZW0pIHtcblxuICAgIGxldCBhcnJheSA9IFtdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgYXJyYXkgPSBpdGVtXG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5LnB1c2goaXRlbSlcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzLiBSZXR1cm5zIGEgbmV3IG9iamVjdC4gU2V0IHRoZSBmaXJzdCBhcmd1bWVudFxuICAgKiB0byBgdHJ1ZWAgZm9yIGEgZGVlcCBvciByZWN1cnNpdmUgbWVyZ2UuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtPcHRpb25hbF0gLSBJZiB0cnVlLCBkbyBhIGRlZXAgKG9yIHJlY3Vyc2l2ZSkgbWVyZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IC0gVGhlIG9iamVjdHMgdG8gbWVyZ2UgdG9nZXRoZXI7IGVhY2ggb3ZlcnJpZGluZyB0aGUgbmV4dFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIE1lcmdlZCB2YWx1ZXMgb2YgZGVmYXVsdHMgYW5kIG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICBsZXQgZXh0ZW5kZWQgPSB7fVxuICAgIGxldCBkZWVwID0gZmFsc2VcbiAgICBsZXQgaSA9IDBcbiAgICBsZXQgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIGFyZ3VtZW50c1swXSApID09PSAnW29iamVjdCBCb29sZWFuXScgKSB7XG4gICAgICBkZWVwID0gYXJndW1lbnRzWzBdXG4gICAgICBpKytcbiAgICB9XG5cbiAgICBsZXQgbWVyZ2UgPSAoIG9iaiApID0+IHtcbiAgICAgIGZvciAoIGxldCBwcm9wIGluIG9iaiApIHtcbiAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoIG9iaiwgcHJvcCApICkge1xuICAgICAgICAgIGlmICggZGVlcCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW3Byb3BdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGV4dGVuZCggdHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gb2JqW3Byb3BdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICBsZXQgb2JqID0gYXJndW1lbnRzW2ldXG4gICAgICBtZXJnZShvYmopXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZGVkXG4gIH1cblxufVxuIl19

//# sourceMappingURL=scripts.js.map
