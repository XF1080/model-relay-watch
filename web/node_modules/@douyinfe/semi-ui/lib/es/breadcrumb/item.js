import _isNull from "lodash/isNull";
import _isUndefined from "lodash/isUndefined";
import _merge from "lodash/merge";
import React, { Fragment } from 'react';
import cls from 'classnames';
import propTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/breadcrumb/constants';
import BreadcrumbItemFoundation from '@douyinfe/semi-foundation/lib/es/breadcrumb/itemFoundation';
import BaseComponent from '../_base/baseComponent';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
import BreadContext from './bread-context';
import Typography from '../typography';
const clsPrefix = cssClasses.PREFIX;
export default class BreadcrumbItem extends BaseComponent {
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      notifyClick: function () {
        _this.props.onClick(...arguments);
      },
      notifyParent: function () {
        _this.context.onClick(...arguments);
      }
    });
  }
  constructor(props) {
    super(props);
    this.renderIcon = () => {
      const iconType = this.props.icon;
      const {
        compact
      } = this.context;
      const iconSize = compact ? 'small' : 'default';
      const className = `${clsPrefix}-item-icon`;
      if (/*#__PURE__*/React.isValidElement(iconType)) {
        //@ts-ignore
        return /*#__PURE__*/React.cloneElement(iconType, {
          className,
          size: iconSize
        });
      }
      return iconType;
    };
    this.getTooltipOpt = () => {
      const {
        showTooltip
      } = this.context;
      if (!showTooltip) {
        return {
          width: 150,
          ellipsisPos: 'end'
        };
      }
      const defaultOpts = {
        width: 150,
        ellipsisPos: 'end',
        opts: {
          autoAdjustOverflow: true,
          position: 'top'
        }
      };
      if (typeof showTooltip === 'object') {
        return _merge(defaultOpts, showTooltip);
      }
      return defaultOpts;
    };
    this.getItemInfo = () => {
      let itemInfo = {};
      const {
        route,
        children,
        href
      } = this.props;
      const hasHref = !_isUndefined(href) && !_isNull(href);
      if (route) {
        itemInfo = route;
      } else {
        itemInfo.name = children;
        if (hasHref) {
          itemInfo.href = href;
        }
      }
      return itemInfo;
    };
    this.renderBreadItem = () => {
      const {
        children
      } = this.props;
      const {
        compact
      } = this.context;
      const showTooltip = this.getTooltipOpt();
      const icon = this.renderIcon();
      if (Boolean(children) && typeof children === 'string') {
        const {
          opts,
          ellipsisPos,
          width
        } = showTooltip;
        return /*#__PURE__*/React.createElement(Fragment, null, icon, /*#__PURE__*/React.createElement("span", {
          className: `${clsPrefix}-item-title`
        }, /*#__PURE__*/React.createElement(Typography.Text, {
          ellipsis: {
            showTooltip: opts ? {
              opts
            } : false,
            pos: ellipsisPos
          },
          // icon={this.renderIcon(icon)}
          style: {
            maxWidth: width
          },
          size: compact ? 'small' : 'normal'
        }, children)));
      }
      return /*#__PURE__*/React.createElement(Fragment, null, icon, children ? (/*#__PURE__*/React.createElement("span", {
        className: `${clsPrefix}-item-title ${clsPrefix}-item-title-inline`
      }, children)) : null);
    };
    this.renderItem = () => {
      const {
        href,
        active,
        noLink
      } = this.props;
      const hasHref = href !== null && typeof href !== 'undefined';
      const itemCls = cls({
        [`${clsPrefix}-item`]: true,
        [`${clsPrefix}-item-active`]: active,
        [`${clsPrefix}-item-link`]: !noLink
      });
      const itemInner = this.renderBreadItem();
      const tag = active || !hasHref ? 'span' : 'a';
      const itemInfo = this.getItemInfo();
      return /*#__PURE__*/React.createElement(tag, {
        className: itemCls,
        onClick: e => this.foundation.handleClick(itemInfo, e),
        href
      }, itemInner);
    };
    this.foundation = new BreadcrumbItemFoundation(this.adapter);
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const {
      active,
      shouldRenderSeparator
      // children,
    } = this.props;
    const pageLabel = active ? {
      'aria-current': 'page'
    } : {};
    const item = this.renderItem();
    const separator = this.props.separator || /*#__PURE__*/React.createElement("span", {
      className: `${clsPrefix}-separator`
    }, this.context.separator);
    const wrapperCLs = cls({
      [`${clsPrefix}-item-wrap`]: true
      // [`${clsPrefix}-item-wrap-iconOnly`]: !!children && this.props.icon,
    });
    return /*#__PURE__*/React.createElement("span", Object.assign({
      className: wrapperCLs
    }, pageLabel, this.getDataAttr(this.props)), item, shouldRenderSeparator && separator);
  }
}
BreadcrumbItem.isBreadcrumbItem = true;
BreadcrumbItem.contextType = BreadContext;
BreadcrumbItem.propTypes = {
  onClick: propTypes.func,
  route: propTypes.oneOfType([propTypes.object, propTypes.string]),
  name: propTypes.string,
  children: propTypes.node,
  active: propTypes.bool,
  shouldRenderSeparator: propTypes.bool,
  icon: propTypes.node,
  separator: propTypes.node,
  noLink: propTypes.bool
};
BreadcrumbItem.defaultProps = {
  onClick: noop,
  shouldRenderSeparator: true
};