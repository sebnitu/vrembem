'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var camelCase = function camelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

var hyphenCase = function hyphenCase(str) {
  return str.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + "-" + g[1].toLowerCase();
  });
};

var toggleClass = function toggleClass(el) {
  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cl[_key - 1] = arguments[_key];
  }

  el = el.forEach ? el : [el];
  el.forEach(function (el) {
    cl.forEach(function (cl) {
      el.classList.toggle(cl);
    });
  });
};

var Toggle = function Toggle(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    "class": "is-active",
    dataChild: "toggle-child",
    dataParent: "toggle-parent",
    dataSelf: "toggle-self",
    dataSibling: "toggle-sibling",
    dataTarget: "toggle-target",
    dataTrigger: "toggle",
    selectorTrigger: "[data-toggle]"
  };
  api.settings = _objectSpread2({}, defaults, {}, options);

  api.init = function () {
    document.addEventListener("click", run, false);
  };

  api.destroy = function () {
    document.removeEventListener("click", run, false);
  };

  var resolveClass = function resolveClass(trigger) {
    var cl = trigger.dataset[camelCase(api.settings.dataTrigger)];
    cl = cl ? cl : api.settings["class"];
    return cl.split(/[ ,]+/);
  };

  var toggleChild = function toggleChild(trigger, cl) {
    var target = trigger.dataset[camelCase(api.settings.dataChild)];
    target = trigger.querySelectorAll(target);

    if (target) {
      toggleClass.apply(void 0, [target].concat(_toConsumableArray(cl)));
    }
  };

  var toggleParent = function toggleParent(trigger, cl) {
    var target = trigger.dataset[camelCase(api.settings.dataParent)];
    target = trigger.closest(target);

    if (target) {
      toggleClass.apply(void 0, [target].concat(_toConsumableArray(cl)));
    }
  };

  var toggleSelf = function toggleSelf(trigger, cl) {
    var clSelf = trigger.dataset[camelCase(api.settings.dataSelf)];
    clSelf = clSelf ? clSelf.split(/[ ,]+/) : cl;
    toggleClass.apply(void 0, [trigger].concat(_toConsumableArray(clSelf)));
  };

  var toggleSibling = function toggleSibling(trigger, cl) {
    var target = trigger.dataset[camelCase(api.settings.dataSibling)];
    target = trigger.parentElement.querySelectorAll(":scope > ".concat(target));

    if (target) {
      toggleClass.apply(void 0, [target].concat(_toConsumableArray(cl)));
    }
  };

  var toggleTarget = function toggleTarget(trigger, cl) {
    var target = trigger.dataset[camelCase(api.settings.dataTarget)];
    target = document.querySelectorAll(target);

    if (target) {
      toggleClass.apply(void 0, [target].concat(_toConsumableArray(cl)));
    }
  };

  var toggle = function toggle(trigger, cl, dataKey) {
    var hasAttr = trigger.hasAttribute("data-".concat(hyphenCase(dataKey)));

    if (hasAttr) {
      switch (dataKey) {
        case api.settings.dataChild:
          toggleChild(trigger, cl);
          break;

        case api.settings.dataParent:
          toggleParent(trigger, cl);
          break;

        case api.settings.dataSelf:
          toggleSelf(trigger, cl);
          break;

        case api.settings.dataSibling:
          toggleSibling(trigger, cl);
          break;

        case api.settings.dataTarget:
          toggleTarget(trigger, cl);
      }
    }

    return hasAttr;
  };

  var run = function run(e) {
    var trigger = e.target.closest(api.settings.selectorTrigger);

    if (trigger) {
      var cl = resolveClass(trigger);
      var toggleConditions = [toggle(trigger, cl, api.settings.dataChild), toggle(trigger, cl, api.settings.dataParent), toggle(trigger, cl, api.settings.dataSelf), toggle(trigger, cl, api.settings.dataSibling), toggle(trigger, cl, api.settings.dataTarget)];

      if (toggleConditions.every(function (i) {
        return i === false;
      })) {
        toggleClass.apply(void 0, [trigger].concat(_toConsumableArray(cl)));
      }

      e.preventDefault();
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

exports.Toggle = Toggle;
