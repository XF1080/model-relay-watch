import _omit from "lodash/omit";
import React from 'react';
import { render as reactRender, unmount as reactUnmount } from '../_utils/reactRender';
import { destroyFns } from './Modal';
import ConfirmModal from './ConfirmModal';
import '@douyinfe/semi-foundation/lib/es/modal/modal.css';
import { IconAlertCircle, IconAlertTriangle, IconHelpCircle, IconInfoCircle, IconTickCircle } from '@douyinfe/semi-icons';
export default function confirm(props) {
  // create a dom in adapter?
  const div = document.createElement('div');
  document.body.appendChild(div);
  let currentConfig = Object.assign({}, props);
  const destroy = () => {
    reactUnmount(div);
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
    for (let i = 0; i < destroyFns.length; i++) {
      const fn = destroyFns[i];
      if (fn === close) {
        destroyFns.splice(i, 1);
        break;
      }
    }
  };
  function render(renderProps) {
    const {
      afterClose
    } = renderProps;
    reactRender(/*#__PURE__*/React.createElement(ConfirmModal, Object.assign({}, renderProps, {
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
  destroyFns.push(close);
  return {
    destroy: close,
    update
  };
}
export function withInfo(props) {
  return Object.assign({
    type: 'info',
    icon: /*#__PURE__*/React.createElement(IconInfoCircle, null)
  }, props);
}
export function withSuccess(props) {
  return Object.assign({
    type: 'success',
    icon: /*#__PURE__*/React.createElement(IconTickCircle, null)
  }, props);
}
export function withWarning(props) {
  return Object.assign({
    type: 'warning',
    icon: /*#__PURE__*/React.createElement(IconAlertTriangle, null)
  }, props);
}
export function withError(props) {
  return Object.assign({
    type: 'error',
    icon: /*#__PURE__*/React.createElement(IconAlertCircle, null),
    okButtonProps: Object.assign({
      type: 'danger'
    }, props.okButtonProps)
  }, _omit(props, ['okButtonProps']));
}
export function withConfirm(props) {
  return Object.assign({
    type: 'confirm',
    icon: /*#__PURE__*/React.createElement(IconHelpCircle, null)
  }, props);
}