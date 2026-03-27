"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeShape = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const PlainTimeShape = [_propTypes.default.string, _propTypes.default.number, _propTypes.default.instanceOf(Date)];
/**
 * Can be
 * - 12:00:12
 * - \[12:00:12]
 * - \[12:00:12, 12:21:12]
 * - \[[12:00:12, 12:21:12], [12:11:12, 12:32:12]]
 */
const TimeShape = exports.TimeShape = _propTypes.default.oneOfType([...PlainTimeShape, _propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date))]);