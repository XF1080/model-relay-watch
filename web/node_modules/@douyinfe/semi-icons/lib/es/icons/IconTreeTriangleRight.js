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
    d: "m9.66 3.44 8.97 7.8a1 1 0 0 1 0 1.51l-8.97 7.81A1 1 0 0 1 8 19.81V4.19a1 1 0 0 1 1.66-.75Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'tree_triangle_right');
export default IconComponent;