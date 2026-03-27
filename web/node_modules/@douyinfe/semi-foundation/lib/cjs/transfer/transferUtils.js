"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._generateDataByType = _generateDataByType;
exports._generateGroupedData = _generateGroupedData;
exports._generateSelectedItems = _generateSelectedItems;
exports._generateTreeData = _generateTreeData;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function _generateGroupedData(dataSource) {
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
function _generateTreeData(dataSource) {
  const newData = [];
  const stack = [...dataSource].reverse();
  while (stack.length) {
    const current = stack.pop();
    current.path = current.path || [(0, _omit2.default)(current, ['children'])];
    if (current.children && Array.isArray(current.children)) {
      const nodes = current.children;
      for (let i = nodes.length - 1; i >= 0; i--) {
        const child = Object.assign({}, nodes[i]);
        child.path = [].concat(current.path).concat((0, _omit2.default)(child, ['children']));
        stack.push(child);
      }
    } else {
      current.isLeaf = true;
    }
    newData.push((0, _omit2.default)(current, ['children']));
  }
  return newData;
}
function _generateDataByType(dataSource, type) {
  const newData = dataSource.slice() || [];
  if (type === _constants.strings.TYPE_GROUP_LIST) {
    return _generateGroupedData(newData);
  }
  if (type === _constants.strings.TYPE_TREE_TO_LIST) {
    return _generateTreeData(newData);
  }
  return newData;
}
function _generateSelectedItems(value, data) {
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