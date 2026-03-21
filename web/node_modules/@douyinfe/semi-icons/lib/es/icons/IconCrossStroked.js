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
    d: "M3.62 19.12a1.25 1.25 0 0 0 1.76 1.76l7.12-7.11 7.12 7.11a1.25 1.25 0 0 0 1.76-1.76L14.27 12l7.11-7.12a1.25 1.25 0 0 0-1.76-1.76l-7.12 7.11-7.12-7.11a1.25 1.25 0 1 0-1.76 1.76L10.73 12l-7.11 7.12Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'cross_stroked');
export default IconComponent;