"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/list/constants");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
var _grid = require("../grid");
var _listContext = _interopRequireDefault(require("./list-context"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX;
class ListItem extends _react.PureComponent {
  wrapWithGrid(content) {
    const {
      grid
    } = this.context;
    const {
        gutter,
        justify,
        type,
        align
      } = grid,
      rest = __rest(grid, ["gutter", "justify", "type", "align"]);
    return /*#__PURE__*/_react.default.createElement(_grid.Col, Object.assign({}, rest), content);
  }
  render() {
    const _a = this.props,
      {
        header,
        main,
        className,
        style,
        extra,
        children,
        align,
        onClick,
        onRightClick,
        onMouseEnter,
        onMouseLeave
      } = _a,
      rest = __rest(_a, ["header", "main", "className", "style", "extra", "children", "align", "onClick", "onRightClick", "onMouseEnter", "onMouseLeave"]);
    const {
      onRightClick: contextOnRightClick,
      onClick: contextOnClick,
      grid: contextGrid
    } = this.context;
    const handleContextMenu = onRightClick ? onRightClick : contextOnRightClick;
    const handleClick = onClick ? onClick : contextOnClick;
    const itemCls = (0, _classnames.default)(`${prefixCls}-item`, className);
    const bodyCls = (0, _classnames.default)(`${prefixCls}-item-body`, {
      [`${prefixCls}-item-body-${align}`]: align
    });
    let body;
    if (header || main) {
      body = /*#__PURE__*/_react.default.createElement("div", {
        className: bodyCls
      }, header ? /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-item-body-header`
      }, header) : null, main ? /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-item-body-main`
      }, main) : null);
    }
    let content =
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    _react.default.createElement("li", Object.assign({
      className: itemCls,
      style: style,
      onClick: handleClick,
      onContextMenu: handleContextMenu,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, (0, _getDataAttr.default)(rest)), body ? body : null, children, extra ? /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-item-extra`
    }, extra) : null);
    if (this.context && contextGrid) {
      content = this.wrapWithGrid(content);
    }
    return content;
  }
}
exports.default = ListItem;
ListItem.contextType = _listContext.default;
ListItem.propTypes = {
  extra: _propTypes.default.node,
  header: _propTypes.default.node,
  main: _propTypes.default.node,
  align: _propTypes.default.oneOf(_constants.strings.ALIGN),
  className: _propTypes.default.string,
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  onClick: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func
};
ListItem.defaultProps = {
  align: 'flex-start',
  onMouseEnter: _noop2.default,
  onMouseLeave: _noop2.default
};