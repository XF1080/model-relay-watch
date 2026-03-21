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
var _toastFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/toast/toastFoundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/toast/constants");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _index = _interopRequireDefault(require("../iconButton/index"));
var _semiIcons = require("@douyinfe/semi-icons");
var _utils = require("../_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
class Toast extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.toastEle = /*#__PURE__*/_react.default.createRef();
    this.clearCloseTimer = () => {
      this.foundation.clearCloseTimer_();
    };
    this.startCloseTimer = () => {
      this.foundation.startCloseTimer_();
    };
    this.restartCloseTimer = () => {
      this.foundation.restartCloseTimer();
    };
    this.state = {};
    this.foundation = new _toastFoundation.default(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyWrapperToRemove: id => {
        this.props.close(id);
      },
      notifyClose: () => {
        this.props.onClose();
      }
    });
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  close(e) {
    this.foundation.close(e);
  }
  renderIcon() {
    const {
      type,
      icon
    } = this.props;
    const iconMap = {
      warning: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertTriangle, null),
      success: /*#__PURE__*/_react.default.createElement(_semiIcons.IconTickCircle, null),
      info: /*#__PURE__*/_react.default.createElement(_semiIcons.IconInfoCircle, null),
      error: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertCircle, null)
    };
    const iconType = iconMap[type];
    const iconSize = 'large';
    const iconCls = (0, _classnames.default)(`${prefixCls}-icon`, `${prefixCls}-icon-${type}`);
    if (icon) {
      return (0, _utils.isSemiIcon)(icon) ? /*#__PURE__*/_react.default.cloneElement(icon, {
        size: iconSize,
        className: `${prefixCls}-icon`
      }) : icon;
    }
    if (type && iconType) {
      return /*#__PURE__*/_react.default.cloneElement(iconType, {
        size: iconSize,
        className: iconCls
      });
    }
    return null;
  }
  render() {
    const {
      content,
      type,
      theme,
      showClose,
      textMaxWidth,
      className,
      style
    } = this.props;
    const direction = this.props.direction || this.context.direction;
    const toastCls = (0, _classnames.default)(prefixCls, className, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-${theme}`]: theme === 'light',
      [`${prefixCls}-rtl`]: direction === 'rtl'
    });
    const textStyle = {};
    textStyle.maxWidth = textMaxWidth;
    const btnTheme = 'borderless';
    const btnSize = 'small';
    const reservedIndex = this.props.positionInList ? this.props.positionInList.length - this.props.positionInList.index - 1 : 0;
    const toastEle = /*#__PURE__*/_react.default.createElement("div", {
      ref: this.toastEle,
      role: "alert",
      "aria-label": `${type ? type : 'default'} type`,
      className: toastCls,
      style: Object.assign(Object.assign({}, style), {
        transform: `translate3d(0,0,${reservedIndex * -10}px)`
      }),
      onMouseEnter: this.clearCloseTimer,
      onMouseLeave: this.startCloseTimer,
      onAnimationStart: this.props.onAnimationStart,
      onAnimationEnd: this.props.onAnimationEnd
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content`
    }, this.renderIcon(), /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-content-text`,
      style: textStyle,
      "x-semi-prop": "content"
    }, content), showClose && (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-close-button`
    }, /*#__PURE__*/_react.default.createElement(_index.default, {
      onClick: e => this.close(e),
      type: "tertiary",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, {
        "x-semi-prop": "icon"
      }),
      theme: btnTheme,
      size: btnSize
    })))));
    if (this.props.stack) {
      const height = this.props.stackExpanded && this.toastEle.current && getComputedStyle(this.toastEle.current).height || 0;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-zero-height-wrapper`,
        style: {
          height
        }
      }, toastEle);
    } else {
      return toastEle;
    }
  }
}
Toast.contextType = _context.default;
Toast.propTypes = {
  onClose: _propTypes.default.func,
  content: _propTypes.default.node,
  close: _propTypes.default.func,
  duration: _propTypes.default.number,
  theme: _propTypes.default.oneOf(_constants.strings.themes),
  type: _propTypes.default.oneOf(_constants.strings.types),
  textMaxWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  showClose: _propTypes.default.bool,
  stack: _propTypes.default.bool,
  stackExpanded: _propTypes.default.bool,
  icon: _propTypes.default.node,
  direction: _propTypes.default.oneOf(_constants.strings.directions)
};
Toast.__SemiComponentName__ = "Toast";
Toast.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Toast.__SemiComponentName__, {
  onClose: _noop2.default,
  content: '',
  close: _noop2.default,
  duration: _constants.numbers.duration,
  textMaxWidth: 450,
  showClose: true,
  stack: false,
  stackExpanded: false,
  theme: 'normal'
});
var _default = exports.default = Toast;