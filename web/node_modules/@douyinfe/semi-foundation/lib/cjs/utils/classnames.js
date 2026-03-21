"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addClass = addClass;
exports.removeClass = removeClass;
var _map2 = _interopRequireDefault(require("lodash/map"));
var _filter2 = _interopRequireDefault(require("lodash/filter"));
var _split2 = _interopRequireDefault(require("lodash/split"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function addClass(rawCls) {
  const clss = (0, _split2.default)(rawCls, /\s+/);
  for (var _len = arguments.length, srcClss = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcClss[_key - 1] = arguments[_key];
  }
  const validClss = (0, _filter2.default)(srcClss, cls => !clss.includes(cls));
  return (0, _classnames.default)(rawCls, ...validClss);
}
function removeClass(rawCls) {
  const clss = (0, _split2.default)(rawCls, /\s+/);
  for (var _len2 = arguments.length, srcClss = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    srcClss[_key2 - 1] = arguments[_key2];
  }
  (0, _map2.default)(srcClss, cls => {
    const index = clss.indexOf(cls);
    if (index > -1) {
      clss.splice(index, 1);
    }
  });
  return (0, _classnames.default)(...clss);
}