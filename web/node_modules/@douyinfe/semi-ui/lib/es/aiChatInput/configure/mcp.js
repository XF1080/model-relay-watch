var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { useCallback } from 'react';
import { Dropdown, Button } from '../../index';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatInput/constants';
import LocaleConsumer from '../../locale/localeConsumer';
// because there may be grouping or nested dropdown forms.
const Mcp = /*#__PURE__*/React.memo(props => {
  var _a;
  const {
      className,
      style,
      options = [],
      num = 0,
      children,
      onConfigureButtonClick,
      showConfigure = true
    } = props,
    rest = __rest(props, ["className", "style", "options", "num", "children", "onConfigureButtonClick", "showConfigure"]);
  const onClick = useCallback(e => {
    // Prevent accidental closing of dropdown when clicking Button
    e.stopPropagation();
  }, []);
  return /*#__PURE__*/React.createElement(Dropdown, Object.assign({
    style: style,
    className: cls({
      [className]: className,
      [`${cssClasses.PREFIX}-footer-configure-mcp`]: true
    })
  }, rest, {
    render: /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "AIChatInput"
    }, locale => {
      var _a;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.PREFIX}-footer-configure-mcp-header`
      }, /*#__PURE__*/React.createElement("span", {
        className: `${cssClasses.PREFIX}-footer-configure-mcp-header-title`
      }, locale.selected.replace('${count}', String((_a = options.length) !== null && _a !== void 0 ? _a : num))), showConfigure && /*#__PURE__*/React.createElement(Button, {
        theme: 'outline',
        className: `${cssClasses.PREFIX}-footer-configure-mcp-header-config`,
        onClick: onConfigureButtonClick
      }, locale.configure)), children ? children : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Dropdown.Menu, null, options.map(item => (/*#__PURE__*/React.createElement(Dropdown.Item, {
        key: item.value,
        icon: item.icon
      }, item.label))))));
    })
  }), /*#__PURE__*/React.createElement(Button, {
    theme: 'outline',
    type: 'tertiary',
    className: `${cssClasses.PREFIX}-footer-configure-mcp-trigger`,
    onClick: onClick
  }, "MCP \u00B7 ", (_a = options.length) !== null && _a !== void 0 ? _a : num));
});
export default Mcp;