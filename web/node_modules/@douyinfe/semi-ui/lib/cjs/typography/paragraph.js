"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/typography/constants");
var _base = _interopRequireDefault(require("./base"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
class Paragraph extends _react.PureComponent {
  render() {
    const {
      className
    } = this.props;
    const paragraphCls = (0, _classnames.default)(className, `${prefixCls}-paragraph`);
    return /*#__PURE__*/_react.default.createElement(_base.default, Object.assign({
      component: 'p'
    }, this.props, {
      className: paragraphCls
    }));
  }
}
exports.default = Paragraph;
Paragraph.propTypes = {
  copyable: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]),
  delete: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  // editable: PropTypes.bool,
  ellipsis: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]),
  mark: _propTypes.default.bool,
  link: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.bool]),
  underline: _propTypes.default.bool,
  strong: _propTypes.default.bool,
  type: _propTypes.default.oneOf(_constants.strings.TYPE),
  size: _propTypes.default.oneOf(_constants.strings.SIZE),
  spacing: _propTypes.default.oneOf(_constants.strings.SPACING),
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  component: _propTypes.default.string
};
Paragraph.defaultProps = {
  copyable: false,
  delete: false,
  disabled: false,
  // editable: false,
  ellipsis: false,
  mark: false,
  underline: false,
  strong: false,
  link: false,
  type: 'primary',
  size: 'normal',
  spacing: 'normal',
  style: {},
  className: ''
};