"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _foundation = require("@douyinfe/semi-foundation/lib/cjs/resizable/foundation");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/resizable/constants");
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _resizeContext = require("./resizeContext");
require("@douyinfe/semi-foundation/lib/cjs/resizable/resizable.css");
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
class ResizeGroup extends _baseComponent.default {
  constructor(props) {
    var _this;
    // 在context中使用的属性需要考虑在strictMode下会执行两次，所以用Map来维护
    super(props);
    _this = this;
    this.itemRefs = new Map();
    this.itemMinMap = new Map();
    this.itemMaxMap = new Map();
    this.itemMinusMap = new Map();
    this.itemDefaultSizeList = new Map();
    this.itemResizeStart = new Map();
    this.itemResizing = new Map();
    this.itemResizeEnd = new Map();
    this.handlerRefs = new Map();
    this.registerEvent = function () {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mouse';
      if (_this.window) {
        if (type === 'mouse') {
          _this.window.addEventListener('mousemove', _this.foundation.onMouseMove);
          _this.window.addEventListener('mouseup', _this.foundation.onResizeEnd);
          _this.window.addEventListener('mouseleave', _this.foundation.onResizeEnd);
        } else {
          _this.window.addEventListener('touchmove', _this.foundation.onTouchMove, {
            passive: false
          });
          _this.window.addEventListener('touchend', _this.foundation.onResizeEnd);
          _this.window.addEventListener('touchcancel', _this.foundation.onResizeEnd);
        }
      }
    };
    this.unregisterEvent = function () {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mouse';
      if (_this.window) {
        if (type === 'mouse') {
          _this.window.removeEventListener('mousemove', _this.foundation.onMouseMove);
          _this.window.removeEventListener('mouseup', _this.foundation.onResizeEnd);
          _this.window.removeEventListener('mouseleave', _this.foundation.onResizeEnd);
        } else {
          _this.window.removeEventListener('touchmove', _this.foundation.onTouchMove, {
            passive: false
          });
          _this.window.removeEventListener('touchend', _this.foundation.onResizeEnd);
          _this.window.removeEventListener('touchcancel', _this.foundation.onResizeEnd);
        }
      }
    };
    this.registerItem = (ref, min, max, defaultSize, onResizeStart, onChange, onResizeEnd) => {
      if (Array.from(this.itemRefs.values()).some(r => r === ref)) {
        return -1;
      }
      let index = this.itemRefs.size;
      this.itemRefs.set(index, ref);
      this.itemMinMap.set(index, min);
      this.itemMaxMap.set(index, max);
      this.itemDefaultSizeList.set(index, defaultSize);
      this.itemResizeStart.set(index, onResizeStart);
      this.itemResizing.set(index, onChange);
      this.itemResizeEnd.set(index, onResizeEnd);
      return index;
    };
    this.registerHandler = ref => {
      if (Array.from(this.handlerRefs.values()).some(r => r === ref)) {
        return -1;
      }
      let index = this.handlerRefs.size;
      this.handlerRefs.set(index, ref);
      return index;
    };
    this.getGroupSize = () => {
      return this.groupSize;
    };
    this.groupRef = /*#__PURE__*/(0, _react.createRef)();
    this.foundation = new _foundation.ResizeGroupFoundation(this.adapter);
    this.state = {
      isResizing: false,
      originalPosition: {
        x: 0,
        y: 0,
        lastItemSize: 0,
        nextItemSize: 0,
        lastOffset: 0,
        nextOffset: 0
      },
      backgroundStyle: {
        cursor: 'auto'
      },
      curHandler: null,
      contextValue: {
        direction: props.direction,
        registerItem: this.registerItem,
        registerHandler: this.registerHandler,
        notifyResizeStart: this.foundation.onResizeStart,
        getGroupSize: this.getGroupSize
      }
    };
  }
  componentDidMount() {
    this.foundation.init();
    // 监听窗口大小变化，保证一些限制仍生效
    window.addEventListener('resize', this.foundation.ensureConstraint);
  }
  componentDidUpdate(prevProps) {
    // 支持动态调整伸缩direction
    if (this.props.direction !== prevProps.direction) {
      this.setState(prevState => Object.assign(Object.assign({}, prevState), {
        contextValue: Object.assign(Object.assign({}, prevState.contextValue), {
          direction: this.props.direction
        })
      }));
      this.foundation.direction = this.props.direction;
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
    window.removeEventListener('resize', this.foundation.ensureConstraint);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      getGroupRef: () => this.groupRef.current,
      getItem: id => this.itemRefs.get(id).current,
      getItemCount: () => this.itemRefs.size,
      getHandler: id => this.handlerRefs.get(id).current,
      getHandlerCount: () => this.handlerRefs.size,
      getItemMin: index => {
        return this.itemMinMap.get(index);
      },
      getItemMax: index => {
        return this.itemMaxMap.get(index);
      },
      getItemChange: index => {
        return this.itemResizing.get(index);
      },
      getItemEnd: index => {
        return this.itemResizeEnd.get(index);
      },
      getItemStart: index => {
        return this.itemResizeStart.get(index);
      },
      getItemDefaultSize: index => {
        return this.itemDefaultSizeList.get(index);
      },
      registerEvents: this.registerEvent,
      unregisterEvents: this.unregisterEvent
    });
  }
  get window() {
    var _a;
    return (_a = this.groupRef.current.ownerDocument.defaultView) !== null && _a !== void 0 ? _a : null;
  }
  render() {
    const _a = this.props,
      {
        children,
        direction,
        className
      } = _a,
      rest = __rest(_a, ["children", "direction", "className"]);
    return /*#__PURE__*/_react.default.createElement(_resizeContext.ResizeContext.Provider, {
      value: this.state.contextValue
    }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
      style: {
        flexDirection: direction === 'vertical' ? 'column' : 'row'
      },
      ref: this.groupRef,
      className: (0, _classnames.default)(className, prefixCls + '-group')
    }, rest), this.state.isResizing && /*#__PURE__*/_react.default.createElement("div", {
      style: this.state.backgroundStyle,
      className: (0, _classnames.default)(className, prefixCls + '-background')
    }), children));
  }
}
ResizeGroup.propTypes = {};
ResizeGroup.defaultProps = {
  direction: 'horizontal'
};
ResizeGroup.contextType = _resizeContext.ResizeContext;
var _default = exports.default = ResizeGroup;