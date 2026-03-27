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
import PropTypes from 'prop-types';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/sideSheet/constants';
import Button from '../iconButton';
import { IconClose } from '@douyinfe/semi-icons';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
let uuid = 0;
const prefixCls = cssClasses.PREFIX;
export default class SideSheetContent extends React.PureComponent {
  constructor() {
    super(...arguments);
    this.onMaskClick = e => {
      if (e.target === e.currentTarget) {
        this.close(e);
      }
    };
    this.close = e => {
      const {
        onClose
      } = this.props;
      onClose && onClose(e);
    };
  }
  componentDidMount() {
    this.sideSheetId = `sidesheet-${uuid++}`;
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
  getMaskElement() {
    var _a;
    const {
      mask,
      maskStyle,
      maskClosable
    } = this.props;
    if (mask) {
      return /*#__PURE__*/React.createElement("div", Object.assign({
        "aria-hidden": true,
        key: "mask",
        className: cls(`${prefixCls}-mask`, (_a = this.props.maskClassName) !== null && _a !== void 0 ? _a : ""),
        style: maskStyle,
        onClick: maskClosable ? this.onMaskClick : null
      }, this.props.maskExtraProps));
    }
    return null;
  }
  renderHeader() {
    const {
      title,
      closable,
      headerStyle,
      closeIcon
    } = this.props;
    let header, closer;
    if (title) {
      header = /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-title`,
        "x-semi-prop": "title"
      }, this.props.title);
    }
    if (closable) {
      const iconType = closeIcon || /*#__PURE__*/React.createElement(IconClose, null);
      closer = /*#__PURE__*/React.createElement(Button, {
        className: `${prefixCls}-close`,
        key: "close-btn",
        onClick: this.close,
        type: "tertiary",
        icon: iconType,
        theme: "borderless",
        size: "small"
      });
    }
    return /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-header`,
      role: 'heading',
      "aria-level": 1,
      style: Object.assign({}, headerStyle)
    }, header, closer);
  }
  getDialogElement() {
    var _a;
    const props = __rest(this.props, []);
    const style = {};
    if (props.width) {
      style.width = props.width;
      // When the mask is false, the width is set on the wrapper. At this time, sidesheet-inner does not need to set the width again, otherwise, the percentage will be accumulated repeatedly when the width is a percentage
      if (!props.mask) {
        style.width = '100%';
      }
    }
    if (props.height) {
      style.height = props.height;
    }
    const header = this.renderHeader();
    const dialogElement = /*#__PURE__*/React.createElement("div", Object.assign({
      key: "dialog-element",
      role: "dialog",
      tabIndex: -1,
      className: cls(`${prefixCls}-inner`, `${prefixCls}-inner-wrap`, (_a = this.props.dialogClassName) !== null && _a !== void 0 ? _a : "", `${prefixCls}-size-${props.size}`),
      // onMouseDown={this.onDialogMouseDown}
      style: Object.assign(Object.assign({}, props.style), style)
    }, this.props.wrapperExtraProps), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content`
    }, header, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-body`,
      style: props.bodyStyle,
      "x-semi-prop": "children"
    }, props.children), props.footer ? (/*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-footer`,
      "x-semi-prop": "footer"
    }, props.footer)) : null));
    return dialogElement;
  }
  render() {
    const _a = this.props,
      {
        mask,
        className,
        width,
        onClose,
        maskStyle,
        maskClosable,
        maskClassName,
        title,
        closable,
        headerStyle,
        height,
        style,
        size,
        bodyStyle,
        dialogClassName,
        children,
        footer,
        maskExtraProps,
        wrapperExtraProps
      } = _a,
      rest = __rest(_a, ["mask", "className", "width", "onClose", "maskStyle", "maskClosable", "maskClassName", "title", "closable", "headerStyle", "height", "style", "size", "bodyStyle", "dialogClassName", "children", "footer", "maskExtraProps", "wrapperExtraProps"]);
    const wrapperCls = cls(className, {
      [`${prefixCls}-fixed`]: !mask,
      [`${prefixCls}-size-${this.props.size}`]: !mask
    });
    const wrapperStyle = {};
    if (!mask && width) {
      wrapperStyle.width = width;
    }
    const dataAttr = getDataAttr(rest);
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: wrapperCls,
      style: wrapperStyle
    }, dataAttr), this.getMaskElement(), this.getDialogElement());
  }
}
SideSheetContent.propTypes = {
  onClose: PropTypes.func,
  closeIcon: PropTypes.node
};
SideSheetContent.defaultProps = {
  onClose: _noop
};