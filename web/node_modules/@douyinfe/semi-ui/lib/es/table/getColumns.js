import _omit from "lodash/omit";
import _get from "lodash/get";
import React from 'react';
import Column from './Column';
/**
 * Convert jsx children into object columns
 * @param {Node} children
 * @returns
 */
export default function getColumns(children) {
  if (children) {
    const columns = [];
    React.Children.forEach(children, child => {
      if (/*#__PURE__*/React.isValidElement(child) && (child.type === Column || _get(child, 'type.elementType') === 'Column')) {
        const col = _omit(child.props, ['children']);
        if (Array.isArray(child.props.children) && child.props.children.length) {
          col.children = getColumns(child.props.children);
        }
        columns.push(Object.assign({
          key: child.key
        }, col));
      }
    });
    return columns;
  }
  return [];
}