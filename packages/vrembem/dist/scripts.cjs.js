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

var breakpoint = {
  xs: "480px",
  sm: "620px",
  md: "760px",
  lg: "990px",
  xl: "1380px"
};
var transition = {
  duration: 300,
  tick: 30
};

var camelCase = function camelCase(str) {
  return str.replace(/-([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
};

var addClass = function addClass(el) {
  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cl[_key - 1] = arguments[_key];
  }

  el = el.forEach ? el : [el];
  el.forEach(function (el) {
    var _el$classList;

    (_el$classList = el.classList).add.apply(_el$classList, cl);
  });
};

var hasClass = function hasClass(el) {
  el = el.forEach ? el : [el];
  el = [].slice.call(el);

  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cl[_key - 1] = arguments[_key];
  }

  return cl.some(function (cl) {
    return el.some(function (el) {
      if (el.classList.contains(cl)) return true;
    });
  });
};

var hyphenCase = function hyphenCase(str) {
  return str.replace(/([a-z][A-Z])/g, function (g) {
    return g[0] + "-" + g[1].toLowerCase();
  });
};

var removeClass = function removeClass(el) {
  for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    cl[_key - 1] = arguments[_key];
  }

  el = el.forEach ? el : [el];
  el.forEach(function (el) {
    var _el$classList;

    (_el$classList = el.classList).remove.apply(_el$classList, cl);
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

var Choice = function Choice(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    classStateActive: "is-active",
    classStateFocus: "is-focus",
    trigger: ".choice"
  };
  api.settings = _objectSpread2({}, defaults, {}, options);

  api.init = function () {
    var choice = document.querySelectorAll(api.settings.trigger);
    choice.forEach(function (item) {
      updateChoice(item);
      item.querySelector("input").addEventListener("focus", onFocus, false);
      item.querySelector("input").addEventListener("blur", onBlur, false);
    });
    document.addEventListener("change", onChange, false);
  };

  api.destroy = function () {
    var choice = document.querySelectorAll(api.settings.trigger);
    choice.forEach(function (item) {
      item.querySelector("input").removeEventListener("focus", onFocus, false);
      item.querySelector("input").removeEventListener("blur", onBlur, false);
    });
    document.removeEventListener("change", onChange, false);
  };

  var updateChoice = function updateChoice(item) {
    var input = item.querySelector("input");

    if (input.type === "radio") {
      var radioInput = document.querySelectorAll("[name=\"".concat(input.name, "\"]"));
      radioInput.forEach(function (el) {
        removeClass(el.closest(api.settings.trigger), api.settings.classStateActive);
      });
    }

    if (input.checked) {
      addClass(item, api.settings.classStateActive);
    } else {
      removeClass(item, api.settings.classStateActive);
    }
  };

  var onChange = function onChange(e) {
    var trigger = e.target.closest(api.settings.trigger);

    if (trigger) {
      updateChoice(trigger);
    }
  };

  var onFocus = function onFocus(e) {
    addClass(e.target.closest(api.settings.trigger), api.settings.classStateFocus);
  };

  var onBlur = function onBlur(e) {
    removeClass(e.target.closest(api.settings.trigger), api.settings.classStateFocus);
  };

  if (api.settings.autoInit) api.init();
  return api;
};

var Dismissible = function Dismissible(options) {
  var api = {};
  var defaults = {
    autoInit: false,
    "class": "dismiss",
    target: "[data-dismissible]",
    trigger: "[data-dismiss]"
  };
  api.settings = _objectSpread2({}, defaults, {}, options);

  api.init = function () {
    document.addEventListener("click", run, false);
  };

  api.destroy = function () {
    document.removeEventListener("click", run, false);
  };

  var run = function run(e) {
    var trigger = e.target.closest(api.settings.trigger);

    if (trigger) {
      var target = trigger.closest(api.settings.target);

      if (target) {
        toggleClass(target, api.settings["class"]);
      }

      e.preventDefault();
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

var Drawer = function Drawer(options) {
  var api = {};
  var settings;
  var defaults = {
    classTarget: "drawer__item",
    classTrigger: "drawer__trigger",
    classInner: "drawer__dialog",
    classTargetSwitch: "modal",
    classTriggerSwitch: "modal__trigger",
    classInnerSwitch: "modal__dialog",
    classActive: "is-active",
    classTransitionNone: "transition_none",
    saveState: true,
    "switch": "[data-drawer-switch]",
    switchBreakpoint: "lg",
    transitionDuration: 500
  };
  var drawers = [];
  var drawerState = {};
  var switchDrawers;
  var mqlArray = [];

  api.init = function (options) {
    settings = _objectSpread2({}, defaults, {}, options);
    document.querySelectorAll("." + settings.classTarget).forEach(function (drawer) {
      drawers.push({
        "drawer": drawer,
        "defaultState": hasClass(drawer, settings.classActive)
      });
    });
    var promiseSaveState = new Promise(function (resolve) {
      if (settings.saveState) {
        initSaveState(resolve);
      } else {
        resolve();
      }
    });
    promiseSaveState.then(function () {
      if (settings["switch"]) {
        initSwitch();
      }
    });
    document.addEventListener("click", trigger, false);
  };

  api.destroy = function () {
    var defaultState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    destroySwitch();
    stateClear();

    if (defaultState) {
      drawers.forEach(function (item) {
        if (item.defaultState) {
          addClass(item.drawer, settings.classActive);
        } else {
          removeClass(item.drawer, settings.classActive);
        }
      });
    }

    settings = null;
    drawers = [];
    document.removeEventListener("click", trigger, false);
  };

  api.open = function (selector) {
    selector = selector ? selector : "." + settings.classTarget;
    toggle(document.querySelectorAll(selector), "open");
  };

  api.close = function (selector) {
    selector = selector ? selector : "." + settings.classTarget;
    toggle(document.querySelectorAll(selector), "close");
  };

  api.toggle = function (selector) {
    selector = selector ? selector : "." + settings.classTarget;
    toggle(document.querySelectorAll(selector));
  };

  api.switchToDrawer = function (selector) {
    selector = selector ? selector : settings["switch"];
    var items = document.querySelectorAll(selector);
    items = items.forEach ? items : [items];
    items.forEach(function (item) {
      switchToDrawer(item);
    });
  };

  api.switchToModal = function (selector) {
    selector = selector ? selector : settings["switch"];
    var items = document.querySelectorAll(selector);
    items = items.forEach ? items : [items];
    items.forEach(function (item) {
      switchToModal(item);
    });
  };

  api.stateSave = function () {
    stateSave();
  };

  api.stateClear = function () {
    stateClear();
  };

  var toggle = function toggle(drawer, state, callback) {
    if (state === "open") {
      addClass(drawer, settings.classActive);
    } else if (state === "close") {
      removeClass(drawer, settings.classActive);
    } else {
      toggleClass(drawer, settings.classActive);
    }

    if (settings.saveState) {
      stateSave(drawer);
    }

    typeof callback === "function" && callback();
  };

  var trigger = function trigger() {
    var trigger = event.target.closest("." + settings.classTrigger);

    if (trigger) {
      var dataDrawer = trigger.dataset.target;

      if (dataDrawer) {
        var drawer = document.querySelectorAll(dataDrawer);

        if (drawer.length) {
          toggle(drawer);
        }
      }
    }
  };

  var initSaveState = function initSaveState(callback) {
    if (localStorage.getItem("drawerState")) {
      drawerState = JSON.parse(localStorage.getItem("drawerState"));
    }

    drawers.forEach(function (item) {
      var drawer = item.drawer;

      if (drawer.id in drawerState === false) {
        stateSave(drawer);
      }

      var dialog = drawer.querySelector("." + settings.classInner);

      var transitionDelay = function transitionDelay() {
        if (dialog) {
          addClass(dialog, settings.classTransitionNone);
          setTimeout(function () {
            removeClass(dialog, settings.classTransitionNone);
          }, settings.transitionDuration);
        }
      };

      if (drawerState[drawer.id] === false) {
        toggle(drawer, "close", transitionDelay);
      } else if (drawerState[drawer.id]) {
        toggle(drawer, "open", transitionDelay);
      }
    });
    typeof callback === "function" && callback(drawerState);
  };

  var stateSave = function stateSave(items) {
    items = items ? items : drawers;
    items = items.forEach ? items : [items];
    items.forEach(function (item) {
      if (item.drawer) {
        item = item.drawer;
      }

      if (item.id) {
        drawerState[item.id] = hasClass(item, settings.classActive);
        localStorage.setItem("drawerState", JSON.stringify(drawerState));
      }
    });
  };

  var stateClear = function stateClear() {
    drawerState = {};
    localStorage.removeItem("drawerState");
  };

  var initSwitch = function initSwitch() {
    switchDrawers = document.querySelectorAll(settings["switch"]);
    switchDrawers.forEach(function (drawer) {
      var cleanSelector = settings["switch"].replace("[", "").replace("]", "").replace("data-", "");
      cleanSelector = cleanSelector.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
      var bp = drawer.dataset[cleanSelector];

      if (bp) {
        bp = breakpoint[bp];

        if (!bp) {
          bp = drawer.dataset[cleanSelector];
        }
      } else {
        bp = breakpoint[settings.switchBreakpoint];

        if (!bp) {
          bp = settings.switchBreakpoint;
        }
      }

      var mql = window.matchMedia("(min-width:" + bp + ")");

      if (!mql.matches) {
        switchToModal(drawer);
      }

      mql.addListener(switchCheck);
      mqlArray.push({
        "drawer": drawer,
        "mql": mql
      });
    });
  };

  var destroySwitch = function destroySwitch() {
    switchDrawers.forEach(function (drawer) {
      switchToDrawer(drawer);
    });
    mqlArray.forEach(function (item) {
      item.mql.removeListener(switchCheck);
    });
    switchDrawers = null;
    mqlArray = [];
  };

  var switchCheck = function switchCheck() {
    mqlArray.forEach(function (item) {
      if (item.mql.matches) {
        switchToDrawer(item.drawer);
      } else {
        switchToModal(item.drawer);
      }
    });
  };

  var switchToDrawer = function switchToDrawer(drawer) {
    var dialog = drawer.querySelector(".dialog");
    var triggers = document.querySelectorAll("[data-target=\"#" + drawer.id + "\"]");
    drawer.className = drawer.className.replace(new RegExp(settings.classTargetSwitch, "gi"), settings.classTarget);
    dialog.className = dialog.className.replace(new RegExp(settings.classInnerSwitch, "gi"), settings.classInner);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(new RegExp(settings.classTriggerSwitch, "gi"), settings.classTrigger);
    });

    if (settings.saveState) {
      if (drawerState[drawer.id] === false) {
        toggle(drawer, "close");
      } else {
        toggle(drawer, "open");
      }
    }
  };

  var switchToModal = function switchToModal(drawer) {
    var dialog = drawer.querySelector(".dialog");
    var triggers = document.querySelectorAll("[data-target=\"#" + drawer.id + "\"]");
    drawer.className = drawer.className.replace(new RegExp(settings.classTarget, "gi"), settings.classTargetSwitch);
    dialog.className = dialog.className.replace(new RegExp(settings.classInner, "gi"), settings.classInnerSwitch);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(new RegExp(settings.classTrigger, "gi"), settings.classTriggerSwitch);
    });
    removeClass(drawer, settings.classActive);
  };

  api.init(options);
  return api;
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
    settings = _objectSpread2({}, defaults, {}, options);
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

var Todo = function Todo(options) {
  var api = {};
  var defaults = {
    classStateActive: "is-active",
    classStateTransition: "is-animating",
    selectorTodo: "[data-todo]",
    selectorTodoBlock: "[data-todo-block]",
    selectorTodoList: "[data-todo-open]",
    selectorTodoDone: "[data-todo-done]",
    selectorNotice: "[data-todo-empty]",
    transition: true,
    transitionDuration: transition.duration,
    transitionTick: transition.tick
  };
  api.settings = _objectSpread2({}, defaults, {}, options);

  api.init = function () {
    var todos = document.querySelectorAll(api.settings.selectorTodoBlock);

    if (todos.length) {
      updateSort(todos);
      var delay = api.settings.transition ? api.settings.transitionDuration * 3 : 0;
      setTimeout(function () {
        updateNotice(todos);
      }, delay);
    }

    document.addEventListener("change", run, false);
  };

  api.destroy = function () {
    document.removeEventListener("change", run, false);
  };

  var updateSort = function updateSort(todos) {
    todos.forEach(function (todo) {
      var listItems = todo.querySelectorAll("\n        ".concat(api.settings.selectorTodoList, "\n        ").concat(api.settings.selectorTodo, "\n      "));
      listItems.forEach(function (item) {
        if (item.querySelector("input").checked) {
          moveTodo(item, false);
        }
      });
      var doneItems = todo.querySelectorAll("\n        ".concat(api.settings.selectorTodoDone, "\n        ").concat(api.settings.selectorTodo, "\n      "));
      doneItems.forEach(function (item) {
        if (!item.querySelector("input").checked) {
          moveTodo(item, false);
        }
      });
    });
  };

  var updateNotice = function updateNotice(todos) {
    todos.forEach(function (todo) {
      var todoList = todo.querySelector(api.settings.selectorTodoList);
      var countList = todoList.querySelectorAll(api.settings.selectorTodo).length;

      if (countList === 0) {
        showNotice(todoList);
      } else {
        hideNotice(todoList);
      }

      var todoDone = todo.querySelector(api.settings.selectorTodoDone);
      var countDone = todoDone.querySelectorAll(api.settings.selectorTodo).length;

      if (countDone === 0) {
        showNotice(todoDone);
      } else {
        hideNotice(todoDone);
      }
    });
  };

  var showNotice = function showNotice(list) {
    var msg = list.querySelector(api.settings.selectorNotice);

    if (!msg) {
      msg = list.parentNode.querySelector(api.settings.selectorNotice);
    }

    if (msg) {
      if (api.settings.transition) {
        if (!hasClass(msg, api.settings.classStateActive)) {
          addClass(msg, api.settings.classStateTransition);
          setTimeout(function () {
            addClass(msg, api.settings.classStateActive);
            removeClass(msg, api.settings.classStateTransition);
          }, api.settings.transitionTick);
        }
      } else {
        addClass(msg, api.settings.classStateActive);
      }
    }
  };

  var hideNotice = function hideNotice(list) {
    var msg = list.querySelector(api.settings.selectorNotice);

    if (!msg) {
      msg = list.parentNode.querySelector(api.settings.selectorNotice);
    }

    if (msg) {
      if (api.settings.transition) {
        if (hasClass(msg, api.settings.classStateActive)) {
          addClass(msg, api.settings.classStateTransition);
          setTimeout(function () {
            removeClass(msg, api.settings.classStateActive);
            setTimeout(function () {
              removeClass(msg, api.settings.classStateTransition);
            }, api.settings.transitionDuration);
          }, api.settings.transitionTick);
        }
      } else {
        removeClass(msg, api.settings.classStateActive);
      }
    }
  };

  var moveTodo = function moveTodo(item) {
    var toggleNotice = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var todo = item.closest(api.settings.selectorTodoBlock);
    var todoList = todo.querySelector(api.settings.selectorTodoList);
    var todoDone = todo.querySelector(api.settings.selectorTodoDone);
    var itemInput = item.querySelector("input");
    var listTo = itemInput.checked ? todoDone : todoList;
    var listFrom = itemInput.checked ? todoList : todoDone;
    var listToCount = listTo.querySelectorAll(api.settings.selectorTodo).length;
    var listFromCount = listFrom.querySelectorAll(api.settings.selectorTodo).length;

    if (api.settings.transition) {
      itemInput.setAttribute("disabled", true);
      addClass(item, api.settings.classStateTransition);

      if (toggleNotice && listToCount === 0) {
        hideNotice(listTo);
      }

      setTimeout(function () {
        listTo.append(item);
        setTimeout(function () {
          removeClass(item, api.settings.classStateTransition);
          itemInput.removeAttribute("disabled");
          setTimeout(function () {
            if (toggleNotice && listFromCount <= 1) {
              showNotice(listFrom);
            }
          }, api.settings.transitionDuration);
        }, api.settings.transitionTick);
      }, api.settings.transitionDuration);
    } else {
      listTo.append(item);

      if (listToCount === 0) {
        hideNotice(listTo);
      }

      if (listFromCount <= 1) {
        showNotice(listFrom);
      }
    }
  };

  var run = function run() {
    var trigger = event.target.closest(api.settings.selectorTodo);

    if (trigger) {
      moveTodo(trigger);
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
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
    }
  };

  if (api.settings.autoInit) api.init();
  return api;
};

exports.Choice = Choice;
exports.Dismissible = Dismissible;
exports.Drawer = Drawer;
exports.Modal = Modal;
exports.Todo = Todo;
exports.Toggle = Toggle;
