import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import BaseComponent from '../_base/baseComponent';
import PropTypes from 'prop-types';
import Portal from '../_portal';
import cls from 'classnames';
import ConfigContext from '../configProvider/context';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/sideSheet/constants';
import SideSheetContent from './SideSheetContent';
import SideSheetFoundation from '@douyinfe/semi-foundation/lib/es/sideSheet/sideSheetFoundation';
import '@douyinfe/semi-foundation/lib/es/sideSheet/sideSheet.css';
import CSSAnimation from "../_cssAnimation";
import { getDefaultPropsFromGlobalConfig, getScrollbarWidth } from '../_utils';
const prefixCls = cssClasses.PREFIX;
const defaultWidthList = strings.WIDTH;
const defaultHeight = strings.HEIGHT;
export default class SideSheet extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleCancel = e => {
      this.foundation.handleCancel(e);
    };
    this.handleKeyDown = e => {
      this.foundation.handleKeyDown(e);
    };
    this.updateState = () => {
      this.foundation.toggleDisplayNone(!this.props.visible);
    };
    this.state = {
      displayNone: !this.props.visible
    };
    this.foundation = new SideSheetFoundation(this.adapter);
    this.bodyOverflow = '';
    this.scrollBarWidth = 0;
    this.originBodyWidth = '100%';
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      disabledBodyScroll: () => {
        const {
          getPopupContainer
        } = this.props;
        this.bodyOverflow = document.body.style.overflow || '';
        if (!getPopupContainer && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          document.body.style.width = `calc(${this.originBodyWidth || '100%'} - ${this.scrollBarWidth}px)`;
        }
      },
      enabledBodyScroll: () => {
        const {
          getPopupContainer
        } = this.props;
        if (!getPopupContainer && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.width = this.originBodyWidth;
        }
      },
      notifyCancel: e => {
        this.props.onCancel && this.props.onCancel(e);
      },
      notifyVisibleChange: visible => {
        this.props.afterVisibleChange(visible);
      },
      setOnKeyDownListener: () => {
        if (window) {
          window.addEventListener('keydown', this.handleKeyDown);
        }
      },
      removeKeyDownListener: () => {
        if (window) {
          window.removeEventListener('keydown', this.handleKeyDown);
        }
      },
      toggleDisplayNone: displayNone => {
        if (displayNone !== this.state.displayNone) {
          this.setState({
            displayNone: displayNone
          });
        }
      }
    });
  }
  static getDerivedStateFromProps(props, prevState) {
    const newState = {};
    if (props.visible && prevState.displayNone) {
      newState.displayNone = false;
    }
    if (!props.visible && !props.motion && !prevState.displayNone) {
      newState.displayNone = true;
    }
    return newState;
  }
  componentDidMount() {
    this.scrollBarWidth = getScrollbarWidth();
    this.originBodyWidth = document.body.style.width;
    if (this.props.visible) {
      this.foundation.beforeShow();
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // hide => show
    if (!prevProps.visible && this.props.visible) {
      this.foundation.beforeShow();
    }
    // show => hide
    if (prevProps.visible && !this.props.visible) {
      this.foundation.afterHide();
    }
    if (prevState.displayNone !== this.state.displayNone) {
      this.foundation.onVisibleChange(!this.state.displayNone);
    }
  }
  componentWillUnmount() {
    if (this.props.visible) {
      this.foundation.destroy();
    }
  }
  renderContent() {
    const _a = this.props,
      {
        placement,
        className,
        children,
        width,
        height,
        motion,
        visible,
        style,
        maskStyle,
        size,
        zIndex,
        getPopupContainer,
        keepDOM,
        canVerticalSetWidth
      } = _a,
      props = __rest(_a, ["placement", "className", "children", "width", "height", "motion", "visible", "style", "maskStyle", "size", "zIndex", "getPopupContainer", "keepDOM", "canVerticalSetWidth"]);
    let wrapperStyle = {
      zIndex
    };
    if (getPopupContainer) {
      wrapperStyle = {
        zIndex,
        position: 'static'
      };
    }
    const {
      direction
    } = this.context;
    const isVertical = placement === 'left' || placement === 'right';
    const isHorizontal = placement === 'top' || placement === 'bottom';
    const sheetHeight = isHorizontal ? height ? height : defaultHeight : '100%';
    const classList = cls(prefixCls, className, {
      [`${prefixCls}-${placement}`]: placement,
      [`${prefixCls}-popup`]: getPopupContainer,
      [`${prefixCls}-horizontal`]: isHorizontal,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-hidden`]: keepDOM && this.state.displayNone
    });
    const contentProps = Object.assign(Object.assign(Object.assign({}, isVertical || canVerticalSetWidth ? width ? {
      width
    } : {} : {
      width: "100%"
    }), props), {
      visible,
      motion: false,
      size,
      className: classList,
      height: sheetHeight,
      onClose: this.handleCancel
    });
    const shouldRender = this.props.visible || this.props.keepDOM || this.props.motion && !this.state.displayNone /* When there is animation, we use displayNone to judge whether animation is ended and judge whether to unmount content */;
    // Since user could change animate duration , we don't know which animation end first. So we call updateState func twice.
    return /*#__PURE__*/React.createElement(CSSAnimation, {
      motion: this.props.motion,
      animationState: visible ? 'enter' : 'leave',
      startClassName: visible ? `${prefixCls}-animation-mask_show` : `${prefixCls}-animation-mask_hide`,
      onAnimationEnd: this.updateState
    }, _ref => {
      let {
        animationClassName: maskAnimationClassName,
        animationEventsNeedBind: maskAnimationEventsNeedBind
      } = _ref;
      return /*#__PURE__*/React.createElement(CSSAnimation, {
        motion: this.props.motion,
        animationState: visible ? 'enter' : 'leave',
        startClassName: visible ? `${prefixCls}-animation-content_show_${this.props.placement}` : `${prefixCls}-animation-content_hide_${this.props.placement}`,
        onAnimationEnd: this.updateState /* for no mask case*/
      }, _ref2 => {
        let {
          animationClassName,
          animationStyle,
          animationEventsNeedBind
        } = _ref2;
        return shouldRender ? /*#__PURE__*/React.createElement(Portal, {
          getPopupContainer: getPopupContainer,
          style: wrapperStyle
        }, /*#__PURE__*/React.createElement(SideSheetContent, Object.assign({}, contentProps, {
          maskExtraProps: maskAnimationEventsNeedBind,
          wrapperExtraProps: animationEventsNeedBind,
          dialogClassName: animationClassName,
          maskClassName: maskAnimationClassName,
          maskStyle: Object.assign({}, maskStyle),
          style: Object.assign(Object.assign({}, animationStyle), style)
        }), children)) : /*#__PURE__*/React.createElement(React.Fragment, null);
      });
    });
  }
  render() {
    const {
      zIndex,
      getPopupContainer,
      visible
    } = this.props;
    return this.renderContent();
  }
}
SideSheet.contextType = ConfigContext;
SideSheet.propTypes = {
  bodyStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  closable: PropTypes.bool,
  disableScroll: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  mask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  maskStyle: PropTypes.object,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.func]),
  onCancel: PropTypes.func,
  placement: PropTypes.oneOf(strings.PLACEMENT),
  size: PropTypes.oneOf(strings.SIZE),
  style: PropTypes.object,
  title: PropTypes.node,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  zIndex: PropTypes.number,
  afterVisibleChange: PropTypes.func,
  closeOnEsc: PropTypes.bool,
  footer: PropTypes.node,
  keepDOM: PropTypes.bool,
  'aria-label': PropTypes.string
};
SideSheet.__SemiComponentName__ = "SideSheet";
SideSheet.defaultProps = getDefaultPropsFromGlobalConfig(SideSheet.__SemiComponentName__, {
  visible: false,
  motion: true,
  mask: true,
  placement: 'right',
  closable: true,
  footer: null,
  zIndex: 1000,
  maskClosable: true,
  size: 'small',
  disableScroll: true,
  closeOnEsc: false,
  afterVisibleChange: _noop,
  keepDOM: false
});