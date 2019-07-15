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
  var drawers; // Where we build the save state object before we pass it to local storage

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
    settings = _utility["default"].extend(defaults, options || {}); // Get all the drawers on the page

    drawers = document.querySelectorAll('.' + settings.classTarget); // Initialize a promise and init save state if it's enabled

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
   */


  api.destroy = function () {
    // Destroy our switch
    destroySwitch(); // Destroy our state

    stateClear(); // Clear our variables

    settings = null;
    drawers = null; // Remove the drawer trigger event listener

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


    drawers.forEach(function (drawer) {
      // Set the default state if one is not set
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbmZpZy5qc29uIiwic3JjL2pzL2Rpc21pc3NpYmxlLmpzIiwic3JjL2pzL2RyYXdlci5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy90b2dnbGUuanMiLCJzcmMvanMvdXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNLFdBQVcsR0FBRyxJQUFJLHVCQUFKLEVBQXBCO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmO0FBQ0EsSUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBSixFQUFkO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmOzs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDVEE7Ozs7QUFFZSxrQkFBUyxPQUFULEVBQWtCO0FBRS9COztBQUVBLE1BQUksR0FBRyxHQUFHLEVBQVY7QUFDQSxNQUFJLFFBQUo7QUFDQSxNQUFNLFFBQVEsR0FBRztBQUNmLElBQUEsT0FBTyxFQUFFLGdCQURNO0FBRWYsSUFBQSxNQUFNLEVBQUUsb0JBRk87QUFHZixJQUFBLFdBQVcsRUFBRTtBQUhFLEdBQWpCOztBQU1BLEVBQUEsR0FBRyxDQUFDLElBQUosR0FBVyxVQUFDLE9BQUQsRUFBYTtBQUN0QixJQUFBLFFBQVEsR0FBRyxvQkFBRSxNQUFGLENBQVUsUUFBVixFQUFvQixPQUFPLElBQUksRUFBL0IsQ0FBWDtBQUNBLElBQUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLEtBQXhDO0FBQ0QsR0FIRDs7QUFLQSxFQUFBLEdBQUcsQ0FBQyxPQUFKLEdBQWMsWUFBTTtBQUNsQixJQUFBLFFBQVEsR0FBRyxJQUFYO0FBQ0EsSUFB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LElBQUQsQ0FBM0IsQ0FBdkI7QUFDRCxhQUZELE1BRU87QUFDTCxjQUFBLFFBQVEsQ0FBQyxJQUFELENBQVIsR0FBaUIsR0FBRyxDQUFDLElBQUQsQ0FBcEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQVZEOztBQVlBLGFBQVEsQ0FBQyxHQUFHLE1BQVosRUFBb0IsQ0FBQyxFQUFyQixFQUEwQjtBQUN4QixZQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBRCxDQUFuQjtBQUNBLFFBQUEsS0FBSyxDQUFDLEdBQUQsQ0FBTDtBQUNEOztBQUVELGFBQU8sUUFBUDtBQUNELEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgRGlzbWlzc2libGUgZnJvbSAnLi9kaXNtaXNzaWJsZSdcbmltcG9ydCBEcmF3ZXIgZnJvbSAnLi9kcmF3ZXInXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9tb2RhbCdcbmltcG9ydCBUb2dnbGUgZnJvbSAnLi90b2dnbGUnXG5cbmNvbnN0IGRpc21pc3NpYmxlID0gbmV3IERpc21pc3NpYmxlKClcbmNvbnN0IGRyYXdlciA9IG5ldyBEcmF3ZXIoKVxuY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoKVxuY29uc3QgdG9nZ2xlID0gbmV3IFRvZ2dsZSgpXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYnJlYWtwb2ludHNcIiA6IHtcbiAgICBcInhzXCI6IFwiNDgwcHhcIixcbiAgICBcInNtXCI6IFwiNjIwcHhcIixcbiAgICBcIm1kXCI6IFwiNzYwcHhcIixcbiAgICBcImxnXCI6IFwiOTkwcHhcIixcbiAgICBcInhsXCI6IFwiMTM4MHB4XCJcbiAgfVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtZGlzbWlzc10nLFxuICAgIHRhcmdldDogJ1tkYXRhLWRpc21pc3NpYmxlXScsXG4gICAgY2xhc3NUb2dnbGU6ICdkaXNtaXNzJ1xuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBsZXQgdGFyZ2V0ID0gdHJpZ2dlci5jbG9zZXN0KHNldHRpbmdzLnRhcmdldClcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgdS50b2dnbGVDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzVG9nZ2xlKVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuLyoqXG4gKiBEcmF3ZXIgcGx1Z2luXG4gKiAtLS1cbiAqIEEgY29udGFpbmVyIGNvbXBvbmVudCB0aGF0IHNsaWRlcyBpbiBmcm9tIHRoZSBsZWZ0IG9yIHJpZ2h0LiBJdCB0eXBpY2FsbHlcbiAqIGNvbnRhaW5zIG1lbnVzLCBzZWFyY2ggb3Igb3RoZXIgY29udGVudCBmb3IgeW91ciBhcHAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG5cbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgLy8gRWxlbWVudCBjbGFzc2VzXG4gICAgY2xhc3NUYXJnZXQ6ICdkcmF3ZXJfX2l0ZW0nLFxuICAgIGNsYXNzVHJpZ2dlcjogJ2RyYXdlcl9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lcjogJ2RyYXdlcl9fZGlhbG9nJyxcblxuICAgIC8vIFVzZWQgd2l0aCBSZWdFeHAgdG8gc2VhcmNoIGFuZCByZXBsYWNlIGVsZW1lbnQgY2xhc3Nlc1xuICAgIGNsYXNzVGFyZ2V0U3dpdGNoOiAnbW9kYWwnLFxuICAgIGNsYXNzVHJpZ2dlclN3aXRjaDogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc0lubmVyU3dpdGNoOiAnbW9kYWxfX2RpYWxvZycsXG5cbiAgICAvLyBUaGUgY2xhc3MgdGhhdCBpcyB1c2VkIHRvIG1ha2UgYW4gaXRlbSBhY3RpdmVcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgY2xhc3NUcmFuc2l0aW9uTm9uZTogJ3RyYW5zaXRpb25fbm9uZScsXG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0byBzdG9yZSB0aGUgc2F2ZSBzdGF0ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgLy8ge2Jvb2xlYW59IFRoZSBzdHJpbmcgdG8gc2F2ZSBvdXIgc3RhdGUgb2JqZWN0IGFzXG4gICAgc2F2ZVN0YXRlOiB0cnVlLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gZW5hYmxlIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eVxuICAgIC8vIElmIGVuYWJsZWQsIGEgc3RyaW5nIHNlbGVjdG9yIHRvIGNoZWNrIGZvciBzaG91bGQgYmUgcGFzc2VkLlxuICAgIC8vIHtmYWxzZX0gfHwge3N0cmluZ30gZS5nLiAnW2RhdGEtZHJhd2VyLXN3aXRjaF0nXG4gICAgc3dpdGNoOiAnW2RhdGEtZHJhd2VyLXN3aXRjaF0nLFxuXG4gICAgLy8gVGhlIGRlZmF1bHQgYnJlYWsgcG9pbnQgZm9yIHdoZW4gdG8gc3dpdGNoIHRvIGRyYXdlciBvciBtb2RhbCBjbGFzc2VzXG4gICAgLy8ge3N0cmluZ30gRWl0aGVyIGEgYnJlYWtwb2ludCBrZXkgb3IgcGl4ZWwgdmFsdWVcbiAgICBzd2l0Y2hCcmVha3BvaW50OiAnbGcnLFxuXG4gICAgLy8gRHVyYXRpb24gYmVmb3JlIHJlbW92aW5nIHRoZSB0cmFuc2l0aW9uX25vbmUgY2xhc3Mgb24gaW5pdGlhbCBsb2FkXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiA1MDBcbiAgfVxuXG4gIC8vIERyYXdlciBzcGVjaWZpYyB2YXJpYWJsZXNcbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBkcmF3ZXJzIGF2YWlsYWJsZSBpbiB0aGUgRE9NXG4gIGxldCBkcmF3ZXJzXG5cbiAgLy8gV2hlcmUgd2UgYnVpbGQgdGhlIHNhdmUgc3RhdGUgb2JqZWN0IGJlZm9yZSB3ZSBwYXNzIGl0IHRvIGxvY2FsIHN0b3JhZ2VcbiAgbGV0IGRyYXdlclN0YXRlID0ge31cblxuICAvLyBXaGVyZSB3ZSBzdG9yZSBhbGwgb3VyIHN3aXRjaCBkcmF3ZXJzIGF2YWlsYWJsZSBpbiB0aGUgRE9NXG4gIGxldCBzd2l0Y2hEcmF3ZXJzXG5cbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBtZWRpYSBxdWVyeSBsaXN0cyBhbG9uZyB3aXRoIHRoZWlyIGRyYXdlcnNcbiAgbGV0IG1xbEFycmF5ID0gW11cblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIG1ldGhvZCwgcnVuIGFzIHNvb24gYXMgYW4gaW5zdGFuY2UgaXMgY3JlYXRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBBIGpzb24gb2JqZWN0IHdpdGggeW91ciBjdXN0b20gc2V0dGluZ3NcbiAgICovXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcblxuICAgIC8vIE1lcmdlIHRoZSBkZWZhdWx0cyBhbmQgcGFzc2VkIG9wdGlvbnMgaW50byBvdXIgc2V0dGluZ3Mgb2JqXG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuXG4gICAgLy8gR2V0IGFsbCB0aGUgZHJhd2VycyBvbiB0aGUgcGFnZVxuICAgIGRyYXdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBhIHByb21pc2UgYW5kIGluaXQgc2F2ZSBzdGF0ZSBpZiBpdCdzIGVuYWJsZWRcbiAgICBsZXQgcHJvbWlzZVNhdmVTdGF0ZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgICAgaW5pdFNhdmVTdGF0ZShyZXNvbHZlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFmdGVyIHByb21pc2UgaXMgcmVzb2x2ZWQgYW5kIHN3aXRjaCBpcyBlbmFibGVkLCBpbml0aWFsaXplIHN3aXRjaFxuICAgIHByb21pc2VTYXZlU3RhdGUudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZXR0aW5ncy5zd2l0Y2gpIHtcbiAgICAgICAgaW5pdFN3aXRjaCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFkZCBvdXIgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWNvbnN0cnVjdG9yIG1ldGhvZCwgdXNlZCB0byByZXNldCBhbmQgZGVzdHJveSB0aGUgZHJhd2VyIGluc3RhbmNlXG4gICAqL1xuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcblxuICAgIC8vIERlc3Ryb3kgb3VyIHN3aXRjaFxuICAgIGRlc3Ryb3lTd2l0Y2goKVxuXG4gICAgLy8gRGVzdHJveSBvdXIgc3RhdGVcbiAgICBzdGF0ZUNsZWFyKClcblxuICAgIC8vIENsZWFyIG91ciB2YXJpYWJsZXNcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkcmF3ZXJzID0gbnVsbFxuXG4gICAgLy8gUmVtb3ZlIHRoZSBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBvcGVuIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksICdvcGVuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkuY2xvc2UgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnY2xvc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gdG9nZ2xlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkudG9nZ2xlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaFRvRHJhd2VyID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAvLyBVc2UgZGVmYXVsdCBzZWxlY3RvciBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBzZXR0aW5ncy5zd2l0Y2hcblxuICAgIC8vIFF1ZXJ5IG91ciBlbGVtZW50cyB1c2luZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3JcbiAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHN3aXRjaFRvRHJhd2VyKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaFRvTW9kYWwgPSAoc2VsZWN0b3IpID0+IHtcblxuICAgIC8vIFVzZSBkZWZhdWx0IHNlbGVjdG9yIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6IHNldHRpbmdzLnN3aXRjaFxuXG4gICAgLy8gUXVlcnkgb3VyIGVsZW1lbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBzZWxlY3RvclxuICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgc3dpdGNoVG9Nb2RhbChpdGVtKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgZHJhd2VyIGN1cnJlbnQgZHJhd2VyIHN0YXRlXG4gICAqL1xuICBhcGkuc3RhdGVTYXZlID0gKCkgPT4ge1xuICAgIHN0YXRlU2F2ZSgpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRvIGRyYXdlciBkZWZhdWx0IHN0YXRlXG4gICAqL1xuICBhcGkuc3RhdGVDbGVhciA9ICgpID0+IHtcbiAgICBzdGF0ZUNsZWFyKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGRyYXdlciBlbGVtZW50KHMpIHRvIGNsb3NlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdGF0ZSAtIFdoZXRoZXIgdG8gb3BlbiwgY2xvc2Ugb3IgdG9nZ2xlIHRoZSBkcmF3ZXIocylcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnN0IHRvZ2dsZSA9IChkcmF3ZXIsIHN0YXRlLCBjYWxsYmFjaykgPT4ge1xuXG4gICAgLy8gQ2hlY2sgaWYgZHJhd2VyKHMpIHNob3VsZCBiZSBvcGVuZWQsIGNsb3NlZCBvciB0b2dnbGVkIGFuZCBlaXRoZXIgYWRkIG9yXG4gICAgLy8gcmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3MgdG8gdGhlIHBhc3NlZCBkcmF3ZXIocylcbiAgICBpZiAoc3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgdS5hZGRDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdjbG9zZScpIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdS50b2dnbGVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHNhdmUgc3RhdGUgaXMgZW5hYmxlZFxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIHN0YXRlU2F2ZShkcmF3ZXIpXG4gICAgfVxuXG4gICAgLy8gRmlyZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaWYgb25lIHdhcyBwYXNzZWRcbiAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2soKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdG8gdG9nZ2xlIGRyYXdlciB2aWEgYSB0cmlnZ2VyXG4gICAqL1xuICBjb25zdCB0cmlnZ2VyID0gKCkgPT4ge1xuXG4gICAgLy8gR2V0IHRoZSBjbG9zZXN0IHRyaWdnZXIgZWxlbWVudCBmcm9tIHRoZSBjbGljayBldmVudFxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyKVxuXG4gICAgLy8gQ2hlY2sgdGhhdCB0aGUgY2xhc3MgdHJpZ2dlciB3YXMgY2xpY2tlZFxuICAgIGlmICh0cmlnZ2VyKSB7XG5cbiAgICAgIC8vIEdldCB0aGUgZHJhd2VyIHNlbGVjdG9yIGZyb20gdGhlIHRyaWdnZXIgdmlhIFtkYXRhLXRhcmdldF1cbiAgICAgIGxldCBkYXRhRHJhd2VyID0gdHJpZ2dlci5kYXRhc2V0LnRhcmdldFxuXG4gICAgICAvLyBDaGVjayB0aGF0IGEgZHJhd2VyIHRhcmdldCB3YXMgZ2l2ZW5cbiAgICAgIGlmIChkYXRhRHJhd2VyKSB7XG5cbiAgICAgICAgLy8gUXVlcnkgdGhlIGRyYXdlciBlbGVtZW50IGFuZCB0b2dnbGUgaXQgaWYgaXQgZXhpc3RzXG4gICAgICAgIGxldCBkcmF3ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRhdGFEcmF3ZXIpXG4gICAgICAgIGlmIChkcmF3ZXIubGVuZ3RoKSB7XG4gICAgICAgICAgdG9nZ2xlKGRyYXdlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgaW5pdGlhbGl6ZXMgdGhlIHNhdmUgc3RhdGUgZnVuY3Rpb25hbGl0eVxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnN0IGluaXRTYXZlU3RhdGUgPSAoY2FsbGJhY2spID0+IHtcblxuICAgIC8vIENoZWNrIGlmIGEgZHJhd2VyIHN0YXRlIGlzIGFscmVhZHkgc2F2ZWQgaW4gbG9jYWwgc3RvcmFnZSBhbmQgc2F2ZSB0aGVcbiAgICAvLyBqc29uIHBhcnNlZCBkYXRhIHRvIG91ciBsb2NhbCB2YXJpYWJsZSBpZiBpdCBkb2VzXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcmF3ZXJTdGF0ZScpKSB7XG4gICAgICBkcmF3ZXJTdGF0ZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RyYXdlclN0YXRlJykpXG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBkcmF3ZXJzXG4gICAgZHJhd2Vycy5mb3JFYWNoKChkcmF3ZXIpID0+IHtcblxuICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IHN0YXRlIGlmIG9uZSBpcyBub3Qgc2V0XG4gICAgICBpZiAoZHJhd2VyLmlkIGluIGRyYXdlclN0YXRlID09PSBmYWxzZSkge1xuICAgICAgICBzdGF0ZVNhdmUoZHJhd2VyKVxuICAgICAgfVxuXG4gICAgICAvLyBHZXQgb3VyIGRyYXdlciBkaWFsb2cgZWxlbWVudFxuICAgICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuJyArIHNldHRpbmdzLmNsYXNzSW5uZXIpXG5cbiAgICAgIC8vIERpc2FibGVzIHRyYW5zaXRpb25zIGFzIGRlZmF1bHQgc3RhdGVzIGFyZSBiZWluZyBzZXRcbiAgICAgIGxldCB0cmFuc2l0aW9uRGVsYXkgPSAoKSA9PiB7XG4gICAgICAgIGlmIChkaWFsb2cpIHtcbiAgICAgICAgICB1LmFkZENsYXNzKGRpYWxvZywgc2V0dGluZ3MuY2xhc3NUcmFuc2l0aW9uTm9uZSlcbiAgICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHUucmVtb3ZlQ2xhc3MoZGlhbG9nLCBzZXR0aW5ncy5jbGFzc1RyYW5zaXRpb25Ob25lKVxuICAgICAgICAgICAgfSwgc2V0dGluZ3MudHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvZ2dsZSBvdXIgZHJhd2VyIHN0YXRlIGJhc2VkIG9uIHRoZSBzYXZlZCBzdGF0ZVxuICAgICAgaWYgKGRyYXdlclN0YXRlW2RyYXdlci5pZF0gPT09IGZhbHNlKSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdjbG9zZScsIHRyYW5zaXRpb25EZWxheSlcbiAgICAgIH0gZWxzZSBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnb3BlbicsIHRyYW5zaXRpb25EZWxheSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gRmlyZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaWYgb25lIHdhcyBwYXNzZWQgYW5kIHJldHVybiBvdXIgc3RhdGUgb2JqZWN0XG4gICAgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmIGNhbGxiYWNrKGRyYXdlclN0YXRlKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBzYXZlcyB0aGUgc3RhdGUgb2YgYSBzcGVjaWZpYyBvciBhbGwgZHJhd2Vyc1xuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBpdGVtcyAtIFRoZSBkcmF3ZXIgZWxlbWVudChzKSB0byBzYXZlIHN0YXRlXG4gICAqL1xuICBjb25zdCBzdGF0ZVNhdmUgPSAoaXRlbXMpID0+IHtcblxuICAgIC8vIFNhdmUgYWxsIGRyYXdlcnMgaWYgYW4gaXRlbXMgYXJnIHdhc24ndCBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcykgPyBpdGVtcyA6IGRyYXdlcnNcblxuICAgIC8vIENvbnZlcnQgdG8gYXJyYXkgaWYgb25seSBvbmUgZHJhd2VyIGlzIHBhc3NlZFxuICAgIGl0ZW1zID0gKGl0ZW1zLmZvckVhY2gpID8gaXRlbXMgOiB1LnRvQXJyYXkoaXRlbXMpXG5cbiAgICAvLyBMb29wIHRocm91Z2ggb3VyIGRyYXdlcnMgYW5kIHNhdmUgdGhlaXIgbmV3IHN0YXRlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBPbmx5IHNhdmUgZHJhd2VyIHN0YXRlIGlmIGFuIGlkIGV4aXN0c1xuICAgICAgaWYgKGl0ZW0uaWQpIHtcbiAgICAgICAgZHJhd2VyU3RhdGVbaXRlbS5pZF0gPSB1Lmhhc0NsYXNzKGl0ZW0sIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZHJhd2VyU3RhdGUnLCBKU09OLnN0cmluZ2lmeShkcmF3ZXJTdGF0ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgY2xlYXJzIHRoZSBkcmF3ZXIgc3RhdGVcbiAgICovXG4gIGNvbnN0IHN0YXRlQ2xlYXIgPSAoKSA9PiB7XG4gICAgZHJhd2VyU3RhdGUgPSB7fVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkcmF3ZXJTdGF0ZScpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGluaXRpYWxpemVzIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgY29uc3QgaW5pdFN3aXRjaCA9ICgpID0+IHtcblxuICAgIC8vIFF1ZXJ5IGFsbCB0aGUgZHJhd2VycyB3aXRoIHRoZSBzd2l0Y2ggZmVhdHVyZSBlbmFibGVkXG4gICAgc3dpdGNoRHJhd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3Muc3dpdGNoKVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBzd2l0Y2ggZHJhd2Vyc1xuICAgIHN3aXRjaERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG5cbiAgICAgIC8vIEdldCB0aGUgbG9jYWwgYnJlYWtwb2ludCBpZiBvbmUgaXMgc2V0XG4gICAgICAvLyBSZW1vdmUgYnJhY2tldHMgYW5kIHRoZSBpbnRpYWwgZGF0YSBmbGFnXG4gICAgICBsZXQgY2xlYW5TZWxlY3RvciA9IHNldHRpbmdzLnN3aXRjaFxuICAgICAgICAucmVwbGFjZSgnWycsICcnKVxuICAgICAgICAucmVwbGFjZSgnXScsICcnKVxuICAgICAgICAucmVwbGFjZSgnZGF0YS0nLCAnJylcblxuICAgICAgLy8gQ29udmVydCBzcmluZyB0byBjYW1lbENhc2VcbiAgICAgIGNsZWFuU2VsZWN0b3IgPSBjbGVhblNlbGVjdG9yLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uIChnKSB7XG4gICAgICAgIHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIENoZWNrIHdoaWNoIGJyZWFrcG9pbnQgdG8gdXNlOlxuICAgICAgLy8gYSkgVGhlIGxvY2FsIGJwIHNldCBvbiB0aGUgZHJhd2VyXG4gICAgICAvLyBiKSBUaGUgYnAgYXZhaWxhYmxlIGluIGNvbmZpZyB1c2luZyBhIGtleVxuICAgICAgLy8gYykgVGhlIHJhdyBwaXhlbCB2YWx1ZSBwcm92aWRlZCBpbiBzZXR0aW5nc1xuICAgICAgbGV0IGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgIGlmIChicCkge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChicClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnAgPSB1LmdldEJyZWFrcG9pbnQoc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1lZGlhIHF1ZXJ5IGxpc3RlbmVyXG4gICAgICBsZXQgbXFsID0gd2luZG93Lm1hdGNoTWVkaWEoIFwiKG1pbi13aWR0aDpcIiArIGJwICsgXCIpXCIgKVxuXG4gICAgICAvLyBTd2l0Y2ggdG8gbW9kYWwgaWYgbWVkaWEgZG9lc24ndCBtYXRjaCAoPCBicClcbiAgICAgIGlmICghbXFsLm1hdGNoZXMpIHtcbiAgICAgICAgc3dpdGNoVG9Nb2RhbChkcmF3ZXIpXG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBvdXIgbWVkaWEgcXVlcnkgbGlzdGVuZXJcbiAgICAgIG1xbC5hZGRMaXN0ZW5lcihzd2l0Y2hDaGVjaylcblxuICAgICAgLy8gUHVzaCB0aGUgbXFsIHRvIG91ciBhcnJheSBhbG9uZyB3aXRoIGl0J3MgZHJhd2VyXG4gICAgICBtcWxBcnJheS5wdXNoKHtcbiAgICAgICAgJ2RyYXdlcicgOiBkcmF3ZXIsXG4gICAgICAgICdtcWwnOiBtcWxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgZGVzdHJveXMgdGhlIHN3aXRjaCBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBjb25zdCBkZXN0cm95U3dpdGNoID0gKCkgPT4ge1xuXG4gICAgLy8gU3dpdGNoIGFsbCBtb2RhbHMgYmFjayB0byB0aGVpciBvcmlnaW5hbCBkcmF3ZXIgc3RhdGVcbiAgICBzd2l0Y2hEcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuICAgICAgc3dpdGNoVG9EcmF3ZXIoZHJhd2VyKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgdGhlIG1lZGlhIHF1ZXJ5IGxpc3RlbmVyc1xuICAgIG1xbEFycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaXRlbS5tcWwucmVtb3ZlTGlzdGVuZXIoc3dpdGNoQ2hlY2spXG4gICAgfSlcblxuICAgIC8vIFJldHVybiBzd2l0Y2ggdmFyaWFibGVzIHRvIHRoZWlyIG9yaWdpbmFsIHN0YXRlXG4gICAgc3dpdGNoRHJhd2VycyA9IG51bGxcbiAgICBtcWxBcnJheSA9IFtdXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGVuIGEgbWVkaWEgcXVlcnkgaGl0cyBhIG1hdGNoIGFuZCBzd2l0Y2hlc1xuICAgKiB0aGUgY29tcG9uZW50IGZyb20gZHJhd2VyIHRvIG1vZGFsIGFzIG5lZWRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbXFsIC0gVGhlIE1lZGlhUXVlcnlMaXN0IG9iamVjdCBmb3IgdGhlIG1lZGlhIHF1ZXJ5XG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGRyYXdlciBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoQ2hlY2sgPSAoKSA9PiB7XG4gICAgbXFsQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5tcWwubWF0Y2hlcykge1xuICAgICAgICBzd2l0Y2hUb0RyYXdlcihpdGVtLmRyYXdlcilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaFRvTW9kYWwoaXRlbS5kcmF3ZXIpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgc3dpdGNoZXMgYSBtb2RhbCBpbnRvIGEgZHJhd2VyIGNvbXBvbmVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZWxlbWVudCB0byBzd2l0Y2hcbiAgICovXG4gIGNvbnN0IHN3aXRjaFRvRHJhd2VyID0gKGRyYXdlcikgPT4ge1xuXG4gICAgLy8gR2V0IHRoZSBkaWFsb2cgYW5kIHRyaWdnZXIgZWxlbWVudHMgcmVsYXRlZCB0byB0aGlzIGNvbXBvbmVudFxuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcblxuICAgIC8vIFN3aXRjaCB0aGUgbW9kYWwgY29tcG9uZW50IHRvIGRyYXdlclxuICAgIGRyYXdlci5jbGFzc05hbWUgPSBkcmF3ZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVGFyZ2V0U3dpdGNoLCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzSW5uZXJTd2l0Y2gsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NJbm5lclxuICAgIClcbiAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICB0cmlnZ2VyLmNsYXNzTmFtZSA9IHRyaWdnZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUcmlnZ2VyU3dpdGNoLCAnZ2knKSxcbiAgICAgICAgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyXG4gICAgICApXG4gICAgfSlcblxuICAgIC8vIE9wZW4gb3IgY2xvc2UgZHJhd2VyIGJhc2VkIG9uIHNhdmUgc3RhdGVcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ2Nsb3NlJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdvcGVuJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHN3aXRjaGVzIGEgZHJhd2VyIGludG8gYSBtb2RhbCBjb21wb25lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGVsZW1lbnQgdG8gc3dpdGNoXG4gICAqL1xuICBjb25zdCBzd2l0Y2hUb01vZGFsID0gKGRyYXdlcikgPT4ge1xuXG4gICAgLy8gR2V0IHRoZSBkaWFsb2cgYW5kIHRyaWdnZXIgZWxlbWVudHMgcmVsYXRlZCB0byB0aGlzIGNvbXBvbmVudFxuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcblxuICAgIC8vIFN3aXRjaCB0aGUgZHJhd2VyIGNvbXBvbmVudCB0byBtb2RhbFxuICAgIGRyYXdlci5jbGFzc05hbWUgPSBkcmF3ZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVGFyZ2V0LCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzVGFyZ2V0U3dpdGNoXG4gICAgKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzSW5uZXIsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NJbm5lclN3aXRjaFxuICAgIClcbiAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICB0cmlnZ2VyLmNsYXNzTmFtZSA9IHRyaWdnZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUcmlnZ2VyLCAnZ2knKSxcbiAgICAgICAgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyU3dpdGNoXG4gICAgICApXG4gICAgfSlcblxuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZm9yIG1vZGFsIHN0eWxlcyBieSBkZWZhdWx0XG4gICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgb3VyIGNvbXBvbmVudCBhbmQgcmV0dXJuIHRoZSBhcGlcbiAgICovXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuLyoqXG4gKiBNb2RhbCBwbHVnaW5cbiAqIC0tLVxuICogQSBjb21wb25lbnQgZm9yIGNoYW5naW5nIHRoZSBtb2RlIG9mIGEgcGFnZSB0byBjb21wbGV0ZSBhIGNyaXRpY2FsIHRhc2suXG4gKiBUaGlzIGlzIHVzdWFsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBEaWFsb2cgY29tcG9uZW50IHRvIG1ha2VcbiAqIG1vZGFsIGRpYWxvZ3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVGFyZ2V0OiAnbW9kYWwnLFxuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc0lubmVyOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGZvY3VzOiAnW2RhdGEtZm9jdXNdJ1xuICB9XG5cbiAgbGV0IG1lbW9yeVRyaWdnZXJcbiAgbGV0IG1lbW9yeVRhcmdldFxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5vcGVuID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgb3Blbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9IChjbGVhcikgPT4ge1xuICAgIGNsb3NlKGNsZWFyKVxuICB9XG5cbiAgY29uc3Qgb3BlbiA9ICh0YXJnZXQpID0+IHtcbiAgICB1LmFkZENsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgaWYgKHRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5pdGVtKDApXG4gICAgICBsZXQgZm9jdXMgPSB0YXJnZXQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5mb2N1cylcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICBmb2N1cy5mb2N1cygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjbG9zZSA9IChjbGVhciA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXQpXG4gICAgdS5yZW1vdmVDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmIChjbGVhciA9PSBmYWxzZSAmJiBtZW1vcnlUcmlnZ2VyICYmIG1lbW9yeVRhcmdldCkge1xuICAgICAgaWYgKG1lbW9yeVRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbWVtb3J5VGFyZ2V0Lml0ZW0oMClcbiAgICAgICAgbWVtb3J5VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgICAgaWYgKG1lbW9yeVRyaWdnZXIpIHtcbiAgICAgICAgICAgIG1lbW9yeVRyaWdnZXIuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2xlYXIgPT0gdHJ1ZSkge1xuICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBjb25zdCBlc2NhcGUgPSAoKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyKVxuICAgIGxldCBpbm5lciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzSW5uZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICAgIGxldCB0YXJnZXREYXRhID0gdHJpZ2dlci5kYXRhc2V0LnRhcmdldFxuICAgICAgaWYgKHRhcmdldERhdGEpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXREYXRhKVxuICAgICAgICBtZW1vcnlUcmlnZ2VyID0gdHJpZ2dlclxuICAgICAgICBvcGVuKG1lbW9yeVRhcmdldClcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiAhaW5uZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS10b2dnbGUtY2xhc3NdJyxcbiAgICB0YXJnZXRzOiAnJyxcbiAgICBjbGFzczogJydcbiAgfVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuXG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgbGV0IHRhcmdldHNcblxuICAgICAgaWYgKHNldHRpbmdzLnRhcmdldHMpIHtcbiAgICAgICAgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3MudGFyZ2V0cylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRyaWdnZXIuZGF0YXNldC50b2dnbGVUYXJnZXQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCkge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5jbGFzcykge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgc2V0dGluZ3MuY2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0cmlnZ2VyLCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnXG5cbi8qKlxuICogVXRpbGl0eVxuICogLS0tXG4gKiBBIHNldCBvZiBoZWxwZXIgbWV0aG9kcyBmb3IgZ2VuZXJhbCBqYXZhc2NyaXB0IHBsdWdpbiB1c2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAvKipcbiAgICogR2V0IGFuZCBvdXRwdXQgYSBicmVha3BvaW50IHVzaW5nIGl0J3Mga2V5IGZvdW5kIGluIGNvbmZpZy5qc29uXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gVGhlIGtleSB0byBzZWFyY2ggZm9yIGluIHRoZSBicmVha3BvaW50cyBvYmplY3RcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBUaGUgcGl4ZWwgdmFsdWUgb2YgdGhlIGJyZWFrcG9pbnQgYXMgYSBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBnZXRCcmVha3BvaW50KGtleSkge1xuICAgIHJldHVybiBjb25maWcuYnJlYWtwb2ludHNba2V5XVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzIG9yIG5vdFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gY2hlY2sgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIFJldHVybnMgdHJ1ZSBpZiBjbGFzcyBleGlzdHMsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgc3RhdGljIGhhc0NsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgcmV0dXJuIGMuc29tZSggZnVuY3Rpb24gKGMpIHtcbiAgICAgIGxldCBoYXMgPSBmYWxzZVxuICAgICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjKSkge1xuICAgICAgICAgIGhhcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBoYXNcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBvciBjbGFzc2VzIHRvIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIGFkZCBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gYWRkXG4gICAqL1xuICBzdGF0aWMgYWRkQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBvciBjbGFzc2VzIGZyb20gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gcmVtb3ZlIGNsYXNzKGVzKSBmcm9tXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIHJlbW92ZVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZUNsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGEgY2xhc3Mgb3IgY2xhc3NlcyBvbiBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byB0b2dnbGUgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIHRvZ2dsZVxuICAgKi9cbiAgc3RhdGljIHRvZ2dsZUNsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY2xvc2VzdCBwYXJlbnQgZWxlbWVudCBiYXNlZCBvbiBjbGFzcy4gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGVcbiAgICogbmF0aXZlIC5jbG9zZXN0KCkgbWV0aG9kIGluIHRoYXQgaXQgZG9lc24ndCBjaGVjayB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQgdG8gc3RhcnQgc2VhcmNoIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGNoZWNrIGZvclxuICAgKiBAcmV0dXJuIHtOb2RlfSAtIENsb3Nlc3QgcGFyZW50IGVsZW1lbnRcbiAgICovXG4gIHN0YXRpYyBjbG9zZXN0KGVsLCBjKSB7XG4gICAgd2hpbGUgKChlbCA9IGVsLnBhcmVudEVsZW1lbnQpICYmICF0aGlzLmhhc0NsYXNzKGVsLCBjKSlcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyBvciBvYmplY3QgdG8gYW4gYXJyYXkuIElmIGFuIGFycmF5IGlzIHBhc3NlZCwgaXQnc1xuICAgKiByZXR1cm5lZCBhcyBpcy4gQW55dGhpbmcgZWxzZSBpcyByZXR1cm5lZCBhcyBhbiBhcnJheS5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gU3RyaW5nIG9yIG9iamVjdCB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSAtIFJldHVybiB0aGUgY29udmVydGVkIGFycmF5XG4gICAqL1xuICBzdGF0aWMgdG9BcnJheShpdGVtKSB7XG5cbiAgICBsZXQgYXJyYXkgPSBbXVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGFycmF5ID0gaXRlbVxuICAgIH0gZWxzZSB7XG4gICAgICBhcnJheS5wdXNoKGl0ZW0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0cy4gUmV0dXJucyBhIG5ldyBvYmplY3QuIFNldCB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICogdG8gYHRydWVgIGZvciBhIGRlZXAgb3IgcmVjdXJzaXZlIG1lcmdlLlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbT3B0aW9uYWxdIC0gSWYgdHJ1ZSwgZG8gYSBkZWVwIChvciByZWN1cnNpdmUpIG1lcmdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAtIFRoZSBvYmplY3RzIHRvIG1lcmdlIHRvZ2V0aGVyOyBlYWNoIG92ZXJyaWRpbmcgdGhlIG5leHRcbiAgICogQHJldHVybnMge09iamVjdH0gLSBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgbGV0IGV4dGVuZGVkID0ge31cbiAgICBsZXQgZGVlcCA9IGZhbHNlXG4gICAgbGV0IGkgPSAwXG4gICAgbGV0IGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBhcmd1bWVudHNbMF0gKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICkge1xuICAgICAgZGVlcCA9IGFyZ3VtZW50c1swXVxuICAgICAgaSsrXG4gICAgfVxuXG4gICAgbGV0IG1lcmdlID0gKCBvYmogKSA9PiB7XG4gICAgICBmb3IgKCBsZXQgcHJvcCBpbiBvYmogKSB7XG4gICAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcbiAgICAgICAgICBpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQoIHRydWUsIGV4dGVuZGVkW3Byb3BdLCBvYmpbcHJvcF0gKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgbGV0IG9iaiA9IGFyZ3VtZW50c1tpXVxuICAgICAgbWVyZ2Uob2JqKVxuICAgIH1cblxuICAgIHJldHVybiBleHRlbmRlZFxuICB9XG5cbn1cbiJdfQ==

//# sourceMappingURL=scripts.js.map
