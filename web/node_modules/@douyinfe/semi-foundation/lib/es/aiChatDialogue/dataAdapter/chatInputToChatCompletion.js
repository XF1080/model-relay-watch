export default function chatInputToChatCompletion(inputContent) {
  const {
    references,
    attachments,
    inputContents,
    setup
  } = inputContent;
  let inputs = [];
  if (attachments === null || attachments === void 0 ? void 0 : attachments.length) {
    // todo: attachment 允许传递目录？
    attachments.forEach(item => {
      const {
        name,
        url
      } = item;
      if (name.includes('.png') || name.includes('.jpg') || name.includes('.jpeg')) {
        inputs.push({
          type: 'image_url',
          image_url: {
            url: url
          }
        });
      } else {
        // Inputs by file URL are not supported for chat completions. Use the ResponsesAPI for this option.
        inputs.push({
          type: 'file',
          file: {
            file_data: item.file_data,
            filename: name,
            file_id: item === null || item === void 0 ? void 0 : item.id
          }
        });
      }
    });
  }
  if (inputContents === null || inputContents === void 0 ? void 0 : inputContents.length) {
    inputContents.forEach(item => {
      inputs.push({
        type: 'text',
        text: item.text
      });
    });
  }
  return {
    role: "user",
    messages: [{
      role: "user",
      content: inputs
    }],
    model: setup === null || setup === void 0 ? void 0 : setup.model,
    references,
    setup: setup !== null && setup !== void 0 ? setup : {}
  };
}