import BaseFoundation, { DefaultAdapter } from "../base/foundation";
export interface InputBoxAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    notifyInputChange: (props: {
        inputValue: string;
        attachment: any[];
    }) => void;
    setInputValue: (value: string) => void;
    setAttachment: (attachment: any[]) => void;
    notifySend: (content: string, attachment: any[]) => void;
}
export default class InputBoxFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<InputBoxAdapter<P, S>, P, S> {
    constructor(adapter: InputBoxAdapter<P, S>);
    onInputAreaChange: (value: string) => void;
    onAttachmentAdd: (props: any) => void;
    onAttachmentDelete: (props: any) => void;
    onSend: (e: any) => void;
    getDisableSend: () => any;
    onEnterPress: (e: any) => void;
    onPaste: (e: any) => void;
}
