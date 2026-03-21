"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useToast;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _react = _interopRequireWildcard(require("react"));
var _uuid = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/uuid"));
var _HookToast = _interopRequireDefault(require("./HookToast"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// const ref = null;
// TODO: toast larger than N bars, automatic folding, allowing expansion, N configurable
const defaultOpts = {
  motion: true,
  zIndex: 1010,
  duration: 3
};
function usePatchElement() {
  const [elements, setElements] = _react.default.useState([]);
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
function useToast() {
  const [elements, patchElement] = usePatchElement();
  const toastRef = (0, _react.useRef)(new Map());
  const addToast = config => {
    const id = (0, _uuid.default)('semi_toast_');
    const mergeConfig = Object.assign(Object.assign({}, config), {
      id
    });
    let closeFunc;
    const toast = /*#__PURE__*/_react.default.createElement(_HookToast.default, Object.assign({}, mergeConfig, {
      key: id,
      afterClose: instanceId => closeFunc(instanceId),
      ref: data => {
        var _a;
        toastRef.current.set(id, {
          close: (_a = data === null || data === void 0 ? void 0 : data.close) !== null && _a !== void 0 ? _a : _noop2.default
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
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, Array.isArray(elements) && elements.length ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, elements.map(item => item.element)) : null)];
}