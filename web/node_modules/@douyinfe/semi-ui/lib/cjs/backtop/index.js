"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _throttle2 = _interopRequireDefault(require("lodash/throttle"));
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/backtop/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/backtop/foundation"));
require("@douyinfe/semi-foundation/lib/cjs/backtop/backtop.css");
var _iconButton = _interopRequireDefault(require("../iconButton"));
var _semiIcons = require("@douyinfe/semi-icons");
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
const getDefaultTarget = () => window;
class BackTop extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.foundation = new _foundation.default(this.adapter);
  }
  componentDidMount() {
    var _a;
    this.foundation.init();
    this.handler = (0, _throttle2.default)(this.handleClick, (_a = this.props.duration) !== null && _a !== void 0 ? _a : BackTop.defaultProps.duration);
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      updateVisible: visible => {
        this.setState({
          visible
        });
      },
      notifyClick: e => {
        this.props.onClick && this.props.onClick(e);
      },
      targetIsWindow: target => target === window,
      isWindowUndefined: () => window === undefined,
      targetScrollToTop: (targetNode, scrollTop) => {
        if (targetNode === window) {
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
        } else {
          targetNode.scrollTop = scrollTop;
        }
      }
    });
  }
  handleClick(e) {
    this.foundation.onClick(e);
  }
  renderDefault() {
    return /*#__PURE__*/_react.default.createElement(_iconButton.default, {
      theme: "light",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronUp, null)
    });
  }
  render() {
    const _a = this.props,
      {
        children,
        className,
        style,
        onClick,
        visibilityHeight,
        target
      } = _a,
      others = __rest(_a, ["children", "className", "style", "onClick", "visibilityHeight", "target"]);
    const {
      visible
    } = this.state;
    const preCls = (0, _classnames.default)(prefixCls, className);
    const backtopBtn = children ? children : this.renderDefault();
    const content = visible ? (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    _react.default.createElement("div", Object.assign({}, others, {
      className: preCls,
      style: style,
      onClick: e => this.handler(e),
      "x-semi-prop": "children"
    }), backtopBtn)) : null;
    return content;
  }
}
exports.default = BackTop;
BackTop.__SemiComponentName__ = "BackTop";
BackTop.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(BackTop.__SemiComponentName__, {
  visibilityHeight: 400,
  target: getDefaultTarget,
  duration: 450
});
BackTop.propTypes = {
  target: _propTypes.default.func,
  visibilityHeight: _propTypes.default.number,
  duration: _propTypes.default.number,
  onClick: _propTypes.default.func,
  style: _propTypes.default.object,
  className: _propTypes.default.string
};