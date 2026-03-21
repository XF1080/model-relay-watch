"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.append = append;
exports.convertDOMRectToObject = convertDOMRectToObject;
Object.defineProperty(exports, "isHTMLElement", {
  enumerable: true,
  get: function () {
    return _isElement.default;
  }
});
exports.prepend = prepend;
var _isElement = _interopRequireDefault(require("./isElement"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 *
 * @param {HTMLElement} parentNode
 * @param  {...HTMLElement} nodes
 *
 * @param {HTMLElement}
 */
function append(parentNode) {
  for (var _len = arguments.length, nodes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    nodes[_key - 1] = arguments[_key];
  }
  for (const node of nodes) {
    parentNode.appendChild(node);
  }
  return parentNode;
}
/**
 *
 * @param {HTMLElement} parentNode
 * @param  {...HTMLElement} nodes
 *
 * @param {HTMLElement}
 */
function prepend(parentNode) {
  for (var _len2 = arguments.length, nodes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    nodes[_key2 - 1] = arguments[_key2];
  }
  if (parentNode.children && parentNode.children.length) {
    const firstNode = parentNode.children[0];
    for (const node of nodes) {
      parentNode.insertBefore(node, firstNode);
    }
  } else {
    append(parentNode, ...nodes);
  }
  return parentNode;
}
/**
 *
 * @param {DOMRect} domRect
 * @returns {object|undefined}
 */
function convertDOMRectToObject(domRect) {
  if (domRect && typeof domRect === 'object') {
    if (typeof domRect.toJSON === 'function') {
      return domRect.toJSON();
    } else {
      const keys = ['left', 'top', 'right', 'bottom', 'width', 'height'];
      return keys.reduce((obj, key) => {
        obj[key] = domRect[key];
        return obj;
      }, {});
    }
  }
  return undefined;
}