"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireWildcard(require("react"));
var _context = require("./context");
var _classnames = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function getConfigureItem(Component) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const ConfigureItem = props => {
    const {
        field,
        onChange: onOriginChange,
        className
      } = props,
      rest = __rest(props, ["field", "onChange", "className"]);
    const {
      valueKey = 'value',
      onKeyChangeFnName = 'onChange',
      valuePath,
      className: optsCls,
      defaultProps = {}
    } = opts;
    const {
      value = {},
      onChange,
      onRemove
    } = _react.default.useContext(_context.Context);
    const onItemChange = (0, _react.useCallback)(value => {
      const valueResult = valuePath ? (0, _get2.default)(value, valuePath) : value;
      onChange({
        [field]: valueResult
      });
      onOriginChange === null || onOriginChange === void 0 ? void 0 : onOriginChange(valueResult);
    }, [field, onChange, onOriginChange, valuePath]);
    // 用于处理初始值的注册
    // Registration for handling initial values
    (0, _react.useEffect)(() => {
      const {
        initValue
      } = props;
      initValue !== undefined && onChange({
        [field]: props.initValue
      }, true);
      return () => {
        onRemove(field);
      };
    }, []);
    const valueProps = {
      [valueKey]: value[field],
      [onKeyChangeFnName]: onItemChange
    };
    return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
      className: (0, _classnames.default)({
        [className]: className,
        [optsCls]: optsCls
      })
    }, defaultProps, rest, valueProps));
  };
  return ConfigureItem;
}
var _default = exports.default = getConfigureItem;