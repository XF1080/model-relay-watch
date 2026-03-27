"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = void 0;
const round = function (number) {
  let digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  let base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.pow(10, digits);
  return Math.round(base * number) / base;
};
exports.round = round;