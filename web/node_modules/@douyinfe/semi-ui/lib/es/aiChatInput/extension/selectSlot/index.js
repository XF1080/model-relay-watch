import React from 'react';
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { useCallback } from 'react';
import { Select } from '../../../index';
import { getCustomSlotAttribute } from '@douyinfe/semi-foundation/lib/es/aiChatInput/utils';
import { strings } from '@douyinfe/semi-foundation/lib/es/aiChatInput/constants';
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
  const handleChange = useCallback(val => {
    if (typeof val === 'string') {
      updateAttributes({
        value: val
      });
    }
  }, [updateAttributes]);
  return /*#__PURE__*/React.createElement(NodeViewWrapper, {
    className: "select-slot-wrapper"
  }, /*#__PURE__*/React.createElement(Select, {
    className: "select-slot",
    optionList: options,
    value: value,
    onChange: handleChange
  }));
}
const SelectSlot = Node.create({
  name: 'selectSlot',
  inline: true,
  group: 'inline',
  atom: true,
  selectable: false,
  addAttributes() {
    return {
      value: {
        default: strings.ZERO_WIDTH_CHAR,
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
      isCustomSlot: getCustomSlotAttribute()
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
    return ['select-slot', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(SelectSlotComponent);
  }
});
export default SelectSlot;