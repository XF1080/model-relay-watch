"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyFns = exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/modal/constants");
require("@douyinfe/semi-foundation/lib/cjs/modal/modal.css");
var _modalFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/modal/modalFoundation"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _cssAnimation = _interopRequireDefault(require("../_cssAnimation"));
var _portal = _interopRequireDefault(require("../_portal"));
var _utils = require("../_utils");
var _button = _interopRequireDefault(require("../button"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _ModalContent = _interopRequireDefault(require("./ModalContent"));
var _confirm = _interopRequireWildcard(require("./confirm"));
var _useModal = _interopRequireDefault(require("./useModal"));
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
let destroyFns = exports.destroyFns = [];
class Modal extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.bodyOverflow = null;
    this.handleCancel = e => {
      this.foundation.handleCancel(e);
    };
    this.handleOk = e => {
      this.foundation.handleOk(e);
    };
    this.updateState = () => {
      const {
        visible
      } = this.props;
      this.foundation.toggleDisplayNone(!visible);
    };
    this.renderFooter = () => {
      const {
        okText,
        okType,
        cancelText,
        confirmLoading,
        cancelLoading,
        hasCancel,
        footerFill
      } = this.props;
      const getCancelButton = locale => {
        var _a;
        if (!hasCancel) {
          return null;
        } else {
          return /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
            "aria-label": "cancel",
            onClick: this.handleCancel,
            loading: cancelLoading === undefined ? this.state.onCancelReturnPromiseStatus === "pending" : cancelLoading,
            type: "tertiary",
            block: footerFill,
            autoFocus: true
          }, this.props.cancelButtonProps, {
            style: Object.assign(Object.assign({}, footerFill ? {
              marginLeft: "unset"
            } : {}), (_a = this.props.cancelButtonProps) === null || _a === void 0 ? void 0 : _a.style),
            "x-semi-children-alias": "cancelText"
          }), cancelText || locale.cancel);
        }
      };
      return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "Modal"
      }, (locale, localeCode) => (/*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)({
          [`${_constants.cssClasses.DIALOG}-footerfill`]: footerFill
        })
      }, getCancelButton(locale), /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
        "aria-label": "confirm",
        type: okType,
        theme: "solid",
        block: footerFill,
        loading: confirmLoading === undefined ? this.state.onOKReturnPromiseStatus === "pending" : confirmLoading,
        onClick: this.handleOk
      }, this.props.okButtonProps, {
        "x-semi-children-alias": "okText"
      }), okText || locale.confirm))));
    };
    // getDialog = () => {
    //     const {
    //         footer,
    //         ...restProps
    //     } = this.props;
    //     const renderFooter = 'footer' in this.props ? footer : this.renderFooter();
    //     return <ModalContent {...restProps} footer={renderFooter} onClose={this.handleCancel}/>;
    // };
    this.renderDialog = () => {
      var _a;
      let _b = this.props,
        {
          footer,
          className,
          motion,
          maskStyle: maskStyleFromProps,
          keepDOM,
          style: styleFromProps,
          zIndex,
          getPopupContainer,
          visible,
          modalContentClass
        } = _b,
        restProps = __rest(_b, ["footer", "className", "motion", "maskStyle", "keepDOM", "style", "zIndex", "getPopupContainer", "visible", "modalContentClass"]);
      let style = styleFromProps;
      const maskStyle = maskStyleFromProps;
      const renderFooter = 'footer' in this.props ? footer : this.renderFooter();
      let wrapperStyle = {
        zIndex
      };
      if (getPopupContainer && getPopupContainer() !== ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) === null || _a === void 0 ? void 0 : _a.body)) {
        wrapperStyle = {
          zIndex,
          position: 'static'
        };
      }
      const classList = (0, _classnames.default)(className, {
        [`${_constants.cssClasses.DIALOG}-displayNone`]: keepDOM && this.state.displayNone
      });
      const shouldRender = this.props.visible || this.props.keepDOM && (!this.props.lazyRender || this._haveRendered) || this.props.motion && !this.state.displayNone /* When there is animation, we use displayNone to judge whether animation is ended and judge whether to unmount content */;
      if (shouldRender) {
        this._haveRendered = true;
      }
      return /*#__PURE__*/_react.default.createElement(_cssAnimation.default, {
        motion: this.props.motion,
        animationState: visible ? 'enter' : 'leave',
        startClassName: visible ? `${_constants.cssClasses.DIALOG}-content-animate-show` : `${_constants.cssClasses.DIALOG}-content-animate-hide`,
        onAnimationEnd: () => {
          this.updateState();
        }
      }, _ref => {
        let {
          animationClassName,
          animationEventsNeedBind
        } = _ref;
        return /*#__PURE__*/_react.default.createElement(_cssAnimation.default, {
          motion: this.props.motion,
          animationState: visible ? 'enter' : 'leave',
          startClassName: visible ? `${_constants.cssClasses.DIALOG}-mask-animate-show` : `${_constants.cssClasses.DIALOG}-mask-animate-hide`,
          onAnimationEnd: () => {
            this.updateState();
          }
        }, _ref2 => {
          let {
            animationClassName: maskAnimationClassName,
            animationEventsNeedBind: maskAnimationEventsNeedBind
          } = _ref2;
          return shouldRender ? /*#__PURE__*/_react.default.createElement(_portal.default, {
            style: wrapperStyle,
            getPopupContainer: getPopupContainer
          }, " ", /*#__PURE__*/_react.default.createElement(_ModalContent.default, Object.assign({}, restProps, {
            contentExtraProps: animationEventsNeedBind,
            maskExtraProps: maskAnimationEventsNeedBind,
            isFullScreen: this.state.isFullScreen,
            contentClassName: `${animationClassName} ${modalContentClass}`,
            maskClassName: maskAnimationClassName,
            className: classList,
            getPopupContainer: getPopupContainer,
            maskStyle: maskStyle,
            style: style,
            ref: this.modalRef,
            footer: renderFooter,
            onClose: this.handleCancel
          }))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
        });
      });
    };
    this.state = {
      displayNone: !props.visible,
      isFullScreen: props.fullScreen
    };
    this.foundation = new _modalFoundation.default(this.adapter);
    this.modalRef = /*#__PURE__*/_react.default.createRef();
    this.scrollBarWidth = 0;
    this.originBodyWidth = '100%';
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getProps: () => this.props,
      disabledBodyScroll: () => {
        var _a;
        const {
          getPopupContainer
        } = this.props;
        this.bodyOverflow = document.body.style.overflow || '';
        if ((!getPopupContainer || getPopupContainer() === ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) === null || _a === void 0 ? void 0 : _a.body)) && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = 'hidden';
          document.body.style.width = `calc(${this.originBodyWidth || '100%'} - ${this.scrollBarWidth}px)`;
        }
      },
      enabledBodyScroll: () => {
        var _a;
        const {
          getPopupContainer
        } = this.props;
        if ((!getPopupContainer || getPopupContainer() === ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) === null || _a === void 0 ? void 0 : _a.body)) && this.bodyOverflow !== null && this.bodyOverflow !== 'hidden') {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.width = this.originBodyWidth;
        }
      },
      notifyCancel: e => {
        return this.props.onCancel(e);
      },
      notifyOk: e => {
        return this.props.onOk(e);
      },
      notifyClose: () => {
        this.props.afterClose();
      },
      toggleDisplayNone: (displayNone, callback) => {
        if (displayNone !== this.state.displayNone) {
          this.setState({
            displayNone: displayNone
          }, callback || _noop2.default);
        }
      },
      notifyFullScreen: isFullScreen => {
        if (isFullScreen !== this.state.isFullScreen) {
          this.setState({
            isFullScreen
          });
        }
      }
    });
  }
  static getDerivedStateFromProps(props, prevState) {
    const newState = {};
    if (props.fullScreen !== prevState.isFullScreen) {
      newState.isFullScreen = props.fullScreen;
    }
    if (props.visible && prevState.displayNone) {
      newState.displayNone = false;
    }
    //
    // if (!props.visible && !props.motion && !prevState.displayNone) {
    //     newState.displayNone = true;
    // }
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
    if (!prevState.displayNone && this.state.displayNone) {
      this.foundation.afterHide();
    }
  }
  componentWillUnmount() {
    if (this.props.visible) {
      this.foundation.destroy();
    } else {
      this.foundation.enabledBodyScroll();
    }
  }
  render() {
    const {
      visible,
      keepDOM,
      lazyRender
    } = this.props;
    return this.renderDialog();
  }
}
Modal.propTypes = {
  mask: _propTypes.default.bool,
  closable: _propTypes.default.bool,
  centered: _propTypes.default.bool,
  visible: _propTypes.default.bool,
  width: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  height: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  confirmLoading: _propTypes.default.bool,
  cancelLoading: _propTypes.default.bool,
  okText: _propTypes.default.string,
  okType: _propTypes.default.string,
  cancelText: _propTypes.default.string,
  maskClosable: _propTypes.default.bool,
  onCancel: _propTypes.default.func,
  onOk: _propTypes.default.func,
  modalRender: _propTypes.default.func,
  afterClose: _propTypes.default.func,
  okButtonProps: _propTypes.default.object,
  cancelButtonProps: _propTypes.default.object,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  maskStyle: _propTypes.default.object,
  bodyStyle: _propTypes.default.object,
  zIndex: _propTypes.default.number,
  title: _propTypes.default.node,
  icon: _propTypes.default.node,
  header: _propTypes.default.node,
  footer: _propTypes.default.node,
  hasCancel: _propTypes.default.bool,
  motion: _propTypes.default.bool,
  children: _propTypes.default.node,
  getPopupContainer: _propTypes.default.func,
  getContainerContext: _propTypes.default.func,
  maskFixed: _propTypes.default.bool,
  closeIcon: _propTypes.default.node,
  closeOnEsc: _propTypes.default.bool,
  size: _propTypes.default.oneOf(_constants.strings.SIZE),
  keepDOM: _propTypes.default.bool,
  lazyRender: _propTypes.default.bool,
  direction: _propTypes.default.oneOf(_constants.strings.directions),
  fullScreen: _propTypes.default.bool,
  footerFill: _propTypes.default.bool
};
Modal.__SemiComponentName__ = "Modal";
Modal.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Modal.__SemiComponentName__, {
  zIndex: 1000,
  motion: true,
  mask: true,
  centered: false,
  closable: true,
  visible: false,
  okType: 'primary',
  maskClosable: true,
  hasCancel: true,
  onCancel: _noop2.default,
  onOk: _noop2.default,
  afterClose: _noop2.default,
  maskFixed: false,
  closeOnEsc: true,
  size: 'small',
  keepDOM: false,
  lazyRender: true,
  fullScreen: false
});
Modal.useModal = _useModal.default;
Modal.info = function (props) {
  return (0, _confirm.default)((0, _confirm.withInfo)(props));
};
Modal.success = function (props) {
  return (0, _confirm.default)((0, _confirm.withSuccess)(props));
};
Modal.error = function (props) {
  return (0, _confirm.default)((0, _confirm.withError)(props));
};
Modal.warning = function (props) {
  return (0, _confirm.default)((0, _confirm.withWarning)(props));
};
Modal.confirm = function (props) {
  return (0, _confirm.default)((0, _confirm.withConfirm)(props));
};
Modal.destroyAll = function destroyAllFn() {
  for (let i = 0, len = destroyFns.length; i < len; i++) {
    const close = destroyFns[i];
    if (close) {
      close();
    }
  }
  exports.destroyFns = destroyFns = [];
};
var _default = exports.default = Modal;