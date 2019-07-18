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
    // Component element classes
    classTarget: 'drawer__item',
    classTrigger: 'drawer__trigger',
    classInner: 'drawer__dialog',
    // Component element switch classes
    // Used with RegExp to search and replace element classes
    classTargetSwitch: 'modal',
    classTriggerSwitch: 'modal__trigger',
    classInnerSwitch: 'modal__dialog',
    // State and utility classes
    classActive: 'is-active',
    classTransitionNone: 'transition_none',
    // Whether or not to store the save state in local storage
    // {boolean} The string to save our state object as
    saveState: true,
    // Whether or not to enable the switch functionality. If enabled, a string
    // selector to check for should be passed.
    // {false} || {string} e.g. '[data-drawer-switch]'
    "switch": '[data-drawer-switch]',
    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',
    // Duration before removing the transition_none class on initial load
    transitionDuration: 500 // Where we store all our drawers available in the DOM

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
        } else {
          _utility["default"].removeClass(item.drawer, settings.classActive);
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
   * Public method to switch a modal into drawer
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
   * Clears drawer state from local storage
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
    } // Save state if feature is enabled


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
      if (item.drawer) {
        item = item.drawer;
      } // Only save drawer state if an id exists


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbmZpZy5qc29uIiwic3JjL2pzL2Rpc21pc3NpYmxlLmpzIiwic3JjL2pzL2RyYXdlci5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy90b2dnbGUuanMiLCJzcmMvanMvdXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNLFdBQVcsR0FBRyxJQUFJLHVCQUFKLEVBQXBCO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmO0FBQ0EsSUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBSixFQUFkO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmOzs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDVEE7Ozs7QUFFZSxrQkFBUyxPQUFULEVBQWtCO0FBRS9COztBQUVBLE1BQUksR0FBRyxHQUFHLEVBQVY7QUFDQSxNQUFJLFFBQUo7QUFDQSxNQUFNLFFBQVEsR0FBRztBQUNmLElBQUEsT0FBTyxFQUFFLGdCQURNO0FBRWYsSUFBQSxNQUFNLEVBQUUsb0JBRk87QUFHZixJQUFBLFdBQVcsRUFBRTtBQUhFLEdBQWpCOztBQU1BLEVBQUEsR0FBRyxDQUFDLElBQUosR0FBVyxVQUFDLE9BQUQsRUFBYTtBQUN0QixJQUFBLFFBQVEsR0FBRyxvQkFBRSxNQUFGLENBQVUsUUFBVixFQUFvQixPQUFPLElBQUksRUFBL0IsQ0FBWDtBQUNBLElBQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLEtBQXhDO0FBQ0QsR0FIRDs7QUFLQSxFQUFBLEdBQUcsQ0FBQyxPQUFKLEdBQWMsWUFBTTtBQUNsQixJQUFBLFFBQVEsR0FBRyxJQUFYO0FBQ0EsSUFB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KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBEaXNtaXNzaWJsZSBmcm9tICcuL2Rpc21pc3NpYmxlJ1xuaW1wb3J0IERyYXdlciBmcm9tICcuL2RyYXdlcidcbmltcG9ydCBNb2RhbCBmcm9tICcuL21vZGFsJ1xuaW1wb3J0IFRvZ2dsZSBmcm9tICcuL3RvZ2dsZSdcblxuY29uc3QgZGlzbWlzc2libGUgPSBuZXcgRGlzbWlzc2libGUoKVxuY29uc3QgZHJhd2VyID0gbmV3IERyYXdlcigpXG5jb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpXG5jb25zdCB0b2dnbGUgPSBuZXcgVG9nZ2xlKClcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJicmVha3BvaW50c1wiIDoge1xuICAgIFwieHNcIjogXCI0ODBweFwiLFxuICAgIFwic21cIjogXCI2MjBweFwiLFxuICAgIFwibWRcIjogXCI3NjBweFwiLFxuICAgIFwibGdcIjogXCI5OTBweFwiLFxuICAgIFwieGxcIjogXCIxMzgwcHhcIlxuICB9XG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS1kaXNtaXNzXScsXG4gICAgdGFyZ2V0OiAnW2RhdGEtZGlzbWlzc2libGVdJyxcbiAgICBjbGFzc1RvZ2dsZTogJ2Rpc21pc3MnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0cmlnZ2VyLmNsb3Nlc3Qoc2V0dGluZ3MudGFyZ2V0KVxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NUb2dnbGUpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIERyYXdlciBwbHVnaW5cbiAqIC0tLVxuICogQSBjb250YWluZXIgY29tcG9uZW50IHRoYXQgc2xpZGVzIGluIGZyb20gdGhlIGxlZnQgb3IgcmlnaHQuIEl0IHR5cGljYWxseVxuICogY29udGFpbnMgbWVudXMsIHNlYXJjaCBvciBvdGhlciBjb250ZW50IGZvciB5b3VyIGFwcC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcblxuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAvLyBDb21wb25lbnQgZWxlbWVudCBjbGFzc2VzXG4gICAgY2xhc3NUYXJnZXQ6ICdkcmF3ZXJfX2l0ZW0nLFxuICAgIGNsYXNzVHJpZ2dlcjogJ2RyYXdlcl9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lcjogJ2RyYXdlcl9fZGlhbG9nJyxcblxuICAgIC8vIENvbXBvbmVudCBlbGVtZW50IHN3aXRjaCBjbGFzc2VzXG4gICAgLy8gVXNlZCB3aXRoIFJlZ0V4cCB0byBzZWFyY2ggYW5kIHJlcGxhY2UgZWxlbWVudCBjbGFzc2VzXG4gICAgY2xhc3NUYXJnZXRTd2l0Y2g6ICdtb2RhbCcsXG4gICAgY2xhc3NUcmlnZ2VyU3dpdGNoOiAnbW9kYWxfX3RyaWdnZXInLFxuICAgIGNsYXNzSW5uZXJTd2l0Y2g6ICdtb2RhbF9fZGlhbG9nJyxcblxuICAgIC8vIFN0YXRlIGFuZCB1dGlsaXR5IGNsYXNzZXNcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgY2xhc3NUcmFuc2l0aW9uTm9uZTogJ3RyYW5zaXRpb25fbm9uZScsXG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0byBzdG9yZSB0aGUgc2F2ZSBzdGF0ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgLy8ge2Jvb2xlYW59IFRoZSBzdHJpbmcgdG8gc2F2ZSBvdXIgc3RhdGUgb2JqZWN0IGFzXG4gICAgc2F2ZVN0YXRlOiB0cnVlLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gZW5hYmxlIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eS4gSWYgZW5hYmxlZCwgYSBzdHJpbmdcbiAgICAvLyBzZWxlY3RvciB0byBjaGVjayBmb3Igc2hvdWxkIGJlIHBhc3NlZC5cbiAgICAvLyB7ZmFsc2V9IHx8IHtzdHJpbmd9IGUuZy4gJ1tkYXRhLWRyYXdlci1zd2l0Y2hdJ1xuICAgIHN3aXRjaDogJ1tkYXRhLWRyYXdlci1zd2l0Y2hdJyxcblxuICAgIC8vIFRoZSBkZWZhdWx0IGJyZWFrIHBvaW50IGZvciB3aGVuIHRvIHN3aXRjaCB0byBkcmF3ZXIgb3IgbW9kYWwgY2xhc3Nlc1xuICAgIC8vIHtzdHJpbmd9IEVpdGhlciBhIGJyZWFrcG9pbnQga2V5IG9yIHBpeGVsIHZhbHVlXG4gICAgc3dpdGNoQnJlYWtwb2ludDogJ2xnJyxcblxuICAgIC8vIER1cmF0aW9uIGJlZm9yZSByZW1vdmluZyB0aGUgdHJhbnNpdGlvbl9ub25lIGNsYXNzIG9uIGluaXRpYWwgbG9hZFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjogNTAwXG4gIH1cblxuICAvLyBXaGVyZSB3ZSBzdG9yZSBhbGwgb3VyIGRyYXdlcnMgYXZhaWxhYmxlIGluIHRoZSBET01cbiAgbGV0IGRyYXdlcnMgPSBbXVxuXG4gIC8vIFdoZXJlIHdlIGJ1aWxkIHRoZSBzYXZlIHN0YXRlIG9iamVjdCBiZWZvcmUgd2UgcGFzcyBpdCB0byBsb2NhbCBzdG9yYWdlXG4gIGxldCBkcmF3ZXJTdGF0ZSA9IHt9XG5cbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBzd2l0Y2ggZHJhd2VycyBhdmFpbGFibGUgaW4gdGhlIERPTVxuICBsZXQgc3dpdGNoRHJhd2Vyc1xuXG4gIC8vIFdoZXJlIHdlIHN0b3JlIGFsbCBvdXIgbWVkaWEgcXVlcnkgbGlzdHMgYWxvbmcgd2l0aCB0aGVpciBkcmF3ZXJzXG4gIGxldCBtcWxBcnJheSA9IFtdXG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBtZXRob2QsIHJ1biBhcyBzb29uIGFzIGFuIGluc3RhbmNlIGlzIGNyZWF0ZWRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gQSBqc29uIG9iamVjdCB3aXRoIHlvdXIgY3VzdG9tIHNldHRpbmdzXG4gICAqL1xuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG5cbiAgICAvLyBNZXJnZSB0aGUgZGVmYXVsdHMgYW5kIHBhc3NlZCBvcHRpb25zIGludG8gb3VyIHNldHRpbmdzIG9ialxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcblxuICAgIC8vIEdldCBhbGwgdGhlIGRyYXdlcnMgb24gdGhlIHBhZ2UgYW5kIHNhdmUgdGhlbSB3aXRoIHRoZWlyIGRlZmF1bHQgc3RhdGVcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgICAgLmZvckVhY2goKGRyYXdlcikgPT4ge1xuICAgICAgZHJhd2Vycy5wdXNoKHtcbiAgICAgICAgJ2RyYXdlcic6IGRyYXdlcixcbiAgICAgICAgJ2RlZmF1bHRTdGF0ZSc6IHUuaGFzQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIEluaXRpYWxpemUgYSBwcm9taXNlIGFuZCBpbml0IHNhdmUgc3RhdGUgaWYgaXQncyBlbmFibGVkXG4gICAgbGV0IHByb21pc2VTYXZlU3RhdGUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgICBpbml0U2F2ZVN0YXRlKHJlc29sdmUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gQWZ0ZXIgcHJvbWlzZSBpcyByZXNvbHZlZCBhbmQgc3dpdGNoIGlzIGVuYWJsZWQsIGluaXRpYWxpemUgc3dpdGNoXG4gICAgcHJvbWlzZVNhdmVTdGF0ZS50aGVuKCgpID0+IHtcbiAgICAgIGlmIChzZXR0aW5ncy5zd2l0Y2gpIHtcbiAgICAgICAgaW5pdFN3aXRjaCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFkZCBvdXIgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWNvbnN0cnVjdG9yIG1ldGhvZCwgdXNlZCB0byByZXNldCBhbmQgZGVzdHJveSB0aGUgZHJhd2VyIGluc3RhbmNlXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRlZmF1bHRTdGF0ZSAtIFJldHVybiBkcmF3ZXJzIHRvIHRoZWlyIGRlZmF1bHQgc3RhdGU/XG4gICAqL1xuICBhcGkuZGVzdHJveSA9IChkZWZhdWx0U3RhdGUgPSB0cnVlKSA9PiB7XG5cbiAgICAvLyBEZXN0cm95IG91ciBzd2l0Y2hcbiAgICBkZXN0cm95U3dpdGNoKClcblxuICAgIC8vIERlc3Ryb3kgb3VyIHN0YXRlXG4gICAgc3RhdGVDbGVhcigpXG5cbiAgICAvLyBSZXR1cm4gZHJhd3JzIHRvIHRoZWlyIGRlZmF1bHQgc3RhdGVcbiAgICBpZiAoZGVmYXVsdFN0YXRlKSB7XG4gICAgICBkcmF3ZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uZGVmYXVsdFN0YXRlKSB7XG4gICAgICAgICAgdS5hZGRDbGFzcyhpdGVtLmRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdS5yZW1vdmVDbGFzcyhpdGVtLmRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gQ2xlYXIgb3VyIHZhcmlhYmxlc1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRyYXdlcnMgPSBbXVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBvcGVuIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksICdvcGVuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkuY2xvc2UgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnY2xvc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gdG9nZ2xlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkudG9nZ2xlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIG1vZGFsIGludG8gZHJhd2VyXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaFRvRHJhd2VyID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAvLyBVc2UgZGVmYXVsdCBzZWxlY3RvciBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBzZXR0aW5ncy5zd2l0Y2hcblxuICAgIC8vIFF1ZXJ5IG91ciBlbGVtZW50cyB1c2luZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3JcbiAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHN3aXRjaFRvRHJhd2VyKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaFRvTW9kYWwgPSAoc2VsZWN0b3IpID0+IHtcblxuICAgIC8vIFVzZSBkZWZhdWx0IHNlbGVjdG9yIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6IHNldHRpbmdzLnN3aXRjaFxuXG4gICAgLy8gUXVlcnkgb3VyIGVsZW1lbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBzZWxlY3RvclxuICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgc3dpdGNoVG9Nb2RhbChpdGVtKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgZHJhd2VyIGN1cnJlbnQgZHJhd2VyIHN0YXRlXG4gICAqL1xuICBhcGkuc3RhdGVTYXZlID0gKCkgPT4ge1xuICAgIHN0YXRlU2F2ZSgpXG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGRyYXdlciBzdGF0ZSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICovXG4gIGFwaS5zdGF0ZUNsZWFyID0gKCkgPT4ge1xuICAgIHN0YXRlQ2xlYXIoKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdG8gY2xvc2UgYSBkcmF3ZXIgb3IgZ3JvdXAgb2YgZHJhd2Vyc1xuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZHJhd2VyIGVsZW1lbnQocykgdG8gY2xvc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlIC0gV2hldGhlciB0byBvcGVuLCBjbG9zZSBvciB0b2dnbGUgdGhlIGRyYXdlcihzKVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgY29uc3QgdG9nZ2xlID0gKGRyYXdlciwgc3RhdGUsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyBDaGVjayBpZiBkcmF3ZXIocykgc2hvdWxkIGJlIG9wZW5lZCwgY2xvc2VkIG9yIHRvZ2dsZWQgYW5kIGVpdGhlciBhZGQgb3JcbiAgICAvLyByZW1vdmUgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgcGFzc2VkIGRyYXdlcihzKVxuICAgIGlmIChzdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICB1LmFkZENsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnRvZ2dsZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfVxuXG4gICAgLy8gU2F2ZSBzdGF0ZSBpZiBmZWF0dXJlIGlzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBzdGF0ZVNhdmUoZHJhd2VyKVxuICAgIH1cblxuICAgIC8vIEZpcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIG9uZSB3YXMgcGFzc2VkXG4gICAgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmIGNhbGxiYWNrKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRvIHRvZ2dsZSBkcmF3ZXIgdmlhIGEgdHJpZ2dlclxuICAgKi9cbiAgY29uc3QgdHJpZ2dlciA9ICgpID0+IHtcblxuICAgIC8vIEdldCB0aGUgY2xvc2VzdCB0cmlnZ2VyIGVsZW1lbnQgZnJvbSB0aGUgY2xpY2sgZXZlbnRcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcblxuICAgIC8vIENoZWNrIHRoYXQgdGhlIGNsYXNzIHRyaWdnZXIgd2FzIGNsaWNrZWRcbiAgICBpZiAodHJpZ2dlcikge1xuXG4gICAgICAvLyBHZXQgdGhlIGRyYXdlciBzZWxlY3RvciBmcm9tIHRoZSB0cmlnZ2VyIHZpYSBbZGF0YS10YXJnZXRdXG4gICAgICBsZXQgZGF0YURyYXdlciA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcblxuICAgICAgLy8gQ2hlY2sgdGhhdCBhIGRyYXdlciB0YXJnZXQgd2FzIGdpdmVuXG4gICAgICBpZiAoZGF0YURyYXdlcikge1xuXG4gICAgICAgIC8vIFF1ZXJ5IHRoZSBkcmF3ZXIgZWxlbWVudCBhbmQgdG9nZ2xlIGl0IGlmIGl0IGV4aXN0c1xuICAgICAgICBsZXQgZHJhd2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkYXRhRHJhd2VyKVxuICAgICAgICBpZiAoZHJhd2VyLmxlbmd0aCkge1xuICAgICAgICAgIHRvZ2dsZShkcmF3ZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGluaXRpYWxpemVzIHRoZSBzYXZlIHN0YXRlIGZ1bmN0aW9uYWxpdHlcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBjb25zdCBpbml0U2F2ZVN0YXRlID0gKGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyBDaGVjayBpZiBhIGRyYXdlciBzdGF0ZSBpcyBhbHJlYWR5IHNhdmVkIGluIGxvY2FsIHN0b3JhZ2UgYW5kIHNhdmUgdGhlXG4gICAgLy8ganNvbiBwYXJzZWQgZGF0YSB0byBvdXIgbG9jYWwgdmFyaWFibGUgaWYgaXQgZG9lc1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyU3RhdGUnKSkge1xuICAgICAgZHJhd2VyU3RhdGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcmF3ZXJTdGF0ZScpKVxuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgZHJhd2Vyc1xuICAgIGRyYXdlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICBsZXQgZHJhd2VyID0gaXRlbS5kcmF3ZXJcblxuICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IHN0YXRlIGlmIG9uZSBpcyBub3Qgc2V0XG4gICAgICBpZiAoZHJhd2VyLmlkIGluIGRyYXdlclN0YXRlID09PSBmYWxzZSkge1xuICAgICAgICBzdGF0ZVNhdmUoZHJhd2VyKVxuICAgICAgfVxuXG4gICAgICAvLyBHZXQgb3VyIGRyYXdlciBkaWFsb2cgZWxlbWVudFxuICAgICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuJyArIHNldHRpbmdzLmNsYXNzSW5uZXIpXG5cbiAgICAgIC8vIERpc2FibGVzIHRyYW5zaXRpb25zIGFzIGRlZmF1bHQgc3RhdGVzIGFyZSBiZWluZyBzZXRcbiAgICAgIGxldCB0cmFuc2l0aW9uRGVsYXkgPSAoKSA9PiB7XG4gICAgICAgIGlmIChkaWFsb2cpIHtcbiAgICAgICAgICB1LmFkZENsYXNzKGRpYWxvZywgc2V0dGluZ3MuY2xhc3NUcmFuc2l0aW9uTm9uZSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHUucmVtb3ZlQ2xhc3MoZGlhbG9nLCBzZXR0aW5ncy5jbGFzc1RyYW5zaXRpb25Ob25lKVxuICAgICAgICAgIH0sIHNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUb2dnbGUgb3VyIGRyYXdlciBzdGF0ZSBiYXNlZCBvbiB0aGUgc2F2ZWQgc3RhdGVcbiAgICAgIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnY2xvc2UnLCB0cmFuc2l0aW9uRGVsYXkpXG4gICAgICB9IGVsc2UgaWYgKGRyYXdlclN0YXRlW2RyYXdlci5pZF0pIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nLCB0cmFuc2l0aW9uRGVsYXkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEZpcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIG9uZSB3YXMgcGFzc2VkIGFuZCByZXR1cm4gb3VyIHN0YXRlIG9iamVjdFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjayhkcmF3ZXJTdGF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgc2F2ZXMgdGhlIHN0YXRlIG9mIGEgc3BlY2lmaWMgb3IgYWxsIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gaXRlbXMgLSBUaGUgZHJhd2VyIGVsZW1lbnQocykgdG8gc2F2ZSBzdGF0ZVxuICAgKi9cbiAgY29uc3Qgc3RhdGVTYXZlID0gKGl0ZW1zKSA9PiB7XG5cbiAgICAvLyBTYXZlIGFsbCBkcmF3ZXJzIGlmIGFuIGl0ZW1zIGFyZyB3YXNuJ3QgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMpID8gaXRlbXMgOiBkcmF3ZXJzXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIG91ciBkcmF3ZXJzIGFuZCBzYXZlIHRoZWlyIG5ldyBzdGF0ZSB0byBsb2NhbCBzdG9yYWdlXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICBpZiAoaXRlbS5kcmF3ZXIpIHtcbiAgICAgICAgaXRlbSA9IGl0ZW0uZHJhd2VyXG4gICAgICB9XG5cbiAgICAgIC8vIE9ubHkgc2F2ZSBkcmF3ZXIgc3RhdGUgaWYgYW4gaWQgZXhpc3RzXG4gICAgICBpZiAoaXRlbS5pZCkge1xuICAgICAgICBkcmF3ZXJTdGF0ZVtpdGVtLmlkXSA9IHUuaGFzQ2xhc3MoaXRlbSwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcmF3ZXJTdGF0ZScsIEpTT04uc3RyaW5naWZ5KGRyYXdlclN0YXRlKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBjbGVhcnMgdGhlIGRyYXdlciBzdGF0ZVxuICAgKi9cbiAgY29uc3Qgc3RhdGVDbGVhciA9ICgpID0+IHtcbiAgICBkcmF3ZXJTdGF0ZSA9IHt9XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RyYXdlclN0YXRlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgaW5pdGlhbGl6ZXMgdGhlIHN3aXRjaCBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBjb25zdCBpbml0U3dpdGNoID0gKCkgPT4ge1xuXG4gICAgLy8gUXVlcnkgYWxsIHRoZSBkcmF3ZXJzIHdpdGggdGhlIHN3aXRjaCBmZWF0dXJlIGVuYWJsZWRcbiAgICBzd2l0Y2hEcmF3ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZXR0aW5ncy5zd2l0Y2gpXG5cbiAgICAvLyBMb29wIHRocm91Z2ggdGhlIHN3aXRjaCBkcmF3ZXJzXG4gICAgc3dpdGNoRHJhd2Vycy5mb3JFYWNoKChkcmF3ZXIpID0+IHtcblxuICAgICAgLy8gR2V0IHRoZSBsb2NhbCBicmVha3BvaW50IGlmIG9uZSBpcyBzZXRcbiAgICAgIC8vIFJlbW92ZSBicmFja2V0cyBhbmQgdGhlIGludGlhbCBkYXRhIGZsYWdcbiAgICAgIGxldCBjbGVhblNlbGVjdG9yID0gc2V0dGluZ3Muc3dpdGNoXG4gICAgICAgIC5yZXBsYWNlKCdbJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCddJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCdkYXRhLScsICcnKVxuXG4gICAgICAvLyBDb252ZXJ0IHNyaW5nIHRvIGNhbWVsQ2FzZVxuICAgICAgY2xlYW5TZWxlY3RvciA9IGNsZWFuU2VsZWN0b3IucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IHtcbiAgICAgICAgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKVxuICAgICAgfSlcblxuICAgICAgLy8gQ2hlY2sgd2hpY2ggYnJlYWtwb2ludCB0byB1c2U6XG4gICAgICAvLyBhKSBUaGUgbG9jYWwgYnAgc2V0IG9uIHRoZSBkcmF3ZXJcbiAgICAgIC8vIGIpIFRoZSBicCBhdmFpbGFibGUgaW4gY29uZmlnIHVzaW5nIGEga2V5XG4gICAgICAvLyBjKSBUaGUgcmF3IHBpeGVsIHZhbHVlIHByb3ZpZGVkIGluIHNldHRpbmdzXG4gICAgICBsZXQgYnAgPSBkcmF3ZXIuZGF0YXNldFtjbGVhblNlbGVjdG9yXVxuICAgICAgaWYgKGJwKSB7XG4gICAgICAgIGJwID0gdS5nZXRCcmVha3BvaW50KGJwKVxuICAgICAgICBpZiAoIWJwKSB7XG4gICAgICAgICAgYnAgPSBkcmF3ZXIuZGF0YXNldFtjbGVhblNlbGVjdG9yXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChzZXR0aW5ncy5zd2l0Y2hCcmVha3BvaW50KVxuICAgICAgICBpZiAoIWJwKSB7XG4gICAgICAgICAgYnAgPSBzZXR0aW5ncy5zd2l0Y2hCcmVha3BvaW50XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWVkaWEgcXVlcnkgbGlzdGVuZXJcbiAgICAgIGxldCBtcWwgPSB3aW5kb3cubWF0Y2hNZWRpYSggXCIobWluLXdpZHRoOlwiICsgYnAgKyBcIilcIiApXG5cbiAgICAgIC8vIFN3aXRjaCB0byBtb2RhbCBpZiBtZWRpYSBkb2Vzbid0IG1hdGNoICg8IGJwKVxuICAgICAgaWYgKCFtcWwubWF0Y2hlcykge1xuICAgICAgICBzd2l0Y2hUb01vZGFsKGRyYXdlcilcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIG91ciBtZWRpYSBxdWVyeSBsaXN0ZW5lclxuICAgICAgbXFsLmFkZExpc3RlbmVyKHN3aXRjaENoZWNrKVxuXG4gICAgICAvLyBQdXNoIHRoZSBtcWwgdG8gb3VyIGFycmF5IGFsb25nIHdpdGggaXQncyBkcmF3ZXJcbiAgICAgIG1xbEFycmF5LnB1c2goe1xuICAgICAgICAnZHJhd2VyJyA6IGRyYXdlcixcbiAgICAgICAgJ21xbCc6IG1xbFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBkZXN0cm95cyB0aGUgc3dpdGNoIGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIGNvbnN0IGRlc3Ryb3lTd2l0Y2ggPSAoKSA9PiB7XG5cbiAgICAvLyBTd2l0Y2ggYWxsIG1vZGFscyBiYWNrIHRvIHRoZWlyIG9yaWdpbmFsIGRyYXdlciBzdGF0ZVxuICAgIHN3aXRjaERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG4gICAgICBzd2l0Y2hUb0RyYXdlcihkcmF3ZXIpXG4gICAgfSlcblxuICAgIC8vIFJlbW92ZSB0aGUgbWVkaWEgcXVlcnkgbGlzdGVuZXJzXG4gICAgbXFsQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5tcWwucmVtb3ZlTGlzdGVuZXIoc3dpdGNoQ2hlY2spXG4gICAgfSlcblxuICAgIC8vIFJldHVybiBzd2l0Y2ggdmFyaWFibGVzIHRvIHRoZWlyIG9yaWdpbmFsIHN0YXRlXG4gICAgc3dpdGNoRHJhd2VycyA9IG51bGxcbiAgICBtcWxBcnJheSA9IFtdXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGVuIGEgbWVkaWEgcXVlcnkgaGl0cyBhIG1hdGNoIGFuZCBzd2l0Y2hlc1xuICAgKiB0aGUgY29tcG9uZW50IGZyb20gZHJhd2VyIHRvIG1vZGFsIGFzIG5lZWRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbXFsIC0gVGhlIE1lZGlhUXVlcnlMaXN0IG9iamVjdCBmb3IgdGhlIG1lZGlhIHF1ZXJ5XG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGRyYXdlciBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoQ2hlY2sgPSAoKSA9PiB7XG4gICAgbXFsQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0ubXFsLm1hdGNoZXMpIHtcbiAgICAgICAgc3dpdGNoVG9EcmF3ZXIoaXRlbS5kcmF3ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2hUb01vZGFsKGl0ZW0uZHJhd2VyKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHN3aXRjaGVzIGEgbW9kYWwgaW50byBhIGRyYXdlciBjb21wb25lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGVsZW1lbnQgdG8gc3dpdGNoXG4gICAqL1xuICBjb25zdCBzd2l0Y2hUb0RyYXdlciA9IChkcmF3ZXIpID0+IHtcblxuICAgIC8vIEdldCB0aGUgZGlhbG9nIGFuZCB0cmlnZ2VyIGVsZW1lbnRzIHJlbGF0ZWQgdG8gdGhpcyBjb21wb25lbnRcbiAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2cnKVxuICAgIGxldCB0cmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldD1cIiMnICsgZHJhd2VyLmlkICsgJ1wiXScpXG5cbiAgICAvLyBTd2l0Y2ggdGhlIG1vZGFsIGNvbXBvbmVudCB0byBkcmF3ZXJcbiAgICBkcmF3ZXIuY2xhc3NOYW1lID0gZHJhd2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RhcmdldFN3aXRjaCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIClcbiAgICBkaWFsb2cuY2xhc3NOYW1lID0gZGlhbG9nLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc0lubmVyU3dpdGNoLCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzSW5uZXJcbiAgICApXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVHJpZ2dlclN3aXRjaCwgJ2dpJyksXG4gICAgICAgIHNldHRpbmdzLmNsYXNzVHJpZ2dlclxuICAgICAgKVxuICAgIH0pXG5cbiAgICAvLyBPcGVuIG9yIGNsb3NlIGRyYXdlciBiYXNlZCBvbiBzYXZlIHN0YXRlXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgaWYgKGRyYXdlclN0YXRlW2RyYXdlci5pZF0gPT09IGZhbHNlKSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdjbG9zZScpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnb3BlbicpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBzd2l0Y2hlcyBhIGRyYXdlciBpbnRvIGEgbW9kYWwgY29tcG9uZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGRyYXdlciAtIFRoZSBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoVG9Nb2RhbCA9IChkcmF3ZXIpID0+IHtcblxuICAgIC8vIEdldCB0aGUgZGlhbG9nIGFuZCB0cmlnZ2VyIGVsZW1lbnRzIHJlbGF0ZWQgdG8gdGhpcyBjb21wb25lbnRcbiAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2cnKVxuICAgIGxldCB0cmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldD1cIiMnICsgZHJhd2VyLmlkICsgJ1wiXScpXG5cbiAgICAvLyBTd2l0Y2ggdGhlIGRyYXdlciBjb21wb25lbnQgdG8gbW9kYWxcbiAgICBkcmF3ZXIuY2xhc3NOYW1lID0gZHJhd2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RhcmdldCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc1RhcmdldFN3aXRjaFxuICAgIClcbiAgICBkaWFsb2cuY2xhc3NOYW1lID0gZGlhbG9nLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc0lubmVyLCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzSW5uZXJTd2l0Y2hcbiAgICApXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVHJpZ2dlciwgJ2dpJyksXG4gICAgICAgIHNldHRpbmdzLmNsYXNzVHJpZ2dlclN3aXRjaFxuICAgICAgKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZvciBtb2RhbCBzdHlsZXMgYnkgZGVmYXVsdFxuICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIG91ciBjb21wb25lbnQgYW5kIHJldHVybiB0aGUgYXBpXG4gICAqL1xuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbi8qKlxuICogTW9kYWwgcGx1Z2luXG4gKiAtLS1cbiAqIEEgY29tcG9uZW50IGZvciBjaGFuZ2luZyB0aGUgbW9kZSBvZiBhIHBhZ2UgdG8gY29tcGxldGUgYSBjcml0aWNhbCB0YXNrLlxuICogVGhpcyBpcyB1c3VhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgRGlhbG9nIGNvbXBvbmVudCB0byBtYWtlXG4gKiBtb2RhbCBkaWFsb2dzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBjbGFzc1RhcmdldDogJ21vZGFsJyxcbiAgICBjbGFzc1RyaWdnZXI6ICdtb2RhbF9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lcjogJ21vZGFsX19kaWFsb2cnLFxuICAgIGNsYXNzQWN0aXZlOiAnaXMtYWN0aXZlJyxcbiAgICBmb2N1czogJ1tkYXRhLWZvY3VzXSdcbiAgfVxuXG4gIGxldCBtZW1vcnlUcmlnZ2VyXG4gIGxldCBtZW1vcnlUYXJnZXRcblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICBhcGkuY2xvc2UgPSAoY2xlYXIpID0+IHtcbiAgICBjbG9zZShjbGVhcilcbiAgfVxuXG4gIGNvbnN0IG9wZW4gPSAodGFyZ2V0KSA9PiB7XG4gICAgdS5hZGRDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmICh0YXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQuaXRlbSgwKVxuICAgICAgbGV0IGZvY3VzID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuZm9jdXMpXG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgICAgZm9jdXMuZm9jdXMoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldC5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xvc2UgPSAoY2xlYXIgPSBmYWxzZSkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgIHUucmVtb3ZlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAoY2xlYXIgPT0gZmFsc2UgJiYgbWVtb3J5VHJpZ2dlciAmJiBtZW1vcnlUYXJnZXQpIHtcbiAgICAgIGlmIChtZW1vcnlUYXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IG1lbW9yeVRhcmdldC5pdGVtKDApXG4gICAgICAgIG1lbW9yeVRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICAgIGlmIChtZW1vcnlUcmlnZ2VyKSB7XG4gICAgICAgICAgICBtZW1vcnlUcmlnZ2VyLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNsZWFyID09IHRydWUpIHtcbiAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZXNjYXBlID0gKCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldClcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgaW5uZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0lubmVyKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBjbG9zZSgpXG4gICAgICBsZXQgdGFyZ2V0RGF0YSA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcbiAgICAgIGlmICh0YXJnZXREYXRhKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0RGF0YSlcbiAgICAgICAgbWVtb3J5VHJpZ2dlciA9IHRyaWdnZXJcbiAgICAgICAgb3BlbihtZW1vcnlUYXJnZXQpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgIWlubmVyKSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtdG9nZ2xlLWNsYXNzXScsXG4gICAgdGFyZ2V0czogJycsXG4gICAgY2xhc3M6ICcnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcblxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcblxuICAgIGlmICh0cmlnZ2VyKSB7XG5cbiAgICAgIGxldCB0YXJnZXRzXG5cbiAgICAgIGlmIChzZXR0aW5ncy50YXJnZXRzKSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnRhcmdldHMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlVGFyZ2V0KVxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0dGluZ3MuY2xhc3MpIHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRyaWdnZXIsIHNldHRpbmdzLmNsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJ1xuXG4vKipcbiAqIFV0aWxpdHlcbiAqIC0tLVxuICogQSBzZXQgb2YgaGVscGVyIG1ldGhvZHMgZm9yIGdlbmVyYWwgamF2YXNjcmlwdCBwbHVnaW4gdXNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgb3V0cHV0IGEgYnJlYWtwb2ludCB1c2luZyBpdCdzIGtleSBmb3VuZCBpbiBjb25maWcuanNvblxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIFRoZSBrZXkgdG8gc2VhcmNoIGZvciBpbiB0aGUgYnJlYWtwb2ludHMgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IC0gVGhlIHBpeGVsIHZhbHVlIG9mIHRoZSBicmVha3BvaW50IGFzIGEgc3RyaW5nXG4gICAqL1xuICBzdGF0aWMgZ2V0QnJlYWtwb2ludChrZXkpIHtcbiAgICByZXR1cm4gY29uZmlnLmJyZWFrcG9pbnRzW2tleV1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIGNoZWNrIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgY2xhc3MgZXhpc3RzLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIHJldHVybiBjLnNvbWUoIGZ1bmN0aW9uIChjKSB7XG4gICAgICBsZXQgaGFzID0gZmFsc2VcbiAgICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoYykpIHtcbiAgICAgICAgICBoYXMgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gaGFzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3Mgb3IgY2xhc3NlcyB0byBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byBhZGQgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGFkZFxuICAgKi9cbiAgc3RhdGljIGFkZENsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgY2xhc3Mgb3IgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIHJlbW92ZSBjbGFzcyhlcykgZnJvbVxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byByZW1vdmVcbiAgICovXG4gIHN0YXRpYyByZW1vdmVDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gdG9nZ2xlIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGNsb3Nlc3QgcGFyZW50IGVsZW1lbnQgYmFzZWQgb24gY2xhc3MuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlXG4gICAqIG5hdGl2ZSAuY2xvc2VzdCgpIG1ldGhvZCBpbiB0aGF0IGl0IGRvZXNuJ3QgY2hlY2sgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50IHRvIHN0YXJ0IHNlYXJjaCBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byBjaGVjayBmb3JcbiAgICogQHJldHVybiB7Tm9kZX0gLSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdChlbCwgYykge1xuICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSAmJiAhdGhpcy5oYXNDbGFzcyhlbCwgYykpXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBzdHJpbmcgb3Igb2JqZWN0IHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3NcbiAgICogcmV0dXJuZWQgYXMgaXMuIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIFN0cmluZyBvciBvYmplY3QgdG8gY29udmVydCB0byBhbiBhcnJheVxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBSZXR1cm4gdGhlIGNvbnZlcnRlZCBhcnJheVxuICAgKi9cbiAgc3RhdGljIHRvQXJyYXkoaXRlbSkge1xuXG4gICAgbGV0IGFycmF5ID0gW11cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBhcnJheSA9IGl0ZW1cbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkucHVzaChpdGVtKVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LiBTZXQgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIHRvIGB0cnVlYCBmb3IgYSBkZWVwIG9yIHJlY3Vyc2l2ZSBtZXJnZS5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW09wdGlvbmFsXSAtIElmIHRydWUsIGRvIGEgZGVlcCAob3IgcmVjdXJzaXZlKSBtZXJnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gLSBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlcjsgZWFjaCBvdmVycmlkaW5nIHRoZSBuZXh0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IC0gTWVyZ2VkIHZhbHVlcyBvZiBkZWZhdWx0cyBhbmQgb3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgIGxldCBleHRlbmRlZCA9IHt9XG4gICAgbGV0IGRlZXAgPSBmYWxzZVxuICAgIGxldCBpID0gMFxuICAgIGxldCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG5cbiAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcbiAgICAgIGRlZXAgPSBhcmd1bWVudHNbMF1cbiAgICAgIGkrK1xuICAgIH1cblxuICAgIGxldCBtZXJnZSA9ICggb2JqICkgPT4ge1xuICAgICAgZm9yICggbGV0IHByb3AgaW4gb2JqICkge1xuICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqLCBwcm9wICkgKSB7XG4gICAgICAgICAgaWYgKCBkZWVwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbcHJvcF0pID09PSAnW29iamVjdCBPYmplY3RdJyApIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgIGxldCBvYmogPSBhcmd1bWVudHNbaV1cbiAgICAgIG1lcmdlKG9iailcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kZWRcbiAgfVxuXG59XG4iXX0=

//# sourceMappingURL=scripts.js.map
