import BaseFoundation from "../base/foundation";
class CollapsibleFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.updateDOMInRenderTree = isInRenderTree => {
      this._adapter.setDOMInRenderTree(isInRenderTree);
    };
    this.updateDOMHeight = domHeight => {
      this._adapter.setDOMHeight(domHeight);
    };
    this.updateVisible = visible => {
      this._adapter.setVisible(visible);
    };
    this.updateIsTransitioning = isTransitioning => {
      this._adapter.setIsTransitioning(isTransitioning);
    };
  }
}
export default CollapsibleFoundation;