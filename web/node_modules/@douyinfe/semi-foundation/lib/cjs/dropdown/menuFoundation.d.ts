import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export default class DropdownMenuFoundation extends BaseFoundation<Partial<DefaultAdapter>> {
    menuItemNodes: HTMLElement[];
    firstChars: string[];
    handleEscape(menu: Element): void;
    setFocusByFirstCharacter(curItem: any, char: string): void;
    onMenuKeydown(event: any): void;
}
