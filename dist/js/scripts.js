(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _modal = _interopRequireDefault(require("./modal.js"));

var _dismissible = _interopRequireDefault(require("./dismissible.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modal = new _modal.default();
var dismissible = new _dismissible.default();

},{"./dismissible.js":2,"./modal.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
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
        _utility.default.toggleClass(target, settings.classToggle);
      }

      event.preventDefault();
    }
  };

  api.init = function (options) {
    api.destroy();
    settings = _utility.default.extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
  };

  api.init();
  return api;
}

},{"./utility.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  'use strict';
  /**
   * Variables
   */

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
  /**
   * Private functions
   */

  var open = function open(target) {
    _utility.default.addClass(target, settings.classActive);

    var focus = target.querySelector(settings.focus);
    target.addEventListener('transitionend', function _listener() {
      if (focus) {
        focus.focus();
      } else {
        target.focus();
      }

      this.removeEventListener('transitionend', _listener, true);
    }, true);
  };

  var close = function close() {
    var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var modals = document.querySelectorAll('.' + settings.classModal);

    for (var i = 0; i < modals.length; ++i) {
      _utility.default.removeClass(modals[i], settings.classActive);
    }

    if (clear == false && memoryTrigger && memoryTarget) {
      memoryTarget.addEventListener('transitionend', function _listener() {
        if (memoryTrigger) {
          memoryTrigger.focus();
        }

        memoryTarget = null;
        memoryTrigger = null;
        this.removeEventListener('transitionend', _listener, true);
      }, true);
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
      var dataModal = trigger.dataset.modal;

      if (dataModal) {
        memoryTarget = document.getElementById(dataModal);
        memoryTrigger = trigger;
        open(memoryTarget);
      }

      event.preventDefault();
    } else if (modal && !dialog) {
      close();
    }
  };
  /**
   * Public functions
   */


  api.open = function (target) {
    open(document.getElementById(target));
  };

  api.close = function (clear) {
    close(clear);
  };

  api.init = function (options) {
    api.destroy();
    settings = _utility.default.extend(defaults, options || {});
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
  /**
   * Init the plugin
   */


  api.init();
  /**
   * Return the API
   */

  return api;
}

},{"./utility.js":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
     * @param {Element} Element to check class(es) on
     * @param {String} || {Array} Class(es) to check
     * @returns {Boolean} Returns true if class exists on element, otherwise false
     */
    value: function hasClass(el, c) {
      c = this.toArray(c);
      return c.every(function (c) {
        return el.classList.contains(c);
      });
    }
    /**
     * Adds a class or classes to an element
     * @param {Element} Element to add class(es) on
     * @param {String} || {Array} Class(es) to add
     */

  }, {
    key: "addClass",
    value: function addClass(el, c) {
      c = this.toArray(c);
      c.forEach(function (c) {
        el.classList.add(c);
      });
    }
    /**
     * Remove a class or classes from an element
     * @param {Element} Element to remove class(es) from
     * @param {String} || {Array} Class(es) to remove
     */

  }, {
    key: "removeClass",
    value: function removeClass(el, c) {
      c = this.toArray(c);
      c.forEach(function (c) {
        el.classList.remove(c);
      });
    }
    /**
     * Toggle a class or classes on an element
     * @param {Element} Element to toggle class(es) on
     * @param {String} || {Array} Class(es) to toggle
     */

  }, {
    key: "toggleClass",
    value: function toggleClass(el, c) {
      c = this.toArray(c);
      c.forEach(function (c) {
        el.classList.toggle(c);
      });
    }
    /**
     * Find the closest parent element based on class. This is different from the
     * native .closest() method in that it doesn't check the current element.
     * @param {Element} Element to start search on
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
     * Converts a string to an array. If an array is passed, it's returned as is.
     * Anything else is returned as false.
     * @param {String} || {Array} String to convert to an array
     * @return {Array} Return the converted array
     */

  }, {
    key: "toArray",
    value: function toArray(string) {
      var array = [];

      if (typeof string === 'string') {
        array.push(string);
      } else if (Array.isArray(string)) {
        array = string;
      } else {
        return false;
      }

      return array;
    }
    /**
     * Merge two or more objects. Returns a new object. Set the first argument
     * to `true` for a deep or recursive merge.
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

exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2Rpc21pc3NpYmxlLmpzIiwic3JjL2pzL21vZGFsLmpzIiwic3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOzs7O0FBRUEsSUFBTSxLQUFLLEdBQUcsSUFBSSxjQUFKLEVBQWQ7QUFDQSxJQUFNLFdBQVcsR0FBRyxJQUFJLG9CQUFKLEVBQXBCOzs7Ozs7Ozs7O0FDSkE7Ozs7QUFFZSxvQkFBVztBQUV4Qjs7QUFFQSxNQUFJLEdBQUcsR0FBRyxFQUFWO0FBQ0EsTUFBSSxRQUFKO0FBQ0EsTUFBSSxRQUFRLEdBQUc7QUFDYixJQUFBLE9BQU8sRUFBRSxnQkFESTtBQUViLElBQUEsTUFBTSxFQUFFLG9CQUZLO0FBR2IsSUFBQSxXQUFXLEVBQUU7QUFIQSxHQUFmOztBQU1BLE1BQUksR0FBRyxHQUFHLFNBQU4sR0FBTSxHQUFNO0FBQ2QsUUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxPQUFiLENBQXFCLFFBQVEsQ0FBQyxPQUE5QixDQUFkOztBQUNBLFFBQUksT0FBSixFQUFhO0FBQ1gsVUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsUUFBUSxDQUFDLE1BQXpCLENBQWI7O0FBQ0EsVUFBSSxNQUFKLEVBQVk7QUFDVix5QkFBRSxXQUFGLENBQWMsTUFBZCxFQUFzQixRQUFRLENBQUMsV0FBL0I7QUFDRDs7QUFDRCxNQUFBLEtBQUssQ0FBQyxjQUFOO0FBQ0Q7QUFDRixHQVREOztBQVdBLEVBQUEsR0FBRyxDQUFDLElBQUosR0FBVyxVQUFDLE9BQUQsRUFBYTtBQUN0QixJQUFBLEdBQUcsQ0FBQyxPQUFKO0FBQ0EsSUFBQSxRQUFRLEdBQUcsaUJBQUUsTUFBRixDQUFVLFFBQVYsRUFBb0IsT0FBTyxJQUFJLEVBQS9CLENBQVg7QUFDQSxJQUFBLFFBQVEsQ0FB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Y3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IE1vZGFsIGZyb20gJy4vbW9kYWwuanMnXG5pbXBvcnQgRGlzbWlzc2libGUgZnJvbSAnLi9kaXNtaXNzaWJsZS5qcydcblxuY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoKVxuY29uc3QgZGlzbWlzc2libGUgPSBuZXcgRGlzbWlzc2libGUoKVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGxldCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtZGlzbWlzc10nLFxuICAgIHRhcmdldDogJ1tkYXRhLWRpc21pc3NpYmxlXScsXG4gICAgY2xhc3NUb2dnbGU6ICdkaXNtaXNzJ1xuICB9XG5cbiAgbGV0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0cmlnZ2VyLmNsb3Nlc3Qoc2V0dGluZ3MudGFyZ2V0KVxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NUb2dnbGUpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIGFwaS5kZXN0cm95KClcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmluaXQoKVxuXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgLyoqXG4gICAqIFZhcmlhYmxlc1xuICAgKi9cblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGxldCBkZWZhdWx0cyA9IHtcbiAgICBjbGFzc1RyaWdnZXI6ICdtb2RhbF9fdHJpZ2dlcicsXG4gICAgY2xhc3NNb2RhbDogJ21vZGFsJyxcbiAgICBjbGFzc0RpYWxvZzogJ21vZGFsX19kaWFsb2cnLFxuICAgIGNsYXNzQWN0aXZlOiAnaXMtYWN0aXZlJyxcbiAgICBmb2N1czogJ1tkYXRhLWZvY3VzXSdcbiAgfVxuXG4gIGxldCBtZW1vcnlUcmlnZ2VyXG4gIGxldCBtZW1vcnlUYXJnZXRcblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbnNcbiAgICovXG5cbiAgbGV0IG9wZW4gPSAodGFyZ2V0KSA9PiB7XG4gICAgdS5hZGRDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGxldCBmb2N1cyA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLmZvY3VzKVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgIGZvY3VzLmZvY3VzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5mb2N1cygpXG4gICAgICB9XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgfSwgdHJ1ZSk7XG4gIH1cblxuICBsZXQgY2xvc2UgPSAoY2xlYXIgPSBmYWxzZSkgPT4ge1xuICAgIGxldCBtb2RhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzTW9kYWwpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RhbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MobW9kYWxzW2ldLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9XG4gICAgaWYgKGNsZWFyID09IGZhbHNlICYmIG1lbW9yeVRyaWdnZXIgJiYgbWVtb3J5VGFyZ2V0KSB7XG4gICAgICBtZW1vcnlUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKG1lbW9yeVRyaWdnZXIpIHtcbiAgICAgICAgICBtZW1vcnlUcmlnZ2VyLmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICAgIH0sIHRydWUpO1xuICAgIH0gZWxzZSBpZiAoY2xlYXIgPT0gdHJ1ZSkge1xuICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBsZXQgZXNjYXBlID0gKCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgbGV0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgbW9kYWwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGxldCBkaWFsb2cgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0RpYWxvZylcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgbGV0IGRhdGFNb2RhbCA9IHRyaWdnZXIuZGF0YXNldC5tb2RhbFxuICAgICAgaWYgKGRhdGFNb2RhbCkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhTW9kYWwpXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSB0cmlnZ2VyXG4gICAgICAgIG9wZW4obWVtb3J5VGFyZ2V0KVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAobW9kYWwgJiYgIWRpYWxvZykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgZnVuY3Rpb25zXG4gICAqL1xuXG4gIGFwaS5vcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9IChjbGVhcikgPT4ge1xuICAgIGNsb3NlKGNsZWFyKVxuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIGFwaS5kZXN0cm95KClcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBwbHVnaW5cbiAgICovXG4gIGFwaS5pbml0KClcblxuICAvKipcbiAgICogUmV0dXJuIHRoZSBBUElcbiAgICovXG4gIHJldHVybiBhcGlcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGEgY2xhc3Mgb3Igbm90XG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byBjaGVjayBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgY2xhc3MgZXhpc3RzIG9uIGVsZW1lbnQsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgc3RhdGljIGhhc0NsYXNzKCBlbCwgYyApIHtcblxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcblxuICAgIHJldHVybiBjLmV2ZXJ5KCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGMpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3Mgb3IgY2xhc3NlcyB0byBhbiBlbGVtZW50XG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byBhZGQgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBhZGRcbiAgICovXG4gIHN0YXRpYyBhZGRDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICBjLmZvckVhY2goIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoIGMgKVxuICAgIH0pXG4gIH1cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNsYXNzIG9yIGNsYXNzZXMgZnJvbSBhbiBlbGVtZW50XG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byByZW1vdmUgY2xhc3MoZXMpIGZyb21cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIHJlbW92ZVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZUNsYXNzKCBlbCwgYyApIHtcblxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcblxuICAgIGMuZm9yRWFjaCggZnVuY3Rpb24gKCBjICkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSggYyApXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgYSBjbGFzcyBvciBjbGFzc2VzIG9uIGFuIGVsZW1lbnRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIHRvZ2dsZSBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIHRvZ2dsZVxuICAgKi9cbiAgc3RhdGljIHRvZ2dsZUNsYXNzKCBlbCwgYyApIHtcblxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcblxuICAgIGMuZm9yRWFjaCggZnVuY3Rpb24gKCBjICkge1xuICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShjKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY2xvc2VzdCBwYXJlbnQgZWxlbWVudCBiYXNlZCBvbiBjbGFzcy4gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGVcbiAgICogbmF0aXZlIC5jbG9zZXN0KCkgbWV0aG9kIGluIHRoYXQgaXQgZG9lc24ndCBjaGVjayB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gc3RhcnQgc2VhcmNoIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBjaGVjayBmb3JcbiAgICogQHJldHVybiB7RWxlbWVudH0gQ2xvc2VzdCBwYXJlbnQgZWxlbWVudFxuICAgKi9cbiAgc3RhdGljIGNsb3Nlc3QoIGVsLCBjICkge1xuICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSAmJiAhdGhpcy5oYXNDbGFzcyhlbCwgYykpXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBzdHJpbmcgdG8gYW4gYXJyYXkuIElmIGFuIGFycmF5IGlzIHBhc3NlZCwgaXQncyByZXR1cm5lZCBhcyBpcy5cbiAgICogQW55dGhpbmcgZWxzZSBpcyByZXR1cm5lZCBhcyBmYWxzZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gU3RyaW5nIHRvIGNvbnZlcnQgdG8gYW4gYXJyYXlcbiAgICogQHJldHVybiB7QXJyYXl9IFJldHVybiB0aGUgY29udmVydGVkIGFycmF5XG4gICAqL1xuICBzdGF0aWMgdG9BcnJheShzdHJpbmcpIHtcblxuICAgIHZhciBhcnJheSA9IFtdXG5cbiAgICBpZiAodHlwZW9mIHN0cmluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFycmF5LnB1c2goc3RyaW5nKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzdHJpbmcpKSB7XG4gICAgICBhcnJheSA9IHN0cmluZ1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzLiBSZXR1cm5zIGEgbmV3IG9iamVjdC4gU2V0IHRoZSBmaXJzdCBhcmd1bWVudFxuICAgKiB0byBgdHJ1ZWAgZm9yIGEgZGVlcCBvciByZWN1cnNpdmUgbWVyZ2UuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW09wdGlvbmFsXSBJZiB0cnVlLCBkbyBhIGRlZXAgKG9yIHJlY3Vyc2l2ZSkgbWVyZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IFRoZSBvYmplY3RzIHRvIG1lcmdlIHRvZ2V0aGVyOyBlYWNoIG92ZXJyaWRpbmcgdGhlIG5leHRcbiAgICogQHJldHVybnMge09iamVjdH0gTWVyZ2VkIHZhbHVlcyBvZiBkZWZhdWx0cyBhbmQgb3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgIHZhciBleHRlbmRlZCA9IHt9XG4gICAgdmFyIGRlZXAgPSBmYWxzZVxuICAgIHZhciBpID0gMFxuICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG5cbiAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcbiAgICAgIGRlZXAgPSBhcmd1bWVudHNbMF1cbiAgICAgIGkrK1xuICAgIH1cblxuICAgIGxldCBtZXJnZSA9ICggb2JqICkgPT4ge1xuICAgICAgZm9yICggdmFyIHByb3AgaW4gb2JqICkge1xuICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqLCBwcm9wICkgKSB7XG4gICAgICAgICAgaWYgKCBkZWVwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbcHJvcF0pID09PSAnW29iamVjdCBPYmplY3RdJyApIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV1cbiAgICAgIG1lcmdlKG9iailcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kZWRcbiAgfVxuXG59XG4iXX0=

//# sourceMappingURL=scripts.js.map
