"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _index = require("../../index");
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/constants");
var _localeConsumer = _interopRequireDefault(require("../../locale/localeConsumer"));
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
// because there may be grouping or nested dropdown forms.
const Mcp = /*#__PURE__*/_react.default.memo(props => {
  var _a;
  const {
      className,
      style,
      options = [],
      num = 0,
      children,
      onConfigureButtonClick,
      showConfigure = true
    } = props,
    rest = __rest(props, ["className", "style", "options", "num", "children", "onConfigureButtonClick", "showConfigure"]);
  const onClick = (0, _react.useCallback)(e => {
    // Prevent accidental closing of dropdown when clicking Button
    e.stopPropagation();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_index.Dropdown, Object.assign({
    style: style,
    className: (0, _classnames.default)({
      [className]: className,
      [`${_constants.cssClasses.PREFIX}-footer-configure-mcp`]: true
    })
  }, rest, {
    render: /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "AIChatInput"
    }, locale => {
      var _a;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.PREFIX}-footer-configure-mcp-header`
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: `${_constants.cssClasses.PREFIX}-footer-configure-mcp-header-title`
      }, locale.selected.replace('${count}', String((_a = options.length) !== null && _a !== void 0 ? _a : num))), showConfigure && /*#__PURE__*/_react.default.createElement(_index.Button, {
        theme: 'outline',
        className: `${_constants.cssClasses.PREFIX}-footer-configure-mcp-header-config`,
        onClick: onConfigureButtonClick
      }, locale.configure)), children ? children : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index.Dropdown.Menu, null, options.map(item => (/*#__PURE__*/_react.default.createElement(_index.Dropdown.Item, {
        key: item.value,
        icon: item.icon
      }, item.label))))));
    })
  }), /*#__PURE__*/_react.default.createElement(_index.Button, {
    theme: 'outline',
    type: 'tertiary',
    className: `${_constants.cssClasses.PREFIX}-footer-configure-mcp-trigger`,
    onClick: onClick
  }, "MCP \u00B7 ", (_a = options.length) !== null && _a !== void 0 ? _a : num));
});
var _default = exports.default = Mcp;