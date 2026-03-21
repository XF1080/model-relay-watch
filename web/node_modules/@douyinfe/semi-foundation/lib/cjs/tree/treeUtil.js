"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcCheckedKeys = calcCheckedKeys;
exports.calcCheckedKeysForChecked = calcCheckedKeysForChecked;
exports.calcCheckedKeysForUnchecked = calcCheckedKeysForUnchecked;
exports.calcDisabledKeys = calcDisabledKeys;
exports.calcDropActualPosition = calcDropActualPosition;
exports.calcDropRelativePosition = calcDropRelativePosition;
exports.calcExpandedKeys = calcExpandedKeys;
exports.calcExpandedKeysForValues = calcExpandedKeysForValues;
exports.calcMotionKeys = calcMotionKeys;
exports.convertDataToEntities = convertDataToEntities;
exports.convertJsonToData = convertJsonToData;
exports.filter = filter;
exports.filterTreeData = filterTreeData;
exports.findAncestorKeys = findAncestorKeys;
exports.findChildKeys = findChildKeys;
exports.findDescendantKeys = findDescendantKeys;
exports.findKeysForValues = findKeysForValues;
exports.findLeafKeys = findLeafKeys;
exports.findSiblingKeys = findSiblingKeys;
exports.flattenTreeData = flattenTreeData;
exports.getDragNodesKeys = getDragNodesKeys;
exports.getMotionKeys = getMotionKeys;
exports.getValueOrKey = getValueOrKey;
exports.normalizeKeyList = normalizeKeyList;
exports.normalizeValue = normalizeValue;
exports.normalizedArr = normalizedArr;
exports.traverseDataNodes = traverseDataNodes;
exports.updateKeys = updateKeys;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _pick2 = _interopRequireDefault(require("lodash/pick"));
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));
var _isNull2 = _interopRequireDefault(require("lodash/isNull"));
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _max2 = _interopRequireDefault(require("lodash/max"));
var _uniq2 = _interopRequireDefault(require("lodash/uniq"));
var _difference2 = _interopRequireDefault(require("lodash/difference"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * Part of the utils function implementation process reference
 * https://github.com/react-component/tree/blob/master/src/util.tsx
 */

const DRAG_OFFSET = 0.45;
function getPosition(level, index) {
  return `${level}-${index}`;
}
function isValid(val) {
  return !(0, _isNull2.default)(val) && !(0, _isUndefined2.default)(val);
}
/**
 * Flat nest tree data into flatten list. This is used for virtual list render.
 * @param treeNodeList Origin data node list
 * @param expandedKeys
 * @param filteredShownKeys
 * need expanded keys, provides `true` means all expanded
 */
function flattenTreeData(treeNodeList, expandedKeys, keyMaps) {
  let filteredShownKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const flattenList = [];
  const filterSearch = Boolean(filteredShownKeys);
  const realKeyName = (0, _get2.default)(keyMaps, 'key', 'key');
  const realChildrenName = (0, _get2.default)(keyMaps, 'children', 'children');
  if ((0, _isUndefined2.default)(treeNodeList)) {
    return [];
  }
  function flatten(list) {
    let parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return list.map((treeNode, index) => {
      const pos = getPosition(parent ? parent.pos : '0', index);
      const mergedKey = treeNode[realKeyName];
      const otherData = {};
      if (keyMaps) {
        Object.entries((0, _omit2.default)(keyMaps, 'children')).forEach(_ref => {
          let [key, value] = _ref;
          const result = treeNode[value];
          !(0, _isUndefined2.default)(result) && (otherData[key] = result);
        });
      }
      // Add FlattenDataNode into list
      const flattenNode = Object.assign(Object.assign(Object.assign({}, (0, _pick2.default)(treeNode, ['key', 'label', 'value', 'icon', 'disabled', 'isLeaf'])), otherData), {
        parent,
        pos,
        children: null,
        data: treeNode,
        _innerDataTag: true,
        isEnd: [...(parent ? parent.isEnd : []), index === list.length - 1]
      });
      const isBooleanFilteredShownKeys = typeof filteredShownKeys === 'boolean';
      if (!filterSearch || !isBooleanFilteredShownKeys && filteredShownKeys.has(mergedKey)) {
        flattenList.push(flattenNode);
      }
      // Loop treeNode children
      if (expandedKeys.has(mergedKey) && (!filterSearch || !isBooleanFilteredShownKeys && filteredShownKeys.has(mergedKey))) {
        flattenNode.children = flatten(treeNode[realChildrenName] || [], flattenNode);
      } else {
        flattenNode.children = [];
      }
      return flattenNode;
    });
  }
  flatten(treeNodeList);
  return flattenList;
}
function convertJsonToData(treeJson) {
  const treeData = [];
  const traverseNode = (key, children, path, res) => {
    const currPath = [...path, key];
    const itemKey = currPath.join(_constants.strings.JSON_KEY_SPLIT);
    const newNode = {
      key: itemKey,
      label: key,
      value: children
    };
    if ((0, _isObject2.default)(children)) {
      const newChildren = [];
      Object.entries(children).forEach(c => {
        traverseNode(c[0], c[1], currPath, newChildren);
      });
      newNode.children = newChildren;
    }
    res.push(newNode);
  };
  Object.entries(treeJson).forEach(item => traverseNode(item[0], item[1], [], treeData));
  return treeData;
}
/**
 * Traverse all the data by `treeData`.
 */
function traverseDataNodes(treeNodes, callback, keyMaps) {
  const realKeyName = (0, _get2.default)(keyMaps, 'key', 'key');
  const realChildrenName = (0, _get2.default)(keyMaps, 'children', 'children');
  const processNode = (node, ind, parent) => {
    const children = node ? node[realChildrenName] : treeNodes;
    const pos = node ? getPosition(parent.pos, ind) : '0';
    // Process node if is not root
    if (node) {
      const nodeKey = (0, _get2.default)(node, realKeyName, null);
      const data = {
        data: Object.assign({}, node),
        ind,
        pos,
        key: nodeKey !== null ? nodeKey : pos,
        parentPos: parent.node ? parent.pos : null,
        level: Number(parent.level) + 1
      };
      callback(data);
    }
    // Process children node
    if (children) {
      children.forEach((subNode, subIndex) => {
        processNode(subNode, subIndex, {
          node,
          pos,
          level: parent ? Number(parent.level) + 1 : -1
        });
      });
    }
  };
  processNode(null);
}
/* Convert data to entities map */
function convertDataToEntities(dataNodes, keyMaps) {
  const posEntities = {};
  const keyEntities = {};
  const valueEntities = {};
  const wrapper = {
    posEntities,
    keyEntities,
    valueEntities
  };
  const realValueName = (0, _get2.default)(keyMaps, 'value', 'value');
  traverseDataNodes(dataNodes, data => {
    const {
      pos,
      key,
      parentPos
    } = data;
    const entity = Object.assign({}, data);
    const value = (0, _get2.default)(entity, `data.${realValueName}`, null);
    if (value !== null) {
      valueEntities[value] = key;
    }
    posEntities[pos] = entity;
    keyEntities[key] = entity;
    // Fill children
    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }
  }, keyMaps);
  return wrapper;
}
/* Get key by value */
function findKeysForValues(valueList, valueEntities) {
  let isMultiple = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!isValid(valueList)) {
    return [];
  }
  if (!isMultiple && Array.isArray(valueList)) {
    valueList = valueList.length ? [valueList[0]] : [];
  } else if (!Array.isArray(valueList)) {
    valueList = [valueList];
  }
  if ((0, _isEmpty2.default)(valueEntities)) {
    return valueList;
  }
  const res = [];
  valueList.forEach(val => {
    if (val in valueEntities) {
      res.push(valueEntities[val]);
    } else {
      // if val not in valueEntities, then value push to keys array
      val && res.push(val);
    }
  });
  return res;
}
function findDescendantKeys(selectedKeys, options) {
  let self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const res = [];
  const findChild = item => {
    if (!item) {
      return;
    }
    const {
      children
    } = item;
    const hasChildren = isValid(children);
    if (hasChildren) {
      children.forEach(child => {
        res.push(child.key);
        findChild(options[child.key]);
      });
    }
  };
  selectedKeys.forEach(item => {
    if (self) {
      res.push(item);
    }
    findChild(options[item]);
  });
  return res;
}
function findChildKeys(keys, options) {
  let omitKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const res = [];
  keys && keys.forEach(key => {
    const opts = options[key];
    opts && opts.children && opts.children.forEach(child => {
      if (!omitKeys.length || !omitKeys.includes(child.key)) {
        res.push(child.key);
      }
    });
  });
  return res;
}
/* istanbul ignore next */
function findLeafKeys(keys, options) {
  const res = [];
  const findChild = item => {
    if (!item) {
      return;
    }
    const {
      children
    } = item;
    const isLeaf = !isValid(children);
    if (isLeaf) {
      res.push(item.key);
    } else {
      children.forEach(child => {
        findChild(options[child.key]);
      });
    }
  };
  keys.forEach(item => {
    findChild(options[item]);
  });
  return res;
}
function findSiblingKeys(selectedKeys, options) {
  let self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const par = [];
  selectedKeys.forEach(item => {
    if (options[item] && options[item].parent) {
      par.push(options[item].parent.key);
    }
  });
  const res = findChildKeys((0, _uniq2.default)(par), options, self ? [] : selectedKeys);
  return res;
}
function findAncestorKeys(selectedKeys, options) {
  let self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const res = [];
  // Recursively find the parent element
  const findPar = item => {
    if (item.parent) {
      res.push(item.parent.key);
      findPar(item.parent);
    }
  };
  selectedKeys.forEach(item => {
    options[item] && findPar(options[item]);
    if (self) {
      res.push(item);
    }
  });
  return res;
}
function getSortedKeyList(keyList, keyEntities) {
  const levelMap = {};
  keyList.forEach(key => {
    if (!keyEntities[key]) {
      return;
    }
    const {
      level
    } = keyEntities[key];
    if (levelMap[level]) {
      levelMap[level].push(key);
    } else {
      levelMap[level] = [key];
    }
  });
  return levelMap;
}
function calcCheckedKeys(values, keyEntities) {
  const keyList = Array.isArray(values) ? values : [values];
  const descendantKeys = findDescendantKeys(keyList, keyEntities, true);
  /**
   * Recursively find the parent element. Because the incoming nodes are all checked,
   * their descendants must be checked. That is to say, if the descendant nodes have
   *  disabled+unchecked nodes, their ancestor nodes will definitely not be checked
   */
  const checkedKeys = new Set([...descendantKeys]);
  let halfCheckedKeys = new Set([]);
  let visited = [];
  const levelMap = getSortedKeyList(keyList, keyEntities);
  const calcCurrLevel = node => {
    const {
      key,
      parent,
      level
    } = node;
    // If the node does not have a parent node, or the node has been processed just now, no processing is done
    if (!parent || visited.includes(key)) {
      return;
    }
    const siblingKeys = findSiblingKeys([key], keyEntities);
    // visited for caching to avoid double counting
    visited = [...visited, ...siblingKeys];
    const allChecked = siblingKeys.every(siblingKey => checkedKeys.has(siblingKey));
    if (!allChecked) {
      const ancestorKeys = findAncestorKeys([key], keyEntities, false);
      halfCheckedKeys = new Set([...halfCheckedKeys, ...ancestorKeys]);
    } else {
      checkedKeys.add(parent.key);
      // IMPORTANT! parent level may not exist in original level map; if add to the end directly may destroy the hierarchical order
      if (level - 1 in levelMap && level) {
        levelMap[level - 1].push(parent.key);
      } else {
        levelMap[level - 1] = [parent.key];
      }
    }
  };
  // Loop keyList from deepest Level to topLevel, bottom up
  while (!(0, _isEmpty2.default)(levelMap)) {
    const maxLevel = (0, _max2.default)(Object.keys(levelMap).map(key => Number(key)));
    levelMap[maxLevel].forEach(key => calcCurrLevel(keyEntities[key]));
    delete levelMap[maxLevel];
  }
  return {
    checkedKeys,
    halfCheckedKeys
  };
}
/* Calculate the expanded node by key */
function calcExpandedKeys() {
  let keyList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let keyEntities = arguments.length > 1 ? arguments[1] : undefined;
  let autoExpandParent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (!Array.isArray(keyList)) {
    keyList = [keyList];
  }
  if (autoExpandParent) {
    const ancestorKeys = findAncestorKeys(keyList, keyEntities, true);
    return new Set(ancestorKeys);
  }
  return new Set(keyList);
}
/* Calculate the expanded node by value */
function calcExpandedKeysForValues(value, keyEntities, isMultiple, valueEntities) {
  const keys = findKeysForValues(value, valueEntities, isMultiple);
  return new Set(findAncestorKeys(keys, keyEntities, false));
}
function calcMotionKeys(oldKeySet, newKeySet, keyEntities) {
  let motionType = 'show';
  const oldKeys = [...oldKeySet];
  const newKeys = [...newKeySet];
  if (Math.abs(oldKeys.length - newKeys.length) !== 1) {
    return {
      motionType,
      motionKeys: []
    };
  }
  let diffKeys = [];
  if (oldKeys.length > newKeys.length) {
    motionType = 'hide';
    diffKeys = (0, _difference2.default)(oldKeys, newKeys);
  } else {
    diffKeys = (0, _difference2.default)(newKeys, oldKeys);
  }
  return {
    motionType: diffKeys.length === 1 ? motionType : 'show',
    motionKeys: diffKeys.length === 1 ? findDescendantKeys(diffKeys, keyEntities, false) : []
  };
}
/**
 * @returns whether option includes sugInput.
 * When filterTreeNode is a function,returns the result of filterTreeNode which called with (sugInput, target, option).
 */
function filter(sugInput, option, filterTreeNode, filterProps) {
  if (!filterTreeNode) {
    return true;
  }
  let filterFn = filterTreeNode;
  let target = option;
  if (typeof filterTreeNode === 'boolean') {
    filterFn = (targetVal, val) => {
      const input = targetVal.toLowerCase();
      return val === null || val === void 0 ? void 0 : val.toString().toLowerCase().includes(input);
    };
  }
  if (filterProps) {
    target = option[filterProps];
  }
  return filterFn(sugInput, target, option);
}
function normalizedArr(val) {
  if (!Array.isArray(val)) {
    return [val];
  } else {
    return val;
  }
}
// flag is used to determine whether to return when the key does not belong to the keys in keyEntities
// export function normalizeKeyList(keyList: any, keyEntities: KeyEntities, leafOnly = false) {
function normalizeKeyList(keyList, keyEntities) {
  let leafOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let flag = arguments.length > 3 ? arguments[3] : undefined;
  const res = [];
  const keyListSet = new Set(keyList);
  if (!leafOnly) {
    keyList.forEach(key => {
      if (!keyEntities[key]) {
        if (flag) {
          res.push(key);
        }
        return;
      }
      const {
        parent
      } = keyEntities[key];
      if (parent && keyListSet.has(parent.key)) {
        return;
      }
      res.push(key);
    });
  } else {
    keyList.forEach(key => {
      if (keyEntities[key] && !isValid(keyEntities[key].children)) {
        res.push(key);
      }
      // when key is not in keyEntities, if flag is true, key should be push in res
      if (!keyEntities[key] && flag) {
        res.push(key);
      }
    });
  }
  return res;
}
function getMotionKeys(eventKey, expandedKeys, keyEntities) {
  const res = [];
  const getChild = itemKey => {
    keyEntities[itemKey].children && keyEntities[itemKey].children.forEach(item => {
      const {
        key
      } = item;
      res.push(key);
      if (expandedKeys.has(key)) {
        getChild(key);
      }
    });
  };
  getChild(eventKey);
  return res;
}
function calcCheckedKeysForChecked(key, keyEntities, checkedKeys, halfCheckedKeys) {
  const descendantKeys = findDescendantKeys([key], keyEntities, true);
  const nodeItem = keyEntities[key];
  checkedKeys = new Set([...checkedKeys, key]);
  const calcCurrLevel = node => {
    if (!node.parent) {
      return;
    }
    const {
      key
    } = node;
    const siblingKeys = findSiblingKeys([key], keyEntities);
    const allChecked = siblingKeys.every(key => checkedKeys.has(key));
    if (!allChecked) {
      const ancestorKeys = findAncestorKeys([key], keyEntities, false);
      halfCheckedKeys = new Set([...halfCheckedKeys, ...ancestorKeys]);
    } else {
      const par = node.parent;
      checkedKeys.add(par.key);
      calcCurrLevel(par);
    }
  };
  calcCurrLevel(nodeItem);
  return {
    checkedKeys: new Set([...checkedKeys, ...descendantKeys]),
    halfCheckedKeys
  };
}
function calcCheckedKeysForUnchecked(key, keyEntities, checkedKeys, halfCheckedKeys) {
  const descendantKeys = findDescendantKeys([key], keyEntities, true);
  const nodeItem = keyEntities[key];
  descendantKeys.forEach(descendantKey => {
    if (checkedKeys.has(descendantKey)) {
      checkedKeys.delete(descendantKey);
    }
    if (halfCheckedKeys.has(descendantKey)) {
      halfCheckedKeys.delete(descendantKey);
    }
  });
  const calcCurrLevel = node => {
    const par = node.parent;
    // no parent
    if (!par) {
      return;
    }
    // Has a parent node, and the parent node is not checked or halfChecked
    if (!checkedKeys.has(par.key) && !halfCheckedKeys.has(par.key)) {
      return;
    }
    // Has a parent node, and the parent node is checked or halfChecked
    const {
      key
    } = node;
    const siblingKeys = findSiblingKeys([key], keyEntities);
    const anyChecked = siblingKeys.some(key => checkedKeys.has(key) || halfCheckedKeys.has(key));
    const ancestorKeys = findAncestorKeys([key], keyEntities, false);
    // If there is checked or halfChecked in the sibling node, you need to change the parent node to halfChecked
    if (anyChecked) {
      ancestorKeys.forEach(itemKey => {
        if (checkedKeys.has(itemKey)) {
          checkedKeys.delete(itemKey);
          halfCheckedKeys.add(itemKey);
        }
      });
      // If there is no checked or halfChecked in the sibling node, you need to change the parent node to unchecked
    } else {
      if (checkedKeys.has(par.key)) {
        checkedKeys.delete(par.key);
      }
      if (halfCheckedKeys.has(par.key)) {
        halfCheckedKeys.delete(par.key);
      }
      calcCurrLevel(par);
    }
  };
  nodeItem && calcCurrLevel(nodeItem);
  return {
    checkedKeys,
    halfCheckedKeys
  };
}
function filterTreeData(info) {
  const {
    showFilteredOnly,
    keyEntities,
    inputValue,
    treeData,
    filterTreeNode,
    filterProps,
    prevExpandedKeys,
    keyMaps
  } = info;
  let filteredOptsKeys = [];
  filteredOptsKeys = Object.values(keyEntities).filter(item => filter(inputValue, item.data, filterTreeNode, filterProps)).map(item => item.key);
  let expandedOptsKeys = findAncestorKeys(filteredOptsKeys, keyEntities, false);
  if (prevExpandedKeys.length) {
    const prevExpandedValidKeys = prevExpandedKeys.filter(key => Boolean(keyEntities[key]));
    expandedOptsKeys = expandedOptsKeys.concat(prevExpandedValidKeys);
  }
  const shownChildKeys = findDescendantKeys(filteredOptsKeys, keyEntities, true);
  const filteredShownKeys = new Set([...shownChildKeys, ...expandedOptsKeys]);
  const flattenNodes = flattenTreeData(treeData, new Set(expandedOptsKeys), keyMaps, showFilteredOnly && filteredShownKeys);
  return {
    flattenNodes,
    filteredKeys: new Set(filteredOptsKeys),
    filteredExpandedKeys: new Set(expandedOptsKeys),
    filteredShownKeys
  };
}
// return data.value if data.value exist else fall back to key
function getValueOrKey(data, keyMaps) {
  const valueName = (0, _get2.default)(keyMaps, 'value', 'value');
  const keyName = (0, _get2.default)(keyMaps, 'key', 'key');
  if (Array.isArray(data)) {
    return data.map(item => (0, _get2.default)(item, valueName, item[keyName]));
  }
  return (0, _get2.default)(data, valueName, data[keyName]);
}
/* Convert value to string */
function normalizeValue(value, withObject, keyMaps) {
  if (withObject && isValid(value)) {
    return getValueOrKey(value, keyMaps);
  } else {
    return value;
  }
}
function updateKeys(keySet, keyEntities) {
  const keyArr = [...keySet];
  return keyArr.filter(key => key in keyEntities);
}
function calcDisabledKeys(keyEntities, keyMaps) {
  const disabledName = (0, _get2.default)(keyMaps, 'disabled', 'disabled');
  const disabledKeys = Object.keys(keyEntities).filter(key => keyEntities[key].data[disabledName]);
  const {
    checkedKeys
  } = calcCheckedKeys(disabledKeys, keyEntities);
  return checkedKeys;
}
function calcDropRelativePosition(event, treeNode) {
  const {
    clientY
  } = event;
  const {
    top,
    bottom,
    height
  } = treeNode.nodeInstance.getBoundingClientRect();
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  if (clientY <= top + height * DRAG_OFFSET) {
    return -1;
  }
  if (clientY >= bottom - height * DRAG_OFFSET) {
    return 1;
  }
  return 0;
}
function getDragNodesKeys(key, keyEntities) {
  return findDescendantKeys([key], keyEntities, true);
}
function calcDropActualPosition(pos, relativeDropPos) {
  const posArr = pos.split('-');
  // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
  return relativeDropPos + Number(posArr[posArr.length - 1]);
}