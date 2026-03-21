"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentTimeZone = exports.format = exports.IANAOffsetMap = void 0;
exports.isValidTimezoneIANAString = isValidTimezoneIANAString;
exports.zonedTimeToUtc = exports.utcToZonedTime = exports.toIANA = exports.parse = void 0;
var _dateFnsTz = require("date-fns-tz");
var _dateFns = require("date-fns");
/**
 * Need to be IANA logo without daylight saving time
 */
const IANAOffsetMap = exports.IANAOffsetMap = [[-11, ['Pacific/Midway']], [-10, ['Pacific/Honolulu']], [-9.5, ['Pacific/Marquesas']], [-9, ['Pacific/Gambier']], [-8, ['Pacific/Pitcairn']], [-7, ['America/Phoenix']], [-6, ['America/Tegucigalpa']], [-5, ['America/Bogota']], [-4, ['America/Puerto_Rico']], [-3.5, ['America/St_Johns']], [-3, ['America/Montevideo']], [-2, ['Atlantic/South_Georgia']], [-1, ['Atlantic/Cape_Verde']], [0, ['Africa/Accra']], [1, ['Africa/Bangui']], [2, ['Africa/Cairo']], [3, ['Asia/Bahrain', 'Indian/Antananarivo']], [3.5, ['Asia/Tehran']], [4, ['Asia/Dubai', 'Asia/Muscat']], [4.5, ['Asia/Kabul']], [5, ['Asia/Samarkand', 'Asia/Karachi']], [5.5, ['Asia/Kolkata']], [5.75, ['Asia/Kathmandu']], [6, ['Asia/Dhaka']], [6.5, ['Asia/Rangoon', 'Asia/Rangoon']], [7, ['Asia/Jakarta', 'Asia/Phnom_Penh', 'Asia/Bangkok']], [8, ['Asia/Shanghai', 'Asia/Singapore']], [8.75, ['Australia/Eucla']], [9, ['Asia/Tokyo', 'Asia/Seoul', 'Asia/Pyongyang']], [9.5, ['Australia/Darwin']], [10, ['Pacific/Guam']], [10.5, ['Australia/Adelaide']], [11, ['Pacific/Guadalcanal']], [12, ['Pacific/Funafuti']], [13, ['Pacific/Enderbury']], [13.75, ['Pacific/Chatham']], [14, ['Pacific/Kiritimati']]];
/**
 * Etc/GMT* no DST
 * @see https://data.iana.org/time-zones/tzdb/etcetera
 */
const IANAEtcGMTOffsetMap = {
  '0': 'Etc/GMT',
  '1': 'Etc/GMT-1',
  '2': 'Etc/GMT-2',
  '3': 'Etc/GMT-3',
  '4': 'Etc/GMT-4',
  '5': 'Etc/GMT-5',
  '6': 'Etc/GMT-6',
  '7': 'Etc/GMT-7',
  '8': 'Etc/GMT-8',
  '9': 'Etc/GMT-9',
  '10': 'Etc/GMT-10',
  '11': 'Etc/GMT-11',
  '12': 'Etc/GMT-12',
  '13': 'Etc/GMT-13',
  '14': 'Etc/GMT-14',
  '-1': 'Etc/GMT+1',
  '-2': 'Etc/GMT+2',
  '-3': 'Etc/GMT+3',
  '-4': 'Etc/GMT+4',
  '-5': 'Etc/GMT+5',
  '-6': 'Etc/GMT+6',
  '-7': 'Etc/GMT+7',
  '-8': 'Etc/GMT+8',
  '-9': 'Etc/GMT+9',
  '-10': 'Etc/GMT+10',
  '-11': 'Etc/GMT+11',
  '-12': 'Etc/GMT+12'
};
const GMTStringReg = /([\-\+]{1})(\d{2})\:(\d{2})/;
/**
 *
 * @param {string|number} tz
 * @returns {number|undefined}
 */
const toIANA = tz => {
  let matches = null;
  if (typeof tz === 'string') {
    matches = tz.match(GMTStringReg);
    if (!matches) {
      return tz;
    }
    const symbol = parseInt(matches[1] + 1, 10); // => -1 or 1
    const hourOffset = parseInt(matches[2], 10);
    const minuteOffset = parseInt(matches[3], 10);
    tz = symbol * (hourOffset + minuteOffset / 60);
  }
  if (typeof tz === 'number') {
    // if tz can be transformed to a Etc/GMT* and browser supports it
    if (tz in IANAEtcGMTOffsetMap) {
      const etcGMTtimeZone = IANAEtcGMTOffsetMap[tz];
      if (isValidTimezoneIANAString(etcGMTtimeZone)) {
        return etcGMTtimeZone;
      }
    }
    const found = IANAOffsetMap.find(item => item[0] === tz);
    return found && found[1][0];
  }
};
exports.toIANA = toIANA;
const validIANATimezoneCache = {};
/**
 * @see https://github.com/marnusw/date-fns-tz/blob/a92e0ad017d101a0c50e39a63ef5d322b4d849f6/src/_lib/tzParseTimezone/index.js#L137
 */
function isValidTimezoneIANAString(timeZoneString) {
  if (validIANATimezoneCache[timeZoneString]) return true;
  try {
    new Intl.DateTimeFormat(undefined, {
      timeZone: timeZoneString
    });
    validIANATimezoneCache[timeZoneString] = true;
    return true;
  } catch (error) {
    return false;
  }
}
/**
 *
 * @param {string | number | Date} date
 * @param {string} formatToken
 * @param {object} [options]
 * @param {string} [options.timeZone]
 * @returns {Date}
 */
/* istanbul ignore next */
const parse = (date, formatToken, options) => {
  if (typeof date === 'string') {
    date = (0, _dateFns.parse)(date, formatToken, new Date(), options);
  }
  if (options && options.timeZone != null && options.timeZone !== '') {
    const timeZone = toIANA(options.timeZone);
    options = Object.assign(Object.assign({}, options), {
      timeZone
    });
  }
  return (0, _dateFnsTz.toDate)(date, options);
};
/* istanbul ignore next */
exports.parse = parse;
const format = (date, formatToken, options) => {
  if (options && options.timeZone != null && options.timeZone !== '') {
    const timeZone = toIANA(options.timeZone);
    options = Object.assign(Object.assign({}, options), {
      timeZone
    });
    date = (0, _dateFnsTz.utcToZonedTime)(date, timeZone, options);
  }
  return (0, _dateFnsTz.format)(date, formatToken, options);
};
/**
 * Returns a Date which will format as the local time of any time zone from a specific UTC time
 *
 * @example
 * ```javascript
 * import { utcToZonedTime } from 'date-fns-tz'
 * const { isoDate, timeZone } = fetchInitialValues() // 2014-06-25T10:00:00.000Z, America/New_York
 * const date = utcToZonedTime(isoDate, timeZone) // In June 10am UTC is 6am in New York (-04:00)
 * renderDatePicker(date) // 2014-06-25 06:00:00 (in the system time zone)
 * renderTimeZoneSelect(timeZone) // America/New_York
 * ```
 *
 * @see https://github.com/marnusw/date-fns-tz#utctozonedtime
 */
exports.format = format;
const utcToZonedTime = (date, timeZone, options) => (0, _dateFnsTz.utcToZonedTime)(date, toIANA(timeZone), options);
/**
 * Given a date and any time zone, returns a Date with the equivalent UTC time
 *
 * @example
 * ```
 * import { zonedTimeToUtc } from 'date-fns-tz'
 * const date = getDatePickerValue() // e.g. 2014-06-25 10:00:00 (picked in any time zone)
 * const timeZone = getTimeZoneValue() // e.g. America/Los_Angeles
 * const utcDate = zonedTimeToUtc(date, timeZone) // In June 10am in Los Angeles is 5pm UTC
 * postToServer(utcDate.toISOString(), timeZone) // post 2014-06-25T17:00:00.000Z, America/Los_Angeles
 * ```
 *
 * @see https://github.com/marnusw/date-fns-tz#zonedtimetoutc
 */
exports.utcToZonedTime = utcToZonedTime;
const zonedTimeToUtc = (date, timeZone, options) => (0, _dateFnsTz.zonedTimeToUtc)(date, toIANA(timeZone), options);
/**
 * return current system hour offset based on utc:
 *
 * ```
 * 8 => "GMT+08:00"
 * -9.5 => "GMT-09:30"
 * -8 => "GMT-08:00"
 * ```
 */
exports.zonedTimeToUtc = zonedTimeToUtc;
const getCurrentTimeZone = () => new Date().getTimezoneOffset() / 60;
exports.getCurrentTimeZone = getCurrentTimeZone;