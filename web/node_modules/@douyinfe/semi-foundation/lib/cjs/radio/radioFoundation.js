"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _warning = _interopRequireDefault(require("../utils/warning"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RadioFoundation extends _foundation.default {
  constructor() {
    super(...arguments);
    this.handleFocusVisible = event => {
      const {
        target
      } = event;
      try {
        if (target.matches(':focus-visible')) {
          this._adapter.setFocusVisible(true);
        }
      } catch (error) {
        (0, _warning.default)(true, 'Warning: [Semi Radio] The current browser does not support the focus-visible');
      }
    };
    this.handleBlur = () => {
      this._adapter.setFocusVisible(false);
    };
  }
  init() {
    const {
      children,
      extra,
      extraId,
      addonId
    } = this._adapter.getProps();
    if (children && !addonId) {
      this._adapter.setAddonId();
    }
    if (extra && !extraId) {
      this._adapter.setExtraId();
    }
  }
  setHover(hover) {
    this._adapter.setHover(hover);
  }
  setChecked(checked) {
    this._adapter.setChecked(checked);
  }
}
exports.default = RadioFoundation;