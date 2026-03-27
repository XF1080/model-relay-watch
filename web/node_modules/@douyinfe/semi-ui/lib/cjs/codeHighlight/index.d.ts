import * as React from 'react';
import BaseComponent from '../_base/baseComponent';
import CodeHighlightFoundation, { CodeHighlightAdapter, CodeHighlightBaseProps, CodeHighlightBaseState } from '@douyinfe/semi-foundation/lib/cjs/codeHighlight';
import { CSSProperties } from 'react';
import '@douyinfe/semi-foundation/lib/cjs/codeHighlight/codeHighlight.css';
import PropTypes from 'prop-types';
export interface CodeHighlightProps extends CodeHighlightBaseProps {
    className?: string;
    style?: CSSProperties;
    defaultTheme?: boolean;
}
interface CodeHighlightState extends CodeHighlightBaseState {
}
declare class CodeHighlight extends BaseComponent<CodeHighlightProps, CodeHighlightState> {
    codeRef: React.RefObject<HTMLElement>;
    foundation: CodeHighlightFoundation<CodeHighlightProps, CodeHighlightState>;
    static __SemiComponentName__: string;
    static propTypes: {
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<any>;
        code: PropTypes.Requireable<string>;
        language: PropTypes.Requireable<string>;
        lineNumber: PropTypes.Requireable<boolean>;
        defaultTheme: PropTypes.Requireable<boolean>;
    };
    static defaultProps: any;
    constructor(props: CodeHighlightProps);
    get adapter(): CodeHighlightAdapter<CodeHighlightProps, CodeHighlightState>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<CodeHighlightProps>, prevState: Readonly<CodeHighlightState>, snapshot?: any): void;
    render(): React.JSX.Element;
}
export default CodeHighlight;
