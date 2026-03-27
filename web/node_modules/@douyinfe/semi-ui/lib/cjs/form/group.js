"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _utils = require("@douyinfe/semi-foundation/lib/cjs/form/utils");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/form/constants");
var ObjectUtil = _interopRequireWildcard(require("@douyinfe/semi-foundation/lib/cjs/utils/object"));
var _errorMessage = _interopRequireDefault(require("./errorMessage"));
var _label = _interopRequireDefault(require("./label"));
var _context = require("./context");
var _index = require("./hooks/index");
var _inputGroup = _interopRequireDefault(require("../input/inputGroup"));
var _index2 = require("../grid/index");
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
const prefix = _constants.cssClasses.PREFIX;
// Group component to remove Labels and ErrorMessages from its child fields
// Unified insertion of Labels and ErrorMessages from the group level
// Get Errors of all field in this group
const GroupError = props => {
  const {
    fieldSet
  } = props;
  const formState = (0, _index.useFormState)();
  const error = fieldSet.map(field => ObjectUtil.get(formState.errors, field));
  if ((0, _utils.isValid)(error)) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
    error: error,
    showValidateIcon: props.showValidateIcon,
    isInInputGroup: props.isInInputGroup
  });
};
class FormInputGroup extends _react.Component {
  renderLabel(label, formProps) {
    if (label) {
      if ((0, _isString2.default)(label)) {
        return /*#__PURE__*/_react.default.createElement(_label.default, {
          width: formProps.labelWidth,
          text: label
        });
      } else {
        return /*#__PURE__*/_react.default.createElement(_label.default, Object.assign({
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
    const inner = _react.default.Children.map(children, child => {
      if (child && child.props && child.props.field) {
        groupFieldSet.push(child.props.field);
        return /*#__PURE__*/_react.default.cloneElement(child, {
          isInInputGroup: true
          // noErrorMessage: true,
          // noLabel: true
        });
      }
      return null;
    });
    const groupCls = (0, _classnames.default)({
      [`${prefix}-field-group`]: true
    });
    const labelCol = formProps.labelCol;
    const wrapperCol = formProps.wrapperCol;
    const labelAlign = formProps.labelAlign;
    const appendCol = labelCol && wrapperCol;
    const labelColCls = labelCol ? `${prefix}-col-${labelAlign}` : '';
    const labelContent = this.renderLabel(label, formProps);
    const inputGroupContent = /*#__PURE__*/_react.default.createElement(_inputGroup.default, Object.assign({
      disabled: formProps.disabled
    }, rest), inner);
    const groupErrorContent = /*#__PURE__*/_react.default.createElement(GroupError, {
      fieldSet: groupFieldSet,
      showValidateIcon: formProps.showValidateIcon,
      isInInputGroup: true
    });
    const extraCls = (0, _classnames.default)(`${prefix}-field-extra`, {
      [`${prefix}-field-extra-string`]: typeof extraText === 'string',
      [`${prefix}-field-extra-middle`]: extraTextPosition === 'middle',
      [`${prefix}-field-extra-bottom`]: extraTextPosition === 'bottom'
    });
    const extraContent = extraText ? /*#__PURE__*/_react.default.createElement("div", {
      className: extraCls,
      "x-semi-prop": "extraText"
    }, extraText) : null;
    let content;
    switch (true) {
      case !appendCol:
        content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, labelContent, /*#__PURE__*/_react.default.createElement("div", null, extraTextPosition === 'middle' ? extraContent : null, inputGroupContent, extraTextPosition === 'bottom' ? extraContent : null, groupErrorContent));
        break;
      case appendCol && labelPosition === 'top':
        // When labelPosition is top, you need to add an overflow hidden div to the label, otherwise it will be arranged horizontally
        content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
          style: {
            overflow: 'hidden'
          }
        }, /*#__PURE__*/_react.default.createElement(_index2.Col, Object.assign({}, labelCol, {
          className: labelColCls
        }), labelContent)), /*#__PURE__*/_react.default.createElement(_index2.Col, Object.assign({}, wrapperCol), extraTextPosition === 'middle' ? extraContent : null, inputGroupContent, extraTextPosition === 'bottom' ? extraContent : null, groupErrorContent));
        break;
      case appendCol && labelPosition !== 'top':
        content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index2.Col, Object.assign({}, labelCol, {
          className: labelColCls
        }), labelContent), /*#__PURE__*/_react.default.createElement(_index2.Col, Object.assign({}, wrapperCol), extraTextPosition === 'middle' ? extraContent : null, inputGroupContent, extraTextPosition === 'bottom' ? extraContent : null, groupErrorContent));
        break;
      default:
        break;
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      "x-label-pos": labelPosition,
      className: groupCls
    }, content);
  }
}
FormInputGroup.contextType = _context.FormUpdaterContext;
FormInputGroup.defaultProps = {
  extraTextPosition: 'bottom'
};
var _default = exports.default = FormInputGroup;