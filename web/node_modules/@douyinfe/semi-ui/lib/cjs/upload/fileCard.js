"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/upload/constants");
var _fileCardFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/upload/fileCardFoundation"));
var _utils = require("@douyinfe/semi-foundation/lib/cjs/upload/utils");
var _semiIcons = require("@douyinfe/semi-icons");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _index = _interopRequireDefault(require("../button/index"));
var _index2 = _interopRequireDefault(require("../progress/index"));
var _index3 = _interopRequireDefault(require("../tooltip/index"));
var _index4 = _interopRequireDefault(require("../spin/index"));
var _reactUtils = require("../_base/reactUtils");
var _typography = _interopRequireDefault(require("../typography"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
const ErrorSvg = function () {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/_react.default.createElement("svg", Object.assign({
    focusable: false,
    "aria-hidden": true,
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "7.99992",
    cy: "7.99992",
    r: "6.66667",
    fill: "white"
  }), /*#__PURE__*/_react.default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M15.3332 8.00008C15.3332 12.0502 12.0499 15.3334 7.99984 15.3334C3.94975 15.3334 0.666504 12.0502 0.666504 8.00008C0.666504 3.94999 3.94975 0.666748 7.99984 0.666748C12.0499 0.666748 15.3332 3.94999 15.3332 8.00008ZM8.99984 11.6667C8.99984 11.1145 8.55212 10.6667 7.99984 10.6667C7.44755 10.6667 6.99984 11.1145 6.99984 11.6667C6.99984 12.219 7.44755 12.6667 7.99984 12.6667C8.55212 12.6667 8.99984 12.219 8.99984 11.6667ZM7.99984 3.33341C7.27573 3.33341 6.7003 3.94171 6.74046 4.66469L6.94437 8.33495C6.97549 8.89513 7.4388 9.33341 7.99984 9.33341C8.56087 9.33341 9.02419 8.89513 9.05531 8.33495L9.25921 4.66469C9.29938 3.94171 8.72394 3.33341 7.99984 3.33341Z",
    fill: "#F93920"
  }));
};
const ReplaceSvg = function () {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/_react.default.createElement("svg", Object.assign({
    focusable: false,
    "aria-hidden": true,
    width: "28",
    height: "28",
    viewBox: "0 0 28 28",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("circle", {
    cx: "14",
    cy: "14",
    r: "14",
    fill: "#16161A",
    fillOpacity: "0.6"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M9 10.25V18.25L10.25 13.25H17.875V11.75C17.875 11.4739 17.6511 11.25 17.375 11.25H14L12.75 9.75H9.5C9.22386 9.75 9 9.97386 9 10.25Z",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M18 18.25L19 13.25H10.2031L9 18.25H18Z",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
const DirectorySvg = function () {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/_react.default.createElement("svg", Object.assign({
    focusable: false,
    "aria-hidden": true,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/_react.default.createElement("path", {
    d: "M6 17V7.58824C6 7.26336 6.26863 7 6.6 7H10.5L12 8.76471H16.05C16.3814 8.76471 16.65 9.02806 16.65 9.35294V11.1176H7.5L6 17ZM6 17L7.44375 11.1176H18L16.8 17L6 17Z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
class FileCard extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.state = {
      fallbackPreview: false
    };
    this.foundation = new _fileCardFoundation.default(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      updateFallbackPreview: fallbackPreview => this.setState({
        fallbackPreview
      })
    });
  }
  transSize(size) {
    if (typeof size === 'number') {
      return (0, _utils.getFileSize)(size);
    }
    return size;
  }
  renderValidateMessage() {
    const {
      status,
      validateMessage
    } = this.props;
    let content = null;
    switch (true) {
      case typeof validateMessage === 'string' && status === _constants.strings.FILE_STATUS_VALIDATING:
        content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index4.default, {
          size: "small",
          wrapperClassName: `${prefixCls}-file-card-icon-loading`
        }), validateMessage);
        break;
      case typeof validateMessage === 'string':
        content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertCircle, {
          className: `${prefixCls}-file-card-icon-error`
        }), validateMessage);
        break;
      case (0, _reactUtils.isElement)(validateMessage):
        content = validateMessage;
        break;
      default:
        break;
    }
    return content;
  }
  renderPicValidateMsg() {
    const {
      status,
      validateMessage
    } = this.props;
    let icon = null;
    switch (true) {
      case validateMessage && status === _constants.strings.FILE_STATUS_VALIDATING:
        icon = /*#__PURE__*/_react.default.createElement("span", {
          className: `${prefixCls}-tooltip-children-wrapper ${prefixCls}-picture-file-card-icon-loading`
        }, /*#__PURE__*/_react.default.createElement(_index4.default, {
          size: "small"
        }));
        break;
      case validateMessage && (status === _constants.strings.FILE_STATUS_VALID_FAIL || status === _constants.strings.FILE_STATUS_UPLOAD_FAIL):
        icon = /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-picture-file-card-icon-error`
        }, /*#__PURE__*/_react.default.createElement(ErrorSvg, null));
        break;
      default:
        break;
    }
    return icon ? /*#__PURE__*/_react.default.createElement(_index3.default, {
      content: validateMessage,
      trigger: "hover",
      position: "bottom"
    }, icon) : null;
  }
  renderPic(locale) {
    const {
      fallbackPreview
    } = this.state;
    const {
      url,
      percent,
      status,
      disabled,
      style,
      onPreviewClick,
      showPicInfo,
      renderPicInfo,
      renderPicClose,
      renderPicPreviewIcon,
      renderThumbnail,
      name,
      index,
      picHeight,
      picWidth
    } = this.props;
    const showProgress = status === _constants.strings.FILE_STATUS_UPLOADING && percent !== 100;
    const showRetry = status === _constants.strings.FILE_STATUS_UPLOAD_FAIL && this.props.showRetry;
    const showReplace = status === _constants.strings.FILE_STATUS_SUCCESS && this.props.showReplace;
    const showPreview = status === _constants.strings.FILE_STATUS_SUCCESS && !this.props.showReplace;
    const customThumbnail = typeof renderThumbnail === 'function';
    const filePicCardCls = (0, _classnames.default)({
      [`${prefixCls}-picture-file-card`]: true,
      [`${prefixCls}-picture-file-card-preview-fallback`]: fallbackPreview,
      [`${prefixCls}-picture-file-card-disabled`]: disabled,
      [`${prefixCls}-picture-file-card-show-pointer`]: typeof onPreviewClick !== 'undefined',
      [`${prefixCls}-picture-file-card-error`]: status === _constants.strings.FILE_STATUS_UPLOAD_FAIL,
      [`${prefixCls}-picture-file-card-uploading`]: showProgress,
      [`${prefixCls}-picture-file-card-custom-thumbnail`]: customThumbnail && picHeight && picWidth
    });
    const retry = /*#__PURE__*/_react.default.createElement("div", {
      role: "button",
      tabIndex: 0,
      className: `${prefixCls}-picture-file-card-retry`,
      onClick: e => this.onRetry(e)
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconRefresh, {
      className: `${prefixCls}-picture-file-card-icon-retry`
    }));
    const replace = /*#__PURE__*/_react.default.createElement(_index3.default, {
      trigger: "hover",
      position: "top",
      content: locale.replace,
      showArrow: false,
      spacing: 4
    }, /*#__PURE__*/_react.default.createElement("div", {
      role: "button",
      tabIndex: 0,
      className: `${prefixCls}-picture-file-card-replace`,
      onClick: e => this.onReplace(e)
    }, /*#__PURE__*/_react.default.createElement(ReplaceSvg, {
      className: `${prefixCls}-picture-file-card-icon-replace`
    })));
    const preview = /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-picture-file-card-preview`
    }, typeof renderPicPreviewIcon === 'function' ? renderPicPreviewIcon(this.props) : null);
    const close = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, typeof renderPicClose === 'function' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderPicClose({
      className: `${prefixCls}-picture-file-card-close`,
      remove: e => this.onRemove(e)
    })) : /*#__PURE__*/_react.default.createElement("div", {
      role: "button",
      tabIndex: 0,
      className: `${prefixCls}-picture-file-card-close`,
      onClick: e => this.onRemove(e)
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconClear, {
      className: `${prefixCls}-picture-file-card-icon-close`
    })));
    const picInfo = typeof renderPicInfo === 'function' ? renderPicInfo(this.props) : (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-picture-file-card-pic-info`
    }, index + 1));
    let imgStyle = {};
    let itemStyle = style ? Object.assign({}, style) : {};
    if (picHeight) {
      itemStyle.height = picHeight;
      imgStyle.height = picHeight;
    }
    if (picWidth) {
      itemStyle.width = picWidth;
      imgStyle.width = picWidth;
    }
    const defaultThumbTail = !fallbackPreview ? /*#__PURE__*/_react.default.createElement("img", {
      src: url,
      alt: name,
      onError: error => this.foundation.handleImageError(error),
      style: imgStyle
    }) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconFile, {
      size: "large"
    });
    const thumbnail = customThumbnail ? renderThumbnail(this.props) : defaultThumbTail;
    return /*#__PURE__*/_react.default.createElement("div", {
      role: "listitem",
      className: filePicCardCls,
      style: itemStyle,
      onClick: onPreviewClick
    }, thumbnail, showProgress ? /*#__PURE__*/_react.default.createElement(_index2.default, {
      percent: percent,
      type: "circle",
      size: "small",
      orbitStroke: '#FFF',
      "aria-label": "uploading file progress"
    }) : null, showRetry ? retry : null, showReplace && replace, showPreview && preview, showPicInfo && picInfo, !disabled && close, this.renderPicValidateMsg());
  }
  renderFile(locale) {
    const {
      name,
      size,
      percent,
      url,
      showRetry: propsShowRetry,
      showReplace: propsShowReplace,
      preview,
      previewFile,
      status,
      style,
      onPreviewClick,
      renderFileOperation,
      showTooltip
    } = this.props;
    const {
      fallbackPreview
    } = this.state;
    const fileCardCls = (0, _classnames.default)({
      [`${prefixCls}-file-card`]: true,
      [`${prefixCls}-file-card-fail`]: status === _constants.strings.FILE_STATUS_VALID_FAIL || status === _constants.strings.FILE_STATUS_UPLOAD_FAIL,
      [`${prefixCls}-file-card-show-pointer`]: typeof onPreviewClick !== 'undefined'
    });
    const previewCls = (0, _classnames.default)({
      [`${prefixCls}-file-card-preview`]: true,
      [`${prefixCls}-file-card-preview-placeholder`]: !preview || previewFile || fallbackPreview
    });
    const infoCls = `${prefixCls}-file-card-info`;
    const closeCls = `${prefixCls}-file-card-close`;
    const replaceCls = `${prefixCls}-file-card-replace`;
    const showProgress = !(percent === 100 || typeof percent === 'undefined') && status === _constants.strings.FILE_STATUS_UPLOADING;
    // only show retry when upload fail & showRetry is true, no need to show during validate fail
    const showRetry = status === _constants.strings.FILE_STATUS_UPLOAD_FAIL && propsShowRetry;
    const showReplace = status === _constants.strings.FILE_STATUS_SUCCESS && propsShowReplace;
    const fileSize = this.transSize(size);
    let previewContent = preview && !fallbackPreview ? (/*#__PURE__*/_react.default.createElement("img", {
      src: url,
      alt: name,
      onError: error => this.foundation.handleImageError(error)
    })) : (/*#__PURE__*/_react.default.createElement(_semiIcons.IconFile, {
      size: "large"
    }));
    if (previewFile) {
      previewContent = previewFile(this.props);
    }
    const operation = typeof renderFileOperation === 'function' ? renderFileOperation(this.props) : /*#__PURE__*/_react.default.createElement(_index.default, {
      onClick: e => this.onRemove(e),
      type: "tertiary",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, null),
      theme: "borderless",
      size: "small",
      className: closeCls
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      role: "listitem",
      className: fileCardCls,
      style: style,
      onClick: onPreviewClick
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: previewCls
    }, previewContent), /*#__PURE__*/_react.default.createElement("div", {
      className: `${infoCls}-main`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${infoCls}-main-text`
    }, /*#__PURE__*/_react.default.createElement(_typography.default.Text, {
      className: `${infoCls}-name`,
      ellipsis: {
        showTooltip
      }
    }, name), /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("span", {
      className: `${infoCls}-size`
    }, fileSize), showReplace && (/*#__PURE__*/_react.default.createElement(_index3.default, {
      trigger: "hover",
      position: "top",
      showArrow: false,
      content: locale.replace
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-tooltip-children-wrapper ${replaceCls}`
    }, /*#__PURE__*/_react.default.createElement(_index.default, {
      onClick: e => this.onReplace(e),
      type: "tertiary",
      theme: "borderless",
      size: "small",
      icon: /*#__PURE__*/_react.default.createElement(DirectorySvg, null)
    })))))), showProgress ? (/*#__PURE__*/_react.default.createElement(_index2.default, {
      percent: percent,
      style: {
        width: '100%'
      },
      "aria-label": "uploading file progress"
    })) : null, /*#__PURE__*/_react.default.createElement("div", {
      className: `${infoCls}-main-control`
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: `${infoCls}-validate-message`
    }, this.renderValidateMessage()), showRetry ? /*#__PURE__*/_react.default.createElement("span", {
      role: "button",
      tabIndex: 0,
      className: `${infoCls}-retry`,
      onClick: e => this.onRetry(e)
    }, locale.retry) : null)), operation);
  }
  onRemove(e) {
    e.stopPropagation();
    this.props.onRemove();
  }
  onReplace(e) {
    e.stopPropagation();
    this.props.onReplace();
  }
  onRetry(e) {
    e.stopPropagation();
    this.props.onRetry();
  }
  render() {
    const {
      listType
    } = this.props;
    if (listType === _constants.strings.FILE_LIST_PIC) {
      return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "Upload"
      }, locale => this.renderPic(locale));
    }
    if (listType === _constants.strings.FILE_LIST_DEFAULT) {
      return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "Upload"
      }, locale => this.renderFile(locale));
    }
    return null;
  }
}
FileCard.propTypes = {
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  listType: _propTypes.default.string,
  name: _propTypes.default.string,
  onPreviewClick: _propTypes.default.func,
  onRemove: _propTypes.default.func,
  onReplace: _propTypes.default.func,
  onRetry: _propTypes.default.func,
  percent: _propTypes.default.number,
  preview: _propTypes.default.bool,
  previewFile: _propTypes.default.func,
  picWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  picHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  showReplace: _propTypes.default.bool,
  showRetry: _propTypes.default.bool,
  size: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  status: _propTypes.default.string,
  style: _propTypes.default.object,
  url: _propTypes.default.string,
  validateMessage: _propTypes.default.node,
  index: _propTypes.default.number,
  showTooltip: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object])
};
FileCard.defaultProps = {
  listType: _constants.strings.FILE_LIST_DEFAULT,
  name: '',
  onRemove: () => undefined,
  onRetry: () => undefined,
  preview: false,
  size: '',
  showTooltip: true
};
var _default = exports.default = FileCard;