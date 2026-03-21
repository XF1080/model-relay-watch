"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class LinkFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    // this.setInitValue();
  }
  destroy() {}
  handleAddLink() {
    const href = this._adapter.getProp('href');
    this._adapter.addLink(href);
  }
  handleUpdateLink(href, prevHref) {
    if (href !== prevHref) {
      this._adapter.removeLink(prevHref);
      this._adapter.addLink(href);
    }
  }
  handleRemoveLink() {
    const href = this._adapter.getProp('href');
    this._adapter.removeLink(href);
  }
}
exports.default = LinkFoundation;