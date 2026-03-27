"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CollapseFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  initActiveKey() {
    const {
      defaultActiveKey,
      activeKey,
      accordion
    } = this.getProps();
    let activeKeyList = activeKey ? activeKey : defaultActiveKey;
    if (accordion) {
      activeKeyList = Array.isArray(activeKeyList) ? activeKeyList[0] : activeKeyList;
    }
    if (activeKeyList && activeKeyList.length) {
      activeKeyList = Array.isArray(activeKeyList) ? activeKeyList : [activeKeyList];
      return activeKeyList;
    }
    return [];
    // this._adapter.initActiveSet(activeKeyList);
  }
  handleChange(newKey, e) {
    const {
      activeKey,
      accordion
    } = this.getProps();
    const {
      activeSet
    } = this.getStates();
    let newSet = new Set(activeSet);
    if (newSet.has(newKey)) {
      newSet.delete(newKey);
    } else {
      if (accordion) {
        newSet = new Set([newKey]);
      } else {
        newSet.add(newKey);
      }
    }
    this._adapter.handleChange([...newSet.values()], e);
    if (typeof activeKey === 'undefined') {
      this._adapter.addActiveKey(newSet);
    }
  }
}
exports.default = CollapseFoundation;