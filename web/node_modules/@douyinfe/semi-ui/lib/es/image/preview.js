import _omit from "lodash/omit";
import _isEqual from "lodash/isEqual";
import _isObject from "lodash/isObject";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { isValidElement } from "react";
import { PreviewContext } from "./previewContext";
import BaseComponent from "../_base/baseComponent";
import PropTypes from "prop-types";
import PreviewInner from "./previewInner";
import PreviewFoundation from '@douyinfe/semi-foundation/lib/es/image/previewFoundation';
import { getUuidShort } from '@douyinfe/semi-foundation/lib/es/utils/uuid';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/image/constants';
import '@douyinfe/semi-foundation/lib/es/image/image.css';
import cls from "classnames";
const prefixCls = cssClasses.PREFIX;
export default class Preview extends BaseComponent {
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  constructor(props) {
    super(props);
    this.observerImages = () => {
      if (this.previewObserver) {
        // cancel the observation of all elements of the previous observer
        this.previewObserver.disconnect();
      } else {
        this.previewObserver = new IntersectionObserver(entries => {
          entries.forEach(item => {
            var _a;
            const src = (_a = item.target.dataset) === null || _a === void 0 ? void 0 : _a.src;
            if (item.isIntersecting && src) {
              item.target.src = src;
              item.target.removeAttribute("data-src");
              this.previewObserver.unobserve(item.target);
            }
          });
        }, {
          root: document.querySelector(`#${this.previewGroupId}`),
          rootMargin: this.props.lazyLoadMargin
        });
      }
      const allImgElement = document.querySelectorAll(`.${prefixCls}-img`);
      allImgElement.forEach(item => this.previewObserver.observe(item));
    };
    this.handleVisibleChange = newVisible => {
      this.foundation.handleVisibleChange(newVisible);
    };
    this.handleCurrentIndexChange = index => {
      this.foundation.handleCurrentIndexChange(index);
    };
    this.loopImageIndex = () => {
      const {
        children
      } = this.props;
      let index = 0;
      const srcListInChildren = [];
      const titles = [];
      const loop = children => {
        return React.Children.map(children, child => {
          var _a;
          if (child && child.props && child.type) {
            if (child.type.isSemiImage) {
              const {
                src,
                preview,
                alt
              } = child.props;
              if (preview) {
                const previewSrc = _isObject(preview) ? (_a = preview.src) !== null && _a !== void 0 ? _a : src : src;
                srcListInChildren.push(previewSrc);
                titles.push(preview === null || preview === void 0 ? void 0 : preview.previewTitle);
                return /*#__PURE__*/React.cloneElement(child, {
                  imageID: index++
                });
              }
              return child;
            }
          }
          if (child && child.props && child.props.children) {
            return /*#__PURE__*/React.cloneElement(child, {
              children: loop(child.props.children)
            });
          }
          return child;
        });
      };
      return {
        srcListInChildren,
        newChildren: loop(children),
        titles
      };
    };
    this.state = {
      currentIndex: props.currentIndex || props.defaultCurrentIndex || 0,
      visible: props.visible || props.currentDefaultVisible || false
    };
    this.foundation = new PreviewFoundation(this.adapter);
    this.previewGroupId = getUuidShort({
      prefix: "semi-image-preview-group",
      length: 4
    });
    this.previewRef = /*#__PURE__*/React.createRef();
  }
  componentDidMount() {
    this.props.lazyLoad && this.observerImages();
  }
  componentDidUpdate(prevProps) {
    if (this.props.lazyLoad) {
      const prevChildrenKeys = React.Children.toArray(prevProps.children).map(child => /*#__PURE__*/isValidElement(child) ? child.key : null);
      const currChildrenKeys = React.Children.toArray(this.props.children).map(child => /*#__PURE__*/isValidElement(child) ? child.key : null);
      if (!_isEqual(prevChildrenKeys, currChildrenKeys)) {
        this.observerImages();
      }
    }
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateStates = {};
    if ("currentIndex" in props && props.currentIndex !== state.currentIndex) {
      willUpdateStates.currentIndex = props.currentIndex;
    }
    if ("visible" in props && props.visible !== state.visible) {
      willUpdateStates.visible = props.visible;
    }
    return willUpdateStates;
  }
  componentWillUnmount() {
    if (this.previewObserver) {
      this.previewObserver.disconnect();
      this.previewObserver = null;
    }
  }
  render() {
    const _a = this.props,
      {
        src,
        className,
        style,
        lazyLoad,
        setDownloadName
      } = _a,
      restProps = __rest(_a, ["src", "className", "style", "lazyLoad", "setDownloadName"]);
    const previewInnerProps = Object.assign(Object.assign({}, _omit(restProps, ['previewCls', 'previewStyle'])), {
      className: restProps === null || restProps === void 0 ? void 0 : restProps.previewCls,
      style: restProps === null || restProps === void 0 ? void 0 : restProps.previewStyle
    });
    const {
      currentIndex,
      visible
    } = this.state;
    const {
      srcListInChildren,
      newChildren,
      titles
    } = this.loopImageIndex();
    const srcArr = Array.isArray(src) ? src : typeof src === "string" ? [src] : [];
    const finalSrcList = [...srcArr, ...srcListInChildren];
    return /*#__PURE__*/React.createElement(PreviewContext.Provider, {
      value: {
        isGroup: true,
        previewSrc: finalSrcList,
        titles: titles,
        currentIndex,
        visible,
        lazyLoad,
        previewObserver: this.previewObserver,
        setCurrentIndex: this.handleCurrentIndexChange,
        handleVisibleChange: this.handleVisibleChange,
        setDownloadName: setDownloadName
      }
    }, /*#__PURE__*/React.createElement("div", {
      id: this.previewGroupId,
      style: style,
      className: cls(`${prefixCls}-preview-group`, className)
    }, newChildren), /*#__PURE__*/React.createElement(PreviewInner, Object.assign({}, previewInnerProps, {
      ref: this.previewRef,
      src: finalSrcList,
      currentIndex: currentIndex,
      visible: visible,
      onVisibleChange: this.handleVisibleChange
    })));
  }
}
Preview.propTypes = {
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
  lazyLoadMargin: PropTypes.string,
  preLoad: PropTypes.bool,
  preLoadGap: PropTypes.number,
  previewCls: PropTypes.string,
  previewStyle: PropTypes.object,
  disableDownload: PropTypes.bool,
  zIndex: PropTypes.number,
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
  onRotateLeft: PropTypes.func,
  onRatioChange: PropTypes.func
};
Preview.defaultProps = {
  src: [],
  lazyLoad: true,
  lazyLoadMargin: "0px 100px 100px 0px",
  closable: true
};