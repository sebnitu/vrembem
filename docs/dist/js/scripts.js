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
 * Test
 */

document.addEventListener('click', function () {
  var trigger = event.target;

  if (_utility["default"].hasClass(trigger, 'drawer--open')) {
    console.log('drawer.open()');
    drawer.open();
  } else if (_utility["default"].hasClass(trigger, 'drawer--close')) {
    console.log('drawer.close()');
    drawer.close();
  } else if (_utility["default"].hasClass(trigger, 'drawer--toggle')) {
    console.log('drawer.toggle()');
    drawer.toggle();
  } else if (_utility["default"].hasClass(trigger, 'drawer--reset')) {
    console.log('drawer.stateReset()');
    drawer.stateReset();
  } else if (_utility["default"].hasClass(trigger, 'drawer--save')) {
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
 */
function _default(options) {
  'use strict'; // The api where we assign our methods to and return after running init

  var api = {}; // The settings object which will contain our merged options and defaults obj

  var settings; // The default settings of the component

  var defaults = {
    // Class options
    // {string} The class name to be searched for or used
    classTrigger: 'drawer__trigger',
    classDrawer: 'drawer',
    classDialog: 'drawer__dialog',
    classModal: 'modal',
    classActive: 'is-active',
    // Whether or not to enable the switch functionality
    // {false} || {string} e.g. '[data-drawer-switch]'
    "switch": '[data-drawer-switch]',
    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',
    // Whether or not to store the save state in local storage
    // {false} || {string} The string to save our state object as
    saveState: 'drawerState',
    // Whether or not to output component behavior in console
    debug: true // Drawer specific variables
    // Where we store all our drawers available in the DOM

  };
  var drawers; // Where we store all our switch drawers available in the DOM

  var switchDrawers; // Where we store a save state object before we pass it to local storage

  var drawerState = {};
  /**
   * The constructor method, run as soon as an instance is created
   * ---
   * @param {Object} - A json object with your custom settings
   */

  api.init = function (options) {
    // Merge the defaults and passed options into our settings obj
    settings = _utility["default"].extend(defaults, options || {}); // Get all the drawers on the page

    drawers = document.querySelectorAll('.' + settings.classDrawer); // Init save state functionality if it's enabled

    if (settings.saveState) {
      initSaveState();
    } // Init switch functionality if it's enabled


    if (settings["switch"]) {
      initSwitch();
    } // Add our drawer trigger event listener


    document.addEventListener('click', trigger, false);
  };
  /**
   * The deconstructor method, used to reset or destory the drawer instance
   */


  api.destroy = function () {
    // Clear our variables
    settings = null;
    drawers = null;
    switchDrawers = null;
    drawerState = {}; // Delete the local storage data

    localStorage.removeItem(settings.saveState); // Remove the drawer trigger event listener

    document.removeEventListener('click', trigger, false);
  };
  /**
   * Public method to open a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */


  api.open = function (selector) {
    selector = selector ? selector : '.' + settings.classDrawer;
    toggle(document.querySelectorAll(selector), 'open');
  };
  /**
   * Public method to close a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */


  api.close = function (selector) {
    selector = selector ? selector : '.' + settings.classDrawer;
    toggle(document.querySelectorAll(selector), 'close');
  };
  /**
   * Public method to toggle a drawer or group of drawers
   * ---
   * @param {String} - A valid CSS selector
   */


  api.toggle = function (selector) {
    selector = selector ? selector : '.' + settings.classDrawer;
    toggle(document.querySelectorAll(selector));
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
   * @param {Object} || {Nodelist} - The drawer element(s) to close
   * @param {String} ['open' || 'close' || 'toggle'] - Whether to open, close
   *  or toggle the drawer(s)
   * @param {Function} - The callback function
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

  var trigger = function trigger() {
    var trigger = event.target.closest('.' + settings.classTrigger);

    if (trigger) {
      var dataDrawer = trigger.dataset.target;

      if (dataDrawer) {
        var drawer = document.querySelectorAll(dataDrawer);

        if (drawer) {
          toggle(drawer);
        }
      }
    }
  };

  var initSaveState = function initSaveState() {
    // Init: Setup our variables
    // Get the drawer state from local storage
    // Check if drawer state was saved otherwise init a new object
    if (localStorage.getItem(settings.saveState)) {
      drawerState = JSON.parse(localStorage.getItem(settings.saveState));
    } // Loop through all drawers and save/init their state


    drawers.forEach(function (drawer) {
      // Set the default state if one is not set
      if (drawer.id in drawerState === false) {
        if (drawer.id) {
          drawerState[drawer.id] = _utility["default"].hasClass(drawer, settings.classActive);
          localStorage.setItem(settings.saveState, JSON.stringify(drawerState));
        }
      } // Get our drawer dialog element


      var dialog = drawer.querySelector('.' + settings.classDialog); // Add a no-transition class and remove it within a transition duration

      _utility["default"].addClass(dialog, 'transition_none');

      var revert = function revert() {
        setTimeout(function () {
          _utility["default"].removeClass(dialog, 'transition_none');
        }, 500);
      }; // Toggle our drawer state based on the saved state


      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close', revert);
      } else {
        toggle(drawer, 'open', revert);
      }
    });
  };

  var stateSave = function stateSave(items) {
    items = items ? items : drawers; // Convert to array if only one drawer is passed

    if (!items.forEach) {
      items = _utility["default"].toArray(items);
    } // Loop through our drawers and save their new state to local storage


    items.forEach(function (item) {
      // Only save drawer state if an id exists
      if (item.id) {
        drawerState[item.id] = _utility["default"].hasClass(item, settings.classActive);
        localStorage.setItem(settings.saveState, JSON.stringify(drawerState));
      }
    });
  };

  var stateReset = function stateReset() {
    // Reset our local drawer state variable
    // Delete the local storage data
    drawerState = {};
    localStorage.removeItem(settings.saveState);
  };

  var initSwitch = function initSwitch() {
    switchDrawers = document.querySelectorAll(settings["switch"]);
    switchDrawers.forEach(function (drawer) {
      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      var clean = settings["switch"].replace('[', '').replace(']', '').replace('data-', ''); // Convert sring to camelCase

      clean = clean.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }); // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings

      var bp = drawer.dataset[clean];

      if (bp) {
        bp = _utility["default"].getBreakpoint(bp);

        if (!bp) {
          bp = drawer.dataset[clean];
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

  var switchCheck = function switchCheck(mq, drawer) {
    if (mq.matches) {
      switchDrawer(drawer);
    } else {
      switchModal(drawer);
    }
  };

  var switchDrawer = function switchDrawer(drawer) {
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]');
    var regex = /modal/gi;
    drawer.className = drawer.className.replace(regex, settings.classDrawer);
    dialog.className = dialog.className.replace(regex, settings.classDrawer);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(regex, settings.classDrawer);
    }); // Open or close drawer based on save state

    if (settings.saveState) {
      if (drawerState[drawer.id] === false) {
        toggle(drawer, 'close');
      } else {
        toggle(drawer, 'open');
      }
    }
  };

  var switchModal = function switchModal(drawer) {
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]');
    var regex = /drawer/gi;
    drawer.className = drawer.className.replace(regex, settings.classModal);
    dialog.className = dialog.className.replace(regex, settings.classModal);
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(regex, settings.classModal);
    }); // Remove active class for modal styles by default

    _utility["default"].removeClass(drawer, settings.classActive);
  }; // Run the constructor method


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
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
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
    var modals = document.querySelectorAll('.' + settings.classModal);

    _utility["default"].removeClass(modals, settings.classActive);

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
    var trigger = event.target.closest('.' + settings.classTrigger);
    var modal = event.target.closest('.' + settings.classModal);
    var dialog = event.target.closest('.' + settings.classDialog);

    if (trigger) {
      close();
      var dataModal = trigger.dataset.target;

      if (dataModal) {
        memoryTarget = document.querySelectorAll(dataModal);
        memoryTrigger = trigger;
        open(memoryTarget);
      }

      event.preventDefault();
    } else if (modal && !dialog) {
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
     * @param {String} - The key to search for in the breakpoints object
     * @returns {String} - The pixel value of the breakpoint as a string
     */
    value: function getBreakpoint(key) {
      return _config["default"].breakpoints[key];
    }
    /**
     * Checks if an element has a class or not
     * ---
     * @param {Object} || {Nodelist} - Element(s) to check class(es) on
     * @param {String} || {Array} - Class(es) to check
     * @returns {Boolean} - Returns true if class exists, otherwise false
     */

  }, {
    key: "hasClass",
    value: function hasClass(el, c) {
      if (!el.forEach) {
        el = this.toArray(el);
      }

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
     * @param {Object} || {Nodelist} - Element(s) to add class(es) on
     * @param {String} || {Array} - Class(es) to add
     */

  }, {
    key: "addClass",
    value: function addClass(el, c) {
      if (!el.forEach) {
        el = this.toArray(el);
      }

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
     * @param {Object} || {Nodelist} - Element(s) to remove class(es) from
     * @param {String} || {Array} - Class(es) to remove
     */

  }, {
    key: "removeClass",
    value: function removeClass(el, c) {
      if (!el.forEach) {
        el = this.toArray(el);
      }

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
     * @param {Object} || {Nodelist} - Element(s) to toggle class(es) on
     * @param {String} || {Array} - Class(es) to toggle
     */

  }, {
    key: "toggleClass",
    value: function toggleClass(el, c) {
      if (!el.forEach) {
        el = this.toArray(el);
      }

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
     * @param {Object} - Element to start search on
     * @param {String} || {Array} - Class(es) to check for
     * @return {Element} - Closest parent element
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
     * @param {String} || {Object} - String or object to convert to an array
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9jb25maWcuanNvbiIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9kcmF3ZXIuanMiLCIuLi9zcmMvanMvbW9kYWwuanMiLCIuLi9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vc3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBSixFQUFwQjtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUNBLElBQU0sS0FBSyxHQUFHLElBQUksaUJBQUosRUFBZDtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUVBOzs7O0FBSUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQVc7QUFDNUMsTUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLE1BQXBCOztBQUNBLE1BQUksb0JBQUUsUUFBRixDQUFXLE9BQVgsRUFBb0IsY0FBcEIsQ0FBSixFQUF5QztBQUN2QyxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWjtBQUNBLElBQUEsTUFBTSxDQUFDLElBQVA7QUFDRCxHQUhELE1BR08sSUFBSSxvQkFBRSxRQUFGLENBQVcsT0FBWCxFQUFvQixlQUFwQixDQUFKLEVBQTBDO0FBQy9DLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBLElBQUEsTUFBTSxDQUFDLEtBQVA7QUFDRCxHQUhNLE1BR0EsSUFBSSxvQkFBRSxRQUFGLENBQVcsT0FBWCxFQUFvQixnQkFBcEIsQ0FBSixFQUEyQztBQUNoRCxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksaUJBQVo7QUFDQSxJQUFBLE1BQU0sQ0FBQyxNQUFQO0FB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QyxHQUFELENBQUw7QUFDRDs7QUFFRCxhQUFPLFFBQVA7QUFDRCxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHUgZnJvbSAndXRpbGl0eSdcbmltcG9ydCBEaXNtaXNzaWJsZSBmcm9tICdkaXNtaXNzaWJsZSdcbmltcG9ydCBEcmF3ZXIgZnJvbSAnZHJhd2VyJ1xuaW1wb3J0IE1vZGFsIGZyb20gJ21vZGFsJ1xuaW1wb3J0IFRvZ2dsZSBmcm9tICd0b2dnbGUnXG5pbXBvcnQgbGlzdGpzIGZyb20gJ2xpc3QuanMnXG5cbmNvbnN0IGRpc21pc3NpYmxlID0gbmV3IERpc21pc3NpYmxlXG5jb25zdCBkcmF3ZXIgPSBuZXcgRHJhd2VyKClcbmNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKClcbmNvbnN0IHRvZ2dsZSA9IG5ldyBUb2dnbGUoKVxuXG4vKipcbiAqIFRlc3RcbiAqL1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldFxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1vcGVuJykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLm9wZW4oKScpXG4gICAgZHJhd2VyLm9wZW4oKVxuICB9IGVsc2UgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tY2xvc2UnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuY2xvc2UoKScpXG4gICAgZHJhd2VyLmNsb3NlKClcbiAgfSBlbHNlIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLXRvZ2dsZScpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci50b2dnbGUoKScpXG4gICAgZHJhd2VyLnRvZ2dsZSgpXG4gIH0gZWxzZSBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1yZXNldCcpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5zdGF0ZVJlc2V0KCknKVxuICAgIGRyYXdlci5zdGF0ZVJlc2V0KClcbiAgfSBlbHNlIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLXNhdmUnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuc3RhdGVTYXZlKCknKVxuICAgIGRyYXdlci5zdGF0ZVNhdmUoKVxuICB9XG59KVxuXG4vKipcbiAqIExpc3QuanNcbiAqIC0tLVxuICogQWRkcyBsaXN0IGZ1bmN0aW9uYWxpdHkgYWxvbmcgd2l0aCBzZWFyY2guXG4gKiBsaXN0LmpzIGRvY3M6IGh0dHA6Ly9saXN0anMuY29tL1xuICovXG5pZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3RqcycpKSB7XG5cbiAgLy8gSW5pdCBvdXIgbGlzdC5qcyBjb21wb25lbnRcbiAgY29uc3QgbGlzdCA9IG5ldyBsaXN0anMoJ2xpc3RqcycsIHtcbiAgICBmdXp6eVNlYXJjaDoge1xuICAgICAgc2VhcmNoQ2xhc3M6ICdzZWFyY2gnLFxuICAgICAgbG9jYXRpb246IDAsXG4gICAgICBkaXN0YW5jZTogMTAwLFxuICAgICAgdGhyZXNob2xkOiAwLjQsXG4gICAgICBtdWx0aVNlYXJjaDogdHJ1ZVxuICAgIH0sXG4gICAgdmFsdWVOYW1lczogW1xuICAgICAgJ25hbWUnLFxuICAgICAgeyBkYXRhOiBbJ2NhdGVnb3J5J10gfVxuICAgIF0sXG4gICAgbGlzdENsYXNzOiAnbWVudSdcbiAgfSlcblxuICAvLyBFbXB0eSBOb3RpY2VcbiAgLy8gRGlzcGxheWVkIHdoZW4gdGhlIHNlYXJjaCByZXR1cm5zIG5vIHJlc3VsdHNcbiAgbGV0IG5vdGljZV9lbXB0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ub3RpY2VfZW1wdHknKVxuICBsZXQgbm90aWNlX2VtcHR5X3RleHQgPSBub3RpY2VfZW1wdHkucXVlcnlTZWxlY3RvcignLnNlYXJjaF90ZXh0JylcblxuICAvLyBDbGVhciBzZWFyY2ggYnV0dG9uXG4gIGxldCBmaWx0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyJylcbiAgbGV0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIgLnNlYXJjaCcpXG4gIGxldCBzZWFyY2hfY2xlYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyIC5zZWFyY2hfY2xlYXInKVxuXG4gIC8vIE9uIHNlYXJjaCBjb21wbGV0ZSBjYWxsYmFja1xuICBsaXN0Lm9uKCdzZWFyY2hDb21wbGV0ZScsICgpID0+IHtcblxuICAgIC8vIFVwZGF0ZSB0aGUgc2VhcmNoIHRleHQgaW4gZW1wdHkgbm90aWNlXG4gICAgbGV0IHZhbHVlID0gc2VhcmNoLnZhbHVlXG4gICAgbm90aWNlX2VtcHR5X3RleHQuaW5uZXJIVE1MID0gdmFsdWVcblxuICAgIC8vIFNob3cgY2xlYXIgc2VhcmNoIGJ1dHRvbiBpZiBhIHZhbHVlIHRoZXJlIGlzIHNvbWV0aGluZyBpbiBzZWFyY2hcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHUuYWRkQ2xhc3MoZmlsdGVyLCAnaXMtYWN0aXZlJylcbiAgICAgIHUuYWRkQ2xhc3Moc2VhcmNoLCAnaXMtYWN0aXZlJylcbiAgICAgIHUucmVtb3ZlQ2xhc3Moc2VhcmNoX2NsZWFyLCAnZF9ub25lJylcbiAgICB9IGVsc2Uge1xuICAgICAgdS5yZW1vdmVDbGFzcyhmaWx0ZXIsICdpcy1hY3RpdmUnKVxuICAgICAgdS5yZW1vdmVDbGFzcyhzZWFyY2gsICdpcy1hY3RpdmUnKVxuICAgICAgdS5hZGRDbGFzcyhzZWFyY2hfY2xlYXIsICdkX25vbmUnKVxuICAgIH1cblxuICAgIC8vIFRvZ2dsZSBub3RpY2UgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2YgdmlzaWJsZSBpdGVtc1xuICAgIGlmIChsaXN0LnZpc2libGVJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICB1LmFkZENsYXNzKG5vdGljZV9lbXB0eSwgJ2Rfbm9uZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3Mobm90aWNlX2VtcHR5LCAnZF9ub25lJylcbiAgICB9XG4gIH0pXG5cbiAgLy8gQ2xpY2sgZXZlbnRzIGZvciBjYXRlZ29yeSBhbmQgY2xlYXJzXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyX3NlYXJjaF9jbGVhciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuc2VhcmNoX2NsZWFyJylcbiAgICBsZXQgdHJpZ2dlcl9zZWFyY2hfY2F0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5jYXRlZ29yeScpXG5cbiAgICBpZiAodHJpZ2dlcl9zZWFyY2hfY2xlYXIpIHtcbiAgICAgIHNlYXJjaC52YWx1ZSA9ICcnXG4gICAgICBsaXN0LnNlYXJjaCgpXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gICAgaWYgKHRyaWdnZXJfc2VhcmNoX2NhdCkge1xuICAgICAgc2VhcmNoLnZhbHVlID0gdHJpZ2dlcl9zZWFyY2hfY2F0LmRhdGFzZXQuY2F0ZWdvcnlcbiAgICAgIGxpc3Quc2VhcmNoKHNlYXJjaC52YWx1ZSlcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgfSwgZmFsc2UpXG5cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgYWRkQXN5bmMgPSBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrLCBpdGVtcykge1xuICAgIHZhciB2YWx1ZXNUb0FkZCA9IHZhbHVlcy5zcGxpY2UoMCwgNTApO1xuICAgIGl0ZW1zID0gaXRlbXMgfHwgW107XG4gICAgaXRlbXMgPSBpdGVtcy5jb25jYXQobGlzdC5hZGQodmFsdWVzVG9BZGQpKTtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2ssIGl0ZW1zKTtcbiAgICAgIH0sIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnVwZGF0ZSgpO1xuICAgICAgY2FsbGJhY2soaXRlbXMpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGFkZEFzeW5jO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIC8vIEFkZCBoYW5kbGVyc1xuICBsaXN0LmhhbmRsZXJzLmZpbHRlclN0YXJ0ID0gbGlzdC5oYW5kbGVycy5maWx0ZXJTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5maWx0ZXJDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuZmlsdGVyQ29tcGxldGUgfHwgW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZpbHRlckZ1bmN0aW9uKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdmaWx0ZXJTdGFydCcpO1xuICAgIGxpc3QuaSA9IDE7IC8vIFJlc2V0IHBhZ2luZ1xuICAgIGxpc3QucmVzZXQuZmlsdGVyKCk7XG4gICAgaWYgKGZpbHRlckZ1bmN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxpc3QuZmlsdGVyZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5maWx0ZXJlZCA9IHRydWU7XG4gICAgICB2YXIgaXMgPSBsaXN0Lml0ZW1zO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gaXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGlzW2ldO1xuICAgICAgICBpZiAoZmlsdGVyRnVuY3Rpb24oaXRlbSkpIHtcbiAgICAgICAgICBpdGVtLmZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmZpbHRlcmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ2ZpbHRlckNvbXBsZXRlJyk7XG4gICAgcmV0dXJuIGxpc3QudmlzaWJsZUl0ZW1zO1xuICB9O1xufTtcbiIsIlxudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKSxcbiAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3V0aWxzL3RvLXN0cmluZycpLFxuICBnZXRCeUNsYXNzID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYnktY2xhc3MnKSxcbiAgZnV6enkgPSByZXF1aXJlKCcuL3V0aWxzL2Z1enp5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICBsb2NhdGlvbjogMCxcbiAgICBkaXN0YW5jZTogMTAwLFxuICAgIHRocmVzaG9sZDogMC40LFxuICAgIG11bHRpU2VhcmNoOiB0cnVlLFxuICAgIHNlYXJjaENsYXNzOiAnZnV6enktc2VhcmNoJ1xuICB9LCBvcHRpb25zKTtcblxuXG5cbiAgdmFyIGZ1enp5U2VhcmNoID0ge1xuICAgIHNlYXJjaDogZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBjb2x1bW5zKSB7XG4gICAgICAvLyBTdWJzdHJhY3QgYXJndW1lbnRzIGZyb20gdGhlIHNlYXJjaFN0cmluZyBvciBwdXQgc2VhcmNoU3RyaW5nIGFzIG9ubHkgYXJndW1lbnRcbiAgICAgIHZhciBzZWFyY2hBcmd1bWVudHMgPSBvcHRpb25zLm11bHRpU2VhcmNoID8gc2VhcmNoU3RyaW5nLnJlcGxhY2UoLyArJC8sICcnKS5zcGxpdCgvICsvKSA6IFtzZWFyY2hTdHJpbmddO1xuXG4gICAgICBmb3IgKHZhciBrID0gMCwga2wgPSBsaXN0Lml0ZW1zLmxlbmd0aDsgayA8IGtsOyBrKyspIHtcbiAgICAgICAgZnV6enlTZWFyY2guaXRlbShsaXN0Lml0ZW1zW2tdLCBjb2x1bW5zLCBzZWFyY2hBcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbTogZnVuY3Rpb24oaXRlbSwgY29sdW1ucywgc2VhcmNoQXJndW1lbnRzKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlYXJjaEFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZm91bmRBcmd1bWVudCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjb2x1bW5zLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBpZiAoZnV6enlTZWFyY2gudmFsdWVzKGl0ZW0udmFsdWVzKCksIGNvbHVtbnNbal0sIHNlYXJjaEFyZ3VtZW50c1tpXSkpIHtcbiAgICAgICAgICAgIGZvdW5kQXJndW1lbnQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighZm91bmRBcmd1bWVudCkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGl0ZW0uZm91bmQgPSBmb3VuZDtcbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24odmFsdWVzLCB2YWx1ZSwgc2VhcmNoQXJndW1lbnQpIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gdG9TdHJpbmcodmFsdWVzW3ZhbHVlXSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoZnV6enkodGV4dCwgc2VhcmNoQXJndW1lbnQsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cblxuICBldmVudHMuYmluZChnZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgb3B0aW9ucy5zZWFyY2hDbGFzcyksICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50OyAvLyBJRSBoYXZlIHNyY0VsZW1lbnRcbiAgICBsaXN0LnNlYXJjaCh0YXJnZXQudmFsdWUsIGZ1enp5U2VhcmNoLnNlYXJjaCk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbihzdHIsIGNvbHVtbnMpIHtcbiAgICBsaXN0LnNlYXJjaChzdHIsIGNvbHVtbnMsIGZ1enp5U2VhcmNoLnNlYXJjaCk7XG4gIH07XG59O1xuIiwidmFyIG5hdHVyYWxTb3J0ID0gcmVxdWlyZSgnc3RyaW5nLW5hdHVyYWwtY29tcGFyZScpLFxuICBnZXRCeUNsYXNzID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYnktY2xhc3MnKSxcbiAgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKSxcbiAgaW5kZXhPZiA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXgtb2YnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3V0aWxzL3RvLXN0cmluZycpLFxuICBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGdldEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWF0dHJpYnV0ZScpLFxuICB0b0FycmF5ID0gcmVxdWlyZSgnLi91dGlscy90by1hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlkLCBvcHRpb25zLCB2YWx1ZXMpIHtcblxuICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgaW5pdCxcbiAgICBJdGVtID0gcmVxdWlyZSgnLi9pdGVtJykoc2VsZiksXG4gICAgYWRkQXN5bmMgPSByZXF1aXJlKCcuL2FkZC1hc3luYycpKHNlbGYpLFxuICAgIGluaXRQYWdpbmF0aW9uID0gcmVxdWlyZSgnLi9wYWdpbmF0aW9uJykoc2VsZik7XG5cbiAgaW5pdCA9IHtcbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmxpc3RDbGFzcyAgICAgID0gXCJsaXN0XCI7XG4gICAgICBzZWxmLnNlYXJjaENsYXNzICAgID0gXCJzZWFyY2hcIjtcbiAgICAgIHNlbGYuc29ydENsYXNzICAgICAgPSBcInNvcnRcIjtcbiAgICAgIHNlbGYucGFnZSAgICAgICAgICAgPSAxMDAwMDtcbiAgICAgIHNlbGYuaSAgICAgICAgICAgICAgPSAxO1xuICAgICAgc2VsZi5pdGVtcyAgICAgICAgICA9IFtdO1xuICAgICAgc2VsZi52aXNpYmxlSXRlbXMgICA9IFtdO1xuICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zICA9IFtdO1xuICAgICAgc2VsZi5zZWFyY2hlZCAgICAgICA9IGZhbHNlO1xuICAgICAgc2VsZi5maWx0ZXJlZCAgICAgICA9IGZhbHNlO1xuICAgICAgc2VsZi5zZWFyY2hDb2x1bW5zICA9IHVuZGVmaW5lZDtcbiAgICAgIHNlbGYuaGFuZGxlcnMgICAgICAgPSB7ICd1cGRhdGVkJzogW10gfTtcbiAgICAgIHNlbGYudmFsdWVOYW1lcyAgICAgPSBbXTtcbiAgICAgIHNlbGYudXRpbHMgICAgICAgICAgPSB7XG4gICAgICAgIGdldEJ5Q2xhc3M6IGdldEJ5Q2xhc3MsXG4gICAgICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgICAgICBpbmRleE9mOiBpbmRleE9mLFxuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgdG9TdHJpbmc6IHRvU3RyaW5nLFxuICAgICAgICBuYXR1cmFsU29ydDogbmF0dXJhbFNvcnQsXG4gICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICAgIGdldEF0dHJpYnV0ZTogZ2V0QXR0cmlidXRlLFxuICAgICAgICB0b0FycmF5OiB0b0FycmF5XG4gICAgICB9O1xuXG4gICAgICBzZWxmLnV0aWxzLmV4dGVuZChzZWxmLCBvcHRpb25zKTtcblxuICAgICAgc2VsZi5saXN0Q29udGFpbmVyID0gKHR5cGVvZihpZCkgPT09ICdzdHJpbmcnKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSA6IGlkO1xuICAgICAgaWYgKCFzZWxmLmxpc3RDb250YWluZXIpIHsgcmV0dXJuOyB9XG4gICAgICBzZWxmLmxpc3QgICAgICAgPSBnZXRCeUNsYXNzKHNlbGYubGlzdENvbnRhaW5lciwgc2VsZi5saXN0Q2xhc3MsIHRydWUpO1xuXG4gICAgICBzZWxmLnBhcnNlICAgICAgICA9IHJlcXVpcmUoJy4vcGFyc2UnKShzZWxmKTtcbiAgICAgIHNlbGYudGVtcGxhdGVyICAgID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXInKShzZWxmKTtcbiAgICAgIHNlbGYuc2VhcmNoICAgICAgID0gcmVxdWlyZSgnLi9zZWFyY2gnKShzZWxmKTtcbiAgICAgIHNlbGYuZmlsdGVyICAgICAgID0gcmVxdWlyZSgnLi9maWx0ZXInKShzZWxmKTtcbiAgICAgIHNlbGYuc29ydCAgICAgICAgID0gcmVxdWlyZSgnLi9zb3J0Jykoc2VsZik7XG4gICAgICBzZWxmLmZ1enp5U2VhcmNoICA9IHJlcXVpcmUoJy4vZnV6enktc2VhcmNoJykoc2VsZiwgb3B0aW9ucy5mdXp6eVNlYXJjaCk7XG5cbiAgICAgIHRoaXMuaGFuZGxlcnMoKTtcbiAgICAgIHRoaXMuaXRlbXMoKTtcbiAgICAgIHRoaXMucGFnaW5hdGlvbigpO1xuXG4gICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH0sXG4gICAgaGFuZGxlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaGFuZGxlciBpbiBzZWxmLmhhbmRsZXJzKSB7XG4gICAgICAgIGlmIChzZWxmW2hhbmRsZXJdKSB7XG4gICAgICAgICAgc2VsZi5vbihoYW5kbGVyLCBzZWxmW2hhbmRsZXJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5wYXJzZShzZWxmLmxpc3QpO1xuICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNlbGYuYWRkKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwYWdpbmF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uID0gW3t9XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uWzBdID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbiA9IFtvcHRpb25zLnBhZ2luYXRpb25dO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG9wdGlvbnMucGFnaW5hdGlvbi5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgICAgaW5pdFBhZ2luYXRpb24ob3B0aW9ucy5wYWdpbmF0aW9uW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKlxuICAqIFJlLXBhcnNlIHRoZSBMaXN0LCB1c2UgaWYgaHRtbCBoYXZlIGNoYW5nZWRcbiAgKi9cbiAgdGhpcy5yZUluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5pdGVtcyAgICAgICAgICA9IFtdO1xuICAgIHNlbGYudmlzaWJsZUl0ZW1zICAgPSBbXTtcbiAgICBzZWxmLm1hdGNoaW5nSXRlbXMgID0gW107XG4gICAgc2VsZi5zZWFyY2hlZCAgICAgICA9IGZhbHNlO1xuICAgIHNlbGYuZmlsdGVyZWQgICAgICAgPSBmYWxzZTtcbiAgICBzZWxmLnBhcnNlKHNlbGYubGlzdCk7XG4gIH07XG5cbiAgdGhpcy50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIganNvbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAganNvbi5wdXNoKHNlbGYuaXRlbXNbaV0udmFsdWVzKCkpO1xuICAgIH1cbiAgICByZXR1cm4ganNvbjtcbiAgfTtcblxuXG4gIC8qXG4gICogQWRkIG9iamVjdCB0byBsaXN0XG4gICovXG4gIHRoaXMuYWRkID0gZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaykge1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgYWRkQXN5bmModmFsdWVzLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhZGRlZCA9IFtdLFxuICAgICAgbm90Q3JlYXRlID0gZmFsc2U7XG4gICAgaWYgKHZhbHVlc1swXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHZhbHVlcyA9IFt2YWx1ZXNdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSB2YWx1ZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBudWxsO1xuICAgICAgbm90Q3JlYXRlID0gKHNlbGYuaXRlbXMubGVuZ3RoID4gc2VsZi5wYWdlKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIGl0ZW0gPSBuZXcgSXRlbSh2YWx1ZXNbaV0sIHVuZGVmaW5lZCwgbm90Q3JlYXRlKTtcbiAgICAgIHNlbGYuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgIGFkZGVkLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIGFkZGVkO1xuICB9O1xuXG5cdHRoaXMuc2hvdyA9IGZ1bmN0aW9uKGksIHBhZ2UpIHtcblx0XHR0aGlzLmkgPSBpO1xuXHRcdHRoaXMucGFnZSA9IHBhZ2U7XG5cdFx0c2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gc2VsZjtcblx0fTtcblxuICAvKiBSZW1vdmVzIG9iamVjdCBmcm9tIGxpc3QuXG4gICogTG9vcHMgdGhyb3VnaCB0aGUgbGlzdCBhbmQgcmVtb3ZlcyBvYmplY3RzIHdoZXJlXG4gICogcHJvcGVydHkgXCJ2YWx1ZW5hbWVcIiA9PT0gdmFsdWVcbiAgKi9cbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbih2YWx1ZU5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgdmFyIGZvdW5kID0gMDtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChzZWxmLml0ZW1zW2ldLnZhbHVlcygpW3ZhbHVlTmFtZV0gPT0gdmFsdWUpIHtcbiAgICAgICAgc2VsZi50ZW1wbGF0ZXIucmVtb3ZlKHNlbGYuaXRlbXNbaV0sIG9wdGlvbnMpO1xuICAgICAgICBzZWxmLml0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICBpbC0tO1xuICAgICAgICBpLS07XG4gICAgICAgIGZvdW5kKys7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qIEdldHMgdGhlIG9iamVjdHMgaW4gdGhlIGxpc3Qgd2hpY2hcbiAgKiBwcm9wZXJ0eSBcInZhbHVlTmFtZVwiID09PSB2YWx1ZVxuICAqL1xuICB0aGlzLmdldCA9IGZ1bmN0aW9uKHZhbHVlTmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgbWF0Y2hlZEl0ZW1zID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHNlbGYuaXRlbXNbaV07XG4gICAgICBpZiAoaXRlbS52YWx1ZXMoKVt2YWx1ZU5hbWVdID09IHZhbHVlKSB7XG4gICAgICAgIG1hdGNoZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlZEl0ZW1zO1xuICB9O1xuXG4gIC8qXG4gICogR2V0IHNpemUgb2YgdGhlIGxpc3RcbiAgKi9cbiAgdGhpcy5zaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNlbGYuaXRlbXMubGVuZ3RoO1xuICB9O1xuXG4gIC8qXG4gICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSB0aGUgbGlzdFxuICAqL1xuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgc2VsZi50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICBzZWxmLml0ZW1zID0gW107XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHNlbGYuaGFuZGxlcnNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMub2ZmID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUgPSBzZWxmLmhhbmRsZXJzW2V2ZW50XTtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGUsIGNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpID0gc2VsZi5oYW5kbGVyc1tldmVudF0ubGVuZ3RoO1xuICAgIHdoaWxlKGktLSkge1xuICAgICAgc2VsZi5oYW5kbGVyc1tldmVudF1baV0oc2VsZik7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMucmVzZXQgPSB7XG4gICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG4gICAgICAgIGlsID0gaXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGlsLS0pIHtcbiAgICAgICAgaXNbaWxdLmZpbHRlcmVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuICAgIHNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuICAgICAgICBpbCA9IGlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpbC0tKSB7XG4gICAgICAgIGlzW2lsXS5mb3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcblx0XHRcdGlsID0gaXMubGVuZ3RoO1xuXG4gICAgc2VsZi52aXNpYmxlSXRlbXMgPSBbXTtcbiAgICBzZWxmLm1hdGNoaW5nSXRlbXMgPSBbXTtcbiAgICBzZWxmLnRlbXBsYXRlci5jbGVhcigpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWw7IGkrKykge1xuICAgICAgaWYgKGlzW2ldLm1hdGNoaW5nKCkgJiYgKChzZWxmLm1hdGNoaW5nSXRlbXMubGVuZ3RoKzEpID49IHNlbGYuaSAmJiBzZWxmLnZpc2libGVJdGVtcy5sZW5ndGggPCBzZWxmLnBhZ2UpKSB7XG4gICAgICAgIGlzW2ldLnNob3coKTtcbiAgICAgICAgc2VsZi52aXNpYmxlSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNbaV0ubWF0Y2hpbmcoKSkge1xuICAgICAgICBzZWxmLm1hdGNoaW5nSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICAgIGlzW2ldLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzW2ldLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VsZi50cmlnZ2VyKCd1cGRhdGVkJyk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgaW5pdC5zdGFydCgpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICByZXR1cm4gZnVuY3Rpb24oaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKSB7XG4gICAgdmFyIGl0ZW0gPSB0aGlzO1xuXG4gICAgdGhpcy5fdmFsdWVzID0ge307XG5cbiAgICB0aGlzLmZvdW5kID0gZmFsc2U7IC8vIFNob3cgaWYgbGlzdC5zZWFyY2hlZCA9PSB0cnVlIGFuZCB0aGlzLmZvdW5kID09IHRydWVcbiAgICB0aGlzLmZpbHRlcmVkID0gZmFsc2U7Ly8gU2hvdyBpZiBsaXN0LmZpbHRlcmVkID09IHRydWUgYW5kIHRoaXMuZmlsdGVyZWQgPT0gdHJ1ZVxuXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbihpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpIHtcbiAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG5vdENyZWF0ZSkge1xuICAgICAgICAgIGl0ZW0udmFsdWVzKGluaXRWYWx1ZXMsIG5vdENyZWF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS52YWx1ZXMoaW5pdFZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uZWxtID0gZWxlbWVudDtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGxpc3QudGVtcGxhdGVyLmdldChpdGVtLCBpbml0VmFsdWVzKTtcbiAgICAgICAgaXRlbS52YWx1ZXModmFsdWVzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy52YWx1ZXMgPSBmdW5jdGlvbihuZXdWYWx1ZXMsIG5vdENyZWF0ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvcih2YXIgbmFtZSBpbiBuZXdWYWx1ZXMpIHtcbiAgICAgICAgICBpdGVtLl92YWx1ZXNbbmFtZV0gPSBuZXdWYWx1ZXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdENyZWF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGxpc3QudGVtcGxhdGVyLnNldChpdGVtLCBpdGVtLnZhbHVlcygpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uX3ZhbHVlcztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnRlbXBsYXRlci5zaG93KGl0ZW0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QudGVtcGxhdGVyLmhpZGUoaXRlbSk7XG4gICAgfTtcblxuICAgIHRoaXMubWF0Y2hpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIChsaXN0LmZpbHRlcmVkICYmIGxpc3Quc2VhcmNoZWQgJiYgaXRlbS5mb3VuZCAmJiBpdGVtLmZpbHRlcmVkKSB8fFxuICAgICAgICAobGlzdC5maWx0ZXJlZCAmJiAhbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZpbHRlcmVkKSB8fFxuICAgICAgICAoIWxpc3QuZmlsdGVyZWQgJiYgbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZvdW5kKSB8fFxuICAgICAgICAoIWxpc3QuZmlsdGVyZWQgJiYgIWxpc3Quc2VhcmNoZWQpXG4gICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLnZpc2libGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoaXRlbS5lbG0gJiYgKGl0ZW0uZWxtLnBhcmVudE5vZGUgPT0gbGlzdC5saXN0KSkgPyB0cnVlIDogZmFsc2U7XG4gICAgfTtcblxuICAgIGluaXQoaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKTtcbiAgfTtcbn07XG4iLCJ2YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICBMaXN0ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgcmVmcmVzaCA9IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIG9wdGlvbnMpIHtcbiAgICB2YXIgaXRlbSxcbiAgICAgIGwgPSBsaXN0Lm1hdGNoaW5nSXRlbXMubGVuZ3RoLFxuICAgICAgaW5kZXggPSBsaXN0LmksXG4gICAgICBwYWdlID0gbGlzdC5wYWdlLFxuICAgICAgcGFnZXMgPSBNYXRoLmNlaWwobCAvIHBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgPSBNYXRoLmNlaWwoKGluZGV4IC8gcGFnZSkpLFxuICAgICAgaW5uZXJXaW5kb3cgPSBvcHRpb25zLmlubmVyV2luZG93IHx8IDIsXG4gICAgICBsZWZ0ID0gb3B0aW9ucy5sZWZ0IHx8IG9wdGlvbnMub3V0ZXJXaW5kb3cgfHwgMCxcbiAgICAgIHJpZ2h0ID0gb3B0aW9ucy5yaWdodCB8fCBvcHRpb25zLm91dGVyV2luZG93IHx8IDA7XG5cbiAgICByaWdodCA9IHBhZ2VzIC0gcmlnaHQ7XG5cbiAgICBwYWdpbmdMaXN0LmNsZWFyKCk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gcGFnZXM7IGkrKykge1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IChjdXJyZW50UGFnZSA9PT0gaSkgPyBcImFjdGl2ZVwiIDogXCJcIjtcblxuICAgICAgLy9jb25zb2xlLmxvZyhpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIChjdXJyZW50UGFnZSAtIGlubmVyV2luZG93KSwgKGN1cnJlbnRQYWdlICsgaW5uZXJXaW5kb3cpLCBjbGFzc05hbWUpO1xuXG4gICAgICBpZiAoaXMubnVtYmVyKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpKSB7XG4gICAgICAgIGl0ZW0gPSBwYWdpbmdMaXN0LmFkZCh7XG4gICAgICAgICAgcGFnZTogaSxcbiAgICAgICAgICBkb3R0ZWQ6IGZhbHNlXG4gICAgICAgIH0pWzBdO1xuICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgY2xhc3NlcyhpdGVtLmVsbSkuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkRXZlbnQoaXRlbS5lbG0sIGksIHBhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChpcy5kb3R0ZWQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgcGFnaW5nTGlzdC5zaXplKCkpKSB7XG4gICAgICAgIGl0ZW0gPSBwYWdpbmdMaXN0LmFkZCh7XG4gICAgICAgICAgcGFnZTogXCIuLi5cIixcbiAgICAgICAgICBkb3R0ZWQ6IHRydWVcbiAgICAgICAgfSlbMF07XG4gICAgICAgIGNsYXNzZXMoaXRlbS5lbG0pLmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgaXMgPSB7XG4gICAgbnVtYmVyOiBmdW5jdGlvbihpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICAgcmV0dXJuIHRoaXMubGVmdChpLCBsZWZ0KSB8fCB0aGlzLnJpZ2h0KGksIHJpZ2h0KSB8fCB0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdyk7XG4gICAgfSxcbiAgICBsZWZ0OiBmdW5jdGlvbihpLCBsZWZ0KSB7XG4gICAgICByZXR1cm4gKGkgPD0gbGVmdCk7XG4gICAgfSxcbiAgICByaWdodDogZnVuY3Rpb24oaSwgcmlnaHQpIHtcbiAgICAgIHJldHVybiAoaSA+IHJpZ2h0KTtcbiAgICB9LFxuICAgIGlubmVyV2luZG93OiBmdW5jdGlvbihpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgIHJldHVybiAoIGkgPj0gKGN1cnJlbnRQYWdlIC0gaW5uZXJXaW5kb3cpICYmIGkgPD0gKGN1cnJlbnRQYWdlICsgaW5uZXJXaW5kb3cpKTtcbiAgICB9LFxuICAgIGRvdHRlZDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5kb3R0ZWRMZWZ0KHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHx8ICh0aGlzLmRvdHRlZFJpZ2h0KHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkpO1xuICAgIH0sXG4gICAgZG90dGVkTGVmdDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgcmV0dXJuICgoaSA9PSAobGVmdCArIDEpKSAmJiAhdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpICYmICF0aGlzLnJpZ2h0KGksIHJpZ2h0KSk7XG4gICAgfSxcbiAgICBkb3R0ZWRSaWdodDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSB7XG4gICAgICBpZiAocGFnaW5nTGlzdC5pdGVtc1tjdXJyZW50UGFnZUl0ZW0tMV0udmFsdWVzKCkuZG90dGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoKGkgPT0gKHJpZ2h0KSkgJiYgIXRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSAmJiAhdGhpcy5yaWdodChpLCByaWdodCkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgYWRkRXZlbnQgPSBmdW5jdGlvbihlbG0sIGksIHBhZ2UpIHtcbiAgICAgZXZlbnRzLmJpbmQoZWxtLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICBsaXN0LnNob3coKGktMSkqcGFnZSArIDEsIHBhZ2UpO1xuICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBwYWdpbmdMaXN0ID0gbmV3IExpc3QobGlzdC5saXN0Q29udGFpbmVyLmlkLCB7XG4gICAgICBsaXN0Q2xhc3M6IG9wdGlvbnMucGFnaW5hdGlvbkNsYXNzIHx8ICdwYWdpbmF0aW9uJyxcbiAgICAgIGl0ZW06IFwiPGxpPjxhIGNsYXNzPSdwYWdlJyBocmVmPSdqYXZhc2NyaXB0OmZ1bmN0aW9uIFooKXtaPVxcXCJcXFwifVooKSc+PC9hPjwvbGk+XCIsXG4gICAgICB2YWx1ZU5hbWVzOiBbJ3BhZ2UnLCAnZG90dGVkJ10sXG4gICAgICBzZWFyY2hDbGFzczogJ3BhZ2luYXRpb24tc2VhcmNoLXRoYXQtaXMtbm90LXN1cHBvc2VkLXRvLWV4aXN0JyxcbiAgICAgIHNvcnRDbGFzczogJ3BhZ2luYXRpb24tc29ydC10aGF0LWlzLW5vdC1zdXBwb3NlZC10by1leGlzdCdcbiAgICB9KTtcblxuICAgIGxpc3Qub24oJ3VwZGF0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHJlZnJlc2gocGFnaW5nTGlzdCwgb3B0aW9ucyk7XG4gICAgfSk7XG4gICAgcmVmcmVzaChwYWdpbmdMaXN0LCBvcHRpb25zKTtcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgSXRlbSA9IHJlcXVpcmUoJy4vaXRlbScpKGxpc3QpO1xuXG4gIHZhciBnZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBub2RlcyA9IHBhcmVudC5jaGlsZE5vZGVzLFxuICAgICAgaXRlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBub2Rlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAvLyBPbmx5IHRleHRub2RlcyBoYXZlIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgIGlmIChub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaXRlbXMucHVzaChub2Rlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbiAgfTtcblxuICB2YXIgcGFyc2UgPSBmdW5jdGlvbihpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBpdGVtRWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGlzdC5pdGVtcy5wdXNoKG5ldyBJdGVtKHZhbHVlTmFtZXMsIGl0ZW1FbGVtZW50c1tpXSkpO1xuICAgIH1cbiAgfTtcbiAgdmFyIHBhcnNlQXN5bmMgPSBmdW5jdGlvbihpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpIHtcbiAgICB2YXIgaXRlbXNUb0luZGV4ID0gaXRlbUVsZW1lbnRzLnNwbGljZSgwLCA1MCk7IC8vIFRPRE86IElmIDwgMTAwIGl0ZW1zLCB3aGF0IGhhcHBlbnMgaW4gSUUgZXRjP1xuICAgIHBhcnNlKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgaWYgKGl0ZW1FbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXJzZUFzeW5jKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcyk7XG4gICAgICB9LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC51cGRhdGUoKTtcbiAgICAgIGxpc3QudHJpZ2dlcigncGFyc2VDb21wbGV0ZScpO1xuICAgIH1cbiAgfTtcblxuICBsaXN0LmhhbmRsZXJzLnBhcnNlQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnBhcnNlQ29tcGxldGUgfHwgW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtc1RvSW5kZXggPSBnZXRDaGlsZHJlbihsaXN0Lmxpc3QpLFxuICAgICAgdmFsdWVOYW1lcyA9IGxpc3QudmFsdWVOYW1lcztcblxuICAgIGlmIChsaXN0LmluZGV4QXN5bmMpIHtcbiAgICAgIHBhcnNlQXN5bmMoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2UoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICB9XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBpdGVtLFxuICAgIHRleHQsXG4gICAgY29sdW1ucyxcbiAgICBzZWFyY2hTdHJpbmcsXG4gICAgY3VzdG9tU2VhcmNoO1xuXG4gIHZhciBwcmVwYXJlID0ge1xuICAgIHJlc2V0TGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LmkgPSAxO1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICAgIGN1c3RvbVNlYXJjaCA9IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA9PSAyICYmIGFyZ3NbMV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBjb2x1bW5zID0gYXJnc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMiAmJiB0eXBlb2YoYXJnc1sxXSkgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGN1c3RvbVNlYXJjaCA9IGFyZ3NbMV07XG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDMpIHtcbiAgICAgICAgY29sdW1ucyA9IGFyZ3NbMV07XG4gICAgICAgIGN1c3RvbVNlYXJjaCA9IGFyZ3NbMl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0Q29sdW1uczogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAobGlzdC5pdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGlmIChjb2x1bW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1ucyA9IChsaXN0LnNlYXJjaENvbHVtbnMgPT09IHVuZGVmaW5lZCkgPyBwcmVwYXJlLnRvQXJyYXkobGlzdC5pdGVtc1swXS52YWx1ZXMoKSkgOiBsaXN0LnNlYXJjaENvbHVtbnM7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTZWFyY2hTdHJpbmc6IGZ1bmN0aW9uKHMpIHtcbiAgICAgIHMgPSBsaXN0LnV0aWxzLnRvU3RyaW5nKHMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBzID0gcy5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I10vZywgXCJcXFxcJCZcIik7IC8vIEVzY2FwZSByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVyc1xuICAgICAgc2VhcmNoU3RyaW5nID0gcztcbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIHRtcENvbHVtbiA9IFtdO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB2YWx1ZXMpIHtcbiAgICAgICAgdG1wQ29sdW1uLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG1wQ29sdW1uO1xuICAgIH1cbiAgfTtcbiAgdmFyIHNlYXJjaCA9IHtcbiAgICBsaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwLCBrbCA9IGxpc3QuaXRlbXMubGVuZ3RoOyBrIDwga2w7IGsrKykge1xuICAgICAgICBzZWFyY2guaXRlbShsaXN0Lml0ZW1zW2tdKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGl0ZW0uZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGNvbHVtbnMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICBpZiAoc2VhcmNoLnZhbHVlcyhpdGVtLnZhbHVlcygpLCBjb2x1bW5zW2pdKSkge1xuICAgICAgICAgIGl0ZW0uZm91bmQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbih2YWx1ZXMsIGNvbHVtbikge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eShjb2x1bW4pKSB7XG4gICAgICAgIHRleHQgPSBsaXN0LnV0aWxzLnRvU3RyaW5nKHZhbHVlc1tjb2x1bW5dKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoKHNlYXJjaFN0cmluZyAhPT0gXCJcIikgJiYgKHRleHQuc2VhcmNoKHNlYXJjaFN0cmluZykgPiAtMSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5yZXNldC5zZWFyY2goKTtcbiAgICAgIGxpc3Quc2VhcmNoZWQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNlYXJjaE1ldGhvZCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGxpc3QudHJpZ2dlcignc2VhcmNoU3RhcnQnKTtcblxuICAgIHByZXBhcmUucmVzZXRMaXN0KCk7XG4gICAgcHJlcGFyZS5zZXRTZWFyY2hTdHJpbmcoc3RyKTtcbiAgICBwcmVwYXJlLnNldE9wdGlvbnMoYXJndW1lbnRzKTsgLy8gc3RyLCBjb2xzfHNlYXJjaEZ1bmN0aW9uLCBzZWFyY2hGdW5jdGlvblxuICAgIHByZXBhcmUuc2V0Q29sdW1ucygpO1xuXG4gICAgaWYgKHNlYXJjaFN0cmluZyA9PT0gXCJcIiApIHtcbiAgICAgIHNlYXJjaC5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNlYXJjaGVkID0gdHJ1ZTtcbiAgICAgIGlmIChjdXN0b21TZWFyY2gpIHtcbiAgICAgICAgY3VzdG9tU2VhcmNoKHNlYXJjaFN0cmluZywgY29sdW1ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2gubGlzdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdzZWFyY2hDb21wbGV0ZScpO1xuICAgIHJldHVybiBsaXN0LnZpc2libGVJdGVtcztcbiAgfTtcblxuICBsaXN0LmhhbmRsZXJzLnNlYXJjaFN0YXJ0ID0gbGlzdC5oYW5kbGVycy5zZWFyY2hTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5zZWFyY2hDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuc2VhcmNoQ29tcGxldGUgfHwgW107XG5cbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNlYXJjaENsYXNzKSwgJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsIC8vIElFIGhhdmUgc3JjRWxlbWVudFxuICAgICAgYWxyZWFkeUNsZWFyZWQgPSAodGFyZ2V0LnZhbHVlID09PSBcIlwiICYmICFsaXN0LnNlYXJjaGVkKTtcbiAgICBpZiAoIWFscmVhZHlDbGVhcmVkKSB7IC8vIElmIG9uaW5wdXQgYWxyZWFkeSBoYXZlIHJlc2V0dGVkIHRoZSBsaXN0LCBkbyBub3RoaW5nXG4gICAgICBzZWFyY2hNZXRob2QodGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFVzZWQgdG8gZGV0ZWN0IGNsaWNrIG9uIEhUTUw1IGNsZWFyIGJ1dHRvblxuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc2VhcmNoQ2xhc3MpLCAnaW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBpZiAodGFyZ2V0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBzZWFyY2hNZXRob2QoJycpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHNlYXJjaE1ldGhvZDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgYnV0dG9ucyA9IHtcbiAgICBlbHM6IHVuZGVmaW5lZCxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBidXR0b25zLmVscy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidXR0b25zLmVsc1tpXSkucmVtb3ZlKCdhc2MnKTtcbiAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ1dHRvbnMuZWxzW2ldKS5yZW1vdmUoJ2Rlc2MnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldE9yZGVyOiBmdW5jdGlvbihidG4pIHtcbiAgICAgIHZhciBwcmVkZWZpbmVkT3JkZXIgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLW9yZGVyJyk7XG4gICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IFwiYXNjXCIgfHwgcHJlZGVmaW5lZE9yZGVyID09IFwiZGVzY1wiKSB7XG4gICAgICAgIHJldHVybiBwcmVkZWZpbmVkT3JkZXI7XG4gICAgICB9IGVsc2UgaWYgKGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmhhcygnZGVzYycpKSB7XG4gICAgICAgIHJldHVybiBcImFzY1wiO1xuICAgICAgfSBlbHNlIGlmIChsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5oYXMoJ2FzYycpKSB7XG4gICAgICAgIHJldHVybiBcImRlc2NcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImFzY1wiO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SW5TZW5zaXRpdmU6IGZ1bmN0aW9uKGJ0biwgb3B0aW9ucykge1xuICAgICAgdmFyIGluc2Vuc2l0aXZlID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1pbnNlbnNpdGl2ZScpO1xuICAgICAgaWYgKGluc2Vuc2l0aXZlID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRPcmRlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYnV0dG9ucy5lbHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICB2YXIgYnRuID0gYnV0dG9ucy5lbHNbaV07XG4gICAgICAgIGlmIChsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLXNvcnQnKSAhPT0gb3B0aW9ucy52YWx1ZU5hbWUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJlZGVmaW5lZE9yZGVyID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1vcmRlcicpO1xuICAgICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IFwiYXNjXCIgfHwgcHJlZGVmaW5lZE9yZGVyID09IFwiZGVzY1wiKSB7XG4gICAgICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBvcHRpb25zLm9yZGVyKSB7XG4gICAgICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5hZGQob3B0aW9ucy5vcmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmFkZChvcHRpb25zLm9yZGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgc29ydCA9IGZ1bmN0aW9uKCkge1xuICAgIGxpc3QudHJpZ2dlcignc29ydFN0YXJ0Jyk7XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcblxuICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF0uY3VycmVudFRhcmdldCB8fCBhcmd1bWVudHNbMF0uc3JjRWxlbWVudCB8fCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICBvcHRpb25zLnZhbHVlTmFtZSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKHRhcmdldCwgJ2RhdGEtc29ydCcpO1xuICAgICAgYnV0dG9ucy5nZXRJblNlbnNpdGl2ZSh0YXJnZXQsIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5vcmRlciA9IGJ1dHRvbnMuZ2V0T3JkZXIodGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXSB8fCBvcHRpb25zO1xuICAgICAgb3B0aW9ucy52YWx1ZU5hbWUgPSBhcmd1bWVudHNbMF07XG4gICAgICBvcHRpb25zLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCBcImFzY1wiO1xuICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9ICh0eXBlb2Ygb3B0aW9ucy5pbnNlbnNpdGl2ZSA9PSBcInVuZGVmaW5lZFwiKSA/IHRydWUgOiBvcHRpb25zLmluc2Vuc2l0aXZlO1xuICAgIH1cblxuICAgIGJ1dHRvbnMuY2xlYXIoKTtcbiAgICBidXR0b25zLnNldE9yZGVyKG9wdGlvbnMpO1xuXG5cbiAgICAvLyBjYXNlSW5zZW5zaXRpdmVcbiAgICAvLyBhbHBoYWJldFxuICAgIHZhciBjdXN0b21Tb3J0RnVuY3Rpb24gPSAob3B0aW9ucy5zb3J0RnVuY3Rpb24gfHwgbGlzdC5zb3J0RnVuY3Rpb24gfHwgbnVsbCksXG4gICAgICAgIG11bHRpID0gKChvcHRpb25zLm9yZGVyID09PSAnZGVzYycpID8gLTEgOiAxKSxcbiAgICAgICAgc29ydEZ1bmN0aW9uO1xuXG4gICAgaWYgKGN1c3RvbVNvcnRGdW5jdGlvbikge1xuICAgICAgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIHJldHVybiBjdXN0b21Tb3J0RnVuY3Rpb24oaXRlbUEsIGl0ZW1CLCBvcHRpb25zKSAqIG11bHRpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIHZhciBzb3J0ID0gbGlzdC51dGlscy5uYXR1cmFsU29ydDtcbiAgICAgICAgc29ydC5hbHBoYWJldCA9IGxpc3QuYWxwaGFiZXQgfHwgb3B0aW9ucy5hbHBoYWJldCB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghc29ydC5hbHBoYWJldCAmJiBvcHRpb25zLmluc2Vuc2l0aXZlKSB7XG4gICAgICAgICAgc29ydCA9IGxpc3QudXRpbHMubmF0dXJhbFNvcnQuY2FzZUluc2Vuc2l0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3J0KGl0ZW1BLnZhbHVlcygpW29wdGlvbnMudmFsdWVOYW1lXSwgaXRlbUIudmFsdWVzKClbb3B0aW9ucy52YWx1ZU5hbWVdKSAqIG11bHRpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBsaXN0Lml0ZW1zLnNvcnQoc29ydEZ1bmN0aW9uKTtcbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignc29ydENvbXBsZXRlJyk7XG4gIH07XG5cbiAgLy8gQWRkIGhhbmRsZXJzXG4gIGxpc3QuaGFuZGxlcnMuc29ydFN0YXJ0ID0gbGlzdC5oYW5kbGVycy5zb3J0U3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuc29ydENvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5zb3J0Q29tcGxldGUgfHwgW107XG5cbiAgYnV0dG9ucy5lbHMgPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNvcnRDbGFzcyk7XG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQoYnV0dG9ucy5lbHMsICdjbGljaycsIHNvcnQpO1xuICBsaXN0Lm9uKCdzZWFyY2hTdGFydCcsIGJ1dHRvbnMuY2xlYXIpO1xuICBsaXN0Lm9uKCdmaWx0ZXJTdGFydCcsIGJ1dHRvbnMuY2xlYXIpO1xuXG4gIHJldHVybiBzb3J0O1xufTtcbiIsInZhciBUZW1wbGF0ZXIgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBpdGVtU291cmNlLFxuICAgIHRlbXBsYXRlciA9IHRoaXM7XG5cbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBpdGVtU291cmNlID0gdGVtcGxhdGVyLmdldEl0ZW1Tb3VyY2UobGlzdC5pdGVtKTtcbiAgICBpZiAoaXRlbVNvdXJjZSkge1xuICAgICAgaXRlbVNvdXJjZSA9IHRlbXBsYXRlci5jbGVhclNvdXJjZUl0ZW0oaXRlbVNvdXJjZSwgbGlzdC52YWx1ZU5hbWVzKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jbGVhclNvdXJjZUl0ZW0gPSBmdW5jdGlvbihlbCwgdmFsdWVOYW1lcykge1xuICAgIGZvcih2YXIgaSA9IDAsIGlsID0gdmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgaWYgKHZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSB2YWx1ZU5hbWVzW2ldLmRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS0nK3ZhbHVlTmFtZXNbaV0uZGF0YVtqXSwgJycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZXNbaV0uYXR0ciAmJiB2YWx1ZU5hbWVzW2ldLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGVsLCB2YWx1ZU5hbWVzW2ldLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSh2YWx1ZU5hbWVzW2ldLmF0dHIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoZWwsIHZhbHVlTmFtZXNbaV0sIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIHRoaXMuZ2V0SXRlbVNvdXJjZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgbm9kZXMgPSBsaXN0Lmxpc3QuY2hpbGROb2RlcyxcbiAgICAgICAgaXRlbXMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbm9kZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAvLyBPbmx5IHRleHRub2RlcyBoYXZlIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgaWYgKG5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC88dHJbXFxzPl0vZy5leGVjKGl0ZW0pKSB7XG4gICAgICB2YXIgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgdGJvZHkuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgIHJldHVybiB0Ym9keS5maXJzdENoaWxkO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pbmRleE9mKFwiPFwiKSAhPT0gLTEpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdENoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc291cmNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGlzdC5pdGVtKTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICB0aGlzLmdldCA9IGZ1bmN0aW9uKGl0ZW0sIHZhbHVlTmFtZXMpIHtcbiAgICB0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pO1xuICAgIHZhciB2YWx1ZXMgPSB7fTtcbiAgICBmb3IodmFyIGkgPSAwLCBpbCA9IHZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIGlmICh2YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gdmFsdWVOYW1lc1tpXS5kYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXS5kYXRhW2pdXSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGl0ZW0uZWxtLCAnZGF0YS0nK3ZhbHVlTmFtZXNbaV0uZGF0YVtqXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lc1tpXS5hdHRyICYmIHZhbHVlTmFtZXNbaV0ubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZXNbaV0ubmFtZSwgdHJ1ZSk7XG4gICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldLm5hbWVdID0gZWxtID8gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoZWxtLCB2YWx1ZU5hbWVzW2ldLmF0dHIpIDogXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lc1tpXSwgdHJ1ZSk7XG4gICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldXSA9IGVsbSA/IGVsbS5pbm5lckhUTUwgOiBcIlwiO1xuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIHRoaXMuc2V0ID0gZnVuY3Rpb24oaXRlbSwgdmFsdWVzKSB7XG4gICAgdmFyIGdldFZhbHVlTmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGxpc3QudmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICAgIHZhciBkYXRhID0gbGlzdC52YWx1ZU5hbWVzW2ldLmRhdGE7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtqXSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBuYW1lIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGxpc3QudmFsdWVOYW1lc1tpXS5hdHRyICYmIGxpc3QudmFsdWVOYW1lc1tpXS5uYW1lICYmIGxpc3QudmFsdWVOYW1lc1tpXS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdC52YWx1ZU5hbWVzW2ldO1xuICAgICAgICB9IGVsc2UgaWYgKGxpc3QudmFsdWVOYW1lc1tpXSA9PT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0VmFsdWUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIHZhciB2YWx1ZU5hbWUgPSBnZXRWYWx1ZU5hbWUobmFtZSk7XG4gICAgICBpZiAoIXZhbHVlTmFtZSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgaWYgKHZhbHVlTmFtZS5kYXRhKSB7XG4gICAgICAgIGl0ZW0uZWxtLnNldEF0dHJpYnV0ZSgnZGF0YS0nK3ZhbHVlTmFtZS5kYXRhLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZS5hdHRyICYmIHZhbHVlTmFtZS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSh2YWx1ZU5hbWUuYXR0ciwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIGlmICghdGVtcGxhdGVyLmNyZWF0ZShpdGVtKSkge1xuICAgICAgZm9yKHZhciB2IGluIHZhbHVlcykge1xuICAgICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KHYpKSB7XG4gICAgICAgICAgc2V0VmFsdWUodiwgdmFsdWVzW3ZdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXRlbVNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgbGlzdCBuZWVkIHRvIGhhdmUgYXQgbGlzdCBvbmUgaXRlbSBvbiBpbml0IG90aGVyd2lzZSB5b3UnbGwgaGF2ZSB0byBhZGQgYSB0ZW1wbGF0ZS5cIik7XG4gICAgfVxuICAgIC8qIElmIGl0ZW0gc291cmNlIGRvZXMgbm90IGV4aXN0cywgdXNlIHRoZSBmaXJzdCBpdGVtIGluIGxpc3QgYXNcbiAgICBzb3VyY2UgZm9yIG5ldyBpdGVtcyAqL1xuICAgIHZhciBuZXdJdGVtID0gaXRlbVNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgbmV3SXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaXRlbS5lbG0gPSBuZXdJdGVtO1xuICAgIHRlbXBsYXRlci5zZXQoaXRlbSwgaXRlbS52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbS5wYXJlbnROb2RlID09PSBsaXN0Lmxpc3QpIHtcbiAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChpdGVtLmVsbSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNob3cgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgdGVtcGxhdGVyLmNyZWF0ZShpdGVtKTtcbiAgICBsaXN0Lmxpc3QuYXBwZW5kQ2hpbGQoaXRlbS5lbG0pO1xuICB9O1xuICB0aGlzLmhpZGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtICE9PSB1bmRlZmluZWQgJiYgaXRlbS5lbG0ucGFyZW50Tm9kZSA9PT0gbGlzdC5saXN0KSB7XG4gICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQoaXRlbS5lbG0pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIC8qIC5pbm5lckhUTUwgPSAnJzsgZnVja3MgdXAgSUUgKi9cbiAgICBpZiAobGlzdC5saXN0Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgd2hpbGUgKGxpc3QubGlzdC5jaGlsZE5vZGVzLmxlbmd0aCA+PSAxKVxuICAgICAge1xuICAgICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQobGlzdC5saXN0LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBpbml0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgcmV0dXJuIG5ldyBUZW1wbGF0ZXIobGlzdCk7XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBpbmRleCA9IHJlcXVpcmUoJy4vaW5kZXgtb2YnKTtcblxuLyoqXG4gKiBXaGl0ZXNwYWNlIHJlZ2V4cC5cbiAqL1xuXG52YXIgcmUgPSAvXFxzKy87XG5cbi8qKlxuICogdG9TdHJpbmcgcmVmZXJlbmNlLlxuICovXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogV3JhcCBgZWxgIGluIGEgYENsYXNzTGlzdGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsKXtcbiAgcmV0dXJuIG5ldyBDbGFzc0xpc3QoZWwpO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IENsYXNzTGlzdCBmb3IgYGVsYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBDbGFzc0xpc3QoZWwpIHtcbiAgaWYgKCFlbCB8fCAhZWwubm9kZVR5cGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgRE9NIGVsZW1lbnQgcmVmZXJlbmNlIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgdGhpcy5lbCA9IGVsO1xuICB0aGlzLmxpc3QgPSBlbC5jbGFzc0xpc3Q7XG59XG5cbi8qKlxuICogQWRkIGNsYXNzIGBuYW1lYCBpZiBub3QgYWxyZWFkeSBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24obmFtZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgdGhpcy5saXN0LmFkZChuYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSB0aGlzLmFycmF5KCk7XG4gIHZhciBpID0gaW5kZXgoYXJyLCBuYW1lKTtcbiAgaWYgKCF+aSkgYXJyLnB1c2gobmFtZSk7XG4gIHRoaXMuZWwuY2xhc3NOYW1lID0gYXJyLmpvaW4oJyAnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBjbGFzcyBgbmFtZWAgd2hlbiBwcmVzZW50LCBvclxuICogcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byByZW1vdmVcbiAqIGFueSB3aGljaCBtYXRjaC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihuYW1lKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICB0aGlzLmxpc3QucmVtb3ZlKG5hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAofmkpIGFyci5zcGxpY2UoaSwgMSk7XG4gIHRoaXMuZWwuY2xhc3NOYW1lID0gYXJyLmpvaW4oJyAnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogVG9nZ2xlIGNsYXNzIGBuYW1lYCwgY2FuIGZvcmNlIHN0YXRlIHZpYSBgZm9yY2VgLlxuICpcbiAqIEZvciBicm93c2VycyB0aGF0IHN1cHBvcnQgY2xhc3NMaXN0LCBidXQgZG8gbm90IHN1cHBvcnQgYGZvcmNlYCB5ZXQsXG4gKiB0aGUgbWlzdGFrZSB3aWxsIGJlIGRldGVjdGVkIGFuZCBjb3JyZWN0ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZm9yY2VcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbihuYW1lLCBmb3JjZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBmb3JjZSkge1xuICAgICAgaWYgKGZvcmNlICE9PSB0aGlzLmxpc3QudG9nZ2xlKG5hbWUsIGZvcmNlKSkge1xuICAgICAgICB0aGlzLmxpc3QudG9nZ2xlKG5hbWUpOyAvLyB0b2dnbGUgYWdhaW4gdG8gY29ycmVjdFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3QudG9nZ2xlKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgZm9yY2UpIHtcbiAgICBpZiAoIWZvcmNlKSB7XG4gICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQobmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh0aGlzLmhhcyhuYW1lKSkge1xuICAgICAgdGhpcy5yZW1vdmUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgY2xhc3Nlcy5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5hcnJheSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBjbGFzc05hbWUgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJztcbiAgdmFyIHN0ciA9IGNsYXNzTmFtZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIHZhciBhcnIgPSBzdHIuc3BsaXQocmUpO1xuICBpZiAoJycgPT09IGFyclswXSkgYXJyLnNoaWZ0KCk7XG4gIHJldHVybiBhcnI7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGNsYXNzIGBuYW1lYCBpcyBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuaGFzID1cbkNsYXNzTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHRoaXMubGlzdCA/IHRoaXMubGlzdC5jb250YWlucyhuYW1lKSA6ICEhIH5pbmRleCh0aGlzLmFycmF5KCksIG5hbWUpO1xufTtcbiIsInZhciBiaW5kID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuICAgIHVuYmluZCA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50JyxcbiAgICBwcmVmaXggPSBiaW5kICE9PSAnYWRkRXZlbnRMaXN0ZW5lcicgPyAnb24nIDogJycsXG4gICAgdG9BcnJheSA9IHJlcXVpcmUoJy4vdG8tYXJyYXknKTtcblxuLyoqXG4gKiBCaW5kIGBlbGAgZXZlbnQgYHR5cGVgIHRvIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbCwgTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uIG9yIEFycmF5XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FwdHVyZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBlbCA9IHRvQXJyYXkoZWwpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKyApIHtcbiAgICBlbFtpXVtiaW5kXShwcmVmaXggKyB0eXBlLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG4gIH1cbn07XG5cbi8qKlxuICogVW5iaW5kIGBlbGAgZXZlbnQgYHR5cGVgJ3MgY2FsbGJhY2sgYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsLCBOb2RlTGlzdCwgSFRNTENvbGxlY3Rpb24gb3IgQXJyYXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudW5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWwgPSB0b0FycmF5KGVsKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKysgKSB7XG4gICAgZWxbaV1bdW5iaW5kXShwcmVmaXggKyB0eXBlLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG4gIH1cbn07XG4iLCIvKlxuICogU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vc2VnbWVudGlvL2V4dGVuZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kIChvYmplY3QpIHtcbiAgICAvLyBUYWtlcyBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIGV4dGVuZGVycy5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICAvLyBGb3IgZWFjaCBleHRlbmRlciwgY29weSB0aGVpciBwcm9wZXJ0aWVzIG9uIG91ciBvYmplY3QuXG4gICAgZm9yICh2YXIgaSA9IDAsIHNvdXJjZTsgc291cmNlID0gYXJnc1tpXTsgaSsrKSB7XG4gICAgICAgIGlmICghc291cmNlKSBjb250aW51ZTtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBvYmplY3RbcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0ZXh0LCBwYXR0ZXJuLCBvcHRpb25zKSB7XG4gICAgLy8gQXByb3hpbWF0ZWx5IHdoZXJlIGluIHRoZSB0ZXh0IGlzIHRoZSBwYXR0ZXJuIGV4cGVjdGVkIHRvIGJlIGZvdW5kP1xuICAgIHZhciBNYXRjaF9Mb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gfHwgMDtcblxuICAgIC8vRGV0ZXJtaW5lcyBob3cgY2xvc2UgdGhlIG1hdGNoIG11c3QgYmUgdG8gdGhlIGZ1enp5IGxvY2F0aW9uIChzcGVjaWZpZWQgYWJvdmUpLiBBbiBleGFjdCBsZXR0ZXIgbWF0Y2ggd2hpY2ggaXMgJ2Rpc3RhbmNlJyBjaGFyYWN0ZXJzIGF3YXkgZnJvbSB0aGUgZnV6enkgbG9jYXRpb24gd291bGQgc2NvcmUgYXMgYSBjb21wbGV0ZSBtaXNtYXRjaC4gQSBkaXN0YW5jZSBvZiAnMCcgcmVxdWlyZXMgdGhlIG1hdGNoIGJlIGF0IHRoZSBleGFjdCBsb2NhdGlvbiBzcGVjaWZpZWQsIGEgdGhyZXNob2xkIG9mICcxMDAwJyB3b3VsZCByZXF1aXJlIGEgcGVyZmVjdCBtYXRjaCB0byBiZSB3aXRoaW4gODAwIGNoYXJhY3RlcnMgb2YgdGhlIGZ1enp5IGxvY2F0aW9uIHRvIGJlIGZvdW5kIHVzaW5nIGEgMC44IHRocmVzaG9sZC5cbiAgICB2YXIgTWF0Y2hfRGlzdGFuY2UgPSBvcHRpb25zLmRpc3RhbmNlIHx8IDEwMDtcblxuICAgIC8vIEF0IHdoYXQgcG9pbnQgZG9lcyB0aGUgbWF0Y2ggYWxnb3JpdGhtIGdpdmUgdXAuIEEgdGhyZXNob2xkIG9mICcwLjAnIHJlcXVpcmVzIGEgcGVyZmVjdCBtYXRjaCAob2YgYm90aCBsZXR0ZXJzIGFuZCBsb2NhdGlvbiksIGEgdGhyZXNob2xkIG9mICcxLjAnIHdvdWxkIG1hdGNoIGFueXRoaW5nLlxuICAgIHZhciBNYXRjaF9UaHJlc2hvbGQgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAwLjQ7XG5cbiAgICBpZiAocGF0dGVybiA9PT0gdGV4dCkgcmV0dXJuIHRydWU7IC8vIEV4YWN0IG1hdGNoXG4gICAgaWYgKHBhdHRlcm4ubGVuZ3RoID4gMzIpIHJldHVybiBmYWxzZTsgLy8gVGhpcyBhbGdvcml0aG0gY2Fubm90IGJlIHVzZWRcblxuICAgIC8vIFNldCBzdGFydGluZyBsb2NhdGlvbiBhdCBiZWdpbm5pbmcgdGV4dCBhbmQgaW5pdGlhbGlzZSB0aGUgYWxwaGFiZXQuXG4gICAgdmFyIGxvYyA9IE1hdGNoX0xvY2F0aW9uLFxuICAgICAgICBzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHEgPSB7fSxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHFbcGF0dGVybi5jaGFyQXQoaSldID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBxW3BhdHRlcm4uY2hhckF0KGkpXSB8PSAxIDw8IChwYXR0ZXJuLmxlbmd0aCAtIGkgLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHE7XG4gICAgICAgIH0oKSk7XG5cbiAgICAvLyBDb21wdXRlIGFuZCByZXR1cm4gdGhlIHNjb3JlIGZvciBhIG1hdGNoIHdpdGggZSBlcnJvcnMgYW5kIHggbG9jYXRpb24uXG4gICAgLy8gQWNjZXNzZXMgbG9jIGFuZCBwYXR0ZXJuIHRocm91Z2ggYmVpbmcgYSBjbG9zdXJlLlxuXG4gICAgZnVuY3Rpb24gbWF0Y2hfYml0YXBTY29yZV8oZSwgeCkge1xuICAgICAgICB2YXIgYWNjdXJhY3kgPSBlIC8gcGF0dGVybi5sZW5ndGgsXG4gICAgICAgICAgICBwcm94aW1pdHkgPSBNYXRoLmFicyhsb2MgLSB4KTtcblxuICAgICAgICBpZiAoIU1hdGNoX0Rpc3RhbmNlKSB7XG4gICAgICAgICAgICAvLyBEb2RnZSBkaXZpZGUgYnkgemVybyBlcnJvci5cbiAgICAgICAgICAgIHJldHVybiBwcm94aW1pdHkgPyAxLjAgOiBhY2N1cmFjeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdXJhY3kgKyAocHJveGltaXR5IC8gTWF0Y2hfRGlzdGFuY2UpO1xuICAgIH1cblxuICAgIHZhciBzY29yZV90aHJlc2hvbGQgPSBNYXRjaF9UaHJlc2hvbGQsIC8vIEhpZ2hlc3Qgc2NvcmUgYmV5b25kIHdoaWNoIHdlIGdpdmUgdXAuXG4gICAgICAgIGJlc3RfbG9jID0gdGV4dC5pbmRleE9mKHBhdHRlcm4sIGxvYyk7IC8vIElzIHRoZXJlIGEgbmVhcmJ5IGV4YWN0IG1hdGNoPyAoc3BlZWR1cClcblxuICAgIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBNYXRoLm1pbihtYXRjaF9iaXRhcFNjb3JlXygwLCBiZXN0X2xvYyksIHNjb3JlX3RocmVzaG9sZCk7XG4gICAgICAgIC8vIFdoYXQgYWJvdXQgaW4gdGhlIG90aGVyIGRpcmVjdGlvbj8gKHNwZWVkdXApXG4gICAgICAgIGJlc3RfbG9jID0gdGV4dC5sYXN0SW5kZXhPZihwYXR0ZXJuLCBsb2MgKyBwYXR0ZXJuLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKGJlc3RfbG9jICE9IC0xKSB7XG4gICAgICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBNYXRoLm1pbihtYXRjaF9iaXRhcFNjb3JlXygwLCBiZXN0X2xvYyksIHNjb3JlX3RocmVzaG9sZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXNlIHRoZSBiaXQgYXJyYXlzLlxuICAgIHZhciBtYXRjaG1hc2sgPSAxIDw8IChwYXR0ZXJuLmxlbmd0aCAtIDEpO1xuICAgIGJlc3RfbG9jID0gLTE7XG5cbiAgICB2YXIgYmluX21pbiwgYmluX21pZDtcbiAgICB2YXIgYmluX21heCA9IHBhdHRlcm4ubGVuZ3RoICsgdGV4dC5sZW5ndGg7XG4gICAgdmFyIGxhc3RfcmQ7XG4gICAgZm9yICh2YXIgZCA9IDA7IGQgPCBwYXR0ZXJuLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgIC8vIFNjYW4gZm9yIHRoZSBiZXN0IG1hdGNoOyBlYWNoIGl0ZXJhdGlvbiBhbGxvd3MgZm9yIG9uZSBtb3JlIGVycm9yLlxuICAgICAgICAvLyBSdW4gYSBiaW5hcnkgc2VhcmNoIHRvIGRldGVybWluZSBob3cgZmFyIGZyb20gJ2xvYycgd2UgY2FuIHN0cmF5IGF0IHRoaXNcbiAgICAgICAgLy8gZXJyb3IgbGV2ZWwuXG4gICAgICAgIGJpbl9taW4gPSAwO1xuICAgICAgICBiaW5fbWlkID0gYmluX21heDtcbiAgICAgICAgd2hpbGUgKGJpbl9taW4gPCBiaW5fbWlkKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCwgbG9jICsgYmluX21pZCkgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgYmluX21pbiA9IGJpbl9taWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJpbl9tYXggPSBiaW5fbWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmluX21pZCA9IE1hdGguZmxvb3IoKGJpbl9tYXggLSBiaW5fbWluKSAvIDIgKyBiaW5fbWluKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVc2UgdGhlIHJlc3VsdCBmcm9tIHRoaXMgaXRlcmF0aW9uIGFzIHRoZSBtYXhpbXVtIGZvciB0aGUgbmV4dC5cbiAgICAgICAgYmluX21heCA9IGJpbl9taWQ7XG4gICAgICAgIHZhciBzdGFydCA9IE1hdGgubWF4KDEsIGxvYyAtIGJpbl9taWQgKyAxKTtcbiAgICAgICAgdmFyIGZpbmlzaCA9IE1hdGgubWluKGxvYyArIGJpbl9taWQsIHRleHQubGVuZ3RoKSArIHBhdHRlcm4ubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZCA9IEFycmF5KGZpbmlzaCArIDIpO1xuICAgICAgICByZFtmaW5pc2ggKyAxXSA9ICgxIDw8IGQpIC0gMTtcbiAgICAgICAgZm9yICh2YXIgaiA9IGZpbmlzaDsgaiA+PSBzdGFydDsgai0tKSB7XG4gICAgICAgICAgICAvLyBUaGUgYWxwaGFiZXQgKHMpIGlzIGEgc3BhcnNlIGhhc2gsIHNvIHRoZSBmb2xsb3dpbmcgbGluZSBnZW5lcmF0ZXNcbiAgICAgICAgICAgIC8vIHdhcm5pbmdzLlxuICAgICAgICAgICAgdmFyIGNoYXJNYXRjaCA9IHNbdGV4dC5jaGFyQXQoaiAtIDEpXTtcbiAgICAgICAgICAgIGlmIChkID09PSAwKSB7ICAgIC8vIEZpcnN0IHBhc3M6IGV4YWN0IG1hdGNoLlxuICAgICAgICAgICAgICAgIHJkW2pdID0gKChyZFtqICsgMV0gPDwgMSkgfCAxKSAmIGNoYXJNYXRjaDtcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgIC8vIFN1YnNlcXVlbnQgcGFzc2VzOiBmdXp6eSBtYXRjaC5cbiAgICAgICAgICAgICAgICByZFtqXSA9ICgoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoKSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKGxhc3RfcmRbaiArIDFdIHwgbGFzdF9yZFtqXSkgPDwgMSkgfCAxKSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfcmRbaiArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJkW2pdICYgbWF0Y2htYXNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gbWF0Y2hfYml0YXBTY29yZV8oZCwgaiAtIDEpO1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgbWF0Y2ggd2lsbCBhbG1vc3QgY2VydGFpbmx5IGJlIGJldHRlciB0aGFuIGFueSBleGlzdGluZyBtYXRjaC5cbiAgICAgICAgICAgICAgICAvLyBCdXQgY2hlY2sgYW55d2F5LlxuICAgICAgICAgICAgICAgIGlmIChzY29yZSA8PSBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9sZCB5b3Ugc28uXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBiZXN0X2xvYyA9IGogLSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdF9sb2MgPiBsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gcGFzc2luZyBsb2MsIGRvbid0IGV4Y2VlZCBvdXIgY3VycmVudCBkaXN0YW5jZSBmcm9tIGxvYy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMSwgMiAqIGxvYyAtIGJlc3RfbG9jKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFscmVhZHkgcGFzc2VkIGxvYywgZG93bmhpbGwgZnJvbSBoZXJlIG9uIGluLlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm8gaG9wZSBmb3IgYSAoYmV0dGVyKSBtYXRjaCBhdCBncmVhdGVyIGVycm9yIGxldmVscy5cbiAgICAgICAgaWYgKG1hdGNoX2JpdGFwU2NvcmVfKGQgKyAxLCBsb2MpID4gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsYXN0X3JkID0gcmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIChiZXN0X2xvYyA8IDApID8gZmFsc2UgOiB0cnVlO1xufTtcbiIsIi8qKlxuICogQSBjcm9zcy1icm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGdldEF0dHJpYnV0ZS5cbiAqIFNvdXJjZSBmb3VuZCBoZXJlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zNzU1MzQzLzM2MTMzNyB3cml0dGVuIGJ5IFZpdmluIFBhbGlhdGhcbiAqXG4gKiBSZXR1cm4gdGhlIHZhbHVlIGZvciBgYXR0cmAgYXQgYGVsZW1lbnRgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwsIGF0dHIpIHtcbiAgdmFyIHJlc3VsdCA9IChlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKGF0dHIpKSB8fCBudWxsO1xuICBpZiggIXJlc3VsdCApIHtcbiAgICB2YXIgYXR0cnMgPSBlbC5hdHRyaWJ1dGVzO1xuICAgIHZhciBsZW5ndGggPSBhdHRycy5sZW5ndGg7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXR0cltpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmKGF0dHJbaV0ubm9kZU5hbWUgPT09IGF0dHIpIHtcbiAgICAgICAgICByZXN1bHQgPSBhdHRyW2ldLm5vZGVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuICogQSBjcm9zcy1icm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGdldEVsZW1lbnRzQnlDbGFzcy5cbiAqIEhlYXZpbHkgYmFzZWQgb24gRHVzdGluIERpYXoncyBmdW5jdGlvbjogaHR0cDovL2R1c3RpbmRpYXouY29tL2dldGVsZW1lbnRzYnljbGFzcy5cbiAqXG4gKiBGaW5kIGFsbCBlbGVtZW50cyB3aXRoIGNsYXNzIGBjbGFzc05hbWVgIGluc2lkZSBgY29udGFpbmVyYC5cbiAqIFVzZSBgc2luZ2xlID0gdHJ1ZWAgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UgaW4gb2xkZXIgYnJvd3NlcnNcbiAqIHdoZW4gb25seSBvbmUgZWxlbWVudCBpcyBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc2luZ2xlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnZhciBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICBpZiAoc2luZ2xlKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cbnZhciBxdWVyeVNlbGVjdG9yID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICBjbGFzc05hbWUgPSAnLicgKyBjbGFzc05hbWU7XG4gIGlmIChzaW5nbGUpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lKTtcbiAgfVxufTtcblxudmFyIHBvbHlmaWxsID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICB2YXIgY2xhc3NFbGVtZW50cyA9IFtdLFxuICAgIHRhZyA9ICcqJztcblxuICB2YXIgZWxzID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG4gIHZhciBlbHNMZW4gPSBlbHMubGVuZ3RoO1xuICB2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIitjbGFzc05hbWUrXCIoXFxcXHN8JClcIik7XG4gIGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IGVsc0xlbjsgaSsrKSB7XG4gICAgaWYgKCBwYXR0ZXJuLnRlc3QoZWxzW2ldLmNsYXNzTmFtZSkgKSB7XG4gICAgICBpZiAoc2luZ2xlKSB7XG4gICAgICAgIHJldHVybiBlbHNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGFzc0VsZW1lbnRzW2pdID0gZWxzW2ldO1xuICAgICAgICBqKys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGFzc0VsZW1lbnRzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKChvcHRpb25zLnRlc3QgJiYgb3B0aW9ucy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSB8fCAoIW9wdGlvbnMudGVzdCAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlDbGFzc05hbWUoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfSBlbHNlIGlmICgob3B0aW9ucy50ZXN0ICYmIG9wdGlvbnMucXVlcnlTZWxlY3RvcikgfHwgKCFvcHRpb25zLnRlc3QgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBxdWVyeVNlbGVjdG9yKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcG9seWZpbGwoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfVxuICB9O1xufSkoKTtcbiIsInZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIG9iail7XG4gIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCIvKipcbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3RpbW94bGV5L3RvLWFycmF5XG4gKlxuICogQ29udmVydCBhbiBhcnJheS1saWtlIG9iamVjdCBpbnRvIGFuIGBBcnJheWAuXG4gKiBJZiBgY29sbGVjdGlvbmAgaXMgYWxyZWFkeSBhbiBgQXJyYXlgLCB0aGVuIHdpbGwgcmV0dXJuIGEgY2xvbmUgb2YgYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkgfCBNaXhlZH0gY29sbGVjdGlvbiBBbiBgQXJyYXlgIG9yIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGNvbnZlcnQgZS5nLiBgYXJndW1lbnRzYCBvciBgTm9kZUxpc3RgXG4gKiBAcmV0dXJuIHtBcnJheX0gTmFpdmUgY29udmVyc2lvbiBvZiBgY29sbGVjdGlvbmAgdG8gYSBuZXcgYEFycmF5YC5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b0FycmF5KGNvbGxlY3Rpb24pIHtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAndW5kZWZpbmVkJykgcmV0dXJuIFtdO1xuICBpZiAoY29sbGVjdGlvbiA9PT0gbnVsbCkgcmV0dXJuIFtudWxsXTtcbiAgaWYgKGNvbGxlY3Rpb24gPT09IHdpbmRvdykgcmV0dXJuIFt3aW5kb3ddO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdzdHJpbmcnKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkgcmV0dXJuIGNvbGxlY3Rpb247XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbi5sZW5ndGggIT0gJ251bWJlcicpIHJldHVybiBbY29sbGVjdGlvbl07XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2xsZWN0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pIHJldHVybiBbY29sbGVjdGlvbl07XG5cbiAgdmFyIGFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbGxlY3Rpb24sIGkpIHx8IGkgaW4gY29sbGVjdGlvbikge1xuICAgICAgYXJyLnB1c2goY29sbGVjdGlvbltpXSk7XG4gICAgfVxuICB9XG4gIGlmICghYXJyLmxlbmd0aCkgcmV0dXJuIFtdO1xuICByZXR1cm4gYXJyO1xufTtcblxuZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHMpIHtcbiAgcyA9IChzID09PSB1bmRlZmluZWQpID8gXCJcIiA6IHM7XG4gIHMgPSAocyA9PT0gbnVsbCkgPyBcIlwiIDogcztcbiAgcyA9IHMudG9TdHJpbmcoKTtcbiAgcmV0dXJuIHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQ7XG52YXIgYWxwaGFiZXRJbmRleE1hcDtcbnZhciBhbHBoYWJldEluZGV4TWFwTGVuZ3RoID0gMDtcblxuZnVuY3Rpb24gaXNOdW1iZXJDb2RlKGNvZGUpIHtcbiAgcmV0dXJuIGNvZGUgPj0gNDggJiYgY29kZSA8PSA1Nztcbn1cblxuZnVuY3Rpb24gbmF0dXJhbENvbXBhcmUoYSwgYikge1xuICB2YXIgbGVuZ3RoQSA9IChhICs9ICcnKS5sZW5ndGg7XG4gIHZhciBsZW5ndGhCID0gKGIgKz0gJycpLmxlbmd0aDtcbiAgdmFyIGFJbmRleCA9IDA7XG4gIHZhciBiSW5kZXggPSAwO1xuXG4gIHdoaWxlIChhSW5kZXggPCBsZW5ndGhBICYmIGJJbmRleCA8IGxlbmd0aEIpIHtcbiAgICB2YXIgY2hhckNvZGVBID0gYS5jaGFyQ29kZUF0KGFJbmRleCk7XG4gICAgdmFyIGNoYXJDb2RlQiA9IGIuY2hhckNvZGVBdChiSW5kZXgpO1xuXG4gICAgaWYgKGlzTnVtYmVyQ29kZShjaGFyQ29kZUEpKSB7XG4gICAgICBpZiAoIWlzTnVtYmVyQ29kZShjaGFyQ29kZUIpKSB7XG4gICAgICAgIHJldHVybiBjaGFyQ29kZUEgLSBjaGFyQ29kZUI7XG4gICAgICB9XG5cbiAgICAgIHZhciBudW1TdGFydEEgPSBhSW5kZXg7XG4gICAgICB2YXIgbnVtU3RhcnRCID0gYkluZGV4O1xuXG4gICAgICB3aGlsZSAoY2hhckNvZGVBID09PSA0OCAmJiArK251bVN0YXJ0QSA8IGxlbmd0aEEpIHtcbiAgICAgICAgY2hhckNvZGVBID0gYS5jaGFyQ29kZUF0KG51bVN0YXJ0QSk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoY2hhckNvZGVCID09PSA0OCAmJiArK251bVN0YXJ0QiA8IGxlbmd0aEIpIHtcbiAgICAgICAgY2hhckNvZGVCID0gYi5jaGFyQ29kZUF0KG51bVN0YXJ0Qik7XG4gICAgICB9XG5cbiAgICAgIHZhciBudW1FbmRBID0gbnVtU3RhcnRBO1xuICAgICAgdmFyIG51bUVuZEIgPSBudW1TdGFydEI7XG5cbiAgICAgIHdoaWxlIChudW1FbmRBIDwgbGVuZ3RoQSAmJiBpc051bWJlckNvZGUoYS5jaGFyQ29kZUF0KG51bUVuZEEpKSkge1xuICAgICAgICArK251bUVuZEE7XG4gICAgICB9XG4gICAgICB3aGlsZSAobnVtRW5kQiA8IGxlbmd0aEIgJiYgaXNOdW1iZXJDb2RlKGIuY2hhckNvZGVBdChudW1FbmRCKSkpIHtcbiAgICAgICAgKytudW1FbmRCO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGlmZmVyZW5jZSA9IG51bUVuZEEgLSBudW1TdGFydEEgLSBudW1FbmRCICsgbnVtU3RhcnRCOyAvLyBudW1BIGxlbmd0aCAtIG51bUIgbGVuZ3RoXG4gICAgICBpZiAoZGlmZmVyZW5jZSkge1xuICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKG51bVN0YXJ0QSA8IG51bUVuZEEpIHtcbiAgICAgICAgZGlmZmVyZW5jZSA9IGEuY2hhckNvZGVBdChudW1TdGFydEErKykgLSBiLmNoYXJDb2RlQXQobnVtU3RhcnRCKyspO1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSkge1xuICAgICAgICAgIHJldHVybiBkaWZmZXJlbmNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFJbmRleCA9IG51bUVuZEE7XG4gICAgICBiSW5kZXggPSBudW1FbmRCO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoYXJDb2RlQSAhPT0gY2hhckNvZGVCKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYXJDb2RlQSA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGggJiZcbiAgICAgICAgY2hhckNvZGVCIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aCAmJlxuICAgICAgICBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQV0gIT09IC0xICYmXG4gICAgICAgIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVCXSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUFdIC0gYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hhckNvZGVBIC0gY2hhckNvZGVCO1xuICAgIH1cblxuICAgICsrYUluZGV4O1xuICAgICsrYkluZGV4O1xuICB9XG5cbiAgcmV0dXJuIGxlbmd0aEEgLSBsZW5ndGhCO1xufVxuXG5uYXR1cmFsQ29tcGFyZS5jYXNlSW5zZW5zaXRpdmUgPSBuYXR1cmFsQ29tcGFyZS5pID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gbmF0dXJhbENvbXBhcmUoKCcnICsgYSkudG9Mb3dlckNhc2UoKSwgKCcnICsgYikudG9Mb3dlckNhc2UoKSk7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhuYXR1cmFsQ29tcGFyZSwge1xuICBhbHBoYWJldDoge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYWxwaGFiZXQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBhbHBoYWJldCA9IHZhbHVlO1xuICAgICAgYWxwaGFiZXRJbmRleE1hcCA9IFtdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgaWYgKGFscGhhYmV0KSB7XG4gICAgICAgIGZvciAoOyBpIDwgYWxwaGFiZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhbHBoYWJldEluZGV4TWFwW2FscGhhYmV0LmNoYXJDb2RlQXQoaSldID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWxwaGFiZXRJbmRleE1hcExlbmd0aCA9IGFscGhhYmV0SW5kZXhNYXAubGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWxwaGFiZXRJbmRleE1hcFtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtpXSA9IC0xO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdHVyYWxDb21wYXJlO1xuIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcImJyZWFrcG9pbnRzXCIgOiB7XG4gICAgXCJ4c1wiOiBcIjQ4MHB4XCIsXG4gICAgXCJzbVwiOiBcIjYyMHB4XCIsXG4gICAgXCJtZFwiOiBcIjc2MHB4XCIsXG4gICAgXCJsZ1wiOiBcIjk5MHB4XCIsXG4gICAgXCJ4bFwiOiBcIjEzODBweFwiXG4gIH1cbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgdHJpZ2dlcjogJ1tkYXRhLWRpc21pc3NdJyxcbiAgICB0YXJnZXQ6ICdbZGF0YS1kaXNtaXNzaWJsZV0nLFxuICAgIGNsYXNzVG9nZ2xlOiAnZGlzbWlzcydcbiAgfVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgbGV0IHRhcmdldCA9IHRyaWdnZXIuY2xvc2VzdChzZXR0aW5ncy50YXJnZXQpXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc1RvZ2dsZSlcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbi8qKlxuICogRHJhd2VyIHBsdWdpblxuICogLS0tXG4gKiBBIGNvbnRhaW5lciBjb21wb25lbnQgdGhhdCBzbGlkZXMgaW4gZnJvbSB0aGUgbGVmdCBvciByaWdodC4gSXQgdHlwaWNhbGx5XG4gKiBjb250YWlucyBtZW51cywgc2VhcmNoIG9yIG90aGVyIGNvbnRlbnQgZm9yIHlvdXIgYXBwLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgLy8gVGhlIGFwaSB3aGVyZSB3ZSBhc3NpZ24gb3VyIG1ldGhvZHMgdG8gYW5kIHJldHVybiBhZnRlciBydW5uaW5nIGluaXRcbiAgbGV0IGFwaSA9IHt9XG5cbiAgLy8gVGhlIHNldHRpbmdzIG9iamVjdCB3aGljaCB3aWxsIGNvbnRhaW4gb3VyIG1lcmdlZCBvcHRpb25zIGFuZCBkZWZhdWx0cyBvYmpcbiAgbGV0IHNldHRpbmdzXG5cbiAgLy8gVGhlIGRlZmF1bHQgc2V0dGluZ3Mgb2YgdGhlIGNvbXBvbmVudFxuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAvLyBDbGFzcyBvcHRpb25zXG4gICAgLy8ge3N0cmluZ30gVGhlIGNsYXNzIG5hbWUgdG8gYmUgc2VhcmNoZWQgZm9yIG9yIHVzZWRcbiAgICBjbGFzc1RyaWdnZXI6ICdkcmF3ZXJfX3RyaWdnZXInLFxuICAgIGNsYXNzRHJhd2VyOiAnZHJhd2VyJyxcbiAgICBjbGFzc0RpYWxvZzogJ2RyYXdlcl9fZGlhbG9nJyxcbiAgICBjbGFzc01vZGFsOiAnbW9kYWwnLFxuICAgIGNsYXNzQWN0aXZlOiAnaXMtYWN0aXZlJyxcblxuICAgIC8vIFdoZXRoZXIgb3Igbm90IHRvIGVuYWJsZSB0aGUgc3dpdGNoIGZ1bmN0aW9uYWxpdHlcbiAgICAvLyB7ZmFsc2V9IHx8IHtzdHJpbmd9IGUuZy4gJ1tkYXRhLWRyYXdlci1zd2l0Y2hdJ1xuICAgIHN3aXRjaDogJ1tkYXRhLWRyYXdlci1zd2l0Y2hdJyxcblxuICAgIC8vIFRoZSBkZWZhdWx0IGJyZWFrIHBvaW50IGZvciB3aGVuIHRvIHN3aXRjaCB0byBkcmF3ZXIgb3IgbW9kYWwgY2xhc3Nlc1xuICAgIC8vIHtzdHJpbmd9IEVpdGhlciBhIGJyZWFrcG9pbnQga2V5IG9yIHBpeGVsIHZhbHVlXG4gICAgc3dpdGNoQnJlYWtwb2ludDogJ2xnJyxcblxuICAgIC8vIFdoZXRoZXIgb3Igbm90IHRvIHN0b3JlIHRoZSBzYXZlIHN0YXRlIGluIGxvY2FsIHN0b3JhZ2VcbiAgICAvLyB7ZmFsc2V9IHx8IHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gc2F2ZSBvdXIgc3RhdGUgb2JqZWN0IGFzXG4gICAgc2F2ZVN0YXRlOiAnZHJhd2VyU3RhdGUnLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gb3V0cHV0IGNvbXBvbmVudCBiZWhhdmlvciBpbiBjb25zb2xlXG4gICAgZGVidWc6IHRydWVcbiAgfVxuXG4gIC8vIERyYXdlciBzcGVjaWZpYyB2YXJpYWJsZXNcbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBkcmF3ZXJzIGF2YWlsYWJsZSBpbiB0aGUgRE9NXG4gIGxldCBkcmF3ZXJzXG4gIC8vIFdoZXJlIHdlIHN0b3JlIGFsbCBvdXIgc3dpdGNoIGRyYXdlcnMgYXZhaWxhYmxlIGluIHRoZSBET01cbiAgbGV0IHN3aXRjaERyYXdlcnNcbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYSBzYXZlIHN0YXRlIG9iamVjdCBiZWZvcmUgd2UgcGFzcyBpdCB0byBsb2NhbCBzdG9yYWdlXG4gIGxldCBkcmF3ZXJTdGF0ZSA9IHt9XG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBtZXRob2QsIHJ1biBhcyBzb29uIGFzIGFuIGluc3RhbmNlIGlzIGNyZWF0ZWRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAtIEEganNvbiBvYmplY3Qgd2l0aCB5b3VyIGN1c3RvbSBzZXR0aW5nc1xuICAgKi9cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuXG4gICAgLy8gTWVyZ2UgdGhlIGRlZmF1bHRzIGFuZCBwYXNzZWQgb3B0aW9ucyBpbnRvIG91ciBzZXR0aW5ncyBvYmpcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG5cbiAgICAvLyBHZXQgYWxsIHRoZSBkcmF3ZXJzIG9uIHRoZSBwYWdlXG4gICAgZHJhd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgc2V0dGluZ3MuY2xhc3NEcmF3ZXIpXG5cbiAgICAvLyBJbml0IHNhdmUgc3RhdGUgZnVuY3Rpb25hbGl0eSBpZiBpdCdzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBpbml0U2F2ZVN0YXRlKClcbiAgICB9XG5cbiAgICAvLyBJbml0IHN3aXRjaCBmdW5jdGlvbmFsaXR5IGlmIGl0J3MgZW5hYmxlZFxuICAgIGlmIChzZXR0aW5ncy5zd2l0Y2gpIHtcbiAgICAgIGluaXRTd2l0Y2goKVxuICAgIH1cblxuICAgIC8vIEFkZCBvdXIgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWNvbnN0cnVjdG9yIG1ldGhvZCwgdXNlZCB0byByZXNldCBvciBkZXN0b3J5IHRoZSBkcmF3ZXIgaW5zdGFuY2VcbiAgICovXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIC8vIENsZWFyIG91ciB2YXJpYWJsZXNcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkcmF3ZXJzID0gbnVsbFxuICAgIHN3aXRjaERyYXdlcnMgPSBudWxsXG4gICAgZHJhd2VyU3RhdGUgPSB7fVxuICAgIC8vIERlbGV0ZSB0aGUgbG9jYWwgc3RvcmFnZSBkYXRhXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oc2V0dGluZ3Muc2F2ZVN0YXRlKVxuICAgIC8vIFJlbW92ZSB0aGUgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gb3BlbiBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzRHJhd2VyXG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnb3BlbicpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBjbG9zZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLmNsb3NlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc0RyYXdlclxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgJ2Nsb3NlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHRvZ2dsZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnRvZ2dsZSA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NEcmF3ZXJcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgZHJhd2VyIGN1cnJlbnQgZHJhd2VyIHN0YXRlXG4gICAqL1xuICBhcGkuc3RhdGVTYXZlID0gKCkgPT4ge1xuICAgIHN0YXRlU2F2ZSgpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIHRvIGRyYXdlciBkZWZhdWx0IHN0YXRlXG4gICAqL1xuICBhcGkuc3RhdGVSZXNldCA9ICgpID0+IHtcbiAgICBzdGF0ZVJlc2V0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IC0gVGhlIGRyYXdlciBlbGVtZW50KHMpIHRvIGNsb3NlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbJ29wZW4nIHx8ICdjbG9zZScgfHwgJ3RvZ2dsZSddIC0gV2hldGhlciB0byBvcGVuLCBjbG9zZVxuICAgKiAgb3IgdG9nZ2xlIHRoZSBkcmF3ZXIocylcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnN0IHRvZ2dsZSA9IChkcmF3ZXIsIHN0YXRlLCBjYWxsYmFjaykgPT4ge1xuXG4gICAgLy8gQ2hlY2sgaWYgZHJhd2VyKHMpIHNob3VsZCBiZSBvcGVuZWQsIGNsb3NlZCBvciB0b2dnbGVkIGFuZCBlaXRoZXIgYWRkIG9yXG4gICAgLy8gcmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3MgdG8gdGhlIHBhc3NlZCBkcmF3ZXIocylcbiAgICBpZiAoc3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgdS5hZGRDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdjbG9zZScpIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdS50b2dnbGVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHNhdmUgc3RhdGUgaXMgZW5hYmxlZFxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIHN0YXRlU2F2ZShkcmF3ZXIpXG4gICAgfVxuXG4gICAgLy8gRmlyZSB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gaWYgb25lIHdhcyBwYXNzZWRcbiAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2soKVxuICB9XG5cbiAgY29uc3QgdHJpZ2dlciA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgbGV0IGRhdGFEcmF3ZXIgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG4gICAgICBpZiAoZGF0YURyYXdlcikge1xuICAgICAgICBsZXQgZHJhd2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkYXRhRHJhd2VyKVxuICAgICAgICBpZiAoZHJhd2VyKSB7XG4gICAgICAgICAgdG9nZ2xlKGRyYXdlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGluaXRTYXZlU3RhdGUgPSAoKSA9PiB7XG5cbiAgICAvLyBJbml0OiBTZXR1cCBvdXIgdmFyaWFibGVzXG4gICAgLy8gR2V0IHRoZSBkcmF3ZXIgc3RhdGUgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAgLy8gQ2hlY2sgaWYgZHJhd2VyIHN0YXRlIHdhcyBzYXZlZCBvdGhlcndpc2UgaW5pdCBhIG5ldyBvYmplY3RcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oc2V0dGluZ3Muc2F2ZVN0YXRlKSkge1xuICAgICAgZHJhd2VyU3RhdGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHNldHRpbmdzLnNhdmVTdGF0ZSkpXG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBkcmF3ZXJzIGFuZCBzYXZlL2luaXQgdGhlaXIgc3RhdGVcbiAgICBkcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuXG4gICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc3RhdGUgaWYgb25lIGlzIG5vdCBzZXRcbiAgICAgIGlmIChkcmF3ZXIuaWQgaW4gZHJhd2VyU3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChkcmF3ZXIuaWQpIHtcbiAgICAgICAgICBkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID0gdS5oYXNDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHNldHRpbmdzLnNhdmVTdGF0ZSwgSlNPTi5zdHJpbmdpZnkoZHJhd2VyU3RhdGUpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBvdXIgZHJhd2VyIGRpYWxvZyBlbGVtZW50XG4gICAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy4nICsgc2V0dGluZ3MuY2xhc3NEaWFsb2cpXG5cbiAgICAgIC8vIEFkZCBhIG5vLXRyYW5zaXRpb24gY2xhc3MgYW5kIHJlbW92ZSBpdCB3aXRoaW4gYSB0cmFuc2l0aW9uIGR1cmF0aW9uXG4gICAgICB1LmFkZENsYXNzKGRpYWxvZywgJ3RyYW5zaXRpb25fbm9uZScpXG4gICAgICBsZXQgcmV2ZXJ0ID0gKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdS5yZW1vdmVDbGFzcyhkaWFsb2csICd0cmFuc2l0aW9uX25vbmUnKVxuICAgICAgICAgIH0sIDUwMFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIC8vIFRvZ2dsZSBvdXIgZHJhd2VyIHN0YXRlIGJhc2VkIG9uIHRoZSBzYXZlZCBzdGF0ZVxuICAgICAgaWYgKGRyYXdlclN0YXRlW2RyYXdlci5pZF0gPT09IGZhbHNlKSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdjbG9zZScsIHJldmVydClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdvcGVuJywgcmV2ZXJ0KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzdGF0ZVNhdmUgPSAoaXRlbXMpID0+IHtcblxuICAgIGl0ZW1zID0gKGl0ZW1zKSA/IGl0ZW1zIDogZHJhd2Vyc1xuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaWYgKCFpdGVtcy5mb3JFYWNoKSB7XG4gICAgICBpdGVtcyA9IHUudG9BcnJheShpdGVtcylcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggb3VyIGRyYXdlcnMgYW5kIHNhdmUgdGhlaXIgbmV3IHN0YXRlIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAvLyBPbmx5IHNhdmUgZHJhd2VyIHN0YXRlIGlmIGFuIGlkIGV4aXN0c1xuICAgICAgaWYgKGl0ZW0uaWQpIHtcbiAgICAgICAgZHJhd2VyU3RhdGVbaXRlbS5pZF0gPSB1Lmhhc0NsYXNzKGl0ZW0sIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzZXR0aW5ncy5zYXZlU3RhdGUsIEpTT04uc3RyaW5naWZ5KGRyYXdlclN0YXRlKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc3RhdGVSZXNldCA9ICgpID0+IHtcblxuICAgIC8vIFJlc2V0IG91ciBsb2NhbCBkcmF3ZXIgc3RhdGUgdmFyaWFibGVcbiAgICAvLyBEZWxldGUgdGhlIGxvY2FsIHN0b3JhZ2UgZGF0YVxuICAgIGRyYXdlclN0YXRlID0ge31cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShzZXR0aW5ncy5zYXZlU3RhdGUpXG4gIH1cblxuICBjb25zdCBpbml0U3dpdGNoID0gKCkgPT4ge1xuICAgIHN3aXRjaERyYXdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnN3aXRjaClcbiAgICBzd2l0Y2hEcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuICAgICAgLy8gR2V0IHRoZSBsb2NhbCBicmVha3BvaW50IGlmIG9uZSBpcyBzZXRcbiAgICAgIC8vIFJlbW92ZSBicmFja2V0cyBhbmQgdGhlIGludGlhbCBkYXRhIGZsYWdcbiAgICAgIGxldCBjbGVhbiA9IHNldHRpbmdzLnN3aXRjaFxuICAgICAgICAucmVwbGFjZSgnWycsICcnKVxuICAgICAgICAucmVwbGFjZSgnXScsICcnKVxuICAgICAgICAucmVwbGFjZSgnZGF0YS0nLCAnJylcblxuICAgICAgLy8gQ29udmVydCBzcmluZyB0byBjYW1lbENhc2VcbiAgICAgIGNsZWFuID0gY2xlYW4ucmVwbGFjZSgvLShbYS16XSkvZywgZnVuY3Rpb24gKGcpIHtcbiAgICAgICAgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKVxuICAgICAgfSlcblxuICAgICAgLy8gQ2hlY2sgd2hpY2ggYnJlYWtwb2ludCB0byB1c2U6XG4gICAgICAvLyBhKSBUaGUgbG9jYWwgYnAgc2V0IG9uIHRoZSBkcmF3ZXJcbiAgICAgIC8vIGIpIFRoZSBicCBhdmFpbGFibGUgaW4gY29uZmlnIHVzaW5nIGEga2V5XG4gICAgICAvLyBjKSBUaGUgcmF3IHBpeGVsIHZhbHVlIHByb3ZpZGVkIGluIHNldHRpbmdzXG4gICAgICBsZXQgYnAgPSBkcmF3ZXIuZGF0YXNldFtjbGVhbl1cbiAgICAgIGlmIChicCkge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChicClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5dXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJwID0gdS5nZXRCcmVha3BvaW50KHNldHRpbmdzLnN3aXRjaEJyZWFrcG9pbnQpXG4gICAgICAgIGlmICghYnApIHtcbiAgICAgICAgICBicCA9IHNldHRpbmdzLnN3aXRjaEJyZWFrcG9pbnRcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNZWRpYSBxdWVyeSBsaXN0ZW5lclxuICAgICAgbGV0IG1xID0gd2luZG93Lm1hdGNoTWVkaWEoIFwiKG1pbi13aWR0aDpcIiArIGJwICsgXCIpXCIgKVxuICAgICAgbXEuYWRkTGlzdGVuZXIoKG1xKSA9PiB7XG4gICAgICAgIHN3aXRjaENoZWNrKG1xLCBkcmF3ZXIpXG4gICAgICB9KVxuICAgICAgc3dpdGNoQ2hlY2sobXEsIGRyYXdlcilcbiAgICB9KVxuICB9XG5cbiAgY29uc3Qgc3dpdGNoQ2hlY2sgPSAobXEsIGRyYXdlcikgPT4ge1xuICAgIGlmIChtcS5tYXRjaGVzKSB7XG4gICAgICBzd2l0Y2hEcmF3ZXIoZHJhd2VyKVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2hNb2RhbChkcmF3ZXIpXG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3dpdGNoRHJhd2VyID0gKGRyYXdlcikgPT4ge1xuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcbiAgICBsZXQgcmVnZXggPSAvbW9kYWwvZ2lcblxuICAgIGRyYXdlci5jbGFzc05hbWUgPSBkcmF3ZXIuY2xhc3NOYW1lLnJlcGxhY2UocmVnZXgsIHNldHRpbmdzLmNsYXNzRHJhd2VyKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UocmVnZXgsIHNldHRpbmdzLmNsYXNzRHJhd2VyKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgc2V0dGluZ3MuY2xhc3NEcmF3ZXIpXG4gICAgfSlcblxuICAgIC8vIE9wZW4gb3IgY2xvc2UgZHJhd2VyIGJhc2VkIG9uIHNhdmUgc3RhdGVcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ2Nsb3NlJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdvcGVuJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBzd2l0Y2hNb2RhbCA9IChkcmF3ZXIpID0+IHtcbiAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2cnKVxuICAgIGxldCB0cmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldD1cIiMnICsgZHJhd2VyLmlkICsgJ1wiXScpXG4gICAgbGV0IHJlZ2V4ID0gL2RyYXdlci9naVxuXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgc2V0dGluZ3MuY2xhc3NNb2RhbClcbiAgICBkaWFsb2cuY2xhc3NOYW1lID0gZGlhbG9nLmNsYXNzTmFtZS5yZXBsYWNlKHJlZ2V4LCBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgc2V0dGluZ3MuY2xhc3NNb2RhbClcbiAgICB9KVxuXG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmb3IgbW9kYWwgc3R5bGVzIGJ5IGRlZmF1bHRcbiAgICB1LnJlbW92ZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gIH1cblxuICAvLyBSdW4gdGhlIGNvbnN0cnVjdG9yIG1ldGhvZFxuICBhcGkuaW5pdChvcHRpb25zKVxuXG4gIC8vIFJldHVybiB0aGUgQVBJIGZvciBydW5uaW5nIHB1YmxpYyBtZXRob2RzXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuLyoqXG4gKiBNb2RhbCBwbHVnaW5cbiAqIC0tLVxuICogQSBjb21wb25lbnQgZm9yIGNoYW5naW5nIHRoZSBtb2RlIG9mIGEgcGFnZSB0byBjb21wbGV0ZSBhIGNyaXRpY2FsIHRhc2suXG4gKiBUaGlzIGlzIHVzdWFsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBEaWFsb2cgY29tcG9uZW50IHRvIG1ha2VcbiAqIG1vZGFsIGRpYWxvZ3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc01vZGFsOiAnbW9kYWwnLFxuICAgIGNsYXNzRGlhbG9nOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGZvY3VzOiAnW2RhdGEtZm9jdXNdJ1xuICB9XG5cbiAgbGV0IG1lbW9yeVRyaWdnZXJcbiAgbGV0IG1lbW9yeVRhcmdldFxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5vcGVuID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgb3Blbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9IChjbGVhcikgPT4ge1xuICAgIGNsb3NlKGNsZWFyKVxuICB9XG5cbiAgY29uc3Qgb3BlbiA9ICh0YXJnZXQpID0+IHtcbiAgICB1LmFkZENsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgaWYgKHRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5pdGVtKDApXG4gICAgICBsZXQgZm9jdXMgPSB0YXJnZXQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5mb2N1cylcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICBmb2N1cy5mb2N1cygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjbG9zZSA9IChjbGVhciA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IG1vZGFscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgc2V0dGluZ3MuY2xhc3NNb2RhbClcbiAgICB1LnJlbW92ZUNsYXNzKG1vZGFscywgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgaWYgKGNsZWFyID09IGZhbHNlICYmIG1lbW9yeVRyaWdnZXIgJiYgbWVtb3J5VGFyZ2V0KSB7XG4gICAgICBpZiAobWVtb3J5VGFyZ2V0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBtZW1vcnlUYXJnZXQuaXRlbSgwKVxuICAgICAgICBtZW1vcnlUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgICBpZiAobWVtb3J5VHJpZ2dlcikge1xuICAgICAgICAgICAgbWVtb3J5VHJpZ2dlci5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgICAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjbGVhciA9PSB0cnVlKSB7XG4gICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGVzY2FwZSA9ICgpID0+IHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAyNykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgbW9kYWwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGxldCBkaWFsb2cgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0RpYWxvZylcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgbGV0IGRhdGFNb2RhbCA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcbiAgICAgIGlmIChkYXRhTW9kYWwpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkYXRhTW9kYWwpXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSB0cmlnZ2VyXG4gICAgICAgIG9wZW4obWVtb3J5VGFyZ2V0KVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAobW9kYWwgJiYgIWRpYWxvZykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgdHJpZ2dlcjogJ1tkYXRhLXRvZ2dsZS1jbGFzc10nLFxuICAgIHRhcmdldHM6ICcnLFxuICAgIGNsYXNzOiAnJ1xuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG5cbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG5cbiAgICBpZiAodHJpZ2dlcikge1xuXG4gICAgICBsZXQgdGFyZ2V0c1xuXG4gICAgICBpZiAoc2V0dGluZ3MudGFyZ2V0cykge1xuICAgICAgICB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZXR0aW5ncy50YXJnZXRzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodHJpZ2dlci5kYXRhc2V0LnRvZ2dsZVRhcmdldClcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0YXJnZXQsIHRyaWdnZXIuZGF0YXNldC50b2dnbGVDbGFzcy5zcGxpdCgnICcpKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmNsYXNzKSB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0cmlnZ2VyLCBzZXR0aW5ncy5jbGFzcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRyaWdnZXIsIHRyaWdnZXIuZGF0YXNldC50b2dnbGVDbGFzcy5zcGxpdCgnICcpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZydcblxuLyoqXG4gKiBVdGlsaXR5XG4gKiAtLS1cbiAqIEEgc2V0IG9mIGhlbHBlciBtZXRob2RzIGZvciBnZW5lcmFsIGphdmFzY3JpcHQgcGx1Z2luIHVzZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gIC8qKlxuICAgKiBHZXQgYW5kIG91dHB1dCBhIGJyZWFrcG9pbnQgdXNpbmcgaXQncyBrZXkgZm91bmQgaW4gY29uZmlnLmpzb25cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAtIFRoZSBrZXkgdG8gc2VhcmNoIGZvciBpbiB0aGUgYnJlYWtwb2ludHMgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IC0gVGhlIHBpeGVsIHZhbHVlIG9mIHRoZSBicmVha3BvaW50IGFzIGEgc3RyaW5nXG4gICAqL1xuICBzdGF0aWMgZ2V0QnJlYWtwb2ludChrZXkpIHtcbiAgICByZXR1cm4gY29uZmlnLmJyZWFrcG9pbnRzW2tleV1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IC0gRWxlbWVudChzKSB0byBjaGVjayBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gLSBDbGFzcyhlcykgdG8gY2hlY2tcbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gUmV0dXJucyB0cnVlIGlmIGNsYXNzIGV4aXN0cywgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaGFzQ2xhc3MoZWwsIGMpIHtcbiAgICBpZiAoIWVsLmZvckVhY2gpIHtcbiAgICAgIGVsID0gdGhpcy50b0FycmF5KGVsKVxuICAgIH1cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgcmV0dXJuIGMuc29tZSggZnVuY3Rpb24gKGMpIHtcbiAgICAgIGxldCBoYXMgPSBmYWxzZVxuICAgICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjKSkge1xuICAgICAgICAgIGhhcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBoYXNcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBvciBjbGFzc2VzIHRvIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IC0gRWxlbWVudChzKSB0byBhZGQgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IC0gQ2xhc3MoZXMpIHRvIGFkZFxuICAgKi9cbiAgc3RhdGljIGFkZENsYXNzKGVsLCBjKSB7XG4gICAgaWYgKCFlbC5mb3JFYWNoKSB7XG4gICAgICBlbCA9IHRoaXMudG9BcnJheShlbClcbiAgICB9XG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNsYXNzIG9yIGNsYXNzZXMgZnJvbSBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gfHwge05vZGVsaXN0fSAtIEVsZW1lbnQocykgdG8gcmVtb3ZlIGNsYXNzKGVzKSBmcm9tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IC0gQ2xhc3MoZXMpIHRvIHJlbW92ZVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZUNsYXNzKGVsLCBjKSB7XG4gICAgaWYgKCFlbC5mb3JFYWNoKSB7XG4gICAgICBlbCA9IHRoaXMudG9BcnJheShlbClcbiAgICB9XG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gLSBFbGVtZW50KHMpIHRvIHRvZ2dsZSBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gLSBDbGFzcyhlcykgdG8gdG9nZ2xlXG4gICAqL1xuICBzdGF0aWMgdG9nZ2xlQ2xhc3MoZWwsIGMpIHtcbiAgICBpZiAoIWVsLmZvckVhY2gpIHtcbiAgICAgIGVsID0gdGhpcy50b0FycmF5KGVsKVxuICAgIH1cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY2xvc2VzdCBwYXJlbnQgZWxlbWVudCBiYXNlZCBvbiBjbGFzcy4gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGVcbiAgICogbmF0aXZlIC5jbG9zZXN0KCkgbWV0aG9kIGluIHRoYXQgaXQgZG9lc24ndCBjaGVjayB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IC0gRWxlbWVudCB0byBzdGFydCBzZWFyY2ggb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gLSBDbGFzcyhlcykgdG8gY2hlY2sgZm9yXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9IC0gQ2xvc2VzdCBwYXJlbnQgZWxlbWVudFxuICAgKi9cbiAgc3RhdGljIGNsb3Nlc3QoZWwsIGMpIHtcbiAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50RWxlbWVudCkgJiYgIXRoaXMuaGFzQ2xhc3MoZWwsIGMpKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIG9yIG9iamVjdCB0byBhbiBhcnJheS4gSWYgYW4gYXJyYXkgaXMgcGFzc2VkLCBpdCdzXG4gICAqIHJldHVybmVkIGFzIGlzLiBBbnl0aGluZyBlbHNlIGlzIHJldHVybmVkIGFzIGFuIGFycmF5LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtPYmplY3R9IC0gU3RyaW5nIG9yIG9iamVjdCB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSAtIFJldHVybiB0aGUgY29udmVydGVkIGFycmF5XG4gICAqL1xuICBzdGF0aWMgdG9BcnJheShpdGVtKSB7XG5cbiAgICBsZXQgYXJyYXkgPSBbXVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGFycmF5ID0gaXRlbVxuICAgIH0gZWxzZSB7XG4gICAgICBhcnJheS5wdXNoKGl0ZW0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0cy4gUmV0dXJucyBhIG5ldyBvYmplY3QuIFNldCB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICogdG8gYHRydWVgIGZvciBhIGRlZXAgb3IgcmVjdXJzaXZlIG1lcmdlLlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbT3B0aW9uYWxdIC0gSWYgdHJ1ZSwgZG8gYSBkZWVwIChvciByZWN1cnNpdmUpIG1lcmdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAtIFRoZSBvYmplY3RzIHRvIG1lcmdlIHRvZ2V0aGVyOyBlYWNoIG92ZXJyaWRpbmcgdGhlIG5leHRcbiAgICogQHJldHVybnMge09iamVjdH0gLSBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgbGV0IGV4dGVuZGVkID0ge31cbiAgICBsZXQgZGVlcCA9IGZhbHNlXG4gICAgbGV0IGkgPSAwXG4gICAgbGV0IGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBhcmd1bWVudHNbMF0gKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICkge1xuICAgICAgZGVlcCA9IGFyZ3VtZW50c1swXVxuICAgICAgaSsrXG4gICAgfVxuXG4gICAgbGV0IG1lcmdlID0gKCBvYmogKSA9PiB7XG4gICAgICBmb3IgKCBsZXQgcHJvcCBpbiBvYmogKSB7XG4gICAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcbiAgICAgICAgICBpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQoIHRydWUsIGV4dGVuZGVkW3Byb3BdLCBvYmpbcHJvcF0gKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgbGV0IG9iaiA9IGFyZ3VtZW50c1tpXVxuICAgICAgbWVyZ2Uob2JqKVxuICAgIH1cblxuICAgIHJldHVybiBleHRlbmRlZFxuICB9XG5cbn1cbiJdfQ==

//# sourceMappingURL=scripts.js.map
