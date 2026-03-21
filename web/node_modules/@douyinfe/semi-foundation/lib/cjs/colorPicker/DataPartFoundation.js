"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _foundation2 = _interopRequireDefault(require("./foundation"));
var _split = _interopRequireDefault(require("./utils/split"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
class DataPartFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.getInputValue = () => {
      const {
        currentColor
      } = this._adapter.getProps();
      const {
        format
      } = this._adapter.getStates();
      const rgba = currentColor.rgba;
      const hsva = currentColor.hsva;
      const hex = currentColor.hex;
      if (format === 'rgba') {
        return `${rgba.r},${rgba.g},${rgba.b}`;
      } else if (format === 'hsva') {
        return `${hsva.h},${hsva.s},${hsva.v}`;
      } else {
        return hex.slice(0, 7);
      }
    };
    this.getValueByInputValue = value => {
      const {
        format
      } = this.getStates();
      if (format === 'rgba') {
        const result = (0, _split.default)(value, format);
        if (result) {
          return result;
        }
      } else if (format === 'hsva') {
        const result = (0, _split.default)(value, format);
        if (result) {
          return result;
        }
      } else if (format === 'hex') {
        // hack chrome bug, format mismatch with w3c.
        if (!value.startsWith('#')) {
          value = '#' + value;
        }
        if (/#[\d\w]{6,8}/.test(value)) {
          return value;
        }
      }
      return false;
    };
    this.handlePickValueWithStraw = () => __awaiter(this, void 0, void 0, function* () {
      const colorPickerFoundation = this._adapter.getColorPickerFoundation();
      if (!window['EyeDropper']) {
        return;
      }
      //@ts-ignore
      const eyeDropper = new EyeDropper();
      try {
        const result = yield eyeDropper.open();
        const color = result['sRGBHex'];
        if (color.startsWith("#")) {
          colorPickerFoundation.handleChange(color, 'hex');
        } else if (color.startsWith('rgba')) {
          const rgba = _foundation2.default.rgbaStringToRgba(color);
          rgba.a = 1;
          colorPickerFoundation.handleChange(rgba, 'rgba');
        }
      } catch (e) {}
    });
    this.handleInputValueChange = value => {
      this._adapter.setState({
        inputValue: value
      });
    };
    this.handleFormatChange = format => {
      this._adapter.setState({
        format
      });
    };
  }
}
var _default = exports.default = DataPartFoundation;