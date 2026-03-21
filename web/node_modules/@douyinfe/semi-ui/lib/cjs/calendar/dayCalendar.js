"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/calendar/foundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/calendar/constants");
var _dayCol = _interopRequireDefault(require("./dayCol"));
var _timeCol = _interopRequireDefault(require("./timeCol"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _context = _interopRequireDefault(require("../locale/context"));
require("@douyinfe/semi-foundation/lib/cjs/calendar/calendar.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = `${_constants.cssClasses.PREFIX}-day`;
class DayCalendar extends _baseComponent.default {
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
        return /*#__PURE__*/_react.default.createElement("li", {
          className: `${_constants.cssClasses.PREFIX}-event-item ${_constants.cssClasses.PREFIX}-event-allday`,
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
      const allDayCls = `${_constants.cssClasses.PREFIX}-all-day`;
      const contentCls = (0, _classnames.default)(`${allDayCls}-content`, {
        [`${_constants.cssClasses.PREFIX}-weekend`]: this.isWeekend
      });
      return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "Calendar"
      }, locale => (/*#__PURE__*/_react.default.createElement("div", {
        className: `${allDayCls}`
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: `${_constants.cssClasses.PREFIX}-tag ${allDayCls}-tag ${prefixCls}-sticky-left`
      }, /*#__PURE__*/_react.default.createElement("span", null, locale.allDay)), /*#__PURE__*/_react.default.createElement("div", {
        role: "gridcell",
        className: contentCls
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: `${_constants.cssClasses.PREFIX}-event-items`
      }, this.renderAllDayEvents(events))))));
    };
    this.foundation = new _foundation.default(this.adapter);
    this.state = {
      scrollHeight: 0,
      parsedEvents: {
        day: [],
        allDay: []
      },
      cachedKeys: []
    };
    this.dom = /*#__PURE__*/_react.default.createRef();
    this.scrollDom = /*#__PURE__*/_react.default.createRef();
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
    if (!(0, _isEqual2.default)(prevEventKeys, nowEventKeys) || !(0, _isEqual2.default)(prevProps.displayValue, this.props.displayValue)) {
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
    const dayCls = (0, _classnames.default)(prefixCls, className);
    const dayStyle = Object.assign({
      height,
      width
    }, style);
    const {
      parsedEvents,
      scrollHeight
    } = this.state;
    this.isWeekend = markWeekend && this.checkWeekend(displayValue);
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: dayCls,
      style: dayStyle,
      ref: this.dom
    }, this.getDataAttr(this.props)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-sticky-top`
    }, header, this.renderAllDay(parsedEvents.allDay)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-scroll-wrapper`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-scroll`,
      ref: this.scrollDom
    }, /*#__PURE__*/_react.default.createElement(_timeCol.default, {
      className: `${prefixCls}-sticky-left`,
      renderTimeDisplay: renderTimeDisplay
    }), /*#__PURE__*/_react.default.createElement(_dayCol.default, {
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
exports.default = DayCalendar;
DayCalendar.propTypes = {
  displayValue: _propTypes.default.instanceOf(Date),
  events: _propTypes.default.array,
  header: _propTypes.default.node,
  showCurrTime: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  mode: _propTypes.default.string,
  renderTimeDisplay: _propTypes.default.func,
  markWeekend: _propTypes.default.bool,
  minEventHeight: _propTypes.default.number,
  scrollTop: _propTypes.default.number,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  height: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  dateGridRender: _propTypes.default.func,
  allDayEventsRender: _propTypes.default.func
};
DayCalendar.defaultProps = {
  events: [],
  displayValue: new Date(),
  mode: 'day'
};
DayCalendar.contextType = _context.default;