"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/table/constants");
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _isEnterPress = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/isEnterPress"));
var _utils = require("./utils");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ColumnSorter extends _react.PureComponent {
  render() {
    const {
      prefixCls,
      onClick,
      sortOrder,
      style,
      title,
      sortIcon,
      showTooltip
    } = this.props;
    const iconBtnSize = 'default';
    const upCls = (0, _classnames.default)(`${prefixCls}-column-sorter-up`, {
      on: sortOrder === _constants.strings.SORT_DIRECTIONS[0]
    });
    const downCls = (0, _classnames.default)(`${prefixCls}-column-sorter-down`, {
      on: sortOrder === _constants.strings.SORT_DIRECTIONS[1]
    });
    const ariaProps = {
      /**
       * Set 'aria-sort' to aria-columnheader is difficult, so set 'aria-label' about sort info to sorter
       * reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaSort
       */
      'aria-label': `Current sort order is ${sortOrder ? `${sortOrder}ing` : 'none'}`,
      'aria-roledescription': 'Sort data with this column'
    };
    const renderSortIcon = () => {
      if (typeof sortIcon === 'function') {
        return sortIcon({
          sortOrder
        });
      } else {
        const node = /*#__PURE__*/_react.default.createElement("div", {
          style: style,
          className: `${prefixCls}-column-sorter`
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: `${upCls}`
        }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconCaretup, {
          size: iconBtnSize
        })), /*#__PURE__*/_react.default.createElement("span", {
          className: `${downCls}`
        }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconCaretdown, {
          size: iconBtnSize
        })));
        if (showTooltip) {
          let content = (0, _utils.getNextSortOrder)(sortOrder);
          return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
            componentName: "Table"
          }, (locale, localeCode) => (/*#__PURE__*/_react.default.createElement(_tooltip.default, {
            content: locale[content]
          }, node)));
        }
        return node;
      }
    };
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      role: "button"
    }, ariaProps, {
      tabIndex: -1,
      className: `${prefixCls}-column-sorter-wrapper`,
      onClick: onClick,
      onKeyPress: e => (0, _isEnterPress.default)(e) && onClick(e)
    }), title, renderSortIcon());
  }
}
exports.default = ColumnSorter;
ColumnSorter.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  onClick: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  sortOrder: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  sortIcon: _propTypes.default.func,
  showTooltip: _propTypes.default.bool
};
ColumnSorter.defaultProps = {
  prefixCls: _constants.cssClasses.PREFIX,
  onClick: _noop2.default,
  sortOrder: false,
  showTooltip: false
};