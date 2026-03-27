var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
const TriangleArrowVertical = props => {
  const {
      className,
      style
    } = props,
    restProps = __rest(props, ["className", "style"]);
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    "aria-hidden": true,
    className: className,
    style: style
  }, restProps, {
    width: "7",
    height: "24",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0L1 0C1 4, 2 5.5, 4 7.5S7,10 7,12S6 14.5, 4 16.5S1,20 1,24L0 24L0 0z"
  }));
};
export default TriangleArrowVertical;