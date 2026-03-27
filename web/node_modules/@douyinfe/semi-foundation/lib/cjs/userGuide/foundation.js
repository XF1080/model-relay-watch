"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UserGuideFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handlePrev = () => {
      const {
        current
      } = this.getStates();
      const newCurrent = current - 1;
      if (!this.getIsControlledComponent()) {
        this._adapter.setCurrent(newCurrent);
      }
      this._notifyChange(newCurrent);
      this._adapter.notifyPrev(newCurrent);
    };
    this.handleNext = () => {
      const {
        steps
      } = this.getProps();
      const {
        current
      } = this.getStates();
      const isLastStep = current === steps.length - 1;
      const newCurrent = isLastStep ? current : current + 1;
      if (isLastStep) {
        this._adapter.notifyFinish();
      } else {
        this._notifyChange(newCurrent);
        this._adapter.notifyNext(newCurrent);
        if (!this.getIsControlledComponent()) {
          this._adapter.setCurrent(newCurrent);
        }
      }
    };
    this.handleSkip = () => {
      this._adapter.notifySkip();
    };
  }
  init() {}
  destroy() {
    this._adapter.enabledBodyScroll();
  }
  _notifyChange(current) {
    const {
      current: stateCurrent
    } = this.getStates();
    if (stateCurrent !== current) {
      this._adapter.notifyChange(current);
    }
  }
  getIsControlledComponent() {
    return this._isInProps('current');
  }
  beforeShow() {
    this._adapter.disabledBodyScroll();
  }
  afterHide() {
    this._adapter.enabledBodyScroll();
  }
  getFinalPaading() {
    var _a;
    const {
      spotlightPadding,
      steps
    } = this.getProps();
    const {
      current
    } = this.getStates();
    const stepPadding = (_a = steps[current]) === null || _a === void 0 ? void 0 : _a.spotlightPadding;
    const padding = typeof stepPadding === 'number' ? stepPadding : typeof spotlightPadding === 'number' ? spotlightPadding : _constants.numbers.DEFAULT_SPOTLIGHT_PADDING;
    return padding;
  }
}
exports.default = UserGuideFoundation;