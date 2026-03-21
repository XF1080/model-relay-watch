"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/steps/constants");
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
const Steps = props => {
  const {
      size = 'default',
      current = 0,
      initial = 0,
      children,
      prefixCls = _constants.stepsClasses.PREFIX,
      className,
      style,
      onChange
    } = props,
    rest = __rest(props, ["size", "current", "initial", "children", "prefixCls", "className", "style", "onChange"]);
  const inner = (0, _react.useMemo)(() => {
    const filteredChildren = _react.Children.toArray(children).filter(c => /*#__PURE__*/(0, _react.isValidElement)(c));
    const total = filteredChildren.length;
    const content = _react.Children.map(filteredChildren, (child, index) => {
      if (!child) {
        return null;
      }
      const childProps = Object.assign({
        index,
        total
      }, child.props);
      childProps.active = index === current;
      childProps.onChange = onChange ? () => {
        if (index !== current) {
          onChange(index + initial);
        }
      } : undefined;
      return /*#__PURE__*/(0, _react.cloneElement)(child, Object.assign({}, childProps));
    });
    return content;
  }, [children, prefixCls, current, size, initial, onChange]);
  const wrapperCls = (0, _classnames.default)(className, {
    [`${prefixCls}-nav`]: true,
    [`${prefixCls}-${size}`]: size !== 'default'
  });
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({
    "aria-label": props["aria-label"],
    className: wrapperCls,
    style: style
  }, (0, _getDataAttr.default)(rest)), inner);
};
var _default = exports.default = Steps;