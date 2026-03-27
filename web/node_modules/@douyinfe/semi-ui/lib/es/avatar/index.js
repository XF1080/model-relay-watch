var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/avatar/constants';
import AvatarFoundation from '@douyinfe/semi-foundation/lib/es/avatar/foundation';
import '@douyinfe/semi-foundation/lib/es/avatar/avatar.css';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
import BaseComponent from '../_base/baseComponent';
import { handlePrevent } from '@douyinfe/semi-foundation/lib/es/utils/a11y';
import { getDefaultPropsFromGlobalConfig } from "../_utils";
import TopSlotSvg from "./TopSlotSvg";
const sizeSet = strings.SIZE;
const shapeSet = strings.SHAPE;
const colorSet = strings.COLOR;
const prefixCls = cssClasses.PREFIX;
export * from './interface';
export default class Avatar extends BaseComponent {
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
      const clickable = onClick !== noop;
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
          className: cls({
            [`${prefixCls}-no-focus-visible`]: clickable
          })
        });
        const imgProps = clickable ? Object.assign(Object.assign({}, imgBasicProps), a11yFocusProps) : imgBasicProps;
        content = /*#__PURE__*/React.createElement("img", Object.assign({
          alt: finalAlt
        }, imgProps));
      } else if (typeof children === 'string') {
        const tempAlt = alt !== null && alt !== void 0 ? alt : children;
        const finalAlt = clickable ? `clickable Avatar: ${tempAlt}` : tempAlt;
        const props = {
          role: 'img',
          'aria-label': finalAlt,
          className: cls(`${prefixCls}-label`, {
            [`${prefixCls}-no-focus-visible`]: clickable
          })
        };
        const finalProps = clickable ? Object.assign(Object.assign({}, props), a11yFocusProps) : props;
        const stringStyle = {
          transform: `scale(${this.state.scale})`
        };
        content = /*#__PURE__*/React.createElement("span", {
          className: `${prefixCls}-content`,
          style: stringStyle
        }, /*#__PURE__*/React.createElement("span", Object.assign({}, finalProps, {
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
        return /*#__PURE__*/React.createElement("span", {
          style: style,
          className: cls(`${prefixCls}-bottom_slot-shape_${this.props.bottomSlot.shape}`, `${prefixCls}-bottom_slot-shape_${this.props.bottomSlot.shape}-${this.props.size}`, (_a = this.props.bottomSlot.className) !== null && _a !== void 0 ? _a : "")
        }, this.props.bottomSlot.text);
      };
      return /*#__PURE__*/React.createElement("div", {
        className: cls([`${prefixCls}-bottom_slot`]),
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
      return /*#__PURE__*/React.createElement("div", {
        style: (_a = this.props.topSlot.style) !== null && _a !== void 0 ? _a : {},
        className: cls([`${prefixCls}-top_slot-wrapper`, (_b = this.props.topSlot.className) !== null && _b !== void 0 ? _b : "", {
          [`${prefixCls}-animated`]: this.props.contentMotion
        }])
      }, /*#__PURE__*/React.createElement("div", {
        className: cls([`${prefixCls}-top_slot-bg`, `${prefixCls}-top_slot-bg-${this.props.size}`])
      }, /*#__PURE__*/React.createElement("div", {
        className: cls([`${prefixCls}-top_slot-bg-svg`, `${prefixCls}-top_slot-bg-svg-${this.props.size}`])
      }, /*#__PURE__*/React.createElement(TopSlotSvg, {
        gradientStart: (_c = this.props.topSlot.gradientStart) !== null && _c !== void 0 ? _c : "var(--semi-color-primary)",
        gradientEnd: (_d = this.props.topSlot.gradientEnd) !== null && _d !== void 0 ? _d : "var(--semi-color-primary)"
      }))), /*#__PURE__*/React.createElement("div", {
        className: cls([`${prefixCls}-top_slot`])
      }, /*#__PURE__*/React.createElement("div", {
        style: textStyle,
        className: cls([`${prefixCls}-top_slot-content`, `${prefixCls}-top_slot-content-${this.props.size}`])
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
    this.avatarRef = /*#__PURE__*/React.createRef();
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
    this.foundation = new AvatarFoundation(this.adapter);
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
        handlePrevent(event);
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
    if (!strings.SIZE.includes(size)) {
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
    const avatarCls = cls(prefixCls, {
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-${color}`]: color && !isImg,
      [`${prefixCls}-img`]: isImg,
      [`${prefixCls}-focus`]: focusVisible,
      [`${prefixCls}-animated`]: contentMotion
    }, className);
    const hoverRender = hoverContent ? (/*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-hover`,
      "x-semi-prop": "hoverContent"
    }, hoverContent)) : null;
    let avatar = /*#__PURE__*/React.createElement("span", Object.assign({}, others, {
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
      avatar = /*#__PURE__*/React.createElement("div", {
        style: Object.assign({
          position: "relative"
        }, customStyle)
      }, avatar, /*#__PURE__*/React.createElement("span", {
        style: borderStyle,
        className: cls([`${prefixCls}-additionalBorder`, `${prefixCls}-additionalBorder-${size}`, {
          [`${prefixCls}-${shape}`]: shape
        }])
      }), typeof this.props.border === 'object' && this.props.border.motion && /*#__PURE__*/React.createElement("span", {
        style: borderStyle,
        className: cls([`${prefixCls}-additionalBorder`, `${prefixCls}-additionalBorder-${size}`, {
          [`${prefixCls}-${shape}`]: shape,
          [`${prefixCls}-additionalBorder-animated`]: typeof this.props.border === 'object' && ((_a = this.props.border) === null || _a === void 0 ? void 0 : _a.motion)
        }])
      }));
    }
    if (shouldWrap) {
      return /*#__PURE__*/React.createElement("span", Object.assign({
        className: cls([`${prefixCls}-wrapper`]),
        style: customStyle
      }, mouseEvent), avatar, topSlot && ["extra-small", "small", "default", "medium", "large", "extra-large"].includes(size) && shape === "circle" && this.renderTopSlot(), bottomSlot && ["extra-small", "small", "default", "medium", "large", "extra-large"].includes(size) && this.renderBottomSlot());
    } else {
      return avatar;
    }
  }
}
Avatar.__SemiComponentName__ = "Avatar";
Avatar.defaultProps = getDefaultPropsFromGlobalConfig(Avatar.__SemiComponentName__, {
  size: 'medium',
  color: 'grey',
  shape: 'circle',
  gap: 3,
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop
});
Avatar.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(colorSet),
  shape: PropTypes.oneOf(shapeSet),
  size: PropTypes.oneOf(sizeSet),
  hoverMask: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  gap: PropTypes.number,
  imgAttr: PropTypes.object,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  alt: PropTypes.string,
  onError: PropTypes.func,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  bottomSlot: PropTypes.shape({
    render: PropTypes.func,
    shape: PropTypes.oneOf(['circle', 'square']),
    text: PropTypes.node,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  }),
  topSlot: PropTypes.shape({
    render: PropTypes.func,
    gradientStart: PropTypes.string,
    gradientEnd: PropTypes.string,
    text: PropTypes.node,
    textColor: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  }),
  border: PropTypes.oneOfType([PropTypes.shape({
    color: PropTypes.string,
    motion: PropTypes.bool
  }), PropTypes.bool]),
  contentMotion: PropTypes.bool
};
Avatar.elementType = 'Avatar';