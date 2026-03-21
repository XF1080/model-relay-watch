"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isNull2 = _interopRequireDefault(require("lodash/isNull"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _merge2 = _interopRequireDefault(require("lodash/merge"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/breadcrumb/constants");
var _itemFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/breadcrumb/itemFoundation"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
var _breadContext = _interopRequireDefault(require("./bread-context"));
var _typography = _interopRequireDefault(require("../typography"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const clsPrefix = _constants.cssClasses.PREFIX;
class BreadcrumbItem extends _baseComponent.default {
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
      if (/*#__PURE__*/_react.default.isValidElement(iconType)) {
        //@ts-ignore
        return /*#__PURE__*/_react.default.cloneElement(iconType, {
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
        return (0, _merge2.default)(defaultOpts, showTooltip);
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
      const hasHref = !(0, _isUndefined2.default)(href) && !(0, _isNull2.default)(href);
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
        return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, icon, /*#__PURE__*/_react.default.createElement("span", {
          className: `${clsPrefix}-item-title`
        }, /*#__PURE__*/_react.default.createElement(_typography.default.Text, {
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
      return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, icon, children ? (/*#__PURE__*/_react.default.createElement("span", {
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
      const itemCls = (0, _classnames.default)({
        [`${clsPrefix}-item`]: true,
        [`${clsPrefix}-item-active`]: active,
        [`${clsPrefix}-item-link`]: !noLink
      });
      const itemInner = this.renderBreadItem();
      const tag = active || !hasHref ? 'span' : 'a';
      const itemInfo = this.getItemInfo();
      return /*#__PURE__*/_react.default.createElement(tag, {
        className: itemCls,
        onClick: e => this.foundation.handleClick(itemInfo, e),
        href
      }, itemInner);
    };
    this.foundation = new _itemFoundation.default(this.adapter);
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
    const separator = this.props.separator || /*#__PURE__*/_react.default.createElement("span", {
      className: `${clsPrefix}-separator`
    }, this.context.separator);
    const wrapperCLs = (0, _classnames.default)({
      [`${clsPrefix}-item-wrap`]: true
      // [`${clsPrefix}-item-wrap-iconOnly`]: !!children && this.props.icon,
    });
    return /*#__PURE__*/_react.default.createElement("span", Object.assign({
      className: wrapperCLs
    }, pageLabel, this.getDataAttr(this.props)), item, shouldRenderSeparator && separator);
  }
}
exports.default = BreadcrumbItem;
BreadcrumbItem.isBreadcrumbItem = true;
BreadcrumbItem.contextType = _breadContext.default;
BreadcrumbItem.propTypes = {
  onClick: _propTypes.default.func,
  route: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.string]),
  name: _propTypes.default.string,
  children: _propTypes.default.node,
  active: _propTypes.default.bool,
  shouldRenderSeparator: _propTypes.default.bool,
  icon: _propTypes.default.node,
  separator: _propTypes.default.node,
  noLink: _propTypes.default.bool
};
BreadcrumbItem.defaultProps = {
  onClick: _function.noop,
  shouldRenderSeparator: true
};