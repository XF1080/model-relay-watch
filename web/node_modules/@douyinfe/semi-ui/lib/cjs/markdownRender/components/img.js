"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var React = _interopRequireWildcard(require("react"));
var _image = _interopRequireDefault(require("../../image"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/markdownRender/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const img = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: `${_constants.cssClasses.PREFIX}-component-image`
  }, /*#__PURE__*/React.createElement(_image.default, Object.assign({
    fallback: /*#__PURE__*/React.createElement(_semiIcons.IconUploadError, null),
    width: "100%"
  }, (0, _omit2.default)(props, 'children'))), /*#__PURE__*/React.createElement("div", {
    className: `${_constants.cssClasses.PREFIX}-component-image-alt`
  }, props.alt));
};
var _default = exports.default = img;