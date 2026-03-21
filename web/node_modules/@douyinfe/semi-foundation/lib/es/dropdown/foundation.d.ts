import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface DropdownAdapter extends Partial<DefaultAdapter> {
    setPopVisible(visible: boolean): void;
    notifyVisibleChange(visible: boolean): void;
    getPopupId(): string;
}
export default class DropdownFoundation extends BaseFoundation<DropdownAdapter> {
    handleVisibleChange(visible: boolean): void;
    getMenuItemNodes(id: string): HTMLElement[];
    setFocusToFirstMenuItem(id: string): void;
    setFocusToLastMenuItem(id: string): void;
    handleKeyDown(event: any): void;
}
