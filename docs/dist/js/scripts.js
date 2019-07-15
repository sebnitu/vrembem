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

  if (_utility["default"].hasClass(trigger, 'drawer--clear')) {
    console.log('drawer.stateClear()');
    drawer.stateClear();
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
  var drawers; // Where we build the save state object before we pass it to local storage

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
   * The deconstructor method, used to reset and destroy the drawer instance
   */


  api.destroy = function () {
    // Destroy our switch
    destroySwitch(); // Destroy our state

    stateClear(); // Clear our variables

    settings = null;
    drawers = null; // Remove the drawer trigger event listener

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
        switchModal(drawer);
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
      switchDrawer(drawer);
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
        switchDrawer(item.drawer);
      } else {
        switchModal(item.drawer);
      }
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9jb25maWcuanNvbiIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9kcmF3ZXIuanMiLCIuLi9zcmMvanMvbW9kYWwuanMiLCIuLi9zcmMvanMvdG9nZ2xlLmpzIiwiLi4vc3JjL2pzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBSixFQUFwQjtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUNBLElBQU0sS0FBSyxHQUFHLElBQUksaUJBQUosRUFBZDtBQUNBLElBQU0sTUFBTSxHQUFHLElBQUksa0JBQUosRUFBZjtBQUVBOzs7O0FBSUEsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLFlBQVc7QUFFNUM7QUFDQSxNQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBcEI7O0FBRUEsTUFBSSxvQkFBRSxRQUFGLENBQVcsT0FBWCxFQUFvQixjQUFwQixDQUFKLEVBQXlDO0FBQ3ZDLElBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsSUFBQSxNQUFNLENBQUMsSUFBUDtBQUNEOztBQUVELE1BQUksb0JBQUUsUUFBRixDQUFXLE9BQVgsRUFBb0IsaUJBQXBCLENBQUosRUFBNEM7QUFDMUMsSUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGtCQUFaO0FBQ0EsSUFBQSxNQUFNLENBQUMsT0FBUDtBQUNEOztBQUVELE1BQUksb0JBQUUsUUFBRixDQUFXLE9BQVgsRUFBb0IsY0FBcEIsQ0FBSixFQUF5QztBQUN2QyxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksZUFBWjtBQUNBLElBQUEsTUFBTSxDQUFDLElBQVA7QUFDRDs7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a0IsR0FBbEIsRUFBd0I7QUFDdEIsY0FBSyxNQUFNLENBQUMsU0FBUCxDQUFpQixjQUFqQixDQUFnQyxJQUFoQyxDQUFzQyxHQUF0QyxFQUEyQyxJQUEzQyxDQUFMLEVBQXlEO0FBQ3ZELGdCQUFLLElBQUksSUFBSSxNQUFNLENBQUMsU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixHQUFHLENBQUMsSUFBRCxDQUFsQyxNQUE4QyxpQkFBM0QsRUFBK0U7QUFDN0UsY0FBQSxRQUFRLENBQUMsSUFBRCxDQUFSLEdBQWlCLE1BQU0sQ0FBRSxJQUFGLEVBQVEsUUFBUSxDQUFDLElBQUQsQ0FBaEIsRUFBd0IsR0FBRyxDQUFDLElBQUQsQ0FBM0IsQ0FBdkI7QUFDRCxhQUZELE1BRU87QUFDTCxjQUFBLFFBQVEsQ0FBQyxJQUFELENBQVIsR0FBaUIsR0FBRyxDQUFDLElBQUQsQ0FBcEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQVZEOztBQVlBLGFBQVEsQ0FBQyxHQUFHLE1BQVosRUFBb0IsQ0FBQyxFQUFyQixFQUEwQjtBQUN4QixZQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBRCxDQUFuQjtBQUNBLFFBQUEsS0FBSyxDQUFDLEdBQUQsQ0FBTDtBQUNEOztBQUVELGFBQU8sUUFBUDtBQUNELEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgdSBmcm9tICd1dGlsaXR5J1xuaW1wb3J0IERpc21pc3NpYmxlIGZyb20gJ2Rpc21pc3NpYmxlJ1xuaW1wb3J0IERyYXdlciBmcm9tICdkcmF3ZXInXG5pbXBvcnQgTW9kYWwgZnJvbSAnbW9kYWwnXG5pbXBvcnQgVG9nZ2xlIGZyb20gJ3RvZ2dsZSdcbmltcG9ydCBsaXN0anMgZnJvbSAnbGlzdC5qcydcblxuY29uc3QgZGlzbWlzc2libGUgPSBuZXcgRGlzbWlzc2libGUoKVxuY29uc3QgZHJhd2VyID0gbmV3IERyYXdlcigpXG5jb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpXG5jb25zdCB0b2dnbGUgPSBuZXcgVG9nZ2xlKClcblxuLyoqXG4gKiBHZW5lcmFsIGV2ZW50IHRyaWdnZXIgZm9yIHRlc3RpbmdcbiAqL1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXG4gIC8vIEdldCB0aGUgZWxlbWVudCB0aGF0IHRyaWdnZXJlZCB0aGUgZXZlbnRcbiAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXRcblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1pbml0JykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLmluaXQoKScpXG4gICAgZHJhd2VyLmluaXQoKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tZGVzdHJveScpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5kZXN0cm95KCknKVxuICAgIGRyYXdlci5kZXN0cm95KClcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLW9wZW4nKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIub3BlbigpJylcbiAgICBkcmF3ZXIub3BlbigpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1jbG9zZScpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5jbG9zZSgpJylcbiAgICBkcmF3ZXIuY2xvc2UoKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tdG9nZ2xlJykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLnRvZ2dsZSgpJylcbiAgICBkcmF3ZXIudG9nZ2xlKClcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLXRvZ2dsZS1leGFtcGxlJykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLnRvZ2dsZShcIiNkcmF3ZXItZXhhbXBsZVwiKScpXG4gICAgZHJhd2VyLnRvZ2dsZSgnI2RyYXdlci1leGFtcGxlJylcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLXN3aXRjaC1kcmF3ZXInKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuc3dpdGNoRHJhd2VyKCknKVxuICAgIGRyYXdlci5zd2l0Y2hEcmF3ZXIoKVxuICB9XG5cbiAgaWYgKHUuaGFzQ2xhc3ModHJpZ2dlciwgJ2RyYXdlci0tc3dpdGNoLW1vZGFsJykpIHtcbiAgICBjb25zb2xlLmxvZygnZHJhd2VyLnN3aXRjaE1vZGFsKCknKVxuICAgIGRyYXdlci5zd2l0Y2hNb2RhbCgpXG4gIH1cblxuICBpZiAodS5oYXNDbGFzcyh0cmlnZ2VyLCAnZHJhd2VyLS1jbGVhcicpKSB7XG4gICAgY29uc29sZS5sb2coJ2RyYXdlci5zdGF0ZUNsZWFyKCknKVxuICAgIGRyYXdlci5zdGF0ZUNsZWFyKClcbiAgfVxuXG4gIGlmICh1Lmhhc0NsYXNzKHRyaWdnZXIsICdkcmF3ZXItLXNhdmUnKSkge1xuICAgIGNvbnNvbGUubG9nKCdkcmF3ZXIuc3RhdGVTYXZlKCknKVxuICAgIGRyYXdlci5zdGF0ZVNhdmUoKVxuICB9XG5cbn0pXG5cbi8qKlxuICogTGlzdC5qc1xuICogLS0tXG4gKiBBZGRzIGxpc3QgZnVuY3Rpb25hbGl0eSBhbG9uZyB3aXRoIHNlYXJjaC5cbiAqIGxpc3QuanMgZG9jczogaHR0cDovL2xpc3Rqcy5jb20vXG4gKi9cbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdGpzJykpIHtcblxuICAvLyBJbml0IG91ciBsaXN0LmpzIGNvbXBvbmVudFxuICBjb25zdCBsaXN0ID0gbmV3IGxpc3RqcygnbGlzdGpzJywge1xuICAgIGZ1enp5U2VhcmNoOiB7XG4gICAgICBzZWFyY2hDbGFzczogJ3NlYXJjaCcsXG4gICAgICBsb2NhdGlvbjogMCxcbiAgICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgICB0aHJlc2hvbGQ6IDAuNCxcbiAgICAgIG11bHRpU2VhcmNoOiB0cnVlXG4gICAgfSxcbiAgICB2YWx1ZU5hbWVzOiBbXG4gICAgICAnbmFtZScsXG4gICAgICB7IGRhdGE6IFsnY2F0ZWdvcnknXSB9XG4gICAgXSxcbiAgICBsaXN0Q2xhc3M6ICdtZW51J1xuICB9KVxuXG4gIC8vIEVtcHR5IE5vdGljZVxuICAvLyBEaXNwbGF5ZWQgd2hlbiB0aGUgc2VhcmNoIHJldHVybnMgbm8gcmVzdWx0c1xuICBsZXQgbm90aWNlX2VtcHR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGljZV9lbXB0eScpXG4gIGxldCBub3RpY2VfZW1wdHlfdGV4dCA9IG5vdGljZV9lbXB0eS5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoX3RleHQnKVxuXG4gIC8vIENsZWFyIHNlYXJjaCBidXR0b25cbiAgbGV0IGZpbHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXInKVxuICBsZXQgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZpbHRlciAuc2VhcmNoJylcbiAgbGV0IHNlYXJjaF9jbGVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5maWx0ZXIgLnNlYXJjaF9jbGVhcicpXG5cbiAgLy8gT24gc2VhcmNoIGNvbXBsZXRlIGNhbGxiYWNrXG4gIGxpc3Qub24oJ3NlYXJjaENvbXBsZXRlJywgKCkgPT4ge1xuXG4gICAgLy8gVXBkYXRlIHRoZSBzZWFyY2ggdGV4dCBpbiBlbXB0eSBub3RpY2VcbiAgICBsZXQgdmFsdWUgPSBzZWFyY2gudmFsdWVcbiAgICBub3RpY2VfZW1wdHlfdGV4dC5pbm5lckhUTUwgPSB2YWx1ZVxuXG4gICAgLy8gU2hvdyBjbGVhciBzZWFyY2ggYnV0dG9uIGlmIGEgdmFsdWUgdGhlcmUgaXMgc29tZXRoaW5nIGluIHNlYXJjaFxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdS5hZGRDbGFzcyhmaWx0ZXIsICdpcy1hY3RpdmUnKVxuICAgICAgdS5hZGRDbGFzcyhzZWFyY2gsICdpcy1hY3RpdmUnKVxuICAgICAgdS5yZW1vdmVDbGFzcyhzZWFyY2hfY2xlYXIsICdkX25vbmUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB1LnJlbW92ZUNsYXNzKGZpbHRlciwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LnJlbW92ZUNsYXNzKHNlYXJjaCwgJ2lzLWFjdGl2ZScpXG4gICAgICB1LmFkZENsYXNzKHNlYXJjaF9jbGVhciwgJ2Rfbm9uZScpXG4gICAgfVxuXG4gICAgLy8gVG9nZ2xlIG5vdGljZSBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZiB2aXNpYmxlIGl0ZW1zXG4gICAgaWYgKGxpc3QudmlzaWJsZUl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIHUuYWRkQ2xhc3Mobm90aWNlX2VtcHR5LCAnZF9ub25lJylcbiAgICB9IGVsc2Uge1xuICAgICAgdS5yZW1vdmVDbGFzcyhub3RpY2VfZW1wdHksICdkX25vbmUnKVxuICAgIH1cbiAgfSlcblxuICAvLyBDbGljayBldmVudHMgZm9yIGNhdGVnb3J5IGFuZCBjbGVhcnNcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXJfc2VhcmNoX2NsZWFyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJy5zZWFyY2hfY2xlYXInKVxuICAgIGxldCB0cmlnZ2VyX3NlYXJjaF9jYXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLmNhdGVnb3J5JylcblxuICAgIGlmICh0cmlnZ2VyX3NlYXJjaF9jbGVhcikge1xuICAgICAgc2VhcmNoLnZhbHVlID0gJydcbiAgICAgIGxpc3Quc2VhcmNoKClcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG5cbiAgICBpZiAodHJpZ2dlcl9zZWFyY2hfY2F0KSB7XG4gICAgICBzZWFyY2gudmFsdWUgPSB0cmlnZ2VyX3NlYXJjaF9jYXQuZGF0YXNldC5jYXRlZ29yeVxuICAgICAgbGlzdC5zZWFyY2goc2VhcmNoLnZhbHVlKVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICB9LCBmYWxzZSlcblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBhZGRBc3luYyA9IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2ssIGl0ZW1zKSB7XG4gICAgdmFyIHZhbHVlc1RvQWRkID0gdmFsdWVzLnNwbGljZSgwLCA1MCk7XG4gICAgaXRlbXMgPSBpdGVtcyB8fCBbXTtcbiAgICBpdGVtcyA9IGl0ZW1zLmNvbmNhdChsaXN0LmFkZCh2YWx1ZXNUb0FkZCkpO1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYWRkQXN5bmModmFsdWVzLCBjYWxsYmFjaywgaXRlbXMpO1xuICAgICAgfSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QudXBkYXRlKCk7XG4gICAgICBjYWxsYmFjayhpdGVtcyk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gYWRkQXN5bmM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgLy8gQWRkIGhhbmRsZXJzXG4gIGxpc3QuaGFuZGxlcnMuZmlsdGVyU3RhcnQgPSBsaXN0LmhhbmRsZXJzLmZpbHRlclN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLmZpbHRlckNvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5maWx0ZXJDb21wbGV0ZSB8fCBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24oZmlsdGVyRnVuY3Rpb24pIHtcbiAgICBsaXN0LnRyaWdnZXIoJ2ZpbHRlclN0YXJ0Jyk7XG4gICAgbGlzdC5pID0gMTsgLy8gUmVzZXQgcGFnaW5nXG4gICAgbGlzdC5yZXNldC5maWx0ZXIoKTtcbiAgICBpZiAoZmlsdGVyRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGlzdC5maWx0ZXJlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LmZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHZhciBpcyA9IGxpc3QuaXRlbXM7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBpcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gaXNbaV07XG4gICAgICAgIGlmIChmaWx0ZXJGdW5jdGlvbihpdGVtKSkge1xuICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignZmlsdGVyQ29tcGxldGUnKTtcbiAgICByZXR1cm4gbGlzdC52aXNpYmxlSXRlbXM7XG4gIH07XG59O1xuIiwiXG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpLFxuICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tc3RyaW5nJyksXG4gIGdldEJ5Q2xhc3MgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1ieS1jbGFzcycpLFxuICBmdXp6eSA9IHJlcXVpcmUoJy4vdXRpbHMvZnV6enknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgIGxvY2F0aW9uOiAwLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgdGhyZXNob2xkOiAwLjQsXG4gICAgbXVsdGlTZWFyY2g6IHRydWUsXG4gICAgc2VhcmNoQ2xhc3M6ICdmdXp6eS1zZWFyY2gnXG4gIH0sIG9wdGlvbnMpO1xuXG5cblxuICB2YXIgZnV6enlTZWFyY2ggPSB7XG4gICAgc2VhcmNoOiBmdW5jdGlvbihzZWFyY2hTdHJpbmcsIGNvbHVtbnMpIHtcbiAgICAgIC8vIFN1YnN0cmFjdCBhcmd1bWVudHMgZnJvbSB0aGUgc2VhcmNoU3RyaW5nIG9yIHB1dCBzZWFyY2hTdHJpbmcgYXMgb25seSBhcmd1bWVudFxuICAgICAgdmFyIHNlYXJjaEFyZ3VtZW50cyA9IG9wdGlvbnMubXVsdGlTZWFyY2ggPyBzZWFyY2hTdHJpbmcucmVwbGFjZSgvICskLywgJycpLnNwbGl0KC8gKy8pIDogW3NlYXJjaFN0cmluZ107XG5cbiAgICAgIGZvciAodmFyIGsgPSAwLCBrbCA9IGxpc3QuaXRlbXMubGVuZ3RoOyBrIDwga2w7IGsrKykge1xuICAgICAgICBmdXp6eVNlYXJjaC5pdGVtKGxpc3QuaXRlbXNba10sIGNvbHVtbnMsIHNlYXJjaEFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtOiBmdW5jdGlvbihpdGVtLCBjb2x1bW5zLCBzZWFyY2hBcmd1bWVudHMpIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWU7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VhcmNoQXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmb3VuZEFyZ3VtZW50ID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGNvbHVtbnMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGlmIChmdXp6eVNlYXJjaC52YWx1ZXMoaXRlbS52YWx1ZXMoKSwgY29sdW1uc1tqXSwgc2VhcmNoQXJndW1lbnRzW2ldKSkge1xuICAgICAgICAgICAgZm91bmRBcmd1bWVudCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCFmb3VuZEFyZ3VtZW50KSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaXRlbS5mb3VuZCA9IGZvdW5kO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbih2YWx1ZXMsIHZhbHVlLCBzZWFyY2hBcmd1bWVudCkge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIHRleHQgPSB0b1N0cmluZyh2YWx1ZXNbdmFsdWVdKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChmdXp6eSh0ZXh0LCBzZWFyY2hBcmd1bWVudCwgb3B0aW9ucykpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuXG4gIGV2ZW50cy5iaW5kKGdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBvcHRpb25zLnNlYXJjaENsYXNzKSwgJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7IC8vIElFIGhhdmUgc3JjRWxlbWVudFxuICAgIGxpc3Quc2VhcmNoKHRhcmdldC52YWx1ZSwgZnV6enlTZWFyY2guc2VhcmNoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0ciwgY29sdW1ucykge1xuICAgIGxpc3Quc2VhcmNoKHN0ciwgY29sdW1ucywgZnV6enlTZWFyY2guc2VhcmNoKTtcbiAgfTtcbn07XG4iLCJ2YXIgbmF0dXJhbFNvcnQgPSByZXF1aXJlKCdzdHJpbmctbmF0dXJhbC1jb21wYXJlJyksXG4gIGdldEJ5Q2xhc3MgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1ieS1jbGFzcycpLFxuICBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpLFxuICBpbmRleE9mID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC1vZicpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tc3RyaW5nJyksXG4gIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZ2V0QXR0cmlidXRlID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYXR0cmlidXRlJyksXG4gIHRvQXJyYXkgPSByZXF1aXJlKCcuL3V0aWxzL3RvLWFycmF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaWQsIG9wdGlvbnMsIHZhbHVlcykge1xuXG4gIHZhciBzZWxmID0gdGhpcyxcbiAgICBpbml0LFxuICAgIEl0ZW0gPSByZXF1aXJlKCcuL2l0ZW0nKShzZWxmKSxcbiAgICBhZGRBc3luYyA9IHJlcXVpcmUoJy4vYWRkLWFzeW5jJykoc2VsZiksXG4gICAgaW5pdFBhZ2luYXRpb24gPSByZXF1aXJlKCcuL3BhZ2luYXRpb24nKShzZWxmKTtcblxuICBpbml0ID0ge1xuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYubGlzdENsYXNzICAgICAgPSBcImxpc3RcIjtcbiAgICAgIHNlbGYuc2VhcmNoQ2xhc3MgICAgPSBcInNlYXJjaFwiO1xuICAgICAgc2VsZi5zb3J0Q2xhc3MgICAgICA9IFwic29ydFwiO1xuICAgICAgc2VsZi5wYWdlICAgICAgICAgICA9IDEwMDAwO1xuICAgICAgc2VsZi5pICAgICAgICAgICAgICA9IDE7XG4gICAgICBzZWxmLml0ZW1zICAgICAgICAgID0gW107XG4gICAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgICBzZWxmLm1hdGNoaW5nSXRlbXMgID0gW107XG4gICAgICBzZWxmLnNlYXJjaGVkICAgICAgID0gZmFsc2U7XG4gICAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgICBzZWxmLnNlYXJjaENvbHVtbnMgID0gdW5kZWZpbmVkO1xuICAgICAgc2VsZi5oYW5kbGVycyAgICAgICA9IHsgJ3VwZGF0ZWQnOiBbXSB9O1xuICAgICAgc2VsZi52YWx1ZU5hbWVzICAgICA9IFtdO1xuICAgICAgc2VsZi51dGlscyAgICAgICAgICA9IHtcbiAgICAgICAgZ2V0QnlDbGFzczogZ2V0QnlDbGFzcyxcbiAgICAgICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgICAgIGluZGV4T2Y6IGluZGV4T2YsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICB0b1N0cmluZzogdG9TdHJpbmcsXG4gICAgICAgIG5hdHVyYWxTb3J0OiBuYXR1cmFsU29ydCxcbiAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgZ2V0QXR0cmlidXRlOiBnZXRBdHRyaWJ1dGUsXG4gICAgICAgIHRvQXJyYXk6IHRvQXJyYXlcbiAgICAgIH07XG5cbiAgICAgIHNlbGYudXRpbHMuZXh0ZW5kKHNlbGYsIG9wdGlvbnMpO1xuXG4gICAgICBzZWxmLmxpc3RDb250YWluZXIgPSAodHlwZW9mKGlkKSA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIDogaWQ7XG4gICAgICBpZiAoIXNlbGYubGlzdENvbnRhaW5lcikgeyByZXR1cm47IH1cbiAgICAgIHNlbGYubGlzdCAgICAgICA9IGdldEJ5Q2xhc3Moc2VsZi5saXN0Q29udGFpbmVyLCBzZWxmLmxpc3RDbGFzcywgdHJ1ZSk7XG5cbiAgICAgIHNlbGYucGFyc2UgICAgICAgID0gcmVxdWlyZSgnLi9wYXJzZScpKHNlbGYpO1xuICAgICAgc2VsZi50ZW1wbGF0ZXIgICAgPSByZXF1aXJlKCcuL3RlbXBsYXRlcicpKHNlbGYpO1xuICAgICAgc2VsZi5zZWFyY2ggICAgICAgPSByZXF1aXJlKCcuL3NlYXJjaCcpKHNlbGYpO1xuICAgICAgc2VsZi5maWx0ZXIgICAgICAgPSByZXF1aXJlKCcuL2ZpbHRlcicpKHNlbGYpO1xuICAgICAgc2VsZi5zb3J0ICAgICAgICAgPSByZXF1aXJlKCcuL3NvcnQnKShzZWxmKTtcbiAgICAgIHNlbGYuZnV6enlTZWFyY2ggID0gcmVxdWlyZSgnLi9mdXp6eS1zZWFyY2gnKShzZWxmLCBvcHRpb25zLmZ1enp5U2VhcmNoKTtcblxuICAgICAgdGhpcy5oYW5kbGVycygpO1xuICAgICAgdGhpcy5pdGVtcygpO1xuICAgICAgdGhpcy5wYWdpbmF0aW9uKCk7XG5cbiAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfSxcbiAgICBoYW5kbGVyczogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBoYW5kbGVyIGluIHNlbGYuaGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHNlbGZbaGFuZGxlcl0pIHtcbiAgICAgICAgICBzZWxmLm9uKGhhbmRsZXIsIHNlbGZbaGFuZGxlcl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnBhcnNlKHNlbGYubGlzdCk7XG4gICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2VsZi5hZGQodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhZ2luYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICBvcHRpb25zLnBhZ2luYXRpb24gPSBbe31dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb25bMF0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uID0gW29wdGlvbnMucGFnaW5hdGlvbl07XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb3B0aW9ucy5wYWdpbmF0aW9uLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgICBpbml0UGFnaW5hdGlvbihvcHRpb25zLnBhZ2luYXRpb25baV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qXG4gICogUmUtcGFyc2UgdGhlIExpc3QsIHVzZSBpZiBodG1sIGhhdmUgY2hhbmdlZFxuICAqL1xuICB0aGlzLnJlSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICBzZWxmLml0ZW1zICAgICAgICAgID0gW107XG4gICAgc2VsZi52aXNpYmxlSXRlbXMgICA9IFtdO1xuICAgIHNlbGYubWF0Y2hpbmdJdGVtcyAgPSBbXTtcbiAgICBzZWxmLnNlYXJjaGVkICAgICAgID0gZmFsc2U7XG4gICAgc2VsZi5maWx0ZXJlZCAgICAgICA9IGZhbHNlO1xuICAgIHNlbGYucGFyc2Uoc2VsZi5saXN0KTtcbiAgfTtcblxuICB0aGlzLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBqc29uID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBqc29uLnB1c2goc2VsZi5pdGVtc1tpXS52YWx1ZXMoKSk7XG4gICAgfVxuICAgIHJldHVybiBqc29uO1xuICB9O1xuXG5cbiAgLypcbiAgKiBBZGQgb2JqZWN0IHRvIGxpc3RcbiAgKi9cbiAgdGhpcy5hZGQgPSBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBhZGRBc3luYyh2YWx1ZXMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFkZGVkID0gW10sXG4gICAgICBub3RDcmVhdGUgPSBmYWxzZTtcbiAgICBpZiAodmFsdWVzWzBdID09PSB1bmRlZmluZWQpe1xuICAgICAgdmFsdWVzID0gW3ZhbHVlc107XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHZhbHVlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG51bGw7XG4gICAgICBub3RDcmVhdGUgPSAoc2VsZi5pdGVtcy5sZW5ndGggPiBzZWxmLnBhZ2UpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgaXRlbSA9IG5ldyBJdGVtKHZhbHVlc1tpXSwgdW5kZWZpbmVkLCBub3RDcmVhdGUpO1xuICAgICAgc2VsZi5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgYWRkZWQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgc2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gYWRkZWQ7XG4gIH07XG5cblx0dGhpcy5zaG93ID0gZnVuY3Rpb24oaSwgcGFnZSkge1xuXHRcdHRoaXMuaSA9IGk7XG5cdFx0dGhpcy5wYWdlID0gcGFnZTtcblx0XHRzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBzZWxmO1xuXHR9O1xuXG4gIC8qIFJlbW92ZXMgb2JqZWN0IGZyb20gbGlzdC5cbiAgKiBMb29wcyB0aHJvdWdoIHRoZSBsaXN0IGFuZCByZW1vdmVzIG9iamVjdHMgd2hlcmVcbiAgKiBwcm9wZXJ0eSBcInZhbHVlbmFtZVwiID09PSB2YWx1ZVxuICAqL1xuICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKHZhbHVlTmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZm91bmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgaWYgKHNlbGYuaXRlbXNbaV0udmFsdWVzKClbdmFsdWVOYW1lXSA9PSB2YWx1ZSkge1xuICAgICAgICBzZWxmLnRlbXBsYXRlci5yZW1vdmUoc2VsZi5pdGVtc1tpXSwgb3B0aW9ucyk7XG4gICAgICAgIHNlbGYuaXRlbXMuc3BsaWNlKGksMSk7XG4gICAgICAgIGlsLS07XG4gICAgICAgIGktLTtcbiAgICAgICAgZm91bmQrKztcbiAgICAgIH1cbiAgICB9XG4gICAgc2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyogR2V0cyB0aGUgb2JqZWN0cyBpbiB0aGUgbGlzdCB3aGljaFxuICAqIHByb3BlcnR5IFwidmFsdWVOYW1lXCIgPT09IHZhbHVlXG4gICovXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24odmFsdWVOYW1lLCB2YWx1ZSkge1xuICAgIHZhciBtYXRjaGVkSXRlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc2VsZi5pdGVtc1tpXTtcbiAgICAgIGlmIChpdGVtLnZhbHVlcygpW3ZhbHVlTmFtZV0gPT0gdmFsdWUpIHtcbiAgICAgICAgbWF0Y2hlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVkSXRlbXM7XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgc2l6ZSBvZiB0aGUgbGlzdFxuICAqL1xuICB0aGlzLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2VsZi5pdGVtcy5sZW5ndGg7XG4gIH07XG5cbiAgLypcbiAgKiBSZW1vdmVzIGFsbCBpdGVtcyBmcm9tIHRoZSBsaXN0XG4gICovXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICBzZWxmLnRlbXBsYXRlci5jbGVhcigpO1xuICAgIHNlbGYuaXRlbXMgPSBbXTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLm9uID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgc2VsZi5oYW5kbGVyc1tldmVudF0ucHVzaChjYWxsYmFjayk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5vZmYgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgZSA9IHNlbGYuaGFuZGxlcnNbZXZlbnRdO1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoZSwgY2FsbGJhY2spO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBlLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMudHJpZ2dlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGkgPSBzZWxmLmhhbmRsZXJzW2V2ZW50XS5sZW5ndGg7XG4gICAgd2hpbGUoaS0tKSB7XG4gICAgICBzZWxmLmhhbmRsZXJzW2V2ZW50XVtpXShzZWxmKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5yZXNldCA9IHtcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcbiAgICAgICAgaWwgPSBpcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWwtLSkge1xuICAgICAgICBpc1tpbF0uZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG4gICAgc2VhcmNoOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG4gICAgICAgIGlsID0gaXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGlsLS0pIHtcbiAgICAgICAgaXNbaWxdLmZvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuXHRcdFx0aWwgPSBpcy5sZW5ndGg7XG5cbiAgICBzZWxmLnZpc2libGVJdGVtcyA9IFtdO1xuICAgIHNlbGYubWF0Y2hpbmdJdGVtcyA9IFtdO1xuICAgIHNlbGYudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoaXNbaV0ubWF0Y2hpbmcoKSAmJiAoKHNlbGYubWF0Y2hpbmdJdGVtcy5sZW5ndGgrMSkgPj0gc2VsZi5pICYmIHNlbGYudmlzaWJsZUl0ZW1zLmxlbmd0aCA8IHNlbGYucGFnZSkpIHtcbiAgICAgICAgaXNbaV0uc2hvdygpO1xuICAgICAgICBzZWxmLnZpc2libGVJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgfSBlbHNlIGlmIChpc1tpXS5tYXRjaGluZygpKSB7XG4gICAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgICAgaXNbaV0uaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNbaV0uaGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICBpbml0LnN0YXJ0KCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpIHtcbiAgICB2YXIgaXRlbSA9IHRoaXM7XG5cbiAgICB0aGlzLl92YWx1ZXMgPSB7fTtcblxuICAgIHRoaXMuZm91bmQgPSBmYWxzZTsgLy8gU2hvdyBpZiBsaXN0LnNlYXJjaGVkID09IHRydWUgYW5kIHRoaXMuZm91bmQgPT0gdHJ1ZVxuICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTsvLyBTaG93IGlmIGxpc3QuZmlsdGVyZWQgPT0gdHJ1ZSBhbmQgdGhpcy5maWx0ZXJlZCA9PSB0cnVlXG5cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSkge1xuICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobm90Q3JlYXRlKSB7XG4gICAgICAgICAgaXRlbS52YWx1ZXMoaW5pdFZhbHVlcywgbm90Q3JlYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLnZhbHVlcyhpbml0VmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5lbG0gPSBlbGVtZW50O1xuICAgICAgICB2YXIgdmFsdWVzID0gbGlzdC50ZW1wbGF0ZXIuZ2V0KGl0ZW0sIGluaXRWYWx1ZXMpO1xuICAgICAgICBpdGVtLnZhbHVlcyh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnZhbHVlcyA9IGZ1bmN0aW9uKG5ld1ZhbHVlcywgbm90Q3JlYXRlKSB7XG4gICAgICBpZiAobmV3VmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yKHZhciBuYW1lIGluIG5ld1ZhbHVlcykge1xuICAgICAgICAgIGl0ZW0uX3ZhbHVlc1tuYW1lXSA9IG5ld1ZhbHVlc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90Q3JlYXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgbGlzdC50ZW1wbGF0ZXIuc2V0KGl0ZW0sIGl0ZW0udmFsdWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXRlbS5fdmFsdWVzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QudGVtcGxhdGVyLnNob3coaXRlbSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuaGlkZShpdGVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy5tYXRjaGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgKGxpc3QuZmlsdGVyZWQgJiYgbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZvdW5kICYmIGl0ZW0uZmlsdGVyZWQpIHx8XG4gICAgICAgIChsaXN0LmZpbHRlcmVkICYmICFsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZmlsdGVyZWQpIHx8XG4gICAgICAgICghbGlzdC5maWx0ZXJlZCAmJiBsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZm91bmQpIHx8XG4gICAgICAgICghbGlzdC5maWx0ZXJlZCAmJiAhbGlzdC5zZWFyY2hlZClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIHRoaXMudmlzaWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChpdGVtLmVsbSAmJiAoaXRlbS5lbG0ucGFyZW50Tm9kZSA9PSBsaXN0Lmxpc3QpKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgaW5pdChpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpO1xuICB9O1xufTtcbiIsInZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIExpc3QgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciByZWZyZXNoID0gZnVuY3Rpb24ocGFnaW5nTGlzdCwgb3B0aW9ucykge1xuICAgIHZhciBpdGVtLFxuICAgICAgbCA9IGxpc3QubWF0Y2hpbmdJdGVtcy5sZW5ndGgsXG4gICAgICBpbmRleCA9IGxpc3QuaSxcbiAgICAgIHBhZ2UgPSBsaXN0LnBhZ2UsXG4gICAgICBwYWdlcyA9IE1hdGguY2VpbChsIC8gcGFnZSksXG4gICAgICBjdXJyZW50UGFnZSA9IE1hdGguY2VpbCgoaW5kZXggLyBwYWdlKSksXG4gICAgICBpbm5lcldpbmRvdyA9IG9wdGlvbnMuaW5uZXJXaW5kb3cgfHwgMixcbiAgICAgIGxlZnQgPSBvcHRpb25zLmxlZnQgfHwgb3B0aW9ucy5vdXRlcldpbmRvdyB8fCAwLFxuICAgICAgcmlnaHQgPSBvcHRpb25zLnJpZ2h0IHx8IG9wdGlvbnMub3V0ZXJXaW5kb3cgfHwgMDtcblxuICAgIHJpZ2h0ID0gcGFnZXMgLSByaWdodDtcblxuICAgIHBhZ2luZ0xpc3QuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBwYWdlczsgaSsrKSB7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gKGN1cnJlbnRQYWdlID09PSBpKSA/IFwiYWN0aXZlXCIgOiBcIlwiO1xuXG4gICAgICAvL2NvbnNvbGUubG9nKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgKGN1cnJlbnRQYWdlIC0gaW5uZXJXaW5kb3cpLCAoY3VycmVudFBhZ2UgKyBpbm5lcldpbmRvdyksIGNsYXNzTmFtZSk7XG5cbiAgICAgIGlmIChpcy5udW1iZXIoaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykpIHtcbiAgICAgICAgaXRlbSA9IHBhZ2luZ0xpc3QuYWRkKHtcbiAgICAgICAgICBwYWdlOiBpLFxuICAgICAgICAgIGRvdHRlZDogZmFsc2VcbiAgICAgICAgfSlbMF07XG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICBjbGFzc2VzKGl0ZW0uZWxtKS5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRFdmVudChpdGVtLmVsbSwgaSwgcGFnZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzLmRvdHRlZChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBwYWdpbmdMaXN0LnNpemUoKSkpIHtcbiAgICAgICAgaXRlbSA9IHBhZ2luZ0xpc3QuYWRkKHtcbiAgICAgICAgICBwYWdlOiBcIi4uLlwiLFxuICAgICAgICAgIGRvdHRlZDogdHJ1ZVxuICAgICAgICB9KVswXTtcbiAgICAgICAgY2xhc3NlcyhpdGVtLmVsbSkuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBpcyA9IHtcbiAgICBudW1iZXI6IGZ1bmN0aW9uKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgICByZXR1cm4gdGhpcy5sZWZ0KGksIGxlZnQpIHx8IHRoaXMucmlnaHQoaSwgcmlnaHQpIHx8IHRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KTtcbiAgICB9LFxuICAgIGxlZnQ6IGZ1bmN0aW9uKGksIGxlZnQpIHtcbiAgICAgIHJldHVybiAoaSA8PSBsZWZ0KTtcbiAgICB9LFxuICAgIHJpZ2h0OiBmdW5jdGlvbihpLCByaWdodCkge1xuICAgICAgcmV0dXJuIChpID4gcmlnaHQpO1xuICAgIH0sXG4gICAgaW5uZXJXaW5kb3c6IGZ1bmN0aW9uKGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgcmV0dXJuICggaSA+PSAoY3VycmVudFBhZ2UgLSBpbm5lcldpbmRvdykgJiYgaSA8PSAoY3VycmVudFBhZ2UgKyBpbm5lcldpbmRvdykpO1xuICAgIH0sXG4gICAgZG90dGVkOiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmRvdHRlZExlZnQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgfHwgKHRoaXMuZG90dGVkUmlnaHQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSk7XG4gICAgfSxcbiAgICBkb3R0ZWRMZWZ0OiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICByZXR1cm4gKChpID09IChsZWZ0ICsgMSkpICYmICF0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgJiYgIXRoaXMucmlnaHQoaSwgcmlnaHQpKTtcbiAgICB9LFxuICAgIGRvdHRlZFJpZ2h0OiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pIHtcbiAgICAgIGlmIChwYWdpbmdMaXN0Lml0ZW1zW2N1cnJlbnRQYWdlSXRlbS0xXS52YWx1ZXMoKS5kb3R0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICgoaSA9PSAocmlnaHQpKSAmJiAhdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpICYmICF0aGlzLnJpZ2h0KGksIHJpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBhZGRFdmVudCA9IGZ1bmN0aW9uKGVsbSwgaSwgcGFnZSkge1xuICAgICBldmVudHMuYmluZChlbG0sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgIGxpc3Quc2hvdygoaS0xKSpwYWdlICsgMSwgcGFnZSk7XG4gICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIHBhZ2luZ0xpc3QgPSBuZXcgTGlzdChsaXN0Lmxpc3RDb250YWluZXIuaWQsIHtcbiAgICAgIGxpc3RDbGFzczogb3B0aW9ucy5wYWdpbmF0aW9uQ2xhc3MgfHwgJ3BhZ2luYXRpb24nLFxuICAgICAgaXRlbTogXCI8bGk+PGEgY2xhc3M9J3BhZ2UnIGhyZWY9J2phdmFzY3JpcHQ6ZnVuY3Rpb24gWigpe1o9XFxcIlxcXCJ9WigpJz48L2E+PC9saT5cIixcbiAgICAgIHZhbHVlTmFtZXM6IFsncGFnZScsICdkb3R0ZWQnXSxcbiAgICAgIHNlYXJjaENsYXNzOiAncGFnaW5hdGlvbi1zZWFyY2gtdGhhdC1pcy1ub3Qtc3VwcG9zZWQtdG8tZXhpc3QnLFxuICAgICAgc29ydENsYXNzOiAncGFnaW5hdGlvbi1zb3J0LXRoYXQtaXMtbm90LXN1cHBvc2VkLXRvLWV4aXN0J1xuICAgIH0pO1xuXG4gICAgbGlzdC5vbigndXBkYXRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgcmVmcmVzaChwYWdpbmdMaXN0LCBvcHRpb25zKTtcbiAgICB9KTtcbiAgICByZWZyZXNoKHBhZ2luZ0xpc3QsIG9wdGlvbnMpO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciBJdGVtID0gcmVxdWlyZSgnLi9pdGVtJykobGlzdCk7XG5cbiAgdmFyIGdldENoaWxkcmVuID0gZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgdmFyIG5vZGVzID0gcGFyZW50LmNoaWxkTm9kZXMsXG4gICAgICBpdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIC8vIE9ubHkgdGV4dG5vZGVzIGhhdmUgYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgaWYgKG5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpdGVtcy5wdXNoKG5vZGVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9O1xuXG4gIHZhciBwYXJzZSA9IGZ1bmN0aW9uKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcykge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGl0ZW1FbGVtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsaXN0Lml0ZW1zLnB1c2gobmV3IEl0ZW0odmFsdWVOYW1lcywgaXRlbUVsZW1lbnRzW2ldKSk7XG4gICAgfVxuICB9O1xuICB2YXIgcGFyc2VBc3luYyA9IGZ1bmN0aW9uKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcykge1xuICAgIHZhciBpdGVtc1RvSW5kZXggPSBpdGVtRWxlbWVudHMuc3BsaWNlKDAsIDUwKTsgLy8gVE9ETzogSWYgPCAxMDAgaXRlbXMsIHdoYXQgaGFwcGVucyBpbiBJRSBldGM/XG4gICAgcGFyc2UoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICBpZiAoaXRlbUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhcnNlQXN5bmMoaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKTtcbiAgICAgIH0sIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnVwZGF0ZSgpO1xuICAgICAgbGlzdC50cmlnZ2VyKCdwYXJzZUNvbXBsZXRlJyk7XG4gICAgfVxuICB9O1xuXG4gIGxpc3QuaGFuZGxlcnMucGFyc2VDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMucGFyc2VDb21wbGV0ZSB8fCBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zVG9JbmRleCA9IGdldENoaWxkcmVuKGxpc3QubGlzdCksXG4gICAgICB2YWx1ZU5hbWVzID0gbGlzdC52YWx1ZU5hbWVzO1xuXG4gICAgaWYgKGxpc3QuaW5kZXhBc3luYykge1xuICAgICAgcGFyc2VBc3luYyhpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZShpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGl0ZW0sXG4gICAgdGV4dCxcbiAgICBjb2x1bW5zLFxuICAgIHNlYXJjaFN0cmluZyxcbiAgICBjdXN0b21TZWFyY2g7XG5cbiAgdmFyIHByZXBhcmUgPSB7XG4gICAgcmVzZXRMaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QuaSA9IDE7XG4gICAgICBsaXN0LnRlbXBsYXRlci5jbGVhcigpO1xuICAgICAgY3VzdG9tU2VhcmNoID0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgc2V0T3B0aW9uczogZnVuY3Rpb24oYXJncykge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID09IDIgJiYgYXJnc1sxXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGNvbHVtbnMgPSBhcmdzWzFdO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAyICYmIHR5cGVvZihhcmdzWzFdKSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgY3VzdG9tU2VhcmNoID0gYXJnc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMykge1xuICAgICAgICBjb2x1bW5zID0gYXJnc1sxXTtcbiAgICAgICAgY3VzdG9tU2VhcmNoID0gYXJnc1syXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRDb2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChsaXN0Lml0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgaWYgKGNvbHVtbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5zID0gKGxpc3Quc2VhcmNoQ29sdW1ucyA9PT0gdW5kZWZpbmVkKSA/IHByZXBhcmUudG9BcnJheShsaXN0Lml0ZW1zWzBdLnZhbHVlcygpKSA6IGxpc3Quc2VhcmNoQ29sdW1ucztcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFNlYXJjaFN0cmluZzogZnVuY3Rpb24ocykge1xuICAgICAgcyA9IGxpc3QudXRpbHMudG9TdHJpbmcocykudG9Mb3dlckNhc2UoKTtcbiAgICAgIHMgPSBzLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXS9nLCBcIlxcXFwkJlwiKTsgLy8gRXNjYXBlIHJlZ3VsYXIgZXhwcmVzc2lvbiBjaGFyYWN0ZXJzXG4gICAgICBzZWFyY2hTdHJpbmcgPSBzO1xuICAgIH0sXG4gICAgdG9BcnJheTogZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgdG1wQ29sdW1uID0gW107XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHZhbHVlcykge1xuICAgICAgICB0bXBDb2x1bW4ucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0bXBDb2x1bW47XG4gICAgfVxuICB9O1xuICB2YXIgc2VhcmNoID0ge1xuICAgIGxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgayA9IDAsIGtsID0gbGlzdC5pdGVtcy5sZW5ndGg7IGsgPCBrbDsgaysrKSB7XG4gICAgICAgIHNlYXJjaC5pdGVtKGxpc3QuaXRlbXNba10pO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbTogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaXRlbS5mb3VuZCA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gY29sdW1ucy5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgIGlmIChzZWFyY2gudmFsdWVzKGl0ZW0udmFsdWVzKCksIGNvbHVtbnNbal0pKSB7XG4gICAgICAgICAgaXRlbS5mb3VuZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKHZhbHVlcywgY29sdW1uKSB7XG4gICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KGNvbHVtbikpIHtcbiAgICAgICAgdGV4dCA9IGxpc3QudXRpbHMudG9TdHJpbmcodmFsdWVzW2NvbHVtbl0pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICgoc2VhcmNoU3RyaW5nICE9PSBcIlwiKSAmJiAodGV4dC5zZWFyY2goc2VhcmNoU3RyaW5nKSA+IC0xKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnJlc2V0LnNlYXJjaCgpO1xuICAgICAgbGlzdC5zZWFyY2hlZCA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICB2YXIgc2VhcmNoTWV0aG9kID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdzZWFyY2hTdGFydCcpO1xuXG4gICAgcHJlcGFyZS5yZXNldExpc3QoKTtcbiAgICBwcmVwYXJlLnNldFNlYXJjaFN0cmluZyhzdHIpO1xuICAgIHByZXBhcmUuc2V0T3B0aW9ucyhhcmd1bWVudHMpOyAvLyBzdHIsIGNvbHN8c2VhcmNoRnVuY3Rpb24sIHNlYXJjaEZ1bmN0aW9uXG4gICAgcHJlcGFyZS5zZXRDb2x1bW5zKCk7XG5cbiAgICBpZiAoc2VhcmNoU3RyaW5nID09PSBcIlwiICkge1xuICAgICAgc2VhcmNoLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc2VhcmNoZWQgPSB0cnVlO1xuICAgICAgaWYgKGN1c3RvbVNlYXJjaCkge1xuICAgICAgICBjdXN0b21TZWFyY2goc2VhcmNoU3RyaW5nLCBjb2x1bW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaC5saXN0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ3NlYXJjaENvbXBsZXRlJyk7XG4gICAgcmV0dXJuIGxpc3QudmlzaWJsZUl0ZW1zO1xuICB9O1xuXG4gIGxpc3QuaGFuZGxlcnMuc2VhcmNoU3RhcnQgPSBsaXN0LmhhbmRsZXJzLnNlYXJjaFN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLnNlYXJjaENvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5zZWFyY2hDb21wbGV0ZSB8fCBbXTtcblxuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc2VhcmNoQ2xhc3MpLCAna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCwgLy8gSUUgaGF2ZSBzcmNFbGVtZW50XG4gICAgICBhbHJlYWR5Q2xlYXJlZCA9ICh0YXJnZXQudmFsdWUgPT09IFwiXCIgJiYgIWxpc3Quc2VhcmNoZWQpO1xuICAgIGlmICghYWxyZWFkeUNsZWFyZWQpIHsgLy8gSWYgb25pbnB1dCBhbHJlYWR5IGhhdmUgcmVzZXR0ZWQgdGhlIGxpc3QsIGRvIG5vdGhpbmdcbiAgICAgIHNlYXJjaE1ldGhvZCh0YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVXNlZCB0byBkZXRlY3QgY2xpY2sgb24gSFRNTDUgY2xlYXIgYnV0dG9uXG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQobGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zZWFyY2hDbGFzcyksICdpbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGlmICh0YXJnZXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIHNlYXJjaE1ldGhvZCgnJyk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2VhcmNoTWV0aG9kO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciBidXR0b25zID0ge1xuICAgIGVsczogdW5kZWZpbmVkLFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGJ1dHRvbnMuZWxzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ1dHRvbnMuZWxzW2ldKS5yZW1vdmUoJ2FzYycpO1xuICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnV0dG9ucy5lbHNbaV0pLnJlbW92ZSgnZGVzYycpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0T3JkZXI6IGZ1bmN0aW9uKGJ0bikge1xuICAgICAgdmFyIHByZWRlZmluZWRPcmRlciA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtb3JkZXInKTtcbiAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gXCJhc2NcIiB8fCBwcmVkZWZpbmVkT3JkZXIgPT0gXCJkZXNjXCIpIHtcbiAgICAgICAgcmV0dXJuIHByZWRlZmluZWRPcmRlcjtcbiAgICAgIH0gZWxzZSBpZiAobGlzdC51dGlscy5jbGFzc2VzKGJ0bikuaGFzKCdkZXNjJykpIHtcbiAgICAgICAgcmV0dXJuIFwiYXNjXCI7XG4gICAgICB9IGVsc2UgaWYgKGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmhhcygnYXNjJykpIHtcbiAgICAgICAgcmV0dXJuIFwiZGVzY1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiYXNjXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRJblNlbnNpdGl2ZTogZnVuY3Rpb24oYnRuLCBvcHRpb25zKSB7XG4gICAgICB2YXIgaW5zZW5zaXRpdmUgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLWluc2Vuc2l0aXZlJyk7XG4gICAgICBpZiAoaW5zZW5zaXRpdmUgPT09IFwiZmFsc2VcIikge1xuICAgICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldE9yZGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBidXR0b25zLmVscy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIHZhciBidG4gPSBidXR0b25zLmVsc1tpXTtcbiAgICAgICAgaWYgKGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtc29ydCcpICE9PSBvcHRpb25zLnZhbHVlTmFtZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmVkZWZpbmVkT3JkZXIgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLW9yZGVyJyk7XG4gICAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gXCJhc2NcIiB8fCBwcmVkZWZpbmVkT3JkZXIgPT0gXCJkZXNjXCIpIHtcbiAgICAgICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IG9wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmFkZChvcHRpb25zLm9yZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ0bikuYWRkKG9wdGlvbnMub3JkZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBzb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdzb3J0U3RhcnQnKTtcbiAgICB2YXIgb3B0aW9ucyA9IHt9O1xuXG4gICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXS5jdXJyZW50VGFyZ2V0IHx8IGFyZ3VtZW50c1swXS5zcmNFbGVtZW50IHx8IHVuZGVmaW5lZDtcblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIG9wdGlvbnMudmFsdWVOYW1lID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUodGFyZ2V0LCAnZGF0YS1zb3J0Jyk7XG4gICAgICBidXR0b25zLmdldEluU2Vuc2l0aXZlKHRhcmdldCwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLm9yZGVyID0gYnV0dG9ucy5nZXRPcmRlcih0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zID0gYXJndW1lbnRzWzFdIHx8IG9wdGlvbnM7XG4gICAgICBvcHRpb25zLnZhbHVlTmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIG9wdGlvbnMub3JkZXIgPSBvcHRpb25zLm9yZGVyIHx8IFwiYXNjXCI7XG4gICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gKHR5cGVvZiBvcHRpb25zLmluc2Vuc2l0aXZlID09IFwidW5kZWZpbmVkXCIpID8gdHJ1ZSA6IG9wdGlvbnMuaW5zZW5zaXRpdmU7XG4gICAgfVxuXG4gICAgYnV0dG9ucy5jbGVhcigpO1xuICAgIGJ1dHRvbnMuc2V0T3JkZXIob3B0aW9ucyk7XG5cblxuICAgIC8vIGNhc2VJbnNlbnNpdGl2ZVxuICAgIC8vIGFscGhhYmV0XG4gICAgdmFyIGN1c3RvbVNvcnRGdW5jdGlvbiA9IChvcHRpb25zLnNvcnRGdW5jdGlvbiB8fCBsaXN0LnNvcnRGdW5jdGlvbiB8fCBudWxsKSxcbiAgICAgICAgbXVsdGkgPSAoKG9wdGlvbnMub3JkZXIgPT09ICdkZXNjJykgPyAtMSA6IDEpLFxuICAgICAgICBzb3J0RnVuY3Rpb247XG5cbiAgICBpZiAoY3VzdG9tU29ydEZ1bmN0aW9uKSB7XG4gICAgICBzb3J0RnVuY3Rpb24gPSBmdW5jdGlvbihpdGVtQSwgaXRlbUIpIHtcbiAgICAgICAgcmV0dXJuIGN1c3RvbVNvcnRGdW5jdGlvbihpdGVtQSwgaXRlbUIsIG9wdGlvbnMpICogbXVsdGk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzb3J0RnVuY3Rpb24gPSBmdW5jdGlvbihpdGVtQSwgaXRlbUIpIHtcbiAgICAgICAgdmFyIHNvcnQgPSBsaXN0LnV0aWxzLm5hdHVyYWxTb3J0O1xuICAgICAgICBzb3J0LmFscGhhYmV0ID0gbGlzdC5hbHBoYWJldCB8fCBvcHRpb25zLmFscGhhYmV0IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFzb3J0LmFscGhhYmV0ICYmIG9wdGlvbnMuaW5zZW5zaXRpdmUpIHtcbiAgICAgICAgICBzb3J0ID0gbGlzdC51dGlscy5uYXR1cmFsU29ydC5jYXNlSW5zZW5zaXRpdmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvcnQoaXRlbUEudmFsdWVzKClbb3B0aW9ucy52YWx1ZU5hbWVdLCBpdGVtQi52YWx1ZXMoKVtvcHRpb25zLnZhbHVlTmFtZV0pICogbXVsdGk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGxpc3QuaXRlbXMuc29ydChzb3J0RnVuY3Rpb24pO1xuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdzb3J0Q29tcGxldGUnKTtcbiAgfTtcblxuICAvLyBBZGQgaGFuZGxlcnNcbiAgbGlzdC5oYW5kbGVycy5zb3J0U3RhcnQgPSBsaXN0LmhhbmRsZXJzLnNvcnRTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5zb3J0Q29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnNvcnRDb21wbGV0ZSB8fCBbXTtcblxuICBidXR0b25zLmVscyA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc29ydENsYXNzKTtcbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChidXR0b25zLmVscywgJ2NsaWNrJywgc29ydCk7XG4gIGxpc3Qub24oJ3NlYXJjaFN0YXJ0JywgYnV0dG9ucy5jbGVhcik7XG4gIGxpc3Qub24oJ2ZpbHRlclN0YXJ0JywgYnV0dG9ucy5jbGVhcik7XG5cbiAgcmV0dXJuIHNvcnQ7XG59O1xuIiwidmFyIFRlbXBsYXRlciA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGl0ZW1Tb3VyY2UsXG4gICAgdGVtcGxhdGVyID0gdGhpcztcblxuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGl0ZW1Tb3VyY2UgPSB0ZW1wbGF0ZXIuZ2V0SXRlbVNvdXJjZShsaXN0Lml0ZW0pO1xuICAgIGlmIChpdGVtU291cmNlKSB7XG4gICAgICBpdGVtU291cmNlID0gdGVtcGxhdGVyLmNsZWFyU291cmNlSXRlbShpdGVtU291cmNlLCBsaXN0LnZhbHVlTmFtZXMpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmNsZWFyU291cmNlSXRlbSA9IGZ1bmN0aW9uKGVsLCB2YWx1ZU5hbWVzKSB7XG4gICAgZm9yKHZhciBpID0gMCwgaWwgPSB2YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBlbG07XG4gICAgICBpZiAodmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IHZhbHVlTmFtZXNbaV0uZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLScrdmFsdWVOYW1lc1tpXS5kYXRhW2pdLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lc1tpXS5hdHRyICYmIHZhbHVlTmFtZXNbaV0ubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoZWwsIHZhbHVlTmFtZXNbaV0ubmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKHZhbHVlTmFtZXNbaV0uYXR0ciwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhlbCwgdmFsdWVOYW1lc1tpXSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgdGhpcy5nZXRJdGVtU291cmNlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBub2RlcyA9IGxpc3QubGlzdC5jaGlsZE5vZGVzLFxuICAgICAgICBpdGVtcyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBub2Rlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIC8vIE9ubHkgdGV4dG5vZGVzIGhhdmUgYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICBpZiAobm9kZXNbaV0uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoLzx0cltcXHM+XS9nLmV4ZWMoaXRlbSkpIHtcbiAgICAgIHZhciB0Ym9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG4gICAgICB0Ym9keS5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgcmV0dXJuIHRib2R5LmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIGlmIChpdGVtLmluZGV4T2YoXCI8XCIpICE9PSAtMSkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICByZXR1cm4gZGl2LmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaXN0Lml0ZW0pO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xuXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24oaXRlbSwgdmFsdWVOYW1lcykge1xuICAgIHRlbXBsYXRlci5jcmVhdGUoaXRlbSk7XG4gICAgdmFyIHZhbHVlcyA9IHt9O1xuICAgIGZvcih2YXIgaSA9IDAsIGlsID0gdmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgaWYgKHZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSB2YWx1ZU5hbWVzW2ldLmRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldLmRhdGFbal1dID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoaXRlbS5lbG0sICdkYXRhLScrdmFsdWVOYW1lc1tpXS5kYXRhW2pdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWVzW2ldLmF0dHIgJiYgdmFsdWVOYW1lc1tpXS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lc1tpXS5uYW1lLCB0cnVlKTtcbiAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV0ubmFtZV0gPSBlbG0gPyBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShlbG0sIHZhbHVlTmFtZXNbaV0uYXR0cikgOiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWVzW2ldLCB0cnVlKTtcbiAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV1dID0gZWxtID8gZWxtLmlubmVySFRNTCA6IFwiXCI7XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgdGhpcy5zZXQgPSBmdW5jdGlvbihpdGVtLCB2YWx1ZXMpIHtcbiAgICB2YXIgZ2V0VmFsdWVOYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbGlzdC52YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3QudmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBsaXN0LnZhbHVlTmFtZXNbaV0uZGF0YTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBkYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2pdID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG5hbWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdC52YWx1ZU5hbWVzW2ldLmF0dHIgJiYgbGlzdC52YWx1ZU5hbWVzW2ldLm5hbWUgJiYgbGlzdC52YWx1ZU5hbWVzW2ldLm5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBsaXN0LnZhbHVlTmFtZXNbaV07XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdC52YWx1ZU5hbWVzW2ldID09PSBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXRWYWx1ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgdmFyIHZhbHVlTmFtZSA9IGdldFZhbHVlTmFtZShuYW1lKTtcbiAgICAgIGlmICghdmFsdWVOYW1lKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAodmFsdWVOYW1lLmRhdGEpIHtcbiAgICAgICAgaXRlbS5lbG0uc2V0QXR0cmlidXRlKCdkYXRhLScrdmFsdWVOYW1lLmRhdGEsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lLmF0dHIgJiYgdmFsdWVOYW1lLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWUubmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKHZhbHVlTmFtZS5hdHRyLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgaWYgKCF0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pKSB7XG4gICAgICBmb3IodmFyIHYgaW4gdmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkodikpIHtcbiAgICAgICAgICBzZXRWYWx1ZSh2LCB2YWx1ZXNbdl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpdGVtU291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBsaXN0IG5lZWQgdG8gaGF2ZSBhdCBsaXN0IG9uZSBpdGVtIG9uIGluaXQgb3RoZXJ3aXNlIHlvdSdsbCBoYXZlIHRvIGFkZCBhIHRlbXBsYXRlLlwiKTtcbiAgICB9XG4gICAgLyogSWYgaXRlbSBzb3VyY2UgZG9lcyBub3QgZXhpc3RzLCB1c2UgdGhlIGZpcnN0IGl0ZW0gaW4gbGlzdCBhc1xuICAgIHNvdXJjZSBmb3IgbmV3IGl0ZW1zICovXG4gICAgdmFyIG5ld0l0ZW0gPSBpdGVtU291cmNlLmNsb25lTm9kZSh0cnVlKTtcbiAgICBuZXdJdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcbiAgICBpdGVtLmVsbSA9IG5ld0l0ZW07XG4gICAgdGVtcGxhdGVyLnNldChpdGVtLCBpdGVtLnZhbHVlcygpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtLnBhcmVudE5vZGUgPT09IGxpc3QubGlzdCkge1xuICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGl0ZW0uZWxtKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pO1xuICAgIGxpc3QubGlzdC5hcHBlbmRDaGlsZChpdGVtLmVsbSk7XG4gIH07XG4gIHRoaXMuaGlkZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0gIT09IHVuZGVmaW5lZCAmJiBpdGVtLmVsbS5wYXJlbnROb2RlID09PSBsaXN0Lmxpc3QpIHtcbiAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChpdGVtLmVsbSk7XG4gICAgfVxuICB9O1xuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgLyogLmlubmVySFRNTCA9ICcnOyBmdWNrcyB1cCBJRSAqL1xuICAgIGlmIChsaXN0Lmxpc3QuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICB3aGlsZSAobGlzdC5saXN0LmNoaWxkTm9kZXMubGVuZ3RoID49IDEpXG4gICAgICB7XG4gICAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChsaXN0Lmxpc3QuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGluaXQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICByZXR1cm4gbmV3IFRlbXBsYXRlcihsaXN0KTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGluZGV4ID0gcmVxdWlyZSgnLi9pbmRleC1vZicpO1xuXG4vKipcbiAqIFdoaXRlc3BhY2UgcmVnZXhwLlxuICovXG5cbnZhciByZSA9IC9cXHMrLztcblxuLyoqXG4gKiB0b1N0cmluZyByZWZlcmVuY2UuXG4gKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBXcmFwIGBlbGAgaW4gYSBgQ2xhc3NMaXN0YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwpe1xuICByZXR1cm4gbmV3IENsYXNzTGlzdChlbCk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgQ2xhc3NMaXN0IGZvciBgZWxgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIENsYXNzTGlzdChlbCkge1xuICBpZiAoIWVsIHx8ICFlbC5ub2RlVHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQSBET00gZWxlbWVudCByZWZlcmVuY2UgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICB0aGlzLmVsID0gZWw7XG4gIHRoaXMubGlzdCA9IGVsLmNsYXNzTGlzdDtcbn1cblxuLyoqXG4gKiBBZGQgY2xhc3MgYG5hbWVgIGlmIG5vdCBhbHJlYWR5IHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihuYW1lKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICB0aGlzLmxpc3QuYWRkKG5hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAoIX5pKSBhcnIucHVzaChuYW1lKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGNsYXNzIGBuYW1lYCB3aGVuIHByZXNlbnQsIG9yXG4gKiBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIHJlbW92ZVxuICogYW55IHdoaWNoIG1hdGNoLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKG5hbWUpe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIHRoaXMubGlzdC5yZW1vdmUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICB2YXIgYXJyID0gdGhpcy5hcnJheSgpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICh+aSkgYXJyLnNwbGljZShpLCAxKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBUb2dnbGUgY2xhc3MgYG5hbWVgLCBjYW4gZm9yY2Ugc3RhdGUgdmlhIGBmb3JjZWAuXG4gKlxuICogRm9yIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBjbGFzc0xpc3QsIGJ1dCBkbyBub3Qgc3VwcG9ydCBgZm9yY2VgIHlldCxcbiAqIHRoZSBtaXN0YWtlIHdpbGwgYmUgZGV0ZWN0ZWQgYW5kIGNvcnJlY3RlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBmb3JjZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKG5hbWUsIGZvcmNlKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGZvcmNlKSB7XG4gICAgICBpZiAoZm9yY2UgIT09IHRoaXMubGlzdC50b2dnbGUobmFtZSwgZm9yY2UpKSB7XG4gICAgICAgIHRoaXMubGlzdC50b2dnbGUobmFtZSk7IC8vIHRvZ2dsZSBhZ2FpbiB0byBjb3JyZWN0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdC50b2dnbGUobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBmb3JjZSkge1xuICAgIGlmICghZm9yY2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuaGFzKG5hbWUpKSB7XG4gICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBvZiBjbGFzc2VzLlxuICpcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmFycmF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICB2YXIgc3RyID0gY2xhc3NOYW1lLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgdmFyIGFyciA9IHN0ci5zcGxpdChyZSk7XG4gIGlmICgnJyA9PT0gYXJyWzBdKSBhcnIuc2hpZnQoKTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgY2xhc3MgYG5hbWVgIGlzIHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5oYXMgPVxuQ2xhc3NMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gdGhpcy5saXN0ID8gdGhpcy5saXN0LmNvbnRhaW5zKG5hbWUpIDogISEgfmluZGV4KHRoaXMuYXJyYXkoKSwgbmFtZSk7XG59O1xuIiwidmFyIGJpbmQgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG4gICAgdW5iaW5kID0gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuICAgIHByZWZpeCA9IGJpbmQgIT09ICdhZGRFdmVudExpc3RlbmVyJyA/ICdvbicgOiAnJyxcbiAgICB0b0FycmF5ID0gcmVxdWlyZSgnLi90by1hcnJheScpO1xuXG4vKipcbiAqIEJpbmQgYGVsYCBldmVudCBgdHlwZWAgdG8gYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsLCBOb2RlTGlzdCwgSFRNTENvbGxlY3Rpb24gb3IgQXJyYXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsID0gdG9BcnJheShlbCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrICkge1xuICAgIGVsW2ldW2JpbmRdKHByZWZpeCArIHR5cGUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBVbmJpbmQgYGVsYCBldmVudCBgdHlwZWAncyBjYWxsYmFjayBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiBvciBBcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy51bmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBlbCA9IHRvQXJyYXkoZWwpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKyApIHtcbiAgICBlbFtpXVt1bmJpbmRdKHByZWZpeCArIHR5cGUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9zZWdtZW50aW8vZXh0ZW5kXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQgKG9iamVjdCkge1xuICAgIC8vIFRha2VzIGFuIHVubGltaXRlZCBudW1iZXIgb2YgZXh0ZW5kZXJzLlxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIC8vIEZvciBlYWNoIGV4dGVuZGVyLCBjb3B5IHRoZWlyIHByb3BlcnRpZXMgb24gb3VyIG9iamVjdC5cbiAgICBmb3IgKHZhciBpID0gMCwgc291cmNlOyBzb3VyY2UgPSBhcmdzW2ldOyBpKyspIHtcbiAgICAgICAgaWYgKCFzb3VyY2UpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIG9iamVjdFtwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRleHQsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgICAvLyBBcHJveGltYXRlbHkgd2hlcmUgaW4gdGhlIHRleHQgaXMgdGhlIHBhdHRlcm4gZXhwZWN0ZWQgdG8gYmUgZm91bmQ/XG4gICAgdmFyIE1hdGNoX0xvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiB8fCAwO1xuXG4gICAgLy9EZXRlcm1pbmVzIGhvdyBjbG9zZSB0aGUgbWF0Y2ggbXVzdCBiZSB0byB0aGUgZnV6enkgbG9jYXRpb24gKHNwZWNpZmllZCBhYm92ZSkuIEFuIGV4YWN0IGxldHRlciBtYXRjaCB3aGljaCBpcyAnZGlzdGFuY2UnIGNoYXJhY3RlcnMgYXdheSBmcm9tIHRoZSBmdXp6eSBsb2NhdGlvbiB3b3VsZCBzY29yZSBhcyBhIGNvbXBsZXRlIG1pc21hdGNoLiBBIGRpc3RhbmNlIG9mICcwJyByZXF1aXJlcyB0aGUgbWF0Y2ggYmUgYXQgdGhlIGV4YWN0IGxvY2F0aW9uIHNwZWNpZmllZCwgYSB0aHJlc2hvbGQgb2YgJzEwMDAnIHdvdWxkIHJlcXVpcmUgYSBwZXJmZWN0IG1hdGNoIHRvIGJlIHdpdGhpbiA4MDAgY2hhcmFjdGVycyBvZiB0aGUgZnV6enkgbG9jYXRpb24gdG8gYmUgZm91bmQgdXNpbmcgYSAwLjggdGhyZXNob2xkLlxuICAgIHZhciBNYXRjaF9EaXN0YW5jZSA9IG9wdGlvbnMuZGlzdGFuY2UgfHwgMTAwO1xuXG4gICAgLy8gQXQgd2hhdCBwb2ludCBkb2VzIHRoZSBtYXRjaCBhbGdvcml0aG0gZ2l2ZSB1cC4gQSB0aHJlc2hvbGQgb2YgJzAuMCcgcmVxdWlyZXMgYSBwZXJmZWN0IG1hdGNoIChvZiBib3RoIGxldHRlcnMgYW5kIGxvY2F0aW9uKSwgYSB0aHJlc2hvbGQgb2YgJzEuMCcgd291bGQgbWF0Y2ggYW55dGhpbmcuXG4gICAgdmFyIE1hdGNoX1RocmVzaG9sZCA9IG9wdGlvbnMudGhyZXNob2xkIHx8IDAuNDtcblxuICAgIGlmIChwYXR0ZXJuID09PSB0ZXh0KSByZXR1cm4gdHJ1ZTsgLy8gRXhhY3QgbWF0Y2hcbiAgICBpZiAocGF0dGVybi5sZW5ndGggPiAzMikgcmV0dXJuIGZhbHNlOyAvLyBUaGlzIGFsZ29yaXRobSBjYW5ub3QgYmUgdXNlZFxuXG4gICAgLy8gU2V0IHN0YXJ0aW5nIGxvY2F0aW9uIGF0IGJlZ2lubmluZyB0ZXh0IGFuZCBpbml0aWFsaXNlIHRoZSBhbHBoYWJldC5cbiAgICB2YXIgbG9jID0gTWF0Y2hfTG9jYXRpb24sXG4gICAgICAgIHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcSA9IHt9LFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcVtwYXR0ZXJuLmNoYXJBdChpKV0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHFbcGF0dGVybi5jaGFyQXQoaSldIHw9IDEgPDwgKHBhdHRlcm4ubGVuZ3RoIC0gaSAtIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcTtcbiAgICAgICAgfSgpKTtcblxuICAgIC8vIENvbXB1dGUgYW5kIHJldHVybiB0aGUgc2NvcmUgZm9yIGEgbWF0Y2ggd2l0aCBlIGVycm9ycyBhbmQgeCBsb2NhdGlvbi5cbiAgICAvLyBBY2Nlc3NlcyBsb2MgYW5kIHBhdHRlcm4gdGhyb3VnaCBiZWluZyBhIGNsb3N1cmUuXG5cbiAgICBmdW5jdGlvbiBtYXRjaF9iaXRhcFNjb3JlXyhlLCB4KSB7XG4gICAgICAgIHZhciBhY2N1cmFjeSA9IGUgLyBwYXR0ZXJuLmxlbmd0aCxcbiAgICAgICAgICAgIHByb3hpbWl0eSA9IE1hdGguYWJzKGxvYyAtIHgpO1xuXG4gICAgICAgIGlmICghTWF0Y2hfRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIC8vIERvZGdlIGRpdmlkZSBieSB6ZXJvIGVycm9yLlxuICAgICAgICAgICAgcmV0dXJuIHByb3hpbWl0eSA/IDEuMCA6IGFjY3VyYWN5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2N1cmFjeSArIChwcm94aW1pdHkgLyBNYXRjaF9EaXN0YW5jZSk7XG4gICAgfVxuXG4gICAgdmFyIHNjb3JlX3RocmVzaG9sZCA9IE1hdGNoX1RocmVzaG9sZCwgLy8gSGlnaGVzdCBzY29yZSBiZXlvbmQgd2hpY2ggd2UgZ2l2ZSB1cC5cbiAgICAgICAgYmVzdF9sb2MgPSB0ZXh0LmluZGV4T2YocGF0dGVybiwgbG9jKTsgLy8gSXMgdGhlcmUgYSBuZWFyYnkgZXhhY3QgbWF0Y2g/IChzcGVlZHVwKVxuXG4gICAgaWYgKGJlc3RfbG9jICE9IC0xKSB7XG4gICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICAgICAgLy8gV2hhdCBhYm91dCBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uPyAoc3BlZWR1cClcbiAgICAgICAgYmVzdF9sb2MgPSB0ZXh0Lmxhc3RJbmRleE9mKHBhdHRlcm4sIGxvYyArIHBhdHRlcm4ubGVuZ3RoKTtcblxuICAgICAgICBpZiAoYmVzdF9sb2MgIT0gLTEpIHtcbiAgICAgICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpc2UgdGhlIGJpdCBhcnJheXMuXG4gICAgdmFyIG1hdGNobWFzayA9IDEgPDwgKHBhdHRlcm4ubGVuZ3RoIC0gMSk7XG4gICAgYmVzdF9sb2MgPSAtMTtcblxuICAgIHZhciBiaW5fbWluLCBiaW5fbWlkO1xuICAgIHZhciBiaW5fbWF4ID0gcGF0dGVybi5sZW5ndGggKyB0ZXh0Lmxlbmd0aDtcbiAgICB2YXIgbGFzdF9yZDtcbiAgICBmb3IgKHZhciBkID0gMDsgZCA8IHBhdHRlcm4ubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgLy8gU2NhbiBmb3IgdGhlIGJlc3QgbWF0Y2g7IGVhY2ggaXRlcmF0aW9uIGFsbG93cyBmb3Igb25lIG1vcmUgZXJyb3IuXG4gICAgICAgIC8vIFJ1biBhIGJpbmFyeSBzZWFyY2ggdG8gZGV0ZXJtaW5lIGhvdyBmYXIgZnJvbSAnbG9jJyB3ZSBjYW4gc3RyYXkgYXQgdGhpc1xuICAgICAgICAvLyBlcnJvciBsZXZlbC5cbiAgICAgICAgYmluX21pbiA9IDA7XG4gICAgICAgIGJpbl9taWQgPSBiaW5fbWF4O1xuICAgICAgICB3aGlsZSAoYmluX21pbiA8IGJpbl9taWQpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaF9iaXRhcFNjb3JlXyhkLCBsb2MgKyBiaW5fbWlkKSA8PSBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICBiaW5fbWluID0gYmluX21pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmluX21heCA9IGJpbl9taWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaW5fbWlkID0gTWF0aC5mbG9vcigoYmluX21heCAtIGJpbl9taW4pIC8gMiArIGJpbl9taW4pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVzZSB0aGUgcmVzdWx0IGZyb20gdGhpcyBpdGVyYXRpb24gYXMgdGhlIG1heGltdW0gZm9yIHRoZSBuZXh0LlxuICAgICAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICAgICAgdmFyIHN0YXJ0ID0gTWF0aC5tYXgoMSwgbG9jIC0gYmluX21pZCArIDEpO1xuICAgICAgICB2YXIgZmluaXNoID0gTWF0aC5taW4obG9jICsgYmluX21pZCwgdGV4dC5sZW5ndGgpICsgcGF0dGVybi5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJkID0gQXJyYXkoZmluaXNoICsgMik7XG4gICAgICAgIHJkW2ZpbmlzaCArIDFdID0gKDEgPDwgZCkgLSAxO1xuICAgICAgICBmb3IgKHZhciBqID0gZmluaXNoOyBqID49IHN0YXJ0OyBqLS0pIHtcbiAgICAgICAgICAgIC8vIFRoZSBhbHBoYWJldCAocykgaXMgYSBzcGFyc2UgaGFzaCwgc28gdGhlIGZvbGxvd2luZyBsaW5lIGdlbmVyYXRlc1xuICAgICAgICAgICAgLy8gd2FybmluZ3MuXG4gICAgICAgICAgICB2YXIgY2hhck1hdGNoID0gc1t0ZXh0LmNoYXJBdChqIC0gMSldO1xuICAgICAgICAgICAgaWYgKGQgPT09IDApIHsgICAgLy8gRmlyc3QgcGFzczogZXhhY3QgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoO1xuICAgICAgICAgICAgfSBlbHNlIHsgICAgLy8gU3Vic2VxdWVudCBwYXNzZXM6IGZ1enp5IG1hdGNoLlxuICAgICAgICAgICAgICAgIHJkW2pdID0gKCgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2gpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgobGFzdF9yZFtqICsgMV0gfCBsYXN0X3JkW2pdKSA8PCAxKSB8IDEpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9yZFtqICsgMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmRbal0gJiBtYXRjaG1hc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSBtYXRjaF9iaXRhcFNjb3JlXyhkLCBqIC0gMSk7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBtYXRjaCB3aWxsIGFsbW9zdCBjZXJ0YWlubHkgYmUgYmV0dGVyIHRoYW4gYW55IGV4aXN0aW5nIG1hdGNoLlxuICAgICAgICAgICAgICAgIC8vIEJ1dCBjaGVjayBhbnl3YXkuXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlIDw9IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUb2xkIHlvdSBzby5cbiAgICAgICAgICAgICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RfbG9jID0gaiAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXN0X2xvYyA+IGxvYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiBwYXNzaW5nIGxvYywgZG9uJ3QgZXhjZWVkIG91ciBjdXJyZW50IGRpc3RhbmNlIGZyb20gbG9jLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgxLCAyICogbG9jIC0gYmVzdF9sb2MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxyZWFkeSBwYXNzZWQgbG9jLCBkb3duaGlsbCBmcm9tIGhlcmUgb24gaW4uXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBObyBob3BlIGZvciBhIChiZXR0ZXIpIG1hdGNoIGF0IGdyZWF0ZXIgZXJyb3IgbGV2ZWxzLlxuICAgICAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCArIDEsIGxvYykgPiBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RfcmQgPSByZDtcbiAgICB9XG5cbiAgICByZXR1cm4gKGJlc3RfbG9jIDwgMCkgPyBmYWxzZSA6IHRydWU7XG59O1xuIiwiLyoqXG4gKiBBIGNyb3NzLWJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgZ2V0QXR0cmlidXRlLlxuICogU291cmNlIGZvdW5kIGhlcmU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM3NTUzNDMvMzYxMzM3IHdyaXR0ZW4gYnkgVml2aW4gUGFsaWF0aFxuICpcbiAqIFJldHVybiB0aGUgdmFsdWUgZm9yIGBhdHRyYCBhdCBgZWxlbWVudGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgYXR0cikge1xuICB2YXIgcmVzdWx0ID0gKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoYXR0cikpIHx8IG51bGw7XG4gIGlmKCAhcmVzdWx0ICkge1xuICAgIHZhciBhdHRycyA9IGVsLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGxlbmd0aCA9IGF0dHJzLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhdHRyW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYoYXR0cltpXS5ub2RlTmFtZSA9PT0gYXR0cikge1xuICAgICAgICAgIHJlc3VsdCA9IGF0dHJbaV0ubm9kZVZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4gKiBBIGNyb3NzLWJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgZ2V0RWxlbWVudHNCeUNsYXNzLlxuICogSGVhdmlseSBiYXNlZCBvbiBEdXN0aW4gRGlheidzIGZ1bmN0aW9uOiBodHRwOi8vZHVzdGluZGlhei5jb20vZ2V0ZWxlbWVudHNieWNsYXNzLlxuICpcbiAqIEZpbmQgYWxsIGVsZW1lbnRzIHdpdGggY2xhc3MgYGNsYXNzTmFtZWAgaW5zaWRlIGBjb250YWluZXJgLlxuICogVXNlIGBzaW5nbGUgPSB0cnVlYCB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZSBpbiBvbGRlciBicm93c2Vyc1xuICogd2hlbiBvbmx5IG9uZSBlbGVtZW50IGlzIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lclxuICogQHBhcmFtIHtCb29sZWFufSBzaW5nbGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxudmFyIGdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIGlmIChzaW5nbGUpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgfVxufTtcblxudmFyIHF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIGNsYXNzTmFtZSA9ICcuJyArIGNsYXNzTmFtZTtcbiAgaWYgKHNpbmdsZSkge1xuICAgIHJldHVybiBjb250YWluZXIucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpO1xuICB9XG59O1xuXG52YXIgcG9seWZpbGwgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIHZhciBjbGFzc0VsZW1lbnRzID0gW10sXG4gICAgdGFnID0gJyonO1xuXG4gIHZhciBlbHMgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcbiAgdmFyIGVsc0xlbiA9IGVscy5sZW5ndGg7XG4gIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK2NsYXNzTmFtZStcIihcXFxcc3wkKVwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgZWxzTGVuOyBpKyspIHtcbiAgICBpZiAoIHBhdHRlcm4udGVzdChlbHNbaV0uY2xhc3NOYW1lKSApIHtcbiAgICAgIGlmIChzaW5nbGUpIHtcbiAgICAgICAgcmV0dXJuIGVsc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzRWxlbWVudHNbal0gPSBlbHNbaV07XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsYXNzRWxlbWVudHM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoKG9wdGlvbnMudGVzdCAmJiBvcHRpb25zLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHx8ICghb3B0aW9ucy50ZXN0ICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9IGVsc2UgaWYgKChvcHRpb25zLnRlc3QgJiYgb3B0aW9ucy5xdWVyeVNlbGVjdG9yKSB8fCAoIW9wdGlvbnMudGVzdCAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbChjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9XG4gIH07XG59KSgpO1xuIiwidmFyIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgb2JqKXtcbiAgaWYgKGluZGV4T2YpIHJldHVybiBhcnIuaW5kZXhPZihvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcbiIsIi8qKlxuICogU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vdGltb3hsZXkvdG8tYXJyYXlcbiAqXG4gKiBDb252ZXJ0IGFuIGFycmF5LWxpa2Ugb2JqZWN0IGludG8gYW4gYEFycmF5YC5cbiAqIElmIGBjb2xsZWN0aW9uYCBpcyBhbHJlYWR5IGFuIGBBcnJheWAsIHRoZW4gd2lsbCByZXR1cm4gYSBjbG9uZSBvZiBgY29sbGVjdGlvbmAuXG4gKlxuICogQHBhcmFtIHtBcnJheSB8IE1peGVkfSBjb2xsZWN0aW9uIEFuIGBBcnJheWAgb3IgYXJyYXktbGlrZSBvYmplY3QgdG8gY29udmVydCBlLmcuIGBhcmd1bWVudHNgIG9yIGBOb2RlTGlzdGBcbiAqIEByZXR1cm4ge0FycmF5fSBOYWl2ZSBjb252ZXJzaW9uIG9mIGBjb2xsZWN0aW9uYCB0byBhIG5ldyBgQXJyYXlgLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRvQXJyYXkoY29sbGVjdGlvbikge1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gW107XG4gIGlmIChjb2xsZWN0aW9uID09PSBudWxsKSByZXR1cm4gW251bGxdO1xuICBpZiAoY29sbGVjdGlvbiA9PT0gd2luZG93KSByZXR1cm4gW3dpbmRvd107XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ3N0cmluZycpIHJldHVybiBbY29sbGVjdGlvbl07XG4gIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSByZXR1cm4gY29sbGVjdGlvbjtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uLmxlbmd0aCAhPSAnbnVtYmVyJykgcmV0dXJuIFtjb2xsZWN0aW9uXTtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnZnVuY3Rpb24nICYmIGNvbGxlY3Rpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikgcmV0dXJuIFtjb2xsZWN0aW9uXTtcblxuICB2YXIgYXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29sbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sbGVjdGlvbiwgaSkgfHwgaSBpbiBjb2xsZWN0aW9uKSB7XG4gICAgICBhcnIucHVzaChjb2xsZWN0aW9uW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFhcnIubGVuZ3RoKSByZXR1cm4gW107XG4gIHJldHVybiBhcnI7XG59O1xuXG5mdW5jdGlvbiBpc0FycmF5KGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocykge1xuICBzID0gKHMgPT09IHVuZGVmaW5lZCkgPyBcIlwiIDogcztcbiAgcyA9IChzID09PSBudWxsKSA/IFwiXCIgOiBzO1xuICBzID0gcy50b1N0cmluZygpO1xuICByZXR1cm4gcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldDtcbnZhciBhbHBoYWJldEluZGV4TWFwO1xudmFyIGFscGhhYmV0SW5kZXhNYXBMZW5ndGggPSAwO1xuXG5mdW5jdGlvbiBpc051bWJlckNvZGUoY29kZSkge1xuICByZXR1cm4gY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3O1xufVxuXG5mdW5jdGlvbiBuYXR1cmFsQ29tcGFyZShhLCBiKSB7XG4gIHZhciBsZW5ndGhBID0gKGEgKz0gJycpLmxlbmd0aDtcbiAgdmFyIGxlbmd0aEIgPSAoYiArPSAnJykubGVuZ3RoO1xuICB2YXIgYUluZGV4ID0gMDtcbiAgdmFyIGJJbmRleCA9IDA7XG5cbiAgd2hpbGUgKGFJbmRleCA8IGxlbmd0aEEgJiYgYkluZGV4IDwgbGVuZ3RoQikge1xuICAgIHZhciBjaGFyQ29kZUEgPSBhLmNoYXJDb2RlQXQoYUluZGV4KTtcbiAgICB2YXIgY2hhckNvZGVCID0gYi5jaGFyQ29kZUF0KGJJbmRleCk7XG5cbiAgICBpZiAoaXNOdW1iZXJDb2RlKGNoYXJDb2RlQSkpIHtcbiAgICAgIGlmICghaXNOdW1iZXJDb2RlKGNoYXJDb2RlQikpIHtcbiAgICAgICAgcmV0dXJuIGNoYXJDb2RlQSAtIGNoYXJDb2RlQjtcbiAgICAgIH1cblxuICAgICAgdmFyIG51bVN0YXJ0QSA9IGFJbmRleDtcbiAgICAgIHZhciBudW1TdGFydEIgPSBiSW5kZXg7XG5cbiAgICAgIHdoaWxlIChjaGFyQ29kZUEgPT09IDQ4ICYmICsrbnVtU3RhcnRBIDwgbGVuZ3RoQSkge1xuICAgICAgICBjaGFyQ29kZUEgPSBhLmNoYXJDb2RlQXQobnVtU3RhcnRBKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChjaGFyQ29kZUIgPT09IDQ4ICYmICsrbnVtU3RhcnRCIDwgbGVuZ3RoQikge1xuICAgICAgICBjaGFyQ29kZUIgPSBiLmNoYXJDb2RlQXQobnVtU3RhcnRCKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG51bUVuZEEgPSBudW1TdGFydEE7XG4gICAgICB2YXIgbnVtRW5kQiA9IG51bVN0YXJ0QjtcblxuICAgICAgd2hpbGUgKG51bUVuZEEgPCBsZW5ndGhBICYmIGlzTnVtYmVyQ29kZShhLmNoYXJDb2RlQXQobnVtRW5kQSkpKSB7XG4gICAgICAgICsrbnVtRW5kQTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChudW1FbmRCIDwgbGVuZ3RoQiAmJiBpc051bWJlckNvZGUoYi5jaGFyQ29kZUF0KG51bUVuZEIpKSkge1xuICAgICAgICArK251bUVuZEI7XG4gICAgICB9XG5cbiAgICAgIHZhciBkaWZmZXJlbmNlID0gbnVtRW5kQSAtIG51bVN0YXJ0QSAtIG51bUVuZEIgKyBudW1TdGFydEI7IC8vIG51bUEgbGVuZ3RoIC0gbnVtQiBsZW5ndGhcbiAgICAgIGlmIChkaWZmZXJlbmNlKSB7XG4gICAgICAgIHJldHVybiBkaWZmZXJlbmNlO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAobnVtU3RhcnRBIDwgbnVtRW5kQSkge1xuICAgICAgICBkaWZmZXJlbmNlID0gYS5jaGFyQ29kZUF0KG51bVN0YXJ0QSsrKSAtIGIuY2hhckNvZGVBdChudW1TdGFydEIrKyk7XG4gICAgICAgIGlmIChkaWZmZXJlbmNlKSB7XG4gICAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYUluZGV4ID0gbnVtRW5kQTtcbiAgICAgIGJJbmRleCA9IG51bUVuZEI7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhckNvZGVBICE9PSBjaGFyQ29kZUIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhckNvZGVBIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aCAmJlxuICAgICAgICBjaGFyQ29kZUIgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoICYmXG4gICAgICAgIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVBXSAhPT0gLTEgJiZcbiAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUJdICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQV0gLSBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGFyQ29kZUEgLSBjaGFyQ29kZUI7XG4gICAgfVxuXG4gICAgKythSW5kZXg7XG4gICAgKytiSW5kZXg7XG4gIH1cblxuICByZXR1cm4gbGVuZ3RoQSAtIGxlbmd0aEI7XG59XG5cbm5hdHVyYWxDb21wYXJlLmNhc2VJbnNlbnNpdGl2ZSA9IG5hdHVyYWxDb21wYXJlLmkgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBuYXR1cmFsQ29tcGFyZSgoJycgKyBhKS50b0xvd2VyQ2FzZSgpLCAoJycgKyBiKS50b0xvd2VyQ2FzZSgpKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG5hdHVyYWxDb21wYXJlLCB7XG4gIGFscGhhYmV0OiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBhbHBoYWJldDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGFscGhhYmV0ID0gdmFsdWU7XG4gICAgICBhbHBoYWJldEluZGV4TWFwID0gW107XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICBpZiAoYWxwaGFiZXQpIHtcbiAgICAgICAgZm9yICg7IGkgPCBhbHBoYWJldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFscGhhYmV0SW5kZXhNYXBbYWxwaGFiZXQuY2hhckNvZGVBdChpKV0gPSBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhbHBoYWJldEluZGV4TWFwTGVuZ3RoID0gYWxwaGFiZXRJbmRleE1hcC5sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbHBoYWJldEluZGV4TWFwW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhbHBoYWJldEluZGV4TWFwW2ldID0gLTE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0dXJhbENvbXBhcmU7XG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiYnJlYWtwb2ludHNcIiA6IHtcbiAgICBcInhzXCI6IFwiNDgwcHhcIixcbiAgICBcInNtXCI6IFwiNjIwcHhcIixcbiAgICBcIm1kXCI6IFwiNzYwcHhcIixcbiAgICBcImxnXCI6IFwiOTkwcHhcIixcbiAgICBcInhsXCI6IFwiMTM4MHB4XCJcbiAgfVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtZGlzbWlzc10nLFxuICAgIHRhcmdldDogJ1tkYXRhLWRpc21pc3NpYmxlXScsXG4gICAgY2xhc3NUb2dnbGU6ICdkaXNtaXNzJ1xuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBjb25zdCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBsZXQgdGFyZ2V0ID0gdHJpZ2dlci5jbG9zZXN0KHNldHRpbmdzLnRhcmdldClcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgdS50b2dnbGVDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzVG9nZ2xlKVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuLyoqXG4gKiBEcmF3ZXIgcGx1Z2luXG4gKiAtLS1cbiAqIEEgY29udGFpbmVyIGNvbXBvbmVudCB0aGF0IHNsaWRlcyBpbiBmcm9tIHRoZSBsZWZ0IG9yIHJpZ2h0LiBJdCB0eXBpY2FsbHlcbiAqIGNvbnRhaW5zIG1lbnVzLCBzZWFyY2ggb3Igb3RoZXIgY29udGVudCBmb3IgeW91ciBhcHAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG5cbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgLy8gRWxlbWVudCBjbGFzc2VzXG4gICAgY2xhc3NUYXJnZXQ6ICdkcmF3ZXJfX2l0ZW0nLFxuICAgIGNsYXNzVHJpZ2dlcjogJ2RyYXdlcl9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lcjogJ2RyYXdlcl9fZGlhbG9nJyxcblxuICAgIC8vIFVzZWQgd2l0aCBSZWdFeHAgdG8gc2VhcmNoIGFuZCByZXBsYWNlIGVsZW1lbnQgY2xhc3Nlc1xuICAgIGNsYXNzVGFyZ2V0U3dpdGNoOiAnbW9kYWwnLFxuICAgIGNsYXNzVHJpZ2dlclN3aXRjaDogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc0lubmVyU3dpdGNoOiAnbW9kYWxfX2RpYWxvZycsXG5cbiAgICAvLyBUaGUgY2xhc3MgdGhhdCBpcyB1c2VkIHRvIG1ha2UgYW4gaXRlbSBhY3RpdmVcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgY2xhc3NUcmFuc2l0aW9uTm9uZTogJ3RyYW5zaXRpb25fbm9uZScsXG5cbiAgICAvLyBXaGV0aGVyIG9yIG5vdCB0byBzdG9yZSB0aGUgc2F2ZSBzdGF0ZSBpbiBsb2NhbCBzdG9yYWdlXG4gICAgLy8ge2Jvb2xlYW59IFRoZSBzdHJpbmcgdG8gc2F2ZSBvdXIgc3RhdGUgb2JqZWN0IGFzXG4gICAgc2F2ZVN0YXRlOiB0cnVlLFxuXG4gICAgLy8gV2hldGhlciBvciBub3QgdG8gZW5hYmxlIHRoZSBzd2l0Y2ggZnVuY3Rpb25hbGl0eVxuICAgIC8vIElmIGVuYWJsZWQsIGEgc3RyaW5nIHNlbGVjdG9yIHRvIGNoZWNrIGZvciBzaG91bGQgYmUgcGFzc2VkLlxuICAgIC8vIHtmYWxzZX0gfHwge3N0cmluZ30gZS5nLiAnW2RhdGEtZHJhd2VyLXN3aXRjaF0nXG4gICAgc3dpdGNoOiAnW2RhdGEtZHJhd2VyLXN3aXRjaF0nLFxuXG4gICAgLy8gVGhlIGRlZmF1bHQgYnJlYWsgcG9pbnQgZm9yIHdoZW4gdG8gc3dpdGNoIHRvIGRyYXdlciBvciBtb2RhbCBjbGFzc2VzXG4gICAgLy8ge3N0cmluZ30gRWl0aGVyIGEgYnJlYWtwb2ludCBrZXkgb3IgcGl4ZWwgdmFsdWVcbiAgICBzd2l0Y2hCcmVha3BvaW50OiAnbGcnLFxuXG4gICAgLy8gRHVyYXRpb24gYmVmb3JlIHJlbW92aW5nIHRoZSB0cmFuc2l0aW9uX25vbmUgY2xhc3Mgb24gaW5pdGlhbCBsb2FkXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiA1MDBcbiAgfVxuXG4gIC8vIERyYXdlciBzcGVjaWZpYyB2YXJpYWJsZXNcbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBkcmF3ZXJzIGF2YWlsYWJsZSBpbiB0aGUgRE9NXG4gIGxldCBkcmF3ZXJzXG5cbiAgLy8gV2hlcmUgd2UgYnVpbGQgdGhlIHNhdmUgc3RhdGUgb2JqZWN0IGJlZm9yZSB3ZSBwYXNzIGl0IHRvIGxvY2FsIHN0b3JhZ2VcbiAgbGV0IGRyYXdlclN0YXRlID0ge31cblxuICAvLyBXaGVyZSB3ZSBzdG9yZSBhbGwgb3VyIHN3aXRjaCBkcmF3ZXJzIGF2YWlsYWJsZSBpbiB0aGUgRE9NXG4gIGxldCBzd2l0Y2hEcmF3ZXJzXG5cbiAgLy8gV2hlcmUgd2Ugc3RvcmUgYWxsIG91ciBtZWRpYSBxdWVyeSBsaXN0cyBhbG9uZyB3aXRoIHRoZWlyIGRyYXdlcnNcbiAgbGV0IG1xbEFycmF5ID0gW11cblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIG1ldGhvZCwgcnVuIGFzIHNvb24gYXMgYW4gaW5zdGFuY2UgaXMgY3JlYXRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBBIGpzb24gb2JqZWN0IHdpdGggeW91ciBjdXN0b20gc2V0dGluZ3NcbiAgICovXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcblxuICAgIC8vIE1lcmdlIHRoZSBkZWZhdWx0cyBhbmQgcGFzc2VkIG9wdGlvbnMgaW50byBvdXIgc2V0dGluZ3Mgb2JqXG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuXG4gICAgLy8gR2V0IGFsbCB0aGUgZHJhd2VycyBvbiB0aGUgcGFnZVxuICAgIGRyYXdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBhIHByb21pc2UgYW5kIGluaXQgc2F2ZSBzdGF0ZSBpZiBpdCdzIGVuYWJsZWRcbiAgICBsZXQgcHJvbWlzZVNhdmVTdGF0ZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIGlmIChzZXR0aW5ncy5zYXZlU3RhdGUpIHtcbiAgICAgICAgaW5pdFNhdmVTdGF0ZShyZXNvbHZlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFmdGVyIHByb21pc2UgaXMgcmVzb2x2ZWQgYW5kIHN3aXRjaCBpcyBlbmFibGVkLCBpbml0aWFsaXplIHN3aXRjaFxuICAgIHByb21pc2VTYXZlU3RhdGUudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZXR0aW5ncy5zd2l0Y2gpIHtcbiAgICAgICAgaW5pdFN3aXRjaCgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEFkZCBvdXIgZHJhd2VyIHRyaWdnZXIgZXZlbnQgbGlzdGVuZXJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRyaWdnZXIsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBkZWNvbnN0cnVjdG9yIG1ldGhvZCwgdXNlZCB0byByZXNldCBhbmQgZGVzdHJveSB0aGUgZHJhd2VyIGluc3RhbmNlXG4gICAqL1xuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcblxuICAgIC8vIERlc3Ryb3kgb3VyIHN3aXRjaFxuICAgIGRlc3Ryb3lTd2l0Y2goKVxuXG4gICAgLy8gRGVzdHJveSBvdXIgc3RhdGVcbiAgICBzdGF0ZUNsZWFyKClcblxuICAgIC8vIENsZWFyIG91ciB2YXJpYWJsZXNcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkcmF3ZXJzID0gbnVsbFxuXG4gICAgLy8gUmVtb3ZlIHRoZSBkcmF3ZXIgdHJpZ2dlciBldmVudCBsaXN0ZW5lclxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdHJpZ2dlciwgZmFsc2UpXG4gIH1cblxuICAvKipcbiAgICogUHVibGljIG1ldGhvZCB0byBvcGVuIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogJy4nICsgc2V0dGluZ3MuY2xhc3NUYXJnZXRcbiAgICB0b2dnbGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvciksICdvcGVuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIGNsb3NlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkuY2xvc2UgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6ICcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgdG9nZ2xlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLCAnY2xvc2UnKVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gdG9nZ2xlIGEgZHJhd2VyIG9yIGdyb3VwIG9mIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkudG9nZ2xlID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgc2VsZWN0b3IgPSAoc2VsZWN0b3IpID8gc2VsZWN0b3IgOiAnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldFxuICAgIHRvZ2dsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgbWV0aG9kIHRvIHN3aXRjaCBhIGRyYXdlciBpbnRvIG1vZGFsXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgLSBBIHZhbGlkIENTUyBzZWxlY3RvclxuICAgKi9cbiAgYXBpLnN3aXRjaERyYXdlciA9IChzZWxlY3RvcikgPT4ge1xuXG4gICAgLy8gVXNlIGRlZmF1bHQgc2VsZWN0b3IgaWYgb25lIGlzbid0IHBhc3NlZFxuICAgIHNlbGVjdG9yID0gKHNlbGVjdG9yKSA/IHNlbGVjdG9yIDogc2V0dGluZ3Muc3dpdGNoXG5cbiAgICAvLyBRdWVyeSBvdXIgZWxlbWVudHMgdXNpbmcgdGhlIHByb3ZpZGVkIHNlbGVjdG9yXG4gICAgbGV0IGl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcblxuICAgIC8vIENvbnZlcnQgdG8gYXJyYXkgaWYgb25seSBvbmUgZHJhd2VyIGlzIHBhc3NlZFxuICAgIGl0ZW1zID0gKGl0ZW1zLmZvckVhY2gpID8gaXRlbXMgOiB1LnRvQXJyYXkoaXRlbXMpXG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBzd2l0Y2hEcmF3ZXIoaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBtZXRob2QgdG8gc3dpdGNoIGEgZHJhd2VyIGludG8gbW9kYWxcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciAtIEEgdmFsaWQgQ1NTIHNlbGVjdG9yXG4gICAqL1xuICBhcGkuc3dpdGNoTW9kYWwgPSAoc2VsZWN0b3IpID0+IHtcblxuICAgIC8vIFVzZSBkZWZhdWx0IHNlbGVjdG9yIGlmIG9uZSBpc24ndCBwYXNzZWRcbiAgICBzZWxlY3RvciA9IChzZWxlY3RvcikgPyBzZWxlY3RvciA6IHNldHRpbmdzLnN3aXRjaFxuXG4gICAgLy8gUXVlcnkgb3VyIGVsZW1lbnRzIHVzaW5nIHRoZSBwcm92aWRlZCBzZWxlY3RvclxuICAgIGxldCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgc3dpdGNoTW9kYWwoaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFNhdmUgdGhlIGRyYXdlciBjdXJyZW50IGRyYXdlciBzdGF0ZVxuICAgKi9cbiAgYXBpLnN0YXRlU2F2ZSA9ICgpID0+IHtcbiAgICBzdGF0ZVNhdmUoKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0byBkcmF3ZXIgZGVmYXVsdCBzdGF0ZVxuICAgKi9cbiAgYXBpLnN0YXRlQ2xlYXIgPSAoKSA9PiB7XG4gICAgc3RhdGVDbGVhcigpXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0byBjbG9zZSBhIGRyYXdlciBvciBncm91cCBvZiBkcmF3ZXJzXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGRyYXdlciAtIFRoZSBkcmF3ZXIgZWxlbWVudChzKSB0byBjbG9zZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RhdGUgLSBXaGV0aGVyIHRvIG9wZW4sIGNsb3NlIG9yIHRvZ2dsZSB0aGUgZHJhd2VyKHMpXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBjb25zdCB0b2dnbGUgPSAoZHJhd2VyLCBzdGF0ZSwgY2FsbGJhY2spID0+IHtcblxuICAgIC8vIENoZWNrIGlmIGRyYXdlcihzKSBzaG91bGQgYmUgb3BlbmVkLCBjbG9zZWQgb3IgdG9nZ2xlZCBhbmQgZWl0aGVyIGFkZCBvclxuICAgIC8vIHJlbW92ZSB0aGUgYWN0aXZlIGNsYXNzIHRvIHRoZSBwYXNzZWQgZHJhd2VyKHMpXG4gICAgaWYgKHN0YXRlID09PSAnb3BlbicpIHtcbiAgICAgIHUuYWRkQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnY2xvc2UnKSB7XG4gICAgICB1LnJlbW92ZUNsYXNzKGRyYXdlciwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHUudG9nZ2xlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBzYXZlIHN0YXRlIGlzIGVuYWJsZWRcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBzdGF0ZVNhdmUoZHJhd2VyKVxuICAgIH1cblxuICAgIC8vIEZpcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIG9uZSB3YXMgcGFzc2VkXG4gICAgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nICYmIGNhbGxiYWNrKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRvIHRvZ2dsZSBkcmF3ZXIgdmlhIGEgdHJpZ2dlclxuICAgKi9cbiAgY29uc3QgdHJpZ2dlciA9ICgpID0+IHtcblxuICAgIC8vIEdldCB0aGUgY2xvc2VzdCB0cmlnZ2VyIGVsZW1lbnQgZnJvbSB0aGUgY2xpY2sgZXZlbnRcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcblxuICAgIC8vIENoZWNrIHRoYXQgdGhlIGNsYXNzIHRyaWdnZXIgd2FzIGNsaWNrZWRcbiAgICBpZiAodHJpZ2dlcikge1xuXG4gICAgICAvLyBHZXQgdGhlIGRyYXdlciBzZWxlY3RvciBmcm9tIHRoZSB0cmlnZ2VyIHZpYSBbZGF0YS10YXJnZXRdXG4gICAgICBsZXQgZGF0YURyYXdlciA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcblxuICAgICAgLy8gQ2hlY2sgdGhhdCBhIGRyYXdlciB0YXJnZXQgd2FzIGdpdmVuXG4gICAgICBpZiAoZGF0YURyYXdlcikge1xuXG4gICAgICAgIC8vIFF1ZXJ5IHRoZSBkcmF3ZXIgZWxlbWVudCBhbmQgdG9nZ2xlIGl0IGlmIGl0IGV4aXN0c1xuICAgICAgICBsZXQgZHJhd2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChkYXRhRHJhd2VyKVxuICAgICAgICBpZiAoZHJhd2VyLmxlbmd0aCkge1xuICAgICAgICAgIHRvZ2dsZShkcmF3ZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGluaXRpYWxpemVzIHRoZSBzYXZlIHN0YXRlIGZ1bmN0aW9uYWxpdHlcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBjb25zdCBpbml0U2F2ZVN0YXRlID0gKGNhbGxiYWNrKSA9PiB7XG5cbiAgICAvLyBDaGVjayBpZiBhIGRyYXdlciBzdGF0ZSBpcyBhbHJlYWR5IHNhdmVkIGluIGxvY2FsIHN0b3JhZ2UgYW5kIHNhdmUgdGhlXG4gICAgLy8ganNvbiBwYXJzZWQgZGF0YSB0byBvdXIgbG9jYWwgdmFyaWFibGUgaWYgaXQgZG9lc1xuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZHJhd2VyU3RhdGUnKSkge1xuICAgICAgZHJhd2VyU3RhdGUgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkcmF3ZXJTdGF0ZScpKVxuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBhbGwgZHJhd2Vyc1xuICAgIGRyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG5cbiAgICAgIC8vIFNldCB0aGUgZGVmYXVsdCBzdGF0ZSBpZiBvbmUgaXMgbm90IHNldFxuICAgICAgaWYgKGRyYXdlci5pZCBpbiBkcmF3ZXJTdGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgc3RhdGVTYXZlKGRyYXdlcilcbiAgICAgIH1cblxuICAgICAgLy8gR2V0IG91ciBkcmF3ZXIgZGlhbG9nIGVsZW1lbnRcbiAgICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLicgKyBzZXR0aW5ncy5jbGFzc0lubmVyKVxuXG4gICAgICAvLyBEaXNhYmxlcyB0cmFuc2l0aW9ucyBhcyBkZWZhdWx0IHN0YXRlcyBhcmUgYmVpbmcgc2V0XG4gICAgICBsZXQgdHJhbnNpdGlvbkRlbGF5ID0gKCkgPT4ge1xuICAgICAgICBpZiAoZGlhbG9nKSB7XG4gICAgICAgICAgdS5hZGRDbGFzcyhkaWFsb2csIHNldHRpbmdzLmNsYXNzVHJhbnNpdGlvbk5vbmUpXG4gICAgICAgICAgc2V0VGltZW91dChcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB1LnJlbW92ZUNsYXNzKGRpYWxvZywgc2V0dGluZ3MuY2xhc3NUcmFuc2l0aW9uTm9uZSlcbiAgICAgICAgICAgIH0sIHNldHRpbmdzLnRyYW5zaXRpb25EdXJhdGlvblxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUb2dnbGUgb3VyIGRyYXdlciBzdGF0ZSBiYXNlZCBvbiB0aGUgc2F2ZWQgc3RhdGVcbiAgICAgIGlmIChkcmF3ZXJTdGF0ZVtkcmF3ZXIuaWRdID09PSBmYWxzZSkge1xuICAgICAgICB0b2dnbGUoZHJhd2VyLCAnY2xvc2UnLCB0cmFuc2l0aW9uRGVsYXkpXG4gICAgICB9IGVsc2UgaWYgKGRyYXdlclN0YXRlW2RyYXdlci5pZF0pIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ29wZW4nLCB0cmFuc2l0aW9uRGVsYXkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIEZpcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIGlmIG9uZSB3YXMgcGFzc2VkIGFuZCByZXR1cm4gb3VyIHN0YXRlIG9iamVjdFxuICAgIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBjYWxsYmFjayhkcmF3ZXJTdGF0ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uIHRoYXQgc2F2ZXMgdGhlIHN0YXRlIG9mIGEgc3BlY2lmaWMgb3IgYWxsIGRyYXdlcnNcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gaXRlbXMgLSBUaGUgZHJhd2VyIGVsZW1lbnQocykgdG8gc2F2ZSBzdGF0ZVxuICAgKi9cbiAgY29uc3Qgc3RhdGVTYXZlID0gKGl0ZW1zKSA9PiB7XG5cbiAgICAvLyBTYXZlIGFsbCBkcmF3ZXJzIGlmIGFuIGl0ZW1zIGFyZyB3YXNuJ3QgcGFzc2VkXG4gICAgaXRlbXMgPSAoaXRlbXMpID8gaXRlbXMgOiBkcmF3ZXJzXG5cbiAgICAvLyBDb252ZXJ0IHRvIGFycmF5IGlmIG9ubHkgb25lIGRyYXdlciBpcyBwYXNzZWRcbiAgICBpdGVtcyA9IChpdGVtcy5mb3JFYWNoKSA/IGl0ZW1zIDogdS50b0FycmF5KGl0ZW1zKVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIG91ciBkcmF3ZXJzIGFuZCBzYXZlIHRoZWlyIG5ldyBzdGF0ZSB0byBsb2NhbCBzdG9yYWdlXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgLy8gT25seSBzYXZlIGRyYXdlciBzdGF0ZSBpZiBhbiBpZCBleGlzdHNcbiAgICAgIGlmIChpdGVtLmlkKSB7XG4gICAgICAgIGRyYXdlclN0YXRlW2l0ZW0uaWRdID0gdS5oYXNDbGFzcyhpdGVtLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RyYXdlclN0YXRlJywgSlNPTi5zdHJpbmdpZnkoZHJhd2VyU3RhdGUpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGNsZWFycyB0aGUgZHJhd2VyIHN0YXRlXG4gICAqL1xuICBjb25zdCBzdGF0ZUNsZWFyID0gKCkgPT4ge1xuICAgIGRyYXdlclN0YXRlID0ge31cbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZHJhd2VyU3RhdGUnKVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBpbml0aWFsaXplcyB0aGUgc3dpdGNoIGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIGNvbnN0IGluaXRTd2l0Y2ggPSAoKSA9PiB7XG5cbiAgICAvLyBRdWVyeSBhbGwgdGhlIGRyYXdlcnMgd2l0aCB0aGUgc3dpdGNoIGZlYXR1cmUgZW5hYmxlZFxuICAgIHN3aXRjaERyYXdlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnN3aXRjaClcblxuICAgIC8vIExvb3AgdGhyb3VnaCB0aGUgc3dpdGNoIGRyYXdlcnNcbiAgICBzd2l0Y2hEcmF3ZXJzLmZvckVhY2goKGRyYXdlcikgPT4ge1xuXG4gICAgICAvLyBHZXQgdGhlIGxvY2FsIGJyZWFrcG9pbnQgaWYgb25lIGlzIHNldFxuICAgICAgLy8gUmVtb3ZlIGJyYWNrZXRzIGFuZCB0aGUgaW50aWFsIGRhdGEgZmxhZ1xuICAgICAgbGV0IGNsZWFuU2VsZWN0b3IgPSBzZXR0aW5ncy5zd2l0Y2hcbiAgICAgICAgLnJlcGxhY2UoJ1snLCAnJylcbiAgICAgICAgLnJlcGxhY2UoJ10nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoJ2RhdGEtJywgJycpXG5cbiAgICAgIC8vIENvbnZlcnQgc3JpbmcgdG8gY2FtZWxDYXNlXG4gICAgICBjbGVhblNlbGVjdG9yID0gY2xlYW5TZWxlY3Rvci5yZXBsYWNlKC8tKFthLXpdKS9nLCBmdW5jdGlvbiAoZykge1xuICAgICAgICByZXR1cm4gZ1sxXS50b1VwcGVyQ2FzZSgpXG4gICAgICB9KVxuXG4gICAgICAvLyBDaGVjayB3aGljaCBicmVha3BvaW50IHRvIHVzZTpcbiAgICAgIC8vIGEpIFRoZSBsb2NhbCBicCBzZXQgb24gdGhlIGRyYXdlclxuICAgICAgLy8gYikgVGhlIGJwIGF2YWlsYWJsZSBpbiBjb25maWcgdXNpbmcgYSBrZXlcbiAgICAgIC8vIGMpIFRoZSByYXcgcGl4ZWwgdmFsdWUgcHJvdmlkZWQgaW4gc2V0dGluZ3NcbiAgICAgIGxldCBicCA9IGRyYXdlci5kYXRhc2V0W2NsZWFuU2VsZWN0b3JdXG4gICAgICBpZiAoYnApIHtcbiAgICAgICAgYnAgPSB1LmdldEJyZWFrcG9pbnQoYnApXG4gICAgICAgIGlmICghYnApIHtcbiAgICAgICAgICBicCA9IGRyYXdlci5kYXRhc2V0W2NsZWFuU2VsZWN0b3JdXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJwID0gdS5nZXRCcmVha3BvaW50KHNldHRpbmdzLnN3aXRjaEJyZWFrcG9pbnQpXG4gICAgICAgIGlmICghYnApIHtcbiAgICAgICAgICBicCA9IHNldHRpbmdzLnN3aXRjaEJyZWFrcG9pbnRcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNZWRpYSBxdWVyeSBsaXN0ZW5lclxuICAgICAgbGV0IG1xbCA9IHdpbmRvdy5tYXRjaE1lZGlhKCBcIihtaW4td2lkdGg6XCIgKyBicCArIFwiKVwiIClcblxuICAgICAgLy8gU3dpdGNoIHRvIG1vZGFsIGlmIG1lZGlhIGRvZXNuJ3QgbWF0Y2ggKDwgYnApXG4gICAgICBpZiAoIW1xbC5tYXRjaGVzKSB7XG4gICAgICAgIHN3aXRjaE1vZGFsKGRyYXdlcilcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIG91ciBtZWRpYSBxdWVyeSBsaXN0ZW5lclxuICAgICAgbXFsLmFkZExpc3RlbmVyKHN3aXRjaENoZWNrKVxuXG4gICAgICAvLyBQdXNoIHRoZSBtcWwgdG8gb3VyIGFycmF5IGFsb25nIHdpdGggaXQncyBkcmF3ZXJcbiAgICAgIG1xbEFycmF5LnB1c2goe1xuICAgICAgICAnZHJhd2VyJyA6IGRyYXdlcixcbiAgICAgICAgJ21xbCc6IG1xbFxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBkZXN0cm95cyB0aGUgc3dpdGNoIGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIGNvbnN0IGRlc3Ryb3lTd2l0Y2ggPSAoKSA9PiB7XG5cbiAgICAvLyBTd2l0Y2ggYWxsIG1vZGFscyBiYWNrIHRvIHRoZWlyIG9yaWdpbmFsIGRyYXdlciBzdGF0ZVxuICAgIHN3aXRjaERyYXdlcnMuZm9yRWFjaCgoZHJhd2VyKSA9PiB7XG4gICAgICBzd2l0Y2hEcmF3ZXIoZHJhd2VyKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgdGhlIG1lZGlhIHF1ZXJ5IGxpc3RlbmVyc1xuICAgIG1xbEFycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaXRlbS5tcWwucmVtb3ZlTGlzdGVuZXIoc3dpdGNoQ2hlY2spXG4gICAgfSlcblxuICAgIC8vIFJldHVybiBzd2l0Y2ggdmFyaWFibGVzIHRvIHRoZWlyIG9yaWdpbmFsIHN0YXRlXG4gICAgc3dpdGNoRHJhd2VycyA9IG51bGxcbiAgICBtcWxBcnJheSA9IFtdXG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyB3aGVuIGEgbWVkaWEgcXVlcnkgaGl0cyBhIG1hdGNoIGFuZCBzd2l0Y2hlc1xuICAgKiB0aGUgY29tcG9uZW50IGZyb20gZHJhd2VyIHRvIG1vZGFsIGFzIG5lZWRlZFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtNZWRpYVF1ZXJ5TGlzdH0gbXFsIC0gVGhlIE1lZGlhUXVlcnlMaXN0IG9iamVjdCBmb3IgdGhlIG1lZGlhIHF1ZXJ5XG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGRyYXdlciBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoQ2hlY2sgPSAoKSA9PiB7XG4gICAgbXFsQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5tcWwubWF0Y2hlcykge1xuICAgICAgICBzd2l0Y2hEcmF3ZXIoaXRlbS5kcmF3ZXIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2hNb2RhbChpdGVtLmRyYXdlcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgZnVuY3Rpb24gdGhhdCBzd2l0Y2hlcyBhIG1vZGFsIGludG8gYSBkcmF3ZXIgY29tcG9uZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGRyYXdlciAtIFRoZSBlbGVtZW50IHRvIHN3aXRjaFxuICAgKi9cbiAgY29uc3Qgc3dpdGNoRHJhd2VyID0gKGRyYXdlcikgPT4ge1xuXG4gICAgLy8gR2V0IHRoZSBkaWFsb2cgYW5kIHRyaWdnZXIgZWxlbWVudHMgcmVsYXRlZCB0byB0aGlzIGNvbXBvbmVudFxuICAgIGxldCBkaWFsb2cgPSBkcmF3ZXIucXVlcnlTZWxlY3RvcignLmRpYWxvZycpXG4gICAgbGV0IHRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFyZ2V0PVwiIycgKyBkcmF3ZXIuaWQgKyAnXCJdJylcblxuICAgIC8vIFN3aXRjaCB0aGUgbW9kYWwgY29tcG9uZW50IHRvIGRyYXdlclxuICAgIGRyYXdlci5jbGFzc05hbWUgPSBkcmF3ZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVGFyZ2V0U3dpdGNoLCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzVGFyZ2V0XG4gICAgKVxuICAgIGRpYWxvZy5jbGFzc05hbWUgPSBkaWFsb2cuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzSW5uZXJTd2l0Y2gsICdnaScpLFxuICAgICAgc2V0dGluZ3MuY2xhc3NJbm5lclxuICAgIClcbiAgICB0cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICB0cmlnZ2VyLmNsYXNzTmFtZSA9IHRyaWdnZXIuY2xhc3NOYW1lLnJlcGxhY2UoXG4gICAgICAgIG5ldyBSZWdFeHAoc2V0dGluZ3MuY2xhc3NUcmlnZ2VyU3dpdGNoLCAnZ2knKSxcbiAgICAgICAgc2V0dGluZ3MuY2xhc3NUcmlnZ2VyXG4gICAgICApXG4gICAgfSlcblxuICAgIC8vIE9wZW4gb3IgY2xvc2UgZHJhd2VyIGJhc2VkIG9uIHNhdmUgc3RhdGVcbiAgICBpZiAoc2V0dGluZ3Muc2F2ZVN0YXRlKSB7XG4gICAgICBpZiAoZHJhd2VyU3RhdGVbZHJhd2VyLmlkXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdG9nZ2xlKGRyYXdlciwgJ2Nsb3NlJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvZ2dsZShkcmF3ZXIsICdvcGVuJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUHJpdmF0ZSBmdW5jdGlvbiB0aGF0IHN3aXRjaGVzIGEgZHJhd2VyIGludG8gYSBtb2RhbCBjb21wb25lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZHJhd2VyIC0gVGhlIGVsZW1lbnQgdG8gc3dpdGNoXG4gICAqL1xuICBjb25zdCBzd2l0Y2hNb2RhbCA9IChkcmF3ZXIpID0+IHtcblxuICAgIC8vIEdldCB0aGUgZGlhbG9nIGFuZCB0cmlnZ2VyIGVsZW1lbnRzIHJlbGF0ZWQgdG8gdGhpcyBjb21wb25lbnRcbiAgICBsZXQgZGlhbG9nID0gZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2cnKVxuICAgIGxldCB0cmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhcmdldD1cIiMnICsgZHJhd2VyLmlkICsgJ1wiXScpXG5cbiAgICAvLyBTd2l0Y2ggdGhlIGRyYXdlciBjb21wb25lbnQgdG8gbW9kYWxcbiAgICBkcmF3ZXIuY2xhc3NOYW1lID0gZHJhd2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc1RhcmdldCwgJ2dpJyksXG4gICAgICBzZXR0aW5ncy5jbGFzc1RhcmdldFN3aXRjaFxuICAgIClcbiAgICBkaWFsb2cuY2xhc3NOYW1lID0gZGlhbG9nLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgbmV3IFJlZ0V4cChzZXR0aW5ncy5jbGFzc0lubmVyLCAnZ2knKSxcbiAgICAgIHNldHRpbmdzLmNsYXNzSW5uZXJTd2l0Y2hcbiAgICApXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5jbGFzc05hbWUgPSB0cmlnZ2VyLmNsYXNzTmFtZS5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKHNldHRpbmdzLmNsYXNzVHJpZ2dlciwgJ2dpJyksXG4gICAgICAgIHNldHRpbmdzLmNsYXNzVHJpZ2dlclN3aXRjaFxuICAgICAgKVxuICAgIH0pXG5cbiAgICAvLyBSZW1vdmUgYWN0aXZlIGNsYXNzIGZvciBtb2RhbCBzdHlsZXMgYnkgZGVmYXVsdFxuICAgIHUucmVtb3ZlQ2xhc3MoZHJhd2VyLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIG91ciBjb21wb25lbnQgYW5kIHJldHVybiB0aGUgYXBpXG4gICAqL1xuICBhcGkuaW5pdChvcHRpb25zKVxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbi8qKlxuICogTW9kYWwgcGx1Z2luXG4gKiAtLS1cbiAqIEEgY29tcG9uZW50IGZvciBjaGFuZ2luZyB0aGUgbW9kZSBvZiBhIHBhZ2UgdG8gY29tcGxldGUgYSBjcml0aWNhbCB0YXNrLlxuICogVGhpcyBpcyB1c3VhbGx5IHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgRGlhbG9nIGNvbXBvbmVudCB0byBtYWtlXG4gKiBtb2RhbCBkaWFsb2dzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBjbGFzc1RhcmdldDogJ21vZGFsJyxcbiAgICBjbGFzc1RyaWdnZXI6ICdtb2RhbF9fdHJpZ2dlcicsXG4gICAgY2xhc3NJbm5lcjogJ21vZGFsX19kaWFsb2cnLFxuICAgIGNsYXNzQWN0aXZlOiAnaXMtYWN0aXZlJyxcbiAgICBmb2N1czogJ1tkYXRhLWZvY3VzXSdcbiAgfVxuXG4gIGxldCBtZW1vcnlUcmlnZ2VyXG4gIGxldCBtZW1vcnlUYXJnZXRcblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGVzY2FwZSwgZmFsc2UpXG4gIH1cblxuICBhcGkub3BlbiA9IChzZWxlY3RvcikgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpXG4gIH1cblxuICBhcGkuY2xvc2UgPSAoY2xlYXIpID0+IHtcbiAgICBjbG9zZShjbGVhcilcbiAgfVxuXG4gIGNvbnN0IG9wZW4gPSAodGFyZ2V0KSA9PiB7XG4gICAgdS5hZGRDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGlmICh0YXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICB0YXJnZXQgPSB0YXJnZXQuaXRlbSgwKVxuICAgICAgbGV0IGZvY3VzID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuZm9jdXMpXG4gICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgICAgZm9jdXMuZm9jdXMoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhcmdldC5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY2xvc2UgPSAoY2xlYXIgPSBmYWxzZSkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzVGFyZ2V0KVxuICAgIHUucmVtb3ZlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBpZiAoY2xlYXIgPT0gZmFsc2UgJiYgbWVtb3J5VHJpZ2dlciAmJiBtZW1vcnlUYXJnZXQpIHtcbiAgICAgIGlmIChtZW1vcnlUYXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IG1lbW9yeVRhcmdldC5pdGVtKDApXG4gICAgICAgIG1lbW9yeVRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICAgIGlmIChtZW1vcnlUcmlnZ2VyKSB7XG4gICAgICAgICAgICBtZW1vcnlUcmlnZ2VyLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNsZWFyID09IHRydWUpIHtcbiAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZXNjYXBlID0gKCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc1RhcmdldClcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgaW5uZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0lubmVyKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBjbG9zZSgpXG4gICAgICBsZXQgdGFyZ2V0RGF0YSA9IHRyaWdnZXIuZGF0YXNldC50YXJnZXRcbiAgICAgIGlmICh0YXJnZXREYXRhKSB7XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0RGF0YSlcbiAgICAgICAgbWVtb3J5VHJpZ2dlciA9IHRyaWdnZXJcbiAgICAgICAgb3BlbihtZW1vcnlUYXJnZXQpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgIWlubmVyKSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQob3B0aW9ucylcbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtdG9nZ2xlLWNsYXNzXScsXG4gICAgdGFyZ2V0czogJycsXG4gICAgY2xhc3M6ICcnXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IHJ1biA9ICgpID0+IHtcblxuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcblxuICAgIGlmICh0cmlnZ2VyKSB7XG5cbiAgICAgIGxldCB0YXJnZXRzXG5cbiAgICAgIGlmIChzZXR0aW5ncy50YXJnZXRzKSB7XG4gICAgICAgIHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNldHRpbmdzLnRhcmdldHMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0cmlnZ2VyLmRhdGFzZXQudG9nZ2xlVGFyZ2V0KVxuICAgICAgfVxuXG4gICAgICBpZiAodGFyZ2V0cy5sZW5ndGgpIHtcbiAgICAgICAgdGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQpID0+IHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0dGluZ3MuY2xhc3MpIHtcbiAgICAgICAgICB1LnRvZ2dsZUNsYXNzKHRyaWdnZXIsIHNldHRpbmdzLmNsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHUudG9nZ2xlQ2xhc3ModHJpZ2dlciwgdHJpZ2dlci5kYXRhc2V0LnRvZ2dsZUNsYXNzLnNwbGl0KCcgJykpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0KG9wdGlvbnMpXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCBjb25maWcgZnJvbSAnY29uZmlnJ1xuXG4vKipcbiAqIFV0aWxpdHlcbiAqIC0tLVxuICogQSBzZXQgb2YgaGVscGVyIG1ldGhvZHMgZm9yIGdlbmVyYWwgamF2YXNjcmlwdCBwbHVnaW4gdXNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLyoqXG4gICAqIEdldCBhbmQgb3V0cHV0IGEgYnJlYWtwb2ludCB1c2luZyBpdCdzIGtleSBmb3VuZCBpbiBjb25maWcuanNvblxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSAtIFRoZSBrZXkgdG8gc2VhcmNoIGZvciBpbiB0aGUgYnJlYWtwb2ludHMgb2JqZWN0XG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IC0gVGhlIHBpeGVsIHZhbHVlIG9mIHRoZSBicmVha3BvaW50IGFzIGEgc3RyaW5nXG4gICAqL1xuICBzdGF0aWMgZ2V0QnJlYWtwb2ludChrZXkpIHtcbiAgICByZXR1cm4gY29uZmlnLmJyZWFrcG9pbnRzW2tleV1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIGNoZWNrIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSBSZXR1cm5zIHRydWUgaWYgY2xhc3MgZXhpc3RzLCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIHJldHVybiBjLnNvbWUoIGZ1bmN0aW9uIChjKSB7XG4gICAgICBsZXQgaGFzID0gZmFsc2VcbiAgICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoYykpIHtcbiAgICAgICAgICBoYXMgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICByZXR1cm4gaGFzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY2xhc3Mgb3IgY2xhc3NlcyB0byBhbiBlbGVtZW50XG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge05vZGV9IGVsIC0gRWxlbWVudChzKSB0byBhZGQgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nIHx8IEFycmF5fSBjIC0gQ2xhc3MoZXMpIHRvIGFkZFxuICAgKi9cbiAgc3RhdGljIGFkZENsYXNzKGVsLCBjKSB7XG4gICAgZWwgPSAoZWwuZm9yRWFjaCkgPyBlbCA6IHRoaXMudG9BcnJheShlbClcbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG4gICAgZWwuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGMpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgY2xhc3Mgb3IgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50KHMpIHRvIHJlbW92ZSBjbGFzcyhlcykgZnJvbVxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byByZW1vdmVcbiAgICovXG4gIHN0YXRpYyByZW1vdmVDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiAtLS1cbiAgICogQHBhcmFtIHtOb2RlfSBlbCAtIEVsZW1lbnQocykgdG8gdG9nZ2xlIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyhlbCwgYykge1xuICAgIGVsID0gKGVsLmZvckVhY2gpID8gZWwgOiB0aGlzLnRvQXJyYXkoZWwpXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuICAgIGVsLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBjLmZvckVhY2goKGMpID0+IHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShjKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGNsb3Nlc3QgcGFyZW50IGVsZW1lbnQgYmFzZWQgb24gY2xhc3MuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlXG4gICAqIG5hdGl2ZSAuY2xvc2VzdCgpIG1ldGhvZCBpbiB0aGF0IGl0IGRvZXNuJ3QgY2hlY2sgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Tm9kZX0gZWwgLSBFbGVtZW50IHRvIHN0YXJ0IHNlYXJjaCBvblxuICAgKiBAcGFyYW0ge1N0cmluZyB8fCBBcnJheX0gYyAtIENsYXNzKGVzKSB0byBjaGVjayBmb3JcbiAgICogQHJldHVybiB7Tm9kZX0gLSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdChlbCwgYykge1xuICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSAmJiAhdGhpcy5oYXNDbGFzcyhlbCwgYykpXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBzdHJpbmcgb3Igb2JqZWN0IHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3NcbiAgICogcmV0dXJuZWQgYXMgaXMuIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgYW4gYXJyYXkuXG4gICAqIC0tLVxuICAgKiBAcGFyYW0ge09iamVjdH0gaXRlbSAtIFN0cmluZyBvciBvYmplY3QgdG8gY29udmVydCB0byBhbiBhcnJheVxuICAgKiBAcmV0dXJuIHtBcnJheX0gLSBSZXR1cm4gdGhlIGNvbnZlcnRlZCBhcnJheVxuICAgKi9cbiAgc3RhdGljIHRvQXJyYXkoaXRlbSkge1xuXG4gICAgbGV0IGFycmF5ID0gW11cblxuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBhcnJheSA9IGl0ZW1cbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXkucHVzaChpdGVtKVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LiBTZXQgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIHRvIGB0cnVlYCBmb3IgYSBkZWVwIG9yIHJlY3Vyc2l2ZSBtZXJnZS5cbiAgICogLS0tXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW09wdGlvbmFsXSAtIElmIHRydWUsIGRvIGEgZGVlcCAob3IgcmVjdXJzaXZlKSBtZXJnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gLSBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlcjsgZWFjaCBvdmVycmlkaW5nIHRoZSBuZXh0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IC0gTWVyZ2VkIHZhbHVlcyBvZiBkZWZhdWx0cyBhbmQgb3B0aW9uc1xuICAgKi9cbiAgc3RhdGljIGV4dGVuZCgpIHtcblxuICAgIGxldCBleHRlbmRlZCA9IHt9XG4gICAgbGV0IGRlZXAgPSBmYWxzZVxuICAgIGxldCBpID0gMFxuICAgIGxldCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoXG5cbiAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcbiAgICAgIGRlZXAgPSBhcmd1bWVudHNbMF1cbiAgICAgIGkrK1xuICAgIH1cblxuICAgIGxldCBtZXJnZSA9ICggb2JqICkgPT4ge1xuICAgICAgZm9yICggbGV0IHByb3AgaW4gb2JqICkge1xuICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqLCBwcm9wICkgKSB7XG4gICAgICAgICAgaWYgKCBkZWVwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbcHJvcF0pID09PSAnW29iamVjdCBPYmplY3RdJyApIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdIClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgIGxldCBvYmogPSBhcmd1bWVudHNbaV1cbiAgICAgIG1lcmdlKG9iailcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kZWRcbiAgfVxuXG59XG4iXX0=

//# sourceMappingURL=scripts.js.map
