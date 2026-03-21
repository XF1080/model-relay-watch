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
    d: "M3 13a1 1 0 1 1 0-2h18a1 1 0 1 1 0 2H3Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'minus_stroked');
export default IconComponent;