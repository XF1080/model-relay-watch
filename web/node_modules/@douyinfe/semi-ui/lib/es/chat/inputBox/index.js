var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import React from 'react';
import cls from 'classnames';
import PropTypes from 'prop-types';
import { BaseComponent, Button, Upload, Tooltip, TextArea } from '../../index';
import { IconDeleteStroked, IconChainStroked, IconArrowUp } from '@douyinfe/semi-icons';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/chat/constants';
import InputBoxFoundation from '@douyinfe/semi-foundation/lib/es/chat/inputboxFoundation';
import Attachment from '../attachment';
const {
  PREFIX_INPUT_BOX
} = cssClasses;
const {
  SEND_HOT_KEY
} = strings;
const textAutoSize = {
  minRows: 1,
  maxRows: 5
};
class InputBox extends BaseComponent {
  constructor(props) {
    super(props);
    this.onClick = () => {
      var _a;
      (_a = this.inputAreaRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    this.renderUploadButton = () => {
      const {
        uploadProps,
        uploadRef,
        uploadTipProps,
        clickUpload
      } = this.props;
      if (!clickUpload) {
        return null;
      }
      const {
        attachment
      } = this.state;
      const {
          className,
          onChange,
          renderFileItem,
          children
        } = uploadProps,
        rest = __rest(uploadProps, ["className", "onChange", "renderFileItem", "children"]);
      const realUploadProps = Object.assign(Object.assign({}, rest), {
        className: cls(`${PREFIX_INPUT_BOX}-upload`, {
          [className]: className
        }),
        onChange: this.foundation.onAttachmentAdd
      });
      const uploadNode = /*#__PURE__*/React.createElement(Upload, Object.assign({
        ref: uploadRef,
        fileList: attachment
      }, realUploadProps), children ? children : /*#__PURE__*/React.createElement(Button, {
        className: `${PREFIX_INPUT_BOX}-uploadButton`,
        icon: /*#__PURE__*/React.createElement(IconChainStroked, {
          size: "extra-large"
        }),
        theme: 'borderless'
      }));
      return uploadTipProps ? /*#__PURE__*/React.createElement(Tooltip, Object.assign({}, uploadTipProps), /*#__PURE__*/React.createElement("span", null, uploadNode)) : uploadNode;
    };
    this.renderInputArea = () => {
      const {
        content,
        attachment
      } = this.state;
      const {
        placeholder,
        sendHotKey
      } = this.props;
      return /*#__PURE__*/React.createElement("div", {
        className: `${PREFIX_INPUT_BOX}-inputArea`
      }, /*#__PURE__*/React.createElement(TextArea, {
        placeholder: placeholder,
        onEnterPress: this.foundation.onEnterPress,
        value: content,
        onChange: this.foundation.onInputAreaChange,
        ref: this.inputAreaRef,
        className: `${PREFIX_INPUT_BOX}-textarea`,
        autosize: textAutoSize,
        disabledEnterStartNewLine: sendHotKey === SEND_HOT_KEY.ENTER ? true : false,
        onPaste: this.foundation.onPaste
      }), /*#__PURE__*/React.createElement(Attachment, {
        attachment: attachment,
        onClear: this.foundation.onAttachmentDelete
      }));
    };
    this.renderClearButton = () => {
      const {
        onClearContext
      } = this.props;
      return /*#__PURE__*/React.createElement(Button, {
        className: `${PREFIX_INPUT_BOX}-clearButton`,
        theme: 'borderless',
        icon: /*#__PURE__*/React.createElement(IconDeleteStroked, null),
        onClick: onClearContext
      });
    };
    this.renderSendButton = () => {
      const disabledSend = this.foundation.getDisableSend();
      return /*#__PURE__*/React.createElement(Button, {
        disabled: disabledSend,
        theme: 'solid',
        type: 'primary',
        className: `${PREFIX_INPUT_BOX}-sendButton`,
        // icon={<IconSend size="extra-large" className={`${PREFIX_INPUT_BOX}-sendButton-icon`} />}
        icon: /*#__PURE__*/React.createElement(IconArrowUp, {
          size: "large",
          className: `${PREFIX_INPUT_BOX}-sendButton-icon`
        }),
        onClick: this.foundation.onSend
      });
    };
    this.inputAreaRef = /*#__PURE__*/React.createRef();
    this.foundation = new InputBoxFoundation(this.adapter);
    this.state = {
      content: '',
      attachment: []
    };
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyInputChange: props => {
        const {
          onInputChange
        } = this.props;
        onInputChange && onInputChange(props);
      },
      setInputValue: value => {
        this.setState({
          content: value
        });
      },
      setAttachment: attachment => {
        this.setState({
          attachment: attachment
        });
      },
      notifySend: (content, attachment) => {
        const {
          onSend
        } = this.props;
        onSend && onSend(content, attachment);
      }
    });
  }
  render() {
    const {
      onClearContext,
      renderInputArea,
      onSend,
      style,
      className,
      showClearContext
    } = this.props;
    const clearNode = this.renderClearButton();
    const uploadNode = this.renderUploadButton();
    const inputNode = this.renderInputArea();
    const sendNode = this.renderSendButton();
    const nodes = /*#__PURE__*/React.createElement("div", {
      className: cls(PREFIX_INPUT_BOX, {
        [className]: className
      }),
      style: style
    }, /*#__PURE__*/React.createElement("div", {
      className: `${PREFIX_INPUT_BOX}-inner`,
      onClick: this.onClick
    }, showClearContext && clearNode, /*#__PURE__*/React.createElement("div", {
      className: `${PREFIX_INPUT_BOX}-container`
    }, uploadNode, inputNode, sendNode)));
    if (renderInputArea) {
      return renderInputArea({
        defaultNode: nodes,
        onClear: onClearContext,
        onSend: onSend,
        detailProps: {
          clearContextNode: clearNode,
          uploadNode: uploadNode,
          inputNode: inputNode,
          sendNode: sendNode,
          onClick: this.onClick
        }
      });
    }
    return nodes;
  }
}
InputBox.propTypes = {
  uploadProps: PropTypes.object
};
InputBox.defaultProps = {
  uploadProps: {}
};
export default InputBox;