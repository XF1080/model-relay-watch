import React from 'react';
import PropTypes from 'prop-types';
import { IconThumbUpStroked, IconDeleteStroked, IconCopyStroked, IconLikeThumb, IconRedoStroked } from '@douyinfe/semi-icons';
import { BaseComponent, Button, Popconfirm } from '../../index';
import copy from 'copy-text-to-clipboard';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/chat/constants';
import ChatBoxActionFoundation from '@douyinfe/semi-foundation/lib/es/chat/chatBoxActionFoundation';
import LocaleConsumer from "../../locale/localeConsumer";
import cls from 'classnames';
const {
  PREFIX_CHAT_BOX_ACTION
} = cssClasses;
const {
  ROLE,
  MESSAGE_STATUS
} = strings;
class ChatBoxAction extends BaseComponent {
  constructor(props) {
    super(props);
    this.copyNode = () => {
      return /*#__PURE__*/React.createElement(Button, {
        key: 'copy',
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconCopyStroked, null),
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
      return /*#__PURE__*/React.createElement(Button, {
        key: 'like',
        theme: 'borderless',
        icon: like ? /*#__PURE__*/React.createElement(IconLikeThumb, null) : /*#__PURE__*/React.createElement(IconThumbUpStroked, null),
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
      return /*#__PURE__*/React.createElement(Button, {
        theme: 'borderless',
        key: 'dislike',
        icon: dislike ? /*#__PURE__*/React.createElement(IconLikeThumb, {
          className: `${PREFIX_CHAT_BOX_ACTION}-icon-flip`
        }) : /*#__PURE__*/React.createElement(IconThumbUpStroked, {
          className: 'semi-chat-chatBox-action-icon-flip'
        }),
        type: 'tertiary',
        className: `${PREFIX_CHAT_BOX_ACTION}-btn`,
        onClick: this.foundation.dislikeMessage
      });
    };
    this.resetNode = () => {
      return /*#__PURE__*/React.createElement(Button, {
        key: 'reset',
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconRedoStroked, {
          className: `${PREFIX_CHAT_BOX_ACTION}-icon-redo`
        }),
        type: 'tertiary',
        onClick: this.foundation.resetMessage,
        className: `${PREFIX_CHAT_BOX_ACTION}-btn`
      });
    };
    this.deleteNode = () => {
      const deleteMessage = /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Chat"
      }, locale => locale['deleteConfirm']);
      return /*#__PURE__*/React.createElement(Popconfirm, {
        trigger: "custom",
        visible: this.state.visible,
        key: 'delete',
        title: deleteMessage,
        onConfirm: this.foundation.deleteMessage,
        onCancel: this.foundation.hideDeletePopup,
        position: 'top'
      }, /*#__PURE__*/React.createElement("span", {
        ref: this.popconfirmTriggerRef,
        className: `${PREFIX_CHAT_BOX_ACTION}-delete-wrap`
      }, /*#__PURE__*/React.createElement(Button, {
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconDeleteStroked, null),
        type: 'tertiary',
        className: `${PREFIX_CHAT_BOX_ACTION}-btn`,
        onClick: this.foundation.showDeletePopup
      })));
    };
    this.foundation = new ChatBoxActionFoundation(this.adapter);
    this.copySuccessNode = null;
    this.state = {
      visible: false,
      showAction: false
    };
    this.clickOutsideHandler = null;
    this.containerRef = /*#__PURE__*/React.createRef();
    this.popconfirmTriggerRef = /*#__PURE__*/React.createRef();
  }
  componentDidMount() {
    this.copySuccessNode = /*#__PURE__*/React.createElement(LocaleConsumer, {
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
          copy(message.content);
        } else if (Array.isArray(message.content)) {
          const content = (_a = message.content) === null || _a === void 0 ? void 0 : _a.map(item => item.text).join('');
          copy(content);
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
    const wrapCls = cls(PREFIX_CHAT_BOX_ACTION, {
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
    return /*#__PURE__*/React.createElement("div", {
      className: wrapCls,
      ref: this.containerRef
    }, complete && this.copyNode(), showFeedback && this.likeNode(), showFeedback && this.dislikeNode(), showReset && this.resetNode(), this.deleteNode());
  }
}
ChatBoxAction.propTypes = {
  role: PropTypes.object,
  message: PropTypes.object,
  showReset: PropTypes.bool,
  onMessageBadFeedback: PropTypes.func,
  onMessageGoodFeedback: PropTypes.func,
  onMessageCopy: PropTypes.func,
  onChatsChange: PropTypes.func,
  onMessageDelete: PropTypes.func,
  onMessageReset: PropTypes.func,
  customRenderFunc: PropTypes.func
};
export default ChatBoxAction;