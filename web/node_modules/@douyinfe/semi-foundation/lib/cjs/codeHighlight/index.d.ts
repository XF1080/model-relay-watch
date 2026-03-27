import BaseFoundation, { DefaultAdapter } from '../base/foundation';
import "prismjs/plugins/line-numbers/prism-line-numbers.min.js";
export interface CodeHighlightBaseProps {
    code: string;
    language: string;
    lineNumber: boolean;
}
export interface CodeHighlightBaseState {
}
export interface CodeHighlightAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
}
declare class CodeHighlightFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<CodeHighlightAdapter<P, S>, P, S> {
    constructor(adapter: CodeHighlightAdapter<P, S>);
    highlightCode: (ele: HTMLElement, language: string) => void;
}
export default CodeHighlightFoundation;
