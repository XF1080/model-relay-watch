"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _constants = require("@douyinfe/semi-foundation/lib/cjs/sidebar/constants");
var _index = require("../../index");
var _semiIcons = require("@douyinfe/semi-icons");
var _semiIllustrations = require("@douyinfe/semi-illustrations");
var _mcpCofContentFoundation = _interopRequireDefault(require("@douyinfe/semi-foundation/lib/cjs/sidebar/mcpCofContentFoundation"));
var _localeConsumer = _interopRequireDefault(require("../../locale/localeConsumer"));
var _utils = require("@douyinfe/semi-foundation/lib/cjs/sidebar/utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const prefixCls = _constants.cssClasses.MCP_CONFIGURE_CONTENT;
class MCPConfigureContent extends _baseComponent.default {
  constructor(props) {
    var _a, _b, _c;
    super(props);
    this.renderContent = () => {
      const {
        showOptions,
        mode
      } = this.state;
      const {
        renderItem
      } = this.props;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: `${prefixCls}-item-container`
      }, showOptions.map(option => {
        if (renderItem) {
          return renderItem({
            custom: mode === _constants.strings.MCP_MODE.CUSTOM,
            option: option
          });
        }
        return /*#__PURE__*/_react.default.createElement("div", {
          key: option.value,
          className: `${prefixCls}-item`
        }, typeof option.icon === 'string' ? /*#__PURE__*/_react.default.createElement("img", {
          src: option.icon,
          alt: option.label,
          className: `${prefixCls}-item-sign`
        }) : /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-item-sign`
        }, option.icon), /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-item-content`
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-item-content-label`
        }, option.label), /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-item-content-desc`
        }, option.desc)), option.configure && /*#__PURE__*/_react.default.createElement(_index.Button, {
          icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconSetting, null),
          className: `${prefixCls}-item-button ${prefixCls}-item-button-configure`,
          onClick: e => this.foundation.onConfigureButtonClick(e, option)
        }), mode === _constants.strings.MCP_MODE.CUSTOM && /*#__PURE__*/_react.default.createElement(_index.Button, {
          icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconEdit, null),
          className: `${prefixCls}-item-button ${prefixCls}-item-button-configure`,
          onClick: e => this.foundation.onEditButtonClick(e, option)
        }), this.renderStatusButton(option));
      }));
    };
    this.renderStatusButton = option => {
      const buttonNode = /*#__PURE__*/_react.default.createElement(_index.Button, {
        icon: option.active ? /*#__PURE__*/_react.default.createElement(_semiIcons.IconMinus, null) : /*#__PURE__*/_react.default.createElement(_semiIcons.IconPlus, null),
        theme: option.active ? 'light' : 'solid',
        type: 'primary',
        className: `${prefixCls}-item-button`,
        disabled: option.disabled,
        checked: option.active,
        onClick: () => this.foundation.handleStatusChange(option, !option.active)
      });
      return option.disabled ? /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
        componentName: "Sidebar"
      }, locale => (/*#__PURE__*/_react.default.createElement(_index.Tooltip, {
        title: locale.defaultMcpInfo
      }, buttonNode))) : buttonNode;
    };
    this.renderSearch = () => {
      const {
        placeholder,
        customOptions
      } = this.props;
      if (this.state.mode === _constants.strings.MCP_MODE.INNER) {
        return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
          componentName: "Sidebar"
        }, locale => (/*#__PURE__*/_react.default.createElement(_index.Input, {
          prefix: /*#__PURE__*/_react.default.createElement(_semiIcons.IconSearch, null),
          value: this.state.inputValue,
          placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : locale.searchPlaceholder,
          onChange: this.foundation.handleSearch,
          className: `${prefixCls}-search`
        })));
      } else {
        if (customOptions === undefined || customOptions === null || Array.isArray(customOptions) && customOptions.length === 0) {
          return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
            componentName: "Sidebar"
          }, locale => (/*#__PURE__*/_react.default.createElement(_index.Empty, {
            image: /*#__PURE__*/_react.default.createElement(_semiIllustrations.IllustrationNoContent, {
              style: {
                width: 150,
                height: 150
              }
            }),
            darkModeImage: /*#__PURE__*/_react.default.createElement(_semiIllustrations.IllustrationNoContentDark, {
              style: {
                width: 150,
                height: 150
              }
            }),
            description: locale.emptyCustomMcpInfo,
            className: `${prefixCls}-custom-empty`
          }, /*#__PURE__*/_react.default.createElement(_index.Button, {
            theme: 'solid',
            type: 'primary',
            icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconPlus, null),
            onClick: this.foundation.handleAddClick
          }, locale.newMcpAdd))));
        }
        return /*#__PURE__*/_react.default.createElement("div", {
          className: `${prefixCls}-search ${prefixCls}-search-container`
        }, /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
          componentName: "Sidebar"
        }, locale => (/*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_index.Input, {
          prefix: /*#__PURE__*/_react.default.createElement(_semiIcons.IconSearch, null),
          value: this.state.inputValue,
          placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : locale.searchPlaceholder,
          onChange: this.foundation.handleSearch
        }), /*#__PURE__*/_react.default.createElement(_index.Button, {
          theme: 'solid',
          type: 'primary',
          icon: /*#__PURE__*/_react.default.createElement(_semiIcons.IconPlus, null),
          onClick: this.foundation.handleAddClick
        }, locale.newMcpAdd)))));
      }
    };
    this.state = {
      mode: _constants.strings.MCP_MODE.INNER,
      inputValue: '',
      showOptions: (_a = props.options) !== null && _a !== void 0 ? _a : [],
      cachedOptions: (_b = props.options) !== null && _b !== void 0 ? _b : [],
      cachedCustomOptions: (_c = props.customOptions) !== null && _c !== void 0 ? _c : []
    };
    this.foundation = new _mcpCofContentFoundation.default(this.adapter);
  }
  get adapter() {
    return Object.assign(Object.assign({}, super.adapter), {
      notifyConfigureClick: (e, option) => {
        var _a, _b;
        (_b = (_a = this.props).onConfigureClick) === null || _b === void 0 ? void 0 : _b.call(_a, e, option);
      },
      notifyEditClick: (e, option) => {
        var _a, _b;
        (_b = (_a = this.props).onEditClick) === null || _b === void 0 ? void 0 : _b.call(_a, e, option);
      },
      notifyStatusChange: (options, custom) => {
        var _a, _b;
        (_b = (_a = this.props).onStatusChange) === null || _b === void 0 ? void 0 : _b.call(_a, options, custom);
      },
      notifyAddClick: e => {
        var _a, _b;
        (_b = (_a = this.props).onAddClick) === null || _b === void 0 ? void 0 : _b.call(_a, e);
      }
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    const {
      options = [],
      customOptions = [],
      filter
    } = nextProps;
    const {
      cachedOptions = [],
      cachedCustomOptions = []
    } = prevState;
    if (options !== cachedOptions) {
      newState.cachedOptions = options;
      if (prevState.mode === _constants.strings.MCP_MODE.INNER) {
        if (!prevState.inputValue) {
          newState.showOptions = options;
        } else {
          newState.showOptions = (0, _utils.getFilterResult)(prevState.inputValue, options, filter);
        }
      }
    }
    if (customOptions !== cachedCustomOptions) {
      newState.cachedCustomOptions = customOptions;
      if (prevState.mode === _constants.strings.MCP_MODE.CUSTOM) {
        if (!prevState.inputValue) {
          newState.showOptions = customOptions;
        } else {
          newState.showOptions = (0, _utils.getFilterResult)(prevState.inputValue, customOptions, filter);
        }
      }
    }
    return newState;
  }
  render() {
    const {
      options = [],
      customOptions = [],
      className,
      style
    } = this.props;
    const activatedCount = options.filter(option => option.active).length + customOptions.filter(option => option.active).length;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(prefixCls, {
        [className]: className
      }),
      style: style
    }, /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Sidebar"
    }, locale => (/*#__PURE__*/_react.default.createElement("div", {
      className: `${prefixCls}-header`
    }, /*#__PURE__*/_react.default.createElement(_index.RadioGroup, {
      type: 'button',
      value: this.state.mode,
      onChange: this.foundation.handleModeChange
    }, /*#__PURE__*/_react.default.createElement(_index.Radio, {
      value: _constants.strings.MCP_MODE.INNER
    }, "MCP Servers"), /*#__PURE__*/_react.default.createElement(_index.Radio, {
      value: _constants.strings.MCP_MODE.CUSTOM
    }, locale.newMcpAdd)), /*#__PURE__*/_react.default.createElement("span", {
      className: `${prefixCls}-header-count`
    }, locale.activeMCPNumber, " ", activatedCount, "/", options.length + customOptions.length)))), this.renderSearch(), this.renderContent());
  }
}
MCPConfigureContent.propTypes = {
  className: _propTypes.default.string,
  options: _propTypes.default.array,
  customOptions: _propTypes.default.array,
  filter: _propTypes.default.func,
  placeholder: _propTypes.default.string,
  style: _propTypes.default.object,
  onStatusChange: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onAddClick: _propTypes.default.func,
  onConfigureClick: _propTypes.default.func,
  onEditClick: _propTypes.default.func,
  renderItem: _propTypes.default.func
};
MCPConfigureContent.__SemiComponentName__ = "MCPConfigureContent";
MCPConfigureContent.defaultProps = {};
var _default = exports.default = MCPConfigureContent;