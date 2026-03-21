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
    d: "M11.43 2.1A1 1 0 0 1 12 3v18a1 1 0 0 1-1.62.78L4.65 17H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2.65l5.73-4.78a1 1 0 0 1 1.05-.12Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'volumn_silent');
export default IconComponent;