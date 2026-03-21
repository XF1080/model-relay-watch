import _isNumber from "lodash/isNumber";
import BaseFoundation from '../base/foundation';
export default class NotificationFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, NotificationFoundation.defaultAdapter), adapter));
    this._timer = null;
    this._id = null; // cache id
  }
  init() {
    this._startCloseTimer();
    this._id = this.getProp('id');
  }
  destroy() {
    this._clearCloseTimer();
  }
  _startCloseTimer() {
    // unit: s
    const duration = this.getProp('duration');
    if (duration && _isNumber(duration)) {
      this._timer = setTimeout(() => {
        this.close(); // call parent to remove itself
      }, duration * 1000);
    }
  }
  close(e) {
    if (e) {
      e.stopPropagation();
    }
    this._adapter.notifyWrapperToRemove(this._id);
    this._adapter.notifyClose();
  }
  _clearCloseTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  restartCloseTimer() {
    this._clearCloseTimer();
    this._startCloseTimer();
  }
}