"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _context = require("../context");
function useFormState() {
  const formState = (0, _react.useContext)(_context.FormStateContext);
  return formState;
}
var _default = exports.default = useFormState;