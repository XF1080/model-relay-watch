"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceWidget = void 0;
var _react = _interopRequireDefault(require("react"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatDialogue/constants");
var _semiIcons = require("@douyinfe/semi-icons");
var _index = require("../../../index");
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX_REFERENCES;
const referencePrefixCls = _constants.cssClasses.PREFIX_REFERENCE;
const {
  DOCUMENT_TYPES,
  IMAGE_TYPES,
  PDF_TYPES,
  EXCEL_TYPES,
  CODE_TYPES,
  VIDEO_TYPES
} = _constants.strings;
const ReferenceWidget = props => {
  const {
    references
  } = props;
  const renderReferenceIcon = name => {
    if (name) {
      const extension = name.split('.').pop();
      let icon = null;
      let type = '';
      if (DOCUMENT_TYPES.includes(extension)) {
        icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconWord, {
          size: "small"
        });
        type = 'word';
      } else if (PDF_TYPES.includes(extension)) {
        icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconPdf, {
          size: "small"
        });
        type = 'pdf';
      } else if (EXCEL_TYPES.includes(extension)) {
        icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconExcel, {
          size: "small"
        });
        type = 'excel';
      } else if (CODE_TYPES.includes(extension)) {
        icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconCode, {
          size: "small"
        });
        type = 'code';
      } else if (VIDEO_TYPES.includes(extension)) {
        icon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconVideo, {
          size: "small"
        });
        type = 'video';
      }
      return icon && /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)(`${referencePrefixCls}-icon`, {
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
      return /*#__PURE__*/_react.default.createElement(_index.Image, {
        className: `${referencePrefixCls}-img`,
        src: reference.url,
        width: 16,
        height: 16
      });
    }
    return null;
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: prefixCls
  }, references.map(reference => (
  /*#__PURE__*/
  // todo: 确认背景色和一行分布几个
  _react.default.createElement("div", {
    className: referencePrefixCls,
    key: reference.id
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconSendMsgStroked, null), /*#__PURE__*/_react.default.createElement("span", {
    className: `${referencePrefixCls}-content`
  }, renderReferenceIcon(reference.name), renderReferenceImage(reference), /*#__PURE__*/_react.default.createElement("span", {
    className: `${referencePrefixCls}-name`
  }, reference.name || reference.content))))));
};
exports.ReferenceWidget = ReferenceWidget;