import { setMonth, setYear } from 'date-fns';
import BaseFoundation from '../base/foundation';
import { strings } from './constants';
import copy from 'fast-copy';
export default class YearAndMonthFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {}
  destroy() {}
  selectYear(item, panelType) {
    // const year = item.value;
    const {
      currentYear,
      currentMonth
    } = this.getStates();
    const {
      type
    } = this.getProps();
    const left = strings.PANEL_TYPE_LEFT;
    const right = strings.PANEL_TYPE_RIGHT;
    const year = copy(currentYear);
    year[panelType] = item.value;
    // make sure the right panel time is always less than the left panel time
    if (type === 'monthRange') {
      const isSameYearIllegalDate = year[left] === year[right] && currentMonth[left] > currentMonth[right];
      if (panelType === left && item.value > year[right] || panelType === left && isSameYearIllegalDate) {
        // 1. select left year and left year > right year
        // 2. select left year, left year = right year, but left date > right date
        year[right] = item.value + 1;
      } else if (panelType === right && isSameYearIllegalDate) {
        // 1. select right year, left year = right year, but left date > right date
        year[left] = item.value - 1;
      }
    }
    this._adapter.setCurrentYear(year, () => this.autoSelectMonth(item, panelType, year));
    this._adapter.notifySelectYear(year);
  }
  selectMonth(item, panelType) {
    const {
      currentMonth,
      currentYear
    } = this.getStates();
    const {
      type
    } = this.getProps();
    const left = strings.PANEL_TYPE_LEFT;
    const right = strings.PANEL_TYPE_RIGHT;
    const month = copy(currentMonth);
    month[panelType] = item.month;
    // Make sure the time on the right panel is always greater than or equal to the time on the left panel
    if (type === 'monthRange' && panelType === left && currentYear[left] === currentYear[right] && item.month > month[right]) {
      month[right] = item.month;
    }
    this._adapter.setCurrentMonth(month);
    this._adapter.notifySelectMonth(month);
  }
  /**
   * After selecting a year, if the currentMonth is disabled, automatically select a non-disabled month
   */
  autoSelectMonth(item, panelType, year) {
    const {
      disabledDate,
      locale
    } = this._adapter.getProps();
    const {
      months,
      currentMonth
    } = this._adapter.getStates();
    const oppositeType = panelType === strings.PANEL_TYPE_LEFT ? 'right' : 'left';
    const currentDate = setYear(Date.now(), item.year);
    const isCurrentMonthDisabled = disabledDate(setMonth(currentDate, currentMonth[panelType] - 1));
    // whether the date on the opposite is legal
    const isOppositeMonthDisabled = disabledDate(setMonth(setYear(Date.now(), year[oppositeType]), currentMonth[oppositeType] - 1));
    if (!isCurrentMonthDisabled && !isOppositeMonthDisabled) {
      // all panel Date is legal
      return;
    }
    let finalYear = year;
    let finalMonth = currentMonth;
    if (isCurrentMonthDisabled) {
      const currentIndex = months.findIndex(_ref => {
        let {
          month
        } = _ref;
        return month === currentMonth[panelType];
      });
      let validMonth;
      // First look in the back, if you can't find it in the back, then look in the front
      validMonth = months.slice(currentIndex).find(_ref2 => {
        let {
          month
        } = _ref2;
        return !disabledDate(setMonth(currentDate, month - 1));
      });
      if (!validMonth) {
        validMonth = months.slice(0, currentIndex).find(_ref3 => {
          let {
            month
          } = _ref3;
          return !disabledDate(setMonth(currentDate, month - 1));
        });
      }
      if (validMonth && !isOppositeMonthDisabled) {
        // only currentPanel Date is illegal
        // just need to modify the month of the current panel
        finalMonth[panelType] = validMonth.month;
      } else if (validMonth && isOppositeMonthDisabled) {
        // all panel Date is illegal
        // change the value to the legal value calculated by the current panel
        finalYear = {
          'left': item.year,
          'right': item.year
        };
        finalMonth = {
          'left': validMonth.month,
          'right': validMonth.month
        };
      }
    } else if (!isCurrentMonthDisabled && isOppositeMonthDisabled) {
      // only opposite panel Date is illegal
      // change the value to the legal value in the current panel
      finalYear = {
        'left': item.year,
        'right': item.year
      };
      finalMonth = {
        'left': currentMonth[panelType],
        'right': currentMonth[panelType]
      };
    }
    this._adapter.setCurrentYearAndMonth(finalYear, finalMonth);
    this._adapter.notifySelectYearAndMonth(finalYear, finalMonth);
  }
  backToMain() {
    this._adapter.notifyBackToMain();
  }
}