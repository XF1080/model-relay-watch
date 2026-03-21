"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _index = require("../../index");
var _getConfigureItem = _interopRequireDefault(require("./getConfigureItem"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/constants");
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
const ConfigureButton = props => {
  const {
      value,
      onChange,
      className,
      onClick
    } = props,
    rest = __rest(props, ["value", "onChange", "className", "onClick"]);
  const onButtonClick = (0, _react.useCallback)(() => {
    const newValue = !value;
    onChange(newValue);
    onClick === null || onClick === void 0 ? void 0 : onClick(newValue);
  }, [value, onChange, onClick]);
  return /*#__PURE__*/_react.default.createElement(_index.Button, Object.assign({
    className: (0, _classnames.default)(`${_constants.cssClasses.PREFIX}-footer-configure-button`, {
      [className]: className,
      [`${_constants.cssClasses.PREFIX}-footer-configure-button-active`]: value
    }),
    onClick: onButtonClick,
    theme: 'outline',
    type: 'tertiary'
  }, rest));
};
var _default = exports.default = (0, _getConfigureItem.default)(ConfigureButton);