import _pick from "lodash/pick";
import React from 'react';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/sidebar/constants';
import cls from 'classnames';
import BaseComponent from '../_base/baseComponent';
import PropTypes from 'prop-types';
import Container from './container';
import Options from './options';
import { IconClose, IconCopyStroked } from '@douyinfe/semi-icons';
import Button from '../button';
import { CodeItem } from './widget/code';
import { FileItem } from './widget/file';
import copy from 'copy-text-to-clipboard';
import { ToastFactory } from '../toast';
import FileContent from './widget/file';
import CodeContent from './widget/code';
import LocaleConsumer from '../locale/localeConsumer';
const prefixCls = cssClasses.SIDEBAR;
class Sidebar extends BaseComponent {
  constructor(props) {
    super(props);
    this.renderOption = () => {
      const {
        activeKey,
        options,
        onActiveOptionChange,
        renderOptionItem
      } = this.props;
      return /*#__PURE__*/React.createElement(Options, {
        options: options,
        renderOptionItem: renderOptionItem,
        onChange: onActiveOptionChange,
        activeKey: activeKey
      });
    };
    this.renderMain = () => {
      const activeKey = this.props.activeKey;
      const {
        renderMainContent
      } = this.props;
      return /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-main-content-wrapper`
      }, this.renderOption(), /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-main-content`
      }, renderMainContent === null || renderMainContent === void 0 ? void 0 : renderMainContent(activeKey)));
    };
    this.renderDetail = () => {
      const {
        renderDetailContent,
        detailContent = {},
        imgUploadProps,
        fileEditable,
        onFileContentChange,
        mode
      } = this.props;
      const result = renderDetailContent === null || renderDetailContent === void 0 ? void 0 : renderDetailContent(mode);
      if (result) {
        return result;
      }
      if (mode === 'code') {
        return /*#__PURE__*/React.createElement(CodeItem, Object.assign({}, detailContent, {
          jsonViewerProps: {
            height: '100%'
          }
        }));
      } else if (mode === 'file') {
        return /*#__PURE__*/React.createElement(FileItem, Object.assign({}, detailContent, {
          imgUploadProps: imgUploadProps,
          editable: fileEditable !== null && fileEditable !== void 0 ? fileEditable : true,
          onContentChange: onFileContentChange
        }));
      }
      return null;
    };
    this.renderContent = () => {
      const {
        mode
      } = this.props;
      return mode === strings.MODE.MAIN ? this.renderMain() : this.renderDetail();
    };
    this.renderTitle = () => {
      const {
        title,
        mode
      } = this.props;
      if (mode === strings.MODE.MAIN) {
        return title;
      }
      return null;
    };
    this.onDetailClose = e => {
      const {
        onBackWard
      } = this.props;
      onBackWard === null || onBackWard === void 0 ? void 0 : onBackWard(e, strings.MODE.MAIN);
    };
    this.handleCopyDetailContent = (e, locale) => {
      const {
        detailContent,
        mode,
        onDetailContentCopy
      } = this.props;
      const content = detailContent.content;
      const res = copy(content);
      res && this.ToastInCustomContainer.success({
        content: locale.copySuccess
      });
      onDetailContentCopy === null || onDetailContentCopy === void 0 ? void 0 : onDetailContentCopy(e, content, res);
    };
    this.renderHeader = () => {
      const {
        renderDetailHeader,
        detailContent,
        mode
      } = this.props;
      const result = renderDetailHeader === null || renderDetailHeader === void 0 ? void 0 : renderDetailHeader(mode, detailContent);
      if (result) {
        return result;
      }
      return /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-detail-header`
      }, /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-detail-header-left`
      }, /*#__PURE__*/React.createElement(Button, {
        theme: 'borderless',
        type: 'tertiary',
        icon: /*#__PURE__*/React.createElement(IconClose, null),
        onClick: this.onDetailClose
      }), /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-detail-header-title`
      }, detailContent.name)), /*#__PURE__*/React.createElement("span", {
        className: `${prefixCls}-detail-header-right`
      }, /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Sidebar"
      }, locale => (/*#__PURE__*/React.createElement(Button, {
        theme: 'borderless',
        type: 'tertiary',
        icon: /*#__PURE__*/React.createElement(IconCopyStroked, null),
        onClick: e => this.handleCopyDetailContent(e, locale)
      })))));
    };
    this.containerRef = /*#__PURE__*/React.createRef();
    this.ToastInCustomContainer = ToastFactory.create({
      getPopupContainer: () => this.containerRef.current
    });
  }
  render() {
    const {
      mode
    } = this.props;
    const containerProps = _pick(this.props, ['title', 'style', 'visible', 'motion', 'minWidth', 'maxWidth', 'onCancel', 'afterVisibleChange', 'resizable', 'defaultSize', 'children', 'className', 'showClose']);
    return /*#__PURE__*/React.createElement(Container, Object.assign({}, containerProps, {
      title: this.renderTitle(),
      containerRef: this.containerRef,
      className: cls({
        [containerProps.className]: containerProps.className,
        [`${prefixCls}-main`]: mode === strings.MODE.MAIN,
        [`${prefixCls}-detail`]: mode !== strings.MODE.MAIN
      }),
      renderHeader: mode !== strings.MODE.MAIN ? this.renderHeader : undefined
    }), this.renderContent());
  }
}
Sidebar.propTypes = Object.assign(Object.assign({}, Container.propTypes), {
  mode: PropTypes.string,
  activeKey: PropTypes.string,
  options: PropTypes.array,
  onActiveOptionChange: PropTypes.func,
  renderMainContent: PropTypes.func,
  renderDetailHeader: PropTypes.func,
  renderDetailContent: PropTypes.func,
  fileEditable: PropTypes.bool,
  onFileContentChange: PropTypes.func,
  onBackWard: PropTypes.func
});
Sidebar.FileContent = FileContent;
Sidebar.CodeContent = CodeContent;
Sidebar.FileItem = FileItem;
Sidebar.CodeItem = CodeItem;
Sidebar.Container = Container;
Sidebar.defaultProps = {
  mode: strings.MODE.MAIN,
  fileEditable: true
};
export default Sidebar;