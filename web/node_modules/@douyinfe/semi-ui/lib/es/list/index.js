import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/list/constants';
import '@douyinfe/semi-foundation/lib/es/list/list.css';
import LocaleConsumer from '../locale/localeConsumer';
import ListItem from './item';
import { Row } from '../grid';
import Spin from '../spin';
import ListContext from './list-context';
import BaseComponent from '../_base/baseComponent';
const prefixCls = cssClasses.PREFIX;
class List extends BaseComponent {
  constructor() {
    super(...arguments);
    this.renderEmpty = () => {
      const {
        emptyContent
      } = this.props;
      if (emptyContent) {
        return /*#__PURE__*/React.createElement("div", {
          className: `${cssClasses.PREFIX}-empty`,
          "x-semi-prop": "emptyContent"
        }, emptyContent);
      } else {
        return /*#__PURE__*/React.createElement(LocaleConsumer, {
          componentName: "List"
        }, locale => (/*#__PURE__*/React.createElement("div", {
          className: `${cssClasses.PREFIX}-empty`
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
      return /*#__PURE__*/React.createElement(Row, Object.assign({
        type: "flex"
      }, rowProps), childrenList ? childrenList : null, children);
    }
    return /*#__PURE__*/React.createElement("ul", {
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
    const wrapperCls = cls(prefixCls, className, {
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
      React.Children.forEach(items, (child, index) => {
        const itemKey = child.key || `list-item-${index}`;
        childrenList.push(/*#__PURE__*/React.cloneElement(child, {
          key: itemKey
        }));
      });
    } else if (!children) {
      childrenList = this.renderEmpty();
    }
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: wrapperCls,
      style: style
    }, this.getDataAttr(rest)), header ? (/*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-header`,
      "x-semi-prop": "header"
    }, header)) : null, /*#__PURE__*/React.createElement(ListContext.Provider, {
      value: {
        grid,
        onRightClick,
        onClick
      }
    }, /*#__PURE__*/React.createElement(Spin, {
      spinning: loading,
      size: "large"
    }, this.wrapChildren(childrenList, children))), footer ? (/*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-footer`,
      "x-semi-prop": "footer"
    }, footer)) : null, loadMore ? loadMore : null);
  }
}
List.Item = ListItem;
List.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  bordered: PropTypes.bool,
  footer: PropTypes.node,
  header: PropTypes.node,
  layout: PropTypes.oneOf(strings.LAYOUT),
  size: PropTypes.oneOf(strings.SIZE),
  split: PropTypes.bool,
  emptyContent: PropTypes.node,
  dataSource: PropTypes.array,
  renderItem: PropTypes.func,
  grid: PropTypes.object,
  loading: PropTypes.bool,
  loadMore: PropTypes.node,
  onRightClick: PropTypes.func,
  onClick: PropTypes.func
};
List.defaultProps = {
  bordered: false,
  split: true,
  loading: false,
  layout: 'vertical',
  size: 'default',
  onRightClick: _noop,
  onClick: _noop
};
export default List;