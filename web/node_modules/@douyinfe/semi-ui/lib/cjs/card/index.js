"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/card/constants");
require("@douyinfe/semi-foundation/lib/cjs/card/card.css");
var _meta = _interopRequireDefault(require("./meta"));
var _classnames = _interopRequireDefault(require("classnames"));
var _skeleton = _interopRequireDefault(require("../skeleton"));
var _typography = _interopRequireDefault(require("../typography"));
var _space = _interopRequireDefault(require("../space"));
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
const prefixcls = _constants.cssClasses.PREFIX;
class Card extends _react.PureComponent {
  constructor() {
    super(...arguments);
    this.renderHeader = () => {
      const {
        title,
        headerExtraContent,
        header,
        headerLine,
        headerStyle
      } = this.props;
      const headerCls = (0, _classnames.default)(`${prefixcls}-header`, {
        [`${prefixcls}-header-bordered`]: Boolean(headerLine)
      });
      const headerWrapperCls = (0, _classnames.default)(`${prefixcls}-header-wrapper`);
      const titleCls = (0, _classnames.default)(`${prefixcls}-header-wrapper-title`, {
        [`${prefixcls}-header-wrapper-spacing`]: Boolean(headerExtraContent)
      });
      if (header || headerExtraContent || title) {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: headerStyle,
          className: headerCls
        }, header || (
        /*#__PURE__*/
        // Priority of header over title and headerExtraContent
        _react.default.createElement("div", {
          className: headerWrapperCls
        }, headerExtraContent && (/*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixcls}-header-wrapper-extra`,
          "x-semi-prop": "headerExtraContent"
        }, headerExtraContent)), title && (/*#__PURE__*/_react.default.createElement("div", {
          className: titleCls
        }, (0, _isString2.default)(title) ? (/*#__PURE__*/_react.default.createElement(_typography.default.Title, {
          heading: 6,
          ellipsis: {
            showTooltip: true,
            rows: 1
          },
          "x-semi-prop": "title"
        }, title)) : title)))));
      }
      return null;
    };
    this.renderCover = () => {
      const {
        cover
      } = this.props;
      const coverCls = (0, _classnames.default)(`${prefixcls}-cover`);
      return cover && (/*#__PURE__*/_react.default.createElement("div", {
        className: coverCls,
        "x-semi-prop": "cover"
      }, cover));
    };
    this.renderBody = () => {
      const {
        bodyStyle,
        children,
        actions,
        loading
      } = this.props;
      const bodyCls = (0, _classnames.default)(`${prefixcls}-body`);
      const actionsCls = (0, _classnames.default)(`${prefixcls}-body-actions`);
      const actionsItemCls = (0, _classnames.default)(`${prefixcls}-body-actions-item`);
      const placeholder = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_skeleton.default.Title, null), /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_skeleton.default.Paragraph, {
        rows: 3
      }));
      return /*#__PURE__*/_react.default.createElement("div", {
        style: bodyStyle,
        className: bodyCls
      }, children && (/*#__PURE__*/_react.default.createElement(_skeleton.default, {
        placeholder: placeholder,
        loading: loading,
        active: true
      }, children)), Array.isArray(actions) && (/*#__PURE__*/_react.default.createElement("div", {
        className: actionsCls
      }, /*#__PURE__*/_react.default.createElement(_space.default, {
        spacing: 12
      }, actions.map((item, idx) => (/*#__PURE__*/_react.default.createElement("div", {
        key: idx,
        className: actionsItemCls,
        "x-semi-prop": `actions.${idx}`
      }, item)))))));
    };
    this.renderFooter = () => {
      const {
        footer,
        footerLine,
        footerStyle
      } = this.props;
      const footerCls = (0, _classnames.default)(`${prefixcls}-footer`, {
        [`${prefixcls}-footer-bordered`]: footerLine
      });
      return footer && (/*#__PURE__*/_react.default.createElement("div", {
        style: footerStyle,
        className: footerCls,
        "x-semi-prop": "footer"
      }, footer));
    };
  }
  render() {
    const _a = this.props,
      {
        bordered,
        shadows,
        style,
        className
      } = _a,
      otherProps = __rest(_a, ["bordered", "shadows", "style", "className"]);
    const others = (0, _omit2.default)(otherProps, ['actions', 'bodyStyle', 'cover', 'headerExtraContent', 'footer', 'footerLine', 'footerStyle', 'header', 'headerLine', 'headerStyle', 'loading', 'title']);
    const cardCls = (0, _classnames.default)(prefixcls, className, {
      [`${prefixcls}-bordered`]: bordered,
      [`${prefixcls}-shadows`]: shadows,
      [`${prefixcls}-shadows-${shadows}`]: shadows
    });
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, others, {
      "aria-busy": this.props.loading,
      className: cardCls,
      style: style
    }), this.renderHeader(), this.renderCover(), this.renderBody(), this.renderFooter());
  }
}
Card.Meta = _meta.default;
Card.propTypes = {
  actions: _propTypes.default.array,
  bodyStyle: _propTypes.default.object,
  bordered: _propTypes.default.bool,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  cover: _propTypes.default.node,
  footer: _propTypes.default.node,
  footerLine: _propTypes.default.bool,
  footerStyle: _propTypes.default.object,
  header: _propTypes.default.node,
  headerExtraContent: _propTypes.default.node,
  headerLine: _propTypes.default.bool,
  headerStyle: _propTypes.default.object,
  loading: _propTypes.default.bool,
  shadows: _propTypes.default.oneOf(_constants.strings.SHADOWS),
  style: _propTypes.default.object,
  title: _propTypes.default.node,
  'aria-label': _propTypes.default.string
};
Card.defaultProps = {
  bordered: true,
  footerLine: false,
  headerLine: true,
  loading: false
};
var _default = exports.default = Card;