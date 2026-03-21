import React from 'react';
import { ConfirmProps } from '../confirm';
interface HookModalProps {
    afterClose: (...args: any[]) => void;
    config: ConfirmProps;
}
export interface HookModalRef {
    destroy: () => void;
    update: (newConfig: ConfirmProps) => void;
}
declare const _default: React.ForwardRefExoticComponent<HookModalProps & React.RefAttributes<HookModalRef>>;
export default _default;
