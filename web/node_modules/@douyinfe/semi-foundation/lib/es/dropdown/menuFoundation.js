import BaseFoundation from '../base/foundation';
import { handlePrevent, isPrintableCharacter, findIndexByCharacter, getAncestorNodeByRole, getMenuButton, setFocusToItem, setFocusToNextMenuitem, setFocusToPreviousMenuItem } from '../utils/a11y';
export default class DropdownMenuFoundation extends BaseFoundation {
  constructor() {
    super(...arguments);
    this.menuItemNodes = null;
    this.firstChars = [];
  }
  handleEscape(menu) {
    const trigger = this._adapter.getContext('trigger');
    if (trigger === 'custom') {
      const menuButton = menu && getMenuButton(document.querySelectorAll(`[data-popupid]`), menu.id);
      menuButton.focus();
    }
  }
  setFocusByFirstCharacter(curItem, char) {
    const index = findIndexByCharacter(this.menuItemNodes, curItem, this.firstChars, char);
    if (index >= 0) {
      setFocusToItem(this.menuItemNodes, this.menuItemNodes[index]);
    }
  }
  onMenuKeydown(event) {
    const menu = getAncestorNodeByRole(event.target, 'tooltip');
    if (!this.menuItemNodes) {
      this.menuItemNodes = [...event.target.parentNode.getElementsByTagName('li')].filter(item => item.ariaDisabled !== "true");
    }
    if (this.firstChars.length === 0) {
      this.menuItemNodes.forEach(item => {
        var _a;
        // the menuItemNodes can be an component and not exit textContent
        this.firstChars.push((_a = item.textContent.trim()[0]) === null || _a === void 0 ? void 0 : _a.toLowerCase());
      });
    }
    // get the currently focused menu item
    const curItem = this.menuItemNodes.find(item => item.tabIndex === 0);
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.target.click();
        // user may use input to be the trigger and bind some key event on it, so do not stoppropagation
        // handlePrevent(event);
        break;
      case 'Escape':
        this.handleEscape(menu);
        break;
      case 'ArrowUp':
        setFocusToPreviousMenuItem(this.menuItemNodes, curItem);
        handlePrevent(event);
        break;
      case 'ArrowDown':
        setFocusToNextMenuitem(this.menuItemNodes, curItem);
        handlePrevent(event);
        break;
      default:
        if (isPrintableCharacter(event.key)) {
          this.setFocusByFirstCharacter(curItem, event.key);
          // it can be an input on Dropdown, handlePrevent may affect the input of the component
          // handlePrevent(event); 
        }
        break;
    }
  }
}