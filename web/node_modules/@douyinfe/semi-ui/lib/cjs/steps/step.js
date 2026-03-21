"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _basicStep = _interopRequireDefault(require("./basicStep"));
var _fillStep = _interopRequireDefault(require("./fillStep"));
var _navStep = _interopRequireDefault(require("./navStep"));
var _context = _interopRequireDefault(require("./context"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Step = props => {
  const {
    type
  } = (0, _react.useContext)(_context.default);
  const renderStep = () => {
    switch (type) {
      case 'fill':
        return /*#__PURE__*/_react.default.createElement(_fillStep.default, Object.assign({}, props));
      case 'basic':
        return /*#__PURE__*/_react.default.createElement(_basicStep.default, Object.assign({}, props));
      case 'nav':
        return /*#__PURE__*/_react.default.createElement(_navStep.default, Object.assign({}, props));
      default:
        return null;
    }
  };
  return renderStep();
};
var _default = exports.default = Step;