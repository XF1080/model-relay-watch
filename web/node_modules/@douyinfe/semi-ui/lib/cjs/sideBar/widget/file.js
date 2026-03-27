"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FileItem = void 0;
var _react = _interopRequireWildcard(require("react"));
var _extensionTextStyle = require("@tiptap/extension-text-style");
var _starterKit = _interopRequireDefault(require("@tiptap/starter-kit"));
var _extensionImage = require("@tiptap/extension-image");
var _core = require("@tiptap/core");
var _react2 = require("@tiptap/react");
var _index = require("../../index");
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
var _semiIcons = require("@douyinfe/semi-icons");
var _classnames = _interopRequireDefault(require("classnames"));
var _code = require("./code");
var _extensionTextAlign = require("@tiptap/extension-text-align");
var _imageSlot = require("./imageSlot");
var _localeConsumer = _interopRequireDefault(require("../../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const collapseCls = _constants.cssClasses.COLLAPSE;
const prefixCls = _constants.cssClasses.FILE;
// 用于保证在输入link ，选区 UI 对用户保持一致性，否则会在输入时候，因为富文本本区域焦点丢失而看不到选区
const SelectionMark = _core.Mark.create({
  name: 'selectionMark',
  inclusive: false,
  parseHTML() {
    return [{
      tag: 'span.select'
    }];
  },
  renderHTML() {
    return ['span', {
      class: 'select'
    }, 0];
  }
});
const ConfigureButton = /*#__PURE__*/_react.default.memo(props => {
  const {
      active,
      className
    } = props,
    rest = __rest(props, ["active", "className"]);
  return /*#__PURE__*/_react.default.createElement(_index.Button, Object.assign({}, rest, {
    theme: 'borderless',
    type: 'tertiary',
    className: (0, _classnames.default)(`${prefixCls}-menu-bar-btn`, {
      [`${prefixCls}-menu-bar-btn-active`]: active,
      [className]: className
    })
  }));
});
const ConfigureDropdownItem = /*#__PURE__*/_react.default.memo(props => {
  const {
      active,
      children
    } = props,
    rest = __rest(props, ["active", "children"]);
  return /*#__PURE__*/_react.default.createElement(_index.Dropdown.Item, Object.assign({
    className: (0, _classnames.default)(`${prefixCls}-menu-bar-dropdown-item`, {
      [`${prefixCls}-menu-bar-dropdown-item-active`]: active
    })
  }, rest), children);
});
function MenuBar(_ref) {
  let {
    editor,
    className
  } = _ref;
  const [linkDropdownVisible, setLinkDropdownVisible] = (0, _react.useState)(false);
  const [linkInputValue, setLinkInputValue] = (0, _react.useState)('');
  const [linkSelectionRange, setLinkSelectionRange] = (0, _react.useState)(null);
  const editorState = (0, _react2.useEditorState)({
    editor,
    selector: ctx => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
      const {
        from,
        to
      } = ctx.editor.state.selection;
      const hasSelection = from !== to;
      const hasCursor = from === to && ctx.editor.isFocused;
      return {
        isBold: (_a = ctx.editor.isActive('bold')) !== null && _a !== void 0 ? _a : false,
        canBold: (_b = ctx.editor.can().chain().toggleBold().run()) !== null && _b !== void 0 ? _b : false,
        isItalic: (_c = ctx.editor.isActive('italic')) !== null && _c !== void 0 ? _c : false,
        canItalic: (_d = ctx.editor.can().chain().toggleItalic().run()) !== null && _d !== void 0 ? _d : false,
        isStrike: (_e = ctx.editor.isActive('strike')) !== null && _e !== void 0 ? _e : false,
        canStrike: (_f = ctx.editor.can().chain().toggleStrike().run()) !== null && _f !== void 0 ? _f : false,
        isCode: (_g = ctx.editor.isActive('code')) !== null && _g !== void 0 ? _g : false,
        canCode: (_h = ctx.editor.can().chain().toggleCode().run()) !== null && _h !== void 0 ? _h : false,
        canClearMarks: (_j = ctx.editor.can().chain().unsetAllMarks().run()) !== null && _j !== void 0 ? _j : false,
        isParagraph: (_k = ctx.editor.isActive('paragraph')) !== null && _k !== void 0 ? _k : false,
        isHeading: (_l = ctx.editor.isActive('heading')) !== null && _l !== void 0 ? _l : false,
        isHeading1: (_m = ctx.editor.isActive('heading', {
          level: 1
        })) !== null && _m !== void 0 ? _m : false,
        isHeading2: (_o = ctx.editor.isActive('heading', {
          level: 2
        })) !== null && _o !== void 0 ? _o : false,
        isHeading3: (_p = ctx.editor.isActive('heading', {
          level: 3
        })) !== null && _p !== void 0 ? _p : false,
        isHeading4: (_q = ctx.editor.isActive('heading', {
          level: 4
        })) !== null && _q !== void 0 ? _q : false,
        isHeading5: (_r = ctx.editor.isActive('heading', {
          level: 5
        })) !== null && _r !== void 0 ? _r : false,
        isHeading6: (_s = ctx.editor.isActive('heading', {
          level: 6
        })) !== null && _s !== void 0 ? _s : false,
        isBulletList: (_t = ctx.editor.isActive('bulletList')) !== null && _t !== void 0 ? _t : false,
        isOrderedList: (_u = ctx.editor.isActive('orderedList')) !== null && _u !== void 0 ? _u : false,
        isCodeBlock: (_v = ctx.editor.isActive('codeBlock')) !== null && _v !== void 0 ? _v : false,
        isBlockquote: (_w = ctx.editor.isActive('blockquote')) !== null && _w !== void 0 ? _w : false,
        isLink: (_x = ctx.editor.isActive('link')) !== null && _x !== void 0 ? _x : false,
        canLink: hasSelection || hasCursor,
        canUndo: (_y = ctx.editor.can().chain().undo().run()) !== null && _y !== void 0 ? _y : false,
        canRedo: (_z = ctx.editor.can().chain().redo().run()) !== null && _z !== void 0 ? _z : false,
        isAlignLeft: (_0 = ctx.editor.isActive({
          textAlign: 'left'
        })) !== null && _0 !== void 0 ? _0 : false,
        isAlignCenter: (_1 = ctx.editor.isActive({
          textAlign: 'center'
        })) !== null && _1 !== void 0 ? _1 : false,
        isAlignRight: (_2 = ctx.editor.isActive({
          textAlign: 'right'
        })) !== null && _2 !== void 0 ? _2 : false,
        isAlignJustify: (_3 = ctx.editor.isActive({
          textAlign: 'justify'
        })) !== null && _3 !== void 0 ? _3 : false,
        isImage: (_4 = ctx.editor.isActive("imageUpload")) !== null && _4 !== void 0 ? _4 : false,
        canInsertImage: ctx.editor.can().insertContent({
          type: "imageUpload"
        })
      };
    }
  });
  const handleConfirmLink = (0, _react.useCallback)(locale => {
    const href = linkInputValue.trim();
    if (!href) {
      return;
    }
    const {
      from,
      to
    } = linkSelectionRange !== null && linkSelectionRange !== void 0 ? linkSelectionRange : editor.state.selection;
    const chain = editor.chain().focus();
    if (from !== to) {
      // With a selection area, set a link for the currently selected text.
      chain.setTextSelection({
        from,
        to
      }).extendMarkRange('link').setLink({
        href
      }).unsetMark('selectionMark').run();
    } else {
      // No selection area but cursor: Insert a linked text at the cursor position.
      chain.setTextSelection(from).insertContent({
        type: 'text',
        text: href,
        marks: [{
          type: 'link',
          attrs: {
            href
          }
        }]
      }).unsetMark('selectionMark').run();
    }
    _index.Toast.success(locale.linkAddSuccess);
    setLinkDropdownVisible(false);
    setLinkSelectionRange(null);
  }, [editor, linkInputValue, linkSelectionRange]);
  const handleUnsetLink = (0, _react.useCallback)(locale => {
    editor.chain().focus().unsetLink().unsetMark('selectionMark').run();
    _index.Toast.success(locale.linkRemoveSuccess);
    setLinkDropdownVisible(false);
    setLinkSelectionRange(null);
  }, [editor]);
  const handleLinkInputKeyDown = (0, _react.useCallback)((e, locale) => {
    if (e.key === 'Enter') {
      handleConfirmLink(locale);
    }
  }, [handleConfirmLink]);
  const handleImageAdd = (0, _react.useCallback)(() => {
    if (!editor) {
      return false;
    }
    try {
      editor.chain().focus().insertContent({
        type: "imageUpload"
      }).run();
    } catch (_a) {
      return false;
    }
    return true;
  }, [editor]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className
  }, /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconUndo, null),
    onClick: () => editor.chain().focus().undo().run(),
    disabled: !editorState.canUndo
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconRedo, null),
    onClick: () => editor.chain().focus().redo().run(),
    disabled: !editorState.canRedo
  }), /*#__PURE__*/_react.default.createElement(_index.Divider, {
    layout: "vertical"
  }), /*#__PURE__*/_react.default.createElement(_index.Dropdown, {
    render: /*#__PURE__*/_react.default.createElement(_index.Dropdown.Menu, null, /*#__PURE__*/_react.default.createElement(ConfigureDropdownItem, {
      className: editorState.isHeading1 ? `${prefixCls}-menu-bar-dropdown-item-active` : '',
      onClick: () => editor.chain().focus().toggleHeading({
        level: 1
      }).run()
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconH1, null)), /*#__PURE__*/_react.default.createElement(ConfigureDropdownItem, {
      className: editorState.isHeading2 ? `${prefixCls}-menu-bar-dropdown-item-active` : '',
      onClick: () => editor.chain().focus().toggleHeading({
        level: 2
      }).run()
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconH2, null)), /*#__PURE__*/_react.default.createElement(ConfigureDropdownItem, {
      className: editorState.isHeading3 ? `${prefixCls}-menu-bar-dropdown-item-active` : '',
      onClick: () => editor.chain().focus().toggleHeading({
        level: 3
      }).run()
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconH3, null)), /*#__PURE__*/_react.default.createElement(ConfigureDropdownItem, {
      className: editorState.isHeading4 ? `${prefixCls}-menu-bar-dropdown-item-active` : '',
      onClick: () => editor.chain().focus().toggleHeading({
        level: 4
      }).run()
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconH4, null)), /*#__PURE__*/_react.default.createElement(ConfigureDropdownItem, {
      className: editorState.isHeading5 ? `${prefixCls}-menu-bar-dropdown-item-active` : '',
      onClick: () => editor.chain().focus().toggleHeading({
        level: 5
      }).run()
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconH5, null)), /*#__PURE__*/_react.default.createElement(ConfigureDropdownItem, {
      className: editorState.isHeading6 ? `${prefixCls}-menu-bar-dropdown-item-active` : '',
      onClick: () => editor.chain().focus().toggleHeading({
        level: 6
      }).run()
    }, /*#__PURE__*/_react.default.createElement(_semiIcons.IconH6, null)))
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconHn, null),
    active: editorState.isHeading
  }))), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconText, null),
    onClick: () => editor.chain().focus().setParagraph().run(),
    active: editorState.isParagraph
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconList, null),
    onClick: () => editor.chain().focus().toggleBulletList().run(),
    active: editorState.isBulletList
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconOrderedList, null),
    onClick: () => editor.chain().focus().toggleOrderedList().run(),
    active: editorState.isOrderedList
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconQuote, null),
    active: editorState.isBlockquote,
    onClick: () => editor.chain().focus().setBlockquote().run()
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    active: editorState.isCodeBlock,
    className: `${prefixCls}-menu-bar-btn-codeblock`,
    onClick: () => editor.chain().focus().toggleCodeBlock().run()
  }, "CB"), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconMinus, null),
    onClick: () => editor.chain().focus().setHorizontalRule().run()
  }), /*#__PURE__*/_react.default.createElement(_index.Divider, {
    layout: "vertical"
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    active: editorState.isAlignLeft,
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlignLeft, null),
    onClick: () => editor.chain().focus().setTextAlign('left').run()
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    active: editorState.isAlignCenter,
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlignCenter, null),
    onClick: () => editor.chain().focus().setTextAlign('center').run()
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    active: editorState.isAlignRight,
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlignRight, null),
    onClick: () => editor.chain().focus().setTextAlign('right').run()
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    active: editorState.isAlignJustify,
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconAlignJustify, null),
    onClick: () => editor.chain().focus().setTextAlign('justify').run()
  }), /*#__PURE__*/_react.default.createElement(_index.Divider, {
    layout: "vertical"
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconBold, null),
    active: editorState.isBold,
    onClick: () => editor.chain().focus().toggleBold().run()
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconItalic, null),
    onClick: () => editor.chain().focus().toggleItalic().run(),
    active: editorState.isItalic,
    disabled: !editorState.canItalic
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconStrikeThrough, null),
    onClick: () => editor.chain().focus().toggleStrike().run(),
    active: editorState.isStrike,
    disabled: !editorState.canStrike
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconCode, null),
    onClick: () => editor.chain().focus().toggleCode().run(),
    active: editorState.isCode,
    disabled: !editorState.canCode
  }), /*#__PURE__*/_react.default.createElement(_index.Dropdown, {
    trigger: "click",
    visible: linkDropdownVisible,
    onVisibleChange: visible => {
      var _a;
      setLinkDropdownVisible(visible);
      if (visible) {
        const {
          from,
          to
        } = editor.state.selection;
        setLinkSelectionRange({
          from,
          to
        });
        if (from !== to) {
          editor.chain().focus().setMark('selectionMark').run();
        }
        const currentHref = ((_a = editor.getAttributes('link')) === null || _a === void 0 ? void 0 : _a.href) || '';
        setLinkInputValue(currentHref);
      } else {
        editor.chain().focus().unsetMark('selectionMark').run();
        setLinkSelectionRange(null);
      }
    },
    render: /*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-menu-bar-link-dropdown`
    }, /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Sidebar"
    }, locale => (/*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index.Input, {
      size: "small",
      placeholder: locale.enterLinkAddress,
      value: linkInputValue,
      onChange: setLinkInputValue,
      onKeyDown: e => handleLinkInputKeyDown(e, locale),
      className: `${prefixCls}-menu-bar-link-input`
    }), /*#__PURE__*/_react.default.createElement(_index.Button, {
      size: "small",
      theme: "borderless",
      type: "tertiary",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconCheckCircleStroked, null),
      onClick: e => handleConfirmLink(locale),
      disabled: !linkInputValue.trim()
    }), /*#__PURE__*/_react.default.createElement(_index.Button, {
      size: "small",
      theme: "borderless",
      icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconDeleteStroked, null),
      onClick: e => handleUnsetLink(locale),
      disabled: !editorState.isLink
    })))))
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconLink, null),
    active: editorState.isLink
  }))), /*#__PURE__*/_react.default.createElement(_index.Divider, {
    layout: "vertical"
  }), /*#__PURE__*/_react.default.createElement(ConfigureButton, {
    icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconImage, null),
    disabled: !editorState.canInsertImage,
    onClick: handleImageAdd
  }));
}
const FileItem = exports.FileItem = /*#__PURE__*/_react.default.memo(props => {
  const {
    editable = true,
    content,
    onContentChange,
    extensions = [],
    className,
    style,
    imgUploadProps
  } = props;
  const defaultExtensions = (0, _react.useMemo)(() => [_extensionTextStyle.TextStyleKit, _starterKit.default.configure({
    link: {
      openOnClick: false,
      enableClickSelection: true
    }
  }), _extensionImage.Image, SelectionMark, _extensionTextAlign.TextAlign.configure({
    types: ["heading", "paragraph"]
  }), _imageSlot.ImageUploadNode.configure(imgUploadProps)], [imgUploadProps]);
  const allExtensions = (0, _react.useMemo)(() => [...defaultExtensions, ...extensions], [defaultExtensions, extensions]);
  const editor = (0, _react2.useEditor)({
    extensions: allExtensions,
    editable: editable,
    content: content,
    onUpdate: _ref2 => {
      let {
        editor
      } = _ref2;
      onContentChange === null || onContentChange === void 0 ? void 0 : onContentChange(editor.getHTML());
    }
  });
  if (!editor) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)(prefixCls, {
      [className]: className
    }),
    style: style
  }, editable && /*#__PURE__*/_react.default.createElement(MenuBar, {
    editor: editor,
    className: `${prefixCls}-menu-bar`
  }), /*#__PURE__*/_react.default.createElement(_react2.EditorContent, {
    editor: editor,
    className: `${prefixCls}-editor`
  }));
});
const FileContent = /*#__PURE__*/_react.default.memo(props => {
  const {
    activeKey,
    files = [],
    onExpand,
    style,
    className,
    onChange
  } = props;
  return /*#__PURE__*/_react.default.createElement(_index.Collapse, {
    className: (0, _classnames.default)(collapseCls, `${collapseCls}-file`, {
      [className]: className
    }),
    style: style,
    onChange: onChange,
    activeKey: activeKey,
    clickHeaderToExpand: false
  }, files.map(file => {
    return /*#__PURE__*/_react.default.createElement(_index.Collapse.Panel, {
      header: /*#__PURE__*/_react.default.createElement(_code.CollapseHeader, {
        content: file,
        onExpand: onExpand,
        mode: 'file'
      }),
      itemKey: file.key,
      key: file.key
    }, /*#__PURE__*/_react.default.createElement(FileItem, {
      key: file.key,
      content: file.content,
      editable: false
    }));
  }));
});
var _default = exports.default = FileContent;