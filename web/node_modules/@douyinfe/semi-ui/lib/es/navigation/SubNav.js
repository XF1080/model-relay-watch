import _get from "lodash/get";
import _times from "lodash/times";
import BaseComponent from '../_base/baseComponent';
import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import '@douyinfe/semi-foundation/lib/es/navigation/navigation.css';
import isNullOrUndefined from '@douyinfe/semi-foundation/lib/es/utils/isNullOrUndefined';
import SubNavFoundation from '@douyinfe/semi-foundation/lib/es/navigation/subNavFoundation';
import { strings, numbers, cssClasses } from '@douyinfe/semi-foundation/lib/es/navigation/constants';
import { IconChevronDown, IconChevronRight } from '@douyinfe/semi-icons';
import NavItem from './Item';
import Dropdown from '../dropdown';
import NavContext from './nav-context';
import Collapsible from "../collapsible";
import CSSAnimation from "../_cssAnimation";
export default class SubNav extends BaseComponent {
  constructor(props) {
    super(props);
    this.setItemRef = ref => {
      if (ref && ref.current) {
        this.itemRef = ref;
      } else {
        this.itemRef = {
          current: ref
        };
      }
    };
    this.setTitleRef = ref => {
      if (ref && ref.current) {
        this.titleRef = ref;
      } else {
        this.titleRef = {
          current: ref
        };
      }
    };
    this.handleClick = e => {
      this.foundation.handleClick(e && e.nativeEvent, this.titleRef && this.titleRef.current);
    };
    this.handleKeyPress = e => {
      this.foundation.handleKeyPress(e && e.nativeEvent, this.titleRef && this.titleRef.current);
    };
    this.handleDropdownVisible = visible => this.foundation.handleDropdownVisibleChange(visible);
    this.state = {
      isHovered: false
    };
    this.adapter.setCache('firstMounted', true);
    this.titleRef = /*#__PURE__*/React.createRef();
    this.itemRef = /*#__PURE__*/React.createRef();
    this.foundation = new SubNavFoundation(this.adapter);
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
      updateIsHovered: isHovered => this.setState({
        isHovered
      }),
      getOpenKeys: () => this.context && this.context.openKeys,
      getOpenKeysIsControlled: () => this.context && this.context.openKeysIsControlled,
      getCanUpdateOpenKeys: () => this.context && this.context.canUpdateOpenKeys,
      updateOpen: isOpen => this._invokeContextFunc(isOpen ? 'addOpenKeys' : 'removeOpenKeys', this.props.itemKey),
      notifyGlobalOpenChange: function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return _this._invokeContextFunc('onOpenChange', ...args);
      },
      notifyGlobalOnSelect: function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }
        return _this._invokeContextFunc('onSelect', ...args);
      },
      notifyGlobalOnClick: function () {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        return _this._invokeContextFunc('onClick', ...args);
      },
      getIsSelected: itemKey => Boolean(!isNullOrUndefined(itemKey) && _get(this.context, 'selectedKeys', []).includes(String(itemKey))),
      getIsOpen: () => {
        const {
          itemKey
        } = this.props;
        return Boolean(this.context && this.context.openKeys && this.context.openKeys.includes(this.props.itemKey));
      }
    });
  }
  renderIcon(icon, pos, withTransition) {
    let isToggleIcon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    let key = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    const {
      prefixCls
    } = this.context;
    let iconSize = 'large';
    if (pos === strings.ICON_POS_RIGHT) {
      iconSize = 'default';
    }
    const className = cls(`${prefixCls}-item-icon`, {
      [`${prefixCls}-item-icon-toggle-${this.context.toggleIconPosition}`]: isToggleIcon,
      [`${prefixCls}-item-icon-info`]: !isToggleIcon
    });
    const isOpen = this.adapter.getIsOpen();
    const iconElem = /*#__PURE__*/React.isValidElement(icon) ? withTransition ? (/*#__PURE__*/React.createElement(CSSAnimation, {
      animationState: isOpen ? "enter" : "leave",
      startClassName: `${cssClasses.PREFIX}-icon-rotate-${isOpen ? "180" : "0"}`
    }, _ref => {
      let {
        animationClassName
      } = _ref;
      // @ts-ignore
      return /*#__PURE__*/React.cloneElement(icon, {
        size: iconSize,
        className: animationClassName
      });
    })
    // @ts-ignore
    ) : /*#__PURE__*/React.cloneElement(icon, {
      size: iconSize
    }) : null;
    return /*#__PURE__*/React.createElement("i", {
      key: key,
      className: className
    }, iconElem);
  }
  renderTitleDiv() {
    const {
      text,
      icon,
      itemKey,
      indent,
      disabled,
      level,
      expandIcon
    } = this.props;
    const {
      mode,
      isInSubNav,
      isCollapsed,
      prefixCls,
      subNavMotion,
      limitIndent
    } = this.context;
    const isOpen = this.adapter.getIsOpen();
    const titleCls = cls(`${prefixCls}-sub-title`, {
      [`${prefixCls}-sub-title-selected`]: this.adapter.getIsSelected(itemKey),
      [`${prefixCls}-sub-title-disabled`]: disabled
    });
    let withTransition = false;
    let toggleIconType = '';
    if (isCollapsed) {
      if (isInSubNav) {
        toggleIconType = /*#__PURE__*/React.createElement(IconChevronRight, null);
      } else {
        toggleIconType = null;
      }
    } else if (mode === strings.MODE_HORIZONTAL) {
      if (isInSubNav) {
        toggleIconType = /*#__PURE__*/React.createElement(IconChevronRight, {
          "aria-hidden": true
        });
      } else {
        toggleIconType = expandIcon ? expandIcon : /*#__PURE__*/React.createElement(IconChevronDown, {
          "aria-hidden": true
        });
        // Horizontal mode does not require animation fix#1198
        // withTransition = true;
      }
    } else {
      if (subNavMotion) {
        withTransition = true;
      }
      toggleIconType = expandIcon ? expandIcon : /*#__PURE__*/React.createElement(IconChevronDown, {
        "aria-hidden": true
      });
    }
    let placeholderIcons = null;
    if (mode === strings.MODE_VERTICAL && !limitIndent && !isCollapsed) {
      /* Different icons' amount means different indents.*/
      const iconAmount = icon && !indent ? level : level - 1;
      placeholderIcons = _times(iconAmount, index => this.renderIcon(null, strings.ICON_POS_RIGHT, false, false, index));
    }
    const isIconChevronRightShow = !isCollapsed && isInSubNav && mode === strings.MODE_HORIZONTAL || isCollapsed && isInSubNav;
    const titleDiv = /*#__PURE__*/React.createElement("div", {
      role: "menuitem",
      // to avoid nested horizontal navigation be focused
      tabIndex: isIconChevronRightShow ? -1 : 0,
      ref: this.setTitleRef,
      className: titleCls,
      onClick: this.handleClick,
      onKeyPress: this.handleKeyPress,
      "aria-expanded": isOpen ? 'true' : 'false'
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-item-inner`
    }, placeholderIcons, this.context.toggleIconPosition === strings.TOGGLE_ICON_LEFT && this.renderIcon(toggleIconType, strings.ICON_POS_RIGHT, withTransition, true, 'key-toggle-position-left'), icon || indent || isInSubNav && mode !== strings.MODE_HORIZONTAL ? this.renderIcon(icon, strings.ICON_POS_LEFT, false, false, 'key-inSubNav-position-left') : null, /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-item-text`
    }, text), this.context.toggleIconPosition === strings.TOGGLE_ICON_RIGHT && this.renderIcon(toggleIconType, strings.ICON_POS_RIGHT, withTransition, true, 'key-toggle-position-right')));
    return titleDiv;
  }
  renderSubUl() {
    const {
      children,
      maxHeight
    } = this.props;
    const {
      isCollapsed,
      mode,
      subNavMotion,
      prefixCls
    } = this.context;
    const isOpen = this.adapter.getIsOpen();
    const isHorizontal = mode === strings.MODE_HORIZONTAL;
    const subNavCls = cls(`${prefixCls}-sub`, {
      [`${prefixCls}-sub-open`]: isOpen,
      [`${prefixCls}-sub-popover`]: isCollapsed || isHorizontal
    });
    const ulWithMotion = /*#__PURE__*/React.createElement(Collapsible, {
      motion: subNavMotion,
      isOpen: isOpen,
      keepDOM: false,
      fade: true
    }, !isCollapsed ? /*#__PURE__*/React.createElement("ul", {
      className: subNavCls
    }, children) : null);
    const finalDom = isHorizontal ? null : subNavMotion ? ulWithMotion : isOpen && !isCollapsed ? (/*#__PURE__*/React.createElement("ul", {
      className: subNavCls
    }, children)) : null;
    return finalDom;
  }
  wrapDropdown() {
    let elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let _elem = elem;
    const {
      children,
      dropdownStyle,
      disabled,
      subDropdownProps,
      dropdownProps: userDropdownProps
    } = this.props;
    const {
      mode,
      isInSubNav,
      isCollapsed,
      subNavCloseDelay,
      subNavOpenDelay,
      prefixCls,
      getPopupContainer
    } = this.context;
    const isOpen = this.adapter.getIsOpen();
    const openKeysIsControlled = this.adapter.getOpenKeysIsControlled();
    const subNavCls = cls({
      [`${prefixCls}-popover`]: isCollapsed
    });
    const dropdownProps = {
      trigger: 'hover',
      style: dropdownStyle
    };
    if (openKeysIsControlled) {
      dropdownProps.trigger = 'custom';
      dropdownProps.visible = isOpen;
    }
    if (getPopupContainer) {
      dropdownProps.getPopupContainer = getPopupContainer;
    }
    if (isCollapsed || mode === strings.MODE_HORIZONTAL) {
      // Do not show dropdown when disabled
      _elem = !disabled ? (/*#__PURE__*/React.createElement(Dropdown, Object.assign({
        className: subNavCls,
        render: (/*#__PURE__*/React.createElement(Dropdown.Menu, null, children)),
        position: mode === strings.MODE_HORIZONTAL && !isInSubNav ? 'bottomLeft' : 'rightTop',
        mouseEnterDelay: subNavOpenDelay,
        mouseLeaveDelay: subNavCloseDelay,
        onVisibleChange: this.handleDropdownVisible
      }, userDropdownProps ? userDropdownProps : subDropdownProps, dropdownProps), _elem)) : _elem;
    }
    return _elem;
  }
  render() {
    const {
      itemKey,
      style,
      onMouseEnter,
      onMouseLeave,
      disabled,
      text
    } = this.props;
    const {
      mode,
      isCollapsed,
      prefixCls
    } = this.context;
    let titleDiv = this.renderTitleDiv();
    const subUl = this.renderSubUl();
    // When mode=horizontal, it is displayed in Dropdown
    if (isCollapsed || mode === strings.MODE_HORIZONTAL) {
      titleDiv = this.wrapDropdown(titleDiv);
    }
    return (
      /*#__PURE__*/
      // Children is not a recommended usage and may cause some bug-like performance, but some users have already used it, so here we only delete the ts definition instead of deleting the actual code
      // children 并不是我们推荐的用法，可能会导致一些像 bug的表现，但是有些用户已经用了，所以此处仅作删除 ts 定义而非删除实际代码的操作
      // refer https://github.com/DouyinFE/semi-design/issues/2710
      // @ts-ignore    
      React.createElement(NavItem, {
        style: style,
        isSubNav: true,
        itemKey: itemKey,
        forwardRef: this.setItemRef,
        isCollapsed: isCollapsed,
        className: `${prefixCls}-sub-wrap`,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        disabled: disabled,
        text: text
      }, /*#__PURE__*/React.createElement(NavContext.Provider, {
        value: Object.assign(Object.assign({}, this.context), {
          isInSubNav: true
        })
      }, titleDiv, subUl))
    );
  }
}
SubNav.contextType = NavContext;
SubNav.propTypes = {
  /**
   * Unique identification
   */
  itemKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Copywriting
   */
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Whether child navigation is expanded
   */
  isOpen: PropTypes.bool,
  /**
   * Whether it is in the state of being stowed to the sidebar
   */
  isCollapsed: PropTypes.bool,
  /**
   * Whether to keep the left Icon placeholder
   */
  indent: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  /**
   * Nested child elements
   */
  children: PropTypes.node,
  style: PropTypes.object,
  /**
   * Icon name on the left
   */
  icon: PropTypes.node,
  /**
   * Maximum height (for animation)
   */
  maxHeight: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  // Is it disabled
  disabled: PropTypes.bool,
  level: PropTypes.number
};
SubNav.defaultProps = {
  level: 0,
  indent: false,
  isCollapsed: false,
  isOpen: false,
  maxHeight: numbers.DEFAULT_SUBNAV_MAX_HEIGHT,
  disabled: false
};