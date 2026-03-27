"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = responseToMessage;
function responseToMessage(response) {
  const {
    id,
    model,
    status,
    output,
    output_text,
    created_at
  } = response;
  return {
    id: id,
    role: "assistant",
    content: output,
    createdAt: created_at,
    output_text: output_text,
    model: model,
    status: status
  };
}