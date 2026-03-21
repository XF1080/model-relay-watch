import _noop from "lodash/noop";
import React, { useRef } from 'react';
import getUuid from '@douyinfe/semi-foundation/lib/es/utils/uuid';
import HookToast from './HookToast';
// const ref = null;
// TODO: toast larger than N bars, automatic folding, allowing expansion, N configurable
const defaultOpts = {
  motion: true,
  zIndex: 1010,
  duration: 3
};
function usePatchElement() {
  const [elements, setElements] = React.useState([]);
  function patchElement(element, config) {
    setElements(originElements => [{
      element,
      config
    }, ...originElements]);
    return id => {
      setElements(originElements => originElements.filter(_ref => {
        let {
          config: configOfCurrentElement
        } = _ref;
        return configOfCurrentElement.id !== id;
      }));
    };
  }
  return [elements, patchElement];
}
export default function useToast() {
  const [elements, patchElement] = usePatchElement();
  const toastRef = useRef(new Map());
  const addToast = config => {
    const id = getUuid('semi_toast_');
    const mergeConfig = Object.assign(Object.assign({}, config), {
      id
    });
    let closeFunc;
    const toast = /*#__PURE__*/React.createElement(HookToast, Object.assign({}, mergeConfig, {
      key: id,
      afterClose: instanceId => closeFunc(instanceId),
      ref: data => {
        var _a;
        toastRef.current.set(id, {
          close: (_a = data === null || data === void 0 ? void 0 : data.close) !== null && _a !== void 0 ? _a : _noop
        });
      }
    }));
    closeFunc = patchElement(toast, Object.assign({}, mergeConfig));
    return id;
  };
  const removeElement = id => {
    var _a;
    const {
      close
    } = (_a = toastRef.current.get(id)) !== null && _a !== void 0 ? _a : {};
    close === null || close === void 0 ? void 0 : close();
  };
  return [{
    success: config => addToast(Object.assign(Object.assign(Object.assign({}, defaultOpts), config), {
      type: 'success'
    })),
    info: config => addToast(Object.assign(Object.assign(Object.assign({}, defaultOpts), config), {
      type: 'info'
    })),
    error: config => addToast(Object.assign(Object.assign(Object.assign({}, defaultOpts), config), {
      type: 'error'
    })),
    warning: config => addToast(Object.assign(Object.assign(Object.assign({}, defaultOpts), config), {
      type: 'warning'
    })),
    open: config => addToast(Object.assign(Object.assign(Object.assign({}, defaultOpts), config), {
      type: 'default'
    })),
    close: id => removeElement(id)
  }, /*#__PURE__*/React.createElement(React.Fragment, null, Array.isArray(elements) && elements.length ? /*#__PURE__*/React.createElement(React.Fragment, null, elements.map(item => item.element)) : null)];
}