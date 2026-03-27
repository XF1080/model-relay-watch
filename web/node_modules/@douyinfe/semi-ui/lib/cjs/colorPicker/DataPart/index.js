"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireDefault(require("react"));
var _input = _interopRequireDefault(require("../../input"));
var _inputGroup = _interopRequireDefault(require("../../input/inputGroup"));
var _inputNumber = _interopRequireDefault(require("../../inputNumber"));
var _select = _interopRequireDefault(require("../../select"));
var _button = _interopRequireDefault(require("../../button"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/colorPicker/foundation"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/colorPicker/constants");
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _DataPartFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/colorPicker/DataPartFoundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DataPart extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleChange = newColor => {
      this.props.foundation.handleChange(newColor, this.state.format);
    };
    this.foundation = new _DataPartFoundation.default(this.adapter);
    this.state = {
      format: this.props.defaultFormat,
      inputValue: ''
    };
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getColorPickerFoundation: () => this.props.foundation
    });
  }
  componentDidMount() {
    this.foundation.handleInputValueChange(this.foundation.getInputValue());
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!(0, _isEqual2.default)(prevProps.currentColor, this.props.currentColor) || prevState.format !== this.state.format) {
      this.foundation.handleInputValueChange(this.foundation.getInputValue());
    }
  }
  render() {
    const rgba = this.props.currentColor.rgba;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-dataPart`,
      style: {
        width: this.props.width
      }
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-colorDemoBlock`,
      style: {
        minWidth: 20,
        minHeight: 20,
        backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`
      }
    }), /*#__PURE__*/_react.default.createElement(_inputGroup.default, {
      size: 'small',
      className: `${_constants.cssClasses.PREFIX}-inputGroup`
    }, /*#__PURE__*/_react.default.createElement(_input.default, {
      className: `${_constants.cssClasses.PREFIX}-colorPickerInput`,
      value: this.state.inputValue,
      onChange: v => {
        const value = this.foundation.getValueByInputValue(v);
        if (value) {
          this.handleChange(value);
        }
        this.foundation.handleInputValueChange(v);
      }
    }), this.props.alpha && /*#__PURE__*/_react.default.createElement(_inputNumber.default, {
      min: 0,
      max: 100,
      className: `${_constants.cssClasses.PREFIX}-colorPickerInputNumber`,
      value: Number(Math.round(this.props.currentColor.rgba.a * 100)),
      onNumberChange: v => {
        if (this.state.format === 'rgba') {
          this.handleChange(Object.assign(Object.assign({}, this.props.currentColor.rgba), {
            a: Number((v / 100).toFixed(2))
          }));
        } else if (this.state.format === 'hex') {
          const rgba = Object.assign(Object.assign({}, this.props.currentColor.rgba), {
            a: Number((v / 100).toFixed(2))
          });
          const hex = _foundation.default.rgbaToHex(rgba);
          this.handleChange(hex);
        } else if (this.state.format === 'hsva') {
          const rgba = Object.assign(Object.assign({}, this.props.currentColor.hsva), {
            a: Number((v / 100).toFixed(2))
          });
          this.handleChange(rgba);
        }
      },
      suffix: /*#__PURE__*/_react.default.createElement("span", {
        className: `${_constants.cssClasses.PREFIX}-inputNumberSuffix`
      }, "%"),
      hideButtons: true
    }), /*#__PURE__*/_react.default.createElement(_select.default, {
      className: `${_constants.cssClasses.PREFIX}-formatSelect`,
      size: 'small',
      value: this.state.format,
      onSelect: v => this.foundation.handleFormatChange(v),
      optionList: ['hex', 'rgba', 'hsva'].map(type => ({
        label: type,
        value: type
      }))
    })), this.props.eyeDropper && /*#__PURE__*/_react.default.createElement(_button.default, {
      type: 'tertiary',
      theme: 'light',
      size: 'small',
      onClick: this.foundation.handlePickValueWithStraw,
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconEyedropper, null)
    }));
  }
}
var _default = exports.default = DataPart;