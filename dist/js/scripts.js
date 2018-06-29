(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _component = require('./component.js');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = new _component2.default();

instance.init();

},{"./component.js":2}],2:[function(require,module,exports){
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

},{"./utility.js":3}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbXBvbmVudC5qcyIsInNyYy9qcy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7Ozs7O0FBRUEsSUFBTSxXQUFXLHlCQUFqQjs7QUFFQSxTQUFTLElBQVQ7Ozs7Ozs7OztrQkNGZSxZQUFXOztBQUV4Qjs7QUFFQTs7QUFDQSxNQUFJLE1BQU0sRUFBVjtBQUNBLE1BQUksUUFBSjs7QUFFQTtBQUNBLE1BQUksV0FBVztBQUNiLGtCQUFjLFNBREQ7QUFFYixpQkFBYSxRQUZBO0FBR2IsaUJBQWE7O0FBR2Y7QUFOZSxHQUFmLENBT0EsSUFBSSxNQUFNLFNBQU4sR0FBTSxHQUFXO0FBQ25CLFFBQUksVUFBVSxNQUFNLE1BQU4sQ0FBYSxPQUFiLENBQXFCLE1BQU0sU0FBUyxZQUFwQyxDQUFkOztBQUVBLFFBQUksT0FBSixFQUFhO0FBQ1g7QUFDQSxVQUFJLFlBQVksUUFBUSxPQUFSLENBQWdCLEtBQWhDO0FBQ0EsVUFBSSxTQUFKLEVBQWU7QUFDYixhQUFLLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUFMO0FBQ0Q7QUFDRCxZQUFNLGNBQU47QUFDRDtBQUNGLEdBWEQ7O0FBYUE7QUFDQSxNQUFJLElBQUosR0FBVyxVQUFTLE9BQVQsRUFBa0I7QUFDM0IsUUFBSSxPQUFKO0FBQ0EsZUFBVyxrQkFBRSxNQUFGLENBQVUsUUFBVixFQUFvQixXQUFXLEVBQS9CLENBQVg7QUFDQSxhQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLEtBQXhDO0FBQ0QsR0FKRDs7QUFNQSxNQUFJLE9BQUosR0FBYyxZQUFXO0FBQ3ZCLGVBQVcsSUFBWDtBQUNBLGFBQVMsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0MsR0FBdEMsRUFBMkMsS0FBM0M7QUFDRCxHQUhEOztBQUtBO0FBQ0EsU0FBTyxHQUFQO0FBQ0Qs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TSxHQUFOO0FBQ0Q7O0FBRUQsYUFBTyxRQUFQO0FBQ0QsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBjb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnQuanMnXG5cbmNvbnN0IGluc3RhbmNlID0gbmV3IGNvbXBvbmVudCgpXG5cbmluc3RhbmNlLmluaXQoKVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICAndXNlIHN0cmljdCdcblxuICAvLyBJbml0IHZhcmlhYmxlc1xuICB2YXIgYXBpID0ge31cbiAgdmFyIHNldHRpbmdzXG5cbiAgLy8gRGVmYXVsdCBzZXR0aW5nc1xuICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgY2xhc3NUcmlnZ2VyOiAndHJpZ2dlcicsXG4gICAgY2xhc3NUYXJnZXQ6ICd0YXJnZXQnLFxuICAgIGNsYXNzQWN0aXZlOiAnYWN0aXZlJ1xuICB9XG5cbiAgLy8gUHJpdmF0ZSBmdW5jdGlvbnNcbiAgdmFyIHJ1biA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyKVxuXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICAgIHZhciBkYXRhTW9kYWwgPSB0cmlnZ2VyLmRhdGFzZXQubW9kYWxcbiAgICAgIGlmIChkYXRhTW9kYWwpIHtcbiAgICAgICAgb3Blbihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhTW9kYWwpKVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIC8vIFB1YmxpYyBmdW5jdGlvbnNcbiAgYXBpLmluaXQgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgYXBpLmRlc3Ryb3koKVxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIC8vIFJldHVybiB0aGUgYXBwbGljYXRpb24gcHJvZ3JhbSBpbnRlcmZhY2VcbiAgcmV0dXJuIGFwaVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIGNoZWNrIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gY2hlY2tcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBjbGFzcyBleGlzdHMgb24gZWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaGFzQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgcmV0dXJuIGMuZXZlcnkoIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoYylcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBvciBjbGFzc2VzIHRvIGFuIGVsZW1lbnRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIGFkZCBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGFkZFxuICAgKi9cbiAgc3RhdGljIGFkZENsYXNzKCBlbCwgYyApIHtcblxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcblxuICAgIGMuZm9yRWFjaCggZnVuY3Rpb24gKCBjICkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCggYyApXG4gICAgfSlcbiAgfVxuICAvKipcbiAgICogUmVtb3ZlIGEgY2xhc3Mgb3IgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIHJlbW92ZSBjbGFzcyhlcykgZnJvbVxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gcmVtb3ZlXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCBjIClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gdG9nZ2xlIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gdG9nZ2xlXG4gICAqL1xuICBzdGF0aWMgdG9nZ2xlQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGMpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IGJhc2VkIG9uIGNsYXNzLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgKiBuYXRpdmUgLmNsb3Nlc3QoKSBtZXRob2QgaW4gdGhhdCBpdCBkb2Vzbid0IGNoZWNrIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byBzdGFydCBzZWFyY2ggb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGNoZWNrIGZvclxuICAgKiBAcmV0dXJuIHtFbGVtZW50fSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdCggZWwsIGMgKSB7XG4gICAgd2hpbGUgKChlbCA9IGVsLnBhcmVudEVsZW1lbnQpICYmICF0aGlzLmhhc0NsYXNzKGVsLCBjKSlcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhbiBhcnJheS4gSWYgYW4gYXJyYXkgaXMgcGFzc2VkLCBpdCdzIHJldHVybmVkIGFzIGlzLlxuICAgKiBBbnl0aGluZyBlbHNlIGlzIHJldHVybmVkIGFzIGZhbHNlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBTdHJpbmcgdG8gY29udmVydCB0byBhbiBhcnJheVxuICAgKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJuIHRoZSBjb252ZXJ0ZWQgYXJyYXlcbiAgICovXG4gIHN0YXRpYyB0b0FycmF5KHN0cmluZykge1xuXG4gICAgdmFyIGFycmF5ID0gW11cblxuICAgIGlmICh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgYXJyYXkucHVzaChzdHJpbmcpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHN0cmluZykpIHtcbiAgICAgIGFycmF5ID0gc3RyaW5nXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LiBTZXQgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIHRvIGB0cnVlYCBmb3IgYSBkZWVwIG9yIHJlY3Vyc2l2ZSBtZXJnZS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbT3B0aW9uYWxdIElmIHRydWUsIGRvIGEgZGVlcCAob3IgcmVjdXJzaXZlKSBtZXJnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdHMgdG8gbWVyZ2UgdG9nZXRoZXI7IGVhY2ggb3ZlcnJpZGluZyB0aGUgbmV4dFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgdmFyIGV4dGVuZGVkID0ge31cbiAgICB2YXIgZGVlcCA9IGZhbHNlXG4gICAgdmFyIGkgPSAwXG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBhcmd1bWVudHNbMF0gKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICkge1xuICAgICAgZGVlcCA9IGFyZ3VtZW50c1swXVxuICAgICAgaSsrXG4gICAgfVxuXG4gICAgdmFyIG1lcmdlID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgICAgIGZvciAoIHZhciBwcm9wIGluIG9iaiApIHtcbiAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoIG9iaiwgcHJvcCApICkge1xuICAgICAgICAgIGlmICggZGVlcCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW3Byb3BdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGV4dGVuZCggdHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gb2JqW3Byb3BdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldXG4gICAgICBtZXJnZShvYmopXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZGVkXG4gIH1cblxufVxuIl19

//# sourceMappingURL=scripts.js.map
