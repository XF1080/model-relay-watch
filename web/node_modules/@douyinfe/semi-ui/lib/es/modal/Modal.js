import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/modal/constants';
import '@douyinfe/semi-foundation/lib/es/modal/modal.css';
import ModalFoundation from '@douyinfe/semi-foundation/lib/es/modal/modalFoundation';
import cls from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import BaseComponent from '../_base/baseComponent';
import CSSAnimation from "../_cssAnimation";
import Portal from '../_portal';
import { getDefaultPropsFromGlobalConfig, getScrollbarWidth } from '../_utils';
import Button from '../button';
import LocaleConsumer from '../locale/localeConsumer';
import ModalContent from './ModalContent';
import confirm, { withConfirm, withError, withInfo, withSuccess, withWarning } from './confirm';
import useModal from './useModal';
export let destroyFns = [];
class Modal extends BaseComponent {
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
          return /*#__PURE__*/React.createElement(Button, Object.assign({
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
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Modal"
      }, (locale, localeCode) => (/*#__PURE__*/React.createElement("div", {
        className: cls({
          [`${cssClasses.DIALOG}-footerfill`]: footerFill
        })
      }, getCancelButton(locale), /*#__PURE__*/React.createElement(Button, Object.assign({
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
      const classList = cls(className, {
        [`${cssClasses.DIALOG}-displayNone`]: keepDOM && this.state.displayNone
      });
      const shouldRender = this.props.visible || this.props.keepDOM && (!this.props.lazyRender || this._haveRendered) || this.props.motion && !this.state.displayNone /* When there is animation, we use displayNone to judge whether animation is ended and judge whether to unmount content */;
      if (shouldRender) {
        this._haveRendered = true;
      }
      return /*#__PURE__*/React.createElement(CSSAnimation, {
        motion: this.props.motion,
        animationState: visible ? 'enter' : 'leave',
        startClassName: visible ? `${cssClasses.DIALOG}-content-animate-show` : `${cssClasses.DIALOG}-content-animate-hide`,
        onAnimationEnd: () => {
          this.updateState();
        }
      }, _ref => {
        let {
          animationClassName,
          animationEventsNeedBind
        } = _ref;
        return /*#__PURE__*/React.createElement(CSSAnimation, {
          motion: this.props.motion,
          animationState: visible ? 'enter' : 'leave',
          startClassName: visible ? `${cssClasses.DIALOG}-mask-animate-show` : `${cssClasses.DIALOG}-mask-animate-hide`,
          onAnimationEnd: () => {
            this.updateState();
          }
        }, _ref2 => {
          let {
            animationClassName: maskAnimationClassName,
            animationEventsNeedBind: maskAnimationEventsNeedBind
          } = _ref2;
          return shouldRender ? /*#__PURE__*/React.createElement(Portal, {
            style: wrapperStyle,
            getPopupContainer: getPopupContainer
          }, " ", /*#__PURE__*/React.createElement(ModalContent, Object.assign({}, restProps, {
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
          }))) : /*#__PURE__*/React.createElement(React.Fragment, null);
        });
      });
    };
    this.state = {
      displayNone: !props.visible,
      isFullScreen: props.fullScreen
    };
    this.foundation = new ModalFoundation(this.adapter);
    this.modalRef = /*#__PURE__*/React.createRef();
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
          }, callback || _noop);
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
  mask: PropTypes.bool,
  closable: PropTypes.bool,
  centered: PropTypes.bool,
  visible: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  confirmLoading: PropTypes.bool,
  cancelLoading: PropTypes.bool,
  okText: PropTypes.string,
  okType: PropTypes.string,
  cancelText: PropTypes.string,
  maskClosable: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  modalRender: PropTypes.func,
  afterClose: PropTypes.func,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  maskStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  zIndex: PropTypes.number,
  title: PropTypes.node,
  icon: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
  hasCancel: PropTypes.bool,
  motion: PropTypes.bool,
  children: PropTypes.node,
  getPopupContainer: PropTypes.func,
  getContainerContext: PropTypes.func,
  maskFixed: PropTypes.bool,
  closeIcon: PropTypes.node,
  closeOnEsc: PropTypes.bool,
  size: PropTypes.oneOf(strings.SIZE),
  keepDOM: PropTypes.bool,
  lazyRender: PropTypes.bool,
  direction: PropTypes.oneOf(strings.directions),
  fullScreen: PropTypes.bool,
  footerFill: PropTypes.bool
};
Modal.__SemiComponentName__ = "Modal";
Modal.defaultProps = getDefaultPropsFromGlobalConfig(Modal.__SemiComponentName__, {
  zIndex: 1000,
  motion: true,
  mask: true,
  centered: false,
  closable: true,
  visible: false,
  okType: 'primary',
  maskClosable: true,
  hasCancel: true,
  onCancel: _noop,
  onOk: _noop,
  afterClose: _noop,
  maskFixed: false,
  closeOnEsc: true,
  size: 'small',
  keepDOM: false,
  lazyRender: true,
  fullScreen: false
});
Modal.useModal = useModal;
Modal.info = function (props) {
  return confirm(withInfo(props));
};
Modal.success = function (props) {
  return confirm(withSuccess(props));
};
Modal.error = function (props) {
  return confirm(withError(props));
};
Modal.warning = function (props) {
  return confirm(withWarning(props));
};
Modal.confirm = function (props) {
  return confirm(withConfirm(props));
};
Modal.destroyAll = function destroyAllFn() {
  for (let i = 0, len = destroyFns.length; i < len; i++) {
    const close = destroyFns[i];
    if (close) {
      close();
    }
  }
  destroyFns = [];
};
export default Modal;