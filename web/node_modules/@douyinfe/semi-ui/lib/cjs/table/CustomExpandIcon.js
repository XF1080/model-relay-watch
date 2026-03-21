"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CustomExpandIcon;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _isEnterPress = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/isEnterPress"));
var _cssAnimation = _interopRequireDefault(require("../_cssAnimation"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable react-hooks/exhaustive-deps */

/**
 * render expand icon
 */
function CustomExpandIcon(props) {
  const {
    expanded,
    componentType = 'expand',
    onClick = _noop2.default,
    onMouseEnter = _noop2.default,
    onMouseLeave = _noop2.default,
    expandIcon,
    prefixCls = _constants.cssClasses.PREFIX,
    motion = true
  } = props;
  let icon;
  if (/*#__PURE__*/_react.default.isValidElement(expandIcon)) {
    icon = expandIcon;
  } else if (typeof expandIcon === 'function') {
    icon = expandIcon(expanded);
  } else if (componentType === 'tree') {
    icon = expanded && !motion ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconTreeTriangleDown, {
      size: "small"
    }) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconTreeTriangleRight, {
      size: "small"
    });
  } else {
    icon = expanded && !motion ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronDown, null) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronRight, null);
  }
  const handleClick = (0, _react.useCallback)(e => {
    if (typeof onClick === 'function') {
      onClick(!expanded, e);
    }
  }, [expanded]);
  if (motion) {
    const originIcon = icon;
    icon = /*#__PURE__*/_react.default.createElement(_cssAnimation.default, {
      animationState: expanded ? "enter" : "leave",
      startClassName: `${_constants.cssClasses.PREFIX}-expandedIcon-${expanded ? 'show' : "hide"}`
    }, _ref => {
      let {
        animationClassName
      } = _ref;
      return /*#__PURE__*/_react.default.cloneElement(originIcon, {
        className: (originIcon.props.className || "") + " " + animationClassName
      });
    });
  }
  return /*#__PURE__*/_react.default.createElement("span", {
    role: "button",
    "aria-label": "Expand this row",
    tabIndex: -1,
    onClick: handleClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    className: `${prefixCls}-expand-icon`,
    onKeyPress: e => (0, _isEnterPress.default)(e) && handleClick(e)
  }, icon);
}