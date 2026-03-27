import BaseFoundation from '../base/foundation';
import isEnterPress from '../utils/isEnterPress';
import warning from '../utils/warning';
class CheckboxFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.clickState = false;
    this.handleFocusVisible = event => {
      const {
        target
      } = event;
      try {
        if (this.clickState) {
          this.clickState = false;
          return;
        }
        if (target.matches(':focus-visible')) {
          this._adapter.setFocusVisible(true);
        }
      } catch (error) {
        warning(true, 'Warning: [Semi Checkbox] The current browser does not support the focus-visible');
      }
    };
    this.handleBlur = () => {
      this.clickState = false;
      this._adapter.setFocusVisible(false);
    };
  }
  init() {
    const {
      children,
      extra,
      extraId,
      addonId
    } = this.getProps();
    if (children && !addonId) {
      this._adapter.setAddonId();
    }
    if (extra && !extraId) {
      this._adapter.setExtraId();
    }
  }
  notifyChange(checked, e) {
    const cbValue = this._adapter.generateEvent(checked, e);
    this._adapter.notifyChange(cbValue);
  }
  handleChange(e) {
    const disabled = this.getProp('disabled');
    if (disabled) {
      return;
    }
    if ((e === null || e === void 0 ? void 0 : e.type) === 'click') {
      this.clickState = true;
    }
    this._adapter.focusCheckboxEntity();
    const isInGroup = this._adapter.getIsInGroup();
    if (isInGroup) {
      const groupDisabled = this._adapter.getGroupDisabled();
      if (!groupDisabled) {
        this.handleChangeInGroup(e);
      }
      return;
    }
    const checked = this.getState('checked');
    const newChecked = !checked;
    if (this._isControlledComponent('checked')) {
      this.notifyChange(newChecked, e);
    } else {
      this.setChecked(newChecked);
      this.notifyChange(newChecked, e);
    }
  }
  handleChangeInGroup(e) {
    const {
      value
    } = this.getProps();
    const groupValue = this._adapter.getGroupValue();
    const checked = groupValue.includes(value);
    const newChecked = !checked;
    const event = this._adapter.generateEvent(newChecked, e);
    this._adapter.notifyChange(event);
    this._adapter.notifyGroupChange(event);
  }
  handleEnterPress(e) {
    if (isEnterPress(e)) {
      this.handleChange(e);
    }
  }
  setChecked(checked) {
    this._adapter.setNativeControlChecked(checked);
  }
  destroy() {}
}
export default CheckboxFoundation;