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
    d: "M3.5 3a1.5 1.5 0 1 0 0 3h17a1.5 1.5 0 0 0 0-3h-17Zm7 5a1.5 1.5 0 1 0 0 3h10a1.5 1.5 0 0 0 0-3h-10ZM2 14.5c0-.83.67-1.5 1.5-1.5h17a1.5 1.5 0 0 1 0 3h-17A1.5 1.5 0 0 1 2 14.5Zm8.5 3.5a1.5 1.5 0 0 0 0 3h10a1.5 1.5 0 0 0 0-3h-10Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'align_right');
export default IconComponent;