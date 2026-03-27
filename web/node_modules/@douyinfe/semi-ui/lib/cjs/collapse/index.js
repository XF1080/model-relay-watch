"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/collapse/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/collapse/foundation"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _item = _interopRequireDefault(require("./item"));
require("@douyinfe/semi-foundation/lib/cjs/collapse/collapse.css");
var _function = require("@douyinfe/semi-foundation/lib/cjs/utils/function");
var _collapseContext = _interopRequireDefault(require("./collapse-context"));
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
class Collapse extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.onChange = (activeKey, e) => {
      this.foundation.handleChange(activeKey, e);
    };
    this.foundation = new _foundation.default(this.adapter);
    const initKeys = this.foundation.initActiveKey();
    this.state = {
      activeSet: new Set(initKeys)
    };
    this.onChange = this.onChange.bind(this);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      handleChange: (activeKey, e) => this.props.onChange(activeKey, e),
      addActiveKey: activeSet => this.setState({
        activeSet
      })
    });
  }
  static getDerivedStateFromProps(props, state) {
    if (props.activeKey) {
      const keys = Array.isArray(props.activeKey) ? props.activeKey : [props.activeKey];
      const newSet = new Set(keys);
      if (!(0, _isEqual2.default)(newSet, state.activeSet)) {
        return Object.assign(Object.assign({}, state), {
          activeSet: newSet
        });
      }
      return state;
    }
    return state;
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const _a = this.props,
      {
        defaultActiveKey,
        lazyRender,
        accordion,
        style,
        motion,
        className,
        keepDOM,
        expandIconPosition,
        expandIcon,
        collapseIcon,
        children,
        clickHeaderToExpand
      } = _a,
      rest = __rest(_a, ["defaultActiveKey", "lazyRender", "accordion", "style", "motion", "className", "keepDOM", "expandIconPosition", "expandIcon", "collapseIcon", "children", "clickHeaderToExpand"]);
    const clsPrefix = (0, _classnames.default)(_constants.cssClasses.PREFIX, className);
    const {
      activeSet
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: clsPrefix,
      style: style
    }, this.getDataAttr(this.props)), /*#__PURE__*/_react.default.createElement(_collapseContext.default.Provider, {
      value: {
        activeSet,
        expandIcon,
        collapseIcon,
        clickHeaderToExpand,
        keepDOM,
        expandIconPosition,
        onClick: this.onChange,
        motion,
        lazyRender
      }
    }, children));
  }
}
Collapse.Panel = _item.default;
Collapse.propTypes = {
  activeKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  defaultActiveKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  accordion: _propTypes.default.bool,
  clickHeaderToExpand: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  expandIcon: _propTypes.default.node,
  collapseIcon: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  keepDOM: _propTypes.default.bool,
  motion: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func, _propTypes.default.object]),
  expandIconPosition: _propTypes.default.oneOf(_constants.strings.iconPosition),
  lazyRender: _propTypes.default.bool
};
Collapse.__SemiComponentName__ = 'Collapse';
Collapse.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Collapse.__SemiComponentName__, {
  defaultActiveKey: '',
  clickHeaderToExpand: true,
  onChange: _function.noop,
  expandIconPosition: 'right',
  lazyRender: false
});
var _default = exports.default = Collapse;