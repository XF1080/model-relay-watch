"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PreviewFooterFoundation extends _foundation.default {
  constructor() {
    super(...arguments);
    this.changeSliderValue = type => {
      const {
        zoom,
        step,
        min,
        max
      } = this.getProps();
      let newValue = type === "plus" ? zoom + step : zoom - step;
      if (newValue > max) {
        newValue = max;
      } else if (newValue < min) {
        newValue = min;
      }
      this.handleValueChange(newValue);
    };
    this.handleValueChange = value => {
      const {
        onZoomIn,
        onZoomOut,
        zoom
      } = this.getProps();
      if (value > zoom) {
        onZoomIn(Number((value / 100).toFixed(2)));
      } else {
        onZoomOut(Number((value / 100).toFixed(2)));
      }
    };
    this.handleRatioClick = () => {
      const {
        ratio,
        onAdjustRatio
      } = this.getProps();
      const type = ratio === "adaptation" ? "realSize" : "adaptation";
      onAdjustRatio(type);
    };
    this.handleRotate = direction => {
      const {
        onRotate
      } = this.getProps();
      onRotate && onRotate(direction);
    };
  }
}
exports.default = PreviewFooterFoundation;