/*
Chat Completion VS. Response
- The former only have content、refusal、function_call、tool_calls;
- The former annotations belongs to content;
- The former function_call and tool_calls do not have call_id and status;
*/
export default function chatCompletionToMessage(chatCompletion) {
  return chatCompletion.choices.map(choice => {
    var _a, _b;
    const message = choice.message;
    const role = message.role;
    const id = chatCompletion.id;
    const status = 'completed';
    const outputResult = [];
    // processing text and refusal
    if (message.content !== '' || message.refusal !== '') {
      const annotations = ((_a = message.annotations) === null || _a === void 0 ? void 0 : _a.length) ? message.annotations.map(annotation => Object.assign({
        type: annotation.type
      }, annotation.url_citation || {})) : [];
      const outputMessage = [message.content !== '' && {
        type: 'output_text',
        text: message.content,
        annotations
      }, message.refusal !== '' && {
        type: 'refusal',
        refusal: message.refusal
      }].filter(Boolean);
      outputResult.push({
        type: 'message',
        id: id,
        role: 'assistant',
        status: status,
        content: outputMessage
      });
    }
    // processing function call
    if (message.function_call) {
      outputResult.push(Object.assign(Object.assign({}, message.function_call), {
        type: 'function_call',
        status: 'completed'
      }));
    }
    // processing tool calls
    if ((_b = message === null || message === void 0 ? void 0 : message.tool_calls) === null || _b === void 0 ? void 0 : _b.length) {
      const toolCalls = message.tool_calls.map(toolCall => {
        if (toolCall.type === 'function') {
          return Object.assign(Object.assign({
            status: 'completed'
          }, toolCall.function), {
            type: 'function_call'
          });
        }
        return Object.assign(Object.assign({}, toolCall.custom), {
          type: 'custom_call'
        });
      });
      outputResult.push(...toolCalls);
    }
    // Currently, the Response API does not support voice output, but chat completion does.
    if (message.audio) {
      outputResult.push(Object.assign({
        type: 'audio'
      }, message.audio));
    }
    return {
      id: id,
      role: role,
      content: outputResult,
      status: status
    };
  });
}