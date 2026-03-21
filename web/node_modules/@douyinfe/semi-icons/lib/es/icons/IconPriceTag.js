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
    d: "M21 2h-7.59a1 1 0 0 0-.7.3L1.4 13.58a2 2 0 0 0 0 2.82L7.6 22.6a2 2 0 0 0 2.82 0l11.3-11.3a1 1 0 0 0 .29-.7V3a1 1 0 0 0-1-1Zm-5.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
    fill: "currentColor"
  }));
}
const IconComponent = convertIcon(SvgComponent, 'price_tag');
export default IconComponent;