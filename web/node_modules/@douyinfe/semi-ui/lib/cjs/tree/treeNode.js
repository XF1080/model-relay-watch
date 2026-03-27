"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _debounce2 = _interopRequireDefault(require("lodash/debounce"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/tree/constants");
var _isEnterPress = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/isEnterPress"));
var _semiIcons = require("@douyinfe/semi-icons");
var _checkbox = require("../checkbox");
var _treeContext = _interopRequireDefault(require("./treeContext"));
var _spin = _interopRequireDefault(require("../spin"));
var _highlight = _interopRequireDefault(require("../highlight"));
var _indent = _interopRequireDefault(require("./indent"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const prefixcls = _constants.cssClasses.PREFIX_OPTION;
class TreeNode extends _react.PureComponent {
  constructor(props) {
    super(props);
    this.onSelect = e => {
      const {
        onNodeSelect
      } = this.context;
      onNodeSelect(e, this.props);
    };
    this.onExpand = e => {
      const {
        onNodeExpand
      } = this.context;
      e && e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      onNodeExpand(e, this.props);
    };
    this.onCheck = e => {
      var _a, _b;
      if (this.isDisabled()) {
        return;
      }
      const {
        onNodeCheck
      } = this.context;
      e.stopPropagation();
      (_b = (_a = e.nativeEvent) === null || _a === void 0 ? void 0 : _a.stopImmediatePropagation) === null || _b === void 0 ? void 0 : _b.call(_a);
      onNodeCheck(e, this.props);
    };
    /**
     * A11y: simulate checkbox click
     */
    this.handleCheckEnterPress = e => {
      if ((0, _isEnterPress.default)(e)) {
        this.onCheck(e);
      }
    };
    this.onContextMenu = e => {
      const {
        onNodeRightClick
      } = this.context;
      onNodeRightClick(e, this.props);
    };
    this.onClick = e => {
      const {
        expandAction
      } = this.context;
      if (expandAction === 'doubleClick') {
        this.debounceSelect(e);
        return;
      }
      this.onSelect(e);
      if (expandAction === 'click') {
        this.onExpand(e);
      }
    };
    /**
     * A11y: simulate li click
     */
    this.handleliEnterPress = e => {
      if ((0, _isEnterPress.default)(e)) {
        this.onClick(e);
      }
    };
    this.onDoubleClick = e => {
      const {
        expandAction,
        onNodeDoubleClick
      } = this.context;
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      if ((0, _isFunction2.default)(onNodeDoubleClick)) {
        onNodeDoubleClick(e, this.props);
      }
      if (expandAction === 'doubleClick') {
        this.onExpand(e);
      }
    };
    this.onDragStart = e => {
      const {
        onNodeDragStart
      } = this.context;
      e.stopPropagation();
      onNodeDragStart(e, Object.assign(Object.assign({}, this.props), {
        nodeInstance: this.refNode
      }));
      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {
        // empty
      }
    };
    this.onDragEnter = e => {
      const {
        onNodeDragEnter
      } = this.context;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, Object.assign(Object.assign({}, this.props), {
        nodeInstance: this.refNode
      }));
    };
    this.onDragOver = e => {
      const {
        onNodeDragOver
      } = this.context;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, Object.assign(Object.assign({}, this.props), {
        nodeInstance: this.refNode
      }));
    };
    this.onDragLeave = e => {
      const {
        onNodeDragLeave
      } = this.context;
      e.stopPropagation();
      onNodeDragLeave(e, Object.assign(Object.assign({}, this.props), {
        nodeInstance: this.refNode
      }));
    };
    this.onDragEnd = e => {
      const {
        onNodeDragEnd
      } = this.context;
      e.stopPropagation();
      onNodeDragEnd(e, Object.assign(Object.assign({}, this.props), {
        nodeInstance: this.refNode
      }));
    };
    this.onDrop = e => {
      const {
        onNodeDrop
      } = this.context;
      e.preventDefault();
      e.stopPropagation();
      onNodeDrop(e, Object.assign(Object.assign({}, this.props), {
        nodeInstance: this.refNode
      }));
    };
    this.getNodeChildren = () => {
      const {
        children
      } = this.props;
      return children || [];
    };
    this.isLeaf = () => {
      const {
        isLeaf,
        loaded
      } = this.props;
      const {
        loadData
      } = this.context;
      const hasChildren = this.getNodeChildren().length !== 0;
      if (isLeaf === false) {
        return false;
      }
      return isLeaf || !loadData && !hasChildren || loadData && loaded && !hasChildren;
    };
    this.isDisabled = () => {
      const {
        disabled
      } = this.props;
      const {
        treeDisabled
      } = this.context;
      if (disabled === false) {
        return false;
      }
      return Boolean(treeDisabled || disabled);
    };
    // Switcher
    this.renderSwitcher = () => {
      if (this.isLeaf()) {
        // if switcherIconDom is null, no render switcher span
        return /*#__PURE__*/_react.default.createElement("span", {
          className: (0, _classnames.default)(`${prefixcls}-switcher`)
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: `${prefixcls}-switcher-leaf-line`
        }));
      }
      return null;
    };
    this.renderRealLabel = () => {
      const {
        renderLabel
      } = this.context;
      const {
        label,
        keyword,
        data,
        filtered,
        treeNodeFilterProp
      } = this.props;
      if ((0, _isFunction2.default)(renderLabel)) {
        return renderLabel(label, data, keyword);
      } else if ((0, _isString2.default)(label) && filtered && keyword) {
        return /*#__PURE__*/_react.default.createElement(_highlight.default, {
          highlightClassName: `${prefixcls}-highlight`,
          component: 'span',
          sourceString: label,
          searchWords: [keyword]
        });
      } else {
        return label;
      }
    };
    this.setRef = node => {
      this.refNode = node;
    };
    this.state = {};
    this.debounceSelect = (0, _debounce2.default)(this.onSelect, 500, {
      leading: true,
      trailing: false
    });
  }
  renderArrow() {
    var _a, _b;
    const showIcon = !this.isLeaf();
    const {
      loading,
      expanded,
      showLine,
      expandIcon
    } = this.props;
    if (loading) {
      return /*#__PURE__*/_react.default.createElement(_spin.default, {
        wrapperClassName: `${prefixcls}-spin-icon`
      });
    }
    if (showIcon) {
      if (expandIcon) {
        if (typeof expandIcon === 'function') {
          return expandIcon({
            onClick: this.onExpand,
            className: `${prefixcls}-expand-icon`,
            expanded
          });
        } else if (/*#__PURE__*/_react.default.isValidElement(expandIcon)) {
          const className = (0, _classnames.default)(`${prefixcls}-expand-icon`, {
            [(_a = expandIcon === null || expandIcon === void 0 ? void 0 : expandIcon.props) === null || _a === void 0 ? void 0 : _a.className]: (_b = expandIcon === null || expandIcon === void 0 ? void 0 : expandIcon.props) === null || _b === void 0 ? void 0 : _b.className
          });
          return /*#__PURE__*/_react.default.cloneElement(expandIcon, {
            onClick: this.onExpand,
            className
          });
        } else {
          return expandIcon;
        }
      }
      return /*#__PURE__*/_react.default.createElement(_semiIcons.IconTreeTriangleDown, {
        role: 'button',
        "aria-label": `${expanded ? 'Expand' : 'Collapse'} the tree item`,
        className: `${prefixcls}-expand-icon`,
        size: "small",
        onClick: this.onExpand
      });
    }
    if (showLine) {
      return this.renderSwitcher();
    }
    return /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixcls}-empty-icon`
    });
  }
  renderCheckbox() {
    const {
      checked,
      halfChecked,
      eventKey
    } = this.props;
    const disabled = this.isDisabled();
    return /*#__PURE__*/_react.default.createElement("div", {
      role: 'none',
      onClick: this.onCheck,
      onKeyPress: this.handleCheckEnterPress
    }, /*#__PURE__*/_react.default.createElement(_checkbox.Checkbox, {
      "aria-label": 'Toggle the checked state of checkbox',
      value: eventKey,
      indeterminate: halfChecked,
      checked: checked,
      disabled: Boolean(disabled)
    }));
  }
  renderIcon() {
    const {
      directory,
      treeIcon
    } = this.context;
    const {
      expanded,
      icon,
      data
    } = this.props;
    if (icon) {
      return icon;
    }
    if (treeIcon) {
      return typeof treeIcon === 'function' ? treeIcon(this.props) : treeIcon;
    }
    if (directory) {
      const hasChild = !this.isLeaf();
      if (!hasChild) {
        return /*#__PURE__*/_react.default.createElement(_semiIcons.IconFile, {
          className: `${prefixcls}-item-icon`
        });
      } else {
        return expanded ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconFolderOpen, {
          className: `${prefixcls}-item-icon`
        }) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconFolder, {
          className: `${prefixcls}-item-icon`
        });
      }
    }
    return null;
  }
  renderEmptyNode() {
    const {
      emptyContent
    } = this.props;
    const wrapperCls = (0, _classnames.default)(prefixcls, {
      [`${prefixcls}-empty`]: true
    });
    return /*#__PURE__*/_react.default.createElement("ul", {
      className: wrapperCls
    }, /*#__PURE__*/_react.default.createElement("li", {
      className: `${prefixcls}-label ${prefixcls}-label-empty`,
      "x-semi-prop": "emptyContent"
    }, emptyContent));
  }
  render() {
    const _a = this.props,
      {
        eventKey,
        expanded,
        selected,
        checked,
        halfChecked,
        loading,
        active,
        level,
        empty,
        filtered,
        treeNodeFilterProp,
        display,
        style,
        isEnd,
        showLine
      } = _a,
      rest = __rest(_a, ["eventKey", "expanded", "selected", "checked", "halfChecked", "loading", "active", "level", "empty", "filtered", "treeNodeFilterProp", "display", "style", "isEnd", "showLine"]);
    if (empty) {
      return this.renderEmptyNode();
    }
    const {
      multiple,
      draggable,
      renderFullLabel,
      dragOverNodeKey,
      dropPosition,
      labelEllipsis
    } = this.context;
    const isEndNode = isEnd[isEnd.length - 1];
    const disabled = this.isDisabled();
    const dragOver = dragOverNodeKey === eventKey && dropPosition === 0;
    const dragOverGapTop = dragOverNodeKey === eventKey && dropPosition === -1;
    const dragOverGapBottom = dragOverNodeKey === eventKey && dropPosition === 1;
    const nodeCls = (0, _classnames.default)(prefixcls, {
      [`${prefixcls}-level-${level + 1}`]: true,
      [`${prefixcls}-fullLabel-level-${level + 1}`]: renderFullLabel,
      [`${prefixcls}-collapsed`]: !expanded,
      [`${prefixcls}-disabled`]: Boolean(disabled),
      [`${prefixcls}-selected`]: selected,
      [`${prefixcls}-active`]: !multiple && active,
      [`${prefixcls}-ellipsis`]: labelEllipsis,
      [`${prefixcls}-drag-over`]: !disabled && dragOver,
      [`${prefixcls}-draggable`]: !disabled && draggable && !renderFullLabel,
      // When draggable + renderFullLabel is enabled, the default style
      [`${prefixcls}-fullLabel-draggable`]: !disabled && draggable && renderFullLabel,
      // When draggable + renderFullLabel is turned on, the style of dragover
      [`${prefixcls}-fullLabel-drag-over-gap-top`]: !disabled && dragOverGapTop && renderFullLabel,
      [`${prefixcls}-fullLabel-drag-over-gap-bottom`]: !disabled && dragOverGapBottom && renderFullLabel,
      [`${prefixcls}-tree-node-last-leaf`]: isEndNode
    });
    const labelProps = {
      onClick: this.onClick,
      onContextMenu: this.onContextMenu,
      onDoubleClick: this.onDoubleClick,
      className: nodeCls,
      onExpand: this.onExpand,
      data: rest.data,
      level,
      onCheck: this.onCheck,
      style,
      expandIcon: this.renderArrow(),
      checkStatus: {
        checked,
        halfChecked
      },
      expandStatus: {
        expanded,
        loading
      },
      filtered,
      searchWord: rest.keyword
    };
    const dragProps = {
      onDoubleClick: this.onDoubleClick,
      onDragStart: draggable ? this.onDragStart : undefined,
      onDragEnter: draggable ? this.onDragEnter : undefined,
      onDragOver: draggable ? this.onDragOver : undefined,
      onDragLeave: draggable ? this.onDragLeave : undefined,
      onDrop: draggable ? this.onDrop : undefined,
      onDragEnd: draggable ? this.onDragEnd : undefined,
      draggable: !disabled && draggable || undefined
    };
    if (renderFullLabel) {
      const customLabel = renderFullLabel(Object.assign({}, labelProps));
      if (draggable) {
        // @ts-ignore skip cloneElement type check
        return /*#__PURE__*/_react.default.cloneElement(customLabel, Object.assign({
          ref: this.setRef
        }, dragProps));
      } else {
        if ((0, _isEmpty2.default)(style)) {
          return customLabel;
        } else {
          // In virtualization, props.style will contain location information
          // @ts-ignore skip cloneElement type check
          return /*#__PURE__*/_react.default.cloneElement(customLabel, {
            style: Object.assign(Object.assign({}, (0, _get2.default)(customLabel, ['props', 'style'])), style)
          });
        }
      }
    }
    const labelCls = (0, _classnames.default)(`${prefixcls}-label`, {
      [`${prefixcls}-drag-over-gap-top`]: !disabled && dragOverGapTop,
      [`${prefixcls}-drag-over-gap-bottom`]: !disabled && dragOverGapBottom
    });
    const setsize = (0, _get2.default)(rest, ['data', 'children', 'length']);
    const posinset = (0, _isString2.default)(rest.pos) ? Number(rest.pos.split('-')[level + 1]) + 1 : 1;
    return /*#__PURE__*/_react.default.createElement("li", Object.assign({
      className: nodeCls,
      role: "treeitem",
      "aria-disabled": disabled,
      "aria-checked": checked,
      "aria-selected": selected,
      "aria-setsize": setsize,
      "aria-posinset": posinset,
      "aria-expanded": expanded,
      "aria-level": level + 1,
      "data-key": eventKey,
      onClick: this.onClick,
      onKeyPress: this.handleliEnterPress,
      onContextMenu: this.onContextMenu,
      onDoubleClick: this.onDoubleClick,
      ref: this.setRef,
      style: style
    }, dragProps), /*#__PURE__*/_react.default.createElement(_indent.default, {
      showLine: showLine,
      prefixcls: prefixcls,
      level: level,
      isEnd: isEnd
    }), this.renderArrow(), /*#__PURE__*/_react.default.createElement("span", {
      className: labelCls
    }, multiple ? this.renderCheckbox() : null, this.renderIcon(), /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixcls}-label-text`
    }, this.renderRealLabel())));
  }
}
exports.default = TreeNode;
TreeNode.contextType = _treeContext.default;
TreeNode.propTypes = {
  expanded: _propTypes.default.bool,
  selected: _propTypes.default.bool,
  checked: _propTypes.default.bool,
  halfChecked: _propTypes.default.bool,
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  loaded: _propTypes.default.bool,
  loading: _propTypes.default.bool,
  isLeaf: _propTypes.default.bool,
  pos: _propTypes.default.string,
  children: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object]),
  icon: _propTypes.default.node,
  directory: _propTypes.default.bool,
  keyword: _propTypes.default.string,
  treeNodeFilterProp: _propTypes.default.string,
  selectedKey: _propTypes.default.string,
  motionKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  isEnd: _propTypes.default.arrayOf(_propTypes.default.bool),
  showLine: _propTypes.default.bool,
  expandIcon: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func])
};
TreeNode.defaultProps = {
  selectedKey: '',
  motionKey: ''
};