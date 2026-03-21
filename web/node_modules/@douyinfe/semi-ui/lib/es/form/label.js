import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/form/constants';
import LocaleConsumer from '../locale/localeConsumer';
const prefixCls = cssClasses.PREFIX;
export default class Label extends PureComponent {
  render() {
    const {
      children,
      required,
      text,
      disabled,
      name,
      width,
      align,
      style,
      className,
      extra,
      id,
      optional
    } = this.props;
    const labelCls = classNames(className, {
      [`${prefixCls}-field-label`]: true,
      [`${prefixCls}-field-label-left`]: align === 'left',
      [`${prefixCls}-field-label-right`]: align === 'right',
      [`${prefixCls}-field-label-required`]: required,
      [`${prefixCls}-field-label-disabled`]: disabled,
      [`${prefixCls}-field-label-with-extra`]: extra
    });
    const labelStyle = style ? style : {};
    width ? labelStyle.width = width : null;
    const optionalText = /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Form"
    }, locale => (/*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-field-label-optional-text`
    }, locale.optional)));
    const textContent = /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-field-label-text`,
      "x-semi-prop": "label"
    }, typeof text !== 'undefined' ? text : children, optional ? optionalText : null);
    const contentWithExtra = /*#__PURE__*/React.createElement(React.Fragment, null, textContent, /*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-field-label-extra`
    }, extra));
    return /*#__PURE__*/React.createElement("label", {
      className: labelCls,
      htmlFor: name,
      style: labelStyle,
      id: id
    }, extra ? contentWithExtra : textContent);
  }
}
Label.defaultProps = {
  required: false,
  name: '',
  align: 'left',
  className: '',
  optional: false
};
Label.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  required: PropTypes.bool,
  text: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  align: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
  extra: PropTypes.node,
  optional: PropTypes.bool
};