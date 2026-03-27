"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _noop2 = _interopRequireDefault(require("lodash/noop"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _foundation = _interopRequireDefault(require("../base/foundation"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TabsFoundation extends _foundation.default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
    this.destroy = _noop2.default;
    this.handlePrevent = event => {
      event.stopPropagation();
      event.preventDefault();
    };
    this.handleKeyDown = (event, itemKey, closable) => {
      const {
        preventScroll
      } = this.getProps();
      const tabs = [...event.target.parentNode.childNodes].filter(item => {
        return (0, _get2.default)(item, 'attributes.data-tabkey.value', '').includes('semiTab') && (0, _get2.default)(item, 'attributes.aria-disabled.value', '') !== "true";
      });
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
          this.determineOrientation(event, tabs);
          break;
        case "Backspace":
        case "Delete":
          this.handleDeleteKeyDown(event, tabs, itemKey, closable);
          break;
        case "Enter":
        case " ":
          this.handleTabClick(itemKey, event);
          this.handlePrevent(event);
          break;
        case "Home":
          tabs[0].focus({
            preventScroll
          }); // focus first tab
          this.handlePrevent(event);
          break;
        case "End":
          tabs[tabs.length - 1].focus({
            preventScroll
          }); // focus last tab
          this.handlePrevent(event);
          break;
      }
    };
  }
  init() {
    this._adapter.collectPane();
  }
  _notifyChange(activeKey) {
    const {
      activeKey: stateActiveKey
    } = this.getStates();
    if (stateActiveKey !== activeKey) {
      this._adapter.notifyChange(activeKey);
    }
  }
  handleTabClick(activeKey, event) {
    const isControlledComponent = this._isInProps('activeKey');
    if (isControlledComponent) {
      this._notifyChange(activeKey);
    } else {
      this._notifyChange(activeKey);
      this.handleNewActiveKey(activeKey);
    }
    this._adapter.notifyTabClick(activeKey, event);
  }
  handleNewActiveKey(activeKey) {
    const {
      activeKey: stateActiveKey
    } = this.getStates();
    if (stateActiveKey !== activeKey) {
      this._adapter.setNewActiveKey(activeKey);
    }
  }
  getDefaultActiveKey() {
    let activeKey;
    const props = this.getProps();
    if ('activeKey' in props) {
      activeKey = props.activeKey;
    } else if ('defaultActiveKey' in props) {
      activeKey = props.defaultActiveKey;
    } else {
      activeKey = this._adapter.getDefaultActiveKeyFromChildren();
    }
    return activeKey;
  }
  handleTabListChange() {
    this._adapter.collectPane();
  }
  handleTabPanesChange() {
    this._adapter.collectPane();
    this._adapter.collectActiveKey();
  }
  handleTabDelete(tabKey) {
    this._adapter.notifyTabDelete(tabKey);
  }
  determineOrientation(event, tabs) {
    const {
      tabPosition
    } = this.getProps();
    const isVertical = tabPosition === 'left';
    if (isVertical) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        this.switchTabOnArrowPress(event, tabs);
        this.handlePrevent(event);
      }
    } else {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        this.switchTabOnArrowPress(event, tabs);
        this.handlePrevent(event);
      }
    }
  }
  handleDeleteKeyDown(event, tabs, itemKey, closable) {
    const {
      preventScroll
    } = this.getProps();
    if (closable) {
      this.handleTabDelete(itemKey);
      const index = tabs.indexOf(event.target);
      // Move focus to next element after deletion
      // If the element is the last removable tab, focus to its previous tab
      if (tabs.length !== 1) {
        tabs[index + 1 >= tabs.length ? index - 1 : index + 1].focus({
          preventScroll
        });
      }
    }
  }
  switchTabOnArrowPress(event, tabs) {
    const {
      preventScroll
    } = this.getProps();
    const index = tabs.indexOf(event.target);
    const direction = {
      "ArrowLeft": -1,
      "ArrowUp": -1,
      "ArrowRight": 1,
      "ArrowDown": 1
    };
    if (direction[event.key]) {
      if (index !== undefined) {
        if (tabs[index + direction[event.key]]) {
          tabs[index + direction[event.key]].focus({
            preventScroll
          });
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          tabs[tabs.length - 1].focus({
            preventScroll
          }); // focus last tab
        } else if (event.key === "ArrowRight" || event.key == "ArrowDown") {
          tabs[0].focus({
            preventScroll
          }); // focus first tab
        }
      }
    }
  }
}
var _default = exports.default = TabsFoundation;