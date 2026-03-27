"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/modal/constants");
var _Modal = _interopRequireDefault(require("./Modal"));
var _utils = require("../_utils");
require("@douyinfe/semi-foundation/lib/cjs/modal/modal.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ConfirmModal = props => {
  const [visible, setVisible] = (0, _react.useState)(true);
  const [confirmLoading, setConfirmLoading] = (0, _react.useState)();
  const [cancelLoading, setCancelLoading] = (0, _react.useState)();
  const {
    direction
  } = props;
  const {
      title,
      content,
      icon,
      type,
      onCancel,
      onOk,
      className
    } = props,
    rest = __rest(props, ["title", "content", "icon", "type", "onCancel", "onOk", "className"]);
  const handleOk = (0, _react.useCallback)(e => {
    const res = onOk && onOk(e);
    if (res && res.then) {
      setConfirmLoading(true);
      res.then(function () {
        setVisible(false);
        setConfirmLoading(false);
      }, err => {
        setConfirmLoading(false);
      });
    } else {
      setVisible(false);
    }
  }, [onOk]);
  const handleCancel = (0, _react.useCallback)(e => {
    const res = onCancel && onCancel(e);
    if (res && res.then) {
      setCancelLoading(true);
      res.then(function () {
        setVisible(false);
        setCancelLoading(false);
      }, err => {
        setCancelLoading(false);
      });
    } else {
      setVisible(false);
    }
  }, [onCancel]);
  const confirmCls = `${_constants.cssClasses.DIALOG}-confirm`;
  const wrapperCls = (0, _classnames.default)(className, confirmCls, {
    [`${confirmCls}-rtl`]: direction === 'rtl'
  });
  const typeCls = (0, _classnames.default)(`${_constants.cssClasses.DIALOG}-${type}`);
  const iconNode = (0, _utils.isSemiIcon)(icon) ? /*#__PURE__*/_react.default.cloneElement(icon, {
    className: `${confirmCls}-icon ${typeCls}-icon`,
    size: 'extra-large'
  }) : icon;
  const titleNode = title == null ? null : /*#__PURE__*/_react.default.createElement("span", {
    className: `${confirmCls}-title-text`
  }, title);
  const contentCls = (0, _classnames.default)(`${confirmCls}-content`, {
    [`${confirmCls}-content-withIcon`]: props.icon
  });
  return /*#__PURE__*/_react.default.createElement(_Modal.default, Object.assign({
    className: wrapperCls,
    title: titleNode,
    confirmLoading: confirmLoading,
    cancelLoading: cancelLoading,
    onOk: handleOk,
    onCancel: handleCancel,
    icon: iconNode,
    visible: visible
  }, rest), /*#__PURE__*/_react.default.createElement("div", {
    className: contentCls,
    "x-semi-prop": "content"
  }, content));
};
var _default = exports.default = ConfirmModal;