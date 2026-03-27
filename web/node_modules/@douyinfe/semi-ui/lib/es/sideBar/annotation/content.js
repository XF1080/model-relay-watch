// import { Annotation } from '@douyinfe/semi-ui/aiChatDialogue';
import React from 'react';
import Item, { VideoItem } from './item';
import { Collapse } from '../../index';
import cls from 'classnames';
import { IconBookOpenStroked } from '@douyinfe/semi-icons';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/sidebar/constants';
const collapseCls = cssClasses.COLLAPSE;
const annotationCls = cssClasses.ANNOTATION;
const Content = /*#__PURE__*/React.memo(props => {
  const {
    info = [],
    activeKey,
    onChange,
    onClick,
    style,
    className,
    renderItem
  } = props;
  return /*#__PURE__*/React.createElement(Collapse, {
    className: cls(collapseCls, {
      [className]: className
    }),
    style: style,
    onChange: onChange,
    activeKey: activeKey,
    clickHeaderToExpand: false
  }, info.map(item => (/*#__PURE__*/React.createElement(Collapse.Panel, {
    header: /*#__PURE__*/React.createElement("div", {
      className: `${collapseCls}-header-content`
    }, /*#__PURE__*/React.createElement(IconBookOpenStroked, null), item.header),
    itemKey: item.key,
    key: item.key
  }, /*#__PURE__*/React.createElement("div", {
    className: `${annotationCls}-content`
  }, item.annotations.map((cite, index) => {
    if (renderItem) {
      return renderItem(cite);
    }
    if (cite.type === 'video') {
      return /*#__PURE__*/React.createElement(VideoItem, Object.assign({
        key: `${index}`,
        onClick: onClick
      }, cite));
    }
    return /*#__PURE__*/React.createElement(Item, Object.assign({
      key: `${index}`,
      onClick: onClick
    }, cite));
  }))))));
});
export default Content;