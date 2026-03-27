import { Message } from '../foundation';
import { ChatCompletionChunk } from './interface';
export interface StreamingChatState {
    processedCountByIndex?: Record<string, number>;
    previousResult?: Message[];
}
export default function streamingChatCompletionToMessage(chatCompletionChunks: ChatCompletionChunk[], state?: StreamingChatState): {
    messages: Message[];
    state?: StreamingChatState;
};
