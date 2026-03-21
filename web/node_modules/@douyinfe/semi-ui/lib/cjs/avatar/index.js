"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/avatar/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/avatar/foundation"));
require("@douyinfe/semi-foundation/lib/cjs/avatar/avatar.css");
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _a11y = require("@douyinfe/semi-foundation/lib/cjs/utils/a11y");
var _utils = require("../_utils");
var _TopSlotSvg = _interopRequireDefault(require("./TopSlotSvg"));
var _interface = require("./interface");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interface[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const sizeSet = _constants.strings.SIZE;
const shapeSet = _constants.strings.SHAPE;
const colorSet = _constants.strings.COLOR;
const prefixCls = _constants.cssClasses.PREFIX;
class Avatar extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleFocusVisible = event => {
      this.foundation.handleFocusVisible(event);
    };
    this.handleBlur = event => {
      this.foundation.handleBlur();
    };
    this.getContent = () => {
      const {
        children,
        onClick,
        imgAttr,
        src,
        srcSet,
        alt
      } = this.props;
      const {
        isImgExist
      } = this.state;
      let content = children;
      const clickable = onClick !== _function.noop;
      const isImg = src && isImgExist;
      const a11yFocusProps = {
        tabIndex: 0,
        onKeyDown: this.handleKeyDown,
        onFocus: this.handleFocusVisible,
        onBlur: this.handleBlur
      };
      if (isImg) {
        const finalAlt = clickable ? `clickable Avatar: ${alt}` : alt;
        const imgBasicProps = Object.assign(Object.assign({
          src,
          srcSet,
          onError: this.handleError
        }, imgAttr), {
          className: (0, _classnames.default)({
            [`${prefixCls}-no-focus-visible`]: clickable
          })
        });
        const imgProps = clickable ? Object.assign(Object.assign({}, imgBasicProps), a11yFocusProps) : imgBasicProps;
        content = /*#__PURE__*/_react.default.createElement("img", Object.assign({
          alt: finalAlt
        }, imgProps));
      } else if (typeof children === 'string') {
        const tempAlt = alt !== null && alt !== void 0 ? alt : children;
        const finalAlt = clickable ? `clickable Avatar: ${tempAlt}` : tempAlt;
        const props = {
          role: 'img',
          'aria-label': finalAlt,
          className: (0, _classnames.default)(`${prefixCls}-label`, {
            [`${prefixCls}-no-focus-visible`]: clickable
          })
        };
        const finalProps = clickable ? Object.assign(Object.assign({}, props), a11yFocusProps) : props;
        const stringStyle = {
          transform: `scale(${this.state.scale})`
        };
        content = /*#__PURE__*/_react.default.createElement("span", {
          className: `${prefixCls}-content`,
          style: stringStyle
        }, /*#__PURE__*/_react.default.createElement("span", Object.assign({}, finalProps, {
          "x-semi-prop": "children"
        }), children));
      }
      return content;
    };
    this.renderBottomSlot = () => {
      var _a, _b;
      if (!this.props.bottomSlot) {
        return null;
      }
      if (this.props.bottomSlot.render) {
        return this.props.bottomSlot.render();
      }
      const renderContent = (_a = this.props.bottomSlot.render) !== null && _a !== void 0 ? _a : () => {
        var _a;
        const style = {};
        if (this.props.bottomSlot.bgColor) {
          style['backgroundColor'] = this.props.bottomSlot.bgColor;
        }
        if (this.props.bottomSlot.textColor) {
          style['color'] = this.props.bottomSlot.textColor;
        }
        return /*#__PURE__*/_react.default.createElement("span", {
          style: style,
          className: (0, _classnames.default)(`${prefixCls}-bottom_slot-shape_${this.props.bottomSlot.shape}`, `${prefixCls}-bottom_slot-shape_${this.props.bottomSlot.shape}-${this.props.size}`, (_a = this.props.bottomSlot.className) !== null && _a !== void 0 ? _a : "")
        }, this.props.bottomSlot.text);
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)([`${prefixCls}-bottom_slot`]),
        style: (_b = this.props.bottomSlot.style) !== null && _b !== void 0 ? _b : {}
      }, renderContent());
    };
    this.renderTopSlot = () => {
      var _a, _b, _c, _d;
      if (!this.props.topSlot) {
        return null;
      }
      if (this.props.topSlot.render) {
        return this.props.topSlot.render();
      }
      const textStyle = {};
      if (this.props.topSlot.textColor) {
        textStyle['color'] = this.props.topSlot.textColor;
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        style: (_a = this.props.topSlot.style) !== null && _a !== void 0 ? _a : {},
        className: (0, _classnames.default)([`${prefixCls}-top_slot-wrapper`, (_b = this.props.topSlot.className) !== null && _b !== void 0 ? _b : "", {
          [`${prefixCls}-animated`]: this.props.contentMotion
        }])
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)([`${prefixCls}-top_slot-bg`, `${prefixCls}-top_slot-bg-${this.props.size}`])
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)([`${prefixCls}-top_slot-bg-svg`, `${prefixCls}-top_slot-bg-svg-${this.props.size}`])
      }, /*#__PURE__*/_react.default.createElement(_TopSlotSvg.default, {
        gradientStart: (_c = this.props.topSlot.gradientStart) !== null && _c !== void 0 ? _c : "var(--semi-color-primary)",
        gradientEnd: (_d = this.props.topSlot.gradientEnd) !== null && _d !== void 0 ? _d : "var(--semi-color-primary)"
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)([`${prefixCls}-top_slot`])
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: textStyle,
        className: (0, _classnames.default)([`${prefixCls}-top_slot-content`, `${prefixCls}-top_slot-content-${this.props.size}`])
      }, this.props.topSlot.text)));
    };
    this.state = {
      isImgExist: true,
      hoverContent: '',
      focusVisible: false,
      scale: 1
    };
    this.onEnter = this.onEnter.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getContent = this.getContent.bind(this);
    this.avatarRef = /*#__PURE__*/_react.default.createRef();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyImgState: isImgExist => {
        this.setState({
          isImgExist
        });
      },
      notifyEnter: e => {
        const {
          hoverMask
        } = this.props;
        const hoverContent = hoverMask;
        this.setState({
          hoverContent
        }, () => {
          const {
            onMouseEnter
          } = this.props;
          onMouseEnter && onMouseEnter(e);
        });
      },
      notifyLeave: e => {
        this.setState({
          hoverContent: ''
        }, () => {
          const {
            onMouseLeave
          } = this.props;
          onMouseLeave && onMouseLeave(e);
        });
      },
      setFocusVisible: focusVisible => {
        this.setState({
          focusVisible
        });
      },
      setScale: scale => {
        this.setState({
          scale
        });
      },
      getAvatarNode: () => {
        var _a;
        return (_a = this.avatarRef) === null || _a === void 0 ? void 0 : _a.current;
      }
    });
  }
  componentDidMount() {
    this.foundation = new _foundation.default(this.adapter);
    this.foundation.init();
  }
  componentDidUpdate(prevProps) {
    if (this.props.src && this.props.src !== prevProps.src) {
      const image = new Image(0, 0);
      image.src = this.props.src;
      image.onload = () => {
        this.setState({
          isImgExist: true
        });
      };
      image.onerror = () => {
        this.setState({
          isImgExist: false
        });
      };
      image.onabort = () => {
        this.setState({
          isImgExist: false
        });
      };
    }
    if (typeof this.props.children === "string" && this.props.children !== prevProps.children) {
      this.foundation.changeScale();
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  onEnter(e) {
    this.foundation.handleEnter(e);
  }
  onLeave(e) {
    this.foundation.handleLeave(e);
  }
  handleError() {
    this.foundation.handleImgLoadError();
  }
  handleKeyDown(event) {
    const {
      onClick
    } = this.props;
    switch (event.key) {
      case "Enter":
        onClick(event);
        (0, _a11y.handlePrevent)(event);
        break;
      case 'Escape':
        event.target.blur();
        break;
      default:
        break;
    }
  }
  render() {
    var _a;
    const _b = this.props,
      {
        shape,
        children,
        size,
        color,
        className,
        hoverMask,
        onClick,
        imgAttr,
        src,
        srcSet,
        style,
        alt,
        gap,
        bottomSlot,
        topSlot,
        border,
        contentMotion
      } = _b,
      others = __rest(_b, ["shape", "children", "size", "color", "className", "hoverMask", "onClick", "imgAttr", "src", "srcSet", "style", "alt", "gap", "bottomSlot", "topSlot", "border", "contentMotion"]);
    const {
      isImgExist,
      hoverContent,
      focusVisible
    } = this.state;
    let customStyle = {};
    if (!_constants.strings.SIZE.includes(size)) {
      customStyle = {
        width: size,
        height: size
      };
    }
    customStyle = Object.assign(Object.assign({}, customStyle), style);
    const shouldWrap = bottomSlot || topSlot || border;
    const mouseEvent = {
      onClick: onClick,
      onMouseEnter: this.onEnter,
      onMouseLeave: this.onLeave
    };
    const isImg = src && isImgExist;
    const avatarCls = (0, _classnames.default)(prefixCls, {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-${color}`]: color && !isImg,
      [`${prefixCls}-img`]: isImg,
      [`${prefixCls}-focus`]: focusVisible,
      [`${prefixCls}-animated`]: contentMotion
    }, className);
    const hoverRender = hoverContent ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-hover`,
      "x-semi-prop": "hoverContent"
    }, hoverContent)) : null;
    let avatar = /*#__PURE__*/_react.default.createElement("span", Object.assign({}, others, {
      style: shouldWrap ? {} : customStyle,
      className: avatarCls
    }, shouldWrap ? {} : mouseEvent, {
      role: 'listitem',
      ref: this.avatarRef
    }), this.getContent(), hoverRender);
    if (border) {
      const borderStyle = {};
      if (typeof border === 'object' && (border === null || border === void 0 ? void 0 : border.color)) {
        borderStyle['borderColor'] = border === null || border === void 0 ? void 0 : border.color;
      }
      avatar = /*#__PURE__*/_react.default.createElement("div", {
        style: Object.assign({
          position: "relative"
        }, customStyle)
      }, avatar, /*#__PURE__*/_react.default.createElement("span", {
        style: borderStyle,
        className: (0, _classnames.default)([`${prefixCls}-additionalBorder`, `${prefixCls}-additionalBorder-${size}`, {
          [`${prefixCls}-${shape}`]: shape
        }])
      }), typeof this.props.border === 'object' && this.props.border.motion && /*#__PURE__*/_react.default.createElement("span", {
        style: borderStyle,
        className: (0, _classnames.default)([`${prefixCls}-additionalBorder`, `${prefixCls}-additionalBorder-${size}`, {
          [`${prefixCls}-${shape}`]: shape,
          [`${prefixCls}-additionalBorder-animated`]: typeof this.props.border === 'object' && ((_a = this.props.border) === null || _a === void 0 ? void 0 : _a.motion)
        }])
      }));
    }
    if (shouldWrap) {
      return /*#__PURE__*/_react.default.createElement("span", Object.assign({
        className: (0, _classnames.default)([`${prefixCls}-wrapper`]),
        style: customStyle
      }, mouseEvent), avatar, topSlot && ["extra-small", "small", "default", "medium", "large", "extra-large"].includes(size) && shape === "circle" && this.renderTopSlot(), bottomSlot && ["extra-small", "small", "default", "medium", "large", "extra-large"].includes(size) && this.renderBottomSlot());
    } else {
      return avatar;
    }
  }
}
exports.default = Avatar;
Avatar.__SemiComponentName__ = "Avatar";
Avatar.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Avatar.__SemiComponentName__, {
  size: 'medium',
  color: 'grey',
  shape: 'circle',
  gap: 3,
  onClick: _function.noop,
  onMouseEnter: _function.noop,
  onMouseLeave: _function.noop
});
Avatar.propTypes = {
  children: _propTypes.default.node,
  color: _propTypes.default.oneOf(colorSet),
  shape: _propTypes.default.oneOf(shapeSet),
  size: _propTypes.default.oneOf(sizeSet),
  hoverMask: _propTypes.default.node,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  gap: _propTypes.default.number,
  imgAttr: _propTypes.default.object,
  src: _propTypes.default.string,
  srcSet: _propTypes.default.string,
  alt: _propTypes.default.string,
  onError: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  onMouseLeave: _propTypes.default.func,
  bottomSlot: _propTypes.default.shape({
    render: _propTypes.default.func,
    shape: _propTypes.default.oneOf(['circle', 'square']),
    text: _propTypes.default.node,
    bgColor: _propTypes.default.string,
    textColor: _propTypes.default.string,
    className: _propTypes.default.string,
    style: _propTypes.default.object
  }),
  topSlot: _propTypes.default.shape({
    render: _propTypes.default.func,
    gradientStart: _propTypes.default.string,
    gradientEnd: _propTypes.default.string,
    text: _propTypes.default.node,
    textColor: _propTypes.default.string,
    className: _propTypes.default.string,
    style: _propTypes.default.object
  }),
  border: _propTypes.default.oneOfType([_propTypes.default.shape({
    color: _propTypes.default.string,
    motion: _propTypes.default.bool
  }), _propTypes.default.bool]),
  contentMotion: _propTypes.default.bool
};
Avatar.elementType = 'Avatar';