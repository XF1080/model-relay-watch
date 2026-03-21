"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));
var _isString2 = _interopRequireDefault(require("lodash/isString"));
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/form/constants");
var _label = _interopRequireDefault(require("./label"));
var _grid = require("../grid");
var _context = require("./context");
var _errorMessage = _interopRequireDefault(require("./errorMessage"));
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
const FormSlot = props => {
  let labelCol, wrapperCol, labelWidth, labelAlign, content;
  let labelPosition = 'top';
  try {
    const updater = (0, _react.useContext)(_context.FormUpdaterContext);
    const formProps = updater.getFormProps(['labelPosition', 'labelWidth', 'labelAlign', 'labelCol', 'wrapperCol']);
    labelCol = formProps.labelCol;
    wrapperCol = formProps.wrapperCol;
    labelWidth = formProps.labelWidth;
    labelAlign = formProps.labelAlign;
    labelPosition = formProps.labelPosition ? formProps.labelPosition : labelPosition;
  } catch (error) {}
  props.labelPosition ? labelPosition = props.labelPosition : null;
  let {
      children,
      label,
      className,
      style,
      error,
      noLabel
    } = props,
    rest = __rest(props, ["children", "label", "className", "style", "error", "noLabel"]);
  const appendCol = labelCol && wrapperCol;
  const slotCls = (0, _classnames.default)({
    [`${prefix}-field`]: true,
    [`${prefix}-slot`]: true
  }, className);
  const labelColCls = (0, _classnames.default)({
    [`${prefix}-col-${labelAlign}`]: true
  });
  switch (true) {
    case (0, _isObject2.default)(label) && ! /*#__PURE__*/_react.default.isValidElement(label):
      // do nothing
      break;
    case (0, _isString2.default)(label) || (0, _isNumber2.default)(label):
      // @ts-ignore skip type check, the actual type is already determined
      label = {
        text: label
      };
      break;
    case /*#__PURE__*/_react.default.isValidElement(label):
      // @ts-ignore skip type check, the actual type is already determined
      label = {
        text: label
      };
      break;
    default:
      break;
  }
  let slotError = null;
  if (typeof error !== undefined) {
    let emProps = {};
    switch (true) {
      case (0, _isObject2.default)(error) && ! /*#__PURE__*/_react.default.isValidElement(error):
        // do nothing
        emProps = error;
        break;
      case (0, _isString2.default)(error) || (0, _isNumber2.default)(error):
        emProps = {
          error
        };
        break;
      case /*#__PURE__*/_react.default.isValidElement(error):
        emProps = {
          error
        };
        break;
      default:
        break;
    }
    slotError = /*#__PURE__*/_react.default.createElement(_errorMessage.default, Object.assign({}, emProps));
  }
  let mergeLabelProps = Object.assign({
    align: labelAlign,
    width: labelWidth
  }, label);
  let mainCls = (0, _classnames.default)({
    [`${prefix}-field-main`]: true,
    [`${prefix}-slot-main`]: true
  });
  switch (true) {
    case !appendCol && !noLabel:
      content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_label.default, Object.assign({}, mergeLabelProps)), /*#__PURE__*/_react.default.createElement("div", {
        className: mainCls
      }, children, slotError));
      break;
    case !appendCol && noLabel:
      content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        className: mainCls
      }, children, slotError));
      break;
    case appendCol && labelPosition === 'top':
      // When labelPosition is top, you need to add an overflow hidden div to the label, otherwise it will be arranged horizontally
      content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          overflow: 'hidden'
        }
      }, /*#__PURE__*/_react.default.createElement(_grid.Col, Object.assign({}, labelCol, {
        className: labelColCls
      }), /*#__PURE__*/_react.default.createElement(_label.default, Object.assign({}, mergeLabelProps)))), /*#__PURE__*/_react.default.createElement(_grid.Col, null, children, slotError));
      break;
    case appendCol && labelPosition !== 'top':
      content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_grid.Col, Object.assign({}, labelCol, {
        className: labelColCls
      }), /*#__PURE__*/_react.default.createElement(_label.default, Object.assign({}, mergeLabelProps))), /*#__PURE__*/_react.default.createElement(_grid.Col, null, children, slotError));
      break;
    default:
      break;
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: slotCls,
    "x-label-pos": labelPosition,
    style: style
  }, content);
};
var _default = exports.default = FormSlot;