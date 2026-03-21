import React, { forwardRef } from "react";
import { IconClose } from "@douyinfe/semi-icons";
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/image/constants';
import cls from "classnames";
import { PreviewContext } from "./previewContext";
const prefixCls = `${cssClasses.PREFIX}-preview-header`;
const Header = /*#__PURE__*/forwardRef((_ref, ref) => {
  let {
    onClose,
    titleStyle,
    className,
    renderHeader,
    closable,
    renderCloseIcon
  } = _ref;
  return /*#__PURE__*/React.createElement(PreviewContext.Consumer, null, _ref2 => {
    let {
      currentIndex,
      titles
    } = _ref2;
    let title;
    if (titles && typeof currentIndex === "number") {
      title = titles[currentIndex];
    }
    const closeIcon = typeof renderCloseIcon === 'function' ? renderCloseIcon === null || renderCloseIcon === void 0 ? void 0 : renderCloseIcon() : renderCloseIcon;
    //warning 
    if (typeof closeIcon !== 'undefined' && ! /*#__PURE__*/React.isValidElement(closeIcon)) {
      console.warn(`[Semi ImagePreview] RenderCloseIcon should be a valid react element or a function that returns a react element`);
    }
    return /*#__PURE__*/React.createElement("section", {
      ref: ref,
      className: cls(prefixCls, className)
    }, /*#__PURE__*/React.createElement("section", {
      className: `${prefixCls}-title`,
      style: titleStyle
    }, renderHeader ? renderHeader(title) : title), closable && /*#__PURE__*/React.createElement("section", {
      className: `${prefixCls}-close`,
      onMouseUp: onClose
    }, /*#__PURE__*/React.isValidElement(closeIcon) ? closeIcon : /*#__PURE__*/React.createElement(IconClose, null)));
  });
});
export default Header;