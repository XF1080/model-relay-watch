"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/image/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _semiIcons = require("@douyinfe/semi-icons");
var _previewInner = _interopRequireDefault(require("./previewInner"));
var _previewContext = require("./previewContext");
var _imageFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/image/imageFoundation"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _skeleton = _interopRequireDefault(require("../skeleton"));
require("@douyinfe/semi-foundation/lib/cjs/image/image.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX;
class Image extends _baseComponent.default {
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getIsInGroup: () => this.isInGroup()
    });
  }
  constructor(props) {
    super(props);
    this.handleClick = e => {
      this.foundation.handleClick(e);
    };
    this.handleLoaded = e => {
      this.foundation.handleLoaded(e);
    };
    this.handleError = e => {
      this.foundation.handleError(e);
    };
    this.handlePreviewVisibleChange = visible => {
      this.foundation.handlePreviewVisibleChange(visible);
    };
    this.renderDefaultLoading = () => {
      const {
        width,
        height
      } = this.props;
      return /*#__PURE__*/_react.default.createElement(_skeleton.default.Image, {
        style: {
          width,
          height
        }
      });
    };
    this.renderDefaultError = () => {
      const prefixClsName = `${prefixCls}-status`;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: prefixClsName
      }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconUploadError, {
        size: "extra-large"
      }));
    };
    this.renderLoad = () => {
      const prefixClsName = `${prefixCls}-status`;
      const {
        placeholder
      } = this.props;
      return placeholder ? (/*#__PURE__*/_react.default.createElement("div", {
        className: prefixClsName
      }, placeholder)) : this.renderDefaultLoading();
    };
    this.renderError = () => {
      const {
        fallback
      } = this.props;
      const prefixClsName = `${prefixCls}-status`;
      const fallbackNode = typeof fallback === "string" ? (/*#__PURE__*/_react.default.createElement("img", {
        style: {
          width: "100%",
          height: "100%"
        },
        src: fallback,
        alt: "fallback"
      })) : fallback;
      return fallback ? (/*#__PURE__*/_react.default.createElement("div", {
        className: prefixClsName
      }, fallbackNode)) : this.renderDefaultError();
    };
    this.renderExtra = () => {
      const {
        loadStatus
      } = this.state;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-overlay`
      }, loadStatus === "error" && this.renderError(), loadStatus === "loading" && this.renderLoad());
    };
    this.getLocalTextByKey = key => (/*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Image"
    }, locale => locale[key]));
    this.renderMask = () => (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-mask`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-mask-info`
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconEyeOpened, {
      size: "extra-large"
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-mask-info-text`
    }, this.getLocalTextByKey("preview")))));
    this.state = {
      src: "",
      loadStatus: "loading",
      previewVisible: false
    };
    this.foundation = new _imageFoundation.default(this.adapter);
    this.imgRef = /*#__PURE__*/_react.default.createRef();
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateStates = {};
    if (props.src !== state.src) {
      willUpdateStates.src = props.src;
      willUpdateStates.loadStatus = "loading";
    }
    if ((0, _isObject2.default)(props.preview)) {
      const {
        visible
      } = props.preview;
      if ((0, _isBoolean2.default)(visible)) {
        willUpdateStates.previewVisible = visible;
      }
    }
    return willUpdateStates;
  }
  isInGroup() {
    return Boolean(this.context && this.context.isGroup);
  }
  isLazyLoad() {
    if (this.context) {
      return this.context.lazyLoad;
    }
    return false;
  }
  render() {
    var _a;
    const {
      src,
      loadStatus,
      previewVisible
    } = this.state;
    const _b = this.props,
      {
        src: picSrc,
        width,
        height,
        alt,
        style,
        className,
        crossOrigin,
        preview,
        fallback,
        placeholder,
        imageID,
        setDownloadName,
        imgCls,
        imgStyle
      } = _b,
      restProps = __rest(_b, ["src", "width", "height", "alt", "style", "className", "crossOrigin", "preview", "fallback", "placeholder", "imageID", "setDownloadName", "imgCls", "imgStyle"]);
    const outerStyle = Object.assign({
      width,
      height
    }, style);
    const outerCls = (0, _classnames.default)(prefixCls, className);
    const canPreview = loadStatus === "success" && preview && !this.isInGroup();
    const showPreviewCursor = preview && loadStatus === "success";
    const previewSrc = (0, _isObject2.default)(preview) ? (_a = preview.src) !== null && _a !== void 0 ? _a : src : src;
    const previewProps = (0, _isObject2.default)(preview) && canPreview ? Object.assign(Object.assign({}, (0, _omit2.default)(preview, ['className', 'style', 'previewCls', 'previewStyle'])), {
      className: preview === null || preview === void 0 ? void 0 : preview.previewCls,
      style: preview === null || preview === void 0 ? void 0 : preview.previewStyle
    }) : {};
    return /*#__PURE__*/_react.default.createElement("div", {
      style: outerStyle,
      className: outerCls,
      onClick: this.handleClick
    }, /*#__PURE__*/_react.default.createElement("img", Object.assign({
      ref: this.imgRef
    }, restProps, {
      src: this.isInGroup() && this.isLazyLoad() ? undefined : src,
      "data-src": src,
      alt: alt,
      style: imgStyle,
      className: (0, _classnames.default)(`${prefixCls}-img`, {
        [`${prefixCls}-img-preview`]: showPreviewCursor,
        [`${prefixCls}-img-error`]: loadStatus === "error",
        [imgCls]: Boolean(imgCls)
      }),
      width: width,
      height: height,
      crossOrigin: crossOrigin,
      onError: this.handleError,
      onLoad: this.handleLoaded
    })), loadStatus !== "success" && this.renderExtra(), canPreview && /*#__PURE__*/_react.default.createElement(_previewInner.default, Object.assign({}, previewProps, {
      src: previewSrc,
      visible: previewVisible,
      onVisibleChange: this.handlePreviewVisibleChange,
      crossOrigin: !(0, _isUndefined2.default)(crossOrigin) ? crossOrigin : previewProps === null || previewProps === void 0 ? void 0 : previewProps.crossOrigin,
      setDownloadName: setDownloadName
    })));
  }
}
exports.default = Image;
Image.isSemiImage = true;
Image.contextType = _previewContext.PreviewContext;
Image.propTypes = {
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  src: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  alt: _propTypes.default.string,
  placeholder: _propTypes.default.node,
  fallback: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  preview: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object]),
  onLoad: _propTypes.default.func,
  onError: _propTypes.default.func,
  onClick: _propTypes.default.func,
  crossOrigin: _propTypes.default.string,
  imageID: _propTypes.default.number
};
Image.defaultProps = {
  preview: true
};