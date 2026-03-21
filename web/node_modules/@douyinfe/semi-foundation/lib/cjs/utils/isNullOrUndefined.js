"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNullOrUndefined;
/**
 * Whether null or undefined
 * @param {*} value
 * @returns  {boolean}
 */
function isNullOrUndefined(value) {
  return value === null || value === undefined;
}