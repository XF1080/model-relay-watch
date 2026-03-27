"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReasoningWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _collapsible = _interopRequireDefault(require("../../../collapsible"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatDialogue/constants");
var _semiIcons = require("@douyinfe/semi-icons");
var _markdownRender = _interopRequireDefault(require("../../../markdownRender"));
var _localeConsumer = _interopRequireDefault(require("../../../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX_REASONING;
const ReasoningWidget = props => {
  const {
    status,
    summary,
    content,
    markdownRenderProps,
    customRenderer
  } = props;
  const defaultOpen = status !== 'completed';
  const [isOpen, setIsOpen] = (0, _react.useState)(defaultOpen);
  const handleClick = (0, _react.useCallback)(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const getText = (0, _react.useCallback)(() => {
    if (summary && summary.length > 0) {
      return summary.map(item => item.text).join('\n');
    } else if (content && content.length > 0) {
      return content.map(item => item.text).join('\n');
    }
    return '';
  }, [summary, content]);
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
    className: `${prefixCls}-header`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-header-prefix`
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconAISearchLevel2, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-header-title`
  }, /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
    componentName: "AIChatDialogue"
  }, locale => status === 'completed' ? locale['reasoning']['completed'] : locale['reasoning']['thinking'])), /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-header-suffix`
  }, isOpen ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronUp, {
    onClick: handleClick
  }) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronDown, {
    onClick: handleClick
  }))), /*#__PURE__*/_react.default.createElement(_collapsible.default, {
    isOpen: isOpen
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-content`
  }, customRenderer ? customRenderer(props) : (/*#__PURE__*/_react.default.createElement(_markdownRender.default, Object.assign({
    format: 'md',
    raw: getText()
  }, markdownRenderProps))))));
};
exports.ReasoningWidget = ReasoningWidget;