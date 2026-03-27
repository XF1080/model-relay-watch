import _pick from "lodash/pick";
import React from 'react';
import BaseComponent from '../../_base/baseComponent';
import PropTypes from 'prop-types';
import Container from '../container';
import MCPConfigureContent from './content';
import LocaleConsumer from '../../locale/localeConsumer';
class MCPConfigure extends BaseComponent {
  render() {
    const containerProps = _pick(this.props, ['title', 'style', 'visible', 'motion', 'minWidth', 'maxWidth', 'onCancel', 'afterVisibleChange', 'resizable', 'defaultSize', 'children', 'className']);
    const mcpConfigureContentProps = _pick(this.props, ['options', 'customOptions', 'filter', 'placeholder', 'onStatusChange', 'onSearch', 'onAddClick', 'onConfigureClick', 'onEditClick', 'renderItem']);
    return /*#__PURE__*/React.createElement(LocaleConsumer, {
      componentName: "Sidebar"
    }, locale => {
      var _a;
      return /*#__PURE__*/React.createElement(Container, Object.assign({}, containerProps, {
        title: (_a = containerProps.title) !== null && _a !== void 0 ? _a : locale.mcpConfigure
      }), /*#__PURE__*/React.createElement(MCPConfigureContent, Object.assign({}, mcpConfigureContentProps)));
    });
  }
}
MCPConfigure.propTypes = Object.assign(Object.assign({}, Container.propTypes), {
  options: PropTypes.array,
  customOptions: PropTypes.array,
  onStatusChange: PropTypes.func,
  onSearch: PropTypes.func,
  onAddClick: PropTypes.func,
  renderItem: PropTypes.func
});
MCPConfigure.__SemiComponentName__ = "Sidebar.MCPConfigure";
export default MCPConfigure;