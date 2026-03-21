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
    d: "M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm8-11a8 8 0 0 1-8 8V4a8 8 0 0 1 8 8Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'contrast');
export default IconComponent;