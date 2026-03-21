"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapToZero;
// currently used to initiate the velocity style object to 0
function mapToZero(obj) {
  const ret = {};
  const objKeys = obj && Object.keys(obj) || [];
  for (const key of objKeys) {
    ret[key] = 0;
  }
  return ret;
}