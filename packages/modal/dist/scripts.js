(function (exports) {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  var addClass = function addClass(el) {
    for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      cl[_key - 1] = arguments[_key];
    }

    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).add.apply(_el$classList, cl);
    });
  };

  var camelCase = function camelCase(str) {
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  };

  var hasClass = function hasClass(el) {
    el = el.forEach ? el : [el];
    el = [].slice.call(el);

    for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      cl[_key - 1] = arguments[_key];
    }

    return cl.some(function (cl) {
      return el.some(function (el) {
        if (el.classList.contains(cl)) return true;
      });
    });
  };

  var removeClass = function removeClass(el) {
    for (var _len = arguments.length, cl = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      cl[_key - 1] = arguments[_key];
    }

    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      var _el$classList;

      (_el$classList = el.classList).remove.apply(_el$classList, cl);
    });
  };

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
  var Modal = function Modal(options) {
    var api = {};
    var defaults = {
      autoInit: false,
      dataModal: 'modal',
      dataOpen: 'modal-open',
      dataClose: 'modal-close',
      dataFocus: 'modal-focus',
      dataRequired: 'modal-required',
      stateOpened: 'is-opened',
      stateOpening: 'is-opening',
      stateClosing: 'is-closing',
      stateClosed: 'is-closed',
      customEventPrefix: 'modal:',
      focus: true
    };
    api.settings = _objectSpread(_objectSpread({}, defaults), options);
    api.memoryTrigger = null;
    api.memoryTarget = null;

    api.init = function () {
      document.addEventListener('click', run, false);
      document.addEventListener('touchend', run, false);
      document.addEventListener('keyup', escape, false);
    };

    api.destroy = function () {
      api.memoryTrigger = null;
      api.memoryTarget = null;
      document.removeEventListener('click', run, false);
      document.removeEventListener('touchend', run, false);
      document.removeEventListener('keyup', escape, false);
    };

    api.open = function (modalKey, callback) {
      open(modalKey, callback);
    };

    api.close = function (returnFocus, callback) {
      close(returnFocus, callback);
    };

    var run = function run(event) {
      var trigger = event.target.closest("[data-".concat(api.settings.dataOpen, "]"));

      if (trigger) {
        var targetData = trigger.dataset[camelCase(api.settings.dataOpen)];
        var fromModal = event.target.closest("[data-".concat(api.settings.dataModal, "]"));
        if (!fromModal) saveTrigger(trigger);
        close(!fromModal);
        open(targetData);
        event.preventDefault();
      } else {
        if (event.target.closest("[data-".concat(api.settings.dataClose, "]"))) {
          close();
          event.preventDefault();
        }

        if (event.target.dataset[camelCase(api.settings.dataModal)] && !event.target.hasAttribute("data-".concat(api.settings.dataRequired))) {
          close();
        }
      }
    };

    var escape = function escape(event) {
      if (event.keyCode == 27) {
        var target = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpened));

        if (target && !target.hasAttribute("data-".concat(api.settings.dataRequired))) {
          close();
        }
      }
    };

    var open = function open(modalKey, callback) {
      var target = document.querySelector("[data-".concat(api.settings.dataModal, "=\"").concat(modalKey, "\"]"));

      if (target && !hasClass(target, api.settings.stateOpened)) {
        saveTarget(target);
        addClass(target, api.settings.stateOpening);
        removeClass(target, api.settings.stateClosed);
        target.addEventListener('transitionend', function _listener() {
          addClass(target, api.settings.stateOpened);
          removeClass(target, api.settings.stateOpening);
          setFocus();
          typeof callback === 'function' && callback();
          this.removeEventListener('transitionend', _listener, true);
          var customEvent = new CustomEvent(api.settings.customEventPrefix + 'opened', {
            bubbles: true
          });
          target.dispatchEvent(customEvent);
        }, true);
      }
    };

    var close = function close() {
      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      var target = document.querySelector("[data-".concat(api.settings.dataModal, "].").concat(api.settings.stateOpened));

      if (target) {
        addClass(target, api.settings.stateClosing);
        removeClass(target, api.settings.stateOpened);
        target.addEventListener('transitionend', function _listener() {
          addClass(target, api.settings.stateClosed);
          removeClass(target, api.settings.stateClosing);
          if (focus) returnFocus();
          typeof callback === 'function' && callback();
          this.removeEventListener('transitionend', _listener, true);
          var customEvent = new CustomEvent(api.settings.customEventPrefix + 'closed', {
            bubbles: true
          });
          target.dispatchEvent(customEvent);
        }, true);
      }
    };

    var saveTarget = function saveTarget(target) {
      if (api.settings.focus) {
        api.memoryTarget = target;
      }
    };

    var saveTrigger = function saveTrigger(trigger) {
      if (api.settings.focus) {
        api.memoryTrigger = trigger;
      }
    };

    var setFocus = function setFocus() {
      if (api.settings.focus && api.memoryTarget) {
        var innerFocus = api.memoryTarget.querySelector("[data-".concat(api.settings.dataFocus, "]"));

        if (innerFocus) {
          innerFocus.focus();
        } else {
          api.memoryTarget.focus();
        }

        api.memoryTarget = null;
      }
    };

    var returnFocus = function returnFocus() {
      if (api.settings.focus && api.memoryTrigger) {
        api.memoryTrigger.focus();
        api.memoryTrigger = null;
      }
    };

    if (api.settings.autoInit) api.init();
    return api;
  };

  exports.Modal = Modal;

}(this.vrembem = this.vrembem || {}));
