import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { Attachment, BaseSkill, Suggestion, Reference, Content, LeftMenuChangeProps, MessageContent } from './interface';
export interface AIChatInputAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    reposPopover: () => void;
    setContent: (content: any) => void;
    focusEditor: (pos?: any) => void;
    getTriggerWidth: () => number;
    getEditor: () => any;
    getPopupID: () => string;
    notifyContentChange: (result: Content[]) => void;
    notifyConfigureChange: (value: LeftMenuChangeProps, changedValue: LeftMenuChangeProps) => void;
    manualUpload: (files: File[]) => void;
    notifyMessageSend: (props: MessageContent) => void;
    notifyStopGenerate: () => void;
    notifySkillChange: (skill: BaseSkill) => void;
    clearContent: () => void;
    clearAttachments: () => void;
    getRichTextDiv: () => HTMLDivElement | null;
    registerClickOutsideHandler: (cb: (e: any) => void) => void;
    unregisterClickOutsideHandler: () => void;
    handleReferenceDelete: (reference: Reference) => void;
    handleReferenceClick: (reference: Reference) => void;
    isSelectionText: (selection: any) => boolean;
    createSelection: (node: any, pos: number) => any;
    notifyFocus: (event: any) => void;
    notifyBlur: (event: any) => void;
    getConfigureValue: () => any;
}
export default class AIChatInputFoundation extends BaseFoundation<AIChatInputAdapter> {
    constructor(adapter: AIChatInputAdapter);
    init: () => void;
    mouseDownTarget: HTMLElement | null;
    destroy: () => void;
    handleSkillSelect: (skill: BaseSkill) => void;
    setDropdownWidth(): void;
    changeTemplateVisible: (value: boolean) => void;
    handlePaste: (files: File[]) => void;
    handleSuggestionSelect: (suggestion: Suggestion) => void;
    /**
     * Delete uploaded file item.
     * Notes:
     * - AIChatInput uses custom upload list UI, so we need to align remove behavior with Upload:
     *   1) respect uploadProps.beforeRemove (support Promise)
     *   2) call uploadProps.onRemove with (currentFile, nextFileList, currentFileItem)
     *   3) still trigger onUploadChange/uploadProps.onChange for fileList update
     */
    handleUploadFileDelete: (attachment: Attachment) => void;
    handleReferenceDelete: (reference: Reference) => void;
    handleReferenceClick: (reference: Reference) => void;
    setActiveSuggestionIndex: (index: number) => void;
    setActiveSkillIndex: (index: number) => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    onConfigureChange: (value: LeftMenuChangeProps, changedValue: LeftMenuChangeProps) => void;
    updateScrollTop: (index?: number, selector?: string) => void;
    showSuggestionPanel: () => void;
    hideSuggestionPanel: () => void;
    handleCreate: () => void;
    handleContentChange: (content: string) => void;
    onUploadChange: (props: any) => void;
    _isRichTextEmpty: () => boolean;
    canSend: () => any;
    handleStopGenerate: () => void;
    handleSend: () => void;
    handleContainerMouseDown: (e: React.MouseEvent) => void;
    handleContainerClick: (e: React.MouseEvent) => void;
    handRichTextArealKeyDown: (view: any, event: KeyboardEvent) => boolean;
    handleDeleteContent: (content: Content) => void;
    handleFocus: (event: any) => void;
    handleBlur: (event: any) => void;
}
