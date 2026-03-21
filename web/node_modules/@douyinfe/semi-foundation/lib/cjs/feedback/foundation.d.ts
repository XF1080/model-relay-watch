import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface FeedbackAdapter extends Partial<DefaultAdapter> {
    notifyClose(): void;
    setValue(value: any): void;
    notifyValueChange(value: any): void;
    notifyCancel: (e: any) => void | Promise<any>;
    notifyOk: (e: any) => void | Promise<any>;
    notifyTextAreaChange: (value: string, e: any) => void;
    notifyCheckBoxChange: (value: any[]) => void;
    notifyRadioChange: (e: any) => void;
}
export default class FoundationFoundation extends BaseFoundation<FeedbackAdapter> {
    constructor(adapter: FeedbackAdapter);
    handleRadioChange: (e: any) => void;
    handleEmojiReasonChange: (value: string, e?: React.MouseEvent<HTMLTextAreaElement>) => void;
    handleTextChange: (value: string, e?: React.MouseEvent<HTMLTextAreaElement>) => void;
    handleEmojiClick: (e: React.MouseEvent<HTMLSpanElement>) => void;
    handleCheckboxChange: (value: string[]) => void;
    handleCancel: (e: React.MouseEvent<Element> | React.KeyboardEvent<Element>) => void;
    handleSubmit: (e: React.MouseEvent<Element>) => void;
    handleModalOk: (e: React.MouseEvent<Element>) => Promise<void>;
    handleModalCancel: (e: React.MouseEvent<Element>) => Promise<void>;
    disableSubmitButton: () => boolean;
    getRestProps: () => import("lodash").Omit<{
        [x: string]: any;
    }, string>;
}
