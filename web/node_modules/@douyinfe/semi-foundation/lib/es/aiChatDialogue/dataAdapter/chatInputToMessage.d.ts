import { MessageContent } from "../../aiChatInput/interface";
export default function chatInputToMessage(inputContent: MessageContent): {
    role: string;
    content: {
        type: string;
        role: string;
        content: any[];
    }[];
    model: any;
    references: import("../../aiChatInput/interface").Reference[];
    setup: import("../../aiChatInput/interface").Setup;
};
