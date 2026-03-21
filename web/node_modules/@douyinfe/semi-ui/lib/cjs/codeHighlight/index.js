"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _codeHighlight = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/codeHighlight"));
require("@douyinfe/semi-foundation/lib/cjs/codeHighlight/codeHighlight.css");
var _utils = require("../_utils");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/codeHighlight/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class CodeHighlight extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.codeRef = /*#__PURE__*/React.createRef();
    this.foundation = new _codeHighlight.default(this.adapter);
    this.state = {};
  }
  get adapter() {
    return Object.assign({}, super.adapter);
  }
  componentDidMount() {
    super.componentDidMount();
    if (this.codeRef.current) {
      this.foundation.highlightCode(this.codeRef.current, this.props.language);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.codeRef.current && prevProps.code !== this.props.code || this.props.language !== this.props.language) {
      this.foundation.highlightCode(this.codeRef.current, this.props.language);
    }
  }
  render() {
    return /*#__PURE__*/React.createElement("div", Object.assign({
      style: this.props.style,
      className: (0, _classnames.default)(this.props.className, _constants.cssClasses.PREFIX, "semi-light-scrollbar", {
        [`${_constants.cssClasses.PREFIX}-defaultTheme`]: this.props.defaultTheme
      })
    }, this.getDataAttr(this.props)), /*#__PURE__*/React.createElement("pre", null, /*#__PURE__*/React.createElement("code", {
      ref: this.codeRef
    }, this.props.code)));
  }
}
CodeHighlight.__SemiComponentName__ = "CodeHighlight";
CodeHighlight.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.any,
  code: _propTypes.default.string,
  language: _propTypes.default.string,
  lineNumber: _propTypes.default.bool,
  defaultTheme: _propTypes.default.bool
};
CodeHighlight.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(CodeHighlight.__SemiComponentName__, {
  lineNumber: true,
  defaultTheme: true
});
var _default = exports.default = CodeHighlight;