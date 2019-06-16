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

},{"./dismissible":2,"./drawer":3,"./modal":4,"./toggle":5}],2:[function(require,module,exports){
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

  api.init = function (options) {
    api.destroy();
    settings = _utility["default"].extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
  };

  api.init(options);
  return api;
}

},{"./utility.js":6}],3:[function(require,module,exports){
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
    classTrigger: 'drawer__trigger',
    classDrawer: 'drawer',
    classDialog: 'drawer__dialog',
    classActive: 'is-active',
    classModalSwap: '[data-modal-swap]',
    saveState: true
  };
  var drawer_state;
  var drawers;

  var open = function open(target) {
    _utility["default"].addClass(target, 'is-active');

    if (!target.forEach) {
      target = _utility["default"].toArray(target);
    }

    target.forEach(function (target) {
      drawer_state[target.id] = _utility["default"].hasClass(target, 'is-active');
      localStorage.setItem('drawer_state', JSON.stringify(drawer_state)); // console.log('open: ', target)
      // console.log('drawer_state: ', drawer_state)
    });
  };

  var close = function close(target) {
    _utility["default"].removeClass(target, 'is-active');

    if (!target.forEach) {
      target = _utility["default"].toArray(target);
    }

    target.forEach(function (target) {
      drawer_state[target.id] = _utility["default"].hasClass(target, 'is-active');
      localStorage.setItem('drawer_state', JSON.stringify(drawer_state)); // console.log('close: ', target)
      // console.log('drawer_state: ', drawer_state)
    });
  };

  var run = function run() {
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

  var modalSwap = function modalSwap(target) {
    var breakpoints = {
      'xs': '480px',
      'sm': '620px',
      'md': '760px',
      'lg': '990px',
      'xl': '1380px'
    };
    var minWidth = breakpoints.xl;
    var mq = window.matchMedia("(min-width:" + minWidth + ")");

    var widthChange = function widthChange(mq) {
      if (mq.matches) {
        console.log('window width > ' + minWidth);
      } else {
        console.log('window width < ' + minWidth);
      }
    };

    mq.addListener(widthChange);
    widthChange(mq);
  };

  api.open = function (target) {
    open(document.querySelectorAll(target));
  };

  api.close = function (clear) {
    close(clear);
  };

  api.init = function (drawers) {
    // Init: Setup our variables
    // Get the drawer state from local storage
    drawer_state = localStorage.getItem('drawer_state'); // Check if drawer state was saved otherwise init a new object

    if (drawer_state) {
      drawer_state = JSON.parse(drawer_state);
    } else {
      drawer_state = {};
    } // Get all the drawers on the page


    drawers = document.querySelectorAll('.drawer__item'); // Loop through all drawers and save/init their state

    drawers.forEach(function (drawer) {
      // Set the default state if one is not set
      if (drawer.id in drawer_state === false) {
        drawer_state[drawer.id] = _utility["default"].hasClass(drawer, 'is-active');
      } // Toggle our drawer state based on the saved state


      if (drawer_state[drawer.id] === false) {
        close(drawer);
      } else {
        open(drawer);
      }
    }); // Add our drawer trigger event listener

    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    // Reset the drawer state variable and remove localstorage veriable
    drawer_state = {};
    localStorage.removeItem('drawer_state'); // Remove the drawer trigger event listener

    document.removeEventListener('click', run, false);
  };

  api.init(options);
  return api;
}

},{"./utility.js":6}],4:[function(require,module,exports){
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

  api.open = function (target) {
    open(document.querySelectorAll(target));
  };

  api.close = function (clear) {
    close(clear);
  };

  api.init = function (options) {
    api.destroy();
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

  api.init(options);
  return api;
}

},{"./utility.js":6}],5:[function(require,module,exports){
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

  api.init = function (options) {
    api.destroy();
    settings = _utility["default"].extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
  };

  api.init(options);
  return api;
}

},{"./utility.js":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
    key: "hasClass",

    /**
     * Checks if an element has a class or not
     * ---
     * @param {Object} || {Nodelist} Element(s) to check class(es) on
     * @param {String} || {Array} Class(es) to check
     * @returns {Boolean} Returns true if class exists on element, otherwise false
     */
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2Rpc21pc3NpYmxlLmpzIiwic3JjL2pzL2RyYXdlci5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy90b2dnbGUuanMiLCJzcmMvanMvdXRpbGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxJQUFNLFdBQVcsR0FBRyxJQUFJLHVCQUFKLEVBQXBCO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmO0FBQ0EsSUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBSixFQUFkO0FBQ0EsSUFBTSxNQUFNLEdBQUcsSUFBSSxrQkFBSixFQUFmOzs7Ozs7Ozs7O0FDUkE7Ozs7QUFFZSxrQkFBUyxPQUFULEVBQWtCO0FBRS9COztBQUVBLE1BQUksR0FBRyxHQUFHLEVBQVY7QUFDQSxNQUFJLFFBQUo7QUFDQSxNQUFNLFFBQVEsR0FBRztBQUNmLElBQUEsT0FBTyxFQUFFLGdCQURNO0FBRWYsSUFBQSxNQUFNLEVBQUUsb0JBRk87QUFHZixJQUFBLFdBQVcsRUFBRTtBQUhFLEdBQWpCOztBQU1BLE1BQU0sR0FBRyxHQUFHLFNBQU4sR0FBTSxHQUFNO0FBQ2hCLFFBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsT0FBYixDQUFxQixRQUFRLENBQUMsT0FBOUIsQ0FBZDs7QUFDQSxRQUFJLE9BQUosRUFBYTtBQUNYLFVBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFSLENBQWdCLFFBQVEsQ0FBQyxNQUF6QixDQUFiOztBQUNBLFVBQUksTUFBSixFQUFZO0FBQ1YsNEJBQUUsV0FBRixDQUFjLE1BQWQsRUFBc0IsUUFBUSxDQUFDLFdBQS9CO0FBQ0Q7O0FBQ0QsTUFBQSxLQUFLLENBQUMsY0FBTjtBQUNEO0FBQ0YsR0FURDs7QUFXQSxFQUFBLEdBQUcsQ0FBQyxJ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IiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IERpc21pc3NpYmxlIGZyb20gJy4vZGlzbWlzc2libGUnXG5pbXBvcnQgRHJhd2VyIGZyb20gJy4vZHJhd2VyJ1xuaW1wb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwnXG5pbXBvcnQgVG9nZ2xlIGZyb20gJy4vdG9nZ2xlJ1xuXG5jb25zdCBkaXNtaXNzaWJsZSA9IG5ldyBEaXNtaXNzaWJsZSgpXG5jb25zdCBkcmF3ZXIgPSBuZXcgRHJhd2VyKClcbmNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKClcbmNvbnN0IHRvZ2dsZSA9IG5ldyBUb2dnbGUoKVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtZGlzbWlzc10nLFxuICAgIHRhcmdldDogJ1tkYXRhLWRpc21pc3NpYmxlXScsXG4gICAgY2xhc3NUb2dnbGU6ICdkaXNtaXNzJ1xuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgbGV0IHRhcmdldCA9IHRyaWdnZXIuY2xvc2VzdChzZXR0aW5ncy50YXJnZXQpXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc1RvZ2dsZSlcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgYXBpLmRlc3Ryb3koKVxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVHJpZ2dlcjogJ2RyYXdlcl9fdHJpZ2dlcicsXG4gICAgY2xhc3NEcmF3ZXI6ICdkcmF3ZXInLFxuICAgIGNsYXNzRGlhbG9nOiAnZHJhd2VyX19kaWFsb2cnLFxuICAgIGNsYXNzQWN0aXZlOiAnaXMtYWN0aXZlJyxcbiAgICBjbGFzc01vZGFsU3dhcDogJ1tkYXRhLW1vZGFsLXN3YXBdJyxcbiAgICBzYXZlU3RhdGU6IHRydWVcbiAgfVxuXG4gIGxldCBkcmF3ZXJfc3RhdGVcbiAgbGV0IGRyYXdlcnNcblxuICBjb25zdCBvcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIHUuYWRkQ2xhc3ModGFyZ2V0LCAnaXMtYWN0aXZlJylcbiAgICBpZiAoIXRhcmdldC5mb3JFYWNoKSB7XG4gICAgICB0YXJnZXQgPSB1LnRvQXJyYXkodGFyZ2V0KVxuICAgIH1cbiAgICB0YXJnZXQuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgICBkcmF3ZXJfc3RhdGVbdGFyZ2V0LmlkXSA9IHUuaGFzQ2xhc3ModGFyZ2V0LCAnaXMtYWN0aXZlJylcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcmF3ZXJfc3RhdGUnLCBKU09OLnN0cmluZ2lmeShkcmF3ZXJfc3RhdGUpKVxuICAgICAgLy8gY29uc29sZS5sb2coJ29wZW46ICcsIHRhcmdldClcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkcmF3ZXJfc3RhdGU6ICcsIGRyYXdlcl9zdGF0ZSlcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgY2xvc2UgPSAodGFyZ2V0KSA9PiB7XG4gICAgdS5yZW1vdmVDbGFzcyh0YXJnZXQsICdpcy1hY3RpdmUnKVxuICAgIGlmICghdGFyZ2V0LmZvckVhY2gpIHtcbiAgICAgIHRhcmdldCA9IHUudG9BcnJheSh0YXJnZXQpXG4gICAgfVxuICAgIHRhcmdldC5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICAgIGRyYXdlcl9zdGF0ZVt0YXJnZXQuaWRdID0gdS5oYXNDbGFzcyh0YXJnZXQsICdpcy1hY3RpdmUnKVxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RyYXdlcl9zdGF0ZScsIEpTT04uc3RyaW5naWZ5KGRyYXdlcl9zdGF0ZSkpXG4gICAgICAvLyBjb25zb2xlLmxvZygnY2xvc2U6ICcsIHRhcmdldClcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdkcmF3ZXJfc3RhdGU6ICcsIGRyYXdlcl9zdGF0ZSlcbiAgICB9KVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5kcmF3ZXJfX3RyaWdnZXInKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBsZXQgZGF0YURyYXdlciA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcbiAgICAgIGlmIChkYXRhRHJhd2VyKSB7XG4gICAgICAgIGxldCBkcmF3ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRhdGFEcmF3ZXIpXG4gICAgICAgIGlmIChkcmF3ZXIpIHtcbiAgICAgICAgICBpZiAodS5oYXNDbGFzcyhkcmF3ZXIsICdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgY2xvc2UoZHJhd2VyKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcGVuKGRyYXdlcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBtb2RhbFN3YXAgPSAodGFyZ2V0KSA9PiB7XG4gICAgbGV0IGJyZWFrcG9pbnRzID0ge1xuICAgICAgJ3hzJzogJzQ4MHB4JyxcbiAgICAgICdzbSc6ICc2MjBweCcsXG4gICAgICAnbWQnOiAnNzYwcHgnLFxuICAgICAgJ2xnJzogJzk5MHB4JyxcbiAgICAgICd4bCc6ICcxMzgwcHgnXG4gICAgfVxuXG4gICAgbGV0IG1pbldpZHRoID0gYnJlYWtwb2ludHMueGxcbiAgICBsZXQgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYSggXCIobWluLXdpZHRoOlwiICsgbWluV2lkdGggKyBcIilcIiApXG5cbiAgICBsZXQgd2lkdGhDaGFuZ2UgPSAobXEpID0+IHtcbiAgICAgIGlmIChtcS5tYXRjaGVzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3aW5kb3cgd2lkdGggPiAnICsgbWluV2lkdGgpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnd2luZG93IHdpZHRoIDwgJyArIG1pbldpZHRoKVxuICAgICAgfVxuICAgIH1cblxuICAgIG1xLmFkZExpc3RlbmVyKHdpZHRoQ2hhbmdlKVxuICAgIHdpZHRoQ2hhbmdlKG1xKVxuICB9XG5cbiAgYXBpLm9wZW4gPSAodGFyZ2V0KSA9PiB7XG4gICAgb3Blbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldCkpXG4gIH1cblxuICBhcGkuY2xvc2UgPSAoY2xlYXIpID0+IHtcbiAgICBjbG9zZShjbGVhcilcbiAgfVxuXG4gIGFwaS5pbml0ID0gKGRyYXdlcnMpID0+IHtcblxuICAgIC8vIEluaXQ6IFNldHVwIG91ciB2YXJpYWJsZXNcbiAgICAvLyBHZXQgdGhlIGRyYXdlciBzdGF0ZSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICBkcmF3ZXJfc3RhdGUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyX3N0YXRlJylcblxuICAgIC8vIENoZWNrIGlmIGRyYXdlciBzdGF0ZSB3YXMgc2F2ZWQgb3RoZXJ3aXNlIGluaXQgYSBuZXcgb2JqZWN0XG4gICAgaWYgKGRyYXdlcl9zdGF0ZSkge1xuICAgICAgZHJhd2VyX3N0YXRlID0gSlNPTi5wYXJzZShkcmF3ZXJfc3RhdGUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYXdlcl9zdGF0ZSA9IHt9XG4gICAgfVxuXG4gICAgLy8gR2V0IGFsbCB0aGUgZHJhd2VycyBvbiB0aGUgcGFnZVxuICAgIGRyYXdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJhd2VyX19pdGVtJylcblxuICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgZHJhd2VycyBhbmQgc2F2ZS9pbml0IHRoZWlyIHN0YXRlXG4gICAgZHJhd2Vycy5mb3JFYWNoKChkcmF3ZXIpID0+IHtcblxuICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IHN0YXRlIGlmIG9uZSBpcyBub3Qgc2V0XG4gICAgICBpZiAoZHJhd2VyLmlkIGluIGRyYXdlcl9zdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgZHJhd2VyX3N0YXRlW2RyYXdlci5pZF0gPSB1Lmhhc0NsYXNzKGRyYXdlciwgJ2lzLWFjdGl2ZScpXG4gICAgICB9XG5cbiAgICAgIC8vIFRvZ2dsZSBvdXIgZHJhd2VyIHN0YXRlIGJhc2VkIG9uIHRoZSBzYXZlZCBzdGF0ZVxuICAgICAgaWYgKGRyYXdlcl9zdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICBjbG9zZShkcmF3ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGVuKGRyYXdlcilcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gQWRkIG91ciBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIC8vIFJlc2V0IHRoZSBkcmF3ZXIgc3RhdGUgdmFyaWFibGUgYW5kIHJlbW92ZSBsb2NhbHN0b3JhZ2UgdmVyaWFibGVcbiAgICBkcmF3ZXJfc3RhdGUgPSB7fVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkcmF3ZXJfc3RhdGUnKVxuICAgIC8vIFJlbW92ZSB0aGUgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc01vZGFsOiAnbW9kYWwnLFxuICAgIGNsYXNzRGlhbG9nOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGZvY3VzOiAnW2RhdGEtZm9jdXNdJ1xuICB9XG5cbiAgbGV0IG1lbW9yeVRyaWdnZXJcbiAgbGV0IG1lbW9yeVRhcmdldFxuXG4gIGNvbnN0IG9wZW4gPSAodGFyZ2V0KSA9PiB7XG4gICAgdS5hZGRDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmICh0YXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQuaXRlbSgwKVxuICAgICAgbGV0IGZvY3VzID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuZm9jdXMpXG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgICAgZm9jdXMuZm9jdXMoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldC5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xvc2UgPSAoY2xlYXIgPSBmYWxzZSkgPT4ge1xuICAgIGxldCBtb2RhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzTW9kYWwpXG4gICAgdS5yZW1vdmVDbGFzcyhtb2RhbHMsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmIChjbGVhciA9PSBmYWxzZSAmJiBtZW1vcnlUcmlnZ2VyICYmIG1lbW9yeVRhcmdldCkge1xuICAgICAgaWYgKG1lbW9yeVRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbWVtb3J5VGFyZ2V0Lml0ZW0oMClcbiAgICAgICAgbWVtb3J5VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgICAgaWYgKG1lbW9yeVRyaWdnZXIpIHtcbiAgICAgICAgICAgIG1lbW9yeVRyaWdnZXIuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2xlYXIgPT0gdHJ1ZSkge1xuICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBjb25zdCBlc2NhcGUgPSAoKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG4gICAgbGV0IG1vZGFsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NNb2RhbClcbiAgICBsZXQgZGlhbG9nID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NEaWFsb2cpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICAgIGxldCBkYXRhTW9kYWwgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG4gICAgICBpZiAoZGF0YU1vZGFsKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZGF0YU1vZGFsKVxuICAgICAgICBtZW1vcnlUcmlnZ2VyID0gdHJpZ2dlclxuICAgICAgICBvcGVuKG1lbW9yeVRhcmdldClcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9IGVsc2UgaWYgKG1vZGFsICYmICFkaWFsb2cpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBhcGkub3BlbiA9ICh0YXJnZXQpID0+IHtcbiAgICBvcGVuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9IChjbGVhcikgPT4ge1xuICAgIGNsb3NlKGNsZWFyKVxuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIGFwaS5kZXN0cm95KClcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgdHJpZ2dlcjogJ1tkYXRhLXRvZ2dsZS1jbGFzc10nLFxuICAgIHRhcmdldHM6ICcnLFxuICAgIGNsYXNzOiAnJ1xuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuXG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgbGV0IHRhcmdldHNcblxuICAgICAgaWYgKHNldHRpbmdzLnRhcmdldHMpIHtcbiAgICAgICAgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3MudGFyZ2V0cylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRyaWdnZXIuZGF0YXNldC50b2dnbGVUYXJnZXQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCkge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5jbGFzcykge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgc2V0dGluZ3MuY2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0cmlnZ2VyLCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIGFwaS5kZXN0cm95KClcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiLyoqXG4gKiBVdGlsaXR5XG4gKiAtLS1cbiAqIEEgc2V0IG9mIGhlbHBlciBtZXRob2RzIGZvciBnZW5lcmFsIGphdmFzY3JpcHQgcGx1Z2luIHVzZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IEVsZW1lbnQocykgdG8gY2hlY2sgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGNsYXNzIGV4aXN0cyBvbiBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICByZXR1cm4gYy5zb21lKCBmdW5jdGlvbiAoYykge1xuICAgICAgbGV0IGhhcyA9IGZhbHNlXG4gICAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGMpKSB7XG4gICAgICAgICAgaGFzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGhhc1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIG9yIGNsYXNzZXMgdG8gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gRWxlbWVudChzKSB0byBhZGQgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBhZGRcbiAgICovXG4gIHN0YXRpYyBhZGRDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBvciBjbGFzc2VzIGZyb20gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gRWxlbWVudChzKSB0byByZW1vdmUgY2xhc3MoZXMpIGZyb21cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIHJlbW92ZVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZUNsYXNzKGVsLCBjKSB7XG4gICAgaWYgKCFlbC5mb3JFYWNoKSB7XG4gICAgICBlbCA9IHRoaXMudG9BcnJheShlbClcbiAgICB9XG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gRWxlbWVudChzKSB0byB0b2dnbGUgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IGJhc2VkIG9uIGNsYXNzLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgKiBuYXRpdmUgLmNsb3Nlc3QoKSBtZXRob2QgaW4gdGhhdCBpdCBkb2Vzbid0IGNoZWNrIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gRWxlbWVudCB0byBzdGFydCBzZWFyY2ggb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGNoZWNrIGZvclxuICAgKiBAcmV0dXJuIHtFbGVtZW50fSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdChlbCwgYykge1xuICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSAmJiAhdGhpcy5oYXNDbGFzcyhlbCwgYykpXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBzdHJpbmcgb3Igb2JqZWN0IHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3NcbiAgICogcmV0dXJuZWQgYXMgaXMuIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge09iamVjdH0gU3RyaW5nIG9yIG9iamVjdCB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm4gdGhlIGNvbnZlcnRlZCBhcnJheVxuICAgKi9cbiAgc3RhdGljIHRvQXJyYXkoaXRlbSkge1xuXG4gICAgbGV0IGFycmF5ID0gW11cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBhcnJheSA9IGl0ZW1cbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkucHVzaChpdGVtKVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LiBTZXQgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIHRvIGB0cnVlYCBmb3IgYSBkZWVwIG9yIHJlY3Vyc2l2ZSBtZXJnZS5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW09wdGlvbmFsXSBJZiB0cnVlLCBkbyBhIGRlZXAgKG9yIHJlY3Vyc2l2ZSkgbWVyZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IFRoZSBvYmplY3RzIHRvIG1lcmdlIHRvZ2V0aGVyOyBlYWNoIG92ZXJyaWRpbmcgdGhlIG5leHRcbiAgICogQHJldHVybnMge09iamVjdH0gTWVyZ2VkIHZhbHVlcyBvZiBkZWZhdWx0cyBhbmQgb3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgIHZhciBleHRlbmRlZCA9IHt9XG4gICAgdmFyIGRlZXAgPSBmYWxzZVxuICAgIHZhciBpID0gMFxuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG5cbiAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcbiAgICAgIGRlZXAgPSBhcmd1bWVudHNbMF1cbiAgICAgIGkrK1xuICAgIH1cblxuICAgIGxldCBtZXJnZSA9ICggb2JqICkgPT4ge1xuICAgICAgZm9yICggdmFyIHByb3AgaW4gb2JqICkge1xuICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqLCBwcm9wICkgKSB7XG4gICAgICAgICAgaWYgKCBkZWVwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbcHJvcF0pID09PSAnW29iamVjdCBPYmplY3RdJyApIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV1cbiAgICAgIG1lcmdlKG9iailcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kZWRcbiAgfVxuXG59XG4iXX0=

//# sourceMappingURL=scripts.js.map
