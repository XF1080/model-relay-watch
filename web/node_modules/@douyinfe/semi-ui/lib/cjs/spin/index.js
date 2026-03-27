"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/spin/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/spin/foundation"));
var _icon = _interopRequireDefault(require("./icon"));
require("@douyinfe/semi-foundation/lib/cjs/spin/spin.css");
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
const prefixCls = _constants.cssClasses.PREFIX;
class Spin extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.foundation = new _foundation.default(this.adapter);
    this.state = {
      delay: props.delay,
      loading: true
    };
  }
  static getDerivedStateFromProps(props) {
    if (!props.delay) {
      return {
        loading: props.spinning
      };
    }
    if (props.spinning === false) {
      return {
        delay: 0,
        loading: false
      };
    }
    return {
      delay: props.delay
    };
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setLoading: value => {
        this.setState({
          loading: value
        });
      }
    });
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  renderSpin() {
    const {
      indicator,
      tip
    } = this.props;
    const {
      loading
    } = this.state;
    return loading ? /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-wrapper`
    }, indicator ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-animate`,
      "x-semi-prop": "indicator"
    }, indicator)) : (/*#__PURE__*/_react.default.createElement(_icon.default, null)), tip ? /*#__PURE__*/_react.default.createElement("div", {
      "x-semi-prop": "tip"
    }, tip) : null) : null;
  }
  render() {
    this.foundation.updateLoadingIfNeedDelay();
    const _a = this.props,
      {
        children,
        style,
        wrapperClassName,
        childStyle,
        size
      } = _a,
      rest = __rest(_a, ["children", "style", "wrapperClassName", "childStyle", "size"]);
    const {
      loading
    } = this.state;
    const spinCls = (0, _classnames.default)(prefixCls, wrapperClassName, {
      [`${prefixCls}-${size}`]: size,
      [`${prefixCls}-block`]: children,
      [`${prefixCls}-hidden`]: !loading
    });
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: spinCls,
      style: style
    }, this.getDataAttr(rest)), this.renderSpin(), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-children`,
      style: childStyle,
      "x-semi-prop": "children"
    }, children));
  }
}
Spin.propTypes = {
  size: _propTypes.default.oneOf(_constants.strings.SIZE),
  spinning: _propTypes.default.bool,
  children: _propTypes.default.node,
  indicator: _propTypes.default.node,
  delay: _propTypes.default.number,
  tip: _propTypes.default.node,
  wrapperClassName: _propTypes.default.string,
  childStyle: _propTypes.default.object,
  style: _propTypes.default.object
};
Spin.__SemiComponentName__ = "Spin";
Spin.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Spin.__SemiComponentName__, {
  size: 'middle',
  spinning: true,
  children: null,
  indicator: null,
  delay: 0
});
var _default = exports.default = Spin;