'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var removeClass = function removeClass(el, c) {
  el = el.forEach ? el : toArray(el);
  c = toArray(c);
  el.forEach(function (el) {
    c.forEach(function (c) {
      el.classList.remove(c);
    });
  });
};

var Modal = function Modal(options) {
  var api = {};
  var settings;
  var defaults = {
    classTarget: "modal",
    classTrigger: "modal__trigger",
    classInner: "modal__dialog",
    classActive: "is-active",
    focus: "[data-focus]"
  };
  var memoryTrigger;
  var memoryTarget;

  api.init = function (options) {
    settings = extend(defaults, options || {});
    document.addEventListener("click", run, false);
    document.addEventListener("touchend", run, false);
    document.addEventListener("keyup", escape, false);
  };

  api.destroy = function () {
    settings = null;
    memoryTarget = null;
    memoryTrigger = null;
    document.removeEventListener("click", run, false);
    document.removeEventListener("touchend", run, false);
    document.removeEventListener("keyup", escape, false);
  };

  api.open = function (selector) {
    open(document.querySelectorAll(selector));
  };

  api.close = function (clear) {
    close(clear);
  };

  var open = function open(target) {
    addClass(target, settings.classActive);

    if (target.length === 1) {
      target = target.item(0);
      var focus = target.querySelector(settings.focus);
      target.addEventListener("transitionend", function _listener() {
        if (focus) {
          focus.focus();
        } else {
          target.focus();
        }

        this.removeEventListener("transitionend", _listener, true);
      }, true);
    }
  };

  var close = function close() {
    var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var target = document.querySelectorAll("." + settings.classTarget);
    removeClass(target, settings.classActive);

    if (clear == false && memoryTrigger && memoryTarget) {
      if (memoryTarget.length === 1) {
        memoryTarget = memoryTarget.item(0);
        memoryTarget.addEventListener("transitionend", function _listener() {
          if (memoryTrigger) {
            memoryTrigger.focus();
          }

          memoryTarget = null;
          memoryTrigger = null;
          this.removeEventListener("transitionend", _listener, true);
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
    var target = event.target.closest("." + settings.classTarget);
    var trigger = event.target.closest("." + settings.classTrigger);
    var inner = event.target.closest("." + settings.classInner);

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
};

exports.Modal = Modal;
