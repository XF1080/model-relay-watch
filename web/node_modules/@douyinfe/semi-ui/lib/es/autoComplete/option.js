import _isString from "lodash/isString";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/autoComplete/constants';
import LocaleConsumer from '../locale/localeConsumer';
import { IconTick } from '@douyinfe/semi-icons';
import Highlight from '../highlight';
class Option extends PureComponent {
  onClick(_a, event) {
    var {
        value,
        label,
        children
      } = _a,
      rest = __rest(_a, ["value", "label", "children"]);
    const {
      props
    } = this;
    const isDisabled = props.disabled;
    if (!isDisabled) {
      props.onSelect(Object.assign(Object.assign({}, rest), {
        value,
        label: label || children
      }), event);
    }
  }
  renderOptionContent(_ref) {
    let {
      children,
      inputValue,
      prefixCls
    } = _ref;
    if (_isString(children) && inputValue) {
      return /*#__PURE__*/React.createElement(Highlight, {
        searchWords: [inputValue],
        sourceString: children,
        highlightClassName: `${prefixCls}-keyword`
      });
    }
    return children;
  }
  render() {
    const _a = this.props,
      {
        children,
        disabled,
        value,
        selected,
        label,
        empty,
        emptyContent,
        onSelect,
        focused,
        showTick,
        className,
        style,
        onMouseEnter,
        prefixCls,
        renderOptionItem,
        inputValue
      } = _a,
      rest = __rest(_a, ["children", "disabled", "value", "selected", "label", "empty", "emptyContent", "onSelect", "focused", "showTick", "className", "style", "onMouseEnter", "prefixCls", "renderOptionItem", "inputValue"]);
    const optionClassName = classNames(prefixCls, {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-selected`]: selected,
      [`${prefixCls}-focused`]: focused,
      [`${prefixCls}-empty`]: empty,
      [className]: className
    });
    const selectedIconClassName = classNames([`${prefixCls}-icon`]);
    if (empty) {
      if (emptyContent === null) {
        return null;
      }
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Select"
      }, locale => (/*#__PURE__*/React.createElement("div", {
        className: optionClassName,
        "x-semi-prop": "emptyContent"
      }, emptyContent || locale.emptyText)));
    }
    // Since there are empty, locale and other logic, the custom renderOptionItem is directly converged to the internal option instead of being placed in Select/index
    if (typeof renderOptionItem === 'function') {
      return renderOptionItem(Object.assign({
        disabled,
        focused,
        selected,
        style,
        label,
        value,
        inputValue,
        onMouseEnter: e => onMouseEnter(e),
        onClick: e => this.onClick(Object.assign({
          value,
          label,
          children
        }, rest), e)
      }, rest));
    }
    return (
      /*#__PURE__*/
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events
      React.createElement("div", {
        className: optionClassName,
        onClick: e => {
          this.onClick(Object.assign({
            value,
            label,
            children
          }, rest), e);
        },
        onMouseEnter: e => onMouseEnter && onMouseEnter(e),
        role: "option",
        "aria-selected": selected ? "true" : "false",
        "aria-disabled": disabled ? "true" : "false",
        style: style
      }, showTick ? (/*#__PURE__*/React.createElement("div", {
        className: selectedIconClassName
      }, /*#__PURE__*/React.createElement(IconTick, null))) : null, _isString(children) ? /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-text`
      }, this.renderOptionContent({
        children,
        inputValue,
        prefixCls
      })) : children)
    );
  }
}
Option.isSelectOption = true;
Option.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  label: PropTypes.node,
  empty: PropTypes.bool,
  emptyContent: PropTypes.node,
  onSelect: PropTypes.func,
  focused: PropTypes.bool,
  showTick: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onMouseEnter: PropTypes.func,
  prefixCls: PropTypes.string,
  renderOptionItem: PropTypes.func,
  inputValue: PropTypes.string
};
Option.defaultProps = {
  prefixCls: cssClasses.PREFIX_OPTION
};
export default Option;