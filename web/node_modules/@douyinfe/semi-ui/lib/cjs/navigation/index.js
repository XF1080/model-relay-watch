"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/navigation/foundation"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/navigation/constants");
var _SubNav = _interopRequireDefault(require("./SubNav"));
var _Item = _interopRequireDefault(require("./Item"));
var _Footer = _interopRequireDefault(require("./Footer"));
var _Header = _interopRequireDefault(require("./Header"));
var _navContext = _interopRequireDefault(require("./nav-context"));
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
require("@douyinfe/semi-foundation/lib/cjs/navigation/navigation.css");
var _utils = require("../_utils");
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
function createAddKeysFn(context, keyName) {
  return function addKeys() {
    const handleKeys = new Set(context.state[keyName]);
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }
    keys.forEach(key => key && handleKeys.add(key));
    context.setState({
      [keyName]: Array.from(handleKeys)
    });
  };
}
function createRemoveKeysFn(context, keyName) {
  return function removeKeys() {
    const handleKeys = new Set(context.state[keyName]);
    for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      keys[_key2] = arguments[_key2];
    }
    keys.forEach(key => key && handleKeys.delete(key));
    context.setState({
      [keyName]: Array.from(handleKeys)
    });
  };
}
const {
  hasOwnProperty
} = Object.prototype;
class Nav extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.onCollapseChange = () => {
      this.foundation.handleCollapseChange();
    };
    this.foundation = new _foundation.default(this.adapter);
    this.itemsChanged = true;
    const {
      isCollapsed,
      defaultIsCollapsed,
      items,
      children
    } = props;
    const initState = {
      isCollapsed: Boolean(this.isControlled('isCollapsed') ? isCollapsed : defaultIsCollapsed),
      // calc state
      openKeys: [],
      items: [],
      itemKeysMap: {},
      selectedKeys: []
    };
    this.state = Object.assign({}, initState);
    if (items && items.length || children) {
      const calcState = this.foundation.init('constructor');
      this.state = Object.assign(Object.assign({}, initState), calcState);
    }
  }
  static getDerivedStateFromProps(props, state) {
    const willUpdateState = {};
    if (hasOwnProperty.call(props, 'isCollapsed') && props.isCollapsed !== state.isCollapsed) {
      willUpdateState.isCollapsed = props.isCollapsed;
    }
    return willUpdateState;
  }
  componentDidMount() {
    // override BaseComponent
  }
  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items || prevProps.children !== this.props.children) {
      this.foundation.init();
    } else {
      this.foundation.handleItemsChange(false);
      if (this.props.selectedKeys && !(0, _isEqual2.default)(prevProps.selectedKeys, this.props.selectedKeys)) {
        this.adapter.updateSelectedKeys(this.props.selectedKeys);
        const willOpenKeys = this.foundation.getWillOpenKeys(this.state.itemKeysMap);
        this.adapter.updateOpenKeys(willOpenKeys);
      }
      if (this.props.openKeys && !(0, _isEqual2.default)(prevProps.openKeys, this.props.openKeys)) {
        this.adapter.updateOpenKeys(this.props.openKeys);
      }
    }
  }
  get adapter() {
    var _this = this;
    return Object.assign(Object.assign({}, super.adapter), {
      notifySelect: function () {
        return _this.props.onSelect(...arguments);
      },
      notifyOpenChange: function () {
        return _this.props.onOpenChange(...arguments);
      },
      setIsCollapsed: isCollapsed => this.setState({
        isCollapsed
      }),
      notifyCollapseChange: function () {
        return _this.props.onCollapseChange(...arguments);
      },
      updateItems: items => this.setState({
        items: [...items]
      }),
      setItemKeysMap: itemKeysMap => this.setState({
        itemKeysMap: Object.assign({}, itemKeysMap)
      }),
      addSelectedKeys: createAddKeysFn(this, 'selectedKeys'),
      removeSelectedKeys: createRemoveKeysFn(this, 'selectedKeys'),
      /**
       * when `includeParentKeys` is `true`, select a nested nav item will select parent nav sub
       */
      updateSelectedKeys: function (selectedKeys) {
        let includeParentKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        let willUpdateSelectedKeys = selectedKeys;
        if (includeParentKeys) {
          const parentSelectKeys = _this.foundation.selectLevelZeroParentKeys(null, selectedKeys);
          willUpdateSelectedKeys = Array.from(new Set(selectedKeys.concat(parentSelectKeys)));
        }
        _this.setState({
          selectedKeys: willUpdateSelectedKeys
        });
      },
      updateOpenKeys: openKeys => this.setState({
        openKeys: [...openKeys]
      }),
      addOpenKeys: createAddKeysFn(this, 'openKeys'),
      removeOpenKeys: createRemoveKeysFn(this, 'openKeys'),
      setItemsChanged: isChanged => {
        this.itemsChanged = isChanged;
      }
    });
  }
  /**
   * Render navigation items recursively
   *
   * @param {NavItem[]} items
   * @returns {JSX.Element}
   */
  renderItems() {
    let items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const {
      expandIcon,
      subDropdownProps
    } = this.props;
    const finalDom = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, items.map((item, idx) => {
      if (Array.isArray(item.items) && item.items.length) {
        return /*#__PURE__*/_react.default.createElement(_SubNav.default, Object.assign({
          key: item.itemKey || String(level) + idx
        }, item, {
          level: level,
          expandIcon: expandIcon,
          subDropdownProps: subDropdownProps
        }), this.renderItems(item.items, level + 1));
      } else {
        return /*#__PURE__*/_react.default.createElement(_Item.default, Object.assign({
          key: item.itemKey || String(level) + idx
        }, item, {
          level: level
        }));
      }
    }));
    return finalDom;
  }
  render() {
    const _a = this.props,
      {
        children: originChildren,
        mode,
        onOpenChange,
        onSelect,
        onClick,
        style,
        className,
        subNavCloseDelay,
        subNavOpenDelay,
        subNavMotion,
        tooltipShowDelay,
        tooltipHideDelay,
        prefixCls,
        bodyStyle,
        footer,
        header,
        toggleIconPosition,
        limitIndent,
        renderWrapper,
        getPopupContainer
      } = _a,
      rest = __rest(_a, ["children", "mode", "onOpenChange", "onSelect", "onClick", "style", "className", "subNavCloseDelay", "subNavOpenDelay", "subNavMotion", "tooltipShowDelay", "tooltipHideDelay", "prefixCls", "bodyStyle", "footer", "header", "toggleIconPosition", "limitIndent", "renderWrapper", "getPopupContainer"]);
    const {
      selectedKeys,
      openKeys,
      items,
      isCollapsed
    } = this.state;
    const {
      updateOpenKeys,
      addOpenKeys,
      removeOpenKeys,
      updateSelectedKeys,
      addSelectedKeys,
      removeSelectedKeys
    } = this.adapter;
    const finalStyle = Object.assign({}, style);
    let children = _react.Children.toArray(originChildren);
    const footers = [];
    const headers = [];
    if (/*#__PURE__*/_react.default.isValidElement(footer)) {
      footers.push(/*#__PURE__*/_react.default.createElement(_Footer.default, {
        key: 0
      }, footer));
    } else if (footer && typeof footer === 'object') {
      footers.push(/*#__PURE__*/_react.default.createElement(_Footer.default, Object.assign({
        key: 0
      }, footer)));
    }
    if (/*#__PURE__*/_react.default.isValidElement(header)) {
      headers.push(/*#__PURE__*/_react.default.createElement(_Header.default, {
        key: 0
      }, header));
    } else if (header && typeof header === 'object') {
      headers.push(/*#__PURE__*/_react.default.createElement(_Header.default, Object.assign({
        key: 0
      }, header)));
    }
    if (Array.isArray(children) && children.length) {
      children = [...children];
      let childrenLength = children.length;
      for (let i = 0; i < childrenLength; i++) {
        const child = children[i];
        if (child.type === _Footer.default || (0, _get2.default)(child, 'type.elementType') === 'NavFooter') {
          footers.push(child);
          children.splice(i, 1);
          i--;
          childrenLength--;
        } else if (child.type === _Header.default || (0, _get2.default)(child, 'type.elementType') === 'NavHeader') {
          headers.push(child);
          children.splice(i, 1);
          i--;
          childrenLength--;
        }
      }
    }
    const finalCls = (0, _classnames.default)(prefixCls, className, {
      [`${prefixCls}-collapsed`]: isCollapsed,
      [`${prefixCls}-horizontal`]: mode === 'horizontal',
      [`${prefixCls}-vertical`]: mode === 'vertical'
    });
    const headerListOuterCls = (0, _classnames.default)(`${prefixCls}-header-list-outer`, {
      [`${prefixCls}-header-list-outer-collapsed`]: isCollapsed
    });
    if (this.itemsChanged) {
      this.adapter.setCache('itemElems', this.renderItems(items));
    }
    return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Navigation"
    }, locale => (/*#__PURE__*/_react.default.createElement(_navContext.default.Provider, {
      value: {
        subNavCloseDelay,
        subNavOpenDelay,
        subNavMotion,
        tooltipShowDelay,
        tooltipHideDelay,
        openKeys,
        openKeysIsControlled: this.isControlled('openKeys') && mode === 'vertical' && !isCollapsed,
        // canUpdateOpenKeys: mode === 'vertical' && !isCollapsed,
        canUpdateOpenKeys: true,
        selectedKeys,
        selectedKeysIsControlled: this.isControlled('selectedKeys'),
        isCollapsed,
        onCollapseChange: this.onCollapseChange,
        mode,
        onSelect,
        onOpenChange,
        updateOpenKeys,
        addOpenKeys,
        removeOpenKeys,
        updateSelectedKeys,
        addSelectedKeys,
        removeSelectedKeys,
        onClick,
        locale,
        prefixCls,
        toggleIconPosition,
        limitIndent,
        renderWrapper,
        getPopupContainer
      }
    }, /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: finalCls,
      style: finalStyle
    }, this.getDataAttr(rest)), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-inner`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: headerListOuterCls
    }, headers, /*#__PURE__*/_react.default.createElement("div", {
      style: bodyStyle,
      className: `${prefixCls}-list-wrapper`
    }, /*#__PURE__*/_react.default.createElement("ul", {
      role: "menu",
      "aria-orientation": mode,
      className: `${prefixCls}-list`
    }, this.adapter.getCache('itemElems'), children))), footers)))));
  }
}
Nav.Sub = _SubNav.default;
Nav.Item = _Item.default;
Nav.Header = _Header.default;
Nav.Footer = _Footer.default;
Nav.propTypes = {
  collapseIcon: _propTypes.default.node,
  // Initial expanded SubNav navigation key array
  defaultOpenKeys: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),
  openKeys: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),
  // Initial selected navigation key array
  defaultSelectedKeys: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),
  expandIcon: _propTypes.default.node,
  selectedKeys: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),
  // Navigation type, now supports vertical, horizontal
  mode: _propTypes.default.oneOf([..._constants.strings.MODE]),
  // Triggered when selecting a navigation item
  onSelect: _propTypes.default.func,
  // Triggered when clicking a navigation item
  onClick: _propTypes.default.func,
  // SubNav expand/close callback
  onOpenChange: _propTypes.default.func,
  // Array of options (nested options can continue)
  items: _propTypes.default.array,
  // Is it in the state of being stowed to the sidebar
  isCollapsed: _propTypes.default.bool,
  defaultIsCollapsed: _propTypes.default.bool,
  onCollapseChange: _propTypes.default.func,
  multiple: _propTypes.default.bool,
  onDeselect: _propTypes.default.func,
  subNavMotion: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.object, _propTypes.default.func]),
  subNavCloseDelay: _propTypes.default.number,
  subNavOpenDelay: _propTypes.default.number,
  tooltipShowDelay: _propTypes.default.number,
  tooltipHideDelay: _propTypes.default.number,
  children: _propTypes.default.node,
  style: _propTypes.default.object,
  bodyStyle: _propTypes.default.object,
  className: _propTypes.default.string,
  toggleIconPosition: _propTypes.default.string,
  prefixCls: _propTypes.default.string,
  header: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object]),
  footer: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.object]),
  limitIndent: _propTypes.default.bool,
  getPopupContainer: _propTypes.default.func
};
Nav.__SemiComponentName__ = "Navigation";
Nav.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Nav.__SemiComponentName__, {
  subNavCloseDelay: _constants.numbers.DEFAULT_SUBNAV_CLOSE_DELAY,
  subNavOpenDelay: _constants.numbers.DEFAULT_SUBNAV_OPEN_DELAY,
  tooltipHideDelay: _constants.numbers.DEFAULT_TOOLTIP_HIDE_DELAY,
  tooltipShowDelay: _constants.numbers.DEFAULT_TOOLTIP_SHOW_DELAY,
  onCollapseChange: _noop2.default,
  onSelect: _noop2.default,
  onClick: _noop2.default,
  onOpenChange: _noop2.default,
  toggleIconPosition: 'right',
  limitIndent: true,
  prefixCls: _constants.cssClasses.PREFIX,
  subNavMotion: true,
  // isOpen: false,
  mode: _constants.strings.MODE_VERTICAL
  // defaultOpenKeys: [],
  // defaultSelectedKeys: [],
  // items: [],
});
var _default = exports.default = Nav;