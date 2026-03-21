"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/dropdown/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _context = _interopRequireDefault(require("./context"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
class DropdownTitle extends _react.PureComponent {
  render() {
    const {
      className,
      style,
      children
    } = this.props;
    const {
      showTick
    } = this.context;
    const titleCls = (0, _classnames.default)({
      [`${prefixCls}-title`]: true,
      [`${prefixCls}-title-withTick`]: showTick
    }, className);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: titleCls,
      style: style
    }, children);
  }
}
DropdownTitle.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
DropdownTitle.contextType = _context.default;
var _default = exports.default = DropdownTitle;