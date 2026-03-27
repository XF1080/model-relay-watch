"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormApi;
var _react = require("react");
var _context = require("../context");
function useFormApi() {
  return (0, _react.useContext)(_context.FormApiContext);
}