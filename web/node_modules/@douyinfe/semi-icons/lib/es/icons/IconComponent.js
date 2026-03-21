import * as React from 'react';
import { convertIcon } from '../components/Icon';
function SvgComponent(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 22 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "m6 4 5-4 5 4-5 5.5L6 4Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m18 6 4 5-4 5-5.5-5L18 6Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m4 16-4-5 4-5 5.5 5L4 16Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m16 18-5 4-5-4 5-5.5 5 5.5Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'component');
export default IconComponent;