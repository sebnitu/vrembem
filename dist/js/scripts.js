(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

var _modal = require('./modal.js');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = new _component2.default();
instance.init();

var m = new _modal2.default();
m.init();

},{"./component.js":2,"./modal.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  'use strict';

  // Init variables

  var api = {};
  var settings;

  // Default settings
  var defaults = {
    classTrigger: 'trigger',
    classTarget: 'target',
    classActive: 'active'

    // Private functions
  };var run = function run() {
    var trigger = event.target.closest('.' + settings.classTrigger);

    if (trigger) {
      close();
      var dataModal = trigger.dataset.modal;
      if (dataModal) {
        open(document.getElementById(dataModal));
      }
      event.preventDefault();
    }
  };

  // Public functions
  api.init = function (options) {
    api.destroy();
    settings = _utility2.default.extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
  };

  // Return the application program interface
  return api;
};

var _utility = require('./utility.js');

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./utility.js":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  'use strict';

  var api = {};
  var settings;
  var defaults = {
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
    classActive: 'is-active'
  };

  var open = function open(target) {
    _utility2.default.addClass(target, settings.classActive);
  };

  var close = function close() {
    var modals = document.querySelectorAll('.' + settings.classModal);
    for (var i = 0; i < modals.length; ++i) {
      _utility2.default.removeClass(modals[i], settings.classActive);
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
        open(document.getElementById(dataModal));
      }
      event.preventDefault();
    } else if (modal && !dialog) {
      close();
    }
  };

  api.init = function (options) {
    api.destroy();
    settings = _utility2.default.extend(defaults, options || {});
    document.addEventListener('click', run, false);
    document.addEventListener('touchstart', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
    document.removeEventListener('touchstart', run, false);
  };

  return api;
};

var _utility = require('./utility.js');

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./utility.js":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: 'hasClass',


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
    key: 'addClass',
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
    key: 'removeClass',
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
    key: 'toggleClass',
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
    key: 'closest',
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
    key: 'toArray',
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
    key: 'extend',
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

  return _class;
}();

exports.default = _class;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbXBvbmVudC5qcyIsInNyYy9qcy9tb2RhbC5qcyIsInNyYy9qcy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNLFdBQVcseUJBQWpCO0FBQ0EsU0FBUyxJQUFUOztBQUVBLElBQU0sSUFBSSxxQkFBVjtBQUNBLEVBQUUsSUFBRjs7Ozs7Ozs7O2tCQ0xlLFlBQVc7O0FBRXhCOztBQUVBOztBQUNBLE1BQUksTUFBTSxFQUFWO0FBQ0EsTUFBSSxRQUFKOztBQUVBO0FBQ0EsTUFBSSxXQUFXO0FBQ2Isa0JBQWMsU0FERDtBQUViLGlCQUFhLFFBRkE7QUFHYixpQkFBYTs7QUFHZjtBQU5lLEdBQWYsQ0FPQSxJQUFJLE1BQU0sU0FBTixHQUFNLEdBQVc7QUFDbkIsUUFBSSxVQUFVLE1BQU0sTUFBTixDQUFhLE9BQWIsQ0FBcUIsTUFBTSxTQUFTLFlBQXBDLENBQWQ7O0FBRUEsUUFBSSxPQUFKLEVBQWE7QUFDWDtBQUNBLFVBQUksWUFBWSxRQUFRLE9BQVIsQ0FBZ0IsS0FBaEM7QUFDQSxVQUFJLFNBQUosRUFBZTtBQUNiLGFBQUssU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQUw7QUFDRDtBQUNELFlBQU0sY0FBTjtBQUNEO0FBQ0YsR0FYRDs7QUFhQTtBQUNBLE1BQUksSUFBSixHQUFXLFVBQVMsT0FBVCxFQUFrQjtBQUMzQixRQUFJLE9BQUo7QUFDQSxlQUFXLGtCQUFFLE1BQUYsQ0FBVSxRQUFWLEVBQW9CLFdBQVcsRUFBL0IsQ0FBWDtBQUNBLGFBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsR0FBbkMsRUFBd0MsS0FBeEM7QUFDRCxHQUpEOztBQU1BLE1BQUksT0FBSixHQUFjLFlBQVc7QUFDdkIsZUFBVyxJQUFYO0FBQ0EsYUFBUyxtQkFBVCxDQUE2QixPQUE3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R0FBVixFQUFnQjtBQUMxQixhQUFNLElBQUksSUFBVixJQUFrQixHQUFsQixFQUF3QjtBQUN0QixjQUFLLE9BQU8sU0FBUCxDQUFpQixjQUFqQixDQUFnQyxJQUFoQyxDQUFzQyxHQUF0QyxFQUEyQyxJQUEzQyxDQUFMLEVBQXlEO0FBQ3ZELGdCQUFLLFFBQVEsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLElBQUksSUFBSixDQUEvQixNQUE4QyxpQkFBM0QsRUFBK0U7QUFDN0UsdUJBQVMsSUFBVCxJQUFpQixPQUFRLElBQVIsRUFBYyxTQUFTLElBQVQsQ0FBZCxFQUE4QixJQUFJLElBQUosQ0FBOUIsQ0FBakI7QUFDRCxhQUZELE1BRU87QUFDTCx1QkFBUyxJQUFULElBQWlCLElBQUksSUFBSixDQUFqQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BVkQ7O0FBWUEsYUFBUSxJQUFJLE1BQVosRUFBb0IsR0FBcEIsRUFBMEI7QUFDeEIsWUFBSSxNQUFNLFVBQVUsQ0FBVixDQUFWO0FBQ0EsY0FBTSxHQUFOO0FBQ0Q7O0FBRUQsYUFBTyxRQUFQO0FBQ0QsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBjb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQuanMnXG5pbXBvcnQgbW9kYWwgZnJvbSAnLi9tb2RhbC5qcydcblxuY29uc3QgaW5zdGFuY2UgPSBuZXcgY29tcG9uZW50KClcbmluc3RhbmNlLmluaXQoKVxuXG5jb25zdCBtID0gbmV3IG1vZGFsKClcbm0uaW5pdCgpXG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIC8vIEluaXQgdmFyaWFibGVzXG4gIHZhciBhcGkgPSB7fVxuICB2YXIgc2V0dGluZ3NcblxuICAvLyBEZWZhdWx0IHNldHRpbmdzXG4gIHZhciBkZWZhdWx0cyA9IHtcbiAgICBjbGFzc1RyaWdnZXI6ICd0cmlnZ2VyJyxcbiAgICBjbGFzc1RhcmdldDogJ3RhcmdldCcsXG4gICAgY2xhc3NBY3RpdmU6ICdhY3RpdmUnXG4gIH1cblxuICAvLyBQcml2YXRlIGZ1bmN0aW9uc1xuICB2YXIgcnVuID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG5cbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgdmFyIGRhdGFNb2RhbCA9IHRyaWdnZXIuZGF0YXNldC5tb2RhbFxuICAgICAgaWYgKGRhdGFNb2RhbCkge1xuICAgICAgICBvcGVuKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGFNb2RhbCkpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgLy8gUHVibGljIGZ1bmN0aW9uc1xuICBhcGkuaW5pdCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICBhcGkuZGVzdHJveSgpXG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSBhcHBsaWNhdGlvbiBwcm9ncmFtIGludGVyZmFjZVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIHZhciBhcGkgPSB7fVxuICB2YXIgc2V0dGluZ3NcbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc01vZGFsOiAnbW9kYWwnLFxuICAgIGNsYXNzRGlhbG9nOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnXG4gIH1cblxuICB2YXIgb3BlbiA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIHUuYWRkQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgfVxuXG4gIHZhciBjbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtb2RhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzTW9kYWwpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2RhbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MobW9kYWxzW2ldLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgcnVuID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG4gICAgdmFyIG1vZGFsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NNb2RhbClcbiAgICB2YXIgZGlhbG9nID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NEaWFsb2cpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICAgIHZhciBkYXRhTW9kYWwgPSB0cmlnZ2VyLmRhdGFzZXQubW9kYWxcbiAgICAgIGlmIChkYXRhTW9kYWwpIHtcbiAgICAgICAgb3Blbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhTW9kYWwpKVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAobW9kYWwgJiYgIWRpYWxvZykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIGFwaS5kZXN0cm95KClcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHJ1biwgZmFsc2UpXG4gIH1cblxuICByZXR1cm4gYXBpXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzIG9yIG5vdFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gY2hlY2sgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGNsYXNzIGV4aXN0cyBvbiBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICByZXR1cm4gYy5ldmVyeSggZnVuY3Rpb24gKCBjICkge1xuICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIG9yIGNsYXNzZXMgdG8gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gYWRkIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gYWRkXG4gICAqL1xuICBzdGF0aWMgYWRkQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCBjIClcbiAgICB9KVxuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBvciBjbGFzc2VzIGZyb20gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gcmVtb3ZlIGNsYXNzKGVzKSBmcm9tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byByZW1vdmVcbiAgICovXG4gIHN0YXRpYyByZW1vdmVDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICBjLmZvckVhY2goIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoIGMgKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGEgY2xhc3Mgb3IgY2xhc3NlcyBvbiBhbiBlbGVtZW50XG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byB0b2dnbGUgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICBjLmZvckVhY2goIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYylcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGNsb3Nlc3QgcGFyZW50IGVsZW1lbnQgYmFzZWQgb24gY2xhc3MuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlXG4gICAqIG5hdGl2ZSAuY2xvc2VzdCgpIG1ldGhvZCBpbiB0aGF0IGl0IGRvZXNuJ3QgY2hlY2sgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIHN0YXJ0IHNlYXJjaCBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gY2hlY2sgZm9yXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9IENsb3Nlc3QgcGFyZW50IGVsZW1lbnRcbiAgICovXG4gIHN0YXRpYyBjbG9zZXN0KCBlbCwgYyApIHtcbiAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50RWxlbWVudCkgJiYgIXRoaXMuaGFzQ2xhc3MoZWwsIGMpKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3MgcmV0dXJuZWQgYXMgaXMuXG4gICAqIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgZmFsc2UuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IFN0cmluZyB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm4gdGhlIGNvbnZlcnRlZCBhcnJheVxuICAgKi9cbiAgc3RhdGljIHRvQXJyYXkoc3RyaW5nKSB7XG5cbiAgICB2YXIgYXJyYXkgPSBbXVxuXG4gICAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhcnJheS5wdXNoKHN0cmluZylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc3RyaW5nKSkge1xuICAgICAgYXJyYXkgPSBzdHJpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0cy4gUmV0dXJucyBhIG5ldyBvYmplY3QuIFNldCB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICogdG8gYHRydWVgIGZvciBhIGRlZXAgb3IgcmVjdXJzaXZlIG1lcmdlLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtPcHRpb25hbF0gSWYgdHJ1ZSwgZG8gYSBkZWVwIChvciByZWN1cnNpdmUpIG1lcmdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlcjsgZWFjaCBvdmVycmlkaW5nIHRoZSBuZXh0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IE1lcmdlZCB2YWx1ZXMgb2YgZGVmYXVsdHMgYW5kIG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICB2YXIgZXh0ZW5kZWQgPSB7fVxuICAgIHZhciBkZWVwID0gZmFsc2VcbiAgICB2YXIgaSA9IDBcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIGFyZ3VtZW50c1swXSApID09PSAnW29iamVjdCBCb29sZWFuXScgKSB7XG4gICAgICBkZWVwID0gYXJndW1lbnRzWzBdXG4gICAgICBpKytcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2UgPSBmdW5jdGlvbiggb2JqICkge1xuICAgICAgZm9yICggdmFyIHByb3AgaW4gb2JqICkge1xuICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqLCBwcm9wICkgKSB7XG4gICAgICAgICAgaWYgKCBkZWVwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbcHJvcF0pID09PSAnW29iamVjdCBPYmplY3RdJyApIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV1cbiAgICAgIG1lcmdlKG9iailcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kZWRcbiAgfVxuXG59XG4iXX0=

//# sourceMappingURL=scripts.js.map
