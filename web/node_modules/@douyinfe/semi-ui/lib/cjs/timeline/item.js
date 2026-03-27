"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/timeline/constants");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
require("@douyinfe/semi-foundation/lib/cjs/timeline/timeline.css");
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
const prefixCls = _constants.cssClasses.ITEM;
class Item extends _react.PureComponent {
  render() {
    const _a = this.props,
      {
        className,
        color,
        children,
        dot,
        type,
        style,
        time,
        extra,
        onClick
      } = _a,
      rest = __rest(_a, ["className", "color", "children", "dot", "type", "style", "time", "extra", "onClick"]);
    const itemCls = (0, _classnames.default)(prefixCls, className);
    const dotCls = (0, _classnames.default)({
      [`${prefixCls}-head`]: true,
      [`${prefixCls}-head-custom`]: dot,
      [`${prefixCls}-head-${type}`]: type
    });
    const dotStyle = color ? {
      style: {
        backgroundColor: color
      }
    } : null;
    return /*#__PURE__*/_react.default.createElement("li", Object.assign({
      className: itemCls,
      style: style,
      onClick: onClick
    }, (0, _getDataAttr.default)(rest)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-tail`,
      "aria-hidden": true
    }), /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: dotCls,
      "aria-hidden": true
    }, dotStyle), dot), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content`
    }, children, extra && /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content-extra`
    }, extra), time && /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content-time`
    }, time)));
  }
}
exports.default = Item;
Item.propTypes = {
  color: _propTypes.default.string,
  time: _propTypes.default.node,
  type: _propTypes.default.oneOf(_constants.strings.ITEM_TYPE),
  dot: _propTypes.default.node,
  extra: _propTypes.default.node,
  position: _propTypes.default.oneOf(_constants.strings.ITEM_POS),
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  onClick: _propTypes.default.func
};
Item.defaultProps = {
  type: 'default',
  time: '',
  onClick: _noop2.default
};