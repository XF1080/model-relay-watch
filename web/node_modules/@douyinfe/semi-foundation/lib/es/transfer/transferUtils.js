import _omit from "lodash/omit";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { strings } from './constants';
export function _generateGroupedData(dataSource) {
  const newData = [];
  for (const group of dataSource) {
    group.children.forEach(item => {
      const {
          children
        } = group,
        rest = __rest(group, ["children"]);
      newData.push(Object.assign(Object.assign({}, item), {
        _parent: rest
      }));
    });
  }
  return newData;
}
// DFS
export function _generateTreeData(dataSource) {
  const newData = [];
  const stack = [...dataSource].reverse();
  while (stack.length) {
    const current = stack.pop();
    current.path = current.path || [_omit(current, ['children'])];
    if (current.children && Array.isArray(current.children)) {
      const nodes = current.children;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const child = Object.assign({}, nodes[i]);
        child.path = [].concat(current.path).concat(_omit(child, ['children']));
        stack.push(child);
      }
    } else {
      current.isLeaf = true;
    }
    newData.push(_omit(current, ['children']));
  }
  return newData;
}
export function _generateDataByType(dataSource, type) {
  const newData = dataSource.slice() || [];
  if (type === strings.TYPE_GROUP_LIST) {
    return _generateGroupedData(newData);
  }
  if (type === strings.TYPE_TREE_TO_LIST) {
    return _generateTreeData(newData);
  }
  return newData;
}
export function _generateSelectedItems(value, data) {
  const selectedItems = new Map();
  value.forEach(val => {
    const index = data.findIndex(option => option.value === val);
    if (index !== -1) {
      const option = data[index];
      selectedItems.set(option.key, option);
    }
  });
  return selectedItems;
}