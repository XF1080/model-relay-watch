"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _throttle2 = _interopRequireDefault(require("lodash/throttle"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
var _constants = require("./constants");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MCPConfigureContentFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleSearch = value => {
      this.setState({
        inputValue: value
      });
      this.updateShowOptions(value);
    };
    this.updateShowOptions = (0, _throttle2.default)((value, mode) => {
      let realMode = mode !== null && mode !== void 0 ? mode : this.getState('mode');
      const {
        options = [],
        customOptions = [],
        filter
      } = this.getProps();
      let showOptions = [];
      if (realMode === _constants.strings.MCP_MODE.INNER) {
        showOptions = value ? (0, _utils.getFilterResult)(value, options, filter) : options;
      } else {
        showOptions = value ? (0, _utils.getFilterResult)(value, customOptions, filter) : customOptions;
      }
      this.setState({
        showOptions
      });
    }, 300);
    this.handleModeChange = e => {
      const newMode = e.target.value;
      this.setState({
        mode: newMode
      });
      this.updateShowOptions(this.getState('inputValue'), newMode);
    };
    this.onConfigureButtonClick = (e, option) => {
      this._adapter.notifyConfigureClick(e, option);
    };
    this.onEditButtonClick = (e, option) => {
      this._adapter.notifyEditClick(e, option);
    };
    this.handleStatusChange = (item, checked) => {
      const {
        options = [],
        customOptions = []
      } = this.getProps();
      let newOptions = [];
      const mode = this.getState('mode');
      if (mode === _constants.strings.MCP_MODE.INNER) {
        newOptions = options.map(option => option.value === item.value ? Object.assign(Object.assign({}, option), {
          active: checked
        }) : option);
      } else {
        newOptions = customOptions.map(option => option.value === item.value ? Object.assign(Object.assign({}, option), {
          active: checked
        }) : option);
      }
      this._adapter.notifyStatusChange(newOptions, mode === _constants.strings.MCP_MODE.CUSTOM);
    };
    this.handleAddClick = e => {
      this._adapter.notifyAddClick(e);
    };
  }
}
exports.default = MCPConfigureContentFoundation;