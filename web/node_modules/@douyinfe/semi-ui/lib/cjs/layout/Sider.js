"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/layout/constants");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
var _layoutContext = _interopRequireDefault(require("./layout-context"));
var _utils = require("../_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
};
const generateId = (() => {
  let i = 0;
  return () => {
    i += 1;
    return `${_constants.cssClasses.PREFIX}-sider-${i}`;
  };
})();
const bpt = _constants.strings.BREAKPOINT;
class Sider extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.unRegisters = [];
    this.uniqueId = '';
    this.uniqueId = generateId();
  }
  componentDidMount() {
    const {
      breakpoint
    } = this.props;
    const matchBpt = Object.keys(responsiveMap).filter(item => breakpoint && breakpoint.indexOf(item) !== -1);
    const unRegisters = matchBpt.map(screen => (0, _utils.registerMediaQuery)(responsiveMap[screen], {
      match: () => {
        this.responsiveHandler(screen, true);
      },
      unmatch: () => {
        this.responsiveHandler(screen, false);
      }
    }));
    this.unRegisters = unRegisters;
    if (this.context.siderHook) {
      this.context.siderHook.addSider(this.uniqueId);
    }
  }
  componentWillUnmount() {
    this.unRegisters.forEach(unRegister => unRegister());
    if (this.context.siderHook) {
      this.context.siderHook.removeSider(this.uniqueId);
    }
  }
  responsiveHandler(screen, matches) {
    const {
      onBreakpoint
    } = this.props;
    if (onBreakpoint) {
      onBreakpoint(screen, matches);
    }
  }
  render() {
    const _a = this.props,
      {
        prefixCls,
        className,
        children,
        style
      } = _a,
      others = __rest(_a, ["prefixCls", "className", "children", "style"]);
    const classString = (0, _classnames.default)(className, {
      [`${prefixCls}-sider`]: true
    });
    return /*#__PURE__*/_react.default.createElement("aside", Object.assign({
      className: classString,
      "aria-label": this.props['aria-label'],
      style: style
    }, (0, _getDataAttr.default)(others)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-sider-children`
    }, children));
  }
}
Sider.propTypes = {
  prefixCls: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  breakpoint: _propTypes.default.arrayOf(_propTypes.default.oneOf(bpt)),
  onBreakpoint: _propTypes.default.func,
  'aria-label': _propTypes.default.string,
  role: _propTypes.default.string
};
Sider.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX
};
Sider.contextType = _layoutContext.default;
Sider.elementType = "Layout.Sider";
var _default = exports.default = Sider;