import _nth from "lodash/nth";
import React, { useCallback, useMemo, useState } from 'react';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
import copy from 'copy-text-to-clipboard';
import { IconCopyStroked, IconTick } from '@douyinfe/semi-icons';
import { code } from '../../../markdownRender/components';
const {
  PREFIX_CODE
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
    className: `${PREFIX_CODE}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `${PREFIX_CODE}-topSlot`
  }, /*#__PURE__*/React.createElement("span", {
    className: `${PREFIX_CODE}-topSlot-type`
  }, language), /*#__PURE__*/React.createElement("span", {
    className: `${PREFIX_CODE}-topSlot-copy`
  }, copied ? (/*#__PURE__*/React.createElement("button", {
    className: `${PREFIX_CODE}-topSlot-copy-wrapper`
  }, /*#__PURE__*/React.createElement(IconTick, null))) : (/*#__PURE__*/React.createElement("button", {
    className: `${PREFIX_CODE}-topSlot-copy-wrapper`,
    onClick: onCopyButtonClick
  }, /*#__PURE__*/React.createElement(IconCopyStroked, null))))), code(props))) : code(props);
};
export default Code;