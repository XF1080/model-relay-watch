import * as React from 'react';
import BaseComponent from '../_base/baseComponent';
import MarkdownRenderFoundation, { MarkdownRenderAdapter, MarkdownRenderBaseProps, MarkdownRenderBaseState } from '@douyinfe/semi-foundation/lib/es/markdownRender/foundation';
import '@douyinfe/semi-foundation/lib/es/markdownRender/markdownRender.css';
import { CSSProperties } from 'react';
import * as SemiMarkdownComponents from "./components";
import PropTypes from 'prop-types';
export interface MarkdownRenderProps extends MarkdownRenderBaseProps {
    style?: CSSProperties;
    className?: string;
}
export interface MarkdownRenderState extends MarkdownRenderBaseState {
}
declare class MarkdownRender extends BaseComponent<MarkdownRenderProps, MarkdownRenderState> {
    foundation: MarkdownRenderFoundation;
    constructor(props: MarkdownRenderProps);
    static propTypes: {
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        format: PropTypes.Requireable<string>;
        components: PropTypes.Requireable<any>;
        raw: PropTypes.Requireable<string>;
        remarkPlugins: PropTypes.Requireable<any[]>;
        rehypePlugins: PropTypes.Requireable<any[]>;
        remarkGfm: PropTypes.Requireable<boolean>;
    };
    static __SemiComponentName__: string;
    static defaultProps: any;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<MarkdownRenderProps>, prevState: Readonly<MarkdownRenderState>, snapshot?: any): void;
    get adapter(): MarkdownRenderAdapter<MarkdownRenderProps, MarkdownRenderState>;
    render(): React.JSX.Element;
    static defaultComponents: typeof SemiMarkdownComponents;
}
export default MarkdownRender;
