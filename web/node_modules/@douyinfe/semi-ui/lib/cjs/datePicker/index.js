"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _object = require("@douyinfe/semi-foundation/lib/cjs/utils/object");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/datePicker/constants");
var _datePicker = _interopRequireDefault(require("./datePicker"));
var _context = _interopRequireDefault(require("../configProvider/context"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _object.forwardStatics)(/*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const propsObj = Object.assign({}, props);
  const {
    type,
    format,
    rangeSeparator
  } = propsObj;
  if (typeof format === 'string' && format) {
    if (!/[Hhms]+/.test(format)) {
      if (type === 'dateTime') {
        propsObj.type = 'date';
      } else if (type === 'dateTimeRange') {
        propsObj.type = 'dateRange';
      }
    }
  }
  // Add spaces at both ends to prevent conflicts with characters in the date when separating
  if (rangeSeparator && typeof rangeSeparator === 'string') {
    propsObj.rangeSeparator = ` ${rangeSeparator.trim()} `;
  }
  if (propsObj.insetInput) {
    if (!propsObj.position) {
      propsObj.position = _constants.strings.POSITION_INLINE_INPUT;
    }
    /**
     * When insetInput is `true` and `position` includes `over`, use 1px `spacing` to solve the problem of border-radius leakage in the upper left corner
     *
     * @see https://user-images.githubusercontent.com/26477537/158817185-126a5f33-41f7-414a-8e36-8d1be2dda5cd.png
     */
    if (propsObj.position.includes('Over') && !propsObj.spacing) {
      propsObj.spacing = _constants.numbers.SPACING_INSET_INPUT;
    }
  }
  return /*#__PURE__*/_react.default.createElement(_context.default.Consumer, null, _ref => {
    let {
      timeZone
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: 'DatePicker'
    }, (locale, localeCode, dateFnsLocale) => (/*#__PURE__*/_react.default.createElement(_datePicker.default, Object.assign({
      timeZone: timeZone,
      localeCode: localeCode,
      locale: locale,
      dateFnsLocale: dateFnsLocale
    }, propsObj, {
      ref: ref
    }))));
  });
}), _datePicker.default);