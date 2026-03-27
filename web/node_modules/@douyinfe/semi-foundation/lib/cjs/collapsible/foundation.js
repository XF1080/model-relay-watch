"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CollapsibleFoundation extends _foundation.default {
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
var _default = exports.default = CollapsibleFoundation;