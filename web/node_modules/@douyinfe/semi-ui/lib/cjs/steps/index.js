"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("@douyinfe/semi-foundation/lib/cjs/steps/steps.css");
var _step = _interopRequireDefault(require("./step"));
var _fillSteps = _interopRequireDefault(require("./fillSteps"));
var _basicSteps = _interopRequireDefault(require("./basicSteps"));
var _navSteps = _interopRequireDefault(require("./navSteps"));
var _context = _interopRequireDefault(require("./context"));
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
class Steps extends _react.Component {
  renderComponent() {
    const _a = this.props,
      {
        type
      } = _a,
      restProps = __rest(_a, ["type"]);
    switch (type) {
      case 'fill':
        return /*#__PURE__*/_react.default.createElement(_fillSteps.default, Object.assign({}, restProps));
      case 'basic':
        return /*#__PURE__*/_react.default.createElement(_basicSteps.default, Object.assign({}, restProps));
      case 'nav':
        return /*#__PURE__*/_react.default.createElement(_navSteps.default, Object.assign({}, restProps));
      default:
        return null;
    }
  }
  render() {
    const {
      type
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_context.default.Provider, {
      value: {
        type
      }
    }, this.renderComponent());
  }
}
Steps.Step = _step.default;
Steps.propTypes = {
  onChange: _propTypes.default.func,
  type: _propTypes.default.oneOf(['fill', 'basic', 'nav']),
  size: _propTypes.default.oneOf(['small', 'default'])
};
Steps.defaultProps = {
  type: 'fill',
  size: 'default'
};
var _default = exports.default = Steps;