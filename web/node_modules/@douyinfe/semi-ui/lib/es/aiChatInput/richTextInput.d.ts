import { Editor, Extensions } from '@tiptap/react';
import React from 'react';
import { Content as TiptapContent } from "@tiptap/core";
import { PlaceholderProps } from './interface';
declare const _default: (props: {
    innerRef?: React.Ref<HTMLDivElement>;
    defaultContent?: TiptapContent;
    placeholder?: PlaceholderProps;
    immediatelyRender?: boolean;
    setEditor?: (editor: Editor) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onChange?: (content: string) => void;
    extensions?: Extensions;
    handleKeyDown?: (view: any, event: KeyboardEvent) => boolean;
    /**
     * Used for file paste upload.
     */
    onPaste?: (files: File[]) => void;
    /**
     * Listen to paste event on editor content DOM.
     */
    onPasteEvent?: (event: React.ClipboardEvent<HTMLDivElement>) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    handleCreate?: () => void;
    showPlaceholderWhenSkillOnly?: boolean;
}) => React.JSX.Element;
export default _default;
