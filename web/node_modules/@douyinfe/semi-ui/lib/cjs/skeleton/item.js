"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Title = exports.Paragraph = exports.Image = exports.Button = exports.Avatar = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/skeleton/constants");
var _constants2 = require("@douyinfe/semi-foundation/lib/cjs/avatar/constants");
require("@douyinfe/semi-foundation/lib/cjs/skeleton/skeleton.css");
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
const sizeSet = _constants2.strings.SIZE;
const shapeSet = _constants2.strings.SHAPE;
const generator = type => BasicComponent => props => /*#__PURE__*/_react.default.createElement(BasicComponent, Object.assign({
  type: type
}, props));
class Generic extends _react.PureComponent {
  render() {
    const _a = this.props,
      {
        prefixCls,
        className,
        type,
        size,
        shape
      } = _a,
      others = __rest(_a, ["prefixCls", "className", "type", "size", "shape"]);
    const classString = (0, _classnames.default)(className, `${prefixCls}-${type}`, {
      [`${prefixCls}-${type}-${size}`]: type.toUpperCase() === 'AVATAR'
    }, {
      [`${prefixCls}-${type}-${shape}`]: type.toUpperCase() === 'AVATAR'
    });
    return /*#__PURE__*/_react.default.createElement('div', Object.assign({
      className: classString
    }, others));
  }
}
Generic.propTypes = {
  type: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  size: _propTypes.default.oneOf(sizeSet),
  shape: _propTypes.default.oneOf(shapeSet)
};
Generic.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX,
  size: 'medium',
  shape: 'circle'
};
const Avatar = exports.Avatar = generator('avatar')(Generic);
const Image = exports.Image = generator('image')(Generic);
const Title = exports.Title = generator('title')(Generic);
const Button = exports.Button = generator('button')(Generic);
class Paragraph extends _react.PureComponent {
  render() {
    const {
      prefixCls,
      className,
      style,
      rows
    } = this.props;
    const classString = (0, _classnames.default)(className, `${prefixCls}-paragraph`);
    return /*#__PURE__*/_react.default.createElement("ul", {
      className: classString,
      style: style
    }, [...Array(rows)].map((e, i) => (/*#__PURE__*/_react.default.createElement("li", {
      key: i
    }))));
  }
}
exports.Paragraph = Paragraph;
Paragraph.propTypes = {
  rows: _propTypes.default.number,
  prefixCls: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string
};
Paragraph.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX,
  rows: 4
};