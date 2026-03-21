import BaseFoundation from '../base/foundation';
import KeyCode from '../utils/keyCode';
export default class ModalContentFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign(Object.assign({}, ModalContentFoundation.defaultAdapter), adapter));
    this.handleKeyDown = e => {
      const {
        closeOnEsc
      } = this.getProps();
      if (closeOnEsc && e.keyCode === KeyCode.ESC) {
        e.stopPropagation();
        this.close(e);
        return;
      }
    };
  }
  destroy() {
    this.handleKeyDownEventListenerUnmount();
    this.modalDialogBlur();
    this.prevFocusElementReFocus();
  }
  handleDialogMouseDown() {
    this._adapter.notifyDialogMouseDown();
  }
  handleMaskMouseUp() {
    this._adapter.notifyDialogMouseUp();
  }
  handleKeyDownEventListenerMount() {
    this._adapter.addKeyDownEventListener();
  }
  handleKeyDownEventListenerUnmount() {
    this._adapter.removeKeyDownEventListener();
  }
  getMouseState() {
    this._adapter.getMouseState();
  }
  handleMaskClick(e) {
    const {
      dialogMouseDown
    } = this.getStates();
    if (e.target === e.currentTarget && !dialogMouseDown) {
      this.close(e);
    }
  }
  close(e) {
    this._adapter.notifyClose(e);
  }
  modalDialogFocus() {
    this._adapter.modalDialogFocus();
  }
  modalDialogBlur() {
    this._adapter.modalDialogBlur();
  }
  prevFocusElementReFocus() {
    this._adapter.prevFocusElementReFocus();
  }
}