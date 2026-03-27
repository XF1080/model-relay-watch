/// <reference types="lodash" />
import BaseFoundation, { DefaultAdapter } from "../base/foundation";
import 'prismjs';
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-tsx.js";
export interface Content {
    type: 'text' | 'image_url' | 'file_url';
    text?: string;
    image_url?: {
        url: string;
        [x: string]: any;
    };
    file_url?: {
        url: string;
        name: string;
        size: string;
        type: string;
        [x: string]: any;
    };
}
export interface Message {
    role?: string;
    name?: string;
    id?: string;
    content?: string | Content[];
    parentId?: string;
    createAt?: number;
    status?: 'loading' | 'incomplete' | 'complete' | 'error';
    [x: string]: any;
}
export interface EnableUploadProps {
    pasteUpload?: boolean;
    dragUpload?: boolean;
    clickUpload?: boolean;
}
export interface ChatAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getContainerRef: () => HTMLDivElement;
    setWheelScroll: (flag: boolean) => void;
    notifyChatsChange: (chats: Message[]) => void;
    notifyLikeMessage: (message: Message) => void;
    notifyDislikeMessage: (message: Message) => void;
    notifyCopyMessage: (message: Message) => void;
    notifyClearContext: () => void;
    notifyMessageSend: (content: string, attachment: any[]) => void;
    notifyInputChange: (props: {
        inputValue: string;
        attachment: any[];
    }) => void;
    setBackBottomVisible: (visible: boolean) => void;
    registerWheelEvent: () => void;
    unRegisterWheelEvent: () => void;
    notifyStopGenerate: (e: any) => void;
    notifyHintClick: (hint: string) => void;
    setUploadAreaVisible: (visible: boolean) => void;
    manualUpload: (e: any) => void;
    getDropAreaElement: () => HTMLDivElement;
    getDragStatus: () => boolean;
    setDragStatus: (status: boolean) => void;
}
export default class ChatFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<ChatAdapter<P, S>, P, S> {
    animation: any;
    constructor(adapter: ChatAdapter<P, S>);
    init: () => void;
    destroy: () => void;
    stopGenerate: (e: any) => void;
    scrollToBottomImmediately: () => void;
    scrollToBottomWithAnimation: () => void;
    containerScroll: (e: any) => void;
    getScroll: import("lodash").DebouncedFunc<(target: any) => typeof scroll>;
    handleScrollContainerResize: () => void;
    clearContext: (e: any) => void;
    onMessageSend: (input: string, attachment: any[]) => void;
    onHintClick: (hint: string) => void;
    onInputChange: (props: {
        inputValue: string;
        attachment: any[];
    }) => void;
    deleteMessage: (message: Message) => void;
    likeMessage: (message: Message) => void;
    dislikeMessage: (message: Message) => void;
    resetMessage: (message: Message) => void;
    handleDragOver: (e: any) => void;
    handleDragStart: (e: any) => void;
    handleDragEnd: (e: any) => void;
    handleContainerDragOver: (e: any) => void;
    handleContainerDrop: (e: any) => void;
    handleContainerDragLeave: (e: any) => void;
    getUploadProps: (uploadProps?: boolean | EnableUploadProps) => {
        dragUpload: boolean;
        clickUpload: boolean;
        pasteUpload: boolean;
    };
}
