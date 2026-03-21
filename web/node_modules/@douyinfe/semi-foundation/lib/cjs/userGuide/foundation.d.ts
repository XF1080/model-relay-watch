import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface UserGuideAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    notifyChange: (current: number) => void;
    notifyPrev: (current: number) => void;
    notifyNext: (current: number) => void;
    notifySkip: () => void;
    notifyFinish: () => void;
    setCurrent: (current: number) => void;
    disabledBodyScroll: () => void;
    enabledBodyScroll: () => void;
}
export default class UserGuideFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<UserGuideAdapter<P, S>, P, S> {
    constructor(adapter: UserGuideAdapter<P, S>);
    init(): void;
    destroy(): void;
    _notifyChange(current: number): void;
    getIsControlledComponent(): boolean;
    beforeShow(): void;
    afterHide(): void;
    getFinalPaading(): number;
    handlePrev: () => void;
    handleNext: () => void;
    handleSkip: () => void;
}
