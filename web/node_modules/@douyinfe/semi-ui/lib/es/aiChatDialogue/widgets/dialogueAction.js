import React from 'react';
import { IconThumbUpStroked, IconDeleteStroked, IconShareStroked, IconCopyStroked, IconLikeThumb, IconRedoStroked, IconEditStroked, IconMoreStroked } from '@douyinfe/semi-icons';
import BaseComponent from '../../_base/baseComponent';
import { Button, Dropdown, Modal, Toast } from '../../index';
import copy from 'copy-text-to-clipboard';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/constants';
import DialogueActionFoundation from '@douyinfe/semi-foundation/lib/es/aiChatDialogue/actionFoundation';
import LocaleConsumer from "../../locale/localeConsumer";
import cls from 'classnames';
const {
  PREFIX_ACTION
} = cssClasses;
const {
  ROLE,
  STATUS
} = strings;
class DialogueAction extends BaseComponent {
  constructor(props) {
    super(props);
    this.showDeleteModal = () => {
      Modal.warning({
        title: /*#__PURE__*/React.createElement(LocaleConsumer, {
          componentName: "AIChatDialogue"
        }, locale => locale['deleteConfirm']),
        content: /*#__PURE__*/React.createElement(LocaleConsumer, {
          componentName: "AIChatDialogue"
        }, locale => locale['deleteContent']),
        onOk: this.foundation.deleteMessage
      });
      this.foundation.hideMoreDropdown();
    };
    this.copyNode = () => {
      return /*#__PURE__*/React.createElement(Button, {
        key: 'copy',
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconCopyStroked, null),
        type: 'tertiary',
        onClick: this.foundation.copyMessage,
        className: `${PREFIX_ACTION}-btn`
      });
    };
    this.resetNode = () => {
      return /*#__PURE__*/React.createElement(Button, {
        key: 'reset',
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconRedoStroked, {
          className: `${PREFIX_ACTION}-icon-redo`
        }),
        type: 'tertiary',
        onClick: this.foundation.resetMessage,
        className: `${PREFIX_ACTION}-btn`
      });
    };
    this.shareNode = () => {
      return /*#__PURE__*/React.createElement(Button, {
        key: 'share',
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconShareStroked, null),
        type: 'tertiary',
        onClick: this.foundation.shareMessage
      });
    };
    this.likeNode = () => {
      const {
        message
      } = this.props;
      const {
        like
      } = message;
      return /*#__PURE__*/React.createElement(Button, {
        key: 'like',
        theme: 'borderless',
        icon: like ? /*#__PURE__*/React.createElement(IconLikeThumb, null) : /*#__PURE__*/React.createElement(IconThumbUpStroked, null),
        type: 'tertiary',
        className: `${PREFIX_ACTION}-btn`,
        onClick: () => this.foundation.likeMessage()
      });
    };
    this.dislikeNode = () => {
      const {
        message
      } = this.props;
      const {
        dislike
      } = message;
      return /*#__PURE__*/React.createElement(Button, {
        theme: 'borderless',
        key: 'dislike',
        icon: dislike ? /*#__PURE__*/React.createElement(IconLikeThumb, {
          className: `${PREFIX_ACTION}-icon-flip`
        }) : /*#__PURE__*/React.createElement(IconThumbUpStroked, {
          className: 'semi-chat-chatBox-action-icon-flip'
        }),
        type: 'tertiary',
        className: `${PREFIX_ACTION}-btn`,
        onClick: () => this.foundation.dislikeMessage()
      });
    };
    this.editNode = () => {
      // todo: 支持多模态消息编辑，需要使用 aiChatInput 组件
      return /*#__PURE__*/React.createElement(Button, {
        key: 'edit',
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconEditStroked, null),
        type: 'tertiary',
        onClick: () => this.foundation.editMessage()
      });
    };
    this.moreNode = () => {
      return /*#__PURE__*/React.createElement(Dropdown, {
        trigger: "custom",
        position: 'bottomLeft',
        className: `${PREFIX_ACTION}-dropdown`,
        visible: this.state.visible,
        onCancel: this.foundation.hideMoreDropdown,
        spacing: 12,
        stopPropagation: true,
        render: /*#__PURE__*/React.createElement(Dropdown.Menu, null, /*#__PURE__*/React.createElement(Dropdown.Item, {
          onClick: () => this.showDeleteModal()
        }, /*#__PURE__*/React.createElement(IconDeleteStroked, null), " ", /*#__PURE__*/React.createElement(LocaleConsumer, {
          componentName: "AIChatDialogue"
        }, locale => locale['delete'])))
      }, /*#__PURE__*/React.createElement("span", {
        ref: this.dropdownTriggerRef
      }, /*#__PURE__*/React.createElement(Button, {
        key: 'more',
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconMoreStroked, null),
        type: 'tertiary',
        onClick: this.foundation.showMoreDropdown
      })));
    };
    this.foundation = new DialogueActionFoundation(this.adapter);
    this.state = {
      visible: false,
      showAction: false
    };
    this.copySuccessNode = null;
    this.clickOutsideHandler = null;
    this.containerRef = /*#__PURE__*/React.createRef();
    this.dropdownTriggerRef = /*#__PURE__*/React.createRef();
  }
  componentDidMount() {
    this.copySuccessNode = /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "AIChatDialogue"
    }, locale => locale['copySuccess']);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
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
          message
        } = this.props;
        if (typeof (message === null || message === void 0 ? void 0 : message.content) === 'string') {
          copy(message.content);
        } else if (Array.isArray(message === null || message === void 0 ? void 0 : message.content)) {
          const content = (_a = message.content) === null || _a === void 0 ? void 0 : _a.map(item => {
            var _a;
            if (typeof (item === null || item === void 0 ? void 0 : item.content) === 'string') {
              return item === null || item === void 0 ? void 0 : item.content;
            } else {
              return (_a = item === null || item === void 0 ? void 0 : item.content) === null || _a === void 0 ? void 0 : _a.map(innerItem => innerItem === null || innerItem === void 0 ? void 0 : innerItem.text).join('');
            }
          }).join('');
          copy(content);
        }
        Toast.success({
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
      notifyShareMessage: () => {
        const {
          message,
          onMessageShare
        } = this.props;
        onMessageShare === null || onMessageShare === void 0 ? void 0 : onMessageShare(message);
      },
      notifyEditMessage: () => {
        const {
          message,
          onMessageEdit
        } = this.props;
        onMessageEdit === null || onMessageEdit === void 0 ? void 0 : onMessageEdit(message);
      },
      notifyDeleteMessage: () => {
        const {
          message,
          onMessageDelete
        } = this.props;
        onMessageDelete === null || onMessageDelete === void 0 ? void 0 : onMessageDelete(message);
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
          let el = this.dropdownTriggerRef && this.dropdownTriggerRef.current;
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
      message,
      isLastChat
    } = this.props;
    const {
      showAction
    } = this.state;
    const {
      role,
      status = STATUS.COMPLETED
    } = message;
    const completed = status === STATUS.COMPLETED;
    const showFeedback = role !== ROLE.USER && completed;
    const showReset = isLastChat && role === ROLE.ASSISTANT;
    const finished = status !== STATUS.IN_PROGRESS && status !== STATUS.INCOMPLETE;
    const showEdit = role === ROLE.USER;
    const wrapCls = cls(PREFIX_ACTION, {
      [`${PREFIX_ACTION}-show`]: showReset && finished || showAction,
      [`${PREFIX_ACTION}-hidden`]: !finished
    });
    const {
      customRenderFunc
    } = this.props;
    if (customRenderFunc) {
      const actionNodes = [];
      const actionNodeObj = {};
      if (completed) {
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
      const moreNode = this.moreNode();
      actionNodes.push(moreNode);
      actionNodeObj.moreNode = moreNode;
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
    }, completed && this.copyNode(), showReset && this.resetNode(), completed && this.shareNode(), showEdit && this.editNode(), showFeedback && this.likeNode(), showFeedback && this.dislikeNode(), this.moreNode());
  }
}
export default DialogueAction;