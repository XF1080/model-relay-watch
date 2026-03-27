"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ImageFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleClick = e => {
      const {
        imageID,
        preview
      } = this.getProps();
      // if preview = false, then it cannot preview
      if (!preview) {
        return;
      }
      // if image in group, then use group's Preview components
      if (this._adapter.getIsInGroup()) {
        const {
          setCurrentIndex,
          handleVisibleChange
        } = this._adapter.getContexts();
        setCurrentIndex(imageID);
        handleVisibleChange(true);
      } else {
        // image isn't in group, then use it's own Preview components
        this.handlePreviewVisibleChange(true);
      }
    };
    this.handleLoaded = e => {
      const {
        onLoad
      } = this.getProps();
      onLoad && onLoad(e);
      this.setState({
        loadStatus: "success"
      });
    };
    this.handleError = e => {
      const {
        onError
      } = this.getProps();
      onError && onError(e);
      this.setState({
        loadStatus: "error"
      });
    };
    this.handlePreviewVisibleChange = newVisible => {
      const {
        preview
      } = this.getProps();
      if ((0, _isObject2.default)(preview)) {
        const {
          onVisibleChange
        } = preview;
        onVisibleChange && onVisibleChange(newVisible);
        if (!("visible" in preview)) {
          this.setState({
            previewVisible: newVisible
          });
        }
      } else {
        this.setState({
          previewVisible: newVisible
        });
      }
    };
  }
}
exports.default = ImageFoundation;