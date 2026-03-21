import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface RadioAdapter extends DefaultAdapter {
    setHover: (hover: boolean) => void;
    setChecked: (checked: boolean) => void;
    setAddonId: () => void;
    setExtraId: () => void;
    setFocusVisible: (focusVisible: boolean) => void;
}
export default class RadioFoundation extends BaseFoundation<RadioAdapter> {
    init(): void;
    setHover(hover: boolean): void;
    setChecked(checked: boolean): void;
    handleFocusVisible: (event: any) => void;
    handleBlur: () => void;
}
