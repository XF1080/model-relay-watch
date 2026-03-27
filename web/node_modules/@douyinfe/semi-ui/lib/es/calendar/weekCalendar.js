import _isEqual from "lodash/isEqual";
import React, { Fragment } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import CalendarFoundation from '@douyinfe/semi-foundation/lib/es/calendar/foundation';
import LocaleConsumer from '../locale/localeConsumer';
import localeContext from '../locale/context';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/calendar/constants';
import BaseComponent from '../_base/baseComponent';
import DayCol from './dayCol';
import TimeCol from './timeCol';
import { calcRowHeight } from '@douyinfe/semi-foundation/lib/es/calendar/eventUtil';
import '@douyinfe/semi-foundation/lib/es/calendar/calendar.css';
const toPercent = num => {
  const res = num < 1 ? num * 100 : 100;
  return `${res}%`;
};
const prefixCls = `${cssClasses.PREFIX}-week`;
const allDayCls = `${cssClasses.PREFIX}-all-day`;
export default class WeekCalendar extends BaseComponent {
  constructor(props) {
    super(props);
    this.checkWeekend = val => this.foundation.checkWeekend(val);
    this.handleClick = (e, val) => {
      const {
        onClick
      } = this.props;
      const value = this.foundation.formatCbValue(val);
      onClick && onClick(e, value);
    };
    this.renderDayGrid = () => {
      const {
        parsedEvents
      } = this.state;
      const events = parsedEvents.day;
      const {
        week
      } = this.weeklyData;
      const {
        markWeekend,
        dateGridRender,
        minEventHeight
      } = this.props;
      const inner = week.map(day => {
        const dateString = day.date.toString();
        const dayEvents = events.has(dateString) ? events.get(dateString) : [];
        const parsed = this.foundation.getParseDailyEvents(dayEvents, day.date);
        return /*#__PURE__*/React.createElement(DayCol, {
          key: `${dateString}-weekday`,
          displayValue: day.date,
          scrollHeight: this.state.scrollHeight,
          handleClick: this.handleClick,
          events: parsed.day,
          showCurrTime: this.props.showCurrTime,
          isWeekend: markWeekend && day.isWeekend,
          dateGridRender: dateGridRender,
          minEventHeight: minEventHeight
        });
      });
      return inner;
    };
    this.renderHeader = dateFnsLocale => {
      const {
        markWeekend,
        displayValue,
        renderDateDisplay
      } = this.props;
      const {
        month,
        week
      } = this.foundation.getWeeklyData(displayValue, dateFnsLocale);
      return /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-header`
      }, /*#__PURE__*/React.createElement("ul", {
        className: `${cssClasses.PREFIX}-tag ${prefixCls}-tag ${prefixCls}-sticky-left`
      }, /*#__PURE__*/React.createElement("span", null, month)), /*#__PURE__*/React.createElement("div", {
        role: "gridcell",
        className: `${prefixCls}-grid`
      }, /*#__PURE__*/React.createElement("ul", {
        className: `${prefixCls}-grid-row`
      }, week.map(day => {
        const {
          date,
          dayString,
          weekday,
          isToday
        } = day;
        const listCls = cls({
          [`${cssClasses.PREFIX}-today`]: isToday,
          [`${cssClasses.PREFIX}-weekend`]: markWeekend && day.isWeekend
        });
        const dateContent = renderDateDisplay ? renderDateDisplay(date) : (/*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement("span", {
          className: `${cssClasses.PREFIX}-today-date`
        }, dayString), /*#__PURE__*/React.createElement("span", null, weekday)));
        return /*#__PURE__*/React.createElement("li", {
          key: `${date.toString()}-weekheader`,
          className: listCls
        }, dateContent);
      }))));
    };
    this.renderAllDayEvents = events => {
      if (this.props.allDayEventsRender) {
        return this.props.allDayEventsRender(this.props.events);
      }
      const list = events.map((event, ind) => {
        const {
          leftPos,
          width,
          topInd,
          children,
          key
        } = event;
        const top = `${topInd}em`;
        const style = {
          left: toPercent(leftPos),
          width: toPercent(width),
          top
        };
        return /*#__PURE__*/React.createElement("li", {
          className: `${cssClasses.PREFIX}-event-item ${cssClasses.PREFIX}-event-allday`,
          key: `allDay-${ind}`,
          style: style
        }, children);
      });
      return list;
    };
    this.renderAllDay = locale => {
      const {
        allDayEventsRender
      } = this.props;
      const {
        allDay
      } = this.state.parsedEvents;
      const parsed = this.foundation.parseWeeklyAllDayEvents(allDay);
      const style = allDayEventsRender ? null : {
        height: `${calcRowHeight(parsed)}em`
      };
      const {
        markWeekend
      } = this.props;
      const {
        week
      } = this.weeklyData;
      return /*#__PURE__*/React.createElement("div", {
        className: `${allDayCls}`,
        style: style
      }, /*#__PURE__*/React.createElement("ul", {
        className: `${cssClasses.PREFIX}-tag ${allDayCls}-tag ${prefixCls}-sticky-left`
      }, /*#__PURE__*/React.createElement("span", null, locale.allDay)), /*#__PURE__*/React.createElement("div", {
        role: "gridcell",
        className: `${cssClasses.PREFIX}-content ${allDayCls}-content`
      }, /*#__PURE__*/React.createElement("ul", {
        className: `${allDayCls}-skeleton`
      }, Object.keys(week).map((date, ind) => {
        const listCls = cls({
          [`${cssClasses.PREFIX}-weekend`]: markWeekend && week[date].isWeekend
        });
        return /*#__PURE__*/React.createElement("li", {
          key: `${date}-weekgrid`,
          className: listCls
        });
      })), /*#__PURE__*/React.createElement("ul", {
        className: `${cssClasses.PREFIX}-event-items`
      }, this.renderAllDayEvents(parsed))));
    };
    this.state = {
      scrollHeight: 0,
      parsedEvents: {
        day: new Map(),
        allDay: new Map()
      },
      cachedKeys: []
    };
    this.foundation = new CalendarFoundation(this.adapter);
    this.dom = /*#__PURE__*/React.createRef();
    this.scrollDom = /*#__PURE__*/React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.allDayRowHeight = 1;
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setWeeklyData: data => {
        this.weeklyData = data;
      },
      getWeeklyData: () => this.weeklyData,
      updateScrollHeight: scrollHeight => {
        this.setState({
          scrollHeight
        });
      },
      setParsedEvents: parsedEvents => {
        this.setState({
          parsedEvents: parsedEvents
        });
      },
      cacheEventKeys: cachedKeys => {
        this.setState({
          cachedKeys
        });
      }
    });
  }
  componentDidMount() {
    this.foundation.init();
    const {
      scrollHeight
    } = this.scrollDom.current;
    this.dom.current.scrollTop = this.props.scrollTop;
    this.foundation.notifyScrollHeight(scrollHeight);
    this.foundation.parseWeeklyEvents();
  }
  componentDidUpdate(prevProps, prevState) {
    const prevEventKeys = prevState.cachedKeys;
    const nowEventKeys = this.props.events.map(event => event.key);
    if (!_isEqual(prevEventKeys, nowEventKeys) || !_isEqual(prevProps.displayValue, this.props.displayValue)) {
      this.foundation.parseWeeklyEvents();
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const {
      renderTimeDisplay,
      className,
      height,
      width,
      style,
      header
    } = this.props;
    const weekCls = cls(prefixCls, className);
    const weekStyle = Object.assign({
      height,
      width
    }, style);
    return /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Calendar"
    }, (locale, localeCode, dateFnsLocale) => (/*#__PURE__*/React.createElement("div", Object.assign({
      className: weekCls,
      style: weekStyle,
      ref: this.dom
    }, this.getDataAttr(this.props)), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-sticky-top`
    }, header, this.renderHeader(dateFnsLocale), this.renderAllDay(locale)), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-scroll-wrapper`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-scroll`,
      ref: this.scrollDom
    }, /*#__PURE__*/React.createElement(TimeCol, {
      className: `${prefixCls}-sticky-left`,
      renderTimeDisplay: renderTimeDisplay
    }), this.renderDayGrid())))));
  }
}
WeekCalendar.propTypes = {
  displayValue: PropTypes.instanceOf(Date),
  header: PropTypes.node,
  events: PropTypes.array,
  mode: PropTypes.string,
  showCurrTime: PropTypes.bool,
  markWeekend: PropTypes.bool,
  scrollTop: PropTypes.number,
  renderTimeDisplay: PropTypes.func,
  renderDateDisplay: PropTypes.func,
  dateGridRender: PropTypes.func,
  allDayEventsRender: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string
};
WeekCalendar.defaultProps = {
  displayValue: new Date(),
  events: [],
  mode: 'week'
};
WeekCalendar.contextType = localeContext;