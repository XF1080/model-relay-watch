import BaseFoundation from "../base/foundation";
class ColorSliderFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
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
      const {
        width,
        handleSize
      } = this._adapter.getProps();
      const colorPickerFoundation = this._adapter.getColorPickerFoundation();
      const mousePosition = e.clientX - rect.x;
      colorPickerFoundation.handleColorChangeByHandle({
        h: Math.round(Math.min(Math.max(mousePosition / width, 0), 1) * 360)
      });
      const handlePosition = colorPickerFoundation.getColorHandlePositionByMousePosition(mousePosition, width, handleSize);
      this.setState({
        handlePosition
      });
    };
  }
}
export default ColorSliderFoundation;