"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _warning = _interopRequireDefault(require("../utils/warning"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SwitchFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleFocusVisible = event => {
      const {
        target
      } = event;
      try {
        if (target.matches(':focus-visible')) {
          this._adapter.setFocusVisible(true);
        }
      } catch (error) {
        (0, _warning.default)(true, 'Warning: [Semi Switch] The current browser does not support the focus-visible');
      }
    };
    this.handleBlur = () => {
      this._adapter.setFocusVisible(false);
    };
  }
  init() {
    const {
      disabled
    } = this.getProps();
    this.setDisabled(disabled);
  }
  setChecked(checked) {
    this._adapter.setNativeControlChecked(checked);
  }
  setDisabled(disabled) {
    this._adapter.setNativeControlDisabled(disabled);
  }
  handleChange(checked, e) {
    const propChecked = this.getProps().checked;
    const isControlledComponent = typeof propChecked !== 'undefined';
    if (isControlledComponent) {
      this._adapter.notifyChange(checked, e);
    } else {
      this._adapter.setNativeControlChecked(checked);
      this._adapter.notifyChange(checked, e);
    }
  }
  destroy() {}
}
exports.default = SwitchFoundation;