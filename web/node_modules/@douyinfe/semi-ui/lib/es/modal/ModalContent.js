import _noop from "lodash/noop";
import _isFunction from "lodash/isFunction";
import _get from "lodash/get";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/modal/constants';
import ConfigContext from '../configProvider/context';
import Button from '../iconButton';
import Typography from '../typography';
import BaseComponent from '../_base/baseComponent';
import ModalContentFoundation from '@douyinfe/semi-foundation/lib/es/modal/modalContentFoundation';
import { IconClose } from '@douyinfe/semi-icons';
import FocusTrapHandle from '@douyinfe/semi-foundation/lib/es/utils/FocusHandle';
let uuid = 0;
export default class ModalContent extends BaseComponent {
  constructor(props) {
    super(props);
    this.onKeyDown = e => {
      this.foundation.handleKeyDown(e);
    };
    // Record when clicking the modal box
    this.onDialogMouseDown = () => {
      this.foundation.handleDialogMouseDown();
    };
    // Cancel recording when clicking the modal box at the end
    this.onMaskMouseUp = () => {
      this.foundation.handleMaskMouseUp();
    };
    // onMaskClick will judge dialogMouseDown before onMaskMouseUp updates dialogMouseDown
    this.onMaskClick = e => {
      this.foundation.handleMaskClick(e);
    };
    this.close = e => {
      this.foundation.close(e);
    };
    this.getMaskElement = () => {
      const props = __rest(this.props, []);
      const {
        mask,
        maskClassName
      } = props;
      if (mask) {
        const className = cls(`${cssClasses.DIALOG}-mask`, {
          // [`${cssClasses.DIALOG}-mask-hidden`]: !props.visible,
        });
        return /*#__PURE__*/React.createElement("div", Object.assign({
          key: "mask"
        }, this.props.maskExtraProps, {
          className: cls(className, maskClassName),
          style: props.maskStyle
        }));
      }
      return null;
    };
    this.renderCloseBtn = () => {
      const {
        closable,
        closeIcon
      } = this.props;
      let closer;
      if (closable) {
        const iconType = closeIcon || /*#__PURE__*/React.createElement(IconClose, {
          "x-semi-prop": "closeIcon"
        });
        closer = /*#__PURE__*/React.createElement(Button, {
          "aria-label": "close",
          className: `${cssClasses.DIALOG}-close`,
          key: "close-btn",
          onClick: this.close,
          type: "tertiary",
          icon: iconType,
          theme: "borderless",
          size: "small"
        });
      }
      return closer;
    };
    this.renderIcon = () => {
      const {
        icon
      } = this.props;
      return icon ? /*#__PURE__*/React.createElement("span", {
        className: `${cssClasses.DIALOG}-icon-wrapper`,
        "x-semi-prop": "icon"
      }, icon) : null;
    };
    this.renderHeader = () => {
      if ('header' in this.props) {
        return this.props.header;
      }
      const {
        title
      } = this.props;
      const closer = this.renderCloseBtn();
      const icon = this.renderIcon();
      return title === null || title === undefined ? null : (/*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.DIALOG}-header`
      }, icon, /*#__PURE__*/React.createElement(Typography.Title, {
        heading: 5,
        className: `${cssClasses.DIALOG}-title`,
        id: `${cssClasses.DIALOG}-title`,
        "x-semi-prop": "title"
      }, title), closer));
    };
    this.renderBody = () => {
      const {
        bodyStyle,
        children,
        title
      } = this.props;
      const bodyCls = cls(`${cssClasses.DIALOG}-body`, {
        [`${cssClasses.DIALOG}-withIcon`]: this.props.icon
      });
      const closer = this.renderCloseBtn();
      const icon = this.renderIcon();
      const hasHeader = title !== null && title !== undefined || 'header' in this.props;
      return hasHeader ? (/*#__PURE__*/React.createElement("div", {
        className: bodyCls,
        id: `${cssClasses.DIALOG}-body`,
        style: bodyStyle,
        "x-semi-prop": "children"
      }, children)) : (/*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.DIALOG}-body-wrapper`
      }, icon, /*#__PURE__*/React.createElement("div", {
        className: bodyCls,
        style: bodyStyle,
        "x-semi-prop": "children"
      }, children), closer));
    };
    this.getDialogElement = () => {
      const props = __rest(this.props, []);
      const style = {};
      const digCls = cls(`${cssClasses.DIALOG}`, {
        [`${cssClasses.DIALOG}-centered`]: props.centered,
        [`${cssClasses.DIALOG}-${props.size}`]: props.size
      });
      if (props.width) {
        style.width = props.width;
      }
      if (props.height) {
        style.height = props.height;
      }
      if (props.isFullScreen) {
        style.width = '100%';
        style.height = '100%';
        style.margin = 'unset';
      }
      const body = this.renderBody();
      const header = this.renderHeader();
      const footer = props.footer ? (/*#__PURE__*/React.createElement("div", {
        className: `${cssClasses.DIALOG}-footer`,
        "x-semi-prop": "footer"
      }, props.footer)) : null;
      const modalContentElement = /*#__PURE__*/React.createElement("div", {
        role: "dialog",
        ref: this.modalDialogRef,
        "aria-modal": "true",
        "aria-labelledby": `${cssClasses.DIALOG}-title`,
        "aria-describedby": `${cssClasses.DIALOG}-body`,
        onAnimationEnd: props.onAnimationEnd,
        className: cls([`${cssClasses.DIALOG}-content`, props.contentClassName, {
          [`${cssClasses.DIALOG}-content-fullScreen`]: props.isFullScreen,
          [`${cssClasses.DIALOG}-content-height-set`]: props.height || _get(props.style, 'height')
        }])
      }, header, body, footer);
      const dialogElement = /*#__PURE__*/React.createElement("div", {
        key: "dialog-element",
        className: digCls,
        onMouseDown: this.onDialogMouseDown,
        style: Object.assign(Object.assign({}, props.style), style),
        id: this.dialogId
      }, (props === null || props === void 0 ? void 0 : props.modalRender) ? props === null || props === void 0 ? void 0 : props.modalRender(modalContentElement) : modalContentElement);
      return dialogElement;
    };
    this.state = {
      dialogMouseDown: false,
      prevFocusElement: FocusTrapHandle.getActiveElement()
    };
    this.foundation = new ModalContentFoundation(this.adapter);
    this.dialogId = `dialog-${uuid++}`;
    this.modalDialogRef = /*#__PURE__*/React.createRef();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyClose: e => {
        this.props.onClose(e);
      },
      notifyDialogMouseDown: () => {
        this.setState({
          dialogMouseDown: true
        });
      },
      notifyDialogMouseUp: () => {
        if (this.state.dialogMouseDown) {
          // Not setting setTimeout triggers close when modal external mouseUp
          this.timeoutId = setTimeout(() => {
            this.setState({
              dialogMouseDown: false
            });
          }, 0);
        }
      },
      addKeyDownEventListener: () => {
        if (this.props.closeOnEsc) {
          document.addEventListener('keydown', this.foundation.handleKeyDown);
        }
      },
      removeKeyDownEventListener: () => {
        if (this.props.closeOnEsc) {
          document.removeEventListener('keydown', this.foundation.handleKeyDown);
        }
      },
      getMouseState: () => this.state.dialogMouseDown,
      modalDialogFocus: () => {
        var _a, _b, _c;
        const {
          preventScroll
        } = this.props;
        let activeElementInDialog;
        if (this.modalDialogRef) {
          const activeElement = FocusTrapHandle.getActiveElement();
          activeElementInDialog = this.modalDialogRef.current.contains(activeElement);
          (_a = this.focusTrapHandle) === null || _a === void 0 ? void 0 : _a.destroy();
          this.focusTrapHandle = new FocusTrapHandle(this.modalDialogRef.current, {
            preventScroll
          });
        }
        if (!activeElementInDialog) {
          (_c = (_b = this.modalDialogRef) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c.focus({
            preventScroll
          });
        }
      },
      modalDialogBlur: () => {
        var _a, _b;
        (_a = this.modalDialogRef) === null || _a === void 0 ? void 0 : _a.current.blur();
        (_b = this.focusTrapHandle) === null || _b === void 0 ? void 0 : _b.destroy();
      },
      prevFocusElementReFocus: () => {
        const {
          prevFocusElement
        } = this.state;
        const {
          preventScroll
        } = this.props;
        const focus = _get(prevFocusElement, 'focus');
        _isFunction(focus) && prevFocusElement.focus({
          preventScroll
        });
      }
    });
  }
  componentDidMount() {
    var _a;
    this.foundation.handleKeyDownEventListenerMount();
    this.foundation.modalDialogFocus();
    const nodes = FocusTrapHandle.getFocusableElements(this.modalDialogRef.current);
    if (!this.modalDialogRef.current.contains(document.activeElement)) {
      // focus on first focusable element
      (_a = nodes[0]) === null || _a === void 0 ? void 0 : _a.focus();
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    this.foundation.destroy();
  }
  render() {
    var _a;
    const _b = this.props,
      {
        maskClosable,
        className,
        getPopupContainer,
        maskFixed,
        getContainerContext
      } = _b,
      rest = __rest(_b, ["maskClosable", "className", "getPopupContainer", "maskFixed", "getContainerContext"]);
    const {
      direction
    } = this.context;
    const classList = cls(className, {
      [`${cssClasses.DIALOG}-popup`]: getPopupContainer && getPopupContainer() !== ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) === null || _a === void 0 ? void 0 : _a.body) && !maskFixed,
      [`${cssClasses.DIALOG}-fixed`]: maskFixed,
      [`${cssClasses.DIALOG}-rtl`]: direction === 'rtl'
    });
    const containerContext = getContainerContext();
    const dataAttr = this.getDataAttr(rest);
    const elem = /*#__PURE__*/React.createElement("div", Object.assign({
      className: classList
    }, dataAttr), this.getMaskElement(), /*#__PURE__*/React.createElement("div", Object.assign({
      role: "none",
      className: cls({
        [`${cssClasses.DIALOG}-wrap`]: true,
        [`${cssClasses.DIALOG}-wrap-center`]: this.props.centered
      }),
      onClick: maskClosable ? this.onMaskClick : null,
      onMouseUp: maskClosable ? this.onMaskMouseUp : null
    }, this.props.contentExtraProps), this.getDialogElement()));
    return containerContext && containerContext.Provider ? /*#__PURE__*/React.createElement(containerContext.Provider, {
      value: containerContext.value
    }, elem) : elem;
  }
}
ModalContent.contextType = ConfigContext;
ModalContent.propTypes = {
  close: PropTypes.func,
  getContainerContext: PropTypes.func,
  contentClassName: PropTypes.string,
  maskClassName: PropTypes.string,
  onAnimationEnd: PropTypes.func,
  preventScroll: PropTypes.bool
};
ModalContent.defaultProps = {
  close: _noop,
  getContainerContext: _noop,
  contentClassName: '',
  maskClassName: ''
};