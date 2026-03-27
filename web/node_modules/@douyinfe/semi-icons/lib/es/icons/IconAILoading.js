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
import { getUuidShort, getFillColor } from '../utils';
function SvgComponent(props) {
  const {
      fill
    } = props,
    rest = __rest(props, ["fill"]);
  const id = getUuidShort({
    prefix: 'semi-ai-loading'
  });
  const [stop1, stop2, stop3, stop4] = getFillColor(fill, 4);
  return /*#__PURE__*/React.createElement("svg", Object.assign({
    viewBox: "0 0 16 16",
    width: "1em",
    height: "1em",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    focusable: false,
    "aria-hidden": true
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: "M15.1112 7.99978C15.1112 4.07242 11.9275 0.888672 8.00009 0.888672C5.18219 0.888672 2.74711 2.52771 1.59619 4.90445",
    stroke: `url(#${id})`,
    strokeWidth: "1.77778",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "16",
    y1: "8",
    x2: "2.68594",
    y2: "11.022",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: stop1
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.3",
    stopColor: stop2
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.6",
    stopColor: stop3
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: stop4,
    stopOpacity: "0"
  }))));
}
const IconComponent = convertIcon(SvgComponent, 'ai_loading');
export default IconComponent;