import BaseFoundation from "../base/foundation";
import lottie from "lottie-web";
class LottieFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, LottieFoundation.defaultAdapter), adapter));
    this.animation = null;
    this.handleParamsUpdate = () => {
      var _a;
      this.animation.destroy();
      this.animation = lottie.loadAnimation(this._adapter.getLoadParams());
      (_a = this.getProp("getAnimationInstance")) === null || _a === void 0 ? void 0 : _a(this.animation);
    };
  }
  init(lifecycle) {
    var _a, _b;
    super.init(lifecycle);
    this.animation = lottie.loadAnimation(this._adapter.getLoadParams());
    (_a = this.getProp("getAnimationInstance")) === null || _a === void 0 ? void 0 : _a(this.animation);
    (_b = this.getProp("getLottie")) === null || _b === void 0 ? void 0 : _b(LottieFoundation.getLottie());
  }
  destroy() {
    super.destroy();
    this.animation.destroy();
  }
}
LottieFoundation.getLottie = () => {
  return lottie;
};
export default LottieFoundation;