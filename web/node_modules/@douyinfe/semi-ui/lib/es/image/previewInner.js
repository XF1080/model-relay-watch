import _isFunction from "lodash/isFunction";
import _isEqual from "lodash/isEqual";
import React from "react";
import BaseComponent from "../_base/baseComponent";
import PropTypes from "prop-types";
import { cssClasses, numbers } from '@douyinfe/semi-foundation/lib/es/image/constants';
import cls from "classnames";
import Portal from "../_portal";
import { IconArrowLeft, IconArrowRight } from "@douyinfe/semi-icons";
import Header from "./previewHeader";
import Footer from "./previewFooter";
import PreviewImage from "./previewImage";
import PreviewInnerFoundation from '@douyinfe/semi-foundation/lib/es/image/previewInnerFoundation';
import { PreviewContext } from "./previewContext";
import { getScrollbarWidth } from "../_utils";
const prefixCls = cssClasses.PREFIX;
export default class PreviewInner extends BaseComponent {
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      getIsInGroup: () => this.isInGroup(),
      disabledBodyScroll: () => {
        const {
          getPopupContainer
        } = this.props;
        this.bodyOverflow = document.body.style.overflow || '';
        if (!getPopupContainer && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          document.body.style.width = `calc(${this.originBodyWidth || '100%'} - ${this.scrollBarWidth}px)`;
        }
      },
      enabledBodyScroll: () => {
        const {
          getPopupContainer
        } = this.props;
        if (!getPopupContainer && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.width = this.originBodyWidth;
        }
      },
      notifyChange: (index, direction) => {
        const {
          onChange,
          onPrev,
          onNext
        } = this.props;
        _isFunction(onChange) && onChange(index);
        if (direction === "prev") {
          onPrev && onPrev(index);
        } else {
          onNext && onNext(index);
        }
      },
      notifyZoom: (zoom, increase) => {
        const {
          onZoomIn,
          onZoomOut
        } = this.props;
        if (increase) {
          _isFunction(onZoomIn) && onZoomIn(zoom);
        } else {
          _isFunction(onZoomOut) && onZoomOut(zoom);
        }
      },
      notifyClose: () => {
        const {
          onClose
        } = this.props;
        _isFunction(onClose) && onClose();
      },
      notifyVisibleChange: visible => {
        const {
          onVisibleChange
        } = this.props;
        _isFunction(onVisibleChange) && onVisibleChange(visible);
      },
      notifyRatioChange: type => {
        const {
          onRatioChange
        } = this.props;
        _isFunction(onRatioChange) && onRatioChange(type);
      },
      notifyRotateChange: angle => {
        const {
          onRotateLeft
        } = this.props;
        _isFunction(onRotateLeft) && onRotateLeft(angle);
      },
      notifyDownload: (src, index) => {
        const {
          onDownload
        } = this.props;
        _isFunction(onDownload) && onDownload(src, index);
      },
      notifyDownloadError: src => {
        const {
          onDownloadError
        } = this.props;
        _isFunction(onDownloadError) && onDownloadError(src);
      },
      registerKeyDownListener: () => {
        window && window.addEventListener("keydown", this.handleKeyDown);
      },
      unregisterKeyDownListener: () => {
        window && window.removeEventListener("keydown", this.handleKeyDown);
      },
      getSetDownloadFunc: () => {
        var _a, _b;
        return (_b = (_a = this.context) === null || _a === void 0 ? void 0 : _a.setDownloadName) !== null && _b !== void 0 ? _b : this.props.setDownloadName;
      },
      isValidTarget: e => {
        const headerDom = this.headerRef && this.headerRef.current;
        const footerDom = this.footerRef && this.footerRef.current;
        const leftIconDom = this.leftIconRef && this.leftIconRef.current;
        const rightIconDom = this.rightIconRef && this.rightIconRef.current;
        const target = e.target;
        if (headerDom && headerDom.contains(target) || footerDom && footerDom.contains(target) || leftIconDom && leftIconDom.contains(target) || rightIconDom && rightIconDom.contains(target)) {
          // Move in the operation area, return false
          return false;
        }
        // Move in the preview area except the operation area, return true
        return true;
      },
      changeImageZoom: function () {
        var _a;
        ((_a = _this.imageRef) === null || _a === void 0 ? void 0 : _a.current) && _this.imageRef.current.foundation.changeZoom(...arguments);
      }
    });
  }
  constructor(props) {
    var _this2;
    super(props);
    _this2 = this;
    this.viewVisibleChange = () => {
      this.foundation.handleViewVisibleChange();
    };
    this.handleSwitchImage = direction => {
      this.foundation.handleSwitchImage(direction);
    };
    this.handleDownload = () => {
      this.foundation.handleDownload();
    };
    this.handlePreviewClose = e => {
      this.foundation.handlePreviewClose(e);
    };
    this.handleAdjustRatio = type => {
      this.foundation.handleAdjustRatio(type);
    };
    this.handleRotateImage = direction => {
      this.foundation.handleRotateImage(direction);
    };
    this.handleZoomImage = function (newZoom) {
      let notify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      _this2.foundation.handleZoomImage(newZoom, notify);
    };
    this.handleMouseUp = e => {
      this.foundation.handleMouseUp(e.nativeEvent);
    };
    this.handleMouseMove = e => {
      this.foundation.handleMouseMove(e);
    };
    this.handleKeyDown = e => {
      this.foundation.handleKeyDown(e);
    };
    this.onImageError = () => {
      this.foundation.preloadSingleImage();
    };
    this.onImageLoad = src => {
      this.foundation.onImageLoad(src);
    };
    this.handleMouseDown = e => {
      this.foundation.handleMouseDown(e);
    };
    this.handleWheel = e => {
      this.foundation.handleWheel(e);
    };
    // 为什么通过 addEventListener 注册 wheel 事件而不是使用 onWheel 事件？
    // 因为 Passive Event Listeners（https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scrolling_performance_with_passive_listeners）
    // Passive Event Listeners 是一种优化技术，用于提高滚动性能。在默认情况下，浏览器会假设事件的监听器不会调用 
    // preventDefault() 方法来阻止事件的默认行为，从而允许进行一些优化操作，例如滚动平滑。
    // 对于 Image 而言，如果使用触控板，双指朝不同方向分开放大图片，则需要  preventDefault 防止页面整体放大。
    // Why register wheel event through addEventListener instead of using onWheel event？
    // Because of Passive Event Listeners(an optimization technique used to improve scrolling performance. By default, 
    // the browser will assume that event listeners will not call preventDefault() method to prevent the default behavior of the event, 
    // allowing some optimization operations such as scroll smoothing.)
    // For Image, if we use the trackpad and spread your fingers in different directions to enlarge the image, we need to preventDefault
    // to prevent the page from being enlarged as a whole.
    this.registryImageWrapRef = ref => {
      if (this.imageWrapRef) {
        this.imageWrapRef.removeEventListener("wheel", this.handleWheel);
      }
      if (ref) {
        ref.addEventListener("wheel", this.handleWheel, {
          passive: false
        });
      }
      this.imageWrapRef = ref;
    };
    this.state = {
      imgSrc: [],
      imgLoadStatus: new Map(),
      zoom: 0.1,
      currentIndex: 0,
      ratio: "adaptation",
      rotation: 0,
      viewerVisible: true,
      visible: false,
      preloadAfterVisibleChange: true,
      direction: ""
    };
    this.foundation = new PreviewInnerFoundation(this.adapter);
    this.bodyOverflow = '';
    this.originBodyWidth = '100%';
    this.scrollBarWidth = 0;
    this.imageWrapRef = null;
    this.imageRef = /*#__PURE__*/React.createRef();
    this.headerRef = /*#__PURE__*/React.createRef();
    this.footerRef = /*#__PURE__*/React.createRef();
    this.leftIconRef = /*#__PURE__*/React.createRef();
    this.rightIconRef = /*#__PURE__*/React.createRef();
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateStates = {};
    let src = [];
    if (props.visible) {
      // if src in props
      src = Array.isArray(props.src) ? props.src : [props.src];
    }
    if (!_isEqual(src, state.imgSrc)) {
      willUpdateStates.imgSrc = src;
    }
    if (props.visible !== state.visible) {
      willUpdateStates.visible = props.visible;
      if (props.visible) {
        willUpdateStates.preloadAfterVisibleChange = true;
        willUpdateStates.viewerVisible = true;
        willUpdateStates.rotation = 0;
        willUpdateStates.ratio = 'adaptation';
      }
    }
    if ("currentIndex" in props && props.currentIndex !== state.currentIndex) {
      willUpdateStates.currentIndex = props.currentIndex;
      // ratio will set to adaptation when change picture, 
      // attention: If the ratio is controlled, the ratio should not change as the index changes
      willUpdateStates.ratio = 'adaptation';
    }
    return willUpdateStates;
  }
  componentDidMount() {
    this.scrollBarWidth = getScrollbarWidth();
    this.originBodyWidth = document.body.style.width;
    if (this.props.visible) {
      this.foundation.beforeShow();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.src !== this.props.src) {
      this.foundation.updateTimer();
    }
    // hide => show
    if (!prevProps.visible && this.props.visible) {
      this.foundation.beforeShow();
    }
    // show => hide
    if (prevProps.visible && !this.props.visible) {
      this.foundation.afterHide();
    }
  }
  componentWillUnmount() {
    this.foundation.clearTimer();
  }
  isInGroup() {
    return Boolean(this.context && this.context.isGroup);
  }
  render() {
    const {
      getPopupContainer,
      closable,
      zIndex,
      visible,
      className,
      style,
      infinite,
      zoomStep,
      crossOrigin,
      prevTip,
      nextTip,
      zoomInTip,
      zoomOutTip,
      rotateTip,
      downloadTip,
      adaptiveTip,
      originTip,
      showTooltip,
      disableDownload,
      renderLeftIcon,
      renderRightIcon,
      renderCloseIcon,
      renderPreviewMenu,
      renderHeader
    } = this.props;
    const {
      currentIndex,
      imgSrc,
      zoom,
      ratio,
      rotation,
      viewerVisible
    } = this.state;
    let wrapperStyle = {
      zIndex
    };
    if (getPopupContainer) {
      wrapperStyle = {
        zIndex,
        position: "static"
      };
    }
    const previewPrefixCls = `${prefixCls}-preview`;
    const previewWrapperCls = cls(previewPrefixCls, {
      [`${prefixCls}-hide`]: !visible,
      [`${previewPrefixCls}-popup`]: getPopupContainer
    }, className);
    const hideViewerCls = !viewerVisible ? `${previewPrefixCls}-hide` : "";
    const total = imgSrc.length;
    const showPrev = total !== 1 && (infinite || currentIndex !== 0);
    const showNext = total !== 1 && (infinite || currentIndex !== total - 1);
    const leftIcon = typeof renderLeftIcon === 'function' ? renderLeftIcon(currentIndex) : renderLeftIcon;
    const rightIcon = typeof renderRightIcon === 'function' ? renderRightIcon(currentIndex) : renderRightIcon;
    return visible && /*#__PURE__*/React.createElement(Portal, {
      getPopupContainer: getPopupContainer,
      style: wrapperStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: previewWrapperCls,
      style: style,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      ref: this.registryImageWrapRef,
      onMouseMove: this.handleMouseMove
    }, /*#__PURE__*/React.createElement(Header, {
      ref: this.headerRef,
      className: cls(hideViewerCls),
      onClose: this.handlePreviewClose,
      renderHeader: renderHeader,
      closable: closable,
      renderCloseIcon: renderCloseIcon
    }), /*#__PURE__*/React.createElement(PreviewImage, {
      ref: this.imageRef,
      src: imgSrc[currentIndex],
      onZoom: this.handleZoomImage,
      disableDownload: disableDownload,
      setRatio: this.handleAdjustRatio,
      zoom: zoom,
      ratio: ratio,
      rotation: rotation,
      crossOrigin: crossOrigin,
      onError: this.onImageError,
      onLoad: this.onImageLoad
    }), showPrev && (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    React.createElement("div", {
      ref: this.leftIconRef,
      className: cls(`${previewPrefixCls}-icon`, `${previewPrefixCls}-prev`, hideViewerCls),
      onClick: () => this.handleSwitchImage("prev")
    }, /*#__PURE__*/React.isValidElement(leftIcon) ? leftIcon : /*#__PURE__*/React.createElement(IconArrowLeft, {
      size: "large"
    }))), showNext && (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    React.createElement("div", {
      ref: this.rightIconRef,
      className: cls(`${previewPrefixCls}-icon`, `${previewPrefixCls}-next`, hideViewerCls),
      onClick: () => this.handleSwitchImage("next")
    }, /*#__PURE__*/React.isValidElement(rightIcon) ? rightIcon : /*#__PURE__*/React.createElement(IconArrowRight, {
      size: "large"
    }))), /*#__PURE__*/React.createElement(Footer, {
      forwardRef: this.footerRef,
      className: hideViewerCls,
      totalNum: total,
      curPage: currentIndex + 1,
      disabledPrev: !showPrev,
      disabledNext: !showNext,
      zoom: zoom * 100,
      step: zoomStep * 100,
      showTooltip: showTooltip,
      ratio: ratio,
      prevTip: prevTip,
      nextTip: nextTip,
      zIndex: zIndex,
      zoomInTip: zoomInTip,
      zoomOutTip: zoomOutTip,
      rotateTip: rotateTip,
      downloadTip: downloadTip,
      disableDownload: disableDownload,
      adaptiveTip: adaptiveTip,
      originTip: originTip,
      onPrev: () => this.handleSwitchImage("prev"),
      onNext: () => this.handleSwitchImage("next"),
      onZoomIn: this.handleZoomImage,
      onZoomOut: this.handleZoomImage,
      onDownload: this.handleDownload,
      onRotate: this.handleRotateImage,
      onAdjustRatio: this.handleAdjustRatio,
      renderPreviewMenu: renderPreviewMenu
    })));
  }
}
PreviewInner.contextType = PreviewContext;
PreviewInner.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  visible: PropTypes.bool,
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  currentIndex: PropTypes.number,
  defaultCurrentIndex: PropTypes.number,
  defaultVisible: PropTypes.bool,
  maskClosable: PropTypes.bool,
  closable: PropTypes.bool,
  zoomStep: PropTypes.number,
  infinite: PropTypes.bool,
  showTooltip: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  prevTip: PropTypes.string,
  nextTip: PropTypes.string,
  zoomInTip: PropTypes.string,
  zoomOutTip: PropTypes.string,
  downloadTip: PropTypes.string,
  adaptiveTip: PropTypes.string,
  originTip: PropTypes.string,
  lazyLoad: PropTypes.bool,
  preLoad: PropTypes.bool,
  preLoadGap: PropTypes.number,
  disableDownload: PropTypes.bool,
  viewerVisibleDelay: PropTypes.number,
  zIndex: PropTypes.number,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  renderHeader: PropTypes.func,
  renderPreviewMenu: PropTypes.func,
  getPopupContainer: PropTypes.func,
  onVisibleChange: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  onDownload: PropTypes.func,
  onRatioChange: PropTypes.func,
  onRotateLeft: PropTypes.func
};
PreviewInner.defaultProps = {
  showTooltip: false,
  zoomStep: 0.1,
  infinite: false,
  closable: true,
  closeOnEsc: true,
  lazyLoad: false,
  preLoad: true,
  preLoadGap: 2,
  zIndex: numbers.DEFAULT_Z_INDEX,
  maskClosable: true,
  viewerVisibleDelay: 10000,
  maxZoom: 5,
  minZoom: 0.1
};