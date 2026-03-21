"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _notice = _interopRequireDefault(require("../notice"));
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
const HookNotice = (_a, ref) => {
  var {
      afterClose
    } = _a,
    config = __rest(_a, ["afterClose"]);
  const [visible, setVisible] = (0, _react.useState)(true);
  const close = () => {
    setVisible(false);
  };
  _react.default.useImperativeHandle(ref, () => ({
    close: () => {
      setVisible(false);
    }
  }));
  (0, _react.useEffect)(() => {
    if (!visible) {
      afterClose(String(config.id));
    }
  }, [visible]);
  return visible ? (/*#__PURE__*/_react.default.createElement(_notice.default, Object.assign({}, config, {
    onHookClose: close
  }))) : null;
};
var _default = exports.default = /*#__PURE__*/_react.default.forwardRef(HookNotice);