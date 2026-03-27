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
    d: "M8.3 2.4a1 1 0 0 0-1.3.95v7.99a3.5 3.5 0 1 0 2 3.16V5l9 2.77v7.57a3.5 3.5 0 1 0 2 3.16V6.74a1 1 0 0 0-.7-.96L8.3 2.4Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'music');
export default IconComponent;