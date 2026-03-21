import _noop from "lodash/noop";
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import ConfigContext from '../configProvider/context';
import ToastFoundation from '@douyinfe/semi-foundation/lib/es/toast/toastFoundation';
import { numbers, cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/toast/constants';
import BaseComponent from '../_base/baseComponent';
import Button from '../iconButton/index';
import { IconClose, IconAlertTriangle, IconInfoCircle, IconTickCircle, IconAlertCircle } from '@douyinfe/semi-icons';
import { getDefaultPropsFromGlobalConfig, isSemiIcon } from '../_utils';
const prefixCls = cssClasses.PREFIX;
class Toast extends BaseComponent {
  constructor(props) {
    super(props);
    this.toastEle = /*#__PURE__*/React.createRef();
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
    this.foundation = new ToastFoundation(this.adapter);
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
      warning: /*#__PURE__*/React.createElement(IconAlertTriangle, null),
      success: /*#__PURE__*/React.createElement(IconTickCircle, null),
      info: /*#__PURE__*/React.createElement(IconInfoCircle, null),
      error: /*#__PURE__*/React.createElement(IconAlertCircle, null)
    };
    const iconType = iconMap[type];
    const iconSize = 'large';
    const iconCls = cls(`${prefixCls}-icon`, `${prefixCls}-icon-${type}`);
    if (icon) {
      return isSemiIcon(icon) ? /*#__PURE__*/React.cloneElement(icon, {
        size: iconSize,
        className: `${prefixCls}-icon`
      }) : icon;
    }
    if (type && iconType) {
      return /*#__PURE__*/React.cloneElement(iconType, {
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
    const toastCls = cls(prefixCls, className, {
      [`${prefixCls}-${type}`]: true,
      [`${prefixCls}-${theme}`]: theme === 'light',
      [`${prefixCls}-rtl`]: direction === 'rtl'
    });
    const textStyle = {};
    textStyle.maxWidth = textMaxWidth;
    const btnTheme = 'borderless';
    const btnSize = 'small';
    const reservedIndex = this.props.positionInList ? this.props.positionInList.length - this.props.positionInList.index - 1 : 0;
    const toastEle = /*#__PURE__*/React.createElement("div", {
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
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-content`
    }, this.renderIcon(), /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-content-text`,
      style: textStyle,
      "x-semi-prop": "content"
    }, content), showClose && (/*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-close-button`
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: e => this.close(e),
      type: "tertiary",
      icon: /*#__PURE__*/React.createElement(IconClose, {
        "x-semi-prop": "icon"
      }),
      theme: btnTheme,
      size: btnSize
    })))));
    if (this.props.stack) {
      const height = this.props.stackExpanded && this.toastEle.current && getComputedStyle(this.toastEle.current).height || 0;
      return /*#__PURE__*/React.createElement("div", {
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
Toast.contextType = ConfigContext;
Toast.propTypes = {
  onClose: PropTypes.func,
  content: PropTypes.node,
  close: PropTypes.func,
  duration: PropTypes.number,
  theme: PropTypes.oneOf(strings.themes),
  type: PropTypes.oneOf(strings.types),
  textMaxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  showClose: PropTypes.bool,
  stack: PropTypes.bool,
  stackExpanded: PropTypes.bool,
  icon: PropTypes.node,
  direction: PropTypes.oneOf(strings.directions)
};
Toast.__SemiComponentName__ = "Toast";
Toast.defaultProps = getDefaultPropsFromGlobalConfig(Toast.__SemiComponentName__, {
  onClose: _noop,
  content: '',
  close: _noop,
  duration: numbers.duration,
  textMaxWidth: 450,
  showClose: true,
  stack: false,
  stackExpanded: false,
  theme: 'normal'
});
export default Toast;