"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _button = _interopRequireDefault(require("../button"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.OPTIONS;
const Option = /*#__PURE__*/_react.default.memo(props => {
  const {
    renderOptionItem,
    options,
    onChange,
    activeKey
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefixCls
  }, options === null || options === void 0 ? void 0 : options.map(option => {
    const {
      icon,
      name,
      key
    } = option;
    if (typeof renderOptionItem === 'function') {
      return renderOptionItem(option, onChange);
    }
    return /*#__PURE__*/_react.default.createElement(_button.default, {
      className: (0, _classnames.default)(`${prefixCls}-button`, {
        [`${prefixCls}-normal`]: activeKey !== key
      }),
      key: key,
      icon: icon,
      onClick: e => onChange === null || onChange === void 0 ? void 0 : onChange(e, option.key)
    }, name);
  }));
});
var _default = exports.default = Option;