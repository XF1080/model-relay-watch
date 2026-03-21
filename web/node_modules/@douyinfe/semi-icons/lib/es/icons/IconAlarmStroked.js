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
  }, props), /*#__PURE__*/React.createElement("g", {
    clipPath: "url(#clip0_2342_325)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 7.64c.5 0 .9.4.9.9v5.08l3.98 3.97a.9.9 0 1 1-1.29 1.29l-4.18-4.18-.03-.04a.9.9 0 0 1-.29-.66V8.55c0-.5.4-.91.91-.91Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 4a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.54 1.41a2 2 0 1 1 2.82 2.83L4.24 6.36a2 2 0 1 1-2.83-2.82L3.54 1.4Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20.46 1.41a2 2 0 1 0-2.82 2.83l2.12 2.12a2 2 0 1 0 2.83-2.82L20.46 1.4Z",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
    id: "clip0_2342_325"
  }, /*#__PURE__*/React.createElement("rect", {
    width: 24,
    height: 24,
    fill: "currentColor"
  }))));
}
const IconComponent = convertIcon(SvgComponent, 'alarm_stroked');
export default IconComponent;