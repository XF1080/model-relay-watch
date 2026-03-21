"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _context = require("../context");
function useArrayFieldState() {
  const arrayFieldContext = (0, _react.useContext)(_context.ArrayFieldContext);
  return arrayFieldContext;
}
var _default = exports.default = useArrayFieldState;