import React, { useState, useRef, useEffect, useCallback } from "react";
import { IconChevronRightStroked } from "@douyinfe/semi-icons";
import { numbers } from '@douyinfe/semi-foundation/lib/es/aiChatInput/constants';
const HorizontalScroller = _ref => {
  let {
    children,
    prefix
  } = _ref;
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const checkScrollAbility = useCallback(() => {
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
  useEffect(() => {
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
  const handleScroll = useCallback(scrollAmount => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  }, []);
  const handleScrollLeft = useCallback(() => {
    // Todo, scroll amount can be custom by user through props?
    handleScroll(-numbers.SCROLL_AMOUNT);
  }, [handleScroll]);
  const handleScrollRight = useCallback(() => {
    handleScroll(numbers.SCROLL_AMOUNT);
  }, [handleScroll]);
  return /*#__PURE__*/React.createElement("div", {
    className: `${prefix}-scroll-wrapper`
  }, canScrollLeft && (/*#__PURE__*/React.createElement("button", {
    className: `${prefix}-scroll-button ${prefix}-scroll-button-left`,
    onClick: handleScrollLeft,
    "aria-label": "Scroll left"
  }, /*#__PURE__*/React.createElement(IconChevronRightStroked, {
    className: `${prefix}-scroll-button-left-icon`
  }))), /*#__PURE__*/React.createElement("div", {
    className: `${prefix}-scroll-container`,
    ref: scrollContainerRef
  }, children), canScrollRight && (/*#__PURE__*/React.createElement("button", {
    className: `${prefix}-scroll-button ${prefix}-scroll-button-right `,
    onClick: handleScrollRight,
    "aria-label": "Scroll right"
  }, /*#__PURE__*/React.createElement(IconChevronRightStroked, null))));
};
export default HorizontalScroller;