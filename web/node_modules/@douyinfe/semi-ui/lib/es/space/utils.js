import React, { isValidElement } from 'react';
const REACT_FRAGMENT_TYPE = 'Symbol(react.fragment)';
/**
 * Flatten the children and return the processed data
 */
export const flatten = children => {
  let res = [];
  React.Children.forEach(children, child => {
    if (child === undefined || child === null) {
      return;
    }
    if (Array.isArray(child)) {
      res = res.concat(flatten(child));
    } else if (/*#__PURE__*/isValidElement(child) && child.type && child.type.toString() === REACT_FRAGMENT_TYPE && child.props) {
      res = res.concat(flatten(child.props.children));
    } else {
      res.push(child);
    }
  });
  return res;
};