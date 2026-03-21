"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/calendar/foundation"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _context = _interopRequireDefault(require("../locale/context"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/calendar/constants");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _dayCol = _interopRequireDefault(require("./dayCol"));
var _timeCol = _interopRequireDefault(require("./timeCol"));
var _eventUtil = require("@douyinfe/semi-foundation/lib/cjs/calendar/eventUtil");
require("@douyinfe/semi-foundation/lib/cjs/calendar/calendar.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const toPercent = num => {
  const res = num < 1 ? num * 100 : 100;
  return `${res}%`;
};
const prefixCls = `${_constants.cssClasses.PREFIX}-week`;
const allDayCls = `${_constants.cssClasses.PREFIX}-all-day`;
class WeekCalendar extends _baseComponent.default {
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
        return /*#__PURE__*/_react.default.createElement(_dayCol.default, {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-header`
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: `${_constants.cssClasses.PREFIX}-tag ${prefixCls}-tag ${prefixCls}-sticky-left`
      }, /*#__PURE__*/_react.default.createElement("span", null, month)), /*#__PURE__*/_react.default.createElement("div", {
        role: "gridcell",
        className: `${prefixCls}-grid`
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: `${prefixCls}-grid-row`
      }, week.map(day => {
        const {
          date,
          dayString,
          weekday,
          isToday
        } = day;
        const listCls = (0, _classnames.default)({
          [`${_constants.cssClasses.PREFIX}-today`]: isToday,
          [`${_constants.cssClasses.PREFIX}-weekend`]: markWeekend && day.isWeekend
        });
        const dateContent = renderDateDisplay ? renderDateDisplay(date) : (/*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
          className: `${_constants.cssClasses.PREFIX}-today-date`
        }, dayString), /*#__PURE__*/_react.default.createElement("span", null, weekday)));
        return /*#__PURE__*/_react.default.createElement("li", {
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
        return /*#__PURE__*/_react.default.createElement("li", {
          className: `${_constants.cssClasses.PREFIX}-event-item ${_constants.cssClasses.PREFIX}-event-allday`,
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
        height: `${(0, _eventUtil.calcRowHeight)(parsed)}em`
      };
      const {
        markWeekend
      } = this.props;
      const {
        week
      } = this.weeklyData;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${allDayCls}`,
        style: style
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: `${_constants.cssClasses.PREFIX}-tag ${allDayCls}-tag ${prefixCls}-sticky-left`
      }, /*#__PURE__*/_react.default.createElement("span", null, locale.allDay)), /*#__PURE__*/_react.default.createElement("div", {
        role: "gridcell",
        className: `${_constants.cssClasses.PREFIX}-content ${allDayCls}-content`
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: `${allDayCls}-skeleton`
      }, Object.keys(week).map((date, ind) => {
        const listCls = (0, _classnames.default)({
          [`${_constants.cssClasses.PREFIX}-weekend`]: markWeekend && week[date].isWeekend
        });
        return /*#__PURE__*/_react.default.createElement("li", {
          key: `${date}-weekgrid`,
          className: listCls
        });
      })), /*#__PURE__*/_react.default.createElement("ul", {
        className: `${_constants.cssClasses.PREFIX}-event-items`
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
    this.foundation = new _foundation.default(this.adapter);
    this.dom = /*#__PURE__*/_react.default.createRef();
    this.scrollDom = /*#__PURE__*/_react.default.createRef();
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
    if (!(0, _isEqual2.default)(prevEventKeys, nowEventKeys) || !(0, _isEqual2.default)(prevProps.displayValue, this.props.displayValue)) {
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
    const weekCls = (0, _classnames.default)(prefixCls, className);
    const weekStyle = Object.assign({
      height,
      width
    }, style);
    return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Calendar"
    }, (locale, localeCode, dateFnsLocale) => (/*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: weekCls,
      style: weekStyle,
      ref: this.dom
    }, this.getDataAttr(this.props)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-sticky-top`
    }, header, this.renderHeader(dateFnsLocale), this.renderAllDay(locale)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-scroll-wrapper`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-scroll`,
      ref: this.scrollDom
    }, /*#__PURE__*/_react.default.createElement(_timeCol.default, {
      className: `${prefixCls}-sticky-left`,
      renderTimeDisplay: renderTimeDisplay
    }), this.renderDayGrid())))));
  }
}
exports.default = WeekCalendar;
WeekCalendar.propTypes = {
  displayValue: _propTypes.default.instanceOf(Date),
  header: _propTypes.default.node,
  events: _propTypes.default.array,
  mode: _propTypes.default.string,
  showCurrTime: _propTypes.default.bool,
  markWeekend: _propTypes.default.bool,
  scrollTop: _propTypes.default.number,
  renderTimeDisplay: _propTypes.default.func,
  renderDateDisplay: _propTypes.default.func,
  dateGridRender: _propTypes.default.func,
  allDayEventsRender: _propTypes.default.func,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  style: _propTypes.default.object,
  className: _propTypes.default.string
};
WeekCalendar.defaultProps = {
  displayValue: new Date(),
  events: [],
  mode: 'week'
};
WeekCalendar.contextType = _context.default;