import * as React from 'react';
import { convertIcon } from '../components/Icon';
function SvgComponent(props) {
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 25 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M14.75 6.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM12.5 11a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM7 18.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm4.5-2.25a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm6.5 2.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm4.5-2.25a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'element_stroked');
export default IconComponent;