import React, { useState, useCallback } from 'react';
import Collapsible from '../../../collapsible';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
import { IconChevronDown, IconChevronUp, IconAISearchLevel2 } from '@douyinfe/semi-icons';
import MarkdownRender from '../../../markdownRender';
import LocaleConsumer from '../../../locale/localeConsumer';
const prefixCls = cssClasses.PREFIX_REASONING;
export const ReasoningWidget = props => {
  const {
    status,
    summary,
    content,
    markdownRenderProps,
    customRenderer
  } = props;
  const defaultOpen = status !== 'completed';
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const getText = useCallback(() => {
    if (summary && summary.length > 0) {
      return summary.map(item => item.text).join('\n');
    } else if (content && content.length > 0) {
      return content.map(item => item.text).join('\n');
    }
    return '';
  }, [summary, content]);
  const handleKeyDown = useCallback(e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    className: `${prefixCls}-wrapper`,
    onClick: handleClick,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-header`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-header-prefix`
  }, /*#__PURE__*/React.createElement(IconAISearchLevel2, null)), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-header-title`
  }, /*#__PURE__*/React.createElement(LocaleConsumer, {
    componentName: "AIChatDialogue"
  }, locale => status === 'completed' ? locale['reasoning']['completed'] : locale['reasoning']['thinking'])), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-header-suffix`
  }, isOpen ? /*#__PURE__*/React.createElement(IconChevronUp, {
    onClick: handleClick
  }) : /*#__PURE__*/React.createElement(IconChevronDown, {
    onClick: handleClick
  }))), /*#__PURE__*/React.createElement(Collapsible, {
    isOpen: isOpen
  }, /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-content`
  }, customRenderer ? customRenderer(props) : (/*#__PURE__*/React.createElement(MarkdownRender, Object.assign({
    format: 'md',
    raw: getText()
  }, markdownRenderProps))))));
};