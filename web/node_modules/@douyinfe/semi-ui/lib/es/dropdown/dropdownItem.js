import _noop from "lodash/noop";
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses as css, strings } from '@douyinfe/semi-foundation/lib/es/dropdown/constants';
import DropdownContext from './context';
import BaseComponent from '../_base/baseComponent';
import { IconTick } from '@douyinfe/semi-icons';
const prefixCls = css.PREFIX;
class DropdownItem extends BaseComponent {
  render() {
    const {
      children,
      disabled,
      className,
      forwardRef,
      style,
      type,
      active,
      icon,
      onKeyDown,
      showTick,
      hover
    } = this.props;
    const {
      showTick: contextShowTick
    } = this.context;
    const realShowTick = contextShowTick !== null && contextShowTick !== void 0 ? contextShowTick : showTick;
    const itemclass = cls(className, {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-disabled`]: disabled,
      [`${prefixCls}-item-hover`]: hover,
      [`${prefixCls}-item-withTick`]: realShowTick,
      [`${prefixCls}-item-${type}`]: type,
      [`${prefixCls}-item-active`]: active
    });
    const events = {};
    if (!disabled) {
      ['onClick', 'onMouseEnter', 'onMouseLeave', 'onContextMenu'].forEach(eventName => {
        const isInAnotherDropdown = this.context.level !== 1;
        if (isInAnotherDropdown && eventName === "onClick") {
          events["onMouseDown"] = e => {
            var _a, _b;
            if (e.button === 0) {
              (_b = (_a = this.props)[eventName]) === null || _b === void 0 ? void 0 : _b.call(_a, e);
            }
          };
        } else {
          events[eventName] = this.props[eventName];
        }
      });
    }
    let tick = null;
    switch (true) {
      case realShowTick && active:
        tick = /*#__PURE__*/React.createElement(IconTick, null);
        break;
      case realShowTick && !active:
        tick = /*#__PURE__*/React.createElement(IconTick, {
          style: {
            color: 'transparent'
          }
        });
        break;
      default:
        tick = null;
        break;
    }
    let iconContent = null;
    if (icon) {
      iconContent = /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-item-icon`
      }, icon);
    }
    return /*#__PURE__*/React.createElement("li", Object.assign({
      role: "menuitem",
      tabIndex: -1,
      "aria-disabled": disabled
    }, events, {
      onKeyDown: onKeyDown,
      ref: ref => forwardRef(ref),
      className: itemclass,
      style: style
    }, this.getDataAttr(this.props)), tick, iconContent, children);
  }
}
DropdownItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  forwardRef: PropTypes.func,
  type: PropTypes.oneOf(strings.ITEM_TYPE),
  active: PropTypes.bool,
  icon: PropTypes.node
};
DropdownItem.contextType = DropdownContext;
DropdownItem.defaultProps = {
  disabled: false,
  divided: false,
  selected: false,
  onMouseEnter: _noop,
  onMouseLeave: _noop,
  forwardRef: _noop
};
DropdownItem.elementType = 'Dropdown.Item';
export default DropdownItem;