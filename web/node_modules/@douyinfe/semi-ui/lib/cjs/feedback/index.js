"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/feedback/constants");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _index = require("../index");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/feedback/foundation"));
require("@douyinfe/semi-foundation/lib/cjs/feedback/feedback.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable jsx-a11y/click-events-have-key-events */

const {
  Emoji
} = _constants.strings;
const prefixCls = _constants.cssClasses.PREFIX;
class Feedback extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.textNode = () => {
      const {
        textAreaProps
      } = this.props;
      return /*#__PURE__*/_react.default.createElement(_index.TextArea, Object.assign({
        onChange: this.foundation.handleTextChange,
        placeholder: 'Provider additional feedback'
      }, textAreaProps));
    };
    this.emojiNode = () => {
      const {
        value
      } = this.state;
      const {
        textAreaProps
      } = this.props;
      const {
        emoji
      } = value !== null && value !== void 0 ? value : {};
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-emoji-container`
      }, Object.values(Emoji).map(item => (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      _react.default.createElement("span", {
        key: item,
        className: (0, _classnames.default)(`${prefixCls}-emoji-item`, {
          [`${prefixCls}-emoji-item-selected`]: item === emoji
        }),
        "data-value": item,
        onClick: this.foundation.handleEmojiClick
      }, item)))), emoji === Emoji.bad && /*#__PURE__*/_react.default.createElement(_index.TextArea, Object.assign({
        onChange: this.foundation.handleEmojiReasonChange,
        placeholder: 'Provider additional feedback(optional)'
      }, textAreaProps)));
    };
    this.radioNode = () => {
      const {
        radioGroupProps
      } = this.props;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-radio-container`
      }, /*#__PURE__*/_react.default.createElement(_index.RadioGroup, Object.assign({
        direction: 'vertical',
        onChange: this.foundation.handleRadioChange
      }, (0, _omit2.default)(radioGroupProps, 'onChange'))));
    };
    this.checkboxNode = () => {
      const {
        checkboxGroupProps
      } = this.props;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-checkbox-container`
      }, /*#__PURE__*/_react.default.createElement(_index.CheckboxGroup, Object.assign({
        direction: 'vertical',
        onChange: this.foundation.handleCheckboxChange
      }, (0, _omit2.default)(checkboxGroupProps, 'onChange'))));
    };
    this.getRealChildren = () => {
      const {
        type,
        renderContent,
        children
      } = this.props;
      let result = null;
      switch (type) {
        case 'custom':
          result = children;
          break;
        case 'text':
          result = this.textNode();
          break;
        case 'emoji':
          result = this.emojiNode();
          break;
        case 'radio':
          result = this.radioNode();
          break;
        case 'checkbox':
          result = this.checkboxNode();
          break;
        default:
          break;
      }
      if (typeof renderContent === 'function') {
        result = renderContent(result);
      }
      return result;
    };
    this.renderFooter = locale => {
      const {
        footer,
        cancelButtonProps,
        okButtonProps
      } = this.props;
      const {
        onCancelReturnPromiseStatus,
        onOKReturnPromiseStatus
      } = this.state;
      if (footer) {
        return footer;
      } else {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-footer`
        }, /*#__PURE__*/_react.default.createElement(_index.Button, Object.assign({
          type: 'primary',
          onClick: this.foundation.handleCancel,
          loading: onCancelReturnPromiseStatus === "pending"
        }, cancelButtonProps), locale.cancel), /*#__PURE__*/_react.default.createElement(_index.Button, Object.assign({
          type: 'primary',
          theme: 'solid',
          disabled: this.disableSubmitButton(),
          onClick: this.foundation.handleSubmit,
          loading: onOKReturnPromiseStatus === "pending"
        }, okButtonProps), locale.submit));
      }
    };
    this.disableSubmitButton = () => {
      const {
        value
      } = this.state;
      return !Boolean(value) || Array.isArray(value) && value.length === 0;
    };
    this.state = {
      value: null,
      onOKReturnPromiseStatus: "fulfilled",
      onCancelReturnPromiseStatus: "fulfilled"
    };
    this.foundation = new _foundation.default(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setValue: value => {
        this.setState({
          value: value
        });
      },
      notifyValueChange: value => {
        this.setState({
          value: value
        });
        this.props.onValueChange(value);
      },
      notifyClose: () => {
        return this.props.afterClose();
      },
      notifyCancel: e => {
        return this.props.onCancel(e);
      },
      notifyOk: e => {
        return this.props.onOk(e);
      },
      notifyTextAreaChange: (value, e) => {
        const {
          textAreaProps = {}
        } = this.props;
        const {
          onChange
        } = textAreaProps;
        onChange === null || onChange === void 0 ? void 0 : onChange(value, e);
      },
      notifyCheckBoxChange: value => {
        const {
          checkboxGroupProps = {}
        } = this.props;
        const {
          onChange
        } = checkboxGroupProps;
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
      },
      notifyRadioChange: e => {
        var _a;
        const {
          onChange
        } = (_a = this.props) === null || _a === void 0 ? void 0 : _a.radioGroupProps;
        onChange === null || onChange === void 0 ? void 0 : onChange(e);
      }
    });
  }
  render() {
    const _a = this.props,
      {
        className,
        children,
        type,
        mode
      } = _a,
      rest = __rest(_a, ["className", "children", "type", "mode"]);
    const restProps = this.foundation.getRestProps();
    const realChildren = this.getRealChildren();
    const disabledOkButton = this.disableSubmitButton();
    const realCls = (0, _classnames.default)(prefixCls, {
      [`${prefixCls}-${type}`]: type,
      className: className
    });
    return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Feedback"
    }, (locale, localeCode) => {
      return mode === 'modal' ? (/*#__PURE__*/_react.default.createElement(_index.Modal, Object.assign({
        okButtonProps: {
          disabled: disabledOkButton
        },
        okText: locale.submit,
        cancelText: locale.cancel,
        className: realCls
      }, restProps, {
        onOk: this.foundation.handleModalOk,
        onCancel: this.foundation.handleModalCancel
      }), realChildren)) : (/*#__PURE__*/_react.default.createElement(_index.SideSheet, Object.assign({
        mask: false,
        disableScroll: false,
        canVerticalSetWidth: true,
        placement: "bottom",
        height: "auto",
        className: realCls,
        footer: this.renderFooter(locale),
        onCancel: this.foundation.handleCancel
      }, restProps), realChildren));
    });
  }
}
exports.default = Feedback;
Feedback.__SemiComponentName__ = "Feedback";
Feedback.defaultProps = {
  mode: 'popup',
  type: 'emoji',
  onValueChange: _noop2.default,
  onCancel: _noop2.default,
  onOk: _noop2.default,
  afterClose: _noop2.default
};