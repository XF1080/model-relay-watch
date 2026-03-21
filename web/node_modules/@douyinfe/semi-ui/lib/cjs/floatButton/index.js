"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/floatButton/constants");
require("@douyinfe/semi-foundation/lib/cjs/floatButton/floatButton.css");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _badge = _interopRequireDefault(require("../badge"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable jsx-a11y/no-static-element-interactions */

const prefixCls = _constants.cssClasses.PREFIX;
class FloatButton extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleClick = e => {
      const {
        href,
        target,
        onClick,
        disabled
      } = this.props;
      if (disabled) {
        return;
      }
      // 如果有 href，执行跳转
      if (href) {
        if (target === '_blank') {
          window.open(href, '_blank');
        } else {
          window.location.href = href;
        }
      }
      // 如果有 onClick 回调，执行它
      if (onClick) {
        onClick(e);
      }
    };
  }
  render() {
    const {
      className,
      style,
      colorful,
      size,
      icon,
      badge,
      shape,
      disabled
    } = this.props;
    const body = /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(`${prefixCls}-body`, {
        [`${prefixCls}-${shape}`]: shape,
        [`${prefixCls}-colorful`]: colorful,
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-${size}`]: size
      })
    }, icon);
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      _react.default.createElement("div", {
        style: style,
        className: (0, _classnames.default)(prefixCls, className, {
          [`${prefixCls}-${size}`]: size,
          [`${prefixCls}-${shape}`]: shape
        }),
        onClick: this.handleClick
      }, badge ? /*#__PURE__*/_react.default.createElement(_badge.default, Object.assign({}, badge), body) : body)
    );
  }
}
exports.default = FloatButton;
FloatButton.defaultProps = {
  shape: 'round',
  colorful: false,
  size: 'default'
};