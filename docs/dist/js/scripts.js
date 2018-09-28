(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _modal = require('modal.js');

var _modal2 = _interopRequireDefault(_modal);

var _dismissible = require('dismissible.js');

var _dismissible2 = _interopRequireDefault(_dismissible);

var _list = require('list.js');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modal = new _modal2.default();
var dismissible = new _dismissible2.default();

var home = document.getElementById('vrembem-blocks');

if (home) {

  var blocksList = new _list2.default('vrembem-blocks', {
    valueNames: ['jumbo-list__name', { data: ['type'] }],
    listClass: 'jumbo-list'
  });

  var updateList = function updateList() {
    var values_type = document.getElementById('jumbo-filter__type').value;
    blocksList.filter(function (item) {
      return values_type.includes(item.values().type) || !values_type;
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    var filter = document.getElementById('jumbo-filter__type');
    if (filter) {
      filter.onchange = updateList;
    }
  }, false);

  blocksList.sort('jumbo-list__name', { order: 'asc' });
}

},{"dismissible.js":22,"list.js":5,"modal.js":23}],2:[function(require,module,exports){
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
'use strict';

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
'use strict';

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
'use strict';

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
      self.handlers = { 'updated': [] };
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
'use strict';

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
      var className = currentPage === i ? "active" : "";

      //console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow), className);

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
'use strict';

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
  });

  // Used to detect click on HTML5 clear button
  _list.utils.events.bind(_list.utils.getByClass(_list.listContainer, _list.searchClass), 'input', function (e) {
    var target = e.target || e.srcElement;
    if (target.value === "") {
      searchMethod('');
    }
  });

  return searchMethod;
};

},{}],10:[function(require,module,exports){
'use strict';

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
    buttons.setOrder(options);

    // caseInsensitive
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
  };

  // Add handlers
  list.handlers.sortStart = list.handlers.sortStart || [];
  list.handlers.sortComplete = list.handlers.sortComplete || [];

  buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
  list.utils.events.bind(buttons.els, 'click', sort);
  list.on('searchStart', buttons.clear);
  list.on('filterStart', buttons.clear);

  return sort;
};

},{}],11:[function(require,module,exports){
'use strict';

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
              return { data: name };
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
'use strict';

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
  }

  // fallback
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
  }

  // fallback
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
  }

  // fallback
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
'use strict';

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
    var args = Array.prototype.slice.call(arguments, 1);

    // For each extender, copy their properties on our object.
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
    var Match_Location = options.location || 0;

    //Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of '0' requires the match be at the exact location specified, a threshold of '1000' would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
    var Match_Distance = options.distance || 100;

    // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match (of both letters and location), a threshold of '1.0' would match anything.
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
    }();

    // Compute and return the score for a match with e errors and x location.
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
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
        // What about in the other direction? (speedup)
        best_loc = text.lastIndexOf(pattern, loc + pattern.length);

        if (best_loc != -1) {
            score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
        }
    }

    // Initialise the bit arrays.
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
        }
        // Use the result from this iteration as the maximum for the next.
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
                var score = match_bitapScore_(d, j - 1);
                // This match will almost certainly be better than any existing match.
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
        }
        // No hope for a (better) match at greater error levels.
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
'use strict';

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
'use strict';

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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  'use strict';

  var api = {};
  var settings = void 0;
  var defaults = {
    trigger: '[data-dismiss]',
    target: '[data-dismissible]',
    classToggle: 'dismiss'
  };

  var run = function run() {
    var trigger = event.target.closest(settings.trigger);
    if (trigger) {
      var target = trigger.closest(settings.target);
      if (target) {
        _utility2.default.toggleClass(target, settings.classToggle);
      }
      event.preventDefault();
    }
  };

  api.init = function (options) {
    api.destroy();
    settings = _utility2.default.extend(defaults, options || {});
    document.addEventListener('click', run, false);
  };

  api.destroy = function () {
    settings = null;
    document.removeEventListener('click', run, false);
  };

  api.init();

  return api;
};

var _utility = require('./utility.js');

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./utility.js":24}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  'use strict';

  var api = {};
  var settings = void 0;
  var defaults = {
    classTrigger: 'modal__trigger',
    classModal: 'modal',
    classDialog: 'modal__dialog',
    classActive: 'is-active',
    focus: '[data-focus]'
  };

  var memoryTrigger = void 0;
  var memoryTarget = void 0;

  var open = function open(target) {
    _utility2.default.addClass(target, settings.classActive);
    var focus = target.querySelector(settings.focus);
    target.addEventListener('transitionend', function _listener() {
      if (focus) {
        focus.focus();
      } else {
        target.focus();
      }
      this.removeEventListener('transitionend', _listener, true);
    }, true);
  };

  var close = function close() {
    var modals = document.querySelectorAll('.' + settings.classModal);
    for (var i = 0; i < modals.length; ++i) {
      _utility2.default.removeClass(modals[i], settings.classActive);
    }
    if (memoryTrigger && memoryTarget) {
      memoryTarget.addEventListener('transitionend', function _listener() {
        if (memoryTrigger) {
          memoryTrigger.focus();
        }
        memoryTarget = null;
        memoryTrigger = null;
        this.removeEventListener('transitionend', _listener, true);
      }, true);
    }
  };

  var run = function run() {
    var trigger = event.target.closest('.' + settings.classTrigger);
    var modal = event.target.closest('.' + settings.classModal);
    var dialog = event.target.closest('.' + settings.classDialog);
    if (trigger) {
      close();
      var dataModal = trigger.dataset.modal;
      if (dataModal) {
        memoryTarget = document.getElementById(dataModal);
        memoryTrigger = trigger;
        open(memoryTarget);
      }
      event.preventDefault();
    } else if (modal && !dialog) {
      close();
    }
  };

  api.open = function (target) {
    open(document.getElementById(target));
  };

  api.close = function () {
    close();
  };

  api.init = function (options) {
    api.destroy();
    settings = _utility2.default.extend(defaults, options || {});
    document.addEventListener('click', run, false);
    document.addEventListener('touchend', run, false);
  };

  api.destroy = function () {
    settings = null;
    memoryTarget = null;
    memoryTrigger = null;
    document.removeEventListener('click', run, false);
    document.removeEventListener('touchend', run, false);
  };

  api.init();

  return api;
};

var _utility = require('./utility.js');

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./utility.js":24}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: 'hasClass',


    /**
     * Checks if an element has a class or not
     * @param {Element} Element to check class(es) on
     * @param {String} || {Array} Class(es) to check
     * @returns {Boolean} Returns true if class exists on element, otherwise false
     */
    value: function hasClass(el, c) {

      c = this.toArray(c);

      return c.every(function (c) {
        return el.classList.contains(c);
      });
    }

    /**
     * Adds a class or classes to an element
     * @param {Element} Element to add class(es) on
     * @param {String} || {Array} Class(es) to add
     */

  }, {
    key: 'addClass',
    value: function addClass(el, c) {

      c = this.toArray(c);

      c.forEach(function (c) {
        el.classList.add(c);
      });
    }
    /**
     * Remove a class or classes from an element
     * @param {Element} Element to remove class(es) from
     * @param {String} || {Array} Class(es) to remove
     */

  }, {
    key: 'removeClass',
    value: function removeClass(el, c) {

      c = this.toArray(c);

      c.forEach(function (c) {
        el.classList.remove(c);
      });
    }

    /**
     * Toggle a class or classes on an element
     * @param {Element} Element to toggle class(es) on
     * @param {String} || {Array} Class(es) to toggle
     */

  }, {
    key: 'toggleClass',
    value: function toggleClass(el, c) {

      c = this.toArray(c);

      c.forEach(function (c) {
        el.classList.toggle(c);
      });
    }

    /**
     * Find the closest parent element based on class. This is different from the
     * native .closest() method in that it doesn't check the current element.
     * @param {Element} Element to start search on
     * @param {String} || {Array} Class(es) to check for
     * @return {Element} Closest parent element
     */

  }, {
    key: 'closest',
    value: function closest(el, c) {
      while ((el = el.parentElement) && !this.hasClass(el, c)) {
        return el;
      }
    }

    /**
     * Converts a string to an array. If an array is passed, it's returned as is.
     * Anything else is returned as false.
     * @param {String} || {Array} String to convert to an array
     * @return {Array} Return the converted array
     */

  }, {
    key: 'toArray',
    value: function toArray(string) {

      var array = [];

      if (typeof string === 'string') {
        array.push(string);
      } else if (Array.isArray(string)) {
        array = string;
      } else {
        return false;
      }

      return array;
    }

    /**
     * Merge two or more objects. Returns a new object. Set the first argument
     * to `true` for a deep or recursive merge.
     * @param {Boolean} [Optional] If true, do a deep (or recursive) merge
     * @param {Object} The objects to merge together; each overriding the next
     * @returns {Object} Merged values of defaults and options
     */

  }, {
    key: 'extend',
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

  return _class;
}();

exports.default = _class;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9tb2RhbC5qcyIsIi4uL3NyYy9qcy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sUUFBUSxJQUFJLGVBQUosRUFBZDtBQUNBLElBQU0sY0FBYyxJQUFJLHFCQUFKLEVBQXBCOztBQUVBLElBQU0sT0FBTyxTQUFTLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQWI7O0FBRUEsSUFBSSxJQUFKLEVBQVU7O0FBRVIsTUFBTSxhQUFhLElBQUksY0FBSixDQUFTLGdCQUFULEVBQTJCO0FBQzVDLGdCQUFZLENBQ1Ysa0JBRFUsRUFFVixFQUFFLE1BQU0sQ0FBQyxNQUFELENBQVIsRUFGVSxDQURnQztBQUs1QyxlQUFXO0FBTGlDLEdBQTNCLENBQW5COztBQVFBLE1BQU0sYUFBYSxTQUFiLFVBQWEsR0FBVztBQUM1QixRQUFNLGNBQWMsU0FBUyxjQUFULENBQXdCLG9CQUF4QixFQUE4QyxLQUFsRTtBQUNBLGVBQVcsTUFBWCxDQUFrQixVQUFTLElBQVQsRUFBZTtBQUMvQixhQUFRLFlBQVksUUFBWixDQUFxQixLQUFLLE1BQUwsR0FBYyxJQUFuQyxLQUE0QyxDQUFDLFdBQXJEO0FBQ0QsS0FGRDtBQUdELEdBTEQ7O0FBT0EsV0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBNkMsWUFBVztBQUN0RCxRQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQUFmO0FBQ0EsUUFBSSxNQUFKLEVBQVk7QUFDVixhQUFPLFFBQVAsR0FBZ0IsVUFBaEI7QUFDRDtBQUNGLEdBTEQsRUFLRyxLQUxIOztBQU9BLGFBQVcsSUFBWCxDQUFnQixrQkFBaEIsRUFBb0MsRUFBRSxPQUFPLEtBQVQsRUFBcEM7QUFFRDs7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QXZCOztBQUVBLFVBQUssT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQWdDLFVBQVUsQ0FBVixDQUFoQyxNQUFtRCxrQkFBeEQsRUFBNkU7QUFDM0UsZUFBTyxVQUFVLENBQVYsQ0FBUDtBQUNBO0FBQ0Q7O0FBRUQsVUFBSSxRQUFRLFNBQVIsS0FBUSxDQUFFLEdBQUYsRUFBVztBQUNyQixhQUFNLElBQUksSUFBVixJQUFrQixHQUFsQixFQUF3QjtBQUN0QixjQUFLLE9BQU8sU0FBUCxDQUFpQixjQUFqQixDQUFnQyxJQUFoQyxDQUFzQyxHQUF0QyxFQUEyQyxJQUEzQyxDQUFMLEVBQXlEO0FBQ3ZELGdCQUFLLFFBQVEsT0FBTyxTQUFQLENBQWlCLFFBQWpCLENBQTBCLElBQTFCLENBQStCLElBQUksSUFBSixDQUEvQixNQUE4QyxpQkFBM0QsRUFBK0U7QUFDN0UsdUJBQVMsSUFBVCxJQUFpQixPQUFRLElBQVIsRUFBYyxTQUFTLElBQVQsQ0FBZCxFQUE4QixJQUFJLElBQUosQ0FBOUIsQ0FBakI7QUFDRCxhQUZELE1BRU87QUFDTCx1QkFBUyxJQUFULElBQWlCLElBQUksSUFBSixDQUFqQjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BVkQ7O0FBWUEsYUFBUSxJQUFJLE1BQVosRUFBb0IsR0FBcEIsRUFBMEI7QUFDeEIsWUFBSSxNQUFNLFVBQVUsQ0FBVixDQUFWO0FBQ0EsY0FBTSxHQUFOO0FBQ0Q7O0FBRUQsYUFBTyxRQUFQO0FBQ0QsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBNb2RhbCBmcm9tICdtb2RhbC5qcydcbmltcG9ydCBEaXNtaXNzaWJsZSBmcm9tICdkaXNtaXNzaWJsZS5qcydcbmltcG9ydCBsaXN0IGZyb20gJ2xpc3QuanMnXG5cbmNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKClcbmNvbnN0IGRpc21pc3NpYmxlID0gbmV3IERpc21pc3NpYmxlKClcblxuY29uc3QgaG9tZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2cmVtYmVtLWJsb2NrcycpXG5cbmlmIChob21lKSB7XG5cbiAgY29uc3QgYmxvY2tzTGlzdCA9IG5ldyBsaXN0KCd2cmVtYmVtLWJsb2NrcycsIHtcbiAgICB2YWx1ZU5hbWVzOiBbXG4gICAgICAnanVtYm8tbGlzdF9fbmFtZScsXG4gICAgICB7IGRhdGE6IFsndHlwZSddIH1cbiAgICBdLFxuICAgIGxpc3RDbGFzczogJ2p1bWJvLWxpc3QnXG4gIH0pXG5cbiAgY29uc3QgdXBkYXRlTGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IHZhbHVlc190eXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2p1bWJvLWZpbHRlcl9fdHlwZScpLnZhbHVlXG4gICAgYmxvY2tzTGlzdC5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgcmV0dXJuICh2YWx1ZXNfdHlwZS5pbmNsdWRlcyhpdGVtLnZhbHVlcygpLnR5cGUpIHx8ICF2YWx1ZXNfdHlwZSlcbiAgICB9KVxuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgZmlsdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2p1bWJvLWZpbHRlcl9fdHlwZScpXG4gICAgaWYgKGZpbHRlcikge1xuICAgICAgZmlsdGVyLm9uY2hhbmdlPXVwZGF0ZUxpc3RcbiAgICB9XG4gIH0sIGZhbHNlKVxuXG4gIGJsb2Nrc0xpc3Quc29ydCgnanVtYm8tbGlzdF9fbmFtZScsIHsgb3JkZXI6ICdhc2MnIH0pXG5cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgYWRkQXN5bmMgPSBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrLCBpdGVtcykge1xuICAgIHZhciB2YWx1ZXNUb0FkZCA9IHZhbHVlcy5zcGxpY2UoMCwgNTApO1xuICAgIGl0ZW1zID0gaXRlbXMgfHwgW107XG4gICAgaXRlbXMgPSBpdGVtcy5jb25jYXQobGlzdC5hZGQodmFsdWVzVG9BZGQpKTtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2ssIGl0ZW1zKTtcbiAgICAgIH0sIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnVwZGF0ZSgpO1xuICAgICAgY2FsbGJhY2soaXRlbXMpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGFkZEFzeW5jO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIC8vIEFkZCBoYW5kbGVyc1xuICBsaXN0LmhhbmRsZXJzLmZpbHRlclN0YXJ0ID0gbGlzdC5oYW5kbGVycy5maWx0ZXJTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5maWx0ZXJDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuZmlsdGVyQ29tcGxldGUgfHwgW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZpbHRlckZ1bmN0aW9uKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdmaWx0ZXJTdGFydCcpO1xuICAgIGxpc3QuaSA9IDE7IC8vIFJlc2V0IHBhZ2luZ1xuICAgIGxpc3QucmVzZXQuZmlsdGVyKCk7XG4gICAgaWYgKGZpbHRlckZ1bmN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxpc3QuZmlsdGVyZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5maWx0ZXJlZCA9IHRydWU7XG4gICAgICB2YXIgaXMgPSBsaXN0Lml0ZW1zO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gaXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGlzW2ldO1xuICAgICAgICBpZiAoZmlsdGVyRnVuY3Rpb24oaXRlbSkpIHtcbiAgICAgICAgICBpdGVtLmZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmZpbHRlcmVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ2ZpbHRlckNvbXBsZXRlJyk7XG4gICAgcmV0dXJuIGxpc3QudmlzaWJsZUl0ZW1zO1xuICB9O1xufTtcbiIsIlxudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKSxcbiAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3V0aWxzL3RvLXN0cmluZycpLFxuICBnZXRCeUNsYXNzID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYnktY2xhc3MnKSxcbiAgZnV6enkgPSByZXF1aXJlKCcuL3V0aWxzL2Z1enp5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICBsb2NhdGlvbjogMCxcbiAgICBkaXN0YW5jZTogMTAwLFxuICAgIHRocmVzaG9sZDogMC40LFxuICAgIG11bHRpU2VhcmNoOiB0cnVlLFxuICAgIHNlYXJjaENsYXNzOiAnZnV6enktc2VhcmNoJ1xuICB9LCBvcHRpb25zKTtcblxuXG5cbiAgdmFyIGZ1enp5U2VhcmNoID0ge1xuICAgIHNlYXJjaDogZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBjb2x1bW5zKSB7XG4gICAgICAvLyBTdWJzdHJhY3QgYXJndW1lbnRzIGZyb20gdGhlIHNlYXJjaFN0cmluZyBvciBwdXQgc2VhcmNoU3RyaW5nIGFzIG9ubHkgYXJndW1lbnRcbiAgICAgIHZhciBzZWFyY2hBcmd1bWVudHMgPSBvcHRpb25zLm11bHRpU2VhcmNoID8gc2VhcmNoU3RyaW5nLnJlcGxhY2UoLyArJC8sICcnKS5zcGxpdCgvICsvKSA6IFtzZWFyY2hTdHJpbmddO1xuXG4gICAgICBmb3IgKHZhciBrID0gMCwga2wgPSBsaXN0Lml0ZW1zLmxlbmd0aDsgayA8IGtsOyBrKyspIHtcbiAgICAgICAgZnV6enlTZWFyY2guaXRlbShsaXN0Lml0ZW1zW2tdLCBjb2x1bW5zLCBzZWFyY2hBcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbTogZnVuY3Rpb24oaXRlbSwgY29sdW1ucywgc2VhcmNoQXJndW1lbnRzKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlYXJjaEFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZm91bmRBcmd1bWVudCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjb2x1bW5zLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBpZiAoZnV6enlTZWFyY2gudmFsdWVzKGl0ZW0udmFsdWVzKCksIGNvbHVtbnNbal0sIHNlYXJjaEFyZ3VtZW50c1tpXSkpIHtcbiAgICAgICAgICAgIGZvdW5kQXJndW1lbnQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighZm91bmRBcmd1bWVudCkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGl0ZW0uZm91bmQgPSBmb3VuZDtcbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24odmFsdWVzLCB2YWx1ZSwgc2VhcmNoQXJndW1lbnQpIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gdG9TdHJpbmcodmFsdWVzW3ZhbHVlXSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoZnV6enkodGV4dCwgc2VhcmNoQXJndW1lbnQsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cblxuICBldmVudHMuYmluZChnZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgb3B0aW9ucy5zZWFyY2hDbGFzcyksICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50OyAvLyBJRSBoYXZlIHNyY0VsZW1lbnRcbiAgICBsaXN0LnNlYXJjaCh0YXJnZXQudmFsdWUsIGZ1enp5U2VhcmNoLnNlYXJjaCk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbihzdHIsIGNvbHVtbnMpIHtcbiAgICBsaXN0LnNlYXJjaChzdHIsIGNvbHVtbnMsIGZ1enp5U2VhcmNoLnNlYXJjaCk7XG4gIH07XG59O1xuIiwidmFyIG5hdHVyYWxTb3J0ID0gcmVxdWlyZSgnc3RyaW5nLW5hdHVyYWwtY29tcGFyZScpLFxuICBnZXRCeUNsYXNzID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYnktY2xhc3MnKSxcbiAgZXh0ZW5kID0gcmVxdWlyZSgnLi91dGlscy9leHRlbmQnKSxcbiAgaW5kZXhPZiA9IHJlcXVpcmUoJy4vdXRpbHMvaW5kZXgtb2YnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgdG9TdHJpbmcgPSByZXF1aXJlKCcuL3V0aWxzL3RvLXN0cmluZycpLFxuICBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGdldEF0dHJpYnV0ZSA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWF0dHJpYnV0ZScpLFxuICB0b0FycmF5ID0gcmVxdWlyZSgnLi91dGlscy90by1hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlkLCBvcHRpb25zLCB2YWx1ZXMpIHtcblxuICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgaW5pdCxcbiAgICBJdGVtID0gcmVxdWlyZSgnLi9pdGVtJykoc2VsZiksXG4gICAgYWRkQXN5bmMgPSByZXF1aXJlKCcuL2FkZC1hc3luYycpKHNlbGYpLFxuICAgIGluaXRQYWdpbmF0aW9uID0gcmVxdWlyZSgnLi9wYWdpbmF0aW9uJykoc2VsZik7XG5cbiAgaW5pdCA9IHtcbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLmxpc3RDbGFzcyAgICAgID0gXCJsaXN0XCI7XG4gICAgICBzZWxmLnNlYXJjaENsYXNzICAgID0gXCJzZWFyY2hcIjtcbiAgICAgIHNlbGYuc29ydENsYXNzICAgICAgPSBcInNvcnRcIjtcbiAgICAgIHNlbGYucGFnZSAgICAgICAgICAgPSAxMDAwMDtcbiAgICAgIHNlbGYuaSAgICAgICAgICAgICAgPSAxO1xuICAgICAgc2VsZi5pdGVtcyAgICAgICAgICA9IFtdO1xuICAgICAgc2VsZi52aXNpYmxlSXRlbXMgICA9IFtdO1xuICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zICA9IFtdO1xuICAgICAgc2VsZi5zZWFyY2hlZCAgICAgICA9IGZhbHNlO1xuICAgICAgc2VsZi5maWx0ZXJlZCAgICAgICA9IGZhbHNlO1xuICAgICAgc2VsZi5zZWFyY2hDb2x1bW5zICA9IHVuZGVmaW5lZDtcbiAgICAgIHNlbGYuaGFuZGxlcnMgICAgICAgPSB7ICd1cGRhdGVkJzogW10gfTtcbiAgICAgIHNlbGYudmFsdWVOYW1lcyAgICAgPSBbXTtcbiAgICAgIHNlbGYudXRpbHMgICAgICAgICAgPSB7XG4gICAgICAgIGdldEJ5Q2xhc3M6IGdldEJ5Q2xhc3MsXG4gICAgICAgIGV4dGVuZDogZXh0ZW5kLFxuICAgICAgICBpbmRleE9mOiBpbmRleE9mLFxuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgdG9TdHJpbmc6IHRvU3RyaW5nLFxuICAgICAgICBuYXR1cmFsU29ydDogbmF0dXJhbFNvcnQsXG4gICAgICAgIGNsYXNzZXM6IGNsYXNzZXMsXG4gICAgICAgIGdldEF0dHJpYnV0ZTogZ2V0QXR0cmlidXRlLFxuICAgICAgICB0b0FycmF5OiB0b0FycmF5XG4gICAgICB9O1xuXG4gICAgICBzZWxmLnV0aWxzLmV4dGVuZChzZWxmLCBvcHRpb25zKTtcblxuICAgICAgc2VsZi5saXN0Q29udGFpbmVyID0gKHR5cGVvZihpZCkgPT09ICdzdHJpbmcnKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSA6IGlkO1xuICAgICAgaWYgKCFzZWxmLmxpc3RDb250YWluZXIpIHsgcmV0dXJuOyB9XG4gICAgICBzZWxmLmxpc3QgICAgICAgPSBnZXRCeUNsYXNzKHNlbGYubGlzdENvbnRhaW5lciwgc2VsZi5saXN0Q2xhc3MsIHRydWUpO1xuXG4gICAgICBzZWxmLnBhcnNlICAgICAgICA9IHJlcXVpcmUoJy4vcGFyc2UnKShzZWxmKTtcbiAgICAgIHNlbGYudGVtcGxhdGVyICAgID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXInKShzZWxmKTtcbiAgICAgIHNlbGYuc2VhcmNoICAgICAgID0gcmVxdWlyZSgnLi9zZWFyY2gnKShzZWxmKTtcbiAgICAgIHNlbGYuZmlsdGVyICAgICAgID0gcmVxdWlyZSgnLi9maWx0ZXInKShzZWxmKTtcbiAgICAgIHNlbGYuc29ydCAgICAgICAgID0gcmVxdWlyZSgnLi9zb3J0Jykoc2VsZik7XG4gICAgICBzZWxmLmZ1enp5U2VhcmNoICA9IHJlcXVpcmUoJy4vZnV6enktc2VhcmNoJykoc2VsZiwgb3B0aW9ucy5mdXp6eVNlYXJjaCk7XG5cbiAgICAgIHRoaXMuaGFuZGxlcnMoKTtcbiAgICAgIHRoaXMuaXRlbXMoKTtcbiAgICAgIHRoaXMucGFnaW5hdGlvbigpO1xuXG4gICAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIH0sXG4gICAgaGFuZGxlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaGFuZGxlciBpbiBzZWxmLmhhbmRsZXJzKSB7XG4gICAgICAgIGlmIChzZWxmW2hhbmRsZXJdKSB7XG4gICAgICAgICAgc2VsZi5vbihoYW5kbGVyLCBzZWxmW2hhbmRsZXJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbXM6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5wYXJzZShzZWxmLmxpc3QpO1xuICAgICAgaWYgKHZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNlbGYuYWRkKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBwYWdpbmF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uID0gW3t9XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uWzBdID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbiA9IFtvcHRpb25zLnBhZ2luYXRpb25dO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG9wdGlvbnMucGFnaW5hdGlvbi5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgICAgaW5pdFBhZ2luYXRpb24ob3B0aW9ucy5wYWdpbmF0aW9uW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKlxuICAqIFJlLXBhcnNlIHRoZSBMaXN0LCB1c2UgaWYgaHRtbCBoYXZlIGNoYW5nZWRcbiAgKi9cbiAgdGhpcy5yZUluZGV4ID0gZnVuY3Rpb24oKSB7XG4gICAgc2VsZi5pdGVtcyAgICAgICAgICA9IFtdO1xuICAgIHNlbGYudmlzaWJsZUl0ZW1zICAgPSBbXTtcbiAgICBzZWxmLm1hdGNoaW5nSXRlbXMgID0gW107XG4gICAgc2VsZi5zZWFyY2hlZCAgICAgICA9IGZhbHNlO1xuICAgIHNlbGYuZmlsdGVyZWQgICAgICAgPSBmYWxzZTtcbiAgICBzZWxmLnBhcnNlKHNlbGYubGlzdCk7XG4gIH07XG5cbiAgdGhpcy50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIganNvbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAganNvbi5wdXNoKHNlbGYuaXRlbXNbaV0udmFsdWVzKCkpO1xuICAgIH1cbiAgICByZXR1cm4ganNvbjtcbiAgfTtcblxuXG4gIC8qXG4gICogQWRkIG9iamVjdCB0byBsaXN0XG4gICovXG4gIHRoaXMuYWRkID0gZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaykge1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgYWRkQXN5bmModmFsdWVzLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBhZGRlZCA9IFtdLFxuICAgICAgbm90Q3JlYXRlID0gZmFsc2U7XG4gICAgaWYgKHZhbHVlc1swXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHZhbHVlcyA9IFt2YWx1ZXNdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSB2YWx1ZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBudWxsO1xuICAgICAgbm90Q3JlYXRlID0gKHNlbGYuaXRlbXMubGVuZ3RoID4gc2VsZi5wYWdlKSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIGl0ZW0gPSBuZXcgSXRlbSh2YWx1ZXNbaV0sIHVuZGVmaW5lZCwgbm90Q3JlYXRlKTtcbiAgICAgIHNlbGYuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgIGFkZGVkLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIGFkZGVkO1xuICB9O1xuXG5cdHRoaXMuc2hvdyA9IGZ1bmN0aW9uKGksIHBhZ2UpIHtcblx0XHR0aGlzLmkgPSBpO1xuXHRcdHRoaXMucGFnZSA9IHBhZ2U7XG5cdFx0c2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gc2VsZjtcblx0fTtcblxuICAvKiBSZW1vdmVzIG9iamVjdCBmcm9tIGxpc3QuXG4gICogTG9vcHMgdGhyb3VnaCB0aGUgbGlzdCBhbmQgcmVtb3ZlcyBvYmplY3RzIHdoZXJlXG4gICogcHJvcGVydHkgXCJ2YWx1ZW5hbWVcIiA9PT0gdmFsdWVcbiAgKi9cbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbih2YWx1ZU5hbWUsIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgdmFyIGZvdW5kID0gMDtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChzZWxmLml0ZW1zW2ldLnZhbHVlcygpW3ZhbHVlTmFtZV0gPT0gdmFsdWUpIHtcbiAgICAgICAgc2VsZi50ZW1wbGF0ZXIucmVtb3ZlKHNlbGYuaXRlbXNbaV0sIG9wdGlvbnMpO1xuICAgICAgICBzZWxmLml0ZW1zLnNwbGljZShpLDEpO1xuICAgICAgICBpbC0tO1xuICAgICAgICBpLS07XG4gICAgICAgIGZvdW5kKys7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9O1xuXG4gIC8qIEdldHMgdGhlIG9iamVjdHMgaW4gdGhlIGxpc3Qgd2hpY2hcbiAgKiBwcm9wZXJ0eSBcInZhbHVlTmFtZVwiID09PSB2YWx1ZVxuICAqL1xuICB0aGlzLmdldCA9IGZ1bmN0aW9uKHZhbHVlTmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgbWF0Y2hlZEl0ZW1zID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IHNlbGYuaXRlbXNbaV07XG4gICAgICBpZiAoaXRlbS52YWx1ZXMoKVt2YWx1ZU5hbWVdID09IHZhbHVlKSB7XG4gICAgICAgIG1hdGNoZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF0Y2hlZEl0ZW1zO1xuICB9O1xuXG4gIC8qXG4gICogR2V0IHNpemUgb2YgdGhlIGxpc3RcbiAgKi9cbiAgdGhpcy5zaXplID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHNlbGYuaXRlbXMubGVuZ3RoO1xuICB9O1xuXG4gIC8qXG4gICogUmVtb3ZlcyBhbGwgaXRlbXMgZnJvbSB0aGUgbGlzdFxuICAqL1xuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgc2VsZi50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICBzZWxmLml0ZW1zID0gW107XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHNlbGYuaGFuZGxlcnNbZXZlbnRdLnB1c2goY2FsbGJhY2spO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMub2ZmID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGUgPSBzZWxmLmhhbmRsZXJzW2V2ZW50XTtcbiAgICB2YXIgaW5kZXggPSBpbmRleE9mKGUsIGNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBpID0gc2VsZi5oYW5kbGVyc1tldmVudF0ubGVuZ3RoO1xuICAgIHdoaWxlKGktLSkge1xuICAgICAgc2VsZi5oYW5kbGVyc1tldmVudF1baV0oc2VsZik7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMucmVzZXQgPSB7XG4gICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG4gICAgICAgIGlsID0gaXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGlsLS0pIHtcbiAgICAgICAgaXNbaWxdLmZpbHRlcmVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9LFxuICAgIHNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuICAgICAgICBpbCA9IGlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpbC0tKSB7XG4gICAgICAgIGlzW2lsXS5mb3VuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcblx0XHRcdGlsID0gaXMubGVuZ3RoO1xuXG4gICAgc2VsZi52aXNpYmxlSXRlbXMgPSBbXTtcbiAgICBzZWxmLm1hdGNoaW5nSXRlbXMgPSBbXTtcbiAgICBzZWxmLnRlbXBsYXRlci5jbGVhcigpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWw7IGkrKykge1xuICAgICAgaWYgKGlzW2ldLm1hdGNoaW5nKCkgJiYgKChzZWxmLm1hdGNoaW5nSXRlbXMubGVuZ3RoKzEpID49IHNlbGYuaSAmJiBzZWxmLnZpc2libGVJdGVtcy5sZW5ndGggPCBzZWxmLnBhZ2UpKSB7XG4gICAgICAgIGlzW2ldLnNob3coKTtcbiAgICAgICAgc2VsZi52aXNpYmxlSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNbaV0ubWF0Y2hpbmcoKSkge1xuICAgICAgICBzZWxmLm1hdGNoaW5nSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICAgIGlzW2ldLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlzW2ldLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2VsZi50cmlnZ2VyKCd1cGRhdGVkJyk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgaW5pdC5zdGFydCgpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICByZXR1cm4gZnVuY3Rpb24oaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKSB7XG4gICAgdmFyIGl0ZW0gPSB0aGlzO1xuXG4gICAgdGhpcy5fdmFsdWVzID0ge307XG5cbiAgICB0aGlzLmZvdW5kID0gZmFsc2U7IC8vIFNob3cgaWYgbGlzdC5zZWFyY2hlZCA9PSB0cnVlIGFuZCB0aGlzLmZvdW5kID09IHRydWVcbiAgICB0aGlzLmZpbHRlcmVkID0gZmFsc2U7Ly8gU2hvdyBpZiBsaXN0LmZpbHRlcmVkID09IHRydWUgYW5kIHRoaXMuZmlsdGVyZWQgPT0gdHJ1ZVxuXG4gICAgdmFyIGluaXQgPSBmdW5jdGlvbihpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpIHtcbiAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG5vdENyZWF0ZSkge1xuICAgICAgICAgIGl0ZW0udmFsdWVzKGluaXRWYWx1ZXMsIG5vdENyZWF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS52YWx1ZXMoaW5pdFZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0uZWxtID0gZWxlbWVudDtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGxpc3QudGVtcGxhdGVyLmdldChpdGVtLCBpbml0VmFsdWVzKTtcbiAgICAgICAgaXRlbS52YWx1ZXModmFsdWVzKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy52YWx1ZXMgPSBmdW5jdGlvbihuZXdWYWx1ZXMsIG5vdENyZWF0ZSkge1xuICAgICAgaWYgKG5ld1ZhbHVlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGZvcih2YXIgbmFtZSBpbiBuZXdWYWx1ZXMpIHtcbiAgICAgICAgICBpdGVtLl92YWx1ZXNbbmFtZV0gPSBuZXdWYWx1ZXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdENyZWF0ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGxpc3QudGVtcGxhdGVyLnNldChpdGVtLCBpdGVtLnZhbHVlcygpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0uX3ZhbHVlcztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5zaG93ID0gZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnRlbXBsYXRlci5zaG93KGl0ZW0pO1xuICAgIH07XG5cbiAgICB0aGlzLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QudGVtcGxhdGVyLmhpZGUoaXRlbSk7XG4gICAgfTtcblxuICAgIHRoaXMubWF0Y2hpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIChsaXN0LmZpbHRlcmVkICYmIGxpc3Quc2VhcmNoZWQgJiYgaXRlbS5mb3VuZCAmJiBpdGVtLmZpbHRlcmVkKSB8fFxuICAgICAgICAobGlzdC5maWx0ZXJlZCAmJiAhbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZpbHRlcmVkKSB8fFxuICAgICAgICAoIWxpc3QuZmlsdGVyZWQgJiYgbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZvdW5kKSB8fFxuICAgICAgICAoIWxpc3QuZmlsdGVyZWQgJiYgIWxpc3Quc2VhcmNoZWQpXG4gICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLnZpc2libGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAoaXRlbS5lbG0gJiYgKGl0ZW0uZWxtLnBhcmVudE5vZGUgPT0gbGlzdC5saXN0KSkgPyB0cnVlIDogZmFsc2U7XG4gICAgfTtcblxuICAgIGluaXQoaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKTtcbiAgfTtcbn07XG4iLCJ2YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICBMaXN0ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgcmVmcmVzaCA9IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIG9wdGlvbnMpIHtcbiAgICB2YXIgaXRlbSxcbiAgICAgIGwgPSBsaXN0Lm1hdGNoaW5nSXRlbXMubGVuZ3RoLFxuICAgICAgaW5kZXggPSBsaXN0LmksXG4gICAgICBwYWdlID0gbGlzdC5wYWdlLFxuICAgICAgcGFnZXMgPSBNYXRoLmNlaWwobCAvIHBhZ2UpLFxuICAgICAgY3VycmVudFBhZ2UgPSBNYXRoLmNlaWwoKGluZGV4IC8gcGFnZSkpLFxuICAgICAgaW5uZXJXaW5kb3cgPSBvcHRpb25zLmlubmVyV2luZG93IHx8IDIsXG4gICAgICBsZWZ0ID0gb3B0aW9ucy5sZWZ0IHx8IG9wdGlvbnMub3V0ZXJXaW5kb3cgfHwgMCxcbiAgICAgIHJpZ2h0ID0gb3B0aW9ucy5yaWdodCB8fCBvcHRpb25zLm91dGVyV2luZG93IHx8IDA7XG5cbiAgICByaWdodCA9IHBhZ2VzIC0gcmlnaHQ7XG5cbiAgICBwYWdpbmdMaXN0LmNsZWFyKCk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gcGFnZXM7IGkrKykge1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IChjdXJyZW50UGFnZSA9PT0gaSkgPyBcImFjdGl2ZVwiIDogXCJcIjtcblxuICAgICAgLy9jb25zb2xlLmxvZyhpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIChjdXJyZW50UGFnZSAtIGlubmVyV2luZG93KSwgKGN1cnJlbnRQYWdlICsgaW5uZXJXaW5kb3cpLCBjbGFzc05hbWUpO1xuXG4gICAgICBpZiAoaXMubnVtYmVyKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpKSB7XG4gICAgICAgIGl0ZW0gPSBwYWdpbmdMaXN0LmFkZCh7XG4gICAgICAgICAgcGFnZTogaSxcbiAgICAgICAgICBkb3R0ZWQ6IGZhbHNlXG4gICAgICAgIH0pWzBdO1xuICAgICAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgY2xhc3NlcyhpdGVtLmVsbSkuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkRXZlbnQoaXRlbS5lbG0sIGksIHBhZ2UpO1xuICAgICAgfSBlbHNlIGlmIChpcy5kb3R0ZWQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgcGFnaW5nTGlzdC5zaXplKCkpKSB7XG4gICAgICAgIGl0ZW0gPSBwYWdpbmdMaXN0LmFkZCh7XG4gICAgICAgICAgcGFnZTogXCIuLi5cIixcbiAgICAgICAgICBkb3R0ZWQ6IHRydWVcbiAgICAgICAgfSlbMF07XG4gICAgICAgIGNsYXNzZXMoaXRlbS5lbG0pLmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgaXMgPSB7XG4gICAgbnVtYmVyOiBmdW5jdGlvbihpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICAgcmV0dXJuIHRoaXMubGVmdChpLCBsZWZ0KSB8fCB0aGlzLnJpZ2h0KGksIHJpZ2h0KSB8fCB0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdyk7XG4gICAgfSxcbiAgICBsZWZ0OiBmdW5jdGlvbihpLCBsZWZ0KSB7XG4gICAgICByZXR1cm4gKGkgPD0gbGVmdCk7XG4gICAgfSxcbiAgICByaWdodDogZnVuY3Rpb24oaSwgcmlnaHQpIHtcbiAgICAgIHJldHVybiAoaSA+IHJpZ2h0KTtcbiAgICB9LFxuICAgIGlubmVyV2luZG93OiBmdW5jdGlvbihpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgIHJldHVybiAoIGkgPj0gKGN1cnJlbnRQYWdlIC0gaW5uZXJXaW5kb3cpICYmIGkgPD0gKGN1cnJlbnRQYWdlICsgaW5uZXJXaW5kb3cpKTtcbiAgICB9LFxuICAgIGRvdHRlZDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5kb3R0ZWRMZWZ0KHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHx8ICh0aGlzLmRvdHRlZFJpZ2h0KHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkpO1xuICAgIH0sXG4gICAgZG90dGVkTGVmdDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgcmV0dXJuICgoaSA9PSAobGVmdCArIDEpKSAmJiAhdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpICYmICF0aGlzLnJpZ2h0KGksIHJpZ2h0KSk7XG4gICAgfSxcbiAgICBkb3R0ZWRSaWdodDogZnVuY3Rpb24ocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSB7XG4gICAgICBpZiAocGFnaW5nTGlzdC5pdGVtc1tjdXJyZW50UGFnZUl0ZW0tMV0udmFsdWVzKCkuZG90dGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoKGkgPT0gKHJpZ2h0KSkgJiYgIXRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSAmJiAhdGhpcy5yaWdodChpLCByaWdodCkpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgYWRkRXZlbnQgPSBmdW5jdGlvbihlbG0sIGksIHBhZ2UpIHtcbiAgICAgZXZlbnRzLmJpbmQoZWxtLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICBsaXN0LnNob3coKGktMSkqcGFnZSArIDEsIHBhZ2UpO1xuICAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBwYWdpbmdMaXN0ID0gbmV3IExpc3QobGlzdC5saXN0Q29udGFpbmVyLmlkLCB7XG4gICAgICBsaXN0Q2xhc3M6IG9wdGlvbnMucGFnaW5hdGlvbkNsYXNzIHx8ICdwYWdpbmF0aW9uJyxcbiAgICAgIGl0ZW06IFwiPGxpPjxhIGNsYXNzPSdwYWdlJyBocmVmPSdqYXZhc2NyaXB0OmZ1bmN0aW9uIFooKXtaPVxcXCJcXFwifVooKSc+PC9hPjwvbGk+XCIsXG4gICAgICB2YWx1ZU5hbWVzOiBbJ3BhZ2UnLCAnZG90dGVkJ10sXG4gICAgICBzZWFyY2hDbGFzczogJ3BhZ2luYXRpb24tc2VhcmNoLXRoYXQtaXMtbm90LXN1cHBvc2VkLXRvLWV4aXN0JyxcbiAgICAgIHNvcnRDbGFzczogJ3BhZ2luYXRpb24tc29ydC10aGF0LWlzLW5vdC1zdXBwb3NlZC10by1leGlzdCdcbiAgICB9KTtcblxuICAgIGxpc3Qub24oJ3VwZGF0ZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHJlZnJlc2gocGFnaW5nTGlzdCwgb3B0aW9ucyk7XG4gICAgfSk7XG4gICAgcmVmcmVzaChwYWdpbmdMaXN0LCBvcHRpb25zKTtcbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgSXRlbSA9IHJlcXVpcmUoJy4vaXRlbScpKGxpc3QpO1xuXG4gIHZhciBnZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBub2RlcyA9IHBhcmVudC5jaGlsZE5vZGVzLFxuICAgICAgaXRlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBub2Rlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAvLyBPbmx5IHRleHRub2RlcyBoYXZlIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgIGlmIChub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaXRlbXMucHVzaChub2Rlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbiAgfTtcblxuICB2YXIgcGFyc2UgPSBmdW5jdGlvbihpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBpdGVtRWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGlzdC5pdGVtcy5wdXNoKG5ldyBJdGVtKHZhbHVlTmFtZXMsIGl0ZW1FbGVtZW50c1tpXSkpO1xuICAgIH1cbiAgfTtcbiAgdmFyIHBhcnNlQXN5bmMgPSBmdW5jdGlvbihpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpIHtcbiAgICB2YXIgaXRlbXNUb0luZGV4ID0gaXRlbUVsZW1lbnRzLnNwbGljZSgwLCA1MCk7IC8vIFRPRE86IElmIDwgMTAwIGl0ZW1zLCB3aGF0IGhhcHBlbnMgaW4gSUUgZXRjP1xuICAgIHBhcnNlKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgaWYgKGl0ZW1FbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXJzZUFzeW5jKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcyk7XG4gICAgICB9LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC51cGRhdGUoKTtcbiAgICAgIGxpc3QudHJpZ2dlcigncGFyc2VDb21wbGV0ZScpO1xuICAgIH1cbiAgfTtcblxuICBsaXN0LmhhbmRsZXJzLnBhcnNlQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnBhcnNlQ29tcGxldGUgfHwgW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtc1RvSW5kZXggPSBnZXRDaGlsZHJlbihsaXN0Lmxpc3QpLFxuICAgICAgdmFsdWVOYW1lcyA9IGxpc3QudmFsdWVOYW1lcztcblxuICAgIGlmIChsaXN0LmluZGV4QXN5bmMpIHtcbiAgICAgIHBhcnNlQXN5bmMoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2UoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICB9XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBpdGVtLFxuICAgIHRleHQsXG4gICAgY29sdW1ucyxcbiAgICBzZWFyY2hTdHJpbmcsXG4gICAgY3VzdG9tU2VhcmNoO1xuXG4gIHZhciBwcmVwYXJlID0ge1xuICAgIHJlc2V0TGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LmkgPSAxO1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICAgIGN1c3RvbVNlYXJjaCA9IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA9PSAyICYmIGFyZ3NbMV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBjb2x1bW5zID0gYXJnc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMiAmJiB0eXBlb2YoYXJnc1sxXSkgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGN1c3RvbVNlYXJjaCA9IGFyZ3NbMV07XG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDMpIHtcbiAgICAgICAgY29sdW1ucyA9IGFyZ3NbMV07XG4gICAgICAgIGN1c3RvbVNlYXJjaCA9IGFyZ3NbMl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0Q29sdW1uczogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAobGlzdC5pdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGlmIChjb2x1bW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1ucyA9IChsaXN0LnNlYXJjaENvbHVtbnMgPT09IHVuZGVmaW5lZCkgPyBwcmVwYXJlLnRvQXJyYXkobGlzdC5pdGVtc1swXS52YWx1ZXMoKSkgOiBsaXN0LnNlYXJjaENvbHVtbnM7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTZWFyY2hTdHJpbmc6IGZ1bmN0aW9uKHMpIHtcbiAgICAgIHMgPSBsaXN0LnV0aWxzLnRvU3RyaW5nKHMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBzID0gcy5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I10vZywgXCJcXFxcJCZcIik7IC8vIEVzY2FwZSByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVyc1xuICAgICAgc2VhcmNoU3RyaW5nID0gcztcbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIHRtcENvbHVtbiA9IFtdO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB2YWx1ZXMpIHtcbiAgICAgICAgdG1wQ29sdW1uLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG1wQ29sdW1uO1xuICAgIH1cbiAgfTtcbiAgdmFyIHNlYXJjaCA9IHtcbiAgICBsaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwLCBrbCA9IGxpc3QuaXRlbXMubGVuZ3RoOyBrIDwga2w7IGsrKykge1xuICAgICAgICBzZWFyY2guaXRlbShsaXN0Lml0ZW1zW2tdKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGl0ZW0uZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGNvbHVtbnMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICBpZiAoc2VhcmNoLnZhbHVlcyhpdGVtLnZhbHVlcygpLCBjb2x1bW5zW2pdKSkge1xuICAgICAgICAgIGl0ZW0uZm91bmQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbih2YWx1ZXMsIGNvbHVtbikge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eShjb2x1bW4pKSB7XG4gICAgICAgIHRleHQgPSBsaXN0LnV0aWxzLnRvU3RyaW5nKHZhbHVlc1tjb2x1bW5dKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoKHNlYXJjaFN0cmluZyAhPT0gXCJcIikgJiYgKHRleHQuc2VhcmNoKHNlYXJjaFN0cmluZykgPiAtMSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5yZXNldC5zZWFyY2goKTtcbiAgICAgIGxpc3Quc2VhcmNoZWQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNlYXJjaE1ldGhvZCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGxpc3QudHJpZ2dlcignc2VhcmNoU3RhcnQnKTtcblxuICAgIHByZXBhcmUucmVzZXRMaXN0KCk7XG4gICAgcHJlcGFyZS5zZXRTZWFyY2hTdHJpbmcoc3RyKTtcbiAgICBwcmVwYXJlLnNldE9wdGlvbnMoYXJndW1lbnRzKTsgLy8gc3RyLCBjb2xzfHNlYXJjaEZ1bmN0aW9uLCBzZWFyY2hGdW5jdGlvblxuICAgIHByZXBhcmUuc2V0Q29sdW1ucygpO1xuXG4gICAgaWYgKHNlYXJjaFN0cmluZyA9PT0gXCJcIiApIHtcbiAgICAgIHNlYXJjaC5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNlYXJjaGVkID0gdHJ1ZTtcbiAgICAgIGlmIChjdXN0b21TZWFyY2gpIHtcbiAgICAgICAgY3VzdG9tU2VhcmNoKHNlYXJjaFN0cmluZywgY29sdW1ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2gubGlzdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdzZWFyY2hDb21wbGV0ZScpO1xuICAgIHJldHVybiBsaXN0LnZpc2libGVJdGVtcztcbiAgfTtcblxuICBsaXN0LmhhbmRsZXJzLnNlYXJjaFN0YXJ0ID0gbGlzdC5oYW5kbGVycy5zZWFyY2hTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5zZWFyY2hDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuc2VhcmNoQ29tcGxldGUgfHwgW107XG5cbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNlYXJjaENsYXNzKSwgJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsIC8vIElFIGhhdmUgc3JjRWxlbWVudFxuICAgICAgYWxyZWFkeUNsZWFyZWQgPSAodGFyZ2V0LnZhbHVlID09PSBcIlwiICYmICFsaXN0LnNlYXJjaGVkKTtcbiAgICBpZiAoIWFscmVhZHlDbGVhcmVkKSB7IC8vIElmIG9uaW5wdXQgYWxyZWFkeSBoYXZlIHJlc2V0dGVkIHRoZSBsaXN0LCBkbyBub3RoaW5nXG4gICAgICBzZWFyY2hNZXRob2QodGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFVzZWQgdG8gZGV0ZWN0IGNsaWNrIG9uIEhUTUw1IGNsZWFyIGJ1dHRvblxuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc2VhcmNoQ2xhc3MpLCAnaW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBpZiAodGFyZ2V0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBzZWFyY2hNZXRob2QoJycpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHNlYXJjaE1ldGhvZDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgYnV0dG9ucyA9IHtcbiAgICBlbHM6IHVuZGVmaW5lZCxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBidXR0b25zLmVscy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidXR0b25zLmVsc1tpXSkucmVtb3ZlKCdhc2MnKTtcbiAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ1dHRvbnMuZWxzW2ldKS5yZW1vdmUoJ2Rlc2MnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldE9yZGVyOiBmdW5jdGlvbihidG4pIHtcbiAgICAgIHZhciBwcmVkZWZpbmVkT3JkZXIgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLW9yZGVyJyk7XG4gICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IFwiYXNjXCIgfHwgcHJlZGVmaW5lZE9yZGVyID09IFwiZGVzY1wiKSB7XG4gICAgICAgIHJldHVybiBwcmVkZWZpbmVkT3JkZXI7XG4gICAgICB9IGVsc2UgaWYgKGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmhhcygnZGVzYycpKSB7XG4gICAgICAgIHJldHVybiBcImFzY1wiO1xuICAgICAgfSBlbHNlIGlmIChsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5oYXMoJ2FzYycpKSB7XG4gICAgICAgIHJldHVybiBcImRlc2NcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImFzY1wiO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SW5TZW5zaXRpdmU6IGZ1bmN0aW9uKGJ0biwgb3B0aW9ucykge1xuICAgICAgdmFyIGluc2Vuc2l0aXZlID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1pbnNlbnNpdGl2ZScpO1xuICAgICAgaWYgKGluc2Vuc2l0aXZlID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRPcmRlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYnV0dG9ucy5lbHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICB2YXIgYnRuID0gYnV0dG9ucy5lbHNbaV07XG4gICAgICAgIGlmIChsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLXNvcnQnKSAhPT0gb3B0aW9ucy52YWx1ZU5hbWUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJlZGVmaW5lZE9yZGVyID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1vcmRlcicpO1xuICAgICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IFwiYXNjXCIgfHwgcHJlZGVmaW5lZE9yZGVyID09IFwiZGVzY1wiKSB7XG4gICAgICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBvcHRpb25zLm9yZGVyKSB7XG4gICAgICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5hZGQob3B0aW9ucy5vcmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmFkZChvcHRpb25zLm9yZGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgc29ydCA9IGZ1bmN0aW9uKCkge1xuICAgIGxpc3QudHJpZ2dlcignc29ydFN0YXJ0Jyk7XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcblxuICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF0uY3VycmVudFRhcmdldCB8fCBhcmd1bWVudHNbMF0uc3JjRWxlbWVudCB8fCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICBvcHRpb25zLnZhbHVlTmFtZSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKHRhcmdldCwgJ2RhdGEtc29ydCcpO1xuICAgICAgYnV0dG9ucy5nZXRJblNlbnNpdGl2ZSh0YXJnZXQsIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5vcmRlciA9IGJ1dHRvbnMuZ2V0T3JkZXIodGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXSB8fCBvcHRpb25zO1xuICAgICAgb3B0aW9ucy52YWx1ZU5hbWUgPSBhcmd1bWVudHNbMF07XG4gICAgICBvcHRpb25zLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCBcImFzY1wiO1xuICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9ICh0eXBlb2Ygb3B0aW9ucy5pbnNlbnNpdGl2ZSA9PSBcInVuZGVmaW5lZFwiKSA/IHRydWUgOiBvcHRpb25zLmluc2Vuc2l0aXZlO1xuICAgIH1cblxuICAgIGJ1dHRvbnMuY2xlYXIoKTtcbiAgICBidXR0b25zLnNldE9yZGVyKG9wdGlvbnMpO1xuXG5cbiAgICAvLyBjYXNlSW5zZW5zaXRpdmVcbiAgICAvLyBhbHBoYWJldFxuICAgIHZhciBjdXN0b21Tb3J0RnVuY3Rpb24gPSAob3B0aW9ucy5zb3J0RnVuY3Rpb24gfHwgbGlzdC5zb3J0RnVuY3Rpb24gfHwgbnVsbCksXG4gICAgICAgIG11bHRpID0gKChvcHRpb25zLm9yZGVyID09PSAnZGVzYycpID8gLTEgOiAxKSxcbiAgICAgICAgc29ydEZ1bmN0aW9uO1xuXG4gICAgaWYgKGN1c3RvbVNvcnRGdW5jdGlvbikge1xuICAgICAgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIHJldHVybiBjdXN0b21Tb3J0RnVuY3Rpb24oaXRlbUEsIGl0ZW1CLCBvcHRpb25zKSAqIG11bHRpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIHZhciBzb3J0ID0gbGlzdC51dGlscy5uYXR1cmFsU29ydDtcbiAgICAgICAgc29ydC5hbHBoYWJldCA9IGxpc3QuYWxwaGFiZXQgfHwgb3B0aW9ucy5hbHBoYWJldCB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghc29ydC5hbHBoYWJldCAmJiBvcHRpb25zLmluc2Vuc2l0aXZlKSB7XG4gICAgICAgICAgc29ydCA9IGxpc3QudXRpbHMubmF0dXJhbFNvcnQuY2FzZUluc2Vuc2l0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3J0KGl0ZW1BLnZhbHVlcygpW29wdGlvbnMudmFsdWVOYW1lXSwgaXRlbUIudmFsdWVzKClbb3B0aW9ucy52YWx1ZU5hbWVdKSAqIG11bHRpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBsaXN0Lml0ZW1zLnNvcnQoc29ydEZ1bmN0aW9uKTtcbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignc29ydENvbXBsZXRlJyk7XG4gIH07XG5cbiAgLy8gQWRkIGhhbmRsZXJzXG4gIGxpc3QuaGFuZGxlcnMuc29ydFN0YXJ0ID0gbGlzdC5oYW5kbGVycy5zb3J0U3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuc29ydENvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5zb3J0Q29tcGxldGUgfHwgW107XG5cbiAgYnV0dG9ucy5lbHMgPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNvcnRDbGFzcyk7XG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQoYnV0dG9ucy5lbHMsICdjbGljaycsIHNvcnQpO1xuICBsaXN0Lm9uKCdzZWFyY2hTdGFydCcsIGJ1dHRvbnMuY2xlYXIpO1xuICBsaXN0Lm9uKCdmaWx0ZXJTdGFydCcsIGJ1dHRvbnMuY2xlYXIpO1xuXG4gIHJldHVybiBzb3J0O1xufTtcbiIsInZhciBUZW1wbGF0ZXIgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBpdGVtU291cmNlLFxuICAgIHRlbXBsYXRlciA9IHRoaXM7XG5cbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBpdGVtU291cmNlID0gdGVtcGxhdGVyLmdldEl0ZW1Tb3VyY2UobGlzdC5pdGVtKTtcbiAgICBpZiAoaXRlbVNvdXJjZSkge1xuICAgICAgaXRlbVNvdXJjZSA9IHRlbXBsYXRlci5jbGVhclNvdXJjZUl0ZW0oaXRlbVNvdXJjZSwgbGlzdC52YWx1ZU5hbWVzKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jbGVhclNvdXJjZUl0ZW0gPSBmdW5jdGlvbihlbCwgdmFsdWVOYW1lcykge1xuICAgIGZvcih2YXIgaSA9IDAsIGlsID0gdmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgaWYgKHZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSB2YWx1ZU5hbWVzW2ldLmRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS0nK3ZhbHVlTmFtZXNbaV0uZGF0YVtqXSwgJycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZXNbaV0uYXR0ciAmJiB2YWx1ZU5hbWVzW2ldLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGVsLCB2YWx1ZU5hbWVzW2ldLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSh2YWx1ZU5hbWVzW2ldLmF0dHIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoZWwsIHZhbHVlTmFtZXNbaV0sIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIHRoaXMuZ2V0SXRlbVNvdXJjZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgbm9kZXMgPSBsaXN0Lmxpc3QuY2hpbGROb2RlcyxcbiAgICAgICAgaXRlbXMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbm9kZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAvLyBPbmx5IHRleHRub2RlcyBoYXZlIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgaWYgKG5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC88dHJbXFxzPl0vZy5leGVjKGl0ZW0pKSB7XG4gICAgICB2YXIgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgdGJvZHkuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgIHJldHVybiB0Ym9keS5maXJzdENoaWxkO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pbmRleE9mKFwiPFwiKSAhPT0gLTEpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdENoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc291cmNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGlzdC5pdGVtKTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICB0aGlzLmdldCA9IGZ1bmN0aW9uKGl0ZW0sIHZhbHVlTmFtZXMpIHtcbiAgICB0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pO1xuICAgIHZhciB2YWx1ZXMgPSB7fTtcbiAgICBmb3IodmFyIGkgPSAwLCBpbCA9IHZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIGlmICh2YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gdmFsdWVOYW1lc1tpXS5kYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXS5kYXRhW2pdXSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGl0ZW0uZWxtLCAnZGF0YS0nK3ZhbHVlTmFtZXNbaV0uZGF0YVtqXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lc1tpXS5hdHRyICYmIHZhbHVlTmFtZXNbaV0ubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZXNbaV0ubmFtZSwgdHJ1ZSk7XG4gICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldLm5hbWVdID0gZWxtID8gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoZWxtLCB2YWx1ZU5hbWVzW2ldLmF0dHIpIDogXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lc1tpXSwgdHJ1ZSk7XG4gICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldXSA9IGVsbSA/IGVsbS5pbm5lckhUTUwgOiBcIlwiO1xuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIHRoaXMuc2V0ID0gZnVuY3Rpb24oaXRlbSwgdmFsdWVzKSB7XG4gICAgdmFyIGdldFZhbHVlTmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGxpc3QudmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICAgIHZhciBkYXRhID0gbGlzdC52YWx1ZU5hbWVzW2ldLmRhdGE7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtqXSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBuYW1lIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGxpc3QudmFsdWVOYW1lc1tpXS5hdHRyICYmIGxpc3QudmFsdWVOYW1lc1tpXS5uYW1lICYmIGxpc3QudmFsdWVOYW1lc1tpXS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdC52YWx1ZU5hbWVzW2ldO1xuICAgICAgICB9IGVsc2UgaWYgKGxpc3QudmFsdWVOYW1lc1tpXSA9PT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0VmFsdWUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIHZhciB2YWx1ZU5hbWUgPSBnZXRWYWx1ZU5hbWUobmFtZSk7XG4gICAgICBpZiAoIXZhbHVlTmFtZSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgaWYgKHZhbHVlTmFtZS5kYXRhKSB7XG4gICAgICAgIGl0ZW0uZWxtLnNldEF0dHJpYnV0ZSgnZGF0YS0nK3ZhbHVlTmFtZS5kYXRhLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZS5hdHRyICYmIHZhbHVlTmFtZS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSh2YWx1ZU5hbWUuYXR0ciwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIGlmICghdGVtcGxhdGVyLmNyZWF0ZShpdGVtKSkge1xuICAgICAgZm9yKHZhciB2IGluIHZhbHVlcykge1xuICAgICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KHYpKSB7XG4gICAgICAgICAgc2V0VmFsdWUodiwgdmFsdWVzW3ZdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXRlbVNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgbGlzdCBuZWVkIHRvIGhhdmUgYXQgbGlzdCBvbmUgaXRlbSBvbiBpbml0IG90aGVyd2lzZSB5b3UnbGwgaGF2ZSB0byBhZGQgYSB0ZW1wbGF0ZS5cIik7XG4gICAgfVxuICAgIC8qIElmIGl0ZW0gc291cmNlIGRvZXMgbm90IGV4aXN0cywgdXNlIHRoZSBmaXJzdCBpdGVtIGluIGxpc3QgYXNcbiAgICBzb3VyY2UgZm9yIG5ldyBpdGVtcyAqL1xuICAgIHZhciBuZXdJdGVtID0gaXRlbVNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgbmV3SXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaXRlbS5lbG0gPSBuZXdJdGVtO1xuICAgIHRlbXBsYXRlci5zZXQoaXRlbSwgaXRlbS52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbS5wYXJlbnROb2RlID09PSBsaXN0Lmxpc3QpIHtcbiAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChpdGVtLmVsbSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNob3cgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgdGVtcGxhdGVyLmNyZWF0ZShpdGVtKTtcbiAgICBsaXN0Lmxpc3QuYXBwZW5kQ2hpbGQoaXRlbS5lbG0pO1xuICB9O1xuICB0aGlzLmhpZGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtICE9PSB1bmRlZmluZWQgJiYgaXRlbS5lbG0ucGFyZW50Tm9kZSA9PT0gbGlzdC5saXN0KSB7XG4gICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQoaXRlbS5lbG0pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIC8qIC5pbm5lckhUTUwgPSAnJzsgZnVja3MgdXAgSUUgKi9cbiAgICBpZiAobGlzdC5saXN0Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgd2hpbGUgKGxpc3QubGlzdC5jaGlsZE5vZGVzLmxlbmd0aCA+PSAxKVxuICAgICAge1xuICAgICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQobGlzdC5saXN0LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBpbml0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgcmV0dXJuIG5ldyBUZW1wbGF0ZXIobGlzdCk7XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBpbmRleCA9IHJlcXVpcmUoJy4vaW5kZXgtb2YnKTtcblxuLyoqXG4gKiBXaGl0ZXNwYWNlIHJlZ2V4cC5cbiAqL1xuXG52YXIgcmUgPSAvXFxzKy87XG5cbi8qKlxuICogdG9TdHJpbmcgcmVmZXJlbmNlLlxuICovXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogV3JhcCBgZWxgIGluIGEgYENsYXNzTGlzdGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsKXtcbiAgcmV0dXJuIG5ldyBDbGFzc0xpc3QoZWwpO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IENsYXNzTGlzdCBmb3IgYGVsYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBDbGFzc0xpc3QoZWwpIHtcbiAgaWYgKCFlbCB8fCAhZWwubm9kZVR5cGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgRE9NIGVsZW1lbnQgcmVmZXJlbmNlIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgdGhpcy5lbCA9IGVsO1xuICB0aGlzLmxpc3QgPSBlbC5jbGFzc0xpc3Q7XG59XG5cbi8qKlxuICogQWRkIGNsYXNzIGBuYW1lYCBpZiBub3QgYWxyZWFkeSBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24obmFtZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgdGhpcy5saXN0LmFkZChuYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSB0aGlzLmFycmF5KCk7XG4gIHZhciBpID0gaW5kZXgoYXJyLCBuYW1lKTtcbiAgaWYgKCF+aSkgYXJyLnB1c2gobmFtZSk7XG4gIHRoaXMuZWwuY2xhc3NOYW1lID0gYXJyLmpvaW4oJyAnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBjbGFzcyBgbmFtZWAgd2hlbiBwcmVzZW50LCBvclxuICogcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byByZW1vdmVcbiAqIGFueSB3aGljaCBtYXRjaC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihuYW1lKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICB0aGlzLmxpc3QucmVtb3ZlKG5hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAofmkpIGFyci5zcGxpY2UoaSwgMSk7XG4gIHRoaXMuZWwuY2xhc3NOYW1lID0gYXJyLmpvaW4oJyAnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5cbi8qKlxuICogVG9nZ2xlIGNsYXNzIGBuYW1lYCwgY2FuIGZvcmNlIHN0YXRlIHZpYSBgZm9yY2VgLlxuICpcbiAqIEZvciBicm93c2VycyB0aGF0IHN1cHBvcnQgY2xhc3NMaXN0LCBidXQgZG8gbm90IHN1cHBvcnQgYGZvcmNlYCB5ZXQsXG4gKiB0aGUgbWlzdGFrZSB3aWxsIGJlIGRldGVjdGVkIGFuZCBjb3JyZWN0ZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZm9yY2VcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbihuYW1lLCBmb3JjZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBmb3JjZSkge1xuICAgICAgaWYgKGZvcmNlICE9PSB0aGlzLmxpc3QudG9nZ2xlKG5hbWUsIGZvcmNlKSkge1xuICAgICAgICB0aGlzLmxpc3QudG9nZ2xlKG5hbWUpOyAvLyB0b2dnbGUgYWdhaW4gdG8gY29ycmVjdFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxpc3QudG9nZ2xlKG5hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgZm9yY2UpIHtcbiAgICBpZiAoIWZvcmNlKSB7XG4gICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQobmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh0aGlzLmhhcyhuYW1lKSkge1xuICAgICAgdGhpcy5yZW1vdmUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgb2YgY2xhc3Nlcy5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5hcnJheSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBjbGFzc05hbWUgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJztcbiAgdmFyIHN0ciA9IGNsYXNzTmFtZS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gIHZhciBhcnIgPSBzdHIuc3BsaXQocmUpO1xuICBpZiAoJycgPT09IGFyclswXSkgYXJyLnNoaWZ0KCk7XG4gIHJldHVybiBhcnI7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGNsYXNzIGBuYW1lYCBpcyBwcmVzZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuaGFzID1cbkNsYXNzTGlzdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHRoaXMubGlzdCA/IHRoaXMubGlzdC5jb250YWlucyhuYW1lKSA6ICEhIH5pbmRleCh0aGlzLmFycmF5KCksIG5hbWUpO1xufTtcbiIsInZhciBiaW5kID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAnYXR0YWNoRXZlbnQnLFxuICAgIHVuYmluZCA9IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2RldGFjaEV2ZW50JyxcbiAgICBwcmVmaXggPSBiaW5kICE9PSAnYWRkRXZlbnRMaXN0ZW5lcicgPyAnb24nIDogJycsXG4gICAgdG9BcnJheSA9IHJlcXVpcmUoJy4vdG8tYXJyYXknKTtcblxuLyoqXG4gKiBCaW5kIGBlbGAgZXZlbnQgYHR5cGVgIHRvIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbCwgTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uIG9yIEFycmF5XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FwdHVyZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBlbCA9IHRvQXJyYXkoZWwpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKyApIHtcbiAgICBlbFtpXVtiaW5kXShwcmVmaXggKyB0eXBlLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG4gIH1cbn07XG5cbi8qKlxuICogVW5iaW5kIGBlbGAgZXZlbnQgYHR5cGVgJ3MgY2FsbGJhY2sgYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsLCBOb2RlTGlzdCwgSFRNTENvbGxlY3Rpb24gb3IgQXJyYXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudW5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWwgPSB0b0FycmF5KGVsKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKysgKSB7XG4gICAgZWxbaV1bdW5iaW5kXShwcmVmaXggKyB0eXBlLCBmbiwgY2FwdHVyZSB8fCBmYWxzZSk7XG4gIH1cbn07XG4iLCIvKlxuICogU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vc2VnbWVudGlvL2V4dGVuZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXh0ZW5kIChvYmplY3QpIHtcbiAgICAvLyBUYWtlcyBhbiB1bmxpbWl0ZWQgbnVtYmVyIG9mIGV4dGVuZGVycy5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICAvLyBGb3IgZWFjaCBleHRlbmRlciwgY29weSB0aGVpciBwcm9wZXJ0aWVzIG9uIG91ciBvYmplY3QuXG4gICAgZm9yICh2YXIgaSA9IDAsIHNvdXJjZTsgc291cmNlID0gYXJnc1tpXTsgaSsrKSB7XG4gICAgICAgIGlmICghc291cmNlKSBjb250aW51ZTtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBvYmplY3RbcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0ZXh0LCBwYXR0ZXJuLCBvcHRpb25zKSB7XG4gICAgLy8gQXByb3hpbWF0ZWx5IHdoZXJlIGluIHRoZSB0ZXh0IGlzIHRoZSBwYXR0ZXJuIGV4cGVjdGVkIHRvIGJlIGZvdW5kP1xuICAgIHZhciBNYXRjaF9Mb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gfHwgMDtcblxuICAgIC8vRGV0ZXJtaW5lcyBob3cgY2xvc2UgdGhlIG1hdGNoIG11c3QgYmUgdG8gdGhlIGZ1enp5IGxvY2F0aW9uIChzcGVjaWZpZWQgYWJvdmUpLiBBbiBleGFjdCBsZXR0ZXIgbWF0Y2ggd2hpY2ggaXMgJ2Rpc3RhbmNlJyBjaGFyYWN0ZXJzIGF3YXkgZnJvbSB0aGUgZnV6enkgbG9jYXRpb24gd291bGQgc2NvcmUgYXMgYSBjb21wbGV0ZSBtaXNtYXRjaC4gQSBkaXN0YW5jZSBvZiAnMCcgcmVxdWlyZXMgdGhlIG1hdGNoIGJlIGF0IHRoZSBleGFjdCBsb2NhdGlvbiBzcGVjaWZpZWQsIGEgdGhyZXNob2xkIG9mICcxMDAwJyB3b3VsZCByZXF1aXJlIGEgcGVyZmVjdCBtYXRjaCB0byBiZSB3aXRoaW4gODAwIGNoYXJhY3RlcnMgb2YgdGhlIGZ1enp5IGxvY2F0aW9uIHRvIGJlIGZvdW5kIHVzaW5nIGEgMC44IHRocmVzaG9sZC5cbiAgICB2YXIgTWF0Y2hfRGlzdGFuY2UgPSBvcHRpb25zLmRpc3RhbmNlIHx8IDEwMDtcblxuICAgIC8vIEF0IHdoYXQgcG9pbnQgZG9lcyB0aGUgbWF0Y2ggYWxnb3JpdGhtIGdpdmUgdXAuIEEgdGhyZXNob2xkIG9mICcwLjAnIHJlcXVpcmVzIGEgcGVyZmVjdCBtYXRjaCAob2YgYm90aCBsZXR0ZXJzIGFuZCBsb2NhdGlvbiksIGEgdGhyZXNob2xkIG9mICcxLjAnIHdvdWxkIG1hdGNoIGFueXRoaW5nLlxuICAgIHZhciBNYXRjaF9UaHJlc2hvbGQgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAwLjQ7XG5cbiAgICBpZiAocGF0dGVybiA9PT0gdGV4dCkgcmV0dXJuIHRydWU7IC8vIEV4YWN0IG1hdGNoXG4gICAgaWYgKHBhdHRlcm4ubGVuZ3RoID4gMzIpIHJldHVybiBmYWxzZTsgLy8gVGhpcyBhbGdvcml0aG0gY2Fubm90IGJlIHVzZWRcblxuICAgIC8vIFNldCBzdGFydGluZyBsb2NhdGlvbiBhdCBiZWdpbm5pbmcgdGV4dCBhbmQgaW5pdGlhbGlzZSB0aGUgYWxwaGFiZXQuXG4gICAgdmFyIGxvYyA9IE1hdGNoX0xvY2F0aW9uLFxuICAgICAgICBzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHEgPSB7fSxcbiAgICAgICAgICAgICAgICBpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHFbcGF0dGVybi5jaGFyQXQoaSldID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBxW3BhdHRlcm4uY2hhckF0KGkpXSB8PSAxIDw8IChwYXR0ZXJuLmxlbmd0aCAtIGkgLSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHE7XG4gICAgICAgIH0oKSk7XG5cbiAgICAvLyBDb21wdXRlIGFuZCByZXR1cm4gdGhlIHNjb3JlIGZvciBhIG1hdGNoIHdpdGggZSBlcnJvcnMgYW5kIHggbG9jYXRpb24uXG4gICAgLy8gQWNjZXNzZXMgbG9jIGFuZCBwYXR0ZXJuIHRocm91Z2ggYmVpbmcgYSBjbG9zdXJlLlxuXG4gICAgZnVuY3Rpb24gbWF0Y2hfYml0YXBTY29yZV8oZSwgeCkge1xuICAgICAgICB2YXIgYWNjdXJhY3kgPSBlIC8gcGF0dGVybi5sZW5ndGgsXG4gICAgICAgICAgICBwcm94aW1pdHkgPSBNYXRoLmFicyhsb2MgLSB4KTtcblxuICAgICAgICBpZiAoIU1hdGNoX0Rpc3RhbmNlKSB7XG4gICAgICAgICAgICAvLyBEb2RnZSBkaXZpZGUgYnkgemVybyBlcnJvci5cbiAgICAgICAgICAgIHJldHVybiBwcm94aW1pdHkgPyAxLjAgOiBhY2N1cmFjeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdXJhY3kgKyAocHJveGltaXR5IC8gTWF0Y2hfRGlzdGFuY2UpO1xuICAgIH1cblxuICAgIHZhciBzY29yZV90aHJlc2hvbGQgPSBNYXRjaF9UaHJlc2hvbGQsIC8vIEhpZ2hlc3Qgc2NvcmUgYmV5b25kIHdoaWNoIHdlIGdpdmUgdXAuXG4gICAgICAgIGJlc3RfbG9jID0gdGV4dC5pbmRleE9mKHBhdHRlcm4sIGxvYyk7IC8vIElzIHRoZXJlIGEgbmVhcmJ5IGV4YWN0IG1hdGNoPyAoc3BlZWR1cClcblxuICAgIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBNYXRoLm1pbihtYXRjaF9iaXRhcFNjb3JlXygwLCBiZXN0X2xvYyksIHNjb3JlX3RocmVzaG9sZCk7XG4gICAgICAgIC8vIFdoYXQgYWJvdXQgaW4gdGhlIG90aGVyIGRpcmVjdGlvbj8gKHNwZWVkdXApXG4gICAgICAgIGJlc3RfbG9jID0gdGV4dC5sYXN0SW5kZXhPZihwYXR0ZXJuLCBsb2MgKyBwYXR0ZXJuLmxlbmd0aCk7XG5cbiAgICAgICAgaWYgKGJlc3RfbG9jICE9IC0xKSB7XG4gICAgICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBNYXRoLm1pbihtYXRjaF9iaXRhcFNjb3JlXygwLCBiZXN0X2xvYyksIHNjb3JlX3RocmVzaG9sZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXNlIHRoZSBiaXQgYXJyYXlzLlxuICAgIHZhciBtYXRjaG1hc2sgPSAxIDw8IChwYXR0ZXJuLmxlbmd0aCAtIDEpO1xuICAgIGJlc3RfbG9jID0gLTE7XG5cbiAgICB2YXIgYmluX21pbiwgYmluX21pZDtcbiAgICB2YXIgYmluX21heCA9IHBhdHRlcm4ubGVuZ3RoICsgdGV4dC5sZW5ndGg7XG4gICAgdmFyIGxhc3RfcmQ7XG4gICAgZm9yICh2YXIgZCA9IDA7IGQgPCBwYXR0ZXJuLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgIC8vIFNjYW4gZm9yIHRoZSBiZXN0IG1hdGNoOyBlYWNoIGl0ZXJhdGlvbiBhbGxvd3MgZm9yIG9uZSBtb3JlIGVycm9yLlxuICAgICAgICAvLyBSdW4gYSBiaW5hcnkgc2VhcmNoIHRvIGRldGVybWluZSBob3cgZmFyIGZyb20gJ2xvYycgd2UgY2FuIHN0cmF5IGF0IHRoaXNcbiAgICAgICAgLy8gZXJyb3IgbGV2ZWwuXG4gICAgICAgIGJpbl9taW4gPSAwO1xuICAgICAgICBiaW5fbWlkID0gYmluX21heDtcbiAgICAgICAgd2hpbGUgKGJpbl9taW4gPCBiaW5fbWlkKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCwgbG9jICsgYmluX21pZCkgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgYmluX21pbiA9IGJpbl9taWQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJpbl9tYXggPSBiaW5fbWlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmluX21pZCA9IE1hdGguZmxvb3IoKGJpbl9tYXggLSBiaW5fbWluKSAvIDIgKyBiaW5fbWluKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBVc2UgdGhlIHJlc3VsdCBmcm9tIHRoaXMgaXRlcmF0aW9uIGFzIHRoZSBtYXhpbXVtIGZvciB0aGUgbmV4dC5cbiAgICAgICAgYmluX21heCA9IGJpbl9taWQ7XG4gICAgICAgIHZhciBzdGFydCA9IE1hdGgubWF4KDEsIGxvYyAtIGJpbl9taWQgKyAxKTtcbiAgICAgICAgdmFyIGZpbmlzaCA9IE1hdGgubWluKGxvYyArIGJpbl9taWQsIHRleHQubGVuZ3RoKSArIHBhdHRlcm4ubGVuZ3RoO1xuXG4gICAgICAgIHZhciByZCA9IEFycmF5KGZpbmlzaCArIDIpO1xuICAgICAgICByZFtmaW5pc2ggKyAxXSA9ICgxIDw8IGQpIC0gMTtcbiAgICAgICAgZm9yICh2YXIgaiA9IGZpbmlzaDsgaiA+PSBzdGFydDsgai0tKSB7XG4gICAgICAgICAgICAvLyBUaGUgYWxwaGFiZXQgKHMpIGlzIGEgc3BhcnNlIGhhc2gsIHNvIHRoZSBmb2xsb3dpbmcgbGluZSBnZW5lcmF0ZXNcbiAgICAgICAgICAgIC8vIHdhcm5pbmdzLlxuICAgICAgICAgICAgdmFyIGNoYXJNYXRjaCA9IHNbdGV4dC5jaGFyQXQoaiAtIDEpXTtcbiAgICAgICAgICAgIGlmIChkID09PSAwKSB7ICAgIC8vIEZpcnN0IHBhc3M6IGV4YWN0IG1hdGNoLlxuICAgICAgICAgICAgICAgIHJkW2pdID0gKChyZFtqICsgMV0gPDwgMSkgfCAxKSAmIGNoYXJNYXRjaDtcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgIC8vIFN1YnNlcXVlbnQgcGFzc2VzOiBmdXp6eSBtYXRjaC5cbiAgICAgICAgICAgICAgICByZFtqXSA9ICgoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoKSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoKGxhc3RfcmRbaiArIDFdIHwgbGFzdF9yZFtqXSkgPDwgMSkgfCAxKSB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfcmRbaiArIDFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJkW2pdICYgbWF0Y2htYXNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3JlID0gbWF0Y2hfYml0YXBTY29yZV8oZCwgaiAtIDEpO1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgbWF0Y2ggd2lsbCBhbG1vc3QgY2VydGFpbmx5IGJlIGJldHRlciB0aGFuIGFueSBleGlzdGluZyBtYXRjaC5cbiAgICAgICAgICAgICAgICAvLyBCdXQgY2hlY2sgYW55d2F5LlxuICAgICAgICAgICAgICAgIGlmIChzY29yZSA8PSBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9sZCB5b3Ugc28uXG4gICAgICAgICAgICAgICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IHNjb3JlO1xuICAgICAgICAgICAgICAgICAgICBiZXN0X2xvYyA9IGogLSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmVzdF9sb2MgPiBsb2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdoZW4gcGFzc2luZyBsb2MsIGRvbid0IGV4Y2VlZCBvdXIgY3VycmVudCBkaXN0YW5jZSBmcm9tIGxvYy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMSwgMiAqIGxvYyAtIGJlc3RfbG9jKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFscmVhZHkgcGFzc2VkIGxvYywgZG93bmhpbGwgZnJvbSBoZXJlIG9uIGluLlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm8gaG9wZSBmb3IgYSAoYmV0dGVyKSBtYXRjaCBhdCBncmVhdGVyIGVycm9yIGxldmVscy5cbiAgICAgICAgaWYgKG1hdGNoX2JpdGFwU2NvcmVfKGQgKyAxLCBsb2MpID4gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsYXN0X3JkID0gcmQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIChiZXN0X2xvYyA8IDApID8gZmFsc2UgOiB0cnVlO1xufTtcbiIsIi8qKlxuICogQSBjcm9zcy1icm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGdldEF0dHJpYnV0ZS5cbiAqIFNvdXJjZSBmb3VuZCBoZXJlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zNzU1MzQzLzM2MTMzNyB3cml0dGVuIGJ5IFZpdmluIFBhbGlhdGhcbiAqXG4gKiBSZXR1cm4gdGhlIHZhbHVlIGZvciBgYXR0cmAgYXQgYGVsZW1lbnRgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwsIGF0dHIpIHtcbiAgdmFyIHJlc3VsdCA9IChlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKGF0dHIpKSB8fCBudWxsO1xuICBpZiggIXJlc3VsdCApIHtcbiAgICB2YXIgYXR0cnMgPSBlbC5hdHRyaWJ1dGVzO1xuICAgIHZhciBsZW5ndGggPSBhdHRycy5sZW5ndGg7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYXR0cltpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmKGF0dHJbaV0ubm9kZU5hbWUgPT09IGF0dHIpIHtcbiAgICAgICAgICByZXN1bHQgPSBhdHRyW2ldLm5vZGVWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIi8qKlxuICogQSBjcm9zcy1icm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGdldEVsZW1lbnRzQnlDbGFzcy5cbiAqIEhlYXZpbHkgYmFzZWQgb24gRHVzdGluIERpYXoncyBmdW5jdGlvbjogaHR0cDovL2R1c3RpbmRpYXouY29tL2dldGVsZW1lbnRzYnljbGFzcy5cbiAqXG4gKiBGaW5kIGFsbCBlbGVtZW50cyB3aXRoIGNsYXNzIGBjbGFzc05hbWVgIGluc2lkZSBgY29udGFpbmVyYC5cbiAqIFVzZSBgc2luZ2xlID0gdHJ1ZWAgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UgaW4gb2xkZXIgYnJvd3NlcnNcbiAqIHdoZW4gb25seSBvbmUgZWxlbWVudCBpcyBuZWVkZWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc2luZ2xlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnZhciBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICBpZiAoc2luZ2xlKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbMF07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cbnZhciBxdWVyeVNlbGVjdG9yID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICBjbGFzc05hbWUgPSAnLicgKyBjbGFzc05hbWU7XG4gIGlmIChzaW5nbGUpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3NOYW1lKTtcbiAgfVxufTtcblxudmFyIHBvbHlmaWxsID0gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSkge1xuICB2YXIgY2xhc3NFbGVtZW50cyA9IFtdLFxuICAgIHRhZyA9ICcqJztcblxuICB2YXIgZWxzID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG4gIHZhciBlbHNMZW4gPSBlbHMubGVuZ3RoO1xuICB2YXIgcGF0dGVybiA9IG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIitjbGFzc05hbWUrXCIoXFxcXHN8JClcIik7XG4gIGZvciAodmFyIGkgPSAwLCBqID0gMDsgaSA8IGVsc0xlbjsgaSsrKSB7XG4gICAgaWYgKCBwYXR0ZXJuLnRlc3QoZWxzW2ldLmNsYXNzTmFtZSkgKSB7XG4gICAgICBpZiAoc2luZ2xlKSB7XG4gICAgICAgIHJldHVybiBlbHNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGFzc0VsZW1lbnRzW2pdID0gZWxzW2ldO1xuICAgICAgICBqKys7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjbGFzc0VsZW1lbnRzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gIHJldHVybiBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlLCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgaWYgKChvcHRpb25zLnRlc3QgJiYgb3B0aW9ucy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSB8fCAoIW9wdGlvbnMudGVzdCAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIGdldEVsZW1lbnRzQnlDbGFzc05hbWUoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfSBlbHNlIGlmICgob3B0aW9ucy50ZXN0ICYmIG9wdGlvbnMucXVlcnlTZWxlY3RvcikgfHwgKCFvcHRpb25zLnRlc3QgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiBxdWVyeVNlbGVjdG9yKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcG9seWZpbGwoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfVxuICB9O1xufSkoKTtcbiIsInZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIG9iail7XG4gIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07XG4iLCIvKipcbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3RpbW94bGV5L3RvLWFycmF5XG4gKlxuICogQ29udmVydCBhbiBhcnJheS1saWtlIG9iamVjdCBpbnRvIGFuIGBBcnJheWAuXG4gKiBJZiBgY29sbGVjdGlvbmAgaXMgYWxyZWFkeSBhbiBgQXJyYXlgLCB0aGVuIHdpbGwgcmV0dXJuIGEgY2xvbmUgb2YgYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkgfCBNaXhlZH0gY29sbGVjdGlvbiBBbiBgQXJyYXlgIG9yIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGNvbnZlcnQgZS5nLiBgYXJndW1lbnRzYCBvciBgTm9kZUxpc3RgXG4gKiBAcmV0dXJuIHtBcnJheX0gTmFpdmUgY29udmVyc2lvbiBvZiBgY29sbGVjdGlvbmAgdG8gYSBuZXcgYEFycmF5YC5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b0FycmF5KGNvbGxlY3Rpb24pIHtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAndW5kZWZpbmVkJykgcmV0dXJuIFtdO1xuICBpZiAoY29sbGVjdGlvbiA9PT0gbnVsbCkgcmV0dXJuIFtudWxsXTtcbiAgaWYgKGNvbGxlY3Rpb24gPT09IHdpbmRvdykgcmV0dXJuIFt3aW5kb3ddO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdzdHJpbmcnKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkgcmV0dXJuIGNvbGxlY3Rpb247XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbi5sZW5ndGggIT0gJ251bWJlcicpIHJldHVybiBbY29sbGVjdGlvbl07XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2xsZWN0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pIHJldHVybiBbY29sbGVjdGlvbl07XG5cbiAgdmFyIGFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbGxlY3Rpb24sIGkpIHx8IGkgaW4gY29sbGVjdGlvbikge1xuICAgICAgYXJyLnB1c2goY29sbGVjdGlvbltpXSk7XG4gICAgfVxuICB9XG4gIGlmICghYXJyLmxlbmd0aCkgcmV0dXJuIFtdO1xuICByZXR1cm4gYXJyO1xufTtcblxuZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHMpIHtcbiAgcyA9IChzID09PSB1bmRlZmluZWQpID8gXCJcIiA6IHM7XG4gIHMgPSAocyA9PT0gbnVsbCkgPyBcIlwiIDogcztcbiAgcyA9IHMudG9TdHJpbmcoKTtcbiAgcmV0dXJuIHM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQ7XG52YXIgYWxwaGFiZXRJbmRleE1hcDtcbnZhciBhbHBoYWJldEluZGV4TWFwTGVuZ3RoID0gMDtcblxuZnVuY3Rpb24gaXNOdW1iZXJDb2RlKGNvZGUpIHtcbiAgcmV0dXJuIGNvZGUgPj0gNDggJiYgY29kZSA8PSA1Nztcbn1cblxuZnVuY3Rpb24gbmF0dXJhbENvbXBhcmUoYSwgYikge1xuICB2YXIgbGVuZ3RoQSA9IChhICs9ICcnKS5sZW5ndGg7XG4gIHZhciBsZW5ndGhCID0gKGIgKz0gJycpLmxlbmd0aDtcbiAgdmFyIGFJbmRleCA9IDA7XG4gIHZhciBiSW5kZXggPSAwO1xuXG4gIHdoaWxlIChhSW5kZXggPCBsZW5ndGhBICYmIGJJbmRleCA8IGxlbmd0aEIpIHtcbiAgICB2YXIgY2hhckNvZGVBID0gYS5jaGFyQ29kZUF0KGFJbmRleCk7XG4gICAgdmFyIGNoYXJDb2RlQiA9IGIuY2hhckNvZGVBdChiSW5kZXgpO1xuXG4gICAgaWYgKGlzTnVtYmVyQ29kZShjaGFyQ29kZUEpKSB7XG4gICAgICBpZiAoIWlzTnVtYmVyQ29kZShjaGFyQ29kZUIpKSB7XG4gICAgICAgIHJldHVybiBjaGFyQ29kZUEgLSBjaGFyQ29kZUI7XG4gICAgICB9XG5cbiAgICAgIHZhciBudW1TdGFydEEgPSBhSW5kZXg7XG4gICAgICB2YXIgbnVtU3RhcnRCID0gYkluZGV4O1xuXG4gICAgICB3aGlsZSAoY2hhckNvZGVBID09PSA0OCAmJiArK251bVN0YXJ0QSA8IGxlbmd0aEEpIHtcbiAgICAgICAgY2hhckNvZGVBID0gYS5jaGFyQ29kZUF0KG51bVN0YXJ0QSk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoY2hhckNvZGVCID09PSA0OCAmJiArK251bVN0YXJ0QiA8IGxlbmd0aEIpIHtcbiAgICAgICAgY2hhckNvZGVCID0gYi5jaGFyQ29kZUF0KG51bVN0YXJ0Qik7XG4gICAgICB9XG5cbiAgICAgIHZhciBudW1FbmRBID0gbnVtU3RhcnRBO1xuICAgICAgdmFyIG51bUVuZEIgPSBudW1TdGFydEI7XG5cbiAgICAgIHdoaWxlIChudW1FbmRBIDwgbGVuZ3RoQSAmJiBpc051bWJlckNvZGUoYS5jaGFyQ29kZUF0KG51bUVuZEEpKSkge1xuICAgICAgICArK251bUVuZEE7XG4gICAgICB9XG4gICAgICB3aGlsZSAobnVtRW5kQiA8IGxlbmd0aEIgJiYgaXNOdW1iZXJDb2RlKGIuY2hhckNvZGVBdChudW1FbmRCKSkpIHtcbiAgICAgICAgKytudW1FbmRCO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGlmZmVyZW5jZSA9IG51bUVuZEEgLSBudW1TdGFydEEgLSBudW1FbmRCICsgbnVtU3RhcnRCOyAvLyBudW1BIGxlbmd0aCAtIG51bUIgbGVuZ3RoXG4gICAgICBpZiAoZGlmZmVyZW5jZSkge1xuICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKG51bVN0YXJ0QSA8IG51bUVuZEEpIHtcbiAgICAgICAgZGlmZmVyZW5jZSA9IGEuY2hhckNvZGVBdChudW1TdGFydEErKykgLSBiLmNoYXJDb2RlQXQobnVtU3RhcnRCKyspO1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSkge1xuICAgICAgICAgIHJldHVybiBkaWZmZXJlbmNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGFJbmRleCA9IG51bUVuZEE7XG4gICAgICBiSW5kZXggPSBudW1FbmRCO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGNoYXJDb2RlQSAhPT0gY2hhckNvZGVCKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGNoYXJDb2RlQSA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGggJiZcbiAgICAgICAgY2hhckNvZGVCIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aCAmJlxuICAgICAgICBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQV0gIT09IC0xICYmXG4gICAgICAgIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVCXSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUFdIC0gYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hhckNvZGVBIC0gY2hhckNvZGVCO1xuICAgIH1cblxuICAgICsrYUluZGV4O1xuICAgICsrYkluZGV4O1xuICB9XG5cbiAgcmV0dXJuIGxlbmd0aEEgLSBsZW5ndGhCO1xufVxuXG5uYXR1cmFsQ29tcGFyZS5jYXNlSW5zZW5zaXRpdmUgPSBuYXR1cmFsQ29tcGFyZS5pID0gZnVuY3Rpb24oYSwgYikge1xuICByZXR1cm4gbmF0dXJhbENvbXBhcmUoKCcnICsgYSkudG9Mb3dlckNhc2UoKSwgKCcnICsgYikudG9Mb3dlckNhc2UoKSk7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyhuYXR1cmFsQ29tcGFyZSwge1xuICBhbHBoYWJldDoge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYWxwaGFiZXQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBhbHBoYWJldCA9IHZhbHVlO1xuICAgICAgYWxwaGFiZXRJbmRleE1hcCA9IFtdO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgaWYgKGFscGhhYmV0KSB7XG4gICAgICAgIGZvciAoOyBpIDwgYWxwaGFiZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhbHBoYWJldEluZGV4TWFwW2FscGhhYmV0LmNoYXJDb2RlQXQoaSldID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWxwaGFiZXRJbmRleE1hcExlbmd0aCA9IGFscGhhYmV0SW5kZXhNYXAubGVuZ3RoO1xuICAgICAgZm9yIChpID0gMDsgaSA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYWxwaGFiZXRJbmRleE1hcFtpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtpXSA9IC0xO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgfSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdHVyYWxDb21wYXJlO1xuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICAndXNlIHN0cmljdCdcblxuICBsZXQgYXBpID0ge31cbiAgbGV0IHNldHRpbmdzXG4gIGxldCBkZWZhdWx0cyA9IHtcbiAgICB0cmlnZ2VyOiAnW2RhdGEtZGlzbWlzc10nLFxuICAgIHRhcmdldDogJ1tkYXRhLWRpc21pc3NpYmxlXScsXG4gICAgY2xhc3NUb2dnbGU6ICdkaXNtaXNzJ1xuICB9XG5cbiAgbGV0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KHNldHRpbmdzLnRyaWdnZXIpXG4gICAgaWYgKHRyaWdnZXIpIHtcbiAgICAgIGxldCB0YXJnZXQgPSB0cmlnZ2VyLmNsb3Nlc3Qoc2V0dGluZ3MudGFyZ2V0KVxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB1LnRvZ2dsZUNsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NUb2dnbGUpXG4gICAgICB9XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICB9XG5cbiAgYXBpLmluaXQgPSAob3B0aW9ucykgPT4ge1xuICAgIGFwaS5kZXN0cm95KClcbiAgICBzZXR0aW5ncyA9IHUuZXh0ZW5kKCBkZWZhdWx0cywgb3B0aW9ucyB8fCB7fSApXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmluaXQoKVxuXG4gIHJldHVybiBhcGlcbn1cbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgY2xhc3NUcmlnZ2VyOiAnbW9kYWxfX3RyaWdnZXInLFxuICAgIGNsYXNzTW9kYWw6ICdtb2RhbCcsXG4gICAgY2xhc3NEaWFsb2c6ICdtb2RhbF9fZGlhbG9nJyxcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWFjdGl2ZScsXG4gICAgZm9jdXM6ICdbZGF0YS1mb2N1c10nXG4gIH1cblxuICBsZXQgbWVtb3J5VHJpZ2dlclxuICBsZXQgbWVtb3J5VGFyZ2V0XG5cbiAgbGV0IG9wZW4gPSAodGFyZ2V0KSA9PiB7XG4gICAgdS5hZGRDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIGxldCBmb2N1cyA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKHNldHRpbmdzLmZvY3VzKVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgaWYgKGZvY3VzKSB7XG4gICAgICAgIGZvY3VzLmZvY3VzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5mb2N1cygpXG4gICAgICB9XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgfSwgdHJ1ZSk7XG4gIH1cblxuICBsZXQgY2xvc2UgPSAoKSA9PiB7XG4gICAgbGV0IG1vZGFscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy4nICsgc2V0dGluZ3MuY2xhc3NNb2RhbClcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZGFscy5sZW5ndGg7ICsraSkge1xuICAgICAgdS5yZW1vdmVDbGFzcyhtb2RhbHNbaV0sIHNldHRpbmdzLmNsYXNzQWN0aXZlKVxuICAgIH1cbiAgICBpZiAobWVtb3J5VHJpZ2dlciAmJiBtZW1vcnlUYXJnZXQpIHtcbiAgICAgIG1lbW9yeVRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gX2xpc3RlbmVyKCkge1xuICAgICAgICBpZiAobWVtb3J5VHJpZ2dlcikge1xuICAgICAgICAgIG1lbW9yeVRyaWdnZXIuZm9jdXMoKVxuICAgICAgICB9XG4gICAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgbW9kYWwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGxldCBkaWFsb2cgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0RpYWxvZylcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgbGV0IGRhdGFNb2RhbCA9IHRyaWdnZXIuZGF0YXNldC5tb2RhbFxuICAgICAgaWYgKGRhdGFNb2RhbCkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhTW9kYWwpXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSB0cmlnZ2VyXG4gICAgICAgIG9wZW4obWVtb3J5VGFyZ2V0KVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAobW9kYWwgJiYgIWRpYWxvZykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5vcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9ICgpID0+IHtcbiAgICBjbG9zZSgpXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgYXBpLmRlc3Ryb3koKVxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5pbml0KClcblxuICByZXR1cm4gYXBpXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzIG9yIG5vdFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gY2hlY2sgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGNsYXNzIGV4aXN0cyBvbiBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICByZXR1cm4gYy5ldmVyeSggZnVuY3Rpb24gKCBjICkge1xuICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIG9yIGNsYXNzZXMgdG8gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gYWRkIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gYWRkXG4gICAqL1xuICBzdGF0aWMgYWRkQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCBjIClcbiAgICB9KVxuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBvciBjbGFzc2VzIGZyb20gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gcmVtb3ZlIGNsYXNzKGVzKSBmcm9tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byByZW1vdmVcbiAgICovXG4gIHN0YXRpYyByZW1vdmVDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICBjLmZvckVhY2goIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoIGMgKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGEgY2xhc3Mgb3IgY2xhc3NlcyBvbiBhbiBlbGVtZW50XG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byB0b2dnbGUgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICBjLmZvckVhY2goIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYylcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGNsb3Nlc3QgcGFyZW50IGVsZW1lbnQgYmFzZWQgb24gY2xhc3MuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlXG4gICAqIG5hdGl2ZSAuY2xvc2VzdCgpIG1ldGhvZCBpbiB0aGF0IGl0IGRvZXNuJ3QgY2hlY2sgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIHN0YXJ0IHNlYXJjaCBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gY2hlY2sgZm9yXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9IENsb3Nlc3QgcGFyZW50IGVsZW1lbnRcbiAgICovXG4gIHN0YXRpYyBjbG9zZXN0KCBlbCwgYyApIHtcbiAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50RWxlbWVudCkgJiYgIXRoaXMuaGFzQ2xhc3MoZWwsIGMpKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3MgcmV0dXJuZWQgYXMgaXMuXG4gICAqIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgZmFsc2UuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IFN0cmluZyB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm4gdGhlIGNvbnZlcnRlZCBhcnJheVxuICAgKi9cbiAgc3RhdGljIHRvQXJyYXkoc3RyaW5nKSB7XG5cbiAgICB2YXIgYXJyYXkgPSBbXVxuXG4gICAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhcnJheS5wdXNoKHN0cmluZylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc3RyaW5nKSkge1xuICAgICAgYXJyYXkgPSBzdHJpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0cy4gUmV0dXJucyBhIG5ldyBvYmplY3QuIFNldCB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICogdG8gYHRydWVgIGZvciBhIGRlZXAgb3IgcmVjdXJzaXZlIG1lcmdlLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtPcHRpb25hbF0gSWYgdHJ1ZSwgZG8gYSBkZWVwIChvciByZWN1cnNpdmUpIG1lcmdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlcjsgZWFjaCBvdmVycmlkaW5nIHRoZSBuZXh0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IE1lcmdlZCB2YWx1ZXMgb2YgZGVmYXVsdHMgYW5kIG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICB2YXIgZXh0ZW5kZWQgPSB7fVxuICAgIHZhciBkZWVwID0gZmFsc2VcbiAgICB2YXIgaSA9IDBcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIGFyZ3VtZW50c1swXSApID09PSAnW29iamVjdCBCb29sZWFuXScgKSB7XG4gICAgICBkZWVwID0gYXJndW1lbnRzWzBdXG4gICAgICBpKytcbiAgICB9XG5cbiAgICBsZXQgbWVyZ2UgPSAoIG9iaiApID0+IHtcbiAgICAgIGZvciAoIHZhciBwcm9wIGluIG9iaiApIHtcbiAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoIG9iaiwgcHJvcCApICkge1xuICAgICAgICAgIGlmICggZGVlcCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW3Byb3BdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGV4dGVuZCggdHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gb2JqW3Byb3BdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldXG4gICAgICBtZXJnZShvYmopXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZGVkXG4gIH1cblxufVxuIl19

//# sourceMappingURL=scripts.js.map
