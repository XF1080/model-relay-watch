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
var _resizeContext = require("./resizeContext");
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
class ResizeHandler extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.onMouseDown = e => {
      const {
        notifyResizeStart
      } = this.context;
      notifyResizeStart(this.handlerIndex, e, 'mouse');
    };
    this.onTouchStart = e => {
      const {
        notifyResizeStart
      } = this.context;
      notifyResizeStart(this.handlerIndex, e.targetTouches[0], 'touch');
    };
    this.getHandler = () => {
      return this.handlerRef.current;
    };
    this.state = {};
    this.handlerRef = /*#__PURE__*/(0, _react.createRef)();
    this.foundation = new _foundation.ResizeHandlerFoundation(this.adapter);
    this.handlerIndex = -1;
  }
  componentDidMount() {
    this.foundation.init();
    if (this.handlerIndex === -1) {
      this.handlerIndex = this.context.registerHandler(this.handlerRef);
    }
  }
  componentDidUpdate(_prevProps) {}
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      registerEvents: () => {
        this.handlerRef.current.addEventListener('mousedown', this.onMouseDown);
        this.handlerRef.current.addEventListener('touchstart', this.onTouchStart);
      },
      unregisterEvents: () => {
        this.handlerRef.current.removeEventListener('mousedown', this.onMouseDown);
        this.handlerRef.current.removeEventListener('touchstart', this.onTouchStart);
      }
    });
  }
  render() {
    const {
      style,
      className,
      children
    } = this.props;
    const {
      direction
    } = this.context;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(className, prefixCls + '-handler', prefixCls + '-handler-' + direction),
      style: style,
      ref: this.handlerRef
    }, children !== null && children !== void 0 ? children : /*#__PURE__*/_react.default.createElement(_semiIcons.IconHandle, {
      size: 'inherit',
      style: {
        rotate: this.context.direction === 'horizontal' ? '0deg' : '90deg'
      }
    }));
  }
}
ResizeHandler.propTypes = {
  children: _propTypes.default.node,
  direction: _propTypes.default.string,
  onResizeStart: _propTypes.default.func,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  style: _propTypes.default.object
};
ResizeHandler.defaultProps = {};
ResizeHandler.contextType = _resizeContext.ResizeContext;
var _default = exports.default = ResizeHandler;