"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrayMove;
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}