(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _modal = require('./modal.js');

var _modal2 = _interopRequireDefault(_modal);

var _dismissible = require('./dismissible.js');

var _dismissible2 = _interopRequireDefault(_dismissible);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modal = new _modal2.default();
var dismissible = new _dismissible2.default();

},{"./dismissible.js":2,"./modal.js":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  'use strict';

  var api = {};
  var settings = void 0;
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
        _utility2.default.toggleClass(target, settings.classToggle);
      }
      event.preventDefault();
    }
  };

  api.init = function (options) {
    api.destroy();
    settings = _utility2.default.extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
  };

  api.init();

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

  /**
   * Variables
   */

  var api = {};
  var settings = void 0;
  var defaults = {
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
    classActive: 'is-active',
    focus: '[data-focus]'
  };

  var memoryTrigger = void 0;
  var memoryTarget = void 0;

  /**
   * Private functions
   */

  var open = function open(target) {
    _utility2.default.addClass(target, settings.classActive);
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
    var modals = document.querySelectorAll('.' + settings.classModal);
    for (var i = 0; i < modals.length; ++i) {
      _utility2.default.removeClass(modals[i], settings.classActive);
    }
    if (memoryTrigger && memoryTarget) {
      memoryTarget.addEventListener('transitionend', function _listener() {
        if (memoryTrigger) {
          memoryTrigger.focus();
        }
        memoryTarget = null;
        memoryTrigger = null;
        this.removeEventListener('transitionend', _listener, true);
      }, true);
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

  api.close = function () {
    close();
  };

  api.init = function (options) {
    api.destroy();
    settings = _utility2.default.extend(defaults, options || {});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2Rpc21pc3NpYmxlLmpzIiwic3JjL2pzL21vZGFsLmpzIiwic3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sUUFBUSxJQUFJLGVBQUosRUFBZDtBQUNBLElBQU0sY0FBYyxJQUFJLHFCQUFKLEVBQXBCOzs7Ozs7Ozs7a0JDRmUsWUFBVzs7QUFFeEI7O0FBRUEsTUFBSSxNQUFNLEVBQVY7QUFDQSxNQUFJLGlCQUFKO0FBQ0EsTUFBSSxXQUFXO0FBQ2IsYUFBUyxnQkFESTtBQUViLFlBQVEsb0JBRks7QUFHYixpQkFBYTtBQUhBLEdBQWY7O0FBTUEsTUFBSSxNQUFNLFNBQU4sR0FBTSxHQUFNO0FBQ2QsUUFBSSxVQUFVLE1BQU0sTUFBTixDQUFhLE9BQWIsQ0FBcUIsU0FBUyxPQUE5QixDQUFkO0FBQ0EsUUFBSSxPQUFKLEVBQWE7QUFDWCxVQUFJLFNBQVMsUUFBUSxPQUFSLENBQWdCLFNBQVMsTUFBekIsQ0FBYjtBQUNBLFVBQUksTUFBSixFQUFZO0FBQ1YsMEJBQUUsV0FBRixDQUFjLE1BQWQsRUFBc0IsU0FBUyxXQUEvQjtBQUNEO0FBQ0QsWUFBTSxjQUFOO0FBQ0Q7QUFDRixHQVREOztBQVdBLE1BQUksSUFBSixHQUFXLFVBQUMsT0FBRCxFQUFhO0FBQ3RCLFFBQUksT0FBSjtBQUNBLGVBQVcsa0JBQUUsTUFBRixDQUFVLFFBQVYsRUFBb0IsV0FBVyxFQUEvQixDQUFYO0FBQ0EsYUFBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxHQUFuQyxFQUF3QyxLQUF4QztBQUNELEdBSkQ7O0FBTUEsTUFBSSxPQUFKLEdBQWMsWUFBTTtBQUNsQixlQUFXLElBQVg7QUFDQSxhQUFTLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLEdBQXRDLEVBQTJDLEtBQTNDO0FBQ0QsR0FIRDs7QUFLQSxNQUFJLElBQUo7O0FBRUEsU0FBTyxHQUFQO0FBQ0QsQzs7QUF2Q0Q7Ozs7Ozs7Ozs7Ozs7a0JDRWUsWUFBVzs7QUFFeEI7O0FBRUE7Ozs7QUFJQSxNQUFJLE1BQU0sRUFBVjtBQUNBLE1BQUksaUJBQUo7QUFDQSxNQUFJLFdBQVc7QUFDYixrQkFBYyxnQkFERDtBQUViLGdCQUFZLE9BRkM7QUFHYixpQkFBYSxlQUhBO0FBSWIsaUJBQWEsV0FKQTtBQUtiLFdBQU87QUFMTSxHQUFmOztBQVFBLE1BQUksc0JBQUo7QUFDQSxNQUFJLHFCQUFKOztBQUVBOzs7O0FBSUEsTUFBSSxPQUFPLFNBQVAsSUFBTyxDQUFDLE1BQUQsRUFBWTtBQUNyQixzQkFBRSxRQUFGLENBQVcsTUFBWCxFQUFtQixTQUFTLFdBQTVCO0FBQ0EsUUFBSSxRQUFRLE9BQU8sYUFBUCxDQUFxQixTQUFTLEtBQTlCLENBQVo7QUFDQSxXQUFPLGdCQUFQLENBQXdCLGVBQXhCLEVBQXlDLFNBQVMsU0FBVCxHQUFxQjtBQUM1RCxVQUFJLEtBQUosRUFBVztBQUNULGNBQU0sS0FBTjtBQUNELE9BRkQsTUFFTztBQUNMLGVBQU8sS0FBUDtBQUNEO0FBQ0QsV0FBSyxtQkFBTCxDQUF5QixlQUF6QixFQUEwQyxTQUExQyxFQUFxRCxJQUFyRDtBQUNELEtBUEQsRUFPRyxJQVBIO0FBUUQsR0FYRDs7QUFhQSxNQUFJLFFBQVEsU0FBUixLQUFRLEdBQU07QUFDaEIsUUFBSSxTQUFTLFNBQVMsZ0JBQVQsQ0FBMEIsTUFBTSxTQUFTLFVBQXpDLENBQWI7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksT0FBTyxNQUEzQixFQUFtQyxFQUFFLENBQXJDLEVBQXdDO0FBQ3RDLHdCQUFFLFdBQUYsQ0FBYyxPQUFPLENBQVAsQ0FBZCxFQUF5QixTQUFTLFdBQWxDO0FBQ0Q7QUFDRCxRQUFJLGlCQUFpQixZQUFyQixFQUFtQztBQUNqQyxtQkFBYSxnQkFBYixDQUE4QixlQUE5QixFQUErQyxTQUFTLFNBQVQsR0FBcUI7QUFDbEUsWUFBSSxhQUFKLEVBQW1CO0FBQ2pCLHdCQUFjLEtBQWQ7QUFDRDtBQUNELHVCQUFlLElBQWY7QUFDQSx3QkFBZ0IsSUFBaEI7QUFDQSxhQUFLLG1CQUFMLENBQXlCLGVBQXpCLEVBQTBDLFNBQTFDLEVBQXFELElBQXJEO0FBQ0QsT0FQRCxFQU9HLElBUEg7QUFRRDtBQUNGLEdBZkQ7O0FBaUJBLE1BQUksU0FBUyxTQUFULE1BQVMsR0FBTTtBQUNqQixRQUFJLE1BQU0sT0FBTixJQUFpQixFQUFyQixFQUF5QjtBQUN2QjtBQUNEO0FBQ0YsR0FKRDs7QUFNQSxNQUFJLE1BQU0sU0FBTixHQUFNLEdBQU07QUFDZCxRQUFJLFVBQVUsTUFBTSxNQUFOLENBQWEsT0FBYixDQUFxQixNQUFNLFNBQVMsWUFBcEMsQ0FBZDtBQUNBLFFBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxPQUFiLENBQXFCLE1BQU0sU0FBUyxVQUFwQyxDQUFaO0FBQ0EsUUFBSSxTQUFTLE1BQU0sTUFBTixDQUFhLE9BQWIsQ0FBcUIsTUFBTSxTQUFTLFdBQXBDLENBQWI7QUFDQSxRQUFJLE9BQUosRUFBYTtBQUNYO0FBQ0EsVUFBSSxZQUFZLFFBQVEsT0FBUixDQUFnQixLQUFoQztBQUNBLFVBQUksU0FBSixFQUFlO0FBQ2IsdUJBQWUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQWY7QUFDQSx3QkFBZ0IsT0FBaEI7QUFDQSxhQUFLLFlBQUw7QUFDRDtBQUNELFlBQU0sY0FBTjtBQUNELEtBVEQsTUFTTyxJQUFJLFNBQVMsQ0FBQyxNQUFkLEVBQXNCO0FBQzNCO0FBQ0Q7QUFDRixHQWhCRDs7QUFrQkE7Ozs7QUFJQSxNQUFJLElBQUosR0FBVyxVQUFDLE1BQUQsRUFBWTtBQUNyQixTQUFLLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQUFMO0FBQ0QsR0FGRDs7QUFJQSxNQUFJLEtBQUosR0FBWSxZQUFNO0FBQ2hCO0FBQ0QsR0FGRDs7QUFJQSxNQUFJLElBQUosR0FBVyxVQUFDLE9BQUQsRUFBYTtBQUN0QixRQUFJLE9BQUo7QUFDQSxlQUFXLGtCQUFFLE1BQUYsQ0FBVSxRQUFWLEVBQW9CLFdBQVcsRUFBL0IsQ0FBWDtBQUNBLGFBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsR0FBbkMsRUFBd0MsS0FBeEM7QUFDQSxhQUFTLGdCQUFULENBQTBCLFVBQTFCLEVBQXNDLEdBQXRDLEVBQTJDLEtBQTNDO0FBQ0EsYUFBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxNQUFuQyxFQUEyQyxLQUEzQztBQUNELEdBTkQ7O0FBUUEsTUFBSSxPQUFKLEdBQWMsWUFBTTtBQUNsQixlQUFXLElBQVg7QUFDQSxtQkFBZSxJQUFmO0FBQ0Esb0JBQWdCLElBQWhCO0FBQ0EsYUFBUyxtQkFBVCxDQUE2QixPQUE3QixFQUFzQyxHQUF0QyxFQUEyQyxLQUEzQztBQUNBLGFBQVMsbUJBQVQsQ0FBNkIsVUFBN0IsRUFBeUMsR0FBekMsRUFBOEMsS0FBOUM7QUFDQSxhQUFTLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLE1BQXRDLEVBQThDLEtBQTlDO0FBQ0QsR0FQRDs7QUFTQTs7O0FBR0EsTUFBSSxJQUFKOztBQUVBOzs7QUFHQSxTQUFPLEdBQVA7QUFDRCxDOztBQXZIRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNFRTs7Ozs7OzZCQU1pQixFLEVBQUksQyxFQUFJOztBQUV2QixVQUFJLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBSjs7QUFFQSxhQUFPLEVBQUUsS0FBRixDQUFTLFVBQVcsQ0FBWCxFQUFlO0FBQzdCLGVBQU8sR0FBRyxTQUFILENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFQO0FBQ0QsT0FGTSxDQUFQO0FBR0Q7O0FBRUQ7Ozs7Ozs7OzZCQUtpQixFLEVBQUksQyxFQUFJOztBQUV2QixVQUFJLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBSjs7QUFFQSxRQUFFLE9BQUYsQ0FBVyxVQUFXLENBQVgsRUFBZTtBQUN4QixXQUFHLFNBQUgsQ0FBYSxHQUFiLENBQWtCLENBQWxCO0FBQ0QsT0FGRDtBQUdEO0FBQ0Q7Ozs7Ozs7O2dDQUtvQixFLEVBQUksQyxFQUFJOztBQUUxQixVQUFJLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBSjs7QUFFQSxRQUFFLE9BQUYsQ0FBVyxVQUFXLENBQVgsRUFBZTtBQUN4QixXQUFHLFNBQUgsQ0FBYSxNQUFiLENBQXFCLENBQXJCO0FBQ0QsT0FGRDtBQUdEOztBQUVEOzs7Ozs7OztnQ0FLb0IsRSxFQUFJLEMsRUFBSTs7QUFFMUIsVUFBSSxLQUFLLE9BQUwsQ0FBYSxDQUFiLENBQUo7O0FBRUEsUUFBRSxPQUFGLENBQVcsVUFBVyxDQUFYLEVBQWU7QUFDeEIsV0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixDQUFwQjtBQUNELE9BRkQ7QUFHRDs7QUFFRDs7Ozs7Ozs7Ozs0QkFPZ0IsRSxFQUFJLEMsRUFBSTtBQUN0QixhQUFPLENBQUMsS0FBSyxHQUFHLGFBQVQsS0FBMkIsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxFQUFkLEVBQWtCLENBQWxCLENBQW5DO0FBQ0EsZUFBTyxFQUFQO0FBREE7QUFFRDs7QUFFRDs7Ozs7Ozs7OzRCQU1lLE0sRUFBUTs7QUFFckIsVUFBSSxRQUFRLEVBQVo7O0FBRUEsVUFBSSxPQUFPLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUIsY0FBTSxJQUFOLENBQVcsTUFBWDtBQUNELE9BRkQsTUFFTyxJQUFJLE1BQU0sT0FBTixDQUFjLE1BQWQsQ0FBSixFQUEyQjtBQUNoQyxnQkFBUSxNQUFSO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsZUFBTyxLQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQU9nQjs7QUFFZCxVQUFJLFdBQVcsRUFBZjtBQUNBLFVBQUksT0FBTyxLQUFYO0FBQ0EsVUFBSSxJQUFJLENBQVI7QUFDQSxVQUFJLFNBQVMsVUFBVSxNQUF2Qjs7QUFFQSxVQUFLLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUFnQyxVQUFVLENBQVYsQ0FBaEMsTUFBbUQsa0JBQXhELEVBQTZFO0FBQzNFLGVBQU8sVUFBVSxDQUFWLENBQVA7QUFDQTtBQUNEOztBQUVELFVBQUksUUFBUSxTQUFSLEtBQVEsQ0FBRSxHQUFGLEVBQVc7QUFDckIsYUFBTSxJQUFJLElBQVYsSUFBa0IsR0FBbEIsRUFBd0I7QUFDdEIsY0FBSyxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBc0MsR0FBdEMsRUFBMkMsSUFBM0MsQ0FBTCxFQUF5RDtBQUN2RCxnQkFBSyxRQUFRLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixJQUFJLElBQUosQ0FBL0IsTUFBOEMsaUJBQTNELEVBQStFO0FBQzdFLHVCQUFTLElBQVQsSUFBaUIsT0FBUSxJQUFSLEVBQWMsU0FBUyxJQUFULENBQWQsRUFBOEIsSUFBSSxJQUFKLENBQTlCLENBQWpCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsdUJBQVMsSUFBVCxJQUFpQixJQUFJLElBQUosQ0FBakI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQVZEOztBQVlBLGFBQVEsSUFBSSxNQUFaLEVBQW9CLEdBQXBCLEVBQTBCO0FBQ3hCLFlBQUksTUFBTSxVQUFVLENBQVYsQ0FBVjtBQUNBLGNBQU0sR0FBTjtBQUNEOztBQUVELGFBQU8sUUFBUDtBQUNELEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgTW9kYWwgZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCBEaXNtaXNzaWJsZSBmcm9tICcuL2Rpc21pc3NpYmxlLmpzJ1xuXG5jb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpXG5jb25zdCBkaXNtaXNzaWJsZSA9IG5ldyBEaXNtaXNzaWJsZSgpXG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgbGV0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS1kaXNtaXNzXScsXG4gICAgdGFyZ2V0OiAnW2RhdGEtZGlzbWlzc2libGVdJyxcbiAgICBjbGFzc1RvZ2dsZTogJ2Rpc21pc3MnXG4gIH1cblxuICBsZXQgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgbGV0IHRhcmdldCA9IHRyaWdnZXIuY2xvc2VzdChzZXR0aW5ncy50YXJnZXQpXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc1RvZ2dsZSlcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgYXBpLmRlc3Ryb3koKVxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuaW5pdCgpXG5cbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICAndXNlIHN0cmljdCdcblxuICAvKipcbiAgICogVmFyaWFibGVzXG4gICAqL1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgbGV0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc01vZGFsOiAnbW9kYWwnLFxuICAgIGNsYXNzRGlhbG9nOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGZvY3VzOiAnW2RhdGEtZm9jdXNdJ1xuICB9XG5cbiAgbGV0IG1lbW9yeVRyaWdnZXJcbiAgbGV0IG1lbW9yeVRhcmdldFxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uc1xuICAgKi9cblxuICBsZXQgb3BlbiA9ICh0YXJnZXQpID0+IHtcbiAgICB1LmFkZENsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgbGV0IGZvY3VzID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuZm9jdXMpXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgZm9jdXMuZm9jdXMoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LmZvY3VzKClcbiAgICAgIH1cbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICB9LCB0cnVlKTtcbiAgfVxuXG4gIGxldCBjbG9zZSA9ICgpID0+IHtcbiAgICBsZXQgbW9kYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kYWxzLmxlbmd0aDsgKytpKSB7XG4gICAgICB1LnJlbW92ZUNsYXNzKG1vZGFsc1tpXSwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfVxuICAgIGlmIChtZW1vcnlUcmlnZ2VyICYmIG1lbW9yeVRhcmdldCkge1xuICAgICAgbWVtb3J5VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChtZW1vcnlUcmlnZ2VyKSB7XG4gICAgICAgICAgbWVtb3J5VHJpZ2dlci5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBsZXQgZXNjYXBlID0gKCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgbGV0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgbW9kYWwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGxldCBkaWFsb2cgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0RpYWxvZylcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgbGV0IGRhdGFNb2RhbCA9IHRyaWdnZXIuZGF0YXNldC5tb2RhbFxuICAgICAgaWYgKGRhdGFNb2RhbCkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhTW9kYWwpXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSB0cmlnZ2VyXG4gICAgICAgIG9wZW4obWVtb3J5VGFyZ2V0KVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAobW9kYWwgJiYgIWRpYWxvZykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgZnVuY3Rpb25zXG4gICAqL1xuXG4gIGFwaS5vcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9ICgpID0+IHtcbiAgICBjbG9zZSgpXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgYXBpLmRlc3Ryb3koKVxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgdGhlIHBsdWdpblxuICAgKi9cbiAgYXBpLmluaXQoKVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIEFQSVxuICAgKi9cbiAgcmV0dXJuIGFwaVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIGNoZWNrIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gY2hlY2tcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBjbGFzcyBleGlzdHMgb24gZWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaGFzQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgcmV0dXJuIGMuZXZlcnkoIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoYylcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBvciBjbGFzc2VzIHRvIGFuIGVsZW1lbnRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIGFkZCBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGFkZFxuICAgKi9cbiAgc3RhdGljIGFkZENsYXNzKCBlbCwgYyApIHtcblxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcblxuICAgIGMuZm9yRWFjaCggZnVuY3Rpb24gKCBjICkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCggYyApXG4gICAgfSlcbiAgfVxuICAvKipcbiAgICogUmVtb3ZlIGEgY2xhc3Mgb3IgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIHJlbW92ZSBjbGFzcyhlcykgZnJvbVxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gcmVtb3ZlXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCBjIClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gdG9nZ2xlIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gdG9nZ2xlXG4gICAqL1xuICBzdGF0aWMgdG9nZ2xlQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGMpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IGJhc2VkIG9uIGNsYXNzLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgKiBuYXRpdmUgLmNsb3Nlc3QoKSBtZXRob2QgaW4gdGhhdCBpdCBkb2Vzbid0IGNoZWNrIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byBzdGFydCBzZWFyY2ggb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGNoZWNrIGZvclxuICAgKiBAcmV0dXJuIHtFbGVtZW50fSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdCggZWwsIGMgKSB7XG4gICAgd2hpbGUgKChlbCA9IGVsLnBhcmVudEVsZW1lbnQpICYmICF0aGlzLmhhc0NsYXNzKGVsLCBjKSlcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhbiBhcnJheS4gSWYgYW4gYXJyYXkgaXMgcGFzc2VkLCBpdCdzIHJldHVybmVkIGFzIGlzLlxuICAgKiBBbnl0aGluZyBlbHNlIGlzIHJldHVybmVkIGFzIGZhbHNlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBTdHJpbmcgdG8gY29udmVydCB0byBhbiBhcnJheVxuICAgKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJuIHRoZSBjb252ZXJ0ZWQgYXJyYXlcbiAgICovXG4gIHN0YXRpYyB0b0FycmF5KHN0cmluZykge1xuXG4gICAgdmFyIGFycmF5ID0gW11cblxuICAgIGlmICh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgYXJyYXkucHVzaChzdHJpbmcpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHN0cmluZykpIHtcbiAgICAgIGFycmF5ID0gc3RyaW5nXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LiBTZXQgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIHRvIGB0cnVlYCBmb3IgYSBkZWVwIG9yIHJlY3Vyc2l2ZSBtZXJnZS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbT3B0aW9uYWxdIElmIHRydWUsIGRvIGEgZGVlcCAob3IgcmVjdXJzaXZlKSBtZXJnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdHMgdG8gbWVyZ2UgdG9nZXRoZXI7IGVhY2ggb3ZlcnJpZGluZyB0aGUgbmV4dFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgdmFyIGV4dGVuZGVkID0ge31cbiAgICB2YXIgZGVlcCA9IGZhbHNlXG4gICAgdmFyIGkgPSAwXG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBhcmd1bWVudHNbMF0gKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICkge1xuICAgICAgZGVlcCA9IGFyZ3VtZW50c1swXVxuICAgICAgaSsrXG4gICAgfVxuXG4gICAgbGV0IG1lcmdlID0gKCBvYmogKSA9PiB7XG4gICAgICBmb3IgKCB2YXIgcHJvcCBpbiBvYmogKSB7XG4gICAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcbiAgICAgICAgICBpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQoIHRydWUsIGV4dGVuZGVkW3Byb3BdLCBvYmpbcHJvcF0gKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXVxuICAgICAgbWVyZ2Uob2JqKVxuICAgIH1cblxuICAgIHJldHVybiBleHRlbmRlZFxuICB9XG5cbn1cbiJdfQ==

//# sourceMappingURL=scripts.js.map
