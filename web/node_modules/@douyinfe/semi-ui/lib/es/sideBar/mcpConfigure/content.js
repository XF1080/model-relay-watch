import React from 'react';
import cls from 'classnames';
import BaseComponent from '../../_base/baseComponent';
import PropTypes from 'prop-types';
import { cssClasses, strings } from '@douyinfe/semi-foundation/lib/es/sidebar/constants';
import { RadioGroup, Radio, Input, Tooltip, Button, Empty } from '../../index';
import { IconSearch, IconPlus, IconSetting, IconMinus, IconEdit } from '@douyinfe/semi-icons';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
import MCPConfigureContentFoundation from '@douyinfe/semi-foundation/lib/es/sidebar/mcpCofContentFoundation';
import LocaleConsumer from '../../locale/localeConsumer';
import { getFilterResult } from '@douyinfe/semi-foundation/lib/es/sidebar/utils';
const prefixCls = cssClasses.MCP_CONFIGURE_CONTENT;
class MCPConfigureContent extends BaseComponent {
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
      return /*#__PURE__*/React.createElement("div", {
        className: `${prefixCls}-item-container`
      }, showOptions.map(option => {
        if (renderItem) {
          return renderItem({
            custom: mode === strings.MCP_MODE.CUSTOM,
            option: option
          });
        }
        return /*#__PURE__*/React.createElement("div", {
          key: option.value,
          className: `${prefixCls}-item`
        }, typeof option.icon === 'string' ? /*#__PURE__*/React.createElement("img", {
          src: option.icon,
          alt: option.label,
          className: `${prefixCls}-item-sign`
        }) : /*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-item-sign`
        }, option.icon), /*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-item-content`
        }, /*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-item-content-label`
        }, option.label), /*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-item-content-desc`
        }, option.desc)), option.configure && /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(IconSetting, null),
          className: `${prefixCls}-item-button ${prefixCls}-item-button-configure`,
          onClick: e => this.foundation.onConfigureButtonClick(e, option)
        }), mode === strings.MCP_MODE.CUSTOM && /*#__PURE__*/React.createElement(Button, {
          icon: /*#__PURE__*/React.createElement(IconEdit, null),
          className: `${prefixCls}-item-button ${prefixCls}-item-button-configure`,
          onClick: e => this.foundation.onEditButtonClick(e, option)
        }), this.renderStatusButton(option));
      }));
    };
    this.renderStatusButton = option => {
      const buttonNode = /*#__PURE__*/React.createElement(Button, {
        icon: option.active ? /*#__PURE__*/React.createElement(IconMinus, null) : /*#__PURE__*/React.createElement(IconPlus, null),
        theme: option.active ? 'light' : 'solid',
        type: 'primary',
        className: `${prefixCls}-item-button`,
        disabled: option.disabled,
        checked: option.active,
        onClick: () => this.foundation.handleStatusChange(option, !option.active)
      });
      return option.disabled ? /*#__PURE__*/React.createElement(LocaleConsumer, {
        componentName: "Sidebar"
      }, locale => (/*#__PURE__*/React.createElement(Tooltip, {
        title: locale.defaultMcpInfo
      }, buttonNode))) : buttonNode;
    };
    this.renderSearch = () => {
      const {
        placeholder,
        customOptions
      } = this.props;
      if (this.state.mode === strings.MCP_MODE.INNER) {
        return /*#__PURE__*/React.createElement(LocaleConsumer, {
          componentName: "Sidebar"
        }, locale => (/*#__PURE__*/React.createElement(Input, {
          prefix: /*#__PURE__*/React.createElement(IconSearch, null),
          value: this.state.inputValue,
          placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : locale.searchPlaceholder,
          onChange: this.foundation.handleSearch,
          className: `${prefixCls}-search`
        })));
      } else {
        if (customOptions === undefined || customOptions === null || Array.isArray(customOptions) && customOptions.length === 0) {
          return /*#__PURE__*/React.createElement(LocaleConsumer, {
            componentName: "Sidebar"
          }, locale => (/*#__PURE__*/React.createElement(Empty, {
            image: /*#__PURE__*/React.createElement(IllustrationNoContent, {
              style: {
                width: 150,
                height: 150
              }
            }),
            darkModeImage: /*#__PURE__*/React.createElement(IllustrationNoContentDark, {
              style: {
                width: 150,
                height: 150
              }
            }),
            description: locale.emptyCustomMcpInfo,
            className: `${prefixCls}-custom-empty`
          }, /*#__PURE__*/React.createElement(Button, {
            theme: 'solid',
            type: 'primary',
            icon: /*#__PURE__*/React.createElement(IconPlus, null),
            onClick: this.foundation.handleAddClick
          }, locale.newMcpAdd))));
        }
        return /*#__PURE__*/React.createElement("div", {
          className: `${prefixCls}-search ${prefixCls}-search-container`
        }, /*#__PURE__*/React.createElement(LocaleConsumer, {
          componentName: "Sidebar"
        }, locale => (/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
          prefix: /*#__PURE__*/React.createElement(IconSearch, null),
          value: this.state.inputValue,
          placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : locale.searchPlaceholder,
          onChange: this.foundation.handleSearch
        }), /*#__PURE__*/React.createElement(Button, {
          theme: 'solid',
          type: 'primary',
          icon: /*#__PURE__*/React.createElement(IconPlus, null),
          onClick: this.foundation.handleAddClick
        }, locale.newMcpAdd)))));
      }
    };
    this.state = {
      mode: strings.MCP_MODE.INNER,
      inputValue: '',
      showOptions: (_a = props.options) !== null && _a !== void 0 ? _a : [],
      cachedOptions: (_b = props.options) !== null && _b !== void 0 ? _b : [],
      cachedCustomOptions: (_c = props.customOptions) !== null && _c !== void 0 ? _c : []
    };
    this.foundation = new MCPConfigureContentFoundation(this.adapter);
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
      if (prevState.mode === strings.MCP_MODE.INNER) {
        if (!prevState.inputValue) {
          newState.showOptions = options;
        } else {
          newState.showOptions = getFilterResult(prevState.inputValue, options, filter);
        }
      }
    }
    if (customOptions !== cachedCustomOptions) {
      newState.cachedCustomOptions = customOptions;
      if (prevState.mode === strings.MCP_MODE.CUSTOM) {
        if (!prevState.inputValue) {
          newState.showOptions = customOptions;
        } else {
          newState.showOptions = getFilterResult(prevState.inputValue, customOptions, filter);
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
    return /*#__PURE__*/React.createElement("div", {
      className: cls(prefixCls, {
        [className]: className
      }),
      style: style
    }, /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Sidebar"
    }, locale => (/*#__PURE__*/React.createElement("div", {
      className: `${prefixCls}-header`
    }, /*#__PURE__*/React.createElement(RadioGroup, {
      type: 'button',
      value: this.state.mode,
      onChange: this.foundation.handleModeChange
    }, /*#__PURE__*/React.createElement(Radio, {
      value: strings.MCP_MODE.INNER
    }, "MCP Servers"), /*#__PURE__*/React.createElement(Radio, {
      value: strings.MCP_MODE.CUSTOM
    }, locale.newMcpAdd)), /*#__PURE__*/React.createElement("span", {
      className: `${prefixCls}-header-count`
    }, locale.activeMCPNumber, " ", activatedCount, "/", options.length + customOptions.length)))), this.renderSearch(), this.renderContent());
  }
}
MCPConfigureContent.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  customOptions: PropTypes.array,
  filter: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  onStatusChange: PropTypes.func,
  onSearch: PropTypes.func,
  onAddClick: PropTypes.func,
  onConfigureClick: PropTypes.func,
  onEditClick: PropTypes.func,
  renderItem: PropTypes.func
};
MCPConfigureContent.__SemiComponentName__ = "MCPConfigureContent";
MCPConfigureContent.defaultProps = {};
export default MCPConfigureContent;