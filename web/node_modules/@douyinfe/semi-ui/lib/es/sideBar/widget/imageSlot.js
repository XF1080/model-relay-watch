import _isObject from "lodash/isObject";
var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { Upload } from '../../index';
import { NodeViewWrapper } from '@tiptap/react';
import React, { useState } from 'react';
import { mergeAttributes, Node } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import LocaleConsumer from '../../locale/localeConsumer';
export const ImageUploadNodeComponent = props => {
  const [status, setStatus] = useState();
  const _a = props.extension.options,
    {
      onChange,
      onSuccess,
      getUploadImageSrc,
      className
    } = _a,
    rest = __rest(_a, ["onChange", "onSuccess", "getUploadImageSrc", "className"]);
  const handleChange = innerProps => {
    const file = innerProps.fileList[0];
    if (file) {
      setStatus(file.status);
    }
    onChange === null || onChange === void 0 ? void 0 : onChange(innerProps);
  };
  const handleSuccess = (responseBody, file, fileList) => {
    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(responseBody, file, fileList);
    let src = fileList[0].src;
    if (getUploadImageSrc) {
      src = getUploadImageSrc(src);
    } else {
      if (typeof responseBody === 'string') {
        src = responseBody;
      } else if (_isObject(responseBody) && responseBody.src) {
        src = responseBody.src;
      }
    }
    const {
      name
    } = file;
    const imageNode = {
      type: props.extension.options.type,
      attrs: {
        src: src,
        alt: name,
        title: name
      }
    };
    const pos = props.getPos();
    props.editor.chain().focus().deleteRange({
      from: pos,
      to: pos + props.node.nodeSize
    }).insertContentAt(pos, imageNode).run();
  };
  const getDragMainText = (status, locale) => {
    if (status === 'validateFail') {
      return locale.validateFailInfo;
    } else if (status === 'uploadFail') {
      return locale.uploadFailInfo;
    }
    return locale.uploadImgInfo;
  };
  return /*#__PURE__*/React.createElement(NodeViewWrapper, {
    className: 'tiptap-image-slot',
    tabIndex: 0
  }, /*#__PURE__*/React.createElement(LocaleConsumer, {
    componentName: "Sidebar"
  }, locale => (/*#__PURE__*/React.createElement(Upload, Object.assign({}, rest, {
    draggable: true,
    className: status,
    dragMainText: getDragMainText(status, locale),
    onChange: handleChange,
    onSuccess: handleSuccess
  })))));
};
export const ImageUploadNode = Node.create({
  name: "imageUpload",
  group: "block",
  draggable: true,
  selectable: true,
  atom: true,
  addOptions() {
    return {
      type: "image",
      accept: "image/*",
      limit: 1,
      action: undefined,
      HTMLAttributes: {}
    };
  },
  addAttributes() {
    return {
      accept: {
        default: this.options.accept
      },
      limit: {
        default: this.options.limit
      },
      maxSize: {
        default: this.options.maxSize
      },
      action: {
        default: this.options.action
      },
      minSize: {
        default: this.options.minSize
      }
    };
  },
  parseHTML() {
    return [{
      tag: 'div[data-type="image-upload"]'
    }];
  },
  renderHTML(_ref) {
    let {
      HTMLAttributes
    } = _ref;
    return ["div", mergeAttributes({
      "data-type": "image-upload"
    }, HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadNodeComponent);
  }
});