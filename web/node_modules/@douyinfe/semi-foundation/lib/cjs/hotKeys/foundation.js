"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class HotKeysFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.isValidHotKeys = hotKeys => {
      let commonKeyCnt = 0;
      const modifierKeys = [_constants.Keys.Meta, _constants.Keys.Alt, _constants.Keys.Shift, _constants.Keys.Control];
      hotKeys.forEach(key => {
        key = key.toLowerCase();
        if (!Object.values(_constants.Keys).some(value => value === key)) {
          throw new Error(`${key} is not a valid key`);
        }
        if (!modifierKeys.includes(key)) {
          commonKeyCnt += 1;
        }
      });
      return commonKeyCnt === 1;
    };
    this.handleKeyDown = event => {
      const {
        mergeMetaCtrl: merged,
        hotKeys,
        preventDefault
      } = this.getProps();
      let allModifier = new Array(4).fill(false); // Meta Shift Alt Ctrl
      let clickedModifier = [event.metaKey, event.shiftKey, event.altKey, event.ctrlKey];
      const keysPressed = hotKeys === null || hotKeys === void 0 ? void 0 : hotKeys.map(key => {
        key = key.toLowerCase();
        if (key === _constants.Keys.Meta) {
          allModifier[0] = true;
          return event.metaKey;
        } else if (key === _constants.Keys.Shift) {
          allModifier[1] = true;
          return event.shiftKey;
        } else if (key === _constants.Keys.Alt) {
          allModifier[2] = true;
          return event.altKey;
        } else if (key === _constants.Keys.Control) {
          allModifier[3] = true;
          return event.ctrlKey;
        }
        return event.code === (0, _constants.keyToCode)(key);
      });
      if (!allModifier.every((value, index) => value === clickedModifier[index])) {
        return;
      }
      if (keysPressed.every(Boolean)) {
        if (preventDefault) {
          event.preventDefault();
        }
        this._adapter.notifyHotKey(event);
        return;
      }
    };
  }
  init() {
    // init Listener
    this._adapter.registerEvent();
    const hotKeys = this.getProps().hotKeys;
    if (!this.isValidHotKeys(hotKeys)) {
      throw new Error('HotKeys must have one common key and 0/some modifier key');
    }
  }
  destroy() {
    // remove Listener
    this._adapter.unregisterEvent();
  }
}
exports.default = HotKeysFoundation;