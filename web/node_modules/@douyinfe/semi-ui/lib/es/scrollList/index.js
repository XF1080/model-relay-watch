var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import BaseComponent from '../_base/baseComponent';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/scrollList/constants';
import classnames from 'classnames';
import propTypes from 'prop-types';
import ScrollItem from './scrollItem';
import Foundation from '@douyinfe/semi-foundation/lib/es/scrollList/foundation';
import '@douyinfe/semi-foundation/lib/es/scrollList/scrollList.css';
// eslint-disable-next-line @typescript-eslint/ban-types
class ScrollList extends BaseComponent {
  constructor(props) {
    super(props);
    this.foundation = new Foundation(this.adapter);
  }
  render() {
    const _a = this.props,
      {
        children,
        header,
        footer,
        prefixCls,
        bodyHeight,
        className,
        style
      } = _a,
      rest = __rest(_a, ["children", "header", "footer", "prefixCls", "bodyHeight", "className", "style"]);
    const clsWrapper = classnames(className, {
      [prefixCls || cssClasses.PREFIX]: true
    });
    const clsHeader = classnames({
      [`${prefixCls || cssClasses.PREFIX}-header`]: true
    });
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: clsWrapper,
      style: style
    }, this.getDataAttr(rest)), header ? (/*#__PURE__*/React.createElement("div", {
      className: clsHeader
    }, /*#__PURE__*/React.createElement("div", {
      className: `${clsHeader}-title`,
      "x-semi-prop": this.props['x-semi-header-alias'] || "header"
    }, header), /*#__PURE__*/React.createElement("div", {
      className: `${clsWrapper}-line`
    }))) : null, /*#__PURE__*/React.createElement("div", {
      className: `${clsWrapper}-body`,
      style: {
        height: bodyHeight ? bodyHeight : ''
      },
      "x-semi-prop": "children"
    }, children), footer ? (/*#__PURE__*/React.createElement("div", {
      className: `${clsWrapper}-footer`,
      "x-semi-prop": this.props['x-semi-footer-alias'] || "footer"
    }, footer)) : null);
  }
}
ScrollList.Item = ScrollItem;
ScrollList.propTypes = {
  className: propTypes.string,
  header: propTypes.node,
  footer: propTypes.node,
  children: propTypes.node,
  bodyHeight: propTypes.oneOfType([propTypes.number, propTypes.string])
};
export default ScrollList;