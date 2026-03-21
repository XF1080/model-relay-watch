import _isEqual from "lodash/isEqual";
import _get from "lodash/get";
import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import BaseComponent from '../_base/baseComponent';
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import NavigationFoundation from '@douyinfe/semi-foundation/lib/es/navigation/foundation';
import { strings, cssClasses, numbers } from '@douyinfe/semi-foundation/lib/es/navigation/constants';
import SubNav from './SubNav';
import Item from './Item';
import Footer from './Footer';
import Header from './Header';
import NavContext from './nav-context';
import LocaleConsumer from '../locale/localeConsumer';
import '@douyinfe/semi-foundation/lib/es/navigation/navigation.css';
import { getDefaultPropsFromGlobalConfig } from "../_utils";
function createAddKeysFn(context, keyName) {
  return function addKeys() {
    const handleKeys = new Set(context.state[keyName]);
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }
    keys.forEach(key => key && handleKeys.add(key));
    context.setState({
      [keyName]: Array.from(handleKeys)
    });
  };
}
function createRemoveKeysFn(context, keyName) {
  return function removeKeys() {
    const handleKeys = new Set(context.state[keyName]);
    for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      keys[_key2] = arguments[_key2];
    }
    keys.forEach(key => key && handleKeys.delete(key));
    context.setState({
      [keyName]: Array.from(handleKeys)
    });
  };
}
const {
  hasOwnProperty
} = Object.prototype;
class Nav extends BaseComponent {
  constructor(props) {
    super(props);
    this.onCollapseChange = () => {
      this.foundation.handleCollapseChange();
    };
    this.foundation = new NavigationFoundation(this.adapter);
    this.itemsChanged = true;
    const {
      isCollapsed,
      defaultIsCollapsed,
      items,
      children
    } = props;
    const initState = {
      isCollapsed: Boolean(this.isControlled('isCollapsed') ? isCollapsed : defaultIsCollapsed),
      // calc state
      openKeys: [],
      items: [],
      itemKeysMap: {},
      selectedKeys: []
    };
    this.state = Object.assign({}, initState);
    if (items && items.length || children) {
      const calcState = this.foundation.init('constructor');
      this.state = Object.assign(Object.assign({}, initState), calcState);
    }
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateState = {};
    if (hasOwnProperty.call(props, 'isCollapsed') && props.isCollapsed !== state.isCollapsed) {
      willUpdateState.isCollapsed = props.isCollapsed;
    }
    return willUpdateState;
  }
  componentDidMount() {
    // override BaseComponent
  }
  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items || prevProps.children !== this.props.children) {
      this.foundation.init();
    } else {
      this.foundation.handleItemsChange(false);
      if (this.props.selectedKeys && !_isEqual(prevProps.selectedKeys, this.props.selectedKeys)) {
        this.adapter.updateSelectedKeys(this.props.selectedKeys);
        const willOpenKeys = this.foundation.getWillOpenKeys(this.state.itemKeysMap);
        this.adapter.updateOpenKeys(willOpenKeys);
      }
      if (this.props.openKeys && !_isEqual(prevProps.openKeys, this.props.openKeys)) {
        this.adapter.updateOpenKeys(this.props.openKeys);
      }
    }
  }
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      notifySelect: function () {
        return _this.props.onSelect(...arguments);
      },
      notifyOpenChange: function () {
        return _this.props.onOpenChange(...arguments);
      },
      setIsCollapsed: isCollapsed => this.setState({
        isCollapsed
      }),
      notifyCollapseChange: function () {
        return _this.props.onCollapseChange(...arguments);
      },
      updateItems: items => this.setState({
        items: [...items]
      }),
      setItemKeysMap: itemKeysMap => this.setState({
        itemKeysMap: Object.assign({}, itemKeysMap)
      }),
      addSelectedKeys: createAddKeysFn(this, 'selectedKeys'),
      removeSelectedKeys: createRemoveKeysFn(this, 'selectedKeys'),
      /**
       * when `includeParentKeys` is `true`, select a nested nav item will select parent nav sub
       */
      updateSelectedKeys: function (selectedKeys) {
        let includeParentKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let willUpdateSelectedKeys = selectedKeys;
        if (includeParentKeys) {
          const parentSelectKeys = _this.foundation.selectLevelZeroParentKeys(null, selectedKeys);
          willUpdateSelectedKeys = Array.from(new Set(selectedKeys.concat(parentSelectKeys)));
        }
        _this.setState({
          selectedKeys: willUpdateSelectedKeys
        });
      },
      updateOpenKeys: openKeys => this.setState({
        openKeys: [...openKeys]
      }),
      addOpenKeys: createAddKeysFn(this, 'openKeys'),
      removeOpenKeys: createRemoveKeysFn(this, 'openKeys'),
      setItemsChanged: isChanged => {
        this.itemsChanged = isChanged;
      }
    });
  }
  /**
   * Render navigation items recursively
   *
   * @param {NavItem[]} items
   * @returns {JSX.Element}
   */
  renderItems() {
    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const {
      expandIcon,
      subDropdownProps
    } = this.props;
    const finalDom = /*#__PURE__*/React.createElement(React.Fragment, null, items.map((item, idx) => {
      if (Array.isArray(item.items) && item.items.length) {
        return /*#__PURE__*/React.createElement(SubNav, Object.assign({
          key: item.itemKey || String(level) + idx
        }, item, {
          level: level,
          expandIcon: expandIcon,
          subDropdownProps: subDropdownProps
        }), this.renderItems(item.items, level + 1));
      } else {
        return /*#__PURE__*/React.createElement(Item, Object.assign({
          key: item.itemKey || String(level) + idx
        }, item, {
          level: level
        }));
      }
    }));
    return finalDom;
  }
  render() {
    const _a = this.props,
      {
        children: originChildren,
        mode,
        onOpenChange,
        onSelect,
        onClick,
        style,
        className,
        subNavCloseDelay,
        subNavOpenDelay,
        subNavMotion,
        tooltipShowDelay,
        tooltipHideDelay,
        prefixCls,
        bodyStyle,
        footer,
        header,
        toggleIconPosition,
        limitIndent,
        renderWrapper,
        getPopupContainer
      } = _a,
      rest = __rest(_a, ["children", "mode", "onOpenChange", "onSelect", "onClick", "style", "className", "subNavCloseDelay", "subNavOpenDelay", "subNavMotion", "tooltipShowDelay", "tooltipHideDelay", "prefixCls", "bodyStyle", "footer", "header", "toggleIconPosition", "limitIndent", "renderWrapper", "getPopupContainer"]);
    const {
      selectedKeys,
      openKeys,
      items,
      isCollapsed
    } = this.state;
    const {
      updateOpenKeys,
      addOpenKeys,
      removeOpenKeys,
      updateSelectedKeys,
      addSelectedKeys,
      removeSelectedKeys
    } = this.adapter;
    const finalStyle = Object.assign({}, style);
    let children = Children.toArray(originChildren);
    const footers = [];
    const headers = [];
    if (/*#__PURE__*/React.isValidElement(footer)) {
      footers.push(/*#__PURE__*/React.createElement(Footer, {
        key: 0
      }, footer));
    } else if (footer && typeof footer === 'object') {
      footers.push(/*#__PURE__*/React.createElement(Footer, Object.assign({
        key: 0
      }, footer)));
    }
    if (/*#__PURE__*/React.isValidElement(header)) {
      headers.push(/*#__PURE__*/React.createElement(Header, {
        key: 0
      }, header));
    } else if (header && typeof header === 'object') {
      headers.push(/*#__PURE__*/React.createElement(Header, Object.assign({
        key: 0
      }, header)));
    }
    if (Array.isArray(children) && children.length) {
      children = [...children];
      let childrenLength = children.length;
      for (let i = 0; i < childrenLength; i++) {
        const child = children[i];
        if (child.type === Footer || _get(child, 'type.elementType') === 'NavFooter') {
          footers.push(child);
          children.splice(i, 1);
          i--;
          childrenLength--;
        } else if (child.type === Header || _get(child, 'type.elementType') === 'NavHeader') {
          headers.push(child);
          children.splice(i, 1);
          i--;
          childrenLength--;
        }
      }
    }
    const finalCls = cls(prefixCls, className, {
      [`${prefixCls}-collapsed`]: isCollapsed,
      [`${prefixCls}-horizontal`]: mode === 'horizontal',
      [`${prefixCls}-vertical`]: mode === 'vertical'
    });
    const headerListOuterCls = cls(`${prefixCls}-header-list-outer`, {
      [`${prefixCls}-header-list-outer-collapsed`]: isCollapsed
    });
    if (this.itemsChanged) {
      this.adapter.setCache('itemElems', this.renderItems(items));
    }
    return /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Navigation"
    }, locale => (/*#__PURE__*/React.createElement(NavContext.Provider, {
      value: {
        subNavCloseDelay,
        subNavOpenDelay,
        subNavMotion,
        tooltipShowDelay,
        tooltipHideDelay,
        openKeys,
        openKeysIsControlled: this.isControlled('openKeys') && mode === 'vertical' && !isCollapsed,
        // canUpdateOpenKeys: mode === 'vertical' && !isCollapsed,
        canUpdateOpenKeys: true,
        selectedKeys,
        selectedKeysIsControlled: this.isControlled('selectedKeys'),
        isCollapsed,
        onCollapseChange: this.onCollapseChange,
        mode,
        onSelect,
        onOpenChange,
        updateOpenKeys,
        addOpenKeys,
        removeOpenKeys,
        updateSelectedKeys,
        addSelectedKeys,
        removeSelectedKeys,
        onClick,
        locale,
        prefixCls,
        toggleIconPosition,
        limitIndent,
        renderWrapper,
        getPopupContainer
      }
    }, /*#__PURE__*/React.createElement("div", Object.assign({
      className: finalCls,
      style: finalStyle
    }, this.getDataAttr(rest)), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-inner`
    }, /*#__PURE__*/React.createElement("div", {
      className: headerListOuterCls
    }, headers, /*#__PURE__*/React.createElement("div", {
      style: bodyStyle,
      className: `${prefixCls}-list-wrapper`
    }, /*#__PURE__*/React.createElement("ul", {
      role: "menu",
      "aria-orientation": mode,
      className: `${prefixCls}-list`
    }, this.adapter.getCache('itemElems'), children))), footers)))));
  }
}
Nav.Sub = SubNav;
Nav.Item = Item;
Nav.Header = Header;
Nav.Footer = Footer;
Nav.propTypes = {
  collapseIcon: PropTypes.node,
  // Initial expanded SubNav navigation key array
  defaultOpenKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  openKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  // Initial selected navigation key array
  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  expandIcon: PropTypes.node,
  selectedKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  // Navigation type, now supports vertical, horizontal
  mode: PropTypes.oneOf([...strings.MODE]),
  // Triggered when selecting a navigation item
  onSelect: PropTypes.func,
  // Triggered when clicking a navigation item
  onClick: PropTypes.func,
  // SubNav expand/close callback
  onOpenChange: PropTypes.func,
  // Array of options (nested options can continue)
  items: PropTypes.array,
  // Is it in the state of being stowed to the sidebar
  isCollapsed: PropTypes.bool,
  defaultIsCollapsed: PropTypes.bool,
  onCollapseChange: PropTypes.func,
  multiple: PropTypes.bool,
  onDeselect: PropTypes.func,
  subNavMotion: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),
  subNavCloseDelay: PropTypes.number,
  subNavOpenDelay: PropTypes.number,
  tooltipShowDelay: PropTypes.number,
  tooltipHideDelay: PropTypes.number,
  children: PropTypes.node,
  style: PropTypes.object,
  bodyStyle: PropTypes.object,
  className: PropTypes.string,
  toggleIconPosition: PropTypes.string,
  prefixCls: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
  limitIndent: PropTypes.bool,
  getPopupContainer: PropTypes.func
};
Nav.__SemiComponentName__ = "Navigation";
Nav.defaultProps = getDefaultPropsFromGlobalConfig(Nav.__SemiComponentName__, {
  subNavCloseDelay: numbers.DEFAULT_SUBNAV_CLOSE_DELAY,
  subNavOpenDelay: numbers.DEFAULT_SUBNAV_OPEN_DELAY,
  tooltipHideDelay: numbers.DEFAULT_TOOLTIP_HIDE_DELAY,
  tooltipShowDelay: numbers.DEFAULT_TOOLTIP_SHOW_DELAY,
  onCollapseChange: _noop,
  onSelect: _noop,
  onClick: _noop,
  onOpenChange: _noop,
  toggleIconPosition: 'right',
  limitIndent: true,
  prefixCls: cssClasses.PREFIX,
  subNavMotion: true,
  // isOpen: false,
  mode: strings.MODE_VERTICAL
  // defaultOpenKeys: [],
  // defaultSelectedKeys: [],
  // items: [],
});
export default Nav;