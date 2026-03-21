/// <reference types="lodash" />
import BaseFoundation, { DefaultAdapter } from "../base/foundation";
import 'prismjs';
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-tsx.js";
export interface DialogueAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getContainerRef: () => HTMLDivElement;
    setWheelScroll: (flag: boolean) => void;
    updateSelected: (selectedIds: Set<string>) => void;
    notifySelect: (selectedIds: string[]) => void;
    notifyChatsChange: (chats: Message[]) => void;
    notifyCopyMessage: (message: Message) => void;
    notifyLikeMessage: (message: Message) => void;
    notifyDislikeMessage: (message: Message) => void;
    notifyEditMessage: (message: Message) => void;
    notifyHintClick: (hint: string) => void;
    setBackBottomVisible: (visible: boolean) => void;
    registerWheelEvent: () => void;
    unRegisterWheelEvent: () => void;
}
export default class DialogueFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<DialogueAdapter<P, S>, P, S> {
    constructor(adapter: DialogueAdapter<P, S>);
    animation: any;
    init: () => void;
    destroy: () => void;
    handleSelectAll: () => void;
    handleDeselectAll: () => void;
    handleChatsChange: (chats: Message[]) => void;
    handleSelectOrRemove: (isChecked: boolean, id: string) => void;
    likeMessage: (message: Message) => void;
    dislikeMessage: (message: Message) => void;
    resetMessage: (message: Message) => void;
    editMessage: (message: Message) => void;
    deleteMessage: (message: Message) => void;
    onHintClick: (hint: string) => void;
    scrollToBottomImmediately: () => void;
    scrollToBottomWithAnimation: () => void;
    scrollToTopImmediately: () => void;
    scrollToTopWithAnimation: () => void;
    containerScroll: (e: any) => void;
    getScroll: import("lodash").DebouncedFunc<(target: any) => typeof scroll>;
}
export interface Message {
    id: string;
    content?: string | ContentItem[];
    output_text?: string;
    role: string;
    name?: string;
    createdAt?: number;
    updatedAt?: number;
    model?: string;
    status?: string;
    [x: string]: any;
}
export type ContentItem = InputContentItem | OutputContentItem;
export type InputContentItem = InputMessage | ItemReference;
export type OutputContentItem = OutputMessage | ToolCallContentItem | MCPContentItem | Reasoning;
export type ToolCallContentItem = FileSearchToolCall | WebSearchToolCall | FunctionToolCall | CustomToolCall | ImageGenerationCall | CustomObject;
export type MCPContentItem = MCPToolCall;
export interface CommonContentItem {
    id?: string;
    type?: string;
    status?: string;
    role?: string;
}
export interface InputMessage extends CommonContentItem {
    content?: string | (InputText | InputImage | InputFile | InputAudio)[];
}
export interface ItemReference extends CommonContentItem {
    file_id?: string;
}
export interface CustomObject {
    [key: string]: any;
}
export interface OutputMessage extends CommonContentItem {
    content?: (OutputText | Refusal)[];
}
export interface OutputText {
    text?: string;
    type?: string;
    annotations?: Annotation[];
}
export interface Refusal extends CommonContentItem {
    refusal?: string;
    type?: string;
}
export interface URLCitation {
    end_index?: number;
    start_index?: number;
    title?: string;
    type?: string;
    url?: string;
}
export type Annotation = URLCitation | CustomObject;
export interface Reasoning extends CommonContentItem {
    summary?: {
        text?: string;
        type?: string;
    }[];
    content?: {
        text?: string;
        type?: string;
    }[];
}
export interface FileSearchToolCallResult {
    attributes?: Map<string, string>;
    score?: number;
    file_id?: string;
    filename?: string;
    text?: string;
}
export interface FileSearchToolCall extends CommonContentItem {
    queries?: string[];
    results?: FileSearchToolCallResult[];
}
export interface WebSearchToolCall extends CommonContentItem {
    action?: SearchAction | OpenPageAction | FindAction;
}
export interface SearchAction {
    type?: string;
    query?: string;
    sources?: {
        type: string;
        url: string;
    }[];
}
export interface OpenPageAction {
    type?: string;
    url?: string;
}
export interface FindAction {
    action?: string;
    type?: string;
    query?: string;
}
export interface FunctionToolCall extends CommonContentItem {
    call_id?: string;
    name?: string;
    arguments?: string;
}
export interface CustomToolCall extends CommonContentItem {
    call_id?: string;
    name?: string;
    input?: string;
}
export interface ImageGenerationCall extends CommonContentItem {
    result?: string;
}
export interface MCPToolCall extends CommonContentItem {
    arguments?: string;
    server_label?: string;
    name?: string;
    result?: string;
    output?: string;
}
export interface FileUploadToolCall extends CommonContentItem {
    result?: string;
}
export interface InputText extends CommonContentItem {
    text?: string;
}
export interface InputImage extends CommonContentItem {
    detail?: string;
    file_id?: string;
    image_url?: string;
}
export interface InputFile extends CommonContentItem {
    file_id?: string;
    file_data?: string;
    file_url?: string;
    filename?: string;
    size?: string;
    file_type?: string;
    fileInstance?: any;
}
export interface InputAudio extends CommonContentItem {
    input_audio?: {
        data: string;
        format: string;
    };
}
export interface Action {
    status?: string;
    summary?: string;
    description?: string;
    icon?: any;
}
export interface Step {
    type?: string;
    status?: string;
    summary?: string;
    actions?: Action[];
}
export interface Reference {
    id?: string;
    type?: string;
    name?: string;
    url?: string;
    content?: string;
}
