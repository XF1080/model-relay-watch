/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import CalendarFoundation from '@douyinfe/semi-foundation/lib/es/calendar/foundation';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/calendar/constants';
import BaseComponent from '../_base/baseComponent';
import localeContext from '../locale/context';
import '@douyinfe/semi-foundation/lib/es/calendar/calendar.css';
const prefixCls = `${cssClasses.PREFIX}-grid`;
function pad(d) {
  return d < 10 ? `0${d.toString()}` : d.toString();
}
export default class DayCol extends BaseComponent {
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
        return /*#__PURE__*/React.createElement("li", {
          className: `${cssClasses.PREFIX}-event-item ${cssClasses.PREFIX}-event-day`,
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
      const circle = /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-curr-circle`,
        style: style
      });
      const line = /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-curr-line`,
        style: style
      });
      return /*#__PURE__*/React.createElement(React.Fragment, {
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
      const skCls = cls(`${prefixCls}-skeleton`, {
        [`${cssClasses.PREFIX}-weekend`]: isWeekend
      });
      return /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}`,
        role: "presentation"
      }, /*#__PURE__*/React.createElement("div", {
        role: "gridcell",
        className: `${prefixCls}-content`
      }, showCurrTime ? this.renderCurrTime() : null, /*#__PURE__*/React.createElement("ul", {
        role: "row",
        className: skCls
      }, [...Array(25).keys()].map(item => {
        const line = cls({
          [`${prefixCls}-skeleton-row-line`]: true
        });
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: `${item}-daycol`
        }, /*#__PURE__*/React.createElement("li", {
          "data-time": `${pad(item)}:00:00`,
          className: line,
          onClick: e => this.handleClick(e, [displayValue, item, 0, 0])
        }), /*#__PURE__*/React.createElement("li", {
          "data-time": `${pad(item)}:30:00`,
          onClick: e => this.handleClick(e, [displayValue, item, 30, 0])
        }));
      })), dateGridRender && dateGridRender(displayValue.toString(), displayValue), /*#__PURE__*/React.createElement("ul", {
        className: `${cssClasses.PREFIX}-event-items`
      }, this.renderEvents())));
    };
    this.state = {
      currPos: 0,
      showCurrTime: false
    };
    this.foundation = new CalendarFoundation(this.adapter);
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
DayCol.propTypes = {
  events: PropTypes.array,
  displayValue: PropTypes.instanceOf(Date),
  showCurrTime: PropTypes.bool,
  scrollHeight: PropTypes.number,
  currPos: PropTypes.number,
  handleClick: PropTypes.func,
  mode: PropTypes.string,
  minEventHeight: PropTypes.number,
  isWeekend: PropTypes.bool,
  dateGridRender: PropTypes.func
};
DayCol.defaultProps = {
  events: [],
  showCurrTime: true,
  scrollHeight: 0,
  currPos: 0,
  mode: 'dayCol',
  minEventHeight: Number.MIN_SAFE_INTEGER
};
DayCol.contextType = localeContext;