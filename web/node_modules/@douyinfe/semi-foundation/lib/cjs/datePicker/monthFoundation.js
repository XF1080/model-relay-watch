"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _getMonthTable = _interopRequireDefault(require("./_utils/getMonthTable"));
var _getDayOfWeek = _interopRequireDefault(require("./_utils/getDayOfWeek"));
var _dateFns = require("date-fns");
var _isNullOrUndefined = _interopRequireDefault(require("../utils/isNullOrUndefined"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import { cssClasses, strings } from './constants';

class CalendarMonthFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {
    this._getToday();
    this.getMonthTable();
  }
  _getToday() {
    const today = new Date();
    const todayText = (0, _dateFns.format)(today, 'yyyy-MM-dd');
    this._adapter.updateToday(todayText);
  }
  getMonthTable() {
    const month = this._adapter.getProp('month');
    const weeksRowNum = this.getState('weeksRowNum');
    if (month) {
      this.updateWeekDays();
      const weekStartsOn = this._adapter.getProp('weekStartsOn');
      const monthTable = (0, _getMonthTable.default)(month, weekStartsOn);
      const {
        weeks
      } = monthTable;
      this._adapter.updateMonthTable(monthTable);
      if ((0, _isNullOrUndefined.default)(weeksRowNum)) {
        this._adapter.setWeeksRowNum(weeks.length);
      } else if (Array.isArray(weeks) && weeks.length !== weeksRowNum) {
        this._adapter.setWeeksRowNum(weeks.length, () => {
          this._adapter.notifyWeeksRowNumChange(weeks.length);
        });
      }
    }
  }
  updateWeekDays() {
    const weekStartsOn = this._adapter.getProp('weekStartsOn');
    const weekdays = (0, _getDayOfWeek.default)({
      weekStartsOn
    });
    this._adapter.setWeekDays(weekdays);
  }
  destroy() {}
  handleClick(day) {
    this._adapter.notifyDayClick(day);
  }
  handleHover(day) {
    this._adapter.notifyDayHover(day);
  }
}
exports.default = CalendarMonthFoundation;