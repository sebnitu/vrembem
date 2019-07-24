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
  var trigger = event.target; // Run the script if it exists as a data attribute

  if (trigger.dataset.script) {
    // Get our script string for processing
    var string = trigger.dataset.script; // console.log('Run: ', string)
    // Get indexes of string

    var indexObject = string.indexOf('.');
    var indexMethod = string.indexOf('(');
    var indexParamStart = string.indexOf('\'');
    var indexParamEnd = string.indexOf('\'', indexParamStart + 1); // Get the object, method and if params are passed

    var obj = string.substring(0, indexObject);
    var method = string.substring(indexObject + 1, indexMethod);
    var params = string.substring(indexParamStart + 1, indexParamEnd); // console.log('Obj: ', obj)
    // console.log('Method: ', method)
    // console.log('Params: ', params)
    // Run our data script

    if (obj === 'drawer') {
      drawer[method](params);
    }
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
    notice_empty_text.innerHTML = value;
    localStorage.setItem('searchValue', value); // Show clear search button if a value there is something in search

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
  }, false); // Restore our local storage value

  if (localStorage.getItem('searchValue')) {
    search.value = localStorage.getItem('searchValue');
    list.search(search.value);
  }
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
  'use strict';

  var api = {};
  var settings;
  var defaults = {
    // Component element classes
    classTarget: 'drawer__item',
    classTrigger: 'drawer__trigger',
    classInner: 'drawer__dialog',
    // Component element switch classes
    // Used with RegExp to search and replace element classes
    classTargetSwitch: 'modal',
    classTriggerSwitch: 'modal__trigger',
    classInnerSwitch: 'modal__dialog',
    // State and utility classes
    classActive: 'is-active',
    classTransitionNone: 'transition_none',
    // Whether or not to store the save state in local storage
    // {boolean} The string to save our state object as
    saveState: true,
    // Whether or not to enable the switch functionality. If enabled, a string
    // selector to check for should be passed.
    // {false} || {string} e.g. '[data-drawer-switch]'
    "switch": '[data-drawer-switch]',
    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',
    // Duration before removing the transition_none class on initial load
    transitionDuration: 500 // Where we store all our drawers available in the DOM

  };
  var drawers = []; // Where we build the save state object before we pass it to local storage

  var drawerState = {}; // Where we store all our switch drawers available in the DOM

  var switchDrawers; // Where we store all our media query lists along with their drawers

  var mqlArray = [];
  /**
   * The constructor method, run as soon as an instance is created
   * ---
   * @param {Object} options - A json object with your custom settings
   */

  api.init = function (options) {
    // Merge the defaults and passed options into our settings obj
    settings = _utility["default"].extend(defaults, options || {}); // Get all the drawers on the page and save them with their default state

    document.querySelectorAll('.' + settings.classTarget).forEach(function (drawer) {
      drawers.push({
        'drawer': drawer,
        'defaultState': _utility["default"].hasClass(drawer, settings.classActive)
      });
    }); // Initialize a promise and init save state if it's enabled

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
   * The deconstructor method, used to reset and destroy the drawer instance
   * ---
   * @param {Boolean} defaultState - Return drawers to their default state?
   */


  api.destroy = function () {
    var defaultState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    // Destroy our switch
    destroySwitch(); // Destroy our state

    stateClear(); // Return drawrs to their default state

    if (defaultState) {
      drawers.forEach(function (item) {
        if (item.defaultState) {
          _utility["default"].addClass(item.drawer, settings.classActive);
        } else {
          _utility["default"].removeClass(item.drawer, settings.classActive);
        }
      });
    } // Clear our variables


    settings = null;
    drawers = []; // Remove the drawer trigger event listener

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
   * Public method to switch a modal into drawer
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.switchToDrawer = function (selector) {
    // Use default selector if one isn't passed
    selector = selector ? selector : settings["switch"]; // Query our elements using the provided selector

    var items = document.querySelectorAll(selector); // Convert to array if only one drawer is passed

    items = items.forEach ? items : _utility["default"].toArray(items);
    items.forEach(function (item) {
      switchToDrawer(item);
    });
  };
  /**
   * Public method to switch a drawer into modal
   * ---
   * @param {String} selector - A valid CSS selector
   */


  api.switchToModal = function (selector) {
    // Use default selector if one isn't passed
    selector = selector ? selector : settings["switch"]; // Query our elements using the provided selector

    var items = document.querySelectorAll(selector); // Convert to array if only one drawer is passed

    items = items.forEach ? items : _utility["default"].toArray(items);
    items.forEach(function (item) {
      switchToModal(item);
    });
  };
  /**
   * Save the drawer current drawer state
   */


  api.stateSave = function () {
    stateSave();
  };
  /**
   * Clears drawer state from local storage
   */


  api.stateClear = function () {
    stateClear();
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
    } // Save state if feature is enabled


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


    drawers.forEach(function (item) {
      var drawer = item.drawer; // Set the default state if one is not set

      if (drawer.id in drawerState === false) {
        stateSave(drawer);
      } // Get our drawer dialog element


      var dialog = drawer.querySelector('.' + settings.classInner); // Disables transitions as default states are being set

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
      if (item.drawer) {
        item = item.drawer;
      } // Only save drawer state if an id exists


      if (item.id) {
        drawerState[item.id] = _utility["default"].hasClass(item, settings.classActive);
        localStorage.setItem('drawerState', JSON.stringify(drawerState));
      }
    });
  };
  /**
   * Private function that clears the drawer state
   */


  var stateClear = function stateClear() {
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


      var mql = window.matchMedia("(min-width:" + bp + ")"); // Switch to modal if media doesn't match (< bp)

      if (!mql.matches) {
        switchToModal(drawer);
      } // Add our media query listener


      mql.addListener(switchCheck); // Push the mql to our array along with it's drawer

      mqlArray.push({
        'drawer': drawer,
        'mql': mql
      });
    });
  };
  /**
   * Private function that destroys the switch functionality
   */


  var destroySwitch = function destroySwitch() {
    // Switch all modals back to their original drawer state
    switchDrawers.forEach(function (drawer) {
      switchToDrawer(drawer);
    }); // Remove the media query listeners

    mqlArray.forEach(function (item) {
      item.mql.removeListener(switchCheck);
    }); // Return switch variables to their original state

    switchDrawers = null;
    mqlArray = [];
  };
  /**
   * Private function that checks when a media query hits a match and switches
   * the component from drawer to modal as needed
   * ---
   * @param {MediaQueryList} mql - The MediaQueryList object for the media query
   * @param {Node} drawer - The drawer element to switch
   */


  var switchCheck = function switchCheck() {
    mqlArray.forEach(function (item) {
      if (item.mql.matches) {
        switchToDrawer(item.drawer);
      } else {
        switchToModal(item.drawer);
      }
    });
  };
  /**
   * Private function that switches a modal into a drawer component
   * ---
   * @param {Node} drawer - The element to switch
   */


  var switchToDrawer = function switchToDrawer(drawer) {
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


  var switchToModal = function switchToModal(drawer) {
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
   * Initialize our component and return the api
   */


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9jb25maWcuanNvbiIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9kcmF3ZXIuanMiLCIuLi9zcmMvanMvbW9kYWwuanMiLCIuLi9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vc3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBSixFQUFwQjtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUNBLElBQU0sS0FBSyxHQUFHLElBQUksaUJBQUosRUFBZDtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUVBOzs7O0FBSUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQVc7QUFFNUM7QUFDQSxNQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBcEIsQ0FINEMsQ0FLNUM7O0FBQ0EsTUFBSSxPQUFPLENBQUMsT0FBUixDQUFnQixNQUFwQixFQUE0QjtBQUMxQjtBQUNBLFFBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFSLENBQWdCLE1BQTdCLENBRjBCLENBSTFCO0FBRUE7O0FBQ0EsUUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxHQUFmLENBQWxCO0FBQ0EsUUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxHQUFmLENBQWxCO0FBQ0EsUUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFmLENBQXRCO0FBQ0EsUUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFmLEVBQXFCLGVBQWUsR0FBRyxDQUF2QyxDQUFwQixDQVYwQixDQVkxQjs7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QUNBLFVBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUF2Qjs7QUFFQSxVQUFLLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQWdDLFNBQVMsQ0FBQyxDQUFELENBQXpDLE1BQW1ELGtCQUF4RCxFQUE2RTtBQUMzRSxRQUFBLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBRCxDQUFoQjtBQUNBLFFBQUEsQ0FBQztBQUNGOztBQUVELFVBQUksS0FBSyxHQUFHLFNBQVIsS0FBUSxDQUFFLEdBQUYsRUFBVztBQUNyQixhQUFNLElBQUksSUFBVixJQUFrQixHQUFsQixFQUF3QjtBQUN0QixjQUFLLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGNBQWpCLENBQWdDLElBQWhDLENBQXNDLEdBQXRDLEVBQTJDLElBQTNDLENBQUwsRUFBeUQ7QUFDdkQsZ0JBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLEdBQUcsQ0FBQyxJQUFELENBQWxDLE1BQThDLGlCQUEzRCxFQUErRTtBQUM3RSxjQUFBLFFBQVEsQ0FBQyxJQUFELENBQVIsR0FBaUIsTUFBTSxDQUFFLElBQUYsRUFBUSxRQUFRLENBQUMsSUFBRCxDQUFoQixFQUF3QixHQUFHLENBQUMsSUFBRCxDQUEzQixDQUF2QjtBQUNELGFBRkQsTUFFTztBQUNMLGNBQUEsUUFBUSxDQUFDLElBQUQsQ0FBUixHQUFpQixHQUFHLENBQUMsSUFBRCxDQUFwQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BVkQ7O0FBWUEsYUFBUSxDQUFDLEdBQUcsTUFBWixFQUFvQixDQUFDLEVBQXJCLEVBQTBCO0FBQ3hCLFlBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFELENBQW5CO0FBQ0EsUUFBQSxLQUFLLENBQUMsR0FBRCxDQUFMO0FBQ0Q7O0FBRUQsYUFBTyxRQUFQO0FBQ0QsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB1IGZyb20gJ3V0aWxpdHknXG5pbXBvcnQgRGlzbWlzc2libGUgZnJvbSAnZGlzbWlzc2libGUnXG5pbXBvcnQgRHJhd2VyIGZyb20gJ2RyYXdlcidcbmltcG9ydCBNb2RhbCBmcm9tICdtb2RhbCdcbmltcG9ydCBUb2dnbGUgZnJvbSAndG9nZ2xlJ1xuaW1wb3J0IGxpc3RqcyBmcm9tICdsaXN0LmpzJ1xuXG5jb25zdCBkaXNtaXNzaWJsZSA9IG5ldyBEaXNtaXNzaWJsZSgpXG5jb25zdCBkcmF3ZXIgPSBuZXcgRHJhd2VyKClcbmNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKClcbmNvbnN0IHRvZ2dsZSA9IG5ldyBUb2dnbGUoKVxuXG4vKipcbiAqIEdlbmVyYWwgZXZlbnQgdHJpZ2dlciBmb3IgdGVzdGluZ1xuICovXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgLy8gR2V0IHRoZSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBldmVudFxuICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldFxuXG4gIC8vIFJ1biB0aGUgc2NyaXB0IGlmIGl0IGV4aXN0cyBhcyBhIGRhdGEgYXR0cmlidXRlXG4gIGlmICh0cmlnZ2VyLmRhdGFzZXQuc2NyaXB0KSB7XG4gICAgLy8gR2V0IG91ciBzY3JpcHQgc3RyaW5nIGZvciBwcm9jZXNzaW5nXG4gICAgbGV0IHN0cmluZyA9IHRyaWdnZXIuZGF0YXNldC5zY3JpcHRcblxuICAgIC8vIGNvbnNvbGUubG9nKCdSdW46ICcsIHN0cmluZylcblxuICAgIC8vIEdldCBpbmRleGVzIG9mIHN0cmluZ1xuICAgIGxldCBpbmRleE9iamVjdCA9IHN0cmluZy5pbmRleE9mKCcuJylcbiAgICBsZXQgaW5kZXhNZXRob2QgPSBzdHJpbmcuaW5kZXhPZignKCcpXG4gICAgbGV0IGluZGV4UGFyYW1TdGFydCA9IHN0cmluZy5pbmRleE9mKCdcXCcnKVxuICAgIGxldCBpbmRleFBhcmFtRW5kID0gc3RyaW5nLmluZGV4T2YoJ1xcJycsIGluZGV4UGFyYW1TdGFydCArIDEpXG5cbiAgICAvLyBHZXQgdGhlIG9iamVjdCwgbWV0aG9kIGFuZCBpZiBwYXJhbXMgYXJlIHBhc3NlZFxuICAgIGxldCBvYmogPSBzdHJpbmcuc3Vic3RyaW5nKDAsIGluZGV4T2JqZWN0KVxuICAgIGxldCBtZXRob2QgPSBzdHJpbmcuc3Vic3RyaW5nKGluZGV4T2JqZWN0ICsgMSwgaW5kZXhNZXRob2QpXG4gICAgbGV0IHBhcmFtcyA9IHN0cmluZy5zdWJzdHJpbmcoaW5kZXhQYXJhbVN0YXJ0ICsgMSwgaW5kZXhQYXJhbUVuZClcblxuICAgIC8vIGNvbnNvbGUubG9nKCdPYmo6ICcsIG9iailcbiAgICAvLyBjb25zb2xlLmxvZygnTWV0aG9kOiAnLCBtZXRob2QpXG4gICAgLy8gY29uc29sZS5sb2coJ1BhcmFtczogJywgcGFyYW1zKVxuXG4gICAgLy8gUnVuIG91ciBkYXRhIHNjcmlwdFxuICAgIGlmIChvYmogPT09ICdkcmF3ZXInKSB7XG4gICAgICBkcmF3ZXJbbWV0aG9kXShwYXJhbXMpXG4gICAgfVxuICB9XG5cbn0pXG5cbi8qKlxuICogTGlzdC5qc1xuICogLS0tXG4gKiBBZGRzIGxpc3QgZnVuY3Rpb25hbGl0eSBhbG9uZyB3aXRoIHNlYXJjaC5cbiAqIGxpc3QuanMgZG9jczogaHR0cDovL2xpc3Rqcy5jb20vXG4gKi9cbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdGpzJykpIHtcblxuICAvLyBJbml0IG91ciBsaXN0LmpzIGNvbXBvbmVudFxuICBjb25zdCBsaXN0ID0gbmV3IGxpc3RqcygnbGlzdGpzJywge1xuICAgIGZ1enp5U2VhcmNoOiB7XG4gICAgICBzZWFyY2hDbGFzczogJ3NlYXJjaCcsXG4gICAgICBsb2NhdGlvbjogMCxcbiAgICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgICB0aHJlc2hvbGQ6IDAuNCxcbiAgICAgIG11bHRpU2VhcmNoOiB0cnVlXG4gICAgfSxcbiAgICB2YWx1ZU5hbWVzOiBbXG4gICAgICAnbmFtZScsXG4gICAgICB7IGRhdGE6IFsnY2F0ZWdvcnknXSB9XG4gICAgXSxcbiAgICBsaXN0Q2xhc3M6ICdtZW51J1xuICB9KVxuXG4gIC8vIEVtcHR5IE5vdGljZVxuICAvLyBEaXNwbGF5ZWQgd2hlbiB0aGUgc2VhcmNoIHJldHVybnMgbm8gcmVzdWx0c1xuICBsZXQgbm90aWNlX2VtcHR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGljZV9lbXB0eScpXG4gIGxldCBub3RpY2VfZW1wdHlfdGV4dCA9IG5vdGljZV9lbXB0eS5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX3RleHQnKVxuXG4gIC8vIENsZWFyIHNlYXJjaCBidXR0b25cbiAgbGV0IGZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXInKVxuICBsZXQgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlciAuc2VhcmNoJylcbiAgbGV0IHNlYXJjaF9jbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIgLnNlYXJjaF9jbGVhcicpXG5cbiAgLy8gT24gc2VhcmNoIGNvbXBsZXRlIGNhbGxiYWNrXG4gIGxpc3Qub24oJ3NlYXJjaENvbXBsZXRlJywgKCkgPT4ge1xuXG4gICAgLy8gVXBkYXRlIHRoZSBzZWFyY2ggdGV4dCBpbiBlbXB0eSBub3RpY2VcbiAgICBsZXQgdmFsdWUgPSBzZWFyY2gudmFsdWVcbiAgICBub3RpY2VfZW1wdHlfdGV4dC5pbm5lckhUTUwgPSB2YWx1ZVxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzZWFyY2hWYWx1ZScsIHZhbHVlKVxuXG4gICAgLy8gU2hvdyBjbGVhciBzZWFyY2ggYnV0dG9uIGlmIGEgdmFsdWUgdGhlcmUgaXMgc29tZXRoaW5nIGluIHNlYXJjaFxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdS5hZGRDbGFzcyhmaWx0ZXIsICdpcy1hY3RpdmUnKVxuICAgICAgdS5hZGRDbGFzcyhzZWFyY2gsICdpcy1hY3RpdmUnKVxuICAgICAgdS5yZW1vdmVDbGFzcyhzZWFyY2hfY2xlYXIsICdkX25vbmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnJlbW92ZUNsYXNzKGZpbHRlciwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LnJlbW92ZUNsYXNzKHNlYXJjaCwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LmFkZENsYXNzKHNlYXJjaF9jbGVhciwgJ2Rfbm9uZScpXG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlIG5vdGljZSBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZiB2aXNpYmxlIGl0ZW1zXG4gICAgaWYgKGxpc3QudmlzaWJsZUl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHUuYWRkQ2xhc3Mobm90aWNlX2VtcHR5LCAnZF9ub25lJylcbiAgICB9IGVsc2Uge1xuICAgICAgdS5yZW1vdmVDbGFzcyhub3RpY2VfZW1wdHksICdkX25vbmUnKVxuICAgIH1cbiAgfSlcblxuICAvLyBDbGljayBldmVudHMgZm9yIGNhdGVnb3J5IGFuZCBjbGVhcnNcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXJfc2VhcmNoX2NsZWFyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zZWFyY2hfY2xlYXInKVxuICAgIGxldCB0cmlnZ2VyX3NlYXJjaF9jYXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmNhdGVnb3J5JylcblxuICAgIGlmICh0cmlnZ2VyX3NlYXJjaF9jbGVhcikge1xuICAgICAgc2VhcmNoLnZhbHVlID0gJydcbiAgICAgIGxpc3Quc2VhcmNoKClcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAodHJpZ2dlcl9zZWFyY2hfY2F0KSB7XG4gICAgICBzZWFyY2gudmFsdWUgPSB0cmlnZ2VyX3NlYXJjaF9jYXQuZGF0YXNldC5jYXRlZ29yeVxuICAgICAgbGlzdC5zZWFyY2goc2VhcmNoLnZhbHVlKVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICB9LCBmYWxzZSlcblxuICAvLyBSZXN0b3JlIG91ciBsb2NhbCBzdG9yYWdlIHZhbHVlXG4gIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2VhcmNoVmFsdWUnKSkge1xuICAgIHNlYXJjaC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZWFyY2hWYWx1ZScpXG4gICAgbGlzdC5zZWFyY2goc2VhcmNoLnZhbHVlKVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGFkZEFzeW5jID0gZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaywgaXRlbXMpIHtcbiAgICB2YXIgdmFsdWVzVG9BZGQgPSB2YWx1ZXMuc3BsaWNlKDAsIDUwKTtcbiAgICBpdGVtcyA9IGl0ZW1zIHx8IFtdO1xuICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KGxpc3QuYWRkKHZhbHVlc1RvQWRkKSk7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBhZGRBc3luYyh2YWx1ZXMsIGNhbGxiYWNrLCBpdGVtcyk7XG4gICAgICB9LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC51cGRhdGUoKTtcbiAgICAgIGNhbGxiYWNrKGl0ZW1zKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBhZGRBc3luYztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICAvLyBBZGQgaGFuZGxlcnNcbiAgbGlzdC5oYW5kbGVycy5maWx0ZXJTdGFydCA9IGxpc3QuaGFuZGxlcnMuZmlsdGVyU3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuZmlsdGVyQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLmZpbHRlckNvbXBsZXRlIHx8IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbihmaWx0ZXJGdW5jdGlvbikge1xuICAgIGxpc3QudHJpZ2dlcignZmlsdGVyU3RhcnQnKTtcbiAgICBsaXN0LmkgPSAxOyAvLyBSZXNldCBwYWdpbmdcbiAgICBsaXN0LnJlc2V0LmZpbHRlcigpO1xuICAgIGlmIChmaWx0ZXJGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaXN0LmZpbHRlcmVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QuZmlsdGVyZWQgPSB0cnVlO1xuICAgICAgdmFyIGlzID0gbGlzdC5pdGVtcztcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBpc1tpXTtcbiAgICAgICAgaWYgKGZpbHRlckZ1bmN0aW9uKGl0ZW0pKSB7XG4gICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdmaWx0ZXJDb21wbGV0ZScpO1xuICAgIHJldHVybiBsaXN0LnZpc2libGVJdGVtcztcbiAgfTtcbn07XG4iLCJcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyksXG4gIHRvU3RyaW5nID0gcmVxdWlyZSgnLi91dGlscy90by1zdHJpbmcnKSxcbiAgZ2V0QnlDbGFzcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWJ5LWNsYXNzJyksXG4gIGZ1enp5ID0gcmVxdWlyZSgnLi91dGlscy9mdXp6eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgbG9jYXRpb246IDAsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICB0aHJlc2hvbGQ6IDAuNCxcbiAgICBtdWx0aVNlYXJjaDogdHJ1ZSxcbiAgICBzZWFyY2hDbGFzczogJ2Z1enp5LXNlYXJjaCdcbiAgfSwgb3B0aW9ucyk7XG5cblxuXG4gIHZhciBmdXp6eVNlYXJjaCA9IHtcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgY29sdW1ucykge1xuICAgICAgLy8gU3Vic3RyYWN0IGFyZ3VtZW50cyBmcm9tIHRoZSBzZWFyY2hTdHJpbmcgb3IgcHV0IHNlYXJjaFN0cmluZyBhcyBvbmx5IGFyZ3VtZW50XG4gICAgICB2YXIgc2VhcmNoQXJndW1lbnRzID0gb3B0aW9ucy5tdWx0aVNlYXJjaCA/IHNlYXJjaFN0cmluZy5yZXBsYWNlKC8gKyQvLCAnJykuc3BsaXQoLyArLykgOiBbc2VhcmNoU3RyaW5nXTtcblxuICAgICAgZm9yICh2YXIgayA9IDAsIGtsID0gbGlzdC5pdGVtcy5sZW5ndGg7IGsgPCBrbDsgaysrKSB7XG4gICAgICAgIGZ1enp5U2VhcmNoLml0ZW0obGlzdC5pdGVtc1trXSwgY29sdW1ucywgc2VhcmNoQXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGNvbHVtbnMsIHNlYXJjaEFyZ3VtZW50cykge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWFyY2hBcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZvdW5kQXJndW1lbnQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gY29sdW1ucy5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgaWYgKGZ1enp5U2VhcmNoLnZhbHVlcyhpdGVtLnZhbHVlcygpLCBjb2x1bW5zW2pdLCBzZWFyY2hBcmd1bWVudHNbaV0pKSB7XG4gICAgICAgICAgICBmb3VuZEFyZ3VtZW50ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWZvdW5kQXJndW1lbnQpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpdGVtLmZvdW5kID0gZm91bmQ7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKHZhbHVlcywgdmFsdWUsIHNlYXJjaEFyZ3VtZW50KSB7XG4gICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgICB2YXIgdGV4dCA9IHRvU3RyaW5nKHZhbHVlc1t2YWx1ZV0pLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKGZ1enp5KHRleHQsIHNlYXJjaEFyZ3VtZW50LCBvcHRpb25zKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG5cbiAgZXZlbnRzLmJpbmQoZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIG9wdGlvbnMuc2VhcmNoQ2xhc3MpLCAna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDsgLy8gSUUgaGF2ZSBzcmNFbGVtZW50XG4gICAgbGlzdC5zZWFyY2godGFyZ2V0LnZhbHVlLCBmdXp6eVNlYXJjaC5zZWFyY2gpO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24oc3RyLCBjb2x1bW5zKSB7XG4gICAgbGlzdC5zZWFyY2goc3RyLCBjb2x1bW5zLCBmdXp6eVNlYXJjaC5zZWFyY2gpO1xuICB9O1xufTtcbiIsInZhciBuYXR1cmFsU29ydCA9IHJlcXVpcmUoJ3N0cmluZy1uYXR1cmFsLWNvbXBhcmUnKSxcbiAgZ2V0QnlDbGFzcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWJ5LWNsYXNzJyksXG4gIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyksXG4gIGluZGV4T2YgPSByZXF1aXJlKCcuL3V0aWxzL2luZGV4LW9mJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIHRvU3RyaW5nID0gcmVxdWlyZSgnLi91dGlscy90by1zdHJpbmcnKSxcbiAgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBnZXRBdHRyaWJ1dGUgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1hdHRyaWJ1dGUnKSxcbiAgdG9BcnJheSA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpZCwgb3B0aW9ucywgdmFsdWVzKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzLFxuICAgIGluaXQsXG4gICAgSXRlbSA9IHJlcXVpcmUoJy4vaXRlbScpKHNlbGYpLFxuICAgIGFkZEFzeW5jID0gcmVxdWlyZSgnLi9hZGQtYXN5bmMnKShzZWxmKSxcbiAgICBpbml0UGFnaW5hdGlvbiA9IHJlcXVpcmUoJy4vcGFnaW5hdGlvbicpKHNlbGYpO1xuXG4gIGluaXQgPSB7XG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5saXN0Q2xhc3MgICAgICA9IFwibGlzdFwiO1xuICAgICAgc2VsZi5zZWFyY2hDbGFzcyAgICA9IFwic2VhcmNoXCI7XG4gICAgICBzZWxmLnNvcnRDbGFzcyAgICAgID0gXCJzb3J0XCI7XG4gICAgICBzZWxmLnBhZ2UgICAgICAgICAgID0gMTAwMDA7XG4gICAgICBzZWxmLmkgICAgICAgICAgICAgID0gMTtcbiAgICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICAgIHNlbGYudmlzaWJsZUl0ZW1zICAgPSBbXTtcbiAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcyAgPSBbXTtcbiAgICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICAgIHNlbGYuZmlsdGVyZWQgICAgICAgPSBmYWxzZTtcbiAgICAgIHNlbGYuc2VhcmNoQ29sdW1ucyAgPSB1bmRlZmluZWQ7XG4gICAgICBzZWxmLmhhbmRsZXJzICAgICAgID0geyAndXBkYXRlZCc6IFtdIH07XG4gICAgICBzZWxmLnZhbHVlTmFtZXMgICAgID0gW107XG4gICAgICBzZWxmLnV0aWxzICAgICAgICAgID0ge1xuICAgICAgICBnZXRCeUNsYXNzOiBnZXRCeUNsYXNzLFxuICAgICAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICAgICAgaW5kZXhPZjogaW5kZXhPZixcbiAgICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICAgIHRvU3RyaW5nOiB0b1N0cmluZyxcbiAgICAgICAgbmF0dXJhbFNvcnQ6IG5hdHVyYWxTb3J0LFxuICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICBnZXRBdHRyaWJ1dGU6IGdldEF0dHJpYnV0ZSxcbiAgICAgICAgdG9BcnJheTogdG9BcnJheVxuICAgICAgfTtcblxuICAgICAgc2VsZi51dGlscy5leHRlbmQoc2VsZiwgb3B0aW9ucyk7XG5cbiAgICAgIHNlbGYubGlzdENvbnRhaW5lciA9ICh0eXBlb2YoaWQpID09PSAnc3RyaW5nJykgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgOiBpZDtcbiAgICAgIGlmICghc2VsZi5saXN0Q29udGFpbmVyKSB7IHJldHVybjsgfVxuICAgICAgc2VsZi5saXN0ICAgICAgID0gZ2V0QnlDbGFzcyhzZWxmLmxpc3RDb250YWluZXIsIHNlbGYubGlzdENsYXNzLCB0cnVlKTtcblxuICAgICAgc2VsZi5wYXJzZSAgICAgICAgPSByZXF1aXJlKCcuL3BhcnNlJykoc2VsZik7XG4gICAgICBzZWxmLnRlbXBsYXRlciAgICA9IHJlcXVpcmUoJy4vdGVtcGxhdGVyJykoc2VsZik7XG4gICAgICBzZWxmLnNlYXJjaCAgICAgICA9IHJlcXVpcmUoJy4vc2VhcmNoJykoc2VsZik7XG4gICAgICBzZWxmLmZpbHRlciAgICAgICA9IHJlcXVpcmUoJy4vZmlsdGVyJykoc2VsZik7XG4gICAgICBzZWxmLnNvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vc29ydCcpKHNlbGYpO1xuICAgICAgc2VsZi5mdXp6eVNlYXJjaCAgPSByZXF1aXJlKCcuL2Z1enp5LXNlYXJjaCcpKHNlbGYsIG9wdGlvbnMuZnV6enlTZWFyY2gpO1xuXG4gICAgICB0aGlzLmhhbmRsZXJzKCk7XG4gICAgICB0aGlzLml0ZW1zKCk7XG4gICAgICB0aGlzLnBhZ2luYXRpb24oKTtcblxuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9LFxuICAgIGhhbmRsZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGhhbmRsZXIgaW4gc2VsZi5oYW5kbGVycykge1xuICAgICAgICBpZiAoc2VsZltoYW5kbGVyXSkge1xuICAgICAgICAgIHNlbGYub24oaGFuZGxlciwgc2VsZltoYW5kbGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYucGFyc2Uoc2VsZi5saXN0KTtcbiAgICAgIGlmICh2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZWxmLmFkZCh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcGFnaW5hdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbiA9IFt7fV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvblswXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICBvcHRpb25zLnBhZ2luYXRpb24gPSBbb3B0aW9ucy5wYWdpbmF0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvcHRpb25zLnBhZ2luYXRpb24ubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAgIGluaXRQYWdpbmF0aW9uKG9wdGlvbnMucGFnaW5hdGlvbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLypcbiAgKiBSZS1wYXJzZSB0aGUgTGlzdCwgdXNlIGlmIGh0bWwgaGF2ZSBjaGFuZ2VkXG4gICovXG4gIHRoaXMucmVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zICA9IFtdO1xuICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgc2VsZi5wYXJzZShzZWxmLmxpc3QpO1xuICB9O1xuXG4gIHRoaXMudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGpzb24gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGpzb24ucHVzaChzZWxmLml0ZW1zW2ldLnZhbHVlcygpKTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH07XG5cblxuICAvKlxuICAqIEFkZCBvYmplY3QgdG8gbGlzdFxuICAqL1xuICB0aGlzLmFkZCA9IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYWRkZWQgPSBbXSxcbiAgICAgIG5vdENyZWF0ZSA9IGZhbHNlO1xuICAgIGlmICh2YWx1ZXNbMF0gPT09IHVuZGVmaW5lZCl7XG4gICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdmFsdWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbnVsbDtcbiAgICAgIG5vdENyZWF0ZSA9IChzZWxmLml0ZW1zLmxlbmd0aCA+IHNlbGYucGFnZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICBpdGVtID0gbmV3IEl0ZW0odmFsdWVzW2ldLCB1bmRlZmluZWQsIG5vdENyZWF0ZSk7XG4gICAgICBzZWxmLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICBhZGRlZC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBhZGRlZDtcbiAgfTtcblxuXHR0aGlzLnNob3cgPSBmdW5jdGlvbihpLCBwYWdlKSB7XG5cdFx0dGhpcy5pID0gaTtcblx0XHR0aGlzLnBhZ2UgPSBwYWdlO1xuXHRcdHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIHNlbGY7XG5cdH07XG5cbiAgLyogUmVtb3ZlcyBvYmplY3QgZnJvbSBsaXN0LlxuICAqIExvb3BzIHRocm91Z2ggdGhlIGxpc3QgYW5kIHJlbW92ZXMgb2JqZWN0cyB3aGVyZVxuICAqIHByb3BlcnR5IFwidmFsdWVuYW1lXCIgPT09IHZhbHVlXG4gICovXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24odmFsdWVOYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBmb3VuZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoc2VsZi5pdGVtc1tpXS52YWx1ZXMoKVt2YWx1ZU5hbWVdID09IHZhbHVlKSB7XG4gICAgICAgIHNlbGYudGVtcGxhdGVyLnJlbW92ZShzZWxmLml0ZW1zW2ldLCBvcHRpb25zKTtcbiAgICAgICAgc2VsZi5pdGVtcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgaWwtLTtcbiAgICAgICAgaS0tO1xuICAgICAgICBmb3VuZCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKiBHZXRzIHRoZSBvYmplY3RzIGluIHRoZSBsaXN0IHdoaWNoXG4gICogcHJvcGVydHkgXCJ2YWx1ZU5hbWVcIiA9PT0gdmFsdWVcbiAgKi9cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbih2YWx1ZU5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoZWRJdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzZWxmLml0ZW1zW2ldO1xuICAgICAgaWYgKGl0ZW0udmFsdWVzKClbdmFsdWVOYW1lXSA9PSB2YWx1ZSkge1xuICAgICAgICBtYXRjaGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZWRJdGVtcztcbiAgfTtcblxuICAvKlxuICAqIEdldCBzaXplIG9mIHRoZSBsaXN0XG4gICovXG4gIHRoaXMuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzZWxmLml0ZW1zLmxlbmd0aDtcbiAgfTtcblxuICAvKlxuICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhlIGxpc3RcbiAgKi9cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgc2VsZi5pdGVtcyA9IFtdO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMub24gPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICBzZWxmLmhhbmRsZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gc2VsZi5oYW5kbGVyc1tldmVudF07XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihlLCBjYWxsYmFjayk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSA9IHNlbGYuaGFuZGxlcnNbZXZlbnRdLmxlbmd0aDtcbiAgICB3aGlsZShpLS0pIHtcbiAgICAgIHNlbGYuaGFuZGxlcnNbZXZlbnRdW2ldKHNlbGYpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0ge1xuICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuICAgICAgICBpbCA9IGlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpbC0tKSB7XG4gICAgICAgIGlzW2lsXS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcbiAgICAgICAgaWwgPSBpcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWwtLSkge1xuICAgICAgICBpc1tpbF0uZm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG5cdFx0XHRpbCA9IGlzLmxlbmd0aDtcblxuICAgIHNlbGYudmlzaWJsZUl0ZW1zID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zID0gW107XG4gICAgc2VsZi50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChpc1tpXS5tYXRjaGluZygpICYmICgoc2VsZi5tYXRjaGluZ0l0ZW1zLmxlbmd0aCsxKSA+PSBzZWxmLmkgJiYgc2VsZi52aXNpYmxlSXRlbXMubGVuZ3RoIDwgc2VsZi5wYWdlKSkge1xuICAgICAgICBpc1tpXS5zaG93KCk7XG4gICAgICAgIHNlbGYudmlzaWJsZUl0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBzZWxmLm1hdGNoaW5nSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICB9IGVsc2UgaWYgKGlzW2ldLm1hdGNoaW5nKCkpIHtcbiAgICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYudHJpZ2dlcigndXBkYXRlZCcpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIGluaXQuc3RhcnQoKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSkge1xuICAgIHZhciBpdGVtID0gdGhpcztcblxuICAgIHRoaXMuX3ZhbHVlcyA9IHt9O1xuXG4gICAgdGhpcy5mb3VuZCA9IGZhbHNlOyAvLyBTaG93IGlmIGxpc3Quc2VhcmNoZWQgPT0gdHJ1ZSBhbmQgdGhpcy5mb3VuZCA9PSB0cnVlXG4gICAgdGhpcy5maWx0ZXJlZCA9IGZhbHNlOy8vIFNob3cgaWYgbGlzdC5maWx0ZXJlZCA9PSB0cnVlIGFuZCB0aGlzLmZpbHRlcmVkID09IHRydWVcblxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24oaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKSB7XG4gICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChub3RDcmVhdGUpIHtcbiAgICAgICAgICBpdGVtLnZhbHVlcyhpbml0VmFsdWVzLCBub3RDcmVhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0udmFsdWVzKGluaXRWYWx1ZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmVsbSA9IGVsZW1lbnQ7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBsaXN0LnRlbXBsYXRlci5nZXQoaXRlbSwgaW5pdFZhbHVlcyk7XG4gICAgICAgIGl0ZW0udmFsdWVzKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudmFsdWVzID0gZnVuY3Rpb24obmV3VmFsdWVzLCBub3RDcmVhdGUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IodmFyIG5hbWUgaW4gbmV3VmFsdWVzKSB7XG4gICAgICAgICAgaXRlbS5fdmFsdWVzW25hbWVdID0gbmV3VmFsdWVzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3RDcmVhdGUgIT09IHRydWUpIHtcbiAgICAgICAgICBsaXN0LnRlbXBsYXRlci5zZXQoaXRlbSwgaXRlbS52YWx1ZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpdGVtLl92YWx1ZXM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuc2hvdyhpdGVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnRlbXBsYXRlci5oaWRlKGl0ZW0pO1xuICAgIH07XG5cbiAgICB0aGlzLm1hdGNoaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAobGlzdC5maWx0ZXJlZCAmJiBsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZm91bmQgJiYgaXRlbS5maWx0ZXJlZCkgfHxcbiAgICAgICAgKGxpc3QuZmlsdGVyZWQgJiYgIWxpc3Quc2VhcmNoZWQgJiYgaXRlbS5maWx0ZXJlZCkgfHxcbiAgICAgICAgKCFsaXN0LmZpbHRlcmVkICYmIGxpc3Quc2VhcmNoZWQgJiYgaXRlbS5mb3VuZCkgfHxcbiAgICAgICAgKCFsaXN0LmZpbHRlcmVkICYmICFsaXN0LnNlYXJjaGVkKVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhpcy52aXNpYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGl0ZW0uZWxtICYmIChpdGVtLmVsbS5wYXJlbnROb2RlID09IGxpc3QubGlzdCkpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICBpbml0KGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSk7XG4gIH07XG59O1xuIiwidmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgTGlzdCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbihwYWdpbmdMaXN0LCBvcHRpb25zKSB7XG4gICAgdmFyIGl0ZW0sXG4gICAgICBsID0gbGlzdC5tYXRjaGluZ0l0ZW1zLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gbGlzdC5pLFxuICAgICAgcGFnZSA9IGxpc3QucGFnZSxcbiAgICAgIHBhZ2VzID0gTWF0aC5jZWlsKGwgLyBwYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlID0gTWF0aC5jZWlsKChpbmRleCAvIHBhZ2UpKSxcbiAgICAgIGlubmVyV2luZG93ID0gb3B0aW9ucy5pbm5lcldpbmRvdyB8fCAyLFxuICAgICAgbGVmdCA9IG9wdGlvbnMubGVmdCB8fCBvcHRpb25zLm91dGVyV2luZG93IHx8IDAsXG4gICAgICByaWdodCA9IG9wdGlvbnMucmlnaHQgfHwgb3B0aW9ucy5vdXRlcldpbmRvdyB8fCAwO1xuXG4gICAgcmlnaHQgPSBwYWdlcyAtIHJpZ2h0O1xuXG4gICAgcGFnaW5nTGlzdC5jbGVhcigpO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHBhZ2VzOyBpKyspIHtcbiAgICAgIHZhciBjbGFzc05hbWUgPSAoY3VycmVudFBhZ2UgPT09IGkpID8gXCJhY3RpdmVcIiA6IFwiXCI7XG5cbiAgICAgIC8vY29uc29sZS5sb2coaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCAoY3VycmVudFBhZ2UgLSBpbm5lcldpbmRvdyksIChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSwgY2xhc3NOYW1lKTtcblxuICAgICAgaWYgKGlzLm51bWJlcihpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IGksXG4gICAgICAgICAgZG90dGVkOiBmYWxzZVxuICAgICAgICB9KVswXTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgIGNsYXNzZXMoaXRlbS5lbG0pLmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50KGl0ZW0uZWxtLCBpLCBwYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXMuZG90dGVkKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIHBhZ2luZ0xpc3Quc2l6ZSgpKSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IFwiLi4uXCIsXG4gICAgICAgICAgZG90dGVkOiB0cnVlXG4gICAgICAgIH0pWzBdO1xuICAgICAgICBjbGFzc2VzKGl0ZW0uZWxtKS5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzID0ge1xuICAgIG51bWJlcjogZnVuY3Rpb24oaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgIHJldHVybiB0aGlzLmxlZnQoaSwgbGVmdCkgfHwgdGhpcy5yaWdodChpLCByaWdodCkgfHwgdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpO1xuICAgIH0sXG4gICAgbGVmdDogZnVuY3Rpb24oaSwgbGVmdCkge1xuICAgICAgcmV0dXJuIChpIDw9IGxlZnQpO1xuICAgIH0sXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGksIHJpZ2h0KSB7XG4gICAgICByZXR1cm4gKGkgPiByaWdodCk7XG4gICAgfSxcbiAgICBpbm5lcldpbmRvdzogZnVuY3Rpb24oaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICByZXR1cm4gKCBpID49IChjdXJyZW50UGFnZSAtIGlubmVyV2luZG93KSAmJiBpIDw9IChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSk7XG4gICAgfSxcbiAgICBkb3R0ZWQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuZG90dGVkTGVmdChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB8fCAodGhpcy5kb3R0ZWRSaWdodChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pKTtcbiAgICB9LFxuICAgIGRvdHRlZExlZnQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgIHJldHVybiAoKGkgPT0gKGxlZnQgKyAxKSkgJiYgIXRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSAmJiAhdGhpcy5yaWdodChpLCByaWdodCkpO1xuICAgIH0sXG4gICAgZG90dGVkUmlnaHQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgaWYgKHBhZ2luZ0xpc3QuaXRlbXNbY3VycmVudFBhZ2VJdGVtLTFdLnZhbHVlcygpLmRvdHRlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKChpID09IChyaWdodCkpICYmICF0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgJiYgIXRoaXMucmlnaHQoaSwgcmlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWxtLCBpLCBwYWdlKSB7XG4gICAgIGV2ZW50cy5iaW5kKGVsbSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgbGlzdC5zaG93KChpLTEpKnBhZ2UgKyAxLCBwYWdlKTtcbiAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgcGFnaW5nTGlzdCA9IG5ldyBMaXN0KGxpc3QubGlzdENvbnRhaW5lci5pZCwge1xuICAgICAgbGlzdENsYXNzOiBvcHRpb25zLnBhZ2luYXRpb25DbGFzcyB8fCAncGFnaW5hdGlvbicsXG4gICAgICBpdGVtOiBcIjxsaT48YSBjbGFzcz0ncGFnZScgaHJlZj0namF2YXNjcmlwdDpmdW5jdGlvbiBaKCl7Wj1cXFwiXFxcIn1aKCknPjwvYT48L2xpPlwiLFxuICAgICAgdmFsdWVOYW1lczogWydwYWdlJywgJ2RvdHRlZCddLFxuICAgICAgc2VhcmNoQ2xhc3M6ICdwYWdpbmF0aW9uLXNlYXJjaC10aGF0LWlzLW5vdC1zdXBwb3NlZC10by1leGlzdCcsXG4gICAgICBzb3J0Q2xhc3M6ICdwYWdpbmF0aW9uLXNvcnQtdGhhdC1pcy1ub3Qtc3VwcG9zZWQtdG8tZXhpc3QnXG4gICAgfSk7XG5cbiAgICBsaXN0Lm9uKCd1cGRhdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICByZWZyZXNoKHBhZ2luZ0xpc3QsIG9wdGlvbnMpO1xuICAgIH0pO1xuICAgIHJlZnJlc2gocGFnaW5nTGlzdCwgb3B0aW9ucyk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIEl0ZW0gPSByZXF1aXJlKCcuL2l0ZW0nKShsaXN0KTtcblxuICB2YXIgZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICB2YXIgbm9kZXMgPSBwYXJlbnQuY2hpbGROb2RlcyxcbiAgICAgIGl0ZW1zID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbm9kZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgLy8gT25seSB0ZXh0bm9kZXMgaGF2ZSBhIGRhdGEgYXR0cmlidXRlXG4gICAgICBpZiAobm9kZXNbaV0uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobm9kZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlbXM7XG4gIH07XG5cbiAgdmFyIHBhcnNlID0gZnVuY3Rpb24oaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gaXRlbUVsZW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxpc3QuaXRlbXMucHVzaChuZXcgSXRlbSh2YWx1ZU5hbWVzLCBpdGVtRWxlbWVudHNbaV0pKTtcbiAgICB9XG4gIH07XG4gIHZhciBwYXJzZUFzeW5jID0gZnVuY3Rpb24oaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKSB7XG4gICAgdmFyIGl0ZW1zVG9JbmRleCA9IGl0ZW1FbGVtZW50cy5zcGxpY2UoMCwgNTApOyAvLyBUT0RPOiBJZiA8IDEwMCBpdGVtcywgd2hhdCBoYXBwZW5zIGluIElFIGV0Yz9cbiAgICBwYXJzZShpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIGlmIChpdGVtRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcGFyc2VBc3luYyhpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpO1xuICAgICAgfSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QudXBkYXRlKCk7XG4gICAgICBsaXN0LnRyaWdnZXIoJ3BhcnNlQ29tcGxldGUnKTtcbiAgICB9XG4gIH07XG5cbiAgbGlzdC5oYW5kbGVycy5wYXJzZUNvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5wYXJzZUNvbXBsZXRlIHx8IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXNUb0luZGV4ID0gZ2V0Q2hpbGRyZW4obGlzdC5saXN0KSxcbiAgICAgIHZhbHVlTmFtZXMgPSBsaXN0LnZhbHVlTmFtZXM7XG5cbiAgICBpZiAobGlzdC5pbmRleEFzeW5jKSB7XG4gICAgICBwYXJzZUFzeW5jKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgaXRlbSxcbiAgICB0ZXh0LFxuICAgIGNvbHVtbnMsXG4gICAgc2VhcmNoU3RyaW5nLFxuICAgIGN1c3RvbVNlYXJjaDtcblxuICB2YXIgcHJlcGFyZSA9IHtcbiAgICByZXNldExpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5pID0gMTtcbiAgICAgIGxpc3QudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgICBjdXN0b21TZWFyY2ggPSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBzZXRPcHRpb25zOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPT0gMiAmJiBhcmdzWzFdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgY29sdW1ucyA9IGFyZ3NbMV07XG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDIgJiYgdHlwZW9mKGFyZ3NbMV0pID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgICAgICBjdXN0b21TZWFyY2ggPSBhcmdzWzFdO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIGNvbHVtbnMgPSBhcmdzWzFdO1xuICAgICAgICBjdXN0b21TZWFyY2ggPSBhcmdzWzJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldENvbHVtbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGxpc3QuaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBpZiAoY29sdW1ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbnMgPSAobGlzdC5zZWFyY2hDb2x1bW5zID09PSB1bmRlZmluZWQpID8gcHJlcGFyZS50b0FycmF5KGxpc3QuaXRlbXNbMF0udmFsdWVzKCkpIDogbGlzdC5zZWFyY2hDb2x1bW5zO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0U2VhcmNoU3RyaW5nOiBmdW5jdGlvbihzKSB7XG4gICAgICBzID0gbGlzdC51dGlscy50b1N0cmluZyhzKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcyA9IHMucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNdL2csIFwiXFxcXCQmXCIpOyAvLyBFc2NhcGUgcmVndWxhciBleHByZXNzaW9uIGNoYXJhY3RlcnNcbiAgICAgIHNlYXJjaFN0cmluZyA9IHM7XG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciB0bXBDb2x1bW4gPSBbXTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gdmFsdWVzKSB7XG4gICAgICAgIHRtcENvbHVtbi5wdXNoKG5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRtcENvbHVtbjtcbiAgICB9XG4gIH07XG4gIHZhciBzZWFyY2ggPSB7XG4gICAgbGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBrID0gMCwga2wgPSBsaXN0Lml0ZW1zLmxlbmd0aDsgayA8IGtsOyBrKyspIHtcbiAgICAgICAgc2VhcmNoLml0ZW0obGlzdC5pdGVtc1trXSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpdGVtLmZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjb2x1bW5zLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgaWYgKHNlYXJjaC52YWx1ZXMoaXRlbS52YWx1ZXMoKSwgY29sdW1uc1tqXSkpIHtcbiAgICAgICAgICBpdGVtLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24odmFsdWVzLCBjb2x1bW4pIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoY29sdW1uKSkge1xuICAgICAgICB0ZXh0ID0gbGlzdC51dGlscy50b1N0cmluZyh2YWx1ZXNbY29sdW1uXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKChzZWFyY2hTdHJpbmcgIT09IFwiXCIpICYmICh0ZXh0LnNlYXJjaChzZWFyY2hTdHJpbmcpID4gLTEpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QucmVzZXQuc2VhcmNoKCk7XG4gICAgICBsaXN0LnNlYXJjaGVkID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzZWFyY2hNZXRob2QgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBsaXN0LnRyaWdnZXIoJ3NlYXJjaFN0YXJ0Jyk7XG5cbiAgICBwcmVwYXJlLnJlc2V0TGlzdCgpO1xuICAgIHByZXBhcmUuc2V0U2VhcmNoU3RyaW5nKHN0cik7XG4gICAgcHJlcGFyZS5zZXRPcHRpb25zKGFyZ3VtZW50cyk7IC8vIHN0ciwgY29sc3xzZWFyY2hGdW5jdGlvbiwgc2VhcmNoRnVuY3Rpb25cbiAgICBwcmVwYXJlLnNldENvbHVtbnMoKTtcblxuICAgIGlmIChzZWFyY2hTdHJpbmcgPT09IFwiXCIgKSB7XG4gICAgICBzZWFyY2gucmVzZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zZWFyY2hlZCA9IHRydWU7XG4gICAgICBpZiAoY3VzdG9tU2VhcmNoKSB7XG4gICAgICAgIGN1c3RvbVNlYXJjaChzZWFyY2hTdHJpbmcsIGNvbHVtbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoLmxpc3QoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignc2VhcmNoQ29tcGxldGUnKTtcbiAgICByZXR1cm4gbGlzdC52aXNpYmxlSXRlbXM7XG4gIH07XG5cbiAgbGlzdC5oYW5kbGVycy5zZWFyY2hTdGFydCA9IGxpc3QuaGFuZGxlcnMuc2VhcmNoU3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuc2VhcmNoQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnNlYXJjaENvbXBsZXRlIHx8IFtdO1xuXG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQobGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zZWFyY2hDbGFzcyksICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LCAvLyBJRSBoYXZlIHNyY0VsZW1lbnRcbiAgICAgIGFscmVhZHlDbGVhcmVkID0gKHRhcmdldC52YWx1ZSA9PT0gXCJcIiAmJiAhbGlzdC5zZWFyY2hlZCk7XG4gICAgaWYgKCFhbHJlYWR5Q2xlYXJlZCkgeyAvLyBJZiBvbmlucHV0IGFscmVhZHkgaGF2ZSByZXNldHRlZCB0aGUgbGlzdCwgZG8gbm90aGluZ1xuICAgICAgc2VhcmNoTWV0aG9kKHRhcmdldC52YWx1ZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBVc2VkIHRvIGRldGVjdCBjbGljayBvbiBIVE1MNSBjbGVhciBidXR0b25cbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNlYXJjaENsYXNzKSwgJ2lucHV0JywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgaWYgKHRhcmdldC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgc2VhcmNoTWV0aG9kKCcnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzZWFyY2hNZXRob2Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIGJ1dHRvbnMgPSB7XG4gICAgZWxzOiB1bmRlZmluZWQsXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYnV0dG9ucy5lbHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnV0dG9ucy5lbHNbaV0pLnJlbW92ZSgnYXNjJyk7XG4gICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidXR0b25zLmVsc1tpXSkucmVtb3ZlKCdkZXNjJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRPcmRlcjogZnVuY3Rpb24oYnRuKSB7XG4gICAgICB2YXIgcHJlZGVmaW5lZE9yZGVyID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1vcmRlcicpO1xuICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBcImFzY1wiIHx8IHByZWRlZmluZWRPcmRlciA9PSBcImRlc2NcIikge1xuICAgICAgICByZXR1cm4gcHJlZGVmaW5lZE9yZGVyO1xuICAgICAgfSBlbHNlIGlmIChsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5oYXMoJ2Rlc2MnKSkge1xuICAgICAgICByZXR1cm4gXCJhc2NcIjtcbiAgICAgIH0gZWxzZSBpZiAobGlzdC51dGlscy5jbGFzc2VzKGJ0bikuaGFzKCdhc2MnKSkge1xuICAgICAgICByZXR1cm4gXCJkZXNjXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJhc2NcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEluU2Vuc2l0aXZlOiBmdW5jdGlvbihidG4sIG9wdGlvbnMpIHtcbiAgICAgIHZhciBpbnNlbnNpdGl2ZSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtaW5zZW5zaXRpdmUnKTtcbiAgICAgIGlmIChpbnNlbnNpdGl2ZSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0T3JkZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGJ1dHRvbnMuZWxzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgdmFyIGJ0biA9IGJ1dHRvbnMuZWxzW2ldO1xuICAgICAgICBpZiAobGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1zb3J0JykgIT09IG9wdGlvbnMudmFsdWVOYW1lKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZWRlZmluZWRPcmRlciA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtb3JkZXInKTtcbiAgICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBcImFzY1wiIHx8IHByZWRlZmluZWRPcmRlciA9PSBcImRlc2NcIikge1xuICAgICAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gb3B0aW9ucy5vcmRlcikge1xuICAgICAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ0bikuYWRkKG9wdGlvbnMub3JkZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5hZGQob3B0aW9ucy5vcmRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHNvcnQgPSBmdW5jdGlvbigpIHtcbiAgICBsaXN0LnRyaWdnZXIoJ3NvcnRTdGFydCcpO1xuICAgIHZhciBvcHRpb25zID0ge307XG5cbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLmN1cnJlbnRUYXJnZXQgfHwgYXJndW1lbnRzWzBdLnNyY0VsZW1lbnQgfHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgb3B0aW9ucy52YWx1ZU5hbWUgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZSh0YXJnZXQsICdkYXRhLXNvcnQnKTtcbiAgICAgIGJ1dHRvbnMuZ2V0SW5TZW5zaXRpdmUodGFyZ2V0LCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMub3JkZXIgPSBidXR0b25zLmdldE9yZGVyKHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbMV0gfHwgb3B0aW9ucztcbiAgICAgIG9wdGlvbnMudmFsdWVOYW1lID0gYXJndW1lbnRzWzBdO1xuICAgICAgb3B0aW9ucy5vcmRlciA9IG9wdGlvbnMub3JkZXIgfHwgXCJhc2NcIjtcbiAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSAodHlwZW9mIG9wdGlvbnMuaW5zZW5zaXRpdmUgPT0gXCJ1bmRlZmluZWRcIikgPyB0cnVlIDogb3B0aW9ucy5pbnNlbnNpdGl2ZTtcbiAgICB9XG5cbiAgICBidXR0b25zLmNsZWFyKCk7XG4gICAgYnV0dG9ucy5zZXRPcmRlcihvcHRpb25zKTtcblxuXG4gICAgLy8gY2FzZUluc2Vuc2l0aXZlXG4gICAgLy8gYWxwaGFiZXRcbiAgICB2YXIgY3VzdG9tU29ydEZ1bmN0aW9uID0gKG9wdGlvbnMuc29ydEZ1bmN0aW9uIHx8IGxpc3Quc29ydEZ1bmN0aW9uIHx8IG51bGwpLFxuICAgICAgICBtdWx0aSA9ICgob3B0aW9ucy5vcmRlciA9PT0gJ2Rlc2MnKSA/IC0xIDogMSksXG4gICAgICAgIHNvcnRGdW5jdGlvbjtcblxuICAgIGlmIChjdXN0b21Tb3J0RnVuY3Rpb24pIHtcbiAgICAgIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGl0ZW1BLCBpdGVtQikge1xuICAgICAgICByZXR1cm4gY3VzdG9tU29ydEZ1bmN0aW9uKGl0ZW1BLCBpdGVtQiwgb3B0aW9ucykgKiBtdWx0aTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGl0ZW1BLCBpdGVtQikge1xuICAgICAgICB2YXIgc29ydCA9IGxpc3QudXRpbHMubmF0dXJhbFNvcnQ7XG4gICAgICAgIHNvcnQuYWxwaGFiZXQgPSBsaXN0LmFscGhhYmV0IHx8IG9wdGlvbnMuYWxwaGFiZXQgfHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXNvcnQuYWxwaGFiZXQgJiYgb3B0aW9ucy5pbnNlbnNpdGl2ZSkge1xuICAgICAgICAgIHNvcnQgPSBsaXN0LnV0aWxzLm5hdHVyYWxTb3J0LmNhc2VJbnNlbnNpdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc29ydChpdGVtQS52YWx1ZXMoKVtvcHRpb25zLnZhbHVlTmFtZV0sIGl0ZW1CLnZhbHVlcygpW29wdGlvbnMudmFsdWVOYW1lXSkgKiBtdWx0aTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgbGlzdC5pdGVtcy5zb3J0KHNvcnRGdW5jdGlvbik7XG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ3NvcnRDb21wbGV0ZScpO1xuICB9O1xuXG4gIC8vIEFkZCBoYW5kbGVyc1xuICBsaXN0LmhhbmRsZXJzLnNvcnRTdGFydCA9IGxpc3QuaGFuZGxlcnMuc29ydFN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLnNvcnRDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuc29ydENvbXBsZXRlIHx8IFtdO1xuXG4gIGJ1dHRvbnMuZWxzID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zb3J0Q2xhc3MpO1xuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGJ1dHRvbnMuZWxzLCAnY2xpY2snLCBzb3J0KTtcbiAgbGlzdC5vbignc2VhcmNoU3RhcnQnLCBidXR0b25zLmNsZWFyKTtcbiAgbGlzdC5vbignZmlsdGVyU3RhcnQnLCBidXR0b25zLmNsZWFyKTtcblxuICByZXR1cm4gc29ydDtcbn07XG4iLCJ2YXIgVGVtcGxhdGVyID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgaXRlbVNvdXJjZSxcbiAgICB0ZW1wbGF0ZXIgPSB0aGlzO1xuXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgaXRlbVNvdXJjZSA9IHRlbXBsYXRlci5nZXRJdGVtU291cmNlKGxpc3QuaXRlbSk7XG4gICAgaWYgKGl0ZW1Tb3VyY2UpIHtcbiAgICAgIGl0ZW1Tb3VyY2UgPSB0ZW1wbGF0ZXIuY2xlYXJTb3VyY2VJdGVtKGl0ZW1Tb3VyY2UsIGxpc3QudmFsdWVOYW1lcyk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY2xlYXJTb3VyY2VJdGVtID0gZnVuY3Rpb24oZWwsIHZhbHVlTmFtZXMpIHtcbiAgICBmb3IodmFyIGkgPSAwLCBpbCA9IHZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIGlmICh2YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gdmFsdWVOYW1lc1tpXS5kYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyt2YWx1ZU5hbWVzW2ldLmRhdGFbal0sICcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWVzW2ldLmF0dHIgJiYgdmFsdWVOYW1lc1tpXS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhlbCwgdmFsdWVOYW1lc1tpXS5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUodmFsdWVOYW1lc1tpXS5hdHRyLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGVsLCB2YWx1ZU5hbWVzW2ldLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICB0aGlzLmdldEl0ZW1Tb3VyY2UgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIG5vZGVzID0gbGlzdC5saXN0LmNoaWxkTm9kZXMsXG4gICAgICAgIGl0ZW1zID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgLy8gT25seSB0ZXh0bm9kZXMgaGF2ZSBhIGRhdGEgYXR0cmlidXRlXG4gICAgICAgIGlmIChub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgvPHRyW1xccz5dL2cuZXhlYyhpdGVtKSkge1xuICAgICAgdmFyIHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICAgIHRib2R5LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICByZXR1cm4gdGJvZHkuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uaW5kZXhPZihcIjxcIikgIT09IC0xKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgIHJldHVybiBkaXYuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpc3QuaXRlbSk7XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbihpdGVtLCB2YWx1ZU5hbWVzKSB7XG4gICAgdGVtcGxhdGVyLmNyZWF0ZShpdGVtKTtcbiAgICB2YXIgdmFsdWVzID0ge307XG4gICAgZm9yKHZhciBpID0gMCwgaWwgPSB2YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBlbG07XG4gICAgICBpZiAodmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IHZhbHVlTmFtZXNbaV0uZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV0uZGF0YVtqXV0gPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShpdGVtLmVsbSwgJ2RhdGEtJyt2YWx1ZU5hbWVzW2ldLmRhdGFbal0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZXNbaV0uYXR0ciAmJiB2YWx1ZU5hbWVzW2ldLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWVzW2ldLm5hbWUsIHRydWUpO1xuICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXS5uYW1lXSA9IGVsbSA/IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGVsbSwgdmFsdWVOYW1lc1tpXS5hdHRyKSA6IFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZXNbaV0sIHRydWUpO1xuICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXV0gPSBlbG0gPyBlbG0uaW5uZXJIVE1MIDogXCJcIjtcbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICB0aGlzLnNldCA9IGZ1bmN0aW9uKGl0ZW0sIHZhbHVlcykge1xuICAgIHZhciBnZXRWYWx1ZU5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBsaXN0LnZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBpZiAobGlzdC52YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGxpc3QudmFsdWVOYW1lc1tpXS5kYXRhO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgICAgaWYgKGRhdGFbal0gPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbmFtZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0uYXR0ciAmJiBsaXN0LnZhbHVlTmFtZXNbaV0ubmFtZSAmJiBsaXN0LnZhbHVlTmFtZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3QudmFsdWVOYW1lc1tpXTtcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0gPT09IG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldFZhbHVlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBlbG07XG4gICAgICB2YXIgdmFsdWVOYW1lID0gZ2V0VmFsdWVOYW1lKG5hbWUpO1xuICAgICAgaWYgKCF2YWx1ZU5hbWUpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmICh2YWx1ZU5hbWUuZGF0YSkge1xuICAgICAgICBpdGVtLmVsbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyt2YWx1ZU5hbWUuZGF0YSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWUuYXR0ciAmJiB2YWx1ZU5hbWUubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZS5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUodmFsdWVOYW1lLmF0dHIsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBpZiAoIXRlbXBsYXRlci5jcmVhdGUoaXRlbSkpIHtcbiAgICAgIGZvcih2YXIgdiBpbiB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2KSkge1xuICAgICAgICAgIHNldFZhbHVlKHYsIHZhbHVlc1t2XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZW1Tb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGxpc3QgbmVlZCB0byBoYXZlIGF0IGxpc3Qgb25lIGl0ZW0gb24gaW5pdCBvdGhlcndpc2UgeW91J2xsIGhhdmUgdG8gYWRkIGEgdGVtcGxhdGUuXCIpO1xuICAgIH1cbiAgICAvKiBJZiBpdGVtIHNvdXJjZSBkb2VzIG5vdCBleGlzdHMsIHVzZSB0aGUgZmlyc3QgaXRlbSBpbiBsaXN0IGFzXG4gICAgc291cmNlIGZvciBuZXcgaXRlbXMgKi9cbiAgICB2YXIgbmV3SXRlbSA9IGl0ZW1Tb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuICAgIG5ld0l0ZW0ucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIGl0ZW0uZWxtID0gbmV3SXRlbTtcbiAgICB0ZW1wbGF0ZXIuc2V0KGl0ZW0sIGl0ZW0udmFsdWVzKCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0ucGFyZW50Tm9kZSA9PT0gbGlzdC5saXN0KSB7XG4gICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQoaXRlbS5lbG0pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zaG93ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIHRlbXBsYXRlci5jcmVhdGUoaXRlbSk7XG4gICAgbGlzdC5saXN0LmFwcGVuZENoaWxkKGl0ZW0uZWxtKTtcbiAgfTtcbiAgdGhpcy5oaWRlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0uZWxtLnBhcmVudE5vZGUgPT09IGxpc3QubGlzdCkge1xuICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGl0ZW0uZWxtKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAvKiAuaW5uZXJIVE1MID0gJyc7IGZ1Y2tzIHVwIElFICovXG4gICAgaWYgKGxpc3QubGlzdC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHdoaWxlIChsaXN0Lmxpc3QuY2hpbGROb2Rlcy5sZW5ndGggPj0gMSlcbiAgICAgIHtcbiAgICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGxpc3QubGlzdC5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaW5pdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHJldHVybiBuZXcgVGVtcGxhdGVyKGxpc3QpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgaW5kZXggPSByZXF1aXJlKCcuL2luZGV4LW9mJyk7XG5cbi8qKlxuICogV2hpdGVzcGFjZSByZWdleHAuXG4gKi9cblxudmFyIHJlID0gL1xccysvO1xuXG4vKipcbiAqIHRvU3RyaW5nIHJlZmVyZW5jZS5cbiAqL1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFdyYXAgYGVsYCBpbiBhIGBDbGFzc0xpc3RgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCl7XG4gIHJldHVybiBuZXcgQ2xhc3NMaXN0KGVsKTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBDbGFzc0xpc3QgZm9yIGBlbGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gQ2xhc3NMaXN0KGVsKSB7XG4gIGlmICghZWwgfHwgIWVsLm5vZGVUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIERPTSBlbGVtZW50IHJlZmVyZW5jZSBpcyByZXF1aXJlZCcpO1xuICB9XG4gIHRoaXMuZWwgPSBlbDtcbiAgdGhpcy5saXN0ID0gZWwuY2xhc3NMaXN0O1xufVxuXG4vKipcbiAqIEFkZCBjbGFzcyBgbmFtZWAgaWYgbm90IGFscmVhZHkgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG5hbWUpe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIHRoaXMubGlzdC5hZGQobmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICB2YXIgYXJyID0gdGhpcy5hcnJheSgpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICghfmkpIGFyci5wdXNoKG5hbWUpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgY2xhc3MgYG5hbWVgIHdoZW4gcHJlc2VudCwgb3JcbiAqIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlXG4gKiBhbnkgd2hpY2ggbWF0Y2guXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24obmFtZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgdGhpcy5saXN0LnJlbW92ZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSB0aGlzLmFycmF5KCk7XG4gIHZhciBpID0gaW5kZXgoYXJyLCBuYW1lKTtcbiAgaWYgKH5pKSBhcnIuc3BsaWNlKGksIDEpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIFRvZ2dsZSBjbGFzcyBgbmFtZWAsIGNhbiBmb3JjZSBzdGF0ZSB2aWEgYGZvcmNlYC5cbiAqXG4gKiBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IGNsYXNzTGlzdCwgYnV0IGRvIG5vdCBzdXBwb3J0IGBmb3JjZWAgeWV0LFxuICogdGhlIG1pc3Rha2Ugd2lsbCBiZSBkZXRlY3RlZCBhbmQgY29ycmVjdGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24obmFtZSwgZm9yY2Upe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgZm9yY2UpIHtcbiAgICAgIGlmIChmb3JjZSAhPT0gdGhpcy5saXN0LnRvZ2dsZShuYW1lLCBmb3JjZSkpIHtcbiAgICAgICAgdGhpcy5saXN0LnRvZ2dsZShuYW1lKTsgLy8gdG9nZ2xlIGFnYWluIHRvIGNvcnJlY3RcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0LnRvZ2dsZShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSkge1xuICAgICAgdGhpcy5yZW1vdmUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5oYXMobmFtZSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChuYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IG9mIGNsYXNzZXMuXG4gKlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuYXJyYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgY2xhc3NOYW1lID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gIHZhciBzdHIgPSBjbGFzc05hbWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB2YXIgYXJyID0gc3RyLnNwbGl0KHJlKTtcbiAgaWYgKCcnID09PSBhcnJbMF0pIGFyci5zaGlmdCgpO1xuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBjbGFzcyBgbmFtZWAgaXMgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmhhcyA9XG5DbGFzc0xpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiB0aGlzLmxpc3QgPyB0aGlzLmxpc3QuY29udGFpbnMobmFtZSkgOiAhISB+aW5kZXgodGhpcy5hcnJheSgpLCBuYW1lKTtcbn07XG4iLCJ2YXIgYmluZCA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICB1bmJpbmQgPSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4gICAgcHJlZml4ID0gYmluZCAhPT0gJ2FkZEV2ZW50TGlzdGVuZXInID8gJ29uJyA6ICcnLFxuICAgIHRvQXJyYXkgPSByZXF1aXJlKCcuL3RvLWFycmF5Jyk7XG5cbi8qKlxuICogQmluZCBgZWxgIGV2ZW50IGB0eXBlYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiBvciBBcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWwgPSB0b0FycmF5KGVsKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKysgKSB7XG4gICAgZWxbaV1bYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICB9XG59O1xuXG4vKipcbiAqIFVuYmluZCBgZWxgIGV2ZW50IGB0eXBlYCdzIGNhbGxiYWNrIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbCwgTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uIG9yIEFycmF5XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FwdHVyZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnVuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsID0gdG9BcnJheShlbCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrICkge1xuICAgIGVsW2ldW3VuYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICB9XG59O1xuIiwiLypcbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3NlZ21lbnRpby9leHRlbmRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCAob2JqZWN0KSB7XG4gICAgLy8gVGFrZXMgYW4gdW5saW1pdGVkIG51bWJlciBvZiBleHRlbmRlcnMuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgLy8gRm9yIGVhY2ggZXh0ZW5kZXIsIGNvcHkgdGhlaXIgcHJvcGVydGllcyBvbiBvdXIgb2JqZWN0LlxuICAgIGZvciAodmFyIGkgPSAwLCBzb3VyY2U7IHNvdXJjZSA9IGFyZ3NbaV07IGkrKykge1xuICAgICAgICBpZiAoIXNvdXJjZSkgY29udGludWU7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGV4dCwgcGF0dGVybiwgb3B0aW9ucykge1xuICAgIC8vIEFwcm94aW1hdGVseSB3aGVyZSBpbiB0aGUgdGV4dCBpcyB0aGUgcGF0dGVybiBleHBlY3RlZCB0byBiZSBmb3VuZD9cbiAgICB2YXIgTWF0Y2hfTG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uIHx8IDA7XG5cbiAgICAvL0RldGVybWluZXMgaG93IGNsb3NlIHRoZSBtYXRjaCBtdXN0IGJlIHRvIHRoZSBmdXp6eSBsb2NhdGlvbiAoc3BlY2lmaWVkIGFib3ZlKS4gQW4gZXhhY3QgbGV0dGVyIG1hdGNoIHdoaWNoIGlzICdkaXN0YW5jZScgY2hhcmFjdGVycyBhd2F5IGZyb20gdGhlIGZ1enp5IGxvY2F0aW9uIHdvdWxkIHNjb3JlIGFzIGEgY29tcGxldGUgbWlzbWF0Y2guIEEgZGlzdGFuY2Ugb2YgJzAnIHJlcXVpcmVzIHRoZSBtYXRjaCBiZSBhdCB0aGUgZXhhY3QgbG9jYXRpb24gc3BlY2lmaWVkLCBhIHRocmVzaG9sZCBvZiAnMTAwMCcgd291bGQgcmVxdWlyZSBhIHBlcmZlY3QgbWF0Y2ggdG8gYmUgd2l0aGluIDgwMCBjaGFyYWN0ZXJzIG9mIHRoZSBmdXp6eSBsb2NhdGlvbiB0byBiZSBmb3VuZCB1c2luZyBhIDAuOCB0aHJlc2hvbGQuXG4gICAgdmFyIE1hdGNoX0Rpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZSB8fCAxMDA7XG5cbiAgICAvLyBBdCB3aGF0IHBvaW50IGRvZXMgdGhlIG1hdGNoIGFsZ29yaXRobSBnaXZlIHVwLiBBIHRocmVzaG9sZCBvZiAnMC4wJyByZXF1aXJlcyBhIHBlcmZlY3QgbWF0Y2ggKG9mIGJvdGggbGV0dGVycyBhbmQgbG9jYXRpb24pLCBhIHRocmVzaG9sZCBvZiAnMS4wJyB3b3VsZCBtYXRjaCBhbnl0aGluZy5cbiAgICB2YXIgTWF0Y2hfVGhyZXNob2xkID0gb3B0aW9ucy50aHJlc2hvbGQgfHwgMC40O1xuXG4gICAgaWYgKHBhdHRlcm4gPT09IHRleHQpIHJldHVybiB0cnVlOyAvLyBFeGFjdCBtYXRjaFxuICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA+IDMyKSByZXR1cm4gZmFsc2U7IC8vIFRoaXMgYWxnb3JpdGhtIGNhbm5vdCBiZSB1c2VkXG5cbiAgICAvLyBTZXQgc3RhcnRpbmcgbG9jYXRpb24gYXQgYmVnaW5uaW5nIHRleHQgYW5kIGluaXRpYWxpc2UgdGhlIGFscGhhYmV0LlxuICAgIHZhciBsb2MgPSBNYXRjaF9Mb2NhdGlvbixcbiAgICAgICAgcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBxID0ge30sXG4gICAgICAgICAgICAgICAgaTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBxW3BhdHRlcm4uY2hhckF0KGkpXSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcVtwYXR0ZXJuLmNoYXJBdChpKV0gfD0gMSA8PCAocGF0dGVybi5sZW5ndGggLSBpIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBxO1xuICAgICAgICB9KCkpO1xuXG4gICAgLy8gQ29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBzY29yZSBmb3IgYSBtYXRjaCB3aXRoIGUgZXJyb3JzIGFuZCB4IGxvY2F0aW9uLlxuICAgIC8vIEFjY2Vzc2VzIGxvYyBhbmQgcGF0dGVybiB0aHJvdWdoIGJlaW5nIGEgY2xvc3VyZS5cblxuICAgIGZ1bmN0aW9uIG1hdGNoX2JpdGFwU2NvcmVfKGUsIHgpIHtcbiAgICAgICAgdmFyIGFjY3VyYWN5ID0gZSAvIHBhdHRlcm4ubGVuZ3RoLFxuICAgICAgICAgICAgcHJveGltaXR5ID0gTWF0aC5hYnMobG9jIC0geCk7XG5cbiAgICAgICAgaWYgKCFNYXRjaF9EaXN0YW5jZSkge1xuICAgICAgICAgICAgLy8gRG9kZ2UgZGl2aWRlIGJ5IHplcm8gZXJyb3IuXG4gICAgICAgICAgICByZXR1cm4gcHJveGltaXR5ID8gMS4wIDogYWNjdXJhY3k7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5ICsgKHByb3hpbWl0eSAvIE1hdGNoX0Rpc3RhbmNlKTtcbiAgICB9XG5cbiAgICB2YXIgc2NvcmVfdGhyZXNob2xkID0gTWF0Y2hfVGhyZXNob2xkLCAvLyBIaWdoZXN0IHNjb3JlIGJleW9uZCB3aGljaCB3ZSBnaXZlIHVwLlxuICAgICAgICBiZXN0X2xvYyA9IHRleHQuaW5kZXhPZihwYXR0ZXJuLCBsb2MpOyAvLyBJcyB0aGVyZSBhIG5lYXJieSBleGFjdCBtYXRjaD8gKHNwZWVkdXApXG5cbiAgICBpZiAoYmVzdF9sb2MgIT0gLTEpIHtcbiAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICAvLyBXaGF0IGFib3V0IGluIHRoZSBvdGhlciBkaXJlY3Rpb24/IChzcGVlZHVwKVxuICAgICAgICBiZXN0X2xvYyA9IHRleHQubGFzdEluZGV4T2YocGF0dGVybiwgbG9jICsgcGF0dGVybi5sZW5ndGgpO1xuXG4gICAgICAgIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgYml0IGFycmF5cy5cbiAgICB2YXIgbWF0Y2htYXNrID0gMSA8PCAocGF0dGVybi5sZW5ndGggLSAxKTtcbiAgICBiZXN0X2xvYyA9IC0xO1xuXG4gICAgdmFyIGJpbl9taW4sIGJpbl9taWQ7XG4gICAgdmFyIGJpbl9tYXggPSBwYXR0ZXJuLmxlbmd0aCArIHRleHQubGVuZ3RoO1xuICAgIHZhciBsYXN0X3JkO1xuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgcGF0dGVybi5sZW5ndGg7IGQrKykge1xuICAgICAgICAvLyBTY2FuIGZvciB0aGUgYmVzdCBtYXRjaDsgZWFjaCBpdGVyYXRpb24gYWxsb3dzIGZvciBvbmUgbW9yZSBlcnJvci5cbiAgICAgICAgLy8gUnVuIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgaG93IGZhciBmcm9tICdsb2MnIHdlIGNhbiBzdHJheSBhdCB0aGlzXG4gICAgICAgIC8vIGVycm9yIGxldmVsLlxuICAgICAgICBiaW5fbWluID0gMDtcbiAgICAgICAgYmluX21pZCA9IGJpbl9tYXg7XG4gICAgICAgIHdoaWxlIChiaW5fbWluIDwgYmluX21pZCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoX2JpdGFwU2NvcmVfKGQsIGxvYyArIGJpbl9taWQpIDw9IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIGJpbl9taW4gPSBiaW5fbWlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbl9taWQgPSBNYXRoLmZsb29yKChiaW5fbWF4IC0gYmluX21pbikgLyAyICsgYmluX21pbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIHRoZSByZXN1bHQgZnJvbSB0aGlzIGl0ZXJhdGlvbiBhcyB0aGUgbWF4aW11bSBmb3IgdGhlIG5leHQuXG4gICAgICAgIGJpbl9tYXggPSBiaW5fbWlkO1xuICAgICAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgxLCBsb2MgLSBiaW5fbWlkICsgMSk7XG4gICAgICAgIHZhciBmaW5pc2ggPSBNYXRoLm1pbihsb2MgKyBiaW5fbWlkLCB0ZXh0Lmxlbmd0aCkgKyBwYXR0ZXJuLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmQgPSBBcnJheShmaW5pc2ggKyAyKTtcbiAgICAgICAgcmRbZmluaXNoICsgMV0gPSAoMSA8PCBkKSAtIDE7XG4gICAgICAgIGZvciAodmFyIGogPSBmaW5pc2g7IGogPj0gc3RhcnQ7IGotLSkge1xuICAgICAgICAgICAgLy8gVGhlIGFscGhhYmV0IChzKSBpcyBhIHNwYXJzZSBoYXNoLCBzbyB0aGUgZm9sbG93aW5nIGxpbmUgZ2VuZXJhdGVzXG4gICAgICAgICAgICAvLyB3YXJuaW5ncy5cbiAgICAgICAgICAgIHZhciBjaGFyTWF0Y2ggPSBzW3RleHQuY2hhckF0KGogLSAxKV07XG4gICAgICAgICAgICBpZiAoZCA9PT0gMCkgeyAgICAvLyBGaXJzdCBwYXNzOiBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICByZFtqXSA9ICgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2g7XG4gICAgICAgICAgICB9IGVsc2UgeyAgICAvLyBTdWJzZXF1ZW50IHBhc3NlczogZnV6enkgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmRbal0gPSAoKChyZFtqICsgMV0gPDwgMSkgfCAxKSAmIGNoYXJNYXRjaCkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKChsYXN0X3JkW2ogKyAxXSB8IGxhc3RfcmRbal0pIDw8IDEpIHwgMSkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X3JkW2ogKyAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZFtqXSAmIG1hdGNobWFzaykge1xuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IG1hdGNoX2JpdGFwU2NvcmVfKGQsIGogLSAxKTtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG1hdGNoIHdpbGwgYWxtb3N0IGNlcnRhaW5seSBiZSBiZXR0ZXIgdGhhbiBhbnkgZXhpc3RpbmcgbWF0Y2guXG4gICAgICAgICAgICAgICAgLy8gQnV0IGNoZWNrIGFueXdheS5cbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRvbGQgeW91IHNvLlxuICAgICAgICAgICAgICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdF9sb2MgPSBqIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RfbG9jID4gbG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHBhc3NpbmcgbG9jLCBkb24ndCBleGNlZWQgb3VyIGN1cnJlbnQgZGlzdGFuY2UgZnJvbSBsb2MuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IE1hdGgubWF4KDEsIDIgKiBsb2MgLSBiZXN0X2xvYyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbHJlYWR5IHBhc3NlZCBsb2MsIGRvd25oaWxsIGZyb20gaGVyZSBvbiBpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5vIGhvcGUgZm9yIGEgKGJldHRlcikgbWF0Y2ggYXQgZ3JlYXRlciBlcnJvciBsZXZlbHMuXG4gICAgICAgIGlmIChtYXRjaF9iaXRhcFNjb3JlXyhkICsgMSwgbG9jKSA+IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdF9yZCA9IHJkO1xuICAgIH1cblxuICAgIHJldHVybiAoYmVzdF9sb2MgPCAwKSA/IGZhbHNlIDogdHJ1ZTtcbn07XG4iLCIvKipcbiAqIEEgY3Jvc3MtYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBnZXRBdHRyaWJ1dGUuXG4gKiBTb3VyY2UgZm91bmQgaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzc1NTM0My8zNjEzMzcgd3JpdHRlbiBieSBWaXZpbiBQYWxpYXRoXG4gKlxuICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgYGF0dHJgIGF0IGBlbGVtZW50YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0clxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsLCBhdHRyKSB7XG4gIHZhciByZXN1bHQgPSAoZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShhdHRyKSkgfHwgbnVsbDtcbiAgaWYoICFyZXN1bHQgKSB7XG4gICAgdmFyIGF0dHJzID0gZWwuYXR0cmlidXRlcztcbiAgICB2YXIgbGVuZ3RoID0gYXR0cnMubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGF0dHJbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZihhdHRyW2ldLm5vZGVOYW1lID09PSBhdHRyKSB7XG4gICAgICAgICAgcmVzdWx0ID0gYXR0cltpXS5ub2RlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiAqIEEgY3Jvc3MtYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBnZXRFbGVtZW50c0J5Q2xhc3MuXG4gKiBIZWF2aWx5IGJhc2VkIG9uIER1c3RpbiBEaWF6J3MgZnVuY3Rpb246IGh0dHA6Ly9kdXN0aW5kaWF6LmNvbS9nZXRlbGVtZW50c2J5Y2xhc3MuXG4gKlxuICogRmluZCBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcyBgY2xhc3NOYW1lYCBpbnNpZGUgYGNvbnRhaW5lcmAuXG4gKiBVc2UgYHNpbmdsZSA9IHRydWVgIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlIGluIG9sZGVyIGJyb3dzZXJzXG4gKiB3aGVuIG9ubHkgb25lIGVsZW1lbnQgaXMgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbmdsZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG52YXIgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgaWYgKHNpbmdsZSkge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpWzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICB9XG59O1xuXG52YXIgcXVlcnlTZWxlY3RvciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgY2xhc3NOYW1lID0gJy4nICsgY2xhc3NOYW1lO1xuICBpZiAoc2luZ2xlKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cbnZhciBwb2x5ZmlsbCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgdmFyIGNsYXNzRWxlbWVudHMgPSBbXSxcbiAgICB0YWcgPSAnKic7XG5cbiAgdmFyIGVscyA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuICB2YXIgZWxzTGVuID0gZWxzLmxlbmd0aDtcbiAgdmFyIHBhdHRlcm4gPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIrY2xhc3NOYW1lK1wiKFxcXFxzfCQpXCIpO1xuICBmb3IgKHZhciBpID0gMCwgaiA9IDA7IGkgPCBlbHNMZW47IGkrKykge1xuICAgIGlmICggcGF0dGVybi50ZXN0KGVsc1tpXS5jbGFzc05hbWUpICkge1xuICAgICAgaWYgKHNpbmdsZSkge1xuICAgICAgICByZXR1cm4gZWxzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3NFbGVtZW50c1tqXSA9IGVsc1tpXTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NFbGVtZW50cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICgob3B0aW9ucy50ZXN0ICYmIG9wdGlvbnMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkgfHwgKCFvcHRpb25zLnRlc3QgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH0gZWxzZSBpZiAoKG9wdGlvbnMudGVzdCAmJiBvcHRpb25zLnF1ZXJ5U2VsZWN0b3IpIHx8ICghb3B0aW9ucy50ZXN0ICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gcXVlcnlTZWxlY3Rvcihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH1cbiAgfTtcbn0pKCk7XG4iLCJ2YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBvYmope1xuICBpZiAoaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiLyoqXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS90aW1veGxleS90by1hcnJheVxuICpcbiAqIENvbnZlcnQgYW4gYXJyYXktbGlrZSBvYmplY3QgaW50byBhbiBgQXJyYXlgLlxuICogSWYgYGNvbGxlY3Rpb25gIGlzIGFscmVhZHkgYW4gYEFycmF5YCwgdGhlbiB3aWxsIHJldHVybiBhIGNsb25lIG9mIGBjb2xsZWN0aW9uYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5IHwgTWl4ZWR9IGNvbGxlY3Rpb24gQW4gYEFycmF5YCBvciBhcnJheS1saWtlIG9iamVjdCB0byBjb252ZXJ0IGUuZy4gYGFyZ3VtZW50c2Agb3IgYE5vZGVMaXN0YFxuICogQHJldHVybiB7QXJyYXl9IE5haXZlIGNvbnZlcnNpb24gb2YgYGNvbGxlY3Rpb25gIHRvIGEgbmV3IGBBcnJheWAuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdG9BcnJheShjb2xsZWN0aW9uKSB7XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBbXTtcbiAgaWYgKGNvbGxlY3Rpb24gPT09IG51bGwpIHJldHVybiBbbnVsbF07XG4gIGlmIChjb2xsZWN0aW9uID09PSB3aW5kb3cpIHJldHVybiBbd2luZG93XTtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnc3RyaW5nJykgcmV0dXJuIFtjb2xsZWN0aW9uXTtcbiAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHJldHVybiBjb2xsZWN0aW9uO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24ubGVuZ3RoICE9ICdudW1iZXInKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdmdW5jdGlvbicgJiYgY29sbGVjdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuXG4gIHZhciBhcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb2xsZWN0aW9uLCBpKSB8fCBpIGluIGNvbGxlY3Rpb24pIHtcbiAgICAgIGFyci5wdXNoKGNvbGxlY3Rpb25baV0pO1xuICAgIH1cbiAgfVxuICBpZiAoIWFyci5sZW5ndGgpIHJldHVybiBbXTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gIHMgPSAocyA9PT0gdW5kZWZpbmVkKSA/IFwiXCIgOiBzO1xuICBzID0gKHMgPT09IG51bGwpID8gXCJcIiA6IHM7XG4gIHMgPSBzLnRvU3RyaW5nKCk7XG4gIHJldHVybiBzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0O1xudmFyIGFscGhhYmV0SW5kZXhNYXA7XG52YXIgYWxwaGFiZXRJbmRleE1hcExlbmd0aCA9IDA7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyQ29kZShjb2RlKSB7XG4gIHJldHVybiBjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTc7XG59XG5cbmZ1bmN0aW9uIG5hdHVyYWxDb21wYXJlKGEsIGIpIHtcbiAgdmFyIGxlbmd0aEEgPSAoYSArPSAnJykubGVuZ3RoO1xuICB2YXIgbGVuZ3RoQiA9IChiICs9ICcnKS5sZW5ndGg7XG4gIHZhciBhSW5kZXggPSAwO1xuICB2YXIgYkluZGV4ID0gMDtcblxuICB3aGlsZSAoYUluZGV4IDwgbGVuZ3RoQSAmJiBiSW5kZXggPCBsZW5ndGhCKSB7XG4gICAgdmFyIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChhSW5kZXgpO1xuICAgIHZhciBjaGFyQ29kZUIgPSBiLmNoYXJDb2RlQXQoYkluZGV4KTtcblxuICAgIGlmIChpc051bWJlckNvZGUoY2hhckNvZGVBKSkge1xuICAgICAgaWYgKCFpc051bWJlckNvZGUoY2hhckNvZGVCKSkge1xuICAgICAgICByZXR1cm4gY2hhckNvZGVBIC0gY2hhckNvZGVCO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtU3RhcnRBID0gYUluZGV4O1xuICAgICAgdmFyIG51bVN0YXJ0QiA9IGJJbmRleDtcblxuICAgICAgd2hpbGUgKGNoYXJDb2RlQSA9PT0gNDggJiYgKytudW1TdGFydEEgPCBsZW5ndGhBKSB7XG4gICAgICAgIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChudW1TdGFydEEpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGNoYXJDb2RlQiA9PT0gNDggJiYgKytudW1TdGFydEIgPCBsZW5ndGhCKSB7XG4gICAgICAgIGNoYXJDb2RlQiA9IGIuY2hhckNvZGVBdChudW1TdGFydEIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtRW5kQSA9IG51bVN0YXJ0QTtcbiAgICAgIHZhciBudW1FbmRCID0gbnVtU3RhcnRCO1xuXG4gICAgICB3aGlsZSAobnVtRW5kQSA8IGxlbmd0aEEgJiYgaXNOdW1iZXJDb2RlKGEuY2hhckNvZGVBdChudW1FbmRBKSkpIHtcbiAgICAgICAgKytudW1FbmRBO1xuICAgICAgfVxuICAgICAgd2hpbGUgKG51bUVuZEIgPCBsZW5ndGhCICYmIGlzTnVtYmVyQ29kZShiLmNoYXJDb2RlQXQobnVtRW5kQikpKSB7XG4gICAgICAgICsrbnVtRW5kQjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpZmZlcmVuY2UgPSBudW1FbmRBIC0gbnVtU3RhcnRBIC0gbnVtRW5kQiArIG51bVN0YXJ0QjsgLy8gbnVtQSBsZW5ndGggLSBudW1CIGxlbmd0aFxuICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChudW1TdGFydEEgPCBudW1FbmRBKSB7XG4gICAgICAgIGRpZmZlcmVuY2UgPSBhLmNoYXJDb2RlQXQobnVtU3RhcnRBKyspIC0gYi5jaGFyQ29kZUF0KG51bVN0YXJ0QisrKTtcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhSW5kZXggPSBudW1FbmRBO1xuICAgICAgYkluZGV4ID0gbnVtRW5kQjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaGFyQ29kZUEgIT09IGNoYXJDb2RlQikge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFyQ29kZUEgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoICYmXG4gICAgICAgIGNoYXJDb2RlQiA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGggJiZcbiAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUFdICE9PSAtMSAmJlxuICAgICAgICBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQl0gIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVBXSAtIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVCXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoYXJDb2RlQSAtIGNoYXJDb2RlQjtcbiAgICB9XG5cbiAgICArK2FJbmRleDtcbiAgICArK2JJbmRleDtcbiAgfVxuXG4gIHJldHVybiBsZW5ndGhBIC0gbGVuZ3RoQjtcbn1cblxubmF0dXJhbENvbXBhcmUuY2FzZUluc2Vuc2l0aXZlID0gbmF0dXJhbENvbXBhcmUuaSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIG5hdHVyYWxDb21wYXJlKCgnJyArIGEpLnRvTG93ZXJDYXNlKCksICgnJyArIGIpLnRvTG93ZXJDYXNlKCkpO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobmF0dXJhbENvbXBhcmUsIHtcbiAgYWxwaGFiZXQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGFscGhhYmV0O1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgYWxwaGFiZXQgPSB2YWx1ZTtcbiAgICAgIGFscGhhYmV0SW5kZXhNYXAgPSBbXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGlmIChhbHBoYWJldCkge1xuICAgICAgICBmb3IgKDsgaSA8IGFscGhhYmV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYWxwaGFiZXRJbmRleE1hcFthbHBoYWJldC5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFscGhhYmV0SW5kZXhNYXBMZW5ndGggPSBhbHBoYWJldEluZGV4TWFwLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFscGhhYmV0SW5kZXhNYXBbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFscGhhYmV0SW5kZXhNYXBbaV0gPSAtMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXR1cmFsQ29tcGFyZTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJicmVha3BvaW50c1wiIDoge1xuICAgIFwieHNcIjogXCI0ODBweFwiLFxuICAgIFwic21cIjogXCI2MjBweFwiLFxuICAgIFwibWRcIjogXCI3NjBweFwiLFxuICAgIFwibGdcIjogXCI5OTBweFwiLFxuICAgIFwieGxcIjogXCIxMzgwcHhcIlxuICB9XG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS1kaXNtaXNzXScsXG4gICAgdGFyZ2V0OiAnW2RhdGEtZGlzbWlzc2libGVdJyxcbiAgICBjbGFzc1RvZ2dsZTogJ2Rpc21pc3MnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0cmlnZ2VyLmNsb3Nlc3Qoc2V0dGluZ3MudGFyZ2V0KVxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NUb2dnbGUpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIERyYXdlciBwbHVnaW5cbiAqIC0tLVxuICogQSBjb250YWluZXIgY29tcG9uZW50IHRoYXQgc2xpZGVzIGluIGZyb20gdGhlIGxlZnQgb3IgcmlnaHQuIEl0IHR5cGljYWxseVxuICogY29udGFpbnMgbWVudXMsIHNlYXJjaCBvciBvdGhlciBjb250ZW50IGZvciB5b3VyIGFwcC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcblxuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAvLyBDb21wb25lbnQgZWxlbWVudCBjbGFzc2VzXG4gICAgY2xhc3NUYXJnZXQ6ICdkcmF3ZXJfX2l0ZW0nLFxuICAgIGNsYXNzVHJpZ2dlcjogJ2RyYXdlcl9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lcjogJ2RyYXdlcl9fZGlhbG9nJyxcblxuICAgIC8vIENvbXBvbmVudCBlbGVtZW50IHN3aXRjaCBjbGFzc2VzXG4gICAgLy8gVXNlZCB3aXRoIFJlZ0V4cCB0byBzZWFyY2ggYW5kIHJlcGxhY2UgZWxlbWVudCBjbGFzc2VzXG4gICAgY2xhc3NUYXJnZXRTd2l0Y2g6ICdtb2RhbCcsXG4gICAgY2xhc3NUcmlnZ2VyU3dpdGNoOiAnbW9kYWxfX3RyaWdnZXInLFxuICAgIGNsYXNzSW5uZXJTd2l0Y2g6ICdtb2RhbF9fZGlhbG9nJyxcblxuICAgIC8vIFN0YXRlIGFuZCB1dGlsaXR5IGNsYXNzZXNcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgY2xhc3NUcmFuc2l0aW9uTm9uZTogJ3RyYW5zaXRpb25fbm9uZScsXG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0byBzdG9yZSB0aGUgc2F2ZSBzdGF0ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgLy8ge2Jvb2xlYW59IFRoZSBzdHJpbmcgdG8gc2F2ZSBvdXIgc3RhdGUgb2JqZWN0IGFzXG4gICAgc2F2ZVN0YXRlOiB0cnVlLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gZW5hYmxlIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eS4gSWYgZW5hYmxlZCwgYSBzdHJpbmdcbiAgICAvLyBzZWxlY3RvciB0byBjaGVjayBmb3Igc2hvdWxkIGJlIHBhc3NlZC5cbiAgICAvLyB7ZmFsc2V9IHx8IHtzdHJpbmd9IGUuZy4gJ1tkYXRhLWRyYXdlci1zd2l0Y2hdJ1xuICAgIHN3aXRjaDogJ1tkYXRhLWRyYXdlci1zd2l0Y2hdJyxcblxuICAgIC8vIFRoZSBkZWZhdWx0IGJyZWFrIHBvaW50IGZvciB3aGVuIHRvIHN3aXRjaCB0byBkcmF3ZXIgb3IgbW9kYWwgY2xhc3Nlc1xuICAgIC8vIHtzdHJpbmd9IEVpdGhlciBhIGJyZWFrcG9pbnQga2V5IG9yIHBpeGVsIHZhbHVlXG4gICAgc3dpdGNoQnJlYWtwb2ludDogJ2xnJyxcblxuICAgIC8vIER1cmF0aW9uIGJlZm9yZSByZW1vdmluZyB0aGUgdHJhbnNpdGlvbl9ub25lIGNsYXNzIG9uIGluaXRpYWwgbG9hZFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjogNTAwXG4gIH1cblxuICAvLyBXaGVyZSB3ZSBzdG9yZSBhbGwgb3VyIGRyYXdlcnMgYXZhaWxhYmxlIGluIHRoZSBET01cbiAgbGV0IGRyYXdlcnMgPSBbXVxuXG4gIC8vIFdoZXJlIHdlIGJ1aWxkIHRoZSBzYXZlIHN0YXRlIG9iamVjdCBiZWZvcmUgd2UgcGFzcyBpdCB0byBsb2NhbCBzdG9yYWdlXG4gIGxldCBkcmF3ZXJTdGF0ZSA9IHt9XG5cbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBzd2l0Y2ggZHJhd2VycyBhdmFpbGFibGUgaW4gdGhlIERPTVxuICBsZXQgc3dpdGNoRHJhd2Vyc1xuXG4gIC8vIFdoZXJlIHdlIHN0b3JlIGFsbCBvdXIgbWVkaWEgcXVlcnkgbGlzdHMgYWxvbmcgd2l0aCB0aGVpciBkcmF3ZXJzXG4gIGxldCBtcWxBcnJheSA9IFtdXG5cbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBtZXRob2QsIHJ1biBhcyBzb29uIGFzIGFuIGluc3RhbmNlIGlzIGNyZWF0ZWRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gQSBqc29uIG9iamVjdCB3aXRoIHlvdXIgY3VzdG9tIHNldHRpbmdzXG4gICAqL1xuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG5cbiAgICAvLyBNZXJnZSB0aGUgZGVmYXVsdHMgYW5kIHBhc3NlZCBvcHRpb25zIGludG8gb3VyIHNldHRpbmdzIG9ialxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcblxuICAgIC8vIEdldCBhbGwgdGhlIGRyYXdlcnMgb24gdGhlIHBhZ2UgYW5kIHNhdmUgdGhlbSB3aXRoIHRoZWlyIGRlZmF1bHQgc3RhdGVcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgICAgLmZvckVhY2goKGRyYXdlcikgPT4ge1xuICAgICAgZHJhd2Vycy5wdXNoKHtcbiAgICAgICAgJ2RyYXdlcic6IGRyYXdlcixcbiAgICAgICAgJ2RlZmF1bHRTdGF0ZSc6IHUuaGFzQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIC8vIEluaXRpYWxpemUgYSBwcm9taXNlIGFuZCBpbml0IHNhdmUgc3RhdGUgaWYgaXQncyBlbmFibGVkXG4gICAgbGV0IHByb21pc2VTYXZlU3RhdGUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgICBpbml0U2F2ZVN0YXRlKHJlc29sdmUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gQWZ0ZXIgcHJvbWlzZSBpcyByZXNvbHZlZCBhbmQgc3dpdGNoIGlzIGVuYWJsZWQsIGluaXRpYWxpemUgc3dpdGNoXG4gICAgcHJvbWlzZVNhdmVTdGF0ZS50aGVuKCgpID0+IHtcbiAgICAgIGlmIChzZXR0aW5ncy5zd2l0Y2gpIHtcbiAgICAgICAgaW5pdFN3aXRjaCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFkZCBvdXIgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWNvbnN0cnVjdG9yIG1ldGhvZCwgdXNlZCB0byByZXNldCBhbmQgZGVzdHJveSB0aGUgZHJhd2VyIGluc3RhbmNlXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGRlZmF1bHRTdGF0ZSAtIFJldHVybiBkcmF3ZXJzIHRvIHRoZWlyIGRlZmF1bHQgc3RhdGU/XG4gICAqL1xuICBhcGkuZGVzdHJveSA9IChkZWZhdWx0U3RhdGUgPSB0cnVlKSA9PiB7XG5cbiAgICAvLyBEZXN0cm95IG91ciBzd2l0Y2hcbiAgICBkZXN0cm95U3dpdGNoKClcblxuICAgIC8vIERlc3Ryb3kgb3VyIHN0YXRlXG4gICAgc3RhdGVDbGVhcigpXG5cbiAgICAvLyBSZXR1cm4gZHJhd3JzIHRvIHRoZWlyIGRlZmF1bHQgc3RhdGVcbiAgICBpZiAoZGVmYXVsdFN0YXRlKSB7XG4gICAgICBkcmF3ZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKGl0ZW0uZGVmYXVsdFN0YXRlKSB7XG4gICAgICAgICAgdS5hZGRDbGFzcyhpdGVtLmRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdS5yZW1vdmVDbGFzcyhpdGVtLmRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gQ2xlYXIgb3VyIHZhcmlhYmxlc1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRyYXdlcnMgPSBbXVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBvcGVuIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksICdvcGVuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkuY2xvc2UgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnY2xvc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gdG9nZ2xlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkudG9nZ2xlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIG1vZGFsIGludG8gZHJhd2VyXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaFRvRHJhd2VyID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAvLyBVc2UgZGVmYXVsdCBzZWxlY3RvciBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBzZXR0aW5ncy5zd2l0Y2hcblxuICAgIC8vIFF1ZXJ5IG91ciBlbGVtZW50cyB1c2luZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3JcbiAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHN3aXRjaFRvRHJhd2VyKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaFRvTW9kYWwgPSAoc2VsZWN0b3IpID0+IHtcblxuICAgIC8vIFVzZSBkZWZhdWx0IHNlbGVjdG9yIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6IHNldHRpbmdzLnN3aXRjaFxuXG4gICAgLy8gUXVlcnkgb3VyIGVsZW1lbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBzZWxlY3RvclxuICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgc3dpdGNoVG9Nb2RhbChpdGVtKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogU2F2ZSB0aGUgZHJhd2VyIGN1cnJlbnQgZHJhd2VyIHN0YXRlXG4gICAqL1xuICBhcGkuc3RhdGVTYXZlID0gKCkgPT4ge1xuICAgIHN0YXRlU2F2ZSgpXG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIGRyYXdlciBzdGF0ZSBmcm9tIGxvY2FsIHN0b3JhZ2VcbiAgICovXG4gIGFwaS5zdGF0ZUNsZWFyID0gKCkgPT4ge1xuICAgIHN0YXRlQ2xlYXIoKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdG8gY2xvc2UgYSBkcmF3ZXIgb3IgZ3JvdXAgb2YgZHJhd2Vyc1xuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZHJhd2VyIGVsZW1lbnQocykgdG8gY2xvc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlIC0gV2hldGhlciB0byBvcGVuLCBjbG9zZSBvciB0b2dnbGUgdGhlIGRyYXdlcihzKVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgY29uc3QgdG9nZ2xlID0gKGRyYXdlciwgc3RhdGUsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyBDaGVjayBpZiBkcmF3ZXIocykgc2hvdWxkIGJlIG9wZW5lZCwgY2xvc2VkIG9yIHRvZ2dsZWQgYW5kIGVpdGhlciBhZGQgb3JcbiAgICAvLyByZW1vdmUgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgcGFzc2VkIGRyYXdlcihzKVxuICAgIGlmIChzdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICB1LmFkZENsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnRvZ2dsZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfVxuXG4gICAgLy8gU2F2ZSBzdGF0ZSBpZiBmZWF0dXJlIGlzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBzdGF0ZVNhdmUoZHJhd2VyKVxuICAgIH1cblxuICAgIC8vIEZpcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIG9uZSB3YXMgcGFzc2VkXG4gICAgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmIGNhbGxiYWNrKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRvIHRvZ2dsZSBkcmF3ZXIgdmlhIGEgdHJpZ2dlclxuICAgKi9cbiAgY29uc3QgdHJpZ2dlciA9ICgpID0+IHtcblxuICAgIC8vIEdldCB0aGUgY2xvc2VzdCB0cmlnZ2VyIGVsZW1lbnQgZnJvbSB0aGUgY2xpY2sgZXZlbnRcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcblxuICAgIC8vIENoZWNrIHRoYXQgdGhlIGNsYXNzIHRyaWdnZXIgd2FzIGNsaWNrZWRcbiAgICBpZiAodHJpZ2dlcikge1xuXG4gICAgICAvLyBHZXQgdGhlIGRyYXdlciBzZWxlY3RvciBmcm9tIHRoZSB0cmlnZ2VyIHZpYSBbZGF0YS10YXJnZXRdXG4gICAgICBsZXQgZGF0YURyYXdlciA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcblxuICAgICAgLy8gQ2hlY2sgdGhhdCBhIGRyYXdlciB0YXJnZXQgd2FzIGdpdmVuXG4gICAgICBpZiAoZGF0YURyYXdlcikge1xuXG4gICAgICAgIC8vIFF1ZXJ5IHRoZSBkcmF3ZXIgZWxlbWVudCBhbmQgdG9nZ2xlIGl0IGlmIGl0IGV4aXN0c1xuICAgICAgICBsZXQgZHJhd2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkYXRhRHJhd2VyKVxuICAgICAgICBpZiAoZHJhd2VyLmxlbmd0aCkge1xuICAgICAgICAgIHRvZ2dsZShkcmF3ZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGluaXRpYWxpemVzIHRoZSBzYXZlIHN0YXRlIGZ1bmN0aW9uYWxpdHlcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBjb25zdCBpbml0U2F2ZVN0YXRlID0gKGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyBDaGVjayBpZiBhIGRyYXdlciBzdGF0ZSBpcyBhbHJlYWR5IHNhdmVkIGluIGxvY2FsIHN0b3JhZ2UgYW5kIHNhdmUgdGhlXG4gICAgLy8ganNvbiBwYXJzZWQgZGF0YSB0byBvdXIgbG9jYWwgdmFyaWFibGUgaWYgaXQgZG9lc1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyU3RhdGUnKSkge1xuICAgICAgZHJhd2VyU3RhdGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcmF3ZXJTdGF0ZScpKVxuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgZHJhd2Vyc1xuICAgIGRyYXdlcnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICBsZXQgZHJhd2VyID0gaXRlbS5kcmF3ZXJcblxuICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IHN0YXRlIGlmIG9uZSBpcyBub3Qgc2V0XG4gICAgICBpZiAoZHJhd2VyLmlkIGluIGRyYXdlclN0YXRlID09PSBmYWxzZSkge1xuICAgICAgICBzdGF0ZVNhdmUoZHJhd2VyKVxuICAgICAgfVxuXG4gICAgICAvLyBHZXQgb3VyIGRyYXdlciBkaWFsb2cgZWxlbWVudFxuICAgICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuJyArIHNldHRpbmdzLmNsYXNzSW5uZXIpXG5cbiAgICAgIC8vIERpc2FibGVzIHRyYW5zaXRpb25zIGFzIGRlZmF1bHQgc3RhdGVzIGFyZSBiZWluZyBzZXRcbiAgICAgIGxldCB0cmFuc2l0aW9uRGVsYXkgPSAoKSA9PiB7XG4gICAgICAgIGlmIChkaWFsb2cpIHtcbiAgICAgICAgICB1LmFkZENsYXNzKGRpYWxvZywgc2V0dGluZ3MuY2xhc3NUcmFuc2l0aW9uTm9uZSlcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHUucmVtb3ZlQ2xhc3MoZGlhbG9nLCBzZXR0aW5ncy5jbGFzc1RyYW5zaXRpb25Ob25lKVxuICAgICAgICAgIH0sIHNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUb2dnbGUgb3VyIGRyYXdlciBzdGF0ZSBiYXNlZCBvbiB0aGUgc2F2ZWQgc3RhdGVcbiAgICAgIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnY2xvc2UnLCB0cmFuc2l0aW9uRGVsYXkpXG4gICAgICB9IGVsc2UgaWYgKGRyYXdlclN0YXRlW2RyYXdlci5pZF0pIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nLCB0cmFuc2l0aW9uRGVsYXkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEZpcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIG9uZSB3YXMgcGFzc2VkIGFuZCByZXR1cm4gb3VyIHN0YXRlIG9iamVjdFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjayhkcmF3ZXJTdGF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgc2F2ZXMgdGhlIHN0YXRlIG9mIGEgc3BlY2lmaWMgb3IgYWxsIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gaXRlbXMgLSBUaGUgZHJhd2VyIGVsZW1lbnQocykgdG8gc2F2ZSBzdGF0ZVxuICAgKi9cbiAgY29uc3Qgc3RhdGVTYXZlID0gKGl0ZW1zKSA9PiB7XG5cbiAgICAvLyBTYXZlIGFsbCBkcmF3ZXJzIGlmIGFuIGl0ZW1zIGFyZyB3YXNuJ3QgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMpID8gaXRlbXMgOiBkcmF3ZXJzXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIG91ciBkcmF3ZXJzIGFuZCBzYXZlIHRoZWlyIG5ldyBzdGF0ZSB0byBsb2NhbCBzdG9yYWdlXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICBpZiAoaXRlbS5kcmF3ZXIpIHtcbiAgICAgICAgaXRlbSA9IGl0ZW0uZHJhd2VyXG4gICAgICB9XG5cbiAgICAgIC8vIE9ubHkgc2F2ZSBkcmF3ZXIgc3RhdGUgaWYgYW4gaWQgZXhpc3RzXG4gICAgICBpZiAoaXRlbS5pZCkge1xuICAgICAgICBkcmF3ZXJTdGF0ZVtpdGVtLmlkXSA9IHUuaGFzQ2xhc3MoaXRlbSwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcmF3ZXJTdGF0ZScsIEpTT04uc3RyaW5naWZ5KGRyYXdlclN0YXRlKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBjbGVhcnMgdGhlIGRyYXdlciBzdGF0ZVxuICAgKi9cbiAgY29uc3Qgc3RhdGVDbGVhciA9ICgpID0+IHtcbiAgICBkcmF3ZXJTdGF0ZSA9IHt9XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RyYXdlclN0YXRlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgaW5pdGlhbGl6ZXMgdGhlIHN3aXRjaCBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBjb25zdCBpbml0U3dpdGNoID0gKCkgPT4ge1xuXG4gICAgLy8gUXVlcnkgYWxsIHRoZSBkcmF3ZXJzIHdpdGggdGhlIHN3aXRjaCBmZWF0dXJlIGVuYWJsZWRcbiAgICBzd2l0Y2hEcmF3ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZXR0aW5ncy5zd2l0Y2gpXG5cbiAgICAvLyBMb29wIHRocm91Z2ggdGhlIHN3aXRjaCBkcmF3ZXJzXG4gICAgc3dpdGNoRHJhd2Vycy5mb3JFYWNoKChkcmF3ZXIpID0+IHtcblxuICAgICAgLy8gR2V0IHRoZSBsb2NhbCBicmVha3BvaW50IGlmIG9uZSBpcyBzZXRcbiAgICAgIC8vIFJlbW92ZSBicmFja2V0cyBhbmQgdGhlIGludGlhbCBkYXRhIGZsYWdcbiAgICAgIGxldCBjbGVhblNlbGVjdG9yID0gc2V0dGluZ3Muc3dpdGNoXG4gICAgICAgIC5yZXBsYWNlKCdbJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCddJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCdkYXRhLScsICcnKVxuXG4gICAgICAvLyBDb252ZXJ0IHNyaW5nIHRvIGNhbWVsQ2FzZVxuICAgICAgY2xlYW5TZWxlY3RvciA9IGNsZWFuU2VsZWN0b3IucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IHtcbiAgICAgICAgcmV0dXJuIGdbMV0udG9VcHBlckNhc2UoKVxuICAgICAgfSlcblxuICAgICAgLy8gQ2hlY2sgd2hpY2ggYnJlYWtwb2ludCB0byB1c2U6XG4gICAgICAvLyBhKSBUaGUgbG9jYWwgYnAgc2V0IG9uIHRoZSBkcmF3ZXJcbiAgICAgIC8vIGIpIFRoZSBicCBhdmFpbGFibGUgaW4gY29uZmlnIHVzaW5nIGEga2V5XG4gICAgICAvLyBjKSBUaGUgcmF3IHBpeGVsIHZhbHVlIHByb3ZpZGVkIGluIHNldHRpbmdzXG4gICAgICBsZXQgYnAgPSBkcmF3ZXIuZGF0YXNldFtjbGVhblNlbGVjdG9yXVxuICAgICAgaWYgKGJwKSB7XG4gICAgICAgIGJwID0gdS5nZXRCcmVha3BvaW50KGJwKVxuICAgICAgICBpZiAoIWJwKSB7XG4gICAgICAgICAgYnAgPSBkcmF3ZXIuZGF0YXNldFtjbGVhblNlbGVjdG9yXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChzZXR0aW5ncy5zd2l0Y2hCcmVha3BvaW50KVxuICAgICAgICBpZiAoIWJwKSB7XG4gICAgICAgICAgYnAgPSBzZXR0aW5ncy5zd2l0Y2hCcmVha3BvaW50XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTWVkaWEgcXVlcnkgbGlzdGVuZXJcbiAgICAgIGxldCBtcWwgPSB3aW5kb3cubWF0Y2hNZWRpYSggXCIobWluLXdpZHRoOlwiICsgYnAgKyBcIilcIiApXG5cbiAgICAgIC8vIFN3aXRjaCB0byBtb2RhbCBpZiBtZWRpYSBkb2Vzbid0IG1hdGNoICg8IGJwKVxuICAgICAgaWYgKCFtcWwubWF0Y2hlcykge1xuICAgICAgICBzd2l0Y2hUb01vZGFsKGRyYXdlcilcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIG91ciBtZWRpYSBxdWVyeSBsaXN0ZW5lclxuICAgICAgbXFsLmFkZExpc3RlbmVyKHN3aXRjaENoZWNrKVxuXG4gICAgICAvLyBQdXNoIHRoZSBtcWwgdG8gb3VyIGFycmF5IGFsb25nIHdpdGggaXQncyBkcmF3ZXJcbiAgICAgIG1xbEFycmF5LnB1c2goe1xuICAgICAgICAnZHJhd2VyJyA6IGRyYXdlcixcbiAgICAgICAgJ21xbCc6IG1xbFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBkZXN0cm95cyB0aGUgc3dpdGNoIGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIGNvbnN0IGRlc3Ryb3lTd2l0Y2ggPSAoKSA9PiB7XG5cbiAgICAvLyBTd2l0Y2ggYWxsIG1vZGFscyBiYWNrIHRvIHRoZWlyIG9yaWdpbmFsIGRyYXdlciBzdGF0ZVxuICAgIHN3aXRjaERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG4gICAgICBzd2l0Y2hUb0RyYXdlcihkcmF3ZXIpXG4gICAgfSlcblxuICAgIC8vIFJlbW92ZSB0aGUgbWVkaWEgcXVlcnkgbGlzdGVuZXJzXG4gICAgbXFsQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5tcWwucmVtb3ZlTGlzdGVuZXIoc3dpdGNoQ2hlY2spXG4gICAgfSlcblxuICAgIC8vIFJldHVybiBzd2l0Y2ggdmFyaWFibGVzIHRvIHRoZWlyIG9yaWdpbmFsIHN0YXRlXG4gICAgc3dpdGNoRHJhd2VycyA9IG51bGxcbiAgICBtcWxBcnJheSA9IFtdXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGVuIGEgbWVkaWEgcXVlcnkgaGl0cyBhIG1hdGNoIGFuZCBzd2l0Y2hlc1xuICAgKiB0aGUgY29tcG9uZW50IGZyb20gZHJhd2VyIHRvIG1vZGFsIGFzIG5lZWRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbXFsIC0gVGhlIE1lZGlhUXVlcnlMaXN0IG9iamVjdCBmb3IgdGhlIG1lZGlhIHF1ZXJ5XG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGRyYXdlciBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoQ2hlY2sgPSAoKSA9PiB7XG4gICAgbXFsQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0ubXFsLm1hdGNoZXMpIHtcbiAgICAgICAgc3dpdGNoVG9EcmF3ZXIoaXRlbS5kcmF3ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2hUb01vZGFsKGl0ZW0uZHJhd2VyKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHN3aXRjaGVzIGEgbW9kYWwgaW50byBhIGRyYXdlciBjb21wb25lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGVsZW1lbnQgdG8gc3dpdGNoXG4gICAqL1xuICBjb25zdCBzd2l0Y2hUb0RyYXdlciA9IChkcmF3ZXIpID0+IHtcblxuICAgIC8vIEdldCB0aGUgZGlhbG9nIGFuZCB0cmlnZ2VyIGVsZW1lbnRzIHJlbGF0ZWQgdG8gdGhpcyBjb21wb25lbnRcbiAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2cnKVxuICAgIGxldCB0cmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldD1cIiMnICsgZHJhd2VyLmlkICsgJ1wiXScpXG5cbiAgICAvLyBTd2l0Y2ggdGhlIG1vZGFsIGNvbXBvbmVudCB0byBkcmF3ZXJcbiAgICBkcmF3ZXIuY2xhc3NOYW1lID0gZHJhd2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RhcmdldFN3aXRjaCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIClcbiAgICBkaWFsb2cuY2xhc3NOYW1lID0gZGlhbG9nLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc0lubmVyU3dpdGNoLCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzSW5uZXJcbiAgICApXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVHJpZ2dlclN3aXRjaCwgJ2dpJyksXG4gICAgICAgIHNldHRpbmdzLmNsYXNzVHJpZ2dlclxuICAgICAgKVxuICAgIH0pXG5cbiAgICAvLyBPcGVuIG9yIGNsb3NlIGRyYXdlciBiYXNlZCBvbiBzYXZlIHN0YXRlXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgaWYgKGRyYXdlclN0YXRlW2RyYXdlci5pZF0gPT09IGZhbHNlKSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdjbG9zZScpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnb3BlbicpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBzd2l0Y2hlcyBhIGRyYXdlciBpbnRvIGEgbW9kYWwgY29tcG9uZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGRyYXdlciAtIFRoZSBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoVG9Nb2RhbCA9IChkcmF3ZXIpID0+IHtcblxuICAgIC8vIEdldCB0aGUgZGlhbG9nIGFuZCB0cmlnZ2VyIGVsZW1lbnRzIHJlbGF0ZWQgdG8gdGhpcyBjb21wb25lbnRcbiAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2cnKVxuICAgIGxldCB0cmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldD1cIiMnICsgZHJhd2VyLmlkICsgJ1wiXScpXG5cbiAgICAvLyBTd2l0Y2ggdGhlIGRyYXdlciBjb21wb25lbnQgdG8gbW9kYWxcbiAgICBkcmF3ZXIuY2xhc3NOYW1lID0gZHJhd2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RhcmdldCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc1RhcmdldFN3aXRjaFxuICAgIClcbiAgICBkaWFsb2cuY2xhc3NOYW1lID0gZGlhbG9nLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc0lubmVyLCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzSW5uZXJTd2l0Y2hcbiAgICApXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVHJpZ2dlciwgJ2dpJyksXG4gICAgICAgIHNldHRpbmdzLmNsYXNzVHJpZ2dlclN3aXRjaFxuICAgICAgKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZvciBtb2RhbCBzdHlsZXMgYnkgZGVmYXVsdFxuICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIG91ciBjb21wb25lbnQgYW5kIHJldHVybiB0aGUgYXBpXG4gICAqL1xuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbi8qKlxuICogTW9kYWwgcGx1Z2luXG4gKiAtLS1cbiAqIEEgY29tcG9uZW50IGZvciBjaGFuZ2luZyB0aGUgbW9kZSBvZiBhIHBhZ2UgdG8gY29tcGxldGUgYSBjcml0aWNhbCB0YXNrLlxuICogVGhpcyBpcyB1c3VhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgRGlhbG9nIGNvbXBvbmVudCB0byBtYWtlXG4gKiBtb2RhbCBkaWFsb2dzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBjbGFzc1RhcmdldDogJ21vZGFsJyxcbiAgICBjbGFzc1RyaWdnZXI6ICdtb2RhbF9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lcjogJ21vZGFsX19kaWFsb2cnLFxuICAgIGNsYXNzQWN0aXZlOiAnaXMtYWN0aXZlJyxcbiAgICBmb2N1czogJ1tkYXRhLWZvY3VzXSdcbiAgfVxuXG4gIGxldCBtZW1vcnlUcmlnZ2VyXG4gIGxldCBtZW1vcnlUYXJnZXRcblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICBhcGkuY2xvc2UgPSAoY2xlYXIpID0+IHtcbiAgICBjbG9zZShjbGVhcilcbiAgfVxuXG4gIGNvbnN0IG9wZW4gPSAodGFyZ2V0KSA9PiB7XG4gICAgdS5hZGRDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmICh0YXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQuaXRlbSgwKVxuICAgICAgbGV0IGZvY3VzID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuZm9jdXMpXG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgICAgZm9jdXMuZm9jdXMoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldC5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xvc2UgPSAoY2xlYXIgPSBmYWxzZSkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgIHUucmVtb3ZlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAoY2xlYXIgPT0gZmFsc2UgJiYgbWVtb3J5VHJpZ2dlciAmJiBtZW1vcnlUYXJnZXQpIHtcbiAgICAgIGlmIChtZW1vcnlUYXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IG1lbW9yeVRhcmdldC5pdGVtKDApXG4gICAgICAgIG1lbW9yeVRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICAgIGlmIChtZW1vcnlUcmlnZ2VyKSB7XG4gICAgICAgICAgICBtZW1vcnlUcmlnZ2VyLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNsZWFyID09IHRydWUpIHtcbiAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZXNjYXBlID0gKCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldClcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgaW5uZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0lubmVyKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBjbG9zZSgpXG4gICAgICBsZXQgdGFyZ2V0RGF0YSA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcbiAgICAgIGlmICh0YXJnZXREYXRhKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0RGF0YSlcbiAgICAgICAgbWVtb3J5VHJpZ2dlciA9IHRyaWdnZXJcbiAgICAgICAgb3BlbihtZW1vcnlUYXJnZXQpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgIWlubmVyKSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtdG9nZ2xlLWNsYXNzXScsXG4gICAgdGFyZ2V0czogJycsXG4gICAgY2xhc3M6ICcnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcblxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcblxuICAgIGlmICh0cmlnZ2VyKSB7XG5cbiAgICAgIGxldCB0YXJnZXRzXG5cbiAgICAgIGlmIChzZXR0aW5ncy50YXJnZXRzKSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnRhcmdldHMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlVGFyZ2V0KVxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0dGluZ3MuY2xhc3MpIHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRyaWdnZXIsIHNldHRpbmdzLmNsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJ1xuXG4vKipcbiAqIFV0aWxpdHlcbiAqIC0tLVxuICogQSBzZXQgb2YgaGVscGVyIG1ldGhvZHMgZm9yIGdlbmVyYWwgamF2YXNjcmlwdCBwbHVnaW4gdXNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgb3V0cHV0IGEgYnJlYWtwb2ludCB1c2luZyBpdCdzIGtleSBmb3VuZCBpbiBjb25maWcuanNvblxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIFRoZSBrZXkgdG8gc2VhcmNoIGZvciBpbiB0aGUgYnJlYWtwb2ludHMgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IC0gVGhlIHBpeGVsIHZhbHVlIG9mIHRoZSBicmVha3BvaW50IGFzIGEgc3RyaW5nXG4gICAqL1xuICBzdGF0aWMgZ2V0QnJlYWtwb2ludChrZXkpIHtcbiAgICByZXR1cm4gY29uZmlnLmJyZWFrcG9pbnRzW2tleV1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIGNoZWNrIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgY2xhc3MgZXhpc3RzLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIHJldHVybiBjLnNvbWUoIGZ1bmN0aW9uIChjKSB7XG4gICAgICBsZXQgaGFzID0gZmFsc2VcbiAgICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoYykpIHtcbiAgICAgICAgICBoYXMgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gaGFzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3Mgb3IgY2xhc3NlcyB0byBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byBhZGQgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGFkZFxuICAgKi9cbiAgc3RhdGljIGFkZENsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgY2xhc3Mgb3IgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIHJlbW92ZSBjbGFzcyhlcykgZnJvbVxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byByZW1vdmVcbiAgICovXG4gIHN0YXRpYyByZW1vdmVDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gdG9nZ2xlIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGNsb3Nlc3QgcGFyZW50IGVsZW1lbnQgYmFzZWQgb24gY2xhc3MuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlXG4gICAqIG5hdGl2ZSAuY2xvc2VzdCgpIG1ldGhvZCBpbiB0aGF0IGl0IGRvZXNuJ3QgY2hlY2sgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50IHRvIHN0YXJ0IHNlYXJjaCBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byBjaGVjayBmb3JcbiAgICogQHJldHVybiB7Tm9kZX0gLSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdChlbCwgYykge1xuICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSAmJiAhdGhpcy5oYXNDbGFzcyhlbCwgYykpXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBzdHJpbmcgb3Igb2JqZWN0IHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3NcbiAgICogcmV0dXJuZWQgYXMgaXMuIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIFN0cmluZyBvciBvYmplY3QgdG8gY29udmVydCB0byBhbiBhcnJheVxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBSZXR1cm4gdGhlIGNvbnZlcnRlZCBhcnJheVxuICAgKi9cbiAgc3RhdGljIHRvQXJyYXkoaXRlbSkge1xuXG4gICAgbGV0IGFycmF5ID0gW11cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBhcnJheSA9IGl0ZW1cbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkucHVzaChpdGVtKVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LiBTZXQgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIHRvIGB0cnVlYCBmb3IgYSBkZWVwIG9yIHJlY3Vyc2l2ZSBtZXJnZS5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW09wdGlvbmFsXSAtIElmIHRydWUsIGRvIGEgZGVlcCAob3IgcmVjdXJzaXZlKSBtZXJnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gLSBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlcjsgZWFjaCBvdmVycmlkaW5nIHRoZSBuZXh0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IC0gTWVyZ2VkIHZhbHVlcyBvZiBkZWZhdWx0cyBhbmQgb3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgIGxldCBleHRlbmRlZCA9IHt9XG4gICAgbGV0IGRlZXAgPSBmYWxzZVxuICAgIGxldCBpID0gMFxuICAgIGxldCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG5cbiAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcbiAgICAgIGRlZXAgPSBhcmd1bWVudHNbMF1cbiAgICAgIGkrK1xuICAgIH1cblxuICAgIGxldCBtZXJnZSA9ICggb2JqICkgPT4ge1xuICAgICAgZm9yICggbGV0IHByb3AgaW4gb2JqICkge1xuICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqLCBwcm9wICkgKSB7XG4gICAgICAgICAgaWYgKCBkZWVwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbcHJvcF0pID09PSAnW29iamVjdCBPYmplY3RdJyApIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgIGxldCBvYmogPSBhcmd1bWVudHNbaV1cbiAgICAgIG1lcmdlKG9iailcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kZWRcbiAgfVxuXG59XG4iXX0=

//# sourceMappingURL=scripts.js.map
