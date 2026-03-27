"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nth2 = _interopRequireDefault(require("lodash/nth"));
var React = _interopRequireWildcard(require("react"));
var _codeHighlight = _interopRequireDefault(require("../../codeHighlight"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/markdownRender/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const pre = props => {
  var _a;
  const language = (0, _nth2.default)((_a = props.className) === null || _a === void 0 ? void 0 : _a.split("-"), -1);
  if (language) {
    return /*#__PURE__*/React.createElement(_codeHighlight.default, {
      code: props.children,
      language: language,
      lineNumber: true
    });
  } else {
    return /*#__PURE__*/React.createElement("span", {
      className: `${_constants.cssClasses.PREFIX}-simple-code`
    }, props.children);
  }
};
var _default = exports.default = pre;