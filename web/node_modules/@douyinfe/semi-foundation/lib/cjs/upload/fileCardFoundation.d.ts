import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface FileCardAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    updateFallbackPreview: (fallback: boolean) => void;
}
declare class FileCardFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<FileCardAdapter<P, S>, P, S> {
    constructor(adapter: FileCardAdapter<P, S>);
    handleImageError(error: any): void;
}
export default FileCardFoundation;
