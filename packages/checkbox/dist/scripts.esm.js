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

var Checkbox = /*#__PURE__*/function () {
  function Checkbox(options) {
    this.defaults = {
      autoInit: false,
      stateAttr: 'aria-checked',
      stateValue: 'mixed'
    };
    this.settings = _extends({}, this.defaults, options);
    this.__handlerClick = this.handlerClick.bind(this);
    if (this.settings.autoInit) this.init();
  }

  var _proto = Checkbox.prototype;

  _proto.init = function init(options) {
    if (options === void 0) {
      options = null;
    }

    if (options) this.settings = _extends({}, this.settings, options);
    var selector = "[" + this.settings.stateAttr + "=\"" + this.settings.stateValue + "\"]";
    var mixed = document.querySelectorAll(selector);
    this.setIndeterminate(mixed);
    document.addEventListener('click', this.__handlerClick, false);
  };

  _proto.destroy = function destroy() {
    document.removeEventListener('click', this.__handlerClick, false);
  };

  _proto.handlerClick = function handlerClick(event) {
    var selector = "[" + this.settings.stateAttr + "=\"" + this.settings.stateValue + "\"]";
    var el = event.target.closest(selector);
    if (!el) return;
    this.removeAriaState(el);
    this.setIndeterminate(el);
  };

  _proto.setAriaState = function setAriaState(el, value) {
    var _this = this;

    if (value === void 0) {
      value = this.settings.stateValue;
    }

    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      el.setAttribute(_this.settings.stateAttr, value);
    });
  };

  _proto.removeAriaState = function removeAriaState(el) {
    var _this2 = this;

    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      el.removeAttribute(_this2.settings.stateAttr);
    });
  };

  _proto.setIndeterminate = function setIndeterminate(el) {
    var _this3 = this;

    el = el.forEach ? el : [el];
    el.forEach(function (el) {
      if (el.hasAttribute(_this3.settings.stateAttr)) {
        el.indeterminate = true;
      } else {
        el.indeterminate = false;
      }
    });
  };

  return Checkbox;
}();

export default Checkbox;
//# sourceMappingURL=scripts.esm.js.map
