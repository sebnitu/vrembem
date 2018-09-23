(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _list = require('list.js');

var _list2 = _interopRequireDefault(_list);

var _modal = require('modal.js');

var _modal2 = _interopRequireDefault(_modal);

var _dismissible = require('dismissible.js');

var _dismissible2 = _interopRequireDefault(_dismissible);

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
module.exports = function(list) {
  var addAsync = function(values, callback, items) {
    var valuesToAdd = values.splice(0, 50);
    items = items || [];
    items = items.concat(list.add(valuesToAdd));
    if (values.length > 0) {
      setTimeout(function() {
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
module.exports = function(list) {

  // Add handlers
  list.handlers.filterStart = list.handlers.filterStart || [];
  list.handlers.filterComplete = list.handlers.filterComplete || [];

  return function(filterFunction) {
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

var classes = require('./utils/classes'),
  events = require('./utils/events'),
  extend = require('./utils/extend'),
  toString = require('./utils/to-string'),
  getByClass = require('./utils/get-by-class'),
  fuzzy = require('./utils/fuzzy');

module.exports = function(list, options) {
  options = options || {};

  options = extend({
    location: 0,
    distance: 100,
    threshold: 0.4,
    multiSearch: true,
    searchClass: 'fuzzy-search'
  }, options);



  var fuzzySearch = {
    search: function(searchString, columns) {
      // Substract arguments from the searchString or put searchString as only argument
      var searchArguments = options.multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString];

      for (var k = 0, kl = list.items.length; k < kl; k++) {
        fuzzySearch.item(list.items[k], columns, searchArguments);
      }
    },
    item: function(item, columns, searchArguments) {
      var found = true;
      for(var i = 0; i < searchArguments.length; i++) {
        var foundArgument = false;
        for (var j = 0, jl = columns.length; j < jl; j++) {
          if (fuzzySearch.values(item.values(), columns[j], searchArguments[i])) {
            foundArgument = true;
          }
        }
        if(!foundArgument) {
          found = false;
        }
      }
      item.found = found;
    },
    values: function(values, value, searchArgument) {
      if (values.hasOwnProperty(value)) {
        var text = toString(values[value]).toLowerCase();

        if (fuzzy(text, searchArgument, options)) {
          return true;
        }
      }
      return false;
    }
  };


  events.bind(getByClass(list.listContainer, options.searchClass), 'keyup', function(e) {
    var target = e.target || e.srcElement; // IE have srcElement
    list.search(target.value, fuzzySearch.search);
  });

  return function(str, columns) {
    list.search(str, columns, fuzzySearch.search);
  };
};

},{"./utils/classes":12,"./utils/events":13,"./utils/extend":14,"./utils/fuzzy":15,"./utils/get-by-class":17,"./utils/to-string":20}],5:[function(require,module,exports){
var naturalSort = require('string-natural-compare'),
  getByClass = require('./utils/get-by-class'),
  extend = require('./utils/extend'),
  indexOf = require('./utils/index-of'),
  events = require('./utils/events'),
  toString = require('./utils/to-string'),
  classes = require('./utils/classes'),
  getAttribute = require('./utils/get-attribute'),
  toArray = require('./utils/to-array');

module.exports = function(id, options, values) {

  var self = this,
    init,
    Item = require('./item')(self),
    addAsync = require('./add-async')(self),
    initPagination = require('./pagination')(self);

  init = {
    start: function() {
      self.listClass      = "list";
      self.searchClass    = "search";
      self.sortClass      = "sort";
      self.page           = 10000;
      self.i              = 1;
      self.items          = [];
      self.visibleItems   = [];
      self.matchingItems  = [];
      self.searched       = false;
      self.filtered       = false;
      self.searchColumns  = undefined;
      self.handlers       = { 'updated': [] };
      self.valueNames     = [];
      self.utils          = {
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

      self.listContainer = (typeof(id) === 'string') ? document.getElementById(id) : id;
      if (!self.listContainer) { return; }
      self.list       = getByClass(self.listContainer, self.listClass, true);

      self.parse        = require('./parse')(self);
      self.templater    = require('./templater')(self);
      self.search       = require('./search')(self);
      self.filter       = require('./filter')(self);
      self.sort         = require('./sort')(self);
      self.fuzzySearch  = require('./fuzzy-search')(self, options.fuzzySearch);

      this.handlers();
      this.items();
      this.pagination();

      self.update();
    },
    handlers: function() {
      for (var handler in self.handlers) {
        if (self[handler]) {
          self.on(handler, self[handler]);
        }
      }
    },
    items: function() {
      self.parse(self.list);
      if (values !== undefined) {
        self.add(values);
      }
    },
    pagination: function() {
      if (options.pagination !== undefined) {
        if (options.pagination === true) {
          options.pagination = [{}];
        }
        if (options.pagination[0] === undefined){
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
  this.reIndex = function() {
    self.items          = [];
    self.visibleItems   = [];
    self.matchingItems  = [];
    self.searched       = false;
    self.filtered       = false;
    self.parse(self.list);
  };

  this.toJSON = function() {
    var json = [];
    for (var i = 0, il = self.items.length; i < il; i++) {
      json.push(self.items[i].values());
    }
    return json;
  };


  /*
  * Add object to list
  */
  this.add = function(values, callback) {
    if (values.length === 0) {
      return;
    }
    if (callback) {
      addAsync(values, callback);
      return;
    }
    var added = [],
      notCreate = false;
    if (values[0] === undefined){
      values = [values];
    }
    for (var i = 0, il = values.length; i < il; i++) {
      var item = null;
      notCreate = (self.items.length > self.page) ? true : false;
      item = new Item(values[i], undefined, notCreate);
      self.items.push(item);
      added.push(item);
    }
    self.update();
    return added;
  };

	this.show = function(i, page) {
		this.i = i;
		this.page = page;
		self.update();
    return self;
	};

  /* Removes object from list.
  * Loops through the list and removes objects where
  * property "valuename" === value
  */
  this.remove = function(valueName, value, options) {
    var found = 0;
    for (var i = 0, il = self.items.length; i < il; i++) {
      if (self.items[i].values()[valueName] == value) {
        self.templater.remove(self.items[i], options);
        self.items.splice(i,1);
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
  this.get = function(valueName, value) {
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
  this.size = function() {
    return self.items.length;
  };

  /*
  * Removes all items from the list
  */
  this.clear = function() {
    self.templater.clear();
    self.items = [];
    return self;
  };

  this.on = function(event, callback) {
    self.handlers[event].push(callback);
    return self;
  };

  this.off = function(event, callback) {
    var e = self.handlers[event];
    var index = indexOf(e, callback);
    if (index > -1) {
      e.splice(index, 1);
    }
    return self;
  };

  this.trigger = function(event) {
    var i = self.handlers[event].length;
    while(i--) {
      self.handlers[event][i](self);
    }
    return self;
  };

  this.reset = {
    filter: function() {
      var is = self.items,
        il = is.length;
      while (il--) {
        is[il].filtered = false;
      }
      return self;
    },
    search: function() {
      var is = self.items,
        il = is.length;
      while (il--) {
        is[il].found = false;
      }
      return self;
    }
  };

  this.update = function() {
    var is = self.items,
			il = is.length;

    self.visibleItems = [];
    self.matchingItems = [];
    self.templater.clear();
    for (var i = 0; i < il; i++) {
      if (is[i].matching() && ((self.matchingItems.length+1) >= self.i && self.visibleItems.length < self.page)) {
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
module.exports = function(list) {
  return function(initValues, element, notCreate) {
    var item = this;

    this._values = {};

    this.found = false; // Show if list.searched == true and this.found == true
    this.filtered = false;// Show if list.filtered == true and this.filtered == true

    var init = function(initValues, element, notCreate) {
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

    this.values = function(newValues, notCreate) {
      if (newValues !== undefined) {
        for(var name in newValues) {
          item._values[name] = newValues[name];
        }
        if (notCreate !== true) {
          list.templater.set(item, item.values());
        }
      } else {
        return item._values;
      }
    };

    this.show = function() {
      list.templater.show(item);
    };

    this.hide = function() {
      list.templater.hide(item);
    };

    this.matching = function() {
      return (
        (list.filtered && list.searched && item.found && item.filtered) ||
        (list.filtered && !list.searched && item.filtered) ||
        (!list.filtered && list.searched && item.found) ||
        (!list.filtered && !list.searched)
      );
    };

    this.visible = function() {
      return (item.elm && (item.elm.parentNode == list.list)) ? true : false;
    };

    init(initValues, element, notCreate);
  };
};

},{}],7:[function(require,module,exports){
var classes = require('./utils/classes'),
  events = require('./utils/events'),
  List = require('./index');

module.exports = function(list) {

  var refresh = function(pagingList, options) {
    var item,
      l = list.matchingItems.length,
      index = list.i,
      page = list.page,
      pages = Math.ceil(l / page),
      currentPage = Math.ceil((index / page)),
      innerWindow = options.innerWindow || 2,
      left = options.left || options.outerWindow || 0,
      right = options.right || options.outerWindow || 0;

    right = pages - right;

    pagingList.clear();
    for (var i = 1; i <= pages; i++) {
      var className = (currentPage === i) ? "active" : "";

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
    number: function(i, left, right, currentPage, innerWindow) {
       return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
    },
    left: function(i, left) {
      return (i <= left);
    },
    right: function(i, right) {
      return (i > right);
    },
    innerWindow: function(i, currentPage, innerWindow) {
      return ( i >= (currentPage - innerWindow) && i <= (currentPage + innerWindow));
    },
    dotted: function(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
      return this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) || (this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem));
    },
    dottedLeft: function(pagingList, i, left, right, currentPage, innerWindow) {
      return ((i == (left + 1)) && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right));
    },
    dottedRight: function(pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
      if (pagingList.items[currentPageItem-1].values().dotted) {
        return false;
      } else {
        return ((i == (right)) && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right));
      }
    }
  };

  var addEvent = function(elm, i, page) {
     events.bind(elm, 'click', function() {
       list.show((i-1)*page + 1, page);
     });
  };

  return function(options) {
    var pagingList = new List(list.listContainer.id, {
      listClass: options.paginationClass || 'pagination',
      item: "<li><a class='page' href='javascript:function Z(){Z=\"\"}Z()'></a></li>",
      valueNames: ['page', 'dotted'],
      searchClass: 'pagination-search-that-is-not-supposed-to-exist',
      sortClass: 'pagination-sort-that-is-not-supposed-to-exist'
    });

    list.on('updated', function() {
      refresh(pagingList, options);
    });
    refresh(pagingList, options);
  };
};

},{"./index":5,"./utils/classes":12,"./utils/events":13}],8:[function(require,module,exports){
module.exports = function(list) {

  var Item = require('./item')(list);

  var getChildren = function(parent) {
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

  var parse = function(itemElements, valueNames) {
    for (var i = 0, il = itemElements.length; i < il; i++) {
      list.items.push(new Item(valueNames, itemElements[i]));
    }
  };
  var parseAsync = function(itemElements, valueNames) {
    var itemsToIndex = itemElements.splice(0, 50); // TODO: If < 100 items, what happens in IE etc?
    parse(itemsToIndex, valueNames);
    if (itemElements.length > 0) {
      setTimeout(function() {
        parseAsync(itemElements, valueNames);
      }, 1);
    } else {
      list.update();
      list.trigger('parseComplete');
    }
  };

  list.handlers.parseComplete = list.handlers.parseComplete || [];

  return function() {
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
module.exports = function(list) {
  var item,
    text,
    columns,
    searchString,
    customSearch;

  var prepare = {
    resetList: function() {
      list.i = 1;
      list.templater.clear();
      customSearch = undefined;
    },
    setOptions: function(args) {
      if (args.length == 2 && args[1] instanceof Array) {
        columns = args[1];
      } else if (args.length == 2 && typeof(args[1]) == "function") {
        columns = undefined;
        customSearch = args[1];
      } else if (args.length == 3) {
        columns = args[1];
        customSearch = args[2];
      } else {
        columns = undefined;
      }
    },
    setColumns: function() {
      if (list.items.length === 0) return;
      if (columns === undefined) {
        columns = (list.searchColumns === undefined) ? prepare.toArray(list.items[0].values()) : list.searchColumns;
      }
    },
    setSearchString: function(s) {
      s = list.utils.toString(s).toLowerCase();
      s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // Escape regular expression characters
      searchString = s;
    },
    toArray: function(values) {
      var tmpColumn = [];
      for (var name in values) {
        tmpColumn.push(name);
      }
      return tmpColumn;
    }
  };
  var search = {
    list: function() {
      for (var k = 0, kl = list.items.length; k < kl; k++) {
        search.item(list.items[k]);
      }
    },
    item: function(item) {
      item.found = false;
      for (var j = 0, jl = columns.length; j < jl; j++) {
        if (search.values(item.values(), columns[j])) {
          item.found = true;
          return;
        }
      }
    },
    values: function(values, column) {
      if (values.hasOwnProperty(column)) {
        text = list.utils.toString(values[column]).toLowerCase();
        if ((searchString !== "") && (text.search(searchString) > -1)) {
          return true;
        }
      }
      return false;
    },
    reset: function() {
      list.reset.search();
      list.searched = false;
    }
  };

  var searchMethod = function(str) {
    list.trigger('searchStart');

    prepare.resetList();
    prepare.setSearchString(str);
    prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction
    prepare.setColumns();

    if (searchString === "" ) {
      search.reset();
    } else {
      list.searched = true;
      if (customSearch) {
        customSearch(searchString, columns);
      } else {
        search.list();
      }
    }

    list.update();
    list.trigger('searchComplete');
    return list.visibleItems;
  };

  list.handlers.searchStart = list.handlers.searchStart || [];
  list.handlers.searchComplete = list.handlers.searchComplete || [];

  list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'keyup', function(e) {
    var target = e.target || e.srcElement, // IE have srcElement
      alreadyCleared = (target.value === "" && !list.searched);
    if (!alreadyCleared) { // If oninput already have resetted the list, do nothing
      searchMethod(target.value);
    }
  });

  // Used to detect click on HTML5 clear button
  list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'input', function(e) {
    var target = e.target || e.srcElement;
    if (target.value === "") {
      searchMethod('');
    }
  });

  return searchMethod;
};

},{}],10:[function(require,module,exports){
module.exports = function(list) {

  var buttons = {
    els: undefined,
    clear: function() {
      for (var i = 0, il = buttons.els.length; i < il; i++) {
        list.utils.classes(buttons.els[i]).remove('asc');
        list.utils.classes(buttons.els[i]).remove('desc');
      }
    },
    getOrder: function(btn) {
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
    getInSensitive: function(btn, options) {
      var insensitive = list.utils.getAttribute(btn, 'data-insensitive');
      if (insensitive === "false") {
        options.insensitive = false;
      } else {
        options.insensitive = true;
      }
    },
    setOrder: function(options) {
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

  var sort = function() {
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
      options.insensitive = (typeof options.insensitive == "undefined") ? true : options.insensitive;
    }

    buttons.clear();
    buttons.setOrder(options);


    // caseInsensitive
    // alphabet
    var customSortFunction = (options.sortFunction || list.sortFunction || null),
        multi = ((options.order === 'desc') ? -1 : 1),
        sortFunction;

    if (customSortFunction) {
      sortFunction = function(itemA, itemB) {
        return customSortFunction(itemA, itemB, options) * multi;
      };
    } else {
      sortFunction = function(itemA, itemB) {
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
var Templater = function(list) {
  var itemSource,
    templater = this;

  var init = function() {
    itemSource = templater.getItemSource(list.item);
    if (itemSource) {
      itemSource = templater.clearSourceItem(itemSource, list.valueNames);
    }
  };

  this.clearSourceItem = function(el, valueNames) {
    for(var i = 0, il = valueNames.length; i < il; i++) {
      var elm;
      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          el.setAttribute('data-'+valueNames[i].data[j], '');
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

  this.getItemSource = function(item) {
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

  this.get = function(item, valueNames) {
    templater.create(item);
    var values = {};
    for(var i = 0, il = valueNames.length; i < il; i++) {
      var elm;
      if (valueNames[i].data) {
        for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
          values[valueNames[i].data[j]] = list.utils.getAttribute(item.elm, 'data-'+valueNames[i].data[j]);
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

  this.set = function(item, values) {
    var getValueName = function(name) {
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
    var setValue = function(name, value) {
      var elm;
      var valueName = getValueName(name);
      if (!valueName)
        return;
      if (valueName.data) {
        item.elm.setAttribute('data-'+valueName.data, value);
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
      for(var v in values) {
        if (values.hasOwnProperty(v)) {
          setValue(v, values[v]);
        }
      }
    }
  };

  this.create = function(item) {
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
  this.remove = function(item) {
    if (item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };
  this.show = function(item) {
    templater.create(item);
    list.list.appendChild(item.elm);
  };
  this.hide = function(item) {
    if (item.elm !== undefined && item.elm.parentNode === list.list) {
      list.list.removeChild(item.elm);
    }
  };
  this.clear = function() {
    /* .innerHTML = ''; fucks up IE */
    if (list.list.hasChildNodes()) {
      while (list.list.childNodes.length >= 1)
      {
        list.list.removeChild(list.list.firstChild);
      }
    }
  };

  init();
};

module.exports = function(list) {
  return new Templater(list);
};

},{}],12:[function(require,module,exports){
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

module.exports = function(el){
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

ClassList.prototype.add = function(name){
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

ClassList.prototype.remove = function(name){
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

ClassList.prototype.toggle = function(name, force){
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

ClassList.prototype.array = function(){
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

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list ? this.list.contains(name) : !! ~index(this.array(), name);
};

},{"./index-of":18}],13:[function(require,module,exports){
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

exports.bind = function(el, type, fn, capture){
  el = toArray(el);
  for ( var i = 0; i < el.length; i++ ) {
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

exports.unbind = function(el, type, fn, capture){
  el = toArray(el);
  for ( var i = 0; i < el.length; i++ ) {
    el[i][unbind](prefix + type, fn, capture || false);
  }
};

},{"./to-array":19}],14:[function(require,module,exports){
/*
 * Source: https://github.com/segmentio/extend
 */

module.exports = function extend (object) {
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
module.exports = function(text, pattern, options) {
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
        s = (function() {
            var q = {},
                i;

            for (i = 0; i < pattern.length; i++) {
                q[pattern.charAt(i)] = 0;
            }

            for (i = 0; i < pattern.length; i++) {
                q[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
            }

            return q;
        }());

    // Compute and return the score for a match with e errors and x location.
    // Accesses loc and pattern through being a closure.

    function match_bitapScore_(e, x) {
        var accuracy = e / pattern.length,
            proximity = Math.abs(loc - x);

        if (!Match_Distance) {
            // Dodge divide by zero error.
            return proximity ? 1.0 : accuracy;
        }
        return accuracy + (proximity / Match_Distance);
    }

    var score_threshold = Match_Threshold, // Highest score beyond which we give up.
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
    var matchmask = 1 << (pattern.length - 1);
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
            if (d === 0) {    // First pass: exact match.
                rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
            } else {    // Subsequent passes: fuzzy match.
                rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
                                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
                                last_rd[j + 1];
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

    return (best_loc < 0) ? false : true;
};

},{}],16:[function(require,module,exports){
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

module.exports = function(el, attr) {
  var result = (el.getAttribute && el.getAttribute(attr)) || null;
  if( !result ) {
    var attrs = el.attributes;
    var length = attrs.length;
    for(var i = 0; i < length; i++) {
      if (attr[i] !== undefined) {
        if(attr[i].nodeName === attr) {
          result = attr[i].nodeValue;
        }
      }
    }
  }
  return result;
};

},{}],17:[function(require,module,exports){
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

var getElementsByClassName = function(container, className, single) {
  if (single) {
    return container.getElementsByClassName(className)[0];
  } else {
    return container.getElementsByClassName(className);
  }
};

var querySelector = function(container, className, single) {
  className = '.' + className;
  if (single) {
    return container.querySelector(className);
  } else {
    return container.querySelectorAll(className);
  }
};

var polyfill = function(container, className, single) {
  var classElements = [],
    tag = '*';

  var els = container.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+className+"(\\s|$)");
  for (var i = 0, j = 0; i < elsLen; i++) {
    if ( pattern.test(els[i].className) ) {
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

module.exports = (function() {
  return function(container, className, single, options) {
    options = options || {};
    if ((options.test && options.getElementsByClassName) || (!options.test && document.getElementsByClassName)) {
      return getElementsByClassName(container, className, single);
    } else if ((options.test && options.querySelector) || (!options.test && document.querySelector)) {
      return querySelector(container, className, single);
    } else {
      return polyfill(container, className, single);
    }
  };
})();

},{}],18:[function(require,module,exports){
var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

},{}],19:[function(require,module,exports){
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
module.exports = function(s) {
  s = (s === undefined) ? "" : s;
  s = (s === null) ? "" : s;
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
      if (
        charCodeA < alphabetIndexMapLength &&
        charCodeB < alphabetIndexMapLength &&
        alphabetIndexMap[charCodeA] !== -1 &&
        alphabetIndexMap[charCodeB] !== -1
      ) {
        return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
      }

      return charCodeA - charCodeB;
    }

    ++aIndex;
    ++bIndex;
  }

  return lengthA - lengthB;
}

naturalCompare.caseInsensitive = naturalCompare.i = function(a, b) {
  return naturalCompare(('' + a).toLowerCase(), ('' + b).toLowerCase());
};

Object.defineProperties(naturalCompare, {
  alphabet: {
    get: function() {
      return alphabet;
    },
    set: function(value) {
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
    },
  },
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
        memoryTrigger.focus();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2FkZC1hc3luYy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvZnV6enktc2VhcmNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL2l0ZW0uanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvcGFnaW5hdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9wYXJzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy9zZWFyY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvc29ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy90ZW1wbGF0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9saXN0LmpzL3NyYy91dGlscy9ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2Z1enp5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2dldC1hdHRyaWJ1dGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbGlzdC5qcy9zcmMvdXRpbHMvZ2V0LWJ5LWNsYXNzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL2luZGV4LW9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLWFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xpc3QuanMvc3JjL3V0aWxzL3RvLXN0cmluZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdHJpbmctbmF0dXJhbC1jb21wYXJlL25hdHVyYWwtY29tcGFyZS5qcyIsIi4uL3NyYy9qcy9kaXNtaXNzaWJsZS5qcyIsIi4uL3NyYy9qcy9tb2RhbC5qcyIsIi4uL3NyYy9qcy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU0sUUFBUSxJQUFJLGVBQUosRUFBZDtBQUNBLElBQU0sY0FBYyxJQUFJLHFCQUFKLEVBQXBCOztBQUVBLElBQU0sT0FBTyxTQUFTLGNBQVQsQ0FBd0IsZ0JBQXhCLENBQWI7O0FBRUEsSUFBSSxJQUFKLEVBQVU7O0FBRVIsTUFBTSxhQUFhLElBQUksY0FBSixDQUFTLGdCQUFULEVBQTJCO0FBQzVDLGdCQUFZLENBQ1Ysa0JBRFUsRUFFVixFQUFFLE1BQU0sQ0FBQyxNQUFELENBQVIsRUFGVSxDQURnQztBQUs1QyxlQUFXO0FBTGlDLEdBQTNCLENBQW5COztBQVFBLE1BQU0sYUFBYSxTQUFiLFVBQWEsR0FBVztBQUM1QixRQUFNLGNBQWMsU0FBUyxjQUFULENBQXdCLG9CQUF4QixFQUE4QyxLQUFsRTtBQUNBLGVBQVcsTUFBWCxDQUFrQixVQUFTLElBQVQsRUFBZTtBQUMvQixhQUFRLFlBQVksUUFBWixDQUFxQixLQUFLLE1BQUwsR0FBYyxJQUFuQyxLQUE0QyxDQUFDLFdBQXJEO0FBQ0QsS0FGRDtBQUdELEdBTEQ7O0FBT0EsV0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBNkMsWUFBVztBQUN0RCxRQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLG9CQUF4QixDQUFmO0FBQ0EsUUFBSSxNQUFKLEVBQVk7QUFDVixhQUFPLFFBQVAsR0FBZ0IsVUFBaEI7QUFDRDtBQUNGLEdBTEQsRUFLRyxLQUxIOztBQU9BLGFBQVcsSUFBWCxDQUFnQixrQkFBaEIsRUFBb0MsRUFBRSxPQUFPLEtBQVQsRUFBcEM7QUFFRDs7O0FDbkNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztrQkM3R2UsWUFBVzs7QUFFeEI7O0FBRUEsTUFBSSxNQUFNLEVBQVY7QUFDQSxNQUFJLGlCQUFKO0FBQ0EsTUFBSSxXQUFXO0FBQ2IsYUFBUyxnQkFESTtBQUViLFlBQVEsb0JBRks7QUFHYixpQkFBYTtBQUhBLEdBQWY7O0FBTUEsTUFBSSxNQUFNLFNBQU4sR0FBTSxHQUFNO0FBQ2QsUUFBSSxVQUFVLE1BQU0sTUFBTixDQUFhLE9BQWIsQ0FBcUIsU0FBUyxPQUE5QixDQUFkO0FBQ0EsUUFBSSxPQUFKLEVBQWE7QUFDWCxVQUFJLFNBQVMsUUFBUSxPQUFSLENBQWdCLFNBQVMsTUFBekIsQ0FBYjtBQUNBLFVBQUksTUFBSixFQUFZO0FBQ1YsMEJBQUUsV0FBRixDQUFjLE1BQWQsRUFBc0IsU0FBUyxXQUEvQjtBQUNEO0FBQ0QsWUFBTSxjQUFOO0FBQ0Q7QUFDRixHQVREOztBQVdBLE1BQUksSUFBSixHQUFXLFVBQUMsT0FBRCxFQUFhO0FBQ3RCLFFBQUksT0FBSjtBQUNBLGVBQVcsa0JBQUUsTUFBRixDQUFVLFFBQVYsRUFBb0IsV0FBVyxFQUEvQixDQUFYO0FBQ0EsYUFBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxHQUFuQyxFQUF3QyxLQUF4QztBQUNELEdBSkQ7O0FBTUEsTUFBSSxPQUFKLEdBQWMsWUFBTTtBQUNsQixlQUFXLElBQVg7QUFDQSxhQUFTLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLEdBQXRDLEVBQTJDLEtBQTNDO0FBQ0QsR0FIRDs7QUFLQSxNQUFJLElBQUo7O0FBRUEsU0FBTyxHQUFQO0FBQ0QsQzs7QUF2Q0Q7Ozs7Ozs7Ozs7Ozs7a0JDRWUsWUFBVzs7QUFFeEI7O0FBRUEsTUFBSSxNQUFNLEVBQVY7QUFDQSxNQUFJLGlCQUFKO0FBQ0EsTUFBSSxXQUFXO0FBQ2Isa0JBQWMsZ0JBREQ7QUFFYixnQkFBWSxPQUZDO0FBR2IsaUJBQWEsZUFIQTtBQUliLGlCQUFhLFdBSkE7QUFLYixXQUFPO0FBTE0sR0FBZjs7QUFRQSxNQUFJLHNCQUFKO0FBQ0EsTUFBSSxxQkFBSjs7QUFFQSxNQUFJLE9BQU8sU0FBUCxJQUFPLENBQUMsTUFBRCxFQUFZO0FBQ3JCLHNCQUFFLFFBQUYsQ0FBVyxNQUFYLEVBQW1CLFNBQVMsV0FBNUI7QUFDQSxRQUFJLFFBQVEsT0FBTyxhQUFQLENBQXFCLFNBQVMsS0FBOUIsQ0FBWjtBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsZUFBeEIsRUFBeUMsU0FBUyxTQUFULEdBQXFCO0FBQzVELFVBQUksS0FBSixFQUFXO0FBQ1QsY0FBTSxLQUFOO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxLQUFQO0FBQ0Q7QUFDRCxXQUFLLG1CQUFMLENBQXlCLGVBQXpCLEVBQTBDLFNBQTFDLEVBQXFELElBQXJEO0FBQ0QsS0FQRCxFQU9HLElBUEg7QUFRRCxHQVhEOztBQWFBLE1BQUksUUFBUSxTQUFSLEtBQVEsR0FBTTtBQUNoQixRQUFJLFNBQVMsU0FBUyxnQkFBVCxDQUEwQixNQUFNLFNBQVMsVUFBekMsQ0FBYjtBQUNBLFNBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLE1BQTNCLEVBQW1DLEVBQUUsQ0FBckMsRUFBd0M7QUFDdEMsd0JBQUUsV0FBRixDQUFjLE9BQU8sQ0FBUCxDQUFkLEVBQXlCLFNBQVMsV0FBbEM7QUFDRDtBQUNELFFBQUksaUJBQWlCLFlBQXJCLEVBQW1DO0FBQ2pDLG1CQUFhLGdCQUFiLENBQThCLGVBQTlCLEVBQStDLFNBQVMsU0FBVCxHQUFxQjtBQUNsRSxzQkFBYyxLQUFkO0FBQ0EsdUJBQWUsSUFBZjtBQUNBLHdCQUFnQixJQUFoQjtBQUNBLGFBQUssbUJBQUwsQ0FBeUIsZUFBekIsRUFBMEMsU0FBMUMsRUFBcUQsSUFBckQ7QUFDRCxPQUxELEVBS0csSUFMSDtBQU1EO0FBQ0YsR0FiRDs7QUFlQSxNQUFJLE1BQU0sU0FBTixHQUFNLEdBQU07QUFDZCxRQUFJLFVBQVUsTUFBTSxNQUFOLENBQWEsT0FBYixDQUFxQixNQUFNLFNBQVMsWUFBcEMsQ0FBZDtBQUNBLFFBQUksUUFBUSxNQUFNLE1BQU4sQ0FBYSxPQUFiLENBQXFCLE1BQU0sU0FBUyxVQUFwQyxDQUFaO0FBQ0EsUUFBSSxTQUFTLE1BQU0sTUFBTixDQUFhLE9BQWIsQ0FBcUIsTUFBTSxTQUFTLFdBQXBDLENBQWI7QUFDQSxRQUFJLE9BQUosRUFBYTtBQUNYO0FBQ0EsVUFBSSxZQUFZLFFBQVEsT0FBUixDQUFnQixLQUFoQztBQUNBLFVBQUksU0FBSixFQUFlO0FBQ2IsdUJBQWUsU0FBUyxjQUFULENBQXdCLFNBQXhCLENBQWY7QUFDQSx3QkFBZ0IsT0FBaEI7QUFDQSxhQUFLLFlBQUw7QUFDRDtBQUNELFlBQU0sY0FBTjtBQUNELEtBVEQsTUFTTyxJQUFJLFNBQVMsQ0FBQyxNQUFkLEVBQXNCO0FBQzNCO0FBQ0Q7QUFDRixHQWhCRDs7QUFrQkEsTUFBSSxJQUFKLEdBQVcsVUFBQyxNQUFELEVBQVk7QUFDckIsU0FBSyxTQUFTLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBTDtBQUNELEdBRkQ7O0FBSUEsTUFBSSxLQUFKLEdBQVksWUFBTTtBQUNoQjtBQUNELEdBRkQ7O0FBSUEsTUFBSSxJQUFKLEdBQVcsVUFBQyxPQUFELEVBQWE7QUFDdEIsUUFBSSxPQUFKO0FBQ0EsZUFBVyxrQkFBRSxNQUFGLENBQVUsUUFBVixFQUFvQixXQUFXLEVBQS9CLENBQVg7QUFDQSxhQUFTLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLEtBQXhDO0FBQ0EsYUFBUyxnQkFBVCxDQUEwQixVQUExQixFQUFzQyxHQUF0QyxFQUEyQyxLQUEzQztBQUNELEdBTEQ7O0FBT0EsTUFBSSxPQUFKLEdBQWMsWUFBTTtBQUNsQixlQUFXLElBQVg7QUFDQSxtQkFBZSxJQUFmO0FBQ0Esb0JBQWdCLElBQWhCO0FBQ0EsYUFBUyxtQkFBVCxDQUE2QixPQUE3QixFQUFzQyxHQUF0QyxFQUEyQyxLQUEzQztBQUNBLGFBQVMsbUJBQVQsQ0FBNkIsVUFBN0IsRUFBeUMsR0FBekMsRUFBOEMsS0FBOUM7QUFDRCxHQU5EOztBQVFBLE1BQUksSUFBSjs7QUFFQSxTQUFPLEdBQVA7QUFDRCxDOztBQTNGRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNFRTs7Ozs7OzZCQU1pQixFLEVBQUksQyxFQUFJOztBQUV2QixVQUFJLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBSjs7QUFFQSxhQUFPLEVBQUUsS0FBRixDQUFTLFVBQVcsQ0FBWCxFQUFlO0FBQzdCLGVBQU8sR0FBRyxTQUFILENBQWEsUUFBYixDQUFzQixDQUF0QixDQUFQO0FBQ0QsT0FGTSxDQUFQO0FBR0Q7O0FBRUQ7Ozs7Ozs7OzZCQUtpQixFLEVBQUksQyxFQUFJOztBQUV2QixVQUFJLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBSjs7QUFFQSxRQUFFLE9BQUYsQ0FBVyxVQUFXLENBQVgsRUFBZTtBQUN4QixXQUFHLFNBQUgsQ0FBYSxHQUFiLENBQWtCLENBQWxCO0FBQ0QsT0FGRDtBQUdEO0FBQ0Q7Ozs7Ozs7O2dDQUtvQixFLEVBQUksQyxFQUFJOztBQUUxQixVQUFJLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBSjs7QUFFQSxRQUFFLE9BQUYsQ0FBVyxVQUFXLENBQVgsRUFBZTtBQUN4QixXQUFHLFNBQUgsQ0FBYSxNQUFiLENBQXFCLENBQXJCO0FBQ0QsT0FGRDtBQUdEOztBQUVEOzs7Ozs7OztnQ0FLb0IsRSxFQUFJLEMsRUFBSTs7QUFFMUIsVUFBSSxLQUFLLE9BQUwsQ0FBYSxDQUFiLENBQUo7O0FBRUEsUUFBRSxPQUFGLENBQVcsVUFBVyxDQUFYLEVBQWU7QUFDeEIsV0FBRyxTQUFILENBQWEsTUFBYixDQUFvQixDQUFwQjtBQUNELE9BRkQ7QUFHRDs7QUFFRDs7Ozs7Ozs7Ozs0QkFPZ0IsRSxFQUFJLEMsRUFBSTtBQUN0QixhQUFPLENBQUMsS0FBSyxHQUFHLGFBQVQsS0FBMkIsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxFQUFkLEVBQWtCLENBQWxCLENBQW5DO0FBQ0EsZUFBTyxFQUFQO0FBREE7QUFFRDs7QUFFRDs7Ozs7Ozs7OzRCQU1lLE0sRUFBUTs7QUFFckIsVUFBSSxRQUFRLEVBQVo7O0FBRUEsVUFBSSxPQUFPLE1BQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUIsY0FBTSxJQUFOLENBQVcsTUFBWDtBQUNELE9BRkQsTUFFTyxJQUFJLE1BQU0sT0FBTixDQUFjLE1BQWQsQ0FBSixFQUEyQjtBQUNoQyxnQkFBUSxNQUFSO0FBQ0QsT0FGTSxNQUVBO0FBQ0wsZUFBTyxLQUFQO0FBQ0Q7O0FBRUQsYUFBTyxLQUFQO0FBQ0Q7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQU9nQjs7QUFFZCxVQUFJLFdBQVcsRUFBZjtBQUNBLFVBQUksT0FBTyxLQUFYO0FBQ0EsVUFBSSxJQUFJLENBQVI7QUFDQSxVQUFJLFNBQVMsVUFBVSxNQUF2Qjs7QUFFQSxVQUFLLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUFnQyxVQUFVLENBQVYsQ0FBaEMsTUFBbUQsa0JBQXhELEVBQTZFO0FBQzNFLGVBQU8sVUFBVSxDQUFWLENBQVA7QUFDQTtBQUNEOztBQUVELFVBQUksUUFBUSxTQUFSLEtBQVEsQ0FBRSxHQUFGLEVBQVc7QUFDckIsYUFBTSxJQUFJLElBQVYsSUFBa0IsR0FBbEIsRUFBd0I7QUFDdEIsY0FBSyxPQUFPLFNBQVAsQ0FBaUIsY0FBakIsQ0FBZ0MsSUFBaEMsQ0FBc0MsR0FBdEMsRUFBMkMsSUFBM0MsQ0FBTCxFQUF5RDtBQUN2RCxnQkFBSyxRQUFRLE9BQU8sU0FBUCxDQUFpQixRQUFqQixDQUEwQixJQUExQixDQUErQixJQUFJLElBQUosQ0FBL0IsTUFBOEMsaUJBQTNELEVBQStFO0FBQzdFLHVCQUFTLElBQVQsSUFBaUIsT0FBUSxJQUFSLEVBQWMsU0FBUyxJQUFULENBQWQsRUFBOEIsSUFBSSxJQUFKLENBQTlCLENBQWpCO0FBQ0QsYUFGRCxNQUVPO0FBQ0wsdUJBQVMsSUFBVCxJQUFpQixJQUFJLElBQUosQ0FBakI7QUFDRDtBQUNGO0FBQ0Y7QUFDRixPQVZEOztBQVlBLGFBQVEsSUFBSSxNQUFaLEVBQW9CLEdBQXBCLEVBQTBCO0FBQ3hCLFlBQUksTUFBTSxVQUFVLENBQVYsQ0FBVjtBQUNBLGNBQU0sR0FBTjtBQUNEOztBQUVELGFBQU8sUUFBUDtBQUNELEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgbGlzdCBmcm9tICdsaXN0LmpzJ1xuaW1wb3J0IE1vZGFsIGZyb20gJ21vZGFsLmpzJ1xuaW1wb3J0IERpc21pc3NpYmxlIGZyb20gJ2Rpc21pc3NpYmxlLmpzJ1xuXG5jb25zdCBtb2RhbCA9IG5ldyBNb2RhbCgpXG5jb25zdCBkaXNtaXNzaWJsZSA9IG5ldyBEaXNtaXNzaWJsZSgpXG5cbmNvbnN0IGhvbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndnJlbWJlbS1ibG9ja3MnKVxuXG5pZiAoaG9tZSkge1xuXG4gIGNvbnN0IGJsb2Nrc0xpc3QgPSBuZXcgbGlzdCgndnJlbWJlbS1ibG9ja3MnLCB7XG4gICAgdmFsdWVOYW1lczogW1xuICAgICAgJ2p1bWJvLWxpc3RfX25hbWUnLFxuICAgICAgeyBkYXRhOiBbJ3R5cGUnXSB9XG4gICAgXSxcbiAgICBsaXN0Q2xhc3M6ICdqdW1iby1saXN0J1xuICB9KVxuXG4gIGNvbnN0IHVwZGF0ZUxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICBjb25zdCB2YWx1ZXNfdHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqdW1iby1maWx0ZXJfX3R5cGUnKS52YWx1ZVxuICAgIGJsb2Nrc0xpc3QuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIHJldHVybiAodmFsdWVzX3R5cGUuaW5jbHVkZXMoaXRlbS52YWx1ZXMoKS50eXBlKSB8fCAhdmFsdWVzX3R5cGUpXG4gICAgfSlcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGZpbHRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqdW1iby1maWx0ZXJfX3R5cGUnKVxuICAgIGlmIChmaWx0ZXIpIHtcbiAgICAgIGZpbHRlci5vbmNoYW5nZT11cGRhdGVMaXN0XG4gICAgfVxuICB9LCBmYWxzZSlcblxuICBibG9ja3NMaXN0LnNvcnQoJ2p1bWJvLWxpc3RfX25hbWUnLCB7IG9yZGVyOiAnYXNjJyB9KVxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgdmFyIGFkZEFzeW5jID0gZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaywgaXRlbXMpIHtcbiAgICB2YXIgdmFsdWVzVG9BZGQgPSB2YWx1ZXMuc3BsaWNlKDAsIDUwKTtcbiAgICBpdGVtcyA9IGl0ZW1zIHx8IFtdO1xuICAgIGl0ZW1zID0gaXRlbXMuY29uY2F0KGxpc3QuYWRkKHZhbHVlc1RvQWRkKSk7XG4gICAgaWYgKHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBhZGRBc3luYyh2YWx1ZXMsIGNhbGxiYWNrLCBpdGVtcyk7XG4gICAgICB9LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC51cGRhdGUoKTtcbiAgICAgIGNhbGxiYWNrKGl0ZW1zKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBhZGRBc3luYztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICAvLyBBZGQgaGFuZGxlcnNcbiAgbGlzdC5oYW5kbGVycy5maWx0ZXJTdGFydCA9IGxpc3QuaGFuZGxlcnMuZmlsdGVyU3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuZmlsdGVyQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLmZpbHRlckNvbXBsZXRlIHx8IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbihmaWx0ZXJGdW5jdGlvbikge1xuICAgIGxpc3QudHJpZ2dlcignZmlsdGVyU3RhcnQnKTtcbiAgICBsaXN0LmkgPSAxOyAvLyBSZXNldCBwYWdpbmdcbiAgICBsaXN0LnJlc2V0LmZpbHRlcigpO1xuICAgIGlmIChmaWx0ZXJGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaXN0LmZpbHRlcmVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QuZmlsdGVyZWQgPSB0cnVlO1xuICAgICAgdmFyIGlzID0gbGlzdC5pdGVtcztcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGlzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBpc1tpXTtcbiAgICAgICAgaWYgKGZpbHRlckZ1bmN0aW9uKGl0ZW0pKSB7XG4gICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdmaWx0ZXJDb21wbGV0ZScpO1xuICAgIHJldHVybiBsaXN0LnZpc2libGVJdGVtcztcbiAgfTtcbn07XG4iLCJcbnZhciBjbGFzc2VzID0gcmVxdWlyZSgnLi91dGlscy9jbGFzc2VzJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyksXG4gIHRvU3RyaW5nID0gcmVxdWlyZSgnLi91dGlscy90by1zdHJpbmcnKSxcbiAgZ2V0QnlDbGFzcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWJ5LWNsYXNzJyksXG4gIGZ1enp5ID0gcmVxdWlyZSgnLi91dGlscy9mdXp6eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgb3B0aW9ucyA9IGV4dGVuZCh7XG4gICAgbG9jYXRpb246IDAsXG4gICAgZGlzdGFuY2U6IDEwMCxcbiAgICB0aHJlc2hvbGQ6IDAuNCxcbiAgICBtdWx0aVNlYXJjaDogdHJ1ZSxcbiAgICBzZWFyY2hDbGFzczogJ2Z1enp5LXNlYXJjaCdcbiAgfSwgb3B0aW9ucyk7XG5cblxuXG4gIHZhciBmdXp6eVNlYXJjaCA9IHtcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKHNlYXJjaFN0cmluZywgY29sdW1ucykge1xuICAgICAgLy8gU3Vic3RyYWN0IGFyZ3VtZW50cyBmcm9tIHRoZSBzZWFyY2hTdHJpbmcgb3IgcHV0IHNlYXJjaFN0cmluZyBhcyBvbmx5IGFyZ3VtZW50XG4gICAgICB2YXIgc2VhcmNoQXJndW1lbnRzID0gb3B0aW9ucy5tdWx0aVNlYXJjaCA/IHNlYXJjaFN0cmluZy5yZXBsYWNlKC8gKyQvLCAnJykuc3BsaXQoLyArLykgOiBbc2VhcmNoU3RyaW5nXTtcblxuICAgICAgZm9yICh2YXIgayA9IDAsIGtsID0gbGlzdC5pdGVtcy5sZW5ndGg7IGsgPCBrbDsgaysrKSB7XG4gICAgICAgIGZ1enp5U2VhcmNoLml0ZW0obGlzdC5pdGVtc1trXSwgY29sdW1ucywgc2VhcmNoQXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW06IGZ1bmN0aW9uKGl0ZW0sIGNvbHVtbnMsIHNlYXJjaEFyZ3VtZW50cykge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZTtcbiAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWFyY2hBcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGZvdW5kQXJndW1lbnQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gY29sdW1ucy5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgaWYgKGZ1enp5U2VhcmNoLnZhbHVlcyhpdGVtLnZhbHVlcygpLCBjb2x1bW5zW2pdLCBzZWFyY2hBcmd1bWVudHNbaV0pKSB7XG4gICAgICAgICAgICBmb3VuZEFyZ3VtZW50ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoIWZvdW5kQXJndW1lbnQpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpdGVtLmZvdW5kID0gZm91bmQ7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uKHZhbHVlcywgdmFsdWUsIHNlYXJjaEFyZ3VtZW50KSB7XG4gICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KHZhbHVlKSkge1xuICAgICAgICB2YXIgdGV4dCA9IHRvU3RyaW5nKHZhbHVlc1t2YWx1ZV0pLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKGZ1enp5KHRleHQsIHNlYXJjaEFyZ3VtZW50LCBvcHRpb25zKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG5cbiAgZXZlbnRzLmJpbmQoZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIG9wdGlvbnMuc2VhcmNoQ2xhc3MpLCAna2V5dXAnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDsgLy8gSUUgaGF2ZSBzcmNFbGVtZW50XG4gICAgbGlzdC5zZWFyY2godGFyZ2V0LnZhbHVlLCBmdXp6eVNlYXJjaC5zZWFyY2gpO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24oc3RyLCBjb2x1bW5zKSB7XG4gICAgbGlzdC5zZWFyY2goc3RyLCBjb2x1bW5zLCBmdXp6eVNlYXJjaC5zZWFyY2gpO1xuICB9O1xufTtcbiIsInZhciBuYXR1cmFsU29ydCA9IHJlcXVpcmUoJ3N0cmluZy1uYXR1cmFsLWNvbXBhcmUnKSxcbiAgZ2V0QnlDbGFzcyA9IHJlcXVpcmUoJy4vdXRpbHMvZ2V0LWJ5LWNsYXNzJyksXG4gIGV4dGVuZCA9IHJlcXVpcmUoJy4vdXRpbHMvZXh0ZW5kJyksXG4gIGluZGV4T2YgPSByZXF1aXJlKCcuL3V0aWxzL2luZGV4LW9mJyksXG4gIGV2ZW50cyA9IHJlcXVpcmUoJy4vdXRpbHMvZXZlbnRzJyksXG4gIHRvU3RyaW5nID0gcmVxdWlyZSgnLi91dGlscy90by1zdHJpbmcnKSxcbiAgY2xhc3NlcyA9IHJlcXVpcmUoJy4vdXRpbHMvY2xhc3NlcycpLFxuICBnZXRBdHRyaWJ1dGUgPSByZXF1aXJlKCcuL3V0aWxzL2dldC1hdHRyaWJ1dGUnKSxcbiAgdG9BcnJheSA9IHJlcXVpcmUoJy4vdXRpbHMvdG8tYXJyYXknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpZCwgb3B0aW9ucywgdmFsdWVzKSB7XG5cbiAgdmFyIHNlbGYgPSB0aGlzLFxuICAgIGluaXQsXG4gICAgSXRlbSA9IHJlcXVpcmUoJy4vaXRlbScpKHNlbGYpLFxuICAgIGFkZEFzeW5jID0gcmVxdWlyZSgnLi9hZGQtYXN5bmMnKShzZWxmKSxcbiAgICBpbml0UGFnaW5hdGlvbiA9IHJlcXVpcmUoJy4vcGFnaW5hdGlvbicpKHNlbGYpO1xuXG4gIGluaXQgPSB7XG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgc2VsZi5saXN0Q2xhc3MgICAgICA9IFwibGlzdFwiO1xuICAgICAgc2VsZi5zZWFyY2hDbGFzcyAgICA9IFwic2VhcmNoXCI7XG4gICAgICBzZWxmLnNvcnRDbGFzcyAgICAgID0gXCJzb3J0XCI7XG4gICAgICBzZWxmLnBhZ2UgICAgICAgICAgID0gMTAwMDA7XG4gICAgICBzZWxmLmkgICAgICAgICAgICAgID0gMTtcbiAgICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICAgIHNlbGYudmlzaWJsZUl0ZW1zICAgPSBbXTtcbiAgICAgIHNlbGYubWF0Y2hpbmdJdGVtcyAgPSBbXTtcbiAgICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICAgIHNlbGYuZmlsdGVyZWQgICAgICAgPSBmYWxzZTtcbiAgICAgIHNlbGYuc2VhcmNoQ29sdW1ucyAgPSB1bmRlZmluZWQ7XG4gICAgICBzZWxmLmhhbmRsZXJzICAgICAgID0geyAndXBkYXRlZCc6IFtdIH07XG4gICAgICBzZWxmLnZhbHVlTmFtZXMgICAgID0gW107XG4gICAgICBzZWxmLnV0aWxzICAgICAgICAgID0ge1xuICAgICAgICBnZXRCeUNsYXNzOiBnZXRCeUNsYXNzLFxuICAgICAgICBleHRlbmQ6IGV4dGVuZCxcbiAgICAgICAgaW5kZXhPZjogaW5kZXhPZixcbiAgICAgICAgZXZlbnRzOiBldmVudHMsXG4gICAgICAgIHRvU3RyaW5nOiB0b1N0cmluZyxcbiAgICAgICAgbmF0dXJhbFNvcnQ6IG5hdHVyYWxTb3J0LFxuICAgICAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgICAgICBnZXRBdHRyaWJ1dGU6IGdldEF0dHJpYnV0ZSxcbiAgICAgICAgdG9BcnJheTogdG9BcnJheVxuICAgICAgfTtcblxuICAgICAgc2VsZi51dGlscy5leHRlbmQoc2VsZiwgb3B0aW9ucyk7XG5cbiAgICAgIHNlbGYubGlzdENvbnRhaW5lciA9ICh0eXBlb2YoaWQpID09PSAnc3RyaW5nJykgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgOiBpZDtcbiAgICAgIGlmICghc2VsZi5saXN0Q29udGFpbmVyKSB7IHJldHVybjsgfVxuICAgICAgc2VsZi5saXN0ICAgICAgID0gZ2V0QnlDbGFzcyhzZWxmLmxpc3RDb250YWluZXIsIHNlbGYubGlzdENsYXNzLCB0cnVlKTtcblxuICAgICAgc2VsZi5wYXJzZSAgICAgICAgPSByZXF1aXJlKCcuL3BhcnNlJykoc2VsZik7XG4gICAgICBzZWxmLnRlbXBsYXRlciAgICA9IHJlcXVpcmUoJy4vdGVtcGxhdGVyJykoc2VsZik7XG4gICAgICBzZWxmLnNlYXJjaCAgICAgICA9IHJlcXVpcmUoJy4vc2VhcmNoJykoc2VsZik7XG4gICAgICBzZWxmLmZpbHRlciAgICAgICA9IHJlcXVpcmUoJy4vZmlsdGVyJykoc2VsZik7XG4gICAgICBzZWxmLnNvcnQgICAgICAgICA9IHJlcXVpcmUoJy4vc29ydCcpKHNlbGYpO1xuICAgICAgc2VsZi5mdXp6eVNlYXJjaCAgPSByZXF1aXJlKCcuL2Z1enp5LXNlYXJjaCcpKHNlbGYsIG9wdGlvbnMuZnV6enlTZWFyY2gpO1xuXG4gICAgICB0aGlzLmhhbmRsZXJzKCk7XG4gICAgICB0aGlzLml0ZW1zKCk7XG4gICAgICB0aGlzLnBhZ2luYXRpb24oKTtcblxuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9LFxuICAgIGhhbmRsZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGhhbmRsZXIgaW4gc2VsZi5oYW5kbGVycykge1xuICAgICAgICBpZiAoc2VsZltoYW5kbGVyXSkge1xuICAgICAgICAgIHNlbGYub24oaGFuZGxlciwgc2VsZltoYW5kbGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYucGFyc2Uoc2VsZi5saXN0KTtcbiAgICAgIGlmICh2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZWxmLmFkZCh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcGFnaW5hdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbiA9IFt7fV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvblswXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICBvcHRpb25zLnBhZ2luYXRpb24gPSBbb3B0aW9ucy5wYWdpbmF0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvcHRpb25zLnBhZ2luYXRpb24ubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAgIGluaXRQYWdpbmF0aW9uKG9wdGlvbnMucGFnaW5hdGlvbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLypcbiAgKiBSZS1wYXJzZSB0aGUgTGlzdCwgdXNlIGlmIGh0bWwgaGF2ZSBjaGFuZ2VkXG4gICovXG4gIHRoaXMucmVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zICA9IFtdO1xuICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgc2VsZi5wYXJzZShzZWxmLmxpc3QpO1xuICB9O1xuXG4gIHRoaXMudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGpzb24gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGpzb24ucHVzaChzZWxmLml0ZW1zW2ldLnZhbHVlcygpKTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH07XG5cblxuICAvKlxuICAqIEFkZCBvYmplY3QgdG8gbGlzdFxuICAqL1xuICB0aGlzLmFkZCA9IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYWRkZWQgPSBbXSxcbiAgICAgIG5vdENyZWF0ZSA9IGZhbHNlO1xuICAgIGlmICh2YWx1ZXNbMF0gPT09IHVuZGVmaW5lZCl7XG4gICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdmFsdWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbnVsbDtcbiAgICAgIG5vdENyZWF0ZSA9IChzZWxmLml0ZW1zLmxlbmd0aCA+IHNlbGYucGFnZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICBpdGVtID0gbmV3IEl0ZW0odmFsdWVzW2ldLCB1bmRlZmluZWQsIG5vdENyZWF0ZSk7XG4gICAgICBzZWxmLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICBhZGRlZC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBhZGRlZDtcbiAgfTtcblxuXHR0aGlzLnNob3cgPSBmdW5jdGlvbihpLCBwYWdlKSB7XG5cdFx0dGhpcy5pID0gaTtcblx0XHR0aGlzLnBhZ2UgPSBwYWdlO1xuXHRcdHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIHNlbGY7XG5cdH07XG5cbiAgLyogUmVtb3ZlcyBvYmplY3QgZnJvbSBsaXN0LlxuICAqIExvb3BzIHRocm91Z2ggdGhlIGxpc3QgYW5kIHJlbW92ZXMgb2JqZWN0cyB3aGVyZVxuICAqIHByb3BlcnR5IFwidmFsdWVuYW1lXCIgPT09IHZhbHVlXG4gICovXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24odmFsdWVOYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBmb3VuZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoc2VsZi5pdGVtc1tpXS52YWx1ZXMoKVt2YWx1ZU5hbWVdID09IHZhbHVlKSB7XG4gICAgICAgIHNlbGYudGVtcGxhdGVyLnJlbW92ZShzZWxmLml0ZW1zW2ldLCBvcHRpb25zKTtcbiAgICAgICAgc2VsZi5pdGVtcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgaWwtLTtcbiAgICAgICAgaS0tO1xuICAgICAgICBmb3VuZCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKiBHZXRzIHRoZSBvYmplY3RzIGluIHRoZSBsaXN0IHdoaWNoXG4gICogcHJvcGVydHkgXCJ2YWx1ZU5hbWVcIiA9PT0gdmFsdWVcbiAgKi9cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbih2YWx1ZU5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoZWRJdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzZWxmLml0ZW1zW2ldO1xuICAgICAgaWYgKGl0ZW0udmFsdWVzKClbdmFsdWVOYW1lXSA9PSB2YWx1ZSkge1xuICAgICAgICBtYXRjaGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZWRJdGVtcztcbiAgfTtcblxuICAvKlxuICAqIEdldCBzaXplIG9mIHRoZSBsaXN0XG4gICovXG4gIHRoaXMuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzZWxmLml0ZW1zLmxlbmd0aDtcbiAgfTtcblxuICAvKlxuICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhlIGxpc3RcbiAgKi9cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgc2VsZi5pdGVtcyA9IFtdO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMub24gPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICBzZWxmLmhhbmRsZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gc2VsZi5oYW5kbGVyc1tldmVudF07XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihlLCBjYWxsYmFjayk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSA9IHNlbGYuaGFuZGxlcnNbZXZlbnRdLmxlbmd0aDtcbiAgICB3aGlsZShpLS0pIHtcbiAgICAgIHNlbGYuaGFuZGxlcnNbZXZlbnRdW2ldKHNlbGYpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0ge1xuICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuICAgICAgICBpbCA9IGlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpbC0tKSB7XG4gICAgICAgIGlzW2lsXS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcbiAgICAgICAgaWwgPSBpcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWwtLSkge1xuICAgICAgICBpc1tpbF0uZm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG5cdFx0XHRpbCA9IGlzLmxlbmd0aDtcblxuICAgIHNlbGYudmlzaWJsZUl0ZW1zID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zID0gW107XG4gICAgc2VsZi50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChpc1tpXS5tYXRjaGluZygpICYmICgoc2VsZi5tYXRjaGluZ0l0ZW1zLmxlbmd0aCsxKSA+PSBzZWxmLmkgJiYgc2VsZi52aXNpYmxlSXRlbXMubGVuZ3RoIDwgc2VsZi5wYWdlKSkge1xuICAgICAgICBpc1tpXS5zaG93KCk7XG4gICAgICAgIHNlbGYudmlzaWJsZUl0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBzZWxmLm1hdGNoaW5nSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICB9IGVsc2UgaWYgKGlzW2ldLm1hdGNoaW5nKCkpIHtcbiAgICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYudHJpZ2dlcigndXBkYXRlZCcpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIGluaXQuc3RhcnQoKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSkge1xuICAgIHZhciBpdGVtID0gdGhpcztcblxuICAgIHRoaXMuX3ZhbHVlcyA9IHt9O1xuXG4gICAgdGhpcy5mb3VuZCA9IGZhbHNlOyAvLyBTaG93IGlmIGxpc3Quc2VhcmNoZWQgPT0gdHJ1ZSBhbmQgdGhpcy5mb3VuZCA9PSB0cnVlXG4gICAgdGhpcy5maWx0ZXJlZCA9IGZhbHNlOy8vIFNob3cgaWYgbGlzdC5maWx0ZXJlZCA9PSB0cnVlIGFuZCB0aGlzLmZpbHRlcmVkID09IHRydWVcblxuICAgIHZhciBpbml0ID0gZnVuY3Rpb24oaW5pdFZhbHVlcywgZWxlbWVudCwgbm90Q3JlYXRlKSB7XG4gICAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChub3RDcmVhdGUpIHtcbiAgICAgICAgICBpdGVtLnZhbHVlcyhpbml0VmFsdWVzLCBub3RDcmVhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0udmFsdWVzKGluaXRWYWx1ZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLmVsbSA9IGVsZW1lbnQ7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBsaXN0LnRlbXBsYXRlci5nZXQoaXRlbSwgaW5pdFZhbHVlcyk7XG4gICAgICAgIGl0ZW0udmFsdWVzKHZhbHVlcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMudmFsdWVzID0gZnVuY3Rpb24obmV3VmFsdWVzLCBub3RDcmVhdGUpIHtcbiAgICAgIGlmIChuZXdWYWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBmb3IodmFyIG5hbWUgaW4gbmV3VmFsdWVzKSB7XG4gICAgICAgICAgaXRlbS5fdmFsdWVzW25hbWVdID0gbmV3VmFsdWVzW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3RDcmVhdGUgIT09IHRydWUpIHtcbiAgICAgICAgICBsaXN0LnRlbXBsYXRlci5zZXQoaXRlbSwgaXRlbS52YWx1ZXMoKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpdGVtLl92YWx1ZXM7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuc2hvdyhpdGVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnRlbXBsYXRlci5oaWRlKGl0ZW0pO1xuICAgIH07XG5cbiAgICB0aGlzLm1hdGNoaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICAobGlzdC5maWx0ZXJlZCAmJiBsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZm91bmQgJiYgaXRlbS5maWx0ZXJlZCkgfHxcbiAgICAgICAgKGxpc3QuZmlsdGVyZWQgJiYgIWxpc3Quc2VhcmNoZWQgJiYgaXRlbS5maWx0ZXJlZCkgfHxcbiAgICAgICAgKCFsaXN0LmZpbHRlcmVkICYmIGxpc3Quc2VhcmNoZWQgJiYgaXRlbS5mb3VuZCkgfHxcbiAgICAgICAgKCFsaXN0LmZpbHRlcmVkICYmICFsaXN0LnNlYXJjaGVkKVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhpcy52aXNpYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKGl0ZW0uZWxtICYmIChpdGVtLmVsbS5wYXJlbnROb2RlID09IGxpc3QubGlzdCkpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH07XG5cbiAgICBpbml0KGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSk7XG4gIH07XG59O1xuIiwidmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL3V0aWxzL2NsYXNzZXMnKSxcbiAgZXZlbnRzID0gcmVxdWlyZSgnLi91dGlscy9ldmVudHMnKSxcbiAgTGlzdCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbihwYWdpbmdMaXN0LCBvcHRpb25zKSB7XG4gICAgdmFyIGl0ZW0sXG4gICAgICBsID0gbGlzdC5tYXRjaGluZ0l0ZW1zLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gbGlzdC5pLFxuICAgICAgcGFnZSA9IGxpc3QucGFnZSxcbiAgICAgIHBhZ2VzID0gTWF0aC5jZWlsKGwgLyBwYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlID0gTWF0aC5jZWlsKChpbmRleCAvIHBhZ2UpKSxcbiAgICAgIGlubmVyV2luZG93ID0gb3B0aW9ucy5pbm5lcldpbmRvdyB8fCAyLFxuICAgICAgbGVmdCA9IG9wdGlvbnMubGVmdCB8fCBvcHRpb25zLm91dGVyV2luZG93IHx8IDAsXG4gICAgICByaWdodCA9IG9wdGlvbnMucmlnaHQgfHwgb3B0aW9ucy5vdXRlcldpbmRvdyB8fCAwO1xuXG4gICAgcmlnaHQgPSBwYWdlcyAtIHJpZ2h0O1xuXG4gICAgcGFnaW5nTGlzdC5jbGVhcigpO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHBhZ2VzOyBpKyspIHtcbiAgICAgIHZhciBjbGFzc05hbWUgPSAoY3VycmVudFBhZ2UgPT09IGkpID8gXCJhY3RpdmVcIiA6IFwiXCI7XG5cbiAgICAgIC8vY29uc29sZS5sb2coaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCAoY3VycmVudFBhZ2UgLSBpbm5lcldpbmRvdyksIChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSwgY2xhc3NOYW1lKTtcblxuICAgICAgaWYgKGlzLm51bWJlcihpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IGksXG4gICAgICAgICAgZG90dGVkOiBmYWxzZVxuICAgICAgICB9KVswXTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgIGNsYXNzZXMoaXRlbS5lbG0pLmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50KGl0ZW0uZWxtLCBpLCBwYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXMuZG90dGVkKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIHBhZ2luZ0xpc3Quc2l6ZSgpKSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IFwiLi4uXCIsXG4gICAgICAgICAgZG90dGVkOiB0cnVlXG4gICAgICAgIH0pWzBdO1xuICAgICAgICBjbGFzc2VzKGl0ZW0uZWxtKS5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzID0ge1xuICAgIG51bWJlcjogZnVuY3Rpb24oaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgIHJldHVybiB0aGlzLmxlZnQoaSwgbGVmdCkgfHwgdGhpcy5yaWdodChpLCByaWdodCkgfHwgdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpO1xuICAgIH0sXG4gICAgbGVmdDogZnVuY3Rpb24oaSwgbGVmdCkge1xuICAgICAgcmV0dXJuIChpIDw9IGxlZnQpO1xuICAgIH0sXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGksIHJpZ2h0KSB7XG4gICAgICByZXR1cm4gKGkgPiByaWdodCk7XG4gICAgfSxcbiAgICBpbm5lcldpbmRvdzogZnVuY3Rpb24oaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICByZXR1cm4gKCBpID49IChjdXJyZW50UGFnZSAtIGlubmVyV2luZG93KSAmJiBpIDw9IChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSk7XG4gICAgfSxcbiAgICBkb3R0ZWQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuZG90dGVkTGVmdChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB8fCAodGhpcy5kb3R0ZWRSaWdodChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pKTtcbiAgICB9LFxuICAgIGRvdHRlZExlZnQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgIHJldHVybiAoKGkgPT0gKGxlZnQgKyAxKSkgJiYgIXRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSAmJiAhdGhpcy5yaWdodChpLCByaWdodCkpO1xuICAgIH0sXG4gICAgZG90dGVkUmlnaHQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgaWYgKHBhZ2luZ0xpc3QuaXRlbXNbY3VycmVudFBhZ2VJdGVtLTFdLnZhbHVlcygpLmRvdHRlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKChpID09IChyaWdodCkpICYmICF0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgJiYgIXRoaXMucmlnaHQoaSwgcmlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWxtLCBpLCBwYWdlKSB7XG4gICAgIGV2ZW50cy5iaW5kKGVsbSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgbGlzdC5zaG93KChpLTEpKnBhZ2UgKyAxLCBwYWdlKTtcbiAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgcGFnaW5nTGlzdCA9IG5ldyBMaXN0KGxpc3QubGlzdENvbnRhaW5lci5pZCwge1xuICAgICAgbGlzdENsYXNzOiBvcHRpb25zLnBhZ2luYXRpb25DbGFzcyB8fCAncGFnaW5hdGlvbicsXG4gICAgICBpdGVtOiBcIjxsaT48YSBjbGFzcz0ncGFnZScgaHJlZj0namF2YXNjcmlwdDpmdW5jdGlvbiBaKCl7Wj1cXFwiXFxcIn1aKCknPjwvYT48L2xpPlwiLFxuICAgICAgdmFsdWVOYW1lczogWydwYWdlJywgJ2RvdHRlZCddLFxuICAgICAgc2VhcmNoQ2xhc3M6ICdwYWdpbmF0aW9uLXNlYXJjaC10aGF0LWlzLW5vdC1zdXBwb3NlZC10by1leGlzdCcsXG4gICAgICBzb3J0Q2xhc3M6ICdwYWdpbmF0aW9uLXNvcnQtdGhhdC1pcy1ub3Qtc3VwcG9zZWQtdG8tZXhpc3QnXG4gICAgfSk7XG5cbiAgICBsaXN0Lm9uKCd1cGRhdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICByZWZyZXNoKHBhZ2luZ0xpc3QsIG9wdGlvbnMpO1xuICAgIH0pO1xuICAgIHJlZnJlc2gocGFnaW5nTGlzdCwgb3B0aW9ucyk7XG4gIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIEl0ZW0gPSByZXF1aXJlKCcuL2l0ZW0nKShsaXN0KTtcblxuICB2YXIgZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICB2YXIgbm9kZXMgPSBwYXJlbnQuY2hpbGROb2RlcyxcbiAgICAgIGl0ZW1zID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbm9kZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgLy8gT25seSB0ZXh0bm9kZXMgaGF2ZSBhIGRhdGEgYXR0cmlidXRlXG4gICAgICBpZiAobm9kZXNbaV0uZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGl0ZW1zLnB1c2gobm9kZXNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXRlbXM7XG4gIH07XG5cbiAgdmFyIHBhcnNlID0gZnVuY3Rpb24oaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gaXRlbUVsZW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGxpc3QuaXRlbXMucHVzaChuZXcgSXRlbSh2YWx1ZU5hbWVzLCBpdGVtRWxlbWVudHNbaV0pKTtcbiAgICB9XG4gIH07XG4gIHZhciBwYXJzZUFzeW5jID0gZnVuY3Rpb24oaXRlbUVsZW1lbnRzLCB2YWx1ZU5hbWVzKSB7XG4gICAgdmFyIGl0ZW1zVG9JbmRleCA9IGl0ZW1FbGVtZW50cy5zcGxpY2UoMCwgNTApOyAvLyBUT0RPOiBJZiA8IDEwMCBpdGVtcywgd2hhdCBoYXBwZW5zIGluIElFIGV0Yz9cbiAgICBwYXJzZShpdGVtc1RvSW5kZXgsIHZhbHVlTmFtZXMpO1xuICAgIGlmIChpdGVtRWxlbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgcGFyc2VBc3luYyhpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpO1xuICAgICAgfSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QudXBkYXRlKCk7XG4gICAgICBsaXN0LnRyaWdnZXIoJ3BhcnNlQ29tcGxldGUnKTtcbiAgICB9XG4gIH07XG5cbiAgbGlzdC5oYW5kbGVycy5wYXJzZUNvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5wYXJzZUNvbXBsZXRlIHx8IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXNUb0luZGV4ID0gZ2V0Q2hpbGRyZW4obGlzdC5saXN0KSxcbiAgICAgIHZhbHVlTmFtZXMgPSBsaXN0LnZhbHVlTmFtZXM7XG5cbiAgICBpZiAobGlzdC5pbmRleEFzeW5jKSB7XG4gICAgICBwYXJzZUFzeW5jKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgfVxuICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgaXRlbSxcbiAgICB0ZXh0LFxuICAgIGNvbHVtbnMsXG4gICAgc2VhcmNoU3RyaW5nLFxuICAgIGN1c3RvbVNlYXJjaDtcblxuICB2YXIgcHJlcGFyZSA9IHtcbiAgICByZXNldExpc3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5pID0gMTtcbiAgICAgIGxpc3QudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgICBjdXN0b21TZWFyY2ggPSB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBzZXRPcHRpb25zOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGggPT0gMiAmJiBhcmdzWzFdIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgY29sdW1ucyA9IGFyZ3NbMV07XG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDIgJiYgdHlwZW9mKGFyZ3NbMV0pID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgICAgICBjdXN0b21TZWFyY2ggPSBhcmdzWzFdO1xuICAgICAgfSBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIGNvbHVtbnMgPSBhcmdzWzFdO1xuICAgICAgICBjdXN0b21TZWFyY2ggPSBhcmdzWzJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldENvbHVtbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGxpc3QuaXRlbXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICBpZiAoY29sdW1ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbHVtbnMgPSAobGlzdC5zZWFyY2hDb2x1bW5zID09PSB1bmRlZmluZWQpID8gcHJlcGFyZS50b0FycmF5KGxpc3QuaXRlbXNbMF0udmFsdWVzKCkpIDogbGlzdC5zZWFyY2hDb2x1bW5zO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0U2VhcmNoU3RyaW5nOiBmdW5jdGlvbihzKSB7XG4gICAgICBzID0gbGlzdC51dGlscy50b1N0cmluZyhzKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcyA9IHMucmVwbGFjZSgvWy1bXFxde30oKSorPy4sXFxcXF4kfCNdL2csIFwiXFxcXCQmXCIpOyAvLyBFc2NhcGUgcmVndWxhciBleHByZXNzaW9uIGNoYXJhY3RlcnNcbiAgICAgIHNlYXJjaFN0cmluZyA9IHM7XG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHZhciB0bXBDb2x1bW4gPSBbXTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gdmFsdWVzKSB7XG4gICAgICAgIHRtcENvbHVtbi5wdXNoKG5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRtcENvbHVtbjtcbiAgICB9XG4gIH07XG4gIHZhciBzZWFyY2ggPSB7XG4gICAgbGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBrID0gMCwga2wgPSBsaXN0Lml0ZW1zLmxlbmd0aDsgayA8IGtsOyBrKyspIHtcbiAgICAgICAgc2VhcmNoLml0ZW0obGlzdC5pdGVtc1trXSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpdGVtOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpdGVtLmZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjb2x1bW5zLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgaWYgKHNlYXJjaC52YWx1ZXMoaXRlbS52YWx1ZXMoKSwgY29sdW1uc1tqXSkpIHtcbiAgICAgICAgICBpdGVtLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24odmFsdWVzLCBjb2x1bW4pIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkoY29sdW1uKSkge1xuICAgICAgICB0ZXh0ID0gbGlzdC51dGlscy50b1N0cmluZyh2YWx1ZXNbY29sdW1uXSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKChzZWFyY2hTdHJpbmcgIT09IFwiXCIpICYmICh0ZXh0LnNlYXJjaChzZWFyY2hTdHJpbmcpID4gLTEpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QucmVzZXQuc2VhcmNoKCk7XG4gICAgICBsaXN0LnNlYXJjaGVkID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHZhciBzZWFyY2hNZXRob2QgPSBmdW5jdGlvbihzdHIpIHtcbiAgICBsaXN0LnRyaWdnZXIoJ3NlYXJjaFN0YXJ0Jyk7XG5cbiAgICBwcmVwYXJlLnJlc2V0TGlzdCgpO1xuICAgIHByZXBhcmUuc2V0U2VhcmNoU3RyaW5nKHN0cik7XG4gICAgcHJlcGFyZS5zZXRPcHRpb25zKGFyZ3VtZW50cyk7IC8vIHN0ciwgY29sc3xzZWFyY2hGdW5jdGlvbiwgc2VhcmNoRnVuY3Rpb25cbiAgICBwcmVwYXJlLnNldENvbHVtbnMoKTtcblxuICAgIGlmIChzZWFyY2hTdHJpbmcgPT09IFwiXCIgKSB7XG4gICAgICBzZWFyY2gucmVzZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zZWFyY2hlZCA9IHRydWU7XG4gICAgICBpZiAoY3VzdG9tU2VhcmNoKSB7XG4gICAgICAgIGN1c3RvbVNlYXJjaChzZWFyY2hTdHJpbmcsIGNvbHVtbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoLmxpc3QoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignc2VhcmNoQ29tcGxldGUnKTtcbiAgICByZXR1cm4gbGlzdC52aXNpYmxlSXRlbXM7XG4gIH07XG5cbiAgbGlzdC5oYW5kbGVycy5zZWFyY2hTdGFydCA9IGxpc3QuaGFuZGxlcnMuc2VhcmNoU3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuc2VhcmNoQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnNlYXJjaENvbXBsZXRlIHx8IFtdO1xuXG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQobGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zZWFyY2hDbGFzcyksICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50LCAvLyBJRSBoYXZlIHNyY0VsZW1lbnRcbiAgICAgIGFscmVhZHlDbGVhcmVkID0gKHRhcmdldC52YWx1ZSA9PT0gXCJcIiAmJiAhbGlzdC5zZWFyY2hlZCk7XG4gICAgaWYgKCFhbHJlYWR5Q2xlYXJlZCkgeyAvLyBJZiBvbmlucHV0IGFscmVhZHkgaGF2ZSByZXNldHRlZCB0aGUgbGlzdCwgZG8gbm90aGluZ1xuICAgICAgc2VhcmNoTWV0aG9kKHRhcmdldC52YWx1ZSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBVc2VkIHRvIGRldGVjdCBjbGljayBvbiBIVE1MNSBjbGVhciBidXR0b25cbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNlYXJjaENsYXNzKSwgJ2lucHV0JywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgaWYgKHRhcmdldC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgc2VhcmNoTWV0aG9kKCcnKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzZWFyY2hNZXRob2Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIGJ1dHRvbnMgPSB7XG4gICAgZWxzOiB1bmRlZmluZWQsXG4gICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYnV0dG9ucy5lbHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnV0dG9ucy5lbHNbaV0pLnJlbW92ZSgnYXNjJyk7XG4gICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidXR0b25zLmVsc1tpXSkucmVtb3ZlKCdkZXNjJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBnZXRPcmRlcjogZnVuY3Rpb24oYnRuKSB7XG4gICAgICB2YXIgcHJlZGVmaW5lZE9yZGVyID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1vcmRlcicpO1xuICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBcImFzY1wiIHx8IHByZWRlZmluZWRPcmRlciA9PSBcImRlc2NcIikge1xuICAgICAgICByZXR1cm4gcHJlZGVmaW5lZE9yZGVyO1xuICAgICAgfSBlbHNlIGlmIChsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5oYXMoJ2Rlc2MnKSkge1xuICAgICAgICByZXR1cm4gXCJhc2NcIjtcbiAgICAgIH0gZWxzZSBpZiAobGlzdC51dGlscy5jbGFzc2VzKGJ0bikuaGFzKCdhc2MnKSkge1xuICAgICAgICByZXR1cm4gXCJkZXNjXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJhc2NcIjtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldEluU2Vuc2l0aXZlOiBmdW5jdGlvbihidG4sIG9wdGlvbnMpIHtcbiAgICAgIHZhciBpbnNlbnNpdGl2ZSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtaW5zZW5zaXRpdmUnKTtcbiAgICAgIGlmIChpbnNlbnNpdGl2ZSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0T3JkZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGJ1dHRvbnMuZWxzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgdmFyIGJ0biA9IGJ1dHRvbnMuZWxzW2ldO1xuICAgICAgICBpZiAobGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1zb3J0JykgIT09IG9wdGlvbnMudmFsdWVOYW1lKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZWRlZmluZWRPcmRlciA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGJ0biwgJ2RhdGEtb3JkZXInKTtcbiAgICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBcImFzY1wiIHx8IHByZWRlZmluZWRPcmRlciA9PSBcImRlc2NcIikge1xuICAgICAgICAgIGlmIChwcmVkZWZpbmVkT3JkZXIgPT0gb3B0aW9ucy5vcmRlcikge1xuICAgICAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ0bikuYWRkKG9wdGlvbnMub3JkZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5hZGQob3B0aW9ucy5vcmRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHNvcnQgPSBmdW5jdGlvbigpIHtcbiAgICBsaXN0LnRyaWdnZXIoJ3NvcnRTdGFydCcpO1xuICAgIHZhciBvcHRpb25zID0ge307XG5cbiAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLmN1cnJlbnRUYXJnZXQgfHwgYXJndW1lbnRzWzBdLnNyY0VsZW1lbnQgfHwgdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgb3B0aW9ucy52YWx1ZU5hbWUgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZSh0YXJnZXQsICdkYXRhLXNvcnQnKTtcbiAgICAgIGJ1dHRvbnMuZ2V0SW5TZW5zaXRpdmUodGFyZ2V0LCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMub3JkZXIgPSBidXR0b25zLmdldE9yZGVyKHRhcmdldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbMV0gfHwgb3B0aW9ucztcbiAgICAgIG9wdGlvbnMudmFsdWVOYW1lID0gYXJndW1lbnRzWzBdO1xuICAgICAgb3B0aW9ucy5vcmRlciA9IG9wdGlvbnMub3JkZXIgfHwgXCJhc2NcIjtcbiAgICAgIG9wdGlvbnMuaW5zZW5zaXRpdmUgPSAodHlwZW9mIG9wdGlvbnMuaW5zZW5zaXRpdmUgPT0gXCJ1bmRlZmluZWRcIikgPyB0cnVlIDogb3B0aW9ucy5pbnNlbnNpdGl2ZTtcbiAgICB9XG5cbiAgICBidXR0b25zLmNsZWFyKCk7XG4gICAgYnV0dG9ucy5zZXRPcmRlcihvcHRpb25zKTtcblxuXG4gICAgLy8gY2FzZUluc2Vuc2l0aXZlXG4gICAgLy8gYWxwaGFiZXRcbiAgICB2YXIgY3VzdG9tU29ydEZ1bmN0aW9uID0gKG9wdGlvbnMuc29ydEZ1bmN0aW9uIHx8IGxpc3Quc29ydEZ1bmN0aW9uIHx8IG51bGwpLFxuICAgICAgICBtdWx0aSA9ICgob3B0aW9ucy5vcmRlciA9PT0gJ2Rlc2MnKSA/IC0xIDogMSksXG4gICAgICAgIHNvcnRGdW5jdGlvbjtcblxuICAgIGlmIChjdXN0b21Tb3J0RnVuY3Rpb24pIHtcbiAgICAgIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGl0ZW1BLCBpdGVtQikge1xuICAgICAgICByZXR1cm4gY3VzdG9tU29ydEZ1bmN0aW9uKGl0ZW1BLCBpdGVtQiwgb3B0aW9ucykgKiBtdWx0aTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKGl0ZW1BLCBpdGVtQikge1xuICAgICAgICB2YXIgc29ydCA9IGxpc3QudXRpbHMubmF0dXJhbFNvcnQ7XG4gICAgICAgIHNvcnQuYWxwaGFiZXQgPSBsaXN0LmFscGhhYmV0IHx8IG9wdGlvbnMuYWxwaGFiZXQgfHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXNvcnQuYWxwaGFiZXQgJiYgb3B0aW9ucy5pbnNlbnNpdGl2ZSkge1xuICAgICAgICAgIHNvcnQgPSBsaXN0LnV0aWxzLm5hdHVyYWxTb3J0LmNhc2VJbnNlbnNpdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc29ydChpdGVtQS52YWx1ZXMoKVtvcHRpb25zLnZhbHVlTmFtZV0sIGl0ZW1CLnZhbHVlcygpW29wdGlvbnMudmFsdWVOYW1lXSkgKiBtdWx0aTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgbGlzdC5pdGVtcy5zb3J0KHNvcnRGdW5jdGlvbik7XG4gICAgbGlzdC51cGRhdGUoKTtcbiAgICBsaXN0LnRyaWdnZXIoJ3NvcnRDb21wbGV0ZScpO1xuICB9O1xuXG4gIC8vIEFkZCBoYW5kbGVyc1xuICBsaXN0LmhhbmRsZXJzLnNvcnRTdGFydCA9IGxpc3QuaGFuZGxlcnMuc29ydFN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLnNvcnRDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuc29ydENvbXBsZXRlIHx8IFtdO1xuXG4gIGJ1dHRvbnMuZWxzID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgbGlzdC5zb3J0Q2xhc3MpO1xuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGJ1dHRvbnMuZWxzLCAnY2xpY2snLCBzb3J0KTtcbiAgbGlzdC5vbignc2VhcmNoU3RhcnQnLCBidXR0b25zLmNsZWFyKTtcbiAgbGlzdC5vbignZmlsdGVyU3RhcnQnLCBidXR0b25zLmNsZWFyKTtcblxuICByZXR1cm4gc29ydDtcbn07XG4iLCJ2YXIgVGVtcGxhdGVyID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgaXRlbVNvdXJjZSxcbiAgICB0ZW1wbGF0ZXIgPSB0aGlzO1xuXG4gIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgaXRlbVNvdXJjZSA9IHRlbXBsYXRlci5nZXRJdGVtU291cmNlKGxpc3QuaXRlbSk7XG4gICAgaWYgKGl0ZW1Tb3VyY2UpIHtcbiAgICAgIGl0ZW1Tb3VyY2UgPSB0ZW1wbGF0ZXIuY2xlYXJTb3VyY2VJdGVtKGl0ZW1Tb3VyY2UsIGxpc3QudmFsdWVOYW1lcyk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY2xlYXJTb3VyY2VJdGVtID0gZnVuY3Rpb24oZWwsIHZhbHVlTmFtZXMpIHtcbiAgICBmb3IodmFyIGkgPSAwLCBpbCA9IHZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIGlmICh2YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gdmFsdWVOYW1lc1tpXS5kYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyt2YWx1ZU5hbWVzW2ldLmRhdGFbal0sICcnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWVzW2ldLmF0dHIgJiYgdmFsdWVOYW1lc1tpXS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhlbCwgdmFsdWVOYW1lc1tpXS5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUodmFsdWVOYW1lc1tpXS5hdHRyLCBcIlwiKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGVsLCB2YWx1ZU5hbWVzW2ldLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICB0aGlzLmdldEl0ZW1Tb3VyY2UgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIG5vZGVzID0gbGlzdC5saXN0LmNoaWxkTm9kZXMsXG4gICAgICAgIGl0ZW1zID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IG5vZGVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgICAgLy8gT25seSB0ZXh0bm9kZXMgaGF2ZSBhIGRhdGEgYXR0cmlidXRlXG4gICAgICAgIGlmIChub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gbm9kZXNbaV0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgvPHRyW1xccz5dL2cuZXhlYyhpdGVtKSkge1xuICAgICAgdmFyIHRib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGJvZHknKTtcbiAgICAgIHRib2R5LmlubmVySFRNTCA9IGl0ZW07XG4gICAgICByZXR1cm4gdGJvZHkuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2UgaWYgKGl0ZW0uaW5kZXhPZihcIjxcIikgIT09IC0xKSB7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgIHJldHVybiBkaXYuZmlyc3RDaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvdXJjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpc3QuaXRlbSk7XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH07XG5cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbihpdGVtLCB2YWx1ZU5hbWVzKSB7XG4gICAgdGVtcGxhdGVyLmNyZWF0ZShpdGVtKTtcbiAgICB2YXIgdmFsdWVzID0ge307XG4gICAgZm9yKHZhciBpID0gMCwgaWwgPSB2YWx1ZU5hbWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBlbG07XG4gICAgICBpZiAodmFsdWVOYW1lc1tpXS5kYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IHZhbHVlTmFtZXNbaV0uZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgdmFsdWVzW3ZhbHVlTmFtZXNbaV0uZGF0YVtqXV0gPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShpdGVtLmVsbSwgJ2RhdGEtJyt2YWx1ZU5hbWVzW2ldLmRhdGFbal0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZXNbaV0uYXR0ciAmJiB2YWx1ZU5hbWVzW2ldLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWVzW2ldLm5hbWUsIHRydWUpO1xuICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXS5uYW1lXSA9IGVsbSA/IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGVsbSwgdmFsdWVOYW1lc1tpXS5hdHRyKSA6IFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZXNbaV0sIHRydWUpO1xuICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXV0gPSBlbG0gPyBlbG0uaW5uZXJIVE1MIDogXCJcIjtcbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICB0aGlzLnNldCA9IGZ1bmN0aW9uKGl0ZW0sIHZhbHVlcykge1xuICAgIHZhciBnZXRWYWx1ZU5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBsaXN0LnZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICBpZiAobGlzdC52YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGxpc3QudmFsdWVOYW1lc1tpXS5kYXRhO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgICAgaWYgKGRhdGFbal0gPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogbmFtZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0uYXR0ciAmJiBsaXN0LnZhbHVlTmFtZXNbaV0ubmFtZSAmJiBsaXN0LnZhbHVlTmFtZXNbaV0ubmFtZSA9PSBuYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIGxpc3QudmFsdWVOYW1lc1tpXTtcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0gPT09IG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNldFZhbHVlID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIHZhciBlbG07XG4gICAgICB2YXIgdmFsdWVOYW1lID0gZ2V0VmFsdWVOYW1lKG5hbWUpO1xuICAgICAgaWYgKCF2YWx1ZU5hbWUpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmICh2YWx1ZU5hbWUuZGF0YSkge1xuICAgICAgICBpdGVtLmVsbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtJyt2YWx1ZU5hbWUuZGF0YSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZU5hbWUuYXR0ciAmJiB2YWx1ZU5hbWUubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZS5uYW1lLCB0cnVlKTtcbiAgICAgICAgaWYgKGVsbSkge1xuICAgICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUodmFsdWVOYW1lLmF0dHIsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGl0ZW0uZWxtLCB2YWx1ZU5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbG0gPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBpZiAoIXRlbXBsYXRlci5jcmVhdGUoaXRlbSkpIHtcbiAgICAgIGZvcih2YXIgdiBpbiB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eSh2KSkge1xuICAgICAgICAgIHNldFZhbHVlKHYsIHZhbHVlc1t2XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZW1Tb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVGhlIGxpc3QgbmVlZCB0byBoYXZlIGF0IGxpc3Qgb25lIGl0ZW0gb24gaW5pdCBvdGhlcndpc2UgeW91J2xsIGhhdmUgdG8gYWRkIGEgdGVtcGxhdGUuXCIpO1xuICAgIH1cbiAgICAvKiBJZiBpdGVtIHNvdXJjZSBkb2VzIG5vdCBleGlzdHMsIHVzZSB0aGUgZmlyc3QgaXRlbSBpbiBsaXN0IGFzXG4gICAgc291cmNlIGZvciBuZXcgaXRlbXMgKi9cbiAgICB2YXIgbmV3SXRlbSA9IGl0ZW1Tb3VyY2UuY2xvbmVOb2RlKHRydWUpO1xuICAgIG5ld0l0ZW0ucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuICAgIGl0ZW0uZWxtID0gbmV3SXRlbTtcbiAgICB0ZW1wbGF0ZXIuc2V0KGl0ZW0sIGl0ZW0udmFsdWVzKCkpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICB0aGlzLnJlbW92ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0ucGFyZW50Tm9kZSA9PT0gbGlzdC5saXN0KSB7XG4gICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQoaXRlbS5lbG0pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zaG93ID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIHRlbXBsYXRlci5jcmVhdGUoaXRlbSk7XG4gICAgbGlzdC5saXN0LmFwcGVuZENoaWxkKGl0ZW0uZWxtKTtcbiAgfTtcbiAgdGhpcy5oaWRlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbSAhPT0gdW5kZWZpbmVkICYmIGl0ZW0uZWxtLnBhcmVudE5vZGUgPT09IGxpc3QubGlzdCkge1xuICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGl0ZW0uZWxtKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAvKiAuaW5uZXJIVE1MID0gJyc7IGZ1Y2tzIHVwIElFICovXG4gICAgaWYgKGxpc3QubGlzdC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHdoaWxlIChsaXN0Lmxpc3QuY2hpbGROb2Rlcy5sZW5ndGggPj0gMSlcbiAgICAgIHtcbiAgICAgICAgbGlzdC5saXN0LnJlbW92ZUNoaWxkKGxpc3QubGlzdC5maXJzdENoaWxkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaW5pdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHJldHVybiBuZXcgVGVtcGxhdGVyKGxpc3QpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgaW5kZXggPSByZXF1aXJlKCcuL2luZGV4LW9mJyk7XG5cbi8qKlxuICogV2hpdGVzcGFjZSByZWdleHAuXG4gKi9cblxudmFyIHJlID0gL1xccysvO1xuXG4vKipcbiAqIHRvU3RyaW5nIHJlZmVyZW5jZS5cbiAqL1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIFdyYXAgYGVsYCBpbiBhIGBDbGFzc0xpc3RgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCl7XG4gIHJldHVybiBuZXcgQ2xhc3NMaXN0KGVsKTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBDbGFzc0xpc3QgZm9yIGBlbGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gQ2xhc3NMaXN0KGVsKSB7XG4gIGlmICghZWwgfHwgIWVsLm5vZGVUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBIERPTSBlbGVtZW50IHJlZmVyZW5jZSBpcyByZXF1aXJlZCcpO1xuICB9XG4gIHRoaXMuZWwgPSBlbDtcbiAgdGhpcy5saXN0ID0gZWwuY2xhc3NMaXN0O1xufVxuXG4vKipcbiAqIEFkZCBjbGFzcyBgbmFtZWAgaWYgbm90IGFscmVhZHkgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKG5hbWUpe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIHRoaXMubGlzdC5hZGQobmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICB2YXIgYXJyID0gdGhpcy5hcnJheSgpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICghfmkpIGFyci5wdXNoKG5hbWUpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgY2xhc3MgYG5hbWVgIHdoZW4gcHJlc2VudCwgb3JcbiAqIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlXG4gKiBhbnkgd2hpY2ggbWF0Y2guXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBuYW1lXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24obmFtZSl7XG4gIC8vIGNsYXNzTGlzdFxuICBpZiAodGhpcy5saXN0KSB7XG4gICAgdGhpcy5saXN0LnJlbW92ZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIGZhbGxiYWNrXG4gIHZhciBhcnIgPSB0aGlzLmFycmF5KCk7XG4gIHZhciBpID0gaW5kZXgoYXJyLCBuYW1lKTtcbiAgaWYgKH5pKSBhcnIuc3BsaWNlKGksIDEpO1xuICB0aGlzLmVsLmNsYXNzTmFtZSA9IGFyci5qb2luKCcgJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuXG4vKipcbiAqIFRvZ2dsZSBjbGFzcyBgbmFtZWAsIGNhbiBmb3JjZSBzdGF0ZSB2aWEgYGZvcmNlYC5cbiAqXG4gKiBGb3IgYnJvd3NlcnMgdGhhdCBzdXBwb3J0IGNsYXNzTGlzdCwgYnV0IGRvIG5vdCBzdXBwb3J0IGBmb3JjZWAgeWV0LFxuICogdGhlIG1pc3Rha2Ugd2lsbCBiZSBkZXRlY3RlZCBhbmQgY29ycmVjdGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24obmFtZSwgZm9yY2Upe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIGlmIChcInVuZGVmaW5lZFwiICE9PSB0eXBlb2YgZm9yY2UpIHtcbiAgICAgIGlmIChmb3JjZSAhPT0gdGhpcy5saXN0LnRvZ2dsZShuYW1lLCBmb3JjZSkpIHtcbiAgICAgICAgdGhpcy5saXN0LnRvZ2dsZShuYW1lKTsgLy8gdG9nZ2xlIGFnYWluIHRvIGNvcnJlY3RcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5saXN0LnRvZ2dsZShuYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSkge1xuICAgICAgdGhpcy5yZW1vdmUobmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkKG5hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAodGhpcy5oYXMobmFtZSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChuYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IG9mIGNsYXNzZXMuXG4gKlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkNsYXNzTGlzdC5wcm90b3R5cGUuYXJyYXkgPSBmdW5jdGlvbigpe1xuICB2YXIgY2xhc3NOYW1lID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG4gIHZhciBzdHIgPSBjbGFzc05hbWUucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICB2YXIgYXJyID0gc3RyLnNwbGl0KHJlKTtcbiAgaWYgKCcnID09PSBhcnJbMF0pIGFyci5zaGlmdCgpO1xuICByZXR1cm4gYXJyO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBjbGFzcyBgbmFtZWAgaXMgcHJlc2VudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmhhcyA9XG5DbGFzc0xpc3QucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiB0aGlzLmxpc3QgPyB0aGlzLmxpc3QuY29udGFpbnMobmFtZSkgOiAhISB+aW5kZXgodGhpcy5hcnJheSgpLCBuYW1lKTtcbn07XG4iLCJ2YXIgYmluZCA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICB1bmJpbmQgPSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4gICAgcHJlZml4ID0gYmluZCAhPT0gJ2FkZEV2ZW50TGlzdGVuZXInID8gJ29uJyA6ICcnLFxuICAgIHRvQXJyYXkgPSByZXF1aXJlKCcuL3RvLWFycmF5Jyk7XG5cbi8qKlxuICogQmluZCBgZWxgIGV2ZW50IGB0eXBlYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiBvciBBcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5iaW5kID0gZnVuY3Rpb24oZWwsIHR5cGUsIGZuLCBjYXB0dXJlKXtcbiAgZWwgPSB0b0FycmF5KGVsKTtcbiAgZm9yICggdmFyIGkgPSAwOyBpIDwgZWwubGVuZ3RoOyBpKysgKSB7XG4gICAgZWxbaV1bYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICB9XG59O1xuXG4vKipcbiAqIFVuYmluZCBgZWxgIGV2ZW50IGB0eXBlYCdzIGNhbGxiYWNrIGBmbmAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbCwgTm9kZUxpc3QsIEhUTUxDb2xsZWN0aW9uIG9yIEFycmF5XG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gY2FwdHVyZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnVuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsID0gdG9BcnJheShlbCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrICkge1xuICAgIGVsW2ldW3VuYmluZF0ocHJlZml4ICsgdHlwZSwgZm4sIGNhcHR1cmUgfHwgZmFsc2UpO1xuICB9XG59O1xuIiwiLypcbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3NlZ21lbnRpby9leHRlbmRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV4dGVuZCAob2JqZWN0KSB7XG4gICAgLy8gVGFrZXMgYW4gdW5saW1pdGVkIG51bWJlciBvZiBleHRlbmRlcnMuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgLy8gRm9yIGVhY2ggZXh0ZW5kZXIsIGNvcHkgdGhlaXIgcHJvcGVydGllcyBvbiBvdXIgb2JqZWN0LlxuICAgIGZvciAodmFyIGkgPSAwLCBzb3VyY2U7IHNvdXJjZSA9IGFyZ3NbaV07IGkrKykge1xuICAgICAgICBpZiAoIXNvdXJjZSkgY29udGludWU7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgb2JqZWN0W3Byb3BlcnR5XSA9IHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGV4dCwgcGF0dGVybiwgb3B0aW9ucykge1xuICAgIC8vIEFwcm94aW1hdGVseSB3aGVyZSBpbiB0aGUgdGV4dCBpcyB0aGUgcGF0dGVybiBleHBlY3RlZCB0byBiZSBmb3VuZD9cbiAgICB2YXIgTWF0Y2hfTG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uIHx8IDA7XG5cbiAgICAvL0RldGVybWluZXMgaG93IGNsb3NlIHRoZSBtYXRjaCBtdXN0IGJlIHRvIHRoZSBmdXp6eSBsb2NhdGlvbiAoc3BlY2lmaWVkIGFib3ZlKS4gQW4gZXhhY3QgbGV0dGVyIG1hdGNoIHdoaWNoIGlzICdkaXN0YW5jZScgY2hhcmFjdGVycyBhd2F5IGZyb20gdGhlIGZ1enp5IGxvY2F0aW9uIHdvdWxkIHNjb3JlIGFzIGEgY29tcGxldGUgbWlzbWF0Y2guIEEgZGlzdGFuY2Ugb2YgJzAnIHJlcXVpcmVzIHRoZSBtYXRjaCBiZSBhdCB0aGUgZXhhY3QgbG9jYXRpb24gc3BlY2lmaWVkLCBhIHRocmVzaG9sZCBvZiAnMTAwMCcgd291bGQgcmVxdWlyZSBhIHBlcmZlY3QgbWF0Y2ggdG8gYmUgd2l0aGluIDgwMCBjaGFyYWN0ZXJzIG9mIHRoZSBmdXp6eSBsb2NhdGlvbiB0byBiZSBmb3VuZCB1c2luZyBhIDAuOCB0aHJlc2hvbGQuXG4gICAgdmFyIE1hdGNoX0Rpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZSB8fCAxMDA7XG5cbiAgICAvLyBBdCB3aGF0IHBvaW50IGRvZXMgdGhlIG1hdGNoIGFsZ29yaXRobSBnaXZlIHVwLiBBIHRocmVzaG9sZCBvZiAnMC4wJyByZXF1aXJlcyBhIHBlcmZlY3QgbWF0Y2ggKG9mIGJvdGggbGV0dGVycyBhbmQgbG9jYXRpb24pLCBhIHRocmVzaG9sZCBvZiAnMS4wJyB3b3VsZCBtYXRjaCBhbnl0aGluZy5cbiAgICB2YXIgTWF0Y2hfVGhyZXNob2xkID0gb3B0aW9ucy50aHJlc2hvbGQgfHwgMC40O1xuXG4gICAgaWYgKHBhdHRlcm4gPT09IHRleHQpIHJldHVybiB0cnVlOyAvLyBFeGFjdCBtYXRjaFxuICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA+IDMyKSByZXR1cm4gZmFsc2U7IC8vIFRoaXMgYWxnb3JpdGhtIGNhbm5vdCBiZSB1c2VkXG5cbiAgICAvLyBTZXQgc3RhcnRpbmcgbG9jYXRpb24gYXQgYmVnaW5uaW5nIHRleHQgYW5kIGluaXRpYWxpc2UgdGhlIGFscGhhYmV0LlxuICAgIHZhciBsb2MgPSBNYXRjaF9Mb2NhdGlvbixcbiAgICAgICAgcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBxID0ge30sXG4gICAgICAgICAgICAgICAgaTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBxW3BhdHRlcm4uY2hhckF0KGkpXSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcVtwYXR0ZXJuLmNoYXJBdChpKV0gfD0gMSA8PCAocGF0dGVybi5sZW5ndGggLSBpIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBxO1xuICAgICAgICB9KCkpO1xuXG4gICAgLy8gQ29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBzY29yZSBmb3IgYSBtYXRjaCB3aXRoIGUgZXJyb3JzIGFuZCB4IGxvY2F0aW9uLlxuICAgIC8vIEFjY2Vzc2VzIGxvYyBhbmQgcGF0dGVybiB0aHJvdWdoIGJlaW5nIGEgY2xvc3VyZS5cblxuICAgIGZ1bmN0aW9uIG1hdGNoX2JpdGFwU2NvcmVfKGUsIHgpIHtcbiAgICAgICAgdmFyIGFjY3VyYWN5ID0gZSAvIHBhdHRlcm4ubGVuZ3RoLFxuICAgICAgICAgICAgcHJveGltaXR5ID0gTWF0aC5hYnMobG9jIC0geCk7XG5cbiAgICAgICAgaWYgKCFNYXRjaF9EaXN0YW5jZSkge1xuICAgICAgICAgICAgLy8gRG9kZ2UgZGl2aWRlIGJ5IHplcm8gZXJyb3IuXG4gICAgICAgICAgICByZXR1cm4gcHJveGltaXR5ID8gMS4wIDogYWNjdXJhY3k7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5ICsgKHByb3hpbWl0eSAvIE1hdGNoX0Rpc3RhbmNlKTtcbiAgICB9XG5cbiAgICB2YXIgc2NvcmVfdGhyZXNob2xkID0gTWF0Y2hfVGhyZXNob2xkLCAvLyBIaWdoZXN0IHNjb3JlIGJleW9uZCB3aGljaCB3ZSBnaXZlIHVwLlxuICAgICAgICBiZXN0X2xvYyA9IHRleHQuaW5kZXhPZihwYXR0ZXJuLCBsb2MpOyAvLyBJcyB0aGVyZSBhIG5lYXJieSBleGFjdCBtYXRjaD8gKHNwZWVkdXApXG5cbiAgICBpZiAoYmVzdF9sb2MgIT0gLTEpIHtcbiAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICAvLyBXaGF0IGFib3V0IGluIHRoZSBvdGhlciBkaXJlY3Rpb24/IChzcGVlZHVwKVxuICAgICAgICBiZXN0X2xvYyA9IHRleHQubGFzdEluZGV4T2YocGF0dGVybiwgbG9jICsgcGF0dGVybi5sZW5ndGgpO1xuXG4gICAgICAgIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgYml0IGFycmF5cy5cbiAgICB2YXIgbWF0Y2htYXNrID0gMSA8PCAocGF0dGVybi5sZW5ndGggLSAxKTtcbiAgICBiZXN0X2xvYyA9IC0xO1xuXG4gICAgdmFyIGJpbl9taW4sIGJpbl9taWQ7XG4gICAgdmFyIGJpbl9tYXggPSBwYXR0ZXJuLmxlbmd0aCArIHRleHQubGVuZ3RoO1xuICAgIHZhciBsYXN0X3JkO1xuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgcGF0dGVybi5sZW5ndGg7IGQrKykge1xuICAgICAgICAvLyBTY2FuIGZvciB0aGUgYmVzdCBtYXRjaDsgZWFjaCBpdGVyYXRpb24gYWxsb3dzIGZvciBvbmUgbW9yZSBlcnJvci5cbiAgICAgICAgLy8gUnVuIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgaG93IGZhciBmcm9tICdsb2MnIHdlIGNhbiBzdHJheSBhdCB0aGlzXG4gICAgICAgIC8vIGVycm9yIGxldmVsLlxuICAgICAgICBiaW5fbWluID0gMDtcbiAgICAgICAgYmluX21pZCA9IGJpbl9tYXg7XG4gICAgICAgIHdoaWxlIChiaW5fbWluIDwgYmluX21pZCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoX2JpdGFwU2NvcmVfKGQsIGxvYyArIGJpbl9taWQpIDw9IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIGJpbl9taW4gPSBiaW5fbWlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbl9taWQgPSBNYXRoLmZsb29yKChiaW5fbWF4IC0gYmluX21pbikgLyAyICsgYmluX21pbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIHRoZSByZXN1bHQgZnJvbSB0aGlzIGl0ZXJhdGlvbiBhcyB0aGUgbWF4aW11bSBmb3IgdGhlIG5leHQuXG4gICAgICAgIGJpbl9tYXggPSBiaW5fbWlkO1xuICAgICAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgxLCBsb2MgLSBiaW5fbWlkICsgMSk7XG4gICAgICAgIHZhciBmaW5pc2ggPSBNYXRoLm1pbihsb2MgKyBiaW5fbWlkLCB0ZXh0Lmxlbmd0aCkgKyBwYXR0ZXJuLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmQgPSBBcnJheShmaW5pc2ggKyAyKTtcbiAgICAgICAgcmRbZmluaXNoICsgMV0gPSAoMSA8PCBkKSAtIDE7XG4gICAgICAgIGZvciAodmFyIGogPSBmaW5pc2g7IGogPj0gc3RhcnQ7IGotLSkge1xuICAgICAgICAgICAgLy8gVGhlIGFscGhhYmV0IChzKSBpcyBhIHNwYXJzZSBoYXNoLCBzbyB0aGUgZm9sbG93aW5nIGxpbmUgZ2VuZXJhdGVzXG4gICAgICAgICAgICAvLyB3YXJuaW5ncy5cbiAgICAgICAgICAgIHZhciBjaGFyTWF0Y2ggPSBzW3RleHQuY2hhckF0KGogLSAxKV07XG4gICAgICAgICAgICBpZiAoZCA9PT0gMCkgeyAgICAvLyBGaXJzdCBwYXNzOiBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICByZFtqXSA9ICgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2g7XG4gICAgICAgICAgICB9IGVsc2UgeyAgICAvLyBTdWJzZXF1ZW50IHBhc3NlczogZnV6enkgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmRbal0gPSAoKChyZFtqICsgMV0gPDwgMSkgfCAxKSAmIGNoYXJNYXRjaCkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKChsYXN0X3JkW2ogKyAxXSB8IGxhc3RfcmRbal0pIDw8IDEpIHwgMSkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X3JkW2ogKyAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZFtqXSAmIG1hdGNobWFzaykge1xuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IG1hdGNoX2JpdGFwU2NvcmVfKGQsIGogLSAxKTtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG1hdGNoIHdpbGwgYWxtb3N0IGNlcnRhaW5seSBiZSBiZXR0ZXIgdGhhbiBhbnkgZXhpc3RpbmcgbWF0Y2guXG4gICAgICAgICAgICAgICAgLy8gQnV0IGNoZWNrIGFueXdheS5cbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRvbGQgeW91IHNvLlxuICAgICAgICAgICAgICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdF9sb2MgPSBqIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RfbG9jID4gbG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHBhc3NpbmcgbG9jLCBkb24ndCBleGNlZWQgb3VyIGN1cnJlbnQgZGlzdGFuY2UgZnJvbSBsb2MuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IE1hdGgubWF4KDEsIDIgKiBsb2MgLSBiZXN0X2xvYyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbHJlYWR5IHBhc3NlZCBsb2MsIGRvd25oaWxsIGZyb20gaGVyZSBvbiBpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5vIGhvcGUgZm9yIGEgKGJldHRlcikgbWF0Y2ggYXQgZ3JlYXRlciBlcnJvciBsZXZlbHMuXG4gICAgICAgIGlmIChtYXRjaF9iaXRhcFNjb3JlXyhkICsgMSwgbG9jKSA+IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdF9yZCA9IHJkO1xuICAgIH1cblxuICAgIHJldHVybiAoYmVzdF9sb2MgPCAwKSA/IGZhbHNlIDogdHJ1ZTtcbn07XG4iLCIvKipcbiAqIEEgY3Jvc3MtYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBnZXRBdHRyaWJ1dGUuXG4gKiBTb3VyY2UgZm91bmQgaGVyZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzc1NTM0My8zNjEzMzcgd3JpdHRlbiBieSBWaXZpbiBQYWxpYXRoXG4gKlxuICogUmV0dXJuIHRoZSB2YWx1ZSBmb3IgYGF0dHJgIGF0IGBlbGVtZW50YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge1N0cmluZ30gYXR0clxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsLCBhdHRyKSB7XG4gIHZhciByZXN1bHQgPSAoZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShhdHRyKSkgfHwgbnVsbDtcbiAgaWYoICFyZXN1bHQgKSB7XG4gICAgdmFyIGF0dHJzID0gZWwuYXR0cmlidXRlcztcbiAgICB2YXIgbGVuZ3RoID0gYXR0cnMubGVuZ3RoO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGF0dHJbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZihhdHRyW2ldLm5vZGVOYW1lID09PSBhdHRyKSB7XG4gICAgICAgICAgcmVzdWx0ID0gYXR0cltpXS5ub2RlVmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvKipcbiAqIEEgY3Jvc3MtYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBnZXRFbGVtZW50c0J5Q2xhc3MuXG4gKiBIZWF2aWx5IGJhc2VkIG9uIER1c3RpbiBEaWF6J3MgZnVuY3Rpb246IGh0dHA6Ly9kdXN0aW5kaWF6LmNvbS9nZXRlbGVtZW50c2J5Y2xhc3MuXG4gKlxuICogRmluZCBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcyBgY2xhc3NOYW1lYCBpbnNpZGUgYGNvbnRhaW5lcmAuXG4gKiBVc2UgYHNpbmdsZSA9IHRydWVgIHRvIGluY3JlYXNlIHBlcmZvcm1hbmNlIGluIG9sZGVyIGJyb3dzZXJzXG4gKiB3aGVuIG9ubHkgb25lIGVsZW1lbnQgaXMgbmVlZGVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbmdsZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG52YXIgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgaWYgKHNpbmdsZSkge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpWzBdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICB9XG59O1xuXG52YXIgcXVlcnlTZWxlY3RvciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgY2xhc3NOYW1lID0gJy4nICsgY2xhc3NOYW1lO1xuICBpZiAoc2luZ2xlKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cbnZhciBwb2x5ZmlsbCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpIHtcbiAgdmFyIGNsYXNzRWxlbWVudHMgPSBbXSxcbiAgICB0YWcgPSAnKic7XG5cbiAgdmFyIGVscyA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuICB2YXIgZWxzTGVuID0gZWxzLmxlbmd0aDtcbiAgdmFyIHBhdHRlcm4gPSBuZXcgUmVnRXhwKFwiKF58XFxcXHMpXCIrY2xhc3NOYW1lK1wiKFxcXFxzfCQpXCIpO1xuICBmb3IgKHZhciBpID0gMCwgaiA9IDA7IGkgPCBlbHNMZW47IGkrKykge1xuICAgIGlmICggcGF0dGVybi50ZXN0KGVsc1tpXS5jbGFzc05hbWUpICkge1xuICAgICAgaWYgKHNpbmdsZSkge1xuICAgICAgICByZXR1cm4gZWxzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xhc3NFbGVtZW50c1tqXSA9IGVsc1tpXTtcbiAgICAgICAgaisrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY2xhc3NFbGVtZW50cztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGlmICgob3B0aW9ucy50ZXN0ICYmIG9wdGlvbnMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkgfHwgKCFvcHRpb25zLnRlc3QgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBnZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH0gZWxzZSBpZiAoKG9wdGlvbnMudGVzdCAmJiBvcHRpb25zLnF1ZXJ5U2VsZWN0b3IpIHx8ICghb3B0aW9ucy50ZXN0ICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gcXVlcnlTZWxlY3Rvcihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBvbHlmaWxsKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUpO1xuICAgIH1cbiAgfTtcbn0pKCk7XG4iLCJ2YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBvYmope1xuICBpZiAoaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuIiwiLyoqXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS90aW1veGxleS90by1hcnJheVxuICpcbiAqIENvbnZlcnQgYW4gYXJyYXktbGlrZSBvYmplY3QgaW50byBhbiBgQXJyYXlgLlxuICogSWYgYGNvbGxlY3Rpb25gIGlzIGFscmVhZHkgYW4gYEFycmF5YCwgdGhlbiB3aWxsIHJldHVybiBhIGNsb25lIG9mIGBjb2xsZWN0aW9uYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5IHwgTWl4ZWR9IGNvbGxlY3Rpb24gQW4gYEFycmF5YCBvciBhcnJheS1saWtlIG9iamVjdCB0byBjb252ZXJ0IGUuZy4gYGFyZ3VtZW50c2Agb3IgYE5vZGVMaXN0YFxuICogQHJldHVybiB7QXJyYXl9IE5haXZlIGNvbnZlcnNpb24gb2YgYGNvbGxlY3Rpb25gIHRvIGEgbmV3IGBBcnJheWAuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdG9BcnJheShjb2xsZWN0aW9uKSB7XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBbXTtcbiAgaWYgKGNvbGxlY3Rpb24gPT09IG51bGwpIHJldHVybiBbbnVsbF07XG4gIGlmIChjb2xsZWN0aW9uID09PSB3aW5kb3cpIHJldHVybiBbd2luZG93XTtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAnc3RyaW5nJykgcmV0dXJuIFtjb2xsZWN0aW9uXTtcbiAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHJldHVybiBjb2xsZWN0aW9uO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24ubGVuZ3RoICE9ICdudW1iZXInKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdmdW5jdGlvbicgJiYgY29sbGVjdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuXG4gIHZhciBhcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2xsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjb2xsZWN0aW9uLCBpKSB8fCBpIGluIGNvbGxlY3Rpb24pIHtcbiAgICAgIGFyci5wdXNoKGNvbGxlY3Rpb25baV0pO1xuICAgIH1cbiAgfVxuICBpZiAoIWFyci5sZW5ndGgpIHJldHVybiBbXTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbmZ1bmN0aW9uIGlzQXJyYXkoYXJyKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzKSB7XG4gIHMgPSAocyA9PT0gdW5kZWZpbmVkKSA/IFwiXCIgOiBzO1xuICBzID0gKHMgPT09IG51bGwpID8gXCJcIiA6IHM7XG4gIHMgPSBzLnRvU3RyaW5nKCk7XG4gIHJldHVybiBzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0O1xudmFyIGFscGhhYmV0SW5kZXhNYXA7XG52YXIgYWxwaGFiZXRJbmRleE1hcExlbmd0aCA9IDA7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyQ29kZShjb2RlKSB7XG4gIHJldHVybiBjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTc7XG59XG5cbmZ1bmN0aW9uIG5hdHVyYWxDb21wYXJlKGEsIGIpIHtcbiAgdmFyIGxlbmd0aEEgPSAoYSArPSAnJykubGVuZ3RoO1xuICB2YXIgbGVuZ3RoQiA9IChiICs9ICcnKS5sZW5ndGg7XG4gIHZhciBhSW5kZXggPSAwO1xuICB2YXIgYkluZGV4ID0gMDtcblxuICB3aGlsZSAoYUluZGV4IDwgbGVuZ3RoQSAmJiBiSW5kZXggPCBsZW5ndGhCKSB7XG4gICAgdmFyIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChhSW5kZXgpO1xuICAgIHZhciBjaGFyQ29kZUIgPSBiLmNoYXJDb2RlQXQoYkluZGV4KTtcblxuICAgIGlmIChpc051bWJlckNvZGUoY2hhckNvZGVBKSkge1xuICAgICAgaWYgKCFpc051bWJlckNvZGUoY2hhckNvZGVCKSkge1xuICAgICAgICByZXR1cm4gY2hhckNvZGVBIC0gY2hhckNvZGVCO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtU3RhcnRBID0gYUluZGV4O1xuICAgICAgdmFyIG51bVN0YXJ0QiA9IGJJbmRleDtcblxuICAgICAgd2hpbGUgKGNoYXJDb2RlQSA9PT0gNDggJiYgKytudW1TdGFydEEgPCBsZW5ndGhBKSB7XG4gICAgICAgIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChudW1TdGFydEEpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGNoYXJDb2RlQiA9PT0gNDggJiYgKytudW1TdGFydEIgPCBsZW5ndGhCKSB7XG4gICAgICAgIGNoYXJDb2RlQiA9IGIuY2hhckNvZGVBdChudW1TdGFydEIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtRW5kQSA9IG51bVN0YXJ0QTtcbiAgICAgIHZhciBudW1FbmRCID0gbnVtU3RhcnRCO1xuXG4gICAgICB3aGlsZSAobnVtRW5kQSA8IGxlbmd0aEEgJiYgaXNOdW1iZXJDb2RlKGEuY2hhckNvZGVBdChudW1FbmRBKSkpIHtcbiAgICAgICAgKytudW1FbmRBO1xuICAgICAgfVxuICAgICAgd2hpbGUgKG51bUVuZEIgPCBsZW5ndGhCICYmIGlzTnVtYmVyQ29kZShiLmNoYXJDb2RlQXQobnVtRW5kQikpKSB7XG4gICAgICAgICsrbnVtRW5kQjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpZmZlcmVuY2UgPSBudW1FbmRBIC0gbnVtU3RhcnRBIC0gbnVtRW5kQiArIG51bVN0YXJ0QjsgLy8gbnVtQSBsZW5ndGggLSBudW1CIGxlbmd0aFxuICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChudW1TdGFydEEgPCBudW1FbmRBKSB7XG4gICAgICAgIGRpZmZlcmVuY2UgPSBhLmNoYXJDb2RlQXQobnVtU3RhcnRBKyspIC0gYi5jaGFyQ29kZUF0KG51bVN0YXJ0QisrKTtcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhSW5kZXggPSBudW1FbmRBO1xuICAgICAgYkluZGV4ID0gbnVtRW5kQjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaGFyQ29kZUEgIT09IGNoYXJDb2RlQikge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFyQ29kZUEgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoICYmXG4gICAgICAgIGNoYXJDb2RlQiA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGggJiZcbiAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUFdICE9PSAtMSAmJlxuICAgICAgICBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQl0gIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVBXSAtIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVCXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoYXJDb2RlQSAtIGNoYXJDb2RlQjtcbiAgICB9XG5cbiAgICArK2FJbmRleDtcbiAgICArK2JJbmRleDtcbiAgfVxuXG4gIHJldHVybiBsZW5ndGhBIC0gbGVuZ3RoQjtcbn1cblxubmF0dXJhbENvbXBhcmUuY2FzZUluc2Vuc2l0aXZlID0gbmF0dXJhbENvbXBhcmUuaSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIG5hdHVyYWxDb21wYXJlKCgnJyArIGEpLnRvTG93ZXJDYXNlKCksICgnJyArIGIpLnRvTG93ZXJDYXNlKCkpO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobmF0dXJhbENvbXBhcmUsIHtcbiAgYWxwaGFiZXQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGFscGhhYmV0O1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgYWxwaGFiZXQgPSB2YWx1ZTtcbiAgICAgIGFscGhhYmV0SW5kZXhNYXAgPSBbXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGlmIChhbHBoYWJldCkge1xuICAgICAgICBmb3IgKDsgaSA8IGFscGhhYmV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYWxwaGFiZXRJbmRleE1hcFthbHBoYWJldC5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFscGhhYmV0SW5kZXhNYXBMZW5ndGggPSBhbHBoYWJldEluZGV4TWFwLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFscGhhYmV0SW5kZXhNYXBbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFscGhhYmV0SW5kZXhNYXBbaV0gPSAtMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXR1cmFsQ29tcGFyZTtcbiIsImltcG9ydCB1IGZyb20gJy4vdXRpbGl0eS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgJ3VzZSBzdHJpY3QnXG5cbiAgbGV0IGFwaSA9IHt9XG4gIGxldCBzZXR0aW5nc1xuICBsZXQgZGVmYXVsdHMgPSB7XG4gICAgdHJpZ2dlcjogJ1tkYXRhLWRpc21pc3NdJyxcbiAgICB0YXJnZXQ6ICdbZGF0YS1kaXNtaXNzaWJsZV0nLFxuICAgIGNsYXNzVG9nZ2xlOiAnZGlzbWlzcydcbiAgfVxuXG4gIGxldCBydW4gPSAoKSA9PiB7XG4gICAgbGV0IHRyaWdnZXIgPSBldmVudC50YXJnZXQuY2xvc2VzdChzZXR0aW5ncy50cmlnZ2VyKVxuICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICBsZXQgdGFyZ2V0ID0gdHJpZ2dlci5jbG9zZXN0KHNldHRpbmdzLnRhcmdldClcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgdS50b2dnbGVDbGFzcyh0YXJnZXQsIHNldHRpbmdzLmNsYXNzVG9nZ2xlKVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5pbml0ID0gKG9wdGlvbnMpID0+IHtcbiAgICBhcGkuZGVzdHJveSgpXG4gICAgc2V0dGluZ3MgPSB1LmV4dGVuZCggZGVmYXVsdHMsIG9wdGlvbnMgfHwge30gKVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNldHRpbmdzID0gbnVsbFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5pbml0KClcblxuICByZXR1cm4gYXBpXG59XG4iLCJpbXBvcnQgdSBmcm9tICcuL3V0aWxpdHkuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gICd1c2Ugc3RyaWN0J1xuXG4gIGxldCBhcGkgPSB7fVxuICBsZXQgc2V0dGluZ3NcbiAgbGV0IGRlZmF1bHRzID0ge1xuICAgIGNsYXNzVHJpZ2dlcjogJ21vZGFsX190cmlnZ2VyJyxcbiAgICBjbGFzc01vZGFsOiAnbW9kYWwnLFxuICAgIGNsYXNzRGlhbG9nOiAnbW9kYWxfX2RpYWxvZycsXG4gICAgY2xhc3NBY3RpdmU6ICdpcy1hY3RpdmUnLFxuICAgIGZvY3VzOiAnW2RhdGEtZm9jdXNdJ1xuICB9XG5cbiAgbGV0IG1lbW9yeVRyaWdnZXJcbiAgbGV0IG1lbW9yeVRhcmdldFxuXG4gIGxldCBvcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIHUuYWRkQ2xhc3ModGFyZ2V0LCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICBsZXQgZm9jdXMgPSB0YXJnZXQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5mb2N1cylcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgIGlmIChmb2N1cykge1xuICAgICAgICBmb2N1cy5mb2N1cygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQuZm9jdXMoKVxuICAgICAgfVxuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgIH0sIHRydWUpO1xuICB9XG5cbiAgbGV0IGNsb3NlID0gKCkgPT4ge1xuICAgIGxldCBtb2RhbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuJyArIHNldHRpbmdzLmNsYXNzTW9kYWwpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RhbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHUucmVtb3ZlQ2xhc3MobW9kYWxzW2ldLCBzZXR0aW5ncy5jbGFzc0FjdGl2ZSlcbiAgICB9XG4gICAgaWYgKG1lbW9yeVRyaWdnZXIgJiYgbWVtb3J5VGFyZ2V0KSB7XG4gICAgICBtZW1vcnlUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIF9saXN0ZW5lcigpIHtcbiAgICAgICAgbWVtb3J5VHJpZ2dlci5mb2N1cygpXG4gICAgICAgIG1lbW9yeVRhcmdldCA9IG51bGxcbiAgICAgICAgbWVtb3J5VHJpZ2dlciA9IG51bGxcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgX2xpc3RlbmVyLCB0cnVlKVxuICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IHJ1biA9ICgpID0+IHtcbiAgICBsZXQgdHJpZ2dlciA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCcuJyArIHNldHRpbmdzLmNsYXNzVHJpZ2dlcilcbiAgICBsZXQgbW9kYWwgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc01vZGFsKVxuICAgIGxldCBkaWFsb2cgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnLicgKyBzZXR0aW5ncy5jbGFzc0RpYWxvZylcbiAgICBpZiAodHJpZ2dlcikge1xuICAgICAgY2xvc2UoKVxuICAgICAgbGV0IGRhdGFNb2RhbCA9IHRyaWdnZXIuZGF0YXNldC5tb2RhbFxuICAgICAgaWYgKGRhdGFNb2RhbCkge1xuICAgICAgICBtZW1vcnlUYXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhTW9kYWwpXG4gICAgICAgIG1lbW9yeVRyaWdnZXIgPSB0cmlnZ2VyXG4gICAgICAgIG9wZW4obWVtb3J5VGFyZ2V0KVxuICAgICAgfVxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH0gZWxzZSBpZiAobW9kYWwgJiYgIWRpYWxvZykge1xuICAgICAgY2xvc2UoKVxuICAgIH1cbiAgfVxuXG4gIGFwaS5vcGVuID0gKHRhcmdldCkgPT4ge1xuICAgIG9wZW4oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSlcbiAgfVxuXG4gIGFwaS5jbG9zZSA9ICgpID0+IHtcbiAgICBjbG9zZSgpXG4gIH1cblxuICBhcGkuaW5pdCA9IChvcHRpb25zKSA9PiB7XG4gICAgYXBpLmRlc3Ryb3koKVxuICAgIHNldHRpbmdzID0gdS5leHRlbmQoIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9IClcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJ1biwgZmFsc2UpXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBydW4sIGZhbHNlKVxuICB9XG5cbiAgYXBpLmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgc2V0dGluZ3MgPSBudWxsXG4gICAgbWVtb3J5VGFyZ2V0ID0gbnVsbFxuICAgIG1lbW9yeVRyaWdnZXIgPSBudWxsXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBydW4sIGZhbHNlKVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcnVuLCBmYWxzZSlcbiAgfVxuXG4gIGFwaS5pbml0KClcblxuICByZXR1cm4gYXBpXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGhhcyBhIGNsYXNzIG9yIG5vdFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gY2hlY2sgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byBjaGVja1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIGNsYXNzIGV4aXN0cyBvbiBlbGVtZW50LCBvdGhlcndpc2UgZmFsc2VcbiAgICovXG4gIHN0YXRpYyBoYXNDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICByZXR1cm4gYy5ldmVyeSggZnVuY3Rpb24gKCBjICkge1xuICAgICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNsYXNzIG9yIGNsYXNzZXMgdG8gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gYWRkIGNsYXNzKGVzKSBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gYWRkXG4gICAqL1xuICBzdGF0aWMgYWRkQ2xhc3MoIGVsLCBjICkge1xuXG4gICAgYyA9IHRoaXMudG9BcnJheShjKVxuXG4gICAgYy5mb3JFYWNoKCBmdW5jdGlvbiAoIGMgKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKCBjIClcbiAgICB9KVxuICB9XG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBvciBjbGFzc2VzIGZyb20gYW4gZWxlbWVudFxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IEVsZW1lbnQgdG8gcmVtb3ZlIGNsYXNzKGVzKSBmcm9tXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byByZW1vdmVcbiAgICovXG4gIHN0YXRpYyByZW1vdmVDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICBjLmZvckVhY2goIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoIGMgKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVG9nZ2xlIGEgY2xhc3Mgb3IgY2xhc3NlcyBvbiBhbiBlbGVtZW50XG4gICAqIEBwYXJhbSB7RWxlbWVudH0gRWxlbWVudCB0byB0b2dnbGUgY2xhc3MoZXMpIG9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IENsYXNzKGVzKSB0byB0b2dnbGVcbiAgICovXG4gIHN0YXRpYyB0b2dnbGVDbGFzcyggZWwsIGMgKSB7XG5cbiAgICBjID0gdGhpcy50b0FycmF5KGMpXG5cbiAgICBjLmZvckVhY2goIGZ1bmN0aW9uICggYyApIHtcbiAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYylcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIGNsb3Nlc3QgcGFyZW50IGVsZW1lbnQgYmFzZWQgb24gY2xhc3MuIFRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlXG4gICAqIG5hdGl2ZSAuY2xvc2VzdCgpIG1ldGhvZCBpbiB0aGF0IGl0IGRvZXNuJ3QgY2hlY2sgdGhlIGN1cnJlbnQgZWxlbWVudC5cbiAgICogQHBhcmFtIHtFbGVtZW50fSBFbGVtZW50IHRvIHN0YXJ0IHNlYXJjaCBvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gfHwge0FycmF5fSBDbGFzcyhlcykgdG8gY2hlY2sgZm9yXG4gICAqIEByZXR1cm4ge0VsZW1lbnR9IENsb3Nlc3QgcGFyZW50IGVsZW1lbnRcbiAgICovXG4gIHN0YXRpYyBjbG9zZXN0KCBlbCwgYyApIHtcbiAgICB3aGlsZSAoKGVsID0gZWwucGFyZW50RWxlbWVudCkgJiYgIXRoaXMuaGFzQ2xhc3MoZWwsIGMpKVxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGEgc3RyaW5nIHRvIGFuIGFycmF5LiBJZiBhbiBhcnJheSBpcyBwYXNzZWQsIGl0J3MgcmV0dXJuZWQgYXMgaXMuXG4gICAqIEFueXRoaW5nIGVsc2UgaXMgcmV0dXJuZWQgYXMgZmFsc2UuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB8fCB7QXJyYXl9IFN0cmluZyB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gICAqIEByZXR1cm4ge0FycmF5fSBSZXR1cm4gdGhlIGNvbnZlcnRlZCBhcnJheVxuICAgKi9cbiAgc3RhdGljIHRvQXJyYXkoc3RyaW5nKSB7XG5cbiAgICB2YXIgYXJyYXkgPSBbXVxuXG4gICAgaWYgKHR5cGVvZiBzdHJpbmcgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhcnJheS5wdXNoKHN0cmluZylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc3RyaW5nKSkge1xuICAgICAgYXJyYXkgPSBzdHJpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG4gIH1cblxuICAvKipcbiAgICogTWVyZ2UgdHdvIG9yIG1vcmUgb2JqZWN0cy4gUmV0dXJucyBhIG5ldyBvYmplY3QuIFNldCB0aGUgZmlyc3QgYXJndW1lbnRcbiAgICogdG8gYHRydWVgIGZvciBhIGRlZXAgb3IgcmVjdXJzaXZlIG1lcmdlLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtPcHRpb25hbF0gSWYgdHJ1ZSwgZG8gYSBkZWVwIChvciByZWN1cnNpdmUpIG1lcmdlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgb2JqZWN0cyB0byBtZXJnZSB0b2dldGhlcjsgZWFjaCBvdmVycmlkaW5nIHRoZSBuZXh0XG4gICAqIEByZXR1cm5zIHtPYmplY3R9IE1lcmdlZCB2YWx1ZXMgb2YgZGVmYXVsdHMgYW5kIG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBleHRlbmQoKSB7XG5cbiAgICB2YXIgZXh0ZW5kZWQgPSB7fVxuICAgIHZhciBkZWVwID0gZmFsc2VcbiAgICB2YXIgaSA9IDBcbiAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aFxuXG4gICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIGFyZ3VtZW50c1swXSApID09PSAnW29iamVjdCBCb29sZWFuXScgKSB7XG4gICAgICBkZWVwID0gYXJndW1lbnRzWzBdXG4gICAgICBpKytcbiAgICB9XG5cbiAgICBsZXQgbWVyZ2UgPSAoIG9iaiApID0+IHtcbiAgICAgIGZvciAoIHZhciBwcm9wIGluIG9iaiApIHtcbiAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoIG9iaiwgcHJvcCApICkge1xuICAgICAgICAgIGlmICggZGVlcCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW3Byb3BdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKSB7XG4gICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGV4dGVuZCggdHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSApXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gb2JqW3Byb3BdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldXG4gICAgICBtZXJnZShvYmopXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZGVkXG4gIH1cblxufVxuIl19

//# sourceMappingURL=scripts.js.map
