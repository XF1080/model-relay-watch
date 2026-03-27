"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/steps/constants");
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FillStep = props => {
  const {
    prefixCls = _constants.stepsClasses.ITEM,
    className = '',
    title,
    description,
    status = 'wait',
    style,
    onClick,
    icon,
    onChange,
    stepNumber,
    onKeyDown
  } = props;
  const renderIcon = () => {
    let inner, progress;
    if ('icon' in props) {
      inner = icon;
    } else if ('status' in props) {
      switch (status) {
        case 'error':
          inner = /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertCircle, {
            size: "extra-large"
          });
          break;
        case 'wait':
          inner = stepNumber;
          break;
        case 'process':
          inner = stepNumber;
          progress = true;
          break;
        case 'finish':
          inner = /*#__PURE__*/_react.default.createElement(_semiIcons.IconTickCircle, {
            size: "extra-large"
          });
          break;
        case 'warning':
          inner = /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertTriangle, {
            size: "extra-large"
          });
          break;
        default:
          inner = null;
          break;
      }
    }
    const cls = (0, _classnames.default)({
      [`${prefixCls}-left`]: true,
      [`${prefixCls}-icon`]: 'icon' in props,
      [`${prefixCls}-plain`]: !('icon' in props),
      [`${prefixCls}-icon-process`]: progress,
      [`${prefixCls}-hover`]: onChange || onClick
    });
    return inner ? /*#__PURE__*/_react.default.createElement("div", {
      className: cls
    }, inner) : null;
  };
  const handleClick = e => {
    onClick === null || onClick === void 0 ? void 0 : onClick(e);
    onChange === null || onChange === void 0 ? void 0 : onChange();
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
      onChange === null || onChange === void 0 ? void 0 : onChange();
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    role: props["role"],
    "aria-label": props["aria-label"],
    "aria-current": "step",
    tabIndex: 0,
    className: (0, _classnames.default)({
      [prefixCls]: true,
      [`${prefixCls}-${status}`]: Boolean(status),
      [`${prefixCls}-${status}-hover`]: Boolean(status) && (onChange || onClick),
      [`${prefixCls}-${status}-active`]: Boolean(status) && (onChange || onClick),
      [`${prefixCls}-clickable`]: onChange || onClick
    }, className),
    style: style,
    onClick: e => {
      handleClick(e);
    },
    onKeyDown: handleKeyDown
  }, renderIcon(), /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-content`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-title`,
    title: typeof title === 'string' ? title : null
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: `${prefixCls}-title-text`
  }, title)), /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefixCls}-description`,
    title: typeof description === 'string' ? description : null
  }, description)));
};
var _default = exports.default = FillStep;