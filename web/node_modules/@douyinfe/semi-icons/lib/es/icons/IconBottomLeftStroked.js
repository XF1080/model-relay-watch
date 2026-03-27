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
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 3a1 1 0 0 0-2 0v18a1 1 0 0 0 1 1h18a1 1 0 1 0 0-2H4V3Zm7-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H11Zm1 10V4h8v8h-8Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'bottom_left_stroked');
export default IconComponent;