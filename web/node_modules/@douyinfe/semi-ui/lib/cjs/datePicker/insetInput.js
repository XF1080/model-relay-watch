"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InsetDateInput = InsetDateInput;
exports.InsetTimeInput = InsetTimeInput;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireDefault(require("react"));
var _input = _interopRequireDefault(require("../input"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function InsetDateInput(props) {
  const {
    insetInputValue,
    valuePath,
    onFocus,
    onChange,
    placeholder,
    forwardRef
  } = props;
  const value = (0, _get2.default)(insetInputValue, valuePath);
  return /*#__PURE__*/_react.default.createElement(_input.default, {
    value: value,
    onChange: (value, event) => {
      onChange({
        value,
        event,
        insetInputValue,
        valuePath
      });
    },
    onFocus: onFocus,
    placeholder: placeholder,
    ref: forwardRef
  });
}
function InsetTimeInput(props) {
  const {
    insetInputValue,
    valuePath,
    type,
    onFocus,
    onChange,
    placeholder,
    disabled
  } = props;
  const _isTimeType = type.includes('Time');
  if (!_isTimeType) {
    return null;
  }
  const value = (0, _get2.default)(insetInputValue, valuePath);
  return /*#__PURE__*/_react.default.createElement(_input.default, {
    value: value,
    onChange: (value, event) => {
      onChange({
        value,
        event,
        insetInputValue,
        valuePath
      });
    },
    onFocus: onFocus,
    placeholder: placeholder,
    disabled: disabled
  });
}