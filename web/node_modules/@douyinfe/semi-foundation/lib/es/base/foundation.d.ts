/**
 * The Semi Foundation / Adapter architecture split was inspired by Material Component For Web. （https://github.com/material-components/material-components-web）
 * We re-implemented our own code based on the principle and added more functions we need according to actual needs.
 *
 */
export type noopFunction = (...args: any) => any;
export interface DefaultAdapter<P = Record<string, any>, S = Record<string, any>> {
    getContext(key: string): any;
    getContexts(): any;
    getProp(key: string): any;
    getProps(): P;
    getState(key: string): any;
    getStates(): S;
    setState<K extends keyof S>(s: Pick<S, K>, callback?: any): void;
    getCache(c: string): any;
    getCaches(): any;
    setCache(key: any, value: any): void;
    stopPropagation(e: any): void;
    persistEvent: (event: any) => void;
}
declare class BaseFoundation<T extends Partial<DefaultAdapter<P, S>>, P = Record<string, any>, S = Record<string, any>> {
    /** @return enum{css className} */
    static get cssClasses(): {};
    /** @return enum{strings} */
    static get strings(): {};
    /** @return enum{numbers} */
    static get numbers(): {};
    static get defaultAdapter(): {
        getProp: (...args: any[]) => void;
        getProps: (...args: any[]) => void;
        getState: (...args: any[]) => void;
        getStates: (...args: any[]) => void;
        setState: (...args: any[]) => void;
        getContext: (...args: any[]) => void;
        getContexts: (...args: any[]) => void;
        getCache: (...args: any[]) => void;
        setCache: (...args: any[]) => void;
        getCaches: (...args: any[]) => void;
        stopPropagation: (...args: any[]) => void;
        persistEvent: (...args: any[]) => void;
    };
    _adapter: T;
    constructor(adapter: T);
    getProp(key: string): any;
    getProps(): any;
    getState(key: string): any;
    getStates(): any;
    setState<K extends keyof S>(states: Pick<S, K>, cb?: (...args: any) => void): void;
    getContext(key: string): any;
    getContexts(): any;
    getCaches(): any;
    getCache(key: string): any;
    setCache(key: string, value: any): void;
    stopPropagation(e: any): void;
    _isControlledComponent(key?: string): boolean;
    _isInProps(key: string): boolean;
    init(lifecycle?: any): void;
    destroy(): void;
    log(text: string, ...rest: any): void;
    _persistEvent(e: any): void;
}
export default BaseFoundation;
