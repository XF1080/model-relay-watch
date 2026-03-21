import _get from "lodash/get";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import isNullOrUndefined from '@douyinfe/semi-foundation/lib/es/utils/isNullOrUndefined';
import semiGlobal from '../_utils/semi-global';
import cls from 'classnames';
let _id = -1;
function Icon() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
      id: propsId,
      className,
      customIconCls
    } = props,
    rest = __rest(props, ["id", "className", "customIconCls"]);
  const globalIndicator = _get(semiGlobal, 'config.overrideDefaultProps.Spin.indicator');
  if (globalIndicator && /*#__PURE__*/React.isValidElement(globalIndicator)) {
    return /*#__PURE__*/React.cloneElement(globalIndicator, {
      className: cls({
        [customIconCls]: customIconCls,
        [className]: className
      })
    });
  }
  let _propsId = propsId;
  if (isNullOrUndefined(_propsId)) {
    _id++;
    _propsId = _id;
  }
  const id = `linearGradient-${_propsId}`;
  return /*#__PURE__*/React.createElement("svg", Object.assign({}, rest, {
    className: className,
    width: "48",
    height: "48",
    viewBox: "0 0 36 36",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
    "data-icon": "spin"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    x1: "0%",
    y1: "100%",
    x2: "100%",
    y2: "100%",
    id: id
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "currentColor",
    stopOpacity: "0",
    offset: "0%"
  }), /*#__PURE__*/React.createElement("stop", {
    stopColor: "currentColor",
    stopOpacity: "0.50",
    offset: "39.9430698%"
  }), /*#__PURE__*/React.createElement("stop", {
    stopColor: "currentColor",
    offset: "100%"
  }))), /*#__PURE__*/React.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, /*#__PURE__*/React.createElement("rect", {
    fillOpacity: "0.01",
    fill: "none",
    x: "0",
    y: "0",
    width: "36",
    height: "36"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M34,18 C34,9.163444 26.836556,2 18,2 C11.6597233,2 6.18078805,5.68784135 3.59122325,11.0354951",
    stroke: `url(#${id})`,
    strokeWidth: "4",
    strokeLinecap: "round"
  })));
}
export default Icon;