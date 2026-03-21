"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/navigation/constants");
var _CollapseButton = _interopRequireDefault(require("./CollapseButton"));
require("@douyinfe/semi-foundation/lib/cjs/navigation/navigation.css");
var _navContext = _interopRequireDefault(require("./nav-context"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NavFooter extends _react.PureComponent {
  constructor() {
    super(...arguments);
    this.renderCollapseButton = () => {
      const {
        collapseButton,
        collapseText
      } = this.props;
      if (/*#__PURE__*/_react.default.isValidElement(collapseButton)) {
        return collapseButton;
      }
      const {
        onCollapseChange,
        prefixCls,
        locale,
        isCollapsed
      } = this.context;
      return /*#__PURE__*/_react.default.createElement(_CollapseButton.default, {
        prefixCls: prefixCls,
        isCollapsed: isCollapsed,
        locale: locale,
        onClick: onCollapseChange,
        collapseText: collapseText
      });
    };
  }
  render() {
    const {
      style,
      className,
      collapseButton,
      onClick
    } = this.props;
    let {
      children
    } = this.props;
    const {
      isCollapsed,
      mode
    } = this.context;
    if (! /*#__PURE__*/_react.default.isValidElement(children) && collapseButton && mode !== _constants.strings.MODE_HORIZONTAL) {
      children = this.renderCollapseButton();
    }
    const wrapCls = (0, _classnames.default)(className, `${_constants.cssClasses.PREFIX}-footer`, {
      [`${_constants.cssClasses.PREFIX}-footer-collapsed`]: isCollapsed
    });
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      _react.default.createElement("div", {
        className: wrapCls,
        style: style,
        onClick: onClick
      }, children)
    );
  }
}
exports.default = NavFooter;
NavFooter.contextType = _navContext.default;
NavFooter.propTypes = {
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  collapseButton: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.bool]),
  collapseText: _propTypes.default.func,
  onClick: _propTypes.default.func
};
NavFooter.defaultProps = {
  collapseButton: false,
  onClick: _noop2.default
};
NavFooter.elementType = "NavFooter";