"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * Determine whether both values are NaN
 * @param {*} a
 * @param {*} b
 * @returns {Boolean}
 */
const isBothNaN = (a, b) => {
  const {
    isNaN
  } = Number;
  return isNaN(a) && isNaN(b);
};
var _default = exports.default = isBothNaN;