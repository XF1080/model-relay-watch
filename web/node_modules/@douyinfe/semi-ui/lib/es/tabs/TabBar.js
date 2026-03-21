import _pick from "lodash/pick";
import _isEmpty from "lodash/isEmpty";
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
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/tabs/constants';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
import OverflowList from '../overflowList';
import Dropdown from '../dropdown';
import Button from '../button';
import { IconChevronRight, IconChevronLeft, IconChevronDown } from '@douyinfe/semi-icons';
import { getUuidv4 } from '@douyinfe/semi-foundation/lib/es/utils/uuid';
import TabItem from './TabItem';
import LocaleConsumer from "../locale/localeConsumer";
class TabBar extends React.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    this.handleItemClick = (itemKey, e) => {
      this.props.onTabClick(itemKey, e);
    };
    this.handleKeyDown = (event, itemKey, closable) => {
      this.props.handleKeyDown(event, itemKey, closable);
    };
    this.renderTabItem = panel => {
      const {
        size,
        type,
        deleteTabItem,
        handleKeyDown,
        tabPosition
      } = this.props;
      const isSelected = this._isActive(panel.itemKey);
      return /*#__PURE__*/React.createElement(TabItem, Object.assign({}, _pick(panel, ['disabled', 'icon', 'itemKey', 'tab', 'closable']), {
        key: this._getBarItemKeyByItemKey(panel.itemKey),
        selected: isSelected,
        size: size,
        type: type,
        tabPosition: tabPosition,
        handleKeyDown: handleKeyDown,
        deleteTabItem: deleteTabItem,
        onClick: this.handleItemClick
      }));
    };
    this.scrollTabItemIntoViewByKey = function (key) {
      let logicalPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'nearest';
      let behavior = arguments.length > 2 ? arguments[2] : undefined;
      const tabItem = document.querySelector(`[data-uuid="${_this.state.uuid}"] .${cssClasses.TABS_TAB}[data-scrollkey="${key}"]`);
      tabItem === null || tabItem === void 0 ? void 0 : tabItem.scrollIntoView({
        behavior: behavior || 'smooth',
        block: logicalPosition,
        inline: logicalPosition
      });
    };
    this.scrollActiveTabItemIntoView = (logicalPosition, behavior) => {
      const key = this._getBarItemKeyByItemKey(this.props.activeKey);
      this.scrollTabItemIntoViewByKey(key, logicalPosition, behavior);
    };
    this.renderTabComponents = list => list.map(panel => this.renderTabItem(panel));
    this.handleArrowClick = (items, pos) => {
      const lastItem = pos === 'start' ? items.pop() : items.shift();
      if (!lastItem) {
        return;
      }
      const key = this._getBarItemKeyByItemKey(lastItem.itemKey);
      this.scrollTabItemIntoViewByKey(key);
    };
    this.renderCollapse = (items, icon, pos) => {
      var _a;
      const arrowCls = cls({
        [`${cssClasses.TABS_BAR}-arrow-${pos}`]: pos,
        [`${cssClasses.TABS_BAR}-arrow`]: true
      });
      if (_isEmpty(items)) {
        return /*#__PURE__*/React.createElement("div", {
          role: "presentation",
          className: arrowCls
        }, /*#__PURE__*/React.createElement(Button, {
          disabled: true,
          icon: icon,
          theme: "borderless"
        }));
      }
      const {
        dropdownClassName,
        dropdownStyle,
        showRestInDropdown,
        dropdownProps
      } = this.props;
      const {
        rePosKey
      } = this.state;
      const disabled = !items.length;
      const menu = /*#__PURE__*/React.createElement(Dropdown.Menu, null, items.map(panel => {
        const {
          icon: i,
          tab,
          itemKey
        } = panel;
        const panelIcon = i ? this.renderIcon(panel.icon) : null;
        return /*#__PURE__*/React.createElement(Dropdown.Item, {
          key: itemKey,
          onClick: e => this.handleItemClick(itemKey, e),
          active: this._isActive(itemKey)
        }, panelIcon, tab);
      }));
      const button = /*#__PURE__*/React.createElement("div", {
        role: "presentation",
        className: arrowCls,
        onClick: e => this.handleArrowClick(items, pos)
      }, /*#__PURE__*/React.createElement(Button, {
        disabled: disabled,
        icon: icon,
        theme: "borderless"
      }));
      const dropdownCls = cls(dropdownClassName, {
        [`${cssClasses.TABS_BAR}-dropdown`]: true
      });
      const customDropdownProps = (_a = dropdownProps === null || dropdownProps === void 0 ? void 0 : dropdownProps[pos]) !== null && _a !== void 0 ? _a : {};
      return /*#__PURE__*/React.createElement(React.Fragment, null, showRestInDropdown ? (/*#__PURE__*/React.createElement(Dropdown, Object.assign({
        className: dropdownCls,
        clickToHide: true,
        clickTriggerToHide: true,
        key: `${rePosKey}-${pos}`,
        position: pos === 'start' ? 'bottomLeft' : 'bottomRight',
        render: disabled ? null : menu,
        showTick: true,
        style: dropdownStyle,
        trigger: 'hover',
        disableFocusListener // prevent the panel from popping up again after clicking
        : true
      }, customDropdownProps), button)) : button);
    };
    this.renderOverflow = items => items.map((item, index) => {
      const pos = index === 0 ? 'start' : 'end';
      const icon = index === 0 ? /*#__PURE__*/React.createElement(IconChevronLeft, null) : /*#__PURE__*/React.createElement(IconChevronRight, null);
      const overflowNode = this.renderCollapse(item, icon, pos);
      if (this.props.renderArrow) {
        return this.props.renderArrow(item, pos, () => this.handleArrowClick(item, pos), overflowNode);
      }
      return overflowNode;
    });
    this.renderCollapsedTab = () => {
      const {
        list
      } = this.props;
      const renderedList = list.map(item => {
        const {
          itemKey
        } = item;
        return Object.assign({
          key: this._getBarItemKeyByItemKey(itemKey),
          active: this._isActive(itemKey)
        }, item);
      });
      return /*#__PURE__*/React.createElement(OverflowList, {
        items: renderedList,
        overflowRenderDirection: this.props.arrowPosition,
        wrapperStyle: this.props.visibleTabsStyle,
        overflowRenderer: this.renderOverflow,
        renderMode: "scroll",
        className: `${cssClasses.TABS_BAR}-overflow-list`,
        visibleItemRenderer: this.renderTabItem,
        onVisibleStateChange: visibleMap => {
          var _a, _b;
          const visibleMapWithItemKey = new Map();
          visibleMap.forEach((v, k) => {
            visibleMapWithItemKey.set(this._getItemKeyByBarItemKey(k), v);
          });
          // only when the tabs component appears in the viewport for the first time triggered scrollActiveTabItemIntoView
          // refer to issue 2917 https://github.com/DouyinFE/semi-design/issues/2917
          if (this.isFirstShowInViewport) {
            const isShowInViewport = Array.from(visibleMapWithItemKey.values()).some(item => item);
            if (isShowInViewport) {
              this.scrollActiveTabItemIntoView('nearest', 'auto');
              this.isFirstShowInViewport = false;
            }
          }
          (_b = (_a = this.props).onVisibleTabsChange) === null || _b === void 0 ? void 0 : _b.call(_a, visibleMapWithItemKey);
        }
      });
    };
    this.renderWithMoreTrigger = () => {
      const {
        list,
        more
      } = this.props;
      let tabElements = [];
      let moreTrigger = /*#__PURE__*/React.createElement("div", {
        className: cls({
          [`${cssClasses.TABS_BAR}-more-trigger`]: true,
          [`${cssClasses.TABS_BAR}-more-trigger-${this.props.type}`]: true
        })
      }, /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Tabs"
      }, (locale, localeCode) => (/*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.TABS_BAR}-more-trigger-content`
      }, /*#__PURE__*/React.createElement("div", null, locale.more), /*#__PURE__*/React.createElement(IconChevronDown, {
        className: `${cssClasses.TABS_BAR}-more-trigger-content-icon`
      })))));
      let keepCount;
      if (typeof more === "number") {
        keepCount = list.length - Math.min(more, list.length);
        tabElements = list.slice(0, keepCount).map(panel => this.renderTabItem(panel));
      } else if (typeof more === 'object') {
        keepCount = list.length - Math.min(more.count, list.length);
        tabElements = list.slice(0, keepCount).map(panel => this.renderTabItem(panel));
        if (more.render) {
          moreTrigger = more.render();
        }
      } else if (more !== undefined) {
        throw new Error("[Semi Tabs]: invalid tab props format: more");
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, tabElements, this.renderMoreDropdown(list.slice(keepCount), more === null || more === void 0 ? void 0 : more['dropdownProps'], moreTrigger));
    };
    this.renderMoreDropdown = (panels, dropDownProps, trigger) => {
      return /*#__PURE__*/React.createElement(Dropdown, Object.assign({
        trigger: 'hover',
        showTick: true,
        position: 'bottomLeft',
        className: `${cssClasses.TABS_BAR}-more-dropdown-${this.props.type}`,
        clickToHide: true,
        menu: panels.map(panel => ({
          node: 'item',
          name: panel.tab,
          icon: panel.icon,
          onClick: e => this.props.onTabClick(panel.itemKey, e),
          active: this.props.activeKey === panel.itemKey
        }))
      }, dropDownProps), trigger);
    };
    this._isActive = key => key === this.props.activeKey;
    this._getBarItemKeyByItemKey = key => `${key}-bar`;
    this._getItemKeyByBarItemKey = key => key.replace(/-bar$/, "");
    this.state = {
      endInd: props.list.length,
      rePosKey: 0,
      startInd: 0,
      uuid: '',
      currentVisibleItems: []
    };
    this.isFirstShowInViewport = true;
  }
  componentDidMount() {
    this.setState({
      uuid: getUuidv4()
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.activeKey !== this.props.activeKey) {
      if (this.props.collapsible) {
        this.scrollActiveTabItemIntoView();
      }
    }
  }
  renderIcon(icon) {
    return /*#__PURE__*/React.createElement("span", null, icon);
  }
  renderExtra() {
    const {
      tabBarExtraContent,
      type,
      size
    } = this.props;
    const tabBarExtraContentDefaultStyle = {
      float: 'right'
    };
    const tabBarExtraContentStyle = tabBarExtraContent && tabBarExtraContent.props ? tabBarExtraContent.props.style : {};
    const extraCls = cls(cssClasses.TABS_BAR_EXTRA, {
      [`${cssClasses.TABS_BAR}-${type}-extra`]: type,
      [`${cssClasses.TABS_BAR}-${type}-extra-${size}`]: size
    });
    if (tabBarExtraContent) {
      const tabBarStyle = Object.assign(Object.assign({}, tabBarExtraContentDefaultStyle), tabBarExtraContentStyle);
      return /*#__PURE__*/React.createElement("div", {
        className: extraCls,
        style: tabBarStyle,
        "x-semi-prop": "tabBarExtraContent"
      }, tabBarExtraContent);
    }
    return null;
  }
  render() {
    const _a = this.props,
      {
        type,
        style,
        className,
        list,
        tabPosition,
        more,
        collapsible
      } = _a,
      restProps = __rest(_a, ["type", "style", "className", "list", "tabPosition", "more", "collapsible"]);
    const classNames = cls(className, {
      [cssClasses.TABS_BAR]: true,
      [cssClasses.TABS_BAR_LINE]: type === 'line',
      [cssClasses.TABS_BAR_CARD]: type === 'card',
      [cssClasses.TABS_BAR_BUTTON]: type === 'button',
      [cssClasses.TABS_BAR_SLASH]: type === 'slash',
      [`${cssClasses.TABS_BAR}-${tabPosition}`]: tabPosition,
      [`${cssClasses.TABS_BAR}-collapse`]: collapsible
    });
    const extra = this.renderExtra();
    const contents = collapsible ? this.renderCollapsedTab() : more ? this.renderWithMoreTrigger() : this.renderTabComponents(list);
    return /*#__PURE__*/React.createElement("div", Object.assign({
      role: "tablist",
      "aria-orientation": tabPosition === "left" ? "vertical" : "horizontal",
      className: classNames,
      style: style
    }, getDataAttr(restProps), {
      "data-uuid": this.state.uuid
    }), contents, extra);
  }
}
TabBar.propTypes = {
  activeKey: PropTypes.string,
  className: PropTypes.string,
  collapsible: PropTypes.bool,
  list: PropTypes.array,
  onTabClick: PropTypes.func,
  size: PropTypes.oneOf(strings.SIZE),
  style: PropTypes.object,
  tabBarExtraContent: PropTypes.node,
  tabPosition: PropTypes.oneOf(strings.POSITION_MAP),
  type: PropTypes.oneOf(strings.TYPE_MAP),
  closable: PropTypes.bool,
  deleteTabItem: PropTypes.func,
  more: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};
export default TabBar;