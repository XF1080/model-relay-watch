"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColorChooseAreaFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.getHandlePositionByHSVA = () => {
      const {
        hsva,
        width,
        height,
        handleSize
      } = this.getProps();
      return this._adapter.getColorPickerFoundation().getHandlePositionByHSVA(hsva, {
        width: width,
        height: height
      }, handleSize);
    };
    this.handleMouseDown = e => {
      this._adapter.handleMouseDown(e);
    };
    this.handleMouseUp = e => {
      this._adapter.handleMouseUp(e);
    };
    this.setHandlePositionByMousePosition = e => {
      var _a;
      const rect = (_a = this._adapter.getDOM()) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
      if (!rect) {
        return;
      }
      const mousePosition = {
        x: e.clientX - rect.x,
        y: e.clientY - rect.y
      };
      const {
        width,
        height,
        handleSize
      } = this.getProps();
      const colorPickerFoundation = this._adapter.getColorPickerFoundation();
      const handlePosition = colorPickerFoundation.getHandlePositionByMousePosition(mousePosition, {
        width,
        height
      }, handleSize);
      if (handlePosition) {
        this.setState({
          handlePosition
        });
        this._adapter.notifyChange({
          s: Math.round(mousePosition.x / width * 100),
          v: Math.round(100 - Math.min(Math.max(mousePosition.y / height, 0), 1) * 100)
        });
      }
    };
  }
}
var _default = exports.default = ColorChooseAreaFoundation;