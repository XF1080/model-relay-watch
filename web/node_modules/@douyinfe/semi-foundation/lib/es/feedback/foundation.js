import _omit from "lodash/omit";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import isPromise from '../utils/isPromise';
import BaseFoundation from '../base/foundation';
export default class FoundationFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleRadioChange = e => {
      const {
        value
      } = e.target;
      this._adapter.notifyRadioChange(e);
      this._adapter.notifyValueChange(value);
    };
    this.handleEmojiReasonChange = (value, e) => {
      this._adapter.notifyTextAreaChange(value, e);
      const oldValue = this._adapter.getState('value');
      const newValue = Object.assign(Object.assign({}, oldValue), {
        text: value
      });
      this._adapter.notifyValueChange(newValue);
    };
    this.handleTextChange = (value, e) => {
      this._adapter.notifyTextAreaChange(value, e);
      this._adapter.notifyValueChange(value);
    };
    this.handleEmojiClick = e => {
      const {
        value
      } = e.currentTarget.dataset;
      this._adapter.notifyValueChange({
        emoji: value
      });
    };
    this.handleCheckboxChange = value => {
      this._adapter.notifyCheckBoxChange(value);
      this._adapter.notifyValueChange(value);
    };
    this.handleCancel = e => {
      var _a;
      const result = this._adapter.notifyCancel(e);
      if (isPromise(result)) {
        this._adapter.setState({
          onCancelReturnPromiseStatus: "pending"
        });
        (_a = result === null || result === void 0 ? void 0 : result.then(() => {
          this._adapter.setState({
            onCancelReturnPromiseStatus: "fulfilled",
            value: null
          });
        })) === null || _a === void 0 ? void 0 : _a.catch(e => {
          this._adapter.setState({
            onCancelReturnPromiseStatus: "rejected"
          });
          throw e;
        });
      } else {
        this._adapter.setValue(null);
      }
    };
    this.handleSubmit = e => {
      var _a;
      const result = this._adapter.notifyOk(e);
      if (isPromise(result)) {
        this._adapter.setState({
          onOKReturnPromiseStatus: "pending"
        });
        (_a = result === null || result === void 0 ? void 0 : result.then(() => {
          this._adapter.setState({
            onOKReturnPromiseStatus: "fulfilled",
            value: null
          });
        })) === null || _a === void 0 ? void 0 : _a.catch(e => {
          this._adapter.setState({
            onOKReturnPromiseStatus: "rejected"
          });
          throw e;
        });
      } else {
        this._adapter.setValue(null);
      }
    };
    this.handleModalOk = e => {
      const result = this._adapter.notifyOk(e);
      if (isPromise(result)) {
        return result === null || result === void 0 ? void 0 : result.then(() => {
          this._adapter.setState({
            value: null
          });
          return Promise.resolve();
        });
      } else {
        this._adapter.setValue(null);
        return null;
      }
    };
    this.handleModalCancel = e => {
      const result = this._adapter.notifyCancel(e);
      if (isPromise(result)) {
        return result === null || result === void 0 ? void 0 : result.then(() => {
          this._adapter.setState({
            value: null
          });
          return Promise.resolve();
        });
      } else {
        this._adapter.setState({
          value: null
        });
        return null;
      }
    };
    this.disableSubmitButton = () => {
      const value = this.getState('value');
      return !Boolean(value) || Array.isArray(value) && value.length === 0;
    };
    this.getRestProps = () => {
      const _a = this._adapter.getProps(),
        {
          className,
          children,
          type,
          mode
        } = _a,
        rest = __rest(_a, ["className", "children", "type", "mode"]);
      let omitPropsName = ['mode', 'type', 'onValueChange', 'textAreaProps', 'radioGroupProps', 'checkboxGroupProps', 'renderContent', 'onCancel', 'onOk'];
      if (mode === 'popup') {
        omitPropsName = omitPropsName.concat(['okButtonProps', 'cancelButtonProps']);
      }
      const restProps = _omit(rest, omitPropsName);
      return restProps;
    };
  }
}