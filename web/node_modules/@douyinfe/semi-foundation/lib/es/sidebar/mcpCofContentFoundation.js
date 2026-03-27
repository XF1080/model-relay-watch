import _throttle from "lodash/throttle";
import BaseFoundation from '../base/foundation';
import { strings } from './constants';
import { getFilterResult } from './utils';
export default class MCPConfigureContentFoundation extends BaseFoundation {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.handleSearch = value => {
      this.setState({
        inputValue: value
      });
      this.updateShowOptions(value);
    };
    this.updateShowOptions = _throttle((value, mode) => {
      let realMode = mode !== null && mode !== void 0 ? mode : this.getState('mode');
      const {
        options = [],
        customOptions = [],
        filter
      } = this.getProps();
      let showOptions = [];
      if (realMode === strings.MCP_MODE.INNER) {
        showOptions = value ? getFilterResult(value, options, filter) : options;
      } else {
        showOptions = value ? getFilterResult(value, customOptions, filter) : customOptions;
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
      if (mode === strings.MCP_MODE.INNER) {
        newOptions = options.map(option => option.value === item.value ? Object.assign(Object.assign({}, option), {
          active: checked
        }) : option);
      } else {
        newOptions = customOptions.map(option => option.value === item.value ? Object.assign(Object.assign({}, option), {
          active: checked
        }) : option);
      }
      this._adapter.notifyStatusChange(newOptions, mode === strings.MCP_MODE.CUSTOM);
    };
    this.handleAddClick = e => {
      this._adapter.notifyAddClick(e);
    };
  }
}