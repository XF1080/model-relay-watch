"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _context = _interopRequireDefault(require("./context"));
var _zh_CN = _interopRequireDefault(require("./source/zh_CN"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class LocaleProvider extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      children,
      locale
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_context.default.Provider, {
      value: locale
    }, children);
  }
}
exports.default = LocaleProvider;
LocaleProvider.propTypes = {
  locale: _propTypes.default.object,
  children: _propTypes.default.node
};
LocaleProvider.defaultProps = {
  locale: _zh_CN.default
};