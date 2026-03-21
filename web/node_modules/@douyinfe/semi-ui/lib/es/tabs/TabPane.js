var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/tabs/constants';
import getDataAttr from '@douyinfe/semi-foundation/lib/es/utils/getDataAttr';
import TabsContext from './tabs-context';
import CSSAnimation from "../_cssAnimation";
class TabPane extends PureComponent {
  constructor() {
    super(...arguments);
    this.ref = /*#__PURE__*/createRef();
    // get direction from current item key to activeKey
    this.getDirection = (activeKey, itemKey, panes, lastActiveKey) => {
      if (itemKey !== null && activeKey !== null && Array.isArray(panes) && panes.length) {
        const activeIndex = panes.findIndex(pane => pane.itemKey === activeKey);
        const itemIndex = panes.findIndex(pane => pane.itemKey === itemKey);
        const lastActiveIndex = panes.findIndex(pane => pane.itemKey === lastActiveKey);
        if (activeIndex === itemIndex) {
          return lastActiveIndex > activeIndex;
        } else {
          return itemIndex < activeIndex;
        }
      }
      return false;
    };
    this.shouldRender = () => {
      const {
        itemKey
      } = this.props;
      const {
        activeKey,
        lazyRender
      } = this.context;
      const active = activeKey === itemKey;
      this._active = this._active || active;
      return lazyRender ? this._active : true;
    };
  }
  render() {
    const {
      tabPaneMotion: motion,
      tabPosition,
      prevActiveKey
    } = this.context;
    const _a = this.props,
      {
        className,
        style,
        children,
        itemKey,
        tabIndex
      } = _a,
      restProps = __rest(_a, ["className", "style", "children", "itemKey", "tabIndex"]);
    const active = this.context.activeKey === itemKey;
    const classNames = cls(className, {
      [cssClasses.TABS_PANE_INACTIVE]: !active,
      [cssClasses.TABS_PANE_ACTIVE]: active,
      [cssClasses.TABS_PANE]: true
    });
    const shouldRender = this.shouldRender();
    const startClassName = (() => {
      const direction = this.getDirection(this.context.activeKey, itemKey, this.context.panes, prevActiveKey);
      if (tabPosition === 'top') {
        if (direction) {
          return cssClasses.TABS_PANE_ANIMATE_RIGHT_SHOW;
        } else {
          return cssClasses.TABS_PANE_ANIMATE_LEFT_SHOW;
        }
      } else {
        if (direction) {
          return cssClasses.TABS_PANE_ANIMATE_BOTTOM_SHOW;
        } else {
          return cssClasses.TABS_PANE_ANIMATE_TOP_SHOW;
        }
      }
    })();
    const isActivatedBecauseOtherTabPaneRemoved = !this.context.panes.find(tabPane => tabPane.itemKey === prevActiveKey);
    const hasMotion = motion && active && !isActivatedBecauseOtherTabPaneRemoved && !this.context.forceDisableMotion;
    return /*#__PURE__*/React.createElement("div", Object.assign({
      ref: this.ref,
      role: "tabpanel",
      id: `semiTabPanel${itemKey}`,
      "aria-labelledby": `semiTab${itemKey}`,
      className: classNames,
      style: style,
      "aria-hidden": active ? 'false' : 'true',
      tabIndex: tabIndex ? tabIndex : 0
    }, getDataAttr(restProps), {
      "x-semi-prop": "children"
    }), /*#__PURE__*/React.createElement(CSSAnimation, {
      motion: hasMotion,
      animationState: active ? "enter" : "leave",
      startClassName: startClassName
    }, _ref => {
      let {
        animationClassName,
        animationEventsNeedBind
      } = _ref;
      return /*#__PURE__*/React.createElement("div", Object.assign({
        className: cls(cssClasses.TABS_PANE_MOTION_OVERLAY, animationClassName),
        "x-semi-prop": "children"
      }, animationEventsNeedBind), shouldRender ? children : null);
    }));
  }
}
TabPane.isTabPane = true;
TabPane.contextType = TabsContext;
TabPane.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  itemKey: PropTypes.string,
  tab: PropTypes.node,
  icon: PropTypes.node,
  closable: PropTypes.bool
};
export default TabPane;