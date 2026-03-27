"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/calendar/foundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/calendar/constants");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _context = _interopRequireDefault(require("../locale/context"));
require("@douyinfe/semi-foundation/lib/cjs/calendar/calendar.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

const prefixCls = `${_constants.cssClasses.PREFIX}-grid`;
function pad(d) {
  return d < 10 ? `0${d.toString()}` : d.toString();
}
class DayCol extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.renderEvents = () => {
      const {
        events,
        scrollHeight,
        minEventHeight
      } = this.props;
      const list = events.map((event, ind) => {
        const {
          startPos,
          endPos,
          children,
          key,
          left = 0
        } = event;
        const top = startPos * scrollHeight;
        const height = (endPos - startPos) * scrollHeight;
        const style = {
          top: `${top}px`,
          height: `${Math.max(minEventHeight, height)}px`,
          left: left
        };
        return /*#__PURE__*/_react.default.createElement("li", {
          className: `${_constants.cssClasses.PREFIX}-event-item ${_constants.cssClasses.PREFIX}-event-day`,
          style: style,
          key: key || `${top}-${ind}`
        }, children);
      });
      return list;
    };
    this.renderCurrTime = () => {
      const {
        currPos
      } = this.state;
      const {
        scrollHeight
      } = this.props;
      const key = currPos;
      const top = currPos * scrollHeight;
      const style = {
        top
      };
      const circle = /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-curr-circle`,
        style: style
      });
      const line = /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-curr-line`,
        style: style
      });
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
        key: key
      }, circle, line);
    };
    this.handleClick = (e, val) => {
      this.props.handleClick(e, val);
    };
    this.renderGrid = () => {
      const showCurrTime = this.props.showCurrTime ? this.state.showCurrTime : false;
      const {
        displayValue,
        isWeekend,
        dateGridRender
      } = this.props;
      const skCls = (0, _classnames.default)(`${prefixCls}-skeleton`, {
        [`${_constants.cssClasses.PREFIX}-weekend`]: isWeekend
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}`,
        role: "presentation"
      }, /*#__PURE__*/_react.default.createElement("div", {
        role: "gridcell",
        className: `${prefixCls}-content`
      }, showCurrTime ? this.renderCurrTime() : null, /*#__PURE__*/_react.default.createElement("ul", {
        role: "row",
        className: skCls
      }, [...Array(25).keys()].map(item => {
        const line = (0, _classnames.default)({
          [`${prefixCls}-skeleton-row-line`]: true
        });
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
          key: `${item}-daycol`
        }, /*#__PURE__*/_react.default.createElement("li", {
          "data-time": `${pad(item)}:00:00`,
          className: line,
          onClick: e => this.handleClick(e, [displayValue, item, 0, 0])
        }), /*#__PURE__*/_react.default.createElement("li", {
          "data-time": `${pad(item)}:30:00`,
          onClick: e => this.handleClick(e, [displayValue, item, 30, 0])
        }));
      })), dateGridRender && dateGridRender(displayValue.toString(), displayValue), /*#__PURE__*/_react.default.createElement("ul", {
        className: `${_constants.cssClasses.PREFIX}-event-items`
      }, this.renderEvents())));
    };
    this.state = {
      currPos: 0,
      showCurrTime: false
    };
    this.foundation = new _foundation.default(this.adapter);
  }
  componentDidMount() {
    this.foundation.init();
    this.foundation.initCurrTime();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      updateCurrPos: currPos => {
        this.setState({
          currPos
        });
      },
      updateShowCurrTime: () => {
        this.setState({
          showCurrTime: true
        });
      }
    });
  }
  render() {
    const grid = this.renderGrid();
    return grid;
  }
}
exports.default = DayCol;
DayCol.propTypes = {
  events: _propTypes.default.array,
  displayValue: _propTypes.default.instanceOf(Date),
  showCurrTime: _propTypes.default.bool,
  scrollHeight: _propTypes.default.number,
  currPos: _propTypes.default.number,
  handleClick: _propTypes.default.func,
  mode: _propTypes.default.string,
  minEventHeight: _propTypes.default.number,
  isWeekend: _propTypes.default.bool,
  dateGridRender: _propTypes.default.func
};
DayCol.defaultProps = {
  events: [],
  showCurrTime: true,
  scrollHeight: 0,
  currPos: 0,
  mode: 'dayCol',
  minEventHeight: Number.MIN_SAFE_INTEGER
};
DayCol.contextType = _context.default;