"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/form/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefix = _constants.cssClasses.PREFIX;
class Section extends _react.PureComponent {
  render() {
    const {
      text,
      className,
      style,
      children
    } = this.props;
    const cls = (0, _classnames.default)({
      [prefix + '-section']: true
    }, className);
    const textCls = prefix + '-section-text';
    return /*#__PURE__*/_react.default.createElement("section", {
      className: cls,
      style: style
    }, /*#__PURE__*/_react.default.createElement("h5", {
      className: textCls
    }, text), children);
  }
}
exports.default = Section;
Section.propTypes = {
  text: _propTypes.default.node,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node
};