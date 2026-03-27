import _isString from "lodash/isString";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { Component } from 'react';
import classNames from 'classnames';
import { isValid } from '@douyinfe/semi-foundation/lib/es/form/utils';
import { cssClasses } from '@douyinfe/semi-foundation/lib/es/form/constants';
import * as ObjectUtil from '@douyinfe/semi-foundation/lib/es/utils/object';
import ErrorMessage from './errorMessage';
import Label from './label';
import { FormUpdaterContext } from './context';
import { useFormState } from './hooks/index';
import InputGroup from '../input/inputGroup';
import { Col } from '../grid/index';
const prefix = cssClasses.PREFIX;
// Group component to remove Labels and ErrorMessages from its child fields
// Unified insertion of Labels and ErrorMessages from the group level
// Get Errors of all field in this group
const GroupError = props => {
  const {
    fieldSet
  } = props;
  const formState = useFormState();
  const error = fieldSet.map(field => ObjectUtil.get(formState.errors, field));
  if (isValid(error)) {
    return null;
  }
  return /*#__PURE__*/React.createElement(ErrorMessage, {
    error: error,
    showValidateIcon: props.showValidateIcon,
    isInInputGroup: props.isInInputGroup
  });
};
class FormInputGroup extends Component {
  renderLabel(label, formProps) {
    if (label) {
      if (_isString(label)) {
        return /*#__PURE__*/React.createElement(Label, {
          width: formProps.labelWidth,
          text: label
        });
      } else {
        return /*#__PURE__*/React.createElement(Label, Object.assign({
          width: formProps.labelWidth
        }, label));
      }
    }
    return null;
  }
  render() {
    const _a = this.props,
      {
        children,
        label,
        extraText,
        extraTextPosition
      } = _a,
      rest = __rest(_a, ["children", "label", "extraText", "extraTextPosition"]);
    const updater = this.context;
    const formProps = updater.getFormProps(['labelPosition', 'labelWidth', 'labelAlign', 'showValidateIcon', 'wrapperCol', 'labelCol', 'disabled']);
    const labelPosition = this.props.labelPosition || formProps.labelPosition;
    const groupFieldSet = [];
    const inner = React.Children.map(children, child => {
      if (child && child.props && child.props.field) {
        groupFieldSet.push(child.props.field);
        return /*#__PURE__*/React.cloneElement(child, {
          isInInputGroup: true
          // noErrorMessage: true,
          // noLabel: true
        });
      }
      return null;
    });
    const groupCls = classNames({
      [`${prefix}-field-group`]: true
    });
    const labelCol = formProps.labelCol;
    const wrapperCol = formProps.wrapperCol;
    const labelAlign = formProps.labelAlign;
    const appendCol = labelCol && wrapperCol;
    const labelColCls = labelCol ? `${prefix}-col-${labelAlign}` : '';
    const labelContent = this.renderLabel(label, formProps);
    const inputGroupContent = /*#__PURE__*/React.createElement(InputGroup, Object.assign({
      disabled: formProps.disabled
    }, rest), inner);
    const groupErrorContent = /*#__PURE__*/React.createElement(GroupError, {
      fieldSet: groupFieldSet,
      showValidateIcon: formProps.showValidateIcon,
      isInInputGroup: true
    });
    const extraCls = classNames(`${prefix}-field-extra`, {
      [`${prefix}-field-extra-string`]: typeof extraText === 'string',
      [`${prefix}-field-extra-middle`]: extraTextPosition === 'middle',
      [`${prefix}-field-extra-bottom`]: extraTextPosition === 'bottom'
    });
    const extraContent = extraText ? /*#__PURE__*/React.createElement("div", {
      className: extraCls,
      "x-semi-prop": "extraText"
    }, extraText) : null;
    let content;
    switch (true) {
      case !appendCol:
        content = /*#__PURE__*/React.createElement(React.Fragment, null, labelContent, /*#__PURE__*/React.createElement("div", null, extraTextPosition === 'middle' ? extraContent : null, inputGroupContent, extraTextPosition === 'bottom' ? extraContent : null, groupErrorContent));
        break;
      case appendCol && labelPosition === 'top':
        // When labelPosition is top, you need to add an overflow hidden div to the label, otherwise it will be arranged horizontally
        content = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          style: {
            overflow: 'hidden'
          }
        }, /*#__PURE__*/React.createElement(Col, Object.assign({}, labelCol, {
          className: labelColCls
        }), labelContent)), /*#__PURE__*/React.createElement(Col, Object.assign({}, wrapperCol), extraTextPosition === 'middle' ? extraContent : null, inputGroupContent, extraTextPosition === 'bottom' ? extraContent : null, groupErrorContent));
        break;
      case appendCol && labelPosition !== 'top':
        content = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Col, Object.assign({}, labelCol, {
          className: labelColCls
        }), labelContent), /*#__PURE__*/React.createElement(Col, Object.assign({}, wrapperCol), extraTextPosition === 'middle' ? extraContent : null, inputGroupContent, extraTextPosition === 'bottom' ? extraContent : null, groupErrorContent));
        break;
      default:
        break;
    }
    return /*#__PURE__*/React.createElement("div", {
      "x-label-pos": labelPosition,
      className: groupCls
    }, content);
  }
}
FormInputGroup.contextType = FormUpdaterContext;
FormInputGroup.defaultProps = {
  extraTextPosition: 'bottom'
};
export default FormInputGroup;