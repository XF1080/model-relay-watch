"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _debounce2 = _interopRequireDefault(require("lodash/debounce"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _constants = require("./constants");
var _semiAnimation = require("@douyinfe/semi-animation");
var _uuid = require("../utils/uuid");
var _a11y = require("../utils/a11y");
require("prismjs");
require("prismjs/components/prism-jsx.js");
require("prismjs/components/prism-tsx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// code's default height type is html/js/css, add jsx & tsx;

const {
  PIC_PREFIX,
  PIC_SUFFIX_ARRAY,
  ROLE,
  SCROLL_ANIMATION_TIME,
  SHOW_SCROLL_GAP
} = _constants.strings;
class ChatFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.init = () => {
      this.scrollToBottomImmediately();
      this._adapter.registerWheelEvent();
    };
    this.destroy = () => {
      this.animation && this.animation.destroy();
      this._adapter.unRegisterWheelEvent();
    };
    this.stopGenerate = e => {
      this._adapter.notifyStopGenerate(e);
    };
    this.scrollToBottomImmediately = () => {
      const element = this._adapter.getContainerRef();
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    };
    this.scrollToBottomWithAnimation = () => {
      const duration = SCROLL_ANIMATION_TIME;
      const element = this._adapter.getContainerRef();
      if (!element) {
        return;
      }
      const from = element.scrollTop;
      const to = element.scrollHeight;
      this.animation = new _semiAnimation.Animation({
        from: {
          scrollTop: from
        },
        to: {
          scrollTop: to
        }
      }, {
        duration,
        easing: 'easeInOutCubic'
      });
      this.animation.on('frame', _ref => {
        let {
          scrollTop
        } = _ref;
        element.scrollTop = scrollTop;
      });
      this.animation.start();
    };
    this.containerScroll = e => {
      this._persistEvent(e);
      const update = () => {
        this.getScroll(e.target);
      };
      requestAnimationFrame(update);
    };
    this.getScroll = (0, _debounce2.default)(target => {
      const scrollHeight = target.scrollHeight;
      const clientHeight = target.clientHeight;
      const scrollTop = target.scrollTop;
      const {
        backBottomVisible
      } = this.getStates();
      if (scrollHeight - scrollTop - clientHeight <= SHOW_SCROLL_GAP) {
        if (backBottomVisible) {
          this._adapter.setBackBottomVisible(false);
        }
      } else {
        if (!backBottomVisible) {
          this._adapter.setBackBottomVisible(true);
        }
      }
      return scroll;
    }, 100);
    this.handleScrollContainerResize = () => {
      this.getScroll(this._adapter.getContainerRef());
    };
    this.clearContext = e => {
      const {
        chats
      } = this.getStates();
      if (chats[chats.length - 1].role === ROLE.DIVIDER) {
        return;
      }
      const dividerMessage = {
        role: ROLE.DIVIDER,
        id: (0, _uuid.getUuidv4)(),
        createAt: Date.now()
      };
      const newChats = [...chats, dividerMessage];
      this._adapter.notifyChatsChange(newChats);
      this._adapter.notifyClearContext();
    };
    this.onMessageSend = (input, attachment) => {
      let content;
      if (Boolean(attachment) && attachment.length === 0) {
        content = input;
      } else {
        content = [];
        input && content.push({
          type: 'text',
          text: input
        });
        (attachment !== null && attachment !== void 0 ? attachment : []).map(item => {
          var _a;
          const {
            fileInstance,
            name = '',
            url,
            size
          } = item;
          const suffix = name.split('.').pop();
          const isImg = ((_a = fileInstance === null || fileInstance === void 0 ? void 0 : fileInstance.type) === null || _a === void 0 ? void 0 : _a.startsWith(PIC_PREFIX)) || PIC_SUFFIX_ARRAY.includes(suffix);
          if (isImg) {
            content.push({
              type: 'image_url',
              image_url: {
                url: url
              }
            });
          } else {
            content.push({
              type: 'file_url',
              file_url: {
                url: url,
                name: name,
                size: size,
                type: fileInstance === null || fileInstance === void 0 ? void 0 : fileInstance.type
              }
            });
          }
        });
      }
      if (content) {
        const newMessage = {
          role: ROLE.USER,
          id: (0, _uuid.getUuidv4)(),
          createAt: Date.now(),
          content
        };
        this._adapter.notifyChatsChange([...this.getStates().chats, newMessage]);
      }
      this._adapter.setWheelScroll(false);
      this._adapter.registerWheelEvent();
      this._adapter.notifyMessageSend(input, attachment);
    };
    this.onHintClick = hint => {
      const {
        chats
      } = this.getStates();
      const newMessage = {
        role: ROLE.USER,
        id: (0, _uuid.getUuidv4)(),
        createAt: Date.now(),
        content: hint
      };
      const newChats = [...chats, newMessage];
      this._adapter.notifyChatsChange(newChats);
      this._adapter.notifyHintClick(hint);
    };
    this.onInputChange = props => {
      this._adapter.notifyInputChange(props);
    };
    this.deleteMessage = message => {
      const {
        onMessageDelete,
        onChatsChange
      } = this.getProps();
      const {
        chats
      } = this.getStates();
      onMessageDelete === null || onMessageDelete === void 0 ? void 0 : onMessageDelete(message);
      const newChats = chats.filter(item => item.id !== message.id);
      onChatsChange === null || onChatsChange === void 0 ? void 0 : onChatsChange(newChats);
    };
    this.likeMessage = message => {
      const {
        chats
      } = this.getStates();
      this._adapter.notifyLikeMessage(message);
      const index = chats.findIndex(item => item.id === message.id);
      const newChat = Object.assign(Object.assign({}, chats[index]), {
        like: !chats[index].like,
        dislike: false
      });
      const newChats = [...chats];
      newChats.splice(index, 1, newChat);
      this._adapter.notifyChatsChange(newChats);
    };
    this.dislikeMessage = message => {
      const {
        chats
      } = this.getStates();
      this._adapter.notifyDislikeMessage(message);
      const index = chats.findIndex(item => item.id === message.id);
      const newChat = Object.assign(Object.assign({}, chats[index]), {
        like: false,
        dislike: !chats[index].dislike
      });
      const newChats = [...chats];
      newChats.splice(index, 1, newChat);
      this._adapter.notifyChatsChange(newChats);
    };
    this.resetMessage = message => {
      const {
        chats
      } = this.getStates();
      const lastMessage = chats[chats.length - 1];
      const newLastChat = Object.assign(Object.assign({}, lastMessage), {
        status: 'loading',
        content: '',
        id: (0, _uuid.getUuidv4)(),
        createAt: Date.now()
      });
      const newChats = chats.slice(0, -1).concat(newLastChat);
      this._adapter.notifyChatsChange(newChats);
      const {
        onMessageReset
      } = this.getProps();
      onMessageReset === null || onMessageReset === void 0 ? void 0 : onMessageReset(message);
    };
    this.handleDragOver = e => {
      const dragStatus = this._adapter.getDragStatus();
      if (dragStatus) {
        return;
      }
      this._adapter.setUploadAreaVisible(true);
    };
    this.handleDragStart = e => {
      this._adapter.setDragStatus(true);
    };
    this.handleDragEnd = e => {
      this._adapter.setDragStatus(false);
    };
    this.handleContainerDragOver = e => {
      (0, _a11y.handlePrevent)(e);
    };
    this.handleContainerDrop = e => {
      var _a;
      this._adapter.setUploadAreaVisible(false);
      this._adapter.manualUpload((_a = e === null || e === void 0 ? void 0 : e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files);
      // 禁用默认实现，防止文件被打开
      //Disable the default implementation, preventing files from being opened
      (0, _a11y.handlePrevent)(e);
    };
    this.handleContainerDragLeave = e => {
      (0, _a11y.handlePrevent)(e);
      // 鼠标移动至 container 的子元素，则不做任何操作
      // If the mouse moves to the child element of container, no operation will be performed.
      const dropAreaElement = this._adapter.getDropAreaElement();
      const enterTarget = e.relatedTarget;
      if (dropAreaElement.contains(enterTarget)) {
        return;
      }
      /**
       * 延迟隐藏 container ，防止父元素的 mouseOver 被触发，导致 container 无法隐藏
       * Delay hiding of the container to prevent the parent element's mouseOver from being triggered,
       * causing the container to be unable to be hidden.
      */
      setTimeout(() => {
        this._adapter.setUploadAreaVisible(false);
      });
    };
    this.getUploadProps = uploadProps => {
      if (Object.prototype.toString.call(uploadProps) === '[object Object]') {
        const {
          dragUpload = true,
          clickUpload = true,
          pasteUpload = true
        } = uploadProps;
        return {
          dragUpload: dragUpload,
          clickUpload: clickUpload,
          pasteUpload: pasteUpload
        };
      } else if (typeof uploadProps === 'boolean') {
        return {
          dragUpload: uploadProps,
          clickUpload: uploadProps,
          pasteUpload: uploadProps
        };
      } else {
        return {
          dragUpload: true,
          clickUpload: true,
          pasteUpload: true
        };
      }
    };
  }
}
exports.default = ChatFoundation;