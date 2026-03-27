import React from 'react';
import HookModal from './HookModal';
import { withConfirm, withError, withInfo, withSuccess, withWarning } from '../confirm';
let uuid = 0;
function usePatchElement() {
  const [elements, setElements] = React.useState([]);
  function patchElement(element) {
    setElements(originElements => [...originElements, element]);
    return () => {
      setElements(originElements => originElements.filter(ele => ele !== element));
    };
  }
  return [elements, patchElement];
}
export default function useModal() {
  const [elements, patchElement] = usePatchElement();
  function getConfirmFunc(withFunc) {
    return function hookConfirm(config) {
      uuid += 1;
      const modalRef = /*#__PURE__*/React.createRef();
      let closeFunc;
      const modal = /*#__PURE__*/React.createElement(HookModal, {
        key: `semi-modal-${uuid}`,
        config: withFunc(config),
        ref: modalRef,
        afterClose: () => {
          closeFunc();
        }
      });
      closeFunc = patchElement(modal);
      return {
        destroy: () => {
          if (modalRef.current) {
            modalRef.current.destroy();
          }
        },
        update: newConfig => {
          if (modalRef.current) {
            modalRef.current.update(newConfig);
          }
        }
      };
    };
  }
  return [{
    info: getConfirmFunc(withInfo),
    success: getConfirmFunc(withSuccess),
    error: getConfirmFunc(withError),
    warning: getConfirmFunc(withWarning),
    confirm: getConfirmFunc(withConfirm)
  }, /*#__PURE__*/React.createElement(React.Fragment, null, elements)];
}