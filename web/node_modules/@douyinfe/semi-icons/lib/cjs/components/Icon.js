"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.convertIcon = void 0;
var _react = _interopRequireDefault(require("react"));
var _env = require("../env");
var _classnames = _interopRequireDefault(require("classnames"));
require("../styles/icons.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const Icon = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const {
      svg,
      spin = false,
      rotate,
      style,
      className,
      prefixCls = _env.BASE_CLASS_PREFIX,
      type,
      size = 'default',
      fill
    } = props,
    restProps = __rest(props, ["svg", "spin", "rotate", "style", "className", "prefixCls", "type", "size", "fill"]);
  const classes = (0, _classnames.default)(`${prefixCls}-icon`, {
    [`${prefixCls}-icon-extra-small`]: size === 'extra-small',
    [`${prefixCls}-icon-small`]: size === 'small',
    [`${prefixCls}-icon-default`]: size === 'default',
    [`${prefixCls}-icon-large`]: size === 'large',
    [`${prefixCls}-icon-extra-large`]: size === 'extra-large',
    [`${prefixCls}-icon-spinning`]: spin === true,
    [`${prefixCls}-icon-${type}`]: Boolean(type)
  }, className);
  const outerStyle = {};
  if (Number.isSafeInteger(rotate)) {
    outerStyle.transform = `rotate(${rotate}deg)`;
  }
  Object.assign(outerStyle, style);
  return /*#__PURE__*/_react.default.createElement("span", Object.assign({
    role: "img",
    ref: ref,
    "aria-label": type,
    className: classes,
    style: outerStyle
  }, restProps), fill ? /*#__PURE__*/_react.default.cloneElement(svg, {
    fill
  }) : svg);
});
// @ts-ignore used to judge whether it is a semi-icon in semi-ui
// custom icon case
Icon.elementType = 'Icon';
const convertIcon = (Svg, iconType) => {
  const InnerIcon = /*#__PURE__*/_react.default.forwardRef((props, ref) => /*#__PURE__*/_react.default.createElement(Icon, Object.assign({
    svg: /*#__PURE__*/_react.default.createElement(Svg),
    type: iconType,
    ref: ref
  }, props)));
  // @ts-ignore used to judge whether it is a semi-icon in semi-ui 
  // builtin icon case
  InnerIcon.elementType = 'Icon';
  return InnerIcon;
};
exports.convertIcon = convertIcon;
var _default = exports.default = Icon;