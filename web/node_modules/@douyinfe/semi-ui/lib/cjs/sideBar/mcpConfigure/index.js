"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _pick2 = _interopRequireDefault(require("lodash/pick"));
var _react = _interopRequireDefault(require("react"));
var _baseComponent = _interopRequireDefault(require("../../_base/baseComponent"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _container = _interopRequireDefault(require("../container"));
var _content = _interopRequireDefault(require("./content"));
var _localeConsumer = _interopRequireDefault(require("../../locale/localeConsumer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MCPConfigure extends _baseComponent.default {
  render() {
    const containerProps = (0, _pick2.default)(this.props, ['title', 'style', 'visible', 'motion', 'minWidth', 'maxWidth', 'onCancel', 'afterVisibleChange', 'resizable', 'defaultSize', 'children', 'className']);
    const mcpConfigureContentProps = (0, _pick2.default)(this.props, ['options', 'customOptions', 'filter', 'placeholder', 'onStatusChange', 'onSearch', 'onAddClick', 'onConfigureClick', 'onEditClick', 'renderItem']);
    return /*#__PURE__*/_react.default.createElement(_localeConsumer.default, {
      componentName: "Sidebar"
    }, locale => {
      var _a;
      return /*#__PURE__*/_react.default.createElement(_container.default, Object.assign({}, containerProps, {
        title: (_a = containerProps.title) !== null && _a !== void 0 ? _a : locale.mcpConfigure
      }), /*#__PURE__*/_react.default.createElement(_content.default, Object.assign({}, mcpConfigureContentProps)));
    });
  }
}
MCPConfigure.propTypes = Object.assign(Object.assign({}, _container.default.propTypes), {
  options: _propTypes.default.array,
  customOptions: _propTypes.default.array,
  onStatusChange: _propTypes.default.func,
  onSearch: _propTypes.default.func,
  onAddClick: _propTypes.default.func,
  renderItem: _propTypes.default.func
});
MCPConfigure.__SemiComponentName__ = "Sidebar.MCPConfigure";
var _default = exports.default = MCPConfigure;