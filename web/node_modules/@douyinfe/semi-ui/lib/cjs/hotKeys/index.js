"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/hotKeys/foundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/hotKeys/constants");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
require("@douyinfe/semi-foundation/lib/cjs/hotKeys/hotKeys.css");
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
class HotKeys extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.state = {};
    this.foundation = new _foundation.default(this.adapter);
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
      notifyHotKey: e => {
        var _a, _b;
        (_b = (_a = this.props).onHotKey) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      },
      registerEvent: () => {
        var _a, _b, _c;
        let target = (_c = (_b = (_a = this.props).getListenerTarget) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : document.body;
        target.addEventListener('keydown', this.foundation.handleKeyDown);
      },
      unregisterEvent: () => {
        var _a, _b, _c;
        let target = (_c = (_b = (_a = this.props).getListenerTarget) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : document.body;
        target.removeEventListener('keydown', this.foundation.handleKeyDown);
      }
    });
  }
  render() {
    const _a = this.props,
      {
        hotKeys,
        content,
        onClick,
        render,
        getListenerTarget,
        className,
        style
      } = _a,
      rest = __rest(_a, ["hotKeys", "content", "onClick", "render", "getListenerTarget", "className", "style"]);
    if (typeof render !== 'undefined') {
      if (render === null || typeof render === 'function' && render() === null) {
        return null;
      }
      return /*#__PURE__*/_react.default.createElement("div", Object.assign({
        onClick: onClick,
        className: (0, _classnames.default)(prefixCls, className),
        style: style
      }, this.getDataAttr(rest)), typeof render === 'function' ? render() : render);
    }
    const renderContent = content !== null && content !== void 0 ? content : hotKeys;
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      onClick: onClick,
      className: (0, _classnames.default)(prefixCls, className),
      style: style
    }, this.getDataAttr(rest)), renderContent.map((key, index) => {
      return index === 0 ? (/*#__PURE__*/_react.default.createElement("span", {
        key: index
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: prefixCls + '-content'
      }, key))) : (/*#__PURE__*/_react.default.createElement("span", {
        key: index
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: prefixCls + '-split'
      }, "+"), /*#__PURE__*/_react.default.createElement("span", {
        className: prefixCls + '-content'
      }, key)));
    }));
  }
}
HotKeys.propTypes = {
  preventDefault: _propTypes.default.bool,
  hotKeys: _propTypes.default.arrayOf(_propTypes.default.string),
  content: _propTypes.default.arrayOf(_propTypes.default.string),
  onClick: _propTypes.default.func,
  onHotKey: _propTypes.default.func,
  mergeMetaCtrl: _propTypes.default.bool,
  render: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]),
  getListenerTarget: _propTypes.default.func,
  className: _propTypes.default.string,
  style: _propTypes.default.object
};
HotKeys.defaultProps = {
  preventDefault: false,
  hotKeys: null,
  content: null,
  onClick: _noop2.default,
  onHotKey: _noop2.default,
  mergeMetaCtrl: false,
  render: undefined,
  getListenerTarget: () => document.body,
  className: '',
  style: null
};
HotKeys.Keys = _constants.Keys;
var _default = exports.default = HotKeys;