"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _useFormState = _interopRequireDefault(require("./useFormState"));
var ObjectUtil = _interopRequireWildcard(require("@douyinfe/semi-foundation/lib/cjs/utils/object"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const buildFieldState = (formState, field) => ({
  value: ObjectUtil.get(formState.values, field),
  error: ObjectUtil.get(formState.errors, field),
  touched: ObjectUtil.get(formState.touched, field)
});
function useFieldState(field) {
  const formState = (0, _useFormState.default)();
  const fieldState = buildFieldState(formState, field);
  return fieldState;
}
var _default = exports.default = useFieldState;