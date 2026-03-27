"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/tag/constants");
var _index = _interopRequireDefault(require("../avatar/index"));
var _semiIcons = require("@douyinfe/semi-icons");
var _a11y = require("@douyinfe/semi-foundation/lib/cjs/utils/a11y");
require("@douyinfe/semi-foundation/lib/cjs/tag/tag.css");
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
const tagColors = _constants.strings.TAG_COLOR;
const tagSize = _constants.strings.TAG_SIZE;
const tagType = _constants.strings.TAG_TYPE;
const avatarShapeSet = _constants.strings.AVATAR_SHAPE;
class Tag extends _react.Component {
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
        (0, _a11y.handlePrevent)(event);
        break;
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
    onKeyDown && onKeyDown(event);
  }
  renderAvatar() {
    const {
      avatarShape,
      avatarSrc
    } = this.props;
    const avatar = /*#__PURE__*/_react.default.createElement(_index.default, {
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
      className: (0, _classnames.default)(prefixCls, {
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
    _react.default.createElement("div", {
      className: `${prefixCls}-close`,
      onClick: e => this.close(e, children, tagKey)
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, {
      size: "small"
    }))) : null;
    const stringChild = (0, _isString2.default)(children);
    const contentCls = (0, _classnames.default)(`${prefixCls}-content`, `${prefixCls}-content-${stringChild ? 'ellipsis' : 'center'}`);
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      "aria-label": this.props['aria-label'] || stringChild ? `${closable ? 'Closable ' : ''}Tag: ${children}` : ''
    }, wrapProps), prefixIcon ? /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-prefix-icon`
    }, prefixIcon) : null, avatarSrc ? this.renderAvatar() : null, /*#__PURE__*/_react.default.createElement("div", {
      className: contentCls
    }, children), suffixIcon ? /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-suffix-icon`
    }, suffixIcon) : null, closeIcon);
  }
}
exports.default = Tag;
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
  children: _propTypes.default.node,
  tagKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  size: _propTypes.default.oneOf(tagSize),
  color: _propTypes.default.oneOf(tagColors),
  type: _propTypes.default.oneOf(tagType),
  closable: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  onClose: _propTypes.default.func,
  onClick: _propTypes.default.func,
  prefixIcon: _propTypes.default.node,
  suffixIcon: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  avatarSrc: _propTypes.default.string,
  colorful: _propTypes.default.bool,
  gradient: _propTypes.default.bool,
  avatarShape: _propTypes.default.oneOf(avatarShapeSet),
  'aria-label': _propTypes.default.string
};