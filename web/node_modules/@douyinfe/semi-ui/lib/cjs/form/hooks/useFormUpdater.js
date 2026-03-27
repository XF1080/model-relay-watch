"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormUpdater;
var _react = require("react");
var _context = require("../context");
function useFormUpdater() {
  return (0, _react.useContext)(_context.FormUpdaterContext);
}