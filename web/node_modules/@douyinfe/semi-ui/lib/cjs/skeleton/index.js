"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/skeleton/constants");
require("@douyinfe/semi-foundation/lib/cjs/skeleton/skeleton.css");
var _item = require("./item");
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
const prefixCls = _constants.cssClasses.PREFIX;
class Skeleton extends _react.PureComponent {
  render() {
    const _a = this.props,
      {
        placeholder,
        active,
        children,
        className,
        loading,
        style
      } = _a,
      others = __rest(_a, ["placeholder", "active", "children", "className", "loading", "style"]);
    const skCls = (0, _classnames.default)(prefixCls, {
      [`${prefixCls}-active`]: Boolean(active)
    }, className);
    let content;
    if (loading) {
      content = /*#__PURE__*/_react.default.createElement("div", Object.assign({
        className: skCls,
        style: style
      }, others, {
        "x-semi-prop": "placeholder"
      }), placeholder);
    } else {
      content = children;
    }
    return content;
  }
}
Skeleton.Avatar = _item.Avatar;
Skeleton.Title = _item.Title;
Skeleton.Button = _item.Button;
Skeleton.Paragraph = _item.Paragraph;
Skeleton.Image = _item.Image;
Skeleton.defaultProps = {
  loading: true
};
Skeleton.propTypes = {
  active: _propTypes.default.bool,
  placeholder: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  loading: _propTypes.default.bool,
  children: _propTypes.default.node
};
var _default = exports.default = Skeleton;