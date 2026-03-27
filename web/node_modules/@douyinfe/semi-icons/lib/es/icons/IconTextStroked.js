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
    d: "M4 2a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V4h6v16H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2V4h6v2a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1H4Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'text_stroked');
export default IconComponent;