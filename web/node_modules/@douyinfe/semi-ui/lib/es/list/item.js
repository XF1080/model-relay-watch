import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/list/constants';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
import { Col } from '../grid';
import ListContext from './list-context';
const prefixCls = cssClasses.PREFIX;
export default class ListItem extends PureComponent {
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
    return /*#__PURE__*/React.createElement(Col, Object.assign({}, rest), content);
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
    const itemCls = cls(`${prefixCls}-item`, className);
    const bodyCls = cls(`${prefixCls}-item-body`, {
      [`${prefixCls}-item-body-${align}`]: align
    });
    let body;
    if (header || main) {
      body = /*#__PURE__*/React.createElement("div", {
        className: bodyCls
      }, header ? /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-item-body-header`
      }, header) : null, main ? /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-item-body-main`
      }, main) : null);
    }
    let content =
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    React.createElement("li", Object.assign({
      className: itemCls,
      style: style,
      onClick: handleClick,
      onContextMenu: handleContextMenu,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, getDataAttr(rest)), body ? body : null, children, extra ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-item-extra`
    }, extra) : null);
    if (this.context && contextGrid) {
      content = this.wrapWithGrid(content);
    }
    return content;
  }
}
ListItem.contextType = ListContext;
ListItem.propTypes = {
  extra: PropTypes.node,
  header: PropTypes.node,
  main: PropTypes.node,
  align: PropTypes.oneOf(strings.ALIGN),
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  onClick: PropTypes.func,
  onRightClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};
ListItem.defaultProps = {
  align: 'flex-start',
  onMouseEnter: _noop,
  onMouseLeave: _noop
};