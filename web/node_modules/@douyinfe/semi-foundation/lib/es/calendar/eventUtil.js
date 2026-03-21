import { format, isSameMonth, isWeekend, differenceInCalendarDays, isBefore, addDays, startOfWeek, endOfWeek, getSeconds, differenceInHours, getMinutes, getHours, addHours, isSameDay, endOfDay, startOfDay, toDate } from 'date-fns';
const copyEvent = function (event, date, start, end) {
  let allDay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  const copied = Object.assign({}, event);
  copied.date = date;
  start ? copied.start = start : null;
  end ? copied.end = end : null;
  copied.allDay = allDay;
  return copied;
};
const isDateInRange = (dirtyDate, dirtyStart, dirtyEnd) => {
  const date = toDate(dirtyDate);
  const start = toDate(dirtyStart);
  const end = toDate(dirtyEnd);
  return date.getTime() < end.getTime() && date.getTime() >= start.getTime();
};
export const sortDate = (a, b) => {
  const res = isBefore(new Date(a), new Date(b)) ? -1 : 1;
  return res;
};
export const checkWeekend = val => isWeekend(val);
export const getCurrDate = () => new Date();
export const round = value => Math.round(value * 1000) / 1000;
export const getPos = value => {
  const currSec = (getHours(value) * 60 + getMinutes(value)) * 60 + getSeconds(value);
  const totalSec = 24 * 60 * 60;
  return currSec / totalSec;
};
export const isAllDayEvent = event => 'allDay' in event && event.allDay;
/**
 *
 * @param {object} event
 * normalize event object:
 * if event object does not have start time, add start time = end time - 1h; if not same day, then startday of the end
 * if event object does not have end time, add end time = start time + 1h; if not same day, then endday of the start
 */
export const amendEvent = event => {
  const {
    start,
    end
  } = event;
  if (!start && !end) {
    return undefined;
  } else if (!start) {
    event.start = isSameDay(end, addHours(end, -1)) ? addHours(end, -1) : startOfDay(end);
  } else {
    event.end = isSameDay(start, addHours(start, 1)) ? addHours(start, 1) : endOfDay(start);
  }
  return event;
};
/**
 *
 * @param {arr} events
 * find the max topInd and used as row height
 */
export const calcRowHeight = events => {
  const topIndArr = events.map(item => item.topInd);
  return topIndArr.length ? Math.max(...topIndArr) + 1 : 1;
};
export const calcRangeData = (value, start, rangeLen, mode, locale, weekStartsOn) => {
  const today = getCurrDate();
  const arr = [];
  [...Array(rangeLen).keys()].map(ind => {
    const dateObj = {};
    const date = addDays(start, ind);
    dateObj.ind = ind;
    dateObj.date = date;
    dateObj.dayString = format(date, 'd', {
      locale,
      weekStartsOn
    });
    dateObj.weekday = format(date, 'EEE', {
      locale,
      weekStartsOn
    });
    dateObj.isToday = isSameDay(date, today);
    dateObj.isWeekend = checkWeekend(date);
    if (mode === 'month') {
      dateObj.isSameMonth = isSameMonth(value, date);
      dateObj.month = format(date, 'LLL', {
        locale
      });
    }
    arr.push(dateObj);
  });
  return arr;
};
/**
 *
 * @param {Date} date
 * @param {Date} monthStart current month start date, using for month mode
 * @param {string} mode
 * @param {string} locale
 * @returns {object[]} { date: Date, dayString: string, ind: number, isToday: boolean, isWeekend: boolean, weekday: string }
 * create weekly object array
 */
export const calcWeekData = function (value, monthStart) {
  let mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'week';
  let locale = arguments.length > 3 ? arguments[3] : undefined;
  let weekStartsOn = arguments.length > 4 ? arguments[4] : undefined;
  const start = startOfWeek(value, {
    weekStartsOn
  });
  const realValue = monthStart || value;
  return calcRangeData(realValue, start, 7, mode, locale, weekStartsOn);
};
/**
 *
 * @param {object} event
 * @param {boolean} allDay
 * @returns {object[]} { allDay: boolean, data: Date, start: Date, end: Date, children: ReactNode }
 * parsed a spanned all-day event into multiple dates
 */
export const parseAllDayEvent = function (event) {
  let allDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  let currDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  const res = [];
  const {
    start,
    end
  } = event;
  if (start && end) {
    const diff = differenceInCalendarDays(end, start);
    [...Array(diff + 1).keys()].map(day => {
      res.push(copyEvent(event, addDays(start, day), null, null, allDay));
    });
  } else {
    const date = start || end || currDate;
    res.push(copyEvent(event, startOfDay(date), null, null, allDay));
  }
  return res;
};
/**
 *
 * @param {object} event
 * @returns {object[]} { allDay: boolean, data: Date, start: Date, end: Date, children: ReactNode }
 * parsed events
 */
export const parseEvent = event => {
  const {
    start,
    end
  } = event;
  let res = [];
  if (isAllDayEvent(event)) {
    return parseAllDayEvent(event);
  }
  if (start && end) {
    if (!isBefore(start, end)) {
      [event.start, event.end] = [event.end, event.start];
    }
    if (isSameDay(start, end)) {
      res.push(copyEvent(event, startOfDay(start)));
    } else if (Math.abs(differenceInHours(start, end)) < 24) {
      res.push(copyEvent(event, startOfDay(start), null, endOfDay(start)));
      res.push(copyEvent(event, startOfDay(end), startOfDay(end)));
    } else {
      res = res.concat(parseAllDayEvent(event));
    }
  } else {
    const amend = amendEvent(event);
    res.push(copyEvent(amend, startOfDay(amend.start)));
  }
  return res;
};
/**
 *
 * @param {arr} arr
 * @param  {key}
 * @param {function} func callback function
 * @returns {map}
 * convert events array to may, use datestring as key
 */
export const convertEventsArrToMap = (arr, key, func, displayValue) => {
  const res = new Map();
  arr.forEach(item => {
    let val;
    if (key in item) {
      val = item[key];
    } else {
      val = startOfDay(displayValue);
    }
    const k = func ? func(val).toString() : val.toString();
    if (res.has(k)) {
      res.get(k).push(item);
    } else {
      res.set(k, [item]);
    }
  });
  return res;
};
/**
 * @returns {arr}
 * filter out event that is not in the date range
 */
export const filterEvents = (events, start, end) => {
  const res = new Map();
  [...events.keys()].map(day => {
    const item = events.get(day);
    const date = new Date(day);
    if (isDateInRange(date, start, end)) {
      if (res.has(day)) {
        res.set(day, [...res.get(day), ...item]);
      } else {
        res.set(day, item);
      }
    } else if (isBefore(end, date)) {
      // do nothing
    } else {
      const filtered = item.filter(i => !i.end || !isBefore(i.end, start));
      const key = start.toString();
      if (res.has(key)) {
        res.set(key, [...res.get(key), ...filtered]);
      } else {
        res.set(key, item);
      }
    }
  });
  return res;
};
/**
 * @returns {arr}
 * filter out event that is not in the week range
 */
export const filterWeeklyEvents = (events, weekStart, weekStartsOn) => filterEvents(events, weekStart, addDays(endOfWeek(weekStart, {
  weekStartsOn
}), 1));
/**
 * @returns {arr}
 * arrange and sort all day event for a range
 */
export const parseRangeAllDayEvent = (event, startDate, rangeStart, rangeEnd, parsed) => {
  const dateRangeLen = differenceInCalendarDays(rangeEnd, rangeStart);
  event.sort((a, b) => sortDate(a.start, b.start)).forEach(item => {
    const itemInfo = Object.assign({}, item);
    const {
      end
    } = item;
    let dateLength;
    const j = differenceInCalendarDays(startDate, rangeStart);
    let i = 0;
    while (Boolean(parsed[i]) && Boolean(parsed[i][j])) {
      i++;
    }
    if (!end) {
      dateLength = 0;
    } else {
      dateLength = isDateInRange(end, rangeStart, rangeEnd) ? differenceInCalendarDays(end, startDate) : differenceInCalendarDays(rangeEnd, startDate);
    }
    itemInfo.leftPos = round(Number(j) / dateRangeLen);
    itemInfo.width = Math.min(1 - round(Number(j) / dateRangeLen), round((dateLength + 1) * 1 / dateRangeLen));
    itemInfo.topInd = i;
    [...Array(dateLength + 1).keys()].forEach(dist => {
      if (!parsed[i]) {
        parsed[i] = [];
      }
      if (dist > 0) {
        parsed[i][j + dist] = item;
      } else {
        parsed[i][j + dist] = itemInfo;
      }
    });
  });
  return parsed;
};
/**
 * @returns {arr}
 * arrange and sort weekly all day event
 */
export const parseWeeklyAllDayEvent = (event, startDate, weekStart, parsed, weekStartsOn) => parseRangeAllDayEvent(event, startDate, weekStart, addDays(endOfWeek(startDate, {
  weekStartsOn
}), 1), parsed);
export const collectDailyEvents = events => {
  const collections = {};
  events.forEach((row, rowInd) => {
    row.forEach((event, ind) => {
      if (collections[ind]) {
        collections[ind][rowInd] = event;
      } else {
        collections[ind] = [];
        collections[ind][rowInd] = event;
      }
    });
  });
  return collections;
};
export const renderDailyEvent = event => {
  let {
    start,
    end,
    allDay,
    children
  } = event;
  let startPos, endPos;
  if (isAllDayEvent(event)) {
    startPos = 0;
    endPos = 0;
  } else if (!start || !end) {
    const amend = amendEvent(event);
    endPos = getPos(amend.end);
    startPos = getPos(amend.start);
  } else {
    if (!isBefore(start, end)) {
      [start, end] = [end, start];
    }
    startPos = getPos(start);
    endPos = getPos(end);
  }
  const parsed = {
    startPos: round(startPos),
    endPos: round(endPos),
    children,
    allDay: Boolean(allDay)
  };
  return parsed;
};