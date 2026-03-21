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
import classnames from 'classnames';
import { numbers, cssClasses } from '@douyinfe/semi-foundation/lib/es/popover/constants';
const Arrow = function () {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
      position = '',
      className,
      arrowStyle,
      popStyle
    } = props,
    rest = __rest(props, ["position", "className", "arrowStyle", "popStyle"]);
  const isVertical = position.indexOf('top') === 0 || position.indexOf('bottom') === 0;
  const cls = classnames(className, cssClasses.ARROW);
  const borderOpacity = _get(arrowStyle, 'borderOpacity');
  const bgColor = _get(arrowStyle, 'backgroundColor', _get(popStyle, 'backgroundColor'));
  const borderColor = _get(arrowStyle, 'borderColor', _get(popStyle, 'borderColor'));
  const wrapProps = Object.assign(Object.assign({}, rest), {
    width: numbers.ARROW_BOUNDING.width,
    height: numbers.ARROW_BOUNDING.height,
    xmlns: 'http://www.w3.org/2000/svg',
    className: cls
  });
  return isVertical ? (/*#__PURE__*/React.createElement("svg", Object.assign({}, wrapProps), /*#__PURE__*/React.createElement("path", {
    d: "M0 0.5L0 1.5C4 1.5, 5.5 3, 7.5 5S10,8 12,8S14.5 7, 16.5 5S20,1.5 24,1.5L24 0.5L0 0.5z",
    style: {
      fill: borderColor,
      opacity: borderOpacity
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0L0 1C4 1, 5.5 2, 7.5 4S10,7 12,7S14.5  6, 16.5 4S20,1 24,1L24 0L0 0z",
    style: {
      fill: bgColor
    }
  }))) : (/*#__PURE__*/React.createElement("svg", Object.assign({}, wrapProps), /*#__PURE__*/React.createElement("path", {
    d: "M0.5 0L1.5 0C1.5 4, 3 5.5, 5 7.5S8,10 8,12S7 14.5, 5 16.5S1.5,20 1.5,24L0.5 24L0.5 0z",
    style: {
      fill: borderColor,
      opacity: borderOpacity
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0 0L1 0C1 4, 2 5.5, 4 7.5S7,10 7,12S6 14.5, 4 16.5S1,20 1,24L0 24L0 0z",
    style: {
      fill: bgColor
    }
  })));
};
export default Arrow;