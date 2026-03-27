import _isEqual from "lodash/isEqual";
import _stubFalse from "lodash/stubFalse";
import _noop from "lodash/noop";
import React from 'react';
import PropTypes from 'prop-types';
import YearAndMonthFoundation from '@douyinfe/semi-foundation/lib/es/datePicker/yearAndMonthFoundation';
import BaseComponent from '../_base/baseComponent';
import ScrollList from '../scrollList/index';
import ScrollItem from '../scrollList/scrollItem';
import { getYearAndMonth, getYears } from '@douyinfe/semi-foundation/lib/es/datePicker/_utils/index';
import IconButton from '../iconButton';
import { IconChevronLeft } from '@douyinfe/semi-icons';
import { BASE_CLASS_PREFIX } from '@douyinfe/semi-foundation/lib/es/base/constants';
import { setYear, setMonth, set } from 'date-fns';
import { strings } from '@douyinfe/semi-foundation/lib/es/datePicker/constants';
const prefixCls = `${BASE_CLASS_PREFIX}-datepicker`;
class YearAndMonth extends BaseComponent {
  constructor(props) {
    super(props);
    this.selectYear = (item, panelType) => {
      this.foundation.selectYear(item, panelType);
    };
    this.selectMonth = (item, panelType) => {
      this.foundation.selectMonth(item, panelType);
    };
    this.reselect = () => {
      const refKeys = ['yearRef', 'monthRef'];
      refKeys.forEach(key => {
        const ref = this[key];
        if (ref && ref.current && ref.current.scrollToIndex) {
          ref.current.scrollToIndex();
        }
      });
    };
    this.backToMain = e => {
      e.nativeEvent.stopImmediatePropagation();
      this.foundation.backToMain();
    };
    const now = new Date();
    let {
      currentYear,
      currentMonth
    } = props;
    const {
      year,
      month
    } = getYearAndMonth(currentYear, currentMonth);
    this.state = {
      years: getYears(props.startYear, props.endYear).map(year => ({
        value: year,
        year
      })),
      months: Array(12).fill(0).map((v, idx) => ({
        value: idx + 1,
        month: idx + 1
      })),
      currentYear: year,
      currentMonth: month
    };
    this.yearRef = /*#__PURE__*/React.createRef();
    this.monthRef = /*#__PURE__*/React.createRef();
    this.foundation = new YearAndMonthFoundation(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      // updateYears: years => this.setState({ years }),
      // updateMonths: months => this.setState({ months }),
      setCurrentYear: (currentYear, cb) => this.setState({
        currentYear
      }, cb),
      setCurrentMonth: currentMonth => this.setState({
        currentMonth
      }),
      setCurrentYearAndMonth: (currentYear, currentMonth) => this.setState({
        currentYear,
        currentMonth
      }),
      notifySelectYear: year => this.props.onSelect({
        currentMonth: this.state.currentMonth,
        currentYear: year
      }),
      notifySelectMonth: month => this.props.onSelect({
        currentYear: this.state.currentYear,
        currentMonth: month
      }),
      notifySelectYearAndMonth: (year, month) => this.props.onSelect({
        currentYear: year,
        currentMonth: month
      }),
      notifyBackToMain: () => this.props.onBackToMain()
    });
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateStates = {};
    const {
      year,
      month
    } = getYearAndMonth(props.currentYear, props.currentMonth);
    if (!_isEqual(props.currentYear, state.currentYear)) {
      willUpdateStates.currentYear = year;
    }
    if (!_isEqual(props.currentMonth, state.currentMonth)) {
      willUpdateStates.currentMonth = month;
    }
    return willUpdateStates;
  }
  renderColYear(panelType) {
    const {
      years,
      currentYear,
      currentMonth,
      months
    } = this.state;
    const {
      disabledDate,
      localeCode,
      yearCycled,
      yearAndMonthOpts
    } = this.props;
    const currentDate = setMonth(Date.now(), currentMonth[panelType] - 1);
    const left = strings.PANEL_TYPE_LEFT;
    const right = strings.PANEL_TYPE_RIGHT;
    const needDisabled = year => {
      if (panelType === right && currentYear[left]) {
        return currentYear[left] > year;
      }
      return false;
    };
    const list = years.map(_ref => {
      let {
        value,
        year
      } = _ref;
      const isAllMonthDisabled = months.every(_ref2 => {
        let {
          month
        } = _ref2;
        return disabledDate(set(currentDate, {
          year,
          month: month - 1
        }));
      });
      const isRightPanelDisabled = needDisabled(year);
      return {
        year,
        value,
        disabled: isAllMonthDisabled || isRightPanelDisabled
      };
    });
    let transform = val => val;
    if (localeCode === 'zh-CN' || localeCode === 'zh-TW') {
      // Only Chinese needs to add [year] after the selected year
      transform = val => `${val}年`;
    }
    return /*#__PURE__*/React.createElement(ScrollItem, Object.assign({
      ref: this.yearRef,
      cycled: yearCycled,
      list: list,
      transform: transform,
      selectedIndex: years.findIndex(item => item.value === currentYear[panelType]),
      type: "year",
      onSelect: item => this.selectYear(item, panelType),
      mode: "normal"
    }, yearAndMonthOpts));
  }
  renderColMonth(panelType) {
    const {
      months,
      currentMonth,
      currentYear
    } = this.state;
    const {
      locale,
      localeCode,
      monthCycled,
      disabledDate,
      yearAndMonthOpts
    } = this.props;
    let transform = val => val;
    const currentDate = setYear(Date.now(), currentYear[panelType]);
    const left = strings.PANEL_TYPE_LEFT;
    const right = strings.PANEL_TYPE_RIGHT;
    if (localeCode === 'zh-CN' || localeCode === 'zh-TW') {
      // Only Chinese needs to add [month] after the selected month
      transform = val => `${val}月`;
    }
    // i18n
    const list = months.map(_ref3 => {
      let {
        value,
        month
      } = _ref3;
      const isRightPanelDisabled = panelType === right && currentMonth[left] && currentYear[left] === currentYear[right] && currentMonth[left] > month;
      return {
        month,
        disabled: disabledDate(setMonth(currentDate, month - 1)) || isRightPanelDisabled,
        value: locale.fullMonths[value] // Actual rendered text
      };
    });
    const selectedIndex = list.findIndex(item => item.month === currentMonth[panelType]);
    return /*#__PURE__*/React.createElement(ScrollItem, Object.assign({
      ref: this.monthRef,
      cycled: monthCycled,
      list: list,
      transform: transform,
      selectedIndex: selectedIndex,
      type: "month",
      onSelect: item => this.selectMonth(item, panelType),
      mode: 'normal'
    }, yearAndMonthOpts));
  }
  renderPanel(panelType) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ScrollList, null, this.renderColYear(panelType), this.renderColMonth(panelType)));
  }
  render() {
    const {
      locale,
      noBackBtn,
      density,
      presetPosition,
      renderQuickControls,
      renderDateInput,
      type
    } = this.props;
    const prefix = `${prefixCls}-yearmonth-header`;
    const bodyCls = `${prefixCls}-yearmonth-body`;
    // i18n
    const selectDateText = locale.selectDate;
    const iconSize = density === 'compact' ? 'default' : 'large';
    const buttonSize = density === 'compact' ? 'small' : 'default';
    const panelTypeLeft = strings.PANEL_TYPE_LEFT;
    const panelTypeRight = strings.PANEL_TYPE_RIGHT;
    let content = null;
    if (type === 'month') {
      content = this.renderPanel(panelTypeLeft);
    } else {
      content = /*#__PURE__*/React.createElement("div", {
        className: bodyCls
      }, this.renderPanel(panelTypeLeft), this.renderPanel(panelTypeRight));
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, noBackBtn ? null : (/*#__PURE__*/React.createElement("div", {
      className: prefix
    }, /*#__PURE__*/React.createElement(IconButton, {
      noHorizontalPadding: false,
      icon: /*#__PURE__*/React.createElement(IconChevronLeft, {
        "aria-hidden": true,
        size: iconSize
      }),
      size: buttonSize,
      onClick: this.backToMain
    }, /*#__PURE__*/React.createElement("span", null, selectDateText)))), presetPosition ? (/*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, presetPosition === "left" && type !== 'monthRange' && renderQuickControls, /*#__PURE__*/React.createElement("div", null, renderDateInput, content), presetPosition === "right" && type !== 'monthRange' && renderQuickControls)) : /*#__PURE__*/React.createElement(React.Fragment, null, renderDateInput, content));
  }
}
YearAndMonth.propTypes = {
  currentYear: PropTypes.object,
  currentMonth: PropTypes.object,
  onSelect: PropTypes.func,
  locale: PropTypes.object,
  localeCode: PropTypes.string,
  monthCycled: PropTypes.bool,
  yearCycled: PropTypes.bool,
  noBackBtn: PropTypes.bool,
  disabledDate: PropTypes.func,
  density: PropTypes.string,
  presetPosition: PropTypes.oneOf(strings.PRESET_POSITION_SET),
  renderQuickControls: PropTypes.node,
  renderDateInput: PropTypes.node,
  type: PropTypes.oneOf(strings.TYPE_SET),
  startYear: PropTypes.number,
  endYear: PropTypes.number
};
YearAndMonth.defaultProps = {
  disabledDate: _stubFalse,
  monthCycled: false,
  yearCycled: false,
  noBackBtn: false,
  onSelect: _noop,
  type: 'month'
};
export default YearAndMonth;