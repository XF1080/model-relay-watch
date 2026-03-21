"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const prefixCls = _constants.cssClasses.PREFIX;
const SuggestionItem = /*#__PURE__*/_react.default.memo(props => {
  const {
    suggestion,
    onClick,
    isActive,
    renderSuggestionItem,
    onMouseEnter,
    index
  } = props;
  const content = typeof suggestion === 'string' ? suggestion : suggestion === null || suggestion === void 0 ? void 0 : suggestion.content;
  const className = (0, _classnames.default)(`${prefixCls}-suggestion-item`, {
    [`${prefixCls}-suggestion-item-active`]: isActive
  });
  const handleClick = (0, _react.useCallback)(() => {
    onClick === null || onClick === void 0 ? void 0 : onClick(suggestion);
  }, [onClick, suggestion]);
  const handleMouseEnter = (0, _react.useCallback)(() => {
    onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter(index);
  }, [index, onMouseEnter]);
  if (renderSuggestionItem) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderSuggestionItem({
      suggestion,
      className,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter
    }));
  }
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    onClick: handleClick,
    onMouseEnter: handleMouseEnter
  }, content);
});
var _default = exports.default = SuggestionItem;