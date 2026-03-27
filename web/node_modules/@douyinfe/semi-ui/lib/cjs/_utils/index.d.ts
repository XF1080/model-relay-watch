import React from 'react';
/**
 * stop propagation
 *
 * @param {React.MouseEvent<HTMLElement>} e React mouse event object
 * @param {boolean} noImmediate Skip stopping immediate propagation
 */
export declare function stopPropagation(e: React.MouseEvent | React.FocusEvent<HTMLElement>, noImmediate?: boolean): void;
/**
 * use in Table, Form, Navigation
 *
 * skip clone function and react element
 */
export declare function cloneDeep<T>(value: T): T;
export declare function cloneDeep<T>(value: T, customizer: (value: any) => any): any;
export interface RegisterMediaQueryOption {
    match?: (e: MediaQueryList | MediaQueryListEvent) => void;
    unmatch?: (e: MediaQueryList | MediaQueryListEvent) => void;
    callInInit?: boolean;
}
/**
 * register matchFn and unMatchFn callback while media query
 * @param {string} media media string
 * @param {object} param param object
 * @returns function
 */
export declare const registerMediaQuery: (media: string, { match, unmatch, callInInit }: RegisterMediaQueryOption) => () => void;
/**
 * Determine whether the incoming element is a built-in icon
 * @param icon 元素
 * @returns boolean
 */
export declare const isSemiIcon: (icon: any) => boolean;
export declare function getActiveElement(): HTMLElement | null;
export declare function isNodeContainsFocus(node: HTMLElement): boolean;
export declare function getFocusableElements(node: HTMLElement): HTMLElement[];
export declare function runAfterTicks(func: (...args: any) => any, numberOfTicks: number): Promise<void>;
export declare function getScrollbarWidth(): number;
export declare function getDefaultPropsFromGlobalConfig(componentName: string, semiDefaultProps?: any): any;
