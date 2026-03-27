"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SpinFoundation extends _foundation.default {
  static get spinDefaultAdapter() {
    return {
      getProp: () => undefined,
      setLoading: val => undefined
    };
  }
  constructor(adapter) {
    super(Object.assign(Object.assign({}, SpinFoundation.spinDefaultAdapter), adapter));
  }
  updateLoadingIfNeedDelay() {
    const {
      spinning: propsSpinning,
      delay: propsDelay
    } = this._adapter.getProps();
    const {
      delay
    } = this._adapter.getStates();
    if (delay) {
      const self = this;
      this._timer = setTimeout(() => {
        self._adapter.setState({
          loading: propsSpinning,
          delay: 0
        });
      }, propsDelay);
    }
  }
  destroy() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
}
var _default = exports.default = SpinFoundation;