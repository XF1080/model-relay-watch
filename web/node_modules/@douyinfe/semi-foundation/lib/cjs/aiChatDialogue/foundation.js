"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _debounce2 = _interopRequireDefault(require("lodash/debounce"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _uuid = require("../utils/uuid");
var _constants = require("./constants");
var _semiAnimation = require("@douyinfe/semi-animation");
require("prismjs");
require("prismjs/components/prism-jsx.js");
require("prismjs/components/prism-tsx.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DialogueFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.init = () => {
      this.scrollToBottomImmediately();
      this._adapter.registerWheelEvent();
    };
    this.destroy = () => {
      this.animation && this.animation.destroy();
    };
    this.handleSelectAll = () => {
      const {
        chats
      } = this.getProps();
      const selectedSet = new Set(chats.map(chat => chat.id));
      this._adapter.updateSelected(selectedSet);
      this._adapter.notifySelect(Array.from(selectedSet));
    };
    this.handleDeselectAll = () => {
      this._adapter.updateSelected(new Set());
      this._adapter.notifySelect([]);
    };
    this.handleChatsChange = chats => {
      this._adapter.notifyChatsChange(chats);
    };
    this.handleSelectOrRemove = (isChecked, id) => {
      const {
        selectedIds
      } = this.getStates();
      const newSelectedSet = selectedIds instanceof Set ? new Set(selectedIds) : new Set(selectedIds || []);
      if (isChecked) {
        newSelectedSet.add(id);
      } else {
        newSelectedSet.delete(id);
      }
      this._adapter.updateSelected(newSelectedSet);
      this._adapter.notifySelect(Array.from(newSelectedSet));
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
        status: 'in_progress',
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
    this.editMessage = message => {
      const {
        chats
      } = this.getStates();
      this._adapter.notifyEditMessage(message);
      const index = chats.findIndex(item => item.id === message.id);
      const newChat = Object.assign(Object.assign({}, chats[index]), {
        editing: !chats[index].editing
      });
      // Make sure there is only one message in edit mode
      chats.map(item => {
        if (item.editing) {
          item.editing = !item.editing;
        }
      });
      const newChats = [...chats];
      newChats.splice(index, 1, newChat);
      this._adapter.notifyChatsChange(newChats);
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
    this.onHintClick = hint => {
      const {
        chats
      } = this.getStates();
      const newMessage = {
        role: _constants.strings.ROLE.USER,
        id: (0, _uuid.getUuidv4)(),
        createAt: Date.now(),
        content: hint
      };
      const newChats = [...chats, newMessage];
      this._adapter.notifyChatsChange(newChats);
      this._adapter.notifyHintClick(hint);
    };
    this.scrollToBottomImmediately = () => {
      const element = this._adapter.getContainerRef();
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    };
    this.scrollToBottomWithAnimation = () => {
      const duration = _constants.strings.SCROLL_ANIMATION_TIME;
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
    this.scrollToTopImmediately = () => {
      const element = this._adapter.getContainerRef();
      if (element) {
        element.scrollTop = 0;
      }
    };
    this.scrollToTopWithAnimation = () => {
      const duration = _constants.strings.SCROLL_ANIMATION_TIME;
      const element = this._adapter.getContainerRef();
      if (!element) {
        return;
      }
      const from = element.scrollTop;
      const to = 0;
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
      this.animation.on('frame', _ref2 => {
        let {
          scrollTop
        } = _ref2;
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
      if (scrollHeight - scrollTop - clientHeight <= _constants.strings.SHOW_SCROLL_GAP) {
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
  }
}
exports.default = DialogueFoundation;