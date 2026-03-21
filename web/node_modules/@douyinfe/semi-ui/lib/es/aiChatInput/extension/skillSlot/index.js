import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { IconClose } from '@douyinfe/semi-icons';
import React from 'react';
import { getCustomSlotAttribute } from '@douyinfe/semi-foundation/lib/es/aiChatInput/utils';
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
  return /*#__PURE__*/React.createElement(NodeViewWrapper, {
    className: "skill-slot-wrapper"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'skill-slot'
  }, value, /*#__PURE__*/React.createElement(IconClose, {
    onClick: onRemove,
    className: 'skill-slot-delete'
  })));
}
const SkillSlot = Node.create({
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
      isCustomSlot: getCustomSlotAttribute()
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
    return ['skill-slot', mergeAttributes(htmlAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(SkillSlotComponent);
  }
});
export default SkillSlot;