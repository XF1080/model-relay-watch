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
var _types = require("@douyinfe/semi-foundation/lib/cjs/resizable/types");
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _resizableHandler = _interopRequireDefault(require("./resizableHandler"));
require("@douyinfe/semi-foundation/lib/cjs/resizable/resizable.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
class Resizable extends _baseComponent.default {
  constructor(props) {
    var _a, _b;
    super(props);
    this.getResizable = () => {
      var _a;
      return (_a = this.resizableRef) === null || _a === void 0 ? void 0 : _a.current;
    };
    this.renderResizeHandler = () => {
      const {
        enable,
        handleStyle,
        handleClass,
        handleNode,
        handleWrapperStyle,
        handleWrapperClass
      } = this.props;
      if (!enable) {
        return null;
      }
      const handlers = _types.directions.map(dir => {
        var _a;
        if (enable[dir] !== false) {
          return /*#__PURE__*/_react.default.createElement(_resizableHandler.default, {
            key: dir,
            direction: dir,
            onResizeStart: this.foundation.onResizeStart,
            style: handleStyle && handleStyle[dir],
            className: handleClass && handleClass[dir]
          }, (_a = handleNode === null || handleNode === void 0 ? void 0 : handleNode[dir]) !== null && _a !== void 0 ? _a : null);
        }
        return null;
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: handleWrapperClass,
        style: handleWrapperStyle
      }, handlers);
    };
    this.resizableRef = /*#__PURE__*/(0, _react.createRef)();
    this.foundation = new _foundation.ResizableFoundation(this.adapter);
    this.state = {
      isResizing: false,
      width: (_a = this.foundation.propSize.width) !== null && _a !== void 0 ? _a : 'auto',
      height: (_b = this.foundation.propSize.height) !== null && _b !== void 0 ? _b : 'auto',
      direction: 'right',
      original: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      backgroundStyle: {
        cursor: 'auto'
      },
      flexBasis: undefined
    };
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(_prevProps) {}
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      getResizable: this.getResizable,
      registerEvent: function () {
        let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mouse';
        let window = _this.foundation.window;
        if (type === 'mouse') {
          window === null || window === void 0 ? void 0 : window.addEventListener('mouseup', _this.foundation.onMouseUp);
          window === null || window === void 0 ? void 0 : window.addEventListener('mousemove', _this.foundation.onMouseMove);
          window === null || window === void 0 ? void 0 : window.addEventListener('mouseleave', _this.foundation.onMouseUp);
        } else {
          window === null || window === void 0 ? void 0 : window.addEventListener('touchmove', _this.foundation.onTouchMove, {
            passive: false
          });
          window === null || window === void 0 ? void 0 : window.addEventListener('touchend', _this.foundation.onMouseUp);
          window === null || window === void 0 ? void 0 : window.addEventListener('touchcancel', _this.foundation.onMouseUp);
        }
      },
      unregisterEvent: function () {
        let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mouse';
        let window = _this.foundation.window;
        if (type === 'mouse') {
          window === null || window === void 0 ? void 0 : window.removeEventListener('mouseup', _this.foundation.onMouseUp);
          window === null || window === void 0 ? void 0 : window.removeEventListener('mousemove', _this.foundation.onMouseMove);
          window === null || window === void 0 ? void 0 : window.removeEventListener('mouseleave', _this.foundation.onMouseUp);
        } else {
          window === null || window === void 0 ? void 0 : window.removeEventListener('touchmove', _this.foundation.onTouchMove, {
            passive: false
          });
          window === null || window === void 0 ? void 0 : window.removeEventListener('touchend', _this.foundation.onMouseUp);
          window === null || window === void 0 ? void 0 : window.removeEventListener('touchcancel', _this.foundation.onMouseUp);
        }
      }
    });
  }
  render() {
    var _a;
    const {
      className,
      style,
      children,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth
    } = this.props;
    const resizeStyle = Object.assign(Object.assign({
      userSelect: this.state.isResizing ? 'none' : 'auto',
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      minWidth: minWidth,
      minHeight: minHeight
    }, style), this.foundation.sizeStyle);
    if ((_a = this.state) === null || _a === void 0 ? void 0 : _a.flexBasis) {
      style.flexBasis = this.state.flexBasis;
    }
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      style: resizeStyle,
      className: (0, _classnames.default)(className, prefixCls + '-resizable'),
      ref: this.resizableRef
    }, this.getDataAttr(this.props)), this.state.isResizing && /*#__PURE__*/_react.default.createElement("div", {
      style: this.state.backgroundStyle,
      className: (0, _classnames.default)(className, prefixCls + '-background')
    }), children, this.renderResizeHandler());
  }
}
Resizable.propTypes = {
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  grid: _propTypes.default.arrayOf(_propTypes.default.number),
  snap: _propTypes.default.shape({
    x: _propTypes.default.arrayOf(_propTypes.default.number),
    y: _propTypes.default.arrayOf(_propTypes.default.number)
  }),
  snapGap: _propTypes.default.number,
  bounds: _propTypes.default.oneOf(['parent', 'window', _propTypes.default.node]),
  boundsByDirection: _propTypes.default.bool,
  size: _propTypes.default.object,
  minWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  minHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  maxWidth: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  maxHeight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  lockAspectRatio: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.number]),
  lockAspectRatioExtraWidth: _propTypes.default.number,
  lockAspectRatioExtraHeight: _propTypes.default.number,
  enable: _propTypes.default.object,
  handleStyle: _propTypes.default.object,
  handleClass: _propTypes.default.object,
  handleWrapperStyle: _propTypes.default.object,
  handleWrapperClass: _propTypes.default.string,
  handleNode: _propTypes.default.object,
  children: _propTypes.default.object,
  onResizeStart: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onResizeEnd: _propTypes.default.func,
  defaultSize: _propTypes.default.object,
  scale: _propTypes.default.number,
  ratio: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.arrayOf(_propTypes.default.number)])
};
Resizable.defaultProps = {
  onResizeStart: () => {},
  onChange: () => {},
  onResizeEnd: () => {},
  enable: {
    top: true,
    right: true,
    bottom: true,
    left: true,
    topRight: true,
    bottomRight: true,
    bottomLeft: true,
    topLeft: true
  },
  style: {},
  grid: [1, 1],
  lockAspectRatio: false,
  lockAspectRatioExtraWidth: 0,
  lockAspectRatioExtraHeight: 0,
  scale: 1,
  ratio: 1,
  snapGap: 0
};
var _default = exports.default = Resizable;