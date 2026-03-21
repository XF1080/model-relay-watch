"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = streamingChatCompletionToMessage;
var _cloneDeep2 = _interopRequireDefault(require("lodash/cloneDeep"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function streamingChatCompletionToMessage(chatCompletionChunks, state) {
  const groupedChunks = groupByIndex(chatCompletionChunks);
  const results = groupedChunks.map((chatCompletionChunks, groupIndex) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const id = chatCompletionChunks[0].id;
    const status = getStatus(chatCompletionChunks);
    // 基于 state 增量处理：仅处理新到达的 chunk 片段
    const stateKey = `${id}:${(_d = (_c = (_b = (_a = chatCompletionChunks[0]) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.index) !== null && _d !== void 0 ? _d : groupIndex}`;
    const processedCount = (_f = (_e = state === null || state === void 0 ? void 0 : state.processedCountByIndex) === null || _e === void 0 ? void 0 : _e[stateKey]) !== null && _f !== void 0 ? _f : 0;
    const start = processedCount > 0 ? Math.min(processedCount, chatCompletionChunks.length) : 0;
    const chunksToProcess = state ? chatCompletionChunks.slice(start) : chatCompletionChunks;
    // 若提供了 state 且本次没有新增内容，则跳过该 index
    if (state && chunksToProcess.length === 0) {
      return (_g = state.previousResult) === null || _g === void 0 ? void 0 : _g[groupIndex];
    }
    const previousResult = (_h = state === null || state === void 0 ? void 0 : state.previousResult) === null || _h === void 0 ? void 0 : _h[groupIndex];
    let textContent = '';
    let refusal = '';
    let functionCall = {
      name: '',
      arguments: ''
    };
    let toolCalls = [];
    (_j = previousResult === null || previousResult === void 0 ? void 0 : previousResult.content) === null || _j === void 0 ? void 0 : _j.forEach(item => {
      var _a;
      (_a = item.content) === null || _a === void 0 ? void 0 : _a.forEach(content => {
        if (content.type === 'output_text') {
          textContent += content.text;
        }
        if (content.type === 'refusal') {
          refusal += content.refusal;
        }
      });
      if (item.type === 'function_call' && !item.id) {
        // Chat Completion function call does not have id
        functionCall.name = item.name;
        functionCall.arguments = item.arguments;
      }
      if (item.type === 'tool_call' || item.type === 'function_call' && item.id) {
        toolCalls.push(item);
      }
    });
    chunksToProcess.map(chunk => {
      const delta = chunk.choices[0].delta;
      if (delta === null || delta === void 0 ? void 0 : delta.content) {
        textContent += delta.content;
      }
      if (delta === null || delta === void 0 ? void 0 : delta.refusal) {
        refusal += delta.refusal;
      }
      if (delta === null || delta === void 0 ? void 0 : delta.function_call) {
        if (delta.function_call.name) {
          functionCall.name += delta.function_call.name;
        }
        functionCall.arguments += delta.function_call.arguments;
      }
      if (delta === null || delta === void 0 ? void 0 : delta.tool_calls) {
        delta === null || delta === void 0 ? void 0 : delta.tool_calls.forEach(toolCall => {
          var _a, _b;
          // Chat Completion tool call may be function call or custom call
          const curToolCall = toolCalls.find(item => item.id === toolCall.id);
          if (curToolCall) {
            if ((_a = toolCall === null || toolCall === void 0 ? void 0 : toolCall.function) === null || _a === void 0 ? void 0 : _a.name) {
              curToolCall.name += toolCall.function.name;
              curToolCall.arguments += toolCall.function.arguments;
            } else if ((_b = toolCall === null || toolCall === void 0 ? void 0 : toolCall.custom) === null || _b === void 0 ? void 0 : _b.name) {
              curToolCall.name += toolCall.custom.name;
              curToolCall.input += toolCall.custom.input;
            }
            curToolCall.status = status;
          } else {
            toolCalls.push(Object.assign(Object.assign(Object.assign({}, toolCall === null || toolCall === void 0 ? void 0 : toolCall.function), toolCall === null || toolCall === void 0 ? void 0 : toolCall.custom), {
              type: (toolCall === null || toolCall === void 0 ? void 0 : toolCall.function) ? 'function_call' : 'custom_call',
              id: toolCall.id
            }));
          }
        });
      }
    });
    const outputMessage = [textContent !== '' && {
      type: 'output_text',
      text: textContent
    }, refusal !== '' && {
      type: 'refusal',
      refusal: refusal
    }].filter(Boolean);
    const outputResult = [outputMessage.length > 0 && {
      type: 'message',
      id: id,
      role: 'assistant',
      status: status,
      content: outputMessage
    }, functionCall.name !== '' && Object.assign({
      type: 'function_call'
    }, functionCall), ...toolCalls].filter(Boolean);
    // 更新 state：记录该 index 已处理到的 chunk 数量
    if (state && state.processedCountByIndex) {
      state.processedCountByIndex[stateKey] = chatCompletionChunks.length;
    } else {
      state = {
        processedCountByIndex: {
          [stateKey]: chatCompletionChunks.length
        }
      };
    }
    return {
      id: id,
      role: "assistant",
      content: outputResult,
      status: status
    };
  }).filter(Boolean);
  state.previousResult = (0, _cloneDeep2.default)(results);
  return {
    messages: results,
    state: state
  };
}
const groupByIndex = chatCompletionChunks => {
  const groupedChunks = [];
  chatCompletionChunks.forEach(chunk => {
    // 确保每个 chunk 的 choices 都存在且为长度为 1 的数组
    // Make sure that each chunk's choices exists and is an array of length 1.
    chunk.choices.forEach(choice => {
      const curIndex = choice.index;
      if (!groupedChunks[curIndex]) {
        groupedChunks[curIndex] = [];
      }
      groupedChunks[curIndex].push(Object.assign(Object.assign({}, chunk), {
        choices: [choice]
      }));
    });
  });
  return groupedChunks;
};
const getStatus = chatCompletionChunks => {
  const lastChunk = chatCompletionChunks[chatCompletionChunks.length - 1];
  return lastChunk.choices[0].finish_reason !== null ? 'completed' : 'in_progress';
};