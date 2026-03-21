declare const getRenderText: (originEle: HTMLElement, rows: number, content: string, fixedContent: {
    expand: Node;
    copy: Node;
}, ellipsisStr: string, suffix: string, ellipsisPos: string, isStrong: boolean) => string;
export default getRenderText;
