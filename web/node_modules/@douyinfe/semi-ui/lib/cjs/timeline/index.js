"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("@douyinfe/semi-foundation/lib/cjs/timeline/timeline.css");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/timeline/constants");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
var _context = _interopRequireDefault(require("../configProvider/context"));
var _item = _interopRequireDefault(require("./item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixCls = _constants.cssClasses.PREFIX;
class Timeline extends _react.PureComponent {
  constructor() {
    super(...arguments);
    this.getPosCls = (ele, idx) => {
      const {
        mode
      } = this.props;
      if (mode === 'alternate') {
        if (ele.props.position) {
          return `${prefixCls}-item-${ele.props.position}`;
        }
        return idx % 2 === 0 ? `${prefixCls}-item-left` : `${prefixCls}-item-right`;
      }
      if (mode === 'center') {
        if (ele.props.position) {
          return `${prefixCls}-item-${ele.props.position}`;
        }
        return `${prefixCls}-item-left`;
      }
      if (mode === 'left' || mode === 'right') {
        return `${prefixCls}-item-${mode}`;
      }
      if (ele.props.position) {
        return `${prefixCls}-item-${ele.props.position}`;
      }
      return '';
    };
    this.addClassName = items => _react.default.Children.map(items, (ele, idx) => {
      if (/*#__PURE__*/_react.default.isValidElement(ele)) {
        return /*#__PURE__*/_react.default.cloneElement(ele, {
          // @ts-ignore
          className: (0, _classnames.default)(ele.props.className, this.getPosCls(ele, idx))
        });
      }
      return ele;
    });
  }
  render() {
    const _a = this.props,
      {
        children,
        className,
        style,
        mode,
        dataSource
      } = _a,
      rest = __rest(_a, ["children", "className", "style", "mode", "dataSource"]);
    const classString = (0, _classnames.default)(prefixCls, className, {
      [`${prefixCls}-${mode}`]: mode
    });
    let childrenList;
    if (dataSource && dataSource.length) {
      const items = dataSource.map((item, index) => /*#__PURE__*/_react.default.createElement(_item.default, Object.assign({
        key: `timeline-item-${index}`
      }, item), item.content));
      childrenList = this.addClassName(items);
    }
    const items = childrenList || this.addClassName(children);
    return /*#__PURE__*/_react.default.createElement("ul", Object.assign({
      "aria-label": this.props['aria-label'],
      style: style,
      className: classString
    }, (0, _getDataAttr.default)(rest)), items);
  }
}
Timeline.contextType = _context.default;
Timeline.Item = _item.default;
Timeline.propTypes = {
  mode: _propTypes.default.oneOf(_constants.strings.MODE),
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  dataSource: _propTypes.default.array
};
Timeline.defaultProps = {
  mode: 'left'
};
var _default = exports.default = Timeline;