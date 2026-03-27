"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/highlight/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/highlight/foundation"));
require("@douyinfe/semi-foundation/lib/cjs/highlight/highlight.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
class Highlight extends _react.PureComponent {
  constructor() {
    super(...arguments);
    this.getHighLightTextHTML = _ref => {
      let {
        sourceString = '',
        searchWords = [],
        option = {
          autoEscape: true,
          caseSensitive: false
        }
      } = _ref;
      const chunks = new _foundation.default().findAll(Object.assign({
        sourceString,
        searchWords
      }, option));
      const markEle = option.highlightTag || 'mark';
      const highlightClassName = option.highlightClassName || '';
      const highlightStyle = option.highlightStyle || {};
      return chunks.map((chunk, index) => {
        const {
          end,
          start,
          highlight,
          style,
          className
        } = chunk;
        const text = sourceString.substr(start, end - start);
        if (highlight) {
          return /*#__PURE__*/_react.default.createElement(markEle, {
            style: Object.assign(Object.assign({}, highlightStyle), style),
            className: `${highlightClassName} ${className || ''}`.trim(),
            key: text + index
          }, text);
        } else {
          return text;
        }
      });
    };
  }
  render() {
    const {
      searchWords,
      sourceString,
      component,
      highlightClassName,
      highlightStyle,
      caseSensitive,
      autoEscape
    } = this.props;
    const tagCls = (0, _classnames.default)({
      [`${prefixCls}-tag`]: true
    }, highlightClassName);
    const option = {
      highlightTag: component,
      highlightClassName: tagCls,
      highlightStyle,
      caseSensitive,
      autoEscape
    };
    return this.getHighLightTextHTML({
      sourceString,
      searchWords,
      option
    });
  }
}
Highlight.propTypes = {
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  autoEscape: _propTypes.default.bool,
  caseSensitive: _propTypes.default.bool,
  sourceString: _propTypes.default.string,
  searchWords: _propTypes.default.arrayOf(_propTypes.default.string),
  highlightStyle: _propTypes.default.object,
  highlightClassName: _propTypes.default.string,
  component: _propTypes.default.string
};
Highlight.defaultProps = {
  component: 'mark',
  autoEscape: true,
  caseSensitive: false,
  sourceString: ''
};
var _default = exports.default = Highlight;