import React, { useCallback } from 'react';
import { JsonViewer, CodeHighlight, Collapse, Button } from '../../index';
import cls from 'classnames';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/sidebar/constants';
import { IconCodeStroked, IconFullScreenStroked, IconFile } from '@douyinfe/semi-icons';
const collapseCls = cssClasses.COLLAPSE;
const prefixCls = cssClasses.SIDEBAR;
export const CodeItem = /*#__PURE__*/React.memo(props => {
  const {
    language,
    content,
    isJson,
    jsonViewerProps = {},
    codeHighlightProps = {}
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-code-content`
  }, isJson ? /*#__PURE__*/React.createElement(JsonViewer, Object.assign({
    height: '100%',
    width: '100%',
    value: content,
    showSearch: false,
    options: strings.JSON_VIEWER_OPTIONS
  }, jsonViewerProps)) : /*#__PURE__*/React.createElement(CodeHighlight, Object.assign({
    language: language,
    code: content
  }, codeHighlightProps)));
});
export const CollapseHeader = /*#__PURE__*/React.memo(props => {
  const {
    content,
    onExpand,
    mode
  } = props;
  const handleExpand = useCallback(e => {
    onExpand === null || onExpand === void 0 ? void 0 : onExpand(e, content, mode);
  }, [content, onExpand, mode]);
  return /*#__PURE__*/React.createElement("div", {
    className: `${collapseCls}-header-content`
  }, mode === 'code' ? /*#__PURE__*/React.createElement(IconCodeStroked, null) : /*#__PURE__*/React.createElement(IconFile, null), /*#__PURE__*/React.createElement("span", {
    className: `${collapseCls}-header-text`
  }, content.name), /*#__PURE__*/React.createElement(Button, {
    className: `${collapseCls}-header-expand-btn`,
    theme: 'borderless',
    type: 'tertiary',
    icon: /*#__PURE__*/React.createElement(IconFullScreenStroked, null),
    onClick: handleExpand
  }));
});
const CodeContent = /*#__PURE__*/React.memo(props => {
  const {
    activeKey,
    codes = [],
    onExpand,
    style,
    className,
    onChange
  } = props;
  return /*#__PURE__*/React.createElement(Collapse, {
    className: cls(collapseCls, `${collapseCls}-code`, {
      [className]: className
    }),
    style: style,
    onChange: onChange,
    activeKey: activeKey,
    clickHeaderToExpand: false
  }, codes.map(code => /*#__PURE__*/React.createElement(Collapse.Panel, {
    header: /*#__PURE__*/React.createElement(CollapseHeader, {
      content: code,
      onExpand: onExpand,
      mode: 'code'
    }),
    itemKey: code.key,
    key: code.key
  }, /*#__PURE__*/React.createElement(CodeItem, Object.assign({
    key: code.key
  }, code)))));
});
export default CodeContent;