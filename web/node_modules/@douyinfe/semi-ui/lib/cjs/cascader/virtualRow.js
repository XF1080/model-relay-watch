"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const VirtualRow = _ref => {
  let {
    index,
    data,
    style
  } = _ref;
  const {
    visibleOptions,
    renderOption
  } = data;
  const option = visibleOptions[index];
  return renderOption(option, index, style);
};
var _default = exports.default = VirtualRow;