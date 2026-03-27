"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/autoComplete/constants");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
var _semiIcons = require("@douyinfe/semi-icons");
var _highlight = _interopRequireDefault(require("../highlight"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class Option extends _react.PureComponent {
  onClick(_a, event) {
    var {
        value,
        label,
        children
      } = _a,
      rest = __rest(_a, ["value", "label", "children"]);
    const {
      props
    } = this;
    const isDisabled = props.disabled;
    if (!isDisabled) {
      props.onSelect(Object.assign(Object.assign({}, rest), {
        value,
        label: label || children
      }), event);
    }
  }
  renderOptionContent(_ref) {
    let {
      children,
      inputValue,
      prefixCls
    } = _ref;
    if ((0, _isString2.default)(children) && inputValue) {
      return /*#__PURE__*/_react.default.createElement(_highlight.default, {
        searchWords: [inputValue],
        sourceString: children,
        highlightClassName: `${prefixCls}-keyword`
      });
    }
    return children;
  }
  render() {
    const _a = this.props,
      {
        children,
        disabled,
        value,
        selected,
        label,
        empty,
        emptyContent,
        onSelect,
        focused,
        showTick,
        className,
        style,
        onMouseEnter,
        prefixCls,
        renderOptionItem,
        inputValue
      } = _a,
      rest = __rest(_a, ["children", "disabled", "value", "selected", "label", "empty", "emptyContent", "onSelect", "focused", "showTick", "className", "style", "onMouseEnter", "prefixCls", "renderOptionItem", "inputValue"]);
    const optionClassName = (0, _classnames.default)(prefixCls, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-selected`]: selected,
      [`${prefixCls}-focused`]: focused,
      [`${prefixCls}-empty`]: empty,
      [className]: className
    });
    const selectedIconClassName = (0, _classnames.default)([`${prefixCls}-icon`]);
    if (empty) {
      if (emptyContent === null) {
        return null;
      }
      return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "Select"
      }, locale => (/*#__PURE__*/_react.default.createElement("div", {
        className: optionClassName,
        "x-semi-prop": "emptyContent"
      }, emptyContent || locale.emptyText)));
    }
    // Since there are empty, locale and other logic, the custom renderOptionItem is directly converged to the internal option instead of being placed in Select/index
    if (typeof renderOptionItem === 'function') {
      return renderOptionItem(Object.assign({
        disabled,
        focused,
        selected,
        style,
        label,
        value,
        inputValue,
        onMouseEnter: e => onMouseEnter(e),
        onClick: e => this.onClick(Object.assign({
          value,
          label,
          children
        }, rest), e)
      }, rest));
    }
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events
      _react.default.createElement("div", {
        className: optionClassName,
        onClick: e => {
          this.onClick(Object.assign({
            value,
            label,
            children
          }, rest), e);
        },
        onMouseEnter: e => onMouseEnter && onMouseEnter(e),
        role: "option",
        "aria-selected": selected ? "true" : "false",
        "aria-disabled": disabled ? "true" : "false",
        style: style
      }, showTick ? (/*#__PURE__*/_react.default.createElement("div", {
        className: selectedIconClassName
      }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconTick, null))) : null, (0, _isString2.default)(children) ? /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-text`
      }, this.renderOptionContent({
        children,
        inputValue,
        prefixCls
      })) : children)
    );
  }
}
Option.isSelectOption = true;
Option.propTypes = {
  children: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  selected: _propTypes.default.bool,
  label: _propTypes.default.node,
  empty: _propTypes.default.bool,
  emptyContent: _propTypes.default.node,
  onSelect: _propTypes.default.func,
  focused: _propTypes.default.bool,
  showTick: _propTypes.default.bool,
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  onMouseEnter: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  renderOptionItem: _propTypes.default.func,
  inputValue: _propTypes.default.string
};
Option.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX_OPTION
};
var _default = exports.default = Option;