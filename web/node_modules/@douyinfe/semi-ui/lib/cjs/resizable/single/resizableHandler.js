"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _foundation = require("@douyinfe/semi-foundation/lib/cjs/resizable/foundation");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/resizable/constants");
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
class ResizableHandler extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.state = {
      direction: this.props.direction
    };
    this.resizeHandlerRef = /*#__PURE__*/(0, _react.createRef)();
    this.foundation = new _foundation.ResizableHandlerFoundation(this.adapter);
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(_prevProps) {}
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      registerEvent: () => {
        this.resizeHandlerRef.current.addEventListener('mousedown', this.foundation.onMouseDown);
        this.resizeHandlerRef.current.addEventListener('touchstart', this.foundation.onTouchStart);
      },
      unregisterEvent: () => {
        this.resizeHandlerRef.current.removeEventListener('mousedown', this.foundation.onMouseDown);
        this.resizeHandlerRef.current.removeEventListener('touchstart', this.foundation.onTouchStart);
      }
    });
  }
  render() {
    const {
      children,
      style,
      className
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(className, prefixCls + '-resizableHandler', prefixCls + '-resizableHandler-' + this.props.direction),
      style: Object.assign({}, style),
      ref: this.resizeHandlerRef
    }, children);
  }
}
ResizableHandler.propTypes = {
  children: _propTypes.default.node,
  direction: _propTypes.default.string,
  onResizeStart: _propTypes.default.func,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  style: _propTypes.default.object
};
ResizableHandler.defaultProps = {};
var _default = exports.default = ResizableHandler;