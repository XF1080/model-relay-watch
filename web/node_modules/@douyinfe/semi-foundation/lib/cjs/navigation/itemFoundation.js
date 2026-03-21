"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _isEnterPress = _interopRequireDefault(require("../utils/isEnterPress"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* argus-disable unPkgSensitiveInfo */

class ItemFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    this._timer = null;
    this._mounted = true;
  }
  destroy() {
    this._mounted = false;
  }
  isValidKey(itemKey) {
    return itemKey != null && (typeof itemKey === 'string' || typeof itemKey === 'number');
  }
  handleClick(e) {
    const {
      isSubNav,
      itemKey,
      text,
      disabled
    } = this.getProps();
    if (disabled) {
      return;
    }
    if (!isSubNav && this.isValidKey(itemKey) && !this._adapter.getSelectedKeysIsControlled() && !this._adapter.getSelected()) {
      this._adapter.updateSelected(true);
    }
    const selectedKeys = [itemKey];
    // If the current item is subNav, there is no need to trigger the global onSelect/onClick event, instead, the SubNav component will trigger the click event
    if (!isSubNav) {
      if (!this._adapter.getSelected()) {
        // internal-issues:51
        const selectedItems = [this._adapter.cloneDeep(this.getProps())];
        this._adapter.notifyGlobalOnSelect({
          itemKey,
          selectedKeys,
          selectedItems,
          domEvent: e
        });
      }
      this._adapter.notifyGlobalOnClick({
        itemKey,
        text,
        domEvent: e
      });
    }
    this._adapter.notifyClick({
      itemKey,
      text,
      domEvent: e
    });
  }
  /**
   * A11y: simulate item click
   */
  handleKeyPress(e) {
    if ((0, _isEnterPress.default)(e)) {
      const {
        link,
        linkOptions
      } = this.getProps();
      const target = (0, _get2.default)(linkOptions, 'target', '_self');
      this.handleClick(e);
      if (typeof link === 'string') {
        target === '_blank' ? window.open(link) : window.location.href = link;
      }
    }
  }
}
exports.default = ItemFoundation;