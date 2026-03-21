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
    d: "M1 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7.5v4c0 .83.67 1.5 1.5 1.5h4V14a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-2.5H9A4.5 4.5 0 0 1 4.5 15v-4H2a1 1 0 0 1-1-1V2Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'inherit');
export default IconComponent;