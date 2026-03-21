"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _portal = _interopRequireDefault(require("../_portal"));
var _classnames = _interopRequireDefault(require("classnames"));
var _context = _interopRequireDefault(require("../configProvider/context"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sideSheet/constants");
var _SideSheetContent = _interopRequireDefault(require("./SideSheetContent"));
var _sideSheetFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/sideSheet/sideSheetFoundation"));
require("@douyinfe/semi-foundation/lib/cjs/sideSheet/sideSheet.css");
var _cssAnimation = _interopRequireDefault(require("../_cssAnimation"));
var _utils = require("../_utils");
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
const defaultWidthList = _constants.strings.WIDTH;
const defaultHeight = _constants.strings.HEIGHT;
class SideSheet extends _baseComponent.default {
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
    this.foundation = new _sideSheetFoundation.default(this.adapter);
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
    this.scrollBarWidth = (0, _utils.getScrollbarWidth)();
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
    const classList = (0, _classnames.default)(prefixCls, className, {
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
    return /*#__PURE__*/_react.default.createElement(_cssAnimation.default, {
      motion: this.props.motion,
      animationState: visible ? 'enter' : 'leave',
      startClassName: visible ? `${prefixCls}-animation-mask_show` : `${prefixCls}-animation-mask_hide`,
      onAnimationEnd: this.updateState
    }, _ref => {
      let {
        animationClassName: maskAnimationClassName,
        animationEventsNeedBind: maskAnimationEventsNeedBind
      } = _ref;
      return /*#__PURE__*/_react.default.createElement(_cssAnimation.default, {
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
        return shouldRender ? /*#__PURE__*/_react.default.createElement(_portal.default, {
          getPopupContainer: getPopupContainer,
          style: wrapperStyle
        }, /*#__PURE__*/_react.default.createElement(_SideSheetContent.default, Object.assign({}, contentProps, {
          maskExtraProps: maskAnimationEventsNeedBind,
          wrapperExtraProps: animationEventsNeedBind,
          dialogClassName: animationClassName,
          maskClassName: maskAnimationClassName,
          maskStyle: Object.assign({}, maskStyle),
          style: Object.assign(Object.assign({}, animationStyle), style)
        }), children)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
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
exports.default = SideSheet;
SideSheet.contextType = _context.default;
SideSheet.propTypes = {
  bodyStyle: _propTypes.default.object,
  headerStyle: _propTypes.default.object,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  closable: _propTypes.default.bool,
  disableScroll: _propTypes.default.bool,
  getPopupContainer: _propTypes.default.func,
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  mask: _propTypes.default.bool,
  maskClosable: _propTypes.default.bool,
  maskStyle: _propTypes.default.object,
  motion: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object, _propTypes.default.func]),
  onCancel: _propTypes.default.func,
  placement: _propTypes.default.oneOf(_constants.strings.PLACEMENT),
  size: _propTypes.default.oneOf(_constants.strings.SIZE),
  style: _propTypes.default.object,
  title: _propTypes.default.node,
  visible: _propTypes.default.bool,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  zIndex: _propTypes.default.number,
  afterVisibleChange: _propTypes.default.func,
  closeOnEsc: _propTypes.default.bool,
  footer: _propTypes.default.node,
  keepDOM: _propTypes.default.bool,
  'aria-label': _propTypes.default.string
};
SideSheet.__SemiComponentName__ = "SideSheet";
SideSheet.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(SideSheet.__SemiComponentName__, {
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
  afterVisibleChange: _noop2.default,
  keepDOM: false
});