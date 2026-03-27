"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _stubFalse2 = _interopRequireDefault(require("lodash/stubFalse"));
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _yearAndMonthFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/datePicker/yearAndMonthFoundation"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _index = _interopRequireDefault(require("../scrollList/index"));
var _scrollItem = _interopRequireDefault(require("../scrollList/scrollItem"));
var _index2 = require("@douyinfe/semi-foundation/lib/cjs/datePicker/_utils/index");
var _iconButton = _interopRequireDefault(require("../iconButton"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/base/constants");
var _dateFns = require("date-fns");
var _constants2 = require("@douyinfe/semi-foundation/lib/cjs/datePicker/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = `${_constants.BASE_CLASS_PREFIX}-datepicker`;
class YearAndMonth extends _baseComponent.default {
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
    } = (0, _index2.getYearAndMonth)(currentYear, currentMonth);
    this.state = {
      years: (0, _index2.getYears)(props.startYear, props.endYear).map(year => ({
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
    this.yearRef = /*#__PURE__*/_react.default.createRef();
    this.monthRef = /*#__PURE__*/_react.default.createRef();
    this.foundation = new _yearAndMonthFoundation.default(this.adapter);
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
    } = (0, _index2.getYearAndMonth)(props.currentYear, props.currentMonth);
    if (!(0, _isEqual2.default)(props.currentYear, state.currentYear)) {
      willUpdateStates.currentYear = year;
    }
    if (!(0, _isEqual2.default)(props.currentMonth, state.currentMonth)) {
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
    const currentDate = (0, _dateFns.setMonth)(Date.now(), currentMonth[panelType] - 1);
    const left = _constants2.strings.PANEL_TYPE_LEFT;
    const right = _constants2.strings.PANEL_TYPE_RIGHT;
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
        return disabledDate((0, _dateFns.set)(currentDate, {
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
    return /*#__PURE__*/_react.default.createElement(_scrollItem.default, Object.assign({
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
    const currentDate = (0, _dateFns.setYear)(Date.now(), currentYear[panelType]);
    const left = _constants2.strings.PANEL_TYPE_LEFT;
    const right = _constants2.strings.PANEL_TYPE_RIGHT;
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
        disabled: disabledDate((0, _dateFns.setMonth)(currentDate, month - 1)) || isRightPanelDisabled,
        value: locale.fullMonths[value] // Actual rendered text
      };
    });
    const selectedIndex = list.findIndex(item => item.month === currentMonth[panelType]);
    return /*#__PURE__*/_react.default.createElement(_scrollItem.default, Object.assign({
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
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index.default, null, this.renderColYear(panelType), this.renderColMonth(panelType)));
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
    const panelTypeLeft = _constants2.strings.PANEL_TYPE_LEFT;
    const panelTypeRight = _constants2.strings.PANEL_TYPE_RIGHT;
    let content = null;
    if (type === 'month') {
      content = this.renderPanel(panelTypeLeft);
    } else {
      content = /*#__PURE__*/_react.default.createElement("div", {
        className: bodyCls
      }, this.renderPanel(panelTypeLeft), this.renderPanel(panelTypeRight));
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, noBackBtn ? null : (/*#__PURE__*/_react.default.createElement("div", {
      className: prefix
    }, /*#__PURE__*/_react.default.createElement(_iconButton.default, {
      noHorizontalPadding: false,
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronLeft, {
        "aria-hidden": true,
        size: iconSize
      }),
      size: buttonSize,
      onClick: this.backToMain
    }, /*#__PURE__*/_react.default.createElement("span", null, selectDateText)))), presetPosition ? (/*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex'
      }
    }, presetPosition === "left" && type !== 'monthRange' && renderQuickControls, /*#__PURE__*/_react.default.createElement("div", null, renderDateInput, content), presetPosition === "right" && type !== 'monthRange' && renderQuickControls)) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderDateInput, content));
  }
}
YearAndMonth.propTypes = {
  currentYear: _propTypes.default.object,
  currentMonth: _propTypes.default.object,
  onSelect: _propTypes.default.func,
  locale: _propTypes.default.object,
  localeCode: _propTypes.default.string,
  monthCycled: _propTypes.default.bool,
  yearCycled: _propTypes.default.bool,
  noBackBtn: _propTypes.default.bool,
  disabledDate: _propTypes.default.func,
  density: _propTypes.default.string,
  presetPosition: _propTypes.default.oneOf(_constants2.strings.PRESET_POSITION_SET),
  renderQuickControls: _propTypes.default.node,
  renderDateInput: _propTypes.default.node,
  type: _propTypes.default.oneOf(_constants2.strings.TYPE_SET),
  startYear: _propTypes.default.number,
  endYear: _propTypes.default.number
};
YearAndMonth.defaultProps = {
  disabledDate: _stubFalse2.default,
  monthCycled: false,
  yearCycled: false,
  noBackBtn: false,
  onSelect: _noop2.default,
  type: 'month'
};
var _default = exports.default = YearAndMonth;