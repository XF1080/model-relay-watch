import _isEqual from "lodash/isEqual";
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { checkboxGroupClasses as css, strings } from '@douyinfe/semi-foundation/lib/es/checkbox/constants';
import CheckboxGroupFoundation from '@douyinfe/semi-foundation/lib/es/checkbox/checkboxGroupFoundation';
import BaseComponent from '../_base/baseComponent';
import { Context } from './context';
import Checkbox from './checkbox';
class CheckboxGroup extends BaseComponent {
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      updateGroupValue: value => {
        this.setState({
          value
        });
      },
      notifyChange: value => {
        this.props.onChange && this.props.onChange(value);
      }
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue
    };
    this.foundation = new CheckboxGroupFoundation(this.adapter);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentDidUpdate(prevProps) {
    if (!_isEqual(prevProps.value, this.props.value)) {
      this.foundation.handlePropValueChange(this.props.value);
    }
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  onChange(evt) {
    this.foundation.handleChange(evt);
  }
  render() {
    const {
      children,
      options,
      prefixCls,
      direction,
      className,
      id,
      style,
      type,
      disabled
    } = this.props;
    const isPureCardType = type === strings.TYPE_PURECARD;
    const isCardType = type === strings.TYPE_CARD || isPureCardType;
    const prefix = prefixCls || css.PREFIX;
    const prefixClsDisplay = classnames({
      [prefix]: true,
      [`${prefix}-wrapper`]: true,
      [`${prefix}-${direction}`]: direction,
      [`${prefix}-${direction}-cardType`]: direction && isCardType,
      [`${prefix}-${direction}-pureCardType`]: direction && isPureCardType
    }, className);
    const realValue = this.state.value.slice();
    let inner;
    if (options) {
      inner = (options || []).map((option, index) => {
        if (typeof option === 'string') {
          return /*#__PURE__*/React.createElement(Checkbox, {
            role: "listitem",
            key: index,
            disabled: this.props.disabled,
            value: option,
            prefixCls: prefixCls
          }, option);
        } else {
          return /*#__PURE__*/React.createElement(Checkbox, {
            role: "listitem",
            key: index,
            disabled: option.disabled || this.props.disabled,
            value: option.value,
            prefixCls: prefixCls,
            extra: option.extra,
            className: option.className,
            style: option.style,
            onChange: option.onChange
          }, option.label);
        }
      });
    } else if (children) {
      inner = React.Children.toArray(children).map((itm, index) => /*#__PURE__*/React.cloneElement(itm, {
        key: index,
        role: 'listitem'
      }));
    }
    return /*#__PURE__*/React.createElement("div", Object.assign({
      id: id,
      role: "list",
      "aria-label": this.props['aria-label'],
      className: prefixClsDisplay,
      style: style,
      "aria-labelledby": this.props['aria-labelledby'],
      "aria-describedby": this.props['aria-describedby']
    }, this.getDataAttr(this.props)), /*#__PURE__*/React.createElement(Context.Provider, {
      value: {
        checkboxGroup: {
          onChange: this.onChange,
          value: realValue,
          disabled: this.props.disabled,
          name: this.foundation.getFormatName(),
          isCardType,
          isPureCardType
        }
      }
    }, inner));
  }
}
CheckboxGroup.propTypes = {
  'aria-describedby': PropTypes.string,
  'aria-errormessage': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  'aria-labelledby': PropTypes.string,
  'aria-required': PropTypes.bool,
  defaultValue: PropTypes.array,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func,
  children: PropTypes.node,
  prefixCls: PropTypes.string,
  direction: PropTypes.oneOf(strings.DIRECTION_SET),
  className: PropTypes.string,
  type: PropTypes.oneOf([strings.TYPE_DEFAULT, strings.TYPE_CARD, strings.TYPE_PURECARD]),
  style: PropTypes.object
};
CheckboxGroup.defaultProps = {
  disabled: false,
  onChange: () => {},
  type: strings.TYPE_DEFAULT,
  defaultValue: [],
  direction: strings.DEFAULT_DIRECTION
};
export default CheckboxGroup;