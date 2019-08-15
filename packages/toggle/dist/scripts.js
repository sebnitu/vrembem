this.vrembem = this.vrembem || {};
this.vrembem.toggle = (function () {
  'use strict';

  var toArray = function toArray(item) {
    var array = [];

    if (Array.isArray(item)) {
      array = item;
    } else {
      array.push(item);
    }

    return array;
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

  var toggleClass = function toggleClass(el, c) {
    el = el.forEach ? el : toArray(el);
    c = toArray(c);
    el.forEach(function (el) {
      c.forEach(function (c) {
        el.classList.toggle(c);
      });
    });
  };

  function index (options) {

    var api = {};
    var settings;
    var defaults = {
      trigger: "[data-toggle-class]",
      targets: "",
      "class": ""
    };

    api.init = function (options) {
      settings = extend(defaults, options || {});
      document.addEventListener("click", run, false);
    };

    api.destroy = function () {
      settings = null;
      document.removeEventListener("click", run, false);
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
            toggleClass(target, trigger.dataset.toggleClass.split(" "));
          });
        } else {
          if (settings["class"]) {
            toggleClass(trigger, settings["class"]);
          } else {
            toggleClass(trigger, trigger.dataset.toggleClass.split(" "));
          }
        }

        event.preventDefault();
      }
    };

    api.init(options);
    return api;
  }

  return index;

}());
