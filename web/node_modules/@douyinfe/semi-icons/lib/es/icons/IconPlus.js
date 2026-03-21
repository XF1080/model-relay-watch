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
    d: "M20.5 13.5a1.5 1.5 0 0 0 0-3h-7v-7a1.5 1.5 0 0 0-3 0v7h-7a1.5 1.5 0 0 0 0 3h7v7a1.5 1.5 0 0 0 3 0v-7h7Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'plus');
export default IconComponent;