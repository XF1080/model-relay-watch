import BaseFoundation from '../base/foundation';
export default class OptionFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {}
  destroy() {}
  onOptionClick(option) {
    const isDisabled = this._isDisabled();
    if (!isDisabled) {
      this._adapter.notifyClick(option);
    }
  }
  _isDisabled() {
    return this.getProp('disabled');
  }
}