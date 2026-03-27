"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/typography/constants");
var _base = _interopRequireDefault(require("./base"));
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
class Title extends _react.PureComponent {
  render() {
    const _a = this.props,
      {
        heading
      } = _a,
      rest = __rest(_a, ["heading"]);
    const component = _constants.strings.HEADING.indexOf(heading) !== -1 ? `h${heading}` : 'h1';
    // Passing headings to support custom components
    return /*#__PURE__*/_react.default.createElement(_base.default, Object.assign({
      component: component,
      heading: component
    }, rest));
  }
}
exports.default = Title;
Title.propTypes = {
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
  heading: _propTypes.default.oneOf(_constants.strings.HEADING),
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  component: _propTypes.default.string,
  weight: _propTypes.default.oneOfType([_propTypes.default.oneOf(_constants.strings.WEIGHT), _propTypes.default.number])
};
Title.defaultProps = {
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
  heading: 1,
  style: {},
  className: ''
};