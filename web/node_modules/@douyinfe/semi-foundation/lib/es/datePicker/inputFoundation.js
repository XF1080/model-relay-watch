import _get from "lodash/get";
import _set from "lodash/set";
import _isObject from "lodash/isObject";
import { format as formatFn } from 'date-fns';
import BaseFoundation from '../base/foundation';
import { formatDateValues } from './_utils/formatter';
import { getDefaultFormatTokenByType } from './_utils/getDefaultFormatToken';
import getInsetInputFormatToken from './_utils/getInsetInputFormatToken';
import getInsetInputValueFromInsetInputStr from './_utils/getInsetInputValueFromInsetInputStr';
import { strings } from './constants';
import getDefaultPickerDate from './_utils/getDefaultPickerDate';
import { compatibleParse } from './_utils/parser';
import { isValidDate } from './_utils';
import copy from 'fast-copy';
const KEY_CODE_ENTER = 'Enter';
const KEY_CODE_TAB = 'Tab';
export default class InputFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  init() {}
  destroy() {}
  handleClick(e) {
    this._adapter.notifyClick(e);
  }
  handleChange(value, e) {
    this._adapter.notifyChange(value, e);
  }
  handleInputComplete(e) {
    /**
     * onKeyPress, e.key Code gets a value of 0 instead of 13
     * Here key is used to judge the button
     */
    if (e.key === KEY_CODE_ENTER) {
      this._adapter.notifyEnter(e.target.value);
    }
  }
  handleInputClear(e) {
    this._adapter.notifyClear(e);
  }
  handleRangeInputClear(e) {
    // prevent trigger click outside
    this.stopPropagation(e);
    this._adapter.notifyRangeInputClear(e);
  }
  handleRangeInputEnterPress(e, rangeInputValue) {
    if (e.key === KEY_CODE_ENTER) {
      this._adapter.notifyEnter(rangeInputValue);
    }
  }
  handleRangeInputEndKeyPress(e) {
    if (e.key === KEY_CODE_TAB) {
      this._adapter.notifyTabPress(e);
    }
  }
  handleRangeInputFocus(e, rangeType) {
    this._adapter.notifyRangeInputFocus(e, rangeType);
  }
  formatShowText(value, customFormat) {
    const {
      type,
      dateFnsLocale,
      format,
      rangeSeparator
    } = this._adapter.getProps();
    const formatToken = customFormat || format || getDefaultFormatTokenByType(type);
    let text = '';
    switch (type) {
      case 'date':
        text = formatDateValues(value, formatToken, undefined, dateFnsLocale);
        break;
      case 'dateRange':
        text = formatDateValues(value, formatToken, {
          groupSize: 2,
          groupInnerSeparator: rangeSeparator
        }, dateFnsLocale);
        break;
      case 'dateTime':
        text = formatDateValues(value, formatToken, undefined, dateFnsLocale);
        break;
      case 'dateTimeRange':
        text = formatDateValues(value, formatToken, {
          groupSize: 2,
          groupInnerSeparator: rangeSeparator
        }, dateFnsLocale);
        break;
      case 'month':
        text = formatDateValues(value, formatToken, undefined, dateFnsLocale);
        break;
      case 'monthRange':
        text = formatDateValues(value, formatToken, {
          groupSize: 2,
          groupInnerSeparator: rangeSeparator
        }, dateFnsLocale);
        break;
      default:
        break;
    }
    return text;
  }
  handleInsetInputChange(options) {
    const {
      value,
      valuePath,
      insetInputValue
    } = options;
    const {
      format,
      type,
      rangeSeparator
    } = this._adapter.getProps();
    const insetFormatToken = getInsetInputFormatToken({
      type,
      format
    });
    const newInsetInputValue = _set(copy(insetInputValue), valuePath, value);
    const insetInputStr = this.concatInsetInputValue({
      insetInputValue: newInsetInputValue
    });
    const parsedInsetInputValueFromInputStr = getInsetInputValueFromInsetInputStr({
      inputValue: insetInputStr,
      type,
      rangeSeparator
    });
    const filledTimeInsetInputValue = this._autoFillTimeToInsetInputValue({
      insetInputValue: parsedInsetInputValueFromInputStr,
      valuePath,
      format: insetFormatToken
    });
    const finalInsetInputStr = this.concatInsetInputValue({
      insetInputValue: filledTimeInsetInputValue
    });
    this._adapter.notifyInsetInputChange({
      insetInputValue: filledTimeInsetInputValue,
      format: insetFormatToken,
      insetInputStr: finalInsetInputStr
    });
  }
  _autoFillTimeToInsetInputValue(options) {
    const {
      valuePath,
      insetInputValue,
      format
    } = options;
    const {
      type,
      defaultPickerValue,
      dateFnsLocale
    } = this._adapter.getProps();
    const insetInputValueWithTime = copy(insetInputValue);
    const {
      nowDate,
      nextDate
    } = getDefaultPickerDate({
      defaultPickerValue,
      format,
      dateFnsLocale
    });
    if (type.includes('Time')) {
      let timeStr = '';
      const dateFormatToken = _get(format.split(' '), '0', strings.FORMAT_FULL_DATE);
      const timeFormatToken = _get(format.split(' '), '1', strings.FORMAT_TIME_PICKER);
      switch (valuePath) {
        case 'monthLeft.dateInput':
          const dateLeftStr = insetInputValueWithTime.monthLeft.dateInput;
          if (!insetInputValueWithTime.monthLeft.timeInput && dateLeftStr.length === dateFormatToken.length) {
            const dateLeftParsed = compatibleParse(insetInputValueWithTime.monthLeft.dateInput, dateFormatToken);
            if (isValidDate(dateLeftParsed)) {
              timeStr = formatFn(nowDate, timeFormatToken);
              insetInputValueWithTime.monthLeft.timeInput = timeStr;
            }
          }
          break;
        case 'monthRight.dateInput':
          const dateRightStr = insetInputValueWithTime.monthRight.dateInput;
          if (!insetInputValueWithTime.monthRight.timeInput && dateRightStr.length === dateFormatToken.length) {
            const dateRightParsed = compatibleParse(dateRightStr, dateFormatToken);
            if (isValidDate(dateRightParsed)) {
              timeStr = formatFn(nextDate, timeFormatToken);
              insetInputValueWithTime.monthRight.timeInput = timeStr;
            }
          }
          break;
        default:
          break;
      }
    }
    return insetInputValueWithTime;
  }
  /**
   * 只有传入的 format 符合 formatReg 时，才会使用用户传入的 format
   * 否则会使用默认的 format 作为 placeholder
   *
   * The format passed in by the user will be used only if the incoming format conforms to formatReg
   * Otherwise the default format will be used as placeholder
   */
  getInsetInputPlaceholder() {
    const {
      type,
      format,
      rangeSeparator
    } = this._adapter.getProps();
    const insetInputFormat = getInsetInputFormatToken({
      type,
      format
    });
    let datePlaceholder, timePlaceholder;
    switch (type) {
      case 'date':
      case 'month':
      case 'dateRange':
        datePlaceholder = insetInputFormat;
        break;
      case 'dateTime':
      case 'dateTimeRange':
        [datePlaceholder, timePlaceholder] = insetInputFormat.split(' ');
        break;
      case 'monthRange':
        datePlaceholder = insetInputFormat + rangeSeparator + insetInputFormat;
        break;
    }
    return {
      datePlaceholder,
      timePlaceholder
    };
  }
  /**
   * 从当前日期值或 inputValue 中解析出 insetInputValue
   *
   * Parse out insetInputValue from current date value or inputValue
   */
  getInsetInputValue(_ref) {
    let {
      value,
      insetInputValue
    } = _ref;
    const {
      type,
      rangeSeparator,
      format
    } = this._adapter.getProps();
    let inputValueStr = '';
    if (_isObject(insetInputValue)) {
      inputValueStr = this.concatInsetInputValue({
        insetInputValue
      });
    } else {
      const insetInputFormat = getInsetInputFormatToken({
        format,
        type
      });
      inputValueStr = this.formatShowText(value, insetInputFormat);
    }
    const newInsetInputValue = getInsetInputValueFromInsetInputStr({
      inputValue: inputValueStr,
      type,
      rangeSeparator
    });
    return newInsetInputValue;
  }
  concatInsetDateAndTime(_ref2) {
    let {
      date,
      time
    } = _ref2;
    return `${date} ${time}`;
  }
  concatInsetDateRange(_ref3) {
    let {
      rangeStart,
      rangeEnd
    } = _ref3;
    const {
      rangeSeparator
    } = this._adapter.getProps();
    return `${rangeStart}${rangeSeparator}${rangeEnd}`;
  }
  concatInsetInputValue(_ref4) {
    let {
      insetInputValue
    } = _ref4;
    const {
      type
    } = this._adapter.getProps();
    let inputValue = '';
    switch (type) {
      case 'date':
      case 'month':
      case 'monthRange':
        inputValue = insetInputValue.monthLeft.dateInput;
        break;
      case 'dateRange':
        inputValue = this.concatInsetDateRange({
          rangeStart: insetInputValue.monthLeft.dateInput,
          rangeEnd: insetInputValue.monthRight.dateInput
        });
        break;
      case 'dateTime':
        inputValue = this.concatInsetDateAndTime({
          date: insetInputValue.monthLeft.dateInput,
          time: insetInputValue.monthLeft.timeInput
        });
        break;
      case 'dateTimeRange':
        const rangeStart = this.concatInsetDateAndTime({
          date: insetInputValue.monthLeft.dateInput,
          time: insetInputValue.monthLeft.timeInput
        });
        const rangeEnd = this.concatInsetDateAndTime({
          date: insetInputValue.monthRight.dateInput,
          time: insetInputValue.monthRight.timeInput
        });
        inputValue = this.concatInsetDateRange({
          rangeStart,
          rangeEnd
        });
        break;
    }
    return inputValue;
  }
}