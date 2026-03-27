import _nth from "lodash/nth";
import React, { useCallback, useMemo, useState } from 'react';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/chat/constants';
import copy from 'copy-text-to-clipboard';
import { IconCopyStroked, IconTick } from '@douyinfe/semi-icons';
import { code } from '../../markdownRender/components';
import LocaleConsumer from "../../locale/localeConsumer";
const {
  PREFIX_CHAT_BOX
} = cssClasses;
const Code = props => {
  const [copied, setCopied] = useState(false);
  const language = useMemo(() => {
    var _a;
    return _nth((_a = props.className) === null || _a === void 0 ? void 0 : _a.split("-"), -1);
  }, [props.className]);
  const onCopyButtonClick = useCallback(() => {
    copy(props.children);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [props.children]);
  return language ? (/*#__PURE__*/React.createElement("div", {
    className: `${PREFIX_CHAT_BOX}-content-code semi-always-dark`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot`
  }, /*#__PURE__*/React.createElement("span", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot-type`
  }, language), /*#__PURE__*/React.createElement("span", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot-copy`
  }, copied ? (/*#__PURE__*/React.createElement("span", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot-copy-wrapper`
  }, /*#__PURE__*/React.createElement(IconTick, null), /*#__PURE__*/React.createElement(LocaleConsumer, {
    componentName: "Chat"
  }, locale => locale['copied']))) : (/*#__PURE__*/React.createElement("button", {
    className: `${PREFIX_CHAT_BOX}-content-code-topSlot-copy-wrapper ${PREFIX_CHAT_BOX}-content-code-topSlot-toCopy`,
    onClick: onCopyButtonClick
  }, /*#__PURE__*/React.createElement(IconCopyStroked, null), /*#__PURE__*/React.createElement(LocaleConsumer, {
    componentName: "Chat"
  }, locale => locale['copy']))))), code(props))) : code(props);
};
export default Code;