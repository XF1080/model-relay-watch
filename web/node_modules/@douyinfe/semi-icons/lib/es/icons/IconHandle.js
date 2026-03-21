import * as React from 'react';
import { convertIcon } from '../components/Icon';
function SvgComponent(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("path", {
    d: "M9 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M17 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'handle');
export default IconComponent;