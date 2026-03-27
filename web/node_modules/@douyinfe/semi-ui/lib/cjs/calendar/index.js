"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _dayCalendar = _interopRequireDefault(require("./dayCalendar"));
var _weekCalendar = _interopRequireDefault(require("./weekCalendar"));
var _monthCalendar = _interopRequireDefault(require("./monthCalendar"));
var _rangeCalendar = _interopRequireDefault(require("./rangeCalendar"));
require("@douyinfe/semi-foundation/lib/cjs/calendar/calendar.css");
var _interface = require("./interface");
Object.keys(_interface).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interface[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interface[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
// eslint-disable-next-line @typescript-eslint/ban-types
class Calendar extends _baseComponent.default {
  render() {
    const _a = this.props,
      {
        mode
      } = _a,
      rest = __rest(_a, ["mode"]);
    const component = {
      month: (/*#__PURE__*/_react.default.createElement(_monthCalendar.default, null)),
      week: (/*#__PURE__*/_react.default.createElement(_weekCalendar.default, null)),
      day: (/*#__PURE__*/_react.default.createElement(_dayCalendar.default, null)),
      range: (/*#__PURE__*/_react.default.createElement(_rangeCalendar.default, null))
    };
    return /*#__PURE__*/_react.default.cloneElement(component[mode], Object.assign({}, rest));
  }
}
Calendar.propTypes = {
  displayValue: _propTypes.default.instanceOf(Date),
  header: _propTypes.default.node,
  events: _propTypes.default.arrayOf(_propTypes.default.shape({
    allDay: _propTypes.default.bool,
    start: _propTypes.default.instanceOf(Date),
    end: _propTypes.default.instanceOf(Date),
    key: _propTypes.default.string.isRequired,
    children: _propTypes.default.node
  })),
  mode: _propTypes.default.string,
  showCurrTime: _propTypes.default.bool,
  weekStartsOn: _propTypes.default.number,
  scrollTop: _propTypes.default.number,
  onClick: _propTypes.default.func,
  renderTimeDisplay: _propTypes.default.func,
  renderDateDisplay: _propTypes.default.func,
  markWeekend: _propTypes.default.bool,
  minEventHeight: _propTypes.default.number,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  style: _propTypes.default.object,
  className: _propTypes.default.string
};
Calendar.defaultProps = {
  events: [],
  displayValue: new Date(),
  showCurrTime: true,
  mode: 'week',
  markWeekend: false,
  height: 600,
  scrollTop: 400,
  weekStartsOn: 0
};
var _default = exports.default = Calendar;