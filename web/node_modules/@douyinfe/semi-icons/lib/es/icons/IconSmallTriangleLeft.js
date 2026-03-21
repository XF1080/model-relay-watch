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
    d: "M16.32 6.96v10.13a.5.5 0 0 1-.78.41l-7.6-5.06a.5.5 0 0 1 0-.83l7.6-5.07a.5.5 0 0 1 .78.42Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'small_triangle_left');
export default IconComponent;