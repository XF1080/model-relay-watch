import BaseFoundation, { DefaultAdapter, noopFunction } from '../base/foundation';
export interface InputDefaultAdapter {
    notifyChange: noopFunction;
    setValue: noopFunction;
}
export interface InputAdapter extends Partial<DefaultAdapter>, Partial<InputDefaultAdapter> {
    setMinLength(minLength: number): void;
    notifyClear(e: any): void;
    notifyBlur(value: any, e: any): void;
    setEyeClosed(eyeClosed: boolean): void;
    toggleFocusing(focused: boolean): void;
    focusInput(): void;
    notifyFocus(value: any, e: any): void;
    notifyInput(e: any): void;
    notifyKeyDown(e: any): void;
    notifyKeyUp(e: any): void;
    notifyKeyPress(e: any): void;
    notifyEnterPress(e: any): void;
    notifyCompositionStart(e: any): void;
    notifyCompositionEnd(e: any): void;
    notifyCompositionUpdate(e: any): void;
    isEventTarget(e: any): boolean;
}
declare class InputFoundation extends BaseFoundation<InputAdapter> {
    static get inputDefaultAdapter(): {
        notifyChange: (...args: any[]) => void;
        setValue: (...args: any[]) => void;
    };
    _timer: number | null;
    compositionEnter: boolean;
    constructor(adapter: InputAdapter);
    destroy(): void;
    setDisable(): void;
    setValue(value: any): void;
    handleChange(value: any, e: any): void;
    getNextValue: (value: any) => any;
    changeInput: (value: any, e: any) => void;
    handleCompositionStart: (e: any) => void;
    handleCompositionEnd: (e: any) => void;
    handleCompositionUpdate: (e: any) => void;
    /**
     * Modify minLength to trigger browser check for minimum length
     * Controlled mode is not checked
     * @param {String} value
     */
    handleVisibleMinLength(value: any): void;
    /**
     * Handle input emoji characters beyond maxLength
     * Controlled mode is not checked
     * @param {String} value
     */
    handleVisibleMaxLength(value: any): any;
    /**
     * Truncate input values based on maximum length
     * @param {String} value
     * @param {Number} maxLength
     * @returns {String}
     */
    handleTruncateValue(value: any, maxLength: number): string;
    handleClear(e: any): void;
    /**
     * trigger when click input wrapper
     * @param {Event} e
     */
    handleClick(e: any): void;
    handleModeChange(mode: string): void;
    handleClickEye(e: any): void;
    handleInputType(type: string): string;
    handleMouseDown(e: any): void;
    handleMouseUp(e: any): void;
    handleBlur(e: any): void;
    handleFocus(e: any): void;
    handleInput(e: any): void;
    handleKeyDown(e: any): void;
    handleKeyUp(e: any): void;
    handleKeyPress(e: any): void;
    isAllowClear(): any;
    handleClickPrefixOrSuffix(e: any): void;
    /**
     * Blocking mousedown events prevents input from losing focus
     * @param {Event} e
     */
    handlePreventMouseDown(e: any): void;
    /**
     * A11y: simulate password button click
     */
    handleModeEnterPress(e: any): void;
}
export default InputFoundation;
