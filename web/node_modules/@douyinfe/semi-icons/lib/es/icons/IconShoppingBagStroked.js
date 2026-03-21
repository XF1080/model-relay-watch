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
    d: "M18 5a1 1 0 0 1 1 1A7 7 0 1 1 5 6a1 1 0 0 1 2 0 5 5 0 0 0 10 0 1 1 0 0 1 1-1Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M19 2a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H4.85A3 3 0 0 1 2 19V5a3 3 0 0 1 3-3h14ZM5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'shopping_bag_stroked');
export default IconComponent;