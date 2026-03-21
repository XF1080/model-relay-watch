import _pick from "lodash/pick";
import _isEqual from "lodash/isEqual";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { createRef, isValidElement } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/tabs/constants';
import isNullOrUndefined from '@douyinfe/semi-foundation/lib/es/utils/isNullOrUndefined';
import TabsFoundation from '@douyinfe/semi-foundation/lib/es/tabs/foundation';
import BaseComponent from '../_base/baseComponent';
import '@douyinfe/semi-foundation/lib/es/tabs/tabs.css';
import TabBar from './TabBar';
import TabPane from './TabPane';
import TabItem from './TabItem';
import TabsContext from './tabs-context';
import { getDefaultPropsFromGlobalConfig } from "../_utils";
const panePickKeys = ['className', 'style', 'disabled', 'itemKey', 'tab', 'icon'];
export * from './interface';
class Tabs extends BaseComponent {
  constructor(props) {
    super(props);
    this.setContentRef = ref => {
      this.contentRef = {
        current: ref
      };
    };
    this.getPanes = () => {
      const {
        tabList,
        children
      } = this.props;
      if (Array.isArray(tabList) && tabList.length) {
        return tabList;
      }
      return React.Children.map(children, child => {
        if (child) {
          const {
            tab,
            icon,
            disabled,
            itemKey,
            closable
          } = child.props;
          return {
            tab,
            icon,
            disabled,
            itemKey,
            closable
          };
        }
        return undefined;
      });
    };
    this.onTabClick = (activeKey, event) => {
      this.foundation.handleTabClick(activeKey, event);
    };
    /* istanbul ignore next */
    this.rePosChildren = (children, activeKey) => {
      const newChildren = [];
      const falttenChildren = React.Children.toArray(children);
      if (children.length) {
        newChildren.push(...falttenChildren.filter(child => child.props && child.props.itemKey === activeKey));
        newChildren.push(...falttenChildren.filter(child => child.props && child.props.itemKey !== activeKey));
      }
      return newChildren;
    };
    this.getActiveItem = () => {
      const {
        activeKey
      } = this.state;
      const {
        children,
        tabList
      } = this.props;
      if (tabList || !Array.isArray(children)) {
        return children;
      }
      return React.Children.toArray(children).filter(pane => {
        if (/*#__PURE__*/isValidElement(pane) && pane.type && pane.type.isTabPane) {
          return pane.props.itemKey === activeKey;
        }
        return true;
      });
    };
    this.deleteTabItem = (tabKey, event) => {
      event.stopPropagation();
      this.foundation.handleTabDelete(tabKey);
    };
    this.foundation = new TabsFoundation(this.adapter);
    this.state = {
      activeKey: this.foundation.getDefaultActiveKey(),
      panes: this.getPanes(),
      prevActiveKey: null,
      forceDisableMotion: false
    };
    this.contentRef = /*#__PURE__*/createRef();
    this.contentHeight = 'auto';
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      collectPane: () => {
        const panes = this.getPanes();
        this.setState({
          panes
        });
      },
      collectActiveKey: () => {
        const {
          tabList,
          children,
          activeKey: propsActiveKey
        } = this.props;
        if (typeof propsActiveKey !== 'undefined') {
          return;
        }
        const {
          activeKey
        } = this.state;
        const panes = this.getPanes();
        if (panes.findIndex(p => p.itemKey === activeKey) === -1) {
          if (panes.length > 0) {
            this.setState({
              activeKey: panes[0].itemKey
            });
          } else {
            this.setState({
              activeKey: ''
            });
          }
        }
      },
      notifyTabClick: (activeKey, event) => {
        this.props.onTabClick(activeKey, event);
      },
      notifyChange: activeKey => {
        this.props.onChange(activeKey);
      },
      setNewActiveKey: activeKey => {
        this.setState({
          activeKey
        });
      },
      getDefaultActiveKeyFromChildren: () => {
        const {
          tabList,
          children
        } = this.props;
        let activeKey = '';
        const list = tabList ? tabList : React.Children.toArray(children).map(child => /*#__PURE__*/isValidElement(child) ? child.props : null);
        list.forEach(item => {
          if (item && !activeKey && !item.disabled) {
            activeKey = item.itemKey;
          }
        });
        return activeKey;
      },
      notifyTabDelete: tabKey => {
        this.props.onTabClose && this.props.onTabClose(tabKey);
      }
    });
  }
  static getDerivedStateFromProps(props, state) {
    const states = {};
    if (!isNullOrUndefined(props.activeKey) && props.activeKey !== state.activeKey) {
      state.prevActiveKey = state.activeKey;
      states.activeKey = props.activeKey;
    }
    return states;
  }
  componentDidUpdate(prevProps, prevState) {
    // Panes state acts on tab bar, no need to compare TabPane children
    const prevChildrenProps = React.Children.toArray(prevProps.children).map(child => _pick(/*#__PURE__*/isValidElement(child) ? child.props : null, panePickKeys));
    const nowChildrenProps = React.Children.toArray(this.props.children).map(child => _pick(/*#__PURE__*/isValidElement(child) ? child.props : null, panePickKeys));
    const isTabListType = this.props.tabList || prevProps.tabList;
    if (!_isEqual(this.props.tabList, prevProps.tabList)) {
      this.foundation.handleTabListChange();
    }
    if (prevState.activeKey !== this.state.activeKey && prevState.activeKey !== this.state.prevActiveKey) {
      this.setState({
        prevActiveKey: prevState.activeKey
      });
    }
    if (prevProps.activeKey !== this.props.activeKey) {
      const newAddedPanelItemKey = (() => {
        const prevItemKeys = new Set(prevChildrenProps.map(p => p.itemKey));
        return nowChildrenProps.map(p => p.itemKey).filter(itemKey => !prevItemKeys.has(itemKey));
      })();
      this.setState({
        forceDisableMotion: newAddedPanelItemKey.includes(this.props.activeKey)
      });
    }
    // children变化，tabList方式使用时，啥也不用做
    // children变化，非tabList方式使用，需要重新取activeKey。TabPane可能是异步更新的，若不重新取，未设activeKey时，第一个不会自动激活
    // children changed: do nothing in tabList case
    // children changed: recalc activeKey. TabPane could be updated async. If not recalc the first panel will not be activated
    if (!_isEqual(prevChildrenProps, nowChildrenProps) && !isTabListType) {
      this.foundation.handleTabPanesChange();
    }
  }
  render() {
    const _a = this.props,
      {
        children,
        className,
        collapsible,
        contentStyle,
        keepDOM,
        lazyRender,
        renderTabBar,
        showRestInDropdown,
        size,
        style,
        tabBarClassName,
        tabBarExtraContent,
        tabBarStyle,
        tabPaneMotion,
        tabPosition,
        type,
        more,
        onVisibleTabsChange,
        visibleTabsStyle,
        arrowPosition,
        renderArrow,
        dropdownProps
      } = _a,
      restProps = __rest(_a, ["children", "className", "collapsible", "contentStyle", "keepDOM", "lazyRender", "renderTabBar", "showRestInDropdown", "size", "style", "tabBarClassName", "tabBarExtraContent", "tabBarStyle", "tabPaneMotion", "tabPosition", "type", "more", "onVisibleTabsChange", "visibleTabsStyle", "arrowPosition", "renderArrow", "dropdownProps"]);
    const {
      panes,
      activeKey
    } = this.state;
    const tabWrapperCls = cls(className, {
      [cssClasses.TABS]: true,
      [`${cssClasses.TABS}-${tabPosition}`]: tabPosition
    });
    const tabContentCls = cls({
      [cssClasses.TABS_CONTENT]: true,
      [`${cssClasses.TABS_CONTENT}-${tabPosition}`]: tabPosition
    });
    const tabBarProps = {
      activeKey,
      className: tabBarClassName,
      collapsible,
      list: panes,
      onTabClick: this.onTabClick,
      showRestInDropdown,
      size,
      style: tabBarStyle,
      tabBarExtraContent,
      tabPosition,
      type,
      deleteTabItem: this.deleteTabItem,
      handleKeyDown: this.foundation.handleKeyDown,
      more,
      onVisibleTabsChange,
      visibleTabsStyle,
      arrowPosition,
      renderArrow,
      dropdownProps
    };
    const tabBar = renderTabBar ? renderTabBar(tabBarProps, TabBar) : /*#__PURE__*/React.createElement(TabBar, Object.assign({}, tabBarProps));
    const content = keepDOM ? children : this.getActiveItem();
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: tabWrapperCls,
      style: style
    }, this.getDataAttr(restProps)), tabBar, /*#__PURE__*/React.createElement(TabsContext.Provider, {
      value: {
        activeKey,
        lazyRender,
        panes,
        tabPaneMotion,
        tabPosition,
        prevActiveKey: this.state.prevActiveKey,
        forceDisableMotion: this.state.forceDisableMotion
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: this.setContentRef,
      className: tabContentCls,
      style: Object.assign({}, contentStyle)
    }, content)));
  }
}
Tabs.TabPane = TabPane;
Tabs.TabItem = TabItem;
Tabs.propTypes = {
  activeKey: PropTypes.string,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  contentStyle: PropTypes.oneOfType([PropTypes.object]),
  defaultActiveKey: PropTypes.string,
  keepDOM: PropTypes.bool,
  lazyRender: PropTypes.bool,
  onChange: PropTypes.func,
  onTabClick: PropTypes.func,
  renderTabBar: PropTypes.func,
  showRestInDropdown: PropTypes.bool,
  size: PropTypes.oneOf(strings.SIZE),
  style: PropTypes.object,
  tabBarClassName: PropTypes.string,
  tabBarExtraContent: PropTypes.node,
  tabBarStyle: PropTypes.object,
  tabList: PropTypes.array,
  tabPaneMotion: PropTypes.bool,
  tabPosition: PropTypes.oneOf(strings.POSITION_MAP),
  type: PropTypes.oneOf(strings.TYPE_MAP),
  onTabClose: PropTypes.func,
  preventScroll: PropTypes.bool,
  more: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  arrowPosition: PropTypes.string,
  renderArrow: PropTypes.func,
  dropdownProps: PropTypes.object
};
Tabs.__SemiComponentName__ = "Tabs";
Tabs.defaultProps = getDefaultPropsFromGlobalConfig(Tabs.__SemiComponentName__, {
  children: [],
  collapsible: false,
  keepDOM: true,
  lazyRender: false,
  onChange: () => undefined,
  onTabClick: () => undefined,
  size: 'large',
  tabPaneMotion: true,
  tabPosition: 'top',
  type: 'line',
  onTabClose: () => undefined,
  showRestInDropdown: true,
  arrowPosition: "both"
});
export default Tabs;