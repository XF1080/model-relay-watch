"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _lottieWeb = _interopRequireDefault(require("lottie-web"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class LottieFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, LottieFoundation.defaultAdapter), adapter));
    this.animation = null;
    this.handleParamsUpdate = () => {
      var _a;
      this.animation.destroy();
      this.animation = _lottieWeb.default.loadAnimation(this._adapter.getLoadParams());
      (_a = this.getProp("getAnimationInstance")) === null || _a === void 0 ? void 0 : _a(this.animation);
    };
  }
  init(lifecycle) {
    var _a, _b;
    super.init(lifecycle);
    this.animation = _lottieWeb.default.loadAnimation(this._adapter.getLoadParams());
    (_a = this.getProp("getAnimationInstance")) === null || _a === void 0 ? void 0 : _a(this.animation);
    (_b = this.getProp("getLottie")) === null || _b === void 0 ? void 0 : _b(LottieFoundation.getLottie());
  }
  destroy() {
    super.destroy();
    this.animation.destroy();
  }
}
LottieFoundation.getLottie = () => {
  return _lottieWeb.default;
};
var _default = exports.default = LottieFoundation;