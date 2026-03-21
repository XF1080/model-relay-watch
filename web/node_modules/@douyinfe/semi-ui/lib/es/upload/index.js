import _pick from "lodash/pick";
import _noop from "lodash/noop";
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
import UploadFoundation from '@douyinfe/semi-foundation/lib/es/upload/foundation';
import { strings, cssClasses } from '@douyinfe/semi-foundation/lib/es/upload/constants';
import FileCard from './fileCard';
import BaseComponent from '../_base/baseComponent';
import LocaleConsumer from '../locale/localeConsumer';
import { IconUpload } from '@douyinfe/semi-icons';
import '@douyinfe/semi-foundation/lib/es/upload/upload.css';
const prefixCls = cssClasses.PREFIX;
class Upload extends BaseComponent {
  constructor(props) {
    super(props);
    this.inputRef = null;
    this.replaceInputRef = null;
    this.onClick = () => {
      const {
        inputRef,
        props
      } = this;
      const {
        onOpenFileDialog
      } = props;
      const isDisabled = Boolean(this.props.disabled);
      if (isDisabled || !inputRef || !inputRef.current) {
        return;
      }
      inputRef.current.click();
      if (onOpenFileDialog && typeof onOpenFileDialog) {
        onOpenFileDialog();
      }
    };
    this.onChange = e => {
      const {
        files
      } = e.target;
      this.foundation.handleChange(files);
    };
    this.replace = index => {
      this.setState({
        replaceIdx: index
      }, () => {
        this.replaceInputRef.current.click();
      });
    };
    this.onReplaceChange = e => {
      const {
        files
      } = e.target;
      this.foundation.handleReplaceChange(files);
    };
    this.clear = () => {
      this.foundation.handleClear();
    };
    this.remove = fileItem => {
      this.foundation.handleRemove(fileItem);
    };
    /**
     * ref method
     * insert files at index
     * @param files Array<CustomFile>
     * @param index number
     * @returns
     */
    this.insert = (files, index) => {
      return this.foundation.insertFileToList(files, index);
    };
    /**
     * ref method
     * manual upload by user
     */
    this.upload = () => {
      this.foundation.manualUpload();
    };
    /**
     * ref method
     * manual open file select dialog
     */
    this.openFileDialog = () => {
      this.onClick();
    };
    this.renderFile = (file, index, locale) => {
      const {
        name,
        status,
        validateMessage,
        _sizeInvalid,
        uid
      } = file;
      const {
        previewFile,
        listType,
        itemStyle,
        showPicInfo,
        renderPicInfo,
        renderPicClose,
        renderPicPreviewIcon,
        renderFileOperation,
        renderFileItem,
        renderThumbnail,
        disabled,
        onPreviewClick,
        picWidth,
        picHeight,
        showTooltip
      } = this.props;
      const onRemove = () => this.remove(file);
      const onRetry = () => {
        this.foundation.retry(file);
      };
      const onReplace = () => {
        this.replace(index);
      };
      const fileCardProps = Object.assign(Object.assign(Object.assign({}, _pick(this.props, ['showRetry', 'showReplace', ''])), file), {
        previewFile,
        listType,
        onRemove,
        onRetry,
        index,
        key: uid || `${name}${index}`,
        style: itemStyle,
        disabled,
        showPicInfo,
        renderPicInfo,
        renderPicPreviewIcon,
        renderPicClose,
        renderFileOperation,
        renderThumbnail,
        onReplace,
        onPreviewClick: typeof onPreviewClick !== 'undefined' ? () => this.foundation.handlePreviewClick(file) : undefined,
        picWidth,
        picHeight,
        showTooltip
      });
      if (status === strings.FILE_STATUS_UPLOAD_FAIL && !validateMessage) {
        fileCardProps.validateMessage = locale.fail;
      }
      if (_sizeInvalid && !validateMessage) {
        fileCardProps.validateMessage = locale.illegalSize;
      }
      if (typeof renderFileItem === 'undefined') {
        return /*#__PURE__*/React.createElement(FileCard, Object.assign({}, fileCardProps));
      } else {
        return renderFileItem(fileCardProps);
      }
    };
    this.renderFileList = () => {
      const {
        listType
      } = this.props;
      if (listType === strings.FILE_LIST_PIC) {
        return this.renderFileListPic();
      }
      if (listType === strings.FILE_LIST_DEFAULT) {
        return this.renderFileListDefault();
      }
      return null;
    };
    this.renderFileListPic = () => {
      const {
        showUploadList,
        limit,
        disabled,
        children,
        draggable,
        hotSpotLocation,
        picHeight,
        picWidth
      } = this.props;
      const {
        fileList: stateFileList,
        dragAreaStatus
      } = this.state;
      const fileList = this.props.fileList || stateFileList;
      const showAddTriggerInList = limit ? limit > fileList.length : true;
      const dragAreaBaseCls = `${prefixCls}-drag-area`;
      const uploadAddCls = cls(`${prefixCls}-add`, {
        [`${prefixCls}-picture-add`]: true,
        [`${prefixCls}-picture-add-disabled`]: disabled
      });
      const fileListCls = cls(`${prefixCls}-file-list`, {
        [`${prefixCls}-picture-file-list`]: true
      });
      const dragAreaCls = cls({
        [`${dragAreaBaseCls}-legal`]: dragAreaStatus === strings.DRAG_AREA_LEGAL,
        [`${dragAreaBaseCls}-illegal`]: dragAreaStatus === strings.DRAG_AREA_ILLEGAL
      });
      const mainCls = `${prefixCls}-file-list-main`;
      const addContentProps = {
        role: 'button',
        className: uploadAddCls,
        onClick: this.onClick,
        style: {
          height: picHeight,
          width: picWidth
        }
      };
      const containerProps = {
        className: fileListCls
      };
      const draggableProps = {
        onDrop: this.onDrop,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDragEnter: this.onDragEnter
      };
      if (draggable) {
        Object.assign(addContentProps, draggableProps, {
          className: cls(uploadAddCls, dragAreaCls)
        });
      }
      const addContent = /*#__PURE__*/React.createElement("div", Object.assign({}, addContentProps, {
        "x-semi-prop": "children"
      }), children);
      if (!showUploadList || !fileList.length) {
        if (showAddTriggerInList) {
          return addContent;
        }
        return null;
      }
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Upload"
      }, locale => (/*#__PURE__*/React.createElement("div", Object.assign({}, containerProps), /*#__PURE__*/React.createElement("div", {
        className: mainCls,
        role: "list",
        "aria-label": "picture list"
      }, showAddTriggerInList && hotSpotLocation === 'start' ? addContent : null, fileList.map((file, index) => this.renderFile(file, index, locale)), showAddTriggerInList && hotSpotLocation === 'end' ? addContent : null))));
    };
    this.renderFileListDefault = () => {
      const {
        showUploadList,
        limit,
        disabled
      } = this.props;
      const {
        fileList: stateFileList
      } = this.state;
      const fileList = this.props.fileList || stateFileList;
      const fileListCls = cls(`${prefixCls}-file-list`);
      const titleCls = `${prefixCls}-file-list-title`;
      const mainCls = `${prefixCls}-file-list-main`;
      const showTitle = limit !== 1 && fileList.length;
      const showClear = this.props.showClear && !disabled;
      const containerProps = {
        className: fileListCls
      };
      if (!showUploadList || !fileList.length) {
        return null;
      }
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Upload"
      }, locale => (/*#__PURE__*/React.createElement("div", Object.assign({}, containerProps), showTitle ? (/*#__PURE__*/React.createElement("div", {
        className: titleCls
      }, /*#__PURE__*/React.createElement("span", {
        className: `${titleCls}-choosen`
      }, locale.selectedFiles), showClear ? (/*#__PURE__*/React.createElement("span", {
        role: "button",
        tabIndex: 0,
        onClick: this.clear,
        className: `${titleCls}-clear`
      }, locale.clear)) : null)) : null, /*#__PURE__*/React.createElement("div", {
        className: mainCls,
        role: "list",
        "aria-label": "file list"
      }, fileList.map((file, index) => this.renderFile(file, index, locale))))));
    };
    this.onDrop = e => {
      this.foundation.handleDrop(e);
    };
    this.onDragOver = e => {
      // When a drag element moves within the target element
      this.foundation.handleDragOver(e);
    };
    this.onDragLeave = e => {
      this.foundation.handleDragLeave(e);
    };
    this.onDragEnter = e => {
      this.foundation.handleDragEnter(e);
    };
    this.renderAddContent = () => {
      const {
        draggable,
        children,
        listType,
        disabled
      } = this.props;
      const uploadAddCls = cls(`${prefixCls}-add`);
      if (listType === strings.FILE_LIST_PIC) {
        return null;
      }
      if (draggable) {
        return this.renderDragArea();
      }
      return /*#__PURE__*/React.createElement("div", {
        role: "button",
        tabIndex: 0,
        "aria-disabled": disabled,
        className: uploadAddCls,
        onClick: this.onClick
      }, children);
    };
    this.renderDragArea = () => {
      const {
        dragAreaStatus
      } = this.state;
      const {
        children,
        dragIcon,
        dragMainText,
        dragSubText,
        disabled
      } = this.props;
      const dragAreaBaseCls = `${prefixCls}-drag-area`;
      const dragAreaCls = cls(dragAreaBaseCls, {
        [`${dragAreaBaseCls}-legal`]: dragAreaStatus === strings.DRAG_AREA_LEGAL,
        [`${dragAreaBaseCls}-illegal`]: dragAreaStatus === strings.DRAG_AREA_ILLEGAL,
        [`${dragAreaBaseCls}-custom`]: children
      });
      return /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Upload"
      }, locale => (/*#__PURE__*/React.createElement("div", {
        role: "button",
        tabIndex: 0,
        "aria-disabled": disabled,
        className: dragAreaCls,
        onDrop: this.onDrop,
        onDragOver: this.onDragOver,
        onDragLeave: this.onDragLeave,
        onDragEnter: this.onDragEnter,
        onClick: this.onClick
      }, children ? children : (/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: `${dragAreaBaseCls}-icon`,
        "x-semi-prop": "dragIcon"
      }, dragIcon || /*#__PURE__*/React.createElement(IconUpload, {
        size: "extra-large"
      })), /*#__PURE__*/React.createElement("div", {
        className: `${dragAreaBaseCls}-text`
      }, /*#__PURE__*/React.createElement("div", {
        className: `${dragAreaBaseCls}-main-text`,
        "x-semi-prop": "dragMainText"
      }, dragMainText || locale.mainText), /*#__PURE__*/React.createElement("div", {
        className: `${dragAreaBaseCls}-sub-text`,
        "x-semi-prop": "dragSubText"
      }, dragSubText), /*#__PURE__*/React.createElement("div", {
        className: `${dragAreaBaseCls}-tips`
      }, dragAreaStatus === strings.DRAG_AREA_LEGAL && (/*#__PURE__*/React.createElement("span", {
        className: `${dragAreaBaseCls}-tips-legal`
      }, locale.legalTips)), dragAreaStatus === strings.DRAG_AREA_ILLEGAL && (/*#__PURE__*/React.createElement("span", {
        className: `${dragAreaBaseCls}-tips-illegal`
      }, locale.illegalTips)))))))));
    };
    this.state = {
      fileList: props.defaultFileList || [],
      replaceIdx: -1,
      inputKey: Math.random(),
      replaceInputKey: Math.random(),
      // Status of the drag zone
      dragAreaStatus: 'default',
      localUrls: []
    };
    this.foundation = new UploadFoundation(this.adapter);
    this.inputRef = /*#__PURE__*/React.createRef();
    this.replaceInputRef = /*#__PURE__*/React.createRef();
  }
  /**
   * Notes:
   *   The input parameter and return value here do not declare the type, otherwise tsc may report an error in form/fields.tsx when wrap after withField
   *   `The types of the parameters "props" and "nextProps" are incompatible.
         The attribute "action" is missing in the type "Readonly<any>", but it is required in the type "UploadProps".`
   *   which seems to be a bug, remove props type declare here
   */
  static getDerivedStateFromProps(props) {
    const {
      fileList
    } = props;
    if ('fileList' in props) {
      return {
        fileList: fileList || []
      };
    }
    return null;
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyFileSelect: files => this.props.onFileChange(files),
      notifyError: (error, fileInstance, fileList, xhr) => this.props.onError(error, fileInstance, fileList, xhr),
      notifySuccess: (responseBody, file, fileList) => this.props.onSuccess(responseBody, file, fileList),
      notifyProgress: (percent, file, fileList) => this.props.onProgress(percent, file, fileList),
      notifyRemove: (file, fileList, fileItem) => this.props.onRemove(file, fileList, fileItem),
      notifySizeError: (file, fileList) => this.props.onSizeError(file, fileList),
      notifyExceed: fileList => this.props.onExceed(fileList),
      updateFileList: (fileList, cb) => {
        if (typeof cb === 'function') {
          this.setState({
            fileList
          }, cb);
        } else {
          this.setState({
            fileList
          });
        }
      },
      notifyBeforeUpload: _ref => {
        let {
          file,
          fileList
        } = _ref;
        return this.props.beforeUpload({
          file,
          fileList
        });
      },
      notifyAfterUpload: _ref2 => {
        let {
          response,
          file,
          fileList
        } = _ref2;
        return this.props.afterUpload({
          response,
          file,
          fileList
        });
      },
      resetInput: () => {
        this.setState(prevState => ({
          inputKey: Math.random()
        }));
      },
      resetReplaceInput: () => {
        this.setState(prevState => ({
          replaceInputKey: Math.random()
        }));
      },
      isMac: () => {
        return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      },
      registerPastingHandler: cb => {
        document.body.addEventListener('keydown', cb);
        this.pastingCb = cb;
      },
      unRegisterPastingHandler: () => {
        if (this.pastingCb) {
          document.body.removeEventListener('keydown', this.pastingCb);
        }
      },
      notifyPastingError: error => this.props.onPastingError(error),
      updateDragAreaStatus: dragAreaStatus => this.setState({
        dragAreaStatus
      }),
      notifyChange: _ref3 => {
        let {
          currentFile,
          fileList
        } = _ref3;
        return this.props.onChange({
          currentFile,
          fileList
        });
      },
      updateLocalUrls: urls => this.setState({
        localUrls: urls
      }),
      notifyClear: () => this.props.onClear(),
      notifyPreviewClick: file => this.props.onPreviewClick(file),
      notifyDrop: (e, files, fileList) => this.props.onDrop(e, files, fileList),
      notifyAcceptInvalid: invalidFiles => this.props.onAcceptInvalid(invalidFiles),
      notifyBeforeRemove: (file, fileList) => this.props.beforeRemove(file, fileList),
      notifyBeforeClear: fileList => this.props.beforeClear(fileList)
    });
  }
  componentDidMount() {
    this.foundation.init();
  }
  componentWillUnmount() {
    this.foundation.destroy();
  }
  render() {
    const _a = this.props,
      {
        style,
        className,
        multiple,
        accept,
        disabled,
        children,
        capture,
        listType,
        prompt,
        promptPosition,
        draggable,
        validateMessage,
        validateStatus,
        directory
      } = _a,
      rest = __rest(_a, ["style", "className", "multiple", "accept", "disabled", "children", "capture", "listType", "prompt", "promptPosition", "draggable", "validateMessage", "validateStatus", "directory"]);
    const uploadCls = cls(prefixCls, {
      [`${prefixCls}-picture`]: listType === strings.FILE_LIST_PIC,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-default`]: validateStatus === 'default',
      [`${prefixCls}-error`]: validateStatus === 'error',
      [`${prefixCls}-warning`]: validateStatus === 'warning',
      [`${prefixCls}-success`]: validateStatus === 'success'
    }, className);
    const inputCls = cls(`${prefixCls}-hidden-input`);
    const inputReplaceCls = cls(`${prefixCls}-hidden-input-replace`);
    const promptCls = cls(`${prefixCls}-prompt`);
    const validateMsgCls = cls(`${prefixCls}-validate-message`);
    const dirProps = directory ? {
      directory: 'directory',
      webkitdirectory: 'webkitdirectory'
    } : {};
    return /*#__PURE__*/React.createElement("div", Object.assign({
      className: uploadCls,
      style: style,
      "x-prompt-pos": promptPosition
    }, this.getDataAttr(rest)), /*#__PURE__*/React.createElement("input", Object.assign({
      key: this.state.inputKey,
      capture: capture,
      multiple: multiple,
      accept: accept,
      onChange: this.onChange,
      type: "file",
      autoComplete: "off",
      tabIndex: -1,
      className: inputCls,
      ref: this.inputRef
    }, dirProps)), /*#__PURE__*/React.createElement("input", {
      key: this.state.replaceInputKey,
      multiple: false,
      accept: accept,
      onChange: this.onReplaceChange,
      type: "file",
      autoComplete: "off",
      tabIndex: -1,
      className: inputReplaceCls,
      ref: this.replaceInputRef
    }), this.renderAddContent(), prompt ? (/*#__PURE__*/React.createElement("div", {
      className: promptCls,
      "x-semi-prop": "prompt"
    }, prompt)) : null, validateMessage ? (/*#__PURE__*/React.createElement("div", {
      className: validateMsgCls,
      "x-semi-prop": "validateMessage"
    }, validateMessage)) : null, this.renderFileList());
  }
}
Upload.propTypes = {
  accept: PropTypes.string,
  action: PropTypes.string.isRequired,
  addOnPasting: PropTypes.bool,
  afterUpload: PropTypes.func,
  beforeClear: PropTypes.func,
  beforeRemove: PropTypes.func,
  beforeUpload: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  customRequest: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  defaultFileList: PropTypes.array,
  directory: PropTypes.bool,
  disabled: PropTypes.bool,
  dragIcon: PropTypes.node,
  dragMainText: PropTypes.node,
  dragSubText: PropTypes.node,
  draggable: PropTypes.bool,
  fileList: PropTypes.array,
  fileName: PropTypes.string,
  headers: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  hotSpotLocation: PropTypes.oneOf(['start', 'end']),
  itemStyle: PropTypes.object,
  limit: PropTypes.number,
  listType: PropTypes.oneOf(strings.LIST_TYPE),
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  onAcceptInvalid: PropTypes.func,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onDrop: PropTypes.func,
  onError: PropTypes.func,
  onExceed: PropTypes.func,
  onFileChange: PropTypes.func,
  onOpenFileDialog: PropTypes.func,
  onPreviewClick: PropTypes.func,
  onProgress: PropTypes.func,
  onRemove: PropTypes.func,
  onRetry: PropTypes.func,
  onSizeError: PropTypes.func,
  onSuccess: PropTypes.func,
  onPastingError: PropTypes.func,
  previewFile: PropTypes.func,
  prompt: PropTypes.node,
  promptPosition: PropTypes.oneOf(strings.PROMPT_POSITION),
  picWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  picHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  renderFileItem: PropTypes.func,
  renderPicPreviewIcon: PropTypes.func,
  renderFileOperation: PropTypes.func,
  renderPicClose: PropTypes.func,
  renderPicInfo: PropTypes.func,
  renderThumbnail: PropTypes.func,
  showClear: PropTypes.bool,
  showPicInfo: PropTypes.bool,
  showReplace: PropTypes.bool,
  showRetry: PropTypes.bool,
  showUploadList: PropTypes.bool,
  style: PropTypes.object,
  timeout: PropTypes.number,
  transformFile: PropTypes.func,
  uploadTrigger: PropTypes.oneOf(strings.UPLOAD_TRIGGER),
  validateMessage: PropTypes.node,
  validateStatus: PropTypes.oneOf(strings.VALIDATE_STATUS),
  withCredentials: PropTypes.bool,
  showTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};
Upload.defaultProps = {
  defaultFileList: [],
  disabled: false,
  listType: 'list',
  hotSpotLocation: 'end',
  multiple: false,
  onAcceptInvalid: _noop,
  onChange: _noop,
  beforeRemove: () => true,
  beforeClear: () => true,
  onClear: _noop,
  onDrop: _noop,
  onError: _noop,
  onExceed: _noop,
  onFileChange: _noop,
  onOpenFileDialog: _noop,
  onProgress: _noop,
  onRemove: _noop,
  onRetry: _noop,
  onSizeError: _noop,
  onSuccess: _noop,
  onPastingError: _noop,
  promptPosition: 'right',
  showClear: true,
  showPicInfo: false,
  showReplace: false,
  showRetry: true,
  showUploadList: true,
  uploadTrigger: 'auto',
  withCredentials: false,
  showTooltip: true
};
Upload.FileCard = FileCard;
export default Upload;