"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useNotification;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/notification/constants");
var _HookNotice = _interopRequireDefault(require("./HookNotice"));
require("@douyinfe/semi-foundation/lib/cjs/notification/notification.css");
var _uuid = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/utils/uuid"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// TODO: Automatic folding + unfolding function when there are more than N
const defaultConfig = {
  duration: 3,
  position: 'topRight',
  motion: true,
  content: '',
  title: '',
  zIndex: 1010
};
function usePatchElement() {
  const [elements, setElements] = (0, _react.useState)([]);
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
  function renderList() {
    const noticesInPosition = {
      top: [],
      topLeft: [],
      topRight: [],
      bottom: [],
      bottomLeft: [],
      bottomRight: []
    };
    elements.forEach(_ref2 => {
      let {
        element,
        config
      } = _ref2;
      const {
        position
      } = config;
      noticesInPosition[position].push(element);
    });
    return Object.entries(noticesInPosition).map(obj => {
      const pos = obj[0];
      const notices = obj[1];
      // @ts-ignore
      // eslint-disable-next-line react/no-unknown-property
      return Array.isArray(notices) && notices.length ? /*#__PURE__*/_react.default.createElement("div", {
        key: pos,
        className: (0, _classnames.default)(_constants.cssClasses.LIST),
        placement: pos
      }, notices) : null;
    });
  }
  return [renderList(), patchElement];
}
function useNotification() {
  const [elements, patchElement] = usePatchElement();
  const noticeRef = new Map();
  const addNotice = config => {
    const id = (0, _uuid.default)('semi_notice_');
    const mergeConfig = Object.assign(Object.assign({}, config), {
      id
    });
    let closeFunc;
    const ref = ele => {
      noticeRef.set(id, ele);
    };
    const notice = /*#__PURE__*/_react.default.createElement(_HookNotice.default, Object.assign({
      key: id
    }, mergeConfig, {
      afterClose: instanceID => closeFunc(instanceID),
      ref: ref
    }));
    closeFunc = patchElement(notice, Object.assign({}, mergeConfig));
    return id;
  };
  const removeElement = instanceID => {
    const ele = noticeRef.get(instanceID);
    ele && ele.close();
  };
  return [{
    success: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'success'
    })),
    info: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'info'
    })),
    error: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'error'
    })),
    warning: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'warning'
    })),
    open: config => addNotice(Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
      type: 'default'
    })),
    close: removeElement
  }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, elements)];
}