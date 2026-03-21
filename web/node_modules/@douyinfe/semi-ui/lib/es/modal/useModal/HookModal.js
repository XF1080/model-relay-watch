var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import ConfirmModal from '../ConfirmModal';
const HookModal = (_a, ref) => {
  var {
      afterClose,
      config
    } = _a,
    props = __rest(_a, ["afterClose", "config"]);
  const [innerConfig, setInnerConfig] = React.useState(config);
  React.useImperativeHandle(ref, () => ({
    destroy: () => {
      setInnerConfig(originConfig => Object.assign(Object.assign({}, originConfig), {
        visible: false
      }));
    },
    update: newConfig => {
      setInnerConfig(originConfig => Object.assign(Object.assign({}, originConfig), newConfig));
    }
  }));
  const mergeAfterClose = () => {
    var _a;
    (_a = config === null || config === void 0 ? void 0 : config.afterClose) === null || _a === void 0 ? void 0 : _a.call(config);
    afterClose();
  };
  return /*#__PURE__*/React.createElement(ConfirmModal, Object.assign({}, innerConfig, {
    afterClose: mergeAfterClose
  }));
};
export default /*#__PURE__*/React.forwardRef(HookModal);