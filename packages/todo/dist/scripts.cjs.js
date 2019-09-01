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
    selectorTodo: "[data-todo]",
    selectorTodoList: "[data-todo-list]",
    selectorTodoDone: "[data-todo-done]",
    selectorNotice: "[data-todo-notice]",
    selectorToggle: "[data-todo-toggle]",
    transitionDuration: 500
  };
  api.settings = _objectSpread2({}, defaults, {}, options);
  var todoList = document.querySelector(api.settings.selectorTodoList);
  var todoListDone = document.querySelector(api.settings.selectorTodoDone);
  var todoLists = [todoList, todoListDone];

  api.init = function () {
    updateLists();
    document.addEventListener("change", run, false);
  };

  api.destroy = function () {
    document.removeEventListener("click", run, false);
  };

  var updateLists = function updateLists() {
    if (todoLists.every(function (i) {
      return i.length;
    })) {
      todoLists.forEach(function (list) {
        if (!list.childElementCount) {
          removeClass(list.nextElementSibling, "u-display-none");
        } else {
          addClass(list.nextElementSibling, "u-display-none");
        }
      });
    }
  };

  var moveTodo = function moveTodo(item) {
    var list = item.querySelector("input").checked ? api.settings.selectorTodoDone : api.settings.selectorTodoList;
    document.querySelector(list).append(item);
    updateLists();
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
