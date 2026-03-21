"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _a11y = require("../utils/a11y");
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  SEND_HOT_KEY
} = _constants.strings;
class InputBoxFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.onInputAreaChange = value => {
      const attachment = this.getState('attachment');
      this._adapter.setInputValue(value);
      this._adapter.notifyInputChange({
        inputValue: value,
        attachment
      });
    };
    this.onAttachmentAdd = props => {
      const {
        fileList
      } = props;
      const {
        uploadProps
      } = this.getProps();
      const {
        onChange
      } = uploadProps;
      if (onChange) {
        onChange(props);
      }
      const {
        content
      } = this.getStates();
      let newFileList = [...fileList];
      this._adapter.setAttachment(newFileList);
      this._adapter.notifyInputChange({
        inputValue: content,
        attachment: newFileList
      });
    };
    this.onAttachmentDelete = props => {
      const {
        content,
        attachment
      } = this.getStates();
      const newAttachMent = attachment.filter(item => item.uid !== props.uid);
      this._adapter.setAttachment(newAttachMent);
      this._adapter.notifyInputChange({
        inputValue: content,
        attachment: newAttachMent
      });
    };
    this.onSend = e => {
      if (this.getDisableSend()) {
        return;
      }
      const {
        content,
        attachment
      } = this.getStates();
      this._adapter.setInputValue('');
      this._adapter.setAttachment([]);
      this._adapter.notifySend(content, attachment);
    };
    this.getDisableSend = () => {
      const {
        content,
        attachment
      } = this.getStates();
      const {
        disableSend: disableSendInProps,
        canSend
      } = this.getProps();
      // 如果用户设置了 canSend API，则使用 canSend 值
      // If the user has configured the canSend API, then the canSend value will be used.
      if (typeof canSend === 'boolean') {
        return !canSend;
      }
      /** 不能发送的条件：（满足任1）
       *  1. props 中禁止发送；2. 没有文本输入，且没有上传文件； 3.上传文件中有状态不为 success 的
       *  Conditions under which content cannot be sent: (any one of the following conditions must be met)
       *  1. Sending is disabled in props; 2. No text input and no file upload; 3. There are files uploaded that do not have a success status.
       */
      const disabledSend = disableSendInProps || content.length === 0 && attachment.length === 0 || attachment.find(item => item.status !== _constants.strings.FILE_STATUS.SUCCESS);
      return disabledSend;
    };
    this.onEnterPress = e => {
      const {
        sendHotKey
      } = this.getProps();
      if (sendHotKey === SEND_HOT_KEY.SHIFT_PLUS_ENTER && e.shiftKey === false) {
        return;
      } else if (sendHotKey === SEND_HOT_KEY.ENTER && e.shiftKey === true) {
        return;
      }
      (0, _a11y.handlePrevent)(e);
      this.onSend(e);
    };
    this.onPaste = e => {
      var _a;
      const items = (_a = e.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
      const {
        manualUpload,
        pasteUpload
      } = this.getProps();
      let files = [];
      if (pasteUpload && items) {
        for (const it of items) {
          const file = it.getAsFile();
          file && files.push(it.getAsFile());
        }
        if (files.length) {
          // 文件上传，则需要阻止默认粘贴行为
          // File upload, you need to prevent the default paste behavior
          manualUpload(files);
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
  }
}
exports.default = InputBoxFoundation;