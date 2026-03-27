import _omit from "lodash/omit";
import _isFunction from "lodash/isFunction";
import _get from "lodash/get";
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
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, numbers } from '@douyinfe/semi-foundation/lib/es/popconfirm/constants';
import PopconfirmFoundation from '@douyinfe/semi-foundation/lib/es/popconfirm/popconfirmFoundation';
import { IconClose, IconAlertTriangle } from '@douyinfe/semi-icons';
import BaseComponent from '../_base/baseComponent';
import Popover from '../popover';
import Button from '../button';
import ConfigContext from '../configProvider/context';
import LocaleConsumer from '../locale/localeConsumer';
import '@douyinfe/semi-foundation/lib/es/popconfirm/popconfirm.css';
import { getDefaultPropsFromGlobalConfig } from "../_utils";
export default class Popconfirm extends BaseComponent {
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
      const popCardCls = cls(prefixCls, className, {
        [`${prefixCls}-rtl`]: direction === 'rtl'
      });
      const showTitle = title !== null && typeof title !== 'undefined';
      const showContent = !(content === null || typeof content === 'undefined');
      const hasIcon = /*#__PURE__*/React.isValidElement(icon);
      const bodyCls = cls({
        [`${prefixCls}-body`]: true,
        [`${prefixCls}-body-withIcon`]: hasIcon
      });
      return (
        /*#__PURE__*/
        /* eslint-disable-next-line jsx-a11y/no-static-element-interactions */
        React.createElement("div", {
          className: popCardCls,
          onClick: this.stopImmediatePropagation,
          style: style
        }, /*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-inner`
        }, /*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-header`
        }, hasIcon ? /*#__PURE__*/React.createElement("i", {
          className: `${prefixCls}-header-icon`,
          "x-semi-prop": "icon"
        }, icon) : null, /*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-header-body`
        }, showTitle ? (/*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-header-title`,
          "x-semi-prop": "title"
        }, title)) : null), showCloseIcon ? (/*#__PURE__*/React.createElement(Button, {
          className: `${prefixCls}-btn-close`,
          icon: /*#__PURE__*/React.createElement(IconClose, null),
          size: "small",
          theme: 'borderless',
          type: cancelType,
          onClick: this.handleCancel
        })) : null), showContent ? (/*#__PURE__*/React.createElement("div", {
          className: bodyCls,
          "x-semi-prop": "content"
        }, _isFunction(content) ? content({
          initialFocusRef
        }) : content)) : null, /*#__PURE__*/React.createElement("div", {
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
    this.foundation = new PopconfirmFoundation(this.adapter);
    this.footerRef = /*#__PURE__*/React.createRef();
    this.popoverRef = /*#__PURE__*/React.createRef();
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
    return /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Popconfirm"
    }, (locale, localeCode) => (/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, Object.assign({
      "data-type": "cancel",
      type: cancelType,
      onClick: this.handleCancel,
      loading: cancelLoading
    }, _omit(cancelButtonProps, 'autoFocus')), cancelText || _get(locale, 'cancel')), /*#__PURE__*/React.createElement(Button, Object.assign({
      "data-type": "ok",
      type: okType,
      theme: "solid",
      onClick: this.handleConfirm,
      loading: confirmLoading
    }, _omit(okButtonProps, 'autoFocus')), okText || _get(locale, 'confirm')))));
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
      className: cssClasses.POPOVER,
      onClickOutSide: this.handleClickOutSide
    };
    if (this.isControlled('visible')) {
      popProps.trigger = 'custom';
    }
    return /*#__PURE__*/React.createElement(Popover, Object.assign({
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
Popconfirm.contextType = ConfigContext;
Popconfirm.propTypes = {
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  disabled: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  title: PropTypes.any,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.node,
  okText: PropTypes.string,
  okType: PropTypes.string,
  cancelText: PropTypes.string,
  cancelType: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onClickOutSide: PropTypes.func,
  onVisibleChange: PropTypes.func,
  visible: PropTypes.bool,
  defaultVisible: PropTypes.bool,
  okButtonProps: PropTypes.object,
  cancelButtonProps: PropTypes.object,
  stopPropagation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showCloseIcon: PropTypes.bool,
  zIndex: PropTypes.number,
  // private
  trigger: PropTypes.string,
  position: PropTypes.string
};
Popconfirm.__SemiComponentName__ = "Popconfirm";
Popconfirm.defaultProps = getDefaultPropsFromGlobalConfig(Popconfirm.__SemiComponentName__, {
  stopPropagation: true,
  trigger: 'click',
  // position: 'bottomLeft',
  onVisibleChange: _noop,
  disabled: false,
  icon: /*#__PURE__*/React.createElement(IconAlertTriangle, {
    size: "extra-large"
  }),
  okType: 'primary',
  cancelType: 'tertiary',
  prefixCls: cssClasses.PREFIX,
  zIndex: numbers.DEFAULT_Z_INDEX,
  showCloseIcon: true,
  onCancel: _noop,
  onConfirm: _noop,
  onClickOutSide: _noop
});