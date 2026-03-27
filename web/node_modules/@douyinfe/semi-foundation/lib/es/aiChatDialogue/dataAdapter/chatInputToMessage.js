export default function chatInputToMessage(inputContent) {
  const {
    references,
    attachments,
    inputContents,
    setup
  } = inputContent;
  let inputs = [];
  if (attachments === null || attachments === void 0 ? void 0 : attachments.length) {
    attachments.forEach(item => {
      const {
        name,
        url
      } = item;
      if (name.includes('.png') || name.includes('.jpg') || name.includes('.jpeg')) {
        inputs.push(Object.assign(Object.assign({}, item), {
          type: 'input_image',
          image_url: url,
          detail: 'auto'
        }));
      } else {
        inputs.push(Object.assign(Object.assign({}, item), {
          type: 'input_file',
          file_url: url,
          filename: name
        }));
      }
    });
  }
  if (inputContents === null || inputContents === void 0 ? void 0 : inputContents.length) {
    inputContents.forEach(item => {
      inputs.push({
        type: 'input_text',
        text: item.text
      });
    });
  }
  return {
    role: "user",
    content: [{
      type: 'message',
      role: 'user',
      content: inputs
    }],
    model: setup === null || setup === void 0 ? void 0 : setup.model,
    references,
    setup: setup !== null && setup !== void 0 ? setup : {}
  };
}