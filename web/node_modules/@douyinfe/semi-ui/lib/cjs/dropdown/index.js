"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _get2 = _interopRequireDefault(require("lodash/get"));
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/dropdown/constants");
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _index = _interopRequireDefault(require("../tooltip/index"));
var _constants2 = require("@douyinfe/semi-foundation/lib/cjs/tooltip/constants");
var _foundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/dropdown/foundation"));
var _dropdownMenu = _interopRequireDefault(require("./dropdownMenu"));
var _dropdownItem = _interopRequireDefault(require("./dropdownItem"));
var _dropdownDivider = _interopRequireDefault(require("./dropdownDivider"));
var _dropdownTitle = _interopRequireDefault(require("./dropdownTitle"));
var _context = _interopRequireDefault(require("./context"));
require("@douyinfe/semi-foundation/lib/cjs/dropdown/dropdown.css");
var _utils = require("../_utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const positionSet = _constants.strings.POSITION_SET;
const triggerSet = _constants.strings.TRIGGER_SET;
class Dropdown extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.handleVisibleChange = visible => this.foundation.handleVisibleChange(visible);
    this.state = {
      popVisible: props.visible
    };
    this.foundation = new _foundation.default(this.adapter);
    this.tooltipRef = /*#__PURE__*/_react.default.createRef();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      setPopVisible: popVisible => this.setState({
        popVisible
      }),
      notifyVisibleChange: visible => {
        var _a, _b;
        return (_b = (_a = this.props).onVisibleChange) === null || _b === void 0 ? void 0 : _b.call(_a, visible);
      },
      getPopupId: () => this.tooltipRef.current.getPopupId()
    });
  }
  renderContent() {
    const {
      render,
      menu,
      contentClassName,
      style,
      showTick,
      prefixCls,
      trigger
    } = this.props;
    const className = (0, _classnames.default)(prefixCls, contentClassName);
    const {
      level = 0
    } = this.context;
    const contextValue = {
      showTick,
      level: level + 1,
      trigger
    };
    let content = null;
    if (/*#__PURE__*/_react.default.isValidElement(render)) {
      content = render;
    } else if (Array.isArray(menu)) {
      content = this.renderMenu();
    }
    return /*#__PURE__*/_react.default.createElement(_context.default.Provider, {
      value: contextValue
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: className,
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content`,
      "x-semi-prop": "render"
    }, content)));
  }
  renderMenu() {
    const {
      menu
    } = this.props;
    const content = menu.map((m, index) => {
      switch (m.node) {
        case 'title':
          {
            const {
                name,
                node
              } = m,
              rest = __rest(m, ["name", "node"]);
            return /*#__PURE__*/_react.default.createElement(Dropdown.Title, Object.assign({}, rest, {
              key: node + name + index
            }), name);
          }
        case 'item':
          {
            const {
                node,
                name
              } = m,
              rest = __rest(m, ["node", "name"]);
            return /*#__PURE__*/_react.default.createElement(Dropdown.Item, Object.assign({}, rest, {
              key: node + name + index
            }), name);
          }
        case 'divider':
          {
            return /*#__PURE__*/_react.default.createElement(Dropdown.Divider, {
              key: m.node + index
            });
          }
        default:
          return null;
      }
    });
    return /*#__PURE__*/_react.default.createElement(Dropdown.Menu, null, content);
  }
  renderPopCard() {
    const {
      render,
      contentClassName,
      style,
      showTick,
      prefixCls
    } = this.props;
    const className = (0, _classnames.default)(prefixCls, contentClassName);
    const {
      level = 0
    } = this.context;
    const contextValue = {
      showTick,
      level: level + 1
    };
    return /*#__PURE__*/_react.default.createElement(_context.default.Provider, {
      value: contextValue
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: className,
      style: style
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content`
    }, render)));
  }
  render() {
    const _a = this.props,
      {
        children,
        position,
        trigger,
        onVisibleChange,
        zIndex,
        className,
        motion,
        margin,
        style,
        prefixCls
      } = _a,
      attr = __rest(_a, ["children", "position", "trigger", "onVisibleChange", "zIndex", "className", "motion", "margin", "style", "prefixCls"]);
    let {
      spacing
    } = this.props;
    const {
      level
    } = this.context;
    const {
      popVisible
    } = this.state;
    const pop = this.renderContent();
    if (level > 0) {
      spacing = typeof spacing === 'number' ? spacing : _constants.numbers.NESTED_SPACING;
    } else if (spacing === null || typeof spacing === 'undefined') {
      spacing = _constants.numbers.SPACING;
    }
    return /*#__PURE__*/_react.default.createElement(_index.default, Object.assign({
      zIndex: zIndex,
      motion: motion,
      margin: margin,
      content: pop,
      className: className,
      prefixCls: prefixCls,
      spacing: spacing,
      position: position,
      trigger: trigger,
      onVisibleChange: this.handleVisibleChange,
      showArrow: false,
      returnFocusOnClose: true,
      ref: this.tooltipRef
    }, attr), /*#__PURE__*/_react.default.isValidElement(children) ? /*#__PURE__*/_react.default.cloneElement(children, {
      //@ts-ignore
      className: (0, _classnames.default)((0, _get2.default)(children, 'props.className'), {
        [`${prefixCls}-showing`]: popVisible
      }),
      'aria-haspopup': true,
      'aria-expanded': popVisible,
      onKeyDown: e => {
        this.foundation.handleKeyDown(e);
        const childrenKeyDown = (0, _get2.default)(children, 'props.onKeyDown');
        childrenKeyDown && childrenKeyDown(e);
      }
    }) : children);
  }
}
Dropdown.Menu = _dropdownMenu.default;
Dropdown.Item = _dropdownItem.default;
Dropdown.Divider = _dropdownDivider.default;
Dropdown.Title = _dropdownTitle.default;
Dropdown.contextType = _context.default;
Dropdown.propTypes = {
  children: _propTypes.default.node,
  contentClassName: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  className: _propTypes.default.string,
  getPopupContainer: _propTypes.default.func,
  margin: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.object]),
  mouseEnterDelay: _propTypes.default.number,
  mouseLeaveDelay: _propTypes.default.number,
  menu: _propTypes.default.array,
  motion: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func, _propTypes.default.object]),
  onVisibleChange: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  position: _propTypes.default.oneOf(positionSet),
  rePosKey: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  render: _propTypes.default.node,
  spacing: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.object]),
  showTick: _propTypes.default.bool,
  style: _propTypes.default.object,
  trigger: _propTypes.default.oneOf(triggerSet),
  visible: _propTypes.default.bool,
  zIndex: _propTypes.default.number
};
Dropdown.__SemiComponentName__ = "Dropdown";
Dropdown.defaultProps = (0, _utils.getDefaultPropsFromGlobalConfig)(Dropdown.__SemiComponentName__, {
  onVisibleChange: _noop2.default,
  prefixCls: _constants.cssClasses.PREFIX,
  zIndex: _constants2.numbers.DEFAULT_Z_INDEX,
  motion: true,
  trigger: 'hover',
  position: 'bottom',
  mouseLeaveDelay: _constants.strings.DEFAULT_LEAVE_DELAY,
  showTick: false,
  closeOnEsc: true,
  onEscKeyDown: _noop2.default
});
var _default = exports.default = Dropdown;