"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pullAll = pullAll;
exports.withOrderSort = withOrderSort;
var _set = require("./set");
/**
 * arrayA remove arrayB
 * @param {array} arrayA
 * @param {array} arrayB
 * @returns {array}  new array
 *
 * const arrayA = ['a', 'b', 'c', 'a', 'b', 'c'];
 *
 * const result = pullAll(arrayA, ['a', 'c'])
 * console.log(result);
 * => ['b', 'b']
 */
function pullAll(arrayA, arrayB) {
  if (arrayA !== null && arrayA.length && arrayB !== null && arrayB.length) {
    const setA = new Set(arrayA);
    const setB = new Set(arrayB);
    const resultSet = (0, _set.pullAll)(setA, setB);
    return Array.from(resultSet);
  }
  return arrayA;
}
/**
 * Adapt the descending order
 * @param {Function} fn
 * @param {String} order
 * @returns
 */
function withOrderSort(fn) {
  let order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ascend';
  switch (order) {
    case 'descend':
      return (a, b) => {
        const result = Number(fn(a, b, order));
        return result !== 0 ? -result : result;
      };
    case 'ascend':
    default:
      return (a, b) => fn(a, b, order);
  }
}