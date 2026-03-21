"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copySet = copySet;
exports.pullAll = pullAll;
var _isSet2 = _interopRequireDefault(require("lodash/isSet"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* istanbul ignore next */
function copySet(setA) {
  return new Set(setA);
}
/**
 * Set deduplicate
 * @param {*} setA
 * @param {*} setB
 */
function pullAll(setA, setB) {
  if (setA === setB) {
    setB = copySet(setB);
  }
  if ((0, _isSet2.default)(setA) && setA.size && (0, _isSet2.default)(setB) && setB.size) {
    for (const item of setB) {
      if (setA.has(item)) {
        setA.delete(item);
      }
    }
    return setA;
  }
  return setA;
}