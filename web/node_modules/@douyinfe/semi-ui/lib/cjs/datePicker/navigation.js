"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _iconButton = _interopRequireDefault(require("../iconButton"));
var _button = _interopRequireDefault(require("../button"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/datePicker/constants");
var _semiIcons = require("@douyinfe/semi-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import cls from 'classnames';

const prefixCls = _constants.cssClasses.NAVIGATION;
class Navigation extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.navRef = /*#__PURE__*/_react.default.createRef();
  }
  render() {
    const {
      forwardRef,
      monthText,
      onMonthClick,
      onNextMonth,
      onPrevMonth,
      onPrevYear,
      onNextYear,
      density,
      shouldBimonthSwitch,
      panelType
    } = this.props;
    const btnTheme = 'borderless';
    const iconBtnSize = density === 'compact' ? 'default' : 'large';
    const btnNoHorizontalPadding = true;
    const buttonSize = density === 'compact' ? 'small' : 'default';
    const isLeftPanel = panelType === _constants.strings.PANEL_TYPE_LEFT;
    const isRightPanel = panelType === _constants.strings.PANEL_TYPE_RIGHT;
    // syncSwitchMonth and the current panel is the left
    const hiddenLeftPanelRightButtons = shouldBimonthSwitch && isLeftPanel;
    // syncSwitchMonth and the current panel is the right
    const hiddenRightPanelLeftButtons = shouldBimonthSwitch && isRightPanel;
    // `visibility: hidden` will keep the icon in position
    const leftButtonStyle = {};
    const rightButtonStyle = {};
    if (hiddenRightPanelLeftButtons) {
      leftButtonStyle.visibility = 'hidden';
    }
    if (hiddenLeftPanelRightButtons) {
      rightButtonStyle.visibility = 'hidden';
    }
    const ref = forwardRef || this.navRef;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: prefixCls,
      ref: ref
    }, /*#__PURE__*/_react.default.createElement(_iconButton.default, {
      key: "double-chevron-left",
      "aria-label": "Previous year",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconDoubleChevronLeft, {
        "aria-hidden": true,
        size: iconBtnSize
      }),
      size: buttonSize,
      theme: btnTheme,
      noHorizontalPadding: btnNoHorizontalPadding,
      onClick: onPrevYear,
      style: leftButtonStyle
    }), /*#__PURE__*/_react.default.createElement(_iconButton.default, {
      key: "chevron-left",
      "aria-label": "Previous month",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronLeft, {
        "aria-hidden": true,
        size: iconBtnSize
      }),
      size: buttonSize,
      onClick: onPrevMonth,
      theme: btnTheme,
      noHorizontalPadding: btnNoHorizontalPadding,
      style: leftButtonStyle
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-month`
    }, /*#__PURE__*/_react.default.createElement(_button.default, {
      onClick: onMonthClick,
      theme: btnTheme,
      size: buttonSize
    }, /*#__PURE__*/_react.default.createElement("span", null, monthText))), /*#__PURE__*/_react.default.createElement(_iconButton.default, {
      key: "chevron-right",
      "aria-label": "Next month",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronRight, {
        "aria-hidden": true,
        size: iconBtnSize
      }),
      size: buttonSize,
      onClick: onNextMonth,
      theme: btnTheme,
      noHorizontalPadding: btnNoHorizontalPadding,
      style: rightButtonStyle
    }), /*#__PURE__*/_react.default.createElement(_iconButton.default, {
      key: "double-chevron-right",
      "aria-label": "Next year",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconDoubleChevronRight, {
        "aria-hidden": true,
        size: iconBtnSize
      }),
      size: buttonSize,
      theme: btnTheme,
      noHorizontalPadding: btnNoHorizontalPadding,
      onClick: onNextYear,
      style: rightButtonStyle
    }));
  }
}
exports.default = Navigation;
Navigation.propTypes = {
  monthText: _propTypes.default.string,
  density: _propTypes.default.string,
  onMonthClick: _propTypes.default.func,
  onNextMonth: _propTypes.default.func,
  onPrevMonth: _propTypes.default.func,
  onNextYear: _propTypes.default.func,
  onPrevYear: _propTypes.default.func,
  navPrev: _propTypes.default.node,
  navNext: _propTypes.default.node,
  // Whether to switch synchronously for two panels
  shouldBimonthSwitch: _propTypes.default.bool,
  // Panel type, divided into left panel and right panel
  panelType: _propTypes.default.oneOf([_constants.strings.PANEL_TYPE_LEFT, _constants.strings.PANEL_TYPE_RIGHT])
};
Navigation.defaultProps = {
  monthText: '',
  onMonthClick: _noop2.default,
  onNextMonth: _noop2.default,
  onPrevMonth: _noop2.default,
  onNextYear: _noop2.default,
  onPrevYear: _noop2.default
};