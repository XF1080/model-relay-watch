import React, { ReactNode } from 'react';
import { RenderTitleProps } from '../interface';
interface DialogueTitleProps extends RenderTitleProps {
    customRenderFunc?: (props: RenderTitleProps) => ReactNode;
}
declare const DialogueTitle: React.MemoExoticComponent<(props: DialogueTitleProps) => React.JSX.Element>;
export default DialogueTitle;
