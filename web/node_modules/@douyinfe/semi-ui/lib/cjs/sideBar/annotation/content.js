"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _item = _interopRequireWildcard(require("./item"));
var _index = require("../../index");
var _classnames = _interopRequireDefault(require("classnames"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import { Annotation } from '@douyinfe/semi-ui/aiChatDialogue';

const collapseCls = _constants.cssClasses.COLLAPSE;
const annotationCls = _constants.cssClasses.ANNOTATION;
const Content = /*#__PURE__*/_react.default.memo(props => {
  const {
    info = [],
    activeKey,
    onChange,
    onClick,
    style,
    className,
    renderItem
  } = props;
  return /*#__PURE__*/_react.default.createElement(_index.Collapse, {
    className: (0, _classnames.default)(collapseCls, {
      [className]: className
    }),
    style: style,
    onChange: onChange,
    activeKey: activeKey,
    clickHeaderToExpand: false
  }, info.map(item => (/*#__PURE__*/_react.default.createElement(_index.Collapse.Panel, {
    header: /*#__PURE__*/_react.default.createElement("div", {
      className: `${collapseCls}-header-content`
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconBookOpenStroked, null), item.header),
    itemKey: item.key,
    key: item.key
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${annotationCls}-content`
  }, item.annotations.map((cite, index) => {
    if (renderItem) {
      return renderItem(cite);
    }
    if (cite.type === 'video') {
      return /*#__PURE__*/_react.default.createElement(_item.VideoItem, Object.assign({
        key: `${index}`,
        onClick: onClick
      }, cite));
    }
    return /*#__PURE__*/_react.default.createElement(_item.default, Object.assign({
      key: `${index}`,
      onClick: onClick
    }, cite));
  }))))));
});
var _default = exports.default = Content;