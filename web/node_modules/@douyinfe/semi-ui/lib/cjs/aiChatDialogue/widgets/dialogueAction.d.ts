import React, { ReactNode } from 'react';
import { AIChatDialogueActionProps } from '../interface';
import BaseComponent from '../../_base/baseComponent';
import DialogueActionFoundation, { DialogueActionAdapter } from '@douyinfe/semi-foundation/lib/cjs/aiChatDialogue/actionFoundation';
interface AIChatDialogueActionState {
    visible: boolean;
    showAction: boolean;
}
declare class DialogueAction extends BaseComponent<AIChatDialogueActionProps, AIChatDialogueActionState> {
    copySuccessNode: ReactNode;
    foundation: DialogueActionFoundation;
    containerRef: React.RefObject<HTMLDivElement>;
    dropdownTriggerRef: React.RefObject<HTMLSpanElement>;
    clickOutsideHandler: any;
    constructor(props: AIChatDialogueActionProps);
    componentDidMount(): void;
    get adapter(): DialogueActionAdapter<AIChatDialogueActionProps, AIChatDialogueActionState>;
    showDeleteModal: () => void;
    copyNode: () => React.JSX.Element;
    resetNode: () => React.JSX.Element;
    shareNode: () => React.JSX.Element;
    likeNode: () => React.JSX.Element;
    dislikeNode: () => React.JSX.Element;
    editNode: () => React.JSX.Element;
    moreNode: () => React.JSX.Element;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element;
}
export default DialogueAction;
