"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CollapseButton;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _semiIcons = require("@douyinfe/semi-icons");
var _button = _interopRequireDefault(require("../button"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function CollapseButton(_ref) {
  let {
    prefixCls,
    locale,
    collapseText,
    isCollapsed,
    onClick = _noop2.default
  } = _ref;
  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick(!isCollapsed);
    }
  };
  const btnProps = {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconSidebar, null),
    type: 'tertiary',
    theme: 'borderless',
    onClick: handleClick
  };
  let finalCollapseText = isCollapsed ? locale === null || locale === void 0 ? void 0 : locale.expandText : locale === null || locale === void 0 ? void 0 : locale.collapseText;
  if (typeof collapseText === 'function') {
    finalCollapseText = collapseText(isCollapsed);
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-collapse-btn`
  }, isCollapsed ? (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
    content: finalCollapseText,
    position: "right"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: `${prefixCls}-collapse-wrapper`
  }, /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({}, btnProps))))) : (/*#__PURE__*/_react.default.createElement(_button.default, Object.assign({}, btnProps), finalCollapseText)));
}