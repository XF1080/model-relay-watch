"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/modal/constants");
var _context = _interopRequireDefault(require("../configProvider/context"));
var _iconButton = _interopRequireDefault(require("../iconButton"));
var _typography = _interopRequireDefault(require("../typography"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _modalContentFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/modal/modalContentFoundation"));
var _semiIcons = require("@douyinfe/semi-icons");
var _FocusHandle = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/FocusHandle"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
let uuid = 0;
class ModalContent extends _baseComponent.default {
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
        const className = (0, _classnames.default)(`${_constants.cssClasses.DIALOG}-mask`, {
          // [`${cssClasses.DIALOG}-mask-hidden`]: !props.visible,
        });
        return /*#__PURE__*/_react.default.createElement("div", Object.assign({
          key: "mask"
        }, this.props.maskExtraProps, {
          className: (0, _classnames.default)(className, maskClassName),
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
        const iconType = closeIcon || /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, {
          "x-semi-prop": "closeIcon"
        });
        closer = /*#__PURE__*/_react.default.createElement(_iconButton.default, {
          "aria-label": "close",
          className: `${_constants.cssClasses.DIALOG}-close`,
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
      return icon ? /*#__PURE__*/_react.default.createElement("span", {
        className: `${_constants.cssClasses.DIALOG}-icon-wrapper`,
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
      return title === null || title === undefined ? null : (/*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.DIALOG}-header`
      }, icon, /*#__PURE__*/_react.default.createElement(_typography.default.Title, {
        heading: 5,
        className: `${_constants.cssClasses.DIALOG}-title`,
        id: `${_constants.cssClasses.DIALOG}-title`,
        "x-semi-prop": "title"
      }, title), closer));
    };
    this.renderBody = () => {
      const {
        bodyStyle,
        children,
        title
      } = this.props;
      const bodyCls = (0, _classnames.default)(`${_constants.cssClasses.DIALOG}-body`, {
        [`${_constants.cssClasses.DIALOG}-withIcon`]: this.props.icon
      });
      const closer = this.renderCloseBtn();
      const icon = this.renderIcon();
      const hasHeader = title !== null && title !== undefined || 'header' in this.props;
      return hasHeader ? (/*#__PURE__*/_react.default.createElement("div", {
        className: bodyCls,
        id: `${_constants.cssClasses.DIALOG}-body`,
        style: bodyStyle,
        "x-semi-prop": "children"
      }, children)) : (/*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.DIALOG}-body-wrapper`
      }, icon, /*#__PURE__*/_react.default.createElement("div", {
        className: bodyCls,
        style: bodyStyle,
        "x-semi-prop": "children"
      }, children), closer));
    };
    this.getDialogElement = () => {
      const props = __rest(this.props, []);
      const style = {};
      const digCls = (0, _classnames.default)(`${_constants.cssClasses.DIALOG}`, {
        [`${_constants.cssClasses.DIALOG}-centered`]: props.centered,
        [`${_constants.cssClasses.DIALOG}-${props.size}`]: props.size
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
      const footer = props.footer ? (/*#__PURE__*/_react.default.createElement("div", {
        className: `${_constants.cssClasses.DIALOG}-footer`,
        "x-semi-prop": "footer"
      }, props.footer)) : null;
      const modalContentElement = /*#__PURE__*/_react.default.createElement("div", {
        role: "dialog",
        ref: this.modalDialogRef,
        "aria-modal": "true",
        "aria-labelledby": `${_constants.cssClasses.DIALOG}-title`,
        "aria-describedby": `${_constants.cssClasses.DIALOG}-body`,
        onAnimationEnd: props.onAnimationEnd,
        className: (0, _classnames.default)([`${_constants.cssClasses.DIALOG}-content`, props.contentClassName, {
          [`${_constants.cssClasses.DIALOG}-content-fullScreen`]: props.isFullScreen,
          [`${_constants.cssClasses.DIALOG}-content-height-set`]: props.height || (0, _get2.default)(props.style, 'height')
        }])
      }, header, body, footer);
      const dialogElement = /*#__PURE__*/_react.default.createElement("div", {
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
      prevFocusElement: _FocusHandle.default.getActiveElement()
    };
    this.foundation = new _modalContentFoundation.default(this.adapter);
    this.dialogId = `dialog-${uuid++}`;
    this.modalDialogRef = /*#__PURE__*/_react.default.createRef();
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
          const activeElement = _FocusHandle.default.getActiveElement();
          activeElementInDialog = this.modalDialogRef.current.contains(activeElement);
          (_a = this.focusTrapHandle) === null || _a === void 0 ? void 0 : _a.destroy();
          this.focusTrapHandle = new _FocusHandle.default(this.modalDialogRef.current, {
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
        const focus = (0, _get2.default)(prevFocusElement, 'focus');
        (0, _isFunction2.default)(focus) && prevFocusElement.focus({
          preventScroll
        });
      }
    });
  }
  componentDidMount() {
    var _a;
    this.foundation.handleKeyDownEventListenerMount();
    this.foundation.modalDialogFocus();
    const nodes = _FocusHandle.default.getFocusableElements(this.modalDialogRef.current);
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
    const classList = (0, _classnames.default)(className, {
      [`${_constants.cssClasses.DIALOG}-popup`]: getPopupContainer && getPopupContainer() !== ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.document) === null || _a === void 0 ? void 0 : _a.body) && !maskFixed,
      [`${_constants.cssClasses.DIALOG}-fixed`]: maskFixed,
      [`${_constants.cssClasses.DIALOG}-rtl`]: direction === 'rtl'
    });
    const containerContext = getContainerContext();
    const dataAttr = this.getDataAttr(rest);
    const elem = /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: classList
    }, dataAttr), this.getMaskElement(), /*#__PURE__*/_react.default.createElement("div", Object.assign({
      role: "none",
      className: (0, _classnames.default)({
        [`${_constants.cssClasses.DIALOG}-wrap`]: true,
        [`${_constants.cssClasses.DIALOG}-wrap-center`]: this.props.centered
      }),
      onClick: maskClosable ? this.onMaskClick : null,
      onMouseUp: maskClosable ? this.onMaskMouseUp : null
    }, this.props.contentExtraProps), this.getDialogElement()));
    return containerContext && containerContext.Provider ? /*#__PURE__*/_react.default.createElement(containerContext.Provider, {
      value: containerContext.value
    }, elem) : elem;
  }
}
exports.default = ModalContent;
ModalContent.contextType = _context.default;
ModalContent.propTypes = {
  close: _propTypes.default.func,
  getContainerContext: _propTypes.default.func,
  contentClassName: _propTypes.default.string,
  maskClassName: _propTypes.default.string,
  onAnimationEnd: _propTypes.default.func,
  preventScroll: _propTypes.default.bool
};
ModalContent.defaultProps = {
  close: _noop2.default,
  getContainerContext: _noop2.default,
  contentClassName: '',
  maskClassName: ''
};