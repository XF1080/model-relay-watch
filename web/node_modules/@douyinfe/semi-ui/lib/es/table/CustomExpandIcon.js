import _noop from "lodash/noop";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { IconChevronRight, IconChevronDown, IconTreeTriangleDown, IconTreeTriangleRight } from '@douyinfe/semi-icons';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/table/constants';
import isEnterPress from '@douyinfe/semi-foundation/lib/es/utils/isEnterPress';
import CSSAnimation from "../_cssAnimation";
/**
 * render expand icon
 */
export default function CustomExpandIcon(props) {
  const {
    expanded,
    componentType = 'expand',
    onClick = _noop,
    onMouseEnter = _noop,
    onMouseLeave = _noop,
    expandIcon,
    prefixCls = cssClasses.PREFIX,
    motion = true
  } = props;
  let icon;
  if (/*#__PURE__*/React.isValidElement(expandIcon)) {
    icon = expandIcon;
  } else if (typeof expandIcon === 'function') {
    icon = expandIcon(expanded);
  } else if (componentType === 'tree') {
    icon = expanded && !motion ? /*#__PURE__*/React.createElement(IconTreeTriangleDown, {
      size: "small"
    }) : /*#__PURE__*/React.createElement(IconTreeTriangleRight, {
      size: "small"
    });
  } else {
    icon = expanded && !motion ? /*#__PURE__*/React.createElement(IconChevronDown, null) : /*#__PURE__*/React.createElement(IconChevronRight, null);
  }
  const handleClick = useCallback(e => {
    if (typeof onClick === 'function') {
      onClick(!expanded, e);
    }
  }, [expanded]);
  if (motion) {
    const originIcon = icon;
    icon = /*#__PURE__*/React.createElement(CSSAnimation, {
      animationState: expanded ? "enter" : "leave",
      startClassName: `${cssClasses.PREFIX}-expandedIcon-${expanded ? 'show' : "hide"}`
    }, _ref => {
      let {
        animationClassName
      } = _ref;
      return /*#__PURE__*/React.cloneElement(originIcon, {
        className: (originIcon.props.className || "") + " " + animationClassName
      });
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    role: "button",
    "aria-label": "Expand this row",
    tabIndex: -1,
    onClick: handleClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    className: `${prefixCls}-expand-icon`,
    onKeyPress: e => isEnterPress(e) && handleClick(e)
  }, icon);
}