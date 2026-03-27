import _omit from "lodash/omit";
import _isUndefined from "lodash/isUndefined";
import _isObject from "lodash/isObject";
import _isBoolean from "lodash/isBoolean";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from "react";
import BaseComponent from "../_base/baseComponent";
import PropTypes from "prop-types";
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/image/constants';
import cls from "classnames";
import { IconUploadError, IconEyeOpened } from "@douyinfe/semi-icons";
import PreviewInner from "./previewInner";
import { PreviewContext } from "./previewContext";
import ImageFoundation from '@douyinfe/semi-foundation/lib/es/image/imageFoundation';
import LocaleConsumer from "../locale/localeConsumer";
import Skeleton from "../skeleton";
import '@douyinfe/semi-foundation/lib/es/image/image.css';
const prefixCls = cssClasses.PREFIX;
export default class Image extends BaseComponent {
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
      return /*#__PURE__*/React.createElement(Skeleton.Image, {
        style: {
          width,
          height
        }
      });
    };
    this.renderDefaultError = () => {
      const prefixClsName = `${prefixCls}-status`;
      return /*#__PURE__*/React.createElement("div", {
        className: prefixClsName
      }, /*#__PURE__*/React.createElement(IconUploadError, {
        size: "extra-large"
      }));
    };
    this.renderLoad = () => {
      const prefixClsName = `${prefixCls}-status`;
      const {
        placeholder
      } = this.props;
      return placeholder ? (/*#__PURE__*/React.createElement("div", {
        className: prefixClsName
      }, placeholder)) : this.renderDefaultLoading();
    };
    this.renderError = () => {
      const {
        fallback
      } = this.props;
      const prefixClsName = `${prefixCls}-status`;
      const fallbackNode = typeof fallback === "string" ? (/*#__PURE__*/React.createElement("img", {
        style: {
          width: "100%",
          height: "100%"
        },
        src: fallback,
        alt: "fallback"
      })) : fallback;
      return fallback ? (/*#__PURE__*/React.createElement("div", {
        className: prefixClsName
      }, fallbackNode)) : this.renderDefaultError();
    };
    this.renderExtra = () => {
      const {
        loadStatus
      } = this.state;
      return /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-overlay`
      }, loadStatus === "error" && this.renderError(), loadStatus === "loading" && this.renderLoad());
    };
    this.getLocalTextByKey = key => (/*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Image"
    }, locale => locale[key]));
    this.renderMask = () => (/*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-mask`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-mask-info`
    }, /*#__PURE__*/React.createElement(IconEyeOpened, {
      size: "extra-large"
    }), /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-mask-info-text`
    }, this.getLocalTextByKey("preview")))));
    this.state = {
      src: "",
      loadStatus: "loading",
      previewVisible: false
    };
    this.foundation = new ImageFoundation(this.adapter);
    this.imgRef = /*#__PURE__*/React.createRef();
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateStates = {};
    if (props.src !== state.src) {
      willUpdateStates.src = props.src;
      willUpdateStates.loadStatus = "loading";
    }
    if (_isObject(props.preview)) {
      const {
        visible
      } = props.preview;
      if (_isBoolean(visible)) {
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
    const outerCls = cls(prefixCls, className);
    const canPreview = loadStatus === "success" && preview && !this.isInGroup();
    const showPreviewCursor = preview && loadStatus === "success";
    const previewSrc = _isObject(preview) ? (_a = preview.src) !== null && _a !== void 0 ? _a : src : src;
    const previewProps = _isObject(preview) && canPreview ? Object.assign(Object.assign({}, _omit(preview, ['className', 'style', 'previewCls', 'previewStyle'])), {
      className: preview === null || preview === void 0 ? void 0 : preview.previewCls,
      style: preview === null || preview === void 0 ? void 0 : preview.previewStyle
    }) : {};
    return /*#__PURE__*/React.createElement("div", {
      style: outerStyle,
      className: outerCls,
      onClick: this.handleClick
    }, /*#__PURE__*/React.createElement("img", Object.assign({
      ref: this.imgRef
    }, restProps, {
      src: this.isInGroup() && this.isLazyLoad() ? undefined : src,
      "data-src": src,
      alt: alt,
      style: imgStyle,
      className: cls(`${prefixCls}-img`, {
        [`${prefixCls}-img-preview`]: showPreviewCursor,
        [`${prefixCls}-img-error`]: loadStatus === "error",
        [imgCls]: Boolean(imgCls)
      }),
      width: width,
      height: height,
      crossOrigin: crossOrigin,
      onError: this.handleError,
      onLoad: this.handleLoaded
    })), loadStatus !== "success" && this.renderExtra(), canPreview && /*#__PURE__*/React.createElement(PreviewInner, Object.assign({}, previewProps, {
      src: previewSrc,
      visible: previewVisible,
      onVisibleChange: this.handlePreviewVisibleChange,
      crossOrigin: !_isUndefined(crossOrigin) ? crossOrigin : previewProps === null || previewProps === void 0 ? void 0 : previewProps.crossOrigin,
      setDownloadName: setDownloadName
    })));
  }
}
Image.isSemiImage = true;
Image.contextType = PreviewContext;
Image.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  alt: PropTypes.string,
  placeholder: PropTypes.node,
  fallback: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  preview: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  onClick: PropTypes.func,
  crossOrigin: PropTypes.string,
  imageID: PropTypes.number
};
Image.defaultProps = {
  preview: true
};