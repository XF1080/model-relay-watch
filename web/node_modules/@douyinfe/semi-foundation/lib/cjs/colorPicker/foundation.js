"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _convert = require("./utils/convert");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColorPickerFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleChangeH = (currentColor, newH) => {
      const hsva = Object.assign(Object.assign({}, currentColor.hsva), {
        h: newH
      });
      const rgba = (0, _convert.hsvaToRgba)(hsva);
      const hex = (0, _convert.hsvaToHex)(hsva);
      const newCurrentColor = {
        rgba,
        hsva,
        hex
      };
      this._adapter.notifyChange(newCurrentColor);
      if (!this.getProp("value")) {
        this._adapter.setState({
          currentColor: newCurrentColor
        });
      }
    };
    this.handleChangeA = (currentColor, newAlpha) => {
      let alpha = this._adapter.getProp('alpha');
      if (!alpha) {
        newAlpha = 1;
      }
      const rgba = Object.assign(Object.assign({}, currentColor.rgba), {
        a: newAlpha
      });
      const hex = (0, _convert.rgbaToHex)(rgba);
      currentColor = {
        rgba,
        hex: alpha ? hex : hex.slice(0, 7),
        hsva: Object.assign(Object.assign({}, currentColor.hsva), {
          a: newAlpha
        })
      };
      this._adapter.notifyChange(currentColor);
      if (!this.getProp("value")) {
        this._adapter.setState({
          currentColor: currentColor
        });
      }
    };
    this.getCurrentColor = () => {
      const value = this.getProp("value");
      const currentColor = this.getState("currentColor");
      return value || currentColor;
    };
    this.handleChange = (color, format) => {
      let currentColor;
      if (format === 'hsva') {
        currentColor = {
          hsva: color,
          rgba: ColorPickerFoundation.hsvaToRgba(color),
          hex: ColorPickerFoundation.hsvaToHex(color)
        };
      } else if (format === 'rgba') {
        currentColor = {
          rgba: color,
          hsva: ColorPickerFoundation.rgbaToHsva(color),
          hex: ColorPickerFoundation.rgbaToHex(color)
        };
      } else if (format === 'hex') {
        currentColor = {
          hex: color,
          hsva: ColorPickerFoundation.hexToHsva(color),
          rgba: ColorPickerFoundation.hexToRgba(color)
        };
      } else {
        throw new Error('format error');
      }
      this._adapter.notifyChange(currentColor);
      if (!this.getProp("value")) {
        this._adapter.setState({
          currentColor: currentColor
        });
      }
    };
    this.handleAlphaChangeByHandle = newAlpha => {
      this.handleChangeA(this.getCurrentColor(), newAlpha.a);
    };
    this.handleColorChangeByHandle = newHue => {
      this.handleChangeH(this.getCurrentColor(), newHue.h);
    };
    this.getHandlePositionByHSVA = (hsva, _ref, handleSize) => {
      let {
        width,
        height
      } = _ref;
      const defaultColorPosition = {
        x: hsva.s / 100 * width,
        y: (1 - hsva.v / 100) * height
      };
      return {
        x: defaultColorPosition.x - handleSize / 2,
        y: defaultColorPosition.y - handleSize / 2
      };
    };
    this.getHandlePositionByMousePosition = (mousePosition, _ref2, handleSize) => {
      let {
        width,
        height
      } = _ref2;
      if (mousePosition.x > width || mousePosition.x < 0) {
        return null;
      }
      if (mousePosition.y > height || mousePosition.y < 0) {
        return null;
      }
      const handlePosition = {
        x: mousePosition.x - handleSize / 2,
        y: mousePosition.y - handleSize / 2
      };
      return handlePosition;
    };
    this.getAlphaHandlePositionByMousePosition = (mousePosition, width, handleSize) => {
      if (mousePosition < 0 || mousePosition > width) {
        return null;
      }
      return mousePosition - handleSize / 2;
    };
    this.getColorHandlePositionByMousePosition = (mousePosition, width, handleSize) => {
      if (mousePosition < 0 || mousePosition > width) {
        return null;
      }
      return mousePosition - handleSize / 2;
    };
  }
}
ColorPickerFoundation.hsvaToRgba = _convert.hsvaToRgba;
ColorPickerFoundation.rgbaToHsva = _convert.rgbaToHsva;
ColorPickerFoundation.rgbaToHex = _convert.rgbaToHex;
ColorPickerFoundation.hsvaToHex = _convert.hsvaToHex;
ColorPickerFoundation.hexToRgba = _convert.hexToRgba;
ColorPickerFoundation.hexToHsva = _convert.hexToHsva;
ColorPickerFoundation.hsvaToHslaString = _convert.hsvaToHslaString;
ColorPickerFoundation.hsvaToHslString = _convert.hsvaToHslString;
ColorPickerFoundation.rgbaStringToHsva = _convert.rgbaStringToHsva;
ColorPickerFoundation.rgbaStringToRgba = _convert.rgbaStringToRgba;
var _default = exports.default = ColorPickerFoundation;