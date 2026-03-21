"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireDefault(require("react"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _TimePicker = _interopRequireDefault(require("./TimePicker"));
var _context = _interopRequireDefault(require("../configProvider/context"));
var _utils = require("../_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class LocaleTimePicker extends _react.default.PureComponent {
  render() {
    const {
      type
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_context.default.Consumer, null, _ref => {
      let {
        timeZone
      } = _ref;
      return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "TimePicker"
      }, (locale, localeCode, dateFnsLocale) => (/*#__PURE__*/_react.default.createElement(_TimePicker.default, Object.assign({
        timeZone: timeZone,
        placeholder: (0, _get2.default)(locale, ['placeholder', type])
      }, this.props, {
        locale: locale,
        localeCode: localeCode,
        dateFnsLocale: dateFnsLocale
      }))));
    });
  }
}
exports.default = LocaleTimePicker;
LocaleTimePicker.propTypes = _TimePicker.default.propTypes;
LocaleTimePicker.__SemiComponentName__ = "TimePicker";
LocaleTimePicker.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(LocaleTimePicker.__SemiComponentName__, _TimePicker.default.defaultProps);