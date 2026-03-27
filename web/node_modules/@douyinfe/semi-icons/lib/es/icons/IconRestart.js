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
    d: "M4.5 2C3.67 2 3 2.67 3 3.5v17a1.5 1.5 0 0 0 3 0v-17C6 2.67 5.33 2 4.5 2Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m8 11.21 11.38-8.94a1 1 0 0 1 1.62.79v17.88a1 1 0 0 1-1.62.79L8 12.79a1 1 0 0 1 0-1.58Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'restart');
export default IconComponent;