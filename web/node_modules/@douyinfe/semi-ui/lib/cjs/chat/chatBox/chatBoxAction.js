"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _semiIcons = require("@douyinfe/semi-icons");
var _index = require("../../index");
var _copyTextToClipboard = _interopRequireDefault(require("copy-text-to-clipboard"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/chat/constants");
var _chatBoxActionFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/chat/chatBoxActionFoundation"));
var _localeConsumer = _interopRequireDefault(require("../../locale/localeConsumer"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  PREFIX_CHAT_BOX_ACTION
} = _constants.cssClasses;
const {
  ROLE,
  MESSAGE_STATUS
} = _constants.strings;
class ChatBoxAction extends _index.BaseComponent {
  constructor(props) {
    super(props);
    this.copyNode = () => {
      return /*#__PURE__*/_react.default.createElement(_index.Button, {
        key: 'copy',
        theme: 'borderless',
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconCopyStroked, null),
        type: 'tertiary',
        onClick: this.foundation.copyMessage,
        className: `${PREFIX_CHAT_BOX_ACTION}-btn`
      });
    };
    this.likeNode = () => {
      const {
        message = {}
      } = this.props;
      const {
        like
      } = message;
      return /*#__PURE__*/_react.default.createElement(_index.Button, {
        key: 'like',
        theme: 'borderless',
        icon: like ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconLikeThumb, null) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconThumbUpStroked, null),
        type: 'tertiary',
        className: `${PREFIX_CHAT_BOX_ACTION}-btn`,
        onClick: this.foundation.likeMessage
      });
    };
    this.dislikeNode = () => {
      const {
        message = {}
      } = this.props;
      const {
        dislike
      } = message;
      return /*#__PURE__*/_react.default.createElement(_index.Button, {
        theme: 'borderless',
        key: 'dislike',
        icon: dislike ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconLikeThumb, {
          className: `${PREFIX_CHAT_BOX_ACTION}-icon-flip`
        }) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconThumbUpStroked, {
          className: 'semi-chat-chatBox-action-icon-flip'
        }),
        type: 'tertiary',
        className: `${PREFIX_CHAT_BOX_ACTION}-btn`,
        onClick: this.foundation.dislikeMessage
      });
    };
    this.resetNode = () => {
      return /*#__PURE__*/_react.default.createElement(_index.Button, {
        key: 'reset',
        theme: 'borderless',
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconRedoStroked, {
          className: `${PREFIX_CHAT_BOX_ACTION}-icon-redo`
        }),
        type: 'tertiary',
        onClick: this.foundation.resetMessage,
        className: `${PREFIX_CHAT_BOX_ACTION}-btn`
      });
    };
    this.deleteNode = () => {
      const deleteMessage = /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "Chat"
      }, locale => locale['deleteConfirm']);
      return /*#__PURE__*/_react.default.createElement(_index.Popconfirm, {
        trigger: "custom",
        visible: this.state.visible,
        key: 'delete',
        title: deleteMessage,
        onConfirm: this.foundation.deleteMessage,
        onCancel: this.foundation.hideDeletePopup,
        position: 'top'
      }, /*#__PURE__*/_react.default.createElement("span", {
        ref: this.popconfirmTriggerRef,
        className: `${PREFIX_CHAT_BOX_ACTION}-delete-wrap`
      }, /*#__PURE__*/_react.default.createElement(_index.Button, {
        theme: 'borderless',
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconDeleteStroked, null),
        type: 'tertiary',
        className: `${PREFIX_CHAT_BOX_ACTION}-btn`,
        onClick: this.foundation.showDeletePopup
      })));
    };
    this.foundation = new _chatBoxActionFoundation.default(this.adapter);
    this.copySuccessNode = null;
    this.state = {
      visible: false,
      showAction: false
    };
    this.clickOutsideHandler = null;
    this.containerRef = /*#__PURE__*/_react.default.createRef();
    this.popconfirmTriggerRef = /*#__PURE__*/_react.default.createRef();
  }
  componentDidMount() {
    this.copySuccessNode = /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Chat"
    }, locale => locale['copySuccess']);
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyDeleteMessage: () => {
        const {
          message,
          onMessageDelete
        } = this.props;
        onMessageDelete === null || onMessageDelete === void 0 ? void 0 : onMessageDelete(message);
      },
      notifyMessageCopy: () => {
        const {
          message,
          onMessageCopy
        } = this.props;
        onMessageCopy === null || onMessageCopy === void 0 ? void 0 : onMessageCopy(message);
      },
      copyToClipboardAndToast: () => {
        var _a;
        const {
          message = {},
          toast
        } = this.props;
        if (typeof message.content === 'string') {
          (0, _copyTextToClipboard.default)(message.content);
        } else if (Array.isArray(message.content)) {
          const content = (_a = message.content) === null || _a === void 0 ? void 0 : _a.map(item => item.text).join('');
          (0, _copyTextToClipboard.default)(content);
        }
        toast.success({
          content: this.copySuccessNode
        });
      },
      notifyLikeMessage: () => {
        const {
          message,
          onMessageGoodFeedback
        } = this.props;
        onMessageGoodFeedback === null || onMessageGoodFeedback === void 0 ? void 0 : onMessageGoodFeedback(message);
      },
      notifyDislikeMessage: () => {
        const {
          message,
          onMessageBadFeedback
        } = this.props;
        onMessageBadFeedback === null || onMessageBadFeedback === void 0 ? void 0 : onMessageBadFeedback(message);
      },
      notifyResetMessage: () => {
        const {
          message,
          onMessageReset
        } = this.props;
        onMessageReset === null || onMessageReset === void 0 ? void 0 : onMessageReset(message);
      },
      setVisible: visible => {
        this.setState({
          visible
        });
      },
      setShowAction: showAction => {
        this.setState({
          showAction
        });
      },
      registerClickOutsideHandler: cb => {
        if (this.clickOutsideHandler) {
          this.adapter.unregisterClickOutsideHandler();
        }
        this.clickOutsideHandler = e => {
          let el = this.popconfirmTriggerRef && this.popconfirmTriggerRef.current;
          const target = e.target;
          const path = e.composedPath && e.composedPath() || [target];
          if (el && !el.contains(target) && !path.includes(el)) {
            cb();
          }
        };
        window.addEventListener('mousedown', this.clickOutsideHandler);
      },
      unregisterClickOutsideHandler: () => {
        if (this.clickOutsideHandler) {
          window.removeEventListener('mousedown', this.clickOutsideHandler);
          this.clickOutsideHandler = null;
        }
      }
    });
  }
  render() {
    const {
      message = {},
      lastChat
    } = this.props;
    const {
      showAction
    } = this.state;
    const {
      role,
      status = MESSAGE_STATUS.COMPLETE
    } = message;
    const complete = status === MESSAGE_STATUS.COMPLETE;
    const showFeedback = role !== ROLE.USER && complete;
    const showReset = lastChat && role === ROLE.ASSISTANT;
    const finished = status !== MESSAGE_STATUS.LOADING && status !== MESSAGE_STATUS.INCOMPLETE;
    const wrapCls = (0, _classnames.default)(PREFIX_CHAT_BOX_ACTION, {
      [`${PREFIX_CHAT_BOX_ACTION}-show`]: showReset && finished || showAction,
      [`${PREFIX_CHAT_BOX_ACTION}-hidden`]: !finished
    });
    const {
      customRenderFunc
    } = this.props;
    if (customRenderFunc) {
      const actionNodes = [];
      const actionNodeObj = {};
      if (complete) {
        const copyNode = this.copyNode();
        actionNodes.push(copyNode);
        actionNodeObj.copyNode = copyNode;
      }
      if (showFeedback) {
        const likeNode = this.likeNode();
        actionNodes.push(likeNode);
        actionNodeObj.likeNode = likeNode;
        const dislikeNode = this.dislikeNode();
        actionNodes.push(dislikeNode);
        actionNodeObj.dislikeNode = dislikeNode;
      }
      if (showReset) {
        const resetNode = this.resetNode();
        actionNodes.push(resetNode);
        actionNodeObj.resetNode = resetNode;
      }
      const deleteNode = this.deleteNode();
      actionNodes.push(deleteNode);
      actionNodeObj.deleteNode = deleteNode;
      return customRenderFunc({
        message,
        defaultActions: actionNodes,
        className: wrapCls,
        defaultActionsObj: actionNodeObj
      });
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: wrapCls,
      ref: this.containerRef
    }, complete && this.copyNode(), showFeedback && this.likeNode(), showFeedback && this.dislikeNode(), showReset && this.resetNode(), this.deleteNode());
  }
}
ChatBoxAction.propTypes = {
  role: _propTypes.default.object,
  message: _propTypes.default.object,
  showReset: _propTypes.default.bool,
  onMessageBadFeedback: _propTypes.default.func,
  onMessageGoodFeedback: _propTypes.default.func,
  onMessageCopy: _propTypes.default.func,
  onChatsChange: _propTypes.default.func,
  onMessageDelete: _propTypes.default.func,
  onMessageReset: _propTypes.default.func,
  customRenderFunc: _propTypes.default.func
};
var _default = exports.default = ChatBoxAction;