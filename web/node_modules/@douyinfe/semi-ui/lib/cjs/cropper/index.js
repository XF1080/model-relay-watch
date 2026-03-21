"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("@douyinfe/semi-foundation/lib/cjs/cropper/cropper.css");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/cropper/foundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/cropper/constants");
var _resizeObserver = _interopRequireWildcard(require("../resizeObserver"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
class Cropper extends _baseComponent.default {
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
    this.foundation = new _foundation.default(this.adapter);
    this.imgRef = /*#__PURE__*/_react.default.createRef();
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
    if (!(0, _isUndefined2.default)(newRotate) && newRotate !== rotate) {
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
    if (!(0, _isUndefined2.default)(newRotate) && newZoom !== zoom) {
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
    return /*#__PURE__*/_react.default.createElement(_resizeObserver.default, {
      onResize: this.foundation.handleResize,
      observerProperty: _resizeObserver.ObserverProperty.Width
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls, className),
      style: style,
      ref: this.registryImageWrapRef
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: _constants.cssClasses.IMG_WRAPPER
    }, /*#__PURE__*/_react.default.createElement("img", {
      ref: this.imgRef,
      src: src,
      onLoad: this.foundation.handleImageLoad,
      className: _constants.cssClasses.IMG,
      crossOrigin: 'anonymous',
      style: {
        width: imgData.width,
        height: imgData.height,
        transformOrigin: 'center',
        transform: `translate(${imgX}px, ${imgY}px) rotate(${rotate}deg)`
      }
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: _constants.cssClasses.MASK,
      onMouseDown: this.foundation.handleMaskMouseDown
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_constants.cssClasses.CROPPER_BOX, {
        [cropperBoxCls]: cropperBoxCls,
        [_constants.cssClasses.CROPPER_VIEW_BOX_ROUND]: shape === 'round'
      }),
      style: Object.assign(Object.assign({}, cropperBoxStyle), {
        width: cropperBox.width,
        height: cropperBox.height,
        transform: `translate(${cropperBoxX}px, ${cropperBoxY}px)`
      }),
      onMouseDown: this.foundation.handleCropperBoxMouseDown
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_constants.cssClasses.CROPPER_VIEW_BOX, {
        [_constants.cssClasses.CROPPER_VIEW_BOX_ROUND]: shape.includes('round')
      })
    }, /*#__PURE__*/_react.default.createElement("img", {
      onDragStart: this.foundation.viewIMGDragStart,
      className: _constants.cssClasses.CROPPER_IMG,
      src: src,
      style: {
        width: imgData.width,
        height: imgData.height,
        transformOrigin: 'center',
        transform: `translate(${cropperImgX}px, ${cropperImgY}px) rotate(${rotate}deg)`
      }
    })), loaded && showResizeBox && (shape === 'round' ? _constants.strings.roundCorner : _constants.strings.corner).map(corner => (/*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_constants.cssClasses.CORNER, `${_constants.cssClasses.CORNER}-${corner}`),
      "data-dir": corner,
      key: corner,
      onMouseDown: this.foundation.handleCornerMouseDown
    }))))));
  }
}
Cropper.__SemiComponentName__ = "Cropper";
Cropper.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object
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
var _default = exports.default = Cropper;