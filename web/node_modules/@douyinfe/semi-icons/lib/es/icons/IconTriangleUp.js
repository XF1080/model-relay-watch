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
    d: "m2.17 17.4 9.02-12.3a1 1 0 0 1 1.62 0l9.02 12.3a1 1 0 0 1-.8 1.6H2.97a1 1 0 0 1-.8-1.6Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'triangle_up');
export default IconComponent;