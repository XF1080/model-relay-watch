import _isEqual from "lodash/isEqual";
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import CalendarFoundation from '@douyinfe/semi-foundation/lib/es/calendar/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/calendar/constants';
import DayCol from './dayCol';
import TimeCol from './timeCol';
import BaseComponent from '../_base/baseComponent';
import LocaleConsumer from '../locale/localeConsumer';
import localeContext from '../locale/context';
import '@douyinfe/semi-foundation/lib/es/calendar/calendar.css';
const prefixCls = `${cssClasses.PREFIX}-day`;
export default class DayCalendar extends BaseComponent {
  constructor(props) {
    super(props);
    this.checkWeekend = val => this.foundation.checkWeekend(val);
    this.renderAllDayEvents = events => {
      if (this.props.allDayEventsRender) {
        return this.props.allDayEventsRender(this.props.events);
      }
      const list = events.map((event, ind) => {
        const {
          children,
          key
        } = event;
        return /*#__PURE__*/React.createElement("li", {
          className: `${cssClasses.PREFIX}-event-item ${cssClasses.PREFIX}-event-allday`,
          key: key || `allDay-${ind}`
        }, children);
      });
      return list;
    };
    this.handleClick = (e, val) => {
      const {
        onClick
      } = this.props;
      const value = this.foundation.formatCbValue(val);
      onClick && onClick(e, value);
    };
    this.renderAllDay = events => {
      const allDayCls = `${cssClasses.PREFIX}-all-day`;
      const contentCls = cls(`${allDayCls}-content`, {
        [`${cssClasses.PREFIX}-weekend`]: this.isWeekend
      });
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Calendar"
      }, locale => (/*#__PURE__*/React.createElement("div", {
        className: `${allDayCls}`
      }, /*#__PURE__*/React.createElement("ul", {
        className: `${cssClasses.PREFIX}-tag ${allDayCls}-tag ${prefixCls}-sticky-left`
      }, /*#__PURE__*/React.createElement("span", null, locale.allDay)), /*#__PURE__*/React.createElement("div", {
        role: "gridcell",
        className: contentCls
      }, /*#__PURE__*/React.createElement("ul", {
        className: `${cssClasses.PREFIX}-event-items`
      }, this.renderAllDayEvents(events))))));
    };
    this.foundation = new CalendarFoundation(this.adapter);
    this.state = {
      scrollHeight: 0,
      parsedEvents: {
        day: [],
        allDay: []
      },
      cachedKeys: []
    };
    this.dom = /*#__PURE__*/React.createRef();
    this.scrollDom = /*#__PURE__*/React.createRef();
    this.isWeekend = false;
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
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
    this.foundation.parseDailyEvents();
  }
  componentDidUpdate(prevProps, prevState) {
    const prevEventKeys = prevState.cachedKeys;
    const nowEventKeys = this.props.events.map(event => event.key);
    if (!_isEqual(prevEventKeys, nowEventKeys) || !_isEqual(prevProps.displayValue, this.props.displayValue)) {
      this.foundation.parseDailyEvents();
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const {
      dateGridRender,
      displayValue,
      showCurrTime,
      renderTimeDisplay,
      markWeekend,
      className,
      height,
      width,
      style,
      header,
      minEventHeight
    } = this.props;
    const dayCls = cls(prefixCls, className);
    const dayStyle = Object.assign({
      height,
      width
    }, style);
    const {
      parsedEvents,
      scrollHeight
    } = this.state;
    this.isWeekend = markWeekend && this.checkWeekend(displayValue);
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: dayCls,
      style: dayStyle,
      ref: this.dom
    }, this.getDataAttr(this.props)), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-sticky-top`
    }, header, this.renderAllDay(parsedEvents.allDay)), /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-scroll-wrapper`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-scroll`,
      ref: this.scrollDom
    }, /*#__PURE__*/React.createElement(TimeCol, {
      className: `${prefixCls}-sticky-left`,
      renderTimeDisplay: renderTimeDisplay
    }), /*#__PURE__*/React.createElement(DayCol, {
      events: parsedEvents.day,
      displayValue: displayValue,
      scrollHeight: scrollHeight,
      handleClick: this.handleClick,
      showCurrTime: showCurrTime,
      isWeekend: this.isWeekend,
      minEventHeight: minEventHeight,
      dateGridRender: dateGridRender
    }))));
  }
}
DayCalendar.propTypes = {
  displayValue: PropTypes.instanceOf(Date),
  events: PropTypes.array,
  header: PropTypes.node,
  showCurrTime: PropTypes.bool,
  onClick: PropTypes.func,
  mode: PropTypes.string,
  renderTimeDisplay: PropTypes.func,
  markWeekend: PropTypes.bool,
  minEventHeight: PropTypes.number,
  scrollTop: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
  dateGridRender: PropTypes.func,
  allDayEventsRender: PropTypes.func
};
DayCalendar.defaultProps = {
  events: [],
  displayValue: new Date(),
  mode: 'day'
};
DayCalendar.contextType = localeContext;