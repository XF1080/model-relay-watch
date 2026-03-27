"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/card/constants");
var _classnames = _interopRequireDefault(require("classnames"));
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
const prefixcls = _constants.cssClasses.PREFIX;
class Meta extends _react.PureComponent {
  render() {
    const _a = this.props,
      {
        avatar,
        className,
        description,
        style,
        title
      } = _a,
      others = __rest(_a, ["avatar", "className", "description", "style", "title"]);
    const metaCls = (0, _classnames.default)(`${prefixcls}-meta`, className);
    const avatarNode = avatar && (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixcls}-meta-avatar`
    }, avatar));
    const titleNode = title && (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixcls}-meta-wrapper-title`
    }, title));
    const descriptionNode = description && (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixcls}-meta-wrapper-description`
    }, description));
    const wrapper = title || description ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixcls}-meta-wrapper`
    }, titleNode, descriptionNode)) : null;
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, others, {
      className: metaCls,
      style: style
    }), avatarNode, wrapper);
  }
}
Meta.propTypes = {
  avatar: _propTypes.default.node,
  className: _propTypes.default.string,
  description: _propTypes.default.node,
  style: _propTypes.default.object,
  title: _propTypes.default.node
};
var _default = exports.default = Meta;