import _isFunction from "lodash/isFunction";
import React from 'react';
import cls from 'classnames';
import propTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/breadcrumb/constants';
import BreadcrumbFoundation from '@douyinfe/semi-foundation/lib/es/breadcrumb/foundation';
import warning from '@douyinfe/semi-foundation/lib/es/utils/warning';
import '@douyinfe/semi-foundation/lib/es/breadcrumb/breadcrumb.css';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
import BaseComponent from '../_base/baseComponent';
import Popover from '../popover';
import BreadcrumbItem from './item';
import BreadContext from './bread-context';
import { IconMore } from '@douyinfe/semi-icons';
const clsPrefix = cssClasses.PREFIX;
class Breadcrumb extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleCollapse = (template, itemsLen) => {
      const {
        maxItemCount,
        renderMore,
        moreType
      } = this.props;
      const hasRenderMore = _isFunction(renderMore);
      const restItem = template.slice(1, itemsLen - maxItemCount + 1);
      const spread = /*#__PURE__*/React.createElement("span", {
        className: `${clsPrefix}-collapse`,
        key: `more-${itemsLen}`
      }, /*#__PURE__*/React.createElement("span", {
        className: `${clsPrefix}-item-wrap`
      }, /*#__PURE__*/React.createElement("span", {
        role: "button",
        tabIndex: 0,
        "aria-label": "Expand breadcrumb items",
        className: `${clsPrefix}-item ${clsPrefix}-item-more`,
        onClick: item => this.foundation.handleExpand(item),
        onKeyPress: e => this.foundation.handleExpandEnterPress(e)
      }, hasRenderMore && renderMore(restItem), !hasRenderMore && moreType === 'default' && /*#__PURE__*/React.createElement(IconMore, null), !hasRenderMore && moreType === 'popover' && this.renderPopoverMore(restItem)), /*#__PURE__*/React.createElement("span", {
        className: `${clsPrefix}-separator`,
        "x-semi-prop": "separator"
      }, this.props.separator)));
      template.splice(1, itemsLen - maxItemCount, spread);
      return template;
    };
    this.renderRouteItems = (items, shouldCollapse, moreTypeIsPopover) => {
      const {
        renderItem,
        renderMore,
        maxItemCount
      } = this.props;
      const restItemLength = items.length - maxItemCount;
      const hasRenderMore = _isFunction(renderMore);
      const template = items.map((route, idx) => {
        const key = route._origin.key || `item-${route.name || route.path}-${idx}`;
        const inCollapseArea = idx > 0 && idx <= restItemLength;
        return /*#__PURE__*/React.createElement(BreadcrumbItem, Object.assign({}, route, {
          key: key,
          active: this.props.activeIndex !== undefined ? this.props.activeIndex === idx : idx === items.length - 1,
          route: route._origin,
          shouldRenderSeparator: idx !== items.length - 1 && !(shouldCollapse && (hasRenderMore || moreTypeIsPopover) && inCollapseArea)
        }), renderItem ? renderItem(route._origin) : route.name);
      });
      return template;
    };
    this.renderList = () => {
      const {
        routes,
        children,
        autoCollapse,
        maxItemCount,
        renderMore,
        moreType
      } = this.props;
      const {
        isCollapsed
      } = this.state;
      const hasRoutes = routes && routes.length > 0;
      const items = hasRoutes ? this.foundation.genRoutes(routes) : React.Children.toArray(children);
      let template;
      const itemLength = items.length; // children length
      const restItemLength = itemLength - maxItemCount; // Omitted children items
      const shouldCollapse = items && autoCollapse && itemLength > maxItemCount && isCollapsed; // Whether the number of children exceeds, need to collapse
      const hasRenderMore = _isFunction(renderMore); // Whether the user passes in the renderMore method
      const moreTypeIsPopover = moreType === 'popover';
      if (hasRoutes) {
        template = this.renderRouteItems(items, shouldCollapse, moreTypeIsPopover);
      } else {
        template = items.map((item, idx) => {
          const inCollapseArea = idx > 0 && idx <= restItemLength;
          if (!item) {
            return item;
          }
          warning(item.type && !item.type.isBreadcrumbItem, '[Semi Breadcrumb]: Only accepts Breadcrumb.Item as its children');
          return /*#__PURE__*/React.cloneElement(item, {
            key: `${idx}-item`,
            active: this.props.activeIndex !== undefined ? this.props.activeIndex === idx : idx === items.length - 1,
            shouldRenderSeparator: idx !== items.length - 1 && !(shouldCollapse && (hasRenderMore || moreTypeIsPopover) && inCollapseArea)
          });
        });
      }
      if (shouldCollapse) {
        return this.handleCollapse(template, items.length);
      }
      return template;
    };
    this.onClick = (info, event) => {
      this.foundation.handleClick(info, event);
    };
    this.foundation = new BreadcrumbFoundation(this.adapter);
    this.state = {
      isCollapsed: true
    };
    this.onClick = this.onClick.bind(this);
  }
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      notifyClick: function () {
        _this.props.onClick(...arguments);
      },
      expandCollapsed: () => this.setState({
        isCollapsed: false
      })
    });
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  renderPopoverMore(restItem) {
    const {
      separator
    } = this.props;
    const content = /*#__PURE__*/React.createElement(React.Fragment, null, restItem.map((item, idx) => (/*#__PURE__*/React.createElement(React.Fragment, {
      key: `restItem-${idx}`
    }, item, idx !== restItem.length - 1 && (/*#__PURE__*/React.createElement("span", {
      className: `${clsPrefix}-restItem`
    }, separator))))));
    return /*#__PURE__*/React.createElement(Popover, {
      content: content,
      style: {
        padding: 12
      },
      showArrow: true
    }, /*#__PURE__*/React.createElement(IconMore, null));
  }
  render() {
    const breadcrumbs = this.renderList();
    const {
      compact,
      className,
      style,
      separator,
      showTooltip
    } = this.props;
    const sizeCls = cls(className, {
      [`${clsPrefix}-wrapper`]: true,
      [`${clsPrefix}-wrapper-compact`]: compact,
      [`${clsPrefix}-wrapper-loose`]: !compact
    });
    return /*#__PURE__*/React.createElement(BreadContext.Provider, {
      value: {
        onClick: this.onClick,
        showTooltip,
        compact,
        separator
      }
    }, /*#__PURE__*/React.createElement("nav", Object.assign({
      "aria-label": this.props['aria-label'],
      className: sizeCls,
      style: style
    }, this.getDataAttr(this.props)), breadcrumbs));
  }
}
Breadcrumb.contextType = BreadContext;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.propTypes = {
  activeIndex: propTypes.number,
  routes: propTypes.array,
  onClick: propTypes.func,
  separator: propTypes.node,
  compact: propTypes.bool,
  children: propTypes.node,
  style: propTypes.object,
  renderItem: propTypes.func,
  showTooltip: propTypes.oneOfType([propTypes.shape({
    width: propTypes.oneOfType([propTypes.string, propTypes.number]),
    ellipsisPos: propTypes.oneOf(['end', 'middle']),
    opts: propTypes.object
  }), propTypes.bool]),
  className: propTypes.string,
  autoCollapse: propTypes.bool,
  maxItemCount: propTypes.number,
  /* Customize the contents of the ellipsis area */
  renderMore: propTypes.func,
  /* Type of ellipsis area */
  moreType: propTypes.oneOf(strings.MORE_TYPE),
  'aria-label': propTypes.string
};
Breadcrumb.defaultProps = {
  routes: [],
  onClick: noop,
  renderItem: undefined,
  separator: '/',
  compact: true,
  showTooltip: {
    width: 150,
    ellipsisPos: 'end'
  },
  autoCollapse: true,
  moreType: 'default',
  maxItemCount: 4,
  'aria-label': 'Breadcrumb'
};
export default Breadcrumb;