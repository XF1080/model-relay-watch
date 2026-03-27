"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_TOGGLE_ICON = void 0;
var _constants = require("./constants");
const DEFAULT_TOGGLE_ICON = exports.DEFAULT_TOGGLE_ICON = {
  open: 'chevron_up',
  closed: 'chevron_down'
};
class NavItem {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (options == null || typeof options !== 'object') {
      options = {
        text: options,
        itemKey: options,
        maxHeight: _constants.numbers.DEFAULT_SUBNAV_MAX_HEIGHT,
        // selected: false,
        // isOpen: false,
        link: null,
        items: null,
        icon: '',
        indent: false
      };
    }
    for (const key of Object.keys(options)) {
      this[key] = options[key];
    }
    if (options.items && Array.isArray(options.items) && options.items.length) {
      this.items = options.items.map(item => new NavItem(item));
      if ('toggleIcon' in options) {
        this.toggleIcon = NavItem.isValidToggleIcon(options.toggleIcon) ? Object.assign({}, options.toggleIcon) : Object.assign({}, DEFAULT_TOGGLE_ICON);
      } else {
        this.toggleIcon = Object.assign({}, DEFAULT_TOGGLE_ICON);
      }
    } else {
      this.items = null;
    }
  }
  static isValidToggleIcon(toggleIcon) {
    return Boolean(toggleIcon && typeof toggleIcon === 'object' && typeof toggleIcon.open === 'string' && toggleIcon.open.length && typeof toggleIcon.closed === 'string' && toggleIcon.closed.length);
  }
}
exports.default = NavItem;