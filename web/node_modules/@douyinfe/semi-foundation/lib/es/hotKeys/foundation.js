import BaseFoundation from '../base/foundation';
import { keyToCode, Keys } from './constants';
export default class HotKeysFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.isValidHotKeys = hotKeys => {
      let commonKeyCnt = 0;
      const modifierKeys = [Keys.Meta, Keys.Alt, Keys.Shift, Keys.Control];
      hotKeys.forEach(key => {
        key = key.toLowerCase();
        if (!Object.values(Keys).some(value => value === key)) {
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
        if (key === Keys.Meta) {
          allModifier[0] = true;
          return event.metaKey;
        } else if (key === Keys.Shift) {
          allModifier[1] = true;
          return event.shiftKey;
        } else if (key === Keys.Alt) {
          allModifier[2] = true;
          return event.altKey;
        } else if (key === Keys.Control) {
          allModifier[3] = true;
          return event.ctrlKey;
        }
        return event.code === keyToCode(key);
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