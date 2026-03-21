"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CollapseHeader = exports.CodeItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _index = require("../../index");
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const collapseCls = _constants.cssClasses.COLLAPSE;
const prefixCls = _constants.cssClasses.SIDEBAR;
const CodeItem = exports.CodeItem = /*#__PURE__*/_react.default.memo(props => {
  const {
    language,
    content,
    isJson,
    jsonViewerProps = {},
    codeHighlightProps = {}
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-code-content`
  }, isJson ? /*#__PURE__*/_react.default.createElement(_index.JsonViewer, Object.assign({
    height: '100%',
    width: '100%',
    value: content,
    showSearch: false,
    options: _constants.strings.JSON_VIEWER_OPTIONS
  }, jsonViewerProps)) : /*#__PURE__*/_react.default.createElement(_index.CodeHighlight, Object.assign({
    language: language,
    code: content
  }, codeHighlightProps)));
});
const CollapseHeader = exports.CollapseHeader = /*#__PURE__*/_react.default.memo(props => {
  const {
    content,
    onExpand,
    mode
  } = props;
  const handleExpand = (0, _react.useCallback)(e => {
    onExpand === null || onExpand === void 0 ? void 0 : onExpand(e, content, mode);
  }, [content, onExpand, mode]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${collapseCls}-header-content`
  }, mode === 'code' ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconCodeStroked, null) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconFile, null), /*#__PURE__*/_react.default.createElement("span", {
    className: `${collapseCls}-header-text`
  }, content.name), /*#__PURE__*/_react.default.createElement(_index.Button, {
    className: `${collapseCls}-header-expand-btn`,
    theme: 'borderless',
    type: 'tertiary',
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconFullScreenStroked, null),
    onClick: handleExpand
  }));
});
const CodeContent = /*#__PURE__*/_react.default.memo(props => {
  const {
    activeKey,
    codes = [],
    onExpand,
    style,
    className,
    onChange
  } = props;
  return /*#__PURE__*/_react.default.createElement(_index.Collapse, {
    className: (0, _classnames.default)(collapseCls, `${collapseCls}-code`, {
      [className]: className
    }),
    style: style,
    onChange: onChange,
    activeKey: activeKey,
    clickHeaderToExpand: false
  }, codes.map(code => /*#__PURE__*/_react.default.createElement(_index.Collapse.Panel, {
    header: /*#__PURE__*/_react.default.createElement(CollapseHeader, {
      content: code,
      onExpand: onExpand,
      mode: 'code'
    }),
    itemKey: code.key,
    key: code.key
  }, /*#__PURE__*/_react.default.createElement(CodeItem, Object.assign({
    key: code.key
  }, code)))));
});
var _default = exports.default = CodeContent;