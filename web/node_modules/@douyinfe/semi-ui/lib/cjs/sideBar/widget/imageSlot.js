"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageUploadNodeComponent = exports.ImageUploadNode = void 0;
var _isObject2 = _interopRequireDefault(require("lodash/isObject"));
var _index = require("../../index");
var _react = require("@tiptap/react");
var _react2 = _interopRequireWildcard(require("react"));
var _localeConsumer = _interopRequireDefault(require("../../locale/localeConsumer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
const ImageUploadNodeComponent = props => {
  const [status, setStatus] = (0, _react2.useState)();
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
      } else if ((0, _isObject2.default)(responseBody) && responseBody.src) {
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
  return /*#__PURE__*/_react2.default.createElement(_react.NodeViewWrapper, {
    className: 'tiptap-image-slot',
    tabIndex: 0
  }, /*#__PURE__*/_react2.default.createElement(_localeConsumer.default, {
    componentName: "Sidebar"
  }, locale => (/*#__PURE__*/_react2.default.createElement(_index.Upload, Object.assign({}, rest, {
    draggable: true,
    className: status,
    dragMainText: getDragMainText(status, locale),
    onChange: handleChange,
    onSuccess: handleSuccess
  })))));
};
exports.ImageUploadNodeComponent = ImageUploadNodeComponent;
const ImageUploadNode = exports.ImageUploadNode = _react.Node.create({
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
    return ["div", (0, _react.mergeAttributes)({
      "data-type": "image-upload"
    }, HTMLAttributes)];
  },
  addNodeView() {
    return (0, _react.ReactNodeViewRenderer)(ImageUploadNodeComponent);
  }
});