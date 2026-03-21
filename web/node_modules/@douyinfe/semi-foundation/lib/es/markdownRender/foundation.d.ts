import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import { MDXProps } from 'mdx/types';
import { type PluggableList } from "@mdx-js/mdx/lib/core";
export interface MarkdownRenderAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    getRuntime: () => any;
}
export interface MarkdownRenderBaseProps {
    raw: string;
    components: MDXProps['components'];
    format: "md" | "mdx";
    remarkPlugins?: PluggableList;
    rehypePlugins?: PluggableList;
    remarkGfm?: boolean;
}
export interface MarkdownRenderBaseState {
    MDXContentComponent: any;
}
declare class MarkdownRenderFoundation extends BaseFoundation<MarkdownRenderAdapter> {
    private getOptions;
    compile: (mdxRaw: string) => Promise<import("vfile").VFile>;
    evaluate: (mdxRaw: string) => Promise<import("mdx/types").MDXContent>;
    evaluateSync: (mdxRaw: string) => import("mdx/types").MDXContent;
}
export default MarkdownRenderFoundation;
