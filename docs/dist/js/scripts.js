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
 * The drawer component is used to create hidden but toggle-able content for an
 * application. This is typically used for a long form naivation list.
 */
function _default(options) {
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    classTrigger: 'drawer__trigger',
    classDrawer: 'drawer',
    classDialog: 'drawer__dialog',
    classActive: 'is-active',
    "switch": '[data-drawer-switch]',
    switchBreakpoint: '1200px',
    saveState: true
  };
  var drawers;
  var drawer_state = {};
  var modalDrawers;
  var bp;
  var mq;

  api.init = function (options) {
    settings = _utility["default"].extend(defaults, options || {}); // Get all the drawers on the page

    drawers = document.querySelectorAll('.drawer'); // Init save state if it's enabled

    if (settings.saveState) {
      initSaveState();
    } // Init modal switch if it's enabled


    if (settings["switch"]) {
      initSwitch();
    } // Add our drawer trigger event listener


    document.addEventListener('click', trigger, false);
  };

  api.destroy = function () {
    settings = null;
    drawers = null; // Check if save state is enabled

    if (settings.saveState) {
      drawer_state = {};
      localStorage.removeItem('drawer_state');
    } // Check if modal switch is enabled


    if (settings["switch"]) {
      modalDrawers = null;
      bp = null;
      mq = null;
    } // Remove the drawer trigger event listener


    document.removeEventListener('click', trigger, false);
  };

  api.open = function (selector) {
    open(document.querySelectorAll(selector));
  };

  api.close = function (selector) {
    close(document.querySelectorAll(selector));
  };

  var open = function open(target, callback) {
    _utility["default"].addClass(target, 'is-active');

    if (!target.forEach) {
      target = _utility["default"].toArray(target);
    }

    target.forEach(function (target) {
      if (settings.saveState) {
        drawer_state[target.id] = _utility["default"].hasClass(target, 'is-active');
        localStorage.setItem('drawer_state', JSON.stringify(drawer_state));
      }
    }); // Fire the callback if one was passed

    typeof callback === 'function' && callback();
  };

  var close = function close(target, callback) {
    _utility["default"].removeClass(target, 'is-active');

    if (!target.forEach) {
      target = _utility["default"].toArray(target);
    }

    target.forEach(function (target) {
      if (settings.saveState) {
        drawer_state[target.id] = _utility["default"].hasClass(target, 'is-active');
        localStorage.setItem('drawer_state', JSON.stringify(drawer_state));
      }
    }); // Fire the callback if one was passed

    typeof callback === 'function' && callback();
  };

  var debug = function debug(event, element) {
    console.log("".concat(event, ": "), element);

    if (settings.saveState) {
      console.log('drawer_state: ', drawer_state);
    }
  };

  var trigger = function trigger() {
    var trigger = event.target.closest('.drawer__trigger');

    if (trigger) {
      var dataDrawer = trigger.dataset.target;

      if (dataDrawer) {
        var drawer = document.querySelectorAll(dataDrawer);

        if (drawer) {
          if (_utility["default"].hasClass(drawer, 'is-active')) {
            close(drawer);
          } else {
            open(drawer);
          }
        }
      }
    }
  };

  var initSaveState = function initSaveState() {
    // Init: Setup our variables
    // Get the drawer state from local storage
    // Check if drawer state was saved otherwise init a new object
    if (localStorage.getItem('drawer_state')) {
      drawer_state = JSON.parse(localStorage.getItem('drawer_state'));
    } // Loop through all drawers and save/init their state


    drawers.forEach(function (drawer) {
      // Set the default state if one is not set
      if (drawer.id in drawer_state === false) {
        drawer_state[drawer.id] = _utility["default"].hasClass(drawer, 'is-active');
      } // Get our drawer dialog element


      var dialog = drawer.querySelector('.drawer__dialog'); // Add a no-transition class and remove it within a transition duration

      _utility["default"].addClass(dialog, 'no-transition');

      var revert = function revert() {
        setTimeout(function () {
          _utility["default"].removeClass(dialog, 'no-transition');
        }, 500);
      }; // Toggle our drawer state based on the saved state


      if (drawer_state[drawer.id] === false) {
        close(drawer, revert);
      } else {
        open(drawer, revert);
      }
    });
  };

  var initSwitch = function initSwitch() {
    modalDrawers = document.querySelectorAll(settings["switch"]);
    modalDrawers.forEach(function (drawer) {
      // Get the local breakpoint if one is set
      // Remove brackets and the intial data flag
      var clean = settings["switch"].replace('[', '').replace(']', '').replace('data-', ''); // Convert sring to camelCase

      clean = clean.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      }); // Check which breakpoint to use:
      // a) The local bp set on the drawer
      // b) The bp available in config using a key
      // c) The raw pixel value provided in settings

      bp = drawer.dataset[clean];

      if (bp) {
        bp = _utility["default"].getBreakpoint(bp);

        if (!bp) {
          bp = drawer.dataset[clean];
        }
      } else {
        bp = settings.switchBreakpoint;
      } // Media query listener


      mq = window.matchMedia("(min-width:" + bp + ")");
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
    drawer.className = drawer.className.replace(regex, 'drawer');
    dialog.className = dialog.className.replace(regex, 'drawer');
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(regex, 'drawer');
    }); // Open or close drawer based on save state

    if (settings.saveState) {
      if (drawer_state[drawer.id] === false) {
        close(drawer);
      } else {
        open(drawer);
      }
    }
  };

  var switchModal = function switchModal(drawer) {
    var dialog = drawer.querySelector('.dialog');
    var triggers = document.querySelectorAll('[data-target="#' + drawer.id + '"]');
    var regex = /drawer/gi;
    drawer.className = drawer.className.replace(regex, 'modal');
    dialog.className = dialog.className.replace(regex, 'modal');
    triggers.forEach(function (trigger) {
      trigger.className = trigger.className.replace(regex, 'modal');
    }); // Remove active class for modal styles by default

    _utility["default"].removeClass(drawer, 'is-active');
  };

  api.init(options);
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
     * @param {String} The key to search for in the breakpoints object
     * @returns {String} The pixel value of the breakpoint as a string
     */
    value: function getBreakpoint(key) {
      return _config["default"].breakpoints[key];
    }
    /**
     * Checks if an element has a class or not
     * ---
     * @param {Object} || {Nodelist} Element(s) to check class(es) on
     * @param {String} || {Array} Class(es) to check
     * @returns {Boolean} Returns true if class exists on element, otherwise false
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
     * @param {Object} || {Nodelist} Element(s) to add class(es) on
     * @param {String} || {Array} Class(es) to add
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
     * @param {Object} || {Nodelist} Element(s) to remove class(es) from
     * @param {String} || {Array} Class(es) to remove
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
     * @param {Object} || {Nodelist} Element(s) to toggle class(es) on
     * @param {String} || {Array} Class(es) to toggle
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
     * @param {Object} Element to start search on
     * @param {String} || {Array} Class(es) to check for
     * @return {Element} Closest parent element
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
     * @param {String} || {Object} String or object to convert to an array
     * @return {Array} Return the converted array
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
     * @param {Boolean} [Optional] If true, do a deep (or recursive) merge
     * @param {Object} The objects to merge together; each overriding the next
     * @returns {Object} Merged values of defaults and options
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9jb25maWcuanNvbiIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9kcmF3ZXIuanMiLCIuLi9zcmMvanMvbW9kYWwuanMiLCIuLi9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vc3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBSixFQUFwQjtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUNBLElBQU0sS0FBSyxHQUFHLElBQUksaUJBQUosRUFBZDtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUVBOzs7Ozs7O0FBTUEsSUFBSSxRQUFRLENBQUMsY0FBVCxDQUF3QixRQUF4QixDQUFKLEVBQXVDO0FBRXJDO0FBQ0EsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBSixDQUFXLFFBQVgsRUFBcUI7QUFDaEMsSUFBQSxXQUFXLEVBQUU7QUFDWCxNQUFBLFdBQVcsRUFBRSxRQURGO0FBRVgsTUFBQSxRQUFRLEVBQUUsQ0FGQztBQUdYLE1BQUEsUUFBUSxFQUFFLEdBSEM7QUFJWCxNQUFBLFNBQVMsRUFBRSxHQUpBO0FBS1gsTUFBQSxXQUFXLEVBQUU7QUFMRixLQURtQjtBQVFoQyxJQUFBLFVBQVUsRUFBRSxDQUNWLE1BRFUsRUFFVjtBQUFFLE1BQUEsSUFBSSxFQUFFLENBQUMsVUFBRDtBQUFSLEtBRlUsQ0FSb0I7QUFZaEMsSUFBQSxTQUFTLEVBQUU7QUFacUIsR0FBckIsQ0FBYixDQUhxQyxDQWtCckM7QUFDQTs7QUFDQSxNQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixDQUFuQjtBQUNB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R0FBaUIsTUFBTSxDQUFFLElBQUYsRUFBUSxRQUFRLENBQUMsSUFBRCxDQUFoQixFQUF3QixHQUFHLENBQUMsSUFBRCxDQUEzQixDQUF2QjtBQUNELGFBRkQsTUFFTztBQUNMLGNBQUEsUUFBUSxDQUFDLElBQUQsQ0FBUixHQUFpQixHQUFHLENBQUMsSUFBRCxDQUFwQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BVkQ7O0FBWUEsYUFBUSxDQUFDLEdBQUcsTUFBWixFQUFvQixDQUFDLEVBQXJCLEVBQTBCO0FBQ3hCLFlBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFELENBQW5CO0FBQ0EsUUFBQSxLQUFLLENBQUMsR0FBRCxDQUFMO0FBQ0Q7O0FBRUQsYUFBTyxRQUFQO0FBQ0QsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB1IGZyb20gJ3V0aWxpdHknXG5pbXBvcnQgRGlzbWlzc2libGUgZnJvbSAnZGlzbWlzc2libGUnXG5pbXBvcnQgRHJhd2VyIGZyb20gJ2RyYXdlcidcbmltcG9ydCBNb2RhbCBmcm9tICdtb2RhbCdcbmltcG9ydCBUb2dnbGUgZnJvbSAndG9nZ2xlJ1xuaW1wb3J0IGxpc3RqcyBmcm9tICdsaXN0LmpzJ1xuXG5jb25zdCBkaXNtaXNzaWJsZSA9IG5ldyBEaXNtaXNzaWJsZVxuY29uc3QgZHJhd2VyID0gbmV3IERyYXdlcigpXG5jb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpXG5jb25zdCB0b2dnbGUgPSBuZXcgVG9nZ2xlKClcblxuLyoqXG4gKiBMaXN0LmpzXG4gKiAtLS1cbiAqIEFkZHMgbGlzdCBmdW5jdGlvbmFsaXR5IGFsb25nIHdpdGggc2VhcmNoLlxuICogbGlzdC5qcyBkb2NzOiBodHRwOi8vbGlzdGpzLmNvbS9cbiAqL1xuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0anMnKSkge1xuXG4gIC8vIEluaXQgb3VyIGxpc3QuanMgY29tcG9uZW50XG4gIGNvbnN0IGxpc3QgPSBuZXcgbGlzdGpzKCdsaXN0anMnLCB7XG4gICAgZnV6enlTZWFyY2g6IHtcbiAgICAgIHNlYXJjaENsYXNzOiAnc2VhcmNoJyxcbiAgICAgIGxvY2F0aW9uOiAwLFxuICAgICAgZGlzdGFuY2U6IDEwMCxcbiAgICAgIHRocmVzaG9sZDogMC40LFxuICAgICAgbXVsdGlTZWFyY2g6IHRydWVcbiAgICB9LFxuICAgIHZhbHVlTmFtZXM6IFtcbiAgICAgICduYW1lJyxcbiAgICAgIHsgZGF0YTogWydjYXRlZ29yeSddIH1cbiAgICBdLFxuICAgIGxpc3RDbGFzczogJ21lbnUnXG4gIH0pXG5cbiAgLy8gRW1wdHkgTm90aWNlXG4gIC8vIERpc3BsYXllZCB3aGVuIHRoZSBzZWFyY2ggcmV0dXJucyBubyByZXN1bHRzXG4gIGxldCBub3RpY2VfZW1wdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90aWNlX2VtcHR5JylcbiAgbGV0IG5vdGljZV9lbXB0eV90ZXh0ID0gbm90aWNlX2VtcHR5LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfdGV4dCcpXG5cbiAgLy8gQ2xlYXIgc2VhcmNoIGJ1dHRvblxuICBsZXQgZmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlcicpXG4gIGxldCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyIC5zZWFyY2gnKVxuICBsZXQgc2VhcmNoX2NsZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlciAuc2VhcmNoX2NsZWFyJylcblxuICAvLyBPbiBzZWFyY2ggY29tcGxldGUgY2FsbGJhY2tcbiAgbGlzdC5vbignc2VhcmNoQ29tcGxldGUnLCAoKSA9PiB7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHNlYXJjaCB0ZXh0IGluIGVtcHR5IG5vdGljZVxuICAgIGxldCB2YWx1ZSA9IHNlYXJjaC52YWx1ZVxuICAgIG5vdGljZV9lbXB0eV90ZXh0LmlubmVySFRNTCA9IHZhbHVlXG5cbiAgICAvLyBTaG93IGNsZWFyIHNlYXJjaCBidXR0b24gaWYgYSB2YWx1ZSB0aGVyZSBpcyBzb21ldGhpbmcgaW4gc2VhcmNoXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB1LmFkZENsYXNzKGZpbHRlciwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LmFkZENsYXNzKHNlYXJjaCwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LnJlbW92ZUNsYXNzKHNlYXJjaF9jbGVhciwgJ2Rfbm9uZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MoZmlsdGVyLCAnaXMtYWN0aXZlJylcbiAgICAgIHUucmVtb3ZlQ2xhc3Moc2VhcmNoLCAnaXMtYWN0aXZlJylcbiAgICAgIHUuYWRkQ2xhc3Moc2VhcmNoX2NsZWFyLCAnZF9ub25lJylcbiAgICB9XG5cbiAgICAvLyBUb2dnbGUgbm90aWNlIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mIHZpc2libGUgaXRlbXNcbiAgICBpZiAobGlzdC52aXNpYmxlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgdS5hZGRDbGFzcyhub3RpY2VfZW1wdHksICdkX25vbmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnJlbW92ZUNsYXNzKG5vdGljZV9lbXB0eSwgJ2Rfbm9uZScpXG4gICAgfVxuICB9KVxuXG4gIC8vIENsaWNrIGV2ZW50cyBmb3IgY2F0ZWdvcnkgYW5kIGNsZWFyc1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlcl9zZWFyY2hfY2xlYXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNlYXJjaF9jbGVhcicpXG4gICAgbGV0IHRyaWdnZXJfc2VhcmNoX2NhdCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuY2F0ZWdvcnknKVxuXG4gICAgaWYgKHRyaWdnZXJfc2VhcmNoX2NsZWFyKSB7XG4gICAgICBzZWFyY2gudmFsdWUgPSAnJ1xuICAgICAgbGlzdC5zZWFyY2goKVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGlmICh0cmlnZ2VyX3NlYXJjaF9jYXQpIHtcbiAgICAgIHNlYXJjaC52YWx1ZSA9IHRyaWdnZXJfc2VhcmNoX2NhdC5kYXRhc2V0LmNhdGVnb3J5XG4gICAgICBsaXN0LnNlYXJjaChzZWFyY2gudmFsdWUpXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gIH0sIGZhbHNlKVxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGFkZEFzeW5jID0gZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaywgaXRlbXMpIHtcbiAgICB2YXIgdmFsdWVzVG9BZGQgPSB2YWx1ZXMuc3BsaWNlKDAsIDUwKTtcbiAgICBpdGVtcyA9IGl0ZW1zIHx8IFtdO1xuICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KGxpc3QuYWRkKHZhbHVlc1RvQWRkKSk7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBhZGRBc3luYyh2YWx1ZXMsIGNhbGxiYWNrLCBpdGVtcyk7XG4gICAgICB9LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC51cGRhdGUoKTtcbiAgICAgIGNhbGxiYWNrKGl0ZW1zKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBhZGRBc3luYztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICAvLyBBZGQgaGFuZGxlcnNcbiAgbGlzdC5oYW5kbGVycy5maWx0ZXJTdGFydCA9IGxpc3QuaGFuZGxlcnMuZmlsdGVyU3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuZmlsdGVyQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLmZpbHRlckNvbXBsZXRlIHx8IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbihmaWx0ZXJGdW5jdGlvbikge1xuICAgIGxpc3QudHJpZ2dlcignZmlsdGVyU3RhcnQnKTtcbiAgICBsaXN0LmkgPSAxOyAvLyBSZXNldCBwYWdpbmdcbiAgICBsaXN0LnJlc2V0LmZpbHRlcigpO1xuICAgIGlmIChmaWx0ZXJGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaXN0LmZpbHRlcmVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QuZmlsdGVyZWQgPSB0cnVlO1xuICAgICAgdmFyIGlzID0gbGlzdC5pdGVtcztcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBpc1tpXTtcbiAgICAgICAgaWYgKGZpbHRlckZ1bmN0aW9uKGl0ZW0pKSB7XG4gICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdmaWx0ZXJDb21wbGV0ZScpO1xuICAgIHJldHVybiBsaXN0LnZpc2libGVJdGVtcztcbiAgfTtcbn07XG4iLCJcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyksXG4gIHRvU3RyaW5nID0gcmVxdWlyZSgnLi91dGlscy90by1zdHJpbmcnKSxcbiAgZ2V0QnlDbGFzcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWJ5LWNsYXNzJyksXG4gIGZ1enp5ID0gcmVxdWlyZSgnLi91dGlscy9mdXp6eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgbG9jYXRpb246IDAsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICB0aHJlc2hvbGQ6IDAuNCxcbiAgICBtdWx0aVNlYXJjaDogdHJ1ZSxcbiAgICBzZWFyY2hDbGFzczogJ2Z1enp5LXNlYXJjaCdcbiAgfSwgb3B0aW9ucyk7XG5cblxuXG4gIHZhciBmdXp6eVNlYXJjaCA9IHtcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgY29sdW1ucykge1xuICAgICAgLy8gU3Vic3RyYWN0IGFyZ3VtZW50cyBmcm9tIHRoZSBzZWFyY2hTdHJpbmcgb3IgcHV0IHNlYXJjaFN0cmluZyBhcyBvbmx5IGFyZ3VtZW50XG4gICAgICB2YXIgc2VhcmNoQXJndW1lbnRzID0gb3B0aW9ucy5tdWx0aVNlYXJjaCA/IHNlYXJjaFN0cmluZy5yZXBsYWNlKC8gKyQvLCAnJykuc3BsaXQoLyArLykgOiBbc2VhcmNoU3RyaW5nXTtcblxuICAgICAgZm9yICh2YXIgayA9IDAsIGtsID0gbGlzdC5pdGVtcy5sZW5ndGg7IGsgPCBrbDsgaysrKSB7XG4gICAgICAgIGZ1enp5U2VhcmNoLml0ZW0obGlzdC5pdGVtc1trXSwgY29sdW1ucywgc2VhcmNoQXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGNvbHVtbnMsIHNlYXJjaEFyZ3VtZW50cykge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWFyY2hBcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZvdW5kQXJndW1lbnQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gY29sdW1ucy5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgaWYgKGZ1enp5U2VhcmNoLnZhbHVlcyhpdGVtLnZhbHVlcygpLCBjb2x1bW5zW2pdLCBzZWFyY2hBcmd1bWVudHNbaV0pKSB7XG4gICAgICAgICAgICBmb3VuZEFyZ3VtZW50ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWZvdW5kQXJndW1lbnQpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpdGVtLmZvdW5kID0gZm91bmQ7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKHZhbHVlcywgdmFsdWUsIHNlYXJjaEFyZ3VtZW50KSB7XG4gICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgICB2YXIgdGV4dCA9IHRvU3RyaW5nKHZhbHVlc1t2YWx1ZV0pLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKGZ1enp5KHRleHQsIHNlYXJjaEFyZ3VtZW50LCBvcHRpb25zKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG5cbiAgZXZlbnRzLmJpbmQoZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIG9wdGlvbnMuc2VhcmNoQ2xhc3MpLCAna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDsgLy8gSUUgaGF2ZSBzcmNFbGVtZW50XG4gICAgbGlzdC5zZWFyY2godGFyZ2V0LnZhbHVlLCBmdXp6eVNlYXJjaC5zZWFyY2gpO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24oc3RyLCBjb2x1bW5zKSB7XG4gICAgbGlzdC5zZWFyY2goc3RyLCBjb2x1bW5zLCBmdXp6eVNlYXJjaC5zZWFyY2gpO1xuICB9O1xufTtcbiIsInZhciBuYXR1cmFsU29ydCA9IHJlcXVpcmUoJ3N0cmluZy1uYXR1cmFsLWNvbXBhcmUnKSxcbiAgZ2V0QnlDbGFzcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWJ5LWNsYXNzJyksXG4gIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyksXG4gIGluZGV4T2YgPSByZXF1aXJlKCcuL3V0aWxzL2luZGV4LW9mJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIHRvU3RyaW5nID0gcmVxdWlyZSgnLi91dGlscy90by1zdHJpbmcnKSxcbiAgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBnZXRBdHRyaWJ1dGUgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1hdHRyaWJ1dGUnKSxcbiAgdG9BcnJheSA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpZCwgb3B0aW9ucywgdmFsdWVzKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzLFxuICAgIGluaXQsXG4gICAgSXRlbSA9IHJlcXVpcmUoJy4vaXRlbScpKHNlbGYpLFxuICAgIGFkZEFzeW5jID0gcmVxdWlyZSgnLi9hZGQtYXN5bmMnKShzZWxmKSxcbiAgICBpbml0UGFnaW5hdGlvbiA9IHJlcXVpcmUoJy4vcGFnaW5hdGlvbicpKHNlbGYpO1xuXG4gIGluaXQgPSB7XG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5saXN0Q2xhc3MgICAgICA9IFwibGlzdFwiO1xuICAgICAgc2VsZi5zZWFyY2hDbGFzcyAgICA9IFwic2VhcmNoXCI7XG4gICAgICBzZWxmLnNvcnRDbGFzcyAgICAgID0gXCJzb3J0XCI7XG4gICAgICBzZWxmLnBhZ2UgICAgICAgICAgID0gMTAwMDA7XG4gICAgICBzZWxmLmkgICAgICAgICAgICAgID0gMTtcbiAgICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICAgIHNlbGYudmlzaWJsZUl0ZW1zICAgPSBbXTtcbiAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcyAgPSBbXTtcbiAgICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICAgIHNlbGYuZmlsdGVyZWQgICAgICAgPSBmYWxzZTtcbiAgICAgIHNlbGYuc2VhcmNoQ29sdW1ucyAgPSB1bmRlZmluZWQ7XG4gICAgICBzZWxmLmhhbmRsZXJzICAgICAgID0geyAndXBkYXRlZCc6IFtdIH07XG4gICAgICBzZWxmLnZhbHVlTmFtZXMgICAgID0gW107XG4gICAgICBzZWxmLnV0aWxzICAgICAgICAgID0ge1xuICAgICAgICBnZXRCeUNsYXNzOiBnZXRCeUNsYXNzLFxuICAgICAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICAgICAgaW5kZXhPZjogaW5kZXhPZixcbiAgICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICAgIHRvU3RyaW5nOiB0b1N0cmluZyxcbiAgICAgICAgbmF0dXJhbFNvcnQ6IG5hdHVyYWxTb3J0LFxuICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICBnZXRBdHRyaWJ1dGU6IGdldEF0dHJpYnV0ZSxcbiAgICAgICAgdG9BcnJheTogdG9BcnJheVxuICAgICAgfTtcblxuICAgICAgc2VsZi51dGlscy5leHRlbmQoc2VsZiwgb3B0aW9ucyk7XG5cbiAgICAgIHNlbGYubGlzdENvbnRhaW5lciA9ICh0eXBlb2YoaWQpID09PSAnc3RyaW5nJykgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgOiBpZDtcbiAgICAgIGlmICghc2VsZi5saXN0Q29udGFpbmVyKSB7IHJldHVybjsgfVxuICAgICAgc2VsZi5saXN0ICAgICAgID0gZ2V0QnlDbGFzcyhzZWxmLmxpc3RDb250YWluZXIsIHNlbGYubGlzdENsYXNzLCB0cnVlKTtcblxuICAgICAgc2VsZi5wYXJzZSAgICAgICAgPSByZXF1aXJlKCcuL3BhcnNlJykoc2VsZik7XG4gICAgICBzZWxmLnRlbXBsYXRlciAgICA9IHJlcXVpcmUoJy4vdGVtcGxhdGVyJykoc2VsZik7XG4gICAgICBzZWxmLnNlYXJjaCAgICAgICA9IHJlcXVpcmUoJy4vc2VhcmNoJykoc2VsZik7XG4gICAgICBzZWxmLmZpbHRlciAgICAgICA9IHJlcXVpcmUoJy4vZmlsdGVyJykoc2VsZik7XG4gICAgICBzZWxmLnNvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vc29ydCcpKHNlbGYpO1xuICAgICAgc2VsZi5mdXp6eVNlYXJjaCAgPSByZXF1aXJlKCcuL2Z1enp5LXNlYXJjaCcpKHNlbGYsIG9wdGlvbnMuZnV6enlTZWFyY2gpO1xuXG4gICAgICB0aGlzLmhhbmRsZXJzKCk7XG4gICAgICB0aGlzLml0ZW1zKCk7XG4gICAgICB0aGlzLnBhZ2luYXRpb24oKTtcblxuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9LFxuICAgIGhhbmRsZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGhhbmRsZXIgaW4gc2VsZi5oYW5kbGVycykge1xuICAgICAgICBpZiAoc2VsZltoYW5kbGVyXSkge1xuICAgICAgICAgIHNlbGYub24oaGFuZGxlciwgc2VsZltoYW5kbGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYucGFyc2Uoc2VsZi5saXN0KTtcbiAgICAgIGlmICh2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZWxmLmFkZCh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcGFnaW5hdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbiA9IFt7fV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvblswXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICBvcHRpb25zLnBhZ2luYXRpb24gPSBbb3B0aW9ucy5wYWdpbmF0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvcHRpb25zLnBhZ2luYXRpb24ubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAgIGluaXRQYWdpbmF0aW9uKG9wdGlvbnMucGFnaW5hdGlvbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLypcbiAgKiBSZS1wYXJzZSB0aGUgTGlzdCwgdXNlIGlmIGh0bWwgaGF2ZSBjaGFuZ2VkXG4gICovXG4gIHRoaXMucmVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zICA9IFtdO1xuICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgc2VsZi5wYXJzZShzZWxmLmxpc3QpO1xuICB9O1xuXG4gIHRoaXMudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGpzb24gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGpzb24ucHVzaChzZWxmLml0ZW1zW2ldLnZhbHVlcygpKTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH07XG5cblxuICAvKlxuICAqIEFkZCBvYmplY3QgdG8gbGlzdFxuICAqL1xuICB0aGlzLmFkZCA9IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYWRkZWQgPSBbXSxcbiAgICAgIG5vdENyZWF0ZSA9IGZhbHNlO1xuICAgIGlmICh2YWx1ZXNbMF0gPT09IHVuZGVmaW5lZCl7XG4gICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdmFsdWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbnVsbDtcbiAgICAgIG5vdENyZWF0ZSA9IChzZWxmLml0ZW1zLmxlbmd0aCA+IHNlbGYucGFnZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICBpdGVtID0gbmV3IEl0ZW0odmFsdWVzW2ldLCB1bmRlZmluZWQsIG5vdENyZWF0ZSk7XG4gICAgICBzZWxmLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICBhZGRlZC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBhZGRlZDtcbiAgfTtcblxuXHR0aGlzLnNob3cgPSBmdW5jdGlvbihpLCBwYWdlKSB7XG5cdFx0dGhpcy5pID0gaTtcblx0XHR0aGlzLnBhZ2UgPSBwYWdlO1xuXHRcdHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIHNlbGY7XG5cdH07XG5cbiAgLyogUmVtb3ZlcyBvYmplY3QgZnJvbSBsaXN0LlxuICAqIExvb3BzIHRocm91Z2ggdGhlIGxpc3QgYW5kIHJlbW92ZXMgb2JqZWN0cyB3aGVyZVxuICAqIHByb3BlcnR5IFwidmFsdWVuYW1lXCIgPT09IHZhbHVlXG4gICovXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24odmFsdWVOYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBmb3VuZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoc2VsZi5pdGVtc1tpXS52YWx1ZXMoKVt2YWx1ZU5hbWVdID09IHZhbHVlKSB7XG4gICAgICAgIHNlbGYudGVtcGxhdGVyLnJlbW92ZShzZWxmLml0ZW1zW2ldLCBvcHRpb25zKTtcbiAgICAgICAgc2VsZi5pdGVtcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgaWwtLTtcbiAgICAgICAgaS0tO1xuICAgICAgICBmb3VuZCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKiBHZXRzIHRoZSBvYmplY3RzIGluIHRoZSBsaXN0IHdoaWNoXG4gICogcHJvcGVydHkgXCJ2YWx1ZU5hbWVcIiA9PT0gdmFsdWVcbiAgKi9cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbih2YWx1ZU5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoZWRJdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzZWxmLml0ZW1zW2ldO1xuICAgICAgaWYgKGl0ZW0udmFsdWVzKClbdmFsdWVOYW1lXSA9PSB2YWx1ZSkge1xuICAgICAgICBtYXRjaGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZWRJdGVtcztcbiAgfTtcblxuICAvKlxuICAqIEdldCBzaXplIG9mIHRoZSBsaXN0XG4gICovXG4gIHRoaXMuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzZWxmLml0ZW1zLmxlbmd0aDtcbiAgfTtcblxuICAvKlxuICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhlIGxpc3RcbiAgKi9cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgc2VsZi5pdGVtcyA9IFtdO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMub24gPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICBzZWxmLmhhbmRsZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gc2VsZi5oYW5kbGVyc1tldmVudF07XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihlLCBjYWxsYmFjayk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSA9IHNlbGYuaGFuZGxlcnNbZXZlbnRdLmxlbmd0aDtcbiAgICB3aGlsZShpLS0pIHtcbiAgICAgIHNlbGYuaGFuZGxlcnNbZXZlbnRdW2ldKHNlbGYpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0ge1xuICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuICAgICAgICBpbCA9IGlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpbC0tKSB7XG4gICAgICAgIGlzW2lsXS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcbiAgICAgICAgaWwgPSBpcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWwtLSkge1xuICAgICAgICBpc1tpbF0uZm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG5cdFx0XHRpbCA9IGlzLmxlbmd0aDtcblxuICAgIHNlbGYudmlzaWJsZUl0ZW1zID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zID0gW107XG4gICAgc2VsZi50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChpc1tpXS5tYXRjaGluZygpICYmICgoc2VsZi5tYXRjaGluZ0l0ZW1zLmxlbmd0aCsxKSA+PSBzZWxmLmkgJiYgc2VsZi52aXNpYmxlSXRlbXMubGVuZ3RoIDwgc2VsZi5wYWdlKSkge1xuICAgICAgICBpc1tpXS5zaG93KCk7XG4gICAgICAgIHNlbGYudmlzaWJsZUl0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBzZWxmLm1hdGNoaW5nSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICB9IGVsc2UgaWYgKGlzW2ldLm1hdGNoaW5nKCkpIHtcbiAgICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYudHJpZ2dlcigndXBkYXRlZCcpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIGluaXQuc3RhcnQoKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSkge1xuICAgIHZhciBpdGVtID0gdGhpcztcblxuICAgIHRoaXMuX3ZhbHVlcyA9IHt9O1xuXG4gICAgdGhpcy5mb3VuZCA9IGZhbHNlOyAvLyBTaG93IGlmIGxpc3Quc2VhcmNoZWQgPT0gdHJ1ZSBhbmQgdGhpcy5mb3VuZCA9PSB0cnVlXG4gICAgdGhpcy5maWx0ZXJlZCA9IGZhbHNlOy8vIFNob3cgaWYgbGlzdC5maWx0ZXJlZCA9PSB0cnVlIGFuZCB0aGlzLmZpbHRlcmVkID09IHRydWVcblxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24oaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKSB7XG4gICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChub3RDcmVhdGUpIHtcbiAgICAgICAgICBpdGVtLnZhbHVlcyhpbml0VmFsdWVzLCBub3RDcmVhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0udmFsdWVzKGluaXRWYWx1ZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmVsbSA9IGVsZW1lbnQ7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBsaXN0LnRlbXBsYXRlci5nZXQoaXRlbSwgaW5pdFZhbHVlcyk7XG4gICAgICAgIGl0ZW0udmFsdWVzKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudmFsdWVzID0gZnVuY3Rpb24obmV3VmFsdWVzLCBub3RDcmVhdGUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IodmFyIG5hbWUgaW4gbmV3VmFsdWVzKSB7XG4gICAgICAgICAgaXRlbS5fdmFsdWVzW25hbWVdID0gbmV3VmFsdWVzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3RDcmVhdGUgIT09IHRydWUpIHtcbiAgICAgICAgICBsaXN0LnRlbXBsYXRlci5zZXQoaXRlbSwgaXRlbS52YWx1ZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpdGVtLl92YWx1ZXM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuc2hvdyhpdGVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnRlbXBsYXRlci5oaWRlKGl0ZW0pO1xuICAgIH07XG5cbiAgICB0aGlzLm1hdGNoaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAobGlzdC5maWx0ZXJlZCAmJiBsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZm91bmQgJiYgaXRlbS5maWx0ZXJlZCkgfHxcbiAgICAgICAgKGxpc3QuZmlsdGVyZWQgJiYgIWxpc3Quc2VhcmNoZWQgJiYgaXRlbS5maWx0ZXJlZCkgfHxcbiAgICAgICAgKCFsaXN0LmZpbHRlcmVkICYmIGxpc3Quc2VhcmNoZWQgJiYgaXRlbS5mb3VuZCkgfHxcbiAgICAgICAgKCFsaXN0LmZpbHRlcmVkICYmICFsaXN0LnNlYXJjaGVkKVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhpcy52aXNpYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGl0ZW0uZWxtICYmIChpdGVtLmVsbS5wYXJlbnROb2RlID09IGxpc3QubGlzdCkpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICBpbml0KGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSk7XG4gIH07XG59O1xuIiwidmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgTGlzdCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbihwYWdpbmdMaXN0LCBvcHRpb25zKSB7XG4gICAgdmFyIGl0ZW0sXG4gICAgICBsID0gbGlzdC5tYXRjaGluZ0l0ZW1zLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gbGlzdC5pLFxuICAgICAgcGFnZSA9IGxpc3QucGFnZSxcbiAgICAgIHBhZ2VzID0gTWF0aC5jZWlsKGwgLyBwYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlID0gTWF0aC5jZWlsKChpbmRleCAvIHBhZ2UpKSxcbiAgICAgIGlubmVyV2luZG93ID0gb3B0aW9ucy5pbm5lcldpbmRvdyB8fCAyLFxuICAgICAgbGVmdCA9IG9wdGlvbnMubGVmdCB8fCBvcHRpb25zLm91dGVyV2luZG93IHx8IDAsXG4gICAgICByaWdodCA9IG9wdGlvbnMucmlnaHQgfHwgb3B0aW9ucy5vdXRlcldpbmRvdyB8fCAwO1xuXG4gICAgcmlnaHQgPSBwYWdlcyAtIHJpZ2h0O1xuXG4gICAgcGFnaW5nTGlzdC5jbGVhcigpO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHBhZ2VzOyBpKyspIHtcbiAgICAgIHZhciBjbGFzc05hbWUgPSAoY3VycmVudFBhZ2UgPT09IGkpID8gXCJhY3RpdmVcIiA6IFwiXCI7XG5cbiAgICAgIC8vY29uc29sZS5sb2coaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCAoY3VycmVudFBhZ2UgLSBpbm5lcldpbmRvdyksIChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSwgY2xhc3NOYW1lKTtcblxuICAgICAgaWYgKGlzLm51bWJlcihpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IGksXG4gICAgICAgICAgZG90dGVkOiBmYWxzZVxuICAgICAgICB9KVswXTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgIGNsYXNzZXMoaXRlbS5lbG0pLmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50KGl0ZW0uZWxtLCBpLCBwYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXMuZG90dGVkKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIHBhZ2luZ0xpc3Quc2l6ZSgpKSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IFwiLi4uXCIsXG4gICAgICAgICAgZG90dGVkOiB0cnVlXG4gICAgICAgIH0pWzBdO1xuICAgICAgICBjbGFzc2VzKGl0ZW0uZWxtKS5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzID0ge1xuICAgIG51bWJlcjogZnVuY3Rpb24oaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgIHJldHVybiB0aGlzLmxlZnQoaSwgbGVmdCkgfHwgdGhpcy5yaWdodChpLCByaWdodCkgfHwgdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpO1xuICAgIH0sXG4gICAgbGVmdDogZnVuY3Rpb24oaSwgbGVmdCkge1xuICAgICAgcmV0dXJuIChpIDw9IGxlZnQpO1xuICAgIH0sXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGksIHJpZ2h0KSB7XG4gICAgICByZXR1cm4gKGkgPiByaWdodCk7XG4gICAgfSxcbiAgICBpbm5lcldpbmRvdzogZnVuY3Rpb24oaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICByZXR1cm4gKCBpID49IChjdXJyZW50UGFnZSAtIGlubmVyV2luZG93KSAmJiBpIDw9IChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSk7XG4gICAgfSxcbiAgICBkb3R0ZWQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuZG90dGVkTGVmdChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB8fCAodGhpcy5kb3R0ZWRSaWdodChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pKTtcbiAgICB9LFxuICAgIGRvdHRlZExlZnQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgIHJldHVybiAoKGkgPT0gKGxlZnQgKyAxKSkgJiYgIXRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSAmJiAhdGhpcy5yaWdodChpLCByaWdodCkpO1xuICAgIH0sXG4gICAgZG90dGVkUmlnaHQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgaWYgKHBhZ2luZ0xpc3QuaXRlbXNbY3VycmVudFBhZ2VJdGVtLTFdLnZhbHVlcygpLmRvdHRlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKChpID09IChyaWdodCkpICYmICF0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgJiYgIXRoaXMucmlnaHQoaSwgcmlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWxtLCBpLCBwYWdlKSB7XG4gICAgIGV2ZW50cy5iaW5kKGVsbSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgbGlzdC5zaG93KChpLTEpKnBhZ2UgKyAxLCBwYWdlKTtcbiAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgcGFnaW5nTGlzdCA9IG5ldyBMaXN0KGxpc3QubGlzdENvbnRhaW5lci5pZCwge1xuICAgICAgbGlzdENsYXNzOiBvcHRpb25zLnBhZ2luYXRpb25DbGFzcyB8fCAncGFnaW5hdGlvbicsXG4gICAgICBpdGVtOiBcIjxsaT48YSBjbGFzcz0ncGFnZScgaHJlZj0namF2YXNjcmlwdDpmdW5jdGlvbiBaKCl7Wj1cXFwiXFxcIn1aKCknPjwvYT48L2xpPlwiLFxuICAgICAgdmFsdWVOYW1lczogWydwYWdlJywgJ2RvdHRlZCddLFxuICAgICAgc2VhcmNoQ2xhc3M6ICdwYWdpbmF0aW9uLXNlYXJjaC10aGF0LWlzLW5vdC1zdXBwb3NlZC10by1leGlzdCcsXG4gICAgICBzb3J0Q2xhc3M6ICdwYWdpbmF0aW9uLXNvcnQtdGhhdC1pcy1ub3Qtc3VwcG9zZWQtdG8tZXhpc3QnXG4gICAgfSk7XG5cbiAgICBsaXN0Lm9uKCd1cGRhdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICByZWZyZXNoKHBhZ2luZ0xpc3QsIG9wdGlvbnMpO1xuICAgIH0pO1xuICAgIHJlZnJlc2gocGFnaW5nTGlzdCwgb3B0aW9ucyk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIEl0ZW0gPSByZXF1aXJlKCcuL2l0ZW0nKShsaXN0KTtcblxuICB2YXIgZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICB2YXIgbm9kZXMgPSBwYXJlbnQuY2hpbGROb2RlcyxcbiAgICAgIGl0ZW1zID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbm9kZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgLy8gT25seSB0ZXh0bm9kZXMgaGF2ZSBhIGRhdGEgYXR0cmlidXRlXG4gICAgICBpZiAobm9kZXNbaV0uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobm9kZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlbXM7XG4gIH07XG5cbiAgdmFyIHBhcnNlID0gZnVuY3Rpb24oaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gaXRlbUVsZW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxpc3QuaXRlbXMucHVzaChuZXcgSXRlbSh2YWx1ZU5hbWVzLCBpdGVtRWxlbWVudHNbaV0pKTtcbiAgICB9XG4gIH07XG4gIHZhciBwYXJzZUFzeW5jID0gZnVuY3Rpb24oaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKSB7XG4gICAgdmFyIGl0ZW1zVG9JbmRleCA9IGl0ZW1FbGVtZW50cy5zcGxpY2UoMCwgNTApOyAvLyBUT0RPOiBJZiA8IDEwMCBpdGVtcywgd2hhdCBoYXBwZW5zIGluIElFIGV0Yz9cbiAgICBwYXJzZShpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIGlmIChpdGVtRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcGFyc2VBc3luYyhpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpO1xuICAgICAgfSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QudXBkYXRlKCk7XG4gICAgICBsaXN0LnRyaWdnZXIoJ3BhcnNlQ29tcGxldGUnKTtcbiAgICB9XG4gIH07XG5cbiAgbGlzdC5oYW5kbGVycy5wYXJzZUNvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5wYXJzZUNvbXBsZXRlIHx8IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXNUb0luZGV4ID0gZ2V0Q2hpbGRyZW4obGlzdC5saXN0KSxcbiAgICAgIHZhbHVlTmFtZXMgPSBsaXN0LnZhbHVlTmFtZXM7XG5cbiAgICBpZiAobGlzdC5pbmRleEFzeW5jKSB7XG4gICAgICBwYXJzZUFzeW5jKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgaXRlbSxcbiAgICB0ZXh0LFxuICAgIGNvbHVtbnMsXG4gICAgc2VhcmNoU3RyaW5nLFxuICAgIGN1c3RvbVNlYXJjaDtcblxuICB2YXIgcHJlcGFyZSA9IHtcbiAgICByZXNldExpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5pID0gMTtcbiAgICAgIGxpc3QudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgICBjdXN0b21TZWFyY2ggPSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBzZXRPcHRpb25zOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPT0gMiAmJiBhcmdzWzFdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgY29sdW1ucyA9IGFyZ3NbMV07XG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDIgJiYgdHlwZW9mKGFyZ3NbMV0pID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgICAgICBjdXN0b21TZWFyY2ggPSBhcmdzWzFdO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIGNvbHVtbnMgPSBhcmdzWzFdO1xuICAgICAgICBjdXN0b21TZWFyY2ggPSBhcmdzWzJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldENvbHVtbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGxpc3QuaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBpZiAoY29sdW1ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbnMgPSAobGlzdC5zZWFyY2hDb2x1bW5zID09PSB1bmRlZmluZWQpID8gcHJlcGFyZS50b0FycmF5KGxpc3QuaXRlbXNbMF0udmFsdWVzKCkpIDogbGlzdC5zZWFyY2hDb2x1bW5zO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0U2VhcmNoU3RyaW5nOiBmdW5jdGlvbihzKSB7XG4gICAgICBzID0gbGlzdC51dGlscy50b1N0cmluZyhzKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcyA9IHMucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNdL2csIFwiXFxcXCQmXCIpOyAvLyBFc2NhcGUgcmVndWxhciBleHByZXNzaW9uIGNoYXJhY3RlcnNcbiAgICAgIHNlYXJjaFN0cmluZyA9IHM7XG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciB0bXBDb2x1bW4gPSBbXTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gdmFsdWVzKSB7XG4gICAgICAgIHRtcENvbHVtbi5wdXNoKG5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRtcENvbHVtbjtcbiAgICB9XG4gIH07XG4gIHZhciBzZWFyY2ggPSB7XG4gICAgbGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBrID0gMCwga2wgPSBsaXN0Lml0ZW1zLmxlbmd0aDsgayA8IGtsOyBrKyspIHtcbiAgICAgICAgc2VhcmNoLml0ZW0obGlzdC5pdGVtc1trXSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpdGVtLmZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjb2x1bW5zLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgaWYgKHNlYXJjaC52YWx1ZXMoaXRlbS52YWx1ZXMoKSwgY29sdW1uc1tqXSkpIHtcbiAgICAgICAgICBpdGVtLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24odmFsdWVzLCBjb2x1bW4pIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoY29sdW1uKSkge1xuICAgICAgICB0ZXh0ID0gbGlzdC51dGlscy50b1N0cmluZyh2YWx1ZXNbY29sdW1uXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKChzZWFyY2hTdHJpbmcgIT09IFwiXCIpICYmICh0ZXh0LnNlYXJjaChzZWFyY2hTdHJpbmcpID4gLTEpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QucmVzZXQuc2VhcmNoKCk7XG4gICAgICBsaXN0LnNlYXJjaGVkID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzZWFyY2hNZXRob2QgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBsaXN0LnRyaWdnZXIoJ3NlYXJjaFN0YXJ0Jyk7XG5cbiAgICBwcmVwYXJlLnJlc2V0TGlzdCgpO1xuICAgIHByZXBhcmUuc2V0U2VhcmNoU3RyaW5nKHN0cik7XG4gICAgcHJlcGFyZS5zZXRPcHRpb25zKGFyZ3VtZW50cyk7IC8vIHN0ciwgY29sc3xzZWFyY2hGdW5jdGlvbiwgc2VhcmNoRnVuY3Rpb25cbiAgICBwcmVwYXJlLnNldENvbHVtbnMoKTtcblxuICAgIGlmIChzZWFyY2hTdHJpbmcgPT09IFwiXCIgKSB7XG4gICAgICBzZWFyY2gucmVzZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zZWFyY2hlZCA9IHRydWU7XG4gICAgICBpZiAoY3VzdG9tU2VhcmNoKSB7XG4gICAgICAgIGN1c3RvbVNlYXJjaChzZWFyY2hTdHJpbmcsIGNvbHVtbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoLmxpc3QoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignc2VhcmNoQ29tcGxldGUnKTtcbiAgICByZXR1cm4gbGlzdC52aXNpYmxlSXRlbXM7XG4gIH07XG5cbiAgbGlzdC5oYW5kbGVycy5zZWFyY2hTdGFydCA9IGxpc3QuaGFuZGxlcnMuc2VhcmNoU3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuc2VhcmNoQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnNlYXJjaENvbXBsZXRlIHx8IFtdO1xuXG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQobGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zZWFyY2hDbGFzcyksICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LCAvLyBJRSBoYXZlIHNyY0VsZW1lbnRcbiAgICAgIGFscmVhZHlDbGVhcmVkID0gKHRhcmdldC52YWx1ZSA9PT0gXCJcIiAmJiAhbGlzdC5zZWFyY2hlZCk7XG4gICAgaWYgKCFhbHJlYWR5Q2xlYXJlZCkgeyAvLyBJZiBvbmlucHV0IGFscmVhZHkgaGF2ZSByZXNldHRlZCB0aGUgbGlzdCwgZG8gbm90aGluZ1xuICAgICAgc2VhcmNoTWV0aG9kKHRhcmdldC52YWx1ZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBVc2VkIHRvIGRldGVjdCBjbGljayBvbiBIVE1MNSBjbGVhciBidXR0b25cbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNlYXJjaENsYXNzKSwgJ2lucHV0JywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgaWYgKHRhcmdldC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgc2VhcmNoTWV0aG9kKCcnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzZWFyY2hNZXRob2Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIGJ1dHRvbnMgPSB7XG4gICAgZWxzOiB1bmRlZmluZWQsXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYnV0dG9ucy5lbHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnV0dG9ucy5lbHNbaV0pLnJlbW92ZSgnYXNjJyk7XG4gICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidXR0b25zLmVsc1tpXSkucmVtb3ZlKCdkZXNjJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRPcmRlcjogZnVuY3Rpb24oYnRuKSB7XG4gICAgICB2YXIgcHJlZGVmaW5lZE9yZGVyID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1vcmRlcicpO1xuICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBcImFzY1wiIHx8IHByZWRlZmluZWRPcmRlciA9PSBcImRlc2NcIikge1xuICAgICAgICByZXR1cm4gcHJlZGVmaW5lZE9yZGVyO1xuICAgICAgfSBlbHNlIGlmIChsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5oYXMoJ2Rlc2MnKSkge1xuICAgICAgICByZXR1cm4gXCJhc2NcIjtcbiAgICAgIH0gZWxzZSBpZiAobGlzdC51dGlscy5jbGFzc2VzKGJ0bikuaGFzKCdhc2MnKSkge1xuICAgICAgICByZXR1cm4gXCJkZXNjXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJhc2NcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEluU2Vuc2l0aXZlOiBmdW5jdGlvbihidG4sIG9wdGlvbnMpIHtcbiAgICAgIHZhciBpbnNlbnNpdGl2ZSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtaW5zZW5zaXRpdmUnKTtcbiAgICAgIGlmIChpbnNlbnNpdGl2ZSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0T3JkZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGJ1dHRvbnMuZWxzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgdmFyIGJ0biA9IGJ1dHRvbnMuZWxzW2ldO1xuICAgICAgICBpZiAobGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1zb3J0JykgIT09IG9wdGlvbnMudmFsdWVOYW1lKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZWRlZmluZWRPcmRlciA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtb3JkZXInKTtcbiAgICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBcImFzY1wiIHx8IHByZWRlZmluZWRPcmRlciA9PSBcImRlc2NcIikge1xuICAgICAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gb3B0aW9ucy5vcmRlcikge1xuICAgICAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ0bikuYWRkKG9wdGlvbnMub3JkZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5hZGQob3B0aW9ucy5vcmRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHNvcnQgPSBmdW5jdGlvbigpIHtcbiAgICBsaXN0LnRyaWdnZXIoJ3NvcnRTdGFydCcpO1xuICAgIHZhciBvcHRpb25zID0ge307XG5cbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLmN1cnJlbnRUYXJnZXQgfHwgYXJndW1lbnRzWzBdLnNyY0VsZW1lbnQgfHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgb3B0aW9ucy52YWx1ZU5hbWUgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZSh0YXJnZXQsICdkYXRhLXNvcnQnKTtcbiAgICAgIGJ1dHRvbnMuZ2V0SW5TZW5zaXRpdmUodGFyZ2V0LCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMub3JkZXIgPSBidXR0b25zLmdldE9yZGVyKHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbMV0gfHwgb3B0aW9ucztcbiAgICAgIG9wdGlvbnMudmFsdWVOYW1lID0gYXJndW1lbnRzWzBdO1xuICAgICAgb3B0aW9ucy5vcmRlciA9IG9wdGlvbnMub3JkZXIgfHwgXCJhc2NcIjtcbiAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSAodHlwZW9mIG9wdGlvbnMuaW5zZW5zaXRpdmUgPT0gXCJ1bmRlZmluZWRcIikgPyB0cnVlIDogb3B0aW9ucy5pbnNlbnNpdGl2ZTtcbiAgICB9XG5cbiAgICBidXR0b25zLmNsZWFyKCk7XG4gICAgYnV0dG9ucy5zZXRPcmRlcihvcHRpb25zKTtcblxuXG4gICAgLy8gY2FzZUluc2Vuc2l0aXZlXG4gICAgLy8gYWxwaGFiZXRcbiAgICB2YXIgY3VzdG9tU29ydEZ1bmN0aW9uID0gKG9wdGlvbnMuc29ydEZ1bmN0aW9uIHx8IGxpc3Quc29ydEZ1bmN0aW9uIHx8IG51bGwpLFxuICAgICAgICBtdWx0aSA9ICgob3B0aW9ucy5vcmRlciA9PT0gJ2Rlc2MnKSA/IC0xIDogMSksXG4gICAgICAgIHNvcnRGdW5jdGlvbjtcblxuICAgIGlmIChjdXN0b21Tb3J0RnVuY3Rpb24pIHtcbiAgICAgIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGl0ZW1BLCBpdGVtQikge1xuICAgICAgICByZXR1cm4gY3VzdG9tU29ydEZ1bmN0aW9uKGl0ZW1BLCBpdGVtQiwgb3B0aW9ucykgKiBtdWx0aTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGl0ZW1BLCBpdGVtQikge1xuICAgICAgICB2YXIgc29ydCA9IGxpc3QudXRpbHMubmF0dXJhbFNvcnQ7XG4gICAgICAgIHNvcnQuYWxwaGFiZXQgPSBsaXN0LmFscGhhYmV0IHx8IG9wdGlvbnMuYWxwaGFiZXQgfHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXNvcnQuYWxwaGFiZXQgJiYgb3B0aW9ucy5pbnNlbnNpdGl2ZSkge1xuICAgICAgICAgIHNvcnQgPSBsaXN0LnV0aWxzLm5hdHVyYWxTb3J0LmNhc2VJbnNlbnNpdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc29ydChpdGVtQS52YWx1ZXMoKVtvcHRpb25zLnZhbHVlTmFtZV0sIGl0ZW1CLnZhbHVlcygpW29wdGlvbnMudmFsdWVOYW1lXSkgKiBtdWx0aTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgbGlzdC5pdGVtcy5zb3J0KHNvcnRGdW5jdGlvbik7XG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ3NvcnRDb21wbGV0ZScpO1xuICB9O1xuXG4gIC8vIEFkZCBoYW5kbGVyc1xuICBsaXN0LmhhbmRsZXJzLnNvcnRTdGFydCA9IGxpc3QuaGFuZGxlcnMuc29ydFN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLnNvcnRDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuc29ydENvbXBsZXRlIHx8IFtdO1xuXG4gIGJ1dHRvbnMuZWxzID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zb3J0Q2xhc3MpO1xuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGJ1dHRvbnMuZWxzLCAnY2xpY2snLCBzb3J0KTtcbiAgbGlzdC5vbignc2VhcmNoU3RhcnQnLCBidXR0b25zLmNsZWFyKTtcbiAgbGlzdC5vbignZmlsdGVyU3RhcnQnLCBidXR0b25zLmNsZWFyKTtcblxuICByZXR1cm4gc29ydDtcbn07XG4iLCJ2YXIgVGVtcGxhdGVyID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgaXRlbVNvdXJjZSxcbiAgICB0ZW1wbGF0ZXIgPSB0aGlzO1xuXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgaXRlbVNvdXJjZSA9IHRlbXBsYXRlci5nZXRJdGVtU291cmNlKGxpc3QuaXRlbSk7XG4gICAgaWYgKGl0ZW1Tb3VyY2UpIHtcbiAgICAgIGl0ZW1Tb3VyY2UgPSB0ZW1wbGF0ZXIuY2xlYXJTb3VyY2VJdGVtKGl0ZW1Tb3VyY2UsIGxpc3QudmFsdWVOYW1lcyk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY2xlYXJTb3VyY2VJdGVtID0gZnVuY3Rpb24oZWwsIHZhbHVlTmFtZXMpIHtcbiAgICBmb3IodmFyIGkgPSAwLCBpbCA9IHZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIGlmICh2YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gdmFsdWVOYW1lc1tpXS5kYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyt2YWx1ZU5hbWVzW2ldLmRhdGFbal0sICcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWVzW2ldLmF0dHIgJiYgdmFsdWVOYW1lc1tpXS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhlbCwgdmFsdWVOYW1lc1tpXS5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUodmFsdWVOYW1lc1tpXS5hdHRyLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGVsLCB2YWx1ZU5hbWVzW2ldLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICB0aGlzLmdldEl0ZW1Tb3VyY2UgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIG5vZGVzID0gbGlzdC5saXN0LmNoaWxkTm9kZXMsXG4gICAgICAgIGl0ZW1zID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgLy8gT25seSB0ZXh0bm9kZXMgaGF2ZSBhIGRhdGEgYXR0cmlidXRlXG4gICAgICAgIGlmIChub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgvPHRyW1xccz5dL2cuZXhlYyhpdGVtKSkge1xuICAgICAgdmFyIHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICAgIHRib2R5LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICByZXR1cm4gdGJvZHkuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uaW5kZXhPZihcIjxcIikgIT09IC0xKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgIHJldHVybiBkaXYuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpc3QuaXRlbSk7XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbihpdGVtLCB2YWx1ZU5hbWVzKSB7XG4gICAgdGVtcGxhdGVyLmNyZWF0ZShpdGVtKTtcbiAgICB2YXIgdmFsdWVzID0ge307XG4gICAgZm9yKHZhciBpID0gMCwgaWwgPSB2YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBlbG07XG4gICAgICBpZiAodmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IHZhbHVlTmFtZXNbaV0uZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV0uZGF0YVtqXV0gPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShpdGVtLmVsbSwgJ2RhdGEtJyt2YWx1ZU5hbWVzW2ldLmRhdGFbal0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZXNbaV0uYXR0ciAmJiB2YWx1ZU5hbWVzW2ldLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWVzW2ldLm5hbWUsIHRydWUpO1xuICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXS5uYW1lXSA9IGVsbSA/IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGVsbSwgdmFsdWVOYW1lc1tpXS5hdHRyKSA6IFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZXNbaV0sIHRydWUpO1xuICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXV0gPSBlbG0gPyBlbG0uaW5uZXJIVE1MIDogXCJcIjtcbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICB0aGlzLnNldCA9IGZ1bmN0aW9uKGl0ZW0sIHZhbHVlcykge1xuICAgIHZhciBnZXRWYWx1ZU5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBsaXN0LnZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBpZiAobGlzdC52YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGxpc3QudmFsdWVOYW1lc1tpXS5kYXRhO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgICAgaWYgKGRhdGFbal0gPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbmFtZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0uYXR0ciAmJiBsaXN0LnZhbHVlTmFtZXNbaV0ubmFtZSAmJiBsaXN0LnZhbHVlTmFtZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3QudmFsdWVOYW1lc1tpXTtcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0gPT09IG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldFZhbHVlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBlbG07XG4gICAgICB2YXIgdmFsdWVOYW1lID0gZ2V0VmFsdWVOYW1lKG5hbWUpO1xuICAgICAgaWYgKCF2YWx1ZU5hbWUpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmICh2YWx1ZU5hbWUuZGF0YSkge1xuICAgICAgICBpdGVtLmVsbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyt2YWx1ZU5hbWUuZGF0YSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWUuYXR0ciAmJiB2YWx1ZU5hbWUubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZS5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUodmFsdWVOYW1lLmF0dHIsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBpZiAoIXRlbXBsYXRlci5jcmVhdGUoaXRlbSkpIHtcbiAgICAgIGZvcih2YXIgdiBpbiB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2KSkge1xuICAgICAgICAgIHNldFZhbHVlKHYsIHZhbHVlc1t2XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZW1Tb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGxpc3QgbmVlZCB0byBoYXZlIGF0IGxpc3Qgb25lIGl0ZW0gb24gaW5pdCBvdGhlcndpc2UgeW91J2xsIGhhdmUgdG8gYWRkIGEgdGVtcGxhdGUuXCIpO1xuICAgIH1cbiAgICAvKiBJZiBpdGVtIHNvdXJjZSBkb2VzIG5vdCBleGlzdHMsIHVzZSB0aGUgZmlyc3QgaXRlbSBpbiBsaXN0IGFzXG4gICAgc291cmNlIGZvciBuZXcgaXRlbXMgKi9cbiAgICB2YXIgbmV3SXRlbSA9IGl0ZW1Tb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuICAgIG5ld0l0ZW0ucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIGl0ZW0uZWxtID0gbmV3SXRlbTtcbiAgICB0ZW1wbGF0ZXIuc2V0KGl0ZW0sIGl0ZW0udmFsdWVzKCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0ucGFyZW50Tm9kZSA9PT0gbGlzdC5saXN0KSB7XG4gICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQoaXRlbS5lbG0pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zaG93ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIHRlbXBsYXRlci5jcmVhdGUoaXRlbSk7XG4gICAgbGlzdC5saXN0LmFwcGVuZENoaWxkKGl0ZW0uZWxtKTtcbiAgfTtcbiAgdGhpcy5oaWRlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0uZWxtLnBhcmVudE5vZGUgPT09IGxpc3QubGlzdCkge1xuICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGl0ZW0uZWxtKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAvKiAuaW5uZXJIVE1MID0gJyc7IGZ1Y2tzIHVwIElFICovXG4gICAgaWYgKGxpc3QubGlzdC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHdoaWxlIChsaXN0Lmxpc3QuY2hpbGROb2Rlcy5sZW5ndGggPj0gMSlcbiAgICAgIHtcbiAgICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGxpc3QubGlzdC5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaW5pdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHJldHVybiBuZXcgVGVtcGxhdGVyKGxpc3QpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgaW5kZXggPSByZXF1aXJlKCcuL2luZGV4LW9mJyk7XG5cbi8qKlxuICogV2hpdGVzcGFjZSByZWdleHAuXG4gKi9cblxudmFyIHJlID0gL1xccysvO1xuXG4vKipcbiAqIHRvU3RyaW5nIHJlZmVyZW5jZS5cbiAqL1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFdyYXAgYGVsYCBpbiBhIGBDbGFzc0xpc3RgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCl7XG4gIHJldHVybiBuZXcgQ2xhc3NMaXN0KGVsKTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBDbGFzc0xpc3QgZm9yIGBlbGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gQ2xhc3NMaXN0KGVsKSB7XG4gIGlmICghZWwgfHwgIWVsLm5vZGVUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIERPTSBlbGVtZW50IHJlZmVyZW5jZSBpcyByZXF1aXJlZCcpO1xuICB9XG4gIHRoaXMuZWwgPSBlbDtcbiAgdGhpcy5saXN0ID0gZWwuY2xhc3NMaXN0O1xufVxuXG4vKipcbiAqIEFkZCBjbGFzcyBgbmFtZWAgaWYgbm90IGFscmVhZHkgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG5hbWUpe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIHRoaXMubGlzdC5hZGQobmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICB2YXIgYXJyID0gdGhpcy5hcnJheSgpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICghfmkpIGFyci5wdXNoKG5hbWUpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgY2xhc3MgYG5hbWVgIHdoZW4gcHJlc2VudCwgb3JcbiAqIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlXG4gKiBhbnkgd2hpY2ggbWF0Y2guXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24obmFtZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgdGhpcy5saXN0LnJlbW92ZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSB0aGlzLmFycmF5KCk7XG4gIHZhciBpID0gaW5kZXgoYXJyLCBuYW1lKTtcbiAgaWYgKH5pKSBhcnIuc3BsaWNlKGksIDEpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIFRvZ2dsZSBjbGFzcyBgbmFtZWAsIGNhbiBmb3JjZSBzdGF0ZSB2aWEgYGZvcmNlYC5cbiAqXG4gKiBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IGNsYXNzTGlzdCwgYnV0IGRvIG5vdCBzdXBwb3J0IGBmb3JjZWAgeWV0LFxuICogdGhlIG1pc3Rha2Ugd2lsbCBiZSBkZXRlY3RlZCBhbmQgY29ycmVjdGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24obmFtZSwgZm9yY2Upe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgZm9yY2UpIHtcbiAgICAgIGlmIChmb3JjZSAhPT0gdGhpcy5saXN0LnRvZ2dsZShuYW1lLCBmb3JjZSkpIHtcbiAgICAgICAgdGhpcy5saXN0LnRvZ2dsZShuYW1lKTsgLy8gdG9nZ2xlIGFnYWluIHRvIGNvcnJlY3RcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0LnRvZ2dsZShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSkge1xuICAgICAgdGhpcy5yZW1vdmUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5oYXMobmFtZSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChuYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IG9mIGNsYXNzZXMuXG4gKlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuYXJyYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgY2xhc3NOYW1lID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gIHZhciBzdHIgPSBjbGFzc05hbWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB2YXIgYXJyID0gc3RyLnNwbGl0KHJlKTtcbiAgaWYgKCcnID09PSBhcnJbMF0pIGFyci5zaGlmdCgpO1xuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBjbGFzcyBgbmFtZWAgaXMgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmhhcyA9XG5DbGFzc0xpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiB0aGlzLmxpc3QgPyB0aGlzLmxpc3QuY29udGFpbnMobmFtZSkgOiAhISB+aW5kZXgodGhpcy5hcnJheSgpLCBuYW1lKTtcbn07XG4iLCJ2YXIgYmluZCA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICB1bmJpbmQgPSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4gICAgcHJlZml4ID0gYmluZCAhPT0gJ2FkZEV2ZW50TGlzdGVuZXInID8gJ29uJyA6ICcnLFxuICAgIHRvQXJyYXkgPSByZXF1aXJlKCcuL3RvLWFycmF5Jyk7XG5cbi8qKlxuICogQmluZCBgZWxgIGV2ZW50IGB0eXBlYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiBvciBBcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWwgPSB0b0FycmF5KGVsKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKysgKSB7XG4gICAgZWxbaV1bYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICB9XG59O1xuXG4vKipcbiAqIFVuYmluZCBgZWxgIGV2ZW50IGB0eXBlYCdzIGNhbGxiYWNrIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbCwgTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uIG9yIEFycmF5XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FwdHVyZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnVuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsID0gdG9BcnJheShlbCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrICkge1xuICAgIGVsW2ldW3VuYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICB9XG59O1xuIiwiLypcbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3NlZ21lbnRpby9leHRlbmRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCAob2JqZWN0KSB7XG4gICAgLy8gVGFrZXMgYW4gdW5saW1pdGVkIG51bWJlciBvZiBleHRlbmRlcnMuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgLy8gRm9yIGVhY2ggZXh0ZW5kZXIsIGNvcHkgdGhlaXIgcHJvcGVydGllcyBvbiBvdXIgb2JqZWN0LlxuICAgIGZvciAodmFyIGkgPSAwLCBzb3VyY2U7IHNvdXJjZSA9IGFyZ3NbaV07IGkrKykge1xuICAgICAgICBpZiAoIXNvdXJjZSkgY29udGludWU7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGV4dCwgcGF0dGVybiwgb3B0aW9ucykge1xuICAgIC8vIEFwcm94aW1hdGVseSB3aGVyZSBpbiB0aGUgdGV4dCBpcyB0aGUgcGF0dGVybiBleHBlY3RlZCB0byBiZSBmb3VuZD9cbiAgICB2YXIgTWF0Y2hfTG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uIHx8IDA7XG5cbiAgICAvL0RldGVybWluZXMgaG93IGNsb3NlIHRoZSBtYXRjaCBtdXN0IGJlIHRvIHRoZSBmdXp6eSBsb2NhdGlvbiAoc3BlY2lmaWVkIGFib3ZlKS4gQW4gZXhhY3QgbGV0dGVyIG1hdGNoIHdoaWNoIGlzICdkaXN0YW5jZScgY2hhcmFjdGVycyBhd2F5IGZyb20gdGhlIGZ1enp5IGxvY2F0aW9uIHdvdWxkIHNjb3JlIGFzIGEgY29tcGxldGUgbWlzbWF0Y2guIEEgZGlzdGFuY2Ugb2YgJzAnIHJlcXVpcmVzIHRoZSBtYXRjaCBiZSBhdCB0aGUgZXhhY3QgbG9jYXRpb24gc3BlY2lmaWVkLCBhIHRocmVzaG9sZCBvZiAnMTAwMCcgd291bGQgcmVxdWlyZSBhIHBlcmZlY3QgbWF0Y2ggdG8gYmUgd2l0aGluIDgwMCBjaGFyYWN0ZXJzIG9mIHRoZSBmdXp6eSBsb2NhdGlvbiB0byBiZSBmb3VuZCB1c2luZyBhIDAuOCB0aHJlc2hvbGQuXG4gICAgdmFyIE1hdGNoX0Rpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZSB8fCAxMDA7XG5cbiAgICAvLyBBdCB3aGF0IHBvaW50IGRvZXMgdGhlIG1hdGNoIGFsZ29yaXRobSBnaXZlIHVwLiBBIHRocmVzaG9sZCBvZiAnMC4wJyByZXF1aXJlcyBhIHBlcmZlY3QgbWF0Y2ggKG9mIGJvdGggbGV0dGVycyBhbmQgbG9jYXRpb24pLCBhIHRocmVzaG9sZCBvZiAnMS4wJyB3b3VsZCBtYXRjaCBhbnl0aGluZy5cbiAgICB2YXIgTWF0Y2hfVGhyZXNob2xkID0gb3B0aW9ucy50aHJlc2hvbGQgfHwgMC40O1xuXG4gICAgaWYgKHBhdHRlcm4gPT09IHRleHQpIHJldHVybiB0cnVlOyAvLyBFeGFjdCBtYXRjaFxuICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA+IDMyKSByZXR1cm4gZmFsc2U7IC8vIFRoaXMgYWxnb3JpdGhtIGNhbm5vdCBiZSB1c2VkXG5cbiAgICAvLyBTZXQgc3RhcnRpbmcgbG9jYXRpb24gYXQgYmVnaW5uaW5nIHRleHQgYW5kIGluaXRpYWxpc2UgdGhlIGFscGhhYmV0LlxuICAgIHZhciBsb2MgPSBNYXRjaF9Mb2NhdGlvbixcbiAgICAgICAgcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBxID0ge30sXG4gICAgICAgICAgICAgICAgaTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBxW3BhdHRlcm4uY2hhckF0KGkpXSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcVtwYXR0ZXJuLmNoYXJBdChpKV0gfD0gMSA8PCAocGF0dGVybi5sZW5ndGggLSBpIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBxO1xuICAgICAgICB9KCkpO1xuXG4gICAgLy8gQ29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBzY29yZSBmb3IgYSBtYXRjaCB3aXRoIGUgZXJyb3JzIGFuZCB4IGxvY2F0aW9uLlxuICAgIC8vIEFjY2Vzc2VzIGxvYyBhbmQgcGF0dGVybiB0aHJvdWdoIGJlaW5nIGEgY2xvc3VyZS5cblxuICAgIGZ1bmN0aW9uIG1hdGNoX2JpdGFwU2NvcmVfKGUsIHgpIHtcbiAgICAgICAgdmFyIGFjY3VyYWN5ID0gZSAvIHBhdHRlcm4ubGVuZ3RoLFxuICAgICAgICAgICAgcHJveGltaXR5ID0gTWF0aC5hYnMobG9jIC0geCk7XG5cbiAgICAgICAgaWYgKCFNYXRjaF9EaXN0YW5jZSkge1xuICAgICAgICAgICAgLy8gRG9kZ2UgZGl2aWRlIGJ5IHplcm8gZXJyb3IuXG4gICAgICAgICAgICByZXR1cm4gcHJveGltaXR5ID8gMS4wIDogYWNjdXJhY3k7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5ICsgKHByb3hpbWl0eSAvIE1hdGNoX0Rpc3RhbmNlKTtcbiAgICB9XG5cbiAgICB2YXIgc2NvcmVfdGhyZXNob2xkID0gTWF0Y2hfVGhyZXNob2xkLCAvLyBIaWdoZXN0IHNjb3JlIGJleW9uZCB3aGljaCB3ZSBnaXZlIHVwLlxuICAgICAgICBiZXN0X2xvYyA9IHRleHQuaW5kZXhPZihwYXR0ZXJuLCBsb2MpOyAvLyBJcyB0aGVyZSBhIG5lYXJieSBleGFjdCBtYXRjaD8gKHNwZWVkdXApXG5cbiAgICBpZiAoYmVzdF9sb2MgIT0gLTEpIHtcbiAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICAvLyBXaGF0IGFib3V0IGluIHRoZSBvdGhlciBkaXJlY3Rpb24/IChzcGVlZHVwKVxuICAgICAgICBiZXN0X2xvYyA9IHRleHQubGFzdEluZGV4T2YocGF0dGVybiwgbG9jICsgcGF0dGVybi5sZW5ndGgpO1xuXG4gICAgICAgIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgYml0IGFycmF5cy5cbiAgICB2YXIgbWF0Y2htYXNrID0gMSA8PCAocGF0dGVybi5sZW5ndGggLSAxKTtcbiAgICBiZXN0X2xvYyA9IC0xO1xuXG4gICAgdmFyIGJpbl9taW4sIGJpbl9taWQ7XG4gICAgdmFyIGJpbl9tYXggPSBwYXR0ZXJuLmxlbmd0aCArIHRleHQubGVuZ3RoO1xuICAgIHZhciBsYXN0X3JkO1xuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgcGF0dGVybi5sZW5ndGg7IGQrKykge1xuICAgICAgICAvLyBTY2FuIGZvciB0aGUgYmVzdCBtYXRjaDsgZWFjaCBpdGVyYXRpb24gYWxsb3dzIGZvciBvbmUgbW9yZSBlcnJvci5cbiAgICAgICAgLy8gUnVuIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgaG93IGZhciBmcm9tICdsb2MnIHdlIGNhbiBzdHJheSBhdCB0aGlzXG4gICAgICAgIC8vIGVycm9yIGxldmVsLlxuICAgICAgICBiaW5fbWluID0gMDtcbiAgICAgICAgYmluX21pZCA9IGJpbl9tYXg7XG4gICAgICAgIHdoaWxlIChiaW5fbWluIDwgYmluX21pZCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoX2JpdGFwU2NvcmVfKGQsIGxvYyArIGJpbl9taWQpIDw9IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIGJpbl9taW4gPSBiaW5fbWlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbl9taWQgPSBNYXRoLmZsb29yKChiaW5fbWF4IC0gYmluX21pbikgLyAyICsgYmluX21pbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIHRoZSByZXN1bHQgZnJvbSB0aGlzIGl0ZXJhdGlvbiBhcyB0aGUgbWF4aW11bSBmb3IgdGhlIG5leHQuXG4gICAgICAgIGJpbl9tYXggPSBiaW5fbWlkO1xuICAgICAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgxLCBsb2MgLSBiaW5fbWlkICsgMSk7XG4gICAgICAgIHZhciBmaW5pc2ggPSBNYXRoLm1pbihsb2MgKyBiaW5fbWlkLCB0ZXh0Lmxlbmd0aCkgKyBwYXR0ZXJuLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmQgPSBBcnJheShmaW5pc2ggKyAyKTtcbiAgICAgICAgcmRbZmluaXNoICsgMV0gPSAoMSA8PCBkKSAtIDE7XG4gICAgICAgIGZvciAodmFyIGogPSBmaW5pc2g7IGogPj0gc3RhcnQ7IGotLSkge1xuICAgICAgICAgICAgLy8gVGhlIGFscGhhYmV0IChzKSBpcyBhIHNwYXJzZSBoYXNoLCBzbyB0aGUgZm9sbG93aW5nIGxpbmUgZ2VuZXJhdGVzXG4gICAgICAgICAgICAvLyB3YXJuaW5ncy5cbiAgICAgICAgICAgIHZhciBjaGFyTWF0Y2ggPSBzW3RleHQuY2hhckF0KGogLSAxKV07XG4gICAgICAgICAgICBpZiAoZCA9PT0gMCkgeyAgICAvLyBGaXJzdCBwYXNzOiBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICByZFtqXSA9ICgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2g7XG4gICAgICAgICAgICB9IGVsc2UgeyAgICAvLyBTdWJzZXF1ZW50IHBhc3NlczogZnV6enkgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmRbal0gPSAoKChyZFtqICsgMV0gPDwgMSkgfCAxKSAmIGNoYXJNYXRjaCkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKChsYXN0X3JkW2ogKyAxXSB8IGxhc3RfcmRbal0pIDw8IDEpIHwgMSkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X3JkW2ogKyAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZFtqXSAmIG1hdGNobWFzaykge1xuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IG1hdGNoX2JpdGFwU2NvcmVfKGQsIGogLSAxKTtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG1hdGNoIHdpbGwgYWxtb3N0IGNlcnRhaW5seSBiZSBiZXR0ZXIgdGhhbiBhbnkgZXhpc3RpbmcgbWF0Y2guXG4gICAgICAgICAgICAgICAgLy8gQnV0IGNoZWNrIGFueXdheS5cbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRvbGQgeW91IHNvLlxuICAgICAgICAgICAgICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdF9sb2MgPSBqIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RfbG9jID4gbG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHBhc3NpbmcgbG9jLCBkb24ndCBleGNlZWQgb3VyIGN1cnJlbnQgZGlzdGFuY2UgZnJvbSBsb2MuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IE1hdGgubWF4KDEsIDIgKiBsb2MgLSBiZXN0X2xvYyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbHJlYWR5IHBhc3NlZCBsb2MsIGRvd25oaWxsIGZyb20gaGVyZSBvbiBpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5vIGhvcGUgZm9yIGEgKGJldHRlcikgbWF0Y2ggYXQgZ3JlYXRlciBlcnJvciBsZXZlbHMuXG4gICAgICAgIGlmIChtYXRjaF9iaXRhcFNjb3JlXyhkICsgMSwgbG9jKSA+IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdF9yZCA9IHJkO1xuICAgIH1cblxuICAgIHJldHVybiAoYmVzdF9sb2MgPCAwKSA/IGZhbHNlIDogdHJ1ZTtcbn07XG4iLCIvKipcbiAqIEEgY3Jvc3MtYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBnZXRBdHRyaWJ1dGUuXG4gKiBTb3VyY2UgZm91bmQgaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzc1NTM0My8zNjEzMzcgd3JpdHRlbiBieSBWaXZpbiBQYWxpYXRoXG4gKlxuICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgYGF0dHJgIGF0IGBlbGVtZW50YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0clxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsLCBhdHRyKSB7XG4gIHZhciByZXN1bHQgPSAoZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShhdHRyKSkgfHwgbnVsbDtcbiAgaWYoICFyZXN1bHQgKSB7XG4gICAgdmFyIGF0dHJzID0gZWwuYXR0cmlidXRlcztcbiAgICB2YXIgbGVuZ3RoID0gYXR0cnMubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGF0dHJbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZihhdHRyW2ldLm5vZGVOYW1lID09PSBhdHRyKSB7XG4gICAgICAgICAgcmVzdWx0ID0gYXR0cltpXS5ub2RlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiAqIEEgY3Jvc3MtYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBnZXRFbGVtZW50c0J5Q2xhc3MuXG4gKiBIZWF2aWx5IGJhc2VkIG9uIER1c3RpbiBEaWF6J3MgZnVuY3Rpb246IGh0dHA6Ly9kdXN0aW5kaWF6LmNvbS9nZXRlbGVtZW50c2J5Y2xhc3MuXG4gKlxuICogRmluZCBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcyBgY2xhc3NOYW1lYCBpbnNpZGUgYGNvbnRhaW5lcmAuXG4gKiBVc2UgYHNpbmdsZSA9IHRydWVgIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlIGluIG9sZGVyIGJyb3dzZXJzXG4gKiB3aGVuIG9ubHkgb25lIGVsZW1lbnQgaXMgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbmdsZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG52YXIgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgaWYgKHNpbmdsZSkge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpWzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICB9XG59O1xuXG52YXIgcXVlcnlTZWxlY3RvciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgY2xhc3NOYW1lID0gJy4nICsgY2xhc3NOYW1lO1xuICBpZiAoc2luZ2xlKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cbnZhciBwb2x5ZmlsbCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgdmFyIGNsYXNzRWxlbWVudHMgPSBbXSxcbiAgICB0YWcgPSAnKic7XG5cbiAgdmFyIGVscyA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuICB2YXIgZWxzTGVuID0gZWxzLmxlbmd0aDtcbiAgdmFyIHBhdHRlcm4gPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIrY2xhc3NOYW1lK1wiKFxcXFxzfCQpXCIpO1xuICBmb3IgKHZhciBpID0gMCwgaiA9IDA7IGkgPCBlbHNMZW47IGkrKykge1xuICAgIGlmICggcGF0dGVybi50ZXN0KGVsc1tpXS5jbGFzc05hbWUpICkge1xuICAgICAgaWYgKHNpbmdsZSkge1xuICAgICAgICByZXR1cm4gZWxzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3NFbGVtZW50c1tqXSA9IGVsc1tpXTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NFbGVtZW50cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICgob3B0aW9ucy50ZXN0ICYmIG9wdGlvbnMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkgfHwgKCFvcHRpb25zLnRlc3QgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH0gZWxzZSBpZiAoKG9wdGlvbnMudGVzdCAmJiBvcHRpb25zLnF1ZXJ5U2VsZWN0b3IpIHx8ICghb3B0aW9ucy50ZXN0ICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gcXVlcnlTZWxlY3Rvcihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH1cbiAgfTtcbn0pKCk7XG4iLCJ2YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBvYmope1xuICBpZiAoaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiLyoqXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS90aW1veGxleS90by1hcnJheVxuICpcbiAqIENvbnZlcnQgYW4gYXJyYXktbGlrZSBvYmplY3QgaW50byBhbiBgQXJyYXlgLlxuICogSWYgYGNvbGxlY3Rpb25gIGlzIGFscmVhZHkgYW4gYEFycmF5YCwgdGhlbiB3aWxsIHJldHVybiBhIGNsb25lIG9mIGBjb2xsZWN0aW9uYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5IHwgTWl4ZWR9IGNvbGxlY3Rpb24gQW4gYEFycmF5YCBvciBhcnJheS1saWtlIG9iamVjdCB0byBjb252ZXJ0IGUuZy4gYGFyZ3VtZW50c2Agb3IgYE5vZGVMaXN0YFxuICogQHJldHVybiB7QXJyYXl9IE5haXZlIGNvbnZlcnNpb24gb2YgYGNvbGxlY3Rpb25gIHRvIGEgbmV3IGBBcnJheWAuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdG9BcnJheShjb2xsZWN0aW9uKSB7XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBbXTtcbiAgaWYgKGNvbGxlY3Rpb24gPT09IG51bGwpIHJldHVybiBbbnVsbF07XG4gIGlmIChjb2xsZWN0aW9uID09PSB3aW5kb3cpIHJldHVybiBbd2luZG93XTtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnc3RyaW5nJykgcmV0dXJuIFtjb2xsZWN0aW9uXTtcbiAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHJldHVybiBjb2xsZWN0aW9uO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24ubGVuZ3RoICE9ICdudW1iZXInKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdmdW5jdGlvbicgJiYgY29sbGVjdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuXG4gIHZhciBhcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb2xsZWN0aW9uLCBpKSB8fCBpIGluIGNvbGxlY3Rpb24pIHtcbiAgICAgIGFyci5wdXNoKGNvbGxlY3Rpb25baV0pO1xuICAgIH1cbiAgfVxuICBpZiAoIWFyci5sZW5ndGgpIHJldHVybiBbXTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gIHMgPSAocyA9PT0gdW5kZWZpbmVkKSA/IFwiXCIgOiBzO1xuICBzID0gKHMgPT09IG51bGwpID8gXCJcIiA6IHM7XG4gIHMgPSBzLnRvU3RyaW5nKCk7XG4gIHJldHVybiBzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0O1xudmFyIGFscGhhYmV0SW5kZXhNYXA7XG52YXIgYWxwaGFiZXRJbmRleE1hcExlbmd0aCA9IDA7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyQ29kZShjb2RlKSB7XG4gIHJldHVybiBjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTc7XG59XG5cbmZ1bmN0aW9uIG5hdHVyYWxDb21wYXJlKGEsIGIpIHtcbiAgdmFyIGxlbmd0aEEgPSAoYSArPSAnJykubGVuZ3RoO1xuICB2YXIgbGVuZ3RoQiA9IChiICs9ICcnKS5sZW5ndGg7XG4gIHZhciBhSW5kZXggPSAwO1xuICB2YXIgYkluZGV4ID0gMDtcblxuICB3aGlsZSAoYUluZGV4IDwgbGVuZ3RoQSAmJiBiSW5kZXggPCBsZW5ndGhCKSB7XG4gICAgdmFyIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChhSW5kZXgpO1xuICAgIHZhciBjaGFyQ29kZUIgPSBiLmNoYXJDb2RlQXQoYkluZGV4KTtcblxuICAgIGlmIChpc051bWJlckNvZGUoY2hhckNvZGVBKSkge1xuICAgICAgaWYgKCFpc051bWJlckNvZGUoY2hhckNvZGVCKSkge1xuICAgICAgICByZXR1cm4gY2hhckNvZGVBIC0gY2hhckNvZGVCO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtU3RhcnRBID0gYUluZGV4O1xuICAgICAgdmFyIG51bVN0YXJ0QiA9IGJJbmRleDtcblxuICAgICAgd2hpbGUgKGNoYXJDb2RlQSA9PT0gNDggJiYgKytudW1TdGFydEEgPCBsZW5ndGhBKSB7XG4gICAgICAgIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChudW1TdGFydEEpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGNoYXJDb2RlQiA9PT0gNDggJiYgKytudW1TdGFydEIgPCBsZW5ndGhCKSB7XG4gICAgICAgIGNoYXJDb2RlQiA9IGIuY2hhckNvZGVBdChudW1TdGFydEIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtRW5kQSA9IG51bVN0YXJ0QTtcbiAgICAgIHZhciBudW1FbmRCID0gbnVtU3RhcnRCO1xuXG4gICAgICB3aGlsZSAobnVtRW5kQSA8IGxlbmd0aEEgJiYgaXNOdW1iZXJDb2RlKGEuY2hhckNvZGVBdChudW1FbmRBKSkpIHtcbiAgICAgICAgKytudW1FbmRBO1xuICAgICAgfVxuICAgICAgd2hpbGUgKG51bUVuZEIgPCBsZW5ndGhCICYmIGlzTnVtYmVyQ29kZShiLmNoYXJDb2RlQXQobnVtRW5kQikpKSB7XG4gICAgICAgICsrbnVtRW5kQjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpZmZlcmVuY2UgPSBudW1FbmRBIC0gbnVtU3RhcnRBIC0gbnVtRW5kQiArIG51bVN0YXJ0QjsgLy8gbnVtQSBsZW5ndGggLSBudW1CIGxlbmd0aFxuICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChudW1TdGFydEEgPCBudW1FbmRBKSB7XG4gICAgICAgIGRpZmZlcmVuY2UgPSBhLmNoYXJDb2RlQXQobnVtU3RhcnRBKyspIC0gYi5jaGFyQ29kZUF0KG51bVN0YXJ0QisrKTtcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhSW5kZXggPSBudW1FbmRBO1xuICAgICAgYkluZGV4ID0gbnVtRW5kQjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaGFyQ29kZUEgIT09IGNoYXJDb2RlQikge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFyQ29kZUEgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoICYmXG4gICAgICAgIGNoYXJDb2RlQiA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGggJiZcbiAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUFdICE9PSAtMSAmJlxuICAgICAgICBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQl0gIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVBXSAtIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVCXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoYXJDb2RlQSAtIGNoYXJDb2RlQjtcbiAgICB9XG5cbiAgICArK2FJbmRleDtcbiAgICArK2JJbmRleDtcbiAgfVxuXG4gIHJldHVybiBsZW5ndGhBIC0gbGVuZ3RoQjtcbn1cblxubmF0dXJhbENvbXBhcmUuY2FzZUluc2Vuc2l0aXZlID0gbmF0dXJhbENvbXBhcmUuaSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIG5hdHVyYWxDb21wYXJlKCgnJyArIGEpLnRvTG93ZXJDYXNlKCksICgnJyArIGIpLnRvTG93ZXJDYXNlKCkpO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobmF0dXJhbENvbXBhcmUsIHtcbiAgYWxwaGFiZXQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGFscGhhYmV0O1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgYWxwaGFiZXQgPSB2YWx1ZTtcbiAgICAgIGFscGhhYmV0SW5kZXhNYXAgPSBbXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGlmIChhbHBoYWJldCkge1xuICAgICAgICBmb3IgKDsgaSA8IGFscGhhYmV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYWxwaGFiZXRJbmRleE1hcFthbHBoYWJldC5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFscGhhYmV0SW5kZXhNYXBMZW5ndGggPSBhbHBoYWJldEluZGV4TWFwLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFscGhhYmV0SW5kZXhNYXBbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFscGhhYmV0SW5kZXhNYXBbaV0gPSAtMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXR1cmFsQ29tcGFyZTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJicmVha3BvaW50c1wiIDoge1xuICAgIFwieHNcIjogXCI0ODBweFwiLFxuICAgIFwic21cIjogXCI2MjBweFwiLFxuICAgIFwibWRcIjogXCI3NjBweFwiLFxuICAgIFwibGdcIjogXCI5OTBweFwiLFxuICAgIFwieGxcIjogXCIxMzgwcHhcIlxuICB9XG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS1kaXNtaXNzXScsXG4gICAgdGFyZ2V0OiAnW2RhdGEtZGlzbWlzc2libGVdJyxcbiAgICBjbGFzc1RvZ2dsZTogJ2Rpc21pc3MnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0cmlnZ2VyLmNsb3Nlc3Qoc2V0dGluZ3MudGFyZ2V0KVxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NUb2dnbGUpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIERyYXdlciBwbHVnaW5cbiAqIC0tLVxuICogVGhlIGRyYXdlciBjb21wb25lbnQgaXMgdXNlZCB0byBjcmVhdGUgaGlkZGVuIGJ1dCB0b2dnbGUtYWJsZSBjb250ZW50IGZvciBhblxuICogYXBwbGljYXRpb24uIFRoaXMgaXMgdHlwaWNhbGx5IHVzZWQgZm9yIGEgbG9uZyBmb3JtIG5haXZhdGlvbiBsaXN0LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBjbGFzc1RyaWdnZXI6ICdkcmF3ZXJfX3RyaWdnZXInLFxuICAgIGNsYXNzRHJhd2VyOiAnZHJhd2VyJyxcbiAgICBjbGFzc0RpYWxvZzogJ2RyYXdlcl9fZGlhbG9nJyxcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgc3dpdGNoOiAnW2RhdGEtZHJhd2VyLXN3aXRjaF0nLFxuICAgIHN3aXRjaEJyZWFrcG9pbnQ6ICcxMjAwcHgnLFxuICAgIHNhdmVTdGF0ZTogdHJ1ZVxuICB9XG5cbiAgbGV0IGRyYXdlcnNcbiAgbGV0IGRyYXdlcl9zdGF0ZSA9IHt9XG4gIGxldCBtb2RhbERyYXdlcnNcbiAgbGV0IGJwXG4gIGxldCBtcVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcblxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcblxuICAgIC8vIEdldCBhbGwgdGhlIGRyYXdlcnMgb24gdGhlIHBhZ2VcbiAgICBkcmF3ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRyYXdlcicpXG5cbiAgICAvLyBJbml0IHNhdmUgc3RhdGUgaWYgaXQncyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgaW5pdFNhdmVTdGF0ZSgpXG4gICAgfVxuXG4gICAgLy8gSW5pdCBtb2RhbCBzd2l0Y2ggaWYgaXQncyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnN3aXRjaCkge1xuICAgICAgaW5pdFN3aXRjaCgpXG4gICAgfVxuXG4gICAgLy8gQWRkIG91ciBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcblxuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRyYXdlcnMgPSBudWxsXG5cbiAgICAvLyBDaGVjayBpZiBzYXZlIHN0YXRlIGlzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBkcmF3ZXJfc3RhdGUgPSB7fVxuICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RyYXdlcl9zdGF0ZScpXG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgbW9kYWwgc3dpdGNoIGlzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc3dpdGNoKSB7XG4gICAgICBtb2RhbERyYXdlcnMgPSBudWxsXG4gICAgICBicCA9IG51bGxcbiAgICAgIG1xID0gbnVsbFxuICAgIH1cblxuICAgIC8vIFJlbW92ZSB0aGUgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBvcGVuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICB9XG5cbiAgYXBpLmNsb3NlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgY2xvc2UoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICBjb25zdCBvcGVuID0gKHRhcmdldCwgY2FsbGJhY2spID0+IHtcbiAgICB1LmFkZENsYXNzKHRhcmdldCwgJ2lzLWFjdGl2ZScpXG4gICAgaWYgKCF0YXJnZXQuZm9yRWFjaCkge1xuICAgICAgdGFyZ2V0ID0gdS50b0FycmF5KHRhcmdldClcbiAgICB9XG4gICAgdGFyZ2V0LmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgICBkcmF3ZXJfc3RhdGVbdGFyZ2V0LmlkXSA9IHUuaGFzQ2xhc3ModGFyZ2V0LCAnaXMtYWN0aXZlJylcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RyYXdlcl9zdGF0ZScsIEpTT04uc3RyaW5naWZ5KGRyYXdlcl9zdGF0ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICAvLyBGaXJlIHRoZSBjYWxsYmFjayBpZiBvbmUgd2FzIHBhc3NlZFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjaygpXG4gIH1cblxuICBjb25zdCBjbG9zZSA9ICh0YXJnZXQsIGNhbGxiYWNrKSA9PiB7XG4gICAgdS5yZW1vdmVDbGFzcyh0YXJnZXQsICdpcy1hY3RpdmUnKVxuICAgIGlmICghdGFyZ2V0LmZvckVhY2gpIHtcbiAgICAgIHRhcmdldCA9IHUudG9BcnJheSh0YXJnZXQpXG4gICAgfVxuICAgIHRhcmdldC5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgICAgZHJhd2VyX3N0YXRlW3RhcmdldC5pZF0gPSB1Lmhhc0NsYXNzKHRhcmdldCwgJ2lzLWFjdGl2ZScpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcmF3ZXJfc3RhdGUnLCBKU09OLnN0cmluZ2lmeShkcmF3ZXJfc3RhdGUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgLy8gRmlyZSB0aGUgY2FsbGJhY2sgaWYgb25lIHdhcyBwYXNzZWRcbiAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2soKVxuICB9XG5cbiAgY29uc3QgZGVidWcgPSAoZXZlbnQsIGVsZW1lbnQpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgJHtldmVudH06IGAgLCBlbGVtZW50KVxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkcmF3ZXJfc3RhdGU6ICcsIGRyYXdlcl9zdGF0ZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCB0cmlnZ2VyID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5kcmF3ZXJfX3RyaWdnZXInKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBsZXQgZGF0YURyYXdlciA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcbiAgICAgIGlmIChkYXRhRHJhd2VyKSB7XG4gICAgICAgIGxldCBkcmF3ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGRhdGFEcmF3ZXIpXG4gICAgICAgIGlmIChkcmF3ZXIpIHtcbiAgICAgICAgICBpZiAodS5oYXNDbGFzcyhkcmF3ZXIsICdpcy1hY3RpdmUnKSkge1xuICAgICAgICAgICAgY2xvc2UoZHJhd2VyKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcGVuKGRyYXdlcilcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBpbml0U2F2ZVN0YXRlID0gKCkgPT4ge1xuXG4gICAgLy8gSW5pdDogU2V0dXAgb3VyIHZhcmlhYmxlc1xuICAgIC8vIEdldCB0aGUgZHJhd2VyIHN0YXRlIGZyb20gbG9jYWwgc3RvcmFnZVxuICAgIC8vIENoZWNrIGlmIGRyYXdlciBzdGF0ZSB3YXMgc2F2ZWQgb3RoZXJ3aXNlIGluaXQgYSBuZXcgb2JqZWN0XG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcmF3ZXJfc3RhdGUnKSkge1xuICAgICAgZHJhd2VyX3N0YXRlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyX3N0YXRlJykpXG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGFsbCBkcmF3ZXJzIGFuZCBzYXZlL2luaXQgdGhlaXIgc3RhdGVcbiAgICBkcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuXG4gICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc3RhdGUgaWYgb25lIGlzIG5vdCBzZXRcbiAgICAgIGlmIChkcmF3ZXIuaWQgaW4gZHJhd2VyX3N0YXRlID09PSBmYWxzZSkge1xuICAgICAgICBkcmF3ZXJfc3RhdGVbZHJhd2VyLmlkXSA9IHUuaGFzQ2xhc3MoZHJhd2VyLCAnaXMtYWN0aXZlJylcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IG91ciBkcmF3ZXIgZGlhbG9nIGVsZW1lbnRcbiAgICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRyYXdlcl9fZGlhbG9nJylcblxuICAgICAgLy8gQWRkIGEgbm8tdHJhbnNpdGlvbiBjbGFzcyBhbmQgcmVtb3ZlIGl0IHdpdGhpbiBhIHRyYW5zaXRpb24gZHVyYXRpb25cbiAgICAgIHUuYWRkQ2xhc3MoZGlhbG9nLCAnbm8tdHJhbnNpdGlvbicpXG4gICAgICBsZXQgcmV2ZXJ0ID0gKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdS5yZW1vdmVDbGFzcyhkaWFsb2csICduby10cmFuc2l0aW9uJylcbiAgICAgICAgICB9LCA1MDBcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICAvLyBUb2dnbGUgb3VyIGRyYXdlciBzdGF0ZSBiYXNlZCBvbiB0aGUgc2F2ZWQgc3RhdGVcbiAgICAgIGlmIChkcmF3ZXJfc3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgY2xvc2UoZHJhd2VyLCByZXZlcnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcGVuKGRyYXdlciwgcmV2ZXJ0KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBpbml0U3dpdGNoID0gKCkgPT4ge1xuICAgIG1vZGFsRHJhd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3Muc3dpdGNoKVxuICAgIG1vZGFsRHJhd2Vycy5mb3JFYWNoKChkcmF3ZXIpID0+IHtcbiAgICAgIC8vIEdldCB0aGUgbG9jYWwgYnJlYWtwb2ludCBpZiBvbmUgaXMgc2V0XG4gICAgICAvLyBSZW1vdmUgYnJhY2tldHMgYW5kIHRoZSBpbnRpYWwgZGF0YSBmbGFnXG4gICAgICBsZXQgY2xlYW4gPSBzZXR0aW5ncy5zd2l0Y2hcbiAgICAgICAgLnJlcGxhY2UoJ1snLCAnJylcbiAgICAgICAgLnJlcGxhY2UoJ10nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoJ2RhdGEtJywgJycpXG5cbiAgICAgIC8vIENvbnZlcnQgc3JpbmcgdG8gY2FtZWxDYXNlXG4gICAgICBjbGVhbiA9IGNsZWFuLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uIChnKSB7XG4gICAgICAgIHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIENoZWNrIHdoaWNoIGJyZWFrcG9pbnQgdG8gdXNlOlxuICAgICAgLy8gYSkgVGhlIGxvY2FsIGJwIHNldCBvbiB0aGUgZHJhd2VyXG4gICAgICAvLyBiKSBUaGUgYnAgYXZhaWxhYmxlIGluIGNvbmZpZyB1c2luZyBhIGtleVxuICAgICAgLy8gYykgVGhlIHJhdyBwaXhlbCB2YWx1ZSBwcm92aWRlZCBpbiBzZXR0aW5nc1xuICAgICAgYnAgPSBkcmF3ZXIuZGF0YXNldFtjbGVhbl1cbiAgICAgIGlmIChicCkge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChicClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5dXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJwID0gc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludFxuICAgICAgfVxuXG4gICAgICAvLyBNZWRpYSBxdWVyeSBsaXN0ZW5lclxuICAgICAgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYSggXCIobWluLXdpZHRoOlwiICsgYnAgKyBcIilcIiApXG4gICAgICBtcS5hZGRMaXN0ZW5lcigobXEpID0+IHtcbiAgICAgICAgc3dpdGNoQ2hlY2sobXEsIGRyYXdlcilcbiAgICAgIH0pXG4gICAgICBzd2l0Y2hDaGVjayhtcSwgZHJhd2VyKVxuICAgIH0pXG4gIH1cblxuICBjb25zdCBzd2l0Y2hDaGVjayA9IChtcSwgZHJhd2VyKSA9PiB7XG4gICAgaWYgKG1xLm1hdGNoZXMpIHtcbiAgICAgIHN3aXRjaERyYXdlcihkcmF3ZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaE1vZGFsKGRyYXdlcilcbiAgICB9XG4gIH1cblxuICBjb25zdCBzd2l0Y2hEcmF3ZXIgPSAoZHJhd2VyKSA9PiB7XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuICAgIGxldCByZWdleCA9IC9tb2RhbC9naVxuXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgJ2RyYXdlcicpXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgJ2RyYXdlcicpXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKHJlZ2V4LCAnZHJhd2VyJylcbiAgICB9KVxuXG4gICAgLy8gT3BlbiBvciBjbG9zZSBkcmF3ZXIgYmFzZWQgb24gc2F2ZSBzdGF0ZVxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGlmIChkcmF3ZXJfc3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgY2xvc2UoZHJhd2VyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BlbihkcmF3ZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3dpdGNoTW9kYWwgPSAoZHJhd2VyKSA9PiB7XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuICAgIGxldCByZWdleCA9IC9kcmF3ZXIvZ2lcblxuICAgIGRyYXdlci5jbGFzc05hbWUgPSBkcmF3ZXIuY2xhc3NOYW1lLnJlcGxhY2UocmVnZXgsICdtb2RhbCcpXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShyZWdleCwgJ21vZGFsJylcbiAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICB0cmlnZ2VyLmNsYXNzTmFtZSA9IHRyaWdnZXIuY2xhc3NOYW1lLnJlcGxhY2UocmVnZXgsICdtb2RhbCcpXG4gICAgfSlcblxuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZm9yIG1vZGFsIHN0eWxlcyBieSBkZWZhdWx0XG4gICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsICdpcy1hY3RpdmUnKVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBjbGFzc1RyaWdnZXI6ICdtb2RhbF9fdHJpZ2dlcicsXG4gICAgY2xhc3NNb2RhbDogJ21vZGFsJyxcbiAgICBjbGFzc0RpYWxvZzogJ21vZGFsX19kaWFsb2cnLFxuICAgIGNsYXNzQWN0aXZlOiAnaXMtYWN0aXZlJyxcbiAgICBmb2N1czogJ1tkYXRhLWZvY3VzXSdcbiAgfVxuXG4gIGxldCBtZW1vcnlUcmlnZ2VyXG4gIGxldCBtZW1vcnlUYXJnZXRcblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICBhcGkuY2xvc2UgPSAoY2xlYXIpID0+IHtcbiAgICBjbG9zZShjbGVhcilcbiAgfVxuXG4gIGNvbnN0IG9wZW4gPSAodGFyZ2V0KSA9PiB7XG4gICAgdS5hZGRDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmICh0YXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQuaXRlbSgwKVxuICAgICAgbGV0IGZvY3VzID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuZm9jdXMpXG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgICAgZm9jdXMuZm9jdXMoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldC5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xvc2UgPSAoY2xlYXIgPSBmYWxzZSkgPT4ge1xuICAgIGxldCBtb2RhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzTW9kYWwpXG4gICAgdS5yZW1vdmVDbGFzcyhtb2RhbHMsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmIChjbGVhciA9PSBmYWxzZSAmJiBtZW1vcnlUcmlnZ2VyICYmIG1lbW9yeVRhcmdldCkge1xuICAgICAgaWYgKG1lbW9yeVRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbWVtb3J5VGFyZ2V0Lml0ZW0oMClcbiAgICAgICAgbWVtb3J5VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgICAgaWYgKG1lbW9yeVRyaWdnZXIpIHtcbiAgICAgICAgICAgIG1lbW9yeVRyaWdnZXIuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2xlYXIgPT0gdHJ1ZSkge1xuICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBjb25zdCBlc2NhcGUgPSAoKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG4gICAgbGV0IG1vZGFsID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NNb2RhbClcbiAgICBsZXQgZGlhbG9nID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NEaWFsb2cpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICAgIGxldCBkYXRhTW9kYWwgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG4gICAgICBpZiAoZGF0YU1vZGFsKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZGF0YU1vZGFsKVxuICAgICAgICBtZW1vcnlUcmlnZ2VyID0gdHJpZ2dlclxuICAgICAgICBvcGVuKG1lbW9yeVRhcmdldClcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9IGVsc2UgaWYgKG1vZGFsICYmICFkaWFsb2cpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS10b2dnbGUtY2xhc3NdJyxcbiAgICB0YXJnZXRzOiAnJyxcbiAgICBjbGFzczogJydcbiAgfVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuXG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgbGV0IHRhcmdldHNcblxuICAgICAgaWYgKHNldHRpbmdzLnRhcmdldHMpIHtcbiAgICAgICAgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3MudGFyZ2V0cylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRyaWdnZXIuZGF0YXNldC50b2dnbGVUYXJnZXQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCkge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5jbGFzcykge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgc2V0dGluZ3MuY2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0cmlnZ2VyLCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnXG5cbi8qKlxuICogVXRpbGl0eVxuICogLS0tXG4gKiBBIHNldCBvZiBoZWxwZXIgbWV0aG9kcyBmb3IgZ2VuZXJhbCBqYXZhc2NyaXB0IHBsdWdpbiB1c2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAvKipcbiAgICogR2V0IGFuZCBvdXRwdXQgYSBicmVha3BvaW50IHVzaW5nIGl0J3Mga2V5IGZvdW5kIGluIGNvbmZpZy5qc29uXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gVGhlIGtleSB0byBzZWFyY2ggZm9yIGluIHRoZSBicmVha3BvaW50cyBvYmplY3RcbiAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHBpeGVsIHZhbHVlIG9mIHRoZSBicmVha3BvaW50IGFzIGEgc3RyaW5nXG4gICAqL1xuICBzdGF0aWMgZ2V0QnJlYWtwb2ludChrZXkpIHtcbiAgICByZXR1cm4gY29uZmlnLmJyZWFrcG9pbnRzW2tleV1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB8fCB7Tm9kZWxpc3R9IEVsZW1lbnQocykgdG8gY2hlY2sgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGNsYXNzIGV4aXN0cyBvbiBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICByZXR1cm4gYy5zb21lKCBmdW5jdGlvbiAoYykge1xuICAgICAgbGV0IGhhcyA9IGZhbHNlXG4gICAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGMpKSB7XG4gICAgICAgICAgaGFzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGhhc1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIG9yIGNsYXNzZXMgdG8gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gRWxlbWVudChzKSB0byBhZGQgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBhZGRcbiAgICovXG4gIHN0YXRpYyBhZGRDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBvciBjbGFzc2VzIGZyb20gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gRWxlbWVudChzKSB0byByZW1vdmUgY2xhc3MoZXMpIGZyb21cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIHJlbW92ZVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZUNsYXNzKGVsLCBjKSB7XG4gICAgaWYgKCFlbC5mb3JFYWNoKSB7XG4gICAgICBlbCA9IHRoaXMudG9BcnJheShlbClcbiAgICB9XG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IHx8IHtOb2RlbGlzdH0gRWxlbWVudChzKSB0byB0b2dnbGUgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyhlbCwgYykge1xuICAgIGlmICghZWwuZm9yRWFjaCkge1xuICAgICAgZWwgPSB0aGlzLnRvQXJyYXkoZWwpXG4gICAgfVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IGJhc2VkIG9uIGNsYXNzLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgKiBuYXRpdmUgLmNsb3Nlc3QoKSBtZXRob2QgaW4gdGhhdCBpdCBkb2Vzbid0IGNoZWNrIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gRWxlbWVudCB0byBzdGFydCBzZWFyY2ggb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGNoZWNrIGZvclxuICAgKiBAcmV0dXJuIHtFbGVtZW50fSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdChlbCwgYykge1xuICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSAmJiAhdGhpcy5oYXNDbGFzcyhlbCwgYykpXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBzdHJpbmcgb3Igb2JqZWN0IHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3NcbiAgICogcmV0dXJuZWQgYXMgaXMuIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge09iamVjdH0gU3RyaW5nIG9yIG9iamVjdCB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm4gdGhlIGNvbnZlcnRlZCBhcnJheVxuICAgKi9cbiAgc3RhdGljIHRvQXJyYXkoaXRlbSkge1xuXG4gICAgbGV0IGFycmF5ID0gW11cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBhcnJheSA9IGl0ZW1cbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkucHVzaChpdGVtKVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LiBTZXQgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIHRvIGB0cnVlYCBmb3IgYSBkZWVwIG9yIHJlY3Vyc2l2ZSBtZXJnZS5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW09wdGlvbmFsXSBJZiB0cnVlLCBkbyBhIGRlZXAgKG9yIHJlY3Vyc2l2ZSkgbWVyZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IFRoZSBvYmplY3RzIHRvIG1lcmdlIHRvZ2V0aGVyOyBlYWNoIG92ZXJyaWRpbmcgdGhlIG5leHRcbiAgICogQHJldHVybnMge09iamVjdH0gTWVyZ2VkIHZhbHVlcyBvZiBkZWZhdWx0cyBhbmQgb3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgIGxldCBleHRlbmRlZCA9IHt9XG4gICAgbGV0IGRlZXAgPSBmYWxzZVxuICAgIGxldCBpID0gMFxuICAgIGxldCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG5cbiAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcbiAgICAgIGRlZXAgPSBhcmd1bWVudHNbMF1cbiAgICAgIGkrK1xuICAgIH1cblxuICAgIGxldCBtZXJnZSA9ICggb2JqICkgPT4ge1xuICAgICAgZm9yICggbGV0IHByb3AgaW4gb2JqICkge1xuICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqLCBwcm9wICkgKSB7XG4gICAgICAgICAgaWYgKCBkZWVwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbcHJvcF0pID09PSAnW29iamVjdCBPYmplY3RdJyApIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgIGxldCBvYmogPSBhcmd1bWVudHNbaV1cbiAgICAgIG1lcmdlKG9iailcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kZWRcbiAgfVxuXG59XG4iXX0=

//# sourceMappingURL=scripts.js.map
