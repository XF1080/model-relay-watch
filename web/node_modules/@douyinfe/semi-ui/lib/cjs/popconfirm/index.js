"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/popconfirm/constants");
var _popconfirmFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/popconfirm/popconfirmFoundation"));
var _semiIcons = require("@douyinfe/semi-icons");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _popover = _interopRequireDefault(require("../popover"));
var _button = _interopRequireDefault(require("../button"));
var _context = _interopRequireDefault(require("../configProvider/context"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
require("@douyinfe/semi-foundation/lib/cjs/popconfirm/popconfirm.css");
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
class Popconfirm extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleCancel = e => this.foundation.handleCancel(e && e.nativeEvent);
    this.handleConfirm = e => this.foundation.handleConfirm(e && e.nativeEvent);
    this.handleVisibleChange = visible => this.foundation.handleVisibleChange(visible);
    this.handleClickOutSide = e => this.foundation.handleClickOutSide(e);
    this.stopImmediatePropagation = e => e && e.nativeEvent && e.nativeEvent.stopImmediatePropagation();
    this.renderConfirmPopCard = _ref => {
      let {
        initialFocusRef
      } = _ref;
      const {
        content,
        title,
        className,
        style,
        cancelType,
        icon,
        prefixCls,
        showCloseIcon
      } = this.props;
      const {
        direction
      } = this.context;
      const popCardCls = (0, _classnames.default)(prefixCls, className, {
        [`${prefixCls}-rtl`]: direction === 'rtl'
      });
      const showTitle = title !== null && typeof title !== 'undefined';
      const showContent = !(content === null || typeof content === 'undefined');
      const hasIcon = /*#__PURE__*/_react.default.isValidElement(icon);
      const bodyCls = (0, _classnames.default)({
        [`${prefixCls}-body`]: true,
        [`${prefixCls}-body-withIcon`]: hasIcon
      });
      return (
        /*#__PURE__*/
        /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
        _react.default.createElement("div", {
          className: popCardCls,
          onClick: this.stopImmediatePropagation,
          style: style
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-inner`
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-header`
        }, hasIcon ? /*#__PURE__*/_react.default.createElement("i", {
          className: `${prefixCls}-header-icon`,
          "x-semi-prop": "icon"
        }, icon) : null, /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-header-body`
        }, showTitle ? (/*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-header-title`,
          "x-semi-prop": "title"
        }, title)) : null), showCloseIcon ? (/*#__PURE__*/_react.default.createElement(_button.default, {
          className: `${prefixCls}-btn-close`,
          icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, null),
          size: "small",
          theme: 'borderless',
          type: cancelType,
          onClick: this.handleCancel
        })) : null), showContent ? (/*#__PURE__*/_react.default.createElement("div", {
          className: bodyCls,
          "x-semi-prop": "content"
        }, (0, _isFunction2.default)(content) ? content({
          initialFocusRef
        }) : content)) : null, /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-footer`,
          ref: this.footerRef
        }, this.renderControls())))
      );
    };
    this.state = {
      cancelLoading: false,
      confirmLoading: false,
      visible: props.defaultVisible || false
    };
    this.foundation = new _popconfirmFoundation.default(this.adapter);
    this.footerRef = /*#__PURE__*/_react.default.createRef();
    this.popoverRef = /*#__PURE__*/_react.default.createRef();
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateStates = {};
    const {
      hasOwnProperty
    } = Object.prototype;
    if (hasOwnProperty.call(props, 'visible')) {
      willUpdateStates.visible = props.visible;
    }
    return willUpdateStates;
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setVisible: visible => this.setState({
        visible
      }),
      updateConfirmLoading: loading => this.setState({
        confirmLoading: loading
      }),
      updateCancelLoading: loading => this.setState({
        cancelLoading: loading
      }),
      notifyConfirm: e => this.props.onConfirm(e),
      notifyCancel: e => this.props.onCancel(e),
      notifyVisibleChange: visible => this.props.onVisibleChange(visible),
      notifyClickOutSide: e => this.props.onClickOutSide(e),
      focusCancelButton: () => {
        var _a, _b;
        const buttonNode = (_b = (_a = this.footerRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.querySelector('[data-type=cancel]');
        buttonNode === null || buttonNode === void 0 ? void 0 : buttonNode.focus({
          preventScroll: true
        });
      },
      focusOkButton: () => {
        var _a, _b;
        const buttonNode = (_b = (_a = this.footerRef) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.querySelector('[data-type=ok]');
        buttonNode === null || buttonNode === void 0 ? void 0 : buttonNode.focus({
          preventScroll: true
        });
      },
      focusPrevFocusElement: () => {
        var _a;
        (_a = this.popoverRef.current) === null || _a === void 0 ? void 0 : _a.focusTrigger();
      }
    });
  }
  renderControls() {
    const {
      okText,
      cancelText,
      okType,
      cancelType,
      cancelButtonProps,
      okButtonProps
    } = this.props;
    const {
      cancelLoading,
      confirmLoading
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Popconfirm"
    }, (locale, localeCode) => (/*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
      "data-type": "cancel",
      type: cancelType,
      onClick: this.handleCancel,
      loading: cancelLoading
    }, (0, _omit2.default)(cancelButtonProps, 'autoFocus')), cancelText || (0, _get2.default)(locale, 'cancel')), /*#__PURE__*/_react.default.createElement(_button.default, Object.assign({
      "data-type": "ok",
      type: okType,
      theme: "solid",
      onClick: this.handleConfirm,
      loading: confirmLoading
    }, (0, _omit2.default)(okButtonProps, 'autoFocus')), okText || (0, _get2.default)(locale, 'confirm')))));
  }
  render() {
    // rtl changes the default position
    const {
      direction
    } = this.context;
    const defaultPosition = direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
    const _a = this.props,
      {
        className,
        prefixCls,
        disabled,
        children,
        style,
        position = defaultPosition
      } = _a,
      attrs = __rest(_a, ["className", "prefixCls", "disabled", "children", "style", "position"]);
    if (disabled) {
      return children;
    }
    const {
      visible
    } = this.state;
    const popProps = {
      onVisibleChange: this.handleVisibleChange,
      className: _constants.cssClasses.POPOVER,
      onClickOutSide: this.handleClickOutSide
    };
    if (this.isControlled('visible')) {
      popProps.trigger = 'custom';
    }
    return /*#__PURE__*/_react.default.createElement(_popover.default, Object.assign({
      ref: this.popoverRef
    }, attrs, {
      // A arrow function needs to be passed here, otherwise the content will not be updated after the Popconfirm state is updated
      // Popover is a PureComponent, same props will not trigger update
      content: _ref2 => {
        let {
          initialFocusRef
        } = _ref2;
        return this.renderConfirmPopCard({
          initialFocusRef
        });
      },
      visible: visible,
      position: position
    }, popProps), children);
  }
}
exports.default = Popconfirm;
Popconfirm.contextType = _context.default;
Popconfirm.propTypes = {
  motion: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func, _propTypes.default.object]),
  disabled: _propTypes.default.bool,
  content: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  title: _propTypes.default.any,
  prefixCls: _propTypes.default.string,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  icon: _propTypes.default.node,
  okText: _propTypes.default.string,
  okType: _propTypes.default.string,
  cancelText: _propTypes.default.string,
  cancelType: _propTypes.default.string,
  onCancel: _propTypes.default.func,
  onConfirm: _propTypes.default.func,
  onClickOutSide: _propTypes.default.func,
  onVisibleChange: _propTypes.default.func,
  visible: _propTypes.default.bool,
  defaultVisible: _propTypes.default.bool,
  okButtonProps: _propTypes.default.object,
  cancelButtonProps: _propTypes.default.object,
  stopPropagation: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  showCloseIcon: _propTypes.default.bool,
  zIndex: _propTypes.default.number,
  // private
  trigger: _propTypes.default.string,
  position: _propTypes.default.string
};
Popconfirm.__SemiComponentName__ = "Popconfirm";
Popconfirm.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Popconfirm.__SemiComponentName__, {
  stopPropagation: true,
  trigger: 'click',
  // position: 'bottomLeft',
  onVisibleChange: _noop2.default,
  disabled: false,
  icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertTriangle, {
    size: "extra-large"
  }),
  okType: 'primary',
  cancelType: 'tertiary',
  prefixCls: _constants.cssClasses.PREFIX,
  zIndex: _constants.numbers.DEFAULT_Z_INDEX,
  showCloseIcon: true,
  onCancel: _noop2.default,
  onConfirm: _noop2.default,
  onClickOutSide: _noop2.default
});