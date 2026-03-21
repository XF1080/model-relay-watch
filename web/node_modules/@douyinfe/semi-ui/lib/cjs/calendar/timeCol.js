"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _context = _interopRequireDefault(require("../locale/context"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/calendar/constants");
require("@douyinfe/semi-foundation/lib/cjs/calendar/calendar.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = `${_constants.cssClasses.PREFIX}-time`;
class timeCol extends _react.PureComponent {
  formatTime(item) {
    const {
      renderTimeDisplay
    } = this.props;
    if (typeof renderTimeDisplay === 'function') {
      return renderTimeDisplay(item);
    } else {
      const replaceTime = (template, time) => template.replace('${time}', String(time));
      return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
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
    const wrapperCls = (0, _classnames.default)(className, `${prefixCls}`);
    const list = [...Array(24).keys()].map(item => this.formatTime(item));
    list.splice(0, 1, '');
    const inner = list.map((item, index) => (/*#__PURE__*/_react.default.createElement("li", {
      key: `time-${index}`,
      className: `${prefixCls}-item`
    }, /*#__PURE__*/_react.default.createElement("span", null, item))));
    return /*#__PURE__*/_react.default.createElement("div", {
      className: wrapperCls
    }, /*#__PURE__*/_react.default.createElement("ul", {
      className: `${prefixCls}-items`
    }, inner));
  }
  render() {
    const time = this.renderTime();
    return time;
  }
}
exports.default = timeCol;
timeCol.propTypes = {
  className: _propTypes.default.string,
  renderTimeDisplay: _propTypes.default.func
};
timeCol.contextType = _context.default;