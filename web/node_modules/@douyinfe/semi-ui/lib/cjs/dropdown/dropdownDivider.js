"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/dropdown/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
const DropdownDivider = function () {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    style,
    className
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(`${prefixCls}-divider`, className),
    style: style
  });
};
var _default = exports.default = DropdownDivider;