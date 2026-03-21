"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/collapse/constants");
var _collapsible = _interopRequireDefault(require("../collapsible"));
var _collapseContext = _interopRequireDefault(require("./collapse-context"));
var _semiIcons = require("@douyinfe/semi-icons");
var _uuid = require("@douyinfe/semi-foundation/lib/cjs/utils/uuid");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class CollapsePanel extends _react.PureComponent {
  constructor() {
    super(...arguments);
    this.headerExpandIconTriggerRef = /*#__PURE__*/_react.default.createRef();
    this.ariaID = "";
    this.handleClick = (itemKey, e) => {
      var _a;
      // Judge user click Icon or Header
      // Don't mount this func into icon span wrapper, or get triggered twice because of event propagation
      if (this.context.clickHeaderToExpand || ((_a = this.headerExpandIconTriggerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
        this.context.onClick(itemKey, e);
      }
    };
  }
  componentDidMount() {
    this.ariaID = (0, _uuid.getUuidShort)({});
  }
  renderHeader(active) {
    let expandIconEnable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const {
      showArrow,
      header,
      extra
    } = this.props;
    let {
      expandIcon,
      collapseIcon
    } = this.context;
    const {
      expandIconPosition
    } = this.context;
    if (typeof expandIcon === 'undefined') {
      expandIcon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronDown, null);
    }
    if (typeof collapseIcon === 'undefined') {
      collapseIcon = /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronUp, null);
    }
    const icon = /*#__PURE__*/_react.default.createElement("span", {
      ref: this.headerExpandIconTriggerRef,
      "aria-hidden": 'true',
      className: (0, _classnames.default)([`${_constants.cssClasses.PREFIX}-header-icon`, {
        [`${_constants.cssClasses.PREFIX}-header-iconDisabled`]: !expandIconEnable
      }])
    }, expandIconEnable ? active ? collapseIcon : expandIcon : expandIcon);
    const iconPosLeft = expandIconPosition === 'left';
    if (typeof header === 'string') {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showArrow && (iconPosLeft ? icon : null), /*#__PURE__*/_react.default.createElement("span", null, header), /*#__PURE__*/_react.default.createElement("span", {
        className: `${_constants.cssClasses.PREFIX}-header-right`
      }, /*#__PURE__*/_react.default.createElement("span", null, extra), showArrow && (iconPosLeft ? null : icon)));
    }
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showArrow && (iconPosLeft ? icon : null), header, showArrow && (iconPosLeft ? null : icon));
  }
  render() {
    const _a = this.props,
      {
        className,
        children,
        itemKey,
        reCalcKey,
        header,
        extra,
        showArrow,
        disabled
      } = _a,
      restProps = __rest(_a, ["className", "children", "itemKey", "reCalcKey", "header", "extra", "showArrow", "disabled"]);
    const {
      keepDOM,
      expandIconPosition,
      activeSet,
      motion,
      lazyRender
    } = this.context;
    const active = activeSet.has(itemKey);
    const itemCls = (0, _classnames.default)(className, {
      [`${_constants.cssClasses.PREFIX}-item`]: true,
      [`${_constants.cssClasses.PREFIX}-item-active`]: active
    });
    const headerCls = (0, _classnames.default)({
      [`${_constants.cssClasses.PREFIX}-header`]: true,
      [`${_constants.cssClasses.PREFIX}-header-disabled`]: disabled,
      [`${_constants.cssClasses.PREFIX}-header-iconLeft`]: expandIconPosition === 'left'
    });
    const contentCls = (0, _classnames.default)({
      [`${_constants.cssClasses.PREFIX}-content`]: true
    });
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: itemCls
    }, restProps), /*#__PURE__*/_react.default.createElement("div", {
      role: "button",
      tabIndex: 0,
      className: headerCls,
      "aria-disabled": disabled,
      "aria-expanded": active ? 'true' : 'false',
      "aria-owns": this.ariaID,
      onClick: e => !disabled && this.handleClick(itemKey, e)
    }, this.renderHeader(active, children !== undefined && !disabled)), children && (/*#__PURE__*/_react.default.createElement(_collapsible.default, {
      lazyRender: lazyRender,
      isOpen: active,
      keepDOM: keepDOM,
      motion: motion,
      onMotionEnd: this.props.onMotionEnd,
      reCalcKey: reCalcKey
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: contentCls,
      "aria-hidden": !active,
      id: this.ariaID
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${_constants.cssClasses.PREFIX}-content-wrapper`
    }, children)))));
  }
}
exports.default = CollapsePanel;
CollapsePanel.contextType = _collapseContext.default;
CollapsePanel.propTypes = {
  itemKey: _propTypes.default.string,
  extra: _propTypes.default.node,
  header: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  className: _propTypes.default.string,
  reCalcKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  showArrow: _propTypes.default.bool,
  disabled: _propTypes.default.bool
};
CollapsePanel.defaultProps = {
  showArrow: true,
  disabled: false
};