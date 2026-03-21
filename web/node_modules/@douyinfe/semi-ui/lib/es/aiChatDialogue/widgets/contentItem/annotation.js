import React, { useCallback } from 'react';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
import { IconChevronRight } from '@douyinfe/semi-icons';
import AvatarGroup from '../../../avatar/avatarGroup';
import Avatar from '../../../avatar';
import LocaleConsumer from "../../../locale/localeConsumer";
const prefixCls = cssClasses.PREFIX_ANNOTATION;
export const AnnotationWidget = props => {
  const {
    annotation,
    description,
    maxCount,
    onClick
  } = props;
  const handleClick = useCallback(e => {
    onClick === null || onClick === void 0 ? void 0 : onClick(e, annotation);
  }, [annotation, onClick]);
  const renderMore = useCallback((restNumber, restAvatars) => {
    return /*#__PURE__*/React.createElement(Avatar, {
      className: `${prefixCls}-content-logo-renderMore`,
      size: "extra-extra-small",
      alt: 'more'
    }, `+${restNumber}`);
  }, []);
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
    className: `${prefixCls}-content`
  }, /*#__PURE__*/React.createElement(AvatarGroup, {
    maxCount: maxCount,
    size: "extra-extra-small",
    overlapFrom: 'end',
    renderMore: renderMore
  }, annotation.map((item, index) => {
    return item.logo && /*#__PURE__*/React.createElement(Avatar, {
      className: `${prefixCls}-content-logo`,
      key: index,
      src: item.logo,
      alt: item.title
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-content-description`
  }, description || (/*#__PURE__*/React.createElement(LocaleConsumer, {
    componentName: "AIChatDialogue"
  }, locale => `${annotation.length} ${locale.annotationText}`))), /*#__PURE__*/React.createElement("div", {
    className: `${prefixCls}-content-icon`
  }, /*#__PURE__*/React.createElement(IconChevronRight, null))));
};