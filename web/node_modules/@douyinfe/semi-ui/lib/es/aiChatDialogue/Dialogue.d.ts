import * as React from 'react';
import BaseComponent from '../_base/baseComponent';
import '@douyinfe/semi-foundation/lib/es/aiChatDialogue/aiChatDialogue.css';
import { AIChatDialogueItemProps } from './interface';
interface AIChatDialogueState {
}
declare class Dialogue extends BaseComponent<AIChatDialogueItemProps, AIChatDialogueState> {
    constructor(props: AIChatDialogueItemProps);
    getRoleInfo: () => any;
    avatarNode: () => React.JSX.Element;
    titleNode: () => React.JSX.Element;
    contentNode: () => React.JSX.Element;
    actionNode: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export default Dialogue;
