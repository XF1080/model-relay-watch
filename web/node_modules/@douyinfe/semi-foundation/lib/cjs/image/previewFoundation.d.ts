import BaseFoundation, { DefaultAdapter } from "../base/foundation";
export default class PreviewFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<Partial<DefaultAdapter>> {
    handleVisibleChange: (newVisible: boolean) => void;
    handleCurrentIndexChange: (index: number) => void;
}
