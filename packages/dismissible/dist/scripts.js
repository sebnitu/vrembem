this.vrembem = this.vrembem || {};
this.vrembem.dismissible = (function () {
	'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var scripts_module = createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, '__esModule', {
	    value: true
	  });
	  var config = {
	    breakpoints: {
	      xs: "480px",
	      sm: "620px",
	      md: "760px",
	      lg: "990px",
	      xl: "1380px"
	    }
	  };

	  var toArray = function toArray(item) {
	    var array = [];

	    if (Array.isArray(item)) {
	      array = item;
	    } else {
	      array.push(item);
	    }

	    return array;
	  };

	  var addClass = function addClass(el, c) {
	    el = el.forEach ? el : toArray(el);
	    c = toArray(c);
	    el.forEach(function (el) {
	      c.forEach(function (c) {
	        el.classList.add(c);
	      });
	    });
	  };

	  var hasClass = function hasClass(el, c) {
	    el = el.forEach ? el : toArray(el);
	    c = toArray(c);
	    return c.some(function (c) {
	      var has = false;
	      el.forEach(function (el) {
	        if (el.classList.contains(c)) {
	          has = true;
	        }
	      });
	      return has;
	    });
	  };

	  var closest = function closest(el, c) {
	    while ((el = el.parentElement) && !hasClass(el, c)) {
	      return el;
	    }
	  };

	  var extend = function extend() {
	    var extended = {};
	    var deep = false;
	    var i = 0;
	    var length = arguments.length;

	    if (Object.prototype.toString.call(arguments.length <= 0 ? undefined : arguments[0]) === "[object Boolean]") {
	      deep = arguments.length <= 0 ? undefined : arguments[0];
	      i++;
	    }

	    var merge = function merge(obj) {
	      for (var prop in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	          if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
	            extended[prop] = extend(true, extended[prop], obj[prop]);
	          } else {
	            extended[prop] = obj[prop];
	          }
	        }
	      }
	    };

	    for (; i < length; i++) {
	      var obj = i < 0 || arguments.length <= i ? undefined : arguments[i];
	      merge(obj);
	    }

	    return extended;
	  };

	  var getBreakpoint = function getBreakpoint(key) {
	    return config.breakpoints[key];
	  };

	  var removeClass = function removeClass(el, c) {
	    el = el.forEach ? el : toArray(el);
	    c = toArray(c);
	    el.forEach(function (el) {
	      c.forEach(function (c) {
	        el.classList.remove(c);
	      });
	    });
	  };

	  var toggleClass = function toggleClass(el, c) {
	    el = el.forEach ? el : toArray(el);
	    c = toArray(c);
	    el.forEach(function (el) {
	      c.forEach(function (c) {
	        el.classList.toggle(c);
	      });
	    });
	  };

	  exports.addClass = addClass;
	  exports.closest = closest;
	  exports.config = config;
	  exports.extend = extend;
	  exports.getBreakpoint = getBreakpoint;
	  exports.hasClass = hasClass;
	  exports.removeClass = removeClass;
	  exports.toArray = toArray;
	  exports.toggleClass = toggleClass;
	});
	unwrapExports(scripts_module);
	var scripts_module_1 = scripts_module.addClass;
	var scripts_module_2 = scripts_module.closest;
	var scripts_module_3 = scripts_module.config;
	var scripts_module_4 = scripts_module.extend;
	var scripts_module_5 = scripts_module.getBreakpoint;
	var scripts_module_6 = scripts_module.hasClass;
	var scripts_module_7 = scripts_module.removeClass;
	var scripts_module_8 = scripts_module.toArray;
	var scripts_module_9 = scripts_module.toggleClass;

	var index = (function (options) {
	  var api = {};
	  var settings;
	  var defaults = {
	    trigger: "[data-dismiss]",
	    target: "[data-dismissible]",
	    classToggle: "dismiss"
	  };

	  api.init = function (options) {
	    settings = scripts_module_4(defaults, options || {});
	    document.addEventListener("click", run, false);
	  };

	  api.destroy = function () {
	    settings = null;
	    document.removeEventListener("click", run, false);
	  };

	  var run = function run() {
	    var trigger = event.target.closest(settings.trigger);

	    if (trigger) {
	      var target = trigger.closest(settings.target);

	      if (target) {
	        scripts_module_9(target, settings.classToggle);
	      }

	      event.preventDefault();
	    }
	  };

	  api.init(options);
	  return api;
	});

	return index;

}());
