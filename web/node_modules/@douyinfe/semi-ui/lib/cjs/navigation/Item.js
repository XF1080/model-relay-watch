"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _times2 = _interopRequireDefault(require("lodash/times"));
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isNullOrUndefined = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/isNullOrUndefined"));
var _utils = require("../_utils");
var _itemFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/navigation/itemFoundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/navigation/constants");
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _navContext = _interopRequireDefault(require("./nav-context"));
var _dropdown = _interopRequireDefault(require("../dropdown"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const clsPrefix = `${_constants.cssClasses.PREFIX}-item`;
class NavItem extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.setItemRef = ref => {
      // console.log('Item - setItemRef()', ref);
      this.props.forwardRef && this.props.forwardRef(ref);
    };
    this.wrapTooltip = node => {
      const {
        text,
        tooltipHideDelay,
        tooltipShowDelay
      } = this.props;
      const hideDelay = tooltipHideDelay !== null && tooltipHideDelay !== void 0 ? tooltipHideDelay : this.context.tooltipHideDelay;
      const showDelay = tooltipShowDelay !== null && tooltipShowDelay !== void 0 ? tooltipShowDelay : this.context.tooltipShowDelay;
      return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        content: text,
        wrapWhenSpecial: false,
        position: "right",
        trigger: 'hover',
        mouseEnterDelay: showDelay,
        mouseLeaveDelay: hideDelay
      }, node);
    };
    this.handleClick = e => this.foundation.handleClick(e);
    this.handleKeyPress = e => this.foundation.handleKeyPress(e);
    this.state = {
      tooltipShow: false
    };
    this.foundation = new _itemFoundation.default(this.adapter);
  }
  _invokeContextFunc(funcName) {
    if (funcName && this.context && typeof this.context[funcName] === 'function') {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return this.context[funcName](...args);
    }
    return null;
  }
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      cloneDeep: _utils.cloneDeep,
      updateTooltipShow: tooltipShow => this.setState({
        tooltipShow
      }),
      updateSelected: _selected => this._invokeContextFunc('updateSelectedKeys', [this.props.itemKey]),
      updateGlobalSelectedKeys: keys => this._invokeContextFunc('updateSelectedKeys', [...keys]),
      getSelectedKeys: () => this.context && this.context.selectedKeys,
      getSelectedKeysIsControlled: () => this.context && this.context.selectedKeysIsControlled,
      notifyGlobalOnSelect: function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return _this._invokeContextFunc('onSelect', ...args);
      },
      notifyGlobalOnClick: function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        return _this._invokeContextFunc('onClick', ...args);
      },
      notifyClick: function () {
        return _this.props.onClick(...arguments);
      },
      notifyMouseEnter: function () {
        return _this.props.onMouseEnter(...arguments);
      },
      notifyMouseLeave: function () {
        return _this.props.onMouseLeave(...arguments);
      },
      getIsCollapsed: () => this.props.isCollapsed || Boolean(this.context && this.context.isCollapsed) || false,
      getSelected: () => Boolean(this.context && this.context.selectedKeys && this.context.selectedKeys.includes(this.props.itemKey)),
      getIsOpen: () => Boolean(this.context && this.context.openKeys && this.context.openKeys.includes(this.props.itemKey))
    });
  }
  renderIcon(icon, pos) {
    let isToggleIcon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let key = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    if (this.props.isSubNav) {
      return null;
    }
    if (!icon && this.context.mode === _constants.strings.MODE_HORIZONTAL) {
      return null;
    }
    let iconSize = 'large';
    if (pos === _constants.strings.ICON_POS_RIGHT) {
      iconSize = 'default';
    }
    const className = (0, _classnames.default)(`${clsPrefix}-icon`, {
      [`${clsPrefix}-icon-toggle-${this.context.toggleIconPosition}`]: isToggleIcon,
      [`${clsPrefix}-icon-info`]: !isToggleIcon
    });
    return /*#__PURE__*/_react.default.createElement("i", {
      className: className,
      key: key
    }, (0, _utils.isSemiIcon)(icon) ? /*#__PURE__*/_react.default.cloneElement(icon, {
      size: icon.props.size || iconSize
    }) : icon);
  }
  render() {
    var _a;
    const {
      text,
      icon,
      toggleIcon,
      className,
      isSubNav,
      style,
      indent,
      onMouseEnter,
      onMouseLeave,
      link,
      linkOptions,
      disabled,
      level = 0,
      tabIndex
    } = this.props;
    const {
      mode,
      isInSubNav,
      prefixCls,
      limitIndent
    } = this.context;
    const isCollapsed = this.adapter.getIsCollapsed();
    const selected = this.adapter.getSelected();
    let itemChildren = null;
    // Children is not a recommended usage and may cause some bug-like performance, but some users have already used it, so here we only delete the ts definition instead of deleting the actual code
    // children 并不是我们推荐的用法，可能会导致一些像 bug的表现，但是有些用户已经用了，所以此处仅作删除 ts 定义而非删除实际代码的操作
    // refer https://github.com/DouyinFE/semi-design/issues/2710
    // @ts-ignore
    const children = (_a = this.props) === null || _a === void 0 ? void 0 : _a.children;
    if (!(0, _isNullOrUndefined.default)(children)) {
      itemChildren = children;
    } else {
      let placeholderIcons = null;
      if (mode === _constants.strings.MODE_VERTICAL && !limitIndent && !isCollapsed) {
        const iconAmount = icon && !indent ? level : level - 1;
        placeholderIcons = (0, _times2.default)(iconAmount, index => this.renderIcon(null, _constants.strings.ICON_POS_RIGHT, false, index));
      }
      itemChildren = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, placeholderIcons, this.context.toggleIconPosition === _constants.strings.TOGGLE_ICON_LEFT && this.renderIcon(toggleIcon, _constants.strings.ICON_POS_RIGHT, true, 'key-toggle-pos-right'), icon || indent || isInSubNav ? this.renderIcon(icon, _constants.strings.ICON_POS_LEFT, false, 'key-position-left') : null, !(0, _isNullOrUndefined.default)(text) ? /*#__PURE__*/_react.default.createElement("span", {
        className: `${_constants.cssClasses.PREFIX}-item-text`
      }, text) : '', this.context.toggleIconPosition === _constants.strings.TOGGLE_ICON_RIGHT && this.renderIcon(toggleIcon, _constants.strings.ICON_POS_RIGHT, true, 'key-toggle-pos-right'));
    }
    if (typeof link === 'string') {
      itemChildren = /*#__PURE__*/_react.default.createElement("a", Object.assign({
        className: `${prefixCls}-item-link`,
        href: link,
        tabIndex: -1
      }, linkOptions), itemChildren);
    }
    let itemDom = '';
    if (isInSubNav && (isCollapsed || mode === _constants.strings.MODE_HORIZONTAL)) {
      const popoverItemCls = (0, _classnames.default)({
        [clsPrefix]: true,
        [`${clsPrefix}-sub`]: isSubNav,
        [`${clsPrefix}-selected`]: selected,
        [`${clsPrefix}-collapsed`]: isCollapsed,
        [`${clsPrefix}-disabled`]: disabled
      });
      itemDom = /*#__PURE__*/_react.default.createElement(_dropdown.default.Item, {
        selected: selected,
        active: selected,
        forwardRef: this.setItemRef,
        className: popoverItemCls,
        onClick: this.handleClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        disabled: disabled,
        onKeyDown: this.handleKeyPress
      }, itemChildren);
    } else {
      // Items are divided into normal and sub-wrap
      const popoverItemCls = (0, _classnames.default)(`${className || `${clsPrefix}-normal`}`, {
        [clsPrefix]: true,
        [`${clsPrefix}-sub`]: isSubNav,
        [`${clsPrefix}-selected`]: selected && !isSubNav,
        [`${clsPrefix}-collapsed`]: isCollapsed,
        [`${clsPrefix}-disabled`]: disabled,
        [`${clsPrefix}-has-link`]: typeof link === 'string'
      });
      const ariaProps = {
        'aria-disabled': disabled
      };
      if (isSubNav) {
        const isOpen = this.adapter.getIsOpen();
        ariaProps['aria-expanded'] = isOpen;
      }
      itemDom =
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      _react.default.createElement("li", Object.assign({
        // if role = menuitem, the narration will read all expanded li
        role: isSubNav ? null : "menuitem",
        tabIndex: isSubNav ? -1 : tabIndex
      }, ariaProps, {
        style: style,
        ref: this.setItemRef,
        className: popoverItemCls,
        onClick: this.handleClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        onKeyPress: this.handleKeyPress
      }, this.getDataAttr(this.props)), itemChildren);
    }
    // Display Tooltip when disabled and SubNav
    if (isCollapsed && !isInSubNav && !isSubNav || isCollapsed && isSubNav && disabled) {
      itemDom = this.wrapTooltip(itemDom);
    }
    if (typeof this.context.renderWrapper === 'function') {
      return this.context.renderWrapper({
        itemElement: itemDom,
        isSubNav: isSubNav,
        isInSubNav: isInSubNav,
        props: this.props
      });
    }
    return itemDom;
  }
}
exports.default = NavItem;
NavItem.contextType = _navContext.default;
NavItem.propTypes = {
  text: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  itemKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onClick: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  icon: _propTypes.default.oneOfType([_propTypes.default.node]),
  className: _propTypes.default.string,
  toggleIcon: _propTypes.default.string,
  style: _propTypes.default.object,
  forwardRef: _propTypes.default.func,
  indent: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]),
  isCollapsed: _propTypes.default.bool,
  isSubNav: _propTypes.default.bool,
  link: _propTypes.default.string,
  linkOptions: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  tabIndex: _propTypes.default.number
};
NavItem.defaultProps = {
  isSubNav: false,
  indent: false,
  forwardRef: _noop2.default,
  isCollapsed: false,
  onClick: _noop2.default,
  onMouseEnter: _noop2.default,
  onMouseLeave: _noop2.default,
  disabled: false,
  tabIndex: 0
};