var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { forwardRef, useCallback, useMemo } from 'react';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/tabs/constants';
import { IconClose } from '@douyinfe/semi-icons';
const TabItem = (props, ref) => {
  const {
      tab,
      size,
      type,
      icon,
      selected,
      closable,
      disabled,
      itemKey,
      deleteTabItem,
      tabPosition,
      handleKeyDown,
      onClick
    } = props,
    restProps = __rest(props, ["tab", "size", "type", "icon", "selected", "closable", "disabled", "itemKey", "deleteTabItem", "tabPosition", "handleKeyDown", "onClick"]);
  const closableIcon = useMemo(() => {
    return closable ? /*#__PURE__*/React.createElement(IconClose, {
      "aria-label": "Close",
      role: "button",
      className: `${cssClasses.TABS_TAB}-icon-close`,
      onClick: e => deleteTabItem(itemKey, e)
    }) : null;
  }, [type, closable, deleteTabItem, itemKey]);
  const renderIcon = useCallback(icon => (/*#__PURE__*/React.createElement("span", {
    className: `${cssClasses.TABS_BAR}-icon`
  }, icon)), []);
  const handleKeyDownInItem = useCallback(event => {
    handleKeyDown && handleKeyDown(event, itemKey, closable);
  }, [handleKeyDown, itemKey, closable]);
  const handleItemClick = useCallback(e => {
    !disabled && onClick && onClick(itemKey, e);
  }, [itemKey, disabled, onClick]);
  const panelIcon = icon ? renderIcon(icon) : null;
  const className = cls(cssClasses.TABS_TAB, `${cssClasses.TABS_TAB}-${type}`, `${cssClasses.TABS_TAB}-${tabPosition}`, `${cssClasses.TABS_TAB}-single`, {
    [cssClasses.TABS_TAB_ACTIVE]: selected,
    [cssClasses.TABS_TAB_DISABLED]: disabled,
    [`${cssClasses.TABS_TAB}-small`]: size === 'small',
    [`${cssClasses.TABS_TAB}-medium`]: size === 'medium'
  });
  return /*#__PURE__*/React.createElement("div", Object.assign({
    role: "tab",
    id: `semiTab${itemKey}`,
    "data-tabkey": `semiTab${itemKey}`,
    "aria-controls": `semiTabPanel${itemKey}`,
    "aria-disabled": disabled ? 'true' : 'false',
    "aria-selected": selected ? 'true' : 'false',
    tabIndex: selected ? 0 : -1,
    onKeyDown: handleKeyDownInItem,
    onClick: handleItemClick,
    className: className
  }, restProps, {
    ref: ref
  }), panelIcon, tab, closableIcon);
};
// Why is forwardRef needed here？
// Because TabItem needs to be used in OverflowList （when tabs' type is collapsible), 
// OverflowList will pass ref to the outermost div DOM node of TabItem
const ForwardTabItem = /*#__PURE__*/forwardRef(TabItem);
// @ts-ignore 
ForwardTabItem.elementType = 'Tabs.TabItem';
export default ForwardTabItem;