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
