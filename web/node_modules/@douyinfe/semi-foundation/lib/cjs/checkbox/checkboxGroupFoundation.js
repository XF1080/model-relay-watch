"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _warning = _interopRequireDefault(require("../utils/warning"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CheckboxGroupFoundation extends _foundation.default {
  static get checkboxGroupDefaultAdapter() {
    return {};
  }
  constructor(adapter) {
    super(Object.assign(Object.assign({}, CheckboxGroupFoundation.checkboxGroupDefaultAdapter), adapter));
  }
  init() {
    const {
      defaultValue,
      value
    } = this.getProps();
    if (typeof defaultValue !== 'undefined' && !Array.isArray(defaultValue)) {
      (0, _warning.default)(true, 'Warning: [Semi CheckboxGroup] defaultValue should be an Array');
    }
    if (typeof value !== 'undefined' && !Array.isArray(value)) {
      (0, _warning.default)(true, 'Warning: [Semi CheckboxGroup] value should be an Array');
    }
  }
  notifyChange(value) {
    this._adapter.notifyChange(value);
  }
  handleChange(evt) {
    const prevValue = this.getState('value');
    let newValue = [];
    if (!Array.isArray(prevValue)) {
      newValue = [prevValue];
    }
    if (evt.target.checked) {
      newValue = [...prevValue, evt.target.value];
    } else {
      newValue = prevValue.filter((itm, idx) => itm !== evt.target.value);
    }
    const isControlledMode = 'value' in this.getProps();
    if (isControlledMode) {
      // Controlled mode only needs to notify
      this.notifyChange(newValue);
    } else {
      // In uncontrolled mode, update the value in the state, and then notify
      this._adapter.updateGroupValue(newValue);
      this.notifyChange(newValue);
    }
  }
  getFormatName() {
    const propName = this.getProp('name');
    const defaultName = 'default';
    return propName || defaultName;
  }
  handlePropValueChange(newPropValue) {
    if (Array.isArray(newPropValue)) {
      this._adapter.updateGroupValue(newPropValue);
    } else {
      // to adjust reset in Form.CheckboxGroup
      if (typeof newPropValue === 'undefined') {
        this._adapter.updateGroupValue([]);
      }
      (0, _warning.default)(true, 'Warning: [Semi CheckboxGroup] value should be an Array');
    }
  }
  destroy() {}
}
var _default = exports.default = CheckboxGroupFoundation;