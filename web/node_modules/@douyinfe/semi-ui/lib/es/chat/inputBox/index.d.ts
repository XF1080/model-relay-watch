import React from 'react';
import PropTypes from 'prop-types';
import type { InputBoxProps, InputBoxState } from '../interface';
import { BaseComponent } from '../../index';
import { InputBoxAdapter } from '@douyinfe/semi-foundation/lib/es/chat/inputboxFoundation';
declare class InputBox extends BaseComponent<InputBoxProps, InputBoxState> {
    inputAreaRef: React.RefObject<any>;
    static propTypes: {
        uploadProps: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        uploadProps: {};
    };
    constructor(props: InputBoxProps);
    get adapter(): InputBoxAdapter<InputBoxProps, InputBoxState>;
    onClick: () => void;
    renderUploadButton: () => React.JSX.Element;
    renderInputArea: () => React.JSX.Element;
    renderClearButton: () => React.JSX.Element;
    renderSendButton: () => React.JSX.Element;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
}
export default InputBox;
