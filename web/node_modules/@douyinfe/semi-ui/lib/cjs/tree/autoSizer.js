"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/tree/constants");
var _resizeObserver = _interopRequireDefault(require("../resizeObserver"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixcls = _constants.cssClasses.PREFIX;
class AutoSizer extends _react.PureComponent {
  constructor(props) {
    super(props);
    this._onResize = entries => {
      // observe parent node height
      const target = entries && entries[1] && entries[1].target;
      if (target) {
        const height = (0, _get2.default)(target, 'offsetHeight') || 0;
        const style = window.getComputedStyle(target) || {};
        const paddingTop = parseInt((0, _get2.default)(style, 'paddingTop'), 10) || 0;
        const paddingBottom = parseInt((0, _get2.default)(style, 'paddingBottom'), 10) || 0;
        const newHeight = height - paddingTop - paddingBottom;
        if (this.state.height !== newHeight) {
          this.setState({
            height: height - paddingTop - paddingBottom
          });
        }
      }
    };
    this.state = {
      height: this.props.defaultHeight || 0
    };
  }
  componentDidMount() {
    const {
      height
    } = this.state;
    // if height is a number, pass it directly to virtual-list
    if (typeof height === 'number') {
      return;
    }
  }
  render() {
    const {
      children,
      defaultWidth,
      defaultHeight
    } = this.props;
    const {
      height
    } = this.state;
    // Avoid rendering children before the initial measurements have been collected.
    // At best this would just be wasting cycles. Refer to https://github.com/bvaughn/react-virtualized-auto-sizer/
    let bailoutOnChildren = false;
    if (height === 0 || typeof height !== 'number') {
      bailoutOnChildren = true;
    }
    return /*#__PURE__*/_react.default.createElement(_resizeObserver.default, {
      observeParent: true,
      onResize: this._onResize
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: defaultHeight,
        overflow: 'visible'
      },
      className: `${prefixcls}-auto-wrapper`
    }, !bailoutOnChildren && children({
      height,
      width: defaultWidth
    })));
  }
}
exports.default = AutoSizer;
AutoSizer.propTypes = {
  defaultHeight: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  defaultWidth: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
AutoSizer.defaultProps = {
  defaultHeight: '100%',
  defaultWidth: '100%'
};