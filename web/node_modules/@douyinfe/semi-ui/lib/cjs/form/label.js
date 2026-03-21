"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/form/constants");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
class Label extends _react.PureComponent {
  render() {
    const {
      children,
      required,
      text,
      disabled,
      name,
      width,
      align,
      style,
      className,
      extra,
      id,
      optional
    } = this.props;
    const labelCls = (0, _classnames.default)(className, {
      [`${prefixCls}-field-label`]: true,
      [`${prefixCls}-field-label-left`]: align === 'left',
      [`${prefixCls}-field-label-right`]: align === 'right',
      [`${prefixCls}-field-label-required`]: required,
      [`${prefixCls}-field-label-disabled`]: disabled,
      [`${prefixCls}-field-label-with-extra`]: extra
    });
    const labelStyle = style ? style : {};
    width ? labelStyle.width = width : null;
    const optionalText = /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Form"
    }, locale => (/*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-field-label-optional-text`
    }, locale.optional)));
    const textContent = /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-field-label-text`,
      "x-semi-prop": "label"
    }, typeof text !== 'undefined' ? text : children, optional ? optionalText : null);
    const contentWithExtra = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, textContent, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-field-label-extra`
    }, extra));
    return /*#__PURE__*/_react.default.createElement("label", {
      className: labelCls,
      htmlFor: name,
      style: labelStyle,
      id: id
    }, extra ? contentWithExtra : textContent);
  }
}
exports.default = Label;
Label.defaultProps = {
  required: false,
  name: '',
  align: 'left',
  className: '',
  optional: false
};
Label.propTypes = {
  id: _propTypes.default.string,
  children: _propTypes.default.node,
  required: _propTypes.default.bool,
  text: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  name: _propTypes.default.string,
  align: _propTypes.default.string,
  width: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  extra: _propTypes.default.node,
  optional: _propTypes.default.bool
};