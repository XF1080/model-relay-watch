import React from "react";
import BaseComponent from "../_base/baseComponent";
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/image/constants';
import PropTypes from "prop-types";
import Spin from "../spin";
import PreviewImageFoundation from '@douyinfe/semi-foundation/lib/es/image/previewImageFoundation';
const prefixCls = cssClasses.PREFIX;
const preViewImgPrefixCls = `${prefixCls}-preview-image`;
export default class PreviewImage extends BaseComponent {
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getContainer: () => {
        return this.containerRef.current;
      },
      getImage: () => {
        return this.imageRef.current;
      },
      setLoading: loading => {
        this.setState({
          loading
        });
      },
      setImageCursor: canDrag => {
        this.imageRef.current.style.cursor = canDrag ? "grab" : "default";
      }
    });
  }
  constructor(props) {
    super(props);
    this.onWindowResize = () => {
      this.foundation.handleWindowResize();
    };
    // Determine the response method of right click according to the disableDownload parameter in props
    this.handleRightClickImage = e => {
      this.foundation.handleRightClickImage(e);
    };
    this.handleLoad = e => {
      this.foundation.handleLoad(e);
    };
    this.handleError = e => {
      this.foundation.handleError(e);
    };
    this.handleImageMove = e => {
      this.foundation.handleImageMove(e);
    };
    this.handleMouseDown = e => {
      this.foundation.handleImageMouseDown(e);
    };
    this.state = {
      width: 0,
      height: 0,
      loading: true,
      translate: {
        x: 0,
        y: 0
      },
      currZoom: this.props.zoom
    };
    this.containerRef = /*#__PURE__*/React.createRef();
    this.imageRef = /*#__PURE__*/React.createRef();
    this.foundation = new PreviewImageFoundation(this.adapter);
  }
  componentDidMount() {
    this.foundation.init();
    window.addEventListener("resize", this.onWindowResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }
  componentDidUpdate(prevProps, prevStates) {
    // If src changes, start a new loading
    const zoomChange = "zoom" in this.props && this.props.zoom !== this.state.currZoom;
    const srcChange = this.props.src && this.props.src !== prevProps.src;
    if (srcChange) {
      this.foundation.setLoading(true);
    }
    if (!zoomChange && !srcChange && prevProps) {
      if ("ratio" in this.props && this.props.ratio !== prevProps.ratio) {
        this.foundation.handleRatioChange();
      }
      if ("rotation" in this.props && this.props.rotation !== prevProps.rotation) {
        this.onWindowResize();
      }
    }
  }
  render() {
    const {
      src,
      rotation,
      crossOrigin
    } = this.props;
    const {
      loading,
      width,
      height,
      translate
    } = this.state;
    const imgStyle = {
      position: "absolute",
      visibility: loading ? "hidden" : "visible",
      transform: `translate(${translate.x}px, ${translate.y}px) rotate(${rotation}deg)`,
      width,
      height
    };
    return /*#__PURE__*/React.createElement("div", {
      className: `${preViewImgPrefixCls}`,
      ref: this.containerRef
    }, /*#__PURE__*/React.createElement("img", {
      ref: this.imageRef,
      src: src,
      alt: "previewImag",
      className: `${preViewImgPrefixCls}-img`,
      key: src,
      onMouseMove: this.handleImageMove,
      onMouseDown: this.handleMouseDown,
      onContextMenu: this.handleRightClickImage,
      onDragStart: e => e.preventDefault(),
      onLoad: this.handleLoad,
      onError: this.handleError,
      style: imgStyle,
      crossOrigin: crossOrigin
    }), loading && /*#__PURE__*/React.createElement(Spin, {
      size: "large",
      wrapperClassName: `${preViewImgPrefixCls}-spin`
    }));
  }
}
PreviewImage.propTypes = {
  src: PropTypes.string,
  rotation: PropTypes.number,
  style: PropTypes.object,
  // maxZoom: PropTypes.number,
  // minZoom: PropTypes.number,
  // zoomStep: PropTypes.number,
  zoom: PropTypes.number,
  ratio: PropTypes.string,
  disableDownload: PropTypes.bool,
  clickZoom: PropTypes.number,
  setRatio: PropTypes.func,
  onZoom: PropTypes.func,
  onLoad: PropTypes.func,
  onError: PropTypes.func
};
PreviewImage.defaultProps = {
  // maxZoom: 5,
  // minZoom: 0.1,
  // zoomStep: 0.1,
  zoom: undefined
};