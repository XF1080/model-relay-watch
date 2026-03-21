"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ConfirmModal = _interopRequireDefault(require("../ConfirmModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const HookModal = (_a, ref) => {
  var {
      afterClose,
      config
    } = _a,
    props = __rest(_a, ["afterClose", "config"]);
  const [innerConfig, setInnerConfig] = _react.default.useState(config);
  _react.default.useImperativeHandle(ref, () => ({
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
  return /*#__PURE__*/_react.default.createElement(_ConfirmModal.default, Object.assign({}, innerConfig, {
    afterClose: mergeAfterClose
  }));
};
var _default = exports.default = /*#__PURE__*/_react.default.forwardRef(HookModal);