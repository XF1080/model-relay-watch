"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _react = _interopRequireWildcard(require("react"));
var _previewContext = require("./previewContext");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _previewInner = _interopRequireDefault(require("./previewInner"));
var _previewFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/image/previewFoundation"));
var _uuid = require("@douyinfe/semi-foundation/lib/cjs/utils/uuid");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/image/constants");
require("@douyinfe/semi-foundation/lib/cjs/image/image.css");
var _classnames = _interopRequireDefault(require("classnames"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
class Preview extends _baseComponent.default {
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
        return _react.default.Children.map(children, child => {
          var _a;
          if (child && child.props && child.type) {
            if (child.type.isSemiImage) {
              const {
                src,
                preview,
                alt
              } = child.props;
              if (preview) {
                const previewSrc = (0, _isObject2.default)(preview) ? (_a = preview.src) !== null && _a !== void 0 ? _a : src : src;
                srcListInChildren.push(previewSrc);
                titles.push(preview === null || preview === void 0 ? void 0 : preview.previewTitle);
                return /*#__PURE__*/_react.default.cloneElement(child, {
                  imageID: index++
                });
              }
              return child;
            }
          }
          if (child && child.props && child.props.children) {
            return /*#__PURE__*/_react.default.cloneElement(child, {
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
    this.foundation = new _previewFoundation.default(this.adapter);
    this.previewGroupId = (0, _uuid.getUuidShort)({
      prefix: "semi-image-preview-group",
      length: 4
    });
    this.previewRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    this.props.lazyLoad && this.observerImages();
  }
  componentDidUpdate(prevProps) {
    if (this.props.lazyLoad) {
      const prevChildrenKeys = _react.default.Children.toArray(prevProps.children).map(child => /*#__PURE__*/(0, _react.isValidElement)(child) ? child.key : null);
      const currChildrenKeys = _react.default.Children.toArray(this.props.children).map(child => /*#__PURE__*/(0, _react.isValidElement)(child) ? child.key : null);
      if (!(0, _isEqual2.default)(prevChildrenKeys, currChildrenKeys)) {
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
    const previewInnerProps = Object.assign(Object.assign({}, (0, _omit2.default)(restProps, ['previewCls', 'previewStyle'])), {
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
    return /*#__PURE__*/_react.default.createElement(_previewContext.PreviewContext.Provider, {
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
    }, /*#__PURE__*/_react.default.createElement("div", {
      id: this.previewGroupId,
      style: style,
      className: (0, _classnames.default)(`${prefixCls}-preview-group`, className)
    }, newChildren), /*#__PURE__*/_react.default.createElement(_previewInner.default, Object.assign({}, previewInnerProps, {
      ref: this.previewRef,
      src: finalSrcList,
      currentIndex: currentIndex,
      visible: visible,
      onVisibleChange: this.handleVisibleChange
    })));
  }
}
exports.default = Preview;
Preview.propTypes = {
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  visible: _propTypes.default.bool,
  src: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  currentIndex: _propTypes.default.number,
  defaultCurrentIndex: _propTypes.default.number,
  defaultVisible: _propTypes.default.bool,
  maskClosable: _propTypes.default.bool,
  closable: _propTypes.default.bool,
  zoomStep: _propTypes.default.number,
  infinite: _propTypes.default.bool,
  showTooltip: _propTypes.default.bool,
  closeOnEsc: _propTypes.default.bool,
  prevTip: _propTypes.default.string,
  nextTip: _propTypes.default.string,
  zoomInTip: _propTypes.default.string,
  zoomOutTip: _propTypes.default.string,
  downloadTip: _propTypes.default.string,
  adaptiveTip: _propTypes.default.string,
  originTip: _propTypes.default.string,
  lazyLoad: _propTypes.default.bool,
  lazyLoadMargin: _propTypes.default.string,
  preLoad: _propTypes.default.bool,
  preLoadGap: _propTypes.default.number,
  previewCls: _propTypes.default.string,
  previewStyle: _propTypes.default.object,
  disableDownload: _propTypes.default.bool,
  zIndex: _propTypes.default.number,
  renderHeader: _propTypes.default.func,
  renderPreviewMenu: _propTypes.default.func,
  getPopupContainer: _propTypes.default.func,
  onVisibleChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onZoomIn: _propTypes.default.func,
  onZoomOut: _propTypes.default.func,
  onPrev: _propTypes.default.func,
  onNext: _propTypes.default.func,
  onDownload: _propTypes.default.func,
  onRotateLeft: _propTypes.default.func,
  onRatioChange: _propTypes.default.func
};
Preview.defaultProps = {
  src: [],
  lazyLoad: true,
  lazyLoadMargin: "0px 100px 100px 0px",
  closable: true
};