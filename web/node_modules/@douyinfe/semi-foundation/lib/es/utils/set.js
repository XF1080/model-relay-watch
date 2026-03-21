import _isSet from "lodash/isSet";
/* istanbul ignore next */
export function copySet(setA) {
  return new Set(setA);
}
/**
 * Set deduplicate
 * @param {*} setA
 * @param {*} setB
 */
export function pullAll(setA, setB) {
  if (setA === setB) {
    setB = copySet(setB);
  }
  if (_isSet(setA) && setA.size && _isSet(setB) && setB.size) {
    for (const item of setB) {
      if (setA.has(item)) {
        setA.delete(item);
      }
    }
    return setA;
  }
  return setA;
}