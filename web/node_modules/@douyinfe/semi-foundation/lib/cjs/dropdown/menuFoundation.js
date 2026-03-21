"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _a11y = require("../utils/a11y");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DropdownMenuFoundation extends _foundation.default {
  constructor() {
    super(...arguments);
    this.menuItemNodes = null;
    this.firstChars = [];
  }
  handleEscape(menu) {
    const trigger = this._adapter.getContext('trigger');
    if (trigger === 'custom') {
      const menuButton = menu && (0, _a11y.getMenuButton)(document.querySelectorAll(`[data-popupid]`), menu.id);
      menuButton.focus();
    }
  }
  setFocusByFirstCharacter(curItem, char) {
    const index = (0, _a11y.findIndexByCharacter)(this.menuItemNodes, curItem, this.firstChars, char);
    if (index >= 0) {
      (0, _a11y.setFocusToItem)(this.menuItemNodes, this.menuItemNodes[index]);
    }
  }
  onMenuKeydown(event) {
    const menu = (0, _a11y.getAncestorNodeByRole)(event.target, 'tooltip');
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
        (0, _a11y.setFocusToPreviousMenuItem)(this.menuItemNodes, curItem);
        (0, _a11y.handlePrevent)(event);
        break;
      case 'ArrowDown':
        (0, _a11y.setFocusToNextMenuitem)(this.menuItemNodes, curItem);
        (0, _a11y.handlePrevent)(event);
        break;
      default:
        if ((0, _a11y.isPrintableCharacter)(event.key)) {
          this.setFocusByFirstCharacter(curItem, event.key);
          // it can be an input on Dropdown, handlePrevent may affect the input of the component
          // handlePrevent(event); 
        }
        break;
    }
  }
}
exports.default = DropdownMenuFoundation;