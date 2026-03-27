"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _context = _interopRequireDefault(require("../configProvider/context"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/notification/constants");
var _notificationFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/notification/notificationFoundation"));
var _iconButton = _interopRequireDefault(require("../iconButton"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _utils = require("../_utils");
var _semiIcons = require("@douyinfe/semi-icons");
var _uuid = require("@douyinfe/semi-foundation/lib/cjs/utils/uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.NOTICE;
const {
  duration
} = _constants.numbers;
const {
  types,
  themes,
  directions
} = _constants.strings;
class Notice extends _baseComponent.default {
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyWrapperToRemove: id => {
        this.props.close(id);
      },
      notifyClose: () => {
        this.props.onClose();
        this.props.onHookClose && this.props.onHookClose();
      }
    });
  }
  constructor(props) {
    super(props);
    this.clearCloseTimer = () => {
      this.foundation._clearCloseTimer();
    };
    this.startCloseTimer = () => {
      this.foundation._startCloseTimer();
    };
    this.close = e => {
      this.props.onCloseClick(this.props.id);
      this.foundation.close(e);
    };
    this.notifyClick = e => {
      this.props.onClick(e);
    };
    this.state = {
      visible: true
    };
    this.foundation = new _notificationFoundation.default(this.adapter);
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  renderTypeIcon() {
    const {
      type,
      icon
    } = this.props;
    const iconMap = {
      warning: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertTriangle, {
        size: "large"
      }),
      success: /*#__PURE__*/_react.default.createElement(_semiIcons.IconTickCircle, {
        size: "large"
      }),
      info: /*#__PURE__*/_react.default.createElement(_semiIcons.IconInfoCircle, {
        size: "large"
      }),
      error: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertCircle, {
        size: "large"
      })
    };
    let iconType = iconMap[type];
    const iconCls = (0, _classnames.default)({
      [`${prefixCls}-icon`]: true,
      [`${prefixCls}-${type}`]: true
    });
    if (icon) {
      iconType = icon;
    }
    if (iconType) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: iconCls,
        "x-semi-prop": "icon"
      }, (0, _utils.isSemiIcon)(iconType) ? /*#__PURE__*/_react.default.cloneElement(iconType, {
        size: iconType.props.size || 'large'
      }) : iconType);
    }
    return null;
  }
  render() {
    const direction = this.props.direction || this.context.direction;
    const defaultPosition = direction === 'rtl' ? 'topLeft' : 'topRight';
    const _a = this.props,
      {
        content,
        title,
        theme,
        position = defaultPosition,
        type,
        id,
        onCloseClick,
        className,
        showClose,
        style
      } = _a,
      attr = __rest(_a, ["content", "title", "theme", "position", "type", "id", "onCloseClick", "className", "showClose", "style"]);
    const {
      visible
    } = this.state;
    const wrapper = (0, _classnames.default)(prefixCls, className, {
      [`${prefixCls}-close`]: !visible,
      [`${prefixCls}-icon-show`]: types.includes(type),
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-${theme}`]: theme === 'light',
      [`${prefixCls}-rtl`]: direction === 'rtl'
    });
    const titleID = (0, _uuid.getUuidShort)({});
    return /*#__PURE__*/_react.default.createElement("div", {
      className: wrapper,
      style: style,
      onMouseEnter: this.clearCloseTimer,
      onMouseLeave: this.startCloseTimer,
      onClick: this.notifyClick,
      "aria-labelledby": titleID,
      role: 'alert',
      onAnimationEnd: this.props.onAnimationEnd,
      onAnimationStart: this.props.onAnimationStart
    }, /*#__PURE__*/_react.default.createElement("div", null, this.renderTypeIcon()), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-inner`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content-wrapper`
    }, title ? (/*#__PURE__*/_react.default.createElement("div", {
      id: titleID,
      className: `${prefixCls}-title`,
      "x-semi-prop": "title"
    }, title)) : '', content ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content`,
      "x-semi-prop": "content"
    }, content)) : ''), showClose && (/*#__PURE__*/_react.default.createElement(_iconButton.default, {
      className: `${prefixCls}-icon-close`,
      type: "tertiary",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, null),
      theme: "borderless",
      size: "small",
      onClick: this.close
    }))));
  }
}
Notice.contextType = _context.default;
Notice.propTypes = {
  duration: _propTypes.default.number,
  id: _propTypes.default.string,
  title: _propTypes.default.node,
  content: _propTypes.default.node,
  type: _propTypes.default.oneOf(types),
  theme: _propTypes.default.oneOf(themes),
  icon: _propTypes.default.node,
  onClick: _propTypes.default.func,
  onClose: _propTypes.default.func,
  onCloseClick: _propTypes.default.func,
  showClose: _propTypes.default.bool,
  // private props
  close: _propTypes.default.func,
  direction: _propTypes.default.oneOf(directions)
};
Notice.__SemiComponentName__ = "Notification";
Notice.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Notice.__SemiComponentName__, {
  duration,
  id: '',
  close: _noop2.default,
  onClose: _noop2.default,
  onClick: _noop2.default,
  onCloseClick: _noop2.default,
  content: '',
  title: '',
  showClose: true,
  theme: 'normal'
});
var _default = exports.default = Notice;