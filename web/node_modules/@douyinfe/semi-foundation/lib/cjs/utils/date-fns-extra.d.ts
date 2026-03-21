import { OptionsWithTZ } from 'date-fns-tz';
/**
 * Need to be IANA logo without daylight saving time
 */
export declare const IANAOffsetMap: (number | string[])[][];
/**
 *
 * @param {string|number} tz
 * @returns {number|undefined}
 */
export declare const toIANA: (tz: string | number) => any;
/**
 * @see https://github.com/marnusw/date-fns-tz/blob/a92e0ad017d101a0c50e39a63ef5d322b4d849f6/src/_lib/tzParseTimezone/index.js#L137
 */
export declare function isValidTimezoneIANAString(timeZoneString: string): boolean;
/**
 *
 * @param {string | number | Date} date
 * @param {string} formatToken
 * @param {object} [options]
 * @param {string} [options.timeZone]
 * @returns {Date}
 */
declare const parse: (date: string | number | Date, formatToken: string, options?: any) => Date;
declare const format: (date: number | Date, formatToken: string, options?: any) => string;
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
declare const utcToZonedTime: (date: string | number | Date, timeZone: string | number, options?: OptionsWithTZ) => Date;
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
declare const zonedTimeToUtc: (date: string | number | Date, timeZone: string | number, options?: OptionsWithTZ) => Date;
/**
 * return current system hour offset based on utc:
 *
 * ```
 * 8 => "GMT+08:00"
 * -9.5 => "GMT-09:30"
 * -8 => "GMT-08:00"
 * ```
 */
declare const getCurrentTimeZone: () => number;
export { format, parse, utcToZonedTime, zonedTimeToUtc, getCurrentTimeZone };
