"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/breadcrumb/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/breadcrumb/foundation"));
var _warning = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/warning"));
require("@douyinfe/semi-foundation/lib/cjs/breadcrumb/breadcrumb.css");
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _popover = _interopRequireDefault(require("../popover"));
var _item = _interopRequireDefault(require("./item"));
var _breadContext = _interopRequireDefault(require("./bread-context"));
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const clsPrefix = _constants.cssClasses.PREFIX;
class Breadcrumb extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleCollapse = (template, itemsLen) => {
      const {
        maxItemCount,
        renderMore,
        moreType
      } = this.props;
      const hasRenderMore = (0, _isFunction2.default)(renderMore);
      const restItem = template.slice(1, itemsLen - maxItemCount + 1);
      const spread = /*#__PURE__*/_react.default.createElement("span", {
        className: `${clsPrefix}-collapse`,
        key: `more-${itemsLen}`
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: `${clsPrefix}-item-wrap`
      }, /*#__PURE__*/_react.default.createElement("span", {
        role: "button",
        tabIndex: 0,
        "aria-label": "Expand breadcrumb items",
        className: `${clsPrefix}-item ${clsPrefix}-item-more`,
        onClick: item => this.foundation.handleExpand(item),
        onKeyPress: e => this.foundation.handleExpandEnterPress(e)
      }, hasRenderMore && renderMore(restItem), !hasRenderMore && moreType === 'default' && /*#__PURE__*/_react.default.createElement(_semiIcons.IconMore, null), !hasRenderMore && moreType === 'popover' && this.renderPopoverMore(restItem)), /*#__PURE__*/_react.default.createElement("span", {
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
      const hasRenderMore = (0, _isFunction2.default)(renderMore);
      const template = items.map((route, idx) => {
        const key = route._origin.key || `item-${route.name || route.path}-${idx}`;
        const inCollapseArea = idx > 0 && idx <= restItemLength;
        return /*#__PURE__*/_react.default.createElement(_item.default, Object.assign({}, route, {
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
      const items = hasRoutes ? this.foundation.genRoutes(routes) : _react.default.Children.toArray(children);
      let template;
      const itemLength = items.length; // children length
      const restItemLength = itemLength - maxItemCount; // Omitted children items
      const shouldCollapse = items && autoCollapse && itemLength > maxItemCount && isCollapsed; // Whether the number of children exceeds, need to collapse
      const hasRenderMore = (0, _isFunction2.default)(renderMore); // Whether the user passes in the renderMore method
      const moreTypeIsPopover = moreType === 'popover';
      if (hasRoutes) {
        template = this.renderRouteItems(items, shouldCollapse, moreTypeIsPopover);
      } else {
        template = items.map((item, idx) => {
          const inCollapseArea = idx > 0 && idx <= restItemLength;
          if (!item) {
            return item;
          }
          (0, _warning.default)(item.type && !item.type.isBreadcrumbItem, '[Semi Breadcrumb]: Only accepts Breadcrumb.Item as its children');
          return /*#__PURE__*/_react.default.cloneElement(item, {
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
    this.foundation = new _foundation.default(this.adapter);
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
    const content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, restItem.map((item, idx) => (/*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: `restItem-${idx}`
    }, item, idx !== restItem.length - 1 && (/*#__PURE__*/_react.default.createElement("span", {
      className: `${clsPrefix}-restItem`
    }, separator))))));
    return /*#__PURE__*/_react.default.createElement(_popover.default, {
      content: content,
      style: {
        padding: 12
      },
      showArrow: true
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconMore, null));
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
    const sizeCls = (0, _classnames.default)(className, {
      [`${clsPrefix}-wrapper`]: true,
      [`${clsPrefix}-wrapper-compact`]: compact,
      [`${clsPrefix}-wrapper-loose`]: !compact
    });
    return /*#__PURE__*/_react.default.createElement(_breadContext.default.Provider, {
      value: {
        onClick: this.onClick,
        showTooltip,
        compact,
        separator
      }
    }, /*#__PURE__*/_react.default.createElement("nav", Object.assign({
      "aria-label": this.props['aria-label'],
      className: sizeCls,
      style: style
    }, this.getDataAttr(this.props)), breadcrumbs));
  }
}
Breadcrumb.contextType = _breadContext.default;
Breadcrumb.Item = _item.default;
Breadcrumb.propTypes = {
  activeIndex: _propTypes.default.number,
  routes: _propTypes.default.array,
  onClick: _propTypes.default.func,
  separator: _propTypes.default.node,
  compact: _propTypes.default.bool,
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  renderItem: _propTypes.default.func,
  showTooltip: _propTypes.default.oneOfType([_propTypes.default.shape({
    width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
    ellipsisPos: _propTypes.default.oneOf(['end', 'middle']),
    opts: _propTypes.default.object
  }), _propTypes.default.bool]),
  className: _propTypes.default.string,
  autoCollapse: _propTypes.default.bool,
  maxItemCount: _propTypes.default.number,
  /* Customize the contents of the ellipsis area */
  renderMore: _propTypes.default.func,
  /* Type of ellipsis area */
  moreType: _propTypes.default.oneOf(_constants.strings.MORE_TYPE),
  'aria-label': _propTypes.default.string
};
Breadcrumb.defaultProps = {
  routes: [],
  onClick: _function.noop,
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
var _default = exports.default = Breadcrumb;