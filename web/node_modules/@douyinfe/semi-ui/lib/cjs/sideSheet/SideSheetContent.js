"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sideSheet/constants");
var _iconButton = _interopRequireDefault(require("../iconButton"));
var _semiIcons = require("@douyinfe/semi-icons");
var _getDataAttr = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/getDataAttr"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
let uuid = 0;
const prefixCls = _constants.cssClasses.PREFIX;
class SideSheetContent extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    this.onMaskClick = e => {
      if (e.target === e.currentTarget) {
        this.close(e);
      }
    };
    this.close = e => {
      const {
        onClose
      } = this.props;
      onClose && onClose(e);
    };
  }
  componentDidMount() {
    this.sideSheetId = `sidesheet-${uuid++}`;
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }
  getMaskElement() {
    var _a;
    const {
      mask,
      maskStyle,
      maskClosable
    } = this.props;
    if (mask) {
      return /*#__PURE__*/_react.default.createElement("div", Object.assign({
        "aria-hidden": true,
        key: "mask",
        className: (0, _classnames.default)(`${prefixCls}-mask`, (_a = this.props.maskClassName) !== null && _a !== void 0 ? _a : ""),
        style: maskStyle,
        onClick: maskClosable ? this.onMaskClick : null
      }, this.props.maskExtraProps));
    }
    return null;
  }
  renderHeader() {
    const {
      title,
      closable,
      headerStyle,
      closeIcon
    } = this.props;
    let header, closer;
    if (title) {
      header = /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-title`,
        "x-semi-prop": "title"
      }, this.props.title);
    }
    if (closable) {
      const iconType = closeIcon || /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, null);
      closer = /*#__PURE__*/_react.default.createElement(_iconButton.default, {
        className: `${prefixCls}-close`,
        key: "close-btn",
        onClick: this.close,
        type: "tertiary",
        icon: iconType,
        theme: "borderless",
        size: "small"
      });
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-header`,
      role: 'heading',
      "aria-level": 1,
      style: Object.assign({}, headerStyle)
    }, header, closer);
  }
  getDialogElement() {
    var _a;
    const props = __rest(this.props, []);
    const style = {};
    if (props.width) {
      style.width = props.width;
      // When the mask is false, the width is set on the wrapper. At this time, sidesheet-inner does not need to set the width again, otherwise, the percentage will be accumulated repeatedly when the width is a percentage
      if (!props.mask) {
        style.width = '100%';
      }
    }
    if (props.height) {
      style.height = props.height;
    }
    const header = this.renderHeader();
    const dialogElement = /*#__PURE__*/_react.default.createElement("div", Object.assign({
      key: "dialog-element",
      role: "dialog",
      tabIndex: -1,
      className: (0, _classnames.default)(`${prefixCls}-inner`, `${prefixCls}-inner-wrap`, (_a = this.props.dialogClassName) !== null && _a !== void 0 ? _a : "", `${prefixCls}-size-${props.size}`),
      // onMouseDown={this.onDialogMouseDown}
      style: Object.assign(Object.assign({}, props.style), style)
    }, this.props.wrapperExtraProps), /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-content`
    }, header, /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-body`,
      style: props.bodyStyle,
      "x-semi-prop": "children"
    }, props.children), props.footer ? (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-footer`,
      "x-semi-prop": "footer"
    }, props.footer)) : null));
    return dialogElement;
  }
  render() {
    const _a = this.props,
      {
        mask,
        className,
        width,
        onClose,
        maskStyle,
        maskClosable,
        maskClassName,
        title,
        closable,
        headerStyle,
        height,
        style,
        size,
        bodyStyle,
        dialogClassName,
        children,
        footer,
        maskExtraProps,
        wrapperExtraProps
      } = _a,
      rest = __rest(_a, ["mask", "className", "width", "onClose", "maskStyle", "maskClosable", "maskClassName", "title", "closable", "headerStyle", "height", "style", "size", "bodyStyle", "dialogClassName", "children", "footer", "maskExtraProps", "wrapperExtraProps"]);
    const wrapperCls = (0, _classnames.default)(className, {
      [`${prefixCls}-fixed`]: !mask,
      [`${prefixCls}-size-${this.props.size}`]: !mask
    });
    const wrapperStyle = {};
    if (!mask && width) {
      wrapperStyle.width = width;
    }
    const dataAttr = (0, _getDataAttr.default)(rest);
    return /*#__PURE__*/_react.default.createElement("div", Object.assign({
      className: wrapperCls,
      style: wrapperStyle
    }, dataAttr), this.getMaskElement(), this.getDialogElement());
  }
}
exports.default = SideSheetContent;
SideSheetContent.propTypes = {
  onClose: _propTypes.default.func,
  closeIcon: _propTypes.default.node
};
SideSheetContent.defaultProps = {
  onClose: _noop2.default
};