(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _utility = _interopRequireDefault(require("utility"));

var _dismissible = _interopRequireDefault(require("dismissible"));

var _drawer = _interopRequireDefault(require("drawer"));

var _modal = _interopRequireDefault(require("modal"));

var _toggle = _interopRequireDefault(require("toggle"));

var _list = _interopRequireDefault(require("list.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dismissible = new _dismissible["default"]();
var drawer = new _drawer["default"]();
var modal = new _modal["default"]();
var toggle = new _toggle["default"]();
/**
 * General event trigger for testing
 */

document.addEventListener('click', function () {
  // Get the element that triggered the event
  var trigger = event.target;

  if (_utility["default"].hasClass(trigger, 'drawer--init')) {
    console.log('drawer.init()');
    drawer.init();
  }

  if (_utility["default"].hasClass(trigger, 'drawer--destroy')) {
    console.log('drawer.destroy()');
    drawer.destroy();
  }

  if (_utility["default"].hasClass(trigger, 'drawer--open')) {
    console.log('drawer.open()');
    drawer.open();
  }

  if (_utility["default"].hasClass(trigger, 'drawer--close')) {
    console.log('drawer.close()');
    drawer.close();
  }

  if (_utility["default"].hasClass(trigger, 'drawer--toggle')) {
    console.log('drawer.toggle()');
    drawer.toggle();
  }

  if (_utility["default"].hasClass(trigger, 'drawer--toggle-example')) {
    console.log('drawer.toggle("#drawer-example")');
    drawer.toggle('#drawer-example');
  }

  if (_utility["default"].hasClass(trigger, 'drawer--switch-drawer')) {
    console.log('drawer.switchDrawer()');
    drawer.switchDrawer();
  }

  if (_utility["default"].hasClass(trigger, 'drawer--switch-modal')) {
    console.log('drawer.switchModal()');
    drawer.switchModal();
  }

  if (_utility["default"].hasClass(trigger, 'drawer--reset')) {
    console.log('drawer.stateReset()');
    drawer.stateReset();
  }

  if (_utility["default"].hasClass(trigger, 'drawer--save')) {
    console.log('drawer.stateSave()');
    drawer.stateSave();
  }
});
/**
 * List.js
 * ---
 * Adds list functionality along with search.
 * list.js docs: http://listjs.com/
 */

if (document.getElementById('listjs')) {
  // Init our list.js component
  var list = new _list["default"]('listjs', {
    fuzzySearch: {
      searchClass: 'search',
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true
    },
    valueNames: ['name', {
      data: ['category']
    }],
    listClass: 'menu'
  }); // Empty Notice
  // Displayed when the search returns no results

  var notice_empty = document.querySelector('.notice_empty');
  var notice_empty_text = notice_empty.querySelector('.search_text'); // Clear search button

  var filter = document.querySelector('.filter');
  var search = document.querySelector('.filter .search');
  var search_clear = document.querySelector('.filter .search_clear'); // On search complete callback

  list.on('searchComplete', function () {
    // Update the search text in empty notice
    var value = search.value;
    notice_empty_text.innerHTML = value; // Show clear search button if a value there is something in search

    if (value) {
      _utility["default"].addClass(filter, 'is-active');

      _utility["default"].addClass(search, 'is-active');

      _utility["default"].removeClass(search_clear, 'd_none');
    } else {
      _utility["default"].removeClass(filter, 'is-active');

      _utility["default"].removeClass(search, 'is-active');

      _utility["default"].addClass(search_clear, 'd_none');
    } // Toggle notice depending on the number of visible items


    if (list.visibleItems.length > 0) {
      _utility["default"].addClass(notice_empty, 'd_none');
    } else {
      _utility["default"].removeClass(notice_empty, 'd_none');
    }
  }); // Click events for category and clears

  document.addEventListener('click', function () {
    var trigger_search_clear = event.target.closest('.search_clear');
    var trigger_search_cat = event.target.closest('.category');

    if (trigger_search_clear) {
      search.value = '';
      list.search();
      event.preventDefault();
    }

    if (trigger_search_cat) {
      search.value = trigger_search_cat.dataset.category;
      list.search(search.value);
      event.preventDefault();
    }
  }, false);
}

},{"dismissible":23,"drawer":24,"list.js":5,"modal":25,"toggle":26,"utility":27}],2:[function(require,module,exports){
"use strict";

module.exports = function (list) {
  var addAsync = function addAsync(values, callback, items) {
    var valuesToAdd = values.splice(0, 50);
    items = items || [];
    items = items.concat(list.add(valuesToAdd));

    if (values.length > 0) {
      setTimeout(function () {
        addAsync(values, callback, items);
      }, 1);
    } else {
      list.update();
      callback(items);
    }
  };

  return addAsync;
};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function (list) {
  // Add handlers
  list.handlers.filterStart = list.handlers.filterStart || [];
  list.handlers.filterComplete = list.handlers.filterComplete || [];
  return function (filterFunction) {
    list.trigger('filterStart');
    list.i = 1; // Reset paging

    list.reset.filter();

    if (filterFunction === undefined) {
      list.filtered = false;
    } else {
      list.filtered = true;
      var is = list.items;

      for (var i = 0, il = is.length; i < il; i++) {
        var item = is[i];

        if (filterFunction(item)) {
          item.filtered = true;
        } else {
          item.filtered = false;
        }
      }
    }

    list.update();
    list.trigger('filterComplete');
    return list.visibleItems;
  };
};

},{}],4:[function(require,module,exports){
"use strict";

var classes = require('./utils/classes'),
    events = require('./utils/events'),
    extend = require('./utils/extend'),
    toString = require('./utils/to-string'),
    getByClass = require('./utils/get-by-class'),
    fuzzy = require('./utils/fuzzy');

module.exports = function (list, options) {
  options = options || {};
  options = extend({
    location: 0,
    distance: 100,
    threshold: 0.4,
    multiSearch: true,
    searchClass: 'fuzzy-search'
  }, options);
  var fuzzySearch = {
    search: function search(searchString, columns) {
      // Substract arguments from the searchString or put searchString as only argument
      var searchArguments = options.multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString];

      for (var k = 0, kl = list.items.length; k < kl; k++) {
        fuzzySearch.item(list.items[k], columns, searchArguments);
      }
    },
    item: function item(_item, columns, searchArguments) {
      var found = true;

      for (var i = 0; i < searchArguments.length; i++) {
        var foundArgument = false;

        for (var j = 0, jl = columns.length; j < jl; j++) {
          if (fuzzySearch.values(_item.values(), columns[j], searchArguments[i])) {
            foundArgument = true;
          }
        }

        if (!foundArgument) {
          found = false;
        }
      }

      _item.found = found;
    },
    values: function values(_values, value, searchArgument) {
      if (_values.hasOwnProperty(value)) {
        var text = toString(_values[value]).toLowerCase();

        if (fuzzy(text, searchArgument, options)) {
          return true;
        }
      }

      return false;
    }
  };
  events.bind(getByClass(list.listContainer, options.searchClass), 'keyup', function (e) {
    var target = e.target || e.srcElement; // IE have srcElement

    list.search(target.value, fuzzySearch.search);
  });
  return function (str, columns) {
    list.search(str, columns, fuzzySearch.search);
  };
};

},{"./utils/classes":12,"./utils/events":13,"./utils/extend":14,"./utils/fuzzy":15,"./utils/get-by-class":17,"./utils/to-string":20}],5:[function(require,module,exports){
"use strict";

var naturalSort = require('string-natural-compare'),
    getByClass = require('./utils/get-by-class'),
    extend = require('./utils/extend'),
    indexOf = require('./utils/index-of'),
    events = require('./utils/events'),
    toString = require('./utils/to-string'),
    classes = require('./utils/classes'),
    getAttribute = require('./utils/get-attribute'),
    toArray = require('./utils/to-array');

module.exports = function (id, options, values) {
  var self = this,
      init,
      Item = require('./item')(self),
      addAsync = require('./add-async')(self),
      initPagination = require('./pagination')(self);

  init = {
    start: function start() {
      self.listClass = "list";
      self.searchClass = "search";
      self.sortClass = "sort";
      self.page = 10000;
      self.i = 1;
      self.items = [];
      self.visibleItems = [];
      self.matchingItems = [];
      self.searched = false;
      self.filtered = false;
      self.searchColumns = undefined;
      self.handlers = {
        'updated': []
      };
      self.valueNames = [];
      self.utils = {
        getByClass: getByClass,
        extend: extend,
        indexOf: indexOf,
        events: events,
        toString: toString,
        naturalSort: naturalSort,
        classes: classes,
        getAttribute: getAttribute,
        toArray: toArray
      };
      self.utils.extend(self, options);
      self.listContainer = typeof id === 'string' ? document.getElementById(id) : id;

      if (!self.listContainer) {
        return;
      }

      self.list = getByClass(self.listContainer, self.listClass, true);
      self.parse = require('./parse')(self);
      self.templater = require('./templater')(self);
      self.search = require('./search')(self);
      self.filter = require('./filter')(self);
      self.sort = require('./sort')(self);
      self.fuzzySearch = require('./fuzzy-search')(self, options.fuzzySearch);
      this.handlers();
      this.items();
      this.pagination();
      self.update();
    },
    handlers: function handlers() {
      for (var handler in self.handlers) {
        if (self[handler]) {
          self.on(handler, self[handler]);
        }
      }
    },
    items: function items() {
      self.parse(self.list);

      if (values !== undefined) {
        self.add(values);
      }
    },
    pagination: function pagination() {
      if (options.pagination !== undefined) {
        if (options.pagination === true) {
          options.pagination = [{}];
        }

        if (options.pagination[0] === undefined) {
          options.pagination = [options.pagination];
        }

        for (var i = 0, il = options.pagination.length; i < il; i++) {
          initPagination(options.pagination[i]);
        }
      }
    }
  };
  /*
  * Re-parse the List, use if html have changed
  */

  this.reIndex = function () {
    self.items = [];
    self.visibleItems = [];
    self.matchingItems = [];
    self.searched = false;
    self.filtered = false;
    self.parse(self.list);
  };

  this.toJSON = function () {
    var json = [];

    for (var i = 0, il = self.items.length; i < il; i++) {
      json.push(self.items[i].values());
    }

    return json;
  };
  /*
  * Add object to list
  */


  this.add = function (values, callback) {
    if (values.length === 0) {
      return;
    }

    if (callback) {
      addAsync(values, callback);
      return;
    }

    var added = [],
        notCreate = false;

    if (values[0] === undefined) {
      values = [values];
    }

    for (var i = 0, il = values.length; i < il; i++) {
      var item = null;
      notCreate = self.items.length > self.page ? true : false;
      item = new Item(values[i], undefined, notCreate);
      self.items.push(item);
      added.push(item);
    }

    self.update();
    return added;
  };

  this.show = function (i, page) {
    this.i = i;
    this.page = page;
    self.update();
    return self;
  };
  /* Removes object from list.
  * Loops through the list and removes objects where
  * property "valuename" === value
  */


  this.remove = function (valueName, value, options) {
    var found = 0;

    for (var i = 0, il = self.items.length; i < il; i++) {
      if (self.items[i].values()[valueName] == value) {
        self.templater.remove(self.items[i], options);
        self.items.splice(i, 1);
        il--;
        i--;
        found++;
      }
    }

    self.update();
    return found;
  };
  /* Gets the objects in the list which
  * property "valueName" === value
  */


  this.get = function (valueName, value) {
    var matchedItems = [];

    for (var i = 0, il = self.items.length; i < il; i++) {
      var item = self.items[i];

      if (item.values()[valueName] == value) {
        matchedItems.push(item);
      }
    }

    return matchedItems;
  };
  /*
  * Get size of the list
  */


  this.size = function () {
    return self.items.length;
  };
  /*
  * Removes all items from the list
  */


  this.clear = function () {
    self.templater.clear();
    self.items = [];
    return self;
  };

  this.on = function (event, callback) {
    self.handlers[event].push(callback);
    return self;
  };

  this.off = function (event, callback) {
    var e = self.handlers[event];
    var index = indexOf(e, callback);

    if (index > -1) {
      e.splice(index, 1);
    }

    return self;
  };

  this.trigger = function (event) {
    var i = self.handlers[event].length;

    while (i--) {
      self.handlers[event][i](self);
    }

    return self;
  };

  this.reset = {
    filter: function filter() {
      var is = self.items,
          il = is.length;

      while (il--) {
        is[il].filtered = false;
      }

      return self;
    },
    search: function search() {
      var is = self.items,
          il = is.length;

      while (il--) {
        is[il].found = false;
      }

      return self;
    }
  };

  this.update = function () {
    var is = self.items,
        il = is.length;
    self.visibleItems = [];
    self.matchingItems = [];
    self.templater.clear();

    for (var i = 0; i < il; i++) {
      if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
        is[i].show();
        self.visibleItems.push(is[i]);
        self.matchingItems.push(is[i]);
      } else if (is[i].matching()) {
        self.matchingItems.push(is[i]);
        is[i].hide();
      } else {
        is[i].hide();
      }
    }

    self.trigger('updated');
    return self;
  };

  init.start();
};

},{"./add-async":2,"./filter":3,"./fuzzy-search":4,"./item":6,"./pagination":7,"./parse":8,"./search":9,"./sort":10,"./templater":11,"./utils/classes":12,"./utils/events":13,"./utils/extend":14,"./utils/get-attribute":16,"./utils/get-by-class":17,"./utils/index-of":18,"./utils/to-array":19,"./utils/to-string":20,"string-natural-compare":21}],6:[function(require,module,exports){
"use strict";

module.exports = function (list) {
  return function (initValues, element, notCreate) {
    var item = this;
    this._values = {};
    this.found = false; // Show if list.searched == true and this.found == true

    this.filtered = false; // Show if list.filtered == true and this.filtered == true

    var init = function init(initValues, element, notCreate) {
      if (element === undefined) {
        if (notCreate) {
          item.values(initValues, notCreate);
        } else {
          item.values(initValues);
        }
      } else {
        item.elm = element;
        var values = list.templater.get(item, initValues);
        item.values(values);
      }
    };

    this.values = function (newValues, notCreate) {
      if (newValues !== undefined) {
        for (var name in newValues) {
          item._values[name] = newValues[name];
        }

        if (notCreate !== true) {
          list.templater.set(item, item.values());
        }
      } else {
        return item._values;
      }
    };

    this.show = function () {
      list.templater.show(item);
    };

    this.hide = function () {
      list.templater.hide(item);
    };

    this.matching = function () {
      return list.filtered && list.searched && item.found && item.filtered || list.filtered && !list.searched && item.filtered || !list.filtered && list.searched && item.found || !list.filtered && !list.searched;
    };

    this.visible = function () {
      return item.elm && item.elm.parentNode == list.list ? true : false;
    };

    init(initValues, element, notCreate);
  };
};

},{}],7:[function(require,module,exports){
"use strict";

var classes = require('./utils/classes'),
    events = require('./utils/events'),
    List = require('./index');

module.exports = function (list) {
  var refresh = function refresh(pagingList, options) {
    var item,
        l = list.matchingItems.length,
        index = list.i,
        page = list.page,
        pages = Math.ceil(l / page),
        currentPage = Math.ceil(index / page),
        innerWindow = options.innerWindow || 2,
        left = options.left || options.outerWindow || 0,
        right = options.right || options.outerWindow || 0;
    right = pages - right;
    pagingList.clear();

    for (var i = 1; i <= pages; i++) {
      var className = currentPage === i ? "active" : ""; //console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow), className);

      if (is.number(i, left, right, currentPage, innerWindow)) {
        item = pagingList.add({
          page: i,
          dotted: false
        })[0];

        if (className) {
          classes(item.elm).add(className);
        }

        addEvent(item.elm, i, page);
      } else if (is.dotted(pagingList, i, left, right, currentPage, innerWindow, pagingList.size())) {
        item = pagingList.add({
          page: "...",
          dotted: true
        })[0];
        classes(item.elm).add("disabled");
      }
    }
  };

  var is = {
    number: function number(i, left, right, currentPage, innerWindow) {
      return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
    },
    left: function left(i, _left) {
      return i <= _left;
    },
    right: function right(i, _right) {
      return i > _right;
    },
    innerWindow: function innerWindow(i, currentPage, _innerWindow) {
      return i >= currentPage - _innerWindow && i <= currentPage + _innerWindow;
    },
    dotted: function dotted(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
      return this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) || this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem);
    },
    dottedLeft: function dottedLeft(pagingList, i, left, right, currentPage, innerWindow) {
      return i == left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
    },
    dottedRight: function dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
      if (pagingList.items[currentPageItem - 1].values().dotted) {
        return false;
      } else {
        return i == right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
      }
    }
  };

  var addEvent = function addEvent(elm, i, page) {
    events.bind(elm, 'click', function () {
      list.show((i - 1) * page + 1, page);
    });
  };

  return function (options) {
    var pagingList = new List(list.listContainer.id, {
      listClass: options.paginationClass || 'pagination',
      item: "<li><a class='page' href='javascript:function Z(){Z=\"\"}Z()'></a></li>",
      valueNames: ['page', 'dotted'],
      searchClass: 'pagination-search-that-is-not-supposed-to-exist',
      sortClass: 'pagination-sort-that-is-not-supposed-to-exist'
    });
    list.on('updated', function () {
      refresh(pagingList, options);
    });
    refresh(pagingList, options);
  };
};

},{"./index":5,"./utils/classes":12,"./utils/events":13}],8:[function(require,module,exports){
"use strict";

module.exports = function (list) {
  var Item = require('./item')(list);

  var getChildren = function getChildren(parent) {
    var nodes = parent.childNodes,
        items = [];

    for (var i = 0, il = nodes.length; i < il; i++) {
      // Only textnodes have a data attribute
      if (nodes[i].data === undefined) {
        items.push(nodes[i]);
      }
    }

    return items;
  };

  var parse = function parse(itemElements, valueNames) {
    for (var i = 0, il = itemElements.length; i < il; i++) {
      list.items.push(new Item(valueNames, itemElements[i]));
    }
  };

  var parseAsync = function parseAsync(itemElements, valueNames) {
    var itemsToIndex = itemElements.splice(0, 50); // TODO: If < 100 items, what happens in IE etc?

    parse(itemsToIndex, valueNames);

    if (itemElements.length > 0) {
      setTimeout(function () {
        parseAsync(itemElements, valueNames);
      }, 1);
    } else {
      list.update();
      list.trigger('parseComplete');
    }
  };

  list.handlers.parseComplete = list.handlers.parseComplete || [];
  return function () {
    var itemsToIndex = getChildren(list.list),
        valueNames = list.valueNames;

    if (list.indexAsync) {
      parseAsync(itemsToIndex, valueNames);
    } else {
      parse(itemsToIndex, valueNames);
    }
  };
};

},{"./item":6}],9:[function(require,module,exports){
"use strict";

module.exports = function (_list) {
  var item, text, columns, searchString, customSearch;
  var prepare = {
    resetList: function resetList() {
      _list.i = 1;

      _list.templater.clear();

      customSearch = undefined;
    },
    setOptions: function setOptions(args) {
      if (args.length == 2 && args[1] instanceof Array) {
        columns = args[1];
      } else if (args.length == 2 && typeof args[1] == "function") {
        columns = undefined;
        customSearch = args[1];
      } else if (args.length == 3) {
        columns = args[1];
        customSearch = args[2];
      } else {
        columns = undefined;
      }
    },
    setColumns: function setColumns() {
      if (_list.items.length === 0) return;

      if (columns === undefined) {
        columns = _list.searchColumns === undefined ? prepare.toArray(_list.items[0].values()) : _list.searchColumns;
      }
    },
    setSearchString: function setSearchString(s) {
      s = _list.utils.toString(s).toLowerCase();
      s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // Escape regular expression characters

      searchString = s;
    },
    toArray: function toArray(values) {
      var tmpColumn = [];

      for (var name in values) {
        tmpColumn.push(name);
      }

      return tmpColumn;
    }
  };
  var search = {
    list: function list() {
      for (var k = 0, kl = _list.items.length; k < kl; k++) {
        search.item(_list.items[k]);
      }
    },
    item: function item(_item) {
      _item.found = false;

      for (var j = 0, jl = columns.length; j < jl; j++) {
        if (search.values(_item.values(), columns[j])) {
          _item.found = true;
          return;
        }
      }
    },
    values: function values(_values, column) {
      if (_values.hasOwnProperty(column)) {
        text = _list.utils.toString(_values[column]).toLowerCase();

        if (searchString !== "" && text.search(searchString) > -1) {
          return true;
        }
      }

      return false;
    },
    reset: function reset() {
      _list.reset.search();

      _list.searched = false;
    }
  };

  var searchMethod = function searchMethod(str) {
    _list.trigger('searchStart');

    prepare.resetList();
    prepare.setSearchString(str);
    prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction

    prepare.setColumns();

    if (searchString === "") {
      search.reset();
    } else {
      _list.searched = true;

      if (customSearch) {
        customSearch(searchString, columns);
      } else {
        search.list();
      }
    }

    _list.update();

    _list.trigger('searchComplete');

    return _list.visibleItems;
  };

  _list.handlers.searchStart = _list.handlers.searchStart || [];
  _list.handlers.searchComplete = _list.handlers.searchComplete || [];

  _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'keyup', function (e) {
    var target = e.target || e.srcElement,
        // IE have srcElement
    alreadyCleared = target.value === "" && !_list.searched;

    if (!alreadyCleared) {
      // If oninput already have resetted the list, do nothing
      searchMethod(target.value);
    }
  }); // Used to detect click on HTML5 clear button


  _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'input', function (e) {
    var target = e.target || e.srcElement;

    if (target.value === "") {
      searchMethod('');
    }
  });

  return searchMethod;
};

},{}],10:[function(require,module,exports){
"use strict";

module.exports = function (list) {
  var buttons = {
    els: undefined,
    clear: function clear() {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        list.utils.classes(buttons.els[i]).remove('asc');
        list.utils.classes(buttons.els[i]).remove('desc');
      }
    },
    getOrder: function getOrder(btn) {
      var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

      if (predefinedOrder == "asc" || predefinedOrder == "desc") {
        return predefinedOrder;
      } else if (list.utils.classes(btn).has('desc')) {
        return "asc";
      } else if (list.utils.classes(btn).has('asc')) {
        return "desc";
      } else {
        return "asc";
      }
    },
    getInSensitive: function getInSensitive(btn, options) {
      var insensitive = list.utils.getAttribute(btn, 'data-insensitive');

      if (insensitive === "false") {
        options.insensitive = false;
      } else {
        options.insensitive = true;
      }
    },
    setOrder: function setOrder(options) {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        var btn = buttons.els[i];

        if (list.utils.getAttribute(btn, 'data-sort') !== options.valueName) {
          continue;
        }

        var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
          if (predefinedOrder == options.order) {
            list.utils.classes(btn).add(options.order);
          }
        } else {
          list.utils.classes(btn).add(options.order);
        }
      }
    }
  };

  var sort = function sort() {
    list.trigger('sortStart');
    var options = {};
    var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

    if (target) {
      options.valueName = list.utils.getAttribute(target, 'data-sort');
      buttons.getInSensitive(target, options);
      options.order = buttons.getOrder(target);
    } else {
      options = arguments[1] || options;
      options.valueName = arguments[0];
      options.order = options.order || "asc";
      options.insensitive = typeof options.insensitive == "undefined" ? true : options.insensitive;
    }

    buttons.clear();
    buttons.setOrder(options); // caseInsensitive
    // alphabet

    var customSortFunction = options.sortFunction || list.sortFunction || null,
        multi = options.order === 'desc' ? -1 : 1,
        sortFunction;

    if (customSortFunction) {
      sortFunction = function sortFunction(itemA, itemB) {
        return customSortFunction(itemA, itemB, options) * multi;
      };
    } else {
      sortFunction = function sortFunction(itemA, itemB) {
        var sort = list.utils.naturalSort;
        sort.alphabet = list.alphabet || options.alphabet || undefined;

        if (!sort.alphabet && options.insensitive) {
          sort = list.utils.naturalSort.caseInsensitive;
        }

        return sort(itemA.values()[options.valueName], itemB.values()[options.valueName]) * multi;
      };
    }

    list.items.sort(sortFunction);
    list.update();
    list.trigger('sortComplete');
  }; // Add handlers


  list.handlers.sortStart = list.handlers.sortStart || [];
  list.handlers.sortComplete = list.handlers.sortComplete || [];
  buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
  list.utils.events.bind(buttons.els, 'click', sort);
  list.on('searchStart', buttons.clear);
  list.on('filterStart', buttons.clear);
  return sort;
};

},{}],11:[function(require,module,exports){
"use strict";

var Templater = function Templater(list) {
  var itemSource,
      templater = this;

  var init = function init() {
    itemSource = templater.getItemSource(list.item);

    if (itemSource) {
      itemSource = templater.clearSourceItem(itemSource, list.valueNames);
    }
  };

  this.clearSourceItem = function (el, valueNames) {
    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm;

      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          el.setAttribute('data-' + valueNames[i].data[j], '');
        }
      } else if (valueNames[i].attr && valueNames[i].name) {
        elm = list.utils.getByClass(el, valueNames[i].name, true);

        if (elm) {
          elm.setAttribute(valueNames[i].attr, "");
        }
      } else {
        elm = list.utils.getByClass(el, valueNames[i], true);

        if (elm) {
          elm.innerHTML = "";
        }
      }

      elm = undefined;
    }

    return el;
  };

  this.getItemSource = function (item) {
    if (item === undefined) {
      var nodes = list.list.childNodes,
          items = [];

      for (var i = 0, il = nodes.length; i < il; i++) {
        // Only textnodes have a data attribute
        if (nodes[i].data === undefined) {
          return nodes[i].cloneNode(true);
        }
      }
    } else if (/<tr[\s>]/g.exec(item)) {
      var tbody = document.createElement('tbody');
      tbody.innerHTML = item;
      return tbody.firstChild;
    } else if (item.indexOf("<") !== -1) {
      var div = document.createElement('div');
      div.innerHTML = item;
      return div.firstChild;
    } else {
      var source = document.getElementById(list.item);

      if (source) {
        return source;
      }
    }

    return undefined;
  };

  this.get = function (item, valueNames) {
    templater.create(item);
    var values = {};

    for (var i = 0, il = valueNames.length; i < il; i++) {
      var elm;

      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          values[valueNames[i].data[j]] = list.utils.getAttribute(item.elm, 'data-' + valueNames[i].data[j]);
        }
      } else if (valueNames[i].attr && valueNames[i].name) {
        elm = list.utils.getByClass(item.elm, valueNames[i].name, true);
        values[valueNames[i].name] = elm ? list.utils.getAttribute(elm, valueNames[i].attr) : "";
      } else {
        elm = list.utils.getByClass(item.elm, valueNames[i], true);
        values[valueNames[i]] = elm ? elm.innerHTML : "";
      }

      elm = undefined;
    }

    return values;
  };

  this.set = function (item, values) {
    var getValueName = function getValueName(name) {
      for (var i = 0, il = list.valueNames.length; i < il; i++) {
        if (list.valueNames[i].data) {
          var data = list.valueNames[i].data;

          for (var j = 0, jl = data.length; j < jl; j++) {
            if (data[j] === name) {
              return {
                data: name
              };
            }
          }
        } else if (list.valueNames[i].attr && list.valueNames[i].name && list.valueNames[i].name == name) {
          return list.valueNames[i];
        } else if (list.valueNames[i] === name) {
          return name;
        }
      }
    };

    var setValue = function setValue(name, value) {
      var elm;
      var valueName = getValueName(name);
      if (!valueName) return;

      if (valueName.data) {
        item.elm.setAttribute('data-' + valueName.data, value);
      } else if (valueName.attr && valueName.name) {
        elm = list.utils.getByClass(item.elm, valueName.name, true);

        if (elm) {
          elm.setAttribute(valueName.attr, value);
        }
      } else {
        elm = list.utils.getByClass(item.elm, valueName, true);

        if (elm) {
          elm.innerHTML = value;
        }
      }

      elm = undefined;
    };

    if (!templater.create(item)) {
      for (var v in values) {
        if (values.hasOwnProperty(v)) {
          setValue(v, values[v]);
        }
      }
    }
  };

  this.create = function (item) {
    if (item.elm !== undefined) {
      return false;
    }

    if (itemSource === undefined) {
      throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.");
    }
    /* If item source does not exists, use the first item in list as
    source for new items */


    var newItem = itemSource.cloneNode(true);
    newItem.removeAttribute('id');
    item.elm = newItem;
    templater.set(item, item.values());
    return true;
  };

  this.remove = function (item) {
    if (item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };

  this.show = function (item) {
    templater.create(item);
    list.list.appendChild(item.elm);
  };

  this.hide = function (item) {
    if (item.elm !== undefined && item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };

  this.clear = function () {
    /* .innerHTML = ''; fucks up IE */
    if (list.list.hasChildNodes()) {
      while (list.list.childNodes.length >= 1) {
        list.list.removeChild(list.list.firstChild);
      }
    }
  };

  init();
};

module.exports = function (list) {
  return new Templater(list);
};

},{}],12:[function(require,module,exports){
"use strict";

/**
 * Module dependencies.
 */
var index = require('./index-of');
/**
 * Whitespace regexp.
 */


var re = /\s+/;
/**
 * toString reference.
 */

var toString = Object.prototype.toString;
/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function (el) {
  return new ClassList(el);
};
/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */


function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }

  this.el = el;
  this.list = el.classList;
}
/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.add = function (name) {
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  } // fallback


  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};
/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.remove = function (name) {
  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  } // fallback


  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};
/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.toggle = function (name, force) {
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }

    return this;
  } // fallback


  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};
/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */


ClassList.prototype.array = function () {
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};
/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */


ClassList.prototype.has = ClassList.prototype.contains = function (name) {
  return this.list ? this.list.contains(name) : !!~index(this.array(), name);
};

},{"./index-of":18}],13:[function(require,module,exports){
"use strict";

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '',
    toArray = require('./to-array');
/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */


exports.bind = function (el, type, fn, capture) {
  el = toArray(el);

  for (var i = 0; i < el.length; i++) {
    el[i][bind](prefix + type, fn, capture || false);
  }
};
/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el, NodeList, HTMLCollection or Array
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */


exports.unbind = function (el, type, fn, capture) {
  el = toArray(el);

  for (var i = 0; i < el.length; i++) {
    el[i][unbind](prefix + type, fn, capture || false);
  }
};

},{"./to-array":19}],14:[function(require,module,exports){
"use strict";

/*
 * Source: https://github.com/segmentio/extend
 */
module.exports = function extend(object) {
  // Takes an unlimited number of extenders.
  var args = Array.prototype.slice.call(arguments, 1); // For each extender, copy their properties on our object.

  for (var i = 0, source; source = args[i]; i++) {
    if (!source) continue;

    for (var property in source) {
      object[property] = source[property];
    }
  }

  return object;
};

},{}],15:[function(require,module,exports){
"use strict";

module.exports = function (text, pattern, options) {
  // Aproximately where in the text is the pattern expected to be found?
  var Match_Location = options.location || 0; //Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of '0' requires the match be at the exact location specified, a threshold of '1000' would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.

  var Match_Distance = options.distance || 100; // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match (of both letters and location), a threshold of '1.0' would match anything.

  var Match_Threshold = options.threshold || 0.4;
  if (pattern === text) return true; // Exact match

  if (pattern.length > 32) return false; // This algorithm cannot be used
  // Set starting location at beginning text and initialise the alphabet.

  var loc = Match_Location,
      s = function () {
    var q = {},
        i;

    for (i = 0; i < pattern.length; i++) {
      q[pattern.charAt(i)] = 0;
    }

    for (i = 0; i < pattern.length; i++) {
      q[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
    }

    return q;
  }(); // Compute and return the score for a match with e errors and x location.
  // Accesses loc and pattern through being a closure.


  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length,
        proximity = Math.abs(loc - x);

    if (!Match_Distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }

    return accuracy + proximity / Match_Distance;
  }

  var score_threshold = Match_Threshold,
      // Highest score beyond which we give up.
  best_loc = text.indexOf(pattern, loc); // Is there a nearby exact match? (speedup)

  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold); // What about in the other direction? (speedup)

    best_loc = text.lastIndexOf(pattern, loc + pattern.length);

    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  } // Initialise the bit arrays.


  var matchmask = 1 << pattern.length - 1;
  best_loc = -1;
  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;

  for (var d = 0; d < pattern.length; d++) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from 'loc' we can stray at this
    // error level.
    bin_min = 0;
    bin_mid = bin_max;

    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }

      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    } // Use the result from this iteration as the maximum for the next.


    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;

    for (var j = finish; j >= start; j--) {
      // The alphabet (s) is a sparse hash, so the following line generates
      // warnings.
      var charMatch = s[text.charAt(j - 1)];

      if (d === 0) {
        // First pass: exact match.
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
      } else {
        // Subsequent passes: fuzzy match.
        rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
      }

      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1); // This match will almost certainly be better than any existing match.
        // But check anyway.

        if (score <= score_threshold) {
          // Told you so.
          score_threshold = score;
          best_loc = j - 1;

          if (best_loc > loc) {
            // When passing loc, don't exceed our current distance from loc.
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            // Already passed loc, downhill from here on in.
            break;
          }
        }
      }
    } // No hope for a (better) match at greater error levels.


    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }

    last_rd = rd;
  }

  return best_loc < 0 ? false : true;
};

},{}],16:[function(require,module,exports){
"use strict";

/**
 * A cross-browser implementation of getAttribute.
 * Source found here: http://stackoverflow.com/a/3755343/361337 written by Vivin Paliath
 *
 * Return the value for `attr` at `element`.
 *
 * @param {Element} el
 * @param {String} attr
 * @api public
 */
module.exports = function (el, attr) {
  var result = el.getAttribute && el.getAttribute(attr) || null;

  if (!result) {
    var attrs = el.attributes;
    var length = attrs.length;

    for (var i = 0; i < length; i++) {
      if (attr[i] !== undefined) {
        if (attr[i].nodeName === attr) {
          result = attr[i].nodeValue;
        }
      }
    }
  }

  return result;
};

},{}],17:[function(require,module,exports){
"use strict";

/**
 * A cross-browser implementation of getElementsByClass.
 * Heavily based on Dustin Diaz's function: http://dustindiaz.com/getelementsbyclass.
 *
 * Find all elements with class `className` inside `container`.
 * Use `single = true` to increase performance in older browsers
 * when only one element is needed.
 *
 * @param {String} className
 * @param {Element} container
 * @param {Boolean} single
 * @api public
 */
var getElementsByClassName = function getElementsByClassName(container, className, single) {
  if (single) {
    return container.getElementsByClassName(className)[0];
  } else {
    return container.getElementsByClassName(className);
  }
};

var querySelector = function querySelector(container, className, single) {
  className = '.' + className;

  if (single) {
    return container.querySelector(className);
  } else {
    return container.querySelectorAll(className);
  }
};

var polyfill = function polyfill(container, className, single) {
  var classElements = [],
      tag = '*';
  var els = container.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");

  for (var i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className)) {
      if (single) {
        return els[i];
      } else {
        classElements[j] = els[i];
        j++;
      }
    }
  }

  return classElements;
};

module.exports = function () {
  return function (container, className, single, options) {
    options = options || {};

    if (options.test && options.getElementsByClassName || !options.test && document.getElementsByClassName) {
      return getElementsByClassName(container, className, single);
    } else if (options.test && options.querySelector || !options.test && document.querySelector) {
      return querySelector(container, className, single);
    } else {
      return polyfill(container, className, single);
    }
  };
}();

},{}],18:[function(require,module,exports){
"use strict";

var indexOf = [].indexOf;

module.exports = function (arr, obj) {
  if (indexOf) return arr.indexOf(obj);

  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }

  return -1;
};

},{}],19:[function(require,module,exports){
"use strict";

/**
 * Source: https://github.com/timoxley/to-array
 *
 * Convert an array-like object into an `Array`.
 * If `collection` is already an `Array`, then will return a clone of `collection`.
 *
 * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`
 * @return {Array} Naive conversion of `collection` to a new `Array`.
 * @api public
 */
module.exports = function toArray(collection) {
  if (typeof collection === 'undefined') return [];
  if (collection === null) return [null];
  if (collection === window) return [window];
  if (typeof collection === 'string') return [collection];
  if (isArray(collection)) return collection;
  if (typeof collection.length != 'number') return [collection];
  if (typeof collection === 'function' && collection instanceof Function) return [collection];
  var arr = [];

  for (var i = 0; i < collection.length; i++) {
    if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
      arr.push(collection[i]);
    }
  }

  if (!arr.length) return [];
  return arr;
};

function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}

},{}],20:[function(require,module,exports){
"use strict";

module.exports = function (s) {
  s = s === undefined ? "" : s;
  s = s === null ? "" : s;
  s = s.toString();
  return s;
};

},{}],21:[function(require,module,exports){
'use strict';

var alphabet;
var alphabetIndexMap;
var alphabetIndexMapLength = 0;

function isNumberCode(code) {
  return code >= 48 && code <= 57;
}

function naturalCompare(a, b) {
  var lengthA = (a += '').length;
  var lengthB = (b += '').length;
  var aIndex = 0;
  var bIndex = 0;

  while (aIndex < lengthA && bIndex < lengthB) {
    var charCodeA = a.charCodeAt(aIndex);
    var charCodeB = b.charCodeAt(bIndex);

    if (isNumberCode(charCodeA)) {
      if (!isNumberCode(charCodeB)) {
        return charCodeA - charCodeB;
      }

      var numStartA = aIndex;
      var numStartB = bIndex;

      while (charCodeA === 48 && ++numStartA < lengthA) {
        charCodeA = a.charCodeAt(numStartA);
      }

      while (charCodeB === 48 && ++numStartB < lengthB) {
        charCodeB = b.charCodeAt(numStartB);
      }

      var numEndA = numStartA;
      var numEndB = numStartB;

      while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
        ++numEndA;
      }

      while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
        ++numEndB;
      }

      var difference = numEndA - numStartA - numEndB + numStartB; // numA length - numB length

      if (difference) {
        return difference;
      }

      while (numStartA < numEndA) {
        difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);

        if (difference) {
          return difference;
        }
      }

      aIndex = numEndA;
      bIndex = numEndB;
      continue;
    }

    if (charCodeA !== charCodeB) {
      if (charCodeA < alphabetIndexMapLength && charCodeB < alphabetIndexMapLength && alphabetIndexMap[charCodeA] !== -1 && alphabetIndexMap[charCodeB] !== -1) {
        return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
      }

      return charCodeA - charCodeB;
    }

    ++aIndex;
    ++bIndex;
  }

  return lengthA - lengthB;
}

naturalCompare.caseInsensitive = naturalCompare.i = function (a, b) {
  return naturalCompare(('' + a).toLowerCase(), ('' + b).toLowerCase());
};

Object.defineProperties(naturalCompare, {
  alphabet: {
    get: function get() {
      return alphabet;
    },
    set: function set(value) {
      alphabet = value;
      alphabetIndexMap = [];
      var i = 0;

      if (alphabet) {
        for (; i < alphabet.length; i++) {
          alphabetIndexMap[alphabet.charCodeAt(i)] = i;
        }
      }

      alphabetIndexMapLength = alphabetIndexMap.length;

      for (i = 0; i < alphabetIndexMapLength; i++) {
        if (alphabetIndexMap[i] === undefined) {
          alphabetIndexMap[i] = -1;
        }
      }
    }
  }
});
module.exports = naturalCompare;

},{}],22:[function(require,module,exports){
module.exports={
  "breakpoints" : {
    "xs": "480px",
    "sm": "620px",
    "md": "760px",
    "lg": "990px",
    "xl": "1380px"
  }
}

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    trigger: '[data-dismiss]',
    target: '[data-dismissible]',
    classToggle: 'dismiss'
  };

  api.init = function (options) {
    settings = _utility["default"].extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
  };

  var run = function run() {
    var trigger = event.target.closest(settings.trigger);

    if (trigger) {
      var target = trigger.closest(settings.target);

      if (target) {
        _utility["default"].toggleClass(target, settings.classToggle);
      }

      event.preventDefault();
    }
  };

  api.init(options);
  return api;
}

},{"./utility.js":27}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Drawer plugin
 * ---
 * A container component that slides in from the left or right. It typically
 * contains menus, search or other content for your app.
 *
 * Todos:
 * [ ] Debug why I'm getting "TypeError: s is null" on lines 396 and 433. This is probably do to not removing the media query event listener on destroy
 */
function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    // Element classes
    classTarget: 'drawer__item',
    classTrigger: 'drawer__trigger',
    classInner: 'drawer__dialog',
    // Used with RegExp to search and replace element classes
    classTargetSwitch: 'modal',
    classTriggerSwitch: 'modal__trigger',
    classInnerSwitch: 'modal__dialog',
    // The class that is used to make an item active
    classActive: 'is-active',
    classTransitionNone: 'transition_none',
    // Whether or not to store the save state in local storage
    // {boolean} The string to save our state object as
    saveState: true,
    // Whether or not to enable the switch functionality
    // If enabled, a string selector to check for should be passed.
    // {false} || {string} e.g. '[data-drawer-switch]'
    "switch": '[data-drawer-switch]',
    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',
    // Duration before removing the transition_none class on initial load
    transitionDuration: 500 // Drawer specific variables
    // Where we store all our drawers available in the DOM

  };
  var drawers; // Where we store all our switch drawers available in the DOM

  var switchDrawers; // Where we build the save state object before we pass it to local storage

  var drawerState = {};
  /**
   * The constructor method, run as soon as an instance is created
   * ---
   * @param {Object} options - A json object with your custom settings
   */

  api.init = function (options) {
    // Merge the defaults and passed options into our settings obj
    settings = _utility["default"].extend(defaults, options || {}); // Get all the drawers on the page

    drawers = document.querySelectorAll('.' + settings.classTarget); // Initialize a promise and init save state if it's enabled

    var promiseSaveState = new Promise(function (resolve) {
      if (settings.saveState) {
        initSaveState(resolve);
      } else {
        resolve();
      }
    }); // After promise is resolved and switch is enabled, initialize switch

    promiseSaveState.then(function () {
      if (settings["switch"]) {
        initSwitch();
      }
    }); // Add our drawer trigger event listener

    document.addEventListener('click', trigger, false);
  };
  /**
   * The deconstructor method, used to reset and destory the drawer instance
   */


  api.destroy = function () {
    // Clear our variables
    settings = null;
    drawers = null;
    switchDrawers = null;
    drawerState = {}; // Delete the local storage data

    localStorage.removeItem('drawerState'); // Remove the drawer trigger event listener

    document.removeEventListener('click', trigger, false);
  };
  /**
   * Public method to open a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.open = function (selector) {
    selector = selector ? selector : '.' + settings.classTarget;
    toggle(document.querySelectorAll(selector), 'open');
  };
  /**
   * Public method to close a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.close = function (selector) {
    selector = selector ? selector : '.' + settings.classTarget;
    toggle(document.querySelectorAll(selector), 'close');
  };
  /**
   * Public method to toggle a drawer or group of drawers
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.toggle = function (selector) {
    selector = selector ? selector : '.' + settings.classTarget;
    toggle(document.querySelectorAll(selector));
  };
  /**
   * Public method to switch a drawer into modal
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.switchDrawer = function (selector) {
    // Use default selector if one isn't passed
    selector = selector ? selector : settings["switch"]; // Query our elements using the provided selector

    var items = document.querySelectorAll(selector); // Convert to array if only one drawer is passed

    items = items.forEach ? items : _utility["default"].toArray(items);
    items.forEach(function (item) {
      switchDrawer(item);
    });
  };
  /**
   * Public method to switch a drawer into modal
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.switchModal = function (selector) {
    // Use default selector if one isn't passed
    selector = selector ? selector : settings["switch"]; // Query our elements using the provided selector

    var items = document.querySelectorAll(selector); // Convert to array if only one drawer is passed

    items = items.forEach ? items : _utility["default"].toArray(items);
    items.forEach(function (item) {
      switchModal(item);
    });
  };
  /**
   * Save the drawer current drawer state
   */


  api.stateSave = function () {
    stateSave();
  };
  /**
   * Return to drawer default state
   */


  api.stateReset = function () {
    stateReset();
  };
  /**
   * Private function to close a drawer or group of drawers
   * ---
   * @param {Node} drawer - The drawer element(s) to close
   * @param {String} state - Whether to open, close or toggle the drawer(s)
   * @param {Function} callback - The callback function
   */


  var toggle = function toggle(drawer, state, callback) {
    // Check if drawer(s) should be opened, closed or toggled and either add or
    // remove the active class to the passed drawer(s)
    if (state === 'open') {
      _utility["default"].addClass(drawer, settings.classActive);
    } else if (state === 'close') {
      _utility["default"].removeClass(drawer, settings.classActive);
    } else {
      _utility["default"].toggleClass(drawer, settings.classActive);
    } // Check if save state is enabled


    if (settings.saveState) {
      stateSave(drawer);
    } // Fire the callback function if one was passed


    typeof callback === 'function' && callback();
  };
  /**
   * Private function to toggle drawer via a trigger
   */


  var trigger = function trigger() {
    // Get the closest trigger element from the click event
    var trigger = event.target.closest('.' + settings.classTrigger); // Check that the class trigger was clicked

    if (trigger) {
      // Get the drawer selector from the trigger via [data-target]
      var dataDrawer = trigger.dataset.target; // Check that a drawer target was given

      if (dataDrawer) {
        // Query the drawer element and toggle it if it exists
        var drawer = document.querySelectorAll(dataDrawer);

        if (drawer.length) {
          toggle(drawer);
        }
      }
    }
  };
  /**
   * Private function that initializes the save state functionality
   * ---
   * @param {Function} callback - The callback function
   */


  var initSaveState = function initSaveState(callback) {
    // Check if a drawer state is already saved in local storage and save the
    // json parsed data to our local variable if it does
    if (localStorage.getItem('drawerState')) {
      drawerState = JSON.parse(localStorage.getItem('drawerState'));
    } // Loop through all drawers


    drawers.forEach(function (drawer) {
      // Set the default state if one is not set
      if (drawer.id in drawerState === false) {
        stateSave(drawer);
      } // Get our drawer dialog element


      var dialog = drawer.querySelector('.' + settings.classInner); // Transition delay: disables transitions as default states are being set

      var transitionDelay = function transitionDelay() {
        if (dialog) {
          _utility["default"].addClass(dialog, settings.classTransitionNone);

          setTimeout(function () {
            _utility["default"].removeClass(dialog, settings.classTransitionNone);
          }, settings.transitionDuration);
        }
      }; // Toggle our drawer state based on the saved state


      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close', transitionDelay);
      } else if (drawerState[drawer.id]) {
        toggle(drawer, 'open', transitionDelay);
      }
    }); // Fire the callback function if one was passed and return our state object

    typeof callback === 'function' && callback(drawerState);
  };
  /**
   * Private function that saves the state of a specific or all drawers
   * ---
   * @param {Node} items - The drawer element(s) to save state
   */


  var stateSave = function stateSave(items) {
    // Save all drawers if an items arg wasn't passed
    items = items ? items : drawers; // Convert to array if only one drawer is passed

    items = items.forEach ? items : _utility["default"].toArray(items); // Loop through our drawers and save their new state to local storage

    items.forEach(function (item) {
      // Only save drawer state if an id exists
      if (item.id) {
        drawerState[item.id] = _utility["default"].hasClass(item, settings.classActive);
        localStorage.setItem('drawerState', JSON.stringify(drawerState));
      }
    });
  };
  /**
   * Private function that clears the drawer state
   */


  var stateReset = function stateReset() {
    // Reset our local drawer state variable and delete the local storage data
    drawerState = {};
    localStorage.removeItem('drawerState');
  };
  /**
   * Private function that initializes the switch functionality
   */


  var initSwitch = function initSwitch() {
    // Query all the drawers with the switch feature enabled
    switchDrawers = document.querySelectorAll(settings["switch"]); // Loop through the switch drawers

    switchDrawers.forEach(function (drawer) {
      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      var cleanSelector = settings["switch"].replace('[', '').replace(']', '').replace('data-', ''); // Convert sring to camelCase

      cleanSelector = cleanSelector.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }); // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings

      var bp = drawer.dataset[cleanSelector];

      if (bp) {
        bp = _utility["default"].getBreakpoint(bp);

        if (!bp) {
          bp = drawer.dataset[cleanSelector];
        }
      } else {
        bp = _utility["default"].getBreakpoint(settings.switchBreakpoint);

        if (!bp) {
          bp = settings.switchBreakpoint;
        }
      } // Media query listener


      var mq = window.matchMedia("(min-width:" + bp + ")");
      mq.addListener(function (mq) {
        switchCheck(mq, drawer);
      });
      switchCheck(mq, drawer);
    });
  };
  /**
   * Private function that checks when a media query hits a match and switches
   * the component from drawer to modal as needed
   * ---
   * @param {MediaQueryList} mq - The MediaQueryList object for the media query
   * @param {Node} drawer - The drawer element to switch
   */


  var switchCheck = function switchCheck(mq, drawer) {
    if (mq.matches) {
      switchDrawer(drawer);
    } else {
      switchModal(drawer);
    }
  };
  /**
   * Private function that switches a modal into a drawer component
   * ---
   * @param {Node} drawer - The element to switch
   */


  var switchDrawer = function switchDrawer(drawer) {
    // Get the dialog and trigger elements related to this component
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]'); // Switch the modal component to drawer

    drawer.className = drawer.className.replace(new RegExp(settings.classTargetSwitch, 'gi'), settings.classTarget);
    dialog.className = dialog.className.replace(new RegExp(settings.classInnerSwitch, 'gi'), settings.classInner);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(new RegExp(settings.classTriggerSwitch, 'gi'), settings.classTrigger);
    }); // Open or close drawer based on save state

    if (settings.saveState) {
      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close');
      } else {
        toggle(drawer, 'open');
      }
    }
  };
  /**
   * Private function that switches a drawer into a modal component
   * ---
   * @param {Node} drawer - The element to switch
   */


  var switchModal = function switchModal(drawer) {
    // Get the dialog and trigger elements related to this component
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]'); // Switch the drawer component to modal

    drawer.className = drawer.className.replace(new RegExp(settings.classTarget, 'gi'), settings.classTargetSwitch);
    dialog.className = dialog.className.replace(new RegExp(settings.classInner, 'gi'), settings.classInnerSwitch);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(new RegExp(settings.classTrigger, 'gi'), settings.classTriggerSwitch);
    }); // Remove active class for modal styles by default

    _utility["default"].removeClass(drawer, settings.classActive);
  };
  /**
   *
   */
  // Run the constructor method


  api.init(options); // Return the API for running public methods

  return api;
}

},{"./utility.js":27}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Modal plugin
 * ---
 * A component for changing the mode of a page to complete a critical task.
 * This is usually used in conjunction with the Dialog component to make
 * modal dialogs.
 */
function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    classTarget: 'modal',
    classTrigger: 'modal__trigger',
    classInner: 'modal__dialog',
    classActive: 'is-active',
    focus: '[data-focus]'
  };
  var memoryTrigger;
  var memoryTarget;

  api.init = function (options) {
    settings = _utility["default"].extend(defaults, options || {});
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

  api.open = function (selector) {
    open(document.querySelectorAll(selector));
  };

  api.close = function (clear) {
    close(clear);
  };

  var open = function open(target) {
    _utility["default"].addClass(target, settings.classActive);

    if (target.length === 1) {
      target = target.item(0);
      var focus = target.querySelector(settings.focus);
      target.addEventListener('transitionend', function _listener() {
        if (focus) {
          focus.focus();
        } else {
          target.focus();
        }

        this.removeEventListener('transitionend', _listener, true);
      }, true);
    }
  };

  var close = function close() {
    var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var target = document.querySelectorAll('.' + settings.classTarget);

    _utility["default"].removeClass(target, settings.classActive);

    if (clear == false && memoryTrigger && memoryTarget) {
      if (memoryTarget.length === 1) {
        memoryTarget = memoryTarget.item(0);
        memoryTarget.addEventListener('transitionend', function _listener() {
          if (memoryTrigger) {
            memoryTrigger.focus();
          }

          memoryTarget = null;
          memoryTrigger = null;
          this.removeEventListener('transitionend', _listener, true);
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
    var target = event.target.closest('.' + settings.classTarget);
    var trigger = event.target.closest('.' + settings.classTrigger);
    var inner = event.target.closest('.' + settings.classInner);

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
}

},{"./utility.js":27}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utility = _interopRequireDefault(require("./utility.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    trigger: '[data-toggle-class]',
    targets: '',
    "class": ''
  };

  api.init = function (options) {
    settings = _utility["default"].extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
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
          _utility["default"].toggleClass(target, trigger.dataset.toggleClass.split(' '));
        });
      } else {
        if (settings["class"]) {
          _utility["default"].toggleClass(trigger, settings["class"]);
        } else {
          _utility["default"].toggleClass(trigger, trigger.dataset.toggleClass.split(' '));
        }
      }

      event.preventDefault();
    }
  };

  api.init(options);
  return api;
}

},{"./utility.js":27}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Utility
 * ---
 * A set of helper methods for general javascript plugin use.
 */
var _default =
/*#__PURE__*/
function () {
  function _default() {
    _classCallCheck(this, _default);
  }

  _createClass(_default, null, [{
    key: "getBreakpoint",

    /**
     * Get and output a breakpoint using it's key found in config.json
     * ---
     * @param {String} key - The key to search for in the breakpoints object
     * @returns {String} - The pixel value of the breakpoint as a string
     */
    value: function getBreakpoint(key) {
      return _config["default"].breakpoints[key];
    }
    /**
     * Checks if an element has a class or not
     * ---
     * @param {Node} el - Element(s) to check class(es) on
     * @param {String || Array} c - Class(es) to check
     * @returns {Boolean} - Returns true if class exists, otherwise false
     */

  }, {
    key: "hasClass",
    value: function hasClass(el, c) {
      el = el.forEach ? el : this.toArray(el);
      c = this.toArray(c);
      return c.some(function (c) {
        var has = false;
        el.forEach(function (el) {
          if (el.classList.contains(c)) {
            has = true;
          }
        });
        return has;
      });
    }
    /**
     * Adds a class or classes to an element
     * ---
     * @param {Node} el - Element(s) to add class(es) on
     * @param {String || Array} c - Class(es) to add
     */

  }, {
    key: "addClass",
    value: function addClass(el, c) {
      el = el.forEach ? el : this.toArray(el);
      c = this.toArray(c);
      el.forEach(function (el) {
        c.forEach(function (c) {
          el.classList.add(c);
        });
      });
    }
    /**
     * Remove a class or classes from an element
     * ---
     * @param {Node} el - Element(s) to remove class(es) from
     * @param {String || Array} c - Class(es) to remove
     */

  }, {
    key: "removeClass",
    value: function removeClass(el, c) {
      el = el.forEach ? el : this.toArray(el);
      c = this.toArray(c);
      el.forEach(function (el) {
        c.forEach(function (c) {
          el.classList.remove(c);
        });
      });
    }
    /**
     * Toggle a class or classes on an element
     * ---
     * @param {Node} el - Element(s) to toggle class(es) on
     * @param {String || Array} c - Class(es) to toggle
     */

  }, {
    key: "toggleClass",
    value: function toggleClass(el, c) {
      el = el.forEach ? el : this.toArray(el);
      c = this.toArray(c);
      el.forEach(function (el) {
        c.forEach(function (c) {
          el.classList.toggle(c);
        });
      });
    }
    /**
     * Find the closest parent element based on class. This is different from the
     * native .closest() method in that it doesn't check the current element.
     * ---
     * @param {Node} el - Element to start search on
     * @param {String || Array} c - Class(es) to check for
     * @return {Node} - Closest parent element
     */

  }, {
    key: "closest",
    value: function closest(el, c) {
      while ((el = el.parentElement) && !this.hasClass(el, c)) {
        return el;
      }
    }
    /**
     * Converts a string or object to an array. If an array is passed, it's
     * returned as is. Anything else is returned as an array.
     * ---
     * @param {Object} item - String or object to convert to an array
     * @return {Array} - Return the converted array
     */

  }, {
    key: "toArray",
    value: function toArray(item) {
      var array = [];

      if (Array.isArray(item)) {
        array = item;
      } else {
        array.push(item);
      }

      return array;
    }
    /**
     * Merge two or more objects. Returns a new object. Set the first argument
     * to `true` for a deep or recursive merge.
     * ---
     * @param {Boolean} [Optional] - If true, do a deep (or recursive) merge
     * @param {Object} - The objects to merge together; each overriding the next
     * @returns {Object} - Merged values of defaults and options
     */

  }, {
    key: "extend",
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

  return _default;
}();

exports["default"] = _default;

},{"config":22}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9jb25maWcuanNvbiIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9kcmF3ZXIuanMiLCIuLi9zcmMvanMvbW9kYWwuanMiLCIuLi9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vc3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBSixFQUFwQjtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUNBLElBQU0sS0FBSyxHQUFHLElBQUksaUJBQUosRUFBZDtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUVBOzs7O0FBSUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQVc7QUFFNUM7QUFDQSxNQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBcEI7O0FBRUEsTUFBSSxvQkFBRSxRQUFGLENBQVcsT0FBWCxFQUFvQixjQUFwQixDQUFKLEVBQXlDO0FBQ3ZDLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsSUFBQSxNQUFNLENBQUMsSUFBUDtBQUNEOztBQUVELE1BQUksb0JBQUUsUUFBRixDQUFXLE9BQVgsRUFBb0IsaUJBQXBCLENBQUosRUFBNEM7QUFDMUMsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFaO0FBQ0EsSUFBQSxNQUFNLENBQUMsT0FBUDtBQUNEOztBQUVELE1BQUksb0JBQUUsUUFBRixDQUFXLE9BQVgsRUFBb0IsY0FBcEIsQ0FBSixFQUF5QztBQUN2QyxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWjtBQUNBLElBQUEsTUFBTSxDQUFDLElBQVA7QUFDRDs7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QUMsRUFBckIsRUFBMEI7QUFDeEIsWUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUQsQ0FBbkI7QUFDQSxRQUFBLEtBQUssQ0FBQyxHQUFELENBQUw7QUFDRDs7QUFFRCxhQUFPLFFBQVA7QUFDRCxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHUgZnJvbSAndXRpbGl0eSdcbmltcG9ydCBEaXNtaXNzaWJsZSBmcm9tICdkaXNtaXNzaWJsZSdcbmltcG9ydCBEcmF3ZXIgZnJvbSAnZHJhd2VyJ1xuaW1wb3J0IE1vZGFsIGZyb20gJ21vZGFsJ1xuaW1wb3J0IFRvZ2dsZSBmcm9tICd0b2dnbGUnXG5pbXBvcnQgbGlzdGpzIGZyb20gJ2xpc3QuanMnXG5cbmNvbnN0IGRpc21pc3NpYmxlID0gbmV3IERpc21pc3NpYmxlKClcbmNvbnN0IGRyYXdlciA9IG5ldyBEcmF3ZXIoKVxuY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoKVxuY29uc3QgdG9nZ2xlID0gbmV3IFRvZ2dsZSgpXG5cbi8qKlxuICogR2VuZXJhbCBldmVudCB0cmlnZ2VyIGZvciB0ZXN0aW5nXG4gKi9cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAvLyBHZXQgdGhlIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50XG4gIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0taW5pdCcpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5pbml0KCknKVxuICAgIGRyYXdlci5pbml0KClcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLWRlc3Ryb3knKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuZGVzdHJveSgpJylcbiAgICBkcmF3ZXIuZGVzdHJveSgpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1vcGVuJykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLm9wZW4oKScpXG4gICAgZHJhd2VyLm9wZW4oKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tY2xvc2UnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuY2xvc2UoKScpXG4gICAgZHJhd2VyLmNsb3NlKClcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLXRvZ2dsZScpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci50b2dnbGUoKScpXG4gICAgZHJhd2VyLnRvZ2dsZSgpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS10b2dnbGUtZXhhbXBsZScpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci50b2dnbGUoXCIjZHJhd2VyLWV4YW1wbGVcIiknKVxuICAgIGRyYXdlci50b2dnbGUoJyNkcmF3ZXItZXhhbXBsZScpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1zd2l0Y2gtZHJhd2VyJykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLnN3aXRjaERyYXdlcigpJylcbiAgICBkcmF3ZXIuc3dpdGNoRHJhd2VyKClcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLXN3aXRjaC1tb2RhbCcpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5zd2l0Y2hNb2RhbCgpJylcbiAgICBkcmF3ZXIuc3dpdGNoTW9kYWwoKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tcmVzZXQnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuc3RhdGVSZXNldCgpJylcbiAgICBkcmF3ZXIuc3RhdGVSZXNldCgpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1zYXZlJykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLnN0YXRlU2F2ZSgpJylcbiAgICBkcmF3ZXIuc3RhdGVTYXZlKClcbiAgfVxuXG59KVxuXG4vKipcbiAqIExpc3QuanNcbiAqIC0tLVxuICogQWRkcyBsaXN0IGZ1bmN0aW9uYWxpdHkgYWxvbmcgd2l0aCBzZWFyY2guXG4gKiBsaXN0LmpzIGRvY3M6IGh0dHA6Ly9saXN0anMuY29tL1xuICovXG5pZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3RqcycpKSB7XG5cbiAgLy8gSW5pdCBvdXIgbGlzdC5qcyBjb21wb25lbnRcbiAgY29uc3QgbGlzdCA9IG5ldyBsaXN0anMoJ2xpc3RqcycsIHtcbiAgICBmdXp6eVNlYXJjaDoge1xuICAgICAgc2VhcmNoQ2xhc3M6ICdzZWFyY2gnLFxuICAgICAgbG9jYXRpb246IDAsXG4gICAgICBkaXN0YW5jZTogMTAwLFxuICAgICAgdGhyZXNob2xkOiAwLjQsXG4gICAgICBtdWx0aVNlYXJjaDogdHJ1ZVxuICAgIH0sXG4gICAgdmFsdWVOYW1lczogW1xuICAgICAgJ25hbWUnLFxuICAgICAgeyBkYXRhOiBbJ2NhdGVnb3J5J10gfVxuICAgIF0sXG4gICAgbGlzdENsYXNzOiAnbWVudSdcbiAgfSlcblxuICAvLyBFbXB0eSBOb3RpY2VcbiAgLy8gRGlzcGxheWVkIHdoZW4gdGhlIHNlYXJjaCByZXR1cm5zIG5vIHJlc3VsdHNcbiAgbGV0IG5vdGljZV9lbXB0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RpY2VfZW1wdHknKVxuICBsZXQgbm90aWNlX2VtcHR5X3RleHQgPSBub3RpY2VfZW1wdHkucXVlcnlTZWxlY3RvcignLnNlYXJjaF90ZXh0JylcblxuICAvLyBDbGVhciBzZWFyY2ggYnV0dG9uXG4gIGxldCBmaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyJylcbiAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIgLnNlYXJjaCcpXG4gIGxldCBzZWFyY2hfY2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyIC5zZWFyY2hfY2xlYXInKVxuXG4gIC8vIE9uIHNlYXJjaCBjb21wbGV0ZSBjYWxsYmFja1xuICBsaXN0Lm9uKCdzZWFyY2hDb21wbGV0ZScsICgpID0+IHtcblxuICAgIC8vIFVwZGF0ZSB0aGUgc2VhcmNoIHRleHQgaW4gZW1wdHkgbm90aWNlXG4gICAgbGV0IHZhbHVlID0gc2VhcmNoLnZhbHVlXG4gICAgbm90aWNlX2VtcHR5X3RleHQuaW5uZXJIVE1MID0gdmFsdWVcblxuICAgIC8vIFNob3cgY2xlYXIgc2VhcmNoIGJ1dHRvbiBpZiBhIHZhbHVlIHRoZXJlIGlzIHNvbWV0aGluZyBpbiBzZWFyY2hcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHUuYWRkQ2xhc3MoZmlsdGVyLCAnaXMtYWN0aXZlJylcbiAgICAgIHUuYWRkQ2xhc3Moc2VhcmNoLCAnaXMtYWN0aXZlJylcbiAgICAgIHUucmVtb3ZlQ2xhc3Moc2VhcmNoX2NsZWFyLCAnZF9ub25lJylcbiAgICB9IGVsc2Uge1xuICAgICAgdS5yZW1vdmVDbGFzcyhmaWx0ZXIsICdpcy1hY3RpdmUnKVxuICAgICAgdS5yZW1vdmVDbGFzcyhzZWFyY2gsICdpcy1hY3RpdmUnKVxuICAgICAgdS5hZGRDbGFzcyhzZWFyY2hfY2xlYXIsICdkX25vbmUnKVxuICAgIH1cblxuICAgIC8vIFRvZ2dsZSBub3RpY2UgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2YgdmlzaWJsZSBpdGVtc1xuICAgIGlmIChsaXN0LnZpc2libGVJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICB1LmFkZENsYXNzKG5vdGljZV9lbXB0eSwgJ2Rfbm9uZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3Mobm90aWNlX2VtcHR5LCAnZF9ub25lJylcbiAgICB9XG4gIH0pXG5cbiAgLy8gQ2xpY2sgZXZlbnRzIGZvciBjYXRlZ29yeSBhbmQgY2xlYXJzXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyX3NlYXJjaF9jbGVhciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2VhcmNoX2NsZWFyJylcbiAgICBsZXQgdHJpZ2dlcl9zZWFyY2hfY2F0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5jYXRlZ29yeScpXG5cbiAgICBpZiAodHJpZ2dlcl9zZWFyY2hfY2xlYXIpIHtcbiAgICAgIHNlYXJjaC52YWx1ZSA9ICcnXG4gICAgICBsaXN0LnNlYXJjaCgpXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgaWYgKHRyaWdnZXJfc2VhcmNoX2NhdCkge1xuICAgICAgc2VhcmNoLnZhbHVlID0gdHJpZ2dlcl9zZWFyY2hfY2F0LmRhdGFzZXQuY2F0ZWdvcnlcbiAgICAgIGxpc3Quc2VhcmNoKHNlYXJjaC52YWx1ZSlcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgfSwgZmFsc2UpXG5cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgYWRkQXN5bmMgPSBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrLCBpdGVtcykge1xuICAgIHZhciB2YWx1ZXNUb0FkZCA9IHZhbHVlcy5zcGxpY2UoMCwgNTApO1xuICAgIGl0ZW1zID0gaXRlbXMgfHwgW107XG4gICAgaXRlbXMgPSBpdGVtcy5jb25jYXQobGlzdC5hZGQodmFsdWVzVG9BZGQpKTtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2ssIGl0ZW1zKTtcbiAgICAgIH0sIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnVwZGF0ZSgpO1xuICAgICAgY2FsbGJhY2soaXRlbXMpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGFkZEFzeW5jO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIC8vIEFkZCBoYW5kbGVyc1xuICBsaXN0LmhhbmRsZXJzLmZpbHRlclN0YXJ0ID0gbGlzdC5oYW5kbGVycy5maWx0ZXJTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5maWx0ZXJDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuZmlsdGVyQ29tcGxldGUgfHwgW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZpbHRlckZ1bmN0aW9uKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdmaWx0ZXJTdGFydCcpO1xuICAgIGxpc3QuaSA9IDE7IC8vIFJlc2V0IHBhZ2luZ1xuICAgIGxpc3QucmVzZXQuZmlsdGVyKCk7XG4gICAgaWYgKGZpbHRlckZ1bmN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxpc3QuZmlsdGVyZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5maWx0ZXJlZCA9IHRydWU7XG4gICAgICB2YXIgaXMgPSBsaXN0Lml0ZW1zO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gaXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGlzW2ldO1xuICAgICAgICBpZiAoZmlsdGVyRnVuY3Rpb24oaXRlbSkpIHtcbiAgICAgICAgICBpdGVtLmZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmZpbHRlcmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ2ZpbHRlckNvbXBsZXRlJyk7XG4gICAgcmV0dXJuIGxpc3QudmlzaWJsZUl0ZW1zO1xuICB9O1xufTtcbiIsIlxudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKSxcbiAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3V0aWxzL3RvLXN0cmluZycpLFxuICBnZXRCeUNsYXNzID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYnktY2xhc3MnKSxcbiAgZnV6enkgPSByZXF1aXJlKCcuL3V0aWxzL2Z1enp5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICBsb2NhdGlvbjogMCxcbiAgICBkaXN0YW5jZTogMTAwLFxuICAgIHRocmVzaG9sZDogMC40LFxuICAgIG11bHRpU2VhcmNoOiB0cnVlLFxuICAgIHNlYXJjaENsYXNzOiAnZnV6enktc2VhcmNoJ1xuICB9LCBvcHRpb25zKTtcblxuXG5cbiAgdmFyIGZ1enp5U2VhcmNoID0ge1xuICAgIHNlYXJjaDogZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBjb2x1bW5zKSB7XG4gICAgICAvLyBTdWJzdHJhY3QgYXJndW1lbnRzIGZyb20gdGhlIHNlYXJjaFN0cmluZyBvciBwdXQgc2VhcmNoU3RyaW5nIGFzIG9ubHkgYXJndW1lbnRcbiAgICAgIHZhciBzZWFyY2hBcmd1bWVudHMgPSBvcHRpb25zLm11bHRpU2VhcmNoID8gc2VhcmNoU3RyaW5nLnJlcGxhY2UoLyArJC8sICcnKS5zcGxpdCgvICsvKSA6IFtzZWFyY2hTdHJpbmddO1xuXG4gICAgICBmb3IgKHZhciBrID0gMCwga2wgPSBsaXN0Lml0ZW1zLmxlbmd0aDsgayA8IGtsOyBrKyspIHtcbiAgICAgICAgZnV6enlTZWFyY2guaXRlbShsaXN0Lml0ZW1zW2tdLCBjb2x1bW5zLCBzZWFyY2hBcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbTogZnVuY3Rpb24oaXRlbSwgY29sdW1ucywgc2VhcmNoQXJndW1lbnRzKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlYXJjaEFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZm91bmRBcmd1bWVudCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjb2x1bW5zLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBpZiAoZnV6enlTZWFyY2gudmFsdWVzKGl0ZW0udmFsdWVzKCksIGNvbHVtbnNbal0sIHNlYXJjaEFyZ3VtZW50c1tpXSkpIHtcbiAgICAgICAgICAgIGZvdW5kQXJndW1lbnQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighZm91bmRBcmd1bWVudCkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGl0ZW0uZm91bmQgPSBmb3VuZDtcbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24odmFsdWVzLCB2YWx1ZSwgc2VhcmNoQXJndW1lbnQpIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gdG9TdHJpbmcodmFsdWVzW3ZhbHVlXSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoZnV6enkodGV4dCwgc2VhcmNoQXJndW1lbnQsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cblxuICBldmVudHMuYmluZChnZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgb3B0aW9ucy5zZWFyY2hDbGFzcyksICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50OyAvLyBJRSBoYXZlIHNyY0VsZW1lbnRcbiAgICBsaXN0LnNlYXJjaCh0YXJnZXQudmFsdWUsIGZ1enp5U2VhcmNoLnNlYXJjaCk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbihzdHIsIGNvbHVtbnMpIHtcbiAgICBsaXN0LnNlYXJjaChzdHIsIGNvbHVtbnMsIGZ1enp5U2VhcmNoLnNlYXJjaCk7XG4gIH07XG59O1xuIiwidmFyIG5hdHVyYWxTb3J0ID0gcmVxdWlyZSgnc3RyaW5nLW5hdHVyYWwtY29tcGFyZScpLFxuICBnZXRCeUNsYXNzID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYnktY2xhc3MnKSxcbiAgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKSxcbiAgaW5kZXhPZiA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXgtb2YnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3V0aWxzL3RvLXN0cmluZycpLFxuICBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGdldEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWF0dHJpYnV0ZScpLFxuICB0b0FycmF5ID0gcmVxdWlyZSgnLi91dGlscy90by1hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlkLCBvcHRpb25zLCB2YWx1ZXMpIHtcblxuICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgaW5pdCxcbiAgICBJdGVtID0gcmVxdWlyZSgnLi9pdGVtJykoc2VsZiksXG4gICAgYWRkQXN5bmMgPSByZXF1aXJlKCcuL2FkZC1hc3luYycpKHNlbGYpLFxuICAgIGluaXRQYWdpbmF0aW9uID0gcmVxdWlyZSgnLi9wYWdpbmF0aW9uJykoc2VsZik7XG5cbiAgaW5pdCA9IHtcbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmxpc3RDbGFzcyAgICAgID0gXCJsaXN0XCI7XG4gICAgICBzZWxmLnNlYXJjaENsYXNzICAgID0gXCJzZWFyY2hcIjtcbiAgICAgIHNlbGYuc29ydENsYXNzICAgICAgPSBcInNvcnRcIjtcbiAgICAgIHNlbGYucGFnZSAgICAgICAgICAgPSAxMDAwMDtcbiAgICAgIHNlbGYuaSAgICAgICAgICAgICAgPSAxO1xuICAgICAgc2VsZi5pdGVtcyAgICAgICAgICA9IFtdO1xuICAgICAgc2VsZi52aXNpYmxlSXRlbXMgICA9IFtdO1xuICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zICA9IFtdO1xuICAgICAgc2VsZi5zZWFyY2hlZCAgICAgICA9IGZhbHNlO1xuICAgICAgc2VsZi5maWx0ZXJlZCAgICAgICA9IGZhbHNlO1xuICAgICAgc2VsZi5zZWFyY2hDb2x1bW5zICA9IHVuZGVmaW5lZDtcbiAgICAgIHNlbGYuaGFuZGxlcnMgICAgICAgPSB7ICd1cGRhdGVkJzogW10gfTtcbiAgICAgIHNlbGYudmFsdWVOYW1lcyAgICAgPSBbXTtcbiAgICAgIHNlbGYudXRpbHMgICAgICAgICAgPSB7XG4gICAgICAgIGdldEJ5Q2xhc3M6IGdldEJ5Q2xhc3MsXG4gICAgICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgICAgICBpbmRleE9mOiBpbmRleE9mLFxuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgdG9TdHJpbmc6IHRvU3RyaW5nLFxuICAgICAgICBuYXR1cmFsU29ydDogbmF0dXJhbFNvcnQsXG4gICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICAgIGdldEF0dHJpYnV0ZTogZ2V0QXR0cmlidXRlLFxuICAgICAgICB0b0FycmF5OiB0b0FycmF5XG4gICAgICB9O1xuXG4gICAgICBzZWxmLnV0aWxzLmV4dGVuZChzZWxmLCBvcHRpb25zKTtcblxuICAgICAgc2VsZi5saXN0Q29udGFpbmVyID0gKHR5cGVvZihpZCkgPT09ICdzdHJpbmcnKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSA6IGlkO1xuICAgICAgaWYgKCFzZWxmLmxpc3RDb250YWluZXIpIHsgcmV0dXJuOyB9XG4gICAgICBzZWxmLmxpc3QgICAgICAgPSBnZXRCeUNsYXNzKHNlbGYubGlzdENvbnRhaW5lciwgc2VsZi5saXN0Q2xhc3MsIHRydWUpO1xuXG4gICAgICBzZWxmLnBhcnNlICAgICAgICA9IHJlcXVpcmUoJy4vcGFyc2UnKShzZWxmKTtcbiAgICAgIHNlbGYudGVtcGxhdGVyICAgID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXInKShzZWxmKTtcbiAgICAgIHNlbGYuc2VhcmNoICAgICAgID0gcmVxdWlyZSgnLi9zZWFyY2gnKShzZWxmKTtcbiAgICAgIHNlbGYuZmlsdGVyICAgICAgID0gcmVxdWlyZSgnLi9maWx0ZXInKShzZWxmKTtcbiAgICAgIHNlbGYuc29ydCAgICAgICAgID0gcmVxdWlyZSgnLi9zb3J0Jykoc2VsZik7XG4gICAgICBzZWxmLmZ1enp5U2VhcmNoICA9IHJlcXVpcmUoJy4vZnV6enktc2VhcmNoJykoc2VsZiwgb3B0aW9ucy5mdXp6eVNlYXJjaCk7XG5cbiAgICAgIHRoaXMuaGFuZGxlcnMoKTtcbiAgICAgIHRoaXMuaXRlbXMoKTtcbiAgICAgIHRoaXMucGFnaW5hdGlvbigpO1xuXG4gICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH0sXG4gICAgaGFuZGxlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaGFuZGxlciBpbiBzZWxmLmhhbmRsZXJzKSB7XG4gICAgICAgIGlmIChzZWxmW2hhbmRsZXJdKSB7XG4gICAgICAgICAgc2VsZi5vbihoYW5kbGVyLCBzZWxmW2hhbmRsZXJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5wYXJzZShzZWxmLmxpc3QpO1xuICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNlbGYuYWRkKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwYWdpbmF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uID0gW3t9XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uWzBdID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbiA9IFtvcHRpb25zLnBhZ2luYXRpb25dO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG9wdGlvbnMucGFnaW5hdGlvbi5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgICAgaW5pdFBhZ2luYXRpb24ob3B0aW9ucy5wYWdpbmF0aW9uW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKlxuICAqIFJlLXBhcnNlIHRoZSBMaXN0LCB1c2UgaWYgaHRtbCBoYXZlIGNoYW5nZWRcbiAgKi9cbiAgdGhpcy5yZUluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5pdGVtcyAgICAgICAgICA9IFtdO1xuICAgIHNlbGYudmlzaWJsZUl0ZW1zICAgPSBbXTtcbiAgICBzZWxmLm1hdGNoaW5nSXRlbXMgID0gW107XG4gICAgc2VsZi5zZWFyY2hlZCAgICAgICA9IGZhbHNlO1xuICAgIHNlbGYuZmlsdGVyZWQgICAgICAgPSBmYWxzZTtcbiAgICBzZWxmLnBhcnNlKHNlbGYubGlzdCk7XG4gIH07XG5cbiAgdGhpcy50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIganNvbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAganNvbi5wdXNoKHNlbGYuaXRlbXNbaV0udmFsdWVzKCkpO1xuICAgIH1cbiAgICByZXR1cm4ganNvbjtcbiAgfTtcblxuXG4gIC8qXG4gICogQWRkIG9iamVjdCB0byBsaXN0XG4gICovXG4gIHRoaXMuYWRkID0gZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaykge1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgYWRkQXN5bmModmFsdWVzLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhZGRlZCA9IFtdLFxuICAgICAgbm90Q3JlYXRlID0gZmFsc2U7XG4gICAgaWYgKHZhbHVlc1swXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHZhbHVlcyA9IFt2YWx1ZXNdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSB2YWx1ZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBudWxsO1xuICAgICAgbm90Q3JlYXRlID0gKHNlbGYuaXRlbXMubGVuZ3RoID4gc2VsZi5wYWdlKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIGl0ZW0gPSBuZXcgSXRlbSh2YWx1ZXNbaV0sIHVuZGVmaW5lZCwgbm90Q3JlYXRlKTtcbiAgICAgIHNlbGYuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgIGFkZGVkLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIGFkZGVkO1xuICB9O1xuXG5cdHRoaXMuc2hvdyA9IGZ1bmN0aW9uKGksIHBhZ2UpIHtcblx0XHR0aGlzLmkgPSBpO1xuXHRcdHRoaXMucGFnZSA9IHBhZ2U7XG5cdFx0c2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gc2VsZjtcblx0fTtcblxuICAvKiBSZW1vdmVzIG9iamVjdCBmcm9tIGxpc3QuXG4gICogTG9vcHMgdGhyb3VnaCB0aGUgbGlzdCBhbmQgcmVtb3ZlcyBvYmplY3RzIHdoZXJlXG4gICogcHJvcGVydHkgXCJ2YWx1ZW5hbWVcIiA9PT0gdmFsdWVcbiAgKi9cbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbih2YWx1ZU5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgdmFyIGZvdW5kID0gMDtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChzZWxmLml0ZW1zW2ldLnZhbHVlcygpW3ZhbHVlTmFtZV0gPT0gdmFsdWUpIHtcbiAgICAgICAgc2VsZi50ZW1wbGF0ZXIucmVtb3ZlKHNlbGYuaXRlbXNbaV0sIG9wdGlvbnMpO1xuICAgICAgICBzZWxmLml0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICBpbC0tO1xuICAgICAgICBpLS07XG4gICAgICAgIGZvdW5kKys7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qIEdldHMgdGhlIG9iamVjdHMgaW4gdGhlIGxpc3Qgd2hpY2hcbiAgKiBwcm9wZXJ0eSBcInZhbHVlTmFtZVwiID09PSB2YWx1ZVxuICAqL1xuICB0aGlzLmdldCA9IGZ1bmN0aW9uKHZhbHVlTmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgbWF0Y2hlZEl0ZW1zID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHNlbGYuaXRlbXNbaV07XG4gICAgICBpZiAoaXRlbS52YWx1ZXMoKVt2YWx1ZU5hbWVdID09IHZhbHVlKSB7XG4gICAgICAgIG1hdGNoZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlZEl0ZW1zO1xuICB9O1xuXG4gIC8qXG4gICogR2V0IHNpemUgb2YgdGhlIGxpc3RcbiAgKi9cbiAgdGhpcy5zaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNlbGYuaXRlbXMubGVuZ3RoO1xuICB9O1xuXG4gIC8qXG4gICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSB0aGUgbGlzdFxuICAqL1xuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgc2VsZi50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICBzZWxmLml0ZW1zID0gW107XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHNlbGYuaGFuZGxlcnNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMub2ZmID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUgPSBzZWxmLmhhbmRsZXJzW2V2ZW50XTtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGUsIGNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpID0gc2VsZi5oYW5kbGVyc1tldmVudF0ubGVuZ3RoO1xuICAgIHdoaWxlKGktLSkge1xuICAgICAgc2VsZi5oYW5kbGVyc1tldmVudF1baV0oc2VsZik7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMucmVzZXQgPSB7XG4gICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG4gICAgICAgIGlsID0gaXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGlsLS0pIHtcbiAgICAgICAgaXNbaWxdLmZpbHRlcmVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuICAgIHNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuICAgICAgICBpbCA9IGlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpbC0tKSB7XG4gICAgICAgIGlzW2lsXS5mb3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcblx0XHRcdGlsID0gaXMubGVuZ3RoO1xuXG4gICAgc2VsZi52aXNpYmxlSXRlbXMgPSBbXTtcbiAgICBzZWxmLm1hdGNoaW5nSXRlbXMgPSBbXTtcbiAgICBzZWxmLnRlbXBsYXRlci5jbGVhcigpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWw7IGkrKykge1xuICAgICAgaWYgKGlzW2ldLm1hdGNoaW5nKCkgJiYgKChzZWxmLm1hdGNoaW5nSXRlbXMubGVuZ3RoKzEpID49IHNlbGYuaSAmJiBzZWxmLnZpc2libGVJdGVtcy5sZW5ndGggPCBzZWxmLnBhZ2UpKSB7XG4gICAgICAgIGlzW2ldLnNob3coKTtcbiAgICAgICAgc2VsZi52aXNpYmxlSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNbaV0ubWF0Y2hpbmcoKSkge1xuICAgICAgICBzZWxmLm1hdGNoaW5nSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICAgIGlzW2ldLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzW2ldLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VsZi50cmlnZ2VyKCd1cGRhdGVkJyk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgaW5pdC5zdGFydCgpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICByZXR1cm4gZnVuY3Rpb24oaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKSB7XG4gICAgdmFyIGl0ZW0gPSB0aGlzO1xuXG4gICAgdGhpcy5fdmFsdWVzID0ge307XG5cbiAgICB0aGlzLmZvdW5kID0gZmFsc2U7IC8vIFNob3cgaWYgbGlzdC5zZWFyY2hlZCA9PSB0cnVlIGFuZCB0aGlzLmZvdW5kID09IHRydWVcbiAgICB0aGlzLmZpbHRlcmVkID0gZmFsc2U7Ly8gU2hvdyBpZiBsaXN0LmZpbHRlcmVkID09IHRydWUgYW5kIHRoaXMuZmlsdGVyZWQgPT0gdHJ1ZVxuXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbihpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpIHtcbiAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG5vdENyZWF0ZSkge1xuICAgICAgICAgIGl0ZW0udmFsdWVzKGluaXRWYWx1ZXMsIG5vdENyZWF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS52YWx1ZXMoaW5pdFZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uZWxtID0gZWxlbWVudDtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGxpc3QudGVtcGxhdGVyLmdldChpdGVtLCBpbml0VmFsdWVzKTtcbiAgICAgICAgaXRlbS52YWx1ZXModmFsdWVzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy52YWx1ZXMgPSBmdW5jdGlvbihuZXdWYWx1ZXMsIG5vdENyZWF0ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvcih2YXIgbmFtZSBpbiBuZXdWYWx1ZXMpIHtcbiAgICAgICAgICBpdGVtLl92YWx1ZXNbbmFtZV0gPSBuZXdWYWx1ZXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdENyZWF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGxpc3QudGVtcGxhdGVyLnNldChpdGVtLCBpdGVtLnZhbHVlcygpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uX3ZhbHVlcztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnRlbXBsYXRlci5zaG93KGl0ZW0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QudGVtcGxhdGVyLmhpZGUoaXRlbSk7XG4gICAgfTtcblxuICAgIHRoaXMubWF0Y2hpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIChsaXN0LmZpbHRlcmVkICYmIGxpc3Quc2VhcmNoZWQgJiYgaXRlbS5mb3VuZCAmJiBpdGVtLmZpbHRlcmVkKSB8fFxuICAgICAgICAobGlzdC5maWx0ZXJlZCAmJiAhbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZpbHRlcmVkKSB8fFxuICAgICAgICAoIWxpc3QuZmlsdGVyZWQgJiYgbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZvdW5kKSB8fFxuICAgICAgICAoIWxpc3QuZmlsdGVyZWQgJiYgIWxpc3Quc2VhcmNoZWQpXG4gICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLnZpc2libGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoaXRlbS5lbG0gJiYgKGl0ZW0uZWxtLnBhcmVudE5vZGUgPT0gbGlzdC5saXN0KSkgPyB0cnVlIDogZmFsc2U7XG4gICAgfTtcblxuICAgIGluaXQoaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKTtcbiAgfTtcbn07XG4iLCJ2YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICBMaXN0ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgcmVmcmVzaCA9IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIG9wdGlvbnMpIHtcbiAgICB2YXIgaXRlbSxcbiAgICAgIGwgPSBsaXN0Lm1hdGNoaW5nSXRlbXMubGVuZ3RoLFxuICAgICAgaW5kZXggPSBsaXN0LmksXG4gICAgICBwYWdlID0gbGlzdC5wYWdlLFxuICAgICAgcGFnZXMgPSBNYXRoLmNlaWwobCAvIHBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgPSBNYXRoLmNlaWwoKGluZGV4IC8gcGFnZSkpLFxuICAgICAgaW5uZXJXaW5kb3cgPSBvcHRpb25zLmlubmVyV2luZG93IHx8IDIsXG4gICAgICBsZWZ0ID0gb3B0aW9ucy5sZWZ0IHx8IG9wdGlvbnMub3V0ZXJXaW5kb3cgfHwgMCxcbiAgICAgIHJpZ2h0ID0gb3B0aW9ucy5yaWdodCB8fCBvcHRpb25zLm91dGVyV2luZG93IHx8IDA7XG5cbiAgICByaWdodCA9IHBhZ2VzIC0gcmlnaHQ7XG5cbiAgICBwYWdpbmdMaXN0LmNsZWFyKCk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gcGFnZXM7IGkrKykge1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IChjdXJyZW50UGFnZSA9PT0gaSkgPyBcImFjdGl2ZVwiIDogXCJcIjtcblxuICAgICAgLy9jb25zb2xlLmxvZyhpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIChjdXJyZW50UGFnZSAtIGlubmVyV2luZG93KSwgKGN1cnJlbnRQYWdlICsgaW5uZXJXaW5kb3cpLCBjbGFzc05hbWUpO1xuXG4gICAgICBpZiAoaXMubnVtYmVyKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpKSB7XG4gICAgICAgIGl0ZW0gPSBwYWdpbmdMaXN0LmFkZCh7XG4gICAgICAgICAgcGFnZTogaSxcbiAgICAgICAgICBkb3R0ZWQ6IGZhbHNlXG4gICAgICAgIH0pWzBdO1xuICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgY2xhc3NlcyhpdGVtLmVsbSkuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkRXZlbnQoaXRlbS5lbG0sIGksIHBhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChpcy5kb3R0ZWQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgcGFnaW5nTGlzdC5zaXplKCkpKSB7XG4gICAgICAgIGl0ZW0gPSBwYWdpbmdMaXN0LmFkZCh7XG4gICAgICAgICAgcGFnZTogXCIuLi5cIixcbiAgICAgICAgICBkb3R0ZWQ6IHRydWVcbiAgICAgICAgfSlbMF07XG4gICAgICAgIGNsYXNzZXMoaXRlbS5lbG0pLmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgaXMgPSB7XG4gICAgbnVtYmVyOiBmdW5jdGlvbihpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICAgcmV0dXJuIHRoaXMubGVmdChpLCBsZWZ0KSB8fCB0aGlzLnJpZ2h0KGksIHJpZ2h0KSB8fCB0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdyk7XG4gICAgfSxcbiAgICBsZWZ0OiBmdW5jdGlvbihpLCBsZWZ0KSB7XG4gICAgICByZXR1cm4gKGkgPD0gbGVmdCk7XG4gICAgfSxcbiAgICByaWdodDogZnVuY3Rpb24oaSwgcmlnaHQpIHtcbiAgICAgIHJldHVybiAoaSA+IHJpZ2h0KTtcbiAgICB9LFxuICAgIGlubmVyV2luZG93OiBmdW5jdGlvbihpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgIHJldHVybiAoIGkgPj0gKGN1cnJlbnRQYWdlIC0gaW5uZXJXaW5kb3cpICYmIGkgPD0gKGN1cnJlbnRQYWdlICsgaW5uZXJXaW5kb3cpKTtcbiAgICB9LFxuICAgIGRvdHRlZDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5kb3R0ZWRMZWZ0KHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHx8ICh0aGlzLmRvdHRlZFJpZ2h0KHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkpO1xuICAgIH0sXG4gICAgZG90dGVkTGVmdDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgcmV0dXJuICgoaSA9PSAobGVmdCArIDEpKSAmJiAhdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpICYmICF0aGlzLnJpZ2h0KGksIHJpZ2h0KSk7XG4gICAgfSxcbiAgICBkb3R0ZWRSaWdodDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSB7XG4gICAgICBpZiAocGFnaW5nTGlzdC5pdGVtc1tjdXJyZW50UGFnZUl0ZW0tMV0udmFsdWVzKCkuZG90dGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoKGkgPT0gKHJpZ2h0KSkgJiYgIXRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSAmJiAhdGhpcy5yaWdodChpLCByaWdodCkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgYWRkRXZlbnQgPSBmdW5jdGlvbihlbG0sIGksIHBhZ2UpIHtcbiAgICAgZXZlbnRzLmJpbmQoZWxtLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICBsaXN0LnNob3coKGktMSkqcGFnZSArIDEsIHBhZ2UpO1xuICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBwYWdpbmdMaXN0ID0gbmV3IExpc3QobGlzdC5saXN0Q29udGFpbmVyLmlkLCB7XG4gICAgICBsaXN0Q2xhc3M6IG9wdGlvbnMucGFnaW5hdGlvbkNsYXNzIHx8ICdwYWdpbmF0aW9uJyxcbiAgICAgIGl0ZW06IFwiPGxpPjxhIGNsYXNzPSdwYWdlJyBocmVmPSdqYXZhc2NyaXB0OmZ1bmN0aW9uIFooKXtaPVxcXCJcXFwifVooKSc+PC9hPjwvbGk+XCIsXG4gICAgICB2YWx1ZU5hbWVzOiBbJ3BhZ2UnLCAnZG90dGVkJ10sXG4gICAgICBzZWFyY2hDbGFzczogJ3BhZ2luYXRpb24tc2VhcmNoLXRoYXQtaXMtbm90LXN1cHBvc2VkLXRvLWV4aXN0JyxcbiAgICAgIHNvcnRDbGFzczogJ3BhZ2luYXRpb24tc29ydC10aGF0LWlzLW5vdC1zdXBwb3NlZC10by1leGlzdCdcbiAgICB9KTtcblxuICAgIGxpc3Qub24oJ3VwZGF0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHJlZnJlc2gocGFnaW5nTGlzdCwgb3B0aW9ucyk7XG4gICAgfSk7XG4gICAgcmVmcmVzaChwYWdpbmdMaXN0LCBvcHRpb25zKTtcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgSXRlbSA9IHJlcXVpcmUoJy4vaXRlbScpKGxpc3QpO1xuXG4gIHZhciBnZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBub2RlcyA9IHBhcmVudC5jaGlsZE5vZGVzLFxuICAgICAgaXRlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBub2Rlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAvLyBPbmx5IHRleHRub2RlcyBoYXZlIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgIGlmIChub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaXRlbXMucHVzaChub2Rlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbiAgfTtcblxuICB2YXIgcGFyc2UgPSBmdW5jdGlvbihpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBpdGVtRWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGlzdC5pdGVtcy5wdXNoKG5ldyBJdGVtKHZhbHVlTmFtZXMsIGl0ZW1FbGVtZW50c1tpXSkpO1xuICAgIH1cbiAgfTtcbiAgdmFyIHBhcnNlQXN5bmMgPSBmdW5jdGlvbihpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpIHtcbiAgICB2YXIgaXRlbXNUb0luZGV4ID0gaXRlbUVsZW1lbnRzLnNwbGljZSgwLCA1MCk7IC8vIFRPRE86IElmIDwgMTAwIGl0ZW1zLCB3aGF0IGhhcHBlbnMgaW4gSUUgZXRjP1xuICAgIHBhcnNlKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgaWYgKGl0ZW1FbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXJzZUFzeW5jKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcyk7XG4gICAgICB9LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC51cGRhdGUoKTtcbiAgICAgIGxpc3QudHJpZ2dlcigncGFyc2VDb21wbGV0ZScpO1xuICAgIH1cbiAgfTtcblxuICBsaXN0LmhhbmRsZXJzLnBhcnNlQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnBhcnNlQ29tcGxldGUgfHwgW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtc1RvSW5kZXggPSBnZXRDaGlsZHJlbihsaXN0Lmxpc3QpLFxuICAgICAgdmFsdWVOYW1lcyA9IGxpc3QudmFsdWVOYW1lcztcblxuICAgIGlmIChsaXN0LmluZGV4QXN5bmMpIHtcbiAgICAgIHBhcnNlQXN5bmMoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2UoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICB9XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBpdGVtLFxuICAgIHRleHQsXG4gICAgY29sdW1ucyxcbiAgICBzZWFyY2hTdHJpbmcsXG4gICAgY3VzdG9tU2VhcmNoO1xuXG4gIHZhciBwcmVwYXJlID0ge1xuICAgIHJlc2V0TGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LmkgPSAxO1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICAgIGN1c3RvbVNlYXJjaCA9IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA9PSAyICYmIGFyZ3NbMV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBjb2x1bW5zID0gYXJnc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMiAmJiB0eXBlb2YoYXJnc1sxXSkgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGN1c3RvbVNlYXJjaCA9IGFyZ3NbMV07XG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDMpIHtcbiAgICAgICAgY29sdW1ucyA9IGFyZ3NbMV07XG4gICAgICAgIGN1c3RvbVNlYXJjaCA9IGFyZ3NbMl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0Q29sdW1uczogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAobGlzdC5pdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGlmIChjb2x1bW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1ucyA9IChsaXN0LnNlYXJjaENvbHVtbnMgPT09IHVuZGVmaW5lZCkgPyBwcmVwYXJlLnRvQXJyYXkobGlzdC5pdGVtc1swXS52YWx1ZXMoKSkgOiBsaXN0LnNlYXJjaENvbHVtbnM7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTZWFyY2hTdHJpbmc6IGZ1bmN0aW9uKHMpIHtcbiAgICAgIHMgPSBsaXN0LnV0aWxzLnRvU3RyaW5nKHMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBzID0gcy5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I10vZywgXCJcXFxcJCZcIik7IC8vIEVzY2FwZSByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVyc1xuICAgICAgc2VhcmNoU3RyaW5nID0gcztcbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIHRtcENvbHVtbiA9IFtdO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB2YWx1ZXMpIHtcbiAgICAgICAgdG1wQ29sdW1uLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG1wQ29sdW1uO1xuICAgIH1cbiAgfTtcbiAgdmFyIHNlYXJjaCA9IHtcbiAgICBsaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwLCBrbCA9IGxpc3QuaXRlbXMubGVuZ3RoOyBrIDwga2w7IGsrKykge1xuICAgICAgICBzZWFyY2guaXRlbShsaXN0Lml0ZW1zW2tdKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGl0ZW0uZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGNvbHVtbnMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICBpZiAoc2VhcmNoLnZhbHVlcyhpdGVtLnZhbHVlcygpLCBjb2x1bW5zW2pdKSkge1xuICAgICAgICAgIGl0ZW0uZm91bmQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbih2YWx1ZXMsIGNvbHVtbikge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eShjb2x1bW4pKSB7XG4gICAgICAgIHRleHQgPSBsaXN0LnV0aWxzLnRvU3RyaW5nKHZhbHVlc1tjb2x1bW5dKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoKHNlYXJjaFN0cmluZyAhPT0gXCJcIikgJiYgKHRleHQuc2VhcmNoKHNlYXJjaFN0cmluZykgPiAtMSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5yZXNldC5zZWFyY2goKTtcbiAgICAgIGxpc3Quc2VhcmNoZWQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNlYXJjaE1ldGhvZCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGxpc3QudHJpZ2dlcignc2VhcmNoU3RhcnQnKTtcblxuICAgIHByZXBhcmUucmVzZXRMaXN0KCk7XG4gICAgcHJlcGFyZS5zZXRTZWFyY2hTdHJpbmcoc3RyKTtcbiAgICBwcmVwYXJlLnNldE9wdGlvbnMoYXJndW1lbnRzKTsgLy8gc3RyLCBjb2xzfHNlYXJjaEZ1bmN0aW9uLCBzZWFyY2hGdW5jdGlvblxuICAgIHByZXBhcmUuc2V0Q29sdW1ucygpO1xuXG4gICAgaWYgKHNlYXJjaFN0cmluZyA9PT0gXCJcIiApIHtcbiAgICAgIHNlYXJjaC5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNlYXJjaGVkID0gdHJ1ZTtcbiAgICAgIGlmIChjdXN0b21TZWFyY2gpIHtcbiAgICAgICAgY3VzdG9tU2VhcmNoKHNlYXJjaFN0cmluZywgY29sdW1ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2gubGlzdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdzZWFyY2hDb21wbGV0ZScpO1xuICAgIHJldHVybiBsaXN0LnZpc2libGVJdGVtcztcbiAgfTtcblxuICBsaXN0LmhhbmRsZXJzLnNlYXJjaFN0YXJ0ID0gbGlzdC5oYW5kbGVycy5zZWFyY2hTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5zZWFyY2hDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuc2VhcmNoQ29tcGxldGUgfHwgW107XG5cbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNlYXJjaENsYXNzKSwgJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsIC8vIElFIGhhdmUgc3JjRWxlbWVudFxuICAgICAgYWxyZWFkeUNsZWFyZWQgPSAodGFyZ2V0LnZhbHVlID09PSBcIlwiICYmICFsaXN0LnNlYXJjaGVkKTtcbiAgICBpZiAoIWFscmVhZHlDbGVhcmVkKSB7IC8vIElmIG9uaW5wdXQgYWxyZWFkeSBoYXZlIHJlc2V0dGVkIHRoZSBsaXN0LCBkbyBub3RoaW5nXG4gICAgICBzZWFyY2hNZXRob2QodGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFVzZWQgdG8gZGV0ZWN0IGNsaWNrIG9uIEhUTUw1IGNsZWFyIGJ1dHRvblxuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc2VhcmNoQ2xhc3MpLCAnaW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBpZiAodGFyZ2V0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBzZWFyY2hNZXRob2QoJycpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHNlYXJjaE1ldGhvZDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgYnV0dG9ucyA9IHtcbiAgICBlbHM6IHVuZGVmaW5lZCxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBidXR0b25zLmVscy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidXR0b25zLmVsc1tpXSkucmVtb3ZlKCdhc2MnKTtcbiAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ1dHRvbnMuZWxzW2ldKS5yZW1vdmUoJ2Rlc2MnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldE9yZGVyOiBmdW5jdGlvbihidG4pIHtcbiAgICAgIHZhciBwcmVkZWZpbmVkT3JkZXIgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLW9yZGVyJyk7XG4gICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IFwiYXNjXCIgfHwgcHJlZGVmaW5lZE9yZGVyID09IFwiZGVzY1wiKSB7XG4gICAgICAgIHJldHVybiBwcmVkZWZpbmVkT3JkZXI7XG4gICAgICB9IGVsc2UgaWYgKGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmhhcygnZGVzYycpKSB7XG4gICAgICAgIHJldHVybiBcImFzY1wiO1xuICAgICAgfSBlbHNlIGlmIChsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5oYXMoJ2FzYycpKSB7XG4gICAgICAgIHJldHVybiBcImRlc2NcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImFzY1wiO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SW5TZW5zaXRpdmU6IGZ1bmN0aW9uKGJ0biwgb3B0aW9ucykge1xuICAgICAgdmFyIGluc2Vuc2l0aXZlID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1pbnNlbnNpdGl2ZScpO1xuICAgICAgaWYgKGluc2Vuc2l0aXZlID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRPcmRlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYnV0dG9ucy5lbHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICB2YXIgYnRuID0gYnV0dG9ucy5lbHNbaV07XG4gICAgICAgIGlmIChsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLXNvcnQnKSAhPT0gb3B0aW9ucy52YWx1ZU5hbWUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJlZGVmaW5lZE9yZGVyID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1vcmRlcicpO1xuICAgICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IFwiYXNjXCIgfHwgcHJlZGVmaW5lZE9yZGVyID09IFwiZGVzY1wiKSB7XG4gICAgICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBvcHRpb25zLm9yZGVyKSB7XG4gICAgICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5hZGQob3B0aW9ucy5vcmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmFkZChvcHRpb25zLm9yZGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgc29ydCA9IGZ1bmN0aW9uKCkge1xuICAgIGxpc3QudHJpZ2dlcignc29ydFN0YXJ0Jyk7XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcblxuICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF0uY3VycmVudFRhcmdldCB8fCBhcmd1bWVudHNbMF0uc3JjRWxlbWVudCB8fCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICBvcHRpb25zLnZhbHVlTmFtZSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKHRhcmdldCwgJ2RhdGEtc29ydCcpO1xuICAgICAgYnV0dG9ucy5nZXRJblNlbnNpdGl2ZSh0YXJnZXQsIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5vcmRlciA9IGJ1dHRvbnMuZ2V0T3JkZXIodGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXSB8fCBvcHRpb25zO1xuICAgICAgb3B0aW9ucy52YWx1ZU5hbWUgPSBhcmd1bWVudHNbMF07XG4gICAgICBvcHRpb25zLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCBcImFzY1wiO1xuICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9ICh0eXBlb2Ygb3B0aW9ucy5pbnNlbnNpdGl2ZSA9PSBcInVuZGVmaW5lZFwiKSA/IHRydWUgOiBvcHRpb25zLmluc2Vuc2l0aXZlO1xuICAgIH1cblxuICAgIGJ1dHRvbnMuY2xlYXIoKTtcbiAgICBidXR0b25zLnNldE9yZGVyKG9wdGlvbnMpO1xuXG5cbiAgICAvLyBjYXNlSW5zZW5zaXRpdmVcbiAgICAvLyBhbHBoYWJldFxuICAgIHZhciBjdXN0b21Tb3J0RnVuY3Rpb24gPSAob3B0aW9ucy5zb3J0RnVuY3Rpb24gfHwgbGlzdC5zb3J0RnVuY3Rpb24gfHwgbnVsbCksXG4gICAgICAgIG11bHRpID0gKChvcHRpb25zLm9yZGVyID09PSAnZGVzYycpID8gLTEgOiAxKSxcbiAgICAgICAgc29ydEZ1bmN0aW9uO1xuXG4gICAgaWYgKGN1c3RvbVNvcnRGdW5jdGlvbikge1xuICAgICAgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIHJldHVybiBjdXN0b21Tb3J0RnVuY3Rpb24oaXRlbUEsIGl0ZW1CLCBvcHRpb25zKSAqIG11bHRpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIHZhciBzb3J0ID0gbGlzdC51dGlscy5uYXR1cmFsU29ydDtcbiAgICAgICAgc29ydC5hbHBoYWJldCA9IGxpc3QuYWxwaGFiZXQgfHwgb3B0aW9ucy5hbHBoYWJldCB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghc29ydC5hbHBoYWJldCAmJiBvcHRpb25zLmluc2Vuc2l0aXZlKSB7XG4gICAgICAgICAgc29ydCA9IGxpc3QudXRpbHMubmF0dXJhbFNvcnQuY2FzZUluc2Vuc2l0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3J0KGl0ZW1BLnZhbHVlcygpW29wdGlvbnMudmFsdWVOYW1lXSwgaXRlbUIudmFsdWVzKClbb3B0aW9ucy52YWx1ZU5hbWVdKSAqIG11bHRpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBsaXN0Lml0ZW1zLnNvcnQoc29ydEZ1bmN0aW9uKTtcbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignc29ydENvbXBsZXRlJyk7XG4gIH07XG5cbiAgLy8gQWRkIGhhbmRsZXJzXG4gIGxpc3QuaGFuZGxlcnMuc29ydFN0YXJ0ID0gbGlzdC5oYW5kbGVycy5zb3J0U3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuc29ydENvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5zb3J0Q29tcGxldGUgfHwgW107XG5cbiAgYnV0dG9ucy5lbHMgPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNvcnRDbGFzcyk7XG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQoYnV0dG9ucy5lbHMsICdjbGljaycsIHNvcnQpO1xuICBsaXN0Lm9uKCdzZWFyY2hTdGFydCcsIGJ1dHRvbnMuY2xlYXIpO1xuICBsaXN0Lm9uKCdmaWx0ZXJTdGFydCcsIGJ1dHRvbnMuY2xlYXIpO1xuXG4gIHJldHVybiBzb3J0O1xufTtcbiIsInZhciBUZW1wbGF0ZXIgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBpdGVtU291cmNlLFxuICAgIHRlbXBsYXRlciA9IHRoaXM7XG5cbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBpdGVtU291cmNlID0gdGVtcGxhdGVyLmdldEl0ZW1Tb3VyY2UobGlzdC5pdGVtKTtcbiAgICBpZiAoaXRlbVNvdXJjZSkge1xuICAgICAgaXRlbVNvdXJjZSA9IHRlbXBsYXRlci5jbGVhclNvdXJjZUl0ZW0oaXRlbVNvdXJjZSwgbGlzdC52YWx1ZU5hbWVzKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jbGVhclNvdXJjZUl0ZW0gPSBmdW5jdGlvbihlbCwgdmFsdWVOYW1lcykge1xuICAgIGZvcih2YXIgaSA9IDAsIGlsID0gdmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgaWYgKHZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSB2YWx1ZU5hbWVzW2ldLmRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS0nK3ZhbHVlTmFtZXNbaV0uZGF0YVtqXSwgJycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZXNbaV0uYXR0ciAmJiB2YWx1ZU5hbWVzW2ldLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGVsLCB2YWx1ZU5hbWVzW2ldLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSh2YWx1ZU5hbWVzW2ldLmF0dHIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoZWwsIHZhbHVlTmFtZXNbaV0sIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIHRoaXMuZ2V0SXRlbVNvdXJjZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgbm9kZXMgPSBsaXN0Lmxpc3QuY2hpbGROb2RlcyxcbiAgICAgICAgaXRlbXMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbm9kZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAvLyBPbmx5IHRleHRub2RlcyBoYXZlIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgaWYgKG5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC88dHJbXFxzPl0vZy5leGVjKGl0ZW0pKSB7XG4gICAgICB2YXIgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgdGJvZHkuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgIHJldHVybiB0Ym9keS5maXJzdENoaWxkO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pbmRleE9mKFwiPFwiKSAhPT0gLTEpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdENoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc291cmNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGlzdC5pdGVtKTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICB0aGlzLmdldCA9IGZ1bmN0aW9uKGl0ZW0sIHZhbHVlTmFtZXMpIHtcbiAgICB0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pO1xuICAgIHZhciB2YWx1ZXMgPSB7fTtcbiAgICBmb3IodmFyIGkgPSAwLCBpbCA9IHZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIGlmICh2YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gdmFsdWVOYW1lc1tpXS5kYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXS5kYXRhW2pdXSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGl0ZW0uZWxtLCAnZGF0YS0nK3ZhbHVlTmFtZXNbaV0uZGF0YVtqXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lc1tpXS5hdHRyICYmIHZhbHVlTmFtZXNbaV0ubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZXNbaV0ubmFtZSwgdHJ1ZSk7XG4gICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldLm5hbWVdID0gZWxtID8gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoZWxtLCB2YWx1ZU5hbWVzW2ldLmF0dHIpIDogXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lc1tpXSwgdHJ1ZSk7XG4gICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldXSA9IGVsbSA/IGVsbS5pbm5lckhUTUwgOiBcIlwiO1xuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIHRoaXMuc2V0ID0gZnVuY3Rpb24oaXRlbSwgdmFsdWVzKSB7XG4gICAgdmFyIGdldFZhbHVlTmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGxpc3QudmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICAgIHZhciBkYXRhID0gbGlzdC52YWx1ZU5hbWVzW2ldLmRhdGE7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtqXSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBuYW1lIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGxpc3QudmFsdWVOYW1lc1tpXS5hdHRyICYmIGxpc3QudmFsdWVOYW1lc1tpXS5uYW1lICYmIGxpc3QudmFsdWVOYW1lc1tpXS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdC52YWx1ZU5hbWVzW2ldO1xuICAgICAgICB9IGVsc2UgaWYgKGxpc3QudmFsdWVOYW1lc1tpXSA9PT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0VmFsdWUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIHZhciB2YWx1ZU5hbWUgPSBnZXRWYWx1ZU5hbWUobmFtZSk7XG4gICAgICBpZiAoIXZhbHVlTmFtZSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgaWYgKHZhbHVlTmFtZS5kYXRhKSB7XG4gICAgICAgIGl0ZW0uZWxtLnNldEF0dHJpYnV0ZSgnZGF0YS0nK3ZhbHVlTmFtZS5kYXRhLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZS5hdHRyICYmIHZhbHVlTmFtZS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSh2YWx1ZU5hbWUuYXR0ciwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIGlmICghdGVtcGxhdGVyLmNyZWF0ZShpdGVtKSkge1xuICAgICAgZm9yKHZhciB2IGluIHZhbHVlcykge1xuICAgICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KHYpKSB7XG4gICAgICAgICAgc2V0VmFsdWUodiwgdmFsdWVzW3ZdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXRlbVNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgbGlzdCBuZWVkIHRvIGhhdmUgYXQgbGlzdCBvbmUgaXRlbSBvbiBpbml0IG90aGVyd2lzZSB5b3UnbGwgaGF2ZSB0byBhZGQgYSB0ZW1wbGF0ZS5cIik7XG4gICAgfVxuICAgIC8qIElmIGl0ZW0gc291cmNlIGRvZXMgbm90IGV4aXN0cywgdXNlIHRoZSBmaXJzdCBpdGVtIGluIGxpc3QgYXNcbiAgICBzb3VyY2UgZm9yIG5ldyBpdGVtcyAqL1xuICAgIHZhciBuZXdJdGVtID0gaXRlbVNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgbmV3SXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaXRlbS5lbG0gPSBuZXdJdGVtO1xuICAgIHRlbXBsYXRlci5zZXQoaXRlbSwgaXRlbS52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbS5wYXJlbnROb2RlID09PSBsaXN0Lmxpc3QpIHtcbiAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChpdGVtLmVsbSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNob3cgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgdGVtcGxhdGVyLmNyZWF0ZShpdGVtKTtcbiAgICBsaXN0Lmxpc3QuYXBwZW5kQ2hpbGQoaXRlbS5lbG0pO1xuICB9O1xuICB0aGlzLmhpZGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtICE9PSB1bmRlZmluZWQgJiYgaXRlbS5lbG0ucGFyZW50Tm9kZSA9PT0gbGlzdC5saXN0KSB7XG4gICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQoaXRlbS5lbG0pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIC8qIC5pbm5lckhUTUwgPSAnJzsgZnVja3MgdXAgSUUgKi9cbiAgICBpZiAobGlzdC5saXN0Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgd2hpbGUgKGxpc3QubGlzdC5jaGlsZE5vZGVzLmxlbmd0aCA+PSAxKVxuICAgICAge1xuICAgICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQobGlzdC5saXN0LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBpbml0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgcmV0dXJuIG5ldyBUZW1wbGF0ZXIobGlzdCk7XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBpbmRleCA9IHJlcXVpcmUoJy4vaW5kZXgtb2YnKTtcblxuLyoqXG4gKiBXaGl0ZXNwYWNlIHJlZ2V4cC5cbiAqL1xuXG52YXIgcmUgPSAvXFxzKy87XG5cbi8qKlxuICogdG9TdHJpbmcgcmVmZXJlbmNlLlxuICovXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogV3JhcCBgZWxgIGluIGEgYENsYXNzTGlzdGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsKXtcbiAgcmV0dXJuIG5ldyBDbGFzc0xpc3QoZWwpO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IENsYXNzTGlzdCBmb3IgYGVsYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBDbGFzc0xpc3QoZWwpIHtcbiAgaWYgKCFlbCB8fCAhZWwubm9kZVR5cGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgRE9NIGVsZW1lbnQgcmVmZXJlbmNlIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgdGhpcy5lbCA9IGVsO1xuICB0aGlzLmxpc3QgPSBlbC5jbGFzc0xpc3Q7XG59XG5cbi8qKlxuICogQWRkIGNsYXNzIGBuYW1lYCBpZiBub3QgYWxyZWFkeSBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24obmFtZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgdGhpcy5saXN0LmFkZChuYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSB0aGlzLmFycmF5KCk7XG4gIHZhciBpID0gaW5kZXgoYXJyLCBuYW1lKTtcbiAgaWYgKCF+aSkgYXJyLnB1c2gobmFtZSk7XG4gIHRoaXMuZWwuY2xhc3NOYW1lID0gYXJyLmpvaW4oJyAnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBjbGFzcyBgbmFtZWAgd2hlbiBwcmVzZW50LCBvclxuICogcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byByZW1vdmVcbiAqIGFueSB3aGljaCBtYXRjaC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihuYW1lKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICB0aGlzLmxpc3QucmVtb3ZlKG5hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAofmkpIGFyci5zcGxpY2UoaSwgMSk7XG4gIHRoaXMuZWwuY2xhc3NOYW1lID0gYXJyLmpvaW4oJyAnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogVG9nZ2xlIGNsYXNzIGBuYW1lYCwgY2FuIGZvcmNlIHN0YXRlIHZpYSBgZm9yY2VgLlxuICpcbiAqIEZvciBicm93c2VycyB0aGF0IHN1cHBvcnQgY2xhc3NMaXN0LCBidXQgZG8gbm90IHN1cHBvcnQgYGZvcmNlYCB5ZXQsXG4gKiB0aGUgbWlzdGFrZSB3aWxsIGJlIGRldGVjdGVkIGFuZCBjb3JyZWN0ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZm9yY2VcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbihuYW1lLCBmb3JjZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBmb3JjZSkge1xuICAgICAgaWYgKGZvcmNlICE9PSB0aGlzLmxpc3QudG9nZ2xlKG5hbWUsIGZvcmNlKSkge1xuICAgICAgICB0aGlzLmxpc3QudG9nZ2xlKG5hbWUpOyAvLyB0b2dnbGUgYWdhaW4gdG8gY29ycmVjdFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3QudG9nZ2xlKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgZm9yY2UpIHtcbiAgICBpZiAoIWZvcmNlKSB7XG4gICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQobmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh0aGlzLmhhcyhuYW1lKSkge1xuICAgICAgdGhpcy5yZW1vdmUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgY2xhc3Nlcy5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5hcnJheSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBjbGFzc05hbWUgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJztcbiAgdmFyIHN0ciA9IGNsYXNzTmFtZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIHZhciBhcnIgPSBzdHIuc3BsaXQocmUpO1xuICBpZiAoJycgPT09IGFyclswXSkgYXJyLnNoaWZ0KCk7XG4gIHJldHVybiBhcnI7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGNsYXNzIGBuYW1lYCBpcyBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuaGFzID1cbkNsYXNzTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHRoaXMubGlzdCA/IHRoaXMubGlzdC5jb250YWlucyhuYW1lKSA6ICEhIH5pbmRleCh0aGlzLmFycmF5KCksIG5hbWUpO1xufTtcbiIsInZhciBiaW5kID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuICAgIHVuYmluZCA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50JyxcbiAgICBwcmVmaXggPSBiaW5kICE9PSAnYWRkRXZlbnRMaXN0ZW5lcicgPyAnb24nIDogJycsXG4gICAgdG9BcnJheSA9IHJlcXVpcmUoJy4vdG8tYXJyYXknKTtcblxuLyoqXG4gKiBCaW5kIGBlbGAgZXZlbnQgYHR5cGVgIHRvIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbCwgTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uIG9yIEFycmF5XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FwdHVyZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBlbCA9IHRvQXJyYXkoZWwpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKyApIHtcbiAgICBlbFtpXVtiaW5kXShwcmVmaXggKyB0eXBlLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG4gIH1cbn07XG5cbi8qKlxuICogVW5iaW5kIGBlbGAgZXZlbnQgYHR5cGVgJ3MgY2FsbGJhY2sgYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsLCBOb2RlTGlzdCwgSFRNTENvbGxlY3Rpb24gb3IgQXJyYXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudW5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWwgPSB0b0FycmF5KGVsKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKysgKSB7XG4gICAgZWxbaV1bdW5iaW5kXShwcmVmaXggKyB0eXBlLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG4gIH1cbn07XG4iLCIvKlxuICogU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vc2VnbWVudGlvL2V4dGVuZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kIChvYmplY3QpIHtcbiAgICAvLyBUYWtlcyBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIGV4dGVuZGVycy5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICAvLyBGb3IgZWFjaCBleHRlbmRlciwgY29weSB0aGVpciBwcm9wZXJ0aWVzIG9uIG91ciBvYmplY3QuXG4gICAgZm9yICh2YXIgaSA9IDAsIHNvdXJjZTsgc291cmNlID0gYXJnc1tpXTsgaSsrKSB7XG4gICAgICAgIGlmICghc291cmNlKSBjb250aW51ZTtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBvYmplY3RbcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0ZXh0LCBwYXR0ZXJuLCBvcHRpb25zKSB7XG4gICAgLy8gQXByb3hpbWF0ZWx5IHdoZXJlIGluIHRoZSB0ZXh0IGlzIHRoZSBwYXR0ZXJuIGV4cGVjdGVkIHRvIGJlIGZvdW5kP1xuICAgIHZhciBNYXRjaF9Mb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gfHwgMDtcblxuICAgIC8vRGV0ZXJtaW5lcyBob3cgY2xvc2UgdGhlIG1hdGNoIG11c3QgYmUgdG8gdGhlIGZ1enp5IGxvY2F0aW9uIChzcGVjaWZpZWQgYWJvdmUpLiBBbiBleGFjdCBsZXR0ZXIgbWF0Y2ggd2hpY2ggaXMgJ2Rpc3RhbmNlJyBjaGFyYWN0ZXJzIGF3YXkgZnJvbSB0aGUgZnV6enkgbG9jYXRpb24gd291bGQgc2NvcmUgYXMgYSBjb21wbGV0ZSBtaXNtYXRjaC4gQSBkaXN0YW5jZSBvZiAnMCcgcmVxdWlyZXMgdGhlIG1hdGNoIGJlIGF0IHRoZSBleGFjdCBsb2NhdGlvbiBzcGVjaWZpZWQsIGEgdGhyZXNob2xkIG9mICcxMDAwJyB3b3VsZCByZXF1aXJlIGEgcGVyZmVjdCBtYXRjaCB0byBiZSB3aXRoaW4gODAwIGNoYXJhY3RlcnMgb2YgdGhlIGZ1enp5IGxvY2F0aW9uIHRvIGJlIGZvdW5kIHVzaW5nIGEgMC44IHRocmVzaG9sZC5cbiAgICB2YXIgTWF0Y2hfRGlzdGFuY2UgPSBvcHRpb25zLmRpc3RhbmNlIHx8IDEwMDtcblxuICAgIC8vIEF0IHdoYXQgcG9pbnQgZG9lcyB0aGUgbWF0Y2ggYWxnb3JpdGhtIGdpdmUgdXAuIEEgdGhyZXNob2xkIG9mICcwLjAnIHJlcXVpcmVzIGEgcGVyZmVjdCBtYXRjaCAob2YgYm90aCBsZXR0ZXJzIGFuZCBsb2NhdGlvbiksIGEgdGhyZXNob2xkIG9mICcxLjAnIHdvdWxkIG1hdGNoIGFueXRoaW5nLlxuICAgIHZhciBNYXRjaF9UaHJlc2hvbGQgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAwLjQ7XG5cbiAgICBpZiAocGF0dGVybiA9PT0gdGV4dCkgcmV0dXJuIHRydWU7IC8vIEV4YWN0IG1hdGNoXG4gICAgaWYgKHBhdHRlcm4ubGVuZ3RoID4gMzIpIHJldHVybiBmYWxzZTsgLy8gVGhpcyBhbGdvcml0aG0gY2Fubm90IGJlIHVzZWRcblxuICAgIC8vIFNldCBzdGFydGluZyBsb2NhdGlvbiBhdCBiZWdpbm5pbmcgdGV4dCBhbmQgaW5pdGlhbGlzZSB0aGUgYWxwaGFiZXQuXG4gICAgdmFyIGxvYyA9IE1hdGNoX0xvY2F0aW9uLFxuICAgICAgICBzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHEgPSB7fSxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHFbcGF0dGVybi5jaGFyQXQoaSldID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBxW3BhdHRlcm4uY2hhckF0KGkpXSB8PSAxIDw8IChwYXR0ZXJuLmxlbmd0aCAtIGkgLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHE7XG4gICAgICAgIH0oKSk7XG5cbiAgICAvLyBDb21wdXRlIGFuZCByZXR1cm4gdGhlIHNjb3JlIGZvciBhIG1hdGNoIHdpdGggZSBlcnJvcnMgYW5kIHggbG9jYXRpb24uXG4gICAgLy8gQWNjZXNzZXMgbG9jIGFuZCBwYXR0ZXJuIHRocm91Z2ggYmVpbmcgYSBjbG9zdXJlLlxuXG4gICAgZnVuY3Rpb24gbWF0Y2hfYml0YXBTY29yZV8oZSwgeCkge1xuICAgICAgICB2YXIgYWNjdXJhY3kgPSBlIC8gcGF0dGVybi5sZW5ndGgsXG4gICAgICAgICAgICBwcm94aW1pdHkgPSBNYXRoLmFicyhsb2MgLSB4KTtcblxuICAgICAgICBpZiAoIU1hdGNoX0Rpc3RhbmNlKSB7XG4gICAgICAgICAgICAvLyBEb2RnZSBkaXZpZGUgYnkgemVybyBlcnJvci5cbiAgICAgICAgICAgIHJldHVybiBwcm94aW1pdHkgPyAxLjAgOiBhY2N1cmFjeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdXJhY3kgKyAocHJveGltaXR5IC8gTWF0Y2hfRGlzdGFuY2UpO1xuICAgIH1cblxuICAgIHZhciBzY29yZV90aHJlc2hvbGQgPSBNYXRjaF9UaHJlc2hvbGQsIC8vIEhpZ2hlc3Qgc2NvcmUgYmV5b25kIHdoaWNoIHdlIGdpdmUgdXAuXG4gICAgICAgIGJlc3RfbG9jID0gdGV4dC5pbmRleE9mKHBhdHRlcm4sIGxvYyk7IC8vIElzIHRoZXJlIGEgbmVhcmJ5IGV4YWN0IG1hdGNoPyAoc3BlZWR1cClcblxuICAgIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBNYXRoLm1pbihtYXRjaF9iaXRhcFNjb3JlXygwLCBiZXN0X2xvYyksIHNjb3JlX3RocmVzaG9sZCk7XG4gICAgICAgIC8vIFdoYXQgYWJvdXQgaW4gdGhlIG90aGVyIGRpcmVjdGlvbj8gKHNwZWVkdXApXG4gICAgICAgIGJlc3RfbG9jID0gdGV4dC5sYXN0SW5kZXhPZihwYXR0ZXJuLCBsb2MgKyBwYXR0ZXJuLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKGJlc3RfbG9jICE9IC0xKSB7XG4gICAgICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBNYXRoLm1pbihtYXRjaF9iaXRhcFNjb3JlXygwLCBiZXN0X2xvYyksIHNjb3JlX3RocmVzaG9sZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXNlIHRoZSBiaXQgYXJyYXlzLlxuICAgIHZhciBtYXRjaG1hc2sgPSAxIDw8IChwYXR0ZXJuLmxlbmd0aCAtIDEpO1xuICAgIGJlc3RfbG9jID0gLTE7XG5cbiAgICB2YXIgYmluX21pbiwgYmluX21pZDtcbiAgICB2YXIgYmluX21heCA9IHBhdHRlcm4ubGVuZ3RoICsgdGV4dC5sZW5ndGg7XG4gICAgdmFyIGxhc3RfcmQ7XG4gICAgZm9yICh2YXIgZCA9IDA7IGQgPCBwYXR0ZXJuLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgIC8vIFNjYW4gZm9yIHRoZSBiZXN0IG1hdGNoOyBlYWNoIGl0ZXJhdGlvbiBhbGxvd3MgZm9yIG9uZSBtb3JlIGVycm9yLlxuICAgICAgICAvLyBSdW4gYSBiaW5hcnkgc2VhcmNoIHRvIGRldGVybWluZSBob3cgZmFyIGZyb20gJ2xvYycgd2UgY2FuIHN0cmF5IGF0IHRoaXNcbiAgICAgICAgLy8gZXJyb3IgbGV2ZWwuXG4gICAgICAgIGJpbl9taW4gPSAwO1xuICAgICAgICBiaW5fbWlkID0gYmluX21heDtcbiAgICAgICAgd2hpbGUgKGJpbl9taW4gPCBiaW5fbWlkKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCwgbG9jICsgYmluX21pZCkgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgYmluX21pbiA9IGJpbl9taWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJpbl9tYXggPSBiaW5fbWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmluX21pZCA9IE1hdGguZmxvb3IoKGJpbl9tYXggLSBiaW5fbWluKSAvIDIgKyBiaW5fbWluKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVc2UgdGhlIHJlc3VsdCBmcm9tIHRoaXMgaXRlcmF0aW9uIGFzIHRoZSBtYXhpbXVtIGZvciB0aGUgbmV4dC5cbiAgICAgICAgYmluX21heCA9IGJpbl9taWQ7XG4gICAgICAgIHZhciBzdGFydCA9IE1hdGgubWF4KDEsIGxvYyAtIGJpbl9taWQgKyAxKTtcbiAgICAgICAgdmFyIGZpbmlzaCA9IE1hdGgubWluKGxvYyArIGJpbl9taWQsIHRleHQubGVuZ3RoKSArIHBhdHRlcm4ubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZCA9IEFycmF5KGZpbmlzaCArIDIpO1xuICAgICAgICByZFtmaW5pc2ggKyAxXSA9ICgxIDw8IGQpIC0gMTtcbiAgICAgICAgZm9yICh2YXIgaiA9IGZpbmlzaDsgaiA+PSBzdGFydDsgai0tKSB7XG4gICAgICAgICAgICAvLyBUaGUgYWxwaGFiZXQgKHMpIGlzIGEgc3BhcnNlIGhhc2gsIHNvIHRoZSBmb2xsb3dpbmcgbGluZSBnZW5lcmF0ZXNcbiAgICAgICAgICAgIC8vIHdhcm5pbmdzLlxuICAgICAgICAgICAgdmFyIGNoYXJNYXRjaCA9IHNbdGV4dC5jaGFyQXQoaiAtIDEpXTtcbiAgICAgICAgICAgIGlmIChkID09PSAwKSB7ICAgIC8vIEZpcnN0IHBhc3M6IGV4YWN0IG1hdGNoLlxuICAgICAgICAgICAgICAgIHJkW2pdID0gKChyZFtqICsgMV0gPDwgMSkgfCAxKSAmIGNoYXJNYXRjaDtcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgIC8vIFN1YnNlcXVlbnQgcGFzc2VzOiBmdXp6eSBtYXRjaC5cbiAgICAgICAgICAgICAgICByZFtqXSA9ICgoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoKSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKGxhc3RfcmRbaiArIDFdIHwgbGFzdF9yZFtqXSkgPDwgMSkgfCAxKSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfcmRbaiArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJkW2pdICYgbWF0Y2htYXNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gbWF0Y2hfYml0YXBTY29yZV8oZCwgaiAtIDEpO1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgbWF0Y2ggd2lsbCBhbG1vc3QgY2VydGFpbmx5IGJlIGJldHRlciB0aGFuIGFueSBleGlzdGluZyBtYXRjaC5cbiAgICAgICAgICAgICAgICAvLyBCdXQgY2hlY2sgYW55d2F5LlxuICAgICAgICAgICAgICAgIGlmIChzY29yZSA8PSBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9sZCB5b3Ugc28uXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBiZXN0X2xvYyA9IGogLSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdF9sb2MgPiBsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gcGFzc2luZyBsb2MsIGRvbid0IGV4Y2VlZCBvdXIgY3VycmVudCBkaXN0YW5jZSBmcm9tIGxvYy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMSwgMiAqIGxvYyAtIGJlc3RfbG9jKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFscmVhZHkgcGFzc2VkIGxvYywgZG93bmhpbGwgZnJvbSBoZXJlIG9uIGluLlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm8gaG9wZSBmb3IgYSAoYmV0dGVyKSBtYXRjaCBhdCBncmVhdGVyIGVycm9yIGxldmVscy5cbiAgICAgICAgaWYgKG1hdGNoX2JpdGFwU2NvcmVfKGQgKyAxLCBsb2MpID4gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsYXN0X3JkID0gcmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIChiZXN0X2xvYyA8IDApID8gZmFsc2UgOiB0cnVlO1xufTtcbiIsIi8qKlxuICogQSBjcm9zcy1icm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGdldEF0dHJpYnV0ZS5cbiAqIFNvdXJjZSBmb3VuZCBoZXJlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zNzU1MzQzLzM2MTMzNyB3cml0dGVuIGJ5IFZpdmluIFBhbGlhdGhcbiAqXG4gKiBSZXR1cm4gdGhlIHZhbHVlIGZvciBgYXR0cmAgYXQgYGVsZW1lbnRgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwsIGF0dHIpIHtcbiAgdmFyIHJlc3VsdCA9IChlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKGF0dHIpKSB8fCBudWxsO1xuICBpZiggIXJlc3VsdCApIHtcbiAgICB2YXIgYXR0cnMgPSBlbC5hdHRyaWJ1dGVzO1xuICAgIHZhciBsZW5ndGggPSBhdHRycy5sZW5ndGg7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXR0cltpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmKGF0dHJbaV0ubm9kZU5hbWUgPT09IGF0dHIpIHtcbiAgICAgICAgICByZXN1bHQgPSBhdHRyW2ldLm5vZGVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuICogQSBjcm9zcy1icm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGdldEVsZW1lbnRzQnlDbGFzcy5cbiAqIEhlYXZpbHkgYmFzZWQgb24gRHVzdGluIERpYXoncyBmdW5jdGlvbjogaHR0cDovL2R1c3RpbmRpYXouY29tL2dldGVsZW1lbnRzYnljbGFzcy5cbiAqXG4gKiBGaW5kIGFsbCBlbGVtZW50cyB3aXRoIGNsYXNzIGBjbGFzc05hbWVgIGluc2lkZSBgY29udGFpbmVyYC5cbiAqIFVzZSBgc2luZ2xlID0gdHJ1ZWAgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UgaW4gb2xkZXIgYnJvd3NlcnNcbiAqIHdoZW4gb25seSBvbmUgZWxlbWVudCBpcyBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc2luZ2xlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnZhciBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICBpZiAoc2luZ2xlKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cbnZhciBxdWVyeVNlbGVjdG9yID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICBjbGFzc05hbWUgPSAnLicgKyBjbGFzc05hbWU7XG4gIGlmIChzaW5nbGUpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lKTtcbiAgfVxufTtcblxudmFyIHBvbHlmaWxsID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICB2YXIgY2xhc3NFbGVtZW50cyA9IFtdLFxuICAgIHRhZyA9ICcqJztcblxuICB2YXIgZWxzID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG4gIHZhciBlbHNMZW4gPSBlbHMubGVuZ3RoO1xuICB2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIitjbGFzc05hbWUrXCIoXFxcXHN8JClcIik7XG4gIGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IGVsc0xlbjsgaSsrKSB7XG4gICAgaWYgKCBwYXR0ZXJuLnRlc3QoZWxzW2ldLmNsYXNzTmFtZSkgKSB7XG4gICAgICBpZiAoc2luZ2xlKSB7XG4gICAgICAgIHJldHVybiBlbHNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGFzc0VsZW1lbnRzW2pdID0gZWxzW2ldO1xuICAgICAgICBqKys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGFzc0VsZW1lbnRzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKChvcHRpb25zLnRlc3QgJiYgb3B0aW9ucy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSB8fCAoIW9wdGlvbnMudGVzdCAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlDbGFzc05hbWUoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfSBlbHNlIGlmICgob3B0aW9ucy50ZXN0ICYmIG9wdGlvbnMucXVlcnlTZWxlY3RvcikgfHwgKCFvcHRpb25zLnRlc3QgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBxdWVyeVNlbGVjdG9yKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcG9seWZpbGwoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfVxuICB9O1xufSkoKTtcbiIsInZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIG9iail7XG4gIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCIvKipcbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3RpbW94bGV5L3RvLWFycmF5XG4gKlxuICogQ29udmVydCBhbiBhcnJheS1saWtlIG9iamVjdCBpbnRvIGFuIGBBcnJheWAuXG4gKiBJZiBgY29sbGVjdGlvbmAgaXMgYWxyZWFkeSBhbiBgQXJyYXlgLCB0aGVuIHdpbGwgcmV0dXJuIGEgY2xvbmUgb2YgYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkgfCBNaXhlZH0gY29sbGVjdGlvbiBBbiBgQXJyYXlgIG9yIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGNvbnZlcnQgZS5nLiBgYXJndW1lbnRzYCBvciBgTm9kZUxpc3RgXG4gKiBAcmV0dXJuIHtBcnJheX0gTmFpdmUgY29udmVyc2lvbiBvZiBgY29sbGVjdGlvbmAgdG8gYSBuZXcgYEFycmF5YC5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b0FycmF5KGNvbGxlY3Rpb24pIHtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAndW5kZWZpbmVkJykgcmV0dXJuIFtdO1xuICBpZiAoY29sbGVjdGlvbiA9PT0gbnVsbCkgcmV0dXJuIFtudWxsXTtcbiAgaWYgKGNvbGxlY3Rpb24gPT09IHdpbmRvdykgcmV0dXJuIFt3aW5kb3ddO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdzdHJpbmcnKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkgcmV0dXJuIGNvbGxlY3Rpb247XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbi5sZW5ndGggIT0gJ251bWJlcicpIHJldHVybiBbY29sbGVjdGlvbl07XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2xsZWN0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pIHJldHVybiBbY29sbGVjdGlvbl07XG5cbiAgdmFyIGFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbGxlY3Rpb24sIGkpIHx8IGkgaW4gY29sbGVjdGlvbikge1xuICAgICAgYXJyLnB1c2goY29sbGVjdGlvbltpXSk7XG4gICAgfVxuICB9XG4gIGlmICghYXJyLmxlbmd0aCkgcmV0dXJuIFtdO1xuICByZXR1cm4gYXJyO1xufTtcblxuZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHMpIHtcbiAgcyA9IChzID09PSB1bmRlZmluZWQpID8gXCJcIiA6IHM7XG4gIHMgPSAocyA9PT0gbnVsbCkgPyBcIlwiIDogcztcbiAgcyA9IHMudG9TdHJpbmcoKTtcbiAgcmV0dXJuIHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQ7XG52YXIgYWxwaGFiZXRJbmRleE1hcDtcbnZhciBhbHBoYWJldEluZGV4TWFwTGVuZ3RoID0gMDtcblxuZnVuY3Rpb24gaXNOdW1iZXJDb2RlKGNvZGUpIHtcbiAgcmV0dXJuIGNvZGUgPj0gNDggJiYgY29kZSA8PSA1Nztcbn1cblxuZnVuY3Rpb24gbmF0dXJhbENvbXBhcmUoYSwgYikge1xuICB2YXIgbGVuZ3RoQSA9IChhICs9ICcnKS5sZW5ndGg7XG4gIHZhciBsZW5ndGhCID0gKGIgKz0gJycpLmxlbmd0aDtcbiAgdmFyIGFJbmRleCA9IDA7XG4gIHZhciBiSW5kZXggPSAwO1xuXG4gIHdoaWxlIChhSW5kZXggPCBsZW5ndGhBICYmIGJJbmRleCA8IGxlbmd0aEIpIHtcbiAgICB2YXIgY2hhckNvZGVBID0gYS5jaGFyQ29kZUF0KGFJbmRleCk7XG4gICAgdmFyIGNoYXJDb2RlQiA9IGIuY2hhckNvZGVBdChiSW5kZXgpO1xuXG4gICAgaWYgKGlzTnVtYmVyQ29kZShjaGFyQ29kZUEpKSB7XG4gICAgICBpZiAoIWlzTnVtYmVyQ29kZShjaGFyQ29kZUIpKSB7XG4gICAgICAgIHJldHVybiBjaGFyQ29kZUEgLSBjaGFyQ29kZUI7XG4gICAgICB9XG5cbiAgICAgIHZhciBudW1TdGFydEEgPSBhSW5kZXg7XG4gICAgICB2YXIgbnVtU3RhcnRCID0gYkluZGV4O1xuXG4gICAgICB3aGlsZSAoY2hhckNvZGVBID09PSA0OCAmJiArK251bVN0YXJ0QSA8IGxlbmd0aEEpIHtcbiAgICAgICAgY2hhckNvZGVBID0gYS5jaGFyQ29kZUF0KG51bVN0YXJ0QSk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoY2hhckNvZGVCID09PSA0OCAmJiArK251bVN0YXJ0QiA8IGxlbmd0aEIpIHtcbiAgICAgICAgY2hhckNvZGVCID0gYi5jaGFyQ29kZUF0KG51bVN0YXJ0Qik7XG4gICAgICB9XG5cbiAgICAgIHZhciBudW1FbmRBID0gbnVtU3RhcnRBO1xuICAgICAgdmFyIG51bUVuZEIgPSBudW1TdGFydEI7XG5cbiAgICAgIHdoaWxlIChudW1FbmRBIDwgbGVuZ3RoQSAmJiBpc051bWJlckNvZGUoYS5jaGFyQ29kZUF0KG51bUVuZEEpKSkge1xuICAgICAgICArK251bUVuZEE7XG4gICAgICB9XG4gICAgICB3aGlsZSAobnVtRW5kQiA8IGxlbmd0aEIgJiYgaXNOdW1iZXJDb2RlKGIuY2hhckNvZGVBdChudW1FbmRCKSkpIHtcbiAgICAgICAgKytudW1FbmRCO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGlmZmVyZW5jZSA9IG51bUVuZEEgLSBudW1TdGFydEEgLSBudW1FbmRCICsgbnVtU3RhcnRCOyAvLyBudW1BIGxlbmd0aCAtIG51bUIgbGVuZ3RoXG4gICAgICBpZiAoZGlmZmVyZW5jZSkge1xuICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKG51bVN0YXJ0QSA8IG51bUVuZEEpIHtcbiAgICAgICAgZGlmZmVyZW5jZSA9IGEuY2hhckNvZGVBdChudW1TdGFydEErKykgLSBiLmNoYXJDb2RlQXQobnVtU3RhcnRCKyspO1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSkge1xuICAgICAgICAgIHJldHVybiBkaWZmZXJlbmNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFJbmRleCA9IG51bUVuZEE7XG4gICAgICBiSW5kZXggPSBudW1FbmRCO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoYXJDb2RlQSAhPT0gY2hhckNvZGVCKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYXJDb2RlQSA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGggJiZcbiAgICAgICAgY2hhckNvZGVCIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aCAmJlxuICAgICAgICBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQV0gIT09IC0xICYmXG4gICAgICAgIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVCXSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUFdIC0gYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hhckNvZGVBIC0gY2hhckNvZGVCO1xuICAgIH1cblxuICAgICsrYUluZGV4O1xuICAgICsrYkluZGV4O1xuICB9XG5cbiAgcmV0dXJuIGxlbmd0aEEgLSBsZW5ndGhCO1xufVxuXG5uYXR1cmFsQ29tcGFyZS5jYXNlSW5zZW5zaXRpdmUgPSBuYXR1cmFsQ29tcGFyZS5pID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gbmF0dXJhbENvbXBhcmUoKCcnICsgYSkudG9Mb3dlckNhc2UoKSwgKCcnICsgYikudG9Mb3dlckNhc2UoKSk7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhuYXR1cmFsQ29tcGFyZSwge1xuICBhbHBoYWJldDoge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYWxwaGFiZXQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBhbHBoYWJldCA9IHZhbHVlO1xuICAgICAgYWxwaGFiZXRJbmRleE1hcCA9IFtdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgaWYgKGFscGhhYmV0KSB7XG4gICAgICAgIGZvciAoOyBpIDwgYWxwaGFiZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhbHBoYWJldEluZGV4TWFwW2FscGhhYmV0LmNoYXJDb2RlQXQoaSldID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWxwaGFiZXRJbmRleE1hcExlbmd0aCA9IGFscGhhYmV0SW5kZXhNYXAubGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWxwaGFiZXRJbmRleE1hcFtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtpXSA9IC0xO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdHVyYWxDb21wYXJlO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImJyZWFrcG9pbnRzXCIgOiB7XG4gICAgXCJ4c1wiOiBcIjQ4MHB4XCIsXG4gICAgXCJzbVwiOiBcIjYyMHB4XCIsXG4gICAgXCJtZFwiOiBcIjc2MHB4XCIsXG4gICAgXCJsZ1wiOiBcIjk5MHB4XCIsXG4gICAgXCJ4bFwiOiBcIjEzODBweFwiXG4gIH1cbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgdHJpZ2dlcjogJ1tkYXRhLWRpc21pc3NdJyxcbiAgICB0YXJnZXQ6ICdbZGF0YS1kaXNtaXNzaWJsZV0nLFxuICAgIGNsYXNzVG9nZ2xlOiAnZGlzbWlzcydcbiAgfVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgbGV0IHRhcmdldCA9IHRyaWdnZXIuY2xvc2VzdChzZXR0aW5ncy50YXJnZXQpXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc1RvZ2dsZSlcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbi8qKlxuICogRHJhd2VyIHBsdWdpblxuICogLS0tXG4gKiBBIGNvbnRhaW5lciBjb21wb25lbnQgdGhhdCBzbGlkZXMgaW4gZnJvbSB0aGUgbGVmdCBvciByaWdodC4gSXQgdHlwaWNhbGx5XG4gKiBjb250YWlucyBtZW51cywgc2VhcmNoIG9yIG90aGVyIGNvbnRlbnQgZm9yIHlvdXIgYXBwLlxuICpcbiAqIFRvZG9zOlxuICogWyBdIERlYnVnIHdoeSBJJ20gZ2V0dGluZyBcIlR5cGVFcnJvcjogcyBpcyBudWxsXCIgb24gbGluZXMgMzk2IGFuZCA0MzMuIFRoaXMgaXMgcHJvYmFibHkgZG8gdG8gbm90IHJlbW92aW5nIHRoZSBtZWRpYSBxdWVyeSBldmVudCBsaXN0ZW5lciBvbiBkZXN0cm95XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIC8vIEVsZW1lbnQgY2xhc3Nlc1xuICAgIGNsYXNzVGFyZ2V0OiAnZHJhd2VyX19pdGVtJyxcbiAgICBjbGFzc1RyaWdnZXI6ICdkcmF3ZXJfX3RyaWdnZXInLFxuICAgIGNsYXNzSW5uZXI6ICdkcmF3ZXJfX2RpYWxvZycsXG5cbiAgICAvLyBVc2VkIHdpdGggUmVnRXhwIHRvIHNlYXJjaCBhbmQgcmVwbGFjZSBlbGVtZW50IGNsYXNzZXNcbiAgICBjbGFzc1RhcmdldFN3aXRjaDogJ21vZGFsJyxcbiAgICBjbGFzc1RyaWdnZXJTd2l0Y2g6ICdtb2RhbF9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lclN3aXRjaDogJ21vZGFsX19kaWFsb2cnLFxuXG4gICAgLy8gVGhlIGNsYXNzIHRoYXQgaXMgdXNlZCB0byBtYWtlIGFuIGl0ZW0gYWN0aXZlXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGNsYXNzVHJhbnNpdGlvbk5vbmU6ICd0cmFuc2l0aW9uX25vbmUnLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gc3RvcmUgdGhlIHNhdmUgc3RhdGUgaW4gbG9jYWwgc3RvcmFnZVxuICAgIC8vIHtib29sZWFufSBUaGUgc3RyaW5nIHRvIHNhdmUgb3VyIHN0YXRlIG9iamVjdCBhc1xuICAgIHNhdmVTdGF0ZTogdHJ1ZSxcblxuICAgIC8vIFdoZXRoZXIgb3Igbm90IHRvIGVuYWJsZSB0aGUgc3dpdGNoIGZ1bmN0aW9uYWxpdHlcbiAgICAvLyBJZiBlbmFibGVkLCBhIHN0cmluZyBzZWxlY3RvciB0byBjaGVjayBmb3Igc2hvdWxkIGJlIHBhc3NlZC5cbiAgICAvLyB7ZmFsc2V9IHx8IHtzdHJpbmd9IGUuZy4gJ1tkYXRhLWRyYXdlci1zd2l0Y2hdJ1xuICAgIHN3aXRjaDogJ1tkYXRhLWRyYXdlci1zd2l0Y2hdJyxcblxuICAgIC8vIFRoZSBkZWZhdWx0IGJyZWFrIHBvaW50IGZvciB3aGVuIHRvIHN3aXRjaCB0byBkcmF3ZXIgb3IgbW9kYWwgY2xhc3Nlc1xuICAgIC8vIHtzdHJpbmd9IEVpdGhlciBhIGJyZWFrcG9pbnQga2V5IG9yIHBpeGVsIHZhbHVlXG4gICAgc3dpdGNoQnJlYWtwb2ludDogJ2xnJyxcblxuICAgIC8vIER1cmF0aW9uIGJlZm9yZSByZW1vdmluZyB0aGUgdHJhbnNpdGlvbl9ub25lIGNsYXNzIG9uIGluaXRpYWwgbG9hZFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjogNTAwXG4gIH1cblxuICAvLyBEcmF3ZXIgc3BlY2lmaWMgdmFyaWFibGVzXG4gIC8vIFdoZXJlIHdlIHN0b3JlIGFsbCBvdXIgZHJhd2VycyBhdmFpbGFibGUgaW4gdGhlIERPTVxuICBsZXQgZHJhd2Vyc1xuICAvLyBXaGVyZSB3ZSBzdG9yZSBhbGwgb3VyIHN3aXRjaCBkcmF3ZXJzIGF2YWlsYWJsZSBpbiB0aGUgRE9NXG4gIGxldCBzd2l0Y2hEcmF3ZXJzXG4gIC8vIFdoZXJlIHdlIGJ1aWxkIHRoZSBzYXZlIHN0YXRlIG9iamVjdCBiZWZvcmUgd2UgcGFzcyBpdCB0byBsb2NhbCBzdG9yYWdlXG4gIGxldCBkcmF3ZXJTdGF0ZSA9IHt9XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBtZXRob2QsIHJ1biBhcyBzb29uIGFzIGFuIGluc3RhbmNlIGlzIGNyZWF0ZWRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gQSBqc29uIG9iamVjdCB3aXRoIHlvdXIgY3VzdG9tIHNldHRpbmdzXG4gICAqL1xuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG5cbiAgICAvLyBNZXJnZSB0aGUgZGVmYXVsdHMgYW5kIHBhc3NlZCBvcHRpb25zIGludG8gb3VyIHNldHRpbmdzIG9ialxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcblxuICAgIC8vIEdldCBhbGwgdGhlIGRyYXdlcnMgb24gdGhlIHBhZ2VcbiAgICBkcmF3ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldClcblxuICAgIC8vIEluaXRpYWxpemUgYSBwcm9taXNlIGFuZCBpbml0IHNhdmUgc3RhdGUgaWYgaXQncyBlbmFibGVkXG4gICAgbGV0IHByb21pc2VTYXZlU3RhdGUgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICAgIGluaXRTYXZlU3RhdGUocmVzb2x2ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBBZnRlciBwcm9taXNlIGlzIHJlc29sdmVkIGFuZCBzd2l0Y2ggaXMgZW5hYmxlZCwgaW5pdGlhbGl6ZSBzd2l0Y2hcbiAgICBwcm9taXNlU2F2ZVN0YXRlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoc2V0dGluZ3Muc3dpdGNoKSB7XG4gICAgICAgIGluaXRTd2l0Y2goKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBBZGQgb3VyIGRyYXdlciB0cmlnZ2VyIGV2ZW50IGxpc3RlbmVyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0cmlnZ2VyLCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGVjb25zdHJ1Y3RvciBtZXRob2QsIHVzZWQgdG8gcmVzZXQgYW5kIGRlc3RvcnkgdGhlIGRyYXdlciBpbnN0YW5jZVxuICAgKi9cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG5cbiAgICAvLyBDbGVhciBvdXIgdmFyaWFibGVzXG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZHJhd2VycyA9IG51bGxcbiAgICBzd2l0Y2hEcmF3ZXJzID0gbnVsbFxuICAgIGRyYXdlclN0YXRlID0ge31cblxuICAgIC8vIERlbGV0ZSB0aGUgbG9jYWwgc3RvcmFnZSBkYXRhXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RyYXdlclN0YXRlJylcblxuICAgIC8vIFJlbW92ZSB0aGUgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gb3BlbiBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnb3BlbicpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBjbG9zZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLmNsb3NlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgJ2Nsb3NlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHRvZ2dsZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnRvZ2dsZSA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBzd2l0Y2ggYSBkcmF3ZXIgaW50byBtb2RhbFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIC0gQSB2YWxpZCBDU1Mgc2VsZWN0b3JcbiAgICovXG4gIGFwaS5zd2l0Y2hEcmF3ZXIgPSAoc2VsZWN0b3IpID0+IHtcblxuICAgIC8vIFVzZSBkZWZhdWx0IHNlbGVjdG9yIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6IHNldHRpbmdzLnN3aXRjaFxuXG4gICAgLy8gUXVlcnkgb3VyIGVsZW1lbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBzZWxlY3RvclxuICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgc3dpdGNoRHJhd2VyKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaE1vZGFsID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAvLyBVc2UgZGVmYXVsdCBzZWxlY3RvciBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBzZXR0aW5ncy5zd2l0Y2hcblxuICAgIC8vIFF1ZXJ5IG91ciBlbGVtZW50cyB1c2luZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3JcbiAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHN3aXRjaE1vZGFsKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBkcmF3ZXIgY3VycmVudCBkcmF3ZXIgc3RhdGVcbiAgICovXG4gIGFwaS5zdGF0ZVNhdmUgPSAoKSA9PiB7XG4gICAgc3RhdGVTYXZlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdG8gZHJhd2VyIGRlZmF1bHQgc3RhdGVcbiAgICovXG4gIGFwaS5zdGF0ZVJlc2V0ID0gKCkgPT4ge1xuICAgIHN0YXRlUmVzZXQoKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdG8gY2xvc2UgYSBkcmF3ZXIgb3IgZ3JvdXAgb2YgZHJhd2Vyc1xuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZHJhd2VyIGVsZW1lbnQocykgdG8gY2xvc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlIC0gV2hldGhlciB0byBvcGVuLCBjbG9zZSBvciB0b2dnbGUgdGhlIGRyYXdlcihzKVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgY29uc3QgdG9nZ2xlID0gKGRyYXdlciwgc3RhdGUsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyBDaGVjayBpZiBkcmF3ZXIocykgc2hvdWxkIGJlIG9wZW5lZCwgY2xvc2VkIG9yIHRvZ2dsZWQgYW5kIGVpdGhlciBhZGQgb3JcbiAgICAvLyByZW1vdmUgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgcGFzc2VkIGRyYXdlcihzKVxuICAgIGlmIChzdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICB1LmFkZENsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnRvZ2dsZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgc2F2ZSBzdGF0ZSBpcyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgc3RhdGVTYXZlKGRyYXdlcilcbiAgICB9XG5cbiAgICAvLyBGaXJlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpZiBvbmUgd2FzIHBhc3NlZFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjaygpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0byB0b2dnbGUgZHJhd2VyIHZpYSBhIHRyaWdnZXJcbiAgICovXG4gIGNvbnN0IHRyaWdnZXIgPSAoKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGNsb3Nlc3QgdHJpZ2dlciBlbGVtZW50IGZyb20gdGhlIGNsaWNrIGV2ZW50XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG5cbiAgICAvLyBDaGVjayB0aGF0IHRoZSBjbGFzcyB0cmlnZ2VyIHdhcyBjbGlja2VkXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgLy8gR2V0IHRoZSBkcmF3ZXIgc2VsZWN0b3IgZnJvbSB0aGUgdHJpZ2dlciB2aWEgW2RhdGEtdGFyZ2V0XVxuICAgICAgbGV0IGRhdGFEcmF3ZXIgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG5cbiAgICAgIC8vIENoZWNrIHRoYXQgYSBkcmF3ZXIgdGFyZ2V0IHdhcyBnaXZlblxuICAgICAgaWYgKGRhdGFEcmF3ZXIpIHtcblxuICAgICAgICAvLyBRdWVyeSB0aGUgZHJhd2VyIGVsZW1lbnQgYW5kIHRvZ2dsZSBpdCBpZiBpdCBleGlzdHNcbiAgICAgICAgbGV0IGRyYXdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZGF0YURyYXdlcilcbiAgICAgICAgaWYgKGRyYXdlci5sZW5ndGgpIHtcbiAgICAgICAgICB0b2dnbGUoZHJhd2VyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBpbml0aWFsaXplcyB0aGUgc2F2ZSBzdGF0ZSBmdW5jdGlvbmFsaXR5XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgY29uc3QgaW5pdFNhdmVTdGF0ZSA9IChjYWxsYmFjaykgPT4ge1xuXG4gICAgLy8gQ2hlY2sgaWYgYSBkcmF3ZXIgc3RhdGUgaXMgYWxyZWFkeSBzYXZlZCBpbiBsb2NhbCBzdG9yYWdlIGFuZCBzYXZlIHRoZVxuICAgIC8vIGpzb24gcGFyc2VkIGRhdGEgdG8gb3VyIGxvY2FsIHZhcmlhYmxlIGlmIGl0IGRvZXNcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RyYXdlclN0YXRlJykpIHtcbiAgICAgIGRyYXdlclN0YXRlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyU3RhdGUnKSlcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggYWxsIGRyYXdlcnNcbiAgICBkcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuXG4gICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc3RhdGUgaWYgb25lIGlzIG5vdCBzZXRcbiAgICAgIGlmIChkcmF3ZXIuaWQgaW4gZHJhd2VyU3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHN0YXRlU2F2ZShkcmF3ZXIpXG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBvdXIgZHJhd2VyIGRpYWxvZyBlbGVtZW50XG4gICAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy4nICsgc2V0dGluZ3MuY2xhc3NJbm5lcilcblxuICAgICAgLy8gVHJhbnNpdGlvbiBkZWxheTogZGlzYWJsZXMgdHJhbnNpdGlvbnMgYXMgZGVmYXVsdCBzdGF0ZXMgYXJlIGJlaW5nIHNldFxuICAgICAgbGV0IHRyYW5zaXRpb25EZWxheSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGRpYWxvZykge1xuICAgICAgICAgIHUuYWRkQ2xhc3MoZGlhbG9nLCBzZXR0aW5ncy5jbGFzc1RyYW5zaXRpb25Ob25lKVxuICAgICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdS5yZW1vdmVDbGFzcyhkaWFsb2csIHNldHRpbmdzLmNsYXNzVHJhbnNpdGlvbk5vbmUpXG4gICAgICAgICAgICB9LCBzZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG9nZ2xlIG91ciBkcmF3ZXIgc3RhdGUgYmFzZWQgb24gdGhlIHNhdmVkIHN0YXRlXG4gICAgICBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ2Nsb3NlJywgdHJhbnNpdGlvbkRlbGF5KVxuICAgICAgfSBlbHNlIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdKSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdvcGVuJywgdHJhbnNpdGlvbkRlbGF5KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBGaXJlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpZiBvbmUgd2FzIHBhc3NlZCBhbmQgcmV0dXJuIG91ciBzdGF0ZSBvYmplY3RcbiAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2soZHJhd2VyU3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHNhdmVzIHRoZSBzdGF0ZSBvZiBhIHNwZWNpZmljIG9yIGFsbCBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGl0ZW1zIC0gVGhlIGRyYXdlciBlbGVtZW50KHMpIHRvIHNhdmUgc3RhdGVcbiAgICovXG4gIGNvbnN0IHN0YXRlU2F2ZSA9IChpdGVtcykgPT4ge1xuXG4gICAgLy8gU2F2ZSBhbGwgZHJhd2VycyBpZiBhbiBpdGVtcyBhcmcgd2Fzbid0IHBhc3NlZFxuICAgIGl0ZW1zID0gKGl0ZW1zKSA/IGl0ZW1zIDogZHJhd2Vyc1xuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIC8vIExvb3AgdGhyb3VnaCBvdXIgZHJhd2VycyBhbmQgc2F2ZSB0aGVpciBuZXcgc3RhdGUgdG8gbG9jYWwgc3RvcmFnZVxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIC8vIE9ubHkgc2F2ZSBkcmF3ZXIgc3RhdGUgaWYgYW4gaWQgZXhpc3RzXG4gICAgICBpZiAoaXRlbS5pZCkge1xuICAgICAgICBkcmF3ZXJTdGF0ZVtpdGVtLmlkXSA9IHUuaGFzQ2xhc3MoaXRlbSwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcmF3ZXJTdGF0ZScsIEpTT04uc3RyaW5naWZ5KGRyYXdlclN0YXRlKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBjbGVhcnMgdGhlIGRyYXdlciBzdGF0ZVxuICAgKi9cbiAgY29uc3Qgc3RhdGVSZXNldCA9ICgpID0+IHtcblxuICAgIC8vIFJlc2V0IG91ciBsb2NhbCBkcmF3ZXIgc3RhdGUgdmFyaWFibGUgYW5kIGRlbGV0ZSB0aGUgbG9jYWwgc3RvcmFnZSBkYXRhXG4gICAgZHJhd2VyU3RhdGUgPSB7fVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkcmF3ZXJTdGF0ZScpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGluaXRpYWxpemVzIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgY29uc3QgaW5pdFN3aXRjaCA9ICgpID0+IHtcblxuICAgIC8vIFF1ZXJ5IGFsbCB0aGUgZHJhd2VycyB3aXRoIHRoZSBzd2l0Y2ggZmVhdHVyZSBlbmFibGVkXG4gICAgc3dpdGNoRHJhd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3Muc3dpdGNoKVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBzd2l0Y2ggZHJhd2Vyc1xuICAgIHN3aXRjaERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG5cbiAgICAgIC8vIEdldCB0aGUgbG9jYWwgYnJlYWtwb2ludCBpZiBvbmUgaXMgc2V0XG4gICAgICAvLyBSZW1vdmUgYnJhY2tldHMgYW5kIHRoZSBpbnRpYWwgZGF0YSBmbGFnXG4gICAgICBsZXQgY2xlYW5TZWxlY3RvciA9IHNldHRpbmdzLnN3aXRjaFxuICAgICAgICAucmVwbGFjZSgnWycsICcnKVxuICAgICAgICAucmVwbGFjZSgnXScsICcnKVxuICAgICAgICAucmVwbGFjZSgnZGF0YS0nLCAnJylcblxuICAgICAgLy8gQ29udmVydCBzcmluZyB0byBjYW1lbENhc2VcbiAgICAgIGNsZWFuU2VsZWN0b3IgPSBjbGVhblNlbGVjdG9yLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uIChnKSB7XG4gICAgICAgIHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIENoZWNrIHdoaWNoIGJyZWFrcG9pbnQgdG8gdXNlOlxuICAgICAgLy8gYSkgVGhlIGxvY2FsIGJwIHNldCBvbiB0aGUgZHJhd2VyXG4gICAgICAvLyBiKSBUaGUgYnAgYXZhaWxhYmxlIGluIGNvbmZpZyB1c2luZyBhIGtleVxuICAgICAgLy8gYykgVGhlIHJhdyBwaXhlbCB2YWx1ZSBwcm92aWRlZCBpbiBzZXR0aW5nc1xuICAgICAgbGV0IGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgIGlmIChicCkge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChicClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnAgPSB1LmdldEJyZWFrcG9pbnQoc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1lZGlhIHF1ZXJ5IGxpc3RlbmVyXG4gICAgICBsZXQgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYSggXCIobWluLXdpZHRoOlwiICsgYnAgKyBcIilcIiApXG4gICAgICBtcS5hZGRMaXN0ZW5lcigobXEpID0+IHtcbiAgICAgICAgc3dpdGNoQ2hlY2sobXEsIGRyYXdlcilcbiAgICAgIH0pXG4gICAgICBzd2l0Y2hDaGVjayhtcSwgZHJhd2VyKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGVuIGEgbWVkaWEgcXVlcnkgaGl0cyBhIG1hdGNoIGFuZCBzd2l0Y2hlc1xuICAgKiB0aGUgY29tcG9uZW50IGZyb20gZHJhd2VyIHRvIG1vZGFsIGFzIG5lZWRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbXEgLSBUaGUgTWVkaWFRdWVyeUxpc3Qgb2JqZWN0IGZvciB0aGUgbWVkaWEgcXVlcnlcbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZHJhd2VyIGVsZW1lbnQgdG8gc3dpdGNoXG4gICAqL1xuICBjb25zdCBzd2l0Y2hDaGVjayA9IChtcSwgZHJhd2VyKSA9PiB7XG4gICAgaWYgKG1xLm1hdGNoZXMpIHtcbiAgICAgIHN3aXRjaERyYXdlcihkcmF3ZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaE1vZGFsKGRyYXdlcilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHN3aXRjaGVzIGEgbW9kYWwgaW50byBhIGRyYXdlciBjb21wb25lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGVsZW1lbnQgdG8gc3dpdGNoXG4gICAqL1xuICBjb25zdCBzd2l0Y2hEcmF3ZXIgPSAoZHJhd2VyKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGRpYWxvZyBhbmQgdHJpZ2dlciBlbGVtZW50cyByZWxhdGVkIHRvIHRoaXMgY29tcG9uZW50XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuXG4gICAgLy8gU3dpdGNoIHRoZSBtb2RhbCBjb21wb25lbnQgdG8gZHJhd2VyXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUYXJnZXRTd2l0Y2gsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICApXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NJbm5lclN3aXRjaCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc0lubmVyXG4gICAgKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RyaWdnZXJTd2l0Y2gsICdnaScpLFxuICAgICAgICBzZXR0aW5ncy5jbGFzc1RyaWdnZXJcbiAgICAgIClcbiAgICB9KVxuXG4gICAgLy8gT3BlbiBvciBjbG9zZSBkcmF3ZXIgYmFzZWQgb24gc2F2ZSBzdGF0ZVxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnY2xvc2UnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgc3dpdGNoZXMgYSBkcmF3ZXIgaW50byBhIG1vZGFsIGNvbXBvbmVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZWxlbWVudCB0byBzd2l0Y2hcbiAgICovXG4gIGNvbnN0IHN3aXRjaE1vZGFsID0gKGRyYXdlcikgPT4ge1xuXG4gICAgLy8gR2V0IHRoZSBkaWFsb2cgYW5kIHRyaWdnZXIgZWxlbWVudHMgcmVsYXRlZCB0byB0aGlzIGNvbXBvbmVudFxuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcblxuICAgIC8vIFN3aXRjaCB0aGUgZHJhd2VyIGNvbXBvbmVudCB0byBtb2RhbFxuICAgIGRyYXdlci5jbGFzc05hbWUgPSBkcmF3ZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVGFyZ2V0LCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzVGFyZ2V0U3dpdGNoXG4gICAgKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzSW5uZXIsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NJbm5lclN3aXRjaFxuICAgIClcbiAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICB0cmlnZ2VyLmNsYXNzTmFtZSA9IHRyaWdnZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUcmlnZ2VyLCAnZ2knKSxcbiAgICAgICAgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyU3dpdGNoXG4gICAgICApXG4gICAgfSlcblxuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZm9yIG1vZGFsIHN0eWxlcyBieSBkZWZhdWx0XG4gICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICAvLyBSdW4gdGhlIGNvbnN0cnVjdG9yIG1ldGhvZFxuICBhcGkuaW5pdChvcHRpb25zKVxuXG4gIC8vIFJldHVybiB0aGUgQVBJIGZvciBydW5uaW5nIHB1YmxpYyBtZXRob2RzXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuLyoqXG4gKiBNb2RhbCBwbHVnaW5cbiAqIC0tLVxuICogQSBjb21wb25lbnQgZm9yIGNoYW5naW5nIHRoZSBtb2RlIG9mIGEgcGFnZSB0byBjb21wbGV0ZSBhIGNyaXRpY2FsIHRhc2suXG4gKiBUaGlzIGlzIHVzdWFsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBEaWFsb2cgY29tcG9uZW50IHRvIG1ha2VcbiAqIG1vZGFsIGRpYWxvZ3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVGFyZ2V0OiAnbW9kYWwnLFxuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc0lubmVyOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGZvY3VzOiAnW2RhdGEtZm9jdXNdJ1xuICB9XG5cbiAgbGV0IG1lbW9yeVRyaWdnZXJcbiAgbGV0IG1lbW9yeVRhcmdldFxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5vcGVuID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgb3Blbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9IChjbGVhcikgPT4ge1xuICAgIGNsb3NlKGNsZWFyKVxuICB9XG5cbiAgY29uc3Qgb3BlbiA9ICh0YXJnZXQpID0+IHtcbiAgICB1LmFkZENsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgaWYgKHRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5pdGVtKDApXG4gICAgICBsZXQgZm9jdXMgPSB0YXJnZXQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5mb2N1cylcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICBmb2N1cy5mb2N1cygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjbG9zZSA9IChjbGVhciA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXQpXG4gICAgdS5yZW1vdmVDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmIChjbGVhciA9PSBmYWxzZSAmJiBtZW1vcnlUcmlnZ2VyICYmIG1lbW9yeVRhcmdldCkge1xuICAgICAgaWYgKG1lbW9yeVRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbWVtb3J5VGFyZ2V0Lml0ZW0oMClcbiAgICAgICAgbWVtb3J5VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgICAgaWYgKG1lbW9yeVRyaWdnZXIpIHtcbiAgICAgICAgICAgIG1lbW9yeVRyaWdnZXIuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2xlYXIgPT0gdHJ1ZSkge1xuICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBjb25zdCBlc2NhcGUgPSAoKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyKVxuICAgIGxldCBpbm5lciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzSW5uZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICAgIGxldCB0YXJnZXREYXRhID0gdHJpZ2dlci5kYXRhc2V0LnRhcmdldFxuICAgICAgaWYgKHRhcmdldERhdGEpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXREYXRhKVxuICAgICAgICBtZW1vcnlUcmlnZ2VyID0gdHJpZ2dlclxuICAgICAgICBvcGVuKG1lbW9yeVRhcmdldClcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiAhaW5uZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS10b2dnbGUtY2xhc3NdJyxcbiAgICB0YXJnZXRzOiAnJyxcbiAgICBjbGFzczogJydcbiAgfVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuXG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgbGV0IHRhcmdldHNcblxuICAgICAgaWYgKHNldHRpbmdzLnRhcmdldHMpIHtcbiAgICAgICAgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3MudGFyZ2V0cylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRyaWdnZXIuZGF0YXNldC50b2dnbGVUYXJnZXQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCkge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5jbGFzcykge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgc2V0dGluZ3MuY2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0cmlnZ2VyLCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnXG5cbi8qKlxuICogVXRpbGl0eVxuICogLS0tXG4gKiBBIHNldCBvZiBoZWxwZXIgbWV0aG9kcyBmb3IgZ2VuZXJhbCBqYXZhc2NyaXB0IHBsdWdpbiB1c2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAvKipcbiAgICogR2V0IGFuZCBvdXRwdXQgYSBicmVha3BvaW50IHVzaW5nIGl0J3Mga2V5IGZvdW5kIGluIGNvbmZpZy5qc29uXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gVGhlIGtleSB0byBzZWFyY2ggZm9yIGluIHRoZSBicmVha3BvaW50cyBvYmplY3RcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBUaGUgcGl4ZWwgdmFsdWUgb2YgdGhlIGJyZWFrcG9pbnQgYXMgYSBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBnZXRCcmVha3BvaW50KGtleSkge1xuICAgIHJldHVybiBjb25maWcuYnJlYWtwb2ludHNba2V5XVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzIG9yIG5vdFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gY2hlY2sgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIFJldHVybnMgdHJ1ZSBpZiBjbGFzcyBleGlzdHMsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgc3RhdGljIGhhc0NsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgcmV0dXJuIGMuc29tZSggZnVuY3Rpb24gKGMpIHtcbiAgICAgIGxldCBoYXMgPSBmYWxzZVxuICAgICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjKSkge1xuICAgICAgICAgIGhhcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBoYXNcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBvciBjbGFzc2VzIHRvIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIGFkZCBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gYWRkXG4gICAqL1xuICBzdGF0aWMgYWRkQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBvciBjbGFzc2VzIGZyb20gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gcmVtb3ZlIGNsYXNzKGVzKSBmcm9tXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIHJlbW92ZVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZUNsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGEgY2xhc3Mgb3IgY2xhc3NlcyBvbiBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byB0b2dnbGUgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIHRvZ2dsZVxuICAgKi9cbiAgc3RhdGljIHRvZ2dsZUNsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY2xvc2VzdCBwYXJlbnQgZWxlbWVudCBiYXNlZCBvbiBjbGFzcy4gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGVcbiAgICogbmF0aXZlIC5jbG9zZXN0KCkgbWV0aG9kIGluIHRoYXQgaXQgZG9lc24ndCBjaGVjayB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQgdG8gc3RhcnQgc2VhcmNoIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGNoZWNrIGZvclxuICAgKiBAcmV0dXJuIHtOb2RlfSAtIENsb3Nlc3QgcGFyZW50IGVsZW1lbnRcbiAgICovXG4gIHN0YXRpYyBjbG9zZXN0KGVsLCBjKSB7XG4gICAgd2hpbGUgKChlbCA9IGVsLnBhcmVudEVsZW1lbnQpICYmICF0aGlzLmhhc0NsYXNzKGVsLCBjKSlcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyBvciBvYmplY3QgdG8gYW4gYXJyYXkuIElmIGFuIGFycmF5IGlzIHBhc3NlZCwgaXQnc1xuICAgKiByZXR1cm5lZCBhcyBpcy4gQW55dGhpbmcgZWxzZSBpcyByZXR1cm5lZCBhcyBhbiBhcnJheS5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gU3RyaW5nIG9yIG9iamVjdCB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSAtIFJldHVybiB0aGUgY29udmVydGVkIGFycmF5XG4gICAqL1xuICBzdGF0aWMgdG9BcnJheShpdGVtKSB7XG5cbiAgICBsZXQgYXJyYXkgPSBbXVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGFycmF5ID0gaXRlbVxuICAgIH0gZWxzZSB7XG4gICAgICBhcnJheS5wdXNoKGl0ZW0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0cy4gUmV0dXJucyBhIG5ldyBvYmplY3QuIFNldCB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICogdG8gYHRydWVgIGZvciBhIGRlZXAgb3IgcmVjdXJzaXZlIG1lcmdlLlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbT3B0aW9uYWxdIC0gSWYgdHJ1ZSwgZG8gYSBkZWVwIChvciByZWN1cnNpdmUpIG1lcmdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAtIFRoZSBvYmplY3RzIHRvIG1lcmdlIHRvZ2V0aGVyOyBlYWNoIG92ZXJyaWRpbmcgdGhlIG5leHRcbiAgICogQHJldHVybnMge09iamVjdH0gLSBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgbGV0IGV4dGVuZGVkID0ge31cbiAgICBsZXQgZGVlcCA9IGZhbHNlXG4gICAgbGV0IGkgPSAwXG4gICAgbGV0IGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBhcmd1bWVudHNbMF0gKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICkge1xuICAgICAgZGVlcCA9IGFyZ3VtZW50c1swXVxuICAgICAgaSsrXG4gICAgfVxuXG4gICAgbGV0IG1lcmdlID0gKCBvYmogKSA9PiB7XG4gICAgICBmb3IgKCBsZXQgcHJvcCBpbiBvYmogKSB7XG4gICAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcbiAgICAgICAgICBpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQoIHRydWUsIGV4dGVuZGVkW3Byb3BdLCBvYmpbcHJvcF0gKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgbGV0IG9iaiA9IGFyZ3VtZW50c1tpXVxuICAgICAgbWVyZ2Uob2JqKVxuICAgIH1cblxuICAgIHJldHVybiBleHRlbmRlZFxuICB9XG5cbn1cbiJdfQ==

//# sourceMappingURL=scripts.js.map
