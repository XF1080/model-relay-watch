"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatDialogue/constants");
var _semiIcons = require("@douyinfe/semi-icons");
var _avatarGroup = _interopRequireDefault(require("../../../avatar/avatarGroup"));
var _avatar = _interopRequireDefault(require("../../../avatar"));
var _localeConsumer = _interopRequireDefault(require("../../../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX_ANNOTATION;
const AnnotationWidget = props => {
  const {
    annotation,
    description,
    maxCount,
    onClick
  } = props;
  const handleClick = (0, _react.useCallback)(e => {
    onClick === null || onClick === void 0 ? void 0 : onClick(e, annotation);
  }, [annotation, onClick]);
  const renderMore = (0, _react.useCallback)((restNumber, restAvatars) => {
    return /*#__PURE__*/_react.default.createElement(_avatar.default, {
      className: `${prefixCls}-content-logo-renderMore`,
      size: "extra-extra-small",
      alt: 'more'
    }, `+${restNumber}`);
  }, []);
  const handleKeyDown = (0, _react.useCallback)(e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);
  return /*#__PURE__*/_react.default.createElement("div", {
    role: "button",
    tabIndex: 0,
    className: `${prefixCls}-wrapper`,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-content`
  }, /*#__PURE__*/_react.default.createElement(_avatarGroup.default, {
    maxCount: maxCount,
    size: "extra-extra-small",
    overlapFrom: 'end',
    renderMore: renderMore
  }, annotation.map((item, index) => {
    return item.logo && /*#__PURE__*/_react.default.createElement(_avatar.default, {
      className: `${prefixCls}-content-logo`,
      key: index,
      src: item.logo,
      alt: item.title
    });
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-content-description`
  }, description || (/*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
    componentName: "AIChatDialogue"
  }, locale => `${annotation.length} ${locale.annotationText}`))), /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-content-icon`
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronRight, null))));
};
exports.AnnotationWidget = AnnotationWidget;