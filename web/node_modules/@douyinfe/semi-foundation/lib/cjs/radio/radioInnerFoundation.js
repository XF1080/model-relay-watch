"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RadioInnerFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    const checked = this._adapter.getProp('checked');
    const defaultChecked = this._adapter.getProp('defaultChecked');
    this.setChecked(checked || defaultChecked);
  }
  setChecked(checked) {
    this._adapter.setNativeControlChecked(checked);
  }
  getChecked() {
    return this._adapter.getProp('checked');
  }
  handleChange(e) {
    const isControlledMode = 'checked' in this.getProps();
    const {
      checked
    } = e.target;
    const stopPropagation = () => {
      e.stopPropagation();
    };
    const preventDefault = () => {
      e.preventDefault();
    };
    const cbValue = {
      target: Object.assign(Object.assign({}, this.getProps()), {
        checked
      }),
      stopPropagation,
      preventDefault
    };
    if (isControlledMode) {
      this._adapter.notifyChange(cbValue);
    } else {
      this.setChecked(checked);
      this._adapter.notifyChange(cbValue);
    }
  }
  destroy() {}
}
exports.default = RadioInnerFoundation;