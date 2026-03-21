"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _foundation = require("@douyinfe/semi-foundation/lib/cjs/resizable/foundation");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/resizable/constants");
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _resizeContext = require("./resizeContext");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.PREFIX;
class ResizeItem extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.itemRef = /*#__PURE__*/(0, _react.createRef)();
    this.foundation = new _foundation.ResizeItemFoundation(this.adapter);
    this.state = {
      isResizing: false
    };
    this.itemIndex = -1;
  }
  componentDidMount() {
    this.foundation.init();
    const {
      min,
      max,
      onResizeStart,
      onChange,
      onResizeEnd,
      defaultSize
    } = this.props;
    if (this.itemIndex === -1) {
      // 开发过程在StrictMode下context方法会执行两次，需要判断一下是否已经注册过
      this.itemIndex = this.context.registerItem(this.itemRef, min, max, defaultSize, onResizeStart, onChange, onResizeEnd);
    }
    this.direction = this.context.direction; // 留一个direction的引用，方便在componentDidUpdate中判断方向是否有变化
  }
  componentDidUpdate(_prevProps) {
    var _a, _b;
    // 支持动态方向，修改item的style
    if (this.context.direction !== this.direction) {
      this.direction = this.context.direction;
      if (this.direction === 'horizontal') {
        const newWidth = (_a = this.itemRef.current) === null || _a === void 0 ? void 0 : _a.style.height;
        this.itemRef.current.style.width = newWidth;
        this.itemRef.current.style.removeProperty('height');
      } else {
        const newHeight = (_b = this.itemRef.current) === null || _b === void 0 ? void 0 : _b.style.width;
        this.itemRef.current.style.height = newHeight;
        this.itemRef.current.style.removeProperty('width');
      }
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  render() {
    const style = Object.assign({}, this.props.style);
    return /*#__PURE__*/_react.default.createElement("div", {
      style: style,
      className: (0, _classnames.default)(this.props.className, prefixCls + '-item'),
      ref: this.itemRef
    }, this.props.children);
  }
}
ResizeItem.propTypes = {
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  min: _propTypes.default.string,
  max: _propTypes.default.string,
  children: _propTypes.default.object,
  onResizeStart: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onResizeEnd: _propTypes.default.func,
  defaultSize: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])
};
ResizeItem.defaultProps = {
  onResizeStart: _noop2.default,
  onChange: _noop2.default,
  onResizeEnd: _noop2.default
};
ResizeItem.contextType = _resizeContext.ResizeContext;
var _default = exports.default = ResizeItem;