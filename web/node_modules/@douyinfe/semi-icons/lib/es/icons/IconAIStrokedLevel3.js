var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import * as React from 'react';
import { convertIcon } from '../components/Icon';
import { getFillColor, getUuidShort } from '../utils';
function SvgComponent(props) {
  const {
      fill
    } = props,
    rest = __rest(props, ["fill"]);
  const id = getUuidShort({
    prefix: 'semi-ai-stroked-level-3'
  });
  const [stop1, stop2, stop3, stop4] = getFillColor(fill, 4);
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    focusable: false,
    "aria-hidden": true
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: "M9.68 5.45c.22-1.1 1.8-1.1 2.02 0a8.79 8.79 0 0 0 6.85 6.85c1.1.22 1.1 1.8 0 2.02a8.79 8.79 0 0 0-6.85 6.85c-.22 1.1-1.8 1.1-2.02 0a8.79 8.79 0 0 0-6.85-6.85c-1.1-.22-1.1-1.8 0-2.02a8.79 8.79 0 0 0 6.85-6.85Zm1.01 2.96a10.73 10.73 0 0 1-4.9 4.9 10.73 10.73 0 0 1 4.9 4.9 10.73 10.73 0 0 1 4.9-4.9 10.73 10.73 0 0 1-4.9-4.9Zm7.47-6.8c.16-.81 1.31-.81 1.48 0a3.54 3.54 0 0 0 2.76 2.75c.8.17.8 1.32 0 1.48a3.54 3.54 0 0 0-2.76 2.76c-.17.8-1.32.8-1.48 0a3.54 3.54 0 0 0-2.76-2.76c-.8-.16-.8-1.31 0-1.48a3.54 3.54 0 0 0 2.76-2.76Z",
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: 23.0001,
    y1: 22.0012,
    x2: -0.488689,
    y2: 18.6982,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: stop1
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.3,
    stopColor: stop2
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 0.6,
    stopColor: stop3
  }), /*#__PURE__*/React.createElement("stop", {
    offset: 1,
    stopColor: stop4
  }))));
}
const IconComponent = convertIcon(SvgComponent, 'ai_stroked_level_3');
export default IconComponent;