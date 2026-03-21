import BaseFoundation from '../base/foundation';
import KeyCode from '../utils/keyCode';
export default class ContainerFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, ContainerFoundation.defaultAdapter), adapter));
    this.init = () => {};
    this.destroy = () => {
      this.afterHide();
    };
    this.toggleDisplayNone = displayNone => {
      this._adapter.toggleDisplayNone(displayNone);
    };
    this.handleAnimationEnd = () => {
      const {
        visible
      } = this.getProps();
      this.toggleDisplayNone(!visible);
    };
  }
  handleCancel(e) {
    this._adapter.notifyCancel(e);
  }
  beforeShow() {
    this._adapter.setOnKeyDownListener();
  }
  afterHide() {
    this._adapter.removeKeyDownListener();
  }
  handleKeyDown(e) {
    const {
      closeOnEsc
    } = this.getProps();
    if (closeOnEsc && e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      this.handleCancel(e);
      return;
    }
  }
  onVisibleChange(visible) {
    this._adapter.notifyVisibleChange(visible);
  }
}