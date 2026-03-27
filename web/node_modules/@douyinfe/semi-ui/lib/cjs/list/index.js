"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/list/constants");
require("@douyinfe/semi-foundation/lib/cjs/list/list.css");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _item = _interopRequireDefault(require("./item"));
var _grid = require("../grid");
var _spin = _interopRequireDefault(require("../spin"));
var _listContext = _interopRequireDefault(require("./list-context"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
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
class List extends _baseComponent.default {
  constructor() {
    super(...arguments);
    this.renderEmpty = () => {
      const {
        emptyContent
      } = this.props;
      if (emptyContent) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: `${_constants.cssClasses.PREFIX}-empty`,
          "x-semi-prop": "emptyContent"
        }, emptyContent);
      } else {
        return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
          componentName: "List"
        }, locale => (/*#__PURE__*/_react.default.createElement("div", {
          className: `${_constants.cssClasses.PREFIX}-empty`
        }, locale.emptyText)));
      }
    };
  }
  wrapChildren(childrenList, children) {
    const {
      grid
    } = this.props;
    if (grid) {
      const rowProps = {};
      ['align', 'gutter', 'justify', 'type'].forEach(key => {
        if (key in grid) {
          rowProps[key] = grid[key];
        }
      });
      return /*#__PURE__*/_react.default.createElement(_grid.Row, Object.assign({
        type: "flex"
      }, rowProps), childrenList ? childrenList : null, children);
    }
    return /*#__PURE__*/_react.default.createElement("ul", {
      className: `${prefixCls}-items`
    }, childrenList ? childrenList : null, children);
  }
  render() {
    const _a = this.props,
      {
        style,
        className,
        header,
        loading,
        onRightClick,
        onClick,
        footer,
        layout,
        grid,
        size,
        split,
        loadMore,
        bordered,
        dataSource,
        renderItem,
        children
      } = _a,
      rest = __rest(_a, ["style", "className", "header", "loading", "onRightClick", "onClick", "footer", "layout", "grid", "size", "split", "loadMore", "bordered", "dataSource", "renderItem", "children"]);
    const wrapperCls = (0, _classnames.default)(prefixCls, className, {
      [`${prefixCls}-flex`]: layout === 'horizontal',
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-split`]: split,
      [`${prefixCls}-bordered`]: bordered
    });
    let childrenList;
    if (dataSource && dataSource.length) {
      childrenList = [];
      const items = renderItem ? dataSource.map((item, index) => renderItem(item, index)) : [];
      _react.default.Children.forEach(items, (child, index) => {
        const itemKey = child.key || `list-item-${index}`;
        childrenList.push(/*#__PURE__*/_react.default.cloneElement(child, {
          key: itemKey
        }));
      });
    } else if (!children) {
      childrenList = this.renderEmpty();
    }
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: wrapperCls,
      style: style
    }, this.getDataAttr(rest)), header ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-header`,
      "x-semi-prop": "header"
    }, header)) : null, /*#__PURE__*/_react.default.createElement(_listContext.default.Provider, {
      value: {
        grid,
        onRightClick,
        onClick
      }
    }, /*#__PURE__*/_react.default.createElement(_spin.default, {
      spinning: loading,
      size: "large"
    }, this.wrapChildren(childrenList, children))), footer ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-footer`,
      "x-semi-prop": "footer"
    }, footer)) : null, loadMore ? loadMore : null);
  }
}
List.Item = _item.default;
List.propTypes = {
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  bordered: _propTypes.default.bool,
  footer: _propTypes.default.node,
  header: _propTypes.default.node,
  layout: _propTypes.default.oneOf(_constants.strings.LAYOUT),
  size: _propTypes.default.oneOf(_constants.strings.SIZE),
  split: _propTypes.default.bool,
  emptyContent: _propTypes.default.node,
  dataSource: _propTypes.default.array,
  renderItem: _propTypes.default.func,
  grid: _propTypes.default.object,
  loading: _propTypes.default.bool,
  loadMore: _propTypes.default.node,
  onRightClick: _propTypes.default.func,
  onClick: _propTypes.default.func
};
List.defaultProps = {
  bordered: false,
  split: true,
  loading: false,
  layout: 'vertical',
  size: 'default',
  onRightClick: _noop2.default,
  onClick: _noop2.default
};
var _default = exports.default = List;