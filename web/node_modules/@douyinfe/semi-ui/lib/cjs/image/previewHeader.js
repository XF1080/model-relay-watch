"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/image/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _previewContext = require("./previewContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = `${_constants.cssClasses.PREFIX}-preview-header`;
const Header = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    onClose,
    titleStyle,
    className,
    renderHeader,
    closable,
    renderCloseIcon
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_previewContext.PreviewContext.Consumer, null, _ref2 => {
    let {
      currentIndex,
      titles
    } = _ref2;
    let title;
    if (titles && typeof currentIndex === "number") {
      title = titles[currentIndex];
    }
    const closeIcon = typeof renderCloseIcon === 'function' ? renderCloseIcon === null || renderCloseIcon === void 0 ? void 0 : renderCloseIcon() : renderCloseIcon;
    //warning 
    if (typeof closeIcon !== 'undefined' && ! /*#__PURE__*/_react.default.isValidElement(closeIcon)) {
      console.warn(`[Semi ImagePreview] RenderCloseIcon should be a valid react element or a function that returns a react element`);
    }
    return /*#__PURE__*/_react.default.createElement("section", {
      ref: ref,
      className: (0, _classnames.default)(prefixCls, className)
    }, /*#__PURE__*/_react.default.createElement("section", {
      className: `${prefixCls}-title`,
      style: titleStyle
    }, renderHeader ? renderHeader(title) : title), closable && /*#__PURE__*/_react.default.createElement("section", {
      className: `${prefixCls}-close`,
      onMouseUp: onClose
    }, /*#__PURE__*/_react.default.isValidElement(closeIcon) ? closeIcon : /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, null)));
  });
});
var _default = exports.default = Header;