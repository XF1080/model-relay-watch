"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pick2 = _interopRequireDefault(require("lodash/pick"));
var _react = _interopRequireDefault(require("react"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
var _classnames = _interopRequireDefault(require("classnames"));
var _baseComponent = _interopRequireDefault(require("../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _container = _interopRequireDefault(require("./container"));
var _options = _interopRequireDefault(require("./options"));
var _semiIcons = require("@douyinfe/semi-icons");
var _button = _interopRequireDefault(require("../button"));
var _code = _interopRequireWildcard(require("./widget/code"));
var _file = _interopRequireWildcard(require("./widget/file"));
var _copyTextToClipboard = _interopRequireDefault(require("copy-text-to-clipboard"));
var _toast = require("../toast");
var _localeConsumer = _interopRequireDefault(require("../locale/localeConsumer"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.SIDEBAR;
class Sidebar extends _baseComponent.default {
  constructor(props) {
    super(props);
    this.renderOption = () => {
      const {
        activeKey,
        options,
        onActiveOptionChange,
        renderOptionItem
      } = this.props;
      return /*#__PURE__*/_react.default.createElement(_options.default, {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-main-content-wrapper`
      }, this.renderOption(), /*#__PURE__*/_react.default.createElement("div", {
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
        return /*#__PURE__*/_react.default.createElement(_code.CodeItem, Object.assign({}, detailContent, {
          jsonViewerProps: {
            height: '100%'
          }
        }));
      } else if (mode === 'file') {
        return /*#__PURE__*/_react.default.createElement(_file.FileItem, Object.assign({}, detailContent, {
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
      return mode === _constants.strings.MODE.MAIN ? this.renderMain() : this.renderDetail();
    };
    this.renderTitle = () => {
      const {
        title,
        mode
      } = this.props;
      if (mode === _constants.strings.MODE.MAIN) {
        return title;
      }
      return null;
    };
    this.onDetailClose = e => {
      const {
        onBackWard
      } = this.props;
      onBackWard === null || onBackWard === void 0 ? void 0 : onBackWard(e, _constants.strings.MODE.MAIN);
    };
    this.handleCopyDetailContent = (e, locale) => {
      const {
        detailContent,
        mode,
        onDetailContentCopy
      } = this.props;
      const content = detailContent.content;
      const res = (0, _copyTextToClipboard.default)(content);
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-detail-header`
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: `${prefixCls}-detail-header-left`
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        theme: 'borderless',
        type: 'tertiary',
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconClose, null),
        onClick: this.onDetailClose
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: `${prefixCls}-detail-header-title`
      }, detailContent.name)), /*#__PURE__*/_react.default.createElement("span", {
        className: `${prefixCls}-detail-header-right`
      }, /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "Sidebar"
      }, locale => (/*#__PURE__*/_react.default.createElement(_button.default, {
        theme: 'borderless',
        type: 'tertiary',
        icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconCopyStroked, null),
        onClick: e => this.handleCopyDetailContent(e, locale)
      })))));
    };
    this.containerRef = /*#__PURE__*/_react.default.createRef();
    this.ToastInCustomContainer = _toast.ToastFactory.create({
      getPopupContainer: () => this.containerRef.current
    });
  }
  render() {
    const {
      mode
    } = this.props;
    const containerProps = (0, _pick2.default)(this.props, ['title', 'style', 'visible', 'motion', 'minWidth', 'maxWidth', 'onCancel', 'afterVisibleChange', 'resizable', 'defaultSize', 'children', 'className', 'showClose']);
    return /*#__PURE__*/_react.default.createElement(_container.default, Object.assign({}, containerProps, {
      title: this.renderTitle(),
      containerRef: this.containerRef,
      className: (0, _classnames.default)({
        [containerProps.className]: containerProps.className,
        [`${prefixCls}-main`]: mode === _constants.strings.MODE.MAIN,
        [`${prefixCls}-detail`]: mode !== _constants.strings.MODE.MAIN
      }),
      renderHeader: mode !== _constants.strings.MODE.MAIN ? this.renderHeader : undefined
    }), this.renderContent());
  }
}
Sidebar.propTypes = Object.assign(Object.assign({}, _container.default.propTypes), {
  mode: _propTypes.default.string,
  activeKey: _propTypes.default.string,
  options: _propTypes.default.array,
  onActiveOptionChange: _propTypes.default.func,
  renderMainContent: _propTypes.default.func,
  renderDetailHeader: _propTypes.default.func,
  renderDetailContent: _propTypes.default.func,
  fileEditable: _propTypes.default.bool,
  onFileContentChange: _propTypes.default.func,
  onBackWard: _propTypes.default.func
});
Sidebar.FileContent = _file.default;
Sidebar.CodeContent = _code.default;
Sidebar.FileItem = _file.FileItem;
Sidebar.CodeItem = _code.CodeItem;
Sidebar.Container = _container.default;
Sidebar.defaultProps = {
  mode: _constants.strings.MODE.MAIN,
  fileEditable: true
};
var _default = exports.default = Sidebar;