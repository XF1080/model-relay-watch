"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/tabs/constants");
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const TabItem = (props, ref) => {
  const {
      tab,
      size,
      type,
      icon,
      selected,
      closable,
      disabled,
      itemKey,
      deleteTabItem,
      tabPosition,
      handleKeyDown,
      onClick
    } = props,
    restProps = __rest(props, ["tab", "size", "type", "icon", "selected", "closable", "disabled", "itemKey", "deleteTabItem", "tabPosition", "handleKeyDown", "onClick"]);
  const closableIcon = (0, _react.useMemo)(() => {
    return closable ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, {
      "aria-label": "Close",
      role: "button",
      className: `${_constants.cssClasses.TABS_TAB}-icon-close`,
      onClick: e => deleteTabItem(itemKey, e)
    }) : null;
  }, [type, closable, deleteTabItem, itemKey]);
  const renderIcon = (0, _react.useCallback)(icon => (/*#__PURE__*/_react.default.createElement("span", {
    className: `${_constants.cssClasses.TABS_BAR}-icon`
  }, icon)), []);
  const handleKeyDownInItem = (0, _react.useCallback)(event => {
    handleKeyDown && handleKeyDown(event, itemKey, closable);
  }, [handleKeyDown, itemKey, closable]);
  const handleItemClick = (0, _react.useCallback)(e => {
    !disabled && onClick && onClick(itemKey, e);
  }, [itemKey, disabled, onClick]);
  const panelIcon = icon ? renderIcon(icon) : null;
  const className = (0, _classnames.default)(_constants.cssClasses.TABS_TAB, `${_constants.cssClasses.TABS_TAB}-${type}`, `${_constants.cssClasses.TABS_TAB}-${tabPosition}`, `${_constants.cssClasses.TABS_TAB}-single`, {
    [_constants.cssClasses.TABS_TAB_ACTIVE]: selected,
    [_constants.cssClasses.TABS_TAB_DISABLED]: disabled,
    [`${_constants.cssClasses.TABS_TAB}-small`]: size === 'small',
    [`${_constants.cssClasses.TABS_TAB}-medium`]: size === 'medium'
  });
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    role: "tab",
    id: `semiTab${itemKey}`,
    "data-tabkey": `semiTab${itemKey}`,
    "aria-controls": `semiTabPanel${itemKey}`,
    "aria-disabled": disabled ? 'true' : 'false',
    "aria-selected": selected ? 'true' : 'false',
    tabIndex: selected ? 0 : -1,
    onKeyDown: handleKeyDownInItem,
    onClick: handleItemClick,
    className: className
  }, restProps, {
    ref: ref
  }), panelIcon, tab, closableIcon);
};
// Why is forwardRef needed here？
// Because TabItem needs to be used in OverflowList （when tabs' type is collapsible), 
// OverflowList will pass ref to the outermost div DOM node of TabItem
const ForwardTabItem = /*#__PURE__*/(0, _react.forwardRef)(TabItem);
// @ts-ignore 
ForwardTabItem.elementType = 'Tabs.TabItem';
var _default = exports.default = ForwardTabItem;