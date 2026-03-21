"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _isNullOrUndefined = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/isNullOrUndefined"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/navigation/constants");
require("@douyinfe/semi-foundation/lib/cjs/navigation/navigation.css");
var _navContext = _interopRequireDefault(require("./nav-context"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class NavHeader extends _react.PureComponent {
  renderLogo(logo) {
    if (/*#__PURE__*/_react.default.isValidElement(logo)) {
      return logo;
    }
    return null;
  }
  render() {
    const {
      children,
      style,
      className,
      logo,
      text,
      link,
      linkOptions,
      prefixCls
    } = this.props;
    const {
      isCollapsed
    } = this.context;
    const wrapCls = (0, _classnames.default)(className, `${_constants.cssClasses.PREFIX}-header`, {
      [`${_constants.cssClasses.PREFIX}-header-collapsed`]: isCollapsed
    });
    let wrappedChildren = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, logo ? /*#__PURE__*/_react.default.createElement("i", {
      className: `${_constants.cssClasses.PREFIX}-header-logo`
    }, this.renderLogo(logo)) : null, !(0, _isNullOrUndefined.default)(text) && !isCollapsed ? (/*#__PURE__*/_react.default.createElement("span", {
      className: `${_constants.cssClasses.PREFIX}-header-text`
    }, text)) : null, children);
    if (typeof link === 'string') {
      wrappedChildren = /*#__PURE__*/_react.default.createElement("a", Object.assign({
        className: `${prefixCls}-header-link`,
        href: link
      }, linkOptions), wrappedChildren);
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: wrapCls,
      style: style
    }, wrappedChildren);
  }
}
exports.default = NavHeader;
NavHeader.contextType = _navContext.default;
NavHeader.propTypes = {
  prefixCls: _propTypes.default.string,
  logo: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object, _propTypes.default.node]),
  text: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  link: _propTypes.default.string,
  linkOptions: _propTypes.default.object
};
NavHeader.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX
};
NavHeader.elementType = "NavHeader";