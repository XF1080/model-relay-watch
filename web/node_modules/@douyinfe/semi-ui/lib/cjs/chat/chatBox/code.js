"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nth2 = _interopRequireDefault(require("lodash/nth"));
var _react = _interopRequireWildcard(require("react"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/chat/constants");
var _copyTextToClipboard = _interopRequireDefault(require("copy-text-to-clipboard"));
var _semiIcons = require("@douyinfe/semi-icons");
var _components = require("../../markdownRender/components");
var _localeConsumer = _interopRequireDefault(require("../../locale/localeConsumer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  PREFIX_CHAT_BOX
} = _constants.cssClasses;
const Code = props => {
  const [copied, setCopied] = (0, _react.useState)(false);
  const language = (0, _react.useMemo)(() => {
    var _a;
    return (0, _nth2.default)((_a = props.className) === null || _a === void 0 ? void 0 : _a.split("-"), -1);
  }, [props.className]);
  const onCopyButtonClick = (0, _react.useCallback)(() => {
    (0, _copyTextToClipboard.default)(props.children);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [props.children]);
  return language ? (/*#__PURE__*/_react.default.createElement("div", {
    className: `${PREFIX_CHAT_BOX}-content-code semi-always-dark`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot`
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot-type`
  }, language), /*#__PURE__*/_react.default.createElement("span", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot-copy`
  }, copied ? (/*#__PURE__*/_react.default.createElement("span", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot-copy-wrapper`
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconTick, null), /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
    componentName: "Chat"
  }, locale => locale['copied']))) : (/*#__PURE__*/_react.default.createElement("button", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot-copy-wrapper ${PREFIX_CHAT_BOX}-content-code-topSlot-toCopy`,
    onClick: onCopyButtonClick
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconCopyStroked, null), /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
    componentName: "Chat"
  }, locale => locale['copy']))))), (0, _components.code)(props))) : (0, _components.code)(props);
};
var _default = exports.default = Code;