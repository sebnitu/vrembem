var core = require('@vrembem/core');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var defaults = {
  autoInit: false,
  // Data attributes
  dataModal: 'modal',
  dataDialog: 'modal-dialog',
  dataOpen: 'modal-open',
  dataClose: 'modal-close',
  dataFocus: 'modal-focus',
  dataRequired: 'modal-required',
  // State classes
  stateOpened: 'is-opened',
  stateOpening: 'is-opening',
  stateClosing: 'is-closing',
  stateClosed: 'is-closed',
  // Selector
  selectorInert: null,
  selectorOverflow: 'body',
  // Feature toggles
  customEventPrefix: 'modal:',
  moveModals: {
    ref: null,
    type: null
  },
  setTabindex: true,
  transition: true
};

var handlerClick = function handlerClick(event) {
  try {
    var _exit2;

    var _this2 = this;

    function _temp3(_result) {
      if (_exit2) return _result;

      // Close click
      if (event.target.closest("[data-" + _this2.settings.dataClose + "]")) {
        event.preventDefault();

        _this2.close();

        return;
      } // Root click


      if (event.target.hasAttribute("data-" + _this2.settings.dataModal) && !event.target.hasAttribute("data-" + _this2.settings.dataRequired)) {
        _this2.close();
      }
    }

    // Working catch
    if (_this2.working) return Promise.resolve(); // Trigger click

    var trigger = event.target.closest("[data-" + _this2.settings.dataOpen + "]");

    var _temp4 = function () {
      if (trigger) {
        event.preventDefault();
        var modalKey = trigger.getAttribute("data-" + _this2.settings.dataOpen);
        var fromModal = event.target.closest("[data-" + _this2.settings.dataModal + "]");
        if (!fromModal) _this2.memory.trigger = trigger;
        return Promise.resolve(_this2.close(!fromModal)).then(function () {
          _this2.open(modalKey);

          _exit2 = 1;
        });
      }
    }();

    return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
  } catch (e) {
    return Promise.reject(e);
  }
};
function handlerKeyup(event) {
  // Working catch
  if (this.working) return;

  if (event.key === 'Escape' || event.keyCode === 27) {
    var target = document.querySelector("[data-" + this.settings.dataModal + "]." + this.settings.stateOpened);

    if (target && !target.hasAttribute("data-" + this.settings.dataRequired)) {
      this.close();
    }
  }
}

function setInitialState(obj) {
  var modals = document.querySelectorAll("[data-" + obj.settings.dataModal + "]");
  modals.forEach(function (el) {
    if (el.classList.contains(obj.settings.stateOpened)) {
      core.setInert(false, obj.settings.selectorInert);
      core.setOverflowHidden(false, obj.settings.selectorOverflow);
      core.focusTrigger(obj);
      obj.focusTrap.destroy();
    }

    core.removeClass(el, obj.settings.stateOpened, obj.settings.stateOpening, obj.settings.stateClosing);
    core.addClass(el, obj.settings.stateClosed);
  });
}

var Modal = /*#__PURE__*/function () {
  function Modal(options) {
    this.defaults = defaults;
    this.settings = _extends({}, this.defaults, options);
    this.working = false;
    this.memory = {};
    this.focusTrap = new core.FocusTrap();
    this.__handlerClick = handlerClick.bind(this);
    this.__handlerKeyup = handlerKeyup.bind(this);
    if (this.settings.autoInit) this.init();
  }

  var _proto = Modal.prototype;

  _proto.init = function init(options) {
    if (options === void 0) {
      options = null;
    }

    if (options) this.settings = _extends({}, this.settings, options);
    this.moveModals();
    this.setTabindex(this.settings.setTabindex);
    this.setInitialState();
    document.addEventListener('click', this.__handlerClick, false);
    document.addEventListener('touchend', this.__handlerClick, false);
    document.addEventListener('keyup', this.__handlerKeyup, false);
  };

  _proto.destroy = function destroy() {
    this.memory = {};
    document.removeEventListener('click', this.__handlerClick, false);
    document.removeEventListener('touchend', this.__handlerClick, false);
    document.removeEventListener('keyup', this.__handlerKeyup, false);
  }
  /**
   * Helpers
   */
  ;

  _proto.getModal = function getModal(modalKey) {
    if (typeof modalKey !== 'string') return modalKey;
    return document.querySelector("[data-" + this.settings.dataModal + "=\"" + modalKey + "\"]");
  };

  _proto.modalNotFound = function modalNotFound(key) {
    return Promise.reject(new Error("Did not find modal with key: \"" + key + "\""));
  };

  _proto.setTabindex = function setTabindex(state) {
    if (state === void 0) {
      state = true;
    }

    var selectorTabindex = "\n      [data-" + this.settings.dataModal + "]\n      [data-" + this.settings.dataDialog + "]\n    ";

    core.setTabindex(state, selectorTabindex);
  };

  _proto.setInitialState = function setInitialState$1() {
    setInitialState(this);
  };

  _proto.moveModals = function moveModals(type, ref) {
    if (type === void 0) {
      type = this.settings.moveModals.type;
    }

    if (ref === void 0) {
      ref = this.settings.moveModals.ref;
    }

    var modals = document.querySelectorAll("[data-" + this.settings.dataModal + "]");
    if (modals.length) core.moveElement(modals, type, ref);
  }
  /**
   * Change state functionality
   */
  ;

  _proto.open = function open(modalKey) {
    try {
      var _this2 = this;

      var modal = _this2.getModal(modalKey);

      if (!modal) return Promise.resolve(_this2.modalNotFound(modalKey));

      if (core.hasClass(modal, _this2.settings.stateClosed)) {
        _this2.working = true;
        core.setOverflowHidden(true, _this2.settings.selectorOverflow);
        return Promise.resolve(core.openTransition(modal, _this2.settings)).then(function () {
          _this2.focusTrap.init(modal);

          core.focusTarget(modal, _this2.settings);
          core.setInert(true, _this2.settings.selectorInert);
          modal.dispatchEvent(new CustomEvent(_this2.settings.customEventPrefix + 'opened', {
            bubbles: true
          }));
          _this2.working = false;
          return modal;
        });
      } else {
        return Promise.resolve(modal);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.close = function close(returnFocus) {
    if (returnFocus === void 0) {
      returnFocus = true;
    }

    try {
      var _this4 = this;

      var modal = document.querySelector("[data-" + _this4.settings.dataModal + "]." + _this4.settings.stateOpened);

      if (modal) {
        _this4.working = true;
        core.setInert(false, _this4.settings.selectorInert);
        core.setOverflowHidden(false, _this4.settings.selectorOverflow);
        return Promise.resolve(core.closeTransition(modal, _this4.settings)).then(function () {
          if (returnFocus) core.focusTrigger(_this4);

          _this4.focusTrap.destroy();

          modal.dispatchEvent(new CustomEvent(_this4.settings.customEventPrefix + 'closed', {
            bubbles: true
          }));
          _this4.working = false;
          return modal;
        });
      } else {
        return Promise.resolve(modal);
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return Modal;
}();

module.exports = Modal;
//# sourceMappingURL=scripts.js.map
