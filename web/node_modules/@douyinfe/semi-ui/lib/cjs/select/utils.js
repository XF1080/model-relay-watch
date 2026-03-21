"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOptionsFromGroup = exports.generateOption = void 0;
var _react = _interopRequireDefault(require("react"));
var _warning = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/warning"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const generateOption = (child, parent, index, newKey) => {
  const childProps = child.props;
  if (!child || !childProps) {
    return null;
  }
  const option = Object.assign(Object.assign({
    value: childProps.value,
    // Dropdown menu rendering priority label value, children, value in turn downgrade
    label: childProps.label || childProps.children || childProps.value,
    _show: true,
    _selected: false,
    _scrollIndex: index
  }, childProps), {
    _parentGroup: parent
  });
  // Props are collected from ReactNode, after React.Children.toArray
  // no need to determine whether the key exists in child
  // Even if the user does not explicitly declare it, React will always generate a key.
  option._keyInJsx = newKey || child.key;
  return option;
};
exports.generateOption = generateOption;
const getOptionsFromGroup = selectChildren => {
  let optionGroups = [];
  let options = [];
  const emptyGroup = {
    label: '',
    children: [],
    _show: false
  };
  // avoid null
  let childNodes = _react.default.Children.toArray(selectChildren);
  childNodes = childNodes.filter(childNode => childNode && childNode.props);
  let type = '';
  let optionIndex = -1;
  childNodes.forEach(child => {
    if (child.type.isSelectOption) {
      type = 'option';
      optionIndex++;
      const option = generateOption(child, undefined, optionIndex);
      emptyGroup.children.push(option);
      options.push(option);
    } else if (child.type.isSelectOptionGroup) {
      type = 'group';
      // Avoid saving children (reactNode) by... removing other props from the group except children, causing performance problems
      let _a = child.props,
        {
          children
        } = _a,
        restGroupProps = __rest(_a, ["children"]);
      restGroupProps.key = child.key;
      let originKeys = [];
      if (Array.isArray(children)) {
        // if group has children > 1
        originKeys = children.map(item => item.key);
      } else {
        originKeys.push(children.key);
      }
      children = _react.default.Children.toArray(children);
      const childrenOption = children.map((option, index) => {
        let newKey = option.key;
        if (originKeys[index] === null) {
          newKey = child.key + '' + option.key; // if option in group and didn't set key, concat parent key to avoid conflict (default generate key just like .0, .1)
        }
        optionIndex++;
        return generateOption(option, restGroupProps, optionIndex, newKey);
      });
      const group = Object.assign(Object.assign({}, child.props), {
        children: childrenOption,
        key: child.key
      });
      optionGroups.push(group);
      options = options.concat(childrenOption);
    } else {
      (0, _warning.default)(true, '[Semi Select] The children of `Select` should be `Select.Option` or `Select.OptionGroup`');
    }
  });
  if (type === 'option') {
    optionGroups = [emptyGroup];
  }
  return {
    optionGroups,
    options
  };
};
exports.getOptionsFromGroup = getOptionsFromGroup;