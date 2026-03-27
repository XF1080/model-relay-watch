export default function messageToChatInput(message) {
  const attachments = [];
  const inputContents = [];
  // const setup: Setup = {
  //     model: message.model,
  //     thinkType: message.thinkType,
  //     thinkTime: message.thinkTime,
  //     thinkDepth: message.thinkDepth,
  // };
  if (message.content && typeof message.content === 'string') {
    return {
      references: message === null || message === void 0 ? void 0 : message.references,
      attachments,
      inputContents: [{
        type: 'text',
        text: message.content
      }]
      // setup
    };
  } else if (message.content && Array.isArray(message.content)) {
    message.content.forEach(messageItem => {
      if (messageItem.type === 'message') {
        const {
          content
        } = messageItem;
        content.forEach(item => {
          if (item.type === 'input_text') {
            inputContents.push({
              type: 'text',
              text: item === null || item === void 0 ? void 0 : item.text
            });
          } else if (item.type === 'input_image') {
            attachments.push({
              name: item === null || item === void 0 ? void 0 : item.name,
              url: item === null || item === void 0 ? void 0 : item.image_url,
              status: 'success',
              size: item === null || item === void 0 ? void 0 : item.size,
              uid: item === null || item === void 0 ? void 0 : item.uid
            });
          } else if (item.type === 'input_file') {
            attachments.push({
              name: item === null || item === void 0 ? void 0 : item.filename,
              url: item === null || item === void 0 ? void 0 : item.file_url,
              status: 'success',
              size: item === null || item === void 0 ? void 0 : item.size,
              uid: item === null || item === void 0 ? void 0 : item.uid
            });
          }
        });
      }
    });
  }
  return {
    references: message === null || message === void 0 ? void 0 : message.references,
    attachments,
    inputContents: inputContents
    // setup
  };
}