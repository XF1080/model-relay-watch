import BaseFoundation from '../base/foundation';
class FileCardFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  handleImageError(error) {
    this._adapter.updateFallbackPreview(true);
  }
}
export default FileCardFoundation;