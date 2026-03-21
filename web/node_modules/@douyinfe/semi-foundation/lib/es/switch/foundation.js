import BaseFoundation from '../base/foundation';
import warning from '../utils/warning';
export default class SwitchFoundation extends BaseFoundation {
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
        warning(true, 'Warning: [Semi Switch] The current browser does not support the focus-visible');
      }
    };
    this.handleBlur = () => {
      this._adapter.setFocusVisible(false);
    };
  }
  init() {
    const {
      disabled
    } = this.getProps();
    this.setDisabled(disabled);
  }
  setChecked(checked) {
    this._adapter.setNativeControlChecked(checked);
  }
  setDisabled(disabled) {
    this._adapter.setNativeControlDisabled(disabled);
  }
  handleChange(checked, e) {
    const propChecked = this.getProps().checked;
    const isControlledComponent = typeof propChecked !== 'undefined';
    if (isControlledComponent) {
      this._adapter.notifyChange(checked, e);
    } else {
      this._adapter.setNativeControlChecked(checked);
      this._adapter.notifyChange(checked, e);
    }
  }
  destroy() {}
}