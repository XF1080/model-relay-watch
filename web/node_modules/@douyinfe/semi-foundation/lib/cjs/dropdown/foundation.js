"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _a11y = require("../utils/a11y");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DropdownFoundation extends _foundation.default {
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
    menuItemNodes && (0, _a11y.setFocusToFirstItem)(menuItemNodes);
  }
  setFocusToLastMenuItem(id) {
    const menuItemNodes = this.getMenuItemNodes(id);
    menuItemNodes && (0, _a11y.setFocusToLastItem)(menuItemNodes);
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
        visible && (0, _a11y.handlePrevent)(event);
        break;
      case 'ArrowUp':
        this.setFocusToLastMenuItem(id);
        visible && (0, _a11y.handlePrevent)(event);
        break;
      default:
        break;
    }
  }
}
exports.default = DropdownFoundation;