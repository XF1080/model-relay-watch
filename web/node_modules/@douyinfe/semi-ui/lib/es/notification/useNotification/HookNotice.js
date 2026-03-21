var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React, { useState, useEffect } from 'react';
import Notice from '../notice';
const HookNotice = (_a, ref) => {
  var {
      afterClose
    } = _a,
    config = __rest(_a, ["afterClose"]);
  const [visible, setVisible] = useState(true);
  const close = () => {
    setVisible(false);
  };
  React.useImperativeHandle(ref, () => ({
    close: () => {
      setVisible(false);
    }
  }));
  useEffect(() => {
    if (!visible) {
      afterClose(String(config.id));
    }
  }, [visible]);
  return visible ? (/*#__PURE__*/React.createElement(Notice, Object.assign({}, config, {
    onHookClose: close
  }))) : null;
};
export default /*#__PURE__*/React.forwardRef(HookNotice);