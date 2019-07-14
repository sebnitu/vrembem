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
 * [ ] Animations in JavaScript components need to be handled differently. There should the Classes specific for animation and removed when the component is existing in its current state.
 * [ ] Debug why I'm getting "TypeError: s is null" on lines 396 and 433
 * [ ] Write a promise and run switch method after default save states are set
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
    // Whether or not to enable the switch functionality
    // If enabled, a string selector to check for should be passed.
    // {false} || {string} e.g. '[data-drawer-switch]'
    "switch": '[data-drawer-switch]',
    // The default break point for when to switch to drawer or modal classes
    // {string} Either a breakpoint key or pixel value
    switchBreakpoint: 'lg',
    // Whether or not to store the save state in local storage
    // {boolean} The string to save our state object as
    saveState: true,
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

    drawers = document.querySelectorAll('.' + settings.classTarget); // Init save state functionality if it's enabled

    if (settings.saveState) {
      initSaveState();
    } // Init switch functionality if it's enabled


    if (settings["switch"]) {
      initSwitch();
    } // Add our drawer trigger event listener


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
   */


  var initSaveState = function initSaveState() {
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
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9jb25maWcuanNvbiIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9kcmF3ZXIuanMiLCIuLi9zcmMvanMvbW9kYWwuanMiLCIuLi9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vc3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBSixFQUFwQjtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUNBLElBQU0sS0FBSyxHQUFHLElBQUksaUJBQUosRUFBZDtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUVBOzs7O0FBSUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQVc7QUFFNUM7QUFDQSxNQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBcEI7O0FBRUEsTUFBSSxvQkFBRSxRQUFGLENBQVcsT0FBWCxFQUFvQixjQUFwQixDQUFKLEVBQXlDO0FBQ3ZDLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsSUFBQSxNQUFNLENBQUMsSUFBUDtBQUNEOztBQUVELE1BQUksb0JBQUUsUUFBRixDQUFXLE9BQVgsRUFBb0IsaUJBQXBCLENBQUosRUFBNEM7QUFDMUMsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFaO0FBQ0EsSUFBQSxNQUFNLENBQUMsT0FBUDtBQUNEOztBQUVELE1BQUksb0JBQUUsUUFBRixDQUFXLE9BQVgsRUFBb0IsY0FBcEIsQ0FBSixFQUF5QztBQUN2QyxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWjtBQUNBLElBQUEsTUFBTSxDQUFDLElBQVA7QUFDRDs7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QyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQWdDLFNBQVMsQ0FBQyxDQUFELENBQXpDLE1BQW1ELGtCQUF4RCxFQUE2RTtBQUMzRSxRQUFBLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBRCxDQUFoQjtBQUNBLFFBQUEsQ0FBQztBQUNGOztBQUVELFVBQUksS0FBSyxHQUFHLFNBQVIsS0FBUSxDQUFFLEdBQUYsRUFBVztBQUNyQixhQUFNLElBQUksSUFBVixJQUFrQixHQUFsQixFQUF3QjtBQUN0QixjQUFLLE1BQU0sQ0FBQyxTQUFQLENBQWlCLGNBQWpCLENBQWdDLElBQWhDLENBQXNDLEdBQXRDLEVBQTJDLElBQTNDLENBQUwsRUFBeUQ7QUFDdkQsZ0JBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLEdBQUcsQ0FBQyxJQUFELENBQWxDLE1BQThDLGlCQUEzRCxFQUErRTtBQUM3RSxjQUFBLFFBQVEsQ0FBQyxJQUFELENBQVIsR0FBaUIsTUFBTSxDQUFFLElBQUYsRUFBUSxRQUFRLENBQUMsSUFBRCxDQUFoQixFQUF3QixHQUFHLENBQUMsSUFBRCxDQUEzQixDQUF2QjtBQUNELGFBRkQsTUFFTztBQUNMLGNBQUEsUUFBUSxDQUFDLElBQUQsQ0FBUixHQUFpQixHQUFHLENBQUMsSUFBRCxDQUFwQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BVkQ7O0FBWUEsYUFBUSxDQUFDLEdBQUcsTUFBWixFQUFvQixDQUFDLEVBQXJCLEVBQTBCO0FBQ3hCLFlBQUksR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFELENBQW5CO0FBQ0EsUUFBQSxLQUFLLENBQUMsR0FBRCxDQUFMO0FBQ0Q7O0FBRUQsYUFBTyxRQUFQO0FBQ0QsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB1IGZyb20gJ3V0aWxpdHknXG5pbXBvcnQgRGlzbWlzc2libGUgZnJvbSAnZGlzbWlzc2libGUnXG5pbXBvcnQgRHJhd2VyIGZyb20gJ2RyYXdlcidcbmltcG9ydCBNb2RhbCBmcm9tICdtb2RhbCdcbmltcG9ydCBUb2dnbGUgZnJvbSAndG9nZ2xlJ1xuaW1wb3J0IGxpc3RqcyBmcm9tICdsaXN0LmpzJ1xuXG5jb25zdCBkaXNtaXNzaWJsZSA9IG5ldyBEaXNtaXNzaWJsZSgpXG5jb25zdCBkcmF3ZXIgPSBuZXcgRHJhd2VyKClcbmNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKClcbmNvbnN0IHRvZ2dsZSA9IG5ldyBUb2dnbGUoKVxuXG4vKipcbiAqIEdlbmVyYWwgZXZlbnQgdHJpZ2dlciBmb3IgdGVzdGluZ1xuICovXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cbiAgLy8gR2V0IHRoZSBlbGVtZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBldmVudFxuICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldFxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLWluaXQnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuaW5pdCgpJylcbiAgICBkcmF3ZXIuaW5pdCgpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1kZXN0cm95JykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLmRlc3Ryb3koKScpXG4gICAgZHJhd2VyLmRlc3Ryb3koKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tb3BlbicpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5vcGVuKCknKVxuICAgIGRyYXdlci5vcGVuKClcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLWNsb3NlJykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLmNsb3NlKCknKVxuICAgIGRyYXdlci5jbG9zZSgpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS10b2dnbGUnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIudG9nZ2xlKCknKVxuICAgIGRyYXdlci50b2dnbGUoKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tdG9nZ2xlLWV4YW1wbGUnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIudG9nZ2xlKFwiI2RyYXdlci1leGFtcGxlXCIpJylcbiAgICBkcmF3ZXIudG9nZ2xlKCcjZHJhd2VyLWV4YW1wbGUnKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tc3dpdGNoLWRyYXdlcicpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5zd2l0Y2hEcmF3ZXIoKScpXG4gICAgZHJhd2VyLnN3aXRjaERyYXdlcigpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1zd2l0Y2gtbW9kYWwnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuc3dpdGNoTW9kYWwoKScpXG4gICAgZHJhd2VyLnN3aXRjaE1vZGFsKClcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLXJlc2V0JykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLnN0YXRlUmVzZXQoKScpXG4gICAgZHJhd2VyLnN0YXRlUmVzZXQoKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tc2F2ZScpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5zdGF0ZVNhdmUoKScpXG4gICAgZHJhd2VyLnN0YXRlU2F2ZSgpXG4gIH1cblxufSlcblxuLyoqXG4gKiBMaXN0LmpzXG4gKiAtLS1cbiAqIEFkZHMgbGlzdCBmdW5jdGlvbmFsaXR5IGFsb25nIHdpdGggc2VhcmNoLlxuICogbGlzdC5qcyBkb2NzOiBodHRwOi8vbGlzdGpzLmNvbS9cbiAqL1xuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0anMnKSkge1xuXG4gIC8vIEluaXQgb3VyIGxpc3QuanMgY29tcG9uZW50XG4gIGNvbnN0IGxpc3QgPSBuZXcgbGlzdGpzKCdsaXN0anMnLCB7XG4gICAgZnV6enlTZWFyY2g6IHtcbiAgICAgIHNlYXJjaENsYXNzOiAnc2VhcmNoJyxcbiAgICAgIGxvY2F0aW9uOiAwLFxuICAgICAgZGlzdGFuY2U6IDEwMCxcbiAgICAgIHRocmVzaG9sZDogMC40LFxuICAgICAgbXVsdGlTZWFyY2g6IHRydWVcbiAgICB9LFxuICAgIHZhbHVlTmFtZXM6IFtcbiAgICAgICduYW1lJyxcbiAgICAgIHsgZGF0YTogWydjYXRlZ29yeSddIH1cbiAgICBdLFxuICAgIGxpc3RDbGFzczogJ21lbnUnXG4gIH0pXG5cbiAgLy8gRW1wdHkgTm90aWNlXG4gIC8vIERpc3BsYXllZCB3aGVuIHRoZSBzZWFyY2ggcmV0dXJucyBubyByZXN1bHRzXG4gIGxldCBub3RpY2VfZW1wdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubm90aWNlX2VtcHR5JylcbiAgbGV0IG5vdGljZV9lbXB0eV90ZXh0ID0gbm90aWNlX2VtcHR5LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2hfdGV4dCcpXG5cbiAgLy8gQ2xlYXIgc2VhcmNoIGJ1dHRvblxuICBsZXQgZmlsdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlcicpXG4gIGxldCBzZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyIC5zZWFyY2gnKVxuICBsZXQgc2VhcmNoX2NsZWFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlciAuc2VhcmNoX2NsZWFyJylcblxuICAvLyBPbiBzZWFyY2ggY29tcGxldGUgY2FsbGJhY2tcbiAgbGlzdC5vbignc2VhcmNoQ29tcGxldGUnLCAoKSA9PiB7XG5cbiAgICAvLyBVcGRhdGUgdGhlIHNlYXJjaCB0ZXh0IGluIGVtcHR5IG5vdGljZVxuICAgIGxldCB2YWx1ZSA9IHNlYXJjaC52YWx1ZVxuICAgIG5vdGljZV9lbXB0eV90ZXh0LmlubmVySFRNTCA9IHZhbHVlXG5cbiAgICAvLyBTaG93IGNsZWFyIHNlYXJjaCBidXR0b24gaWYgYSB2YWx1ZSB0aGVyZSBpcyBzb21ldGhpbmcgaW4gc2VhcmNoXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB1LmFkZENsYXNzKGZpbHRlciwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LmFkZENsYXNzKHNlYXJjaCwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LnJlbW92ZUNsYXNzKHNlYXJjaF9jbGVhciwgJ2Rfbm9uZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MoZmlsdGVyLCAnaXMtYWN0aXZlJylcbiAgICAgIHUucmVtb3ZlQ2xhc3Moc2VhcmNoLCAnaXMtYWN0aXZlJylcbiAgICAgIHUuYWRkQ2xhc3Moc2VhcmNoX2NsZWFyLCAnZF9ub25lJylcbiAgICB9XG5cbiAgICAvLyBUb2dnbGUgbm90aWNlIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mIHZpc2libGUgaXRlbXNcbiAgICBpZiAobGlzdC52aXNpYmxlSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgdS5hZGRDbGFzcyhub3RpY2VfZW1wdHksICdkX25vbmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnJlbW92ZUNsYXNzKG5vdGljZV9lbXB0eSwgJ2Rfbm9uZScpXG4gICAgfVxuICB9KVxuXG4gIC8vIENsaWNrIGV2ZW50cyBmb3IgY2F0ZWdvcnkgYW5kIGNsZWFyc1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlcl9zZWFyY2hfY2xlYXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLnNlYXJjaF9jbGVhcicpXG4gICAgbGV0IHRyaWdnZXJfc2VhcmNoX2NhdCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuY2F0ZWdvcnknKVxuXG4gICAgaWYgKHRyaWdnZXJfc2VhcmNoX2NsZWFyKSB7XG4gICAgICBzZWFyY2gudmFsdWUgPSAnJ1xuICAgICAgbGlzdC5zZWFyY2goKVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGlmICh0cmlnZ2VyX3NlYXJjaF9jYXQpIHtcbiAgICAgIHNlYXJjaC52YWx1ZSA9IHRyaWdnZXJfc2VhcmNoX2NhdC5kYXRhc2V0LmNhdGVnb3J5XG4gICAgICBsaXN0LnNlYXJjaChzZWFyY2gudmFsdWUpXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuXG4gIH0sIGZhbHNlKVxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGFkZEFzeW5jID0gZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaywgaXRlbXMpIHtcbiAgICB2YXIgdmFsdWVzVG9BZGQgPSB2YWx1ZXMuc3BsaWNlKDAsIDUwKTtcbiAgICBpdGVtcyA9IGl0ZW1zIHx8IFtdO1xuICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KGxpc3QuYWRkKHZhbHVlc1RvQWRkKSk7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBhZGRBc3luYyh2YWx1ZXMsIGNhbGxiYWNrLCBpdGVtcyk7XG4gICAgICB9LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC51cGRhdGUoKTtcbiAgICAgIGNhbGxiYWNrKGl0ZW1zKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBhZGRBc3luYztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICAvLyBBZGQgaGFuZGxlcnNcbiAgbGlzdC5oYW5kbGVycy5maWx0ZXJTdGFydCA9IGxpc3QuaGFuZGxlcnMuZmlsdGVyU3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuZmlsdGVyQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLmZpbHRlckNvbXBsZXRlIHx8IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbihmaWx0ZXJGdW5jdGlvbikge1xuICAgIGxpc3QudHJpZ2dlcignZmlsdGVyU3RhcnQnKTtcbiAgICBsaXN0LmkgPSAxOyAvLyBSZXNldCBwYWdpbmdcbiAgICBsaXN0LnJlc2V0LmZpbHRlcigpO1xuICAgIGlmIChmaWx0ZXJGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaXN0LmZpbHRlcmVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QuZmlsdGVyZWQgPSB0cnVlO1xuICAgICAgdmFyIGlzID0gbGlzdC5pdGVtcztcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBpc1tpXTtcbiAgICAgICAgaWYgKGZpbHRlckZ1bmN0aW9uKGl0ZW0pKSB7XG4gICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdmaWx0ZXJDb21wbGV0ZScpO1xuICAgIHJldHVybiBsaXN0LnZpc2libGVJdGVtcztcbiAgfTtcbn07XG4iLCJcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyksXG4gIHRvU3RyaW5nID0gcmVxdWlyZSgnLi91dGlscy90by1zdHJpbmcnKSxcbiAgZ2V0QnlDbGFzcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWJ5LWNsYXNzJyksXG4gIGZ1enp5ID0gcmVxdWlyZSgnLi91dGlscy9mdXp6eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgbG9jYXRpb246IDAsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICB0aHJlc2hvbGQ6IDAuNCxcbiAgICBtdWx0aVNlYXJjaDogdHJ1ZSxcbiAgICBzZWFyY2hDbGFzczogJ2Z1enp5LXNlYXJjaCdcbiAgfSwgb3B0aW9ucyk7XG5cblxuXG4gIHZhciBmdXp6eVNlYXJjaCA9IHtcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgY29sdW1ucykge1xuICAgICAgLy8gU3Vic3RyYWN0IGFyZ3VtZW50cyBmcm9tIHRoZSBzZWFyY2hTdHJpbmcgb3IgcHV0IHNlYXJjaFN0cmluZyBhcyBvbmx5IGFyZ3VtZW50XG4gICAgICB2YXIgc2VhcmNoQXJndW1lbnRzID0gb3B0aW9ucy5tdWx0aVNlYXJjaCA/IHNlYXJjaFN0cmluZy5yZXBsYWNlKC8gKyQvLCAnJykuc3BsaXQoLyArLykgOiBbc2VhcmNoU3RyaW5nXTtcblxuICAgICAgZm9yICh2YXIgayA9IDAsIGtsID0gbGlzdC5pdGVtcy5sZW5ndGg7IGsgPCBrbDsgaysrKSB7XG4gICAgICAgIGZ1enp5U2VhcmNoLml0ZW0obGlzdC5pdGVtc1trXSwgY29sdW1ucywgc2VhcmNoQXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGNvbHVtbnMsIHNlYXJjaEFyZ3VtZW50cykge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWFyY2hBcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZvdW5kQXJndW1lbnQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gY29sdW1ucy5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgaWYgKGZ1enp5U2VhcmNoLnZhbHVlcyhpdGVtLnZhbHVlcygpLCBjb2x1bW5zW2pdLCBzZWFyY2hBcmd1bWVudHNbaV0pKSB7XG4gICAgICAgICAgICBmb3VuZEFyZ3VtZW50ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWZvdW5kQXJndW1lbnQpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpdGVtLmZvdW5kID0gZm91bmQ7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKHZhbHVlcywgdmFsdWUsIHNlYXJjaEFyZ3VtZW50KSB7XG4gICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgICB2YXIgdGV4dCA9IHRvU3RyaW5nKHZhbHVlc1t2YWx1ZV0pLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKGZ1enp5KHRleHQsIHNlYXJjaEFyZ3VtZW50LCBvcHRpb25zKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG5cbiAgZXZlbnRzLmJpbmQoZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIG9wdGlvbnMuc2VhcmNoQ2xhc3MpLCAna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDsgLy8gSUUgaGF2ZSBzcmNFbGVtZW50XG4gICAgbGlzdC5zZWFyY2godGFyZ2V0LnZhbHVlLCBmdXp6eVNlYXJjaC5zZWFyY2gpO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24oc3RyLCBjb2x1bW5zKSB7XG4gICAgbGlzdC5zZWFyY2goc3RyLCBjb2x1bW5zLCBmdXp6eVNlYXJjaC5zZWFyY2gpO1xuICB9O1xufTtcbiIsInZhciBuYXR1cmFsU29ydCA9IHJlcXVpcmUoJ3N0cmluZy1uYXR1cmFsLWNvbXBhcmUnKSxcbiAgZ2V0QnlDbGFzcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWJ5LWNsYXNzJyksXG4gIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyksXG4gIGluZGV4T2YgPSByZXF1aXJlKCcuL3V0aWxzL2luZGV4LW9mJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIHRvU3RyaW5nID0gcmVxdWlyZSgnLi91dGlscy90by1zdHJpbmcnKSxcbiAgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBnZXRBdHRyaWJ1dGUgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1hdHRyaWJ1dGUnKSxcbiAgdG9BcnJheSA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpZCwgb3B0aW9ucywgdmFsdWVzKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzLFxuICAgIGluaXQsXG4gICAgSXRlbSA9IHJlcXVpcmUoJy4vaXRlbScpKHNlbGYpLFxuICAgIGFkZEFzeW5jID0gcmVxdWlyZSgnLi9hZGQtYXN5bmMnKShzZWxmKSxcbiAgICBpbml0UGFnaW5hdGlvbiA9IHJlcXVpcmUoJy4vcGFnaW5hdGlvbicpKHNlbGYpO1xuXG4gIGluaXQgPSB7XG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5saXN0Q2xhc3MgICAgICA9IFwibGlzdFwiO1xuICAgICAgc2VsZi5zZWFyY2hDbGFzcyAgICA9IFwic2VhcmNoXCI7XG4gICAgICBzZWxmLnNvcnRDbGFzcyAgICAgID0gXCJzb3J0XCI7XG4gICAgICBzZWxmLnBhZ2UgICAgICAgICAgID0gMTAwMDA7XG4gICAgICBzZWxmLmkgICAgICAgICAgICAgID0gMTtcbiAgICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICAgIHNlbGYudmlzaWJsZUl0ZW1zICAgPSBbXTtcbiAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcyAgPSBbXTtcbiAgICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICAgIHNlbGYuZmlsdGVyZWQgICAgICAgPSBmYWxzZTtcbiAgICAgIHNlbGYuc2VhcmNoQ29sdW1ucyAgPSB1bmRlZmluZWQ7XG4gICAgICBzZWxmLmhhbmRsZXJzICAgICAgID0geyAndXBkYXRlZCc6IFtdIH07XG4gICAgICBzZWxmLnZhbHVlTmFtZXMgICAgID0gW107XG4gICAgICBzZWxmLnV0aWxzICAgICAgICAgID0ge1xuICAgICAgICBnZXRCeUNsYXNzOiBnZXRCeUNsYXNzLFxuICAgICAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICAgICAgaW5kZXhPZjogaW5kZXhPZixcbiAgICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICAgIHRvU3RyaW5nOiB0b1N0cmluZyxcbiAgICAgICAgbmF0dXJhbFNvcnQ6IG5hdHVyYWxTb3J0LFxuICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICBnZXRBdHRyaWJ1dGU6IGdldEF0dHJpYnV0ZSxcbiAgICAgICAgdG9BcnJheTogdG9BcnJheVxuICAgICAgfTtcblxuICAgICAgc2VsZi51dGlscy5leHRlbmQoc2VsZiwgb3B0aW9ucyk7XG5cbiAgICAgIHNlbGYubGlzdENvbnRhaW5lciA9ICh0eXBlb2YoaWQpID09PSAnc3RyaW5nJykgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgOiBpZDtcbiAgICAgIGlmICghc2VsZi5saXN0Q29udGFpbmVyKSB7IHJldHVybjsgfVxuICAgICAgc2VsZi5saXN0ICAgICAgID0gZ2V0QnlDbGFzcyhzZWxmLmxpc3RDb250YWluZXIsIHNlbGYubGlzdENsYXNzLCB0cnVlKTtcblxuICAgICAgc2VsZi5wYXJzZSAgICAgICAgPSByZXF1aXJlKCcuL3BhcnNlJykoc2VsZik7XG4gICAgICBzZWxmLnRlbXBsYXRlciAgICA9IHJlcXVpcmUoJy4vdGVtcGxhdGVyJykoc2VsZik7XG4gICAgICBzZWxmLnNlYXJjaCAgICAgICA9IHJlcXVpcmUoJy4vc2VhcmNoJykoc2VsZik7XG4gICAgICBzZWxmLmZpbHRlciAgICAgICA9IHJlcXVpcmUoJy4vZmlsdGVyJykoc2VsZik7XG4gICAgICBzZWxmLnNvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vc29ydCcpKHNlbGYpO1xuICAgICAgc2VsZi5mdXp6eVNlYXJjaCAgPSByZXF1aXJlKCcuL2Z1enp5LXNlYXJjaCcpKHNlbGYsIG9wdGlvbnMuZnV6enlTZWFyY2gpO1xuXG4gICAgICB0aGlzLmhhbmRsZXJzKCk7XG4gICAgICB0aGlzLml0ZW1zKCk7XG4gICAgICB0aGlzLnBhZ2luYXRpb24oKTtcblxuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9LFxuICAgIGhhbmRsZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGhhbmRsZXIgaW4gc2VsZi5oYW5kbGVycykge1xuICAgICAgICBpZiAoc2VsZltoYW5kbGVyXSkge1xuICAgICAgICAgIHNlbGYub24oaGFuZGxlciwgc2VsZltoYW5kbGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYucGFyc2Uoc2VsZi5saXN0KTtcbiAgICAgIGlmICh2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZWxmLmFkZCh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcGFnaW5hdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbiA9IFt7fV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvblswXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICBvcHRpb25zLnBhZ2luYXRpb24gPSBbb3B0aW9ucy5wYWdpbmF0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvcHRpb25zLnBhZ2luYXRpb24ubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAgIGluaXRQYWdpbmF0aW9uKG9wdGlvbnMucGFnaW5hdGlvbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLypcbiAgKiBSZS1wYXJzZSB0aGUgTGlzdCwgdXNlIGlmIGh0bWwgaGF2ZSBjaGFuZ2VkXG4gICovXG4gIHRoaXMucmVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zICA9IFtdO1xuICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgc2VsZi5wYXJzZShzZWxmLmxpc3QpO1xuICB9O1xuXG4gIHRoaXMudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGpzb24gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGpzb24ucHVzaChzZWxmLml0ZW1zW2ldLnZhbHVlcygpKTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH07XG5cblxuICAvKlxuICAqIEFkZCBvYmplY3QgdG8gbGlzdFxuICAqL1xuICB0aGlzLmFkZCA9IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYWRkZWQgPSBbXSxcbiAgICAgIG5vdENyZWF0ZSA9IGZhbHNlO1xuICAgIGlmICh2YWx1ZXNbMF0gPT09IHVuZGVmaW5lZCl7XG4gICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdmFsdWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbnVsbDtcbiAgICAgIG5vdENyZWF0ZSA9IChzZWxmLml0ZW1zLmxlbmd0aCA+IHNlbGYucGFnZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICBpdGVtID0gbmV3IEl0ZW0odmFsdWVzW2ldLCB1bmRlZmluZWQsIG5vdENyZWF0ZSk7XG4gICAgICBzZWxmLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICBhZGRlZC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBhZGRlZDtcbiAgfTtcblxuXHR0aGlzLnNob3cgPSBmdW5jdGlvbihpLCBwYWdlKSB7XG5cdFx0dGhpcy5pID0gaTtcblx0XHR0aGlzLnBhZ2UgPSBwYWdlO1xuXHRcdHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIHNlbGY7XG5cdH07XG5cbiAgLyogUmVtb3ZlcyBvYmplY3QgZnJvbSBsaXN0LlxuICAqIExvb3BzIHRocm91Z2ggdGhlIGxpc3QgYW5kIHJlbW92ZXMgb2JqZWN0cyB3aGVyZVxuICAqIHByb3BlcnR5IFwidmFsdWVuYW1lXCIgPT09IHZhbHVlXG4gICovXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24odmFsdWVOYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBmb3VuZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoc2VsZi5pdGVtc1tpXS52YWx1ZXMoKVt2YWx1ZU5hbWVdID09IHZhbHVlKSB7XG4gICAgICAgIHNlbGYudGVtcGxhdGVyLnJlbW92ZShzZWxmLml0ZW1zW2ldLCBvcHRpb25zKTtcbiAgICAgICAgc2VsZi5pdGVtcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgaWwtLTtcbiAgICAgICAgaS0tO1xuICAgICAgICBmb3VuZCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKiBHZXRzIHRoZSBvYmplY3RzIGluIHRoZSBsaXN0IHdoaWNoXG4gICogcHJvcGVydHkgXCJ2YWx1ZU5hbWVcIiA9PT0gdmFsdWVcbiAgKi9cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbih2YWx1ZU5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoZWRJdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzZWxmLml0ZW1zW2ldO1xuICAgICAgaWYgKGl0ZW0udmFsdWVzKClbdmFsdWVOYW1lXSA9PSB2YWx1ZSkge1xuICAgICAgICBtYXRjaGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZWRJdGVtcztcbiAgfTtcblxuICAvKlxuICAqIEdldCBzaXplIG9mIHRoZSBsaXN0XG4gICovXG4gIHRoaXMuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzZWxmLml0ZW1zLmxlbmd0aDtcbiAgfTtcblxuICAvKlxuICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhlIGxpc3RcbiAgKi9cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgc2VsZi5pdGVtcyA9IFtdO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMub24gPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICBzZWxmLmhhbmRsZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gc2VsZi5oYW5kbGVyc1tldmVudF07XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihlLCBjYWxsYmFjayk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSA9IHNlbGYuaGFuZGxlcnNbZXZlbnRdLmxlbmd0aDtcbiAgICB3aGlsZShpLS0pIHtcbiAgICAgIHNlbGYuaGFuZGxlcnNbZXZlbnRdW2ldKHNlbGYpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0ge1xuICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuICAgICAgICBpbCA9IGlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpbC0tKSB7XG4gICAgICAgIGlzW2lsXS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcbiAgICAgICAgaWwgPSBpcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWwtLSkge1xuICAgICAgICBpc1tpbF0uZm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG5cdFx0XHRpbCA9IGlzLmxlbmd0aDtcblxuICAgIHNlbGYudmlzaWJsZUl0ZW1zID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zID0gW107XG4gICAgc2VsZi50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChpc1tpXS5tYXRjaGluZygpICYmICgoc2VsZi5tYXRjaGluZ0l0ZW1zLmxlbmd0aCsxKSA+PSBzZWxmLmkgJiYgc2VsZi52aXNpYmxlSXRlbXMubGVuZ3RoIDwgc2VsZi5wYWdlKSkge1xuICAgICAgICBpc1tpXS5zaG93KCk7XG4gICAgICAgIHNlbGYudmlzaWJsZUl0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBzZWxmLm1hdGNoaW5nSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICB9IGVsc2UgaWYgKGlzW2ldLm1hdGNoaW5nKCkpIHtcbiAgICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYudHJpZ2dlcigndXBkYXRlZCcpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIGluaXQuc3RhcnQoKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSkge1xuICAgIHZhciBpdGVtID0gdGhpcztcblxuICAgIHRoaXMuX3ZhbHVlcyA9IHt9O1xuXG4gICAgdGhpcy5mb3VuZCA9IGZhbHNlOyAvLyBTaG93IGlmIGxpc3Quc2VhcmNoZWQgPT0gdHJ1ZSBhbmQgdGhpcy5mb3VuZCA9PSB0cnVlXG4gICAgdGhpcy5maWx0ZXJlZCA9IGZhbHNlOy8vIFNob3cgaWYgbGlzdC5maWx0ZXJlZCA9PSB0cnVlIGFuZCB0aGlzLmZpbHRlcmVkID09IHRydWVcblxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24oaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKSB7XG4gICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChub3RDcmVhdGUpIHtcbiAgICAgICAgICBpdGVtLnZhbHVlcyhpbml0VmFsdWVzLCBub3RDcmVhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0udmFsdWVzKGluaXRWYWx1ZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmVsbSA9IGVsZW1lbnQ7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBsaXN0LnRlbXBsYXRlci5nZXQoaXRlbSwgaW5pdFZhbHVlcyk7XG4gICAgICAgIGl0ZW0udmFsdWVzKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudmFsdWVzID0gZnVuY3Rpb24obmV3VmFsdWVzLCBub3RDcmVhdGUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IodmFyIG5hbWUgaW4gbmV3VmFsdWVzKSB7XG4gICAgICAgICAgaXRlbS5fdmFsdWVzW25hbWVdID0gbmV3VmFsdWVzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3RDcmVhdGUgIT09IHRydWUpIHtcbiAgICAgICAgICBsaXN0LnRlbXBsYXRlci5zZXQoaXRlbSwgaXRlbS52YWx1ZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpdGVtLl92YWx1ZXM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuc2hvdyhpdGVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnRlbXBsYXRlci5oaWRlKGl0ZW0pO1xuICAgIH07XG5cbiAgICB0aGlzLm1hdGNoaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAobGlzdC5maWx0ZXJlZCAmJiBsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZm91bmQgJiYgaXRlbS5maWx0ZXJlZCkgfHxcbiAgICAgICAgKGxpc3QuZmlsdGVyZWQgJiYgIWxpc3Quc2VhcmNoZWQgJiYgaXRlbS5maWx0ZXJlZCkgfHxcbiAgICAgICAgKCFsaXN0LmZpbHRlcmVkICYmIGxpc3Quc2VhcmNoZWQgJiYgaXRlbS5mb3VuZCkgfHxcbiAgICAgICAgKCFsaXN0LmZpbHRlcmVkICYmICFsaXN0LnNlYXJjaGVkKVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhpcy52aXNpYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGl0ZW0uZWxtICYmIChpdGVtLmVsbS5wYXJlbnROb2RlID09IGxpc3QubGlzdCkpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICBpbml0KGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSk7XG4gIH07XG59O1xuIiwidmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgTGlzdCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbihwYWdpbmdMaXN0LCBvcHRpb25zKSB7XG4gICAgdmFyIGl0ZW0sXG4gICAgICBsID0gbGlzdC5tYXRjaGluZ0l0ZW1zLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gbGlzdC5pLFxuICAgICAgcGFnZSA9IGxpc3QucGFnZSxcbiAgICAgIHBhZ2VzID0gTWF0aC5jZWlsKGwgLyBwYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlID0gTWF0aC5jZWlsKChpbmRleCAvIHBhZ2UpKSxcbiAgICAgIGlubmVyV2luZG93ID0gb3B0aW9ucy5pbm5lcldpbmRvdyB8fCAyLFxuICAgICAgbGVmdCA9IG9wdGlvbnMubGVmdCB8fCBvcHRpb25zLm91dGVyV2luZG93IHx8IDAsXG4gICAgICByaWdodCA9IG9wdGlvbnMucmlnaHQgfHwgb3B0aW9ucy5vdXRlcldpbmRvdyB8fCAwO1xuXG4gICAgcmlnaHQgPSBwYWdlcyAtIHJpZ2h0O1xuXG4gICAgcGFnaW5nTGlzdC5jbGVhcigpO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHBhZ2VzOyBpKyspIHtcbiAgICAgIHZhciBjbGFzc05hbWUgPSAoY3VycmVudFBhZ2UgPT09IGkpID8gXCJhY3RpdmVcIiA6IFwiXCI7XG5cbiAgICAgIC8vY29uc29sZS5sb2coaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCAoY3VycmVudFBhZ2UgLSBpbm5lcldpbmRvdyksIChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSwgY2xhc3NOYW1lKTtcblxuICAgICAgaWYgKGlzLm51bWJlcihpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IGksXG4gICAgICAgICAgZG90dGVkOiBmYWxzZVxuICAgICAgICB9KVswXTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgIGNsYXNzZXMoaXRlbS5lbG0pLmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50KGl0ZW0uZWxtLCBpLCBwYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXMuZG90dGVkKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIHBhZ2luZ0xpc3Quc2l6ZSgpKSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IFwiLi4uXCIsXG4gICAgICAgICAgZG90dGVkOiB0cnVlXG4gICAgICAgIH0pWzBdO1xuICAgICAgICBjbGFzc2VzKGl0ZW0uZWxtKS5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzID0ge1xuICAgIG51bWJlcjogZnVuY3Rpb24oaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgIHJldHVybiB0aGlzLmxlZnQoaSwgbGVmdCkgfHwgdGhpcy5yaWdodChpLCByaWdodCkgfHwgdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpO1xuICAgIH0sXG4gICAgbGVmdDogZnVuY3Rpb24oaSwgbGVmdCkge1xuICAgICAgcmV0dXJuIChpIDw9IGxlZnQpO1xuICAgIH0sXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGksIHJpZ2h0KSB7XG4gICAgICByZXR1cm4gKGkgPiByaWdodCk7XG4gICAgfSxcbiAgICBpbm5lcldpbmRvdzogZnVuY3Rpb24oaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICByZXR1cm4gKCBpID49IChjdXJyZW50UGFnZSAtIGlubmVyV2luZG93KSAmJiBpIDw9IChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSk7XG4gICAgfSxcbiAgICBkb3R0ZWQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuZG90dGVkTGVmdChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB8fCAodGhpcy5kb3R0ZWRSaWdodChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pKTtcbiAgICB9LFxuICAgIGRvdHRlZExlZnQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgIHJldHVybiAoKGkgPT0gKGxlZnQgKyAxKSkgJiYgIXRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSAmJiAhdGhpcy5yaWdodChpLCByaWdodCkpO1xuICAgIH0sXG4gICAgZG90dGVkUmlnaHQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgaWYgKHBhZ2luZ0xpc3QuaXRlbXNbY3VycmVudFBhZ2VJdGVtLTFdLnZhbHVlcygpLmRvdHRlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKChpID09IChyaWdodCkpICYmICF0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgJiYgIXRoaXMucmlnaHQoaSwgcmlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWxtLCBpLCBwYWdlKSB7XG4gICAgIGV2ZW50cy5iaW5kKGVsbSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgbGlzdC5zaG93KChpLTEpKnBhZ2UgKyAxLCBwYWdlKTtcbiAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgcGFnaW5nTGlzdCA9IG5ldyBMaXN0KGxpc3QubGlzdENvbnRhaW5lci5pZCwge1xuICAgICAgbGlzdENsYXNzOiBvcHRpb25zLnBhZ2luYXRpb25DbGFzcyB8fCAncGFnaW5hdGlvbicsXG4gICAgICBpdGVtOiBcIjxsaT48YSBjbGFzcz0ncGFnZScgaHJlZj0namF2YXNjcmlwdDpmdW5jdGlvbiBaKCl7Wj1cXFwiXFxcIn1aKCknPjwvYT48L2xpPlwiLFxuICAgICAgdmFsdWVOYW1lczogWydwYWdlJywgJ2RvdHRlZCddLFxuICAgICAgc2VhcmNoQ2xhc3M6ICdwYWdpbmF0aW9uLXNlYXJjaC10aGF0LWlzLW5vdC1zdXBwb3NlZC10by1leGlzdCcsXG4gICAgICBzb3J0Q2xhc3M6ICdwYWdpbmF0aW9uLXNvcnQtdGhhdC1pcy1ub3Qtc3VwcG9zZWQtdG8tZXhpc3QnXG4gICAgfSk7XG5cbiAgICBsaXN0Lm9uKCd1cGRhdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICByZWZyZXNoKHBhZ2luZ0xpc3QsIG9wdGlvbnMpO1xuICAgIH0pO1xuICAgIHJlZnJlc2gocGFnaW5nTGlzdCwgb3B0aW9ucyk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIEl0ZW0gPSByZXF1aXJlKCcuL2l0ZW0nKShsaXN0KTtcblxuICB2YXIgZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICB2YXIgbm9kZXMgPSBwYXJlbnQuY2hpbGROb2RlcyxcbiAgICAgIGl0ZW1zID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbm9kZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgLy8gT25seSB0ZXh0bm9kZXMgaGF2ZSBhIGRhdGEgYXR0cmlidXRlXG4gICAgICBpZiAobm9kZXNbaV0uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobm9kZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlbXM7XG4gIH07XG5cbiAgdmFyIHBhcnNlID0gZnVuY3Rpb24oaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gaXRlbUVsZW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxpc3QuaXRlbXMucHVzaChuZXcgSXRlbSh2YWx1ZU5hbWVzLCBpdGVtRWxlbWVudHNbaV0pKTtcbiAgICB9XG4gIH07XG4gIHZhciBwYXJzZUFzeW5jID0gZnVuY3Rpb24oaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKSB7XG4gICAgdmFyIGl0ZW1zVG9JbmRleCA9IGl0ZW1FbGVtZW50cy5zcGxpY2UoMCwgNTApOyAvLyBUT0RPOiBJZiA8IDEwMCBpdGVtcywgd2hhdCBoYXBwZW5zIGluIElFIGV0Yz9cbiAgICBwYXJzZShpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIGlmIChpdGVtRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcGFyc2VBc3luYyhpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpO1xuICAgICAgfSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QudXBkYXRlKCk7XG4gICAgICBsaXN0LnRyaWdnZXIoJ3BhcnNlQ29tcGxldGUnKTtcbiAgICB9XG4gIH07XG5cbiAgbGlzdC5oYW5kbGVycy5wYXJzZUNvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5wYXJzZUNvbXBsZXRlIHx8IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXNUb0luZGV4ID0gZ2V0Q2hpbGRyZW4obGlzdC5saXN0KSxcbiAgICAgIHZhbHVlTmFtZXMgPSBsaXN0LnZhbHVlTmFtZXM7XG5cbiAgICBpZiAobGlzdC5pbmRleEFzeW5jKSB7XG4gICAgICBwYXJzZUFzeW5jKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgaXRlbSxcbiAgICB0ZXh0LFxuICAgIGNvbHVtbnMsXG4gICAgc2VhcmNoU3RyaW5nLFxuICAgIGN1c3RvbVNlYXJjaDtcblxuICB2YXIgcHJlcGFyZSA9IHtcbiAgICByZXNldExpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5pID0gMTtcbiAgICAgIGxpc3QudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgICBjdXN0b21TZWFyY2ggPSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBzZXRPcHRpb25zOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPT0gMiAmJiBhcmdzWzFdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgY29sdW1ucyA9IGFyZ3NbMV07XG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDIgJiYgdHlwZW9mKGFyZ3NbMV0pID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgICAgICBjdXN0b21TZWFyY2ggPSBhcmdzWzFdO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIGNvbHVtbnMgPSBhcmdzWzFdO1xuICAgICAgICBjdXN0b21TZWFyY2ggPSBhcmdzWzJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldENvbHVtbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGxpc3QuaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBpZiAoY29sdW1ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbnMgPSAobGlzdC5zZWFyY2hDb2x1bW5zID09PSB1bmRlZmluZWQpID8gcHJlcGFyZS50b0FycmF5KGxpc3QuaXRlbXNbMF0udmFsdWVzKCkpIDogbGlzdC5zZWFyY2hDb2x1bW5zO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0U2VhcmNoU3RyaW5nOiBmdW5jdGlvbihzKSB7XG4gICAgICBzID0gbGlzdC51dGlscy50b1N0cmluZyhzKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcyA9IHMucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNdL2csIFwiXFxcXCQmXCIpOyAvLyBFc2NhcGUgcmVndWxhciBleHByZXNzaW9uIGNoYXJhY3RlcnNcbiAgICAgIHNlYXJjaFN0cmluZyA9IHM7XG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciB0bXBDb2x1bW4gPSBbXTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gdmFsdWVzKSB7XG4gICAgICAgIHRtcENvbHVtbi5wdXNoKG5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRtcENvbHVtbjtcbiAgICB9XG4gIH07XG4gIHZhciBzZWFyY2ggPSB7XG4gICAgbGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBrID0gMCwga2wgPSBsaXN0Lml0ZW1zLmxlbmd0aDsgayA8IGtsOyBrKyspIHtcbiAgICAgICAgc2VhcmNoLml0ZW0obGlzdC5pdGVtc1trXSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpdGVtLmZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjb2x1bW5zLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgaWYgKHNlYXJjaC52YWx1ZXMoaXRlbS52YWx1ZXMoKSwgY29sdW1uc1tqXSkpIHtcbiAgICAgICAgICBpdGVtLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24odmFsdWVzLCBjb2x1bW4pIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoY29sdW1uKSkge1xuICAgICAgICB0ZXh0ID0gbGlzdC51dGlscy50b1N0cmluZyh2YWx1ZXNbY29sdW1uXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKChzZWFyY2hTdHJpbmcgIT09IFwiXCIpICYmICh0ZXh0LnNlYXJjaChzZWFyY2hTdHJpbmcpID4gLTEpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QucmVzZXQuc2VhcmNoKCk7XG4gICAgICBsaXN0LnNlYXJjaGVkID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzZWFyY2hNZXRob2QgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBsaXN0LnRyaWdnZXIoJ3NlYXJjaFN0YXJ0Jyk7XG5cbiAgICBwcmVwYXJlLnJlc2V0TGlzdCgpO1xuICAgIHByZXBhcmUuc2V0U2VhcmNoU3RyaW5nKHN0cik7XG4gICAgcHJlcGFyZS5zZXRPcHRpb25zKGFyZ3VtZW50cyk7IC8vIHN0ciwgY29sc3xzZWFyY2hGdW5jdGlvbiwgc2VhcmNoRnVuY3Rpb25cbiAgICBwcmVwYXJlLnNldENvbHVtbnMoKTtcblxuICAgIGlmIChzZWFyY2hTdHJpbmcgPT09IFwiXCIgKSB7XG4gICAgICBzZWFyY2gucmVzZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zZWFyY2hlZCA9IHRydWU7XG4gICAgICBpZiAoY3VzdG9tU2VhcmNoKSB7XG4gICAgICAgIGN1c3RvbVNlYXJjaChzZWFyY2hTdHJpbmcsIGNvbHVtbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoLmxpc3QoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignc2VhcmNoQ29tcGxldGUnKTtcbiAgICByZXR1cm4gbGlzdC52aXNpYmxlSXRlbXM7XG4gIH07XG5cbiAgbGlzdC5oYW5kbGVycy5zZWFyY2hTdGFydCA9IGxpc3QuaGFuZGxlcnMuc2VhcmNoU3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuc2VhcmNoQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnNlYXJjaENvbXBsZXRlIHx8IFtdO1xuXG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQobGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zZWFyY2hDbGFzcyksICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LCAvLyBJRSBoYXZlIHNyY0VsZW1lbnRcbiAgICAgIGFscmVhZHlDbGVhcmVkID0gKHRhcmdldC52YWx1ZSA9PT0gXCJcIiAmJiAhbGlzdC5zZWFyY2hlZCk7XG4gICAgaWYgKCFhbHJlYWR5Q2xlYXJlZCkgeyAvLyBJZiBvbmlucHV0IGFscmVhZHkgaGF2ZSByZXNldHRlZCB0aGUgbGlzdCwgZG8gbm90aGluZ1xuICAgICAgc2VhcmNoTWV0aG9kKHRhcmdldC52YWx1ZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBVc2VkIHRvIGRldGVjdCBjbGljayBvbiBIVE1MNSBjbGVhciBidXR0b25cbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNlYXJjaENsYXNzKSwgJ2lucHV0JywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgaWYgKHRhcmdldC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgc2VhcmNoTWV0aG9kKCcnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzZWFyY2hNZXRob2Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIGJ1dHRvbnMgPSB7XG4gICAgZWxzOiB1bmRlZmluZWQsXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYnV0dG9ucy5lbHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnV0dG9ucy5lbHNbaV0pLnJlbW92ZSgnYXNjJyk7XG4gICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidXR0b25zLmVsc1tpXSkucmVtb3ZlKCdkZXNjJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRPcmRlcjogZnVuY3Rpb24oYnRuKSB7XG4gICAgICB2YXIgcHJlZGVmaW5lZE9yZGVyID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1vcmRlcicpO1xuICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBcImFzY1wiIHx8IHByZWRlZmluZWRPcmRlciA9PSBcImRlc2NcIikge1xuICAgICAgICByZXR1cm4gcHJlZGVmaW5lZE9yZGVyO1xuICAgICAgfSBlbHNlIGlmIChsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5oYXMoJ2Rlc2MnKSkge1xuICAgICAgICByZXR1cm4gXCJhc2NcIjtcbiAgICAgIH0gZWxzZSBpZiAobGlzdC51dGlscy5jbGFzc2VzKGJ0bikuaGFzKCdhc2MnKSkge1xuICAgICAgICByZXR1cm4gXCJkZXNjXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJhc2NcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEluU2Vuc2l0aXZlOiBmdW5jdGlvbihidG4sIG9wdGlvbnMpIHtcbiAgICAgIHZhciBpbnNlbnNpdGl2ZSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtaW5zZW5zaXRpdmUnKTtcbiAgICAgIGlmIChpbnNlbnNpdGl2ZSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0T3JkZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGJ1dHRvbnMuZWxzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgdmFyIGJ0biA9IGJ1dHRvbnMuZWxzW2ldO1xuICAgICAgICBpZiAobGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1zb3J0JykgIT09IG9wdGlvbnMudmFsdWVOYW1lKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZWRlZmluZWRPcmRlciA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtb3JkZXInKTtcbiAgICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBcImFzY1wiIHx8IHByZWRlZmluZWRPcmRlciA9PSBcImRlc2NcIikge1xuICAgICAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gb3B0aW9ucy5vcmRlcikge1xuICAgICAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ0bikuYWRkKG9wdGlvbnMub3JkZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5hZGQob3B0aW9ucy5vcmRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHNvcnQgPSBmdW5jdGlvbigpIHtcbiAgICBsaXN0LnRyaWdnZXIoJ3NvcnRTdGFydCcpO1xuICAgIHZhciBvcHRpb25zID0ge307XG5cbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLmN1cnJlbnRUYXJnZXQgfHwgYXJndW1lbnRzWzBdLnNyY0VsZW1lbnQgfHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgb3B0aW9ucy52YWx1ZU5hbWUgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZSh0YXJnZXQsICdkYXRhLXNvcnQnKTtcbiAgICAgIGJ1dHRvbnMuZ2V0SW5TZW5zaXRpdmUodGFyZ2V0LCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMub3JkZXIgPSBidXR0b25zLmdldE9yZGVyKHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbMV0gfHwgb3B0aW9ucztcbiAgICAgIG9wdGlvbnMudmFsdWVOYW1lID0gYXJndW1lbnRzWzBdO1xuICAgICAgb3B0aW9ucy5vcmRlciA9IG9wdGlvbnMub3JkZXIgfHwgXCJhc2NcIjtcbiAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSAodHlwZW9mIG9wdGlvbnMuaW5zZW5zaXRpdmUgPT0gXCJ1bmRlZmluZWRcIikgPyB0cnVlIDogb3B0aW9ucy5pbnNlbnNpdGl2ZTtcbiAgICB9XG5cbiAgICBidXR0b25zLmNsZWFyKCk7XG4gICAgYnV0dG9ucy5zZXRPcmRlcihvcHRpb25zKTtcblxuXG4gICAgLy8gY2FzZUluc2Vuc2l0aXZlXG4gICAgLy8gYWxwaGFiZXRcbiAgICB2YXIgY3VzdG9tU29ydEZ1bmN0aW9uID0gKG9wdGlvbnMuc29ydEZ1bmN0aW9uIHx8IGxpc3Quc29ydEZ1bmN0aW9uIHx8IG51bGwpLFxuICAgICAgICBtdWx0aSA9ICgob3B0aW9ucy5vcmRlciA9PT0gJ2Rlc2MnKSA/IC0xIDogMSksXG4gICAgICAgIHNvcnRGdW5jdGlvbjtcblxuICAgIGlmIChjdXN0b21Tb3J0RnVuY3Rpb24pIHtcbiAgICAgIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGl0ZW1BLCBpdGVtQikge1xuICAgICAgICByZXR1cm4gY3VzdG9tU29ydEZ1bmN0aW9uKGl0ZW1BLCBpdGVtQiwgb3B0aW9ucykgKiBtdWx0aTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGl0ZW1BLCBpdGVtQikge1xuICAgICAgICB2YXIgc29ydCA9IGxpc3QudXRpbHMubmF0dXJhbFNvcnQ7XG4gICAgICAgIHNvcnQuYWxwaGFiZXQgPSBsaXN0LmFscGhhYmV0IHx8IG9wdGlvbnMuYWxwaGFiZXQgfHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXNvcnQuYWxwaGFiZXQgJiYgb3B0aW9ucy5pbnNlbnNpdGl2ZSkge1xuICAgICAgICAgIHNvcnQgPSBsaXN0LnV0aWxzLm5hdHVyYWxTb3J0LmNhc2VJbnNlbnNpdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc29ydChpdGVtQS52YWx1ZXMoKVtvcHRpb25zLnZhbHVlTmFtZV0sIGl0ZW1CLnZhbHVlcygpW29wdGlvbnMudmFsdWVOYW1lXSkgKiBtdWx0aTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgbGlzdC5pdGVtcy5zb3J0KHNvcnRGdW5jdGlvbik7XG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ3NvcnRDb21wbGV0ZScpO1xuICB9O1xuXG4gIC8vIEFkZCBoYW5kbGVyc1xuICBsaXN0LmhhbmRsZXJzLnNvcnRTdGFydCA9IGxpc3QuaGFuZGxlcnMuc29ydFN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLnNvcnRDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuc29ydENvbXBsZXRlIHx8IFtdO1xuXG4gIGJ1dHRvbnMuZWxzID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zb3J0Q2xhc3MpO1xuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGJ1dHRvbnMuZWxzLCAnY2xpY2snLCBzb3J0KTtcbiAgbGlzdC5vbignc2VhcmNoU3RhcnQnLCBidXR0b25zLmNsZWFyKTtcbiAgbGlzdC5vbignZmlsdGVyU3RhcnQnLCBidXR0b25zLmNsZWFyKTtcblxuICByZXR1cm4gc29ydDtcbn07XG4iLCJ2YXIgVGVtcGxhdGVyID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgaXRlbVNvdXJjZSxcbiAgICB0ZW1wbGF0ZXIgPSB0aGlzO1xuXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgaXRlbVNvdXJjZSA9IHRlbXBsYXRlci5nZXRJdGVtU291cmNlKGxpc3QuaXRlbSk7XG4gICAgaWYgKGl0ZW1Tb3VyY2UpIHtcbiAgICAgIGl0ZW1Tb3VyY2UgPSB0ZW1wbGF0ZXIuY2xlYXJTb3VyY2VJdGVtKGl0ZW1Tb3VyY2UsIGxpc3QudmFsdWVOYW1lcyk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY2xlYXJTb3VyY2VJdGVtID0gZnVuY3Rpb24oZWwsIHZhbHVlTmFtZXMpIHtcbiAgICBmb3IodmFyIGkgPSAwLCBpbCA9IHZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIGlmICh2YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gdmFsdWVOYW1lc1tpXS5kYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyt2YWx1ZU5hbWVzW2ldLmRhdGFbal0sICcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWVzW2ldLmF0dHIgJiYgdmFsdWVOYW1lc1tpXS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhlbCwgdmFsdWVOYW1lc1tpXS5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUodmFsdWVOYW1lc1tpXS5hdHRyLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGVsLCB2YWx1ZU5hbWVzW2ldLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICB0aGlzLmdldEl0ZW1Tb3VyY2UgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIG5vZGVzID0gbGlzdC5saXN0LmNoaWxkTm9kZXMsXG4gICAgICAgIGl0ZW1zID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgLy8gT25seSB0ZXh0bm9kZXMgaGF2ZSBhIGRhdGEgYXR0cmlidXRlXG4gICAgICAgIGlmIChub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgvPHRyW1xccz5dL2cuZXhlYyhpdGVtKSkge1xuICAgICAgdmFyIHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICAgIHRib2R5LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICByZXR1cm4gdGJvZHkuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uaW5kZXhPZihcIjxcIikgIT09IC0xKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgIHJldHVybiBkaXYuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpc3QuaXRlbSk7XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbihpdGVtLCB2YWx1ZU5hbWVzKSB7XG4gICAgdGVtcGxhdGVyLmNyZWF0ZShpdGVtKTtcbiAgICB2YXIgdmFsdWVzID0ge307XG4gICAgZm9yKHZhciBpID0gMCwgaWwgPSB2YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBlbG07XG4gICAgICBpZiAodmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IHZhbHVlTmFtZXNbaV0uZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV0uZGF0YVtqXV0gPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShpdGVtLmVsbSwgJ2RhdGEtJyt2YWx1ZU5hbWVzW2ldLmRhdGFbal0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZXNbaV0uYXR0ciAmJiB2YWx1ZU5hbWVzW2ldLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWVzW2ldLm5hbWUsIHRydWUpO1xuICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXS5uYW1lXSA9IGVsbSA/IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGVsbSwgdmFsdWVOYW1lc1tpXS5hdHRyKSA6IFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZXNbaV0sIHRydWUpO1xuICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXV0gPSBlbG0gPyBlbG0uaW5uZXJIVE1MIDogXCJcIjtcbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICB0aGlzLnNldCA9IGZ1bmN0aW9uKGl0ZW0sIHZhbHVlcykge1xuICAgIHZhciBnZXRWYWx1ZU5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBsaXN0LnZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBpZiAobGlzdC52YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGxpc3QudmFsdWVOYW1lc1tpXS5kYXRhO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgICAgaWYgKGRhdGFbal0gPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbmFtZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0uYXR0ciAmJiBsaXN0LnZhbHVlTmFtZXNbaV0ubmFtZSAmJiBsaXN0LnZhbHVlTmFtZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3QudmFsdWVOYW1lc1tpXTtcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0gPT09IG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldFZhbHVlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBlbG07XG4gICAgICB2YXIgdmFsdWVOYW1lID0gZ2V0VmFsdWVOYW1lKG5hbWUpO1xuICAgICAgaWYgKCF2YWx1ZU5hbWUpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmICh2YWx1ZU5hbWUuZGF0YSkge1xuICAgICAgICBpdGVtLmVsbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyt2YWx1ZU5hbWUuZGF0YSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWUuYXR0ciAmJiB2YWx1ZU5hbWUubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZS5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUodmFsdWVOYW1lLmF0dHIsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBpZiAoIXRlbXBsYXRlci5jcmVhdGUoaXRlbSkpIHtcbiAgICAgIGZvcih2YXIgdiBpbiB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2KSkge1xuICAgICAgICAgIHNldFZhbHVlKHYsIHZhbHVlc1t2XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZW1Tb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGxpc3QgbmVlZCB0byBoYXZlIGF0IGxpc3Qgb25lIGl0ZW0gb24gaW5pdCBvdGhlcndpc2UgeW91J2xsIGhhdmUgdG8gYWRkIGEgdGVtcGxhdGUuXCIpO1xuICAgIH1cbiAgICAvKiBJZiBpdGVtIHNvdXJjZSBkb2VzIG5vdCBleGlzdHMsIHVzZSB0aGUgZmlyc3QgaXRlbSBpbiBsaXN0IGFzXG4gICAgc291cmNlIGZvciBuZXcgaXRlbXMgKi9cbiAgICB2YXIgbmV3SXRlbSA9IGl0ZW1Tb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuICAgIG5ld0l0ZW0ucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIGl0ZW0uZWxtID0gbmV3SXRlbTtcbiAgICB0ZW1wbGF0ZXIuc2V0KGl0ZW0sIGl0ZW0udmFsdWVzKCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0ucGFyZW50Tm9kZSA9PT0gbGlzdC5saXN0KSB7XG4gICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQoaXRlbS5lbG0pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zaG93ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIHRlbXBsYXRlci5jcmVhdGUoaXRlbSk7XG4gICAgbGlzdC5saXN0LmFwcGVuZENoaWxkKGl0ZW0uZWxtKTtcbiAgfTtcbiAgdGhpcy5oaWRlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0uZWxtLnBhcmVudE5vZGUgPT09IGxpc3QubGlzdCkge1xuICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGl0ZW0uZWxtKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAvKiAuaW5uZXJIVE1MID0gJyc7IGZ1Y2tzIHVwIElFICovXG4gICAgaWYgKGxpc3QubGlzdC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHdoaWxlIChsaXN0Lmxpc3QuY2hpbGROb2Rlcy5sZW5ndGggPj0gMSlcbiAgICAgIHtcbiAgICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGxpc3QubGlzdC5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaW5pdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHJldHVybiBuZXcgVGVtcGxhdGVyKGxpc3QpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgaW5kZXggPSByZXF1aXJlKCcuL2luZGV4LW9mJyk7XG5cbi8qKlxuICogV2hpdGVzcGFjZSByZWdleHAuXG4gKi9cblxudmFyIHJlID0gL1xccysvO1xuXG4vKipcbiAqIHRvU3RyaW5nIHJlZmVyZW5jZS5cbiAqL1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFdyYXAgYGVsYCBpbiBhIGBDbGFzc0xpc3RgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCl7XG4gIHJldHVybiBuZXcgQ2xhc3NMaXN0KGVsKTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBDbGFzc0xpc3QgZm9yIGBlbGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gQ2xhc3NMaXN0KGVsKSB7XG4gIGlmICghZWwgfHwgIWVsLm5vZGVUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIERPTSBlbGVtZW50IHJlZmVyZW5jZSBpcyByZXF1aXJlZCcpO1xuICB9XG4gIHRoaXMuZWwgPSBlbDtcbiAgdGhpcy5saXN0ID0gZWwuY2xhc3NMaXN0O1xufVxuXG4vKipcbiAqIEFkZCBjbGFzcyBgbmFtZWAgaWYgbm90IGFscmVhZHkgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG5hbWUpe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIHRoaXMubGlzdC5hZGQobmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICB2YXIgYXJyID0gdGhpcy5hcnJheSgpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICghfmkpIGFyci5wdXNoKG5hbWUpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgY2xhc3MgYG5hbWVgIHdoZW4gcHJlc2VudCwgb3JcbiAqIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlXG4gKiBhbnkgd2hpY2ggbWF0Y2guXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24obmFtZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgdGhpcy5saXN0LnJlbW92ZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSB0aGlzLmFycmF5KCk7XG4gIHZhciBpID0gaW5kZXgoYXJyLCBuYW1lKTtcbiAgaWYgKH5pKSBhcnIuc3BsaWNlKGksIDEpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIFRvZ2dsZSBjbGFzcyBgbmFtZWAsIGNhbiBmb3JjZSBzdGF0ZSB2aWEgYGZvcmNlYC5cbiAqXG4gKiBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IGNsYXNzTGlzdCwgYnV0IGRvIG5vdCBzdXBwb3J0IGBmb3JjZWAgeWV0LFxuICogdGhlIG1pc3Rha2Ugd2lsbCBiZSBkZXRlY3RlZCBhbmQgY29ycmVjdGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24obmFtZSwgZm9yY2Upe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgZm9yY2UpIHtcbiAgICAgIGlmIChmb3JjZSAhPT0gdGhpcy5saXN0LnRvZ2dsZShuYW1lLCBmb3JjZSkpIHtcbiAgICAgICAgdGhpcy5saXN0LnRvZ2dsZShuYW1lKTsgLy8gdG9nZ2xlIGFnYWluIHRvIGNvcnJlY3RcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0LnRvZ2dsZShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSkge1xuICAgICAgdGhpcy5yZW1vdmUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5oYXMobmFtZSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChuYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IG9mIGNsYXNzZXMuXG4gKlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuYXJyYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgY2xhc3NOYW1lID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gIHZhciBzdHIgPSBjbGFzc05hbWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB2YXIgYXJyID0gc3RyLnNwbGl0KHJlKTtcbiAgaWYgKCcnID09PSBhcnJbMF0pIGFyci5zaGlmdCgpO1xuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBjbGFzcyBgbmFtZWAgaXMgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmhhcyA9XG5DbGFzc0xpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiB0aGlzLmxpc3QgPyB0aGlzLmxpc3QuY29udGFpbnMobmFtZSkgOiAhISB+aW5kZXgodGhpcy5hcnJheSgpLCBuYW1lKTtcbn07XG4iLCJ2YXIgYmluZCA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICB1bmJpbmQgPSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4gICAgcHJlZml4ID0gYmluZCAhPT0gJ2FkZEV2ZW50TGlzdGVuZXInID8gJ29uJyA6ICcnLFxuICAgIHRvQXJyYXkgPSByZXF1aXJlKCcuL3RvLWFycmF5Jyk7XG5cbi8qKlxuICogQmluZCBgZWxgIGV2ZW50IGB0eXBlYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiBvciBBcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWwgPSB0b0FycmF5KGVsKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKysgKSB7XG4gICAgZWxbaV1bYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICB9XG59O1xuXG4vKipcbiAqIFVuYmluZCBgZWxgIGV2ZW50IGB0eXBlYCdzIGNhbGxiYWNrIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbCwgTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uIG9yIEFycmF5XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FwdHVyZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnVuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsID0gdG9BcnJheShlbCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrICkge1xuICAgIGVsW2ldW3VuYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICB9XG59O1xuIiwiLypcbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3NlZ21lbnRpby9leHRlbmRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCAob2JqZWN0KSB7XG4gICAgLy8gVGFrZXMgYW4gdW5saW1pdGVkIG51bWJlciBvZiBleHRlbmRlcnMuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgLy8gRm9yIGVhY2ggZXh0ZW5kZXIsIGNvcHkgdGhlaXIgcHJvcGVydGllcyBvbiBvdXIgb2JqZWN0LlxuICAgIGZvciAodmFyIGkgPSAwLCBzb3VyY2U7IHNvdXJjZSA9IGFyZ3NbaV07IGkrKykge1xuICAgICAgICBpZiAoIXNvdXJjZSkgY29udGludWU7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGV4dCwgcGF0dGVybiwgb3B0aW9ucykge1xuICAgIC8vIEFwcm94aW1hdGVseSB3aGVyZSBpbiB0aGUgdGV4dCBpcyB0aGUgcGF0dGVybiBleHBlY3RlZCB0byBiZSBmb3VuZD9cbiAgICB2YXIgTWF0Y2hfTG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uIHx8IDA7XG5cbiAgICAvL0RldGVybWluZXMgaG93IGNsb3NlIHRoZSBtYXRjaCBtdXN0IGJlIHRvIHRoZSBmdXp6eSBsb2NhdGlvbiAoc3BlY2lmaWVkIGFib3ZlKS4gQW4gZXhhY3QgbGV0dGVyIG1hdGNoIHdoaWNoIGlzICdkaXN0YW5jZScgY2hhcmFjdGVycyBhd2F5IGZyb20gdGhlIGZ1enp5IGxvY2F0aW9uIHdvdWxkIHNjb3JlIGFzIGEgY29tcGxldGUgbWlzbWF0Y2guIEEgZGlzdGFuY2Ugb2YgJzAnIHJlcXVpcmVzIHRoZSBtYXRjaCBiZSBhdCB0aGUgZXhhY3QgbG9jYXRpb24gc3BlY2lmaWVkLCBhIHRocmVzaG9sZCBvZiAnMTAwMCcgd291bGQgcmVxdWlyZSBhIHBlcmZlY3QgbWF0Y2ggdG8gYmUgd2l0aGluIDgwMCBjaGFyYWN0ZXJzIG9mIHRoZSBmdXp6eSBsb2NhdGlvbiB0byBiZSBmb3VuZCB1c2luZyBhIDAuOCB0aHJlc2hvbGQuXG4gICAgdmFyIE1hdGNoX0Rpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZSB8fCAxMDA7XG5cbiAgICAvLyBBdCB3aGF0IHBvaW50IGRvZXMgdGhlIG1hdGNoIGFsZ29yaXRobSBnaXZlIHVwLiBBIHRocmVzaG9sZCBvZiAnMC4wJyByZXF1aXJlcyBhIHBlcmZlY3QgbWF0Y2ggKG9mIGJvdGggbGV0dGVycyBhbmQgbG9jYXRpb24pLCBhIHRocmVzaG9sZCBvZiAnMS4wJyB3b3VsZCBtYXRjaCBhbnl0aGluZy5cbiAgICB2YXIgTWF0Y2hfVGhyZXNob2xkID0gb3B0aW9ucy50aHJlc2hvbGQgfHwgMC40O1xuXG4gICAgaWYgKHBhdHRlcm4gPT09IHRleHQpIHJldHVybiB0cnVlOyAvLyBFeGFjdCBtYXRjaFxuICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA+IDMyKSByZXR1cm4gZmFsc2U7IC8vIFRoaXMgYWxnb3JpdGhtIGNhbm5vdCBiZSB1c2VkXG5cbiAgICAvLyBTZXQgc3RhcnRpbmcgbG9jYXRpb24gYXQgYmVnaW5uaW5nIHRleHQgYW5kIGluaXRpYWxpc2UgdGhlIGFscGhhYmV0LlxuICAgIHZhciBsb2MgPSBNYXRjaF9Mb2NhdGlvbixcbiAgICAgICAgcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBxID0ge30sXG4gICAgICAgICAgICAgICAgaTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBxW3BhdHRlcm4uY2hhckF0KGkpXSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcVtwYXR0ZXJuLmNoYXJBdChpKV0gfD0gMSA8PCAocGF0dGVybi5sZW5ndGggLSBpIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBxO1xuICAgICAgICB9KCkpO1xuXG4gICAgLy8gQ29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBzY29yZSBmb3IgYSBtYXRjaCB3aXRoIGUgZXJyb3JzIGFuZCB4IGxvY2F0aW9uLlxuICAgIC8vIEFjY2Vzc2VzIGxvYyBhbmQgcGF0dGVybiB0aHJvdWdoIGJlaW5nIGEgY2xvc3VyZS5cblxuICAgIGZ1bmN0aW9uIG1hdGNoX2JpdGFwU2NvcmVfKGUsIHgpIHtcbiAgICAgICAgdmFyIGFjY3VyYWN5ID0gZSAvIHBhdHRlcm4ubGVuZ3RoLFxuICAgICAgICAgICAgcHJveGltaXR5ID0gTWF0aC5hYnMobG9jIC0geCk7XG5cbiAgICAgICAgaWYgKCFNYXRjaF9EaXN0YW5jZSkge1xuICAgICAgICAgICAgLy8gRG9kZ2UgZGl2aWRlIGJ5IHplcm8gZXJyb3IuXG4gICAgICAgICAgICByZXR1cm4gcHJveGltaXR5ID8gMS4wIDogYWNjdXJhY3k7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5ICsgKHByb3hpbWl0eSAvIE1hdGNoX0Rpc3RhbmNlKTtcbiAgICB9XG5cbiAgICB2YXIgc2NvcmVfdGhyZXNob2xkID0gTWF0Y2hfVGhyZXNob2xkLCAvLyBIaWdoZXN0IHNjb3JlIGJleW9uZCB3aGljaCB3ZSBnaXZlIHVwLlxuICAgICAgICBiZXN0X2xvYyA9IHRleHQuaW5kZXhPZihwYXR0ZXJuLCBsb2MpOyAvLyBJcyB0aGVyZSBhIG5lYXJieSBleGFjdCBtYXRjaD8gKHNwZWVkdXApXG5cbiAgICBpZiAoYmVzdF9sb2MgIT0gLTEpIHtcbiAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICAvLyBXaGF0IGFib3V0IGluIHRoZSBvdGhlciBkaXJlY3Rpb24/IChzcGVlZHVwKVxuICAgICAgICBiZXN0X2xvYyA9IHRleHQubGFzdEluZGV4T2YocGF0dGVybiwgbG9jICsgcGF0dGVybi5sZW5ndGgpO1xuXG4gICAgICAgIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgYml0IGFycmF5cy5cbiAgICB2YXIgbWF0Y2htYXNrID0gMSA8PCAocGF0dGVybi5sZW5ndGggLSAxKTtcbiAgICBiZXN0X2xvYyA9IC0xO1xuXG4gICAgdmFyIGJpbl9taW4sIGJpbl9taWQ7XG4gICAgdmFyIGJpbl9tYXggPSBwYXR0ZXJuLmxlbmd0aCArIHRleHQubGVuZ3RoO1xuICAgIHZhciBsYXN0X3JkO1xuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgcGF0dGVybi5sZW5ndGg7IGQrKykge1xuICAgICAgICAvLyBTY2FuIGZvciB0aGUgYmVzdCBtYXRjaDsgZWFjaCBpdGVyYXRpb24gYWxsb3dzIGZvciBvbmUgbW9yZSBlcnJvci5cbiAgICAgICAgLy8gUnVuIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgaG93IGZhciBmcm9tICdsb2MnIHdlIGNhbiBzdHJheSBhdCB0aGlzXG4gICAgICAgIC8vIGVycm9yIGxldmVsLlxuICAgICAgICBiaW5fbWluID0gMDtcbiAgICAgICAgYmluX21pZCA9IGJpbl9tYXg7XG4gICAgICAgIHdoaWxlIChiaW5fbWluIDwgYmluX21pZCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoX2JpdGFwU2NvcmVfKGQsIGxvYyArIGJpbl9taWQpIDw9IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIGJpbl9taW4gPSBiaW5fbWlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbl9taWQgPSBNYXRoLmZsb29yKChiaW5fbWF4IC0gYmluX21pbikgLyAyICsgYmluX21pbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIHRoZSByZXN1bHQgZnJvbSB0aGlzIGl0ZXJhdGlvbiBhcyB0aGUgbWF4aW11bSBmb3IgdGhlIG5leHQuXG4gICAgICAgIGJpbl9tYXggPSBiaW5fbWlkO1xuICAgICAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgxLCBsb2MgLSBiaW5fbWlkICsgMSk7XG4gICAgICAgIHZhciBmaW5pc2ggPSBNYXRoLm1pbihsb2MgKyBiaW5fbWlkLCB0ZXh0Lmxlbmd0aCkgKyBwYXR0ZXJuLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmQgPSBBcnJheShmaW5pc2ggKyAyKTtcbiAgICAgICAgcmRbZmluaXNoICsgMV0gPSAoMSA8PCBkKSAtIDE7XG4gICAgICAgIGZvciAodmFyIGogPSBmaW5pc2g7IGogPj0gc3RhcnQ7IGotLSkge1xuICAgICAgICAgICAgLy8gVGhlIGFscGhhYmV0IChzKSBpcyBhIHNwYXJzZSBoYXNoLCBzbyB0aGUgZm9sbG93aW5nIGxpbmUgZ2VuZXJhdGVzXG4gICAgICAgICAgICAvLyB3YXJuaW5ncy5cbiAgICAgICAgICAgIHZhciBjaGFyTWF0Y2ggPSBzW3RleHQuY2hhckF0KGogLSAxKV07XG4gICAgICAgICAgICBpZiAoZCA9PT0gMCkgeyAgICAvLyBGaXJzdCBwYXNzOiBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICByZFtqXSA9ICgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2g7XG4gICAgICAgICAgICB9IGVsc2UgeyAgICAvLyBTdWJzZXF1ZW50IHBhc3NlczogZnV6enkgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmRbal0gPSAoKChyZFtqICsgMV0gPDwgMSkgfCAxKSAmIGNoYXJNYXRjaCkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKChsYXN0X3JkW2ogKyAxXSB8IGxhc3RfcmRbal0pIDw8IDEpIHwgMSkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X3JkW2ogKyAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZFtqXSAmIG1hdGNobWFzaykge1xuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IG1hdGNoX2JpdGFwU2NvcmVfKGQsIGogLSAxKTtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG1hdGNoIHdpbGwgYWxtb3N0IGNlcnRhaW5seSBiZSBiZXR0ZXIgdGhhbiBhbnkgZXhpc3RpbmcgbWF0Y2guXG4gICAgICAgICAgICAgICAgLy8gQnV0IGNoZWNrIGFueXdheS5cbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRvbGQgeW91IHNvLlxuICAgICAgICAgICAgICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdF9sb2MgPSBqIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RfbG9jID4gbG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHBhc3NpbmcgbG9jLCBkb24ndCBleGNlZWQgb3VyIGN1cnJlbnQgZGlzdGFuY2UgZnJvbSBsb2MuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IE1hdGgubWF4KDEsIDIgKiBsb2MgLSBiZXN0X2xvYyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbHJlYWR5IHBhc3NlZCBsb2MsIGRvd25oaWxsIGZyb20gaGVyZSBvbiBpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5vIGhvcGUgZm9yIGEgKGJldHRlcikgbWF0Y2ggYXQgZ3JlYXRlciBlcnJvciBsZXZlbHMuXG4gICAgICAgIGlmIChtYXRjaF9iaXRhcFNjb3JlXyhkICsgMSwgbG9jKSA+IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdF9yZCA9IHJkO1xuICAgIH1cblxuICAgIHJldHVybiAoYmVzdF9sb2MgPCAwKSA/IGZhbHNlIDogdHJ1ZTtcbn07XG4iLCIvKipcbiAqIEEgY3Jvc3MtYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBnZXRBdHRyaWJ1dGUuXG4gKiBTb3VyY2UgZm91bmQgaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzc1NTM0My8zNjEzMzcgd3JpdHRlbiBieSBWaXZpbiBQYWxpYXRoXG4gKlxuICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgYGF0dHJgIGF0IGBlbGVtZW50YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0clxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsLCBhdHRyKSB7XG4gIHZhciByZXN1bHQgPSAoZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShhdHRyKSkgfHwgbnVsbDtcbiAgaWYoICFyZXN1bHQgKSB7XG4gICAgdmFyIGF0dHJzID0gZWwuYXR0cmlidXRlcztcbiAgICB2YXIgbGVuZ3RoID0gYXR0cnMubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGF0dHJbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZihhdHRyW2ldLm5vZGVOYW1lID09PSBhdHRyKSB7XG4gICAgICAgICAgcmVzdWx0ID0gYXR0cltpXS5ub2RlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiAqIEEgY3Jvc3MtYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBnZXRFbGVtZW50c0J5Q2xhc3MuXG4gKiBIZWF2aWx5IGJhc2VkIG9uIER1c3RpbiBEaWF6J3MgZnVuY3Rpb246IGh0dHA6Ly9kdXN0aW5kaWF6LmNvbS9nZXRlbGVtZW50c2J5Y2xhc3MuXG4gKlxuICogRmluZCBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcyBgY2xhc3NOYW1lYCBpbnNpZGUgYGNvbnRhaW5lcmAuXG4gKiBVc2UgYHNpbmdsZSA9IHRydWVgIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlIGluIG9sZGVyIGJyb3dzZXJzXG4gKiB3aGVuIG9ubHkgb25lIGVsZW1lbnQgaXMgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbmdsZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG52YXIgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgaWYgKHNpbmdsZSkge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpWzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICB9XG59O1xuXG52YXIgcXVlcnlTZWxlY3RvciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgY2xhc3NOYW1lID0gJy4nICsgY2xhc3NOYW1lO1xuICBpZiAoc2luZ2xlKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cbnZhciBwb2x5ZmlsbCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgdmFyIGNsYXNzRWxlbWVudHMgPSBbXSxcbiAgICB0YWcgPSAnKic7XG5cbiAgdmFyIGVscyA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuICB2YXIgZWxzTGVuID0gZWxzLmxlbmd0aDtcbiAgdmFyIHBhdHRlcm4gPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIrY2xhc3NOYW1lK1wiKFxcXFxzfCQpXCIpO1xuICBmb3IgKHZhciBpID0gMCwgaiA9IDA7IGkgPCBlbHNMZW47IGkrKykge1xuICAgIGlmICggcGF0dGVybi50ZXN0KGVsc1tpXS5jbGFzc05hbWUpICkge1xuICAgICAgaWYgKHNpbmdsZSkge1xuICAgICAgICByZXR1cm4gZWxzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3NFbGVtZW50c1tqXSA9IGVsc1tpXTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NFbGVtZW50cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICgob3B0aW9ucy50ZXN0ICYmIG9wdGlvbnMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkgfHwgKCFvcHRpb25zLnRlc3QgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH0gZWxzZSBpZiAoKG9wdGlvbnMudGVzdCAmJiBvcHRpb25zLnF1ZXJ5U2VsZWN0b3IpIHx8ICghb3B0aW9ucy50ZXN0ICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gcXVlcnlTZWxlY3Rvcihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH1cbiAgfTtcbn0pKCk7XG4iLCJ2YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBvYmope1xuICBpZiAoaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiLyoqXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS90aW1veGxleS90by1hcnJheVxuICpcbiAqIENvbnZlcnQgYW4gYXJyYXktbGlrZSBvYmplY3QgaW50byBhbiBgQXJyYXlgLlxuICogSWYgYGNvbGxlY3Rpb25gIGlzIGFscmVhZHkgYW4gYEFycmF5YCwgdGhlbiB3aWxsIHJldHVybiBhIGNsb25lIG9mIGBjb2xsZWN0aW9uYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5IHwgTWl4ZWR9IGNvbGxlY3Rpb24gQW4gYEFycmF5YCBvciBhcnJheS1saWtlIG9iamVjdCB0byBjb252ZXJ0IGUuZy4gYGFyZ3VtZW50c2Agb3IgYE5vZGVMaXN0YFxuICogQHJldHVybiB7QXJyYXl9IE5haXZlIGNvbnZlcnNpb24gb2YgYGNvbGxlY3Rpb25gIHRvIGEgbmV3IGBBcnJheWAuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdG9BcnJheShjb2xsZWN0aW9uKSB7XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBbXTtcbiAgaWYgKGNvbGxlY3Rpb24gPT09IG51bGwpIHJldHVybiBbbnVsbF07XG4gIGlmIChjb2xsZWN0aW9uID09PSB3aW5kb3cpIHJldHVybiBbd2luZG93XTtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnc3RyaW5nJykgcmV0dXJuIFtjb2xsZWN0aW9uXTtcbiAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHJldHVybiBjb2xsZWN0aW9uO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24ubGVuZ3RoICE9ICdudW1iZXInKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdmdW5jdGlvbicgJiYgY29sbGVjdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuXG4gIHZhciBhcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb2xsZWN0aW9uLCBpKSB8fCBpIGluIGNvbGxlY3Rpb24pIHtcbiAgICAgIGFyci5wdXNoKGNvbGxlY3Rpb25baV0pO1xuICAgIH1cbiAgfVxuICBpZiAoIWFyci5sZW5ndGgpIHJldHVybiBbXTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gIHMgPSAocyA9PT0gdW5kZWZpbmVkKSA/IFwiXCIgOiBzO1xuICBzID0gKHMgPT09IG51bGwpID8gXCJcIiA6IHM7XG4gIHMgPSBzLnRvU3RyaW5nKCk7XG4gIHJldHVybiBzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0O1xudmFyIGFscGhhYmV0SW5kZXhNYXA7XG52YXIgYWxwaGFiZXRJbmRleE1hcExlbmd0aCA9IDA7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyQ29kZShjb2RlKSB7XG4gIHJldHVybiBjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTc7XG59XG5cbmZ1bmN0aW9uIG5hdHVyYWxDb21wYXJlKGEsIGIpIHtcbiAgdmFyIGxlbmd0aEEgPSAoYSArPSAnJykubGVuZ3RoO1xuICB2YXIgbGVuZ3RoQiA9IChiICs9ICcnKS5sZW5ndGg7XG4gIHZhciBhSW5kZXggPSAwO1xuICB2YXIgYkluZGV4ID0gMDtcblxuICB3aGlsZSAoYUluZGV4IDwgbGVuZ3RoQSAmJiBiSW5kZXggPCBsZW5ndGhCKSB7XG4gICAgdmFyIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChhSW5kZXgpO1xuICAgIHZhciBjaGFyQ29kZUIgPSBiLmNoYXJDb2RlQXQoYkluZGV4KTtcblxuICAgIGlmIChpc051bWJlckNvZGUoY2hhckNvZGVBKSkge1xuICAgICAgaWYgKCFpc051bWJlckNvZGUoY2hhckNvZGVCKSkge1xuICAgICAgICByZXR1cm4gY2hhckNvZGVBIC0gY2hhckNvZGVCO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtU3RhcnRBID0gYUluZGV4O1xuICAgICAgdmFyIG51bVN0YXJ0QiA9IGJJbmRleDtcblxuICAgICAgd2hpbGUgKGNoYXJDb2RlQSA9PT0gNDggJiYgKytudW1TdGFydEEgPCBsZW5ndGhBKSB7XG4gICAgICAgIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChudW1TdGFydEEpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGNoYXJDb2RlQiA9PT0gNDggJiYgKytudW1TdGFydEIgPCBsZW5ndGhCKSB7XG4gICAgICAgIGNoYXJDb2RlQiA9IGIuY2hhckNvZGVBdChudW1TdGFydEIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtRW5kQSA9IG51bVN0YXJ0QTtcbiAgICAgIHZhciBudW1FbmRCID0gbnVtU3RhcnRCO1xuXG4gICAgICB3aGlsZSAobnVtRW5kQSA8IGxlbmd0aEEgJiYgaXNOdW1iZXJDb2RlKGEuY2hhckNvZGVBdChudW1FbmRBKSkpIHtcbiAgICAgICAgKytudW1FbmRBO1xuICAgICAgfVxuICAgICAgd2hpbGUgKG51bUVuZEIgPCBsZW5ndGhCICYmIGlzTnVtYmVyQ29kZShiLmNoYXJDb2RlQXQobnVtRW5kQikpKSB7XG4gICAgICAgICsrbnVtRW5kQjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpZmZlcmVuY2UgPSBudW1FbmRBIC0gbnVtU3RhcnRBIC0gbnVtRW5kQiArIG51bVN0YXJ0QjsgLy8gbnVtQSBsZW5ndGggLSBudW1CIGxlbmd0aFxuICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChudW1TdGFydEEgPCBudW1FbmRBKSB7XG4gICAgICAgIGRpZmZlcmVuY2UgPSBhLmNoYXJDb2RlQXQobnVtU3RhcnRBKyspIC0gYi5jaGFyQ29kZUF0KG51bVN0YXJ0QisrKTtcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhSW5kZXggPSBudW1FbmRBO1xuICAgICAgYkluZGV4ID0gbnVtRW5kQjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaGFyQ29kZUEgIT09IGNoYXJDb2RlQikge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFyQ29kZUEgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoICYmXG4gICAgICAgIGNoYXJDb2RlQiA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGggJiZcbiAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUFdICE9PSAtMSAmJlxuICAgICAgICBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQl0gIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVBXSAtIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVCXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoYXJDb2RlQSAtIGNoYXJDb2RlQjtcbiAgICB9XG5cbiAgICArK2FJbmRleDtcbiAgICArK2JJbmRleDtcbiAgfVxuXG4gIHJldHVybiBsZW5ndGhBIC0gbGVuZ3RoQjtcbn1cblxubmF0dXJhbENvbXBhcmUuY2FzZUluc2Vuc2l0aXZlID0gbmF0dXJhbENvbXBhcmUuaSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIG5hdHVyYWxDb21wYXJlKCgnJyArIGEpLnRvTG93ZXJDYXNlKCksICgnJyArIGIpLnRvTG93ZXJDYXNlKCkpO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobmF0dXJhbENvbXBhcmUsIHtcbiAgYWxwaGFiZXQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGFscGhhYmV0O1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgYWxwaGFiZXQgPSB2YWx1ZTtcbiAgICAgIGFscGhhYmV0SW5kZXhNYXAgPSBbXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGlmIChhbHBoYWJldCkge1xuICAgICAgICBmb3IgKDsgaSA8IGFscGhhYmV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYWxwaGFiZXRJbmRleE1hcFthbHBoYWJldC5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFscGhhYmV0SW5kZXhNYXBMZW5ndGggPSBhbHBoYWJldEluZGV4TWFwLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFscGhhYmV0SW5kZXhNYXBbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFscGhhYmV0SW5kZXhNYXBbaV0gPSAtMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXR1cmFsQ29tcGFyZTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJicmVha3BvaW50c1wiIDoge1xuICAgIFwieHNcIjogXCI0ODBweFwiLFxuICAgIFwic21cIjogXCI2MjBweFwiLFxuICAgIFwibWRcIjogXCI3NjBweFwiLFxuICAgIFwibGdcIjogXCI5OTBweFwiLFxuICAgIFwieGxcIjogXCIxMzgwcHhcIlxuICB9XG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS1kaXNtaXNzXScsXG4gICAgdGFyZ2V0OiAnW2RhdGEtZGlzbWlzc2libGVdJyxcbiAgICBjbGFzc1RvZ2dsZTogJ2Rpc21pc3MnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0cmlnZ2VyLmNsb3Nlc3Qoc2V0dGluZ3MudGFyZ2V0KVxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NUb2dnbGUpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG4vKipcbiAqIERyYXdlciBwbHVnaW5cbiAqIC0tLVxuICogQSBjb250YWluZXIgY29tcG9uZW50IHRoYXQgc2xpZGVzIGluIGZyb20gdGhlIGxlZnQgb3IgcmlnaHQuIEl0IHR5cGljYWxseVxuICogY29udGFpbnMgbWVudXMsIHNlYXJjaCBvciBvdGhlciBjb250ZW50IGZvciB5b3VyIGFwcC5cbiAqXG4gKiBUb2RvczpcbiAqIFsgXSBBbmltYXRpb25zIGluIEphdmFTY3JpcHQgY29tcG9uZW50cyBuZWVkIHRvIGJlIGhhbmRsZWQgZGlmZmVyZW50bHkuIFRoZXJlIHNob3VsZCB0aGUgQ2xhc3NlcyBzcGVjaWZpYyBmb3IgYW5pbWF0aW9uIGFuZCByZW1vdmVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBleGlzdGluZyBpbiBpdHMgY3VycmVudCBzdGF0ZS5cbiAqIFsgXSBEZWJ1ZyB3aHkgSSdtIGdldHRpbmcgXCJUeXBlRXJyb3I6IHMgaXMgbnVsbFwiIG9uIGxpbmVzIDM5NiBhbmQgNDMzXG4gKiBbIF0gV3JpdGUgYSBwcm9taXNlIGFuZCBydW4gc3dpdGNoIG1ldGhvZCBhZnRlciBkZWZhdWx0IHNhdmUgc3RhdGVzIGFyZSBzZXRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob3B0aW9ucykge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgLy8gRWxlbWVudCBjbGFzc2VzXG4gICAgY2xhc3NUYXJnZXQ6ICdkcmF3ZXJfX2l0ZW0nLFxuICAgIGNsYXNzVHJpZ2dlcjogJ2RyYXdlcl9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lcjogJ2RyYXdlcl9fZGlhbG9nJyxcblxuICAgIC8vIFVzZWQgd2l0aCBSZWdFeHAgdG8gc2VhcmNoIGFuZCByZXBsYWNlIGVsZW1lbnQgY2xhc3Nlc1xuICAgIGNsYXNzVGFyZ2V0U3dpdGNoOiAnbW9kYWwnLFxuICAgIGNsYXNzVHJpZ2dlclN3aXRjaDogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc0lubmVyU3dpdGNoOiAnbW9kYWxfX2RpYWxvZycsXG5cbiAgICAvLyBUaGUgY2xhc3MgdGhhdCBpcyB1c2VkIHRvIG1ha2UgYW4gaXRlbSBhY3RpdmVcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgY2xhc3NUcmFuc2l0aW9uTm9uZTogJ3RyYW5zaXRpb25fbm9uZScsXG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0byBlbmFibGUgdGhlIHN3aXRjaCBmdW5jdGlvbmFsaXR5XG4gICAgLy8gSWYgZW5hYmxlZCwgYSBzdHJpbmcgc2VsZWN0b3IgdG8gY2hlY2sgZm9yIHNob3VsZCBiZSBwYXNzZWQuXG4gICAgLy8ge2ZhbHNlfSB8fCB7c3RyaW5nfSBlLmcuICdbZGF0YS1kcmF3ZXItc3dpdGNoXSdcbiAgICBzd2l0Y2g6ICdbZGF0YS1kcmF3ZXItc3dpdGNoXScsXG5cbiAgICAvLyBUaGUgZGVmYXVsdCBicmVhayBwb2ludCBmb3Igd2hlbiB0byBzd2l0Y2ggdG8gZHJhd2VyIG9yIG1vZGFsIGNsYXNzZXNcbiAgICAvLyB7c3RyaW5nfSBFaXRoZXIgYSBicmVha3BvaW50IGtleSBvciBwaXhlbCB2YWx1ZVxuICAgIHN3aXRjaEJyZWFrcG9pbnQ6ICdsZycsXG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0byBzdG9yZSB0aGUgc2F2ZSBzdGF0ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgLy8ge2Jvb2xlYW59IFRoZSBzdHJpbmcgdG8gc2F2ZSBvdXIgc3RhdGUgb2JqZWN0IGFzXG4gICAgc2F2ZVN0YXRlOiB0cnVlLFxuXG4gICAgLy8gRHVyYXRpb24gYmVmb3JlIHJlbW92aW5nIHRoZSB0cmFuc2l0aW9uX25vbmUgY2xhc3Mgb24gaW5pdGlhbCBsb2FkXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiA1MDBcbiAgfVxuXG4gIC8vIERyYXdlciBzcGVjaWZpYyB2YXJpYWJsZXNcbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBkcmF3ZXJzIGF2YWlsYWJsZSBpbiB0aGUgRE9NXG4gIGxldCBkcmF3ZXJzXG4gIC8vIFdoZXJlIHdlIHN0b3JlIGFsbCBvdXIgc3dpdGNoIGRyYXdlcnMgYXZhaWxhYmxlIGluIHRoZSBET01cbiAgbGV0IHN3aXRjaERyYXdlcnNcbiAgLy8gV2hlcmUgd2UgYnVpbGQgdGhlIHNhdmUgc3RhdGUgb2JqZWN0IGJlZm9yZSB3ZSBwYXNzIGl0IHRvIGxvY2FsIHN0b3JhZ2VcbiAgbGV0IGRyYXdlclN0YXRlID0ge31cblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIG1ldGhvZCwgcnVuIGFzIHNvb24gYXMgYW4gaW5zdGFuY2UgaXMgY3JlYXRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBBIGpzb24gb2JqZWN0IHdpdGggeW91ciBjdXN0b20gc2V0dGluZ3NcbiAgICovXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcblxuICAgIC8vIE1lcmdlIHRoZSBkZWZhdWx0cyBhbmQgcGFzc2VkIG9wdGlvbnMgaW50byBvdXIgc2V0dGluZ3Mgb2JqXG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuXG4gICAgLy8gR2V0IGFsbCB0aGUgZHJhd2VycyBvbiB0aGUgcGFnZVxuICAgIGRyYXdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuXG4gICAgLy8gSW5pdCBzYXZlIHN0YXRlIGZ1bmN0aW9uYWxpdHkgaWYgaXQncyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgaW5pdFNhdmVTdGF0ZSgpXG4gICAgfVxuXG4gICAgLy8gSW5pdCBzd2l0Y2ggZnVuY3Rpb25hbGl0eSBpZiBpdCdzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc3dpdGNoKSB7XG4gICAgICBpbml0U3dpdGNoKClcbiAgICB9XG5cbiAgICAvLyBBZGQgb3VyIGRyYXdlciB0cmlnZ2VyIGV2ZW50IGxpc3RlbmVyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0cmlnZ2VyLCBmYWxzZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZGVjb25zdHJ1Y3RvciBtZXRob2QsIHVzZWQgdG8gcmVzZXQgYW5kIGRlc3RvcnkgdGhlIGRyYXdlciBpbnN0YW5jZVxuICAgKi9cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG5cbiAgICAvLyBDbGVhciBvdXIgdmFyaWFibGVzXG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZHJhd2VycyA9IG51bGxcbiAgICBzd2l0Y2hEcmF3ZXJzID0gbnVsbFxuICAgIGRyYXdlclN0YXRlID0ge31cblxuICAgIC8vIERlbGV0ZSB0aGUgbG9jYWwgc3RvcmFnZSBkYXRhXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2RyYXdlclN0YXRlJylcblxuICAgIC8vIFJlbW92ZSB0aGUgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gb3BlbiBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLm9wZW4gPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnb3BlbicpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBjbG9zZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLmNsb3NlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgJ2Nsb3NlJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHRvZ2dsZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnRvZ2dsZSA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBzd2l0Y2ggYSBkcmF3ZXIgaW50byBtb2RhbFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIC0gQSB2YWxpZCBDU1Mgc2VsZWN0b3JcbiAgICovXG4gIGFwaS5zd2l0Y2hEcmF3ZXIgPSAoc2VsZWN0b3IpID0+IHtcblxuICAgIC8vIFVzZSBkZWZhdWx0IHNlbGVjdG9yIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6IHNldHRpbmdzLnN3aXRjaFxuXG4gICAgLy8gUXVlcnkgb3VyIGVsZW1lbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBzZWxlY3RvclxuICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgc3dpdGNoRHJhd2VyKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaE1vZGFsID0gKHNlbGVjdG9yKSA9PiB7XG5cbiAgICAvLyBVc2UgZGVmYXVsdCBzZWxlY3RvciBpZiBvbmUgaXNuJ3QgcGFzc2VkXG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBzZXR0aW5ncy5zd2l0Y2hcblxuICAgIC8vIFF1ZXJ5IG91ciBlbGVtZW50cyB1c2luZyB0aGUgcHJvdmlkZWQgc2VsZWN0b3JcbiAgICBsZXQgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIHN3aXRjaE1vZGFsKGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIHRoZSBkcmF3ZXIgY3VycmVudCBkcmF3ZXIgc3RhdGVcbiAgICovXG4gIGFwaS5zdGF0ZVNhdmUgPSAoKSA9PiB7XG4gICAgc3RhdGVTYXZlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdG8gZHJhd2VyIGRlZmF1bHQgc3RhdGVcbiAgICovXG4gIGFwaS5zdGF0ZVJlc2V0ID0gKCkgPT4ge1xuICAgIHN0YXRlUmVzZXQoKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdG8gY2xvc2UgYSBkcmF3ZXIgb3IgZ3JvdXAgb2YgZHJhd2Vyc1xuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZHJhd2VyIGVsZW1lbnQocykgdG8gY2xvc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0YXRlIC0gV2hldGhlciB0byBvcGVuLCBjbG9zZSBvciB0b2dnbGUgdGhlIGRyYXdlcihzKVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgKi9cbiAgY29uc3QgdG9nZ2xlID0gKGRyYXdlciwgc3RhdGUsIGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyBDaGVjayBpZiBkcmF3ZXIocykgc2hvdWxkIGJlIG9wZW5lZCwgY2xvc2VkIG9yIHRvZ2dsZWQgYW5kIGVpdGhlciBhZGQgb3JcbiAgICAvLyByZW1vdmUgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgcGFzc2VkIGRyYXdlcihzKVxuICAgIGlmIChzdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICB1LmFkZENsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnRvZ2dsZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgc2F2ZSBzdGF0ZSBpcyBlbmFibGVkXG4gICAgaWYgKHNldHRpbmdzLnNhdmVTdGF0ZSkge1xuICAgICAgc3RhdGVTYXZlKGRyYXdlcilcbiAgICB9XG5cbiAgICAvLyBGaXJlIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBpZiBvbmUgd2FzIHBhc3NlZFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjaygpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0byB0b2dnbGUgZHJhd2VyIHZpYSBhIHRyaWdnZXJcbiAgICovXG4gIGNvbnN0IHRyaWdnZXIgPSAoKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGNsb3Nlc3QgdHJpZ2dlciBlbGVtZW50IGZyb20gdGhlIGNsaWNrIGV2ZW50XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RyaWdnZXIpXG5cbiAgICAvLyBDaGVjayB0aGF0IHRoZSBjbGFzcyB0cmlnZ2VyIHdhcyBjbGlja2VkXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgLy8gR2V0IHRoZSBkcmF3ZXIgc2VsZWN0b3IgZnJvbSB0aGUgdHJpZ2dlciB2aWEgW2RhdGEtdGFyZ2V0XVxuICAgICAgbGV0IGRhdGFEcmF3ZXIgPSB0cmlnZ2VyLmRhdGFzZXQudGFyZ2V0XG5cbiAgICAgIC8vIENoZWNrIHRoYXQgYSBkcmF3ZXIgdGFyZ2V0IHdhcyBnaXZlblxuICAgICAgaWYgKGRhdGFEcmF3ZXIpIHtcblxuICAgICAgICAvLyBRdWVyeSB0aGUgZHJhd2VyIGVsZW1lbnQgYW5kIHRvZ2dsZSBpdCBpZiBpdCBleGlzdHNcbiAgICAgICAgbGV0IGRyYXdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZGF0YURyYXdlcilcbiAgICAgICAgaWYgKGRyYXdlci5sZW5ndGgpIHtcbiAgICAgICAgICB0b2dnbGUoZHJhd2VyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBpbml0aWFsaXplcyB0aGUgc2F2ZSBzdGF0ZSBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBjb25zdCBpbml0U2F2ZVN0YXRlID0gKCkgPT4ge1xuXG4gICAgLy8gQ2hlY2sgaWYgYSBkcmF3ZXIgc3RhdGUgaXMgYWxyZWFkeSBzYXZlZCBpbiBsb2NhbCBzdG9yYWdlIGFuZCBzYXZlIHRoZVxuICAgIC8vIGpzb24gcGFyc2VkIGRhdGEgdG8gb3VyIGxvY2FsIHZhcmlhYmxlIGlmIGl0IGRvZXNcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RyYXdlclN0YXRlJykpIHtcbiAgICAgIGRyYXdlclN0YXRlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyU3RhdGUnKSlcbiAgICB9XG5cbiAgICAvLyBMb29wIHRocm91Z2ggYWxsIGRyYXdlcnNcbiAgICBkcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuXG4gICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc3RhdGUgaWYgb25lIGlzIG5vdCBzZXRcbiAgICAgIGlmIChkcmF3ZXIuaWQgaW4gZHJhd2VyU3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHN0YXRlU2F2ZShkcmF3ZXIpXG4gICAgICB9XG5cbiAgICAgIC8vIEdldCBvdXIgZHJhd2VyIGRpYWxvZyBlbGVtZW50XG4gICAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy4nICsgc2V0dGluZ3MuY2xhc3NJbm5lcilcblxuICAgICAgLy8gVHJhbnNpdGlvbiBkZWxheTogZGlzYWJsZXMgdHJhbnNpdGlvbnMgYXMgZGVmYXVsdCBzdGF0ZXMgYXJlIGJlaW5nIHNldFxuICAgICAgbGV0IHRyYW5zaXRpb25EZWxheSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGRpYWxvZykge1xuICAgICAgICAgIHUuYWRkQ2xhc3MoZGlhbG9nLCBzZXR0aW5ncy5jbGFzc1RyYW5zaXRpb25Ob25lKVxuICAgICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdS5yZW1vdmVDbGFzcyhkaWFsb2csIHNldHRpbmdzLmNsYXNzVHJhbnNpdGlvbk5vbmUpXG4gICAgICAgICAgICB9LCBzZXR0aW5ncy50cmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG9nZ2xlIG91ciBkcmF3ZXIgc3RhdGUgYmFzZWQgb24gdGhlIHNhdmVkIHN0YXRlXG4gICAgICBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ2Nsb3NlJywgdHJhbnNpdGlvbkRlbGF5KVxuICAgICAgfSBlbHNlIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdKSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdvcGVuJywgdHJhbnNpdGlvbkRlbGF5KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHNhdmVzIHRoZSBzdGF0ZSBvZiBhIHNwZWNpZmljIG9yIGFsbCBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGl0ZW1zIC0gVGhlIGRyYXdlciBlbGVtZW50KHMpIHRvIHNhdmUgc3RhdGVcbiAgICovXG4gIGNvbnN0IHN0YXRlU2F2ZSA9IChpdGVtcykgPT4ge1xuXG4gICAgLy8gU2F2ZSBhbGwgZHJhd2VycyBpZiBhbiBpdGVtcyBhcmcgd2Fzbid0IHBhc3NlZFxuICAgIGl0ZW1zID0gKGl0ZW1zKSA/IGl0ZW1zIDogZHJhd2Vyc1xuXG4gICAgLy8gQ29udmVydCB0byBhcnJheSBpZiBvbmx5IG9uZSBkcmF3ZXIgaXMgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMuZm9yRWFjaCkgPyBpdGVtcyA6IHUudG9BcnJheShpdGVtcylcblxuICAgIC8vIExvb3AgdGhyb3VnaCBvdXIgZHJhd2VycyBhbmQgc2F2ZSB0aGVpciBuZXcgc3RhdGUgdG8gbG9jYWwgc3RvcmFnZVxuICAgIGl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIC8vIE9ubHkgc2F2ZSBkcmF3ZXIgc3RhdGUgaWYgYW4gaWQgZXhpc3RzXG4gICAgICBpZiAoaXRlbS5pZCkge1xuICAgICAgICBkcmF3ZXJTdGF0ZVtpdGVtLmlkXSA9IHUuaGFzQ2xhc3MoaXRlbSwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkcmF3ZXJTdGF0ZScsIEpTT04uc3RyaW5naWZ5KGRyYXdlclN0YXRlKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBjbGVhcnMgdGhlIGRyYXdlciBzdGF0ZVxuICAgKi9cbiAgY29uc3Qgc3RhdGVSZXNldCA9ICgpID0+IHtcblxuICAgIC8vIFJlc2V0IG91ciBsb2NhbCBkcmF3ZXIgc3RhdGUgdmFyaWFibGUgYW5kIGRlbGV0ZSB0aGUgbG9jYWwgc3RvcmFnZSBkYXRhXG4gICAgZHJhd2VyU3RhdGUgPSB7fVxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdkcmF3ZXJTdGF0ZScpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGluaXRpYWxpemVzIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgY29uc3QgaW5pdFN3aXRjaCA9ICgpID0+IHtcblxuICAgIC8vIFF1ZXJ5IGFsbCB0aGUgZHJhd2VycyB3aXRoIHRoZSBzd2l0Y2ggZmVhdHVyZSBlbmFibGVkXG4gICAgc3dpdGNoRHJhd2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3Muc3dpdGNoKVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBzd2l0Y2ggZHJhd2Vyc1xuICAgIHN3aXRjaERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG5cbiAgICAgIC8vIEdldCB0aGUgbG9jYWwgYnJlYWtwb2ludCBpZiBvbmUgaXMgc2V0XG4gICAgICAvLyBSZW1vdmUgYnJhY2tldHMgYW5kIHRoZSBpbnRpYWwgZGF0YSBmbGFnXG4gICAgICBsZXQgY2xlYW5TZWxlY3RvciA9IHNldHRpbmdzLnN3aXRjaFxuICAgICAgICAucmVwbGFjZSgnWycsICcnKVxuICAgICAgICAucmVwbGFjZSgnXScsICcnKVxuICAgICAgICAucmVwbGFjZSgnZGF0YS0nLCAnJylcblxuICAgICAgLy8gQ29udmVydCBzcmluZyB0byBjYW1lbENhc2VcbiAgICAgIGNsZWFuU2VsZWN0b3IgPSBjbGVhblNlbGVjdG9yLnJlcGxhY2UoLy0oW2Etel0pL2csIGZ1bmN0aW9uIChnKSB7XG4gICAgICAgIHJldHVybiBnWzFdLnRvVXBwZXJDYXNlKClcbiAgICAgIH0pXG5cbiAgICAgIC8vIENoZWNrIHdoaWNoIGJyZWFrcG9pbnQgdG8gdXNlOlxuICAgICAgLy8gYSkgVGhlIGxvY2FsIGJwIHNldCBvbiB0aGUgZHJhd2VyXG4gICAgICAvLyBiKSBUaGUgYnAgYXZhaWxhYmxlIGluIGNvbmZpZyB1c2luZyBhIGtleVxuICAgICAgLy8gYykgVGhlIHJhdyBwaXhlbCB2YWx1ZSBwcm92aWRlZCBpbiBzZXR0aW5nc1xuICAgICAgbGV0IGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgIGlmIChicCkge1xuICAgICAgICBicCA9IHUuZ2V0QnJlYWtwb2ludChicClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gZHJhd2VyLmRhdGFzZXRbY2xlYW5TZWxlY3Rvcl1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnAgPSB1LmdldEJyZWFrcG9pbnQoc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludClcbiAgICAgICAgaWYgKCFicCkge1xuICAgICAgICAgIGJwID0gc2V0dGluZ3Muc3dpdGNoQnJlYWtwb2ludFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1lZGlhIHF1ZXJ5IGxpc3RlbmVyXG4gICAgICBsZXQgbXEgPSB3aW5kb3cubWF0Y2hNZWRpYSggXCIobWluLXdpZHRoOlwiICsgYnAgKyBcIilcIiApXG4gICAgICBtcS5hZGRMaXN0ZW5lcigobXEpID0+IHtcbiAgICAgICAgc3dpdGNoQ2hlY2sobXEsIGRyYXdlcilcbiAgICAgIH0pXG4gICAgICBzd2l0Y2hDaGVjayhtcSwgZHJhd2VyKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGVuIGEgbWVkaWEgcXVlcnkgaGl0cyBhIG1hdGNoIGFuZCBzd2l0Y2hlc1xuICAgKiB0aGUgY29tcG9uZW50IGZyb20gZHJhd2VyIHRvIG1vZGFsIGFzIG5lZWRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbXEgLSBUaGUgTWVkaWFRdWVyeUxpc3Qgb2JqZWN0IGZvciB0aGUgbWVkaWEgcXVlcnlcbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZHJhd2VyIGVsZW1lbnQgdG8gc3dpdGNoXG4gICAqL1xuICBjb25zdCBzd2l0Y2hDaGVjayA9IChtcSwgZHJhd2VyKSA9PiB7XG4gICAgaWYgKG1xLm1hdGNoZXMpIHtcbiAgICAgIHN3aXRjaERyYXdlcihkcmF3ZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaE1vZGFsKGRyYXdlcilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHN3aXRjaGVzIGEgbW9kYWwgaW50byBhIGRyYXdlciBjb21wb25lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGVsZW1lbnQgdG8gc3dpdGNoXG4gICAqL1xuICBjb25zdCBzd2l0Y2hEcmF3ZXIgPSAoZHJhd2VyKSA9PiB7XG5cbiAgICAvLyBHZXQgdGhlIGRpYWxvZyBhbmQgdHJpZ2dlciBlbGVtZW50cyByZWxhdGVkIHRvIHRoaXMgY29tcG9uZW50XG4gICAgbGV0IGRpYWxvZyA9IGRyYXdlci5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nJylcbiAgICBsZXQgdHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YXJnZXQ9XCIjJyArIGRyYXdlci5pZCArICdcIl0nKVxuXG4gICAgLy8gU3dpdGNoIHRoZSBtb2RhbCBjb21wb25lbnQgdG8gZHJhd2VyXG4gICAgZHJhd2VyLmNsYXNzTmFtZSA9IGRyYXdlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUYXJnZXRTd2l0Y2gsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICApXG4gICAgZGlhbG9nLmNsYXNzTmFtZSA9IGRpYWxvZy5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NJbm5lclN3aXRjaCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc0lubmVyXG4gICAgKVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuY2xhc3NOYW1lID0gdHJpZ2dlci5jbGFzc05hbWUucmVwbGFjZShcbiAgICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RyaWdnZXJTd2l0Y2gsICdnaScpLFxuICAgICAgICBzZXR0aW5ncy5jbGFzc1RyaWdnZXJcbiAgICAgIClcbiAgICB9KVxuXG4gICAgLy8gT3BlbiBvciBjbG9zZSBkcmF3ZXIgYmFzZWQgb24gc2F2ZSBzdGF0ZVxuICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnY2xvc2UnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgc3dpdGNoZXMgYSBkcmF3ZXIgaW50byBhIG1vZGFsIGNvbXBvbmVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBkcmF3ZXIgLSBUaGUgZWxlbWVudCB0byBzd2l0Y2hcbiAgICovXG4gIGNvbnN0IHN3aXRjaE1vZGFsID0gKGRyYXdlcikgPT4ge1xuXG4gICAgLy8gR2V0IHRoZSBkaWFsb2cgYW5kIHRyaWdnZXIgZWxlbWVudHMgcmVsYXRlZCB0byB0aGlzIGNvbXBvbmVudFxuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcblxuICAgIC8vIFN3aXRjaCB0aGUgZHJhd2VyIGNvbXBvbmVudCB0byBtb2RhbFxuICAgIGRyYXdlci5jbGFzc05hbWUgPSBkcmF3ZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVGFyZ2V0LCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzVGFyZ2V0U3dpdGNoXG4gICAgKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzSW5uZXIsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NJbm5lclN3aXRjaFxuICAgIClcbiAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICB0cmlnZ2VyLmNsYXNzTmFtZSA9IHRyaWdnZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUcmlnZ2VyLCAnZ2knKSxcbiAgICAgICAgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyU3dpdGNoXG4gICAgICApXG4gICAgfSlcblxuICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZm9yIG1vZGFsIHN0eWxlcyBieSBkZWZhdWx0XG4gICAgdS5yZW1vdmVDbGFzcyhkcmF3ZXIsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICAvLyBSdW4gdGhlIGNvbnN0cnVjdG9yIG1ldGhvZFxuICBhcGkuaW5pdChvcHRpb25zKVxuXG4gIC8vIFJldHVybiB0aGUgQVBJIGZvciBydW5uaW5nIHB1YmxpYyBtZXRob2RzXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuLyoqXG4gKiBNb2RhbCBwbHVnaW5cbiAqIC0tLVxuICogQSBjb21wb25lbnQgZm9yIGNoYW5naW5nIHRoZSBtb2RlIG9mIGEgcGFnZSB0byBjb21wbGV0ZSBhIGNyaXRpY2FsIHRhc2suXG4gKiBUaGlzIGlzIHVzdWFsbHkgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBEaWFsb2cgY29tcG9uZW50IHRvIG1ha2VcbiAqIG1vZGFsIGRpYWxvZ3MuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVGFyZ2V0OiAnbW9kYWwnLFxuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc0lubmVyOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGZvY3VzOiAnW2RhdGEtZm9jdXNdJ1xuICB9XG5cbiAgbGV0IG1lbW9yeVRyaWdnZXJcbiAgbGV0IG1lbW9yeVRhcmdldFxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5vcGVuID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgb3Blbihkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9IChjbGVhcikgPT4ge1xuICAgIGNsb3NlKGNsZWFyKVxuICB9XG5cbiAgY29uc3Qgb3BlbiA9ICh0YXJnZXQpID0+IHtcbiAgICB1LmFkZENsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgaWYgKHRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5pdGVtKDApXG4gICAgICBsZXQgZm9jdXMgPSB0YXJnZXQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5mb2N1cylcbiAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgICBmb2N1cy5mb2N1cygpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0LmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjbG9zZSA9IChjbGVhciA9IGZhbHNlKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXQpXG4gICAgdS5yZW1vdmVDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmIChjbGVhciA9PSBmYWxzZSAmJiBtZW1vcnlUcmlnZ2VyICYmIG1lbW9yeVRhcmdldCkge1xuICAgICAgaWYgKG1lbW9yeVRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbWVtb3J5VGFyZ2V0Lml0ZW0oMClcbiAgICAgICAgbWVtb3J5VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgICAgaWYgKG1lbW9yeVRyaWdnZXIpIHtcbiAgICAgICAgICAgIG1lbW9yeVRyaWdnZXIuZm9jdXMoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZW1vcnlUYXJnZXQgPSBudWxsXG4gICAgICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICAgIH0sIHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2xlYXIgPT0gdHJ1ZSkge1xuICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICB9XG4gIH1cblxuICBjb25zdCBlc2NhcGUgPSAoKSA9PiB7XG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMjcpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRhcmdldCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy4nICsgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyKVxuICAgIGxldCBpbm5lciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzSW5uZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICAgIGxldCB0YXJnZXREYXRhID0gdHJpZ2dlci5kYXRhc2V0LnRhcmdldFxuICAgICAgaWYgKHRhcmdldERhdGEpIHtcbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0YXJnZXREYXRhKVxuICAgICAgICBtZW1vcnlUcmlnZ2VyID0gdHJpZ2dlclxuICAgICAgICBvcGVuKG1lbW9yeVRhcmdldClcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiAhaW5uZXIpIHtcbiAgICAgIGNsb3NlKClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS10b2dnbGUtY2xhc3NdJyxcbiAgICB0YXJnZXRzOiAnJyxcbiAgICBjbGFzczogJydcbiAgfVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuXG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuXG4gICAgaWYgKHRyaWdnZXIpIHtcblxuICAgICAgbGV0IHRhcmdldHNcblxuICAgICAgaWYgKHNldHRpbmdzLnRhcmdldHMpIHtcbiAgICAgICAgdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2V0dGluZ3MudGFyZ2V0cylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRyaWdnZXIuZGF0YXNldC50b2dnbGVUYXJnZXQpXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRzLmxlbmd0aCkge1xuICAgICAgICB0YXJnZXRzLmZvckVhY2goKHRhcmdldCkgPT4ge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5jbGFzcykge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgc2V0dGluZ3MuY2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdS50b2dnbGVDbGFzcyh0cmlnZ2VyLCB0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlQ2xhc3Muc3BsaXQoJyAnKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IGNvbmZpZyBmcm9tICdjb25maWcnXG5cbi8qKlxuICogVXRpbGl0eVxuICogLS0tXG4gKiBBIHNldCBvZiBoZWxwZXIgbWV0aG9kcyBmb3IgZ2VuZXJhbCBqYXZhc2NyaXB0IHBsdWdpbiB1c2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAvKipcbiAgICogR2V0IGFuZCBvdXRwdXQgYSBicmVha3BvaW50IHVzaW5nIGl0J3Mga2V5IGZvdW5kIGluIGNvbmZpZy5qc29uXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5IC0gVGhlIGtleSB0byBzZWFyY2ggZm9yIGluIHRoZSBicmVha3BvaW50cyBvYmplY3RcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBUaGUgcGl4ZWwgdmFsdWUgb2YgdGhlIGJyZWFrcG9pbnQgYXMgYSBzdHJpbmdcbiAgICovXG4gIHN0YXRpYyBnZXRCcmVha3BvaW50KGtleSkge1xuICAgIHJldHVybiBjb25maWcuYnJlYWtwb2ludHNba2V5XVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzIG9yIG5vdFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gY2hlY2sgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGNoZWNrXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIFJldHVybnMgdHJ1ZSBpZiBjbGFzcyBleGlzdHMsIG90aGVyd2lzZSBmYWxzZVxuICAgKi9cbiAgc3RhdGljIGhhc0NsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgcmV0dXJuIGMuc29tZSggZnVuY3Rpb24gKGMpIHtcbiAgICAgIGxldCBoYXMgPSBmYWxzZVxuICAgICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjKSkge1xuICAgICAgICAgIGhhcyA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiBoYXNcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBvciBjbGFzc2VzIHRvIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIGFkZCBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmcgfHwgQXJyYXl9IGMgLSBDbGFzcyhlcykgdG8gYWRkXG4gICAqL1xuICBzdGF0aWMgYWRkQ2xhc3MoZWwsIGMpIHtcbiAgICBlbCA9IChlbC5mb3JFYWNoKSA/IGVsIDogdGhpcy50b0FycmF5KGVsKVxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcbiAgICBlbC5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgYy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYylcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBvciBjbGFzc2VzIGZyb20gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gcmVtb3ZlIGNsYXNzKGVzKSBmcm9tXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIHJlbW92ZVxuICAgKi9cbiAgc3RhdGljIHJlbW92ZUNsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGEgY2xhc3Mgb3IgY2xhc3NlcyBvbiBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byB0b2dnbGUgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIHRvZ2dsZVxuICAgKi9cbiAgc3RhdGljIHRvZ2dsZUNsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRmluZCB0aGUgY2xvc2VzdCBwYXJlbnQgZWxlbWVudCBiYXNlZCBvbiBjbGFzcy4gVGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGVcbiAgICogbmF0aXZlIC5jbG9zZXN0KCkgbWV0aG9kIGluIHRoYXQgaXQgZG9lc24ndCBjaGVjayB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQgdG8gc3RhcnQgc2VhcmNoIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGNoZWNrIGZvclxuICAgKiBAcmV0dXJuIHtOb2RlfSAtIENsb3Nlc3QgcGFyZW50IGVsZW1lbnRcbiAgICovXG4gIHN0YXRpYyBjbG9zZXN0KGVsLCBjKSB7XG4gICAgd2hpbGUgKChlbCA9IGVsLnBhcmVudEVsZW1lbnQpICYmICF0aGlzLmhhc0NsYXNzKGVsLCBjKSlcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyBvciBvYmplY3QgdG8gYW4gYXJyYXkuIElmIGFuIGFycmF5IGlzIHBhc3NlZCwgaXQnc1xuICAgKiByZXR1cm5lZCBhcyBpcy4gQW55dGhpbmcgZWxzZSBpcyByZXR1cm5lZCBhcyBhbiBhcnJheS5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBpdGVtIC0gU3RyaW5nIG9yIG9iamVjdCB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSAtIFJldHVybiB0aGUgY29udmVydGVkIGFycmF5XG4gICAqL1xuICBzdGF0aWMgdG9BcnJheShpdGVtKSB7XG5cbiAgICBsZXQgYXJyYXkgPSBbXVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGFycmF5ID0gaXRlbVxuICAgIH0gZWxzZSB7XG4gICAgICBhcnJheS5wdXNoKGl0ZW0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0cy4gUmV0dXJucyBhIG5ldyBvYmplY3QuIFNldCB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICogdG8gYHRydWVgIGZvciBhIGRlZXAgb3IgcmVjdXJzaXZlIG1lcmdlLlxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtCb29sZWFufSBbT3B0aW9uYWxdIC0gSWYgdHJ1ZSwgZG8gYSBkZWVwIChvciByZWN1cnNpdmUpIG1lcmdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAtIFRoZSBvYmplY3RzIHRvIG1lcmdlIHRvZ2V0aGVyOyBlYWNoIG92ZXJyaWRpbmcgdGhlIG5leHRcbiAgICogQHJldHVybnMge09iamVjdH0gLSBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgbGV0IGV4dGVuZGVkID0ge31cbiAgICBsZXQgZGVlcCA9IGZhbHNlXG4gICAgbGV0IGkgPSAwXG4gICAgbGV0IGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBhcmd1bWVudHNbMF0gKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICkge1xuICAgICAgZGVlcCA9IGFyZ3VtZW50c1swXVxuICAgICAgaSsrXG4gICAgfVxuXG4gICAgbGV0IG1lcmdlID0gKCBvYmogKSA9PiB7XG4gICAgICBmb3IgKCBsZXQgcHJvcCBpbiBvYmogKSB7XG4gICAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcbiAgICAgICAgICBpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQoIHRydWUsIGV4dGVuZGVkW3Byb3BdLCBvYmpbcHJvcF0gKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgbGV0IG9iaiA9IGFyZ3VtZW50c1tpXVxuICAgICAgbWVyZ2Uob2JqKVxuICAgIH1cblxuICAgIHJldHVybiBleHRlbmRlZFxuICB9XG5cbn1cbiJdfQ==

//# sourceMappingURL=scripts.js.map
