"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _isEnterPress = _interopRequireDefault(require("../utils/isEnterPress"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const addKeys = function addKeys() {
  let originKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const keySet = new Set(originKeys);
  for (var _len = arguments.length, willAddKeys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    willAddKeys[_key - 1] = arguments[_key];
  }
  willAddKeys.forEach(key => key && keySet.add(key));
  return Array.from(keySet);
};
const removeKeys = function removeKeys() {
  let originKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  const keySet = new Set(originKeys);
  for (var _len2 = arguments.length, willRemoveKeys = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    willRemoveKeys[_key2 - 1] = arguments[_key2];
  }
  willRemoveKeys.forEach(key => key && keySet.delete(key));
  return Array.from(keySet);
};
class SubNavFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    // this.log('invoke SubNavFoundation init()');
    this._timer = null;
  }
  destroy() {
    this.clearDelayTimer();
  }
  clearDelayTimer() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
  isValidKey(itemKey) {
    return itemKey != null && (typeof itemKey === 'number' || typeof itemKey === 'string');
  }
  handleDropdownVisibleChange(visible) {
    const itemKey = this.getProp('itemKey');
    const openKeysIsControlled = this._adapter.getOpenKeysIsControlled();
    const canUpdateOpenKeys = this._adapter.getCanUpdateOpenKeys();
    const rawOpenKeys = this._adapter.getOpenKeys();
    const openKeys = visible ? addKeys(rawOpenKeys, itemKey) : removeKeys(rawOpenKeys, itemKey);
    this.clearDelayTimer();
    if (!openKeysIsControlled) {
      if (canUpdateOpenKeys) {
        this._adapter.updateOpen(visible);
      }
      // this._adapter.updateIsHovered(visible);
    }
    this._adapter.notifyGlobalOpenChange({
      itemKey,
      openKeys,
      isOpen: visible
    });
  }
  /**
   *
   * @param {Event} e
   * @param {HTMLElement} titleRef
   */
  handleClick(e, titleRef) {
    const {
      itemKey,
      disabled
    } = this.getProps();
    if (disabled) {
      return;
    }
    // this.log(e, titleRef, titleRef.contains(e.target));
    const clickedDomIsTitle = titleRef && titleRef.contains(e.target);
    let isOpen = Boolean(this._adapter.getIsOpen());
    if (!clickedDomIsTitle) {
      isOpen = false;
    } else {
      isOpen = !isOpen;
    }
    const openKeys = isOpen ? addKeys(this._adapter.getOpenKeys(), itemKey) : removeKeys(this._adapter.getOpenKeys(), itemKey);
    const cbVal = {
      itemKey,
      openKeys,
      isOpen,
      domEvent: e
    };
    const openKeysIsControlled = this._adapter.getOpenKeysIsControlled();
    const canUpdateOpenKeys = this._adapter.getCanUpdateOpenKeys();
    if (!openKeysIsControlled && canUpdateOpenKeys) {
      this._adapter.updateOpen(isOpen);
    }
    this._adapter.notifyGlobalOpenChange(cbVal);
    this._adapter.notifyGlobalOnClick(cbVal);
  }
  /**
   * A11y: simulate sub nav click
   * @param e
   * @param titleRef
   */
  handleKeyPress(e, titleRef) {
    if ((0, _isEnterPress.default)(e)) {
      this.handleClick(e, titleRef);
    }
  }
}
exports.default = SubNavFoundation;