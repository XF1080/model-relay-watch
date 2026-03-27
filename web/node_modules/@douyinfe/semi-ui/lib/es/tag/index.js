import _isString from "lodash/isString";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/tag/constants';
import Avatar from '../avatar/index';
import { IconClose } from '@douyinfe/semi-icons';
import { handlePrevent } from '@douyinfe/semi-foundation/lib/es/utils/a11y';
import '@douyinfe/semi-foundation/lib/es/tag/tag.css';
import cls from 'classnames';
export * from './interface';
const prefixCls = cssClasses.PREFIX;
const tagColors = strings.TAG_COLOR;
const tagSize = strings.TAG_SIZE;
const tagType = strings.TAG_TYPE;
const avatarShapeSet = strings.AVATAR_SHAPE;
export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
    this.close = this.close.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  // any other way to achieve this?
  static getDerivedStateFromProps(nextProps) {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible
      };
    }
    return null;
  }
  setVisible(visible) {
    if (!('visible' in this.props)) {
      this.setState({
        visible
      });
    }
  }
  close(e, value, tagKey) {
    const {
      onClose
    } = this.props;
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onClose && onClose(value, e, tagKey);
    // when user call e.preventDefault() in onClick callback, tag will not hidden
    if (e.defaultPrevented) {
      return;
    }
    this.setVisible(false);
  }
  handleKeyDown(event) {
    const {
      closable,
      onClick,
      onKeyDown
    } = this.props;
    switch (event.key) {
      case "Backspace":
      case "Delete":
        closable && this.close(event, this.props.children, this.props.tagKey);
        handlePrevent(event);
        break;
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
    onKeyDown && onKeyDown(event);
  }
  renderAvatar() {
    const {
      avatarShape,
      avatarSrc
    } = this.props;
    const avatar = /*#__PURE__*/React.createElement(Avatar, {
      src: avatarSrc,
      shape: avatarShape
    });
    return avatar;
  }
  render() {
    const _a = this.props,
      {
        tagKey,
        children,
        size,
        color,
        closable,
        visible,
        onClose,
        onClick,
        className,
        type,
        shape,
        avatarSrc,
        avatarShape,
        tabIndex,
        prefixIcon,
        suffixIcon,
        colorful,
        gradient
      } = _a,
      attr = __rest(_a, ["tagKey", "children", "size", "color", "closable", "visible", "onClose", "onClick", "className", "type", "shape", "avatarSrc", "avatarShape", "tabIndex", "prefixIcon", "suffixIcon", "colorful", "gradient"]);
    const {
      visible: isVisible
    } = this.state;
    const clickable = onClick !== Tag.defaultProps.onClick || closable;
    // only when the Tag is clickable or closable, the value of tabIndex is allowed to be passed in. 
    const a11yProps = {
      role: 'button',
      tabIndex: tabIndex || 0,
      onKeyDown: this.handleKeyDown
    };
    const baseProps = Object.assign(Object.assign({}, attr), {
      onClick,
      tabIndex: tabIndex,
      className: classNames(prefixCls, {
        [`${prefixCls}-default`]: size === 'default',
        [`${prefixCls}-small`]: size === 'small',
        [`${prefixCls}-large`]: size === 'large',
        [`${prefixCls}-square`]: shape === 'square',
        [`${prefixCls}-circle`]: shape === 'circle',
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${color}-${type}`]: color && type,
        [`${prefixCls}-closable`]: closable,
        [`${prefixCls}-invisible`]: !isVisible,
        [`${prefixCls}-avatar-${avatarShape}`]: avatarSrc,
        [`${prefixCls}-colorful`]: colorful,
        [`${prefixCls}-gradient`]: gradient
      }, className)
    });
    const wrapProps = clickable ? Object.assign(Object.assign({}, baseProps), a11yProps) : baseProps;
    const closeIcon = closable ? (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    React.createElement("div", {
      className: `${prefixCls}-close`,
      onClick: e => this.close(e, children, tagKey)
    }, /*#__PURE__*/React.createElement(IconClose, {
      size: "small"
    }))) : null;
    const stringChild = _isString(children);
    const contentCls = cls(`${prefixCls}-content`, `${prefixCls}-content-${stringChild ? 'ellipsis' : 'center'}`);
    return /*#__PURE__*/React.createElement("div", Object.assign({
      "aria-label": this.props['aria-label'] || stringChild ? `${closable ? 'Closable ' : ''}Tag: ${children}` : ''
    }, wrapProps), prefixIcon ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-prefix-icon`
    }, prefixIcon) : null, avatarSrc ? this.renderAvatar() : null, /*#__PURE__*/React.createElement("div", {
      className: contentCls
    }, children), suffixIcon ? /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-suffix-icon`
    }, suffixIcon) : null, closeIcon);
  }
}
Tag.defaultProps = {
  size: tagSize[0],
  color: tagColors[0],
  closable: false,
  // visible: true,
  type: tagType[0],
  onClose: () => undefined,
  onClick: () => undefined,
  onMouseEnter: () => undefined,
  style: {},
  className: '',
  shape: 'square',
  avatarShape: 'square',
  prefixIcon: null,
  suffixIcon: null,
  colorful: false,
  gradient: false
};
Tag.propTypes = {
  children: PropTypes.node,
  tagKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(tagSize),
  color: PropTypes.oneOf(tagColors),
  type: PropTypes.oneOf(tagType),
  closable: PropTypes.bool,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  prefixIcon: PropTypes.node,
  suffixIcon: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  avatarSrc: PropTypes.string,
  colorful: PropTypes.bool,
  gradient: PropTypes.bool,
  avatarShape: PropTypes.oneOf(avatarShapeSet),
  'aria-label': PropTypes.string
};