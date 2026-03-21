"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ImageAttachment = exports.FileAttachment = void 0;
var _react = _interopRequireDefault(require("react"));
var _image = _interopRequireDefault(require("../image"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/chat/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _index = require("../index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  PREFIX_ATTACHMENT
} = _constants.cssClasses;
const {
  PIC_SUFFIX_ARRAY,
  PIC_PREFIX
} = _constants.strings;
const FileAttachment = exports.FileAttachment = /*#__PURE__*/_react.default.memo(props => {
  const {
    url,
    name,
    size,
    type
  } = props;
  return /*#__PURE__*/_react.default.createElement("a", {
    href: url,
    target: "_blank",
    className: `${PREFIX_ATTACHMENT}-file`,
    rel: "noreferrer"
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconBriefStroked, {
    size: "extra-large",
    className: `${PREFIX_ATTACHMENT}-file-icon`
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: `${PREFIX_ATTACHMENT}-file-info`
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: `${PREFIX_ATTACHMENT}-file-title`
  }, name), /*#__PURE__*/_react.default.createElement("span", {
    className: `${PREFIX_ATTACHMENT}-file-metadata`
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: `${PREFIX_ATTACHMENT}-file-type`
  }, type), type ? ' · ' : '', size)));
});
const ImageAttachment = exports.ImageAttachment = /*#__PURE__*/_react.default.memo(props => {
  const {
    src
  } = props;
  return /*#__PURE__*/_react.default.createElement(_image.default, {
    className: `${PREFIX_ATTACHMENT}-img`,
    width: 60,
    height: 60,
    src: src
  });
});
const Attachment = /*#__PURE__*/_react.default.memo(props => {
  const {
    attachment,
    onClear,
    showClear = true,
    className
  } = props;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(PREFIX_ATTACHMENT, {
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
    const showProcess = !(percent === 100 || typeof percent === 'undefined') && status === _constants.strings.FILE_STATUS.UPLOADING;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `${PREFIX_ATTACHMENT}-item`,
      key: item.uid
    }, isImg ? (/*#__PURE__*/_react.default.createElement(ImageAttachment, {
      src: item.url
    })) : (/*#__PURE__*/_react.default.createElement(FileAttachment, {
      url: item.url,
      name: item.name,
      size: item.size,
      type: realType
    })), showClear && /*#__PURE__*/_react.default.createElement(_semiIcons.IconClear, {
      size: "large",
      className: `${PREFIX_ATTACHMENT}-clear`,
      onClick: () => {
        onClear && onClear(item);
      }
    }), showProcess && /*#__PURE__*/_react.default.createElement(_index.Progress, {
      percent: percent,
      type: "circle",
      size: "small",
      width: 30,
      className: `${PREFIX_ATTACHMENT}-process`,
      "aria-label": "upload progress"
    }), [_constants.strings.FILE_STATUS.UPLOAD_FAIL, _constants.strings.FILE_STATUS.VALID_FAIL].includes(status) && /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertCircle, {
      className: `${PREFIX_ATTACHMENT}-fail`
    }));
  }));
});
var _default = exports.default = Attachment;