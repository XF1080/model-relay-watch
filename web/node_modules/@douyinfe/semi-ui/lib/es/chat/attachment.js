import React from "react";
import Image from '../image';
import { IconAlertCircle, IconBriefStroked, IconClear } from '@douyinfe/semi-icons';
import { strings, cssClasses } from '@douyinfe/semi-foundation/lib/es/chat/constants';
import cls from 'classnames';
import { Progress } from "../index";
const {
  PREFIX_ATTACHMENT
} = cssClasses;
const {
  PIC_SUFFIX_ARRAY,
  PIC_PREFIX
} = strings;
export const FileAttachment = /*#__PURE__*/React.memo(props => {
  const {
    url,
    name,
    size,
    type
  } = props;
  return /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    className: `${PREFIX_ATTACHMENT}-file`,
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement(IconBriefStroked, {
    size: "extra-large",
    className: `${PREFIX_ATTACHMENT}-file-icon`
  }), /*#__PURE__*/React.createElement("div", {
    className: `${PREFIX_ATTACHMENT}-file-info`
  }, /*#__PURE__*/React.createElement("span", {
    className: `${PREFIX_ATTACHMENT}-file-title`
  }, name), /*#__PURE__*/React.createElement("span", {
    className: `${PREFIX_ATTACHMENT}-file-metadata`
  }, /*#__PURE__*/React.createElement("span", {
    className: `${PREFIX_ATTACHMENT}-file-type`
  }, type), type ? ' · ' : '', size)));
});
export const ImageAttachment = /*#__PURE__*/React.memo(props => {
  const {
    src
  } = props;
  return /*#__PURE__*/React.createElement(Image, {
    className: `${PREFIX_ATTACHMENT}-img`,
    width: 60,
    height: 60,
    src: src
  });
});
const Attachment = /*#__PURE__*/React.memo(props => {
  const {
    attachment,
    onClear,
    showClear = true,
    className
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    className: cls(PREFIX_ATTACHMENT, {
      [className]: className
    })
  }, attachment.map(item => {
    var _a, _b, _c, _d;
    const {
      percent,
      status
    } = item;
    const suffix = item === null || item === void 0 ? void 0 : item.name.split('.').pop();
    const isImg = ((_b = (_a = item === null || item === void 0 ? void 0 : item.fileInstance) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.startsWith(PIC_PREFIX)) || PIC_SUFFIX_ARRAY.includes(suffix);
    const realType = suffix !== null && suffix !== void 0 ? suffix : (_d = (_c = item === null || item === void 0 ? void 0 : item.fileInstance) === null || _c === void 0 ? void 0 : _c.type) === null || _d === void 0 ? void 0 : _d.split('/').pop();
    const showProcess = !(percent === 100 || typeof percent === 'undefined') && status === strings.FILE_STATUS.UPLOADING;
    return /*#__PURE__*/React.createElement("div", {
      className: `${PREFIX_ATTACHMENT}-item`,
      key: item.uid
    }, isImg ? (/*#__PURE__*/React.createElement(ImageAttachment, {
      src: item.url
    })) : (/*#__PURE__*/React.createElement(FileAttachment, {
      url: item.url,
      name: item.name,
      size: item.size,
      type: realType
    })), showClear && /*#__PURE__*/React.createElement(IconClear, {
      size: "large",
      className: `${PREFIX_ATTACHMENT}-clear`,
      onClick: () => {
        onClear && onClear(item);
      }
    }), showProcess && /*#__PURE__*/React.createElement(Progress, {
      percent: percent,
      type: "circle",
      size: "small",
      width: 30,
      className: `${PREFIX_ATTACHMENT}-process`,
      "aria-label": "upload progress"
    }), [strings.FILE_STATUS.UPLOAD_FAIL, strings.FILE_STATUS.VALID_FAIL].includes(status) && /*#__PURE__*/React.createElement(IconAlertCircle, {
      className: `${PREFIX_ATTACHMENT}-fail`
    }));
  }));
});
export default Attachment;