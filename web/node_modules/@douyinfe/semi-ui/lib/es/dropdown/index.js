import _get from "lodash/get";
import _noop from "lodash/noop";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses, strings, numbers } from '@douyinfe/semi-foundation/lib/es/dropdown/constants';
import BaseComponent from '../_base/baseComponent';
import Tooltip from '../tooltip/index';
import { numbers as tooltipNumbers } from '@douyinfe/semi-foundation/lib/es/tooltip/constants';
import Foundation from '@douyinfe/semi-foundation/lib/es/dropdown/foundation';
import DropdownMenu from './dropdownMenu';
import DropdownItem from './dropdownItem';
import DropdownDivider from './dropdownDivider';
import DropdownTitle from './dropdownTitle';
import DropdownContext from './context';
import '@douyinfe/semi-foundation/lib/es/dropdown/dropdown.css';
import { getDefaultPropsFromGlobalConfig } from "../_utils";
const positionSet = strings.POSITION_SET;
const triggerSet = strings.TRIGGER_SET;
class Dropdown extends BaseComponent {
  constructor(props) {
    super(props);
    this.handleVisibleChange = visible => this.foundation.handleVisibleChange(visible);
    this.state = {
      popVisible: props.visible
    };
    this.foundation = new Foundation(this.adapter);
    this.tooltipRef = /*#__PURE__*/React.createRef();
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
    const className = classnames(prefixCls, contentClassName);
    const {
      level = 0
    } = this.context;
    const contextValue = {
      showTick,
      level: level + 1,
      trigger
    };
    let content = null;
    if (/*#__PURE__*/React.isValidElement(render)) {
      content = render;
    } else if (Array.isArray(menu)) {
      content = this.renderMenu();
    }
    return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React.createElement("div", {
      className: className,
      style: style
    }, /*#__PURE__*/React.createElement("div", {
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
            return /*#__PURE__*/React.createElement(Dropdown.Title, Object.assign({}, rest, {
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
            return /*#__PURE__*/React.createElement(Dropdown.Item, Object.assign({}, rest, {
              key: node + name + index
            }), name);
          }
        case 'divider':
          {
            return /*#__PURE__*/React.createElement(Dropdown.Divider, {
              key: m.node + index
            });
          }
        default:
          return null;
      }
    });
    return /*#__PURE__*/React.createElement(Dropdown.Menu, null, content);
  }
  renderPopCard() {
    const {
      render,
      contentClassName,
      style,
      showTick,
      prefixCls
    } = this.props;
    const className = classnames(prefixCls, contentClassName);
    const {
      level = 0
    } = this.context;
    const contextValue = {
      showTick,
      level: level + 1
    };
    return /*#__PURE__*/React.createElement(DropdownContext.Provider, {
      value: contextValue
    }, /*#__PURE__*/React.createElement("div", {
      className: className,
      style: style
    }, /*#__PURE__*/React.createElement("div", {
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
      spacing = typeof spacing === 'number' ? spacing : numbers.NESTED_SPACING;
    } else if (spacing === null || typeof spacing === 'undefined') {
      spacing = numbers.SPACING;
    }
    return /*#__PURE__*/React.createElement(Tooltip, Object.assign({
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
    }, attr), /*#__PURE__*/React.isValidElement(children) ? /*#__PURE__*/React.cloneElement(children, {
      //@ts-ignore
      className: classnames(_get(children, 'props.className'), {
        [`${prefixCls}-showing`]: popVisible
      }),
      'aria-haspopup': true,
      'aria-expanded': popVisible,
      onKeyDown: e => {
        this.foundation.handleKeyDown(e);
        const childrenKeyDown = _get(children, 'props.onKeyDown');
        childrenKeyDown && childrenKeyDown(e);
      }
    }) : children);
  }
}
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;
Dropdown.Title = DropdownTitle;
Dropdown.contextType = DropdownContext;
Dropdown.propTypes = {
  children: PropTypes.node,
  contentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  className: PropTypes.string,
  getPopupContainer: PropTypes.func,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  menu: PropTypes.array,
  motion: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.object]),
  onVisibleChange: PropTypes.func,
  prefixCls: PropTypes.string,
  position: PropTypes.oneOf(positionSet),
  rePosKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  render: PropTypes.node,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  showTick: PropTypes.bool,
  style: PropTypes.object,
  trigger: PropTypes.oneOf(triggerSet),
  visible: PropTypes.bool,
  zIndex: PropTypes.number
};
Dropdown.__SemiComponentName__ = "Dropdown";
Dropdown.defaultProps = getDefaultPropsFromGlobalConfig(Dropdown.__SemiComponentName__, {
  onVisibleChange: _noop,
  prefixCls: cssClasses.PREFIX,
  zIndex: tooltipNumbers.DEFAULT_Z_INDEX,
  motion: true,
  trigger: 'hover',
  position: 'bottom',
  mouseLeaveDelay: strings.DEFAULT_LEAVE_DELAY,
  showTick: false,
  closeOnEsc: true,
  onEscKeyDown: _noop
});
export default Dropdown;