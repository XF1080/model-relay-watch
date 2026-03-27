import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface HotKeysAdapter<P = Record<string, any>, S = Record<string, any>> extends DefaultAdapter<P, S> {
    notifyHotKey: (e: KeyboardEvent) => void;
    registerEvent: () => void;
    unregisterEvent: () => void;
}
export default class HotKeysFoundation<P = Record<string, any>, S = Record<string, any>> extends BaseFoundation<HotKeysAdapter<P, S>, P, S> {
    constructor(adapter: HotKeysAdapter<P, S>);
    init(): void;
    isValidHotKeys: (hotKeys: string[]) => boolean;
    handleKeyDown: (event: KeyboardEvent) => void;
    destroy(): void;
}
