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

var transition = {
  duration: 300,
  tick: 30
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

exports.Todo = Todo;
