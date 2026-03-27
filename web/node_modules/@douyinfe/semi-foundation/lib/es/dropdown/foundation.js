import BaseFoundation from '../base/foundation';
import { handlePrevent, setFocusToFirstItem, setFocusToLastItem } from '../utils/a11y';
export default class DropdownFoundation extends BaseFoundation {
  handleVisibleChange(visible) {
    this._adapter.setPopVisible(visible);
    this._adapter.notifyVisibleChange(visible);
    const {
      trigger
    } = this.getProps();
    if (visible && trigger === "click") {
      const popupId = this._adapter.getPopupId();
      this.setFocusToFirstMenuItem(popupId);
    }
  }
  getMenuItemNodes(id) {
    const menuWrapper = document.getElementById(id);
    // if has dropdown item, the item must wrapped by li
    return menuWrapper ? Array.from(menuWrapper.getElementsByTagName('li')).filter(item => item.ariaDisabled === "false") : null;
  }
  setFocusToFirstMenuItem(id) {
    const menuItemNodes = this.getMenuItemNodes(id);
    menuItemNodes && setFocusToFirstItem(menuItemNodes);
  }
  setFocusToLastMenuItem(id) {
    const menuItemNodes = this.getMenuItemNodes(id);
    menuItemNodes && setFocusToLastItem(menuItemNodes);
  }
  handleKeyDown(event) {
    var _a, _b;
    const id = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.attributes['data-popupid']) === null || _b === void 0 ? void 0 : _b.value;
    const {
      visible
    } = this._adapter.getStates();
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.target.click();
        // user may use input to be the trigger and bind some key event on it, so do not stoppropagation
        // handlePrevent(event);
        break;
      case 'ArrowDown':
        this.setFocusToFirstMenuItem(id);
        visible && handlePrevent(event);
        break;
      case 'ArrowUp':
        this.setFocusToLastMenuItem(id);
        visible && handlePrevent(event);
        break;
      default:
        break;
    }
  }
}