"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/datePicker/constants");
var _index = _interopRequireDefault(require("../button/index"));
var _index2 = _interopRequireDefault(require("../typography/index"));
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */

const prefixCls = _constants.cssClasses.PREFIX;
const {
  Text
} = _index2.default;
class QuickControl extends _react.PureComponent {
  render() {
    const {
      presets,
      onPresetClick,
      type,
      presetPosition,
      insetInput,
      locale
    } = this.props;
    const isTypeRange = type === 'dateRange' || type === 'dateTimeRange';
    const isPanelTopAndBottom = presetPosition === 'top' || presetPosition === 'bottom';
    const isMonth = type === 'month';
    const isTopAndBottomRange = isPanelTopAndBottom && isTypeRange;
    const isTopAndBottomMonth = isPanelTopAndBottom && isMonth;
    const wrapperCls = (0, _classnames.default)(`${prefixCls}-quick-control`, {
      [`${prefixCls}-quick-control-${type}`]: type,
      [`${prefixCls}-quick-control-${presetPosition}`]: true
    });
    const headerCls = (0, _classnames.default)({
      [`${prefixCls}-quick-control-header`]: true
    });
    const contentWrapperCls = (0, _classnames.default)({
      [`${prefixCls}-quick-control-${presetPosition}-content-wrapper`]: true
    });
    const contentCls = (0, _classnames.default)({
      [`${prefixCls}-quick-control-${presetPosition}-content`]: !isTopAndBottomRange && !isTopAndBottomMonth,
      [`${prefixCls}-quick-control-${presetPosition}-range-content`]: isTopAndBottomRange,
      [`${prefixCls}-quick-control-${presetPosition}-month-content`]: isTopAndBottomMonth
    });
    const itemCls = (0, _classnames.default)({
      [`${prefixCls}-quick-control-${presetPosition}-content-item`]: !isTopAndBottomRange && !isTopAndBottomMonth,
      [`${prefixCls}-quick-control-${presetPosition}-range-content-item`]: isTopAndBottomRange,
      [`${prefixCls}-quick-control-${presetPosition}-month-content-item`]: isTopAndBottomMonth
    });
    const ellipsisCls = (0, _classnames.default)({
      [`${prefixCls}-quick-control-${presetPosition}-content-item-ellipsis`]: !isTopAndBottomRange && !isTopAndBottomMonth,
      [`${prefixCls}-quick-control-${presetPosition}-range-content-item-ellipsis`]: isTopAndBottomRange,
      [`${prefixCls}-quick-control-${presetPosition}-month-content-item-ellipsis`]: isTopAndBottomMonth
    });
    if (!presets.length) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: wrapperCls,
      "x-insetinput": insetInput ? "true" : "false"
    }, !isPanelTopAndBottom && /*#__PURE__*/_react.default.createElement("div", {
      className: headerCls
    }, locale.presets), /*#__PURE__*/_react.default.createElement("div", {
      className: contentWrapperCls
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: contentCls
    }, presets.map((item, index) => {
      const _item = typeof item === 'function' ? item() : item;
      return /*#__PURE__*/_react.default.createElement(_index.default, {
        size: "small",
        type: "primary",
        onClick: e => onPresetClick(_item, e),
        key: index
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: itemCls
      }, /*#__PURE__*/_react.default.createElement(Text, {
        ellipsis: {
          showTooltip: true
        },
        className: ellipsisCls
      }, _item.text)));
    }))));
  }
}
QuickControl.propTypes = {
  presets: _propTypes.default.array,
  presetPosition: _propTypes.default.oneOf(_constants.strings.PRESET_POSITION_SET),
  onPresetClick: _propTypes.default.func,
  type: _propTypes.default.string,
  insetInput: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object]),
  locale: _propTypes.default.object
};
QuickControl.defaultProps = {
  presets: [],
  presetPosition: 'bottom',
  onPresetClick: _function.noop
};
var _default = exports.default = QuickControl;