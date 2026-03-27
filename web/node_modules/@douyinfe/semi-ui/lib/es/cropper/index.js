import _isUndefined from "lodash/isUndefined";
import React from 'react';
import BaseComponent from '../_base/baseComponent';
import cls from "classnames";
import PropTypes from 'prop-types';
import '@douyinfe/semi-foundation/lib/es/cropper/cropper.css';
import CropperFoundation from '@douyinfe/semi-foundation/lib/es/cropper/foundation';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/cropper/constants';
import ResizeObserver, { ObserverProperty } from '../resizeObserver';
const prefixCls = cssClasses.PREFIX;
class Cropper extends BaseComponent {
  constructor(props) {
    super(props);
    this.unRegisterImageWrapRef = () => {
      if (this.containerRef) {
        this.containerRef.removeEventListener("wheel", this.foundation.handleWheel);
      }
      this.containerRef = null;
    };
    this.registryImageWrapRef = ref => {
      this.unRegisterImageWrapRef();
      if (ref) {
        // We need to use preventDefault to prevent the page from being enlarged when zooming in with two fingers.
        ref.addEventListener("wheel", this.foundation.handleWheel, {
          passive: false
        });
      }
      this.containerRef = ref;
    };
    // ref method: Get the cropped canvas
    this.getCropperCanvas = () => {
      return this.foundation.getCropperCanvas();
    };
    this.state = {
      imgData: {
        width: 0,
        height: 0,
        centerPoint: {
          x: 0,
          y: 0
        }
      },
      cropperBox: {
        width: 0,
        height: 0,
        centerPoint: {
          x: 0,
          y: 0
        }
      },
      zoom: 1,
      rotate: 0,
      loaded: false
    };
    this.foundation = new CropperFoundation(this.adapter);
    this.imgRef = /*#__PURE__*/React.createRef();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getContainer: () => this.containerRef,
      notifyZoomChange: zoom => {
        const {
          onZoomChange
        } = this.props;
        onZoomChange === null || onZoomChange === void 0 ? void 0 : onZoomChange(zoom);
      },
      getImg: () => this.imgRef.current
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      rotate: newRotate,
      zoom: newZoom
    } = nextProps;
    const {
      rotate,
      zoom,
      imgData,
      cropperBox,
      loaded
    } = prevState;
    let nextWidth = imgData.width,
      nextHeight = imgData.height;
    let nextImgCenter = Object.assign({}, imgData.centerPoint);
    const nextState = {};
    if (!loaded) {
      return null;
    }
    if (!_isUndefined(newRotate) && newRotate !== rotate) {
      nextState.rotate = newRotate;
      if (loaded) {
        // 因为以裁切框的左上方顶点作为原点，所以centerPoint 的 y 坐标与实际的坐标系方向相反，
        // 因此 y 方向需要先做变换，再使用旋转变换公式计算中心点坐标
        const rotateCenter = {
          x: cropperBox.centerPoint.x,
          y: -cropperBox.centerPoint.y
        };
        const imgCenter = {
          x: imgData.centerPoint.x,
          y: -imgData.centerPoint.y
        };
        const angle = (newRotate - rotate) * Math.PI / 180;
        nextImgCenter = {
          x: (imgCenter.x - rotateCenter.x) * Math.cos(angle) + (imgCenter.y - rotateCenter.y) * Math.sin(angle) + rotateCenter.x,
          y: -(-(imgCenter.x - rotateCenter.x) * Math.sin(angle) + (imgCenter.y - rotateCenter.y) * Math.cos(angle) + rotateCenter.y)
        };
      }
    }
    if (!_isUndefined(newRotate) && newZoom !== zoom) {
      nextState.zoom = newZoom;
      if (loaded) {
        // 同上
        const scaleCenter = {
          x: cropperBox.centerPoint.x,
          y: -cropperBox.centerPoint.y
        };
        const currentImgCenter = {
          x: nextImgCenter.x,
          y: -nextImgCenter.y
        };
        nextWidth = imgData.width / zoom * newZoom;
        nextHeight = imgData.height / zoom * newZoom;
        nextImgCenter = {
          x: (currentImgCenter.x - scaleCenter.x) / zoom * newZoom + scaleCenter.x,
          y: -[(currentImgCenter.y - scaleCenter.y) / zoom * newZoom + scaleCenter.y]
        };
      }
    }
    if (newRotate !== rotate || newZoom !== zoom) {
      nextState.imgData = {
        width: nextWidth,
        height: nextHeight,
        centerPoint: nextImgCenter
      };
    }
    if (Object.keys(nextState).length) {
      return nextState;
    }
    return null;
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
    this.unRegisterImageWrapRef();
  }
  render() {
    const {
      className,
      style,
      src,
      shape,
      showResizeBox,
      cropperBoxStyle,
      cropperBoxCls
    } = this.props;
    const {
      imgData,
      cropperBox,
      rotate,
      loaded
    } = this.state;
    const imgX = imgData.centerPoint.x - imgData.width / 2;
    const imgY = imgData.centerPoint.y - imgData.height / 2;
    const cropperBoxX = cropperBox.centerPoint.x - cropperBox.width / 2;
    const cropperBoxY = cropperBox.centerPoint.y - cropperBox.height / 2;
    const cropperImgX = imgX - cropperBoxX;
    const cropperImgY = imgY - cropperBoxY;
    this.foundation.updatePreview({
      width: imgData.width,
      height: imgData.height,
      translateX: cropperImgX,
      translateY: cropperImgY,
      rotate: rotate
    });
    return /*#__PURE__*/React.createElement(ResizeObserver, {
      onResize: this.foundation.handleResize,
      observerProperty: ObserverProperty.Width
    }, /*#__PURE__*/React.createElement("div", {
      className: cls(prefixCls, className),
      style: style,
      ref: this.registryImageWrapRef
    }, /*#__PURE__*/React.createElement("div", {
      className: cssClasses.IMG_WRAPPER
    }, /*#__PURE__*/React.createElement("img", {
      ref: this.imgRef,
      src: src,
      onLoad: this.foundation.handleImageLoad,
      className: cssClasses.IMG,
      crossOrigin: 'anonymous',
      style: {
        width: imgData.width,
        height: imgData.height,
        transformOrigin: 'center',
        transform: `translate(${imgX}px, ${imgY}px) rotate(${rotate}deg)`
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: cssClasses.MASK,
      onMouseDown: this.foundation.handleMaskMouseDown
    }), /*#__PURE__*/React.createElement("div", {
      className: cls(cssClasses.CROPPER_BOX, {
        [cropperBoxCls]: cropperBoxCls,
        [cssClasses.CROPPER_VIEW_BOX_ROUND]: shape === 'round'
      }),
      style: Object.assign(Object.assign({}, cropperBoxStyle), {
        width: cropperBox.width,
        height: cropperBox.height,
        transform: `translate(${cropperBoxX}px, ${cropperBoxY}px)`
      }),
      onMouseDown: this.foundation.handleCropperBoxMouseDown
    }, /*#__PURE__*/React.createElement("div", {
      className: cls(cssClasses.CROPPER_VIEW_BOX, {
        [cssClasses.CROPPER_VIEW_BOX_ROUND]: shape.includes('round')
      })
    }, /*#__PURE__*/React.createElement("img", {
      onDragStart: this.foundation.viewIMGDragStart,
      className: cssClasses.CROPPER_IMG,
      src: src,
      style: {
        width: imgData.width,
        height: imgData.height,
        transformOrigin: 'center',
        transform: `translate(${cropperImgX}px, ${cropperImgY}px) rotate(${rotate}deg)`
      }
    })), loaded && showResizeBox && (shape === 'round' ? strings.roundCorner : strings.corner).map(corner => (/*#__PURE__*/React.createElement("div", {
      className: cls(cssClasses.CORNER, `${cssClasses.CORNER}-${corner}`),
      "data-dir": corner,
      key: corner,
      onMouseDown: this.foundation.handleCornerMouseDown
    }))))));
  }
}
Cropper.__SemiComponentName__ = "Cropper";
Cropper.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};
Cropper.defaultProps = {
  shape: 'rect',
  defaultAspectRatio: 1,
  showResizeBox: true,
  fill: 'rgba(0, 0, 0, 0)',
  maxZoom: 3,
  minZoom: 0.1,
  zoomStep: 0.1
};
export default Cropper;