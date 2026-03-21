"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const log = function (text) {
  if ((0, _get2.default)(process, 'env.NODE_ENV') === 'development') {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    console.log(text, ...rest);
  }
};
var _default = exports.default = log;