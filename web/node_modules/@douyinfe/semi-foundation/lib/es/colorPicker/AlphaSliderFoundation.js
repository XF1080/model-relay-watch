import BaseFoundation from "../base/foundation";
class AlphaSliderFoundation extends BaseFoundation {
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
      const handlePosition = colorPickerFoundation.getAlphaHandlePositionByMousePosition(mousePosition, width, handleSize);
      colorPickerFoundation.handleAlphaChangeByHandle({
        a: Number(Math.min(Math.max(mousePosition / width, 0), 1).toFixed(2))
      });
      this.setState({
        handlePosition
      });
    };
  }
}
export default AlphaSliderFoundation;