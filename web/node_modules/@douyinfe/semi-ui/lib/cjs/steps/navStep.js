"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/steps/constants");
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const NavStep = props => {
  const {
    prefixCls = _constants.stepsClasses.ITEM,
    className = '',
    title,
    style,
    active = false,
    index,
    total,
    onClick,
    onKeyDown,
    onChange
  } = props;
  const classString = (0, _classnames.default)(prefixCls, {
    [`${prefixCls}-active`]: active
  }, className);
  const handleClick = e => {
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
    onChange === null || onChange === void 0 ? void 0 : onChange();
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
      onChange === null || onChange === void 0 ? void 0 : onChange();
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    role: props["role"],
    "aria-label": props["aria-label"],
    "aria-current": "step",
    tabIndex: 0,
    className: classString,
    style: style,
    onClick: e => handleClick(e),
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-container`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-content`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-title`
  }, title)), index !== total - 1 && (/*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-icon`
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronRight, {
    size: "small"
  })))));
};
var _default = exports.default = NavStep;