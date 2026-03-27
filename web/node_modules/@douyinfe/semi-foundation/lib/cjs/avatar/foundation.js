"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _warning = _interopRequireDefault(require("../utils/warning"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class AvatarFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleFocusVisible = event => {
      const {
        target
      } = event;
      try {
        if (target.matches(':focus-visible')) {
          this._adapter.setFocusVisible(true);
        }
      } catch (error) {
        (0, _warning.default)(true, 'Warning: [Semi Avatar] The current browser does not support the focus-visible');
      }
    };
    this.handleBlur = () => {
      this._adapter.setFocusVisible(false);
    };
    this.changeScale = () => {
      const {
        gap
      } = this.getProps();
      const node = this._adapter.getAvatarNode();
      const stringNode = node === null || node === void 0 ? void 0 : node.firstChild;
      const [nodeWidth, stringNodeWidth] = [(node === null || node === void 0 ? void 0 : node.offsetWidth) || 0, (stringNode === null || stringNode === void 0 ? void 0 : stringNode.offsetWidth) || 0];
      if (nodeWidth !== 0 && stringNodeWidth !== 0 && gap * 2 < nodeWidth) {
        const scale = nodeWidth - gap * 2 > stringNodeWidth ? 1 : (nodeWidth - gap * 2) / stringNodeWidth;
        this._adapter.setScale(scale);
      }
    };
  }
  init() {
    const {
      children
    } = this.getProps();
    if (typeof children === "string") {
      this.changeScale();
    }
  }
  destroy() {}
  handleImgLoadError() {
    const {
      onError
    } = this.getProps();
    const errorFlag = onError ? onError() : undefined;
    if (errorFlag !== false) {
      this._adapter.notifyImgState(false);
    }
  }
  handleEnter(e) {
    this._adapter.notifyEnter(e);
  }
  handleLeave(e) {
    this._adapter.notifyLeave(e);
  }
}
exports.default = AvatarFoundation;