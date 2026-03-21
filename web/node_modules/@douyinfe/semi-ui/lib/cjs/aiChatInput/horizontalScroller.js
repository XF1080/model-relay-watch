"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _semiIcons = require("@douyinfe/semi-icons");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const HorizontalScroller = _ref => {
  let {
    children,
    prefix
  } = _ref;
  const scrollContainerRef = (0, _react.useRef)(null);
  const [canScrollLeft, setCanScrollLeft] = (0, _react.useState)(false);
  const [canScrollRight, setCanScrollRight] = (0, _react.useState)(false);
  const checkScrollAbility = (0, _react.useCallback)(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const {
        scrollLeft,
        scrollWidth,
        clientWidth
      } = container;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
    }
  }, []);
  (0, _react.useEffect)(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;
    checkScrollAbility();
    const resizeObserver = new ResizeObserver(checkScrollAbility);
    resizeObserver.observe(container);
    container.addEventListener("scroll", checkScrollAbility);
    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("scroll", checkScrollAbility);
    };
  }, [checkScrollAbility, children]);
  const handleScroll = (0, _react.useCallback)(scrollAmount => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  }, []);
  const handleScrollLeft = (0, _react.useCallback)(() => {
    // Todo, scroll amount can be custom by user through props?
    handleScroll(-_constants.numbers.SCROLL_AMOUNT);
  }, [handleScroll]);
  const handleScrollRight = (0, _react.useCallback)(() => {
    handleScroll(_constants.numbers.SCROLL_AMOUNT);
  }, [handleScroll]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefix}-scroll-wrapper`
  }, canScrollLeft && (/*#__PURE__*/_react.default.createElement("button", {
    className: `${prefix}-scroll-button ${prefix}-scroll-button-left`,
    onClick: handleScrollLeft,
    "aria-label": "Scroll left"
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronRightStroked, {
    className: `${prefix}-scroll-button-left-icon`
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: `${prefix}-scroll-container`,
    ref: scrollContainerRef
  }, children), canScrollRight && (/*#__PURE__*/_react.default.createElement("button", {
    className: `${prefix}-scroll-button ${prefix}-scroll-button-right `,
    onClick: handleScrollRight,
    "aria-label": "Scroll right"
  }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconChevronRightStroked, null))));
};
var _default = exports.default = HorizontalScroller;