import React from 'react';
import { strings } from '@douyinfe/semi-foundation/lib/es/feedback/constants';
import BaseComponent from '../_base/baseComponent';
import { ArrayElement } from '../_base/base';
import { RadioGroupProps } from '../radio/radioGroup';
import { CheckboxGroupProps } from '../checkbox/checkboxGroup';
import { ModalReactProps } from '../modal';
import { SideSheetReactProps } from '../sideSheet';
import { TextAreaProps } from '../input/textarea';
import { Locale } from '../locale/interface';
import { ButtonProps } from '../button';
import FeedbackFoundation from '@douyinfe/semi-foundation/lib/es/feedback/foundation';
import { RadioChangeEvent } from '../radio';
import '@douyinfe/semi-foundation/lib/es/feedback/feedback.css';
export interface BasicFeedbackProps {
    mode?: ArrayElement<typeof strings.MODE>;
    type?: ArrayElement<typeof strings.TYPE>;
    onValueChange?: (value: FeedbackValue) => void;
    textAreaProps?: TextAreaProps;
    radioGroupProps?: RadioGroupProps;
    checkboxGroupProps?: CheckboxGroupProps;
    renderContent?: (content: React.ReactNode) => React.ReactNode;
}
export interface FeedbackModalProps extends ModalReactProps, BasicFeedbackProps {
}
export interface FeedbackSideSheetProps extends Omit<SideSheetReactProps, 'onCancel'>, BasicFeedbackProps {
    onOk?: (e: React.MouseEvent) => void | Promise<any>;
    onCancel?: (e: React.MouseEvent) => void | Promise<any>;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    afterClose?: () => void;
}
export type FeedbackProps = FeedbackModalProps | FeedbackSideSheetProps;
interface EmojiResult {
    emoji?: string;
    text?: string;
}
type FeedbackValue = string | string[] | EmojiResult;
interface FeedbackState {
    value: FeedbackValue;
    onOKReturnPromiseStatus?: "pending" | "fulfilled" | "rejected";
    onCancelReturnPromiseStatus?: "pending" | "fulfilled" | "rejected";
}
export default class Feedback extends BaseComponent<FeedbackProps, FeedbackState> {
    static __SemiComponentName__: string;
    static defaultProps: {
        mode: string;
        type: string;
        onValueChange: (...args: any[]) => void;
        onCancel: (...args: any[]) => void;
        onOk: (...args: any[]) => void;
        afterClose: (...args: any[]) => void;
    };
    foundation: FeedbackFoundation;
    constructor(props: FeedbackProps);
    get adapter(): {
        setValue: (value: FeedbackValue) => void;
        notifyValueChange: (value: FeedbackValue) => void;
        notifyClose: () => void;
        notifyCancel: (e: React.MouseEvent) => void | Promise<any>;
        notifyOk: (e: React.MouseEvent) => void | Promise<any>;
        notifyTextAreaChange: (value: string, e: React.MouseEvent<HTMLTextAreaElement>) => void;
        notifyCheckBoxChange: (value: any[]) => void;
        notifyRadioChange: (e: RadioChangeEvent) => void;
        getContext(key: string): any;
        getContexts(): any;
        getProp(key: string): any;
        getProps(): FeedbackProps;
        getState(key: string): any;
        getStates(): FeedbackState;
        setState<K extends keyof FeedbackState>(s: Pick<FeedbackState, K>, callback?: any): void;
        getCache(c: string): any;
        getCaches(): any;
        setCache(key: any, value: any): void;
        stopPropagation(e: any): void;
        persistEvent: (event: any) => void;
    };
    textNode: () => React.JSX.Element;
    emojiNode: () => React.JSX.Element;
    radioNode: () => React.JSX.Element;
    checkboxNode: () => React.JSX.Element;
    getRealChildren: () => any;
    renderFooter: (locale: Locale['Feedback']) => string | number | true | Iterable<React.ReactNode> | React.JSX.Element;
    disableSubmitButton: () => boolean;
    render(): JSX.Element;
}
export {};
