import BaseFoundation from '../base/foundation';
import isNullOrUndefined from '../utils/isNullOrUndefined';
class TimePickerFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {}
  destroy() {}
  handleFocus(e) {
    this.storeCursor();
    this._adapter.notifyFocus(e);
  }
  handleChange(v) {
    this.storeCursor();
    this._adapter.notifyChange(v);
  }
  handleBlur(e) {
    this.clearCursor();
    this._adapter.notifyBlur(e);
  }
  storeCursor() {
    const inputNode = this.getCache('inputNode');
    if (inputNode) {
      const {
        selectionStart: start
      } = inputNode;
      // const beforeStr = typeof value === 'string' ? value.substr(0, start) : null;
      // const afterStr = typeof value === 'string' ? value.substr(start, value.length - start + 1) : null;
      // console.log(start, beforeStr, afterStr);
      this.setCache('cursorIndex', start);
    }
  }
  restoreCursor() {
    const inputNode = this.getCache('inputNode');
    const cursorIndex = this.getCache('cursorIndex');
    if (inputNode && !isNullOrUndefined(cursorIndex)) {
      inputNode.selectionStart = cursorIndex;
      inputNode.selectionEnd = cursorIndex;
    }
  }
  clearCursor() {
    this.setCache('cursorIndex', null);
    this.setCache('beforeStr', null);
    this.setCache('afterStr', null);
  }
}
export default TimePickerFoundation;