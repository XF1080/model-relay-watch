"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _core = require("@tiptap/core");
var _react = require("@tiptap/react");
var _semiIcons = require("@douyinfe/semi-icons");
var _react2 = _interopRequireDefault(require("react"));
var _utils = require("@douyinfe/semi-foundation/lib/cjs/aiChatInput/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SkillSlotComponent(props) {
  var _a, _b;
  const {
    node,
    editor
  } = props;
  const value = (_b = (_a = node.attrs.label) !== null && _a !== void 0 ? _a : node.attrs.value) !== null && _b !== void 0 ? _b : '';
  const onRemove = e => {
    e.preventDefault();
    e.stopPropagation();
    editor === null || editor === void 0 ? void 0 : editor.commands.clearContent();
  };
  if (value === '') {
    return null;
  }
  return /*#__PURE__*/_react2.default.createElement(_react.NodeViewWrapper, {
    className: "skill-slot-wrapper"
  }, /*#__PURE__*/_react2.default.createElement("span", {
    className: 'skill-slot'
  }, value, /*#__PURE__*/_react2.default.createElement(_semiIcons.IconClose, {
    onClick: onRemove,
    className: 'skill-slot-delete'
  })));
}
const SkillSlot = _core.Node.create({
  name: 'skillSlot',
  inline: true,
  group: 'inline',
  atom: true,
  selectable: false,
  addAttributes() {
    return {
      value: {
        default: '',
        parseHTML: element => element.getAttribute('data-value'),
        renderHTML: attributes => ({
          'data-value': attributes.value
        })
      },
      label: {
        parseHTML: element => element.getAttribute('data-label'),
        renderHTML: attributes => ({
          'data-label': attributes.label
        })
      },
      hasTemplate: {
        parseHTML: element => element.getAttribute('data-template') === 'true',
        renderHTML: attributes => ({
          'data-template': attributes.hasTemplate
        })
      },
      isCustomSlot: (0, _utils.getCustomSlotAttribute)()
    };
  },
  parseHTML() {
    return [{
      tag: 'skill-slot'
    }];
  },
  renderHTML(_ref) {
    let {
      HTMLAttributes: htmlAttributes
    } = _ref;
    return ['skill-slot', (0, _core.mergeAttributes)(htmlAttributes)];
  },
  addNodeView() {
    return (0, _react.ReactNodeViewRenderer)(SkillSlotComponent);
  }
});
var _default = exports.default = SkillSlot;