"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _context = _interopRequireDefault(require("./context"));
var _context2 = _interopRequireDefault(require("../configProvider/context"));
var _zh_CN = _interopRequireDefault(require("./source/zh_CN"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class LocaleConsumer extends _react.Component {
  renderChildren(localeData, children) {
    const {
      componentName
    } = this.props;
    let locale = localeData;
    if (!(localeData === null || localeData === void 0 ? void 0 : localeData.code)) {
      locale = _zh_CN.default;
    }
    /**
     * dateFnsLocale is used to format the date into a local date
     * example:
     *  import { zhCN } from "date-fns/locale";
     *  format(new Date("2021-04-29"), "yyyy-MM-dd EEEE")
     *      => '2021-04-29 Thursday' (默认 locale 为 en-US)
     *  format(new Date('2021-04-29'), "yyyy-MM-dd EEEE", { locale: zhCN })
     *      => '2021-04-29 星期四'
     */
    const defaultFnsLocale = (0, _get2.default)(_zh_CN.default, 'dateFnsLocale');
    const dateFnsLocale = (0, _get2.default)(locale, 'dateFnsLocale', defaultFnsLocale);
    const currency = (0, _get2.default)(locale, 'currency');
    return children(locale[componentName], locale.code, dateFnsLocale, currency);
  }
  render() {
    const {
      children
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_context2.default.Consumer, null, _ref => {
      let {
        locale
      } = _ref;
      return /*#__PURE__*/_react.default.createElement(_context.default.Consumer, null, localeData => this.renderChildren(locale || localeData, children));
    });
  }
}
exports.default = LocaleConsumer;
LocaleConsumer.propTypes = {
  componentName: _propTypes.default.string.isRequired,
  children: _propTypes.default.any
};
LocaleConsumer.defaultProps = {
  componentName: ''
};