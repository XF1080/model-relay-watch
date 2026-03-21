"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/divider/constants");
require("@douyinfe/semi-foundation/lib/cjs/divider/divider.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX;
const Divider = props => {
  const {
      layout = 'horizontal',
      dashed,
      align = 'center',
      className,
      margin,
      style,
      children
    } = props,
    rest = __rest(props, ["layout", "dashed", "align", "className", "margin", "style", "children"]);
  const dividerClassNames = (0, _classnames.default)(`${prefixCls}-divider`, className, {
    [`${prefixCls}-divider-horizontal`]: layout === 'horizontal',
    [`${prefixCls}-divider-vertical`]: layout === 'vertical',
    [`${prefixCls}-divider-dashed`]: !!dashed,
    [`${prefixCls}-divider-with-text`]: children && layout === 'horizontal',
    [`${prefixCls}-divider-with-text-${align}`]: children && layout === 'horizontal'
  });
  let overrideDefaultStyle = {};
  if (margin !== undefined) {
    if (layout === 'vertical') {
      overrideDefaultStyle = {
        'marginLeft': margin,
        'marginRight': margin
      };
    } else if (layout === 'horizontal') {
      overrideDefaultStyle = {
        'marginTop': margin,
        'marginBottom': margin
      };
    }
  }
  return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, rest, {
    className: dividerClassNames,
    style: Object.assign(Object.assign({}, overrideDefaultStyle), style)
  }), children && layout === 'horizontal' ? typeof children === 'string' ? (/*#__PURE__*/_react.default.createElement("span", {
    className: `${prefixCls}-divider_inner-text`,
    "x-semi-prop": "children"
  }, children)) : children : null);
};
var _default = exports.default = Divider;