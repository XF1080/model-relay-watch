"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/colorPicker/foundation"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _ColorChooseArea = _interopRequireDefault(require("./ColorChooseArea"));
var _AlphaSlider = _interopRequireDefault(require("./AlphaSlider"));
var _ColorSlider = _interopRequireDefault(require("./ColorSlider"));
var _DataPart = _interopRequireDefault(require("./DataPart"));
var _classnames = _interopRequireDefault(require("classnames"));
require("@douyinfe/semi-foundation/lib/cjs/colorPicker/colorPicker.css");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/constants");
var _popover = _interopRequireDefault(require("../popover"));
var _convert = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/utils/convert");
var _interface = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/interface");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interface[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColorPicker extends _baseComponent.default {
  constructor(props) {
    var _a;
    super(props);
    this.foundation = new _foundation.default(this.adapter);
    const initValue = (_a = props.value) !== null && _a !== void 0 ? _a : props.defaultValue;
    this.state = {
      currentColor: initValue
    };
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyChange: value => {
        var _a, _b;
        (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
      }
    });
  }
  renderPicker() {
    var _a, _b, _c, _d, _e;
    const {
      className: userClassName
    } = this.props;
    const className = (0, _classnames.default)(`${_constants.cssClasses.PREFIX}`, userClassName);
    const currentColor = this.foundation.getCurrentColor();
    return /*#__PURE__*/_react.default.createElement("div", {
      className: className
    }, this.props.topSlot, /*#__PURE__*/_react.default.createElement(_ColorChooseArea.default, {
      hsva: currentColor.hsva,
      foundation: this.foundation,
      onChange: _ref => {
        let {
          s,
          v
        } = _ref;
        this.foundation.handleChange({
          s,
          v,
          a: currentColor.hsva.a,
          h: currentColor.hsva.h
        }, 'hsva');
      },
      handleSize: 20,
      width: (_a = this.props.width) !== null && _a !== void 0 ? _a : 280,
      height: (_b = this.props.height) !== null && _b !== void 0 ? _b : 280
    }), /*#__PURE__*/_react.default.createElement(_ColorSlider.default, {
      width: (_c = this.props.width) !== null && _c !== void 0 ? _c : 280,
      height: 10,
      handleSize: 18,
      hue: currentColor.hsva.h,
      className: 'colorSliderWrapper',
      foundation: this.foundation
    }), this.props.alpha && /*#__PURE__*/_react.default.createElement(_AlphaSlider.default, {
      width: (_d = this.props.width) !== null && _d !== void 0 ? _d : 280,
      height: 10,
      handleSize: 18,
      hsva: currentColor.hsva,
      className: 'alphaSliderWrapper',
      foundation: this.foundation
    }), /*#__PURE__*/_react.default.createElement(_DataPart.default, {
      currentColor: currentColor,
      eyeDropper: this.props.eyeDropper,
      alpha: this.props.alpha,
      width: (_e = this.props.width) !== null && _e !== void 0 ? _e : 280,
      foundation: this.foundation,
      defaultFormat: this.props.defaultFormat
    }), this.props.bottomSlot);
  }
  render() {
    var _a, _b;
    const currentColor = this.foundation.getCurrentColor();
    if (this.props.usePopover) {
      return /*#__PURE__*/_react.default.createElement(_popover.default, Object.assign({}, this.props.popoverProps, {
        className: (0, _classnames.default)(`${_constants.cssClasses.PREFIX}-popover`, (_a = this.props.popoverProps) === null || _a === void 0 ? void 0 : _a.className),
        content: this.renderPicker()
      }), (_b = this.props.children) !== null && _b !== void 0 ? _b : /*#__PURE__*/_react.default.createElement("div", {
        style: {
          backgroundColor: currentColor.hex
        },
        className: (0, _classnames.default)(`${_constants.cssClasses.PREFIX}-popover-defaultChildren`)
      }));
    } else {
      return this.renderPicker();
    }
  }
}
ColorPicker.__SemiComponentName__ = "ColorPicker";
ColorPicker.defaultProps = {
  defaultValue: {
    hsva: {
      h: 176,
      s: 71,
      v: 77,
      a: 1
    },
    rgba: {
      r: 57,
      g: 197,
      b: 187,
      a: 1
    },
    hex: '#39c5bb'
  },
  eyeDropper: true,
  defaultFormat: 'hex'
};
ColorPicker.colorStringToValue = raw => {
  if (raw.startsWith("#")) {
    return {
      hsva: (0, _convert.hexToHsva)(raw),
      rgba: (0, _convert.hexToRgba)(raw),
      hex: raw
    };
  } else if (raw.startsWith('rgba')) {
    const rgba = (0, _convert.rgbaStringToRgba)(raw);
    return {
      hsva: (0, _convert.rgbaStringToHsva)(raw),
      rgba: rgba,
      hex: (0, _convert.rgbaToHex)(rgba)
    };
  } else if (raw.startsWith("rgb")) {
    const rgba = (0, _convert.rgbStringToRgba)(raw);
    return {
      hsva: (0, _convert.rgbStringToHsva)(raw),
      rgba: rgba,
      hex: (0, _convert.rgbaToHex)(rgba)
    };
  } else if (raw.startsWith("hsv")) {
    const hsva = (0, _convert.hsvaStringToHsva)(raw);
    const rgba = (0, _convert.hsvaToRgba)(hsva);
    const hex = (0, _convert.hsvaToHex)(hsva);
    return {
      hsva,
      rgba,
      hex
    };
  } else {
    throw new Error("Semi ColorPicker: error on static colorStringToValue method, input value is invalid: " + raw);
  }
};
var _default = exports.default = ColorPicker;