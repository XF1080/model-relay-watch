"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lowerCase = lowerCase;
exports.upperCase = upperCase;
function upperCase(str, pos) {
  if (typeof str === 'string') {
    return str
    // @ts-ignore
    .split().reduce((total, cur, index) => pos == null || pos === index ? total + cur.toUpperCase() : total + cur, '');
  }
  return str;
}
function lowerCase(str, pos) {
  if (typeof str === 'string') {
    return str
    // @ts-ignore
    .split().reduce((total, cur, index) => pos == null || pos === index ? total + cur.toLowerCase() : total + cur, '');
  }
  return str;
}