var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { useState, useEffect } from 'react';
import Collapsible from '../collapsible';
function NodeCollapsible(props) {
  const {
      open,
      children
    } = props,
    rest = __rest(props, ["open", "children"]);
  const [isOpen, setIsOpen] = useState(props.open);
  useEffect(() => {
    // Why do we need to change isOPen value in setTimeout？
    // Because when NodeCollapsible ComponentDidMount, the domHeight in Collapsible has not been given
    setTimeout(() => {
      setIsOpen(!props.open);
    }, 0);
  }, []);
  return /*#__PURE__*/React.createElement(Collapsible, Object.assign({}, rest, {
    isOpen: isOpen
  }), children);
}
export default NodeCollapsible;