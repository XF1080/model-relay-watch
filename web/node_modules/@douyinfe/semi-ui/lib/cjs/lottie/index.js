"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var React = _interopRequireWildcard(require("react"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/lottie/foundation"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/lottie/constants");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("../_utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Lottie extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.container = /*#__PURE__*/React.createRef();
    this.foundation = new _foundation.default(this.adapter);
  }
  get adapter() {
    const getContainer = () => {
      var _a;
      return (_a = this.props.params.container) !== null && _a !== void 0 ? _a : this.container.current;
    };
    return Object.assign(Object.assign({}, super.adapter), {
      getContainer,
      getLoadParams: () => {
        return Object.assign({
          container: getContainer(),
          renderer: "svg",
          loop: true,
          autoplay: true
        }, this.props.params);
      }
    });
  }
  componentDidMount() {
    var _a, _b;
    super.componentDidMount();
    (_b = (_a = this.props).getAnimationInstance) === null || _b === void 0 ? void 0 : _b.call(_a, this.foundation.animation);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!(0, _isEqual2.default)(prevProps.params, this.props.params)) {
      this.foundation.handleParamsUpdate();
    }
  }
  get wrapperStyle() {
    return Object.assign({
      width: this.props.width,
      height: this.props.height
    }, this.props.style);
  }
  get wrapperClassName() {
    return (0, _classnames.default)(_constants.cssClasses.PREFIX, this.props.className);
  }
  render() {
    if (this.props.params.container) {
      return null;
    } else {
      return /*#__PURE__*/React.createElement("div", Object.assign({
        ref: this.container,
        style: this.wrapperStyle,
        className: this.wrapperClassName
      }, this.getDataAttr(this.props)));
    }
  }
}
Lottie.__SemiComponentName__ = "Lottie";
Lottie.getLottie = _foundation.default.getLottie;
Lottie.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Lottie.__SemiComponentName__);
Lottie.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  width: _propTypes.default.string,
  height: _propTypes.default.string,
  params: _propTypes.default.object,
  getAnimationInstance: _propTypes.default.func
};
var _default = exports.default = Lottie;