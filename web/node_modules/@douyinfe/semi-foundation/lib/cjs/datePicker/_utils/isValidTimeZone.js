"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidTimeZone;
function isValidTimeZone(timeZone) {
  return ['string', 'number'].includes(typeof timeZone) && timeZone !== '';
}