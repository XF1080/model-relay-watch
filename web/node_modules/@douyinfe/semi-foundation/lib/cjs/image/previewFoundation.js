"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PreviewFoundation extends _foundation.default {
  constructor() {
    super(...arguments);
    this.handleVisibleChange = newVisible => {
      const {
        visible,
        onVisibleChange
      } = this.getProps();
      if (!(visible in this.getProps())) {
        this.setState({
          visible: newVisible
        });
      }
      onVisibleChange && onVisibleChange(newVisible);
    };
    this.handleCurrentIndexChange = index => {
      const {
        currentIndex,
        onChange
      } = this.getProps();
      if (!(currentIndex in this.getProps())) {
        this.setState({
          currentIndex: index
        });
      }
      onChange && onChange(index);
    };
  }
}
exports.default = PreviewFoundation;