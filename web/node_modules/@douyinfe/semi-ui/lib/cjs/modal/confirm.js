"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirm;
exports.withConfirm = withConfirm;
exports.withError = withError;
exports.withInfo = withInfo;
exports.withSuccess = withSuccess;
exports.withWarning = withWarning;
var _omit2 = _interopRequireDefault(require("lodash/omit"));
var _react = _interopRequireDefault(require("react"));
var _reactRender = require("../_utils/reactRender");
var _Modal = require("./Modal");
var _ConfirmModal = _interopRequireDefault(require("./ConfirmModal"));
require("@douyinfe/semi-foundation/lib/cjs/modal/modal.css");
var _semiIcons = require("@douyinfe/semi-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function confirm(props) {
  // create a dom in adapter?
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = Object.assign({}, props);
  const destroy = () => {
    (0, _reactRender.unmount)(div);
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
    for (let i = 0; i < _Modal.destroyFns.length; i++) {
      const fn = _Modal.destroyFns[i];
      if (fn === close) {
        _Modal.destroyFns.splice(i, 1);
        break;
      }
    }
  };
  function render(renderProps) {
    const {
      afterClose
    } = renderProps;
    (0, _reactRender.render)(/*#__PURE__*/_react.default.createElement(_ConfirmModal.default, Object.assign({}, renderProps, {
      afterClose: () => {
        afterClose === null || afterClose === void 0 ? void 0 : afterClose();
        destroy();
      },
      motion: props.motion
    })), div);
  }
  function close() {
    currentConfig = Object.assign(Object.assign({}, currentConfig), {
      visible: false
    });
    render(currentConfig);
  }
  function update(newConfig) {
    currentConfig = Object.assign(Object.assign({}, currentConfig), newConfig);
    render(currentConfig);
  }
  render(currentConfig);
  _Modal.destroyFns.push(close);
  return {
    destroy: close,
    update
  };
}
function withInfo(props) {
  return Object.assign({
    type: 'info',
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconInfoCircle, null)
  }, props);
}
function withSuccess(props) {
  return Object.assign({
    type: 'success',
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconTickCircle, null)
  }, props);
}
function withWarning(props) {
  return Object.assign({
    type: 'warning',
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertTriangle, null)
  }, props);
}
function withError(props) {
  return Object.assign({
    type: 'error',
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlertCircle, null),
    okButtonProps: Object.assign({
      type: 'danger'
    }, props.okButtonProps)
  }, (0, _omit2.default)(props, ['okButtonProps']));
}
function withConfirm(props) {
  return Object.assign({
    type: 'confirm',
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconHelpCircle, null)
  }, props);
}