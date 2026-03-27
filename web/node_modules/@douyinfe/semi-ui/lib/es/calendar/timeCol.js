import React, { PureComponent } from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import LocaleConsumer from '../locale/localeConsumer';
import localeContext from '../locale/context';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/calendar/constants';
import '@douyinfe/semi-foundation/lib/es/calendar/calendar.css';
const prefixCls = `${cssClasses.PREFIX}-time`;
export default class timeCol extends PureComponent {
  formatTime(item) {
    const {
      renderTimeDisplay
    } = this.props;
    if (typeof renderTimeDisplay === 'function') {
      return renderTimeDisplay(item);
    } else {
      const replaceTime = (template, time) => template.replace('${time}', String(time));
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Calendar",
        key: `locale-${item}`
      }, locale => {
        let time = item < 12 ? replaceTime(locale.AM, item) : replaceTime(locale.PM, item - 12);
        if (item === 12) {
          time = replaceTime(locale.PM, item);
        }
        return time;
      });
    }
  }
  renderTime() {
    const {
      className
    } = this.props;
    const wrapperCls = cls(className, `${prefixCls}`);
    const list = [...Array(24).keys()].map(item => this.formatTime(item));
    list.splice(0, 1, '');
    const inner = list.map((item, index) => (/*#__PURE__*/React.createElement("li", {
      key: `time-${index}`,
      className: `${prefixCls}-item`
    }, /*#__PURE__*/React.createElement("span", null, item))));
    return /*#__PURE__*/React.createElement("div", {
      className: wrapperCls
    }, /*#__PURE__*/React.createElement("ul", {
      className: `${prefixCls}-items`
    }, inner));
  }
  render() {
    const time = this.renderTime();
    return time;
  }
}
timeCol.propTypes = {
  className: PropTypes.string,
  renderTimeDisplay: PropTypes.func
};
timeCol.contextType = localeContext;