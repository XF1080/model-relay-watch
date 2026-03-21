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
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/collapse/constants';
import Collapsible from '../collapsible';
import CollapseContext from './collapse-context';
import { IconChevronDown, IconChevronUp } from '@douyinfe/semi-icons';
import { getUuidShort } from '@douyinfe/semi-foundation/lib/es/utils/uuid';
export default class CollapsePanel extends PureComponent {
  constructor() {
    super(...arguments);
    this.headerExpandIconTriggerRef = /*#__PURE__*/React.createRef();
    this.ariaID = "";
    this.handleClick = (itemKey, e) => {
      var _a;
      // Judge user click Icon or Header
      // Don't mount this func into icon span wrapper, or get triggered twice because of event propagation
      if (this.context.clickHeaderToExpand || ((_a = this.headerExpandIconTriggerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
        this.context.onClick(itemKey, e);
      }
    };
  }
  componentDidMount() {
    this.ariaID = getUuidShort({});
  }
  renderHeader(active) {
    let expandIconEnable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const {
      showArrow,
      header,
      extra
    } = this.props;
    let {
      expandIcon,
      collapseIcon
    } = this.context;
    const {
      expandIconPosition
    } = this.context;
    if (typeof expandIcon === 'undefined') {
      expandIcon = /*#__PURE__*/React.createElement(IconChevronDown, null);
    }
    if (typeof collapseIcon === 'undefined') {
      collapseIcon = /*#__PURE__*/React.createElement(IconChevronUp, null);
    }
    const icon = /*#__PURE__*/React.createElement("span", {
      ref: this.headerExpandIconTriggerRef,
      "aria-hidden": 'true',
      className: cls([`${cssClasses.PREFIX}-header-icon`, {
        [`${cssClasses.PREFIX}-header-iconDisabled`]: !expandIconEnable
      }])
    }, expandIconEnable ? active ? collapseIcon : expandIcon : expandIcon);
    const iconPosLeft = expandIconPosition === 'left';
    if (typeof header === 'string') {
      return /*#__PURE__*/React.createElement(React.Fragment, null, showArrow && (iconPosLeft ? icon : null), /*#__PURE__*/React.createElement("span", null, header), /*#__PURE__*/React.createElement("span", {
        className: `${cssClasses.PREFIX}-header-right`
      }, /*#__PURE__*/React.createElement("span", null, extra), showArrow && (iconPosLeft ? null : icon)));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, showArrow && (iconPosLeft ? icon : null), header, showArrow && (iconPosLeft ? null : icon));
  }
  render() {
    const _a = this.props,
      {
        className,
        children,
        itemKey,
        reCalcKey,
        header,
        extra,
        showArrow,
        disabled
      } = _a,
      restProps = __rest(_a, ["className", "children", "itemKey", "reCalcKey", "header", "extra", "showArrow", "disabled"]);
    const {
      keepDOM,
      expandIconPosition,
      activeSet,
      motion,
      lazyRender
    } = this.context;
    const active = activeSet.has(itemKey);
    const itemCls = cls(className, {
      [`${cssClasses.PREFIX}-item`]: true,
      [`${cssClasses.PREFIX}-item-active`]: active
    });
    const headerCls = cls({
      [`${cssClasses.PREFIX}-header`]: true,
      [`${cssClasses.PREFIX}-header-disabled`]: disabled,
      [`${cssClasses.PREFIX}-header-iconLeft`]: expandIconPosition === 'left'
    });
    const contentCls = cls({
      [`${cssClasses.PREFIX}-content`]: true
    });
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: itemCls
    }, restProps), /*#__PURE__*/React.createElement("div", {
      role: "button",
      tabIndex: 0,
      className: headerCls,
      "aria-disabled": disabled,
      "aria-expanded": active ? 'true' : 'false',
      "aria-owns": this.ariaID,
      onClick: e => !disabled && this.handleClick(itemKey, e)
    }, this.renderHeader(active, children !== undefined && !disabled)), children && (/*#__PURE__*/React.createElement(Collapsible, {
      lazyRender: lazyRender,
      isOpen: active,
      keepDOM: keepDOM,
      motion: motion,
      onMotionEnd: this.props.onMotionEnd,
      reCalcKey: reCalcKey
    }, /*#__PURE__*/React.createElement("div", {
      className: contentCls,
      "aria-hidden": !active,
      id: this.ariaID
    }, /*#__PURE__*/React.createElement("div", {
      className: `${cssClasses.PREFIX}-content-wrapper`
    }, children)))));
  }
}
CollapsePanel.contextType = CollapseContext;
CollapsePanel.propTypes = {
  itemKey: PropTypes.string,
  extra: PropTypes.node,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  className: PropTypes.string,
  reCalcKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showArrow: PropTypes.bool,
  disabled: PropTypes.bool
};
CollapsePanel.defaultProps = {
  showArrow: true,
  disabled: false
};