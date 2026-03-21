"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findIndexByCharacter = findIndexByCharacter;
exports.getAncestorNodeByRole = getAncestorNodeByRole;
exports.getMenuButton = getMenuButton;
exports.handlePrevent = handlePrevent;
exports.isPrintableCharacter = isPrintableCharacter;
exports.setFocusToFirstItem = setFocusToFirstItem;
exports.setFocusToItem = setFocusToItem;
exports.setFocusToLastItem = setFocusToLastItem;
exports.setFocusToNextMenuitem = setFocusToNextMenuitem;
exports.setFocusToPreviousMenuItem = setFocusToPreviousMenuItem;
var _get2 = _interopRequireDefault(require("lodash/get"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function handlePrevent(event) {
  event.stopPropagation();
  event.preventDefault();
}
function isPrintableCharacter(string) {
  return string.length === 1 && string.match(/\S/);
}
// set focus to the target item in item list
function setFocusToItem(itemNodes, targetItem) {
  for (let i = 0; i < itemNodes.length; i++) {
    if (itemNodes[i] === targetItem) {
      itemNodes[i].tabIndex = 0;
      itemNodes[i].focus();
    } else {
      itemNodes[i].tabIndex = -1;
    }
  }
}
// set focus to the first item in item list
function setFocusToFirstItem(itemNodes) {
  itemNodes.length > 0 && setFocusToItem(itemNodes, itemNodes[0]);
}
// set focus to the last item in item list
function setFocusToLastItem(itemNodes) {
  itemNodes.length > 0 && setFocusToItem(itemNodes, itemNodes[itemNodes.length - 1]);
}
// set focus to the previous item in item list
function setFocusToPreviousMenuItem(itemNodes, currentItem) {
  let newMenuItem, index;
  if (itemNodes.length > 0) {
    if (currentItem === itemNodes[0]) {
      newMenuItem = itemNodes[itemNodes.length - 1];
    } else {
      index = itemNodes.indexOf(currentItem);
      newMenuItem = itemNodes[index - 1];
    }
    setFocusToItem(itemNodes, newMenuItem);
  }
}
// set focus to the next item in item list
function setFocusToNextMenuitem(itemNodes, currentItem) {
  let newMenuItem, index;
  if (itemNodes.length > 0) {
    if (currentItem === itemNodes[itemNodes.length - 1]) {
      newMenuItem = itemNodes[0];
    } else {
      index = itemNodes.indexOf(currentItem);
      newMenuItem = itemNodes[index + 1];
    }
    setFocusToItem(itemNodes, newMenuItem);
  }
}
function findIndexByCharacter(itemList, curItem, firstCharList, char) {
  let start, index;
  if (!itemList || !firstCharList || !char || char.length > 1) {
    return -1;
  }
  char = char.toLowerCase();
  // Get start index for search based on position of currentItem
  start = itemList.indexOf(curItem) + 1;
  if (start >= itemList.length) {
    start = 0;
  }
  // Check remaining menu items in the menu
  index = firstCharList.indexOf(char, start);
  // If not found in remaining menu items, check from beginning
  if (index === -1) {
    index = firstCharList.indexOf(char, 0);
  }
  return index >= 0 ? index : -1;
}
function getAncestorNodeByRole(curElement, role) {
  if (!curElement) {
    return null;
  }
  while (curElement.parentElement && (0, _get2.default)(curElement.parentElement, 'attributes.role.value', '') !== role) {
    curElement = curElement.parentElement;
  }
  return curElement.parentElement;
}
// According to the Id, find the corresponding data-popupid element
function getMenuButton(focusableEle, Id) {
  for (let i = 0; i < focusableEle.length; i++) {
    const curAriDescribedby = focusableEle[i].attributes['data-popupid'];
    if (curAriDescribedby && curAriDescribedby.value === Id) {
      return focusableEle[i];
    }
  }
  return null;
}