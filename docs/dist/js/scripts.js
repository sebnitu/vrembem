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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9jb25maWcuanNvbiIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9kcmF3ZXIuanMiLCIuLi9zcmMvanMvbW9kYWwuanMiLCIuLi9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vc3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBSixFQUFwQjtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUNBLElBQU0sS0FBSyxHQUFHLElBQUksaUJBQUosRUFBZDtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUVBOzs7O0FBSUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQVc7QUFFNUM7QUFDQSxNQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBcEIsQ0FINEMsQ0FLNUM7O0FBQ0EsTUFBSSxPQUFPLENBQUMsT0FBUixDQUFnQixNQUFwQixFQUE0QjtBQUMxQjtBQUNBLFFBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFSLENBQWdCLE1BQTdCLENBRjBCLENBSTFCO0FBRUE7O0FBQ0EsUUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxHQUFmLENBQWxCO0FBQ0EsUUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxHQUFmLENBQWxCO0FBQ0EsUUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFmLENBQXRCO0FBQ0EsUUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBZSxJQUFmLEVBQXFCLGVBQWUsR0FBRyxDQUF2QyxDQUFwQixDQVYwQixDQVkxQjs7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QUUsR0FBRixFQUFXO0FBQ3JCLGFBQU0sSUFBSSxJQUFWLElBQWtCLEdBQWxCLEVBQXdCO0FBQ3RCLGNBQUssTUFBTSxDQUFDLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBc0MsR0FBdEMsRUFBMkMsSUFBM0MsQ0FBTCxFQUF5RDtBQUN2RCxnQkFBSyxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBK0IsR0FBRyxDQUFDLElBQUQsQ0FBbEMsTUFBOEMsaUJBQTNELEVBQStFO0FBQzdFLGNBQUEsUUFBUSxDQUFDLElBQUQsQ0FBUixHQUFpQixNQUFNLENBQUUsSUFBRixFQUFRLFFBQVEsQ0FBQyxJQUFELENBQWhCLEVBQXdCLEdBQUcsQ0FBQyxJQUFELENBQTNCLENBQXZCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsY0FBQSxRQUFRLENBQUMsSUFBRCxDQUFSLEdBQWlCLEdBQUcsQ0FBQyxJQUFELENBQXBCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsT0FWRDs7QUFZQSxhQUFRLENBQUMsR0FBRyxNQUFaLEVBQW9CLENBQUMsRUFBckIsRUFBMEI7QUFDeEIsWUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUQsQ0FBbkI7QUFDQSxRQUFBLEtBQUssQ0FBQyxHQUFELENBQUw7QUFDRDs7QUFFRCxhQUFPLFFBQVA7QUFDRCxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHUgZnJvbSAndXRpbGl0eSdcbmltcG9ydCBEaXNtaXNzaWJsZSBmcm9tICdkaXNtaXNzaWJsZSdcbmltcG9ydCBEcmF3ZXIgZnJvbSAnZHJhd2VyJ1xuaW1wb3J0IE1vZGFsIGZyb20gJ21vZGFsJ1xuaW1wb3J0IFRvZ2dsZSBmcm9tICd0b2dnbGUnXG5pbXBvcnQgbGlzdGpzIGZyb20gJ2xpc3QuanMnXG5cbmNvbnN0IGRpc21pc3NpYmxlID0gbmV3IERpc21pc3NpYmxlKClcbmNvbnN0IGRyYXdlciA9IG5ldyBEcmF3ZXIoKVxuY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoKVxuY29uc3QgdG9nZ2xlID0gbmV3IFRvZ2dsZSgpXG5cbi8qKlxuICogR2VuZXJhbCBldmVudCB0cmlnZ2VyIGZvciB0ZXN0aW5nXG4gKi9cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuICAvLyBHZXQgdGhlIGVsZW1lbnQgdGhhdCB0cmlnZ2VyZWQgdGhlIGV2ZW50XG4gIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0XG5cbiAgLy8gUnVuIHRoZSBzY3JpcHQgaWYgaXQgZXhpc3RzIGFzIGEgZGF0YSBhdHRyaWJ1dGVcbiAgaWYgKHRyaWdnZXIuZGF0YXNldC5zY3JpcHQpIHtcbiAgICAvLyBHZXQgb3VyIHNjcmlwdCBzdHJpbmcgZm9yIHByb2Nlc3NpbmdcbiAgICBsZXQgc3RyaW5nID0gdHJpZ2dlci5kYXRhc2V0LnNjcmlwdFxuICAgIFxuICAgIC8vIGNvbnNvbGUubG9nKCdSdW46ICcsIHN0cmluZylcblxuICAgIC8vIEdldCBpbmRleGVzIG9mIHN0cmluZ1xuICAgIGxldCBpbmRleE9iamVjdCA9IHN0cmluZy5pbmRleE9mKCcuJylcbiAgICBsZXQgaW5kZXhNZXRob2QgPSBzdHJpbmcuaW5kZXhPZignKCcpXG4gICAgbGV0IGluZGV4UGFyYW1TdGFydCA9IHN0cmluZy5pbmRleE9mKCdcXCcnKVxuICAgIGxldCBpbmRleFBhcmFtRW5kID0gc3RyaW5nLmluZGV4T2YoJ1xcJycsIGluZGV4UGFyYW1TdGFydCArIDEpXG5cbiAgICAvLyBHZXQgdGhlIG9iamVjdCwgbWV0aG9kIGFuZCBpZiBwYXJhbXMgYXJlIHBhc3NlZFxuICAgIGxldCBvYmogPSBzdHJpbmcuc3Vic3RyaW5nKDAsIGluZGV4T2JqZWN0KVxuICAgIGxldCBtZXRob2QgPSBzdHJpbmcuc3Vic3RyaW5nKGluZGV4T2JqZWN0ICsgMSwgaW5kZXhNZXRob2QpXG4gICAgbGV0IHBhcmFtcyA9IHN0cmluZy5zdWJzdHJpbmcoaW5kZXhQYXJhbVN0YXJ0ICsgMSwgaW5kZXhQYXJhbUVuZClcblxuICAgIC8vIGNvbnNvbGUubG9nKCdPYmo6ICcsIG9iailcbiAgICAvLyBjb25zb2xlLmxvZygnTWV0aG9kOiAnLCBtZXRob2QpXG4gICAgLy8gY29uc29sZS5sb2coJ1BhcmFtczogJywgcGFyYW1zKVxuXG4gICAgLy8gUnVuIG91ciBkYXRhIHNjcmlwdFxuICAgIGlmIChvYmogPT09ICdkcmF3ZXInKSB7XG4gICAgICBkcmF3ZXJbbWV0aG9kXShwYXJhbXMpXG4gICAgfVxuICB9XG5cbn0pXG5cbi8qKlxuICogTGlzdC5qc1xuICogLS0tXG4gKiBBZGRzIGxpc3QgZnVuY3Rpb25hbGl0eSBhbG9uZyB3aXRoIHNlYXJjaC5cbiAqIGxpc3QuanMgZG9jczogaHR0cDovL2xpc3Rqcy5jb20vXG4gKi9cbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdGpzJykpIHtcblxuICAvLyBJbml0IG91ciBsaXN0LmpzIGNvbXBvbmVudFxuICBjb25zdCBsaXN0ID0gbmV3IGxpc3RqcygnbGlzdGpzJywge1xuICAgIGZ1enp5U2VhcmNoOiB7XG4gICAgICBzZWFyY2hDbGFzczogJ3NlYXJjaCcsXG4gICAgICBsb2NhdGlvbjogMCxcbiAgICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgICB0aHJlc2hvbGQ6IDAuNCxcbiAgICAgIG11bHRpU2VhcmNoOiB0cnVlXG4gICAgfSxcbiAgICB2YWx1ZU5hbWVzOiBbXG4gICAgICAnbmFtZScsXG4gICAgICB7IGRhdGE6IFsnY2F0ZWdvcnknXSB9XG4gICAgXSxcbiAgICBsaXN0Q2xhc3M6ICdtZW51J1xuICB9KVxuXG4gIC8vIEVtcHR5IE5vdGljZVxuICAvLyBEaXNwbGF5ZWQgd2hlbiB0aGUgc2VhcmNoIHJldHVybnMgbm8gcmVzdWx0c1xuICBsZXQgbm90aWNlX2VtcHR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGljZV9lbXB0eScpXG4gIGxldCBub3RpY2VfZW1wdHlfdGV4dCA9IG5vdGljZV9lbXB0eS5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX3RleHQnKVxuXG4gIC8vIENsZWFyIHNlYXJjaCBidXR0b25cbiAgbGV0IGZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXInKVxuICBsZXQgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlciAuc2VhcmNoJylcbiAgbGV0IHNlYXJjaF9jbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIgLnNlYXJjaF9jbGVhcicpXG5cbiAgLy8gT24gc2VhcmNoIGNvbXBsZXRlIGNhbGxiYWNrXG4gIGxpc3Qub24oJ3NlYXJjaENvbXBsZXRlJywgKCkgPT4ge1xuXG4gICAgLy8gVXBkYXRlIHRoZSBzZWFyY2ggdGV4dCBpbiBlbXB0eSBub3RpY2VcbiAgICBsZXQgdmFsdWUgPSBzZWFyY2gudmFsdWVcbiAgICBub3RpY2VfZW1wdHlfdGV4dC5pbm5lckhUTUwgPSB2YWx1ZVxuXG4gICAgLy8gU2hvdyBjbGVhciBzZWFyY2ggYnV0dG9uIGlmIGEgdmFsdWUgdGhlcmUgaXMgc29tZXRoaW5nIGluIHNlYXJjaFxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdS5hZGRDbGFzcyhmaWx0ZXIsICdpcy1hY3RpdmUnKVxuICAgICAgdS5hZGRDbGFzcyhzZWFyY2gsICdpcy1hY3RpdmUnKVxuICAgICAgdS5yZW1vdmVDbGFzcyhzZWFyY2hfY2xlYXIsICdkX25vbmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnJlbW92ZUNsYXNzKGZpbHRlciwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LnJlbW92ZUNsYXNzKHNlYXJjaCwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LmFkZENsYXNzKHNlYXJjaF9jbGVhciwgJ2Rfbm9uZScpXG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlIG5vdGljZSBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZiB2aXNpYmxlIGl0ZW1zXG4gICAgaWYgKGxpc3QudmlzaWJsZUl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHUuYWRkQ2xhc3Mobm90aWNlX2VtcHR5LCAnZF9ub25lJylcbiAgICB9IGVsc2Uge1xuICAgICAgdS5yZW1vdmVDbGFzcyhub3RpY2VfZW1wdHksICdkX25vbmUnKVxuICAgIH1cbiAgfSlcblxuICAvLyBDbGljayBldmVudHMgZm9yIGNhdGVnb3J5IGFuZCBjbGVhcnNcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXJfc2VhcmNoX2NsZWFyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zZWFyY2hfY2xlYXInKVxuICAgIGxldCB0cmlnZ2VyX3NlYXJjaF9jYXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmNhdGVnb3J5JylcblxuICAgIGlmICh0cmlnZ2VyX3NlYXJjaF9jbGVhcikge1xuICAgICAgc2VhcmNoLnZhbHVlID0gJydcbiAgICAgIGxpc3Quc2VhcmNoKClcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAodHJpZ2dlcl9zZWFyY2hfY2F0KSB7XG4gICAgICBzZWFyY2gudmFsdWUgPSB0cmlnZ2VyX3NlYXJjaF9jYXQuZGF0YXNldC5jYXRlZ29yeVxuICAgICAgbGlzdC5zZWFyY2goc2VhcmNoLnZhbHVlKVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICB9LCBmYWxzZSlcblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBhZGRBc3luYyA9IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2ssIGl0ZW1zKSB7XG4gICAgdmFyIHZhbHVlc1RvQWRkID0gdmFsdWVzLnNwbGljZSgwLCA1MCk7XG4gICAgaXRlbXMgPSBpdGVtcyB8fCBbXTtcbiAgICBpdGVtcyA9IGl0ZW1zLmNvbmNhdChsaXN0LmFkZCh2YWx1ZXNUb0FkZCkpO1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYWRkQXN5bmModmFsdWVzLCBjYWxsYmFjaywgaXRlbXMpO1xuICAgICAgfSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QudXBkYXRlKCk7XG4gICAgICBjYWxsYmFjayhpdGVtcyk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gYWRkQXN5bmM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgLy8gQWRkIGhhbmRsZXJzXG4gIGxpc3QuaGFuZGxlcnMuZmlsdGVyU3RhcnQgPSBsaXN0LmhhbmRsZXJzLmZpbHRlclN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLmZpbHRlckNvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5maWx0ZXJDb21wbGV0ZSB8fCBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24oZmlsdGVyRnVuY3Rpb24pIHtcbiAgICBsaXN0LnRyaWdnZXIoJ2ZpbHRlclN0YXJ0Jyk7XG4gICAgbGlzdC5pID0gMTsgLy8gUmVzZXQgcGFnaW5nXG4gICAgbGlzdC5yZXNldC5maWx0ZXIoKTtcbiAgICBpZiAoZmlsdGVyRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGlzdC5maWx0ZXJlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LmZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHZhciBpcyA9IGxpc3QuaXRlbXM7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBpcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gaXNbaV07XG4gICAgICAgIGlmIChmaWx0ZXJGdW5jdGlvbihpdGVtKSkge1xuICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignZmlsdGVyQ29tcGxldGUnKTtcbiAgICByZXR1cm4gbGlzdC52aXNpYmxlSXRlbXM7XG4gIH07XG59O1xuIiwiXG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpLFxuICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tc3RyaW5nJyksXG4gIGdldEJ5Q2xhc3MgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1ieS1jbGFzcycpLFxuICBmdXp6eSA9IHJlcXVpcmUoJy4vdXRpbHMvZnV6enknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgIGxvY2F0aW9uOiAwLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgdGhyZXNob2xkOiAwLjQsXG4gICAgbXVsdGlTZWFyY2g6IHRydWUsXG4gICAgc2VhcmNoQ2xhc3M6ICdmdXp6eS1zZWFyY2gnXG4gIH0sIG9wdGlvbnMpO1xuXG5cblxuICB2YXIgZnV6enlTZWFyY2ggPSB7XG4gICAgc2VhcmNoOiBmdW5jdGlvbihzZWFyY2hTdHJpbmcsIGNvbHVtbnMpIHtcbiAgICAgIC8vIFN1YnN0cmFjdCBhcmd1bWVudHMgZnJvbSB0aGUgc2VhcmNoU3RyaW5nIG9yIHB1dCBzZWFyY2hTdHJpbmcgYXMgb25seSBhcmd1bWVudFxuICAgICAgdmFyIHNlYXJjaEFyZ3VtZW50cyA9IG9wdGlvbnMubXVsdGlTZWFyY2ggPyBzZWFyY2hTdHJpbmcucmVwbGFjZSgvICskLywgJycpLnNwbGl0KC8gKy8pIDogW3NlYXJjaFN0cmluZ107XG5cbiAgICAgIGZvciAodmFyIGsgPSAwLCBrbCA9IGxpc3QuaXRlbXMubGVuZ3RoOyBrIDwga2w7IGsrKykge1xuICAgICAgICBmdXp6eVNlYXJjaC5pdGVtKGxpc3QuaXRlbXNba10sIGNvbHVtbnMsIHNlYXJjaEFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtOiBmdW5jdGlvbihpdGVtLCBjb2x1bW5zLCBzZWFyY2hBcmd1bWVudHMpIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWU7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VhcmNoQXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmb3VuZEFyZ3VtZW50ID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGNvbHVtbnMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGlmIChmdXp6eVNlYXJjaC52YWx1ZXMoaXRlbS52YWx1ZXMoKSwgY29sdW1uc1tqXSwgc2VhcmNoQXJndW1lbnRzW2ldKSkge1xuICAgICAgICAgICAgZm91bmRBcmd1bWVudCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCFmb3VuZEFyZ3VtZW50KSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaXRlbS5mb3VuZCA9IGZvdW5kO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbih2YWx1ZXMsIHZhbHVlLCBzZWFyY2hBcmd1bWVudCkge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIHRleHQgPSB0b1N0cmluZyh2YWx1ZXNbdmFsdWVdKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChmdXp6eSh0ZXh0LCBzZWFyY2hBcmd1bWVudCwgb3B0aW9ucykpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuXG4gIGV2ZW50cy5iaW5kKGdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBvcHRpb25zLnNlYXJjaENsYXNzKSwgJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7IC8vIElFIGhhdmUgc3JjRWxlbWVudFxuICAgIGxpc3Quc2VhcmNoKHRhcmdldC52YWx1ZSwgZnV6enlTZWFyY2guc2VhcmNoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0ciwgY29sdW1ucykge1xuICAgIGxpc3Quc2VhcmNoKHN0ciwgY29sdW1ucywgZnV6enlTZWFyY2guc2VhcmNoKTtcbiAgfTtcbn07XG4iLCJ2YXIgbmF0dXJhbFNvcnQgPSByZXF1aXJlKCdzdHJpbmctbmF0dXJhbC1jb21wYXJlJyksXG4gIGdldEJ5Q2xhc3MgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1ieS1jbGFzcycpLFxuICBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpLFxuICBpbmRleE9mID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC1vZicpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tc3RyaW5nJyksXG4gIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZ2V0QXR0cmlidXRlID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYXR0cmlidXRlJyksXG4gIHRvQXJyYXkgPSByZXF1aXJlKCcuL3V0aWxzL3RvLWFycmF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaWQsIG9wdGlvbnMsIHZhbHVlcykge1xuXG4gIHZhciBzZWxmID0gdGhpcyxcbiAgICBpbml0LFxuICAgIEl0ZW0gPSByZXF1aXJlKCcuL2l0ZW0nKShzZWxmKSxcbiAgICBhZGRBc3luYyA9IHJlcXVpcmUoJy4vYWRkLWFzeW5jJykoc2VsZiksXG4gICAgaW5pdFBhZ2luYXRpb24gPSByZXF1aXJlKCcuL3BhZ2luYXRpb24nKShzZWxmKTtcblxuICBpbml0ID0ge1xuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYubGlzdENsYXNzICAgICAgPSBcImxpc3RcIjtcbiAgICAgIHNlbGYuc2VhcmNoQ2xhc3MgICAgPSBcInNlYXJjaFwiO1xuICAgICAgc2VsZi5zb3J0Q2xhc3MgICAgICA9IFwic29ydFwiO1xuICAgICAgc2VsZi5wYWdlICAgICAgICAgICA9IDEwMDAwO1xuICAgICAgc2VsZi5pICAgICAgICAgICAgICA9IDE7XG4gICAgICBzZWxmLml0ZW1zICAgICAgICAgID0gW107XG4gICAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgICBzZWxmLm1hdGNoaW5nSXRlbXMgID0gW107XG4gICAgICBzZWxmLnNlYXJjaGVkICAgICAgID0gZmFsc2U7XG4gICAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgICBzZWxmLnNlYXJjaENvbHVtbnMgID0gdW5kZWZpbmVkO1xuICAgICAgc2VsZi5oYW5kbGVycyAgICAgICA9IHsgJ3VwZGF0ZWQnOiBbXSB9O1xuICAgICAgc2VsZi52YWx1ZU5hbWVzICAgICA9IFtdO1xuICAgICAgc2VsZi51dGlscyAgICAgICAgICA9IHtcbiAgICAgICAgZ2V0QnlDbGFzczogZ2V0QnlDbGFzcyxcbiAgICAgICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgICAgIGluZGV4T2Y6IGluZGV4T2YsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICB0b1N0cmluZzogdG9TdHJpbmcsXG4gICAgICAgIG5hdHVyYWxTb3J0OiBuYXR1cmFsU29ydCxcbiAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgZ2V0QXR0cmlidXRlOiBnZXRBdHRyaWJ1dGUsXG4gICAgICAgIHRvQXJyYXk6IHRvQXJyYXlcbiAgICAgIH07XG5cbiAgICAgIHNlbGYudXRpbHMuZXh0ZW5kKHNlbGYsIG9wdGlvbnMpO1xuXG4gICAgICBzZWxmLmxpc3RDb250YWluZXIgPSAodHlwZW9mKGlkKSA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIDogaWQ7XG4gICAgICBpZiAoIXNlbGYubGlzdENvbnRhaW5lcikgeyByZXR1cm47IH1cbiAgICAgIHNlbGYubGlzdCAgICAgICA9IGdldEJ5Q2xhc3Moc2VsZi5saXN0Q29udGFpbmVyLCBzZWxmLmxpc3RDbGFzcywgdHJ1ZSk7XG5cbiAgICAgIHNlbGYucGFyc2UgICAgICAgID0gcmVxdWlyZSgnLi9wYXJzZScpKHNlbGYpO1xuICAgICAgc2VsZi50ZW1wbGF0ZXIgICAgPSByZXF1aXJlKCcuL3RlbXBsYXRlcicpKHNlbGYpO1xuICAgICAgc2VsZi5zZWFyY2ggICAgICAgPSByZXF1aXJlKCcuL3NlYXJjaCcpKHNlbGYpO1xuICAgICAgc2VsZi5maWx0ZXIgICAgICAgPSByZXF1aXJlKCcuL2ZpbHRlcicpKHNlbGYpO1xuICAgICAgc2VsZi5zb3J0ICAgICAgICAgPSByZXF1aXJlKCcuL3NvcnQnKShzZWxmKTtcbiAgICAgIHNlbGYuZnV6enlTZWFyY2ggID0gcmVxdWlyZSgnLi9mdXp6eS1zZWFyY2gnKShzZWxmLCBvcHRpb25zLmZ1enp5U2VhcmNoKTtcblxuICAgICAgdGhpcy5oYW5kbGVycygpO1xuICAgICAgdGhpcy5pdGVtcygpO1xuICAgICAgdGhpcy5wYWdpbmF0aW9uKCk7XG5cbiAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfSxcbiAgICBoYW5kbGVyczogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBoYW5kbGVyIGluIHNlbGYuaGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHNlbGZbaGFuZGxlcl0pIHtcbiAgICAgICAgICBzZWxmLm9uKGhhbmRsZXIsIHNlbGZbaGFuZGxlcl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnBhcnNlKHNlbGYubGlzdCk7XG4gICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2VsZi5hZGQodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhZ2luYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICBvcHRpb25zLnBhZ2luYXRpb24gPSBbe31dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb25bMF0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uID0gW29wdGlvbnMucGFnaW5hdGlvbl07XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb3B0aW9ucy5wYWdpbmF0aW9uLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgICBpbml0UGFnaW5hdGlvbihvcHRpb25zLnBhZ2luYXRpb25baV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qXG4gICogUmUtcGFyc2UgdGhlIExpc3QsIHVzZSBpZiBodG1sIGhhdmUgY2hhbmdlZFxuICAqL1xuICB0aGlzLnJlSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICBzZWxmLml0ZW1zICAgICAgICAgID0gW107XG4gICAgc2VsZi52aXNpYmxlSXRlbXMgICA9IFtdO1xuICAgIHNlbGYubWF0Y2hpbmdJdGVtcyAgPSBbXTtcbiAgICBzZWxmLnNlYXJjaGVkICAgICAgID0gZmFsc2U7XG4gICAgc2VsZi5maWx0ZXJlZCAgICAgICA9IGZhbHNlO1xuICAgIHNlbGYucGFyc2Uoc2VsZi5saXN0KTtcbiAgfTtcblxuICB0aGlzLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBqc29uID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBqc29uLnB1c2goc2VsZi5pdGVtc1tpXS52YWx1ZXMoKSk7XG4gICAgfVxuICAgIHJldHVybiBqc29uO1xuICB9O1xuXG5cbiAgLypcbiAgKiBBZGQgb2JqZWN0IHRvIGxpc3RcbiAgKi9cbiAgdGhpcy5hZGQgPSBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBhZGRBc3luYyh2YWx1ZXMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFkZGVkID0gW10sXG4gICAgICBub3RDcmVhdGUgPSBmYWxzZTtcbiAgICBpZiAodmFsdWVzWzBdID09PSB1bmRlZmluZWQpe1xuICAgICAgdmFsdWVzID0gW3ZhbHVlc107XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHZhbHVlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG51bGw7XG4gICAgICBub3RDcmVhdGUgPSAoc2VsZi5pdGVtcy5sZW5ndGggPiBzZWxmLnBhZ2UpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgaXRlbSA9IG5ldyBJdGVtKHZhbHVlc1tpXSwgdW5kZWZpbmVkLCBub3RDcmVhdGUpO1xuICAgICAgc2VsZi5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgYWRkZWQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgc2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gYWRkZWQ7XG4gIH07XG5cblx0dGhpcy5zaG93ID0gZnVuY3Rpb24oaSwgcGFnZSkge1xuXHRcdHRoaXMuaSA9IGk7XG5cdFx0dGhpcy5wYWdlID0gcGFnZTtcblx0XHRzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBzZWxmO1xuXHR9O1xuXG4gIC8qIFJlbW92ZXMgb2JqZWN0IGZyb20gbGlzdC5cbiAgKiBMb29wcyB0aHJvdWdoIHRoZSBsaXN0IGFuZCByZW1vdmVzIG9iamVjdHMgd2hlcmVcbiAgKiBwcm9wZXJ0eSBcInZhbHVlbmFtZVwiID09PSB2YWx1ZVxuICAqL1xuICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKHZhbHVlTmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZm91bmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgaWYgKHNlbGYuaXRlbXNbaV0udmFsdWVzKClbdmFsdWVOYW1lXSA9PSB2YWx1ZSkge1xuICAgICAgICBzZWxmLnRlbXBsYXRlci5yZW1vdmUoc2VsZi5pdGVtc1tpXSwgb3B0aW9ucyk7XG4gICAgICAgIHNlbGYuaXRlbXMuc3BsaWNlKGksMSk7XG4gICAgICAgIGlsLS07XG4gICAgICAgIGktLTtcbiAgICAgICAgZm91bmQrKztcbiAgICAgIH1cbiAgICB9XG4gICAgc2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyogR2V0cyB0aGUgb2JqZWN0cyBpbiB0aGUgbGlzdCB3aGljaFxuICAqIHByb3BlcnR5IFwidmFsdWVOYW1lXCIgPT09IHZhbHVlXG4gICovXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24odmFsdWVOYW1lLCB2YWx1ZSkge1xuICAgIHZhciBtYXRjaGVkSXRlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc2VsZi5pdGVtc1tpXTtcbiAgICAgIGlmIChpdGVtLnZhbHVlcygpW3ZhbHVlTmFtZV0gPT0gdmFsdWUpIHtcbiAgICAgICAgbWF0Y2hlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVkSXRlbXM7XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgc2l6ZSBvZiB0aGUgbGlzdFxuICAqL1xuICB0aGlzLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2VsZi5pdGVtcy5sZW5ndGg7XG4gIH07XG5cbiAgLypcbiAgKiBSZW1vdmVzIGFsbCBpdGVtcyBmcm9tIHRoZSBsaXN0XG4gICovXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICBzZWxmLnRlbXBsYXRlci5jbGVhcigpO1xuICAgIHNlbGYuaXRlbXMgPSBbXTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLm9uID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgc2VsZi5oYW5kbGVyc1tldmVudF0ucHVzaChjYWxsYmFjayk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5vZmYgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgZSA9IHNlbGYuaGFuZGxlcnNbZXZlbnRdO1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoZSwgY2FsbGJhY2spO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBlLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMudHJpZ2dlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGkgPSBzZWxmLmhhbmRsZXJzW2V2ZW50XS5sZW5ndGg7XG4gICAgd2hpbGUoaS0tKSB7XG4gICAgICBzZWxmLmhhbmRsZXJzW2V2ZW50XVtpXShzZWxmKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5yZXNldCA9IHtcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcbiAgICAgICAgaWwgPSBpcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWwtLSkge1xuICAgICAgICBpc1tpbF0uZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG4gICAgc2VhcmNoOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG4gICAgICAgIGlsID0gaXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGlsLS0pIHtcbiAgICAgICAgaXNbaWxdLmZvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuXHRcdFx0aWwgPSBpcy5sZW5ndGg7XG5cbiAgICBzZWxmLnZpc2libGVJdGVtcyA9IFtdO1xuICAgIHNlbGYubWF0Y2hpbmdJdGVtcyA9IFtdO1xuICAgIHNlbGYudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoaXNbaV0ubWF0Y2hpbmcoKSAmJiAoKHNlbGYubWF0Y2hpbmdJdGVtcy5sZW5ndGgrMSkgPj0gc2VsZi5pICYmIHNlbGYudmlzaWJsZUl0ZW1zLmxlbmd0aCA8IHNlbGYucGFnZSkpIHtcbiAgICAgICAgaXNbaV0uc2hvdygpO1xuICAgICAgICBzZWxmLnZpc2libGVJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgfSBlbHNlIGlmIChpc1tpXS5tYXRjaGluZygpKSB7XG4gICAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgICAgaXNbaV0uaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNbaV0uaGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICBpbml0LnN0YXJ0KCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpIHtcbiAgICB2YXIgaXRlbSA9IHRoaXM7XG5cbiAgICB0aGlzLl92YWx1ZXMgPSB7fTtcblxuICAgIHRoaXMuZm91bmQgPSBmYWxzZTsgLy8gU2hvdyBpZiBsaXN0LnNlYXJjaGVkID09IHRydWUgYW5kIHRoaXMuZm91bmQgPT0gdHJ1ZVxuICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTsvLyBTaG93IGlmIGxpc3QuZmlsdGVyZWQgPT0gdHJ1ZSBhbmQgdGhpcy5maWx0ZXJlZCA9PSB0cnVlXG5cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSkge1xuICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobm90Q3JlYXRlKSB7XG4gICAgICAgICAgaXRlbS52YWx1ZXMoaW5pdFZhbHVlcywgbm90Q3JlYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLnZhbHVlcyhpbml0VmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5lbG0gPSBlbGVtZW50O1xuICAgICAgICB2YXIgdmFsdWVzID0gbGlzdC50ZW1wbGF0ZXIuZ2V0KGl0ZW0sIGluaXRWYWx1ZXMpO1xuICAgICAgICBpdGVtLnZhbHVlcyh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnZhbHVlcyA9IGZ1bmN0aW9uKG5ld1ZhbHVlcywgbm90Q3JlYXRlKSB7XG4gICAgICBpZiAobmV3VmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yKHZhciBuYW1lIGluIG5ld1ZhbHVlcykge1xuICAgICAgICAgIGl0ZW0uX3ZhbHVlc1tuYW1lXSA9IG5ld1ZhbHVlc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90Q3JlYXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgbGlzdC50ZW1wbGF0ZXIuc2V0KGl0ZW0sIGl0ZW0udmFsdWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXRlbS5fdmFsdWVzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QudGVtcGxhdGVyLnNob3coaXRlbSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuaGlkZShpdGVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy5tYXRjaGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgKGxpc3QuZmlsdGVyZWQgJiYgbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZvdW5kICYmIGl0ZW0uZmlsdGVyZWQpIHx8XG4gICAgICAgIChsaXN0LmZpbHRlcmVkICYmICFsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZmlsdGVyZWQpIHx8XG4gICAgICAgICghbGlzdC5maWx0ZXJlZCAmJiBsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZm91bmQpIHx8XG4gICAgICAgICghbGlzdC5maWx0ZXJlZCAmJiAhbGlzdC5zZWFyY2hlZClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIHRoaXMudmlzaWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChpdGVtLmVsbSAmJiAoaXRlbS5lbG0ucGFyZW50Tm9kZSA9PSBsaXN0Lmxpc3QpKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgaW5pdChpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpO1xuICB9O1xufTtcbiIsInZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIExpc3QgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciByZWZyZXNoID0gZnVuY3Rpb24ocGFnaW5nTGlzdCwgb3B0aW9ucykge1xuICAgIHZhciBpdGVtLFxuICAgICAgbCA9IGxpc3QubWF0Y2hpbmdJdGVtcy5sZW5ndGgsXG4gICAgICBpbmRleCA9IGxpc3QuaSxcbiAgICAgIHBhZ2UgPSBsaXN0LnBhZ2UsXG4gICAgICBwYWdlcyA9IE1hdGguY2VpbChsIC8gcGFnZSksXG4gICAgICBjdXJyZW50UGFnZSA9IE1hdGguY2VpbCgoaW5kZXggLyBwYWdlKSksXG4gICAgICBpbm5lcldpbmRvdyA9IG9wdGlvbnMuaW5uZXJXaW5kb3cgfHwgMixcbiAgICAgIGxlZnQgPSBvcHRpb25zLmxlZnQgfHwgb3B0aW9ucy5vdXRlcldpbmRvdyB8fCAwLFxuICAgICAgcmlnaHQgPSBvcHRpb25zLnJpZ2h0IHx8IG9wdGlvbnMub3V0ZXJXaW5kb3cgfHwgMDtcblxuICAgIHJpZ2h0ID0gcGFnZXMgLSByaWdodDtcblxuICAgIHBhZ2luZ0xpc3QuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBwYWdlczsgaSsrKSB7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gKGN1cnJlbnRQYWdlID09PSBpKSA/IFwiYWN0aXZlXCIgOiBcIlwiO1xuXG4gICAgICAvL2NvbnNvbGUubG9nKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgKGN1cnJlbnRQYWdlIC0gaW5uZXJXaW5kb3cpLCAoY3VycmVudFBhZ2UgKyBpbm5lcldpbmRvdyksIGNsYXNzTmFtZSk7XG5cbiAgICAgIGlmIChpcy5udW1iZXIoaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykpIHtcbiAgICAgICAgaXRlbSA9IHBhZ2luZ0xpc3QuYWRkKHtcbiAgICAgICAgICBwYWdlOiBpLFxuICAgICAgICAgIGRvdHRlZDogZmFsc2VcbiAgICAgICAgfSlbMF07XG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICBjbGFzc2VzKGl0ZW0uZWxtKS5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRFdmVudChpdGVtLmVsbSwgaSwgcGFnZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzLmRvdHRlZChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBwYWdpbmdMaXN0LnNpemUoKSkpIHtcbiAgICAgICAgaXRlbSA9IHBhZ2luZ0xpc3QuYWRkKHtcbiAgICAgICAgICBwYWdlOiBcIi4uLlwiLFxuICAgICAgICAgIGRvdHRlZDogdHJ1ZVxuICAgICAgICB9KVswXTtcbiAgICAgICAgY2xhc3NlcyhpdGVtLmVsbSkuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBpcyA9IHtcbiAgICBudW1iZXI6IGZ1bmN0aW9uKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgICByZXR1cm4gdGhpcy5sZWZ0KGksIGxlZnQpIHx8IHRoaXMucmlnaHQoaSwgcmlnaHQpIHx8IHRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KTtcbiAgICB9LFxuICAgIGxlZnQ6IGZ1bmN0aW9uKGksIGxlZnQpIHtcbiAgICAgIHJldHVybiAoaSA8PSBsZWZ0KTtcbiAgICB9LFxuICAgIHJpZ2h0OiBmdW5jdGlvbihpLCByaWdodCkge1xuICAgICAgcmV0dXJuIChpID4gcmlnaHQpO1xuICAgIH0sXG4gICAgaW5uZXJXaW5kb3c6IGZ1bmN0aW9uKGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgcmV0dXJuICggaSA+PSAoY3VycmVudFBhZ2UgLSBpbm5lcldpbmRvdykgJiYgaSA8PSAoY3VycmVudFBhZ2UgKyBpbm5lcldpbmRvdykpO1xuICAgIH0sXG4gICAgZG90dGVkOiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmRvdHRlZExlZnQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgfHwgKHRoaXMuZG90dGVkUmlnaHQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSk7XG4gICAgfSxcbiAgICBkb3R0ZWRMZWZ0OiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICByZXR1cm4gKChpID09IChsZWZ0ICsgMSkpICYmICF0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgJiYgIXRoaXMucmlnaHQoaSwgcmlnaHQpKTtcbiAgICB9LFxuICAgIGRvdHRlZFJpZ2h0OiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pIHtcbiAgICAgIGlmIChwYWdpbmdMaXN0Lml0ZW1zW2N1cnJlbnRQYWdlSXRlbS0xXS52YWx1ZXMoKS5kb3R0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICgoaSA9PSAocmlnaHQpKSAmJiAhdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpICYmICF0aGlzLnJpZ2h0KGksIHJpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBhZGRFdmVudCA9IGZ1bmN0aW9uKGVsbSwgaSwgcGFnZSkge1xuICAgICBldmVudHMuYmluZChlbG0sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgIGxpc3Quc2hvdygoaS0xKSpwYWdlICsgMSwgcGFnZSk7XG4gICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIHBhZ2luZ0xpc3QgPSBuZXcgTGlzdChsaXN0Lmxpc3RDb250YWluZXIuaWQsIHtcbiAgICAgIGxpc3RDbGFzczogb3B0aW9ucy5wYWdpbmF0aW9uQ2xhc3MgfHwgJ3BhZ2luYXRpb24nLFxuICAgICAgaXRlbTogXCI8bGk+PGEgY2xhc3M9J3BhZ2UnIGhyZWY9J2phdmFzY3JpcHQ6ZnVuY3Rpb24gWigpe1o9XFxcIlxcXCJ9WigpJz48L2E+PC9saT5cIixcbiAgICAgIHZhbHVlTmFtZXM6IFsncGFnZScsICdkb3R0ZWQnXSxcbiAgICAgIHNlYXJjaENsYXNzOiAncGFnaW5hdGlvbi1zZWFyY2gtdGhhdC1pcy1ub3Qtc3VwcG9zZWQtdG8tZXhpc3QnLFxuICAgICAgc29ydENsYXNzOiAncGFnaW5hdGlvbi1zb3J0LXRoYXQtaXMtbm90LXN1cHBvc2VkLXRvLWV4aXN0J1xuICAgIH0pO1xuXG4gICAgbGlzdC5vbigndXBkYXRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgcmVmcmVzaChwYWdpbmdMaXN0LCBvcHRpb25zKTtcbiAgICB9KTtcbiAgICByZWZyZXNoKHBhZ2luZ0xpc3QsIG9wdGlvbnMpO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciBJdGVtID0gcmVxdWlyZSgnLi9pdGVtJykobGlzdCk7XG5cbiAgdmFyIGdldENoaWxkcmVuID0gZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgdmFyIG5vZGVzID0gcGFyZW50LmNoaWxkTm9kZXMsXG4gICAgICBpdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIC8vIE9ubHkgdGV4dG5vZGVzIGhhdmUgYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgaWYgKG5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpdGVtcy5wdXNoKG5vZGVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9O1xuXG4gIHZhciBwYXJzZSA9IGZ1bmN0aW9uKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcykge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGl0ZW1FbGVtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsaXN0Lml0ZW1zLnB1c2gobmV3IEl0ZW0odmFsdWVOYW1lcywgaXRlbUVsZW1lbnRzW2ldKSk7XG4gICAgfVxuICB9O1xuICB2YXIgcGFyc2VBc3luYyA9IGZ1bmN0aW9uKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcykge1xuICAgIHZhciBpdGVtc1RvSW5kZXggPSBpdGVtRWxlbWVudHMuc3BsaWNlKDAsIDUwKTsgLy8gVE9ETzogSWYgPCAxMDAgaXRlbXMsIHdoYXQgaGFwcGVucyBpbiBJRSBldGM/XG4gICAgcGFyc2UoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICBpZiAoaXRlbUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhcnNlQXN5bmMoaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKTtcbiAgICAgIH0sIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnVwZGF0ZSgpO1xuICAgICAgbGlzdC50cmlnZ2VyKCdwYXJzZUNvbXBsZXRlJyk7XG4gICAgfVxuICB9O1xuXG4gIGxpc3QuaGFuZGxlcnMucGFyc2VDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMucGFyc2VDb21wbGV0ZSB8fCBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zVG9JbmRleCA9IGdldENoaWxkcmVuKGxpc3QubGlzdCksXG4gICAgICB2YWx1ZU5hbWVzID0gbGlzdC52YWx1ZU5hbWVzO1xuXG4gICAgaWYgKGxpc3QuaW5kZXhBc3luYykge1xuICAgICAgcGFyc2VBc3luYyhpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZShpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGl0ZW0sXG4gICAgdGV4dCxcbiAgICBjb2x1bW5zLFxuICAgIHNlYXJjaFN0cmluZyxcbiAgICBjdXN0b21TZWFyY2g7XG5cbiAgdmFyIHByZXBhcmUgPSB7XG4gICAgcmVzZXRMaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QuaSA9IDE7XG4gICAgICBsaXN0LnRlbXBsYXRlci5jbGVhcigpO1xuICAgICAgY3VzdG9tU2VhcmNoID0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgc2V0T3B0aW9uczogZnVuY3Rpb24oYXJncykge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID09IDIgJiYgYXJnc1sxXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGNvbHVtbnMgPSBhcmdzWzFdO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAyICYmIHR5cGVvZihhcmdzWzFdKSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgY3VzdG9tU2VhcmNoID0gYXJnc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMykge1xuICAgICAgICBjb2x1bW5zID0gYXJnc1sxXTtcbiAgICAgICAgY3VzdG9tU2VhcmNoID0gYXJnc1syXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRDb2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChsaXN0Lml0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgaWYgKGNvbHVtbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5zID0gKGxpc3Quc2VhcmNoQ29sdW1ucyA9PT0gdW5kZWZpbmVkKSA/IHByZXBhcmUudG9BcnJheShsaXN0Lml0ZW1zWzBdLnZhbHVlcygpKSA6IGxpc3Quc2VhcmNoQ29sdW1ucztcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFNlYXJjaFN0cmluZzogZnVuY3Rpb24ocykge1xuICAgICAgcyA9IGxpc3QudXRpbHMudG9TdHJpbmcocykudG9Mb3dlckNhc2UoKTtcbiAgICAgIHMgPSBzLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXS9nLCBcIlxcXFwkJlwiKTsgLy8gRXNjYXBlIHJlZ3VsYXIgZXhwcmVzc2lvbiBjaGFyYWN0ZXJzXG4gICAgICBzZWFyY2hTdHJpbmcgPSBzO1xuICAgIH0sXG4gICAgdG9BcnJheTogZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgdG1wQ29sdW1uID0gW107XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHZhbHVlcykge1xuICAgICAgICB0bXBDb2x1bW4ucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0bXBDb2x1bW47XG4gICAgfVxuICB9O1xuICB2YXIgc2VhcmNoID0ge1xuICAgIGxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgayA9IDAsIGtsID0gbGlzdC5pdGVtcy5sZW5ndGg7IGsgPCBrbDsgaysrKSB7XG4gICAgICAgIHNlYXJjaC5pdGVtKGxpc3QuaXRlbXNba10pO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbTogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaXRlbS5mb3VuZCA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gY29sdW1ucy5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgIGlmIChzZWFyY2gudmFsdWVzKGl0ZW0udmFsdWVzKCksIGNvbHVtbnNbal0pKSB7XG4gICAgICAgICAgaXRlbS5mb3VuZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKHZhbHVlcywgY29sdW1uKSB7XG4gICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KGNvbHVtbikpIHtcbiAgICAgICAgdGV4dCA9IGxpc3QudXRpbHMudG9TdHJpbmcodmFsdWVzW2NvbHVtbl0pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICgoc2VhcmNoU3RyaW5nICE9PSBcIlwiKSAmJiAodGV4dC5zZWFyY2goc2VhcmNoU3RyaW5nKSA+IC0xKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnJlc2V0LnNlYXJjaCgpO1xuICAgICAgbGlzdC5zZWFyY2hlZCA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICB2YXIgc2VhcmNoTWV0aG9kID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdzZWFyY2hTdGFydCcpO1xuXG4gICAgcHJlcGFyZS5yZXNldExpc3QoKTtcbiAgICBwcmVwYXJlLnNldFNlYXJjaFN0cmluZyhzdHIpO1xuICAgIHByZXBhcmUuc2V0T3B0aW9ucyhhcmd1bWVudHMpOyAvLyBzdHIsIGNvbHN8c2VhcmNoRnVuY3Rpb24sIHNlYXJjaEZ1bmN0aW9uXG4gICAgcHJlcGFyZS5zZXRDb2x1bW5zKCk7XG5cbiAgICBpZiAoc2VhcmNoU3RyaW5nID09PSBcIlwiICkge1xuICAgICAgc2VhcmNoLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc2VhcmNoZWQgPSB0cnVlO1xuICAgICAgaWYgKGN1c3RvbVNlYXJjaCkge1xuICAgICAgICBjdXN0b21TZWFyY2goc2VhcmNoU3RyaW5nLCBjb2x1bW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaC5saXN0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ3NlYXJjaENvbXBsZXRlJyk7XG4gICAgcmV0dXJuIGxpc3QudmlzaWJsZUl0ZW1zO1xuICB9O1xuXG4gIGxpc3QuaGFuZGxlcnMuc2VhcmNoU3RhcnQgPSBsaXN0LmhhbmRsZXJzLnNlYXJjaFN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLnNlYXJjaENvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5zZWFyY2hDb21wbGV0ZSB8fCBbXTtcblxuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc2VhcmNoQ2xhc3MpLCAna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCwgLy8gSUUgaGF2ZSBzcmNFbGVtZW50XG4gICAgICBhbHJlYWR5Q2xlYXJlZCA9ICh0YXJnZXQudmFsdWUgPT09IFwiXCIgJiYgIWxpc3Quc2VhcmNoZWQpO1xuICAgIGlmICghYWxyZWFkeUNsZWFyZWQpIHsgLy8gSWYgb25pbnB1dCBhbHJlYWR5IGhhdmUgcmVzZXR0ZWQgdGhlIGxpc3QsIGRvIG5vdGhpbmdcbiAgICAgIHNlYXJjaE1ldGhvZCh0YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVXNlZCB0byBkZXRlY3QgY2xpY2sgb24gSFRNTDUgY2xlYXIgYnV0dG9uXG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQobGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zZWFyY2hDbGFzcyksICdpbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGlmICh0YXJnZXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIHNlYXJjaE1ldGhvZCgnJyk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2VhcmNoTWV0aG9kO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciBidXR0b25zID0ge1xuICAgIGVsczogdW5kZWZpbmVkLFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGJ1dHRvbnMuZWxzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ1dHRvbnMuZWxzW2ldKS5yZW1vdmUoJ2FzYycpO1xuICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnV0dG9ucy5lbHNbaV0pLnJlbW92ZSgnZGVzYycpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0T3JkZXI6IGZ1bmN0aW9uKGJ0bikge1xuICAgICAgdmFyIHByZWRlZmluZWRPcmRlciA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtb3JkZXInKTtcbiAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gXCJhc2NcIiB8fCBwcmVkZWZpbmVkT3JkZXIgPT0gXCJkZXNjXCIpIHtcbiAgICAgICAgcmV0dXJuIHByZWRlZmluZWRPcmRlcjtcbiAgICAgIH0gZWxzZSBpZiAobGlzdC51dGlscy5jbGFzc2VzKGJ0bikuaGFzKCdkZXNjJykpIHtcbiAgICAgICAgcmV0dXJuIFwiYXNjXCI7XG4gICAgICB9IGVsc2UgaWYgKGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmhhcygnYXNjJykpIHtcbiAgICAgICAgcmV0dXJuIFwiZGVzY1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiYXNjXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRJblNlbnNpdGl2ZTogZnVuY3Rpb24oYnRuLCBvcHRpb25zKSB7XG4gICAgICB2YXIgaW5zZW5zaXRpdmUgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLWluc2Vuc2l0aXZlJyk7XG4gICAgICBpZiAoaW5zZW5zaXRpdmUgPT09IFwiZmFsc2VcIikge1xuICAgICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldE9yZGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBidXR0b25zLmVscy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIHZhciBidG4gPSBidXR0b25zLmVsc1tpXTtcbiAgICAgICAgaWYgKGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtc29ydCcpICE9PSBvcHRpb25zLnZhbHVlTmFtZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmVkZWZpbmVkT3JkZXIgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLW9yZGVyJyk7XG4gICAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gXCJhc2NcIiB8fCBwcmVkZWZpbmVkT3JkZXIgPT0gXCJkZXNjXCIpIHtcbiAgICAgICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IG9wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmFkZChvcHRpb25zLm9yZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ0bikuYWRkKG9wdGlvbnMub3JkZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBzb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdzb3J0U3RhcnQnKTtcbiAgICB2YXIgb3B0aW9ucyA9IHt9O1xuXG4gICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXS5jdXJyZW50VGFyZ2V0IHx8IGFyZ3VtZW50c1swXS5zcmNFbGVtZW50IHx8IHVuZGVmaW5lZDtcblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIG9wdGlvbnMudmFsdWVOYW1lID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUodGFyZ2V0LCAnZGF0YS1zb3J0Jyk7XG4gICAgICBidXR0b25zLmdldEluU2Vuc2l0aXZlKHRhcmdldCwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLm9yZGVyID0gYnV0dG9ucy5nZXRPcmRlcih0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zID0gYXJndW1lbnRzWzFdIHx8IG9wdGlvbnM7XG4gICAgICBvcHRpb25zLnZhbHVlTmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIG9wdGlvbnMub3JkZXIgPSBvcHRpb25zLm9yZGVyIHx8IFwiYXNjXCI7XG4gICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gKHR5cGVvZiBvcHRpb25zLmluc2Vuc2l0aXZlID09IFwidW5kZWZpbmVkXCIpID8gdHJ1ZSA6IG9wdGlvbnMuaW5zZW5zaXRpdmU7XG4gICAgfVxuXG4gICAgYnV0dG9ucy5jbGVhcigpO1xuICAgIGJ1dHRvbnMuc2V0T3JkZXIob3B0aW9ucyk7XG5cblxuICAgIC8vIGNhc2VJbnNlbnNpdGl2ZVxuICAgIC8vIGFscGhhYmV0XG4gICAgdmFyIGN1c3RvbVNvcnRGdW5jdGlvbiA9IChvcHRpb25zLnNvcnRGdW5jdGlvbiB8fCBsaXN0LnNvcnRGdW5jdGlvbiB8fCBudWxsKSxcbiAgICAgICAgbXVsdGkgPSAoKG9wdGlvbnMub3JkZXIgPT09ICdkZXNjJykgPyAtMSA6IDEpLFxuICAgICAgICBzb3J0RnVuY3Rpb247XG5cbiAgICBpZiAoY3VzdG9tU29ydEZ1bmN0aW9uKSB7XG4gICAgICBzb3J0RnVuY3Rpb24gPSBmdW5jdGlvbihpdGVtQSwgaXRlbUIpIHtcbiAgICAgICAgcmV0dXJuIGN1c3RvbVNvcnRGdW5jdGlvbihpdGVtQSwgaXRlbUIsIG9wdGlvbnMpICogbXVsdGk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzb3J0RnVuY3Rpb24gPSBmdW5jdGlvbihpdGVtQSwgaXRlbUIpIHtcbiAgICAgICAgdmFyIHNvcnQgPSBsaXN0LnV0aWxzLm5hdHVyYWxTb3J0O1xuICAgICAgICBzb3J0LmFscGhhYmV0ID0gbGlzdC5hbHBoYWJldCB8fCBvcHRpb25zLmFscGhhYmV0IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFzb3J0LmFscGhhYmV0ICYmIG9wdGlvbnMuaW5zZW5zaXRpdmUpIHtcbiAgICAgICAgICBzb3J0ID0gbGlzdC51dGlscy5uYXR1cmFsU29ydC5jYXNlSW5zZW5zaXRpdmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvcnQoaXRlbUEudmFsdWVzKClbb3B0aW9ucy52YWx1ZU5hbWVdLCBpdGVtQi52YWx1ZXMoKVtvcHRpb25zLnZhbHVlTmFtZV0pICogbXVsdGk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGxpc3QuaXRlbXMuc29ydChzb3J0RnVuY3Rpb24pO1xuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdzb3J0Q29tcGxldGUnKTtcbiAgfTtcblxuICAvLyBBZGQgaGFuZGxlcnNcbiAgbGlzdC5oYW5kbGVycy5zb3J0U3RhcnQgPSBsaXN0LmhhbmRsZXJzLnNvcnRTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5zb3J0Q29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnNvcnRDb21wbGV0ZSB8fCBbXTtcblxuICBidXR0b25zLmVscyA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc29ydENsYXNzKTtcbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChidXR0b25zLmVscywgJ2NsaWNrJywgc29ydCk7XG4gIGxpc3Qub24oJ3NlYXJjaFN0YXJ0JywgYnV0dG9ucy5jbGVhcik7XG4gIGxpc3Qub24oJ2ZpbHRlclN0YXJ0JywgYnV0dG9ucy5jbGVhcik7XG5cbiAgcmV0dXJuIHNvcnQ7XG59O1xuIiwidmFyIFRlbXBsYXRlciA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGl0ZW1Tb3VyY2UsXG4gICAgdGVtcGxhdGVyID0gdGhpcztcblxuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGl0ZW1Tb3VyY2UgPSB0ZW1wbGF0ZXIuZ2V0SXRlbVNvdXJjZShsaXN0Lml0ZW0pO1xuICAgIGlmIChpdGVtU291cmNlKSB7XG4gICAgICBpdGVtU291cmNlID0gdGVtcGxhdGVyLmNsZWFyU291cmNlSXRlbShpdGVtU291cmNlLCBsaXN0LnZhbHVlTmFtZXMpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmNsZWFyU291cmNlSXRlbSA9IGZ1bmN0aW9uKGVsLCB2YWx1ZU5hbWVzKSB7XG4gICAgZm9yKHZhciBpID0gMCwgaWwgPSB2YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBlbG07XG4gICAgICBpZiAodmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IHZhbHVlTmFtZXNbaV0uZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLScrdmFsdWVOYW1lc1tpXS5kYXRhW2pdLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lc1tpXS5hdHRyICYmIHZhbHVlTmFtZXNbaV0ubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoZWwsIHZhbHVlTmFtZXNbaV0ubmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKHZhbHVlTmFtZXNbaV0uYXR0ciwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhlbCwgdmFsdWVOYW1lc1tpXSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgdGhpcy5nZXRJdGVtU291cmNlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBub2RlcyA9IGxpc3QubGlzdC5jaGlsZE5vZGVzLFxuICAgICAgICBpdGVtcyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBub2Rlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIC8vIE9ubHkgdGV4dG5vZGVzIGhhdmUgYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICBpZiAobm9kZXNbaV0uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoLzx0cltcXHM+XS9nLmV4ZWMoaXRlbSkpIHtcbiAgICAgIHZhciB0Ym9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG4gICAgICB0Ym9keS5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgcmV0dXJuIHRib2R5LmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIGlmIChpdGVtLmluZGV4T2YoXCI8XCIpICE9PSAtMSkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICByZXR1cm4gZGl2LmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaXN0Lml0ZW0pO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xuXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24oaXRlbSwgdmFsdWVOYW1lcykge1xuICAgIHRlbXBsYXRlci5jcmVhdGUoaXRlbSk7XG4gICAgdmFyIHZhbHVlcyA9IHt9O1xuICAgIGZvcih2YXIgaSA9IDAsIGlsID0gdmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgaWYgKHZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSB2YWx1ZU5hbWVzW2ldLmRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldLmRhdGFbal1dID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoaXRlbS5lbG0sICdkYXRhLScrdmFsdWVOYW1lc1tpXS5kYXRhW2pdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWVzW2ldLmF0dHIgJiYgdmFsdWVOYW1lc1tpXS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lc1tpXS5uYW1lLCB0cnVlKTtcbiAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV0ubmFtZV0gPSBlbG0gPyBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShlbG0sIHZhbHVlTmFtZXNbaV0uYXR0cikgOiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWVzW2ldLCB0cnVlKTtcbiAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV1dID0gZWxtID8gZWxtLmlubmVySFRNTCA6IFwiXCI7XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgdGhpcy5zZXQgPSBmdW5jdGlvbihpdGVtLCB2YWx1ZXMpIHtcbiAgICB2YXIgZ2V0VmFsdWVOYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbGlzdC52YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3QudmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBsaXN0LnZhbHVlTmFtZXNbaV0uZGF0YTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBkYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2pdID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG5hbWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdC52YWx1ZU5hbWVzW2ldLmF0dHIgJiYgbGlzdC52YWx1ZU5hbWVzW2ldLm5hbWUgJiYgbGlzdC52YWx1ZU5hbWVzW2ldLm5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBsaXN0LnZhbHVlTmFtZXNbaV07XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdC52YWx1ZU5hbWVzW2ldID09PSBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXRWYWx1ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgdmFyIHZhbHVlTmFtZSA9IGdldFZhbHVlTmFtZShuYW1lKTtcbiAgICAgIGlmICghdmFsdWVOYW1lKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAodmFsdWVOYW1lLmRhdGEpIHtcbiAgICAgICAgaXRlbS5lbG0uc2V0QXR0cmlidXRlKCdkYXRhLScrdmFsdWVOYW1lLmRhdGEsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lLmF0dHIgJiYgdmFsdWVOYW1lLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWUubmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKHZhbHVlTmFtZS5hdHRyLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgaWYgKCF0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pKSB7XG4gICAgICBmb3IodmFyIHYgaW4gdmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkodikpIHtcbiAgICAgICAgICBzZXRWYWx1ZSh2LCB2YWx1ZXNbdl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpdGVtU291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBsaXN0IG5lZWQgdG8gaGF2ZSBhdCBsaXN0IG9uZSBpdGVtIG9uIGluaXQgb3RoZXJ3aXNlIHlvdSdsbCBoYXZlIHRvIGFkZCBhIHRlbXBsYXRlLlwiKTtcbiAgICB9XG4gICAgLyogSWYgaXRlbSBzb3VyY2UgZG9lcyBub3QgZXhpc3RzLCB1c2UgdGhlIGZpcnN0IGl0ZW0gaW4gbGlzdCBhc1xuICAgIHNvdXJjZSBmb3IgbmV3IGl0ZW1zICovXG4gICAgdmFyIG5ld0l0ZW0gPSBpdGVtU291cmNlLmNsb25lTm9kZSh0cnVlKTtcbiAgICBuZXdJdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcbiAgICBpdGVtLmVsbSA9IG5ld0l0ZW07XG4gICAgdGVtcGxhdGVyLnNldChpdGVtLCBpdGVtLnZhbHVlcygpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtLnBhcmVudE5vZGUgPT09IGxpc3QubGlzdCkge1xuICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGl0ZW0uZWxtKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pO1xuICAgIGxpc3QubGlzdC5hcHBlbmRDaGlsZChpdGVtLmVsbSk7XG4gIH07XG4gIHRoaXMuaGlkZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0gIT09IHVuZGVmaW5lZCAmJiBpdGVtLmVsbS5wYXJlbnROb2RlID09PSBsaXN0Lmxpc3QpIHtcbiAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChpdGVtLmVsbSk7XG4gICAgfVxuICB9O1xuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgLyogLmlubmVySFRNTCA9ICcnOyBmdWNrcyB1cCBJRSAqL1xuICAgIGlmIChsaXN0Lmxpc3QuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICB3aGlsZSAobGlzdC5saXN0LmNoaWxkTm9kZXMubGVuZ3RoID49IDEpXG4gICAgICB7XG4gICAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChsaXN0Lmxpc3QuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGluaXQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICByZXR1cm4gbmV3IFRlbXBsYXRlcihsaXN0KTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGluZGV4ID0gcmVxdWlyZSgnLi9pbmRleC1vZicpO1xuXG4vKipcbiAqIFdoaXRlc3BhY2UgcmVnZXhwLlxuICovXG5cbnZhciByZSA9IC9cXHMrLztcblxuLyoqXG4gKiB0b1N0cmluZyByZWZlcmVuY2UuXG4gKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBXcmFwIGBlbGAgaW4gYSBgQ2xhc3NMaXN0YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwpe1xuICByZXR1cm4gbmV3IENsYXNzTGlzdChlbCk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgQ2xhc3NMaXN0IGZvciBgZWxgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIENsYXNzTGlzdChlbCkge1xuICBpZiAoIWVsIHx8ICFlbC5ub2RlVHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQSBET00gZWxlbWVudCByZWZlcmVuY2UgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICB0aGlzLmVsID0gZWw7XG4gIHRoaXMubGlzdCA9IGVsLmNsYXNzTGlzdDtcbn1cblxuLyoqXG4gKiBBZGQgY2xhc3MgYG5hbWVgIGlmIG5vdCBhbHJlYWR5IHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihuYW1lKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICB0aGlzLmxpc3QuYWRkKG5hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAoIX5pKSBhcnIucHVzaChuYW1lKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGNsYXNzIGBuYW1lYCB3aGVuIHByZXNlbnQsIG9yXG4gKiBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIHJlbW92ZVxuICogYW55IHdoaWNoIG1hdGNoLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKG5hbWUpe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIHRoaXMubGlzdC5yZW1vdmUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICB2YXIgYXJyID0gdGhpcy5hcnJheSgpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICh+aSkgYXJyLnNwbGljZShpLCAxKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBUb2dnbGUgY2xhc3MgYG5hbWVgLCBjYW4gZm9yY2Ugc3RhdGUgdmlhIGBmb3JjZWAuXG4gKlxuICogRm9yIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBjbGFzc0xpc3QsIGJ1dCBkbyBub3Qgc3VwcG9ydCBgZm9yY2VgIHlldCxcbiAqIHRoZSBtaXN0YWtlIHdpbGwgYmUgZGV0ZWN0ZWQgYW5kIGNvcnJlY3RlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBmb3JjZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKG5hbWUsIGZvcmNlKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGZvcmNlKSB7XG4gICAgICBpZiAoZm9yY2UgIT09IHRoaXMubGlzdC50b2dnbGUobmFtZSwgZm9yY2UpKSB7XG4gICAgICAgIHRoaXMubGlzdC50b2dnbGUobmFtZSk7IC8vIHRvZ2dsZSBhZ2FpbiB0byBjb3JyZWN0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdC50b2dnbGUobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBmb3JjZSkge1xuICAgIGlmICghZm9yY2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuaGFzKG5hbWUpKSB7XG4gICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBvZiBjbGFzc2VzLlxuICpcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmFycmF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICB2YXIgc3RyID0gY2xhc3NOYW1lLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgdmFyIGFyciA9IHN0ci5zcGxpdChyZSk7XG4gIGlmICgnJyA9PT0gYXJyWzBdKSBhcnIuc2hpZnQoKTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgY2xhc3MgYG5hbWVgIGlzIHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5oYXMgPVxuQ2xhc3NMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gdGhpcy5saXN0ID8gdGhpcy5saXN0LmNvbnRhaW5zKG5hbWUpIDogISEgfmluZGV4KHRoaXMuYXJyYXkoKSwgbmFtZSk7XG59O1xuIiwidmFyIGJpbmQgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG4gICAgdW5iaW5kID0gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuICAgIHByZWZpeCA9IGJpbmQgIT09ICdhZGRFdmVudExpc3RlbmVyJyA/ICdvbicgOiAnJyxcbiAgICB0b0FycmF5ID0gcmVxdWlyZSgnLi90by1hcnJheScpO1xuXG4vKipcbiAqIEJpbmQgYGVsYCBldmVudCBgdHlwZWAgdG8gYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsLCBOb2RlTGlzdCwgSFRNTENvbGxlY3Rpb24gb3IgQXJyYXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsID0gdG9BcnJheShlbCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrICkge1xuICAgIGVsW2ldW2JpbmRdKHByZWZpeCArIHR5cGUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBVbmJpbmQgYGVsYCBldmVudCBgdHlwZWAncyBjYWxsYmFjayBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiBvciBBcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy51bmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBlbCA9IHRvQXJyYXkoZWwpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKyApIHtcbiAgICBlbFtpXVt1bmJpbmRdKHByZWZpeCArIHR5cGUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9zZWdtZW50aW8vZXh0ZW5kXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQgKG9iamVjdCkge1xuICAgIC8vIFRha2VzIGFuIHVubGltaXRlZCBudW1iZXIgb2YgZXh0ZW5kZXJzLlxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIC8vIEZvciBlYWNoIGV4dGVuZGVyLCBjb3B5IHRoZWlyIHByb3BlcnRpZXMgb24gb3VyIG9iamVjdC5cbiAgICBmb3IgKHZhciBpID0gMCwgc291cmNlOyBzb3VyY2UgPSBhcmdzW2ldOyBpKyspIHtcbiAgICAgICAgaWYgKCFzb3VyY2UpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIG9iamVjdFtwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRleHQsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgICAvLyBBcHJveGltYXRlbHkgd2hlcmUgaW4gdGhlIHRleHQgaXMgdGhlIHBhdHRlcm4gZXhwZWN0ZWQgdG8gYmUgZm91bmQ/XG4gICAgdmFyIE1hdGNoX0xvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiB8fCAwO1xuXG4gICAgLy9EZXRlcm1pbmVzIGhvdyBjbG9zZSB0aGUgbWF0Y2ggbXVzdCBiZSB0byB0aGUgZnV6enkgbG9jYXRpb24gKHNwZWNpZmllZCBhYm92ZSkuIEFuIGV4YWN0IGxldHRlciBtYXRjaCB3aGljaCBpcyAnZGlzdGFuY2UnIGNoYXJhY3RlcnMgYXdheSBmcm9tIHRoZSBmdXp6eSBsb2NhdGlvbiB3b3VsZCBzY29yZSBhcyBhIGNvbXBsZXRlIG1pc21hdGNoLiBBIGRpc3RhbmNlIG9mICcwJyByZXF1aXJlcyB0aGUgbWF0Y2ggYmUgYXQgdGhlIGV4YWN0IGxvY2F0aW9uIHNwZWNpZmllZCwgYSB0aHJlc2hvbGQgb2YgJzEwMDAnIHdvdWxkIHJlcXVpcmUgYSBwZXJmZWN0IG1hdGNoIHRvIGJlIHdpdGhpbiA4MDAgY2hhcmFjdGVycyBvZiB0aGUgZnV6enkgbG9jYXRpb24gdG8gYmUgZm91bmQgdXNpbmcgYSAwLjggdGhyZXNob2xkLlxuICAgIHZhciBNYXRjaF9EaXN0YW5jZSA9IG9wdGlvbnMuZGlzdGFuY2UgfHwgMTAwO1xuXG4gICAgLy8gQXQgd2hhdCBwb2ludCBkb2VzIHRoZSBtYXRjaCBhbGdvcml0aG0gZ2l2ZSB1cC4gQSB0aHJlc2hvbGQgb2YgJzAuMCcgcmVxdWlyZXMgYSBwZXJmZWN0IG1hdGNoIChvZiBib3RoIGxldHRlcnMgYW5kIGxvY2F0aW9uKSwgYSB0aHJlc2hvbGQgb2YgJzEuMCcgd291bGQgbWF0Y2ggYW55dGhpbmcuXG4gICAgdmFyIE1hdGNoX1RocmVzaG9sZCA9IG9wdGlvbnMudGhyZXNob2xkIHx8IDAuNDtcblxuICAgIGlmIChwYXR0ZXJuID09PSB0ZXh0KSByZXR1cm4gdHJ1ZTsgLy8gRXhhY3QgbWF0Y2hcbiAgICBpZiAocGF0dGVybi5sZW5ndGggPiAzMikgcmV0dXJuIGZhbHNlOyAvLyBUaGlzIGFsZ29yaXRobSBjYW5ub3QgYmUgdXNlZFxuXG4gICAgLy8gU2V0IHN0YXJ0aW5nIGxvY2F0aW9uIGF0IGJlZ2lubmluZyB0ZXh0IGFuZCBpbml0aWFsaXNlIHRoZSBhbHBoYWJldC5cbiAgICB2YXIgbG9jID0gTWF0Y2hfTG9jYXRpb24sXG4gICAgICAgIHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcSA9IHt9LFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcVtwYXR0ZXJuLmNoYXJBdChpKV0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHFbcGF0dGVybi5jaGFyQXQoaSldIHw9IDEgPDwgKHBhdHRlcm4ubGVuZ3RoIC0gaSAtIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcTtcbiAgICAgICAgfSgpKTtcblxuICAgIC8vIENvbXB1dGUgYW5kIHJldHVybiB0aGUgc2NvcmUgZm9yIGEgbWF0Y2ggd2l0aCBlIGVycm9ycyBhbmQgeCBsb2NhdGlvbi5cbiAgICAvLyBBY2Nlc3NlcyBsb2MgYW5kIHBhdHRlcm4gdGhyb3VnaCBiZWluZyBhIGNsb3N1cmUuXG5cbiAgICBmdW5jdGlvbiBtYXRjaF9iaXRhcFNjb3JlXyhlLCB4KSB7XG4gICAgICAgIHZhciBhY2N1cmFjeSA9IGUgLyBwYXR0ZXJuLmxlbmd0aCxcbiAgICAgICAgICAgIHByb3hpbWl0eSA9IE1hdGguYWJzKGxvYyAtIHgpO1xuXG4gICAgICAgIGlmICghTWF0Y2hfRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIC8vIERvZGdlIGRpdmlkZSBieSB6ZXJvIGVycm9yLlxuICAgICAgICAgICAgcmV0dXJuIHByb3hpbWl0eSA/IDEuMCA6IGFjY3VyYWN5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2N1cmFjeSArIChwcm94aW1pdHkgLyBNYXRjaF9EaXN0YW5jZSk7XG4gICAgfVxuXG4gICAgdmFyIHNjb3JlX3RocmVzaG9sZCA9IE1hdGNoX1RocmVzaG9sZCwgLy8gSGlnaGVzdCBzY29yZSBiZXlvbmQgd2hpY2ggd2UgZ2l2ZSB1cC5cbiAgICAgICAgYmVzdF9sb2MgPSB0ZXh0LmluZGV4T2YocGF0dGVybiwgbG9jKTsgLy8gSXMgdGhlcmUgYSBuZWFyYnkgZXhhY3QgbWF0Y2g/IChzcGVlZHVwKVxuXG4gICAgaWYgKGJlc3RfbG9jICE9IC0xKSB7XG4gICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICAgICAgLy8gV2hhdCBhYm91dCBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uPyAoc3BlZWR1cClcbiAgICAgICAgYmVzdF9sb2MgPSB0ZXh0Lmxhc3RJbmRleE9mKHBhdHRlcm4sIGxvYyArIHBhdHRlcm4ubGVuZ3RoKTtcblxuICAgICAgICBpZiAoYmVzdF9sb2MgIT0gLTEpIHtcbiAgICAgICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpc2UgdGhlIGJpdCBhcnJheXMuXG4gICAgdmFyIG1hdGNobWFzayA9IDEgPDwgKHBhdHRlcm4ubGVuZ3RoIC0gMSk7XG4gICAgYmVzdF9sb2MgPSAtMTtcblxuICAgIHZhciBiaW5fbWluLCBiaW5fbWlkO1xuICAgIHZhciBiaW5fbWF4ID0gcGF0dGVybi5sZW5ndGggKyB0ZXh0Lmxlbmd0aDtcbiAgICB2YXIgbGFzdF9yZDtcbiAgICBmb3IgKHZhciBkID0gMDsgZCA8IHBhdHRlcm4ubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgLy8gU2NhbiBmb3IgdGhlIGJlc3QgbWF0Y2g7IGVhY2ggaXRlcmF0aW9uIGFsbG93cyBmb3Igb25lIG1vcmUgZXJyb3IuXG4gICAgICAgIC8vIFJ1biBhIGJpbmFyeSBzZWFyY2ggdG8gZGV0ZXJtaW5lIGhvdyBmYXIgZnJvbSAnbG9jJyB3ZSBjYW4gc3RyYXkgYXQgdGhpc1xuICAgICAgICAvLyBlcnJvciBsZXZlbC5cbiAgICAgICAgYmluX21pbiA9IDA7XG4gICAgICAgIGJpbl9taWQgPSBiaW5fbWF4O1xuICAgICAgICB3aGlsZSAoYmluX21pbiA8IGJpbl9taWQpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaF9iaXRhcFNjb3JlXyhkLCBsb2MgKyBiaW5fbWlkKSA8PSBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICBiaW5fbWluID0gYmluX21pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmluX21heCA9IGJpbl9taWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaW5fbWlkID0gTWF0aC5mbG9vcigoYmluX21heCAtIGJpbl9taW4pIC8gMiArIGJpbl9taW4pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVzZSB0aGUgcmVzdWx0IGZyb20gdGhpcyBpdGVyYXRpb24gYXMgdGhlIG1heGltdW0gZm9yIHRoZSBuZXh0LlxuICAgICAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICAgICAgdmFyIHN0YXJ0ID0gTWF0aC5tYXgoMSwgbG9jIC0gYmluX21pZCArIDEpO1xuICAgICAgICB2YXIgZmluaXNoID0gTWF0aC5taW4obG9jICsgYmluX21pZCwgdGV4dC5sZW5ndGgpICsgcGF0dGVybi5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJkID0gQXJyYXkoZmluaXNoICsgMik7XG4gICAgICAgIHJkW2ZpbmlzaCArIDFdID0gKDEgPDwgZCkgLSAxO1xuICAgICAgICBmb3IgKHZhciBqID0gZmluaXNoOyBqID49IHN0YXJ0OyBqLS0pIHtcbiAgICAgICAgICAgIC8vIFRoZSBhbHBoYWJldCAocykgaXMgYSBzcGFyc2UgaGFzaCwgc28gdGhlIGZvbGxvd2luZyBsaW5lIGdlbmVyYXRlc1xuICAgICAgICAgICAgLy8gd2FybmluZ3MuXG4gICAgICAgICAgICB2YXIgY2hhck1hdGNoID0gc1t0ZXh0LmNoYXJBdChqIC0gMSldO1xuICAgICAgICAgICAgaWYgKGQgPT09IDApIHsgICAgLy8gRmlyc3QgcGFzczogZXhhY3QgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoO1xuICAgICAgICAgICAgfSBlbHNlIHsgICAgLy8gU3Vic2VxdWVudCBwYXNzZXM6IGZ1enp5IG1hdGNoLlxuICAgICAgICAgICAgICAgIHJkW2pdID0gKCgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2gpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgobGFzdF9yZFtqICsgMV0gfCBsYXN0X3JkW2pdKSA8PCAxKSB8IDEpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9yZFtqICsgMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmRbal0gJiBtYXRjaG1hc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSBtYXRjaF9iaXRhcFNjb3JlXyhkLCBqIC0gMSk7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBtYXRjaCB3aWxsIGFsbW9zdCBjZXJ0YWlubHkgYmUgYmV0dGVyIHRoYW4gYW55IGV4aXN0aW5nIG1hdGNoLlxuICAgICAgICAgICAgICAgIC8vIEJ1dCBjaGVjayBhbnl3YXkuXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlIDw9IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUb2xkIHlvdSBzby5cbiAgICAgICAgICAgICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RfbG9jID0gaiAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXN0X2xvYyA+IGxvYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiBwYXNzaW5nIGxvYywgZG9uJ3QgZXhjZWVkIG91ciBjdXJyZW50IGRpc3RhbmNlIGZyb20gbG9jLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgxLCAyICogbG9jIC0gYmVzdF9sb2MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxyZWFkeSBwYXNzZWQgbG9jLCBkb3duaGlsbCBmcm9tIGhlcmUgb24gaW4uXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBObyBob3BlIGZvciBhIChiZXR0ZXIpIG1hdGNoIGF0IGdyZWF0ZXIgZXJyb3IgbGV2ZWxzLlxuICAgICAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCArIDEsIGxvYykgPiBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RfcmQgPSByZDtcbiAgICB9XG5cbiAgICByZXR1cm4gKGJlc3RfbG9jIDwgMCkgPyBmYWxzZSA6IHRydWU7XG59O1xuIiwiLyoqXG4gKiBBIGNyb3NzLWJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgZ2V0QXR0cmlidXRlLlxuICogU291cmNlIGZvdW5kIGhlcmU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM3NTUzNDMvMzYxMzM3IHdyaXR0ZW4gYnkgVml2aW4gUGFsaWF0aFxuICpcbiAqIFJldHVybiB0aGUgdmFsdWUgZm9yIGBhdHRyYCBhdCBgZWxlbWVudGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgYXR0cikge1xuICB2YXIgcmVzdWx0ID0gKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoYXR0cikpIHx8IG51bGw7XG4gIGlmKCAhcmVzdWx0ICkge1xuICAgIHZhciBhdHRycyA9IGVsLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGxlbmd0aCA9IGF0dHJzLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhdHRyW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYoYXR0cltpXS5ub2RlTmFtZSA9PT0gYXR0cikge1xuICAgICAgICAgIHJlc3VsdCA9IGF0dHJbaV0ubm9kZVZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4gKiBBIGNyb3NzLWJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgZ2V0RWxlbWVudHNCeUNsYXNzLlxuICogSGVhdmlseSBiYXNlZCBvbiBEdXN0aW4gRGlheidzIGZ1bmN0aW9uOiBodHRwOi8vZHVzdGluZGlhei5jb20vZ2V0ZWxlbWVudHNieWNsYXNzLlxuICpcbiAqIEZpbmQgYWxsIGVsZW1lbnRzIHdpdGggY2xhc3MgYGNsYXNzTmFtZWAgaW5zaWRlIGBjb250YWluZXJgLlxuICogVXNlIGBzaW5nbGUgPSB0cnVlYCB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZSBpbiBvbGRlciBicm93c2Vyc1xuICogd2hlbiBvbmx5IG9uZSBlbGVtZW50IGlzIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lclxuICogQHBhcmFtIHtCb29sZWFufSBzaW5nbGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxudmFyIGdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIGlmIChzaW5nbGUpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgfVxufTtcblxudmFyIHF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIGNsYXNzTmFtZSA9ICcuJyArIGNsYXNzTmFtZTtcbiAgaWYgKHNpbmdsZSkge1xuICAgIHJldHVybiBjb250YWluZXIucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpO1xuICB9XG59O1xuXG52YXIgcG9seWZpbGwgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIHZhciBjbGFzc0VsZW1lbnRzID0gW10sXG4gICAgdGFnID0gJyonO1xuXG4gIHZhciBlbHMgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcbiAgdmFyIGVsc0xlbiA9IGVscy5sZW5ndGg7XG4gIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK2NsYXNzTmFtZStcIihcXFxcc3wkKVwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgZWxzTGVuOyBpKyspIHtcbiAgICBpZiAoIHBhdHRlcm4udGVzdChlbHNbaV0uY2xhc3NOYW1lKSApIHtcbiAgICAgIGlmIChzaW5nbGUpIHtcbiAgICAgICAgcmV0dXJuIGVsc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzRWxlbWVudHNbal0gPSBlbHNbaV07XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsYXNzRWxlbWVudHM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoKG9wdGlvbnMudGVzdCAmJiBvcHRpb25zLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHx8ICghb3B0aW9ucy50ZXN0ICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9IGVsc2UgaWYgKChvcHRpb25zLnRlc3QgJiYgb3B0aW9ucy5xdWVyeVNlbGVjdG9yKSB8fCAoIW9wdGlvbnMudGVzdCAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbChjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9XG4gIH07XG59KSgpO1xuIiwidmFyIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgb2JqKXtcbiAgaWYgKGluZGV4T2YpIHJldHVybiBhcnIuaW5kZXhPZihvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcbiIsIi8qKlxuICogU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vdGltb3hsZXkvdG8tYXJyYXlcbiAqXG4gKiBDb252ZXJ0IGFuIGFycmF5LWxpa2Ugb2JqZWN0IGludG8gYW4gYEFycmF5YC5cbiAqIElmIGBjb2xsZWN0aW9uYCBpcyBhbHJlYWR5IGFuIGBBcnJheWAsIHRoZW4gd2lsbCByZXR1cm4gYSBjbG9uZSBvZiBgY29sbGVjdGlvbmAuXG4gKlxuICogQHBhcmFtIHtBcnJheSB8IE1peGVkfSBjb2xsZWN0aW9uIEFuIGBBcnJheWAgb3IgYXJyYXktbGlrZSBvYmplY3QgdG8gY29udmVydCBlLmcuIGBhcmd1bWVudHNgIG9yIGBOb2RlTGlzdGBcbiAqIEByZXR1cm4ge0FycmF5fSBOYWl2ZSBjb252ZXJzaW9uIG9mIGBjb2xsZWN0aW9uYCB0byBhIG5ldyBgQXJyYXlgLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRvQXJyYXkoY29sbGVjdGlvbikge1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gW107XG4gIGlmIChjb2xsZWN0aW9uID09PSBudWxsKSByZXR1cm4gW251bGxdO1xuICBpZiAoY29sbGVjdGlvbiA9PT0gd2luZG93KSByZXR1cm4gW3dpbmRvd107XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ3N0cmluZycpIHJldHVybiBbY29sbGVjdGlvbl07XG4gIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSByZXR1cm4gY29sbGVjdGlvbjtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uLmxlbmd0aCAhPSAnbnVtYmVyJykgcmV0dXJuIFtjb2xsZWN0aW9uXTtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnZnVuY3Rpb24nICYmIGNvbGxlY3Rpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikgcmV0dXJuIFtjb2xsZWN0aW9uXTtcblxuICB2YXIgYXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29sbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sbGVjdGlvbiwgaSkgfHwgaSBpbiBjb2xsZWN0aW9uKSB7XG4gICAgICBhcnIucHVzaChjb2xsZWN0aW9uW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFhcnIubGVuZ3RoKSByZXR1cm4gW107XG4gIHJldHVybiBhcnI7XG59O1xuXG5mdW5jdGlvbiBpc0FycmF5KGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocykge1xuICBzID0gKHMgPT09IHVuZGVmaW5lZCkgPyBcIlwiIDogcztcbiAgcyA9IChzID09PSBudWxsKSA/IFwiXCIgOiBzO1xuICBzID0gcy50b1N0cmluZygpO1xuICByZXR1cm4gcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldDtcbnZhciBhbHBoYWJldEluZGV4TWFwO1xudmFyIGFscGhhYmV0SW5kZXhNYXBMZW5ndGggPSAwO1xuXG5mdW5jdGlvbiBpc051bWJlckNvZGUoY29kZSkge1xuICByZXR1cm4gY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3O1xufVxuXG5mdW5jdGlvbiBuYXR1cmFsQ29tcGFyZShhLCBiKSB7XG4gIHZhciBsZW5ndGhBID0gKGEgKz0gJycpLmxlbmd0aDtcbiAgdmFyIGxlbmd0aEIgPSAoYiArPSAnJykubGVuZ3RoO1xuICB2YXIgYUluZGV4ID0gMDtcbiAgdmFyIGJJbmRleCA9IDA7XG5cbiAgd2hpbGUgKGFJbmRleCA8IGxlbmd0aEEgJiYgYkluZGV4IDwgbGVuZ3RoQikge1xuICAgIHZhciBjaGFyQ29kZUEgPSBhLmNoYXJDb2RlQXQoYUluZGV4KTtcbiAgICB2YXIgY2hhckNvZGVCID0gYi5jaGFyQ29kZUF0KGJJbmRleCk7XG5cbiAgICBpZiAoaXNOdW1iZXJDb2RlKGNoYXJDb2RlQSkpIHtcbiAgICAgIGlmICghaXNOdW1iZXJDb2RlKGNoYXJDb2RlQikpIHtcbiAgICAgICAgcmV0dXJuIGNoYXJDb2RlQSAtIGNoYXJDb2RlQjtcbiAgICAgIH1cblxuICAgICAgdmFyIG51bVN0YXJ0QSA9IGFJbmRleDtcbiAgICAgIHZhciBudW1TdGFydEIgPSBiSW5kZXg7XG5cbiAgICAgIHdoaWxlIChjaGFyQ29kZUEgPT09IDQ4ICYmICsrbnVtU3RhcnRBIDwgbGVuZ3RoQSkge1xuICAgICAgICBjaGFyQ29kZUEgPSBhLmNoYXJDb2RlQXQobnVtU3RhcnRBKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChjaGFyQ29kZUIgPT09IDQ4ICYmICsrbnVtU3RhcnRCIDwgbGVuZ3RoQikge1xuICAgICAgICBjaGFyQ29kZUIgPSBiLmNoYXJDb2RlQXQobnVtU3RhcnRCKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG51bUVuZEEgPSBudW1TdGFydEE7XG4gICAgICB2YXIgbnVtRW5kQiA9IG51bVN0YXJ0QjtcblxuICAgICAgd2hpbGUgKG51bUVuZEEgPCBsZW5ndGhBICYmIGlzTnVtYmVyQ29kZShhLmNoYXJDb2RlQXQobnVtRW5kQSkpKSB7XG4gICAgICAgICsrbnVtRW5kQTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChudW1FbmRCIDwgbGVuZ3RoQiAmJiBpc051bWJlckNvZGUoYi5jaGFyQ29kZUF0KG51bUVuZEIpKSkge1xuICAgICAgICArK251bUVuZEI7XG4gICAgICB9XG5cbiAgICAgIHZhciBkaWZmZXJlbmNlID0gbnVtRW5kQSAtIG51bVN0YXJ0QSAtIG51bUVuZEIgKyBudW1TdGFydEI7IC8vIG51bUEgbGVuZ3RoIC0gbnVtQiBsZW5ndGhcbiAgICAgIGlmIChkaWZmZXJlbmNlKSB7XG4gICAgICAgIHJldHVybiBkaWZmZXJlbmNlO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAobnVtU3RhcnRBIDwgbnVtRW5kQSkge1xuICAgICAgICBkaWZmZXJlbmNlID0gYS5jaGFyQ29kZUF0KG51bVN0YXJ0QSsrKSAtIGIuY2hhckNvZGVBdChudW1TdGFydEIrKyk7XG4gICAgICAgIGlmIChkaWZmZXJlbmNlKSB7XG4gICAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYUluZGV4ID0gbnVtRW5kQTtcbiAgICAgIGJJbmRleCA9IG51bUVuZEI7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhckNvZGVBICE9PSBjaGFyQ29kZUIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhckNvZGVBIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aCAmJlxuICAgICAgICBjaGFyQ29kZUIgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoICYmXG4gICAgICAgIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVBXSAhPT0gLTEgJiZcbiAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUJdICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQV0gLSBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGFyQ29kZUEgLSBjaGFyQ29kZUI7XG4gICAgfVxuXG4gICAgKythSW5kZXg7XG4gICAgKytiSW5kZXg7XG4gIH1cblxuICByZXR1cm4gbGVuZ3RoQSAtIGxlbmd0aEI7XG59XG5cbm5hdHVyYWxDb21wYXJlLmNhc2VJbnNlbnNpdGl2ZSA9IG5hdHVyYWxDb21wYXJlLmkgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBuYXR1cmFsQ29tcGFyZSgoJycgKyBhKS50b0xvd2VyQ2FzZSgpLCAoJycgKyBiKS50b0xvd2VyQ2FzZSgpKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG5hdHVyYWxDb21wYXJlLCB7XG4gIGFscGhhYmV0OiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBhbHBoYWJldDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGFscGhhYmV0ID0gdmFsdWU7XG4gICAgICBhbHBoYWJldEluZGV4TWFwID0gW107XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICBpZiAoYWxwaGFiZXQpIHtcbiAgICAgICAgZm9yICg7IGkgPCBhbHBoYWJldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFscGhhYmV0SW5kZXhNYXBbYWxwaGFiZXQuY2hhckNvZGVBdChpKV0gPSBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhbHBoYWJldEluZGV4TWFwTGVuZ3RoID0gYWxwaGFiZXRJbmRleE1hcC5sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbHBoYWJldEluZGV4TWFwW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhbHBoYWJldEluZGV4TWFwW2ldID0gLTE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0dXJhbENvbXBhcmU7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYnJlYWtwb2ludHNcIiA6IHtcbiAgICBcInhzXCI6IFwiNDgwcHhcIixcbiAgICBcInNtXCI6IFwiNjIwcHhcIixcbiAgICBcIm1kXCI6IFwiNzYwcHhcIixcbiAgICBcImxnXCI6IFwiOTkwcHhcIixcbiAgICBcInhsXCI6IFwiMTM4MHB4XCJcbiAgfVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtZGlzbWlzc10nLFxuICAgIHRhcmdldDogJ1tkYXRhLWRpc21pc3NpYmxlXScsXG4gICAgY2xhc3NUb2dnbGU6ICdkaXNtaXNzJ1xuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBsZXQgdGFyZ2V0ID0gdHJpZ2dlci5jbG9zZXN0KHNldHRpbmdzLnRhcmdldClcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgdS50b2dnbGVDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzVG9nZ2xlKVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuLyoqXG4gKiBEcmF3ZXIgcGx1Z2luXG4gKiAtLS1cbiAqIEEgY29udGFpbmVyIGNvbXBvbmVudCB0aGF0IHNsaWRlcyBpbiBmcm9tIHRoZSBsZWZ0IG9yIHJpZ2h0LiBJdCB0eXBpY2FsbHlcbiAqIGNvbnRhaW5zIG1lbnVzLCBzZWFyY2ggb3Igb3RoZXIgY29udGVudCBmb3IgeW91ciBhcHAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG5cbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgLy8gQ29tcG9uZW50IGVsZW1lbnQgY2xhc3Nlc1xuICAgIGNsYXNzVGFyZ2V0OiAnZHJhd2VyX19pdGVtJyxcbiAgICBjbGFzc1RyaWdnZXI6ICdkcmF3ZXJfX3RyaWdnZXInLFxuICAgIGNsYXNzSW5uZXI6ICdkcmF3ZXJfX2RpYWxvZycsXG5cbiAgICAvLyBDb21wb25lbnQgZWxlbWVudCBzd2l0Y2ggY2xhc3Nlc1xuICAgIC8vIFVzZWQgd2l0aCBSZWdFeHAgdG8gc2VhcmNoIGFuZCByZXBsYWNlIGVsZW1lbnQgY2xhc3Nlc1xuICAgIGNsYXNzVGFyZ2V0U3dpdGNoOiAnbW9kYWwnLFxuICAgIGNsYXNzVHJpZ2dlclN3aXRjaDogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc0lubmVyU3dpdGNoOiAnbW9kYWxfX2RpYWxvZycsXG5cbiAgICAvLyBTdGF0ZSBhbmQgdXRpbGl0eSBjbGFzc2VzXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGNsYXNzVHJhbnNpdGlvbk5vbmU6ICd0cmFuc2l0aW9uX25vbmUnLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gc3RvcmUgdGhlIHNhdmUgc3RhdGUgaW4gbG9jYWwgc3RvcmFnZVxuICAgIC8vIHtib29sZWFufSBUaGUgc3RyaW5nIHRvIHNhdmUgb3VyIHN0YXRlIG9iamVjdCBhc1xuICAgIHNhdmVTdGF0ZTogdHJ1ZSxcblxuICAgIC8vIFdoZXRoZXIgb3Igbm90IHRvIGVuYWJsZSB0aGUgc3dpdGNoIGZ1bmN0aW9uYWxpdHkuIElmIGVuYWJsZWQsIGEgc3RyaW5nXG4gICAgLy8gc2VsZWN0b3IgdG8gY2hlY2sgZm9yIHNob3VsZCBiZSBwYXNzZWQuXG4gICAgLy8ge2ZhbHNlfSB8fCB7c3RyaW5nfSBlLmcuICdbZGF0YS1kcmF3ZXItc3dpdGNoXSdcbiAgICBzd2l0Y2g6ICdbZGF0YS1kcmF3ZXItc3dpdGNoXScsXG5cbiAgICAvLyBUaGUgZGVmYXVsdCBicmVhayBwb2ludCBmb3Igd2hlbiB0byBzd2l0Y2ggdG8gZHJhd2VyIG9yIG1vZGFsIGNsYXNzZXNcbiAgICAvLyB7c3RyaW5nfSBFaXRoZXIgYSBicmVha3BvaW50IGtleSBvciBwaXhlbCB2YWx1ZVxuICAgIHN3aXRjaEJyZWFrcG9pbnQ6ICdsZycsXG5cbiAgICAvLyBEdXJhdGlvbiBiZWZvcmUgcmVtb3ZpbmcgdGhlIHRyYW5zaXRpb25fbm9uZSBjbGFzcyBvbiBpbml0aWFsIGxvYWRcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IDUwMFxuICB9XG5cbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBkcmF3ZXJzIGF2YWlsYWJsZSBpbiB0aGUgRE9NXG4gIGxldCBkcmF3ZXJzID0gW11cblxuICAvLyBXaGVyZSB3ZSBidWlsZCB0aGUgc2F2ZSBzdGF0ZSBvYmplY3QgYmVmb3JlIHdlIHBhc3MgaXQgdG8gbG9jYWwgc3RvcmFnZVxuICBsZXQgZHJhd2VyU3RhdGUgPSB7fVxuXG4gIC8vIFdoZXJlIHdlIHN0b3JlIGFsbCBvdXIgc3dpdGNoIGRyYXdlcnMgYXZhaWxhYmxlIGluIHRoZSBET01cbiAgbGV0IHN3aXRjaERyYXdlcnNcblxuICAvLyBXaGVyZSB3ZSBzdG9yZSBhbGwgb3VyIG1lZGlhIHF1ZXJ5IGxpc3RzIGFsb25nIHdpdGggdGhlaXIgZHJhd2Vyc1xuICBsZXQgbXFsQXJyYXkgPSBbXVxuXG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgbWV0aG9kLCBydW4gYXMgc29vbiBhcyBhbiBpbnN0YW5jZSBpcyBjcmVhdGVkXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIEEganNvbiBvYmplY3Qgd2l0aCB5b3VyIGN1c3RvbSBzZXR0aW5nc1xuICAgKi9cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuXG4gICAgLy8gTWVyZ2UgdGhlIGRlZmF1bHRzIGFuZCBwYXNzZWQgb3B0aW9ucyBpbnRvIG91ciBzZXR0aW5ncyBvYmpcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG5cbiAgICAvLyBHZXQgYWxsIHRoZSBkcmF3ZXJzIG9uIHRoZSBwYWdlIGFuZCBzYXZlIHRoZW0gd2l0aCB0aGVpciBkZWZhdWx0IHN0YXRlXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldClcbiAgICAgIC5mb3JFYWNoKChkcmF3ZXIpID0+IHtcbiAgICAgIGRyYXdlcnMucHVzaCh7XG4gICAgICAgICdkcmF3ZXInOiBkcmF3ZXIsXG4gICAgICAgICdkZWZhdWx0U3RhdGUnOiB1Lmhhc0NsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICAvLyBJbml0aWFsaXplIGEgcHJvbWlzZSBhbmQgaW5pdCBzYXZlIHN0YXRlIGlmIGl0J3MgZW5hYmxlZFxuICAgIGxldCBwcm9taXNlU2F2ZVN0YXRlID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgICAgaW5pdFNhdmVTdGF0ZShyZXNvbHZlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFmdGVyIHByb21pc2UgaXMgcmVzb2x2ZWQgYW5kIHN3aXRjaCBpcyBlbmFibGVkLCBpbml0aWFsaXplIHN3aXRjaFxuICAgIHByb21pc2VTYXZlU3RhdGUudGhlbigoKSA9PiB7XG4gICAgICBpZiAoc2V0dGluZ3Muc3dpdGNoKSB7XG4gICAgICAgIGluaXRTd2l0Y2goKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBBZGQgb3VyIGRyYXdlciB0cmlnZ2VyIGV2ZW50IGxpc3RlbmVyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0cmlnZ2VyLCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGVjb25zdHJ1Y3RvciBtZXRob2QsIHVzZWQgdG8gcmVzZXQgYW5kIGRlc3Ryb3kgdGhlIGRyYXdlciBpbnN0YW5jZVxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtCb29sZWFufSBkZWZhdWx0U3RhdGUgLSBSZXR1cm4gZHJhd2VycyB0byB0aGVpciBkZWZhdWx0IHN0YXRlP1xuICAgKi9cbiAgYXBpLmRlc3Ryb3kgPSAoZGVmYXVsdFN0YXRlID0gdHJ1ZSkgPT4ge1xuXG4gICAgLy8gRGVzdHJveSBvdXIgc3dpdGNoXG4gICAgZGVzdHJveVN3aXRjaCgpXG5cbiAgICAvLyBEZXN0cm95IG91ciBzdGF0ZVxuICAgIHN0YXRlQ2xlYXIoKVxuXG4gICAgLy8gUmV0dXJuIGRyYXdycyB0byB0aGVpciBkZWZhdWx0IHN0YXRlXG4gICAgaWYgKGRlZmF1bHRTdGF0ZSkge1xuICAgICAgZHJhd2Vycy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmRlZmF1bHRTdGF0ZSkge1xuICAgICAgICAgIHUuYWRkQ2xhc3MoaXRlbS5kcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHUucmVtb3ZlQ2xhc3MoaXRlbS5kcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIENsZWFyIG91ciB2YXJpYWJsZXNcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkcmF3ZXJzID0gW11cblxuICAgIC8vIFJlbW92ZSB0aGUgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gb3BlbiBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnb3BlbicpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBjbG9zZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLmNsb3NlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgJ2Nsb3NlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHRvZ2dsZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnRvZ2dsZSA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBzd2l0Y2ggYSBtb2RhbCBpbnRvIGRyYXdlclxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIC0gQSB2YWxpZCBDU1Mgc2VsZWN0b3JcbiAgICovXG4gIGFwaS5zd2l0Y2hUb0RyYXdlciA9IChzZWxlY3RvcikgPT4ge1xuXG4gICAgLy8gVXNlIGRlZmF1bHQgc2VsZWN0b3IgaWYgb25lIGlzbid0IHBhc3NlZFxuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogc2V0dGluZ3Muc3dpdGNoXG5cbiAgICAvLyBRdWVyeSBvdXIgZWxlbWVudHMgdXNpbmcgdGhlIHByb3ZpZGVkIHNlbGVjdG9yXG4gICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcblxuICAgIC8vIENvbnZlcnQgdG8gYXJyYXkgaWYgb25seSBvbmUgZHJhd2VyIGlzIHBhc3NlZFxuICAgIGl0ZW1zID0gKGl0ZW1zLmZvckVhY2gpID8gaXRlbXMgOiB1LnRvQXJyYXkoaXRlbXMpXG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBzd2l0Y2hUb0RyYXdlcihpdGVtKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBzd2l0Y2ggYSBkcmF3ZXIgaW50byBtb2RhbFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIC0gQSB2YWxpZCBDU1Mgc2VsZWN0b3JcbiAgICovXG4gIGFwaS5zd2l0Y2hUb01vZGFsID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAvLyBVc2UgZGVmYXVsdCBzZWxlY3RvciBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBzZXR0aW5ncy5zd2l0Y2hcblxuICAgIC8vIFF1ZXJ5IG91ciBlbGVtZW50cyB1c2luZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3JcbiAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHN3aXRjaFRvTW9kYWwoaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIGRyYXdlciBjdXJyZW50IGRyYXdlciBzdGF0ZVxuICAgKi9cbiAgYXBpLnN0YXRlU2F2ZSA9ICgpID0+IHtcbiAgICBzdGF0ZVNhdmUoKVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBkcmF3ZXIgc3RhdGUgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAqL1xuICBhcGkuc3RhdGVDbGVhciA9ICgpID0+IHtcbiAgICBzdGF0ZUNsZWFyKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGRyYXdlciBlbGVtZW50KHMpIHRvIGNsb3NlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdGF0ZSAtIFdoZXRoZXIgdG8gb3BlbiwgY2xvc2Ugb3IgdG9nZ2xlIHRoZSBkcmF3ZXIocylcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIGNvbnN0IHRvZ2dsZSA9IChkcmF3ZXIsIHN0YXRlLCBjYWxsYmFjaykgPT4ge1xuXG4gICAgLy8gQ2hlY2sgaWYgZHJhd2VyKHMpIHNob3VsZCBiZSBvcGVuZWQsIGNsb3NlZCBvciB0b2dnbGVkIGFuZCBlaXRoZXIgYWRkIG9yXG4gICAgLy8gcmVtb3ZlIHRoZSBhY3RpdmUgY2xhc3MgdG8gdGhlIHBhc3NlZCBkcmF3ZXIocylcbiAgICBpZiAoc3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgdS5hZGRDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09ICdjbG9zZScpIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdS50b2dnbGVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH1cblxuICAgIC8vIFNhdmUgc3RhdGUgaWYgZmVhdHVyZSBpcyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgc3RhdGVTYXZlKGRyYXdlcilcbiAgICB9XG5cbiAgICAvLyBGaXJlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpZiBvbmUgd2FzIHBhc3NlZFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjaygpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0byB0b2dnbGUgZHJhd2VyIHZpYSBhIHRyaWdnZXJcbiAgICovXG4gIGNvbnN0IHRyaWdnZXIgPSAoKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGNsb3Nlc3QgdHJpZ2dlciBlbGVtZW50IGZyb20gdGhlIGNsaWNrIGV2ZW50XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG5cbiAgICAvLyBDaGVjayB0aGF0IHRoZSBjbGFzcyB0cmlnZ2VyIHdhcyBjbGlja2VkXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgLy8gR2V0IHRoZSBkcmF3ZXIgc2VsZWN0b3IgZnJvbSB0aGUgdHJpZ2dlciB2aWEgW2RhdGEtdGFyZ2V0XVxuICAgICAgbGV0IGRhdGFEcmF3ZXIgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG5cbiAgICAgIC8vIENoZWNrIHRoYXQgYSBkcmF3ZXIgdGFyZ2V0IHdhcyBnaXZlblxuICAgICAgaWYgKGRhdGFEcmF3ZXIpIHtcblxuICAgICAgICAvLyBRdWVyeSB0aGUgZHJhd2VyIGVsZW1lbnQgYW5kIHRvZ2dsZSBpdCBpZiBpdCBleGlzdHNcbiAgICAgICAgbGV0IGRyYXdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZGF0YURyYXdlcilcbiAgICAgICAgaWYgKGRyYXdlci5sZW5ndGgpIHtcbiAgICAgICAgICB0b2dnbGUoZHJhd2VyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBpbml0aWFsaXplcyB0aGUgc2F2ZSBzdGF0ZSBmdW5jdGlvbmFsaXR5XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgY29uc3QgaW5pdFNhdmVTdGF0ZSA9IChjYWxsYmFjaykgPT4ge1xuXG4gICAgLy8gQ2hlY2sgaWYgYSBkcmF3ZXIgc3RhdGUgaXMgYWxyZWFkeSBzYXZlZCBpbiBsb2NhbCBzdG9yYWdlIGFuZCBzYXZlIHRoZVxuICAgIC8vIGpzb24gcGFyc2VkIGRhdGEgdG8gb3VyIGxvY2FsIHZhcmlhYmxlIGlmIGl0IGRvZXNcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RyYXdlclN0YXRlJykpIHtcbiAgICAgIGRyYXdlclN0YXRlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyU3RhdGUnKSlcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggYWxsIGRyYXdlcnNcbiAgICBkcmF3ZXJzLmZvckVhY2goKGl0ZW0pID0+IHtcblxuICAgICAgbGV0IGRyYXdlciA9IGl0ZW0uZHJhd2VyXG5cbiAgICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzdGF0ZSBpZiBvbmUgaXMgbm90IHNldFxuICAgICAgaWYgKGRyYXdlci5pZCBpbiBkcmF3ZXJTdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgc3RhdGVTYXZlKGRyYXdlcilcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IG91ciBkcmF3ZXIgZGlhbG9nIGVsZW1lbnRcbiAgICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLicgKyBzZXR0aW5ncy5jbGFzc0lubmVyKVxuXG4gICAgICAvLyBEaXNhYmxlcyB0cmFuc2l0aW9ucyBhcyBkZWZhdWx0IHN0YXRlcyBhcmUgYmVpbmcgc2V0XG4gICAgICBsZXQgdHJhbnNpdGlvbkRlbGF5ID0gKCkgPT4ge1xuICAgICAgICBpZiAoZGlhbG9nKSB7XG4gICAgICAgICAgdS5hZGRDbGFzcyhkaWFsb2csIHNldHRpbmdzLmNsYXNzVHJhbnNpdGlvbk5vbmUpXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB1LnJlbW92ZUNsYXNzKGRpYWxvZywgc2V0dGluZ3MuY2xhc3NUcmFuc2l0aW9uTm9uZSlcbiAgICAgICAgICB9LCBzZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG9nZ2xlIG91ciBkcmF3ZXIgc3RhdGUgYmFzZWQgb24gdGhlIHNhdmVkIHN0YXRlXG4gICAgICBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ2Nsb3NlJywgdHJhbnNpdGlvbkRlbGF5KVxuICAgICAgfSBlbHNlIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdKSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdvcGVuJywgdHJhbnNpdGlvbkRlbGF5KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBGaXJlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpZiBvbmUgd2FzIHBhc3NlZCBhbmQgcmV0dXJuIG91ciBzdGF0ZSBvYmplY3RcbiAgICB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgJiYgY2FsbGJhY2soZHJhd2VyU3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHNhdmVzIHRoZSBzdGF0ZSBvZiBhIHNwZWNpZmljIG9yIGFsbCBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGl0ZW1zIC0gVGhlIGRyYXdlciBlbGVtZW50KHMpIHRvIHNhdmUgc3RhdGVcbiAgICovXG4gIGNvbnN0IHN0YXRlU2F2ZSA9IChpdGVtcykgPT4ge1xuXG4gICAgLy8gU2F2ZSBhbGwgZHJhd2VycyBpZiBhbiBpdGVtcyBhcmcgd2Fzbid0IHBhc3NlZFxuICAgIGl0ZW1zID0gKGl0ZW1zKSA/IGl0ZW1zIDogZHJhd2Vyc1xuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIC8vIExvb3AgdGhyb3VnaCBvdXIgZHJhd2VycyBhbmQgc2F2ZSB0aGVpciBuZXcgc3RhdGUgdG8gbG9jYWwgc3RvcmFnZVxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcblxuICAgICAgaWYgKGl0ZW0uZHJhd2VyKSB7XG4gICAgICAgIGl0ZW0gPSBpdGVtLmRyYXdlclxuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IHNhdmUgZHJhd2VyIHN0YXRlIGlmIGFuIGlkIGV4aXN0c1xuICAgICAgaWYgKGl0ZW0uaWQpIHtcbiAgICAgICAgZHJhd2VyU3RhdGVbaXRlbS5pZF0gPSB1Lmhhc0NsYXNzKGl0ZW0sIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZHJhd2VyU3RhdGUnLCBKU09OLnN0cmluZ2lmeShkcmF3ZXJTdGF0ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgY2xlYXJzIHRoZSBkcmF3ZXIgc3RhdGVcbiAgICovXG4gIGNvbnN0IHN0YXRlQ2xlYXIgPSAoKSA9PiB7XG4gICAgZHJhd2VyU3RhdGUgPSB7fVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkcmF3ZXJTdGF0ZScpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGluaXRpYWxpemVzIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgY29uc3QgaW5pdFN3aXRjaCA9ICgpID0+IHtcblxuICAgIC8vIFF1ZXJ5IGFsbCB0aGUgZHJhd2VycyB3aXRoIHRoZSBzd2l0Y2ggZmVhdHVyZSBlbmFibGVkXG4gICAgc3dpdGNoRHJhd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3Muc3dpdGNoKVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBzd2l0Y2ggZHJhd2Vyc1xuICAgIHN3aXRjaERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG5cbiAgICAgIC8vIEdldCB0aGUgbG9jYWwgYnJlYWtwb2ludCBpZiBvbmUgaXMgc2V0XG4gICAgICAvLyBSZW1vdmUgYnJhY2tldHMgYW5kIHRoZSBpbnRpYWwgZGF0YSBmbGFnXG4gICAgICBsZXQgY2xlYW5TZWxlY3RvciA9IHNldHRpbmdzLnN3aXRjaFxuICAgICAgICAucmVwbGFjZSgnWycsICcnKVxuICAgICAgICAucmVwbGFjZSgnXScsICcnKVxuICAgICAgICAucmVwbGFjZSgnZGF0YS0nLCAnJylcblxuICAgICAgLy8gQ29udmVydCBzcmluZyB0byBjYW1lbENhc2VcbiAgICAgIGNsZWFuU2VsZWN0b3IgPSBjbGVhblNlbGVjdG9yLnJlcGxhY2UoLy0oW2Etel0pL2csIChnKSA9PiB7XG4gICAgICAgIHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIENoZWNrIHdoaWNoIGJyZWFrcG9pbnQgdG8gdXNlOlxuICAgICAgLy8gYSkgVGhlIGxvY2FsIGJwIHNldCBvbiB0aGUgZHJhd2VyXG4gICAgICAvLyBiKSBUaGUgYnAgYXZhaWxhYmxlIGluIGNvbmZpZyB1c2luZyBhIGtleVxuICAgICAgLy8gYykgVGhlIHJhdyBwaXhlbCB2YWx1ZSBwcm92aWRlZCBpbiBzZXR0aW5nc1xuICAgICAgbGV0IGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgIGlmIChicCkge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChicClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnAgPSB1LmdldEJyZWFrcG9pbnQoc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1lZGlhIHF1ZXJ5IGxpc3RlbmVyXG4gICAgICBsZXQgbXFsID0gd2luZG93Lm1hdGNoTWVkaWEoIFwiKG1pbi13aWR0aDpcIiArIGJwICsgXCIpXCIgKVxuXG4gICAgICAvLyBTd2l0Y2ggdG8gbW9kYWwgaWYgbWVkaWEgZG9lc24ndCBtYXRjaCAoPCBicClcbiAgICAgIGlmICghbXFsLm1hdGNoZXMpIHtcbiAgICAgICAgc3dpdGNoVG9Nb2RhbChkcmF3ZXIpXG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBvdXIgbWVkaWEgcXVlcnkgbGlzdGVuZXJcbiAgICAgIG1xbC5hZGRMaXN0ZW5lcihzd2l0Y2hDaGVjaylcblxuICAgICAgLy8gUHVzaCB0aGUgbXFsIHRvIG91ciBhcnJheSBhbG9uZyB3aXRoIGl0J3MgZHJhd2VyXG4gICAgICBtcWxBcnJheS5wdXNoKHtcbiAgICAgICAgJ2RyYXdlcicgOiBkcmF3ZXIsXG4gICAgICAgICdtcWwnOiBtcWxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgZGVzdHJveXMgdGhlIHN3aXRjaCBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBjb25zdCBkZXN0cm95U3dpdGNoID0gKCkgPT4ge1xuXG4gICAgLy8gU3dpdGNoIGFsbCBtb2RhbHMgYmFjayB0byB0aGVpciBvcmlnaW5hbCBkcmF3ZXIgc3RhdGVcbiAgICBzd2l0Y2hEcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuICAgICAgc3dpdGNoVG9EcmF3ZXIoZHJhd2VyKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgdGhlIG1lZGlhIHF1ZXJ5IGxpc3RlbmVyc1xuICAgIG1xbEFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ubXFsLnJlbW92ZUxpc3RlbmVyKHN3aXRjaENoZWNrKVxuICAgIH0pXG5cbiAgICAvLyBSZXR1cm4gc3dpdGNoIHZhcmlhYmxlcyB0byB0aGVpciBvcmlnaW5hbCBzdGF0ZVxuICAgIHN3aXRjaERyYXdlcnMgPSBudWxsXG4gICAgbXFsQXJyYXkgPSBbXVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBjaGVja3Mgd2hlbiBhIG1lZGlhIHF1ZXJ5IGhpdHMgYSBtYXRjaCBhbmQgc3dpdGNoZXNcbiAgICogdGhlIGNvbXBvbmVudCBmcm9tIGRyYXdlciB0byBtb2RhbCBhcyBuZWVkZWRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7TWVkaWFRdWVyeUxpc3R9IG1xbCAtIFRoZSBNZWRpYVF1ZXJ5TGlzdCBvYmplY3QgZm9yIHRoZSBtZWRpYSBxdWVyeVxuICAgKiBAcGFyYW0ge05vZGV9IGRyYXdlciAtIFRoZSBkcmF3ZXIgZWxlbWVudCB0byBzd2l0Y2hcbiAgICovXG4gIGNvbnN0IHN3aXRjaENoZWNrID0gKCkgPT4ge1xuICAgIG1xbEFycmF5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm1xbC5tYXRjaGVzKSB7XG4gICAgICAgIHN3aXRjaFRvRHJhd2VyKGl0ZW0uZHJhd2VyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoVG9Nb2RhbChpdGVtLmRyYXdlcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBzd2l0Y2hlcyBhIG1vZGFsIGludG8gYSBkcmF3ZXIgY29tcG9uZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGRyYXdlciAtIFRoZSBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoVG9EcmF3ZXIgPSAoZHJhd2VyKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGRpYWxvZyBhbmQgdHJpZ2dlciBlbGVtZW50cyByZWxhdGVkIHRvIHRoaXMgY29tcG9uZW50XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuXG4gICAgLy8gU3dpdGNoIHRoZSBtb2RhbCBjb21wb25lbnQgdG8gZHJhd2VyXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUYXJnZXRTd2l0Y2gsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICApXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NJbm5lclN3aXRjaCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc0lubmVyXG4gICAgKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RyaWdnZXJTd2l0Y2gsICdnaScpLFxuICAgICAgICBzZXR0aW5ncy5jbGFzc1RyaWdnZXJcbiAgICAgIClcbiAgICB9KVxuXG4gICAgLy8gT3BlbiBvciBjbG9zZSBkcmF3ZXIgYmFzZWQgb24gc2F2ZSBzdGF0ZVxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnY2xvc2UnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgc3dpdGNoZXMgYSBkcmF3ZXIgaW50byBhIG1vZGFsIGNvbXBvbmVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZWxlbWVudCB0byBzd2l0Y2hcbiAgICovXG4gIGNvbnN0IHN3aXRjaFRvTW9kYWwgPSAoZHJhd2VyKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGRpYWxvZyBhbmQgdHJpZ2dlciBlbGVtZW50cyByZWxhdGVkIHRvIHRoaXMgY29tcG9uZW50XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuXG4gICAgLy8gU3dpdGNoIHRoZSBkcmF3ZXIgY29tcG9uZW50IHRvIG1vZGFsXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUYXJnZXQsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NUYXJnZXRTd2l0Y2hcbiAgICApXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NJbm5lciwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc0lubmVyU3dpdGNoXG4gICAgKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RyaWdnZXIsICdnaScpLFxuICAgICAgICBzZXR0aW5ncy5jbGFzc1RyaWdnZXJTd2l0Y2hcbiAgICAgIClcbiAgICB9KVxuXG4gICAgLy8gUmVtb3ZlIGFjdGl2ZSBjbGFzcyBmb3IgbW9kYWwgc3R5bGVzIGJ5IGRlZmF1bHRcbiAgICB1LnJlbW92ZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBvdXIgY29tcG9uZW50IGFuZCByZXR1cm4gdGhlIGFwaVxuICAgKi9cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIE1vZGFsIHBsdWdpblxuICogLS0tXG4gKiBBIGNvbXBvbmVudCBmb3IgY2hhbmdpbmcgdGhlIG1vZGUgb2YgYSBwYWdlIHRvIGNvbXBsZXRlIGEgY3JpdGljYWwgdGFzay5cbiAqIFRoaXMgaXMgdXN1YWxseSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIERpYWxvZyBjb21wb25lbnQgdG8gbWFrZVxuICogbW9kYWwgZGlhbG9ncy5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgY2xhc3NUYXJnZXQ6ICdtb2RhbCcsXG4gICAgY2xhc3NUcmlnZ2VyOiAnbW9kYWxfX3RyaWdnZXInLFxuICAgIGNsYXNzSW5uZXI6ICdtb2RhbF9fZGlhbG9nJyxcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgZm9jdXM6ICdbZGF0YS1mb2N1c10nXG4gIH1cblxuICBsZXQgbWVtb3J5VHJpZ2dlclxuICBsZXQgbWVtb3J5VGFyZ2V0XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBvcGVuKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICB9XG5cbiAgYXBpLmNsb3NlID0gKGNsZWFyKSA9PiB7XG4gICAgY2xvc2UoY2xlYXIpXG4gIH1cblxuICBjb25zdCBvcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIHUuYWRkQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgdGFyZ2V0ID0gdGFyZ2V0Lml0ZW0oMClcbiAgICAgIGxldCBmb2N1cyA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLmZvY3VzKVxuICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChmb2N1cykge1xuICAgICAgICAgIGZvY3VzLmZvY3VzKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YXJnZXQuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNsb3NlID0gKGNsZWFyID0gZmFsc2UpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldClcbiAgICB1LnJlbW92ZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgaWYgKGNsZWFyID09IGZhbHNlICYmIG1lbW9yeVRyaWdnZXIgJiYgbWVtb3J5VGFyZ2V0KSB7XG4gICAgICBpZiAobWVtb3J5VGFyZ2V0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBtZW1vcnlUYXJnZXQuaXRlbSgwKVxuICAgICAgICBtZW1vcnlUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgICBpZiAobWVtb3J5VHJpZ2dlcikge1xuICAgICAgICAgICAgbWVtb3J5VHJpZ2dlci5mb2N1cygpXG4gICAgICAgICAgfVxuICAgICAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgICAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjbGVhciA9PSB0cnVlKSB7XG4gICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGVzY2FwZSA9ICgpID0+IHtcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAyNykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXQpXG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG4gICAgbGV0IGlubmVyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NJbm5lcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgbGV0IHRhcmdldERhdGEgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG4gICAgICBpZiAodGFyZ2V0RGF0YSkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldERhdGEpXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSB0cmlnZ2VyXG4gICAgICAgIG9wZW4obWVtb3J5VGFyZ2V0KVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmICFpbm5lcikge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgdHJpZ2dlcjogJ1tkYXRhLXRvZ2dsZS1jbGFzc10nLFxuICAgIHRhcmdldHM6ICcnLFxuICAgIGNsYXNzOiAnJ1xuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG5cbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG5cbiAgICBpZiAodHJpZ2dlcikge1xuXG4gICAgICBsZXQgdGFyZ2V0c1xuXG4gICAgICBpZiAoc2V0dGluZ3MudGFyZ2V0cykge1xuICAgICAgICB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZXR0aW5ncy50YXJnZXRzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodHJpZ2dlci5kYXRhc2V0LnRvZ2dsZVRhcmdldClcbiAgICAgIH1cblxuICAgICAgaWYgKHRhcmdldHMubGVuZ3RoKSB7XG4gICAgICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0YXJnZXQsIHRyaWdnZXIuZGF0YXNldC50b2dnbGVDbGFzcy5zcGxpdCgnICcpKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmNsYXNzKSB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0cmlnZ2VyLCBzZXR0aW5ncy5jbGFzcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRyaWdnZXIsIHRyaWdnZXIuZGF0YXNldC50b2dnbGVDbGFzcy5zcGxpdCgnICcpKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZydcblxuLyoqXG4gKiBVdGlsaXR5XG4gKiAtLS1cbiAqIEEgc2V0IG9mIGhlbHBlciBtZXRob2RzIGZvciBnZW5lcmFsIGphdmFzY3JpcHQgcGx1Z2luIHVzZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gIC8qKlxuICAgKiBHZXQgYW5kIG91dHB1dCBhIGJyZWFrcG9pbnQgdXNpbmcgaXQncyBrZXkgZm91bmQgaW4gY29uZmlnLmpzb25cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgLSBUaGUga2V5IHRvIHNlYXJjaCBmb3IgaW4gdGhlIGJyZWFrcG9pbnRzIG9iamVjdFxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSAtIFRoZSBwaXhlbCB2YWx1ZSBvZiB0aGUgYnJlYWtwb2ludCBhcyBhIHN0cmluZ1xuICAgKi9cbiAgc3RhdGljIGdldEJyZWFrcG9pbnQoa2V5KSB7XG4gICAgcmV0dXJuIGNvbmZpZy5icmVha3BvaW50c1trZXldXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGVsZW1lbnQgaGFzIGEgY2xhc3Mgb3Igbm90XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byBjaGVjayBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gY2hlY2tcbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gUmV0dXJucyB0cnVlIGlmIGNsYXNzIGV4aXN0cywgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaGFzQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICByZXR1cm4gYy5zb21lKCBmdW5jdGlvbiAoYykge1xuICAgICAgbGV0IGhhcyA9IGZhbHNlXG4gICAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGMpKSB7XG4gICAgICAgICAgaGFzID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuIGhhc1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIG9yIGNsYXNzZXMgdG8gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gYWRkIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byBhZGRcbiAgICovXG4gIHN0YXRpYyBhZGRDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNsYXNzIG9yIGNsYXNzZXMgZnJvbSBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byByZW1vdmUgY2xhc3MoZXMpIGZyb21cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gcmVtb3ZlXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUb2dnbGUgYSBjbGFzcyBvciBjbGFzc2VzIG9uIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIHRvZ2dsZSBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gdG9nZ2xlXG4gICAqL1xuICBzdGF0aWMgdG9nZ2xlQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IGJhc2VkIG9uIGNsYXNzLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgKiBuYXRpdmUgLmNsb3Nlc3QoKSBtZXRob2QgaW4gdGhhdCBpdCBkb2Vzbid0IGNoZWNrIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudCB0byBzdGFydCBzZWFyY2ggb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gY2hlY2sgZm9yXG4gICAqIEByZXR1cm4ge05vZGV9IC0gQ2xvc2VzdCBwYXJlbnQgZWxlbWVudFxuICAgKi9cbiAgc3RhdGljIGNsb3Nlc3QoZWwsIGMpIHtcbiAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50RWxlbWVudCkgJiYgIXRoaXMuaGFzQ2xhc3MoZWwsIGMpKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIG9yIG9iamVjdCB0byBhbiBhcnJheS4gSWYgYW4gYXJyYXkgaXMgcGFzc2VkLCBpdCdzXG4gICAqIHJldHVybmVkIGFzIGlzLiBBbnl0aGluZyBlbHNlIGlzIHJldHVybmVkIGFzIGFuIGFycmF5LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IGl0ZW0gLSBTdHJpbmcgb3Igb2JqZWN0IHRvIGNvbnZlcnQgdG8gYW4gYXJyYXlcbiAgICogQHJldHVybiB7QXJyYXl9IC0gUmV0dXJuIHRoZSBjb252ZXJ0ZWQgYXJyYXlcbiAgICovXG4gIHN0YXRpYyB0b0FycmF5KGl0ZW0pIHtcblxuICAgIGxldCBhcnJheSA9IFtdXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgYXJyYXkgPSBpdGVtXG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5LnB1c2goaXRlbSlcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlcbiAgfVxuXG4gIC8qKlxuICAgKiBNZXJnZSB0d28gb3IgbW9yZSBvYmplY3RzLiBSZXR1cm5zIGEgbmV3IG9iamVjdC4gU2V0IHRoZSBmaXJzdCBhcmd1bWVudFxuICAgKiB0byBgdHJ1ZWAgZm9yIGEgZGVlcCBvciByZWN1cnNpdmUgbWVyZ2UuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtPcHRpb25hbF0gLSBJZiB0cnVlLCBkbyBhIGRlZXAgKG9yIHJlY3Vyc2l2ZSkgbWVyZ2VcbiAgICogQHBhcmFtIHtPYmplY3R9IC0gVGhlIG9iamVjdHMgdG8gbWVyZ2UgdG9nZXRoZXI7IGVhY2ggb3ZlcnJpZGluZyB0aGUgbmV4dFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIE1lcmdlZCB2YWx1ZXMgb2YgZGVmYXVsdHMgYW5kIG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICBsZXQgZXh0ZW5kZWQgPSB7fVxuICAgIGxldCBkZWVwID0gZmFsc2VcbiAgICBsZXQgaSA9IDBcbiAgICBsZXQgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIGFyZ3VtZW50c1swXSApID09PSAnW29iamVjdCBCb29sZWFuXScgKSB7XG4gICAgICBkZWVwID0gYXJndW1lbnRzWzBdXG4gICAgICBpKytcbiAgICB9XG5cbiAgICBsZXQgbWVyZ2UgPSAoIG9iaiApID0+IHtcbiAgICAgIGZvciAoIGxldCBwcm9wIGluIG9iaiApIHtcbiAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoIG9iaiwgcHJvcCApICkge1xuICAgICAgICAgIGlmICggZGVlcCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW3Byb3BdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGV4dGVuZCggdHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gb2JqW3Byb3BdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICBsZXQgb2JqID0gYXJndW1lbnRzW2ldXG4gICAgICBtZXJnZShvYmopXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZGVkXG4gIH1cblxufVxuIl19

//# sourceMappingURL=scripts.js.map
