var utility = (function () {

  'use strict';

  //
  // Variables
  //

  var api = {};
  // var settings;
  // var defaults = {};

  //
  // Public Methods
  //

  /**
   * Checks if an element has a class or not
   * @param {Element} Element to check class(es) on
   * @param {String} || {Array} Class(es) to check
   * @returns {Boolean} Returns true if class exists on element, otherwise false
   */
  api.hasClass = function ( el, c ) {

    c = api.toArray(c);

    return c.every( function ( c ) {
      return el.classList.contains(c);
    });

  }; // End hasClass

  /**
   * Adds a class or classes to an element
   * @param {Element} Element to add class(es) on
   * @param {String} || {Array} Class(es) to add
   */
  api.addClass = function ( el, c ) {

    c = api.toArray(c);

    c.forEach( function ( c ) {
      el.classList.add( c );
    });

  }; // End addClass

  /**
   * Remove a class or classes from an element
   * @param {Element} Element to remove class(es) from
   * @param {String} || {Array} Class(es) to remove
   */
  api.removeClass = function ( el, c ) {

    c = api.toArray(c);

    c.forEach( function ( c ) {
      el.classList.remove( c );
    });

  }; // End removeClass

  /**
   * Toggle a class or classes on an element
   * @param {Element} Element to toggle class(es) on
   * @param {String} || {Array} Class(es) to toggle
   */
  api.toggleClass = function ( el, c ) {

    c = api.toArray(c);

    c.forEach( function ( c ) {
      el.classList.toggle(c);
    });

  }; // End toggleClass

  /**
   * Find the closest parent element based on class. This is different from the
   * native .closest() method in that it doesn't check the current element.
   * @param {Element} Element to start search on
   * @param {String} || {Array} Class(es) to check for
   * @return {Element} Closest parent element
   */
  api.closest = function ( el, c ) {
    while ((el = el.parentElement) && !api.hasClass(el, c));
    return el;
  }; // End closest

  /**
   * Converts a string to an array. If an array is passed, it's returned as is.
   * Anything else is returned as false.
   * @param {String} || {Array} String to convert to an array
   * @return {Array} Return the converted array
   */
  api.toArray = function( s ) {

    var array = [];

    if (typeof s === 'string') {
      array.push(s);
    } else if (Array.isArray(s)) {
      array = s;
    } else {
      return false;
    }

    return array;

  }; // End toArray

  /**
   * Merge two or more objects. Returns a new object. Set the first argument
   * to `true` for a deep or recursive merge.
   * @param {Boolean} [Optional] If true, do a deep (or recursive) merge
   * @param {Object} The objects to merge together; each overriding the next
   * @returns {Object} Merged values of defaults and options
   */
  api.extend = function () {

    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    // Check if a deep merge
    if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
      deep = arguments[0];
      i++;
    }

    // Merge the object into the extended object
    var merge = function ( obj ) {
      for ( var prop in obj ) {
        if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {
          // If deep merge and property is an object, merge properties
          if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
            extended[prop] = extend( true, extended[prop], obj[prop] );
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    // Loop through each object and conduct a merge
    for ( ; i < length; i++ ) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;

  }; // End extend

  //
  // Return Public APIs
  //

  return api;

})();

// require _utility.js

var dismissible = (function () {

  'use strict';

  //
  // Variables
  //

  var u = utility;

  var api = {};
  var settings;
  var defaults = {
    classTrigger : 'js-dismiss',
    classDismissible : 'js-dismissible',
    classHide : 'hide',
  };

  //
  // Private Methods
  //

  var runDismissible = function () {

    // Get the trigger
    var trigger = event.target.closest('.' + settings.classTrigger);

    // Exit if a trigger doesn't exist
    if ( !trigger ) return;

    // Get the dismissible parent element
    var dismissible = event.target.closest('.' + settings.classDismissible);

    // Exit if a dismissible doesn't exist
    if ( !dismissible ) return;

    // Add initial classes
    if (dismissible) {
      u.addClass(dismissible, settings.classHide);
    } else {
      console.log('Dismissible element was not found!');
    }

    // Prevent default behavior
    event.preventDefault();

  };

  //
  // Public Methods
  //

  api.init = function (options) {

    // Destroy any previous initializations
    api.destroy();

    // Merge user options with the defaults
    settings = u.extend( defaults, options || {} );

    // Add event listener
    document.addEventListener('click', runDismissible, false);

  };

  api.destroy = function () {

    // Remove event listener
    document.removeEventListener('click', runDismissible, false);

    // Reset settings
    settings = null;

  };

  api.showAll = function (selector) {

    // Get dismissible items
    var dismissible = api.getDismissible(selector);

    // Loop through and remove active class from dismissible items
    dismissible.forEach(function (el) {
      u.removeClass(el, settings.classHide);
    });

  };

  api.hideAll = function (selector) {

    // Get dismissible items
    var dismissible = api.getDismissible(selector);

    // Loop through and remove active class from dismissible items
    dismissible.forEach(function (el) {
      u.addClass(el, settings.classHide);
    });

  };

  api.getDismissible = function (selector) {

    // Initialize dismissible array
    var dismissible = [];

    // Check if a selector was passed
    if (selector) {
      // Get selector items
      var items = document.querySelectorAll(selector);
      // Loop through selector items
      items.forEach(function (el) {
        // Get dismissible items
        var items = el.querySelectorAll('.' + settings.classDismissible);
        // Loop through dismissible items
        items.forEach(function (el) {
          // Save item to our array
          dismissible.push(el);
        });
      });
    } else {
      // Search dismissible items on documents
      dismissible = document.querySelectorAll('.' + settings.classDismissible);
    }

    // Return dismissible
    return dismissible;

  };

  //
  // Return Public APIs
  //

  return api;

})();

// require _utility.js

var modal = (function () {

  'use strict';

  var u = utility;
  var api = {};
  var settings;
  var defaults = {
    classTrigger      : 'js-modal',
    classBody         : 'js-modal--active',
    classDialog       : 'dialog',
    classModal        : 'modal',
    classModalActive  : 'modal--active',
  }

  var openModal = function() {
    api.close();
    var trigger = event.target.closest('.' + settings.classTrigger);
    trigger.blur();
        var target = trigger.dataset.target;
    if (target) {
      api.open(target);
    }
  }

  var runModal = function () {
    var trigger = event.target.closest('.' + settings.classTrigger);
    var modal = event.target.closest('.' + settings.classModal);
    var dialog = event.target.closest('.' + settings.classDialog);
    if (modal && !dialog) {
      api.close();
    }
    if (trigger) {
      openModal();
      event.preventDefault();
    }
  }
  
  var runEscape = function() {
    if(event.keyCode === 27) {
      api.close();
    }
  }
  
  var getFocus = function() {
    var focusItem = document.querySelector('.' + settings.classModalActive + ' .' + settings.classTrigger);
    if (focusItem) {
      focusItem.focus();
    }
    this.removeEventListener('transitionend', getFocus, false);
  }

  api.open = function(target) {
    var modal = document.getElementById(target);
    if(modal) {
      u.addClass(modal, settings.classModalActive);
      u.addClass(document.body, settings.classBody);
      modal.addEventListener('transitionend', getFocus, false);
    } else {
      console.log('Error:', 'Modal was not found');
    }
  }
  
  api.close = function() {
    var modals  = document.querySelectorAll('.' + settings.classModal);
    modals.forEach(function (modal) {
      u.removeClass(modal, settings.classModalActive);
    });
    u.removeClass(document.body, settings.classBody);
  }

  api.init = function (options) {
    api.destroy();
    settings = u.extend( defaults, options || {} );
    document.addEventListener('click', runModal, false);
    document.addEventListener('keydown', runEscape, false);
  }

  api.destroy = function () {
    document.removeEventListener('click', runModal, false);
    document.removeEventListener('keydown', runEscape, false);
    settings = null;
  }

  return api;

})();

/*
require
  _dismissible.js
  _modal.js
*/

// Default initializations
;(function (window, document, undefined) {

  'use strict';

  dismissible.init();
  modal.init();

})(window, document);
