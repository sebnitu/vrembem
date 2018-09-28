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

  /**
   * Variables
   */

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

  /**
   * Private functions
   */

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

  /**
   * Public functions
   */

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

  /**
   * Init the plugin
   */
  api.init();

  /**
   * Return the API
   */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9tb2RhbC5qcyIsIi4uL3NyYy9qcy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sUUFBUSxJQUFJLGVBQUosRUFBZDtBQUNBLElBQU0sY0FBYyxJQUFJLHFCQUFKLEVBQXBCOztBQUVBLElBQU0sT0FBTyxTQUFTLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQWI7O0FBRUEsSUFBSSxJQUFKLEVBQVU7O0FBRVIsTUFBTSxhQUFhLElBQUksY0FBSixDQUFTLGdCQUFULEVBQTJCO0FBQzVDLGdCQUFZLENBQ1Ysa0JBRFUsRUFFVixFQUFFLE1BQU0sQ0FBQyxNQUFELENBQVIsRUFGVSxDQURnQztBQUs1QyxlQUFXO0FBTGlDLEdBQTNCLENBQW5COztBQVFBLE1BQU0sYUFBYSxTQUFiLFVBQWEsR0FBVztBQUM1QixRQUFNLGNBQWMsU0FBUyxjQUFULENBQXdCLG9CQUF4QixFQUE4QyxLQUFsRTtBQUNBLGVBQVcsTUFBWCxDQUFrQixVQUFTLElBQVQsRUFBZTtBQUMvQixhQUFRLFlBQVksUUFBWixDQUFxQixLQUFLLE1BQUwsR0FBYyxJQUFuQyxLQUE0QyxDQUFDLFdBQXJEO0FBQ0QsS0FGRDtBQUdELEdBTEQ7O0FBT0EsV0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBNkMsWUFBVztBQUN0RCxRQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQUFmO0FBQ0EsUUFBSSxNQUFKLEVBQVk7QUFDVixhQUFPLFFBQVAsR0FBZ0IsVUFBaEI7QUFDRDtBQUNGLEdBTEQsRUFLRyxLQUxIOztBQU9BLGFBQVcsSUFBWCxDQUFnQixrQkFBaEIsRUFBb0MsRUFBRSxPQUFPLEtBQVQsRUFBcEM7QUFFRDs7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ZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IE1vZGFsIGZyb20gJ21vZGFsLmpzJ1xuaW1wb3J0IERpc21pc3NpYmxlIGZyb20gJ2Rpc21pc3NpYmxlLmpzJ1xuaW1wb3J0IGxpc3QgZnJvbSAnbGlzdC5qcydcblxuY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoKVxuY29uc3QgZGlzbWlzc2libGUgPSBuZXcgRGlzbWlzc2libGUoKVxuXG5jb25zdCBob21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZyZW1iZW0tYmxvY2tzJylcblxuaWYgKGhvbWUpIHtcblxuICBjb25zdCBibG9ja3NMaXN0ID0gbmV3IGxpc3QoJ3ZyZW1iZW0tYmxvY2tzJywge1xuICAgIHZhbHVlTmFtZXM6IFtcbiAgICAgICdqdW1iby1saXN0X19uYW1lJyxcbiAgICAgIHsgZGF0YTogWyd0eXBlJ10gfVxuICAgIF0sXG4gICAgbGlzdENsYXNzOiAnanVtYm8tbGlzdCdcbiAgfSlcblxuICBjb25zdCB1cGRhdGVMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgdmFsdWVzX3R5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanVtYm8tZmlsdGVyX190eXBlJykudmFsdWVcbiAgICBibG9ja3NMaXN0LmZpbHRlcihmdW5jdGlvbihpdGVtKSB7XG4gICAgICByZXR1cm4gKHZhbHVlc190eXBlLmluY2x1ZGVzKGl0ZW0udmFsdWVzKCkudHlwZSkgfHwgIXZhbHVlc190eXBlKVxuICAgIH0pXG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJyxmdW5jdGlvbigpIHtcbiAgICBjb25zdCBmaWx0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanVtYm8tZmlsdGVyX190eXBlJylcbiAgICBpZiAoZmlsdGVyKSB7XG4gICAgICBmaWx0ZXIub25jaGFuZ2U9dXBkYXRlTGlzdFxuICAgIH1cbiAgfSwgZmFsc2UpXG5cbiAgYmxvY2tzTGlzdC5zb3J0KCdqdW1iby1saXN0X19uYW1lJywgeyBvcmRlcjogJ2FzYycgfSlcblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBhZGRBc3luYyA9IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2ssIGl0ZW1zKSB7XG4gICAgdmFyIHZhbHVlc1RvQWRkID0gdmFsdWVzLnNwbGljZSgwLCA1MCk7XG4gICAgaXRlbXMgPSBpdGVtcyB8fCBbXTtcbiAgICBpdGVtcyA9IGl0ZW1zLmNvbmNhdChsaXN0LmFkZCh2YWx1ZXNUb0FkZCkpO1xuICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYWRkQXN5bmModmFsdWVzLCBjYWxsYmFjaywgaXRlbXMpO1xuICAgICAgfSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QudXBkYXRlKCk7XG4gICAgICBjYWxsYmFjayhpdGVtcyk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gYWRkQXN5bmM7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgLy8gQWRkIGhhbmRsZXJzXG4gIGxpc3QuaGFuZGxlcnMuZmlsdGVyU3RhcnQgPSBsaXN0LmhhbmRsZXJzLmZpbHRlclN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLmZpbHRlckNvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5maWx0ZXJDb21wbGV0ZSB8fCBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24oZmlsdGVyRnVuY3Rpb24pIHtcbiAgICBsaXN0LnRyaWdnZXIoJ2ZpbHRlclN0YXJ0Jyk7XG4gICAgbGlzdC5pID0gMTsgLy8gUmVzZXQgcGFnaW5nXG4gICAgbGlzdC5yZXNldC5maWx0ZXIoKTtcbiAgICBpZiAoZmlsdGVyRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGlzdC5maWx0ZXJlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LmZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHZhciBpcyA9IGxpc3QuaXRlbXM7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBpcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gaXNbaV07XG4gICAgICAgIGlmIChmaWx0ZXJGdW5jdGlvbihpdGVtKSkge1xuICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignZmlsdGVyQ29tcGxldGUnKTtcbiAgICByZXR1cm4gbGlzdC52aXNpYmxlSXRlbXM7XG4gIH07XG59O1xuIiwiXG52YXIgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpLFxuICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tc3RyaW5nJyksXG4gIGdldEJ5Q2xhc3MgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1ieS1jbGFzcycpLFxuICBmdXp6eSA9IHJlcXVpcmUoJy4vdXRpbHMvZnV6enknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIG9wdGlvbnMgPSBleHRlbmQoe1xuICAgIGxvY2F0aW9uOiAwLFxuICAgIGRpc3RhbmNlOiAxMDAsXG4gICAgdGhyZXNob2xkOiAwLjQsXG4gICAgbXVsdGlTZWFyY2g6IHRydWUsXG4gICAgc2VhcmNoQ2xhc3M6ICdmdXp6eS1zZWFyY2gnXG4gIH0sIG9wdGlvbnMpO1xuXG5cblxuICB2YXIgZnV6enlTZWFyY2ggPSB7XG4gICAgc2VhcmNoOiBmdW5jdGlvbihzZWFyY2hTdHJpbmcsIGNvbHVtbnMpIHtcbiAgICAgIC8vIFN1YnN0cmFjdCBhcmd1bWVudHMgZnJvbSB0aGUgc2VhcmNoU3RyaW5nIG9yIHB1dCBzZWFyY2hTdHJpbmcgYXMgb25seSBhcmd1bWVudFxuICAgICAgdmFyIHNlYXJjaEFyZ3VtZW50cyA9IG9wdGlvbnMubXVsdGlTZWFyY2ggPyBzZWFyY2hTdHJpbmcucmVwbGFjZSgvICskLywgJycpLnNwbGl0KC8gKy8pIDogW3NlYXJjaFN0cmluZ107XG5cbiAgICAgIGZvciAodmFyIGsgPSAwLCBrbCA9IGxpc3QuaXRlbXMubGVuZ3RoOyBrIDwga2w7IGsrKykge1xuICAgICAgICBmdXp6eVNlYXJjaC5pdGVtKGxpc3QuaXRlbXNba10sIGNvbHVtbnMsIHNlYXJjaEFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtOiBmdW5jdGlvbihpdGVtLCBjb2x1bW5zLCBzZWFyY2hBcmd1bWVudHMpIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWU7XG4gICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2VhcmNoQXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmb3VuZEFyZ3VtZW50ID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGNvbHVtbnMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGlmIChmdXp6eVNlYXJjaC52YWx1ZXMoaXRlbS52YWx1ZXMoKSwgY29sdW1uc1tqXSwgc2VhcmNoQXJndW1lbnRzW2ldKSkge1xuICAgICAgICAgICAgZm91bmRBcmd1bWVudCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKCFmb3VuZEFyZ3VtZW50KSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaXRlbS5mb3VuZCA9IGZvdW5kO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbih2YWx1ZXMsIHZhbHVlLCBzZWFyY2hBcmd1bWVudCkge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIHRleHQgPSB0b1N0cmluZyh2YWx1ZXNbdmFsdWVdKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChmdXp6eSh0ZXh0LCBzZWFyY2hBcmd1bWVudCwgb3B0aW9ucykpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuXG4gIGV2ZW50cy5iaW5kKGdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBvcHRpb25zLnNlYXJjaENsYXNzKSwgJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7IC8vIElFIGhhdmUgc3JjRWxlbWVudFxuICAgIGxpc3Quc2VhcmNoKHRhcmdldC52YWx1ZSwgZnV6enlTZWFyY2guc2VhcmNoKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHN0ciwgY29sdW1ucykge1xuICAgIGxpc3Quc2VhcmNoKHN0ciwgY29sdW1ucywgZnV6enlTZWFyY2guc2VhcmNoKTtcbiAgfTtcbn07XG4iLCJ2YXIgbmF0dXJhbFNvcnQgPSByZXF1aXJlKCdzdHJpbmctbmF0dXJhbC1jb21wYXJlJyksXG4gIGdldEJ5Q2xhc3MgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1ieS1jbGFzcycpLFxuICBleHRlbmQgPSByZXF1aXJlKCcuL3V0aWxzL2V4dGVuZCcpLFxuICBpbmRleE9mID0gcmVxdWlyZSgnLi91dGlscy9pbmRleC1vZicpLFxuICBldmVudHMgPSByZXF1aXJlKCcuL3V0aWxzL2V2ZW50cycpLFxuICB0b1N0cmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tc3RyaW5nJyksXG4gIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZ2V0QXR0cmlidXRlID0gcmVxdWlyZSgnLi91dGlscy9nZXQtYXR0cmlidXRlJyksXG4gIHRvQXJyYXkgPSByZXF1aXJlKCcuL3V0aWxzL3RvLWFycmF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaWQsIG9wdGlvbnMsIHZhbHVlcykge1xuXG4gIHZhciBzZWxmID0gdGhpcyxcbiAgICBpbml0LFxuICAgIEl0ZW0gPSByZXF1aXJlKCcuL2l0ZW0nKShzZWxmKSxcbiAgICBhZGRBc3luYyA9IHJlcXVpcmUoJy4vYWRkLWFzeW5jJykoc2VsZiksXG4gICAgaW5pdFBhZ2luYXRpb24gPSByZXF1aXJlKCcuL3BhZ2luYXRpb24nKShzZWxmKTtcblxuICBpbml0ID0ge1xuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYubGlzdENsYXNzICAgICAgPSBcImxpc3RcIjtcbiAgICAgIHNlbGYuc2VhcmNoQ2xhc3MgICAgPSBcInNlYXJjaFwiO1xuICAgICAgc2VsZi5zb3J0Q2xhc3MgICAgICA9IFwic29ydFwiO1xuICAgICAgc2VsZi5wYWdlICAgICAgICAgICA9IDEwMDAwO1xuICAgICAgc2VsZi5pICAgICAgICAgICAgICA9IDE7XG4gICAgICBzZWxmLml0ZW1zICAgICAgICAgID0gW107XG4gICAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgICBzZWxmLm1hdGNoaW5nSXRlbXMgID0gW107XG4gICAgICBzZWxmLnNlYXJjaGVkICAgICAgID0gZmFsc2U7XG4gICAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgICBzZWxmLnNlYXJjaENvbHVtbnMgID0gdW5kZWZpbmVkO1xuICAgICAgc2VsZi5oYW5kbGVycyAgICAgICA9IHsgJ3VwZGF0ZWQnOiBbXSB9O1xuICAgICAgc2VsZi52YWx1ZU5hbWVzICAgICA9IFtdO1xuICAgICAgc2VsZi51dGlscyAgICAgICAgICA9IHtcbiAgICAgICAgZ2V0QnlDbGFzczogZ2V0QnlDbGFzcyxcbiAgICAgICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgICAgIGluZGV4T2Y6IGluZGV4T2YsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICB0b1N0cmluZzogdG9TdHJpbmcsXG4gICAgICAgIG5hdHVyYWxTb3J0OiBuYXR1cmFsU29ydCxcbiAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgZ2V0QXR0cmlidXRlOiBnZXRBdHRyaWJ1dGUsXG4gICAgICAgIHRvQXJyYXk6IHRvQXJyYXlcbiAgICAgIH07XG5cbiAgICAgIHNlbGYudXRpbHMuZXh0ZW5kKHNlbGYsIG9wdGlvbnMpO1xuXG4gICAgICBzZWxmLmxpc3RDb250YWluZXIgPSAodHlwZW9mKGlkKSA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIDogaWQ7XG4gICAgICBpZiAoIXNlbGYubGlzdENvbnRhaW5lcikgeyByZXR1cm47IH1cbiAgICAgIHNlbGYubGlzdCAgICAgICA9IGdldEJ5Q2xhc3Moc2VsZi5saXN0Q29udGFpbmVyLCBzZWxmLmxpc3RDbGFzcywgdHJ1ZSk7XG5cbiAgICAgIHNlbGYucGFyc2UgICAgICAgID0gcmVxdWlyZSgnLi9wYXJzZScpKHNlbGYpO1xuICAgICAgc2VsZi50ZW1wbGF0ZXIgICAgPSByZXF1aXJlKCcuL3RlbXBsYXRlcicpKHNlbGYpO1xuICAgICAgc2VsZi5zZWFyY2ggICAgICAgPSByZXF1aXJlKCcuL3NlYXJjaCcpKHNlbGYpO1xuICAgICAgc2VsZi5maWx0ZXIgICAgICAgPSByZXF1aXJlKCcuL2ZpbHRlcicpKHNlbGYpO1xuICAgICAgc2VsZi5zb3J0ICAgICAgICAgPSByZXF1aXJlKCcuL3NvcnQnKShzZWxmKTtcbiAgICAgIHNlbGYuZnV6enlTZWFyY2ggID0gcmVxdWlyZSgnLi9mdXp6eS1zZWFyY2gnKShzZWxmLCBvcHRpb25zLmZ1enp5U2VhcmNoKTtcblxuICAgICAgdGhpcy5oYW5kbGVycygpO1xuICAgICAgdGhpcy5pdGVtcygpO1xuICAgICAgdGhpcy5wYWdpbmF0aW9uKCk7XG5cbiAgICAgIHNlbGYudXBkYXRlKCk7XG4gICAgfSxcbiAgICBoYW5kbGVyczogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBoYW5kbGVyIGluIHNlbGYuaGFuZGxlcnMpIHtcbiAgICAgICAgaWYgKHNlbGZbaGFuZGxlcl0pIHtcbiAgICAgICAgICBzZWxmLm9uKGhhbmRsZXIsIHNlbGZbaGFuZGxlcl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtczogZnVuY3Rpb24oKSB7XG4gICAgICBzZWxmLnBhcnNlKHNlbGYubGlzdCk7XG4gICAgICBpZiAodmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgc2VsZi5hZGQodmFsdWVzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHBhZ2luYXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICBvcHRpb25zLnBhZ2luYXRpb24gPSBbe31dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLnBhZ2luYXRpb25bMF0gPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgb3B0aW9ucy5wYWdpbmF0aW9uID0gW29wdGlvbnMucGFnaW5hdGlvbl07XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gb3B0aW9ucy5wYWdpbmF0aW9uLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgICBpbml0UGFnaW5hdGlvbihvcHRpb25zLnBhZ2luYXRpb25baV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qXG4gICogUmUtcGFyc2UgdGhlIExpc3QsIHVzZSBpZiBodG1sIGhhdmUgY2hhbmdlZFxuICAqL1xuICB0aGlzLnJlSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICBzZWxmLml0ZW1zICAgICAgICAgID0gW107XG4gICAgc2VsZi52aXNpYmxlSXRlbXMgICA9IFtdO1xuICAgIHNlbGYubWF0Y2hpbmdJdGVtcyAgPSBbXTtcbiAgICBzZWxmLnNlYXJjaGVkICAgICAgID0gZmFsc2U7XG4gICAgc2VsZi5maWx0ZXJlZCAgICAgICA9IGZhbHNlO1xuICAgIHNlbGYucGFyc2Uoc2VsZi5saXN0KTtcbiAgfTtcblxuICB0aGlzLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBqc29uID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBqc29uLnB1c2goc2VsZi5pdGVtc1tpXS52YWx1ZXMoKSk7XG4gICAgfVxuICAgIHJldHVybiBqc29uO1xuICB9O1xuXG5cbiAgLypcbiAgKiBBZGQgb2JqZWN0IHRvIGxpc3RcbiAgKi9cbiAgdGhpcy5hZGQgPSBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBhZGRBc3luYyh2YWx1ZXMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGFkZGVkID0gW10sXG4gICAgICBub3RDcmVhdGUgPSBmYWxzZTtcbiAgICBpZiAodmFsdWVzWzBdID09PSB1bmRlZmluZWQpe1xuICAgICAgdmFsdWVzID0gW3ZhbHVlc107XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHZhbHVlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IG51bGw7XG4gICAgICBub3RDcmVhdGUgPSAoc2VsZi5pdGVtcy5sZW5ndGggPiBzZWxmLnBhZ2UpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgaXRlbSA9IG5ldyBJdGVtKHZhbHVlc1tpXSwgdW5kZWZpbmVkLCBub3RDcmVhdGUpO1xuICAgICAgc2VsZi5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgYWRkZWQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgc2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gYWRkZWQ7XG4gIH07XG5cblx0dGhpcy5zaG93ID0gZnVuY3Rpb24oaSwgcGFnZSkge1xuXHRcdHRoaXMuaSA9IGk7XG5cdFx0dGhpcy5wYWdlID0gcGFnZTtcblx0XHRzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBzZWxmO1xuXHR9O1xuXG4gIC8qIFJlbW92ZXMgb2JqZWN0IGZyb20gbGlzdC5cbiAgKiBMb29wcyB0aHJvdWdoIHRoZSBsaXN0IGFuZCByZW1vdmVzIG9iamVjdHMgd2hlcmVcbiAgKiBwcm9wZXJ0eSBcInZhbHVlbmFtZVwiID09PSB2YWx1ZVxuICAqL1xuICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKHZhbHVlTmFtZSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgZm91bmQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgaWYgKHNlbGYuaXRlbXNbaV0udmFsdWVzKClbdmFsdWVOYW1lXSA9PSB2YWx1ZSkge1xuICAgICAgICBzZWxmLnRlbXBsYXRlci5yZW1vdmUoc2VsZi5pdGVtc1tpXSwgb3B0aW9ucyk7XG4gICAgICAgIHNlbGYuaXRlbXMuc3BsaWNlKGksMSk7XG4gICAgICAgIGlsLS07XG4gICAgICAgIGktLTtcbiAgICAgICAgZm91bmQrKztcbiAgICAgIH1cbiAgICB9XG4gICAgc2VsZi51cGRhdGUoKTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH07XG5cbiAgLyogR2V0cyB0aGUgb2JqZWN0cyBpbiB0aGUgbGlzdCB3aGljaFxuICAqIHByb3BlcnR5IFwidmFsdWVOYW1lXCIgPT09IHZhbHVlXG4gICovXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24odmFsdWVOYW1lLCB2YWx1ZSkge1xuICAgIHZhciBtYXRjaGVkSXRlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gc2VsZi5pdGVtc1tpXTtcbiAgICAgIGlmIChpdGVtLnZhbHVlcygpW3ZhbHVlTmFtZV0gPT0gdmFsdWUpIHtcbiAgICAgICAgbWF0Y2hlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRjaGVkSXRlbXM7XG4gIH07XG5cbiAgLypcbiAgKiBHZXQgc2l6ZSBvZiB0aGUgbGlzdFxuICAqL1xuICB0aGlzLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2VsZi5pdGVtcy5sZW5ndGg7XG4gIH07XG5cbiAgLypcbiAgKiBSZW1vdmVzIGFsbCBpdGVtcyBmcm9tIHRoZSBsaXN0XG4gICovXG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICBzZWxmLnRlbXBsYXRlci5jbGVhcigpO1xuICAgIHNlbGYuaXRlbXMgPSBbXTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLm9uID0gZnVuY3Rpb24oZXZlbnQsIGNhbGxiYWNrKSB7XG4gICAgc2VsZi5oYW5kbGVyc1tldmVudF0ucHVzaChjYWxsYmFjayk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5vZmYgPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgZSA9IHNlbGYuaGFuZGxlcnNbZXZlbnRdO1xuICAgIHZhciBpbmRleCA9IGluZGV4T2YoZSwgY2FsbGJhY2spO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBlLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMudHJpZ2dlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGkgPSBzZWxmLmhhbmRsZXJzW2V2ZW50XS5sZW5ndGg7XG4gICAgd2hpbGUoaS0tKSB7XG4gICAgICBzZWxmLmhhbmRsZXJzW2V2ZW50XVtpXShzZWxmKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy5yZXNldCA9IHtcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcbiAgICAgICAgaWwgPSBpcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWwtLSkge1xuICAgICAgICBpc1tpbF0uZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH0sXG4gICAgc2VhcmNoOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG4gICAgICAgIGlsID0gaXMubGVuZ3RoO1xuICAgICAgd2hpbGUgKGlsLS0pIHtcbiAgICAgICAgaXNbaWxdLmZvdW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuXHRcdFx0aWwgPSBpcy5sZW5ndGg7XG5cbiAgICBzZWxmLnZpc2libGVJdGVtcyA9IFtdO1xuICAgIHNlbGYubWF0Y2hpbmdJdGVtcyA9IFtdO1xuICAgIHNlbGYudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoaXNbaV0ubWF0Y2hpbmcoKSAmJiAoKHNlbGYubWF0Y2hpbmdJdGVtcy5sZW5ndGgrMSkgPj0gc2VsZi5pICYmIHNlbGYudmlzaWJsZUl0ZW1zLmxlbmd0aCA8IHNlbGYucGFnZSkpIHtcbiAgICAgICAgaXNbaV0uc2hvdygpO1xuICAgICAgICBzZWxmLnZpc2libGVJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgfSBlbHNlIGlmIChpc1tpXS5tYXRjaGluZygpKSB7XG4gICAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcy5wdXNoKGlzW2ldKTtcbiAgICAgICAgaXNbaV0uaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXNbaV0uaGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLnRyaWdnZXIoJ3VwZGF0ZWQnKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICBpbml0LnN0YXJ0KCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpIHtcbiAgICB2YXIgaXRlbSA9IHRoaXM7XG5cbiAgICB0aGlzLl92YWx1ZXMgPSB7fTtcblxuICAgIHRoaXMuZm91bmQgPSBmYWxzZTsgLy8gU2hvdyBpZiBsaXN0LnNlYXJjaGVkID09IHRydWUgYW5kIHRoaXMuZm91bmQgPT0gdHJ1ZVxuICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTsvLyBTaG93IGlmIGxpc3QuZmlsdGVyZWQgPT0gdHJ1ZSBhbmQgdGhpcy5maWx0ZXJlZCA9PSB0cnVlXG5cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSkge1xuICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobm90Q3JlYXRlKSB7XG4gICAgICAgICAgaXRlbS52YWx1ZXMoaW5pdFZhbHVlcywgbm90Q3JlYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLnZhbHVlcyhpbml0VmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5lbG0gPSBlbGVtZW50O1xuICAgICAgICB2YXIgdmFsdWVzID0gbGlzdC50ZW1wbGF0ZXIuZ2V0KGl0ZW0sIGluaXRWYWx1ZXMpO1xuICAgICAgICBpdGVtLnZhbHVlcyh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnZhbHVlcyA9IGZ1bmN0aW9uKG5ld1ZhbHVlcywgbm90Q3JlYXRlKSB7XG4gICAgICBpZiAobmV3VmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yKHZhciBuYW1lIGluIG5ld1ZhbHVlcykge1xuICAgICAgICAgIGl0ZW0uX3ZhbHVlc1tuYW1lXSA9IG5ld1ZhbHVlc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90Q3JlYXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgbGlzdC50ZW1wbGF0ZXIuc2V0KGl0ZW0sIGl0ZW0udmFsdWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXRlbS5fdmFsdWVzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QudGVtcGxhdGVyLnNob3coaXRlbSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuaGlkZShpdGVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy5tYXRjaGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgKGxpc3QuZmlsdGVyZWQgJiYgbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZvdW5kICYmIGl0ZW0uZmlsdGVyZWQpIHx8XG4gICAgICAgIChsaXN0LmZpbHRlcmVkICYmICFsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZmlsdGVyZWQpIHx8XG4gICAgICAgICghbGlzdC5maWx0ZXJlZCAmJiBsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZm91bmQpIHx8XG4gICAgICAgICghbGlzdC5maWx0ZXJlZCAmJiAhbGlzdC5zZWFyY2hlZClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIHRoaXMudmlzaWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChpdGVtLmVsbSAmJiAoaXRlbS5lbG0ucGFyZW50Tm9kZSA9PSBsaXN0Lmxpc3QpKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgaW5pdChpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpO1xuICB9O1xufTtcbiIsInZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIExpc3QgPSByZXF1aXJlKCcuL2luZGV4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciByZWZyZXNoID0gZnVuY3Rpb24ocGFnaW5nTGlzdCwgb3B0aW9ucykge1xuICAgIHZhciBpdGVtLFxuICAgICAgbCA9IGxpc3QubWF0Y2hpbmdJdGVtcy5sZW5ndGgsXG4gICAgICBpbmRleCA9IGxpc3QuaSxcbiAgICAgIHBhZ2UgPSBsaXN0LnBhZ2UsXG4gICAgICBwYWdlcyA9IE1hdGguY2VpbChsIC8gcGFnZSksXG4gICAgICBjdXJyZW50UGFnZSA9IE1hdGguY2VpbCgoaW5kZXggLyBwYWdlKSksXG4gICAgICBpbm5lcldpbmRvdyA9IG9wdGlvbnMuaW5uZXJXaW5kb3cgfHwgMixcbiAgICAgIGxlZnQgPSBvcHRpb25zLmxlZnQgfHwgb3B0aW9ucy5vdXRlcldpbmRvdyB8fCAwLFxuICAgICAgcmlnaHQgPSBvcHRpb25zLnJpZ2h0IHx8IG9wdGlvbnMub3V0ZXJXaW5kb3cgfHwgMDtcblxuICAgIHJpZ2h0ID0gcGFnZXMgLSByaWdodDtcblxuICAgIHBhZ2luZ0xpc3QuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBwYWdlczsgaSsrKSB7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gKGN1cnJlbnRQYWdlID09PSBpKSA/IFwiYWN0aXZlXCIgOiBcIlwiO1xuXG4gICAgICAvL2NvbnNvbGUubG9nKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgKGN1cnJlbnRQYWdlIC0gaW5uZXJXaW5kb3cpLCAoY3VycmVudFBhZ2UgKyBpbm5lcldpbmRvdyksIGNsYXNzTmFtZSk7XG5cbiAgICAgIGlmIChpcy5udW1iZXIoaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykpIHtcbiAgICAgICAgaXRlbSA9IHBhZ2luZ0xpc3QuYWRkKHtcbiAgICAgICAgICBwYWdlOiBpLFxuICAgICAgICAgIGRvdHRlZDogZmFsc2VcbiAgICAgICAgfSlbMF07XG4gICAgICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgICAgICBjbGFzc2VzKGl0ZW0uZWxtKS5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRFdmVudChpdGVtLmVsbSwgaSwgcGFnZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzLmRvdHRlZChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBwYWdpbmdMaXN0LnNpemUoKSkpIHtcbiAgICAgICAgaXRlbSA9IHBhZ2luZ0xpc3QuYWRkKHtcbiAgICAgICAgICBwYWdlOiBcIi4uLlwiLFxuICAgICAgICAgIGRvdHRlZDogdHJ1ZVxuICAgICAgICB9KVswXTtcbiAgICAgICAgY2xhc3NlcyhpdGVtLmVsbSkuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBpcyA9IHtcbiAgICBudW1iZXI6IGZ1bmN0aW9uKGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgICByZXR1cm4gdGhpcy5sZWZ0KGksIGxlZnQpIHx8IHRoaXMucmlnaHQoaSwgcmlnaHQpIHx8IHRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KTtcbiAgICB9LFxuICAgIGxlZnQ6IGZ1bmN0aW9uKGksIGxlZnQpIHtcbiAgICAgIHJldHVybiAoaSA8PSBsZWZ0KTtcbiAgICB9LFxuICAgIHJpZ2h0OiBmdW5jdGlvbihpLCByaWdodCkge1xuICAgICAgcmV0dXJuIChpID4gcmlnaHQpO1xuICAgIH0sXG4gICAgaW5uZXJXaW5kb3c6IGZ1bmN0aW9uKGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgcmV0dXJuICggaSA+PSAoY3VycmVudFBhZ2UgLSBpbm5lcldpbmRvdykgJiYgaSA8PSAoY3VycmVudFBhZ2UgKyBpbm5lcldpbmRvdykpO1xuICAgIH0sXG4gICAgZG90dGVkOiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pIHtcbiAgICAgIHJldHVybiB0aGlzLmRvdHRlZExlZnQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgfHwgKHRoaXMuZG90dGVkUmlnaHQocGFnaW5nTGlzdCwgaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdywgY3VycmVudFBhZ2VJdGVtKSk7XG4gICAgfSxcbiAgICBkb3R0ZWRMZWZ0OiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICByZXR1cm4gKChpID09IChsZWZ0ICsgMSkpICYmICF0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgJiYgIXRoaXMucmlnaHQoaSwgcmlnaHQpKTtcbiAgICB9LFxuICAgIGRvdHRlZFJpZ2h0OiBmdW5jdGlvbihwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pIHtcbiAgICAgIGlmIChwYWdpbmdMaXN0Lml0ZW1zW2N1cnJlbnRQYWdlSXRlbS0xXS52YWx1ZXMoKS5kb3R0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICgoaSA9PSAocmlnaHQpKSAmJiAhdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpICYmICF0aGlzLnJpZ2h0KGksIHJpZ2h0KSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBhZGRFdmVudCA9IGZ1bmN0aW9uKGVsbSwgaSwgcGFnZSkge1xuICAgICBldmVudHMuYmluZChlbG0sICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgIGxpc3Quc2hvdygoaS0xKSpwYWdlICsgMSwgcGFnZSk7XG4gICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIHBhZ2luZ0xpc3QgPSBuZXcgTGlzdChsaXN0Lmxpc3RDb250YWluZXIuaWQsIHtcbiAgICAgIGxpc3RDbGFzczogb3B0aW9ucy5wYWdpbmF0aW9uQ2xhc3MgfHwgJ3BhZ2luYXRpb24nLFxuICAgICAgaXRlbTogXCI8bGk+PGEgY2xhc3M9J3BhZ2UnIGhyZWY9J2phdmFzY3JpcHQ6ZnVuY3Rpb24gWigpe1o9XFxcIlxcXCJ9WigpJz48L2E+PC9saT5cIixcbiAgICAgIHZhbHVlTmFtZXM6IFsncGFnZScsICdkb3R0ZWQnXSxcbiAgICAgIHNlYXJjaENsYXNzOiAncGFnaW5hdGlvbi1zZWFyY2gtdGhhdC1pcy1ub3Qtc3VwcG9zZWQtdG8tZXhpc3QnLFxuICAgICAgc29ydENsYXNzOiAncGFnaW5hdGlvbi1zb3J0LXRoYXQtaXMtbm90LXN1cHBvc2VkLXRvLWV4aXN0J1xuICAgIH0pO1xuXG4gICAgbGlzdC5vbigndXBkYXRlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgcmVmcmVzaChwYWdpbmdMaXN0LCBvcHRpb25zKTtcbiAgICB9KTtcbiAgICByZWZyZXNoKHBhZ2luZ0xpc3QsIG9wdGlvbnMpO1xuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciBJdGVtID0gcmVxdWlyZSgnLi9pdGVtJykobGlzdCk7XG5cbiAgdmFyIGdldENoaWxkcmVuID0gZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgdmFyIG5vZGVzID0gcGFyZW50LmNoaWxkTm9kZXMsXG4gICAgICBpdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIC8vIE9ubHkgdGV4dG5vZGVzIGhhdmUgYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgaWYgKG5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpdGVtcy5wdXNoKG5vZGVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9O1xuXG4gIHZhciBwYXJzZSA9IGZ1bmN0aW9uKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcykge1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGl0ZW1FbGVtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBsaXN0Lml0ZW1zLnB1c2gobmV3IEl0ZW0odmFsdWVOYW1lcywgaXRlbUVsZW1lbnRzW2ldKSk7XG4gICAgfVxuICB9O1xuICB2YXIgcGFyc2VBc3luYyA9IGZ1bmN0aW9uKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcykge1xuICAgIHZhciBpdGVtc1RvSW5kZXggPSBpdGVtRWxlbWVudHMuc3BsaWNlKDAsIDUwKTsgLy8gVE9ETzogSWYgPCAxMDAgaXRlbXMsIHdoYXQgaGFwcGVucyBpbiBJRSBldGM/XG4gICAgcGFyc2UoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICBpZiAoaXRlbUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHBhcnNlQXN5bmMoaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKTtcbiAgICAgIH0sIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnVwZGF0ZSgpO1xuICAgICAgbGlzdC50cmlnZ2VyKCdwYXJzZUNvbXBsZXRlJyk7XG4gICAgfVxuICB9O1xuXG4gIGxpc3QuaGFuZGxlcnMucGFyc2VDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMucGFyc2VDb21wbGV0ZSB8fCBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zVG9JbmRleCA9IGdldENoaWxkcmVuKGxpc3QubGlzdCksXG4gICAgICB2YWx1ZU5hbWVzID0gbGlzdC52YWx1ZU5hbWVzO1xuXG4gICAgaWYgKGxpc3QuaW5kZXhBc3luYykge1xuICAgICAgcGFyc2VBc3luYyhpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZShpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIH1cbiAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGl0ZW0sXG4gICAgdGV4dCxcbiAgICBjb2x1bW5zLFxuICAgIHNlYXJjaFN0cmluZyxcbiAgICBjdXN0b21TZWFyY2g7XG5cbiAgdmFyIHByZXBhcmUgPSB7XG4gICAgcmVzZXRMaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QuaSA9IDE7XG4gICAgICBsaXN0LnRlbXBsYXRlci5jbGVhcigpO1xuICAgICAgY3VzdG9tU2VhcmNoID0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgc2V0T3B0aW9uczogZnVuY3Rpb24oYXJncykge1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID09IDIgJiYgYXJnc1sxXSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGNvbHVtbnMgPSBhcmdzWzFdO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAyICYmIHR5cGVvZihhcmdzWzFdKSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICAgICAgY3VzdG9tU2VhcmNoID0gYXJnc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMykge1xuICAgICAgICBjb2x1bW5zID0gYXJnc1sxXTtcbiAgICAgICAgY3VzdG9tU2VhcmNoID0gYXJnc1syXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRDb2x1bW5zOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChsaXN0Lml0ZW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgaWYgKGNvbHVtbnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb2x1bW5zID0gKGxpc3Quc2VhcmNoQ29sdW1ucyA9PT0gdW5kZWZpbmVkKSA/IHByZXBhcmUudG9BcnJheShsaXN0Lml0ZW1zWzBdLnZhbHVlcygpKSA6IGxpc3Quc2VhcmNoQ29sdW1ucztcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFNlYXJjaFN0cmluZzogZnVuY3Rpb24ocykge1xuICAgICAgcyA9IGxpc3QudXRpbHMudG9TdHJpbmcocykudG9Mb3dlckNhc2UoKTtcbiAgICAgIHMgPSBzLnJlcGxhY2UoL1stW1xcXXt9KCkqKz8uLFxcXFxeJHwjXS9nLCBcIlxcXFwkJlwiKTsgLy8gRXNjYXBlIHJlZ3VsYXIgZXhwcmVzc2lvbiBjaGFyYWN0ZXJzXG4gICAgICBzZWFyY2hTdHJpbmcgPSBzO1xuICAgIH0sXG4gICAgdG9BcnJheTogZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICB2YXIgdG1wQ29sdW1uID0gW107XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHZhbHVlcykge1xuICAgICAgICB0bXBDb2x1bW4ucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0bXBDb2x1bW47XG4gICAgfVxuICB9O1xuICB2YXIgc2VhcmNoID0ge1xuICAgIGxpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgayA9IDAsIGtsID0gbGlzdC5pdGVtcy5sZW5ndGg7IGsgPCBrbDsgaysrKSB7XG4gICAgICAgIHNlYXJjaC5pdGVtKGxpc3QuaXRlbXNba10pO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbTogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaXRlbS5mb3VuZCA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gY29sdW1ucy5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgIGlmIChzZWFyY2gudmFsdWVzKGl0ZW0udmFsdWVzKCksIGNvbHVtbnNbal0pKSB7XG4gICAgICAgICAgaXRlbS5mb3VuZCA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKHZhbHVlcywgY29sdW1uKSB7XG4gICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KGNvbHVtbikpIHtcbiAgICAgICAgdGV4dCA9IGxpc3QudXRpbHMudG9TdHJpbmcodmFsdWVzW2NvbHVtbl0pLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICgoc2VhcmNoU3RyaW5nICE9PSBcIlwiKSAmJiAodGV4dC5zZWFyY2goc2VhcmNoU3RyaW5nKSA+IC0xKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnJlc2V0LnNlYXJjaCgpO1xuICAgICAgbGlzdC5zZWFyY2hlZCA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICB2YXIgc2VhcmNoTWV0aG9kID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdzZWFyY2hTdGFydCcpO1xuXG4gICAgcHJlcGFyZS5yZXNldExpc3QoKTtcbiAgICBwcmVwYXJlLnNldFNlYXJjaFN0cmluZyhzdHIpO1xuICAgIHByZXBhcmUuc2V0T3B0aW9ucyhhcmd1bWVudHMpOyAvLyBzdHIsIGNvbHN8c2VhcmNoRnVuY3Rpb24sIHNlYXJjaEZ1bmN0aW9uXG4gICAgcHJlcGFyZS5zZXRDb2x1bW5zKCk7XG5cbiAgICBpZiAoc2VhcmNoU3RyaW5nID09PSBcIlwiICkge1xuICAgICAgc2VhcmNoLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc2VhcmNoZWQgPSB0cnVlO1xuICAgICAgaWYgKGN1c3RvbVNlYXJjaCkge1xuICAgICAgICBjdXN0b21TZWFyY2goc2VhcmNoU3RyaW5nLCBjb2x1bW5zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaC5saXN0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ3NlYXJjaENvbXBsZXRlJyk7XG4gICAgcmV0dXJuIGxpc3QudmlzaWJsZUl0ZW1zO1xuICB9O1xuXG4gIGxpc3QuaGFuZGxlcnMuc2VhcmNoU3RhcnQgPSBsaXN0LmhhbmRsZXJzLnNlYXJjaFN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLnNlYXJjaENvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5zZWFyY2hDb21wbGV0ZSB8fCBbXTtcblxuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc2VhcmNoQ2xhc3MpLCAna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudCwgLy8gSUUgaGF2ZSBzcmNFbGVtZW50XG4gICAgICBhbHJlYWR5Q2xlYXJlZCA9ICh0YXJnZXQudmFsdWUgPT09IFwiXCIgJiYgIWxpc3Quc2VhcmNoZWQpO1xuICAgIGlmICghYWxyZWFkeUNsZWFyZWQpIHsgLy8gSWYgb25pbnB1dCBhbHJlYWR5IGhhdmUgcmVzZXR0ZWQgdGhlIGxpc3QsIGRvIG5vdGhpbmdcbiAgICAgIHNlYXJjaE1ldGhvZCh0YXJnZXQudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVXNlZCB0byBkZXRlY3QgY2xpY2sgb24gSFRNTDUgY2xlYXIgYnV0dG9uXG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQobGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zZWFyY2hDbGFzcyksICdpbnB1dCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgIGlmICh0YXJnZXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIHNlYXJjaE1ldGhvZCgnJyk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2VhcmNoTWV0aG9kO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuXG4gIHZhciBidXR0b25zID0ge1xuICAgIGVsczogdW5kZWZpbmVkLFxuICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGJ1dHRvbnMuZWxzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ1dHRvbnMuZWxzW2ldKS5yZW1vdmUoJ2FzYycpO1xuICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnV0dG9ucy5lbHNbaV0pLnJlbW92ZSgnZGVzYycpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0T3JkZXI6IGZ1bmN0aW9uKGJ0bikge1xuICAgICAgdmFyIHByZWRlZmluZWRPcmRlciA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtb3JkZXInKTtcbiAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gXCJhc2NcIiB8fCBwcmVkZWZpbmVkT3JkZXIgPT0gXCJkZXNjXCIpIHtcbiAgICAgICAgcmV0dXJuIHByZWRlZmluZWRPcmRlcjtcbiAgICAgIH0gZWxzZSBpZiAobGlzdC51dGlscy5jbGFzc2VzKGJ0bikuaGFzKCdkZXNjJykpIHtcbiAgICAgICAgcmV0dXJuIFwiYXNjXCI7XG4gICAgICB9IGVsc2UgaWYgKGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmhhcygnYXNjJykpIHtcbiAgICAgICAgcmV0dXJuIFwiZGVzY1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiYXNjXCI7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRJblNlbnNpdGl2ZTogZnVuY3Rpb24oYnRuLCBvcHRpb25zKSB7XG4gICAgICB2YXIgaW5zZW5zaXRpdmUgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLWluc2Vuc2l0aXZlJyk7XG4gICAgICBpZiAoaW5zZW5zaXRpdmUgPT09IFwiZmFsc2VcIikge1xuICAgICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldE9yZGVyOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBidXR0b25zLmVscy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIHZhciBidG4gPSBidXR0b25zLmVsc1tpXTtcbiAgICAgICAgaWYgKGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtc29ydCcpICE9PSBvcHRpb25zLnZhbHVlTmFtZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmVkZWZpbmVkT3JkZXIgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLW9yZGVyJyk7XG4gICAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gXCJhc2NcIiB8fCBwcmVkZWZpbmVkT3JkZXIgPT0gXCJkZXNjXCIpIHtcbiAgICAgICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IG9wdGlvbnMub3JkZXIpIHtcbiAgICAgICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmFkZChvcHRpb25zLm9yZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ0bikuYWRkKG9wdGlvbnMub3JkZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBzb3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgbGlzdC50cmlnZ2VyKCdzb3J0U3RhcnQnKTtcbiAgICB2YXIgb3B0aW9ucyA9IHt9O1xuXG4gICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXS5jdXJyZW50VGFyZ2V0IHx8IGFyZ3VtZW50c1swXS5zcmNFbGVtZW50IHx8IHVuZGVmaW5lZDtcblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIG9wdGlvbnMudmFsdWVOYW1lID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUodGFyZ2V0LCAnZGF0YS1zb3J0Jyk7XG4gICAgICBidXR0b25zLmdldEluU2Vuc2l0aXZlKHRhcmdldCwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLm9yZGVyID0gYnV0dG9ucy5nZXRPcmRlcih0YXJnZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zID0gYXJndW1lbnRzWzFdIHx8IG9wdGlvbnM7XG4gICAgICBvcHRpb25zLnZhbHVlTmFtZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIG9wdGlvbnMub3JkZXIgPSBvcHRpb25zLm9yZGVyIHx8IFwiYXNjXCI7XG4gICAgICBvcHRpb25zLmluc2Vuc2l0aXZlID0gKHR5cGVvZiBvcHRpb25zLmluc2Vuc2l0aXZlID09IFwidW5kZWZpbmVkXCIpID8gdHJ1ZSA6IG9wdGlvbnMuaW5zZW5zaXRpdmU7XG4gICAgfVxuXG4gICAgYnV0dG9ucy5jbGVhcigpO1xuICAgIGJ1dHRvbnMuc2V0T3JkZXIob3B0aW9ucyk7XG5cblxuICAgIC8vIGNhc2VJbnNlbnNpdGl2ZVxuICAgIC8vIGFscGhhYmV0XG4gICAgdmFyIGN1c3RvbVNvcnRGdW5jdGlvbiA9IChvcHRpb25zLnNvcnRGdW5jdGlvbiB8fCBsaXN0LnNvcnRGdW5jdGlvbiB8fCBudWxsKSxcbiAgICAgICAgbXVsdGkgPSAoKG9wdGlvbnMub3JkZXIgPT09ICdkZXNjJykgPyAtMSA6IDEpLFxuICAgICAgICBzb3J0RnVuY3Rpb247XG5cbiAgICBpZiAoY3VzdG9tU29ydEZ1bmN0aW9uKSB7XG4gICAgICBzb3J0RnVuY3Rpb24gPSBmdW5jdGlvbihpdGVtQSwgaXRlbUIpIHtcbiAgICAgICAgcmV0dXJuIGN1c3RvbVNvcnRGdW5jdGlvbihpdGVtQSwgaXRlbUIsIG9wdGlvbnMpICogbXVsdGk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBzb3J0RnVuY3Rpb24gPSBmdW5jdGlvbihpdGVtQSwgaXRlbUIpIHtcbiAgICAgICAgdmFyIHNvcnQgPSBsaXN0LnV0aWxzLm5hdHVyYWxTb3J0O1xuICAgICAgICBzb3J0LmFscGhhYmV0ID0gbGlzdC5hbHBoYWJldCB8fCBvcHRpb25zLmFscGhhYmV0IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCFzb3J0LmFscGhhYmV0ICYmIG9wdGlvbnMuaW5zZW5zaXRpdmUpIHtcbiAgICAgICAgICBzb3J0ID0gbGlzdC51dGlscy5uYXR1cmFsU29ydC5jYXNlSW5zZW5zaXRpdmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvcnQoaXRlbUEudmFsdWVzKClbb3B0aW9ucy52YWx1ZU5hbWVdLCBpdGVtQi52YWx1ZXMoKVtvcHRpb25zLnZhbHVlTmFtZV0pICogbXVsdGk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGxpc3QuaXRlbXMuc29ydChzb3J0RnVuY3Rpb24pO1xuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdzb3J0Q29tcGxldGUnKTtcbiAgfTtcblxuICAvLyBBZGQgaGFuZGxlcnNcbiAgbGlzdC5oYW5kbGVycy5zb3J0U3RhcnQgPSBsaXN0LmhhbmRsZXJzLnNvcnRTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5zb3J0Q29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnNvcnRDb21wbGV0ZSB8fCBbXTtcblxuICBidXR0b25zLmVscyA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc29ydENsYXNzKTtcbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChidXR0b25zLmVscywgJ2NsaWNrJywgc29ydCk7XG4gIGxpc3Qub24oJ3NlYXJjaFN0YXJ0JywgYnV0dG9ucy5jbGVhcik7XG4gIGxpc3Qub24oJ2ZpbHRlclN0YXJ0JywgYnV0dG9ucy5jbGVhcik7XG5cbiAgcmV0dXJuIHNvcnQ7XG59O1xuIiwidmFyIFRlbXBsYXRlciA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGl0ZW1Tb3VyY2UsXG4gICAgdGVtcGxhdGVyID0gdGhpcztcblxuICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGl0ZW1Tb3VyY2UgPSB0ZW1wbGF0ZXIuZ2V0SXRlbVNvdXJjZShsaXN0Lml0ZW0pO1xuICAgIGlmIChpdGVtU291cmNlKSB7XG4gICAgICBpdGVtU291cmNlID0gdGVtcGxhdGVyLmNsZWFyU291cmNlSXRlbShpdGVtU291cmNlLCBsaXN0LnZhbHVlTmFtZXMpO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmNsZWFyU291cmNlSXRlbSA9IGZ1bmN0aW9uKGVsLCB2YWx1ZU5hbWVzKSB7XG4gICAgZm9yKHZhciBpID0gMCwgaWwgPSB2YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBlbG07XG4gICAgICBpZiAodmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IHZhbHVlTmFtZXNbaV0uZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLScrdmFsdWVOYW1lc1tpXS5kYXRhW2pdLCAnJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lc1tpXS5hdHRyICYmIHZhbHVlTmFtZXNbaV0ubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoZWwsIHZhbHVlTmFtZXNbaV0ubmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKHZhbHVlTmFtZXNbaV0uYXR0ciwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhlbCwgdmFsdWVOYW1lc1tpXSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgdGhpcy5nZXRJdGVtU291cmNlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciBub2RlcyA9IGxpc3QubGlzdC5jaGlsZE5vZGVzLFxuICAgICAgICBpdGVtcyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBub2Rlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIC8vIE9ubHkgdGV4dG5vZGVzIGhhdmUgYSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgICBpZiAobm9kZXNbaV0uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzW2ldLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoLzx0cltcXHM+XS9nLmV4ZWMoaXRlbSkpIHtcbiAgICAgIHZhciB0Ym9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3Rib2R5Jyk7XG4gICAgICB0Ym9keS5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgcmV0dXJuIHRib2R5LmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIGlmIChpdGVtLmluZGV4T2YoXCI8XCIpICE9PSAtMSkge1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICByZXR1cm4gZGl2LmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBzb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaXN0Lml0ZW0pO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9O1xuXG4gIHRoaXMuZ2V0ID0gZnVuY3Rpb24oaXRlbSwgdmFsdWVOYW1lcykge1xuICAgIHRlbXBsYXRlci5jcmVhdGUoaXRlbSk7XG4gICAgdmFyIHZhbHVlcyA9IHt9O1xuICAgIGZvcih2YXIgaSA9IDAsIGlsID0gdmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgaWYgKHZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSB2YWx1ZU5hbWVzW2ldLmRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldLmRhdGFbal1dID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoaXRlbS5lbG0sICdkYXRhLScrdmFsdWVOYW1lc1tpXS5kYXRhW2pdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWVzW2ldLmF0dHIgJiYgdmFsdWVOYW1lc1tpXS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lc1tpXS5uYW1lLCB0cnVlKTtcbiAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV0ubmFtZV0gPSBlbG0gPyBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShlbG0sIHZhbHVlTmFtZXNbaV0uYXR0cikgOiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWVzW2ldLCB0cnVlKTtcbiAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV1dID0gZWxtID8gZWxtLmlubmVySFRNTCA6IFwiXCI7XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgdGhpcy5zZXQgPSBmdW5jdGlvbihpdGVtLCB2YWx1ZXMpIHtcbiAgICB2YXIgZ2V0VmFsdWVOYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbGlzdC52YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3QudmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBsaXN0LnZhbHVlTmFtZXNbaV0uZGF0YTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBkYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChkYXRhW2pdID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGRhdGE6IG5hbWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdC52YWx1ZU5hbWVzW2ldLmF0dHIgJiYgbGlzdC52YWx1ZU5hbWVzW2ldLm5hbWUgJiYgbGlzdC52YWx1ZU5hbWVzW2ldLm5hbWUgPT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBsaXN0LnZhbHVlTmFtZXNbaV07XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdC52YWx1ZU5hbWVzW2ldID09PSBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZXRWYWx1ZSA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgdmFyIHZhbHVlTmFtZSA9IGdldFZhbHVlTmFtZShuYW1lKTtcbiAgICAgIGlmICghdmFsdWVOYW1lKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAodmFsdWVOYW1lLmRhdGEpIHtcbiAgICAgICAgaXRlbS5lbG0uc2V0QXR0cmlidXRlKCdkYXRhLScrdmFsdWVOYW1lLmRhdGEsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lLmF0dHIgJiYgdmFsdWVOYW1lLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWUubmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uc2V0QXR0cmlidXRlKHZhbHVlTmFtZS5hdHRyLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgaWYgKCF0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pKSB7XG4gICAgICBmb3IodmFyIHYgaW4gdmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkodikpIHtcbiAgICAgICAgICBzZXRWYWx1ZSh2LCB2YWx1ZXNbdl0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpdGVtU291cmNlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlRoZSBsaXN0IG5lZWQgdG8gaGF2ZSBhdCBsaXN0IG9uZSBpdGVtIG9uIGluaXQgb3RoZXJ3aXNlIHlvdSdsbCBoYXZlIHRvIGFkZCBhIHRlbXBsYXRlLlwiKTtcbiAgICB9XG4gICAgLyogSWYgaXRlbSBzb3VyY2UgZG9lcyBub3QgZXhpc3RzLCB1c2UgdGhlIGZpcnN0IGl0ZW0gaW4gbGlzdCBhc1xuICAgIHNvdXJjZSBmb3IgbmV3IGl0ZW1zICovXG4gICAgdmFyIG5ld0l0ZW0gPSBpdGVtU291cmNlLmNsb25lTm9kZSh0cnVlKTtcbiAgICBuZXdJdGVtLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcbiAgICBpdGVtLmVsbSA9IG5ld0l0ZW07XG4gICAgdGVtcGxhdGVyLnNldChpdGVtLCBpdGVtLnZhbHVlcygpKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgdGhpcy5yZW1vdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtLnBhcmVudE5vZGUgPT09IGxpc3QubGlzdCkge1xuICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGl0ZW0uZWxtKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICB0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pO1xuICAgIGxpc3QubGlzdC5hcHBlbmRDaGlsZChpdGVtLmVsbSk7XG4gIH07XG4gIHRoaXMuaGlkZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0gIT09IHVuZGVmaW5lZCAmJiBpdGVtLmVsbS5wYXJlbnROb2RlID09PSBsaXN0Lmxpc3QpIHtcbiAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChpdGVtLmVsbSk7XG4gICAgfVxuICB9O1xuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgLyogLmlubmVySFRNTCA9ICcnOyBmdWNrcyB1cCBJRSAqL1xuICAgIGlmIChsaXN0Lmxpc3QuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICB3aGlsZSAobGlzdC5saXN0LmNoaWxkTm9kZXMubGVuZ3RoID49IDEpXG4gICAgICB7XG4gICAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChsaXN0Lmxpc3QuZmlyc3RDaGlsZCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGluaXQoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICByZXR1cm4gbmV3IFRlbXBsYXRlcihsaXN0KTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGluZGV4ID0gcmVxdWlyZSgnLi9pbmRleC1vZicpO1xuXG4vKipcbiAqIFdoaXRlc3BhY2UgcmVnZXhwLlxuICovXG5cbnZhciByZSA9IC9cXHMrLztcblxuLyoqXG4gKiB0b1N0cmluZyByZWZlcmVuY2UuXG4gKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBXcmFwIGBlbGAgaW4gYSBgQ2xhc3NMaXN0YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwpe1xuICByZXR1cm4gbmV3IENsYXNzTGlzdChlbCk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgQ2xhc3NMaXN0IGZvciBgZWxgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIENsYXNzTGlzdChlbCkge1xuICBpZiAoIWVsIHx8ICFlbC5ub2RlVHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQSBET00gZWxlbWVudCByZWZlcmVuY2UgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICB0aGlzLmVsID0gZWw7XG4gIHRoaXMubGlzdCA9IGVsLmNsYXNzTGlzdDtcbn1cblxuLyoqXG4gKiBBZGQgY2xhc3MgYG5hbWVgIGlmIG5vdCBhbHJlYWR5IHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihuYW1lKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICB0aGlzLmxpc3QuYWRkKG5hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAoIX5pKSBhcnIucHVzaChuYW1lKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGNsYXNzIGBuYW1lYCB3aGVuIHByZXNlbnQsIG9yXG4gKiBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIHJlbW92ZVxuICogYW55IHdoaWNoIG1hdGNoLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKG5hbWUpe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIHRoaXMubGlzdC5yZW1vdmUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICB2YXIgYXJyID0gdGhpcy5hcnJheSgpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICh+aSkgYXJyLnNwbGljZShpLCAxKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBUb2dnbGUgY2xhc3MgYG5hbWVgLCBjYW4gZm9yY2Ugc3RhdGUgdmlhIGBmb3JjZWAuXG4gKlxuICogRm9yIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBjbGFzc0xpc3QsIGJ1dCBkbyBub3Qgc3VwcG9ydCBgZm9yY2VgIHlldCxcbiAqIHRoZSBtaXN0YWtlIHdpbGwgYmUgZGV0ZWN0ZWQgYW5kIGNvcnJlY3RlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBmb3JjZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKG5hbWUsIGZvcmNlKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGZvcmNlKSB7XG4gICAgICBpZiAoZm9yY2UgIT09IHRoaXMubGlzdC50b2dnbGUobmFtZSwgZm9yY2UpKSB7XG4gICAgICAgIHRoaXMubGlzdC50b2dnbGUobmFtZSk7IC8vIHRvZ2dsZSBhZ2FpbiB0byBjb3JyZWN0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdC50b2dnbGUobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBmb3JjZSkge1xuICAgIGlmICghZm9yY2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuaGFzKG5hbWUpKSB7XG4gICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBvZiBjbGFzc2VzLlxuICpcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmFycmF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICB2YXIgc3RyID0gY2xhc3NOYW1lLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgdmFyIGFyciA9IHN0ci5zcGxpdChyZSk7XG4gIGlmICgnJyA9PT0gYXJyWzBdKSBhcnIuc2hpZnQoKTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgY2xhc3MgYG5hbWVgIGlzIHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5oYXMgPVxuQ2xhc3NMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gdGhpcy5saXN0ID8gdGhpcy5saXN0LmNvbnRhaW5zKG5hbWUpIDogISEgfmluZGV4KHRoaXMuYXJyYXkoKSwgbmFtZSk7XG59O1xuIiwidmFyIGJpbmQgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG4gICAgdW5iaW5kID0gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIgPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnZGV0YWNoRXZlbnQnLFxuICAgIHByZWZpeCA9IGJpbmQgIT09ICdhZGRFdmVudExpc3RlbmVyJyA/ICdvbicgOiAnJyxcbiAgICB0b0FycmF5ID0gcmVxdWlyZSgnLi90by1hcnJheScpO1xuXG4vKipcbiAqIEJpbmQgYGVsYCBldmVudCBgdHlwZWAgdG8gYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsLCBOb2RlTGlzdCwgSFRNTENvbGxlY3Rpb24gb3IgQXJyYXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsID0gdG9BcnJheShlbCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrICkge1xuICAgIGVsW2ldW2JpbmRdKHByZWZpeCArIHR5cGUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBVbmJpbmQgYGVsYCBldmVudCBgdHlwZWAncyBjYWxsYmFjayBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiBvciBBcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy51bmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBlbCA9IHRvQXJyYXkoZWwpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKyApIHtcbiAgICBlbFtpXVt1bmJpbmRdKHByZWZpeCArIHR5cGUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxufTtcbiIsIi8qXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9zZWdtZW50aW8vZXh0ZW5kXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQgKG9iamVjdCkge1xuICAgIC8vIFRha2VzIGFuIHVubGltaXRlZCBudW1iZXIgb2YgZXh0ZW5kZXJzLlxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIC8vIEZvciBlYWNoIGV4dGVuZGVyLCBjb3B5IHRoZWlyIHByb3BlcnRpZXMgb24gb3VyIG9iamVjdC5cbiAgICBmb3IgKHZhciBpID0gMCwgc291cmNlOyBzb3VyY2UgPSBhcmdzW2ldOyBpKyspIHtcbiAgICAgICAgaWYgKCFzb3VyY2UpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIG9iamVjdFtwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHRleHQsIHBhdHRlcm4sIG9wdGlvbnMpIHtcbiAgICAvLyBBcHJveGltYXRlbHkgd2hlcmUgaW4gdGhlIHRleHQgaXMgdGhlIHBhdHRlcm4gZXhwZWN0ZWQgdG8gYmUgZm91bmQ/XG4gICAgdmFyIE1hdGNoX0xvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiB8fCAwO1xuXG4gICAgLy9EZXRlcm1pbmVzIGhvdyBjbG9zZSB0aGUgbWF0Y2ggbXVzdCBiZSB0byB0aGUgZnV6enkgbG9jYXRpb24gKHNwZWNpZmllZCBhYm92ZSkuIEFuIGV4YWN0IGxldHRlciBtYXRjaCB3aGljaCBpcyAnZGlzdGFuY2UnIGNoYXJhY3RlcnMgYXdheSBmcm9tIHRoZSBmdXp6eSBsb2NhdGlvbiB3b3VsZCBzY29yZSBhcyBhIGNvbXBsZXRlIG1pc21hdGNoLiBBIGRpc3RhbmNlIG9mICcwJyByZXF1aXJlcyB0aGUgbWF0Y2ggYmUgYXQgdGhlIGV4YWN0IGxvY2F0aW9uIHNwZWNpZmllZCwgYSB0aHJlc2hvbGQgb2YgJzEwMDAnIHdvdWxkIHJlcXVpcmUgYSBwZXJmZWN0IG1hdGNoIHRvIGJlIHdpdGhpbiA4MDAgY2hhcmFjdGVycyBvZiB0aGUgZnV6enkgbG9jYXRpb24gdG8gYmUgZm91bmQgdXNpbmcgYSAwLjggdGhyZXNob2xkLlxuICAgIHZhciBNYXRjaF9EaXN0YW5jZSA9IG9wdGlvbnMuZGlzdGFuY2UgfHwgMTAwO1xuXG4gICAgLy8gQXQgd2hhdCBwb2ludCBkb2VzIHRoZSBtYXRjaCBhbGdvcml0aG0gZ2l2ZSB1cC4gQSB0aHJlc2hvbGQgb2YgJzAuMCcgcmVxdWlyZXMgYSBwZXJmZWN0IG1hdGNoIChvZiBib3RoIGxldHRlcnMgYW5kIGxvY2F0aW9uKSwgYSB0aHJlc2hvbGQgb2YgJzEuMCcgd291bGQgbWF0Y2ggYW55dGhpbmcuXG4gICAgdmFyIE1hdGNoX1RocmVzaG9sZCA9IG9wdGlvbnMudGhyZXNob2xkIHx8IDAuNDtcblxuICAgIGlmIChwYXR0ZXJuID09PSB0ZXh0KSByZXR1cm4gdHJ1ZTsgLy8gRXhhY3QgbWF0Y2hcbiAgICBpZiAocGF0dGVybi5sZW5ndGggPiAzMikgcmV0dXJuIGZhbHNlOyAvLyBUaGlzIGFsZ29yaXRobSBjYW5ub3QgYmUgdXNlZFxuXG4gICAgLy8gU2V0IHN0YXJ0aW5nIGxvY2F0aW9uIGF0IGJlZ2lubmluZyB0ZXh0IGFuZCBpbml0aWFsaXNlIHRoZSBhbHBoYWJldC5cbiAgICB2YXIgbG9jID0gTWF0Y2hfTG9jYXRpb24sXG4gICAgICAgIHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcSA9IHt9LFxuICAgICAgICAgICAgICAgIGk7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcVtwYXR0ZXJuLmNoYXJBdChpKV0gPSAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGF0dGVybi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHFbcGF0dGVybi5jaGFyQXQoaSldIHw9IDEgPDwgKHBhdHRlcm4ubGVuZ3RoIC0gaSAtIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcTtcbiAgICAgICAgfSgpKTtcblxuICAgIC8vIENvbXB1dGUgYW5kIHJldHVybiB0aGUgc2NvcmUgZm9yIGEgbWF0Y2ggd2l0aCBlIGVycm9ycyBhbmQgeCBsb2NhdGlvbi5cbiAgICAvLyBBY2Nlc3NlcyBsb2MgYW5kIHBhdHRlcm4gdGhyb3VnaCBiZWluZyBhIGNsb3N1cmUuXG5cbiAgICBmdW5jdGlvbiBtYXRjaF9iaXRhcFNjb3JlXyhlLCB4KSB7XG4gICAgICAgIHZhciBhY2N1cmFjeSA9IGUgLyBwYXR0ZXJuLmxlbmd0aCxcbiAgICAgICAgICAgIHByb3hpbWl0eSA9IE1hdGguYWJzKGxvYyAtIHgpO1xuXG4gICAgICAgIGlmICghTWF0Y2hfRGlzdGFuY2UpIHtcbiAgICAgICAgICAgIC8vIERvZGdlIGRpdmlkZSBieSB6ZXJvIGVycm9yLlxuICAgICAgICAgICAgcmV0dXJuIHByb3hpbWl0eSA/IDEuMCA6IGFjY3VyYWN5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2N1cmFjeSArIChwcm94aW1pdHkgLyBNYXRjaF9EaXN0YW5jZSk7XG4gICAgfVxuXG4gICAgdmFyIHNjb3JlX3RocmVzaG9sZCA9IE1hdGNoX1RocmVzaG9sZCwgLy8gSGlnaGVzdCBzY29yZSBiZXlvbmQgd2hpY2ggd2UgZ2l2ZSB1cC5cbiAgICAgICAgYmVzdF9sb2MgPSB0ZXh0LmluZGV4T2YocGF0dGVybiwgbG9jKTsgLy8gSXMgdGhlcmUgYSBuZWFyYnkgZXhhY3QgbWF0Y2g/IChzcGVlZHVwKVxuXG4gICAgaWYgKGJlc3RfbG9jICE9IC0xKSB7XG4gICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICAgICAgLy8gV2hhdCBhYm91dCBpbiB0aGUgb3RoZXIgZGlyZWN0aW9uPyAoc3BlZWR1cClcbiAgICAgICAgYmVzdF9sb2MgPSB0ZXh0Lmxhc3RJbmRleE9mKHBhdHRlcm4sIGxvYyArIHBhdHRlcm4ubGVuZ3RoKTtcblxuICAgICAgICBpZiAoYmVzdF9sb2MgIT0gLTEpIHtcbiAgICAgICAgICAgIHNjb3JlX3RocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluaXRpYWxpc2UgdGhlIGJpdCBhcnJheXMuXG4gICAgdmFyIG1hdGNobWFzayA9IDEgPDwgKHBhdHRlcm4ubGVuZ3RoIC0gMSk7XG4gICAgYmVzdF9sb2MgPSAtMTtcblxuICAgIHZhciBiaW5fbWluLCBiaW5fbWlkO1xuICAgIHZhciBiaW5fbWF4ID0gcGF0dGVybi5sZW5ndGggKyB0ZXh0Lmxlbmd0aDtcbiAgICB2YXIgbGFzdF9yZDtcbiAgICBmb3IgKHZhciBkID0gMDsgZCA8IHBhdHRlcm4ubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgLy8gU2NhbiBmb3IgdGhlIGJlc3QgbWF0Y2g7IGVhY2ggaXRlcmF0aW9uIGFsbG93cyBmb3Igb25lIG1vcmUgZXJyb3IuXG4gICAgICAgIC8vIFJ1biBhIGJpbmFyeSBzZWFyY2ggdG8gZGV0ZXJtaW5lIGhvdyBmYXIgZnJvbSAnbG9jJyB3ZSBjYW4gc3RyYXkgYXQgdGhpc1xuICAgICAgICAvLyBlcnJvciBsZXZlbC5cbiAgICAgICAgYmluX21pbiA9IDA7XG4gICAgICAgIGJpbl9taWQgPSBiaW5fbWF4O1xuICAgICAgICB3aGlsZSAoYmluX21pbiA8IGJpbl9taWQpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaF9iaXRhcFNjb3JlXyhkLCBsb2MgKyBiaW5fbWlkKSA8PSBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICBiaW5fbWluID0gYmluX21pZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYmluX21heCA9IGJpbl9taWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaW5fbWlkID0gTWF0aC5mbG9vcigoYmluX21heCAtIGJpbl9taW4pIC8gMiArIGJpbl9taW4pO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVzZSB0aGUgcmVzdWx0IGZyb20gdGhpcyBpdGVyYXRpb24gYXMgdGhlIG1heGltdW0gZm9yIHRoZSBuZXh0LlxuICAgICAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICAgICAgdmFyIHN0YXJ0ID0gTWF0aC5tYXgoMSwgbG9jIC0gYmluX21pZCArIDEpO1xuICAgICAgICB2YXIgZmluaXNoID0gTWF0aC5taW4obG9jICsgYmluX21pZCwgdGV4dC5sZW5ndGgpICsgcGF0dGVybi5sZW5ndGg7XG5cbiAgICAgICAgdmFyIHJkID0gQXJyYXkoZmluaXNoICsgMik7XG4gICAgICAgIHJkW2ZpbmlzaCArIDFdID0gKDEgPDwgZCkgLSAxO1xuICAgICAgICBmb3IgKHZhciBqID0gZmluaXNoOyBqID49IHN0YXJ0OyBqLS0pIHtcbiAgICAgICAgICAgIC8vIFRoZSBhbHBoYWJldCAocykgaXMgYSBzcGFyc2UgaGFzaCwgc28gdGhlIGZvbGxvd2luZyBsaW5lIGdlbmVyYXRlc1xuICAgICAgICAgICAgLy8gd2FybmluZ3MuXG4gICAgICAgICAgICB2YXIgY2hhck1hdGNoID0gc1t0ZXh0LmNoYXJBdChqIC0gMSldO1xuICAgICAgICAgICAgaWYgKGQgPT09IDApIHsgICAgLy8gRmlyc3QgcGFzczogZXhhY3QgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoO1xuICAgICAgICAgICAgfSBlbHNlIHsgICAgLy8gU3Vic2VxdWVudCBwYXNzZXM6IGZ1enp5IG1hdGNoLlxuICAgICAgICAgICAgICAgIHJkW2pdID0gKCgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2gpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCgobGFzdF9yZFtqICsgMV0gfCBsYXN0X3JkW2pdKSA8PCAxKSB8IDEpIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9yZFtqICsgMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmRbal0gJiBtYXRjaG1hc2spIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSBtYXRjaF9iaXRhcFNjb3JlXyhkLCBqIC0gMSk7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBtYXRjaCB3aWxsIGFsbW9zdCBjZXJ0YWlubHkgYmUgYmV0dGVyIHRoYW4gYW55IGV4aXN0aW5nIG1hdGNoLlxuICAgICAgICAgICAgICAgIC8vIEJ1dCBjaGVjayBhbnl3YXkuXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlIDw9IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUb2xkIHlvdSBzby5cbiAgICAgICAgICAgICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gc2NvcmU7XG4gICAgICAgICAgICAgICAgICAgIGJlc3RfbG9jID0gaiAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiZXN0X2xvYyA+IGxvYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2hlbiBwYXNzaW5nIGxvYywgZG9uJ3QgZXhjZWVkIG91ciBjdXJyZW50IGRpc3RhbmNlIGZyb20gbG9jLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgxLCAyICogbG9jIC0gYmVzdF9sb2MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWxyZWFkeSBwYXNzZWQgbG9jLCBkb3duaGlsbCBmcm9tIGhlcmUgb24gaW4uXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBObyBob3BlIGZvciBhIChiZXR0ZXIpIG1hdGNoIGF0IGdyZWF0ZXIgZXJyb3IgbGV2ZWxzLlxuICAgICAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCArIDEsIGxvYykgPiBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RfcmQgPSByZDtcbiAgICB9XG5cbiAgICByZXR1cm4gKGJlc3RfbG9jIDwgMCkgPyBmYWxzZSA6IHRydWU7XG59O1xuIiwiLyoqXG4gKiBBIGNyb3NzLWJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgZ2V0QXR0cmlidXRlLlxuICogU291cmNlIGZvdW5kIGhlcmU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM3NTUzNDMvMzYxMzM3IHdyaXR0ZW4gYnkgVml2aW4gUGFsaWF0aFxuICpcbiAqIFJldHVybiB0aGUgdmFsdWUgZm9yIGBhdHRyYCBhdCBgZWxlbWVudGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgYXR0cikge1xuICB2YXIgcmVzdWx0ID0gKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoYXR0cikpIHx8IG51bGw7XG4gIGlmKCAhcmVzdWx0ICkge1xuICAgIHZhciBhdHRycyA9IGVsLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGxlbmd0aCA9IGF0dHJzLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhdHRyW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYoYXR0cltpXS5ub2RlTmFtZSA9PT0gYXR0cikge1xuICAgICAgICAgIHJlc3VsdCA9IGF0dHJbaV0ubm9kZVZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiLyoqXG4gKiBBIGNyb3NzLWJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgZ2V0RWxlbWVudHNCeUNsYXNzLlxuICogSGVhdmlseSBiYXNlZCBvbiBEdXN0aW4gRGlheidzIGZ1bmN0aW9uOiBodHRwOi8vZHVzdGluZGlhei5jb20vZ2V0ZWxlbWVudHNieWNsYXNzLlxuICpcbiAqIEZpbmQgYWxsIGVsZW1lbnRzIHdpdGggY2xhc3MgYGNsYXNzTmFtZWAgaW5zaWRlIGBjb250YWluZXJgLlxuICogVXNlIGBzaW5nbGUgPSB0cnVlYCB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZSBpbiBvbGRlciBicm93c2Vyc1xuICogd2hlbiBvbmx5IG9uZSBlbGVtZW50IGlzIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lclxuICogQHBhcmFtIHtCb29sZWFufSBzaW5nbGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxudmFyIGdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIGlmIChzaW5nbGUpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgfVxufTtcblxudmFyIHF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIGNsYXNzTmFtZSA9ICcuJyArIGNsYXNzTmFtZTtcbiAgaWYgKHNpbmdsZSkge1xuICAgIHJldHVybiBjb250YWluZXIucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpO1xuICB9XG59O1xuXG52YXIgcG9seWZpbGwgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIHZhciBjbGFzc0VsZW1lbnRzID0gW10sXG4gICAgdGFnID0gJyonO1xuXG4gIHZhciBlbHMgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcbiAgdmFyIGVsc0xlbiA9IGVscy5sZW5ndGg7XG4gIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK2NsYXNzTmFtZStcIihcXFxcc3wkKVwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgZWxzTGVuOyBpKyspIHtcbiAgICBpZiAoIHBhdHRlcm4udGVzdChlbHNbaV0uY2xhc3NOYW1lKSApIHtcbiAgICAgIGlmIChzaW5nbGUpIHtcbiAgICAgICAgcmV0dXJuIGVsc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzRWxlbWVudHNbal0gPSBlbHNbaV07XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsYXNzRWxlbWVudHM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoKG9wdGlvbnMudGVzdCAmJiBvcHRpb25zLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHx8ICghb3B0aW9ucy50ZXN0ICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9IGVsc2UgaWYgKChvcHRpb25zLnRlc3QgJiYgb3B0aW9ucy5xdWVyeVNlbGVjdG9yKSB8fCAoIW9wdGlvbnMudGVzdCAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbChjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9XG4gIH07XG59KSgpO1xuIiwidmFyIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgb2JqKXtcbiAgaWYgKGluZGV4T2YpIHJldHVybiBhcnIuaW5kZXhPZihvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTtcbiIsIi8qKlxuICogU291cmNlOiBodHRwczovL2dpdGh1Yi5jb20vdGltb3hsZXkvdG8tYXJyYXlcbiAqXG4gKiBDb252ZXJ0IGFuIGFycmF5LWxpa2Ugb2JqZWN0IGludG8gYW4gYEFycmF5YC5cbiAqIElmIGBjb2xsZWN0aW9uYCBpcyBhbHJlYWR5IGFuIGBBcnJheWAsIHRoZW4gd2lsbCByZXR1cm4gYSBjbG9uZSBvZiBgY29sbGVjdGlvbmAuXG4gKlxuICogQHBhcmFtIHtBcnJheSB8IE1peGVkfSBjb2xsZWN0aW9uIEFuIGBBcnJheWAgb3IgYXJyYXktbGlrZSBvYmplY3QgdG8gY29udmVydCBlLmcuIGBhcmd1bWVudHNgIG9yIGBOb2RlTGlzdGBcbiAqIEByZXR1cm4ge0FycmF5fSBOYWl2ZSBjb252ZXJzaW9uIG9mIGBjb2xsZWN0aW9uYCB0byBhIG5ldyBgQXJyYXlgLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRvQXJyYXkoY29sbGVjdGlvbikge1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gW107XG4gIGlmIChjb2xsZWN0aW9uID09PSBudWxsKSByZXR1cm4gW251bGxdO1xuICBpZiAoY29sbGVjdGlvbiA9PT0gd2luZG93KSByZXR1cm4gW3dpbmRvd107XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ3N0cmluZycpIHJldHVybiBbY29sbGVjdGlvbl07XG4gIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSByZXR1cm4gY29sbGVjdGlvbjtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uLmxlbmd0aCAhPSAnbnVtYmVyJykgcmV0dXJuIFtjb2xsZWN0aW9uXTtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnZnVuY3Rpb24nICYmIGNvbGxlY3Rpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikgcmV0dXJuIFtjb2xsZWN0aW9uXTtcblxuICB2YXIgYXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29sbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sbGVjdGlvbiwgaSkgfHwgaSBpbiBjb2xsZWN0aW9uKSB7XG4gICAgICBhcnIucHVzaChjb2xsZWN0aW9uW2ldKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFhcnIubGVuZ3RoKSByZXR1cm4gW107XG4gIHJldHVybiBhcnI7XG59O1xuXG5mdW5jdGlvbiBpc0FycmF5KGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocykge1xuICBzID0gKHMgPT09IHVuZGVmaW5lZCkgPyBcIlwiIDogcztcbiAgcyA9IChzID09PSBudWxsKSA/IFwiXCIgOiBzO1xuICBzID0gcy50b1N0cmluZygpO1xuICByZXR1cm4gcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBhbHBoYWJldDtcbnZhciBhbHBoYWJldEluZGV4TWFwO1xudmFyIGFscGhhYmV0SW5kZXhNYXBMZW5ndGggPSAwO1xuXG5mdW5jdGlvbiBpc051bWJlckNvZGUoY29kZSkge1xuICByZXR1cm4gY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3O1xufVxuXG5mdW5jdGlvbiBuYXR1cmFsQ29tcGFyZShhLCBiKSB7XG4gIHZhciBsZW5ndGhBID0gKGEgKz0gJycpLmxlbmd0aDtcbiAgdmFyIGxlbmd0aEIgPSAoYiArPSAnJykubGVuZ3RoO1xuICB2YXIgYUluZGV4ID0gMDtcbiAgdmFyIGJJbmRleCA9IDA7XG5cbiAgd2hpbGUgKGFJbmRleCA8IGxlbmd0aEEgJiYgYkluZGV4IDwgbGVuZ3RoQikge1xuICAgIHZhciBjaGFyQ29kZUEgPSBhLmNoYXJDb2RlQXQoYUluZGV4KTtcbiAgICB2YXIgY2hhckNvZGVCID0gYi5jaGFyQ29kZUF0KGJJbmRleCk7XG5cbiAgICBpZiAoaXNOdW1iZXJDb2RlKGNoYXJDb2RlQSkpIHtcbiAgICAgIGlmICghaXNOdW1iZXJDb2RlKGNoYXJDb2RlQikpIHtcbiAgICAgICAgcmV0dXJuIGNoYXJDb2RlQSAtIGNoYXJDb2RlQjtcbiAgICAgIH1cblxuICAgICAgdmFyIG51bVN0YXJ0QSA9IGFJbmRleDtcbiAgICAgIHZhciBudW1TdGFydEIgPSBiSW5kZXg7XG5cbiAgICAgIHdoaWxlIChjaGFyQ29kZUEgPT09IDQ4ICYmICsrbnVtU3RhcnRBIDwgbGVuZ3RoQSkge1xuICAgICAgICBjaGFyQ29kZUEgPSBhLmNoYXJDb2RlQXQobnVtU3RhcnRBKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChjaGFyQ29kZUIgPT09IDQ4ICYmICsrbnVtU3RhcnRCIDwgbGVuZ3RoQikge1xuICAgICAgICBjaGFyQ29kZUIgPSBiLmNoYXJDb2RlQXQobnVtU3RhcnRCKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG51bUVuZEEgPSBudW1TdGFydEE7XG4gICAgICB2YXIgbnVtRW5kQiA9IG51bVN0YXJ0QjtcblxuICAgICAgd2hpbGUgKG51bUVuZEEgPCBsZW5ndGhBICYmIGlzTnVtYmVyQ29kZShhLmNoYXJDb2RlQXQobnVtRW5kQSkpKSB7XG4gICAgICAgICsrbnVtRW5kQTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChudW1FbmRCIDwgbGVuZ3RoQiAmJiBpc051bWJlckNvZGUoYi5jaGFyQ29kZUF0KG51bUVuZEIpKSkge1xuICAgICAgICArK251bUVuZEI7XG4gICAgICB9XG5cbiAgICAgIHZhciBkaWZmZXJlbmNlID0gbnVtRW5kQSAtIG51bVN0YXJ0QSAtIG51bUVuZEIgKyBudW1TdGFydEI7IC8vIG51bUEgbGVuZ3RoIC0gbnVtQiBsZW5ndGhcbiAgICAgIGlmIChkaWZmZXJlbmNlKSB7XG4gICAgICAgIHJldHVybiBkaWZmZXJlbmNlO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAobnVtU3RhcnRBIDwgbnVtRW5kQSkge1xuICAgICAgICBkaWZmZXJlbmNlID0gYS5jaGFyQ29kZUF0KG51bVN0YXJ0QSsrKSAtIGIuY2hhckNvZGVBdChudW1TdGFydEIrKyk7XG4gICAgICAgIGlmIChkaWZmZXJlbmNlKSB7XG4gICAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgYUluZGV4ID0gbnVtRW5kQTtcbiAgICAgIGJJbmRleCA9IG51bUVuZEI7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoY2hhckNvZGVBICE9PSBjaGFyQ29kZUIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgY2hhckNvZGVBIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aCAmJlxuICAgICAgICBjaGFyQ29kZUIgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoICYmXG4gICAgICAgIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVBXSAhPT0gLTEgJiZcbiAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUJdICE9PSAtMVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQV0gLSBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjaGFyQ29kZUEgLSBjaGFyQ29kZUI7XG4gICAgfVxuXG4gICAgKythSW5kZXg7XG4gICAgKytiSW5kZXg7XG4gIH1cblxuICByZXR1cm4gbGVuZ3RoQSAtIGxlbmd0aEI7XG59XG5cbm5hdHVyYWxDb21wYXJlLmNhc2VJbnNlbnNpdGl2ZSA9IG5hdHVyYWxDb21wYXJlLmkgPSBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBuYXR1cmFsQ29tcGFyZSgoJycgKyBhKS50b0xvd2VyQ2FzZSgpLCAoJycgKyBiKS50b0xvd2VyQ2FzZSgpKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKG5hdHVyYWxDb21wYXJlLCB7XG4gIGFscGhhYmV0OiB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBhbHBoYWJldDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGFscGhhYmV0ID0gdmFsdWU7XG4gICAgICBhbHBoYWJldEluZGV4TWFwID0gW107XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICBpZiAoYWxwaGFiZXQpIHtcbiAgICAgICAgZm9yICg7IGkgPCBhbHBoYWJldC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFscGhhYmV0SW5kZXhNYXBbYWxwaGFiZXQuY2hhckNvZGVBdChpKV0gPSBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhbHBoYWJldEluZGV4TWFwTGVuZ3RoID0gYWxwaGFiZXRJbmRleE1hcC5sZW5ndGg7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgYWxwaGFiZXRJbmRleE1hcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhbHBoYWJldEluZGV4TWFwW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhbHBoYWJldEluZGV4TWFwW2ldID0gLTE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9LFxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0dXJhbENvbXBhcmU7XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgbGV0IGRlZmF1bHRzID0ge1xuICAgIHRyaWdnZXI6ICdbZGF0YS1kaXNtaXNzXScsXG4gICAgdGFyZ2V0OiAnW2RhdGEtZGlzbWlzc2libGVdJyxcbiAgICBjbGFzc1RvZ2dsZTogJ2Rpc21pc3MnXG4gIH1cblxuICBsZXQgcnVuID0gKCkgPT4ge1xuICAgIGxldCB0cmlnZ2VyID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3Qoc2V0dGluZ3MudHJpZ2dlcilcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgbGV0IHRhcmdldCA9IHRyaWdnZXIuY2xvc2VzdChzZXR0aW5ncy50YXJnZXQpXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHUudG9nZ2xlQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc1RvZ2dsZSlcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICB9XG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgYXBpLmRlc3Ryb3koKVxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuZGVzdHJveSA9ICgpID0+IHtcbiAgICBzZXR0aW5ncyA9IG51bGxcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gIH1cblxuICBhcGkuaW5pdCgpXG5cbiAgcmV0dXJuIGFwaVxufVxuIiwiaW1wb3J0IHUgZnJvbSAnLi91dGlsaXR5LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICAndXNlIHN0cmljdCdcblxuICAvKipcbiAgICogVmFyaWFibGVzXG4gICAqL1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgbGV0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc01vZGFsOiAnbW9kYWwnLFxuICAgIGNsYXNzRGlhbG9nOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGZvY3VzOiAnW2RhdGEtZm9jdXNdJ1xuICB9XG5cbiAgbGV0IG1lbW9yeVRyaWdnZXJcbiAgbGV0IG1lbW9yeVRhcmdldFxuXG4gIC8qKlxuICAgKiBQcml2YXRlIGZ1bmN0aW9uc1xuICAgKi9cblxuICBsZXQgb3BlbiA9ICh0YXJnZXQpID0+IHtcbiAgICB1LmFkZENsYXNzKHRhcmdldCwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgbGV0IGZvY3VzID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuZm9jdXMpXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICBpZiAoZm9jdXMpIHtcbiAgICAgICAgZm9jdXMuZm9jdXMoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LmZvY3VzKClcbiAgICAgIH1cbiAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9saXN0ZW5lciwgdHJ1ZSlcbiAgICB9LCB0cnVlKTtcbiAgfVxuXG4gIGxldCBjbG9zZSA9ICgpID0+IHtcbiAgICBsZXQgbW9kYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kYWxzLmxlbmd0aDsgKytpKSB7XG4gICAgICB1LnJlbW92ZUNsYXNzKG1vZGFsc1tpXSwgc2V0dGluZ3MuY2xhc3NBY3RpdmUpXG4gICAgfVxuICAgIGlmIChtZW1vcnlUcmlnZ2VyICYmIG1lbW9yeVRhcmdldCkge1xuICAgICAgbWVtb3J5VGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiBfbGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChtZW1vcnlUcmlnZ2VyKSB7XG4gICAgICAgICAgbWVtb3J5VHJpZ2dlci5mb2N1cygpXG4gICAgICAgIH1cbiAgICAgICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgICAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfbGlzdGVuZXIsIHRydWUpXG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBsZXQgZXNjYXBlID0gKCkgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICBjbG9zZSgpXG4gICAgfVxuICB9XG5cbiAgbGV0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgbW9kYWwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGxldCBkaWFsb2cgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0RpYWxvZylcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgbGV0IGRhdGFNb2RhbCA9IHRyaWdnZXIuZGF0YXNldC5tb2RhbFxuICAgICAgaWYgKGRhdGFNb2RhbCkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhTW9kYWwpXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSB0cmlnZ2VyXG4gICAgICAgIG9wZW4obWVtb3J5VGFyZ2V0KVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAobW9kYWwgJiYgIWRpYWxvZykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgZnVuY3Rpb25zXG4gICAqL1xuXG4gIGFwaS5vcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9ICgpID0+IHtcbiAgICBjbG9zZSgpXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgYXBpLmRlc3Ryb3koKVxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXNjYXBlLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICBtZW1vcnlUcmlnZ2VyID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlc2NhcGUsIGZhbHNlKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgdGhlIHBsdWdpblxuICAgKi9cbiAgYXBpLmluaXQoKVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIEFQSVxuICAgKi9cbiAgcmV0dXJuIGFwaVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZWxlbWVudCBoYXMgYSBjbGFzcyBvciBub3RcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIGNoZWNrIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gY2hlY2tcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiBjbGFzcyBleGlzdHMgb24gZWxlbWVudCwgb3RoZXJ3aXNlIGZhbHNlXG4gICAqL1xuICBzdGF0aWMgaGFzQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgcmV0dXJuIGMuZXZlcnkoIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoYylcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjbGFzcyBvciBjbGFzc2VzIHRvIGFuIGVsZW1lbnRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIGFkZCBjbGFzcyhlcykgb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGFkZFxuICAgKi9cbiAgc3RhdGljIGFkZENsYXNzKCBlbCwgYyApIHtcblxuICAgIGMgPSB0aGlzLnRvQXJyYXkoYylcblxuICAgIGMuZm9yRWFjaCggZnVuY3Rpb24gKCBjICkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCggYyApXG4gICAgfSlcbiAgfVxuICAvKipcbiAgICogUmVtb3ZlIGEgY2xhc3Mgb3IgY2xhc3NlcyBmcm9tIGFuIGVsZW1lbnRcbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIHJlbW92ZSBjbGFzcyhlcykgZnJvbVxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gcmVtb3ZlXG4gICAqL1xuICBzdGF0aWMgcmVtb3ZlQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCBjIClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBhIGNsYXNzIG9yIGNsYXNzZXMgb24gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gdG9nZ2xlIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gdG9nZ2xlXG4gICAqL1xuICBzdGF0aWMgdG9nZ2xlQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGMpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBjbG9zZXN0IHBhcmVudCBlbGVtZW50IGJhc2VkIG9uIGNsYXNzLiBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZVxuICAgKiBuYXRpdmUgLmNsb3Nlc3QoKSBtZXRob2QgaW4gdGhhdCBpdCBkb2Vzbid0IGNoZWNrIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byBzdGFydCBzZWFyY2ggb25cbiAgICogQHBhcmFtIHtTdHJpbmd9IHx8IHtBcnJheX0gQ2xhc3MoZXMpIHRvIGNoZWNrIGZvclxuICAgKiBAcmV0dXJuIHtFbGVtZW50fSBDbG9zZXN0IHBhcmVudCBlbGVtZW50XG4gICAqL1xuICBzdGF0aWMgY2xvc2VzdCggZWwsIGMgKSB7XG4gICAgd2hpbGUgKChlbCA9IGVsLnBhcmVudEVsZW1lbnQpICYmICF0aGlzLmhhc0NsYXNzKGVsLCBjKSlcbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIHN0cmluZyB0byBhbiBhcnJheS4gSWYgYW4gYXJyYXkgaXMgcGFzc2VkLCBpdCdzIHJldHVybmVkIGFzIGlzLlxuICAgKiBBbnl0aGluZyBlbHNlIGlzIHJldHVybmVkIGFzIGZhbHNlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBTdHJpbmcgdG8gY29udmVydCB0byBhbiBhcnJheVxuICAgKiBAcmV0dXJuIHtBcnJheX0gUmV0dXJuIHRoZSBjb252ZXJ0ZWQgYXJyYXlcbiAgICovXG4gIHN0YXRpYyB0b0FycmF5KHN0cmluZykge1xuXG4gICAgdmFyIGFycmF5ID0gW11cblxuICAgIGlmICh0eXBlb2Ygc3RyaW5nID09PSAnc3RyaW5nJykge1xuICAgICAgYXJyYXkucHVzaChzdHJpbmcpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHN0cmluZykpIHtcbiAgICAgIGFycmF5ID0gc3RyaW5nXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxuICB9XG5cbiAgLyoqXG4gICAqIE1lcmdlIHR3byBvciBtb3JlIG9iamVjdHMuIFJldHVybnMgYSBuZXcgb2JqZWN0LiBTZXQgdGhlIGZpcnN0IGFyZ3VtZW50XG4gICAqIHRvIGB0cnVlYCBmb3IgYSBkZWVwIG9yIHJlY3Vyc2l2ZSBtZXJnZS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbT3B0aW9uYWxdIElmIHRydWUsIGRvIGEgZGVlcCAob3IgcmVjdXJzaXZlKSBtZXJnZVxuICAgKiBAcGFyYW0ge09iamVjdH0gVGhlIG9iamVjdHMgdG8gbWVyZ2UgdG9nZXRoZXI7IGVhY2ggb3ZlcnJpZGluZyB0aGUgbmV4dFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBNZXJnZWQgdmFsdWVzIG9mIGRlZmF1bHRzIGFuZCBvcHRpb25zXG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKCkge1xuXG4gICAgdmFyIGV4dGVuZGVkID0ge31cbiAgICB2YXIgZGVlcCA9IGZhbHNlXG4gICAgdmFyIGkgPSAwXG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBhcmd1bWVudHNbMF0gKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICkge1xuICAgICAgZGVlcCA9IGFyZ3VtZW50c1swXVxuICAgICAgaSsrXG4gICAgfVxuXG4gICAgbGV0IG1lcmdlID0gKCBvYmogKSA9PiB7XG4gICAgICBmb3IgKCB2YXIgcHJvcCBpbiBvYmogKSB7XG4gICAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcbiAgICAgICAgICBpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQoIHRydWUsIGV4dGVuZGVkW3Byb3BdLCBvYmpbcHJvcF0gKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXVxuICAgICAgbWVyZ2Uob2JqKVxuICAgIH1cblxuICAgIHJldHVybiBleHRlbmRlZFxuICB9XG5cbn1cbiJdfQ==

//# sourceMappingURL=scripts.js.map
