"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useModal;
var _react = _interopRequireDefault(require("react"));
var _HookModal = _interopRequireDefault(require("./HookModal"));
var _confirm = require("../confirm");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let uuid = 0;
function usePatchElement() {
  const [elements, setElements] = _react.default.useState([]);
  function patchElement(element) {
    setElements(originElements => [...originElements, element]);
    return () => {
      setElements(originElements => originElements.filter(ele => ele !== element));
    };
  }
  return [elements, patchElement];
}
function useModal() {
  const [elements, patchElement] = usePatchElement();
  function getConfirmFunc(withFunc) {
    return function hookConfirm(config) {
      uuid += 1;
      const modalRef = /*#__PURE__*/_react.default.createRef();
      let closeFunc;
      const modal = /*#__PURE__*/_react.default.createElement(_HookModal.default, {
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
    info: getConfirmFunc(_confirm.withInfo),
    success: getConfirmFunc(_confirm.withSuccess),
    error: getConfirmFunc(_confirm.withError),
    warning: getConfirmFunc(_confirm.withWarning),
    confirm: getConfirmFunc(_confirm.withConfirm)
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, elements)];
}