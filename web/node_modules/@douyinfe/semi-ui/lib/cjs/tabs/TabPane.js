"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/tabs/constants");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
var _tabsContext = _interopRequireDefault(require("./tabs-context"));
var _cssAnimation = _interopRequireDefault(require("../_cssAnimation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
class TabPane extends _react.PureComponent {
  constructor() {
    super(...arguments);
    this.ref = /*#__PURE__*/(0, _react.createRef)();
    // get direction from current item key to activeKey
    this.getDirection = (activeKey, itemKey, panes, lastActiveKey) => {
      if (itemKey !== null && activeKey !== null && Array.isArray(panes) && panes.length) {
        const activeIndex = panes.findIndex(pane => pane.itemKey === activeKey);
        const itemIndex = panes.findIndex(pane => pane.itemKey === itemKey);
        const lastActiveIndex = panes.findIndex(pane => pane.itemKey === lastActiveKey);
        if (activeIndex === itemIndex) {
          return lastActiveIndex > activeIndex;
        } else {
          return itemIndex < activeIndex;
        }
      }
      return false;
    };
    this.shouldRender = () => {
      const {
        itemKey
      } = this.props;
      const {
        activeKey,
        lazyRender
      } = this.context;
      const active = activeKey === itemKey;
      this._active = this._active || active;
      return lazyRender ? this._active : true;
    };
  }
  render() {
    const {
      tabPaneMotion: motion,
      tabPosition,
      prevActiveKey
    } = this.context;
    const _a = this.props,
      {
        className,
        style,
        children,
        itemKey,
        tabIndex
      } = _a,
      restProps = __rest(_a, ["className", "style", "children", "itemKey", "tabIndex"]);
    const active = this.context.activeKey === itemKey;
    const classNames = (0, _classnames.default)(className, {
      [_constants.cssClasses.TABS_PANE_INACTIVE]: !active,
      [_constants.cssClasses.TABS_PANE_ACTIVE]: active,
      [_constants.cssClasses.TABS_PANE]: true
    });
    const shouldRender = this.shouldRender();
    const startClassName = (() => {
      const direction = this.getDirection(this.context.activeKey, itemKey, this.context.panes, prevActiveKey);
      if (tabPosition === 'top') {
        if (direction) {
          return _constants.cssClasses.TABS_PANE_ANIMATE_RIGHT_SHOW;
        } else {
          return _constants.cssClasses.TABS_PANE_ANIMATE_LEFT_SHOW;
        }
      } else {
        if (direction) {
          return _constants.cssClasses.TABS_PANE_ANIMATE_BOTTOM_SHOW;
        } else {
          return _constants.cssClasses.TABS_PANE_ANIMATE_TOP_SHOW;
        }
      }
    })();
    const isActivatedBecauseOtherTabPaneRemoved = !this.context.panes.find(tabPane => tabPane.itemKey === prevActiveKey);
    const hasMotion = motion && active && !isActivatedBecauseOtherTabPaneRemoved && !this.context.forceDisableMotion;
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      ref: this.ref,
      role: "tabpanel",
      id: `semiTabPanel${itemKey}`,
      "aria-labelledby": `semiTab${itemKey}`,
      className: classNames,
      style: style,
      "aria-hidden": active ? 'false' : 'true',
      tabIndex: tabIndex ? tabIndex : 0
    }, (0, _getDataAttr.default)(restProps), {
      "x-semi-prop": "children"
    }), /*#__PURE__*/_react.default.createElement(_cssAnimation.default, {
      motion: hasMotion,
      animationState: active ? "enter" : "leave",
      startClassName: startClassName
    }, _ref => {
      let {
        animationClassName,
        animationEventsNeedBind
      } = _ref;
      return /*#__PURE__*/_react.default.createElement("div", Object.assign({
        className: (0, _classnames.default)(_constants.cssClasses.TABS_PANE_MOTION_OVERLAY, animationClassName),
        "x-semi-prop": "children"
      }, animationEventsNeedBind), shouldRender ? children : null);
    }));
  }
}
TabPane.isTabPane = true;
TabPane.contextType = _tabsContext.default;
TabPane.propTypes = {
  className: _propTypes.default.string,
  style: _propTypes.default.object,
  children: _propTypes.default.node,
  disabled: _propTypes.default.bool,
  itemKey: _propTypes.default.string,
  tab: _propTypes.default.node,
  icon: _propTypes.default.node,
  closable: _propTypes.default.bool
};
var _default = exports.default = TabPane;