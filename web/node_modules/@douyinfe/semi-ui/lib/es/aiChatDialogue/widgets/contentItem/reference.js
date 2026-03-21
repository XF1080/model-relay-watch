import React from 'react';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
import { IconCode, IconWord, IconExcel, IconPdf, IconSendMsgStroked, IconVideo } from '@douyinfe/semi-icons';
import { Image } from '../../../index';
import cls from 'classnames';
const prefixCls = cssClasses.PREFIX_REFERENCES;
const referencePrefixCls = cssClasses.PREFIX_REFERENCE;
const {
  DOCUMENT_TYPES,
  IMAGE_TYPES,
  PDF_TYPES,
  EXCEL_TYPES,
  CODE_TYPES,
  VIDEO_TYPES
} = strings;
export const ReferenceWidget = props => {
  const {
    references
  } = props;
  const renderReferenceIcon = name => {
    if (name) {
      const extension = name.split('.').pop();
      let icon = null;
      let type = '';
      if (DOCUMENT_TYPES.includes(extension)) {
        icon = /*#__PURE__*/React.createElement(IconWord, {
          size: "small"
        });
        type = 'word';
      } else if (PDF_TYPES.includes(extension)) {
        icon = /*#__PURE__*/React.createElement(IconPdf, {
          size: "small"
        });
        type = 'pdf';
      } else if (EXCEL_TYPES.includes(extension)) {
        icon = /*#__PURE__*/React.createElement(IconExcel, {
          size: "small"
        });
        type = 'excel';
      } else if (CODE_TYPES.includes(extension)) {
        icon = /*#__PURE__*/React.createElement(IconCode, {
          size: "small"
        });
        type = 'code';
      } else if (VIDEO_TYPES.includes(extension)) {
        icon = /*#__PURE__*/React.createElement(IconVideo, {
          size: "small"
        });
        type = 'video';
      }
      return icon && /*#__PURE__*/React.createElement("span", {
        className: cls(`${referencePrefixCls}-icon`, {
          [`${referencePrefixCls}-icon-${type}`]: type
        })
      }, icon);
    }
    return null;
  };
  const isImage = name => {
    if (name) {
      const extension = name.split('.').pop();
      return IMAGE_TYPES.includes(extension);
    }
    return false;
  };
  const renderReferenceImage = reference => {
    if (reference.url && isImage(reference.name)) {
      return /*#__PURE__*/React.createElement(Image, {
        className: `${referencePrefixCls}-img`,
        src: reference.url,
        width: 16,
        height: 16
      });
    }
    return null;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: prefixCls
  }, references.map(reference => (
  /*#__PURE__*/
  // todo: 确认背景色和一行分布几个
  React.createElement("div", {
    className: referencePrefixCls,
    key: reference.id
  }, /*#__PURE__*/React.createElement(IconSendMsgStroked, null), /*#__PURE__*/React.createElement("span", {
    className: `${referencePrefixCls}-content`
  }, renderReferenceIcon(reference.name), renderReferenceImage(reference), /*#__PURE__*/React.createElement("span", {
    className: `${referencePrefixCls}-name`
  }, reference.name || reference.content))))));
};