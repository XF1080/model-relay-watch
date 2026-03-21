"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _core = require("@tiptap/core");
var _react2 = require("@tiptap/react");
var _index = require("../../../index");
var _utils = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/utils");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function SelectSlotComponent(props) {
  var _a;
  const {
    node,
    updateAttributes
  } = props;
  const value = (_a = node.attrs.value) !== null && _a !== void 0 ? _a : '';
  const options = JSON.parse(node.attrs.options || '[]').map(option => ({
    value: option,
    label: option
  }));
  const handleChange = (0, _react.useCallback)(val => {
    if (typeof val === 'string') {
      updateAttributes({
        value: val
      });
    }
  }, [updateAttributes]);
  return /*#__PURE__*/_react.default.createElement(_react2.NodeViewWrapper, {
    className: "select-slot-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_index.Select, {
    className: "select-slot",
    optionList: options,
    value: value,
    onChange: handleChange
  }));
}
const SelectSlot = _core.Node.create({
  name: 'selectSlot',
  inline: true,
  group: 'inline',
  atom: true,
  selectable: false,
  addAttributes() {
    return {
      value: {
        default: _constants.strings.ZERO_WIDTH_CHAR,
        parseHTML: element => element.getAttribute('value'),
        renderHTML: attrs => ({
          value: attrs.value
        })
      },
      options: {
        default: '',
        parseHTML: element => element.getAttribute('options') || '',
        renderHTML: attrs => attrs.options ? {
          options: attrs.options
        } : {}
      },
      isCustomSlot: (0, _utils.getCustomSlotAttribute)()
    };
  },
  parseHTML() {
    return [{
      tag: 'select-slot'
    }];
  },
  renderHTML(_ref) {
    let {
      HTMLAttributes
    } = _ref;
    return ['select-slot', (0, _core.mergeAttributes)(HTMLAttributes)];
  },
  addNodeView() {
    return (0, _react2.ReactNodeViewRenderer)(SelectSlotComponent);
  }
});
var _default = exports.default = SelectSlot;